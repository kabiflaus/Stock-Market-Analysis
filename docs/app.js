// -----------------------------------------------------------------------
// Struktur-Konfiguration. Aendert sich selten - nur anfassen wenn du
// Sektoren/ETFs/Ticker-Zuordnungen aendern willst. Aktuelle Kurse/News
// kommen separat aus data/headlines.json + data/market.json.
// -----------------------------------------------------------------------
const CONFIG = {
  "tickerGroups": {
    "US-Futures (Vorbörse)": {
      "Nasdaq Futures": "NQ=F",
      "S&P 500 Futures": "ES=F"
    },
    "Globale Indizes": {
      "S&P 500 (USA)": "^GSPC",
      "DAX (Deutschland)": "^GDAXI",
      "Nikkei 225 (Japan)": "^N225",
      "FTSE 100 (UK)": "^FTSE",
      "KOSPI (Südkorea)": "^KS11",
      "Hang Seng (Hongkong)": "^HSI"
    }
  },
  "tickerFlags": {
    "S&P 500 (USA)": "🇺🇸",
    "DAX (Deutschland)": "🇩🇪",
    "Nikkei 225 (Japan)": "🇯🇵",
    "FTSE 100 (UK)": "🇬🇧",
    "KOSPI (Südkorea)": "🇰🇷",
    "Hang Seng (Hongkong)": "🇭🇰"
  },
  "sectorTickerMap": {
    "Fed / Makro": [
      "S&P 500 (USA)"
    ],
    "ETFs": [
      "S&P 500 (USA)",
      "DAX (Deutschland)",
      "Nikkei 225 (Japan)",
      "FTSE 100 (UK)",
      "KOSPI (Südkorea)",
      "Hang Seng (Hongkong)"
    ],
    "Nasdaq": [
      "S&P 500 (USA)"
    ],
    "S&P 500": [
      "S&P 500 (USA)"
    ],
    "DAX": [
      "DAX (Deutschland)"
    ],
    "KOSPI": [
      "KOSPI (Südkorea)"
    ]
  },
  "sectorOrder": [
    "Fed / Makro",
    "Chips & AI",
    "ETFs",
    "Healthcare",
    "Rüstung",
    "Energie & Rohstoffe",
    "Konsumgüter",
    "Nasdaq",
    "S&P 500",
    "DAX",
    "KOSPI"
  ],
  "sectorPositions": {
    "Chips & AI": [
      "NVDA",
      "TSM",
      "AVGO",
      "ASML",
      "AMAT",
      "LRCX",
      "INTC",
      "MU",
      "KLAC",
      "AMD"
    ],
    "Healthcare": [
      "LLY",
      "JNJ",
      "ABBV",
      "UNH",
      "MRK",
      "TMO",
      "ABT",
      "ISRG",
      "PFE",
      "DHR"
    ],
    "Rüstung": [
      "GE",
      "RTX",
      "BA",
      "NOC",
      "GD",
      "LHX",
      "HWM",
      "LMT",
      "AXON",
      "TDG"
    ],
    "Energie & Rohstoffe": [
      "XOM",
      "CVX",
      "COP",
      "SLB",
      "WMB",
      "MPC",
      "EOG",
      "VLO",
      "PSX",
      "KMI"
    ],
    "Konsumgüter": [
      "WMT",
      "COST",
      "PG",
      "PM",
      "KO",
      "MDLZ",
      "MO",
      "PEP",
      "CL",
      "MNST"
    ]
  },
  "personalEtfs": {
    "Scalable MSCI ACWI": [
      "NVDA",
      "AAPL",
      "MSFT",
      "AMZN",
      "GOOGL",
      "GOOG",
      "AVGO",
      "TSM",
      "META",
      "TSLA"
    ],
    "Amundi Stoxx Europe 600": [
      "ASML.AS",
      "ROG.SW",
      "HSBA.L",
      "AZN.L",
      "NOVN.SW",
      "NESN.SW",
      "SIE.DE",
      "SHEL.L",
      "SAP.DE",
      "SAN.MC"
    ],
    "iShares Global Clean Energy": [
      "NXT",
      "BE",
      "FSLR",
      "IBE.MC",
      "600900.SS",
      "ORA",
      "ENPH",
      "EQTL3.SA",
      "VWS.CO",
      "EDP.LS"
    ]
  },
  "personalEtfTickers": {
    "Scalable MSCI ACWI": "SCWX.DE",
    "Amundi Stoxx Europe 600": "LYP6.DE",
    "iShares Global Clean Energy": "Q8Y0.DE"
  },
  "tickerNames": {
    "NVDA": "NVIDIA",
    "TSM": "Taiwan Semiconductor",
    "AVGO": "Broadcom",
    "ASML": "ASML Holding",
    "AMAT": "Applied Materials",
    "LRCX": "Lam Research",
    "INTC": "Intel",
    "MU": "Micron",
    "KLAC": "KLA Corp",
    "AMD": "AMD",
    "LLY": "Eli Lilly",
    "JNJ": "Johnson & Johnson",
    "ABBV": "AbbVie",
    "UNH": "UnitedHealth",
    "MRK": "Merck",
    "TMO": "Thermo Fisher",
    "ABT": "Abbott Labs",
    "ISRG": "Intuitive Surgical",
    "PFE": "Pfizer",
    "DHR": "Danaher",
    "GE": "GE Aerospace",
    "RTX": "RTX Corp",
    "BA": "Boeing",
    "NOC": "Northrop Grumman",
    "GD": "General Dynamics",
    "LHX": "L3Harris",
    "HWM": "Howmet Aerospace",
    "LMT": "Lockheed Martin",
    "AXON": "Axon Enterprise",
    "TDG": "TransDigm",
    "XOM": "ExxonMobil",
    "CVX": "Chevron",
    "COP": "ConocoPhillips",
    "SLB": "SLB",
    "WMB": "Williams Cos",
    "MPC": "Marathon Petroleum",
    "EOG": "EOG Resources",
    "VLO": "Valero Energy",
    "PSX": "Phillips 66",
    "KMI": "Kinder Morgan",
    "WMT": "Walmart",
    "COST": "Costco",
    "PG": "Procter & Gamble",
    "PM": "Philip Morris",
    "KO": "Coca-Cola",
    "MDLZ": "Mondelez",
    "MO": "Altria",
    "PEP": "PepsiCo",
    "CL": "Colgate-Palmolive",
    "MNST": "Monster Beverage",
    "AAPL": "Apple",
    "MSFT": "Microsoft",
    "AMZN": "Amazon",
    "GOOGL": "Alphabet A",
    "GOOG": "Alphabet C",
    "META": "Meta Platforms",
    "TSLA": "Tesla",
    "ASML.AS": "ASML Holding",
    "ROG.SW": "Roche",
    "HSBA.L": "HSBC",
    "AZN.L": "AstraZeneca",
    "NOVN.SW": "Novartis",
    "NESN.SW": "Nestlé",
    "SIE.DE": "Siemens",
    "SHEL.L": "Shell",
    "SAP.DE": "SAP",
    "SAN.MC": "Banco Santander",
    "NXT": "Nextpower",
    "BE": "Bloom Energy",
    "FSLR": "First Solar",
    "IBE.MC": "Iberdrola",
    "600900.SS": "China Yangtze Power",
    "ORA": "Ormat Technologies",
    "ENPH": "Enphase Energy",
    "EQTL3.SA": "Equatorial Energia",
    "VWS.CO": "Vestas Wind",
    "EDP.LS": "EDP"
  },
  "priorityKeywords": [
    "fed",
    "federal reserve",
    "zinsen",
    "rate cut",
    "rate hike",
    "cpi",
    "inflation",
    "earnings",
    "quartalszahlen",
    "guidance",
    "prognose",
    "ceasefire",
    "krieg",
    "war",
    "hormuz",
    "circuit breaker",
    "crash",
    "einbruch",
    "capex",
    "export control",
    "chip ban",
    "downgrade",
    "upgrade",
    "bankruptcy",
    "insolvenz",
    "warnung",
    "profit warning"
  ],
  "indexPills": [
    "Nasdaq",
    "S&P 500",
    "DAX",
    "KOSPI"
  ]
};

