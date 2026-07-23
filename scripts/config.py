# -----------------------------------------------------------------------
# Zentrale Konfiguration. Hier passt du an, was gesammelt wird.
# -----------------------------------------------------------------------

# Google-News-RSS-Suchen. "query" wird 1:1 in die Google-News-Suche gegeben.
NEWS_QUERIES = [
    {"label": "Fed / Makro", "query": "Federal Reserve CPI inflation report", "hl": "en-US", "gl": "US"},
    {"label": "Chips & AI", "query": "AI chip stocks Nvidia semiconductor capex", "hl": "en-US", "gl": "US"},
    {"label": "Healthcare", "query": "healthcare pharma stocks news", "hl": "en-US", "gl": "US"},
    {"label": "Rüstung", "query": "defense stocks military spending", "hl": "en-US", "gl": "US"},
    {"label": "Energie & Rohstoffe", "query": "oil price OPEC energy commodities", "hl": "en-US", "gl": "US"},
    {"label": "Konsumgüter", "query": "consumer goods retail sales stocks", "hl": "en-US", "gl": "US"},
    {"label": "Nasdaq", "query": "Nasdaq futures", "hl": "en-US", "gl": "US"},
    {"label": "S&P 500", "query": "S&P 500 futures", "hl": "en-US", "gl": "US"},
    {"label": "DAX", "query": "DAX Index", "hl": "de-DE", "gl": "DE"},
    {"label": "KOSPI", "query": "KOSPI index Korea", "hl": "en-US", "gl": "US"},
    # Persoenliche ETFs (Invest-Tab). Google-News-RSS verlangt praktisch alle
    # Woerter der Query im selben Artikel (Leerzeichen = UND) - lange, generische
    # Ketten wie "MSCI ACWI global stocks market" trafen dadurch so gut wie nie.
    # Kurze, in echten Schlagzeilen haeufige Formulierungen liefern deutlich mehr Treffer.
    {"label": "Scalable MSCI ACWI", "query": "global stock markets", "hl": "en-US", "gl": "US"},
    {"label": "Amundi Stoxx Europe 600", "query": "European stock markets", "hl": "en-US", "gl": "US"},
    {"label": "iShares Global Clean Energy", "query": "clean energy stocks", "hl": "en-US", "gl": "US"},
]

MAX_ITEMS_PER_QUERY = 8
RETENTION_DAYS = 4

