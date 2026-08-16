# -----------------------------------------------------------------------
# Zentrale Konfiguration. Hier passt du an, was gesammelt wird.
# -----------------------------------------------------------------------

# Google-News-RSS-Suchen. "query" wird 1:1 in die Google-News-Suche gegeben.
NEWS_QUERIES = [
    # Makro & Weltpolitik: alles was globale Maerkte bewegt - Zinsen, Inflation,
    # Geopolitik (Oel, Iran, Zoelle). Immer sichtbarer Block oben im Markets-Tab,
    # unabhaengig vom Sektor-Filter. Kurze Suchbegriffe, da Google-News-RSS
    # praktisch alle Woerter der Query im selben Artikel verlangt (Leerzeichen = UND).
    {"label": "Makro & Weltpolitik", "query": "Federal Reserve interest rate", "hl": "en-US", "gl": "US"},
    {"label": "Makro & Weltpolitik", "query": "US inflation CPI", "hl": "en-US", "gl": "US"},
    {"label": "Makro & Weltpolitik", "query": "ECB interest rate", "hl": "en-US", "gl": "US"},
    {"label": "Makro & Weltpolitik", "query": "China inflation CPI", "hl": "en-US", "gl": "US"},
    {"label": "Makro & Weltpolitik", "query": "Bank of Japan interest rate", "hl": "en-US", "gl": "US"},
    {"label": "Makro & Weltpolitik", "query": "oil price Iran", "hl": "en-US", "gl": "US"},
    {"label": "Makro & Weltpolitik", "query": "Trump tariffs markets", "hl": "en-US", "gl": "US"},
    {"label": "Makro & Weltpolitik", "query": "Treasury yields bond market", "hl": "en-US", "gl": "US"},
    {"label": "Chips & AI", "query": "AI chip stocks Nvidia semiconductor capex", "hl": "en-US", "gl": "US"},
    {"label": "Healthcare", "query": "healthcare pharma stocks news", "hl": "en-US", "gl": "US"},
    {"label": "Rüstung", "query": "defense stocks military spending", "hl": "en-US", "gl": "US"},
    {"label": "Energie & Rohstoffe", "query": "oil price OPEC energy commodities", "hl": "en-US", "gl": "US"},
    {"label": "Konsumgüter", "query": "consumer goods retail sales stocks", "hl": "en-US", "gl": "US"},
    # require_in_title: Google-News-RSS matcht auch auf den Volltext, nicht
    # nur den Titel - ein Artikel ueber "5 Aktien, die den DAX outperformt
    # haben" waere sonst als "DAX-News" einsortiert, obwohl er nicht wirklich
    # vom DAX handelt. Titel-Pflichtwort filtert solche Nur-Erwaehnt-Treffer raus.
    {"label": "Nasdaq", "query": "Nasdaq futures", "hl": "en-US", "gl": "US", "require_in_title": "nasdaq"},
    {"label": "S&P 500", "query": "S&P 500 futures", "hl": "en-US", "gl": "US", "require_in_title": "s&p 500"},
    {"label": "DAX", "query": "DAX Index", "hl": "de-DE", "gl": "DE", "require_in_title": "dax"},
    {"label": "KOSPI", "query": "KOSPI index Korea", "hl": "en-US", "gl": "US", "require_in_title": "kospi"},
]

MAX_ITEMS_PER_QUERY = 8
RETENTION_DAYS = 4

