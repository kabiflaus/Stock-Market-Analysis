"""
Baut docs/index.html aus data/headlines.json + data/market.json.
Reine Darstellung - keine Bewertung, keine generierten Kommentare.
"""
import json
import os
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

BASE = os.path.dirname(__file__)
HEADLINES_PATH = os.path.join(BASE, "..", "data", "headlines.json")
MARKET_PATH = os.path.join(BASE, "..", "data", "market.json")
OUTPUT_PATH = os.path.join(BASE, "..", "docs", "index.html")

BERLIN = ZoneInfo("Europe/Berlin")


def load_json(path, default):
    if not os.path.exists(path):
        return default
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def fmt_time(iso_str: str) -> str:
    dt = datetime.fromisoformat(iso_str).astimezone(BERLIN)
    return dt.strftime("%d.%m. %H:%M")


def market_row_html(row: dict) -> str:
    change = row.get("change_pct")
    if change is None:
        change_html = '<span class="chg neutral">n/a</span>'
    else:
        cls = "up" if change > 0 else ("down" if change < 0 else "neutral")
        sign = "+" if change > 0 else ""
        change_html = f'<span class="chg {cls}">{sign}{change}%</span>'
    price = row.get("price")
    price_str = f"{price:,.2f}" if price is not None else "n/a"
    return f"""
    <div class="ticker-card">
      <div class="ticker-label">{row['label']}</div>
      <div class="ticker-price">{price_str}</div>
      {change_html}
    </div>"""


def headline_row_html(item: dict) -> str:
    return f"""
    <div class="headline">
      <span class="tag">{item['label']}</span>
      <a href="{item['link']}" target="_blank" rel="noopener">{item['title']}</a>
      <div class="meta">{item.get('source','')} &middot; {fmt_time(item['published'])}</div>
    </div>"""


def main():
    headlines = load_json(HEADLINES_PATH, [])
    market = load_json(MARKET_PATH, {"fetched_at": None, "rows": []})

    market_html = "\n".join(market_row_html(r) for r in market["rows"])
    headlines_html = "\n".join(headline_row_html(h) for h in headlines)

    generated_at = datetime.now(timezone.utc).astimezone(BERLIN).strftime("%d.%m.%Y %H:%M")
    market_fetched = "n/a"
    if market.get("fetched_at"):
        market_fetched = datetime.fromisoformat(market["fetched_at"]).astimezone(BERLIN).strftime("%H:%M")

    html = f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Morgen-Feed</title>
<style>
  :root {{ color-scheme: dark; }}
  * {{ box-sizing: border-box; }}
  body {{
    background: #0d0f12; color: #e7e9ea; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    margin: 0; padding: 16px; max-width: 720px; margin-inline: auto;
  }}
  h1 {{ font-size: 1.3rem; margin: 0 0 4px; }}
  .updated {{ color: #8b98a5; font-size: 0.8rem; margin-bottom: 20px; }}
  .tickers {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 28px; }}
  .ticker-card {{ background: #16191d; border: 1px solid #2a2f34; border-radius: 10px; padding: 10px 12px; }}
  .ticker-label {{ font-size: 0.75rem; color: #8b98a5; }}
  .ticker-price {{ font-size: 1.05rem; font-weight: 600; }}
  .chg {{ font-size: 0.85rem; font-weight: 600; }}
  .chg.up {{ color: #3fb950; }}
  .chg.down {{ color: #f85149; }}
  .chg.neutral {{ color: #8b98a5; }}
  .headline {{ border-bottom: 1px solid #22262b; padding: 12px 0; }}
  .headline a {{ color: #e7e9ea; text-decoration: none; font-size: 0.95rem; display: block; margin-top: 4px; }}
  .headline a:hover {{ text-decoration: underline; }}
  .tag {{ display: inline-block; background: #1f6feb22; color: #58a6ff; font-size: 0.7rem;
          padding: 2px 7px; border-radius: 999px; }}
  .meta {{ color: #6e7681; font-size: 0.75rem; margin-top: 4px; }}
</style>
</head>
<body>
  <h1>Morgen-Feed</h1>
  <div class="updated">Seite generiert: {generated_at} &middot; Kurse zuletzt: {market_fetched}</div>

  <div class="tickers">
    {market_html}
  </div>

  <div class="headlines">
    {headlines_html if headlines_html else '<p>Noch keine Schlagzeilen gesammelt.</p>'}
  </div>
</body>
</html>
"""

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Seite geschrieben: {OUTPUT_PATH} ({len(headlines)} Schlagzeilen, {len(market['rows'])} Ticker)")


if __name__ == "__main__":
    main()
