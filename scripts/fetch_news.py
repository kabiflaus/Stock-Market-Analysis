"""
Sammelt Schlagzeilen ueber Google-News-RSS fuer die in config.py definierten
Themen und haengt sie an data/headlines.json an (dedupliziert, mit Ablaufzeit).

Bewusst KEINE Bewertung, KEIN Kommentar - nur Titel, Quelle, Zeitstempel, Link.
"""
import json
import os
import socket
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from urllib.parse import quote

import feedparser

sys.path.insert(0, os.path.dirname(__file__))
from config import NEWS_QUERIES, MAX_ITEMS_PER_QUERY, RETENTION_DAYS, ALLOWED_SOURCES, TICKER_NAMES

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "docs", "data", "headlines.json")
MARKET_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "docs", "data", "market.json")

# feedparser.parse() hat keinen eigenen Timeout-Parameter und haengt sich an
# den globalen Socket-Timeout - ohne den kann eine einzelne haengende Google-
# News-Anfrage (von 147 pro Lauf) den ganzen Workflow um viele Minuten
# verzoegern (beobachtet: 18 Min. statt ueblich 1-2 Min. fuer diesen Schritt).
# Gleicher Wert wie fetch_market.py's curl_cffi-Timeout, fuer Konsistenz.
socket.setdefaulttimeout(10)


def build_url(query: dict) -> str:
    lang = query["hl"].split("-")[0]
    ceid = f"{query['gl']}:{lang}"
    q = quote(query["query"])
    return f"https://news.google.com/rss/search?q={q}&hl={query['hl']}&gl={query['gl']}&ceid={ceid}"


def parse_time(entry) -> str:
    # feedparser liefert struct_time in published_parsed (UTC)
    if getattr(entry, "published_parsed", None):
        dt = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)
    else:
        dt = datetime.now(timezone.utc)
    return dt.isoformat()


def is_allowed(source: str) -> bool:
    source_lower = source.lower()
    return any(allowed in source_lower for allowed in ALLOWED_SOURCES)


def load_top_movers() -> list[str]:
    """Liest die von fetch_market.py ermittelten 5 groessten Tagesbewegungen
    (setzt voraus, dass "Kurse abrufen" VOR "News sammeln" laeuft, s.
    collect.yml) - Grundlage fuer gezielte "warum bewegt sich das"-Suchen
    zusaetzlich zu den statischen NEWS_QUERIES unten."""
    if not os.path.exists(MARKET_DATA_PATH):
        return []
    try:
        with open(MARKET_DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f).get("top_movers", [])
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def mover_queries(tickers: list[str]) -> list[dict]:
    # Label = Ticker-Symbol selbst (nicht wie bei den statischen Queries ein
    # Themen-Name) - app.js matcht darueber die Schlagzeile auf die passende
    # Positions-Karte in "Groesste Bewegungen".
    return [
        {"label": ticker, "query": f"{TICKER_NAMES.get(ticker, ticker)} stock", "hl": "en-US", "gl": "US"}
        for ticker in tickers
    ]


# Anzahl gleichzeitiger Google-News-RSS-Abfragen. Frueher liefen alle
# Queries (Themen-Suchen + Top-Mover) strikt nacheinander - bei ~35 Queries
# je ~0.5-2s Netzwerklatenz kommen da leicht 30-60s zusammen. Ein Thread-Pool
# ueberlappt die Wartezeit statt sie aufzusummieren. Gleicher Wert wie
# fetch_market.py's MAX_WORKERS, aus demselben Grund moderat gehalten.
MAX_WORKERS = 8


def _fetch_one_query(query: dict) -> list[dict]:
    url = build_url(query)
    try:
        feed = feedparser.parse(url)
    except Exception as e:
        print(f"[WARN] Fehler bei {query['label']}: {e}", file=sys.stderr)
        return []

    require_in_title = query.get("require_in_title")
    items = []
    for entry in feed.entries[:MAX_ITEMS_PER_QUERY]:
        source = ""
        if getattr(entry, "source", None):
            source = getattr(entry.source, "title", "") or ""

        if not is_allowed(source):
            continue

        title = entry.get("title", "").strip()
        # Google-News-RSS matcht die Suche auch auf den Volltext, nicht nur
        # den Titel - ohne diesen Check landen Artikel, die das Thema nur
        # am Rande erwaehnen (z.B. "DAX" nur als Vergleichswert), faelschlich
        # als eigene Schlagzeile dazu.
        if require_in_title and require_in_title.lower() not in title.lower():
            continue

        items.append({
            "label": query["label"],
            "title": title,
            "link": entry.get("link", ""),
            "source": source,
            "published": parse_time(entry),
        })
    return items


def fetch_all(queries: list[dict]) -> list[dict]:
    items = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        for query_items in pool.map(_fetch_one_query, queries):
            items.extend(query_items)
    return items


def load_existing() -> list[dict]:
    if not os.path.exists(DATA_PATH):
        return []
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def merge_and_clean(existing: list[dict], new: list[dict]) -> list[dict]:
    by_link = {item["link"]: item for item in existing if item.get("link")}
    for item in new:
        if item.get("link"):
            by_link[item["link"]] = item  # neuer Eintrag ueberschreibt/ergaenzt

    cutoff = datetime.now(timezone.utc) - timedelta(days=RETENTION_DAYS)
    cleaned = [
        item for item in by_link.values()
        if datetime.fromisoformat(item["published"]) > cutoff
    ]
    cleaned.sort(key=lambda x: x["published"], reverse=True)
    return cleaned


def main():
    existing = load_existing()
    queries = NEWS_QUERIES + mover_queries(load_top_movers())
    new_items = fetch_all(queries)
    merged = merge_and_clean(existing, new_items)

    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f"{len(new_items)} neue Treffer geprueft, {len(merged)} Schlagzeilen insgesamt gespeichert.")


if __name__ == "__main__":
    main()