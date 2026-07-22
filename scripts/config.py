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
    {"label": "Chips & AI", "query": "AI chip stocks Nvidia semiconductor capex", "hl": "en-US", "gl": "US"},
    {"label": "ETFs", "query": "ETF inflows outflows index fund", "hl": "en-US", "gl": "US"},
    {"label": "Healthcare", "query": "healthcare pharma stocks news", "hl": "en-US", "gl": "US"},
    {"label": "Rüstung", "query": "defense stocks military spending", "hl": "en-US", "gl": "US"},
    {"label": "Energie & Rohstoffe", "query": "oil price OPEC energy commodities", "hl": "en-US", "gl": "US"},
]

# Wie viele Schlagzeilen pro Suche maximal übernommen werden
MAX_ITEMS_PER_QUERY = 8

# Wie lange Schlagzeilen im Feed bleiben, bevor sie rausfallen (Tage)
RETENTION_DAYS = 4

# Ticker, gruppiert nach Anzeige-Sektion auf der Seite.
# "US-Futures (Vorboerse)"  -> beantwortet: wie eroeffnet der Handelstag
# "Globale Indizes"          -> ein Leitindex pro grossem Markt
# "Deine Positionen"         -> deine aktiven Short-Positionen
TICKER_GROUPS = {
    "US-Futures (Vorbörse)": {
        "Nasdaq Futures": "NQ=F",
        "S&P 500 Futures": "ES=F",
    },
    "Globale Indizes": {
        "S&P 500 (USA)": "^GSPC",
        "DAX (Deutschland)": "^GDAXI",
        "Nikkei 225 (Japan)": "^N225",
        "FTSE 100 (UK)": "^FTSE",
        "KOSPI (Südkorea)": "^KS11",
        "Hang Seng (Hongkong)": "^HSI",
    },
    "Deine Positionen": {
        "Oracle (ORCL)": "ORCL",
        "Meta (META)": "META",
    },
}

# Schlagzeilen, die eines dieser Woerter enthalten, bekommen ein "Wichtig"-
# Badge. Case-insensitive, reiner Substring-Match - bewusst simpel, kein NLP.
PRIORITY_KEYWORDS = [
    "fed", "federal reserve", "zinsen", "rate cut", "rate hike", "cpi",
    "inflation", "earnings", "quartalszahlen", "guidance", "prognose",
    "ceasefire", "krieg", "war", "hormuz", "circuit breaker", "crash",
    "einbruch", "capex", "export control", "chip ban", "downgrade",
    "upgrade", "bankruptcy", "insolvenz", "warnung", "profit warning",
]

# Quellen, die rausgefiltert werden (case-insensitive Substring-Match auf
# das "source"-Feld). Das sind ueberwiegend SEO-/Meinungs-Content-Muehlen,
# die bei populaeren Einzelaktien (Oracle, Meta) taeglich viele Artikel
# ohne echten Nachrichtenwert produzieren und dadurch den zeitlich
# sortierten Feed dominieren. Reine Wire-/Primaerquellen (Reuters, Bloomberg,
# CNBC, WSJ, Barron's, MarketWatch, Yahoo Finance, FAZ, Handelsblatt etc.)
# bleiben bewusst drin.
BLOCKED_SOURCES = [
    "motley fool", "seeking alpha", "tipranks", "benzinga", "tradingkey",
    "gurufocus", "smartkarma", "barchart.com", "stocktwits", "finviz",
    "24/7 wall st", "thestreet.com", "zacks",
]