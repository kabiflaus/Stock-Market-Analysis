"""
Holt aktuelle Kurse/Futures-Staende direkt vom oeffentlichen Yahoo-Finance-
Chart-Endpunkt und speichert eine Momentaufnahme in data/market.json.
Reine Zahlen, keine Interpretation.

Bewusst OHNE yfinance's fast_info/quoteSummary: der braucht ein
Crumb/Cookie-Consent-Verfahren, das auf CI-Runnern unzuverlaessig ist.
Der Chart-Endpunkt liefert Kurs + Vortagesschluss ohne diesen Aufwand.
"""
import json
import os
import sys
import time
from datetime import datetime, timezone

from curl_cffi import requests as cffi_requests

sys.path.insert(0, os.path.dirname(__file__))
from config import (
    TICKER_GROUPS, SECTOR_POSITIONS, PERSONAL_ETFS, PERSONAL_ETF_TICKERS,
    INDEX_HOLDINGS,
)

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "docs", "data", "market.json")

# curl_cffi imitiert einen echten Chrome-Browser (TLS-Fingerprint) -
# umgeht Yahoos Bot-/Cloud-IP-Erkennung besser als ein normaler requests-Call.
SESSION = cffi_requests.Session(impersonate="chrome")

CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart/{ticker}"

# Gruppen-Ticker (Futures/Globale Indizes) - Label != Ticker-Symbol
GROUP_TICKERS = {
    label: ticker
    for group in TICKER_GROUPS.values()
    for label, ticker in group.items()
}

# Alle Einzel-Ticker aus Sektor-Positionen + persoenlichen ETFs, dedupliziert.
# Hier ist Label == Ticker-Symbol selbst (Anzeigename kommt aus TICKER_NAMES
# in build_page.py).
_position_tickers = set()
for _tickers in SECTOR_POSITIONS.values():
    _position_tickers.update(_tickers)
for _tickers in PERSONAL_ETFS.values():
    _position_tickers.update(_tickers)
for _tickers in INDEX_HOLDINGS.values():
    _position_tickers.update(_tickers)

ALL_TICKERS = {**GROUP_TICKERS, **PERSONAL_ETF_TICKERS, **{t: t for t in _position_tickers}}

# Anleihen-Renditen sind Prozentwerte, keine Geldbetraege - fuer diese Labels
# wird nie in Euro umgerechnet (und das Waehrungsfeld wird verworfen, sonst
# koennte die Anzeige faelschlich einen Waehrungs-Badge dazu zeigen).
BOND_LABELS = set(TICKER_GROUPS["Anleihen (USA)"].keys())

# Fuer diese Labels (Globale Indizes + die 3 persoenlichen ETFs) wird
# zusaetzlich eine kurze Kursreihe gespeichert - Grundlage fuer die Mini-
# Graphen bei der Index-Detailansicht und den ETF-Karten im Invest-Tab.
SPARKLINE_LABELS = (
    set(TICKER_GROUPS["Globale Indizes"].keys())
    | set(TICKER_GROUPS["Anleihen (USA)"].keys())
    | set(PERSONAL_ETF_TICKERS.keys())
)