# Ticker, gruppiert nach Anzeige-Sektion im Markets-Tab.
# Futures sind nur relevant, solange die Kassaboerse (NYSE) geschlossen ist -
# siehe isUsMarketOpen() in app.js fuer die Anzeigelogik.
TICKER_GROUPS = {
    "Futures (Vorbörse)": {
        "Nasdaq Futures": "NQ=F",
        "S&P 500 Futures": "ES=F",
        "Dow Jones Futures": "YM=F",
        "Russell 2000 Futures": "RTY=F",
        "Nikkei 225 Futures": "NIY=F",
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

TICKER_FLAGS = {
    "S&P 500 (USA)": "🇺🇸",
    "DAX (Deutschland)": "🇩🇪",
    "Nikkei 225 (Japan)": "🇯🇵",
    "FTSE 100 (UK)": "🇬🇧",
    "KOSPI (Südkorea)": "🇰🇷",
    "Hang Seng (Hongkong)": "🇭🇰",
}

# Welche "Globale Indizes"-Ticker bei welchem Sektor-Filter eingeblendet
# bleiben (nur fuer Sektoren OHNE eigene Positionsliste, s. SECTOR_POSITIONS).
SECTOR_TICKER_MAP = {
    "Fed / Makro": ["S&P 500 (USA)"],
    "Nasdaq": ["S&P 500 (USA)"],
    "S&P 500": ["S&P 500 (USA)"],
    "DAX": ["DAX (Deutschland)"],
    "KOSPI": ["KOSPI (Südkorea)"],
}

# Reihenfolge der Sektor-Pillen im Markets-Tab. Fest, unabhaengig davon,
# ob gerade Schlagzeilen dazu vorliegen.
SECTOR_ORDER = [
    "Fed / Makro", "Chips & AI", "Healthcare", "Rüstung",
    "Energie & Rohstoffe", "Konsumgüter", "Nasdaq", "S&P 500", "DAX", "KOSPI",
]

# Top-20-Positionen je Sektor, angelehnt an den jeweils groessten/bekanntesten
# Sektor-ETF (Quelle: stockanalysis.com/marketbeat.com, Stand Jul 2026).
# Manuell gepflegt, kein Live-Feed - Zusammensetzung aendert sich nur langsam.
# Gewichtungen (fuer die Anzeige im Markets-Tab) stehen in SECTOR_WEIGHTS in
# app.js - hier nur die Ticker, da die Python-Seite die Gewichte nicht braucht.
SECTOR_POSITIONS = {
    "Chips & AI": ["NVDA", "TSM", "MU", "AMD", "INTC", "AVGO", "QCOM", "TXN", "LRCX", "KLAC",
                   "AMAT", "ASML", "ARM", "MRVL", "NXPI", "ADI", "ON", "MCHP", "MPWR", "SWKS"],  # ref: VanEck SMH
    "Healthcare": ["LLY", "JNJ", "ABBV", "MRK", "UNH", "AMGN", "TMO", "ABT", "GILD", "ISRG",
                   "PFE", "DHR", "BSX", "SYK", "VRTX", "BMY", "MDT", "CVS", "CI", "ELV"],  # ref: XLV
    "Rüstung": ["GE", "RTX", "BA", "HWM", "GD", "LHX", "TDG", "NOC", "LMT", "AXON",
                "TXT", "HEI", "CW", "TDY", "LDOS", "HII", "BWXT", "WWD", "KTOS", "MRCY"],  # ref: iShares ITA
    "Energie & Rohstoffe": ["XOM", "CVX", "COP", "EOG", "SLB", "WMB", "VLO", "PSX", "MPC", "BKR",
                            "KMI", "TRG", "OXY", "FANG", "EQT", "HAL", "DVN", "CTRA", "HES", "APA"],  # ref: XLE
    "Konsumgüter": ["WMT", "COST", "PG", "KO", "PM", "MDLZ", "PEP", "MO", "CL", "KR",
                    "SYY", "KMB", "KVUE", "MNST", "STZ", "GIS", "KDP", "HSY", "KHC", "CHD"],  # ref: XLP
}

# Deine 3 ETFs (Invest-Tab) mit ihren Top-10-Holdings (Stand Jul 2026,
# manuell recherchiert - Fondszusammensetzung aendert sich selten).
PERSONAL_ETFS = {
    "Scalable MSCI ACWI": ["NVDA", "AAPL", "MSFT", "AMZN", "GOOGL", "GOOG", "AVGO", "TSM", "META", "TSLA"],
    "Amundi Stoxx Europe 600": ["ASML.AS", "ROG.SW", "HSBA.L", "AZN.L", "NOVN.SW",
                                 "NESN.SW", "SIE.DE", "SHEL.L", "SAP.DE", "SAN.MC"],
    "iShares Global Clean Energy": ["NXT", "BE", "FSLR", "IBE.MC", "600900.SS",
                                     "ORA", "ENPH", "EQTL3.SA", "VWS.CO", "EDP.LS"],
}

# Ticker der ETFs selbst (fuer die Preis-Karten im Invest-Tab, "Alle"-Ansicht).
PERSONAL_ETF_TICKERS = {
    "Scalable MSCI ACWI": "SCWX.DE",
    "Amundi Stoxx Europe 600": "LYP6.DE",
    "iShares Global Clean Energy": "Q8Y0.DE",
}

# Anzeigenamen fuer alle Einzel-Ticker, die in SECTOR_POSITIONS oder
# PERSONAL_ETFS auftauchen (fuer die Kartenbeschriftung).
TICKER_NAMES = {
    "NVDA": "NVIDIA", "TSM": "Taiwan Semiconductor", "AVGO": "Broadcom",
    "ASML": "ASML Holding", "AMAT": "Applied Materials", "LRCX": "Lam Research",
    "INTC": "Intel", "MU": "Micron", "KLAC": "KLA Corp", "AMD": "AMD",
    "QCOM": "Qualcomm", "TXN": "Texas Instruments", "ARM": "Arm Holdings",
    "MRVL": "Marvell Technology", "NXPI": "NXP Semiconductors", "ADI": "Analog Devices",
    "ON": "ON Semiconductor", "MCHP": "Microchip Technology", "MPWR": "Monolithic Power Systems",
    "SWKS": "Skyworks Solutions",
    "LLY": "Eli Lilly", "JNJ": "Johnson & Johnson", "ABBV": "AbbVie",
    "UNH": "UnitedHealth", "MRK": "Merck", "TMO": "Thermo Fisher",
    "ABT": "Abbott Labs", "ISRG": "Intuitive Surgical", "PFE": "Pfizer", "DHR": "Danaher",
    "AMGN": "Amgen", "GILD": "Gilead Sciences", "BSX": "Boston Scientific", "SYK": "Stryker",
    "VRTX": "Vertex Pharmaceuticals", "BMY": "Bristol-Myers Squibb", "MDT": "Medtronic",
    "CVS": "CVS Health", "CI": "Cigna", "ELV": "Elevance Health",
    "GE": "GE Aerospace", "RTX": "RTX Corp", "BA": "Boeing", "NOC": "Northrop Grumman",
    "GD": "General Dynamics", "LHX": "L3Harris", "HWM": "Howmet Aerospace",
    "LMT": "Lockheed Martin", "AXON": "Axon Enterprise", "TDG": "TransDigm",
    "TXT": "Textron", "HEI": "HEICO", "CW": "Curtiss-Wright", "TDY": "Teledyne Technologies",
    "LDOS": "Leidos", "HII": "Huntington Ingalls Industries", "BWXT": "BWX Technologies",
    "WWD": "Woodward", "KTOS": "Kratos Defense", "MRCY": "Mercury Systems",
    "XOM": "ExxonMobil", "CVX": "Chevron", "COP": "ConocoPhillips", "SLB": "SLB",
    "WMB": "Williams Cos", "MPC": "Marathon Petroleum", "EOG": "EOG Resources",
    "VLO": "Valero Energy", "PSX": "Phillips 66", "KMI": "Kinder Morgan",
    "BKR": "Baker Hughes", "TRG": "Targa Resources", "OXY": "Occidental Petroleum",
    "FANG": "Diamondback Energy", "EQT": "EQT Corp", "HAL": "Halliburton",
    "DVN": "Devon Energy", "CTRA": "Coterra Energy", "HES": "Hess", "APA": "APA Corporation",
    "WMT": "Walmart", "COST": "Costco", "PG": "Procter & Gamble", "PM": "Philip Morris",
    "KO": "Coca-Cola", "MDLZ": "Mondelez", "MO": "Altria", "PEP": "PepsiCo",
    "CL": "Colgate-Palmolive", "MNST": "Monster Beverage",
    "KR": "Kroger", "SYY": "Sysco", "KMB": "Kimberly-Clark", "KVUE": "Kenvue",
    "STZ": "Constellation Brands", "GIS": "General Mills", "KDP": "Keurig Dr Pepper",
    "HSY": "Hershey", "KHC": "Kraft Heinz", "CHD": "Church & Dwight",
    "AAPL": "Apple", "MSFT": "Microsoft", "AMZN": "Amazon", "GOOGL": "Alphabet A",
    "GOOG": "Alphabet C", "META": "Meta Platforms", "TSLA": "Tesla",
    "ASML.AS": "ASML Holding", "ROG.SW": "Roche", "HSBA.L": "HSBC",
    "AZN.L": "AstraZeneca", "NOVN.SW": "Novartis", "NESN.SW": "Nestlé",
    "SIE.DE": "Siemens", "SHEL.L": "Shell", "SAP.DE": "SAP", "SAN.MC": "Banco Santander",
    "NXT": "Nextpower", "BE": "Bloom Energy", "FSLR": "First Solar",
    "IBE.MC": "Iberdrola", "600900.SS": "China Yangtze Power", "ORA": "Ormat Technologies",
    "ENPH": "Enphase Energy", "EQTL3.SA": "Equatorial Energia", "VWS.CO": "Vestas Wind",
    "EDP.LS": "EDP",
}

PRIORITY_KEYWORDS = [
    "fed", "federal reserve", "zinsen", "rate cut", "rate hike", "cpi",
    "inflation", "earnings", "quartalszahlen", "guidance", "prognose",
    "ceasefire", "krieg", "war", "hormuz", "circuit breaker", "crash",
    "einbruch", "capex", "export control", "chip ban", "downgrade",
    "upgrade", "bankruptcy", "insolvenz", "warnung", "profit warning",
]

BLOCKED_SOURCES = [
    "motley fool", "seeking alpha", "tipranks", "benzinga", "tradingkey",
    "gurufocus", "smartkarma", "barchart.com", "stocktwits", "finviz",
    "24/7 wall st", "thestreet.com", "zacks",
]