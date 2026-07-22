# -----------------------------------------------------------------------
# Zentrale Konfiguration. Hier passt du an, was gesammelt wird.
# -----------------------------------------------------------------------

# Google-News-RSS-Suchen. "query" wird 1:1 in die Google-News-Suche gegeben.
# hl = Sprache der Ergebnisse, gl = Land, ceid = Land:Sprache (Google-Format)
NEWS_QUERIES = [
    {"label": "Fed / Makro", "query": "Federal Reserve CPI inflation report", "hl": "en-US", "gl": "US"},
    {"label": "Chips & AI", "query": "AI chip stocks Nvidia semiconductor capex", "hl": "en-US", "gl": "US"},
    {"label": "ETFs", "query": "ETF inflows outflows index fund", "hl": "en-US", "gl": "US"},
    {"label": "Healthcare", "query": "healthcare pharma stocks news", "hl": "en-US", "gl": "US"},
    {"label": "Rüstung", "query": "defense stocks military spending", "hl": "en-US", "gl": "US"},
    {"label": "Energie & Rohstoffe", "query": "oil price OPEC energy commodities", "hl": "en-US", "gl": "US"},
    {"label": "Konsumgüter", "query": "consumer goods retail sales stocks", "hl": "en-US", "gl": "US"},
    {"label": "Nasdaq", "query": "Nasdaq futures", "hl": "en-US", "gl": "US"},
    {"label": "S&P 500", "query": "S&P 500 futures", "hl": "en-US", "gl": "US"},
    {"label": "DAX", "query": "DAX Index", "hl": "de-DE", "gl": "DE"},
    {"label": "KOSPI", "query": "KOSPI index Korea", "hl": "en-US", "gl": "US"},
]

# Wie viele Schlagzeilen pro Suche maximal übernommen werden
MAX_ITEMS_PER_QUERY = 8

# Wie lange Schlagzeilen im Feed bleiben, bevor sie rausfallen (Tage)
RETENTION_DAYS = 4

# Ticker, gruppiert nach Anzeige-Sektion auf der Seite.
# "US-Futures (Vorboerse)" -> beantwortet: wie eroeffnet der Handelstag,
#   bleibt IMMER sichtbar, unabhaengig vom gewaehlten Sektor-Filter.
# "Globale Indizes" -> wird je nach gewaehltem Sektor-Filter eingeschraenkt
#   (siehe SECTOR_TICKER_MAP unten).
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
}

# Flaggen-Emoji neben den Index-Namen (nur "Globale Indizes"-Gruppe).
TICKER_FLAGS = {
    "S&P 500 (USA)": "🇺🇸",
    "DAX (Deutschland)": "🇩🇪",
    "Nikkei 225 (Japan)": "🇯🇵",
    "FTSE 100 (UK)": "🇬🇧",
    "KOSPI (Südkorea)": "🇰🇷",
    "Hang Seng (Hongkong)": "🇭🇰",
}

# Welche "Globale Indizes"-Ticker bei welchem Sektor-Filter eingeblendet
# bleiben. Ist ein Sektor hier NICHT gelistet oder die Liste leer, werden
# bei Auswahl dieses Sektors alle Indizes ausgeblendet.
# Das ist eine bewusst simple, manuell gepflegte Zuordnung (kein Datenfeed) -
# pass sie gerne an, wenn du anderer Meinung bist, welcher Index zu welchem
# Sektor gehoert (z.B. DAX bei Ruestung wegen Rheinmetall, FTSE bei Energie
# wegen Shell/BP, KOSPI/Hang Seng bei Chips wegen Samsung/SK Hynix/Tencent).
SECTOR_TICKER_MAP = {
    "Fed / Makro": ["S&P 500 (USA)"],
    "Chips & AI": ["S&P 500 (USA)", "KOSPI (Südkorea)", "Hang Seng (Hongkong)"],
    "ETFs": ["S&P 500 (USA)", "DAX (Deutschland)", "Nikkei 225 (Japan)",
             "FTSE 100 (UK)", "KOSPI (Südkorea)", "Hang Seng (Hongkong)"],
    "Healthcare": ["S&P 500 (USA)", "DAX (Deutschland)", "FTSE 100 (UK)"],
    "Rüstung": ["DAX (Deutschland)", "FTSE 100 (UK)", "S&P 500 (USA)"],
    "Energie & Rohstoffe": ["FTSE 100 (UK)", "S&P 500 (USA)", "Hang Seng (Hongkong)"],
    "Konsumgüter": ["DAX (Deutschland)", "Nikkei 225 (Japan)", "S&P 500 (USA)"],
    "Nasdaq": ["S&P 500 (USA)"],
    "S&P 500": ["S&P 500 (USA)"],
    "DAX": ["DAX (Deutschland)"],
    "KOSPI": ["KOSPI (Südkorea)"],
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
# die taeglich viele Artikel ohne echten Nachrichtenwert produzieren.
# Reine Wire-/Primaerquellen (Reuters, Bloomberg, CNBC, WSJ, Barron's,
# MarketWatch, Yahoo Finance, FAZ, Handelsblatt etc.) bleiben bewusst drin.
BLOCKED_SOURCES = [
    "motley fool", "seeking alpha", "tipranks", "benzinga", "tradingkey",
    "gurufocus", "smartkarma", "barchart.com", "stocktwits", "finviz",
    "24/7 wall st", "thestreet.com", "zacks",
]