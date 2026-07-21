# -----------------------------------------------------------------------
# Zentrale Konfiguration. Hier passt du an, was gesammelt wird.
# -----------------------------------------------------------------------

# Google-News-RSS-Suchen. "query" wird 1:1 in die Google-News-Suche gegeben.
# hl = Sprache der Ergebnisse, gl = Land, ceid = Land:Sprache (Google-Format)
NEWS_QUERIES = [
    {"label": "Oracle", "query": "Oracle Corp stock", "hl": "en-US", "gl": "US"},
    {"label": "Meta", "query": "Meta Platforms stock", "hl": "en-US", "gl": "US"},
    {"label": "Nasdaq", "query": "Nasdaq futures", "hl": "en-US", "gl": "US"},
    {"label": "S&P 500", "query": "S&P 500 futures", "hl": "en-US", "gl": "US"},
    {"label": "DAX", "query": "DAX Index", "hl": "de-DE", "gl": "DE"},
    {"label": "KOSPI", "query": "KOSPI index Korea", "hl": "en-US", "gl": "US"},
    {"label": "Fed / Makro", "query": "Federal Reserve CPI inflation report", "hl": "en-US", "gl": "US"},
    {"label": "AI-Sektor", "query": "AI chip stocks Nvidia CoreWeave capex", "hl": "en-US", "gl": "US"},
]

# Wie viele Schlagzeilen pro Suche maximal übernommen werden
MAX_ITEMS_PER_QUERY = 8

# Wie lange Schlagzeilen im Feed bleiben, bevor sie rausfallen (Tage)
RETENTION_DAYS = 4

# Yahoo-Finance-Ticker für die Kurs-/Futures-Übersicht oben auf der Seite
MARKET_TICKERS = {
    "Nasdaq Futures": "NQ=F",
    "S&P 500 Futures": "ES=F",
    "DAX": "^GDAXI",
    "KOSPI": "^KS11",
    "Oracle (ORCL)": "ORCL",
    "Meta (META)": "META",
}