const MAX_VISIBLE = 10;
const NEUTRAL_THRESHOLD = 0.1; // Prozent - darunter gilt ein Ticker als "neutral" (gelb)

// ---------- Hilfsfunktionen ----------
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function fmtTime(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit',
    hour: '2-digit', minute: '2-digit',
  }).replace(',', '');
}

function isPriority(title) {
  const t = title.toLowerCase();
  return CONFIG.priorityKeywords.some(kw => t.includes(kw));
}

// Richtung + Pfeil-Icon anhand von NEUTRAL_THRESHOLD bestimmen
function direction(change) {
  if (change === undefined || change === null) return { cls: 'neutral', arrow: '–' };
  if (change > NEUTRAL_THRESHOLD) return { cls: 'up', arrow: '▲' };
  if (change < -NEUTRAL_THRESHOLD) return { cls: 'down', arrow: '▼' };
  return { cls: 'neutral', arrow: '▶' };
}

function priceCardHtml(label, row, flag, extraAttrs) {
  row = row || {};
  const change = row.change_pct;
  let changeHtml;
  if (change === undefined || change === null) {
    changeHtml = '<span class="chg neutral">n/a</span>';
  } else {
    const dir = direction(change);
    const sign = change > 0 ? '+' : '';
    changeHtml = '<span class="chg ' + dir.cls + '"><span class="arrow">' + dir.arrow + '</span>' + sign + change + '%</span>';
  }
  const priceStr = (row.price !== undefined && row.price !== null)
    ? row.price.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    : 'n/a';
  const prefix = flag ? flag + ' ' : '';
  return '<div class="ticker-card"' + (extraAttrs || '') + '>' +
    '<div class="ticker-label">' + prefix + esc(label) + '</div>' +
    '<div class="ticker-price">' + priceStr + '</div>' +
    changeHtml +
    '</div>';
}

