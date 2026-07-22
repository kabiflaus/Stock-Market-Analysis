"""
Baut docs/index.html aus data/headlines.json + data/market.json.
Reine Darstellung - keine Bewertung, keine generierten Kommentare.
"""
import json
import os
import sys
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

sys.path.insert(0, os.path.dirname(__file__))
from config import TICKER_GROUPS, PRIORITY_KEYWORDS, TICKER_FLAGS, SECTOR_TICKER_MAP

BASE = os.path.dirname(__file__)
HEADLINES_PATH = os.path.join(BASE, "..", "data", "headlines.json")
MARKET_PATH = os.path.join(BASE, "..", "data", "market.json")
OUTPUT_PATH = os.path.join(BASE, "..", "docs", "index.html")

BERLIN = ZoneInfo("Europe/Berlin")

# Feste Reihenfolge fuer die Sektor-Pillen, unabhaengig von der Reihenfolge
# in headlines.json. Nur Labels, die tatsaechlich Schlagzeilen haben,
# werden als Pille gerendert.
SECTOR_ORDER = [
    "Fed / Makro", "Chips & AI", "ETFs", "Healthcare", "Rüstung",
    "Energie & Rohstoffe", "Konsumgüter", "Nasdaq", "S&P 500", "DAX", "KOSPI",
]

MAX_VISIBLE = 10


def load_json(path, default):
    if not os.path.exists(path):
        return default
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def esc(s: str) -> str:
    return str(s).replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;")


def fmt_time(iso_str: str) -> str:
    dt = datetime.fromisoformat(iso_str).astimezone(BERLIN)
    return dt.strftime("%d.%m. %H:%M")


def is_priority(title: str) -> bool:
    t = title.lower()
    return any(kw in t for kw in PRIORITY_KEYWORDS)


def market_row_html(row: dict, group_name: str) -> str:
    change = row.get("change_pct")
    if change is None:
        change_html = '<span class="chg neutral">n/a</span>'
    else:
        cls = "up" if change > 0 else ("down" if change < 0 else "neutral")
        sign = "+" if change > 0 else ""
        change_html = f'<span class="chg {cls}">{sign}{change}%</span>'
    price = row.get("price")
    price_str = f"{price:,.2f}" if price is not None else "n/a"
    label = row["label"]
    flag = TICKER_FLAGS.get(label, "")

    # Nur die "Globale Indizes"-Karten sind sektor-filterbar. Fuer alle
    # Sektoren, in deren SECTOR_TICKER_MAP dieser Ticker auftaucht, wird das
    # Label im data-sectors-Attribut gesammelt (space-getrennt fuer JS).
    sector_attr = ""
    if group_name == "Globale Indizes":
        relevant_for = [
            sector for sector, tickers in SECTOR_TICKER_MAP.items()
            if label in tickers
        ]
        sector_attr = f' data-sectors="{esc("|".join(relevant_for))}"'

    filterable_class = " filterable" if group_name == "Globale Indizes" else ""

    return f"""
      <div class="ticker-card{filterable_class}"{sector_attr}>
        <div class="ticker-label">{flag} {esc(label)}</div>
        <div class="ticker-price">{price_str}</div>
        {change_html}
      </div>"""


def ticker_group_html(rows_by_label: dict) -> str:
    sections = []
    for group_name, tickers in TICKER_GROUPS.items():
        cards = []
        for label in tickers:
            row = rows_by_label.get(label, {"label": label, "price": None, "change_pct": None})
            cards.append(market_row_html(row, group_name))
        section_class = " tickers-global" if group_name == "Globale Indizes" else ""
        sections.append(f"""
    <div class="section">
      <h2>{esc(group_name)}</h2>
      <div class="tickers{section_class}">{''.join(cards)}
      </div>
    </div>""")
    return "\n".join(sections)


