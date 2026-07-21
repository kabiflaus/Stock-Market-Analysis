"""
Holt aktuelle Kurse/Futures-Staende via yfinance und speichert eine
Momentaufnahme in data/market.json. Reine Zahlen, keine Interpretation.
"""
import json
import os
import sys
from datetime import datetime, timezone

import yfinance as yf

sys.path.insert(0, os.path.dirname(__file__))
from config import MARKET_TICKERS

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "market.json")


def fetch_snapshot() -> list[dict]:
    rows = []
    for label, ticker in MARKET_TICKERS.items():
        try:
            t = yf.Ticker(ticker)
            info = t.fast_info
            price = info.get("lastPrice")
            prev_close = info.get("previousClose")
            change_pct = None
            if price is not None and prev_close:
                change_pct = round((price - prev_close) / prev_close * 100, 2)
            rows.append({
                "label": label,
                "ticker": ticker,
                "price": round(price, 2) if price is not None else None,
                "prev_close": round(prev_close, 2) if prev_close else None,
                "change_pct": change_pct,
            })
        except Exception as e:
            print(f"[WARN] Fehler bei {label} ({ticker}): {e}", file=sys.stderr)
            rows.append({
                "label": label, "ticker": ticker,
                "price": None, "prev_close": None, "change_pct": None,
                "error": str(e),
            })
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