// ---------- Rendering: Markets-Tab ----------
function renderMarketPills() {
  // "Alle" separat/abgesetzt oben
  document.getElementById('pill-alle-markets').outerHTML =
    '<button class="pill pill-all active" id="pill-alle-markets" data-label="Alle">Alle</button>';

  // Sektor-Pillen ohne die 4 reinen Index-Pillen (die wandern ins "Indizes"-Dropdown)
  const indexPills = new Set(CONFIG.indexPills);
  let html = '';
  CONFIG.sectorOrder.forEach(label => {
    if (indexPills.has(label)) return;
    html += '<button class="pill" data-label="' + esc(label) + '">' + esc(label) + '</button>';
  });
  // "Indizes"-Dropdown-Button + Untermenü
  html += '<div class="dropdown" id="indizes-dropdown">' +
    '<button class="pill" id="indizes-toggle">Indizes ▾</button>' +
    '<div class="dropdown-menu">' +
    CONFIG.indexPills.map(label =>
      '<button class="pill" data-label="' + esc(label) + '">' + esc(label) + '</button>'
    ).join('') +
    '</div></div>';
  document.getElementById('pills-markets-sectors').innerHTML = html;
}

function renderFutures(rowsByLabel) {
  const cards = Object.keys(CONFIG.tickerGroups['US-Futures (Vorbörse)']).map(label =>
    priceCardHtml(label, rowsByLabel[label])
  );
  document.querySelector('#futures-section .tickers').innerHTML = cards.join('');
}

function renderGlobalIndices(rowsByLabel) {
  const cards = Object.keys(CONFIG.tickerGroups['Globale Indizes']).map(label => {
    const relevantFor = Object.keys(CONFIG.sectorTickerMap).filter(
      sector => CONFIG.sectorTickerMap[sector].includes(label)
    );
    const attr = ' data-sectors="' + esc(relevantFor.join('|')) + '"';
    return priceCardHtml(label, rowsByLabel[label], CONFIG.tickerFlags[label] || '', attr);
  });
  document.querySelector('#global-indices-section .tickers').innerHTML = cards.join('');
}

function renderPositionSections(rowsByLabel) {
  const container = document.getElementById('position-sections');
  let html = '';
  Object.keys(CONFIG.sectorPositions).forEach(sector => {
    const tickers = CONFIG.sectorPositions[sector];
    const cards = tickers.map(t => priceCardHtml((CONFIG.tickerNames[t] || t) + ' (' + t + ')', rowsByLabel[t]));
    html += '<div class="section position-section" data-sector="' + esc(sector) + '" style="display:none">' +
      '<h2>' + esc(sector) + ' – Top ' + tickers.length + '</h2>' +
      '<div class="tickers">' + cards.join('') + '</div></div>';
  });
  container.innerHTML = html;
}