def headline_html(item: dict, index: int) -> str:
    extra_class = " extra" if index >= MAX_VISIBLE else ""
    priority_badge = '<span class="badge">Wichtig</span>' if is_priority(item["title"]) else ""
    return f"""
    <div class="headline{extra_class}" data-label="{esc(item['label'])}">
      <span class="tag">{esc(item['label'])}</span>{priority_badge}
      <a href="{item['link']}" target="_blank" rel="noopener">{esc(item['title'])}</a>
      <div class="meta">{esc(item.get('source',''))} &middot; {fmt_time(item['published'])}</div>
    </div>"""


def pills_html(present_labels: set) -> str:
    ordered = [l for l in SECTOR_ORDER if l in present_labels]
    ordered += [l for l in present_labels if l not in ordered]  # Fallback fuer unbekannte Labels
    buttons = ['<button class="pill active" data-label="Alle">Alle</button>']
    for label in ordered:
        buttons.append(f'<button class="pill" data-label="{esc(label)}">{esc(label)}</button>')
    return "\n".join(buttons)


def main():
    headlines = load_json(HEADLINES_PATH, [])
    market = load_json(MARKET_PATH, {"fetched_at": None, "rows": []})

    headlines.sort(key=lambda x: x["published"], reverse=True)
    rows_by_label = {r["label"]: r for r in market.get("rows", [])}
    present_labels = {h["label"] for h in headlines}

    tickers_html = ticker_group_html(rows_by_label)
    pills = pills_html(present_labels)
    headlines_html = "\n".join(headline_html(h, i) for i, h in enumerate(headlines))
    show_more_btn = len(headlines) > MAX_VISIBLE

    generated_at = datetime.now(timezone.utc).astimezone(BERLIN).strftime("%d.%m.%Y %H:%M")
    market_fetched = "n/a"
    if market.get("fetched_at"):
        market_fetched = datetime.fromisoformat(market["fetched_at"]).astimezone(BERLIN).strftime("%H:%M")

    html = f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<title>Morgen-Feed</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap" rel="stylesheet">
