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
from config import (
    TICKER_GROUPS, PRIORITY_KEYWORDS, TICKER_FLAGS, SECTOR_TICKER_MAP,
    SECTOR_ORDER, SECTOR_POSITIONS, PERSONAL_ETFS, TICKER_NAMES,
)

BASE = os.path.dirname(__file__)
HEADLINES_PATH = os.path.join(BASE, "..", "data", "headlines.json")
MARKET_PATH = os.path.join(BASE, "..", "data", "market.json")
OUTPUT_PATH = os.path.join(BASE, "..", "docs", "index.html")

BERLIN = ZoneInfo("Europe/Berlin")
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


def price_card_html(label: str, row: dict, flag: str = "", filterable_attr: str = "") -> str:
    change = row.get("change_pct")
    if change is None:
        change_html = '<span class="chg neutral">n/a</span>'
    else:
        cls = "up" if change > 0 else ("down" if change < 0 else "neutral")
        sign = "+" if change > 0 else ""
        change_html = f'<span class="chg {cls}">{sign}{change}%</span>'
    price = row.get("price")
    price_str = f"{price:,.2f}" if price is not None else "n/a"
    prefix = f"{flag} " if flag else ""
    return f"""
      <div class="ticker-card"{filterable_attr}>
        <div class="ticker-label">{prefix}{esc(label)}</div>
        <div class="ticker-price">{price_str}</div>
        {change_html}
      </div>"""


def global_indices_html(rows_by_label: dict) -> str:
    cards = []
    for label in TICKER_GROUPS["Globale Indizes"]:
        row = rows_by_label.get(label, {"price": None, "change_pct": None})
        relevant_for = [s for s, tickers in SECTOR_TICKER_MAP.items() if label in tickers]
        attr = f' data-sectors="{esc("|".join(relevant_for))}"'
        cards.append(price_card_html(label, row, TICKER_FLAGS.get(label, ""), attr))
    return "".join(cards)


def futures_html(rows_by_label: dict) -> str:
    cards = []
    for label in TICKER_GROUPS["US-Futures (Vorbörse)"]:
        row = rows_by_label.get(label, {"price": None, "change_pct": None})
        cards.append(price_card_html(label, row))
    return "".join(cards)


def position_section_html(sector: str, tickers: list, rows_by_label: dict, attr_name: str) -> str:
    cards = []
    for ticker in tickers:
        row = rows_by_label.get(ticker, {"price": None, "change_pct": None})
        name = TICKER_NAMES.get(ticker, ticker)
        cards.append(price_card_html(f"{name} ({ticker})", row))
    return f"""
    <div class="section position-section" data-{attr_name}="{esc(sector)}" style="display:none">
      <h2>{esc(sector)} – Top {len(tickers)}</h2>
      <div class="tickers">{''.join(cards)}
      </div>
    </div>"""


def invest_etf_cards_html() -> str:
    cards = []
    for name in PERSONAL_ETFS:
        cards.append(f"""
      <div class="etf-card" data-etf="{esc(name)}">
        <div class="etf-name">{esc(name)}</div>
        <div class="etf-hint">antippen für Holdings →</div>
      </div>""")
    return "".join(cards)


def headline_html(item: dict, index: int, max_visible: int | None) -> str:
    extra_class = " extra" if (max_visible is not None and index >= max_visible) else ""
    priority_badge = '<span class="badge">Wichtig</span>' if is_priority(item["title"]) else ""
    return f"""
    <div class="headline{extra_class}" data-label="{esc(item['label'])}">
      <span class="tag">{esc(item['label'])}</span>{priority_badge}
      <a href="{item['link']}" target="_blank" rel="noopener">{esc(item['title'])}</a>
      <div class="meta">{esc(item.get('source',''))} &middot; {fmt_time(item['published'])}</div>
    </div>"""


def market_pills_html() -> str:
    buttons = ['<button class="pill active" data-label="Alle">Alle</button>']
    for label in SECTOR_ORDER:
        buttons.append(f'<button class="pill" data-label="{esc(label)}">{esc(label)}</button>')
    return "\n".join(buttons)


def invest_pills_html() -> str:
    buttons = ['<button class="pill active" data-label="Alle">Alle</button>']
    for label in PERSONAL_ETFS:
        buttons.append(f'<button class="pill" data-label="{esc(label)}">{esc(label)}</button>')
    return "\n".join(buttons)