function renderMarketHeadlines(headlines) {
  const investLabels = new Set(Object.keys(CONFIG.personalEtfs));
  const marketHeadlines = headlines.filter(h => !investLabels.has(h.label));
  const html = marketHeadlines.map((h, i) => headlineHtml(h, i, MAX_VISIBLE)).join('');
  document.getElementById('headlines-markets').innerHTML = html || '<p>Noch keine Schlagzeilen gesammelt.</p>';
  document.getElementById('more-btn').style.display = marketHeadlines.length > MAX_VISIBLE ? 'block' : 'none';
  return marketHeadlines;
}

function headlineHtml(item, index, maxVisible) {
  const extraClass = (maxVisible !== null && index >= maxVisible) ? ' extra' : '';
  const badge = isPriority(item.title) ? '<span class="badge">Wichtig</span>' : '';
  return '<div class="headline' + extraClass + '" data-label="' + esc(item.label) + '">' +
    '<span class="tag">' + esc(item.label) + '</span>' + badge +
    '<a href="' + item.link + '" target="_blank" rel="noopener">' + esc(item.title) + '</a>' +
    '<div class="meta">' + esc(item.source || '') + ' &middot; ' + fmtTime(item.published) + '</div>' +
    '</div>';
}

// ---------- Rendering: Invest-Tab ----------
function renderEtfCards(rowsByLabel) {
  const html = Object.keys(CONFIG.personalEtfs).map(name => {
    const ticker = CONFIG.personalEtfTickers[name];
    const row = rowsByLabel[name] || {};
    return priceCardHtml(name, row, '', ' data-etf="' + esc(name) + '"').replace(
      'class="ticker-card"', 'class="ticker-card etf-card"'
    );
  }).join('');
  document.querySelector('#invest-etf-section .tickers').innerHTML = html;
}

function renderInvestHoldings(rowsByLabel) {
  const container = document.getElementById('invest-holdings');
  let html = '';
  Object.keys(CONFIG.personalEtfs).forEach(name => {
    const tickers = CONFIG.personalEtfs[name];
    const cards = tickers.map(t => priceCardHtml((CONFIG.tickerNames[t] || t) + ' (' + t + ')', rowsByLabel[t]));
    html += '<div class="section position-section" data-etf="' + esc(name) + '" style="display:none">' +
      '<h2>' + esc(name) + ' – Top ' + tickers.length + '</h2>' +
      '<div class="tickers">' + cards.join('') + '</div></div>';
  });
  container.innerHTML = html;
}

function renderInvestHeadlines(headlines) {
  const investLabels = new Set(Object.keys(CONFIG.personalEtfs));
  const investHeadlines = headlines.filter(h => investLabels.has(h.label));
  const html = investHeadlines.map((h, i) => headlineHtml(h, i, null)).join('');
  document.getElementById('headlines-invest').innerHTML = html || '<p>Noch keine Schlagzeilen zu deinen ETFs gesammelt.</p>';
}

// ---------- Interaktion: Tabs ----------
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const viewMarkets = document.getElementById('view-markets');
  const viewInvest = document.getElementById('view-invest');
  tabBtns.forEach(btn => btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.toggle('active', b === btn));
    const isMarkets = btn.dataset.view === 'markets';
    viewMarkets.style.display = isMarkets ? '' : 'none';
    viewInvest.style.display = isMarkets ? 'none' : '';
  }));
}