# Ticker, gruppiert nach Anzeige-Sektion im Markets-Tab.
# Futures sind nur relevant, solange die Kassaboerse (NYSE) geschlossen ist -
# siehe isUsMarketOpen() in app.js fuer die Anzeigelogik.
TICKER_GROUPS = {
    "Futures (Vorbörse)": {
        "Nasdaq-100 Futures": "NQ=F",  # NQ=F bildet den Nasdaq-100 ab, nicht den Composite
        "S&P 500 Futures": "ES=F",
        "Dow Jones Futures": "YM=F",
        "Russell 2000 Futures": "RTY=F",
        "Nikkei 225 Futures": "NIY=F",
    },
    # Reihenfolge bewusst an die Futures-Gruppe angelehnt (Nasdaq, S&P 500,
    # Nikkei zuerst - in der Reihenfolge, wie sie dort auftauchen), damit die
    # gleichen Maerkte in beiden Sektionen an vergleichbarer Position stehen.
    "Globale Indizes": {
        "Nasdaq Composite (USA)": "^IXIC",
        "S&P 500 (USA)": "^GSPC",
        "Nikkei 225 (Japan)": "^N225",
        "DAX (Deutschland)": "^GDAXI",
        "FTSE 100 (UK)": "^FTSE",
        "KOSPI (Südkorea)": "^KS11",
        "Hang Seng (Hongkong)": "^HSI",
    },
    # US-Staatsanleihen-Renditen als Makro-Barometer. Bewusst nur USA: fuer
    # Deutschland/UK/Japan gibt es bei Yahoo keine verlaesslichen Rendite-Ticker
    # (anders als bei Aktienindizes) - lieber ehrlich weglassen als geraten.
    "Anleihen (USA)": {
        "US 3-Monate": "^IRX",
        "US 5-Jahre": "^FVX",
        "US 10-Jahre": "^TNX",
        "US 30-Jahre": "^TYX",
    },
}

TICKER_FLAGS = {
    "S&P 500 (USA)": "🇺🇸",
    "Nasdaq Composite (USA)": "🇺🇸",
    "DAX (Deutschland)": "🇩🇪",
    "Nikkei 225 (Japan)": "🇯🇵",
    "FTSE 100 (UK)": "🇬🇧",
    "KOSPI (Südkorea)": "🇰🇷",
    "Hang Seng (Hongkong)": "🇭🇰",
    "US 3-Monate": "🇺🇸",
    "US 5-Jahre": "🇺🇸",
    "US 10-Jahre": "🇺🇸",
    "US 30-Jahre": "🇺🇸",
}

# Welche "Globale Indizes"-Ticker bei welchem Sektor-Filter eingeblendet
# bleiben (nur fuer Sektoren OHNE eigene Positionsliste, s. SECTOR_POSITIONS).
SECTOR_TICKER_MAP = {
    "Nasdaq": ["Nasdaq Composite (USA)"],
    "S&P 500": ["S&P 500 (USA)"],
    "DAX": ["DAX (Deutschland)"],
    "KOSPI": ["KOSPI (Südkorea)"],
}

# Reihenfolge der Sektor-Pillen im Markets-Tab. Fest, unabhaengig davon,
# ob gerade Schlagzeilen dazu vorliegen. "Fed / Makro" ist bewusst kein
# Sektor-Filter mehr (siehe app.js: eigener, immer sichtbarer News-Block
# oberhalb der Pillen statt Filter-Option).
SECTOR_ORDER = [
    "Chips & AI", "Healthcare", "Rüstung",
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

# Top-Holdings je Index-Filter (Nasdaq/S&P 500/DAX/KOSPI aus dem "Indizes"-
# Dropdown). Viel Ueberschneidung mit SECTOR_POSITIONS bei Nasdaq/S&P 500
# (US-Mega-Caps), DAX/KOSPI komplett eigene Ticker. Manuell gepflegt
# (Stand Jul 2026), Gewichte s. indexWeights in app.js.
INDEX_HOLDINGS = {
    "Nasdaq": ["NVDA", "AAPL", "MSFT", "AMZN", "AVGO", "GOOGL", "GOOG", "TSLA", "META", "COST",
               "NFLX", "PEP", "ADBE", "CSCO", "AMD", "TMUS", "INTU", "CMCSA", "TXN", "QCOM"],
    "S&P 500": ["NVDA", "AAPL", "MSFT", "AMZN", "META", "AVGO", "GOOGL", "GOOG", "TSLA", "BRK.B",
                "JPM", "LLY", "V", "UNH", "XOM", "WMT", "MA", "HD", "PG", "JNJ"],
    "DAX": ["SAP.DE", "SIE.DE", "ALV.DE", "DTE.DE", "AIR.DE", "MUV2.DE", "MBG.DE", "ENR.DE",
            "DB1.DE", "BAS.DE", "RHM.DE", "IFX.DE", "BAYN.DE", "VOW3.DE", "DBK.DE"],
    "KOSPI": ["005930.KS", "000660.KS", "373220.KS", "207940.KS", "005380.KS", "068270.KS",
              "035420.KS", "105560.KS", "055550.KS", "012330.KS", "051910.KS", "006400.KS",
              "028260.KS", "032830.KS", "018260.KS"],
}

# Anzeigenamen fuer alle Einzel-Ticker, die in SECTOR_POSITIONS oder
# INDEX_HOLDINGS auftauchen (fuer die Kartenbeschriftung).
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
    "SIE.DE": "Siemens", "SAP.DE": "SAP",
    # Neue Ticker aus INDEX_HOLDINGS (Nasdaq/S&P 500/DAX/KOSPI)
    "NFLX": "Netflix", "ADBE": "Adobe", "CSCO": "Cisco Systems", "TMUS": "T-Mobile US",
    "INTU": "Intuit", "CMCSA": "Comcast",
    "BRK.B": "Berkshire Hathaway", "JPM": "JPMorgan Chase", "V": "Visa", "MA": "Mastercard",
    "HD": "Home Depot",
    "ALV.DE": "Allianz", "DTE.DE": "Deutsche Telekom", "AIR.DE": "Airbus",
    "MUV2.DE": "Munich Re", "MBG.DE": "Mercedes-Benz Group", "ENR.DE": "Siemens Energy",
    "DB1.DE": "Deutsche Börse", "BAS.DE": "BASF", "RHM.DE": "Rheinmetall", "IFX.DE": "Infineon",
    "BAYN.DE": "Bayer", "VOW3.DE": "Volkswagen", "DBK.DE": "Deutsche Bank",
    "005930.KS": "Samsung Electronics", "000660.KS": "SK Hynix", "373220.KS": "LG Energy Solution",
    "207940.KS": "Samsung Biologics", "005380.KS": "Hyundai Motor", "068270.KS": "Celltrion",
    "035420.KS": "NAVER", "105560.KS": "KB Financial Group", "055550.KS": "Shinhan Financial Group",
    "012330.KS": "Hyundai Mobis", "051910.KS": "LG Chem", "006400.KS": "Samsung SDI",
    "028260.KS": "Samsung C&T", "032830.KS": "Samsung Life Insurance", "018260.KS": "Samsung SDS",
}