def fetch_ticker(ticker: str) -> tuple[float | None, float | None, list[float], str | None]:
    resp = SESSION.get(
        CHART_URL.format(ticker=ticker),
        params={"interval": "1d", "range": "5d"},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()

    result = data.get("chart", {}).get("result")
    if not result:
        err = data.get("chart", {}).get("error")
        raise ValueError(f"Kein Ergebnis von Yahoo: {err}")

    meta = result[0]["meta"]
    price = meta.get("regularMarketPrice")
    prev_close = meta.get("previousClose") or meta.get("chartPreviousClose")
    # Waehrung, in der Yahoo den Kurs ausliefert (z.B. KRW fuer .KS-Ticker,
    # EUR fuer .DE) - ohne diese Angabe sind auslaendische Kurse (z.B. SK
    # Hynix in KRW) leicht mit USD zu verwechseln.
    currency = meta.get("currency")

    closes = []
    quotes = result[0].get("indicators", {}).get("quote", [{}])
    if quotes:
        closes = [round(c, 2) for c in quotes[0].get("close", []) or [] if c is not None]
    if price is not None and (not closes or closes[-1] != price):
        closes.append(round(price, 2))

    return price, prev_close, closes, currency


def fetch_fx_rates(currencies: set[str]) -> dict[str, float]:
    """EUR-Wechselkurse fuer alle Fremdwaehrungen, die tatsaechlich gebraucht
    werden (z.B. EURKRW=X liefert, wie viel Won 1 Euro gerade wert ist)."""
    rates: dict[str, float] = {}
    for ccy in sorted(currencies):
        try:
            price, _, _, _ = fetch_ticker(f"EUR{ccy}=X")
            if price:
                rates[ccy] = price
        except Exception as e:
            print(f"[WARN] Wechselkurs EUR/{ccy} nicht abrufbar: {e}", file=sys.stderr)
        time.sleep(1.5)
    return rates


def fetch_snapshot() -> list[dict]:
    rows = []
    for label, ticker in ALL_TICKERS.items():
        try:
            price, prev_close, closes, currency = fetch_ticker(ticker)
            # Yahoos meta.previousClose haengt manchmal der taeglichen
            # Schlusskurs-Reihe hinterher (asynchrone Cache-Aktualisierung) -
            # das fuehrt zu falschen Tagesveraenderungen, die nicht zum
            # angezeigten Sparkline-Verlauf passen (beobachtet u.a. bei DAX,
            # Amundi Stoxx Europe 600, iShares Global Clean Energy, Jul 2026).
            # Die tatsaechliche Kursreihe ist verlaesslicher: der vorletzte
            # Eintrag (der letzte ist der aktuelle Kurs) ist der echte
            # Vortagesschluss.
            if len(closes) >= 2:
                prev_close = closes[-2]
            change_pct = None
            if price is not None and prev_close:
                change_pct = round((price - prev_close) / prev_close * 100, 2)
            row = {
                "label": label,
                "ticker": ticker,
                "price": round(price, 2) if price is not None else None,
                "prev_close": round(prev_close, 2) if prev_close else None,
                "change_pct": change_pct,
                "currency": None if label in BOND_LABELS else currency,
            }
            if label in SPARKLINE_LABELS:
                row["sparkline"] = closes
            rows.append(row)
        except Exception as e:
            print(f"[WARN] Fehler bei {label} ({ticker}): {e}", file=sys.stderr)
            rows.append({
                "label": label, "ticker": ticker,
                "price": None, "prev_close": None, "change_pct": None,
                "error": str(e),
            })
        time.sleep(1.5)  # Burst-Anfragen vermeiden

    # Alles in Euro umrechnen (bewusst nicht fuer Anleihen, s. BOND_LABELS
    # oben) - Nutzerin ist in Europa und will keine Fremdwaehrungen im Kopf
    # umrechnen. change_pct bleibt unveraendert (Tagesbewegung in Prozent ist
    # waehrungsunabhaengig genug fuer diesen Zweck).
    currencies_needed = {
        r["currency"] for r in rows
        if r.get("currency") and r["currency"] != "EUR" and r.get("price") is not None
    }
    fx_rates = fetch_fx_rates(currencies_needed)
    for r in rows:
        ccy = r.get("currency")
        if ccy and ccy != "EUR" and r.get("price") is not None:
            rate = fx_rates.get(ccy)
            if rate:
                r["price_eur"] = round(r["price"] / rate, 2)
    return rows


def main():
    snapshot = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "rows": fetch_snapshot(),
    }
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, ensure_ascii=False, indent=2)
    print("Markt-Snapshot gespeichert.")


if __name__ == "__main__":
    main()