<style>
  :root {{ color-scheme: dark; }}
  * {{ box-sizing: border-box; }}
  body {{
    background: #0d0f12; color: #e7e9ea; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    margin: 0; padding: 16px 16px 40px; max-width: 720px; margin-inline: auto;
  }}
  .topbar {{ display: flex; justify-content: flex-end; }}
  .refresh-btn {{
    background: #1f6feb22; color: #58a6ff; border: 1px solid #1f6feb55;
    border-radius: 8px; padding: 6px 12px; font-size: 0.8rem; font-weight: 600;
  }}
  .site-title {{
    font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-size: 2.4rem;
    text-align: center; margin: 4px 0 2px; letter-spacing: -0.01em;
  }}
  .updated {{ color: #8b98a5; font-size: 0.8rem; text-align: center; margin-bottom: 22px; }}

  .pills {{ display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 28px; }}
  .pill {{
    background: transparent; color: #8b98a5; border: 1px solid #2a2f34;
    border-radius: 999px; padding: 5px 13px; font-size: 0.78rem; font-weight: 500;
  }}
  .pill.active {{ background: #e7e9ea; color: #0d0f12; border-color: #e7e9ea; font-weight: 700; }}

  .section {{ margin-bottom: 26px; }}
  .section h2 {{
    font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em;
    color: #8b98a5; font-weight: 600; margin: 0 0 10px;
  }}
  .tickers {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }}
  .ticker-card {{
    background: #16191d; border: 1px solid #2a2f34; border-radius: 10px; padding: 10px 12px;
    transition: opacity 0.35s ease, transform 0.35s ease, max-height 0.35s ease,
                padding 0.35s ease, margin 0.35s ease;
    max-height: 100px; overflow: hidden;
  }}
  .ticker-card.dimmed {{
    opacity: 0; transform: scale(0.92); max-height: 0; padding-top: 0; padding-bottom: 0;
    border-width: 0; pointer-events: none;
  }}
  .ticker-label {{ font-size: 0.75rem; color: #8b98a5; }}
  .ticker-price {{ font-size: 1.05rem; font-weight: 600; }}
  .chg {{ font-size: 0.85rem; font-weight: 600; }}
  .chg.up {{ color: #3fb950; }}
  .chg.down {{ color: #f85149; }}
  .chg.neutral {{ color: #8b98a5; }}

  .headlines {{ margin-top: 8px; }}
  .headline {{ border-bottom: 1px solid #22262b; padding: 12px 0; }}
  .headline a {{ color: #e7e9ea; text-decoration: none; font-size: 0.95rem; display: block; margin-top: 4px; }}
  .headline a:hover {{ text-decoration: underline; }}
  .tag {{ display: inline-block; background: #1f6feb22; color: #58a6ff; font-size: 0.7rem;
          padding: 2px 7px; border-radius: 999px; }}
  .badge {{ display: inline-block; background: #f8514922; color: #f85149; font-size: 0.7rem;
            padding: 2px 7px; border-radius: 999px; margin-left: 6px; }}
  .meta {{ color: #6e7681; font-size: 0.75rem; margin-top: 4px; }}

  #more-btn {{
    display: block; margin: 18px auto 0; background: #16191d; color: #e7e9ea;
    border: 1px solid #2a2f34; border-radius: 10px; padding: 10px 20px; font-size: 0.85rem;
  }}
</style>
</head>
<body>
  <div class="topbar">
    <button class="refresh-btn" onclick="location.href = location.pathname + '?t=' + Date.now();">↻ Aktualisieren</button>
  </div>
  <h1 class="site-title">Morgen-Feed</h1>
  <div class="updated">Seite generiert: {generated_at} &middot; Kurse zuletzt: {market_fetched}</div>

  <div class="pills">
    {pills}
  </div>

  {tickers_html}

  <div class="headlines">
    {headlines_html if headlines_html else '<p>Noch keine Schlagzeilen gesammelt.</p>'}
  </div>

  {'<button id="more-btn">Mehr anzeigen</button>' if show_more_btn else ''}

<script>
  const pills = document.querySelectorAll('.pill');
  const headlines = document.querySelectorAll('.headline');
  const tickerCards = document.querySelectorAll('.ticker-card.filterable');
  const moreBtn = document.getElementById('more-btn');
  let expanded = false;
  let currentFilter = 'Alle';

  function applyFilter() {{
    headlines.forEach((h, i) => {{
      const matches = (currentFilter === 'Alle') || (h.dataset.label === currentFilter);
      if (!matches) {{ h.style.display = 'none'; return; }}
      const hiddenByLimit = (currentFilter === 'Alle') && (i >= {MAX_VISIBLE}) && !expanded;
      h.style.display = hiddenByLimit ? 'none' : '';
    }});

    tickerCards.forEach(card => {{
      if (currentFilter === 'Alle') {{
        card.classList.remove('dimmed');
        return;
      }}
      const sectors = (card.dataset.sectors || '').split('|');
      card.classList.toggle('dimmed', !sectors.includes(currentFilter));
    }});

    if (moreBtn) {{
      moreBtn.style.display = (currentFilter === 'Alle' && !expanded) ? 'block' : 'none';
    }}
    pills.forEach(p => p.classList.toggle('active', p.dataset.label === currentFilter));
  }}

  pills.forEach(p => p.addEventListener('click', () => {{
    currentFilter = p.dataset.label;
    expanded = false;
    applyFilter();
  }}));

  if (moreBtn) {{
    moreBtn.addEventListener('click', () => {{
      expanded = true;
      applyFilter();
    }});
  }}

  applyFilter();
</script>
</body>
</html>
"""

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Seite geschrieben: {OUTPUT_PATH} ({len(headlines)} Schlagzeilen)")


if __name__ == "__main__":
    main()