def main():
    headlines = load_json(HEADLINES_PATH, [])
    market = load_json(MARKET_PATH, {"fetched_at": None, "rows": []})

    headlines.sort(key=lambda x: x["published"], reverse=True)
    rows_by_label = {r["label"]: r for r in market.get("rows", [])}

    invest_labels = set(PERSONAL_ETFS.keys())
    market_headlines = [h for h in headlines if h["label"] not in invest_labels]
    invest_headlines = [h for h in headlines if h["label"] in invest_labels]

    market_headlines_html = "\n".join(
        headline_html(h, i, MAX_VISIBLE) for i, h in enumerate(market_headlines)
    )
    invest_headlines_html = "\n".join(
        headline_html(h, i, None) for i, h in enumerate(invest_headlines)
    )
    show_more_btn = len(market_headlines) > MAX_VISIBLE

    position_sections_html = "\n".join(
        position_section_html(sector, tickers, rows_by_label, "sector")
        for sector, tickers in SECTOR_POSITIONS.items()
    )
    invest_holdings_html = "\n".join(
        position_section_html(name, tickers, rows_by_label, "etf")
        for name, tickers in PERSONAL_ETFS.items()
    )

    generated_at = datetime.now(timezone.utc).astimezone(BERLIN).strftime("%d.%m.%Y %H:%M")
    market_fetched = "n/a"
    if market.get("fetched_at"):
        market_fetched = datetime.fromisoformat(market["fetched_at"]).astimezone(BERLIN).strftime("%H:%M")

    invest_labels_json = json.dumps(list(PERSONAL_ETFS.keys()), ensure_ascii=False)

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
  .updated {{ color: #8b98a5; font-size: 0.8rem; text-align: center; margin-bottom: 18px; }}

  .tabs {{ display: flex; gap: 8px; justify-content: center; margin-bottom: 22px; }}
  .tab-btn {{
    background: transparent; color: #8b98a5; border: 1px solid #2a2f34;
    border-radius: 10px; padding: 9px 26px; font-size: 0.95rem; font-weight: 700;
  }}
< truncated lines 204-215 >
}}
  .tab-btn.active {{ background: #e7e9ea; color: #0d0f12; border-color: #e7e9ea; }}

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

  .section.fading {{ transition: opacity 0.3s ease; }}

  .etf-cards {{ display: grid; grid-template-columns: 1fr; gap: 8px; }}
  .etf-card {{
    background: #16191d; border: 1px solid #2a2f34; border-radius: 12px; padding: 16px;
    transition: opacity 0.35s ease, transform 0.35s ease, max-height 0.35s ease;
  }}
  .etf-card.dimmed {{ opacity: 0; transform: scale(0.95); max-height: 0; padding: 0; border-width: 0; pointer-events: none; }}
  .etf-name {{ font-size: 1rem; font-weight: 700; }}
  .etf-hint {{ font-size: 0.75rem; color: #6e7681; margin-top: 4px; }}

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

  <div class="tabs">
    <button class="tab-btn active" data-view="markets">Markets</button>
    <button class="tab-btn" data-view="invest">Invest</button>
  </div>

  <!-- ============ MARKETS ============ -->
  <div id="view-markets" class="view">
    <div class="pills" id="pills-markets">
      {market_pills_html()}
    </div>

    <div class="section">
      <h2>US-Futures (Vorbörse)</h2>
      <div class="tickers">{futures_html(rows_by_label)}
      </div>
    </div>

    <div class="section" id="global-indices-section">
      <h2>Globale Indizes</h2>
      <div class="tickers">{global_indices_html(rows_by_label)}
      </div>
    </div>

    {position_sections_html}

    <div class="headlines" id="headlines-markets">
      {market_headlines_html if market_headlines_html else '<p>Noch keine Schlagzeilen gesammelt.</p>'}
    </div>
    {'<button id="more-btn">Mehr anzeigen</button>' if show_more_btn else ''}
  </div>

  <!-- ============ INVEST ============ -->
  <div id="view-invest" class="view" style="display:none">
    <div class="pills" id="pills-invest">
      {invest_pills_html()}
    </div>

    <div class="section" id="invest-etf-section">
      <div class="etf-cards">{invest_etf_cards_html()}
      </div>
    </div>

    {invest_holdings_html}

    <div class="headlines" id="headlines-invest">
      {invest_headlines_html if invest_headlines_html else '<p>Noch keine Schlagzeilen zu deinen ETFs gesammelt.</p>'}
    </div>
  </div>

<script>
  const INVEST_LABELS = {invest_labels_json};

  // ---------- Tabs ----------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const viewMarkets = document.getElementById('view-markets');
  const viewInvest = document.getElementById('view-invest');
  tabBtns.forEach(btn => btn.addEventListener('click', () => {{
    tabBtns.forEach(b => b.classList.toggle('active', b === btn));
    const isMarkets = btn.dataset.view === 'markets';
    viewMarkets.style.display = isMarkets ? '' : 'none';
    viewInvest.style.display = isMarkets ? 'none' : '';
  }}));

  // ---------- Markets-Tab ----------
  const marketPills = document.querySelectorAll('#pills-markets .pill');
  const marketHeadlines = document.querySelectorAll('#headlines-markets .headline');
  const globalIndicesSection = document.getElementById('global-indices-section');
  const globalIndexCards = globalIndicesSection.querySelectorAll('.ticker-card');
  const positionSections = document.querySelectorAll('.position-section[data-sector]');
  const moreBtn = document.getElementById('more-btn');
  let marketExpanded = false;
  let marketFilter = 'Alle';

  function applyMarketFilter() {{
    const hasPositions = [...positionSections].some(s => s.dataset.sector === marketFilter);

    globalIndicesSection.style.display = hasPositions ? 'none' : '';
    globalIndexCards.forEach(card => {{
      if (marketFilter === 'Alle') {{ card.classList.remove('dimmed'); return; }}
      const sectors = (card.dataset.sectors || '').split('|');
      card.classList.toggle('dimmed', !sectors.includes(marketFilter));
    }});

    positionSections.forEach(sec => {{
      sec.style.display = (sec.dataset.sector === marketFilter) ? '' : 'none';
    }});

    marketHeadlines.forEach((h, i) => {{
      const matches = (marketFilter === 'Alle') || (h.dataset.label === marketFilter);
      if (!matches) {{ h.style.display = 'none'; return; }}
      const hiddenByLimit = (marketFilter === 'Alle') && (i >= {MAX_VISIBLE}) && !marketExpanded;
      h.style.display = hiddenByLimit ? 'none' : '';
    }});
    if (moreBtn) {{
      moreBtn.style.display = (marketFilter === 'Alle' && !marketExpanded) ? 'block' : 'none';
    }}
    marketPills.forEach(p => p.classList.toggle('active', p.dataset.label === marketFilter));
  }}

  marketPills.forEach(p => p.addEventListener('click', () => {{
    marketFilter = p.dataset.label;
    marketExpanded = false;
    applyMarketFilter();
  }}));
  if (moreBtn) {{
    moreBtn.addEventListener('click', () => {{ marketExpanded = true; applyMarketFilter(); }});
  }}
  applyMarketFilter();

  // ---------- Invest-Tab ----------
  const investPills = document.querySelectorAll('#pills-invest .pill');
  const investHeadlines = document.querySelectorAll('#headlines-invest .headline');
  const etfCards = document.querySelectorAll('.etf-card');
  const investHoldingSections = document.querySelectorAll('.position-section[data-etf]');
  let investFilter = 'Alle';

  function applyInvestFilter() {{
    etfCards.forEach(card => {{
      card.classList.toggle('dimmed', investFilter !== 'Alle' && card.dataset.etf !== investFilter);
    }});
    investHoldingSections.forEach(sec => {{
      sec.style.display = (sec.dataset.etf === investFilter) ? '' : 'none';
    }});
    investHeadlines.forEach(h => {{
      const allowed = (investFilter === 'Alle') ? INVEST_LABELS : [investFilter];
      h.style.display = allowed.includes(h.dataset.label) ? '' : 'none';
    }});
    investPills.forEach(p => p.classList.toggle('active', p.dataset.label === investFilter));
  }}

  investPills.forEach(p => p.addEventListener('click', () => {{
    investFilter = p.dataset.label;
    applyInvestFilter();
  }}));
  applyInvestFilter();
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