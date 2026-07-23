"""
Sammelt Schlagzeilen ueber Google-News-RSS fuer die in config.py definierten
Themen und haengt sie an data/headlines.json an (dedupliziert, mit Ablaufzeit).

Bewusst KEINE Bewertung, KEIN Kommentar - nur Titel, Quelle, Zeitstempel, Link.
"""
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from urllib.parse import quote

import feedparser

sys.path.insert(0, os.path.dirname(__file__))
from config import NEWS_QUERIES, MAX_ITEMS_PER_QUERY, RETENTION_DAYS, BLOCKED_SOURCES

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "docs", "data", "headlines.json")


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


def is_blocked(source: str) -> bool:
    source_lower = source.lower()
    return any(blocked in source_lower for blocked in BLOCKED_SOURCES)


def fetch_all() -> list[dict]:
    items = []
    for query in NEWS_QUERIES:
        url = build_url(query)
        try:
            feed = feedparser.parse(url)
        except Exception as e:
            print(f"[WARN] Fehler bei {query['label']}: {e}", file=sys.stderr)
            continue

        for entry in feed.entries[:MAX_ITEMS_PER_QUERY]:
            source = ""
            if getattr(entry, "source", None):
                source = getattr(entry.source, "title", "") or ""

            if is_blocked(source):
                continue

            items.append({
                "label": query["label"],
                "title": entry.get("title", "").strip(),
                "link": entry.get("link", ""),
                "source": source,
                "published": parse_time(entry),
            })
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
    new_items = fetch_all()
    merged = merge_and_clean(existing, new_items)

    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f"{len(new_items)} neue Treffer geprueft, {len(merged)} Schlagzeilen insgesamt gespeichert.")


if __name__ == "__main__":
    main()