// ---------- Interaktion: Markets-Filter ----------
function setupMarketFilter() {
  const pillsContainer = document.getElementById('pills-markets');
  const headlines = document.querySelectorAll('#headlines-markets .headline');
  const futuresSection = document.getElementById('futures-section');
  const globalSection = document.getElementById('global-indices-section');
  const globalCards = globalSection.querySelectorAll('.ticker-card');
  const positionSections = document.querySelectorAll('.position-section[data-sector]');
  const moreBtn = document.getElementById('more-btn');
  const dropdown = document.getElementById('indizes-dropdown');
  let expanded = false;
  let filter = 'Alle';

  function apply() {
    const hasPositions = [...positionSections].some(s => s.dataset.sector === filter);
    globalSection.style.display = hasPositions ? 'none' : '';
    futuresSection.style.display = hasPositions ? 'none' : '';
    globalCards.forEach(card => {
      if (filter === 'Alle') { card.classList.remove('dimmed'); return; }
      const sectors = (card.dataset.sectors || '').split('|');
      card.classList.toggle('dimmed', !sectors.includes(filter));
    });
    positionSections.forEach(sec => {
      sec.style.display = (sec.dataset.sector === filter) ? '' : 'none';
    });
    headlines.forEach((h, i) => {
      const matches = (filter === 'Alle') || (h.dataset.label === filter);
      if (!matches) { h.style.display = 'none'; return; }
      const hiddenByLimit = (filter === 'Alle') && (i >= MAX_VISIBLE) && !expanded;
      h.style.display = hiddenByLimit ? 'none' : '';
    });
    if (moreBtn) moreBtn.style.display = (filter === 'Alle' && !expanded && headlines.length > MAX_VISIBLE) ? 'block' : 'none';
    pillsContainer.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.label === filter));
    dropdown.classList.remove('open');
  }

  // Delegierter Klick-Handler, da die "Indizes"-Untermenue-Pillen dynamisch sind
  pillsContainer.addEventListener('click', (e) => {
    const toggle = e.target.closest('#indizes-toggle');
    if (toggle) { dropdown.classList.toggle('open'); return; }
    const pill = e.target.closest('.pill[data-label]');
    if (!pill) return;
    filter = pill.dataset.label;
    expanded = false;
    apply();
  });

  if (moreBtn) moreBtn.addEventListener('click', () => { expanded = true; apply(); });
  apply();
}

// ---------- Interaktion: Invest-Filter ----------
function setupInvestFilter() {
  const resetBtn = document.getElementById('invest-alle-btn');
  const headlines = document.querySelectorAll('#headlines-invest .headline');
  const etfCards = document.querySelectorAll('.etf-card');
  const holdingSections = document.querySelectorAll('.position-section[data-etf]');
  const investLabels = Object.keys(CONFIG.personalEtfs);
  let filter = 'Alle';

  function apply() {
    etfCards.forEach(card => card.classList.toggle('dimmed', filter !== 'Alle' && card.dataset.etf !== filter));
    holdingSections.forEach(sec => { sec.style.display = (sec.dataset.etf === filter) ? '' : 'none'; });
    headlines.forEach(h => {
      const allowed = (filter === 'Alle') ? investLabels : [filter];
      h.style.display = allowed.includes(h.dataset.label) ? '' : 'none';
    });
    resetBtn.classList.toggle('active', filter === 'Alle');
  }

  etfCards.forEach(card => card.addEventListener('click', () => {
    filter = (filter === card.dataset.etf) ? 'Alle' : card.dataset.etf; // erneutes Antippen = zurueck zu Alle
    apply();
  }));
  resetBtn.addEventListener('click', () => { filter = 'Alle'; apply(); });
  apply();
}

// ---------- Start ----------
async function init() {
  renderMarketPills();

  let headlines = [];
  let market = { fetched_at: null, rows: [] };
  try {
    const [hRes, mRes] = await Promise.all([
      fetch('data/headlines.json?t=' + Date.now()),
      fetch('data/market.json?t=' + Date.now()),
    ]);
    headlines = await hRes.json();
    market = await mRes.json();
  } catch (e) {
    console.error('Fehler beim Laden der Daten:', e);
  }

  headlines.sort((a, b) => new Date(b.published) - new Date(a.published));
  const rowsByLabel = {};
  (market.rows || []).forEach(r => { rowsByLabel[r.label] = r; });

  renderFutures(rowsByLabel);
  renderGlobalIndices(rowsByLabel);
  renderPositionSections(rowsByLabel);
  renderEtfCards(rowsByLabel);
  renderInvestHoldings(rowsByLabel);
  renderMarketHeadlines(headlines);
  renderInvestHeadlines(headlines);

  document.getElementById('updated-line').textContent =
    'Kurse zuletzt: ' + (market.fetched_at ? fmtTime(market.fetched_at) : 'n/a');

  setupTabs();
  setupMarketFilter();
  setupInvestFilter();
}

init();