# GICS-Sektor (Standard-Marktklassifikation, 11 Sektoren) je Einzel-Ticker -
# unabhaengig von den 5 eigenen Themen-Sektoren oben (die bleiben als
# persoenliche Uebersicht/Navigation bestehen). Zeigt auf jeder Ticker-Karte
# als kleines Badge die tatsaechliche Branchenzugehoerigkeit, z.B. dass im
# eigenen "Ruestung"-Sektor Teledyne (TDY) eigentlich Information Technology
# ist. Manuell klassifiziert nach GICS-Konvention (Stand Aug 2026).
GICS_SECTORS = {
    # --- Chips & AI (alle Information Technology / Halbleiter) ---
    "NVDA": "Information Technology", "TSM": "Information Technology", "MU": "Information Technology",
    "AMD": "Information Technology", "INTC": "Information Technology", "AVGO": "Information Technology",
    "QCOM": "Information Technology", "TXN": "Information Technology", "LRCX": "Information Technology",
    "KLAC": "Information Technology", "AMAT": "Information Technology", "ASML": "Information Technology",
    "ARM": "Information Technology", "MRVL": "Information Technology", "NXPI": "Information Technology",
    "ADI": "Information Technology", "ON": "Information Technology", "MCHP": "Information Technology",
    "MPWR": "Information Technology", "SWKS": "Information Technology",

    # --- Healthcare (alle Health Care) ---
    "LLY": "Health Care", "JNJ": "Health Care", "ABBV": "Health Care", "MRK": "Health Care",
    "UNH": "Health Care", "AMGN": "Health Care", "TMO": "Health Care", "ABT": "Health Care",
    "GILD": "Health Care", "ISRG": "Health Care", "PFE": "Health Care", "DHR": "Health Care",
    "BSX": "Health Care", "SYK": "Health Care", "VRTX": "Health Care", "BMY": "Health Care",
    "MDT": "Health Care", "CVS": "Health Care", "CI": "Health Care", "ELV": "Health Care",

    # --- Ruestung (ueberwiegend Industrials, TDY ist Info Tech - Teledynes
    #     Elektronik-/Messtechnik-Geschaeft ueberwiegt das Verteidigungsgeschaeft) ---
    "GE": "Industrials", "RTX": "Industrials", "BA": "Industrials", "HWM": "Industrials",
    "GD": "Industrials", "LHX": "Industrials", "TDG": "Industrials", "NOC": "Industrials",
    "LMT": "Industrials", "AXON": "Industrials", "TXT": "Industrials", "HEI": "Industrials",
    "CW": "Industrials", "TDY": "Information Technology", "LDOS": "Industrials", "HII": "Industrials",
    "BWXT": "Industrials", "WWD": "Industrials", "KTOS": "Industrials", "MRCY": "Industrials",

    # --- Energie & Rohstoffe (alle Energy) ---
    "XOM": "Energy", "CVX": "Energy", "COP": "Energy", "EOG": "Energy", "SLB": "Energy",
    "WMB": "Energy", "VLO": "Energy", "PSX": "Energy", "MPC": "Energy", "BKR": "Energy",
    "KMI": "Energy", "TRG": "Energy", "OXY": "Energy", "FANG": "Energy", "EQT": "Energy",
    "HAL": "Energy", "DVN": "Energy", "CTRA": "Energy", "HES": "Energy", "APA": "Energy",

    # --- Konsumgueter (alle Consumer Staples) ---
    "WMT": "Consumer Staples", "COST": "Consumer Staples", "PG": "Consumer Staples", "KO": "Consumer Staples",
    "PM": "Consumer Staples", "MDLZ": "Consumer Staples", "PEP": "Consumer Staples", "MO": "Consumer Staples",
    "CL": "Consumer Staples", "KR": "Consumer Staples", "SYY": "Consumer Staples", "KMB": "Consumer Staples",
    "KVUE": "Consumer Staples", "MNST": "Consumer Staples", "STZ": "Consumer Staples", "GIS": "Consumer Staples",
    "KDP": "Consumer Staples", "HSY": "Consumer Staples", "KHC": "Consumer Staples", "CHD": "Consumer Staples",

    # --- Nasdaq/S&P 500 zusaetzliche Holdings ---
    "AAPL": "Information Technology", "MSFT": "Information Technology", "AMZN": "Consumer Discretionary",
    "GOOGL": "Communication Services", "GOOG": "Communication Services", "TSLA": "Consumer Discretionary",
    "META": "Communication Services", "NFLX": "Communication Services", "ADBE": "Information Technology",
    "CSCO": "Information Technology", "TMUS": "Communication Services", "INTU": "Information Technology",
    "CMCSA": "Communication Services",
    "BRK.B": "Financials", "JPM": "Financials", "V": "Financials", "MA": "Financials", "HD": "Consumer Discretionary",

    # --- DAX-Holdings ---
    "SAP.DE": "Information Technology", "SIE.DE": "Industrials", "ALV.DE": "Financials",
    "DTE.DE": "Communication Services", "AIR.DE": "Industrials", "MUV2.DE": "Financials",
    "MBG.DE": "Consumer Discretionary", "ENR.DE": "Industrials", "DB1.DE": "Financials",
    "BAS.DE": "Materials", "RHM.DE": "Industrials", "IFX.DE": "Information Technology",
    "BAYN.DE": "Health Care", "VOW3.DE": "Consumer Discretionary", "DBK.DE": "Financials",

    # --- KOSPI-Holdings ---
    "005930.KS": "Information Technology", "000660.KS": "Information Technology",
    "373220.KS": "Industrials", "207940.KS": "Health Care", "005380.KS": "Consumer Discretionary",
    "068270.KS": "Health Care", "035420.KS": "Communication Services", "105560.KS": "Financials",
    "055550.KS": "Financials", "012330.KS": "Consumer Discretionary", "051910.KS": "Materials",
    "006400.KS": "Information Technology", "028260.KS": "Industrials", "032830.KS": "Financials",
    "018260.KS": "Information Technology",
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
    # Harte Bezahlschranke - Artikel nach 1-2 Saetzen abgeschnitten, ohne
    # Abo nicht lesbar. Lieber ganz weglassen als einen Teaser verlinken.
    "welt", "faz.net", "handelsblatt", "wiwo.de", "wirtschaftswoche",
    "sueddeutsche", "bild.de", "wsj.com", "the wall street journal",
    "ft.com", "financial times", "barron's", "barrons.com",
    "the economist", "new york times", "washington post", "the times",
    "the telegraph", "investor's business daily",
]