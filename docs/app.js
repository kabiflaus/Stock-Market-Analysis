// -----------------------------------------------------------------------
// Struktur-Konfiguration. Aendert sich selten - nur anfassen wenn du
// Sektoren/ETFs/Ticker-Zuordnungen aendern willst. Aktuelle Kurse/News
// kommen separat aus data/headlines.json + data/market.json.
// -----------------------------------------------------------------------
const CONFIG = {
  "tickerGroups": {
    "Futures (Vorbörse)": {
      "Nasdaq-100 Futures": "NQ=F",
      "S&P 500 Futures": "ES=F",
      "Dow Jones Futures": "YM=F",
      "Russell 2000 Futures": "RTY=F",
      "Nikkei 225 Futures": "NIY=F"
    },
    "Makro-Barometer": {
      "VIX (Volatilität)": "^VIX",
      "Gold": "GC=F",
      "Öl (WTI)": "CL=F",
      "Dollar-Index": "DX-Y.NYB"
    },
    "Globale Indizes": {
      "Nasdaq Composite (USA)": "^IXIC",
      "S&P 500 (USA)": "^GSPC",
      "Nikkei 225 (Japan)": "^N225",
      "DAX (Deutschland)": "^GDAXI",
      "FTSE 100 (UK)": "^FTSE",
      "KOSPI (Südkorea)": "^KS11",
      "Hang Seng (Hongkong)": "^HSI"
    },
    "Anleihen": {
      "US 10-Jahre": "^TNX",
      "US 30-Jahre": "^TYX",
      "Deutschland 10-Jahre": "IRLTLT01DEM156N",
      "UK 10-Jahre": "IRLTLT01GBM156N",
      "Japan 10-Jahre": "IRLTLT01JPM156N"
    }
  },
  "tickerFlags": {
    "S&P 500 (USA)": "🇺🇸",
    "Nasdaq Composite (USA)": "🇺🇸",
    "DAX (Deutschland)": "🇩🇪",
    "Nikkei 225 (Japan)": "🇯🇵",
    "FTSE 100 (UK)": "🇬🇧",
    "KOSPI (Südkorea)": "🇰🇷",
    "Hang Seng (Hongkong)": "🇭🇰",
    "US 10-Jahre": "🇺🇸",
    "US 30-Jahre": "🇺🇸",
    "Deutschland 10-Jahre": "🇩🇪",
    "UK 10-Jahre": "🇬🇧",
    "Japan 10-Jahre": "🇯🇵"
  },
  "sectorTickerMap": {
    "Nasdaq": [
      "Nasdaq Composite (USA)"
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
    "AI",
    "Health",
    "Rüstung",
    "Energy",
    "Konsum",
    "Nasdaq",
    "S&P 500",
    "DAX",
    "KOSPI"
  ],
  "sectorPositions": {
    "AI": [
      "NVDA", "TSM", "MU", "AMD", "INTC", "AVGO", "QCOM", "TXN", "LRCX", "KLAC",
      "AMAT", "ASML", "ARM", "MRVL", "NXPI", "ADI", "ON", "MCHP", "MPWR", "SWKS"
    ],
    "Health": [
      "LLY", "JNJ", "ABBV", "MRK", "UNH", "AMGN", "TMO", "ABT", "GILD", "ISRG",
      "PFE", "DHR", "BSX", "SYK", "VRTX", "BMY", "MDT", "CVS", "CI", "ELV"
    ],
    "Rüstung": [
      "GE", "RTX", "BA", "HWM", "GD", "LHX", "TDG", "NOC", "LMT", "AXON",
      "TXT", "HEI", "CW", "TDY", "LDOS", "HII", "BWXT", "WWD", "KTOS", "MRCY"
    ],
    "Energy": [
      "XOM", "CVX", "COP", "EOG", "SLB", "WMB", "VLO", "PSX", "MPC", "BKR",
      "KMI", "TRG", "OXY", "FANG", "EQT", "HAL", "DVN", "CTRA", "HES", "APA"
    ],
    "Konsum": [
      "WMT", "COST", "PG", "KO", "PM", "MDLZ", "PEP", "MO", "CL", "KR",
      "SYY", "KMB", "KVUE", "MNST", "STZ", "GIS", "KDP", "HSY", "KHC", "CHD"
    ]
  },
  // Ungefaehre Gewichtung jedes Tickers innerhalb seines Referenz-ETFs (siehe
  // SECTOR_POSITIONS-Kommentar in config.py), in Prozent. Nur fuer die Anzeige -
  // hilft einzuordnen, warum z.B. ein kleiner Kursrutsch bei NVDA fuer den
  // Sektor mehr wiegt als eine grosse Bewegung bei einer kleinen Position.
  // Manuell recherchiert (Stand Jul 2026), keine Live-Daten.
  "sectorWeights": {
    "NVDA": 15.2, "TSM": 9.4, "MU": 7.8, "AMD": 7.6, "INTC": 7.2, "AVGO": 7.2,
    "QCOM": 5.1, "TXN": 4.7, "LRCX": 4.4, "KLAC": 4.0, "AMAT": 3.8, "ASML": 3.6,
    "ARM": 3.2, "MRVL": 2.8, "NXPI": 2.4, "ADI": 2.2, "ON": 1.8, "MCHP": 1.6,
    "MPWR": 1.4, "SWKS": 1.2,
    "LLY": 13.7, "JNJ": 11.1, "ABBV": 7.3, "MRK": 5.6, "UNH": 4.6, "AMGN": 3.6,
    "TMO": 3.5, "ABT": 3.4, "GILD": 3.3, "ISRG": 3.1, "PFE": 3.0, "DHR": 2.9,
    "BSX": 2.2, "SYK": 2.0, "VRTX": 1.9, "BMY": 1.7, "MDT": 1.6, "CVS": 1.4,
    "CI": 1.3, "ELV": 1.2,
    "GE": 22.2, "RTX": 15.9, "BA": 9.3, "HWM": 4.8, "GD": 4.7, "LHX": 4.7,
    "TDG": 4.5, "NOC": 3.6, "LMT": 3.4, "AXON": 2.8, "TXT": 2.2, "HEI": 2.0,
    "CW": 1.8, "TDY": 1.6, "LDOS": 1.5, "HII": 1.3, "BWXT": 1.1, "WWD": 1.0,
    "KTOS": 0.8, "MRCY": 0.7,
    "XOM": 23.8, "CVX": 17.3, "COP": 7.2, "EOG": 4.2, "SLB": 4.1, "WMB": 4.1,
    "VLO": 4.0, "PSX": 3.9, "MPC": 3.8, "BKR": 3.75, "KMI": 3.5, "TRG": 3.0,
    "OXY": 2.4, "FANG": 2.2, "EQT": 2.0, "HAL": 1.9, "DVN": 1.7, "CTRA": 1.5,
    "HES": 1.2, "APA": 1.0,
    "WMT": 10.7, "COST": 8.8, "PG": 7.5, "KO": 6.9, "PM": 6.1, "MDLZ": 4.5,
    "PEP": 4.5, "MO": 4.3, "CL": 4.3, "KR": 2.6, "SYY": 2.4, "KMB": 2.3,
    "KVUE": 2.2, "MNST": 2.0, "STZ": 1.8, "GIS": 1.6, "KDP": 1.5, "HSY": 1.4,
    "KHC": 1.3, "CHD": 1.1
  },
  // Top-Holdings je Index-Filter (Nasdaq/S&P 500/DAX/KOSPI aus dem "Indizes"-
  // Dropdown), inkl. eigener Gewichtung (analog zu sectorWeights). Bewusst
  // OHNE Einzel-Ticker-News (siehe positionCardHtml/loadCardExtras) - anders
  // als die Sektor-/ETF-Holdings.
  "indexHoldings": {
    "Nasdaq": [
      "NVDA", "AAPL", "MSFT", "AMZN", "AVGO", "GOOGL", "GOOG", "TSLA", "META", "COST",
      "NFLX", "PEP", "ADBE", "CSCO", "AMD", "TMUS", "INTU", "CMCSA", "TXN", "QCOM"
    ],
    "S&P 500": [
      "NVDA", "AAPL", "MSFT", "AMZN", "META", "AVGO", "GOOGL", "GOOG", "TSLA", "BRK.B",
      "JPM", "LLY", "V", "UNH", "XOM", "WMT", "MA", "HD", "PG", "JNJ"
    ],
    "DAX": [
      "SAP.DE", "SIE.DE", "ALV.DE", "DTE.DE", "AIR.DE", "MUV2.DE", "MBG.DE", "ENR.DE",
      "DB1.DE", "BAS.DE", "RHM.DE", "IFX.DE", "BAYN.DE", "VOW3.DE", "DBK.DE"
    ],
    "KOSPI": [
      "005930.KS", "000660.KS", "373220.KS", "207940.KS", "005380.KS", "068270.KS",
      "035420.KS", "105560.KS", "055550.KS", "012330.KS", "051910.KS", "006400.KS",
      "028260.KS", "032830.KS", "018260.KS"
    ]
  },
  // Verschachtelt (nicht flach wie sectorWeights!): Nasdaq und S&P 500
  // ueberschneiden sich bei den Mega-Caps stark, aber mit unterschiedlicher
  // Gewichtung je Index - ein gemeinsamer Wert waere fuer eine der beiden Seiten falsch.
  "indexWeights": {
    "Nasdaq": {
      "NVDA": 8.7, "AAPL": 7.1, "MSFT": 5.3, "AMZN": 4.9, "AVGO": 4.5, "GOOGL": 2.7,
      "GOOG": 2.6, "TSLA": 2.5, "META": 2.4, "COST": 2.1, "NFLX": 2.0, "PEP": 1.6,
      "ADBE": 1.3, "CSCO": 1.2, "AMD": 1.2, "TMUS": 1.1, "INTU": 1.1, "CMCSA": 1.0,
      "TXN": 1.0, "QCOM": 0.9
    },
    "S&P 500": {
      "NVDA": 7.0, "AAPL": 6.3, "MSFT": 4.6, "AMZN": 4.0, "META": 2.6, "AVGO": 2.4,
      "GOOGL": 2.2, "GOOG": 1.9, "TSLA": 1.8, "BRK.B": 1.7, "JPM": 1.4, "LLY": 1.3,
      "V": 1.1, "UNH": 1.0, "XOM": 1.0, "WMT": 1.0, "MA": 0.9, "HD": 0.9,
      "PG": 0.8, "JNJ": 0.8
    },
    "DAX": {
      "SAP.DE": 13.0, "SIE.DE": 8.0, "ALV.DE": 7.0, "DTE.DE": 6.5, "AIR.DE": 6.0,
      "MUV2.DE": 5.0, "MBG.DE": 4.0, "ENR.DE": 4.0, "DB1.DE": 3.5, "BAS.DE": 3.0,
      "RHM.DE": 3.0, "IFX.DE": 3.0, "BAYN.DE": 2.5, "VOW3.DE": 2.5, "DBK.DE": 2.5
    },
    "KOSPI": {
      "005930.KS": 32.0, "000660.KS": 28.0, "373220.KS": 3.0, "207940.KS": 2.5,
      "005380.KS": 2.0, "068270.KS": 1.8, "035420.KS": 1.5, "105560.KS": 1.3,
      "055550.KS": 1.2, "012330.KS": 1.1, "051910.KS": 1.0, "006400.KS": 0.9,
      "028260.KS": 0.9, "032830.KS": 0.8, "018260.KS": 0.7
    }
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
    "QCOM": "Qualcomm",
    "TXN": "Texas Instruments",
    "ARM": "Arm Holdings",
    "MRVL": "Marvell Technology",
    "NXPI": "NXP Semiconductors",
    "ADI": "Analog Devices",
    "ON": "ON Semiconductor",
    "MCHP": "Microchip Technology",
    "MPWR": "Monolithic Power Systems",
    "SWKS": "Skyworks Solutions",
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
    "AMGN": "Amgen",
    "GILD": "Gilead Sciences",
    "BSX": "Boston Scientific",
    "SYK": "Stryker",
    "VRTX": "Vertex Pharmaceuticals",
    "BMY": "Bristol-Myers Squibb",
    "MDT": "Medtronic",
    "CVS": "CVS Health",
    "CI": "Cigna",
    "ELV": "Elevance Health",
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
    "TXT": "Textron",
    "HEI": "HEICO",
    "CW": "Curtiss-Wright",
    "TDY": "Teledyne Technologies",
    "LDOS": "Leidos",
    "HII": "Huntington Ingalls Industries",
    "BWXT": "BWX Technologies",
    "WWD": "Woodward",
    "KTOS": "Kratos Defense",
    "MRCY": "Mercury Systems",
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
    "BKR": "Baker Hughes",
    "TRG": "Targa Resources",
    "OXY": "Occidental Petroleum",
    "FANG": "Diamondback Energy",
    "EQT": "EQT Corp",
    "HAL": "Halliburton",
    "DVN": "Devon Energy",
    "CTRA": "Coterra Energy",
    "HES": "Hess",
    "APA": "APA Corporation",
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
    "KR": "Kroger",
    "SYY": "Sysco",
    "KMB": "Kimberly-Clark",
    "KVUE": "Kenvue",
    "STZ": "Constellation Brands",
    "GIS": "General Mills",
    "KDP": "Keurig Dr Pepper",
    "HSY": "Hershey",
    "KHC": "Kraft Heinz",
    "CHD": "Church & Dwight",
    "AAPL": "Apple",
    "MSFT": "Microsoft",
    "AMZN": "Amazon",
    "GOOGL": "Alphabet A",
    "GOOG": "Alphabet C",
    "META": "Meta Platforms",
    "TSLA": "Tesla",
    "SIE.DE": "Siemens",
    "SAP.DE": "SAP",
    "NFLX": "Netflix",
    "ADBE": "Adobe",
    "CSCO": "Cisco Systems",
    "TMUS": "T-Mobile US",
    "INTU": "Intuit",
    "CMCSA": "Comcast",
    "BRK.B": "Berkshire Hathaway",
    "JPM": "JPMorgan Chase",
    "V": "Visa",
    "MA": "Mastercard",
    "HD": "Home Depot",
    "ALV.DE": "Allianz",
    "DTE.DE": "Deutsche Telekom",
    "AIR.DE": "Airbus",
    "MUV2.DE": "Munich Re",
    "MBG.DE": "Mercedes-Benz Group",
    "ENR.DE": "Siemens Energy",
    "DB1.DE": "Deutsche Börse",
    "BAS.DE": "BASF",
    "RHM.DE": "Rheinmetall",
    "IFX.DE": "Infineon",
    "BAYN.DE": "Bayer",
    "VOW3.DE": "Volkswagen",
    "DBK.DE": "Deutsche Bank",
    "005930.KS": "Samsung Electronics",
    "000660.KS": "SK Hynix",
    "373220.KS": "LG Energy Solution",
    "207940.KS": "Samsung Biologics",
    "005380.KS": "Hyundai Motor",
    "068270.KS": "Celltrion",
    "035420.KS": "NAVER",
    "105560.KS": "KB Financial Group",
    "055550.KS": "Shinhan Financial Group",
    "012330.KS": "Hyundai Mobis",
    "051910.KS": "LG Chem",
    "006400.KS": "Samsung SDI",
    "028260.KS": "Samsung C&T",
    "032830.KS": "Samsung Life Insurance",
    "018260.KS": "Samsung SDS"
  },
  // GICS-Sektor je Ticker (Standard-Marktklassifikation, unabhaengig von den
  // eigenen 5 Themen-Sektoren) - fuer das kleine Badge auf jeder Karte, s.
  // gicsTagHtml in app.js. Manuell klassifiziert (Stand Aug 2026).
  "gicsSectors": {
    "NVDA": "Information Technology",
    "TSM": "Information Technology",
    "MU": "Information Technology",
    "AMD": "Information Technology",
    "INTC": "Information Technology",
    "AVGO": "Information Technology",
    "QCOM": "Information Technology",
    "TXN": "Information Technology",
    "LRCX": "Information Technology",
    "KLAC": "Information Technology",
    "AMAT": "Information Technology",
    "ASML": "Information Technology",
    "ARM": "Information Technology",
    "MRVL": "Information Technology",
    "NXPI": "Information Technology",
    "ADI": "Information Technology",
    "ON": "Information Technology",
    "MCHP": "Information Technology",
    "MPWR": "Information Technology",
    "SWKS": "Information Technology",
    "LLY": "Health Care",
    "JNJ": "Health Care",
    "ABBV": "Health Care",
    "MRK": "Health Care",
    "UNH": "Health Care",
    "AMGN": "Health Care",
    "TMO": "Health Care",
    "ABT": "Health Care",
    "GILD": "Health Care",
    "ISRG": "Health Care",
    "PFE": "Health Care",
    "DHR": "Health Care",
    "BSX": "Health Care",
    "SYK": "Health Care",
    "VRTX": "Health Care",
    "BMY": "Health Care",
    "MDT": "Health Care",
    "CVS": "Health Care",
    "CI": "Health Care",
    "ELV": "Health Care",
    "GE": "Industrials",
    "RTX": "Industrials",
    "BA": "Industrials",
    "HWM": "Industrials",
    "GD": "Industrials",
    "LHX": "Industrials",
    "TDG": "Industrials",
    "NOC": "Industrials",
    "LMT": "Industrials",
    "AXON": "Industrials",
    "TXT": "Industrials",
    "HEI": "Industrials",
    "CW": "Industrials",
    "TDY": "Information Technology",
    "LDOS": "Industrials",
    "HII": "Industrials",
    "BWXT": "Industrials",
    "WWD": "Industrials",
    "KTOS": "Industrials",
    "MRCY": "Industrials",
    "XOM": "Energy",
    "CVX": "Energy",
    "COP": "Energy",
    "EOG": "Energy",
    "SLB": "Energy",
    "WMB": "Energy",
    "VLO": "Energy",
    "PSX": "Energy",
    "MPC": "Energy",
    "BKR": "Energy",
    "KMI": "Energy",
    "TRG": "Energy",
    "OXY": "Energy",
    "FANG": "Energy",
    "EQT": "Energy",
    "HAL": "Energy",
    "DVN": "Energy",
    "CTRA": "Energy",
    "HES": "Energy",
    "APA": "Energy",
    "WMT": "Consumer Staples",
    "COST": "Consumer Staples",
    "PG": "Consumer Staples",
    "KO": "Consumer Staples",
    "PM": "Consumer Staples",
    "MDLZ": "Consumer Staples",
    "PEP": "Consumer Staples",
    "MO": "Consumer Staples",
    "CL": "Consumer Staples",
    "KR": "Consumer Staples",
    "SYY": "Consumer Staples",
    "KMB": "Consumer Staples",
    "KVUE": "Consumer Staples",
    "MNST": "Consumer Staples",
    "STZ": "Consumer Staples",
    "GIS": "Consumer Staples",
    "KDP": "Consumer Staples",
    "HSY": "Consumer Staples",
    "KHC": "Consumer Staples",
    "CHD": "Consumer Staples",
    "AAPL": "Information Technology",
    "MSFT": "Information Technology",
    "AMZN": "Consumer Discretionary",
    "GOOGL": "Communication Services",
    "GOOG": "Communication Services",
    "TSLA": "Consumer Discretionary",
    "META": "Communication Services",
    "NFLX": "Communication Services",
    "ADBE": "Information Technology",
    "CSCO": "Information Technology",
    "TMUS": "Communication Services",
    "INTU": "Information Technology",
    "CMCSA": "Communication Services",
    "BRK.B": "Financials",
    "JPM": "Financials",
    "V": "Financials",
    "MA": "Financials",
    "HD": "Consumer Discretionary",
    "SAP.DE": "Information Technology",
    "SIE.DE": "Industrials",
    "ALV.DE": "Financials",
    "DTE.DE": "Communication Services",
    "AIR.DE": "Industrials",
    "MUV2.DE": "Financials",
    "MBG.DE": "Consumer Discretionary",
    "ENR.DE": "Industrials",
    "DB1.DE": "Financials",
    "BAS.DE": "Materials",
    "RHM.DE": "Industrials",
    "IFX.DE": "Information Technology",
    "BAYN.DE": "Health Care",
    "VOW3.DE": "Consumer Discretionary",
    "DBK.DE": "Financials",
    "005930.KS": "Information Technology",
    "000660.KS": "Information Technology",
    "373220.KS": "Industrials",
    "207940.KS": "Health Care",
    "005380.KS": "Consumer Discretionary",
    "068270.KS": "Health Care",
    "035420.KS": "Communication Services",
    "105560.KS": "Financials",
    "055550.KS": "Financials",
    "012330.KS": "Consumer Discretionary",
    "051910.KS": "Materials",
    "006400.KS": "Information Technology",
    "028260.KS": "Industrials",
    "032830.KS": "Financials",
    "018260.KS": "Information Technology"
  },
  // Kurzbeschreibung je Top-20-Holding (Markets-Tab, Klick zum Aufklappen).
  // Nur fuer die Anzeige, manuell verfasst - keine Live-Daten/API.
  "tickerDescriptions": {
    "NVDA": "Entwickelt GPUs und KI-Beschleuniger-Chips – zentraler Zulieferer für die Rechenleistung hinter generativer KI.",
    "TSM": "Größter Auftragsfertiger der Welt – produziert Chips für praktisch alle großen Chip-Designer (u.a. Nvidia, Apple, AMD).",
    "MU": "Stellt Speicherchips (DRAM, NAND) her, die u.a. in KI-Servern und Smartphones stecken.",
    "AMD": "Entwickelt CPUs und GPUs, zunehmend auch KI-Beschleuniger als Konkurrenz zu Nvidia.",
    "INTC": "Traditioneller CPU-Hersteller, baut zugleich eigene Chipfabriken (Foundry) aus.",
    "AVGO": "Liefert Netzwerk- und Custom-KI-Chips sowie Software, u.a. für Cloud-Rechenzentren.",
    "QCOM": "Entwickelt Mobilfunk-Chips (Snapdragon) für Smartphones und zunehmend PCs.",
    "TXN": "Fertigt analoge und eingebettete Chips für Industrie und Autos, weniger KI-Fokus.",
    "LRCX": "Baut Fertigungsanlagen für die Chip-Herstellung (Ätz-/Beschichtungstechnik).",
    "KLAC": "Stellt Mess- und Inspektionssysteme für die Chipfertigung her (Qualitätskontrolle).",
    "AMAT": "Größter Anbieter von Fertigungsanlagen für die Halbleiterproduktion – anders als Nvidia kein Chip-Design, sondern die Maschinen dahinter.",
    "ASML": "Einziger Hersteller von EUV-Lithografiemaschinen – ohne diese Maschinen keine modernen Chips.",
    "ARM": "Lizenziert Chip-Architekturen, auf denen fast alle Smartphone- und viele KI-Chips basieren.",
    "MRVL": "Entwickelt Netzwerk- und Custom-Chips für Rechenzentren und KI-Infrastruktur.",
    "NXPI": "Chips vor allem für Automobil- und Industrieelektronik.",
    "ADI": "Analoge und Signalverarbeitungs-Chips für Industrie, Autos und Kommunikation.",
    "ON": "Chips für Elektrofahrzeuge, Energieeffizienz und Industrieanwendungen.",
    "MCHP": "Mikrocontroller und analoge Chips für Industrie- und Embedded-Anwendungen.",
    "MPWR": "Stromversorgungs-Chips, u.a. wichtig für effiziente KI-Server.",
    "SWKS": "Funkchips vor allem für Smartphones (v.a. Apple-Zulieferer).",
    "LLY": "Pharmakonzern, aktuell v.a. bekannt für Diabetes-/Abnehm-Medikamente (u.a. Mounjaro/Zepbound).",
    "JNJ": "Breit aufgestellter Pharma- und Medizintechnik-Konzern.",
    "ABBV": "Pharmakonzern, stark abhängig von Immunmedikamenten (u.a. Nachfolger von Humira).",
    "MRK": "Pharmakonzern, u.a. bekannt für Krebsmedikament Keytruda und Impfstoffe.",
    "UNH": "Größter US-Krankenversicherer, betreibt auch eigene Kliniken/Praxisnetzwerke.",
    "AMGN": "Biotech-Konzern mit Fokus auf Biologika (u.a. Osteoporose, Krebs, Adipositas in Entwicklung).",
    "TMO": "Verkauft Laborgeräte und -material für Forschung, Diagnostik und Pharmaproduktion.",
    "ABT": "Diversifiziert zwischen Medizintechnik, Diagnostik, Ernährung und Generika.",
    "GILD": "Biotech, bekannt für HIV- und Virostatika-Medikamente.",
    "ISRG": "Baut OP-Roboter (da-Vinci-System) für minimal-invasive Chirurgie.",
    "PFE": "Großer Pharmakonzern, weltbekannt durch den COVID-Impfstoff.",
    "DHR": "Liefert Laborgeräte und Diagnostik-Technologie, ähnlich wie Thermo Fisher.",
    "BSX": "Medizintechnik, v.a. Geräte für Herz-Kreislauf- und minimal-invasive Eingriffe.",
    "SYK": "Medizintechnik mit Fokus auf Implantate (Hüfte/Knie) und OP-Ausstattung.",
    "VRTX": "Biotech, dominiert die Behandlung von Mukoviszidose (Cystic Fibrosis).",
    "BMY": "Pharmakonzern mit Schwerpunkt Onkologie und Herz-Kreislauf.",
    "MDT": "Medizintechnik, u.a. Herzschrittmacher und Diabetes-Geräte.",
    "CVS": "Betreibt Apothekenketten, eine Krankenversicherung (Aetna) und Gesundheitsdienste.",
    "CI": "Krankenversicherer und Gesundheitsdienstleister.",
    "ELV": "Großer US-Krankenversicherer (frühere Anthem), v.a. Blue-Cross-Blue-Shield-Marken.",
    "GE": "Baut Flugzeugtriebwerke für zivile und militärische Luftfahrt.",
    "RTX": "Rüstungs- und Luftfahrtkonzern (u.a. Raytheon-Raketen, Pratt & Whitney-Triebwerke).",
    "BA": "Baut zivile Flugzeuge sowie Militärflugzeuge und Raumfahrttechnik.",
    "HWM": "Fertigt Präzisionsbauteile (u.a. Turbinenschaufeln) für Flugzeugtriebwerke.",
    "GD": "Rüstungskonzern – u.a. Kampfpanzer, U-Boote und Business-Jets (Gulfstream).",
    "LHX": "Kommunikations- und Sensortechnik für Militär und Geheimdienste.",
    "TDG": "Stellt hochspezialisierte, oft konkurrenzlose Ersatzteile für Flugzeuge her.",
    "NOC": "Rüstungskonzern, u.a. Tarnkappenbomber und Raumfahrttechnik.",
    "LMT": "Größter Rüstungskonzern der Welt, baut u.a. den F-35-Kampfjet.",
    "AXON": "Stellt Tasers und Body-Cams für Polizei/Sicherheitsbehörden her – kein klassischer Waffenhersteller.",
    "TXT": "Baut u.a. Bell-Hubschrauber, Cessna-Flugzeuge und Militärfahrzeuge.",
    "HEI": "Fertigt zertifizierte Ersatzteile für die Luftfahrtindustrie, günstiger als Original-Hersteller-Teile.",
    "CW": "Liefert Spezialkomponenten für Luftfahrt, Marine und Industrie.",
    "TDY": "Sensoren, Bildgebung und Messtechnik, u.a. für Verteidigung und Raumfahrt.",
    "LDOS": "IT- und Technologie-Dienstleister für US-Regierung, Militär und Geheimdienste.",
    "HII": "Größte US-Werft für Marineschiffe, u.a. Flugzeugträger und U-Boote.",
    "BWXT": "Baut Nuklearkomponenten, u.a. Reaktoren für US-Marineschiffe.",
    "WWD": "Stellt Steuerungssysteme für Flugzeugtriebwerke und Industrieanlagen her.",
    "KTOS": "Entwickelt Drohnen und Zieldarstellungssysteme für das Militär.",
    "MRCY": "Liefert Elektronik- und Verarbeitungssysteme für Verteidigungssysteme.",
    "XOM": "Einer der größten Öl- und Gaskonzerne der Welt, von Förderung bis Raffinerie.",
    "CVX": "Zweitgrößter US-Ölkonzern, ähnlich breit aufgestellt wie ExxonMobil.",
    "COP": "Reines Förderunternehmen (Öl & Gas), betreibt keine eigenen Raffinerien/Tankstellen.",
    "EOG": "Öl- und Gasförderer, stark fokussiert auf US-Schieferöl (Fracking).",
    "SLB": "Größter Öl-Dienstleister der Welt – liefert Technik/Services für Förderunternehmen, fördert selbst nicht.",
    "WMB": "Betreibt Erdgas-Pipelines und -Infrastruktur in den USA.",
    "VLO": "Einer der größten Raffinerie-Betreiber – verarbeitet Rohöl zu Sprit, fördert nicht selbst.",
    "PSX": "Raffinerie- und Pipeline-Betreiber, ähnlich wie Valero.",
    "MPC": "Größter US-Raffineriebetreiber nach Kapazität.",
    "BKR": "Öl-Dienstleister, liefert Ausrüstung und Services für die Förderung.",
    "KMI": "Betreibt eines der größten Pipeline-Netzwerke Nordamerikas.",
    "TRG": "Sammelt, verarbeitet und transportiert Erdgas und Flüssiggas (NGLs).",
    "OXY": "Öl- und Gasförderer, investiert zunehmend auch in CO2-Abscheidung.",
    "FANG": "Schieferöl-Förderer, stark fokussiert auf das Permian Basin (Texas).",
    "EQT": "Größter US-Erdgasförderer.",
    "HAL": "Öl-Dienstleister, liefert u.a. Fracking- und Bohrtechnik.",
    "DVN": "Öl- und Gasförderer mit Fokus auf US-Schieferregionen.",
    "CTRA": "Öl- und Gasförderer, entstanden aus einer Fusion (Cimarex/Cabot).",
    "HES": "Ölförderer, u.a. wichtiger Akteur bei den großen Ölfunden vor Guyana.",
    "APA": "Öl- und Gasförderer mit Aktivitäten in den USA, Ägypten und dem Nordsee-Raum.",
    "WMT": "Größter Einzelhändler der Welt, Supermärkte und Onlinehandel.",
    "COST": "Mitglieder-Großhandelsketten (Bulk-Einkauf), bekannt für niedrige Margen/hohe Treue.",
    "PG": "Konsumgüterkonzern hinter Marken wie Gillette, Pampers, Head & Shoulders.",
    "KO": "Getränkekonzern, weltgrößter Softdrink-Hersteller.",
    "PM": "Tabakkonzern (Marlboro), zunehmend Fokus auf rauchfreie Produkte (IQOS).",
    "MDLZ": "Snack- und Süßwarenkonzern (u.a. Oreo, Milka, Toblerone).",
    "PEP": "Getränke- und Snackkonzern (u.a. Pepsi, Lay's, Doritos).",
    "MO": "Tabakkonzern, verkauft Marlboro in den USA (getrennt von Philip Morris International).",
    "CL": "Konsumgüterkonzern für Mund-/Körperpflege und Haushaltsprodukte.",
    "KR": "Eine der größten US-Supermarktketten.",
    "SYY": "Größter Lebensmittel-Großhändler für Restaurants und Gastronomie in den USA.",
    "KMB": "Hersteller von Hygieneprodukten (u.a. Kleenex, Huggies).",
    "KVUE": "Ehemalige Consumer-Health-Sparte von J&J (u.a. Tylenol, Listerine, Neutrogena).",
    "MNST": "Hersteller von Energydrinks.",
    "STZ": "Getränkekonzern, v.a. Bier (Corona, Modelo) und Wein/Spirituosen in den USA.",
    "GIS": "Lebensmittelkonzern (u.a. Cheerios, Häagen-Dazs).",
    "KDP": "Getränkekonzern (Kaffeekapselsysteme + Softdrinks wie Dr Pepper).",
    "HSY": "Größter US-Schokoladenhersteller.",
    "KHC": "Lebensmittelkonzern (u.a. Ketchup, Käseprodukte, Fertiggerichte).",
    "CHD": "Konsumgüterkonzern (u.a. Arm & Hammer, Trojan).",
    "AAPL": "Stellt iPhone, Mac und Dienste (App Store, iCloud) her – eines der wertvollsten Unternehmen der Welt.",
    "MSFT": "Software- und Cloud-Konzern (Windows, Office, Azure), großer Investor in OpenAI/KI.",
    "AMZN": "Größter Online-Händler der Welt, zugleich größter Cloud-Anbieter (AWS).",
    "GOOGL": "Alphabet (Google-Mutterkonzern), Aktienklasse mit Stimmrecht – Suche, Werbung, YouTube, Cloud und KI (Gemini).",
    "GOOG": "Alphabet (Google-Mutterkonzern), Aktienklasse ohne Stimmrecht – ansonsten identisches Geschäft wie GOOGL.",
    "META": "Betreibt Facebook, Instagram und WhatsApp, investiert stark in KI und VR/AR.",
    "TSLA": "Baut Elektroautos und arbeitet an Energiespeichern sowie Robotik/autonomem Fahren.",
    "SIE.DE": "Deutscher Industriekonzern – Automatisierung, Energietechnik, Mobilität.",
    "SAP.DE": "Größter europäischer Softwarekonzern, v.a. Unternehmenssoftware (ERP).",
    "NFLX": "Größter Streaming-Anbieter der Welt (Serien, Filme).",
    "ADBE": "Software fürs kreative Arbeiten (Photoshop, PDF) und Marketing, zunehmend mit KI-Funktionen.",
    "CSCO": "Größter Hersteller von Netzwerktechnik (Router, Switches) für Unternehmen und Rechenzentren.",
    "TMUS": "Drittgrößter US-Mobilfunkanbieter, entstanden aus der Fusion von T-Mobile und Sprint.",
    "INTU": "Software für Buchhaltung und Steuern (u.a. TurboTax, QuickBooks).",
    "CMCSA": "Kabelnetzbetreiber und Medienkonzern (u.a. NBCUniversal, Sky).",
    "BRK.B": "Warren Buffetts Beteiligungsholding – hält u.a. Anteile an Apple, Versicherungen und Eisenbahnen.",
    "JPM": "Größte US-Bank nach Bilanzsumme.",
    "V": "Betreibt eines der beiden großen globalen Kartenzahlungsnetzwerke (Visa) – kein eigener Kreditgeber.",
    "MA": "Betreibt das zweite große globale Kartenzahlungsnetzwerk, ähnlich wie Visa.",
    "HD": "Größte US-Baumarktkette.",
    "ALV.DE": "Einer der größten Versicherungskonzerne der Welt.",
    "DTE.DE": "Deutscher Telekomkonzern, hält u.a. die Mehrheit an T-Mobile US.",
    "AIR.DE": "Europäischer Flugzeughersteller, größter Boeing-Konkurrent.",
    "MUV2.DE": "Einer der größten Rückversicherer der Welt (versichert andere Versicherungen).",
    "MBG.DE": "Deutscher Autohersteller (Mercedes-Benz Pkw und Transporter).",
    "ENR.DE": "Baut Kraftwerks- und Energieinfrastruktur (u.a. Gasturbinen, Windkraft), abgespalten von Siemens.",
    "DB1.DE": "Betreibt die Frankfurter Wertpapierbörse und weitere Handelsplattformen.",
    "BAS.DE": "Weltgrößter Chemiekonzern.",
    "RHM.DE": "Deutscher Rüstungskonzern, profitiert stark von steigenden Verteidigungsausgaben in Europa.",
    "IFX.DE": "Größter deutscher Halbleiterhersteller, u.a. Chips für Autos und Industrie.",
    "BAYN.DE": "Deutscher Pharma- und Agrarchemie-Konzern (u.a. Aspirin, Saatgut/Pestizide).",
    "VOW3.DE": "Deutscher Automobilkonzern (VW, Audi, Porsche, u.a.).",
    "DBK.DE": "Größte deutsche Bank.",
    "005930.KS": "Größter Elektronikkonzern Südkoreas – Speicherchips, Smartphones, Displays.",
    "000660.KS": "Zweitgrößter Speicherchip-Hersteller der Welt, stark vom KI-Boom getrieben (HBM-Speicher für KI-Server).",
    "373220.KS": "Einer der größten Batteriehersteller der Welt für Elektrofahrzeuge.",
    "207940.KS": "Auftragsfertiger für Biotech-Medikamente (Biopharmazeutika).",
    "005380.KS": "Größter südkoreanischer Autohersteller.",
    "068270.KS": "Biotech-Unternehmen, v.a. Biosimilars (Nachahmer-Biopharmazeutika).",
    "035420.KS": "Betreibt Südkoreas größte Suchmaschine/Internetplattform, vergleichbar mit Google.",
    "105560.KS": "Größte Finanzholding Südkoreas (Bank, Versicherung, Kartengeschäft).",
    "055550.KS": "Große südkoreanische Finanzholding (Bank- und Versicherungsgeschäft).",
    "012330.KS": "Zulieferer für Auto-Teile innerhalb der Hyundai-Unternehmensgruppe.",
    "051910.KS": "Südkoreanischer Chemiekonzern, u.a. Batteriematerialien.",
    "006400.KS": "Stellt Batterien her, u.a. für Elektrofahrzeuge – Teil der Samsung-Gruppe.",
    "028260.KS": "Bau- und Handelssparte der Samsung-Gruppe.",
    "032830.KS": "Größter Lebensversicherer Südkoreas, Teil der Samsung-Gruppe.",
    "018260.KS": "IT-Dienstleister der Samsung-Gruppe (Systemintegration, Logistiksoftware)."
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

const NEUTRAL_THRESHOLD = 0.1; // Prozent - darunter gilt ein Ticker als "neutral" (gelb)

// Finnhub-API-Key fuer Live-Kurse (Einzelpositionen, siehe isLiveEligible()).
// ACHTUNG: Diese Seite ist eine rein statische GitHub-Pages-Seite ohne
// Backend - jeder Key, der hier steht, landet unveraendert im ausgelieferten
// JS und ist damit oeffentlich sichtbar (genau wie bei jedem anderen rein
// client-seitigen Key). Ohne gueltigen Key bleiben die Karten einfach beim
// taeglichen Snapshot aus data/market.json stehen.
const FINNHUB_API_KEY = 'd9h6ur1r01qhv00l2atgd9h6ur1r01qhv00l2au0';
const FINNHUB_POLL_DELAY_MS = 1100;  // Abstand zwischen Einzel-Calls (Rate-Limit: 60/min)
const FINNHUB_CYCLE_PAUSE_MS = 30000; // Pause zwischen zwei vollen Durchlaeufen

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

// Regulaere NYSE-Handelszeit (9:30-16:00 America/New_York, Mo-Fr). Feiertage
// werden bewusst ignoriert - Futures blenden an denen einfach faelschlich
// aus, was fuer eine reine Anzeige-Heuristik unproblematisch ist.
function isUsMarketOpen(now) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', hour12: false,
    weekday: 'short', hour: '2-digit', minute: '2-digit',
  }).formatToParts(now || new Date());
  const map = {};
  parts.forEach(p => { map[p.type] = p.value; });
  if (map.weekday === 'Sat' || map.weekday === 'Sun') return false;
  const minutes = parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10);
  return minutes >= 9 * 60 + 30 && minutes < 16 * 60;
}

// Handelszeiten der 4 Indizes mit eigener Detailkarte, in ihrer jeweiligen
// Boersen-Zeitzone (lokale Uhrzeit, nicht die deutsche). Wird zur Anzeige
// per Intl auf deutsche Zeit umgerechnet - so stimmt es automatisch auch in
// der ein, zwei Wochen im Fruehjahr/Herbst, in denen US-Sommerzeit und
// EU-Sommerzeit nicht synchron umschalten, ohne dass das hier gepflegt
// werden muss.
const MARKET_HOURS = {
  'Nasdaq': { tz: 'America/New_York', open: [9, 30], close: [16, 0] },
  'S&P 500': { tz: 'America/New_York', open: [9, 30], close: [16, 0] },
  'DAX': { tz: 'Europe/Berlin', open: [9, 0], close: [17, 30] },
  'KOSPI': { tz: 'Asia/Seoul', open: [9, 0], close: [15, 30] },
};

// Utc-Offset (in Minuten) einer Zeitzone zu einem bestimmten Zeitpunkt -
// darueber laesst sich eine lokale Uhrzeit (z.B. "9:30 in New York, heute")
// korrekt in UTC umrechnen, DST-Regeln der jeweiligen Zone inklusive.
function tzOffsetMinutes(timeZone, date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(date).reduce((acc, p) => { acc[p.type] = p.value; return acc; }, {});
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return (asUtc - date.getTime()) / 60000;
}

// Handelszeiten-Zeile fuer die grosse Index-Karte: Boersenoeffnungszeit
// (heutiges Datum, DST-korrekt) in deutscher Zeit angezeigt.
function marketHoursLine(key) {
  const cfg = MARKET_HOURS[key];
  if (!cfg) return '';
  const now = new Date();
  const fmt = (h, m) => {
    const offsetMin = tzOffsetMinutes(cfg.tz, now);
    const localParts = new Intl.DateTimeFormat('en-US', {
      timeZone: cfg.tz, year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(now).reduce((acc, p) => { acc[p.type] = p.value; return acc; }, {});
    const utcMs = Date.UTC(localParts.year, localParts.month - 1, localParts.day, h, m) - offsetMin * 60000;
    return new Date(utcMs).toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' });
  };
  const openStr = fmt(cfg.open[0], cfg.open[1]);
  const closeStr = fmt(cfg.close[0], cfg.close[1]);
  return '<div class="big-index-hours">Handelszeiten: ' + openStr + '–' + closeStr + ' Uhr (dt. Zeit)</div>';
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

function changeHtmlFor(change) {
  if (change === undefined || change === null) return '<span class="chg neutral">n/a</span>';
  const dir = direction(change);
  const sign = change > 0 ? '+' : '';
  return '<span class="chg ' + dir.cls + '"><span class="arrow">' + dir.arrow + '</span>' + sign + change + '%</span>';
}

function priceStrFor(price) {
  return (price !== undefined && price !== null)
    ? price.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    : 'n/a';
}

// Alles in Euro, damit man als Nutzerin in Europa nichts im Kopf umrechnen
// muss. row.price_eur kommt bereits umgerechnet aus fetch_market.py (ausser
// bei Anleihen-Renditen - das sind Prozentwerte, keine Geldbetraege, daher
// haben die kein "currency"-Feld und landen hier im ersten Fall).
function priceDisplay(row) {
  if (!row || row.price === undefined || row.price === null) return 'n/a';
  if (!row.currency) return priceStrFor(row.price);
  if (row.currency === 'EUR') return priceStrFor(row.price) + currencySuffix('EUR');
  if (row.price_eur !== undefined && row.price_eur !== null) {
    return priceStrFor(row.price_eur) + currencySuffix('EUR');
  }
  // Umrechnungskurs ausnahmsweise nicht verfuegbar (z.B. FX-Abruf
  // fehlgeschlagen) - lieber ehrlich den Originalpreis mit Waehrungskuerzel
  // zeigen als falsch umrechnen oder kommentarlos verstecken.
  return priceStrFor(row.price) + currencySuffix(row.currency);
}

// Finnhub liefert Echtzeit-Kurse nur fuer normale, an US-Boersen gelistete
// Symbole (kein Praefix/Suffix). Indizes (^...), Futures (...=F) und
// auslaendische Ticker (z.B. ASML.AS) bleiben beim taeglichen Snapshot.
function isLiveEligible(ticker) {
  return !!ticker && !ticker.includes('.') && !ticker.startsWith('^') && !ticker.endsWith('=F');
}

function priceCardHtml(label, row, flag, extraAttrs, ticker, sparkClass, chartHtml) {
  row = row || {};
  const live = ticker && isLiveEligible(ticker) && FINNHUB_API_KEY;
  const liveDot = live ? '<span class="live-dot" title="Live-Kurs (Finnhub)"></span>' : '';
  const prefix = flag ? flag + ' ' : '';
  const tickerAttr = live ? ' data-ticker="' + esc(ticker) + '"' : '';
  const dir = direction(row.change_pct);
  // chartHtml (s. renderBonds) ersetzt den einfachen Sparkline komplett
  // durch den groesseren Detailchart mit Achsen + Ziehen-Tooltip.
  const spark = chartHtml !== undefined ? chartHtml
    : sparklineSvg(row.sparkline, dir.cls !== 'down', sparkClass === undefined ? 'small' : sparkClass);
  return '<div class="ticker-card"' + (extraAttrs || '') + tickerAttr + '>' +
    '<div class="ticker-label">' + prefix + esc(label) + liveDot + '</div>' +
    '<div class="ticker-price">' + priceDisplay(row) + '</div>' +
    changeHtmlFor(row.change_pct) +
    spark +
    '</div>';
}

// Kleiner Trend-Graph (letzte paar Tagesschluesse + aktueller Kurs) fuer die
// grosse Index-Detailkarte. Reines SVG, keine Chart-Bibliothek.
// Woche als gedimmter Kontext-Verlauf, nur der letzte Abschnitt (Vortages-
// schluss -> aktueller Kurs) farbig hervorgehoben - so sieht man auf einen
// Blick, wie sich HEUTE bewegt, ohne den Wochenverlauf drumherum zu verlieren.
function sparklineSvg(closes, isUp, extraClass) {
  if (!closes || closes.length < 2) return '';
  const w = 240, h = 56, pad = 4;
  const min = Math.min(...closes), max = Math.max(...closes);
  const range = (max - min) || 1;
  const stepX = (w - pad * 2) / (closes.length - 1);
  const coords = closes.map((c, i) => [
    pad + i * stepX,
    pad + (1 - (c - min) / range) * (h - pad * 2),
  ]);
  const toPoints = (arr) => arr.map(([x, y]) => x.toFixed(1) + ',' + y.toFixed(1)).join(' ');
  const color = isUp ? '#3fb950' : '#f85149';
  const cls = 'sparkline' + (extraClass ? ' ' + extraClass : '');

  const splitIdx = coords.length - 2;
  const historyCoords = coords.slice(0, splitIdx + 1);
  const todayCoords = coords.slice(splitIdx);
  const historyLine = historyCoords.length >= 2
    ? '<polyline points="' + toPoints(historyCoords) + '" fill="none" stroke="#3a3f45" stroke-width="2" ' +
      'stroke-linejoin="round" stroke-linecap="round"/>'
    : '';
  const todayLine = '<polyline points="' + toPoints(todayCoords) + '" fill="none" stroke="' + color + '" stroke-width="2.5" ' +
    'stroke-linejoin="round" stroke-linecap="round"/>';

  return '<svg class="' + cls + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
    historyLine + todayLine +
    '</svg>';
}

// Kursreihe + Datum je Holding-Ticker, gefuellt beim Rendern (s.
// positionCardHtml) - Grundlage fuer den Woche/Monat-Umschalter auf den
// Top-20-/Index-Holdings-Karten (s. setSparkRange). Der Server liefert
// ohnehin die komplette YTD-Reihe, das Herausschneiden von "letzte 7/30
// Tage" passiert rein client-seitig, kein zusaetzlicher Abruf noetig.
const sparklineDataByTicker = new Map();

// dates ist ein zu closes paralleles Array von "YYYY-MM-DD"-Strings,
// aeltestes zuerst - String-Vergleich reicht fuer den Cutoff (ISO-Format
// sortiert lexikografisch wie chronologisch), keine Date-Objekte noetig.
function sliceSparklineByDays(closes, dates, days) {
  if (!closes || !dates || !days) return closes;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const startIdx = dates.findIndex(d => d >= cutoffStr);
  return startIdx === -1 ? closes : closes.slice(startIdx);
}

// ---------- Index-Detailchart (nur Indizes-Rubrik) ----------
// Groesserer Chart mit X-/Y-Achse statt der kleinen Sparkline - dieselbe
// gedimmte-Woche/farbiges-Heute-Logik wie sparklineSvg, nur mit Beschriftung
// und antippbaren Punkten (Tooltip mit Datum+Kurs). Reines SVG, kein Chart-
// Framework - row.sparkline_dates kommt parallel zu row.sparkline aus
// fetch_market.py (Yahoos Timestamp-Array).
function formatChartAxisPrice(v) {
  // Kleine Werte (z.B. Anleihen-Renditen wie 2,97) brauchen Nachkommastellen,
  // sonst rundet's auf "3" und die eigentliche Information ist weg. Grosse
  // Werte (Indexstaende wie 26.729) als glatte Zahl mit Tausendertrennung.
  if (Math.abs(v) < 100) {
    return v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return Math.round(v).toLocaleString('de-DE');
}
function formatChartDate(iso) {
  if (!iso) return '';
  const parts = iso.split('-'); // "YYYY-MM-DD"
  return parts.length === 3 ? parts[2] + '.' + parts[1] + '.' : iso;
}

function bigIndexChartHtml(closes, dates, isUp) {
  if (!closes || closes.length < 2) return '';
  dates = dates || [];
  const w = 320, h = 176;
  const padLeft = 46, padRight = 10, padTop = 12, padBottom = 26;
  const plotW = w - padLeft - padRight;
  const plotH = h - padTop - padBottom;
  const min = Math.min(...closes), max = Math.max(...closes);
  const range = (max - min) || 1;
  const stepX = plotW / (closes.length - 1);
  const coords = closes.map((c, i) => [
    padLeft + i * stepX,
    padTop + (1 - (c - min) / range) * plotH,
  ]);
  const color = isUp ? '#3fb950' : '#f85149';

  // Y-Achse: Gitterlinien + Preisbeschriftung bei Max/Mitte/Min.
  const yAxis = [max, (max + min) / 2, min].map((v, i) => {
    const y = padTop + (i / 2) * plotH;
    return '<line x1="' + padLeft + '" y1="' + y.toFixed(1) + '" x2="' + (w - padRight) + '" y2="' + y.toFixed(1) + '" ' +
      'stroke="#22262b" stroke-width="1"/>' +
      '<text x="' + (padLeft - 6) + '" y="' + (y + 3).toFixed(1) + '" text-anchor="end" ' +
      'class="index-chart-axis-label">' + esc(formatChartAxisPrice(v)) + '</text>';
  }).join('');

  // X-Achse: hoechstens 5 gleichmaessig verteilte Datumsbeschriftungen -
  // bei einem YTD-Verlauf (150+ Punkte, s. Anleihen) waere ein Label pro
  // Punkt voellig ueberladen/unleserlich.
  const labelCount = Math.min(5, coords.length);
  const labelIndices = [...new Set(
    Array.from({ length: labelCount }, (_, i) =>
      labelCount <= 1 ? 0 : Math.round(i * (coords.length - 1) / (labelCount - 1))
    )
  )];
  const xAxis = labelIndices.map(i => {
    const [x] = coords[i];
    return '<text x="' + x.toFixed(1) + '" y="' + (h - 6) + '" text-anchor="middle" ' +
      'class="index-chart-axis-label">' + esc(formatChartDate(dates[i])) + '</text>';
  }).join('');

  const toPoints = (arr) => arr.map(([x, y]) => x.toFixed(1) + ',' + y.toFixed(1)).join(' ');
  const splitIdx = coords.length - 2;
  const historyCoords = coords.slice(0, splitIdx + 1);
  const todayCoords = coords.slice(splitIdx);
  const historyLine = historyCoords.length >= 2
    ? '<polyline points="' + toPoints(historyCoords) + '" fill="none" stroke="#3a3f45" stroke-width="2" ' +
      'stroke-linejoin="round" stroke-linecap="round"/>'
    : '';
  const todayLine = '<polyline points="' + toPoints(todayCoords) + '" fill="none" stroke="' + color + '" stroke-width="2.5" ' +
    'stroke-linejoin="round" stroke-linecap="round"/>';

  // Einzelner sichtbarer Punkt fuer "heute" als Orientierung - kein Punkt
  // mehr pro Handelstag im DOM (waeren bei einem Jahresverlauf 150-250+
  // Elemente PRO Chart). Stattdessen ist die ganze Kursreihe kompakt als
  // JSON im "data-points"-Attribut hinterlegt (s. setupIndexChartTooltip) -
  // das Ziehen sucht sich den naechsten Punkt rein rechnerisch.
  const last = coords[coords.length - 1];
  const todayDot = '<circle cx="' + last[0].toFixed(1) + '" cy="' + last[1].toFixed(1) + '" r="3.5" fill="' + color + '"/>';
  const points = coords.map(([x, y], i) =>
    [Math.round(x * 10) / 10, Math.round(y * 10) / 10, formatChartDate(dates[i]), formatChartAxisPrice(closes[i])]
  );

  return '<svg class="index-chart" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid meet" ' +
    'data-points="' + esc(JSON.stringify(points)) + '">' +
    yAxis + historyLine + todayLine + todayDot +
    '<line class="index-chart-crosshair" x1="0" x2="0" y1="' + padTop + '" y2="' + (h - padBottom) + '" style="display:none"/>' +
    '<circle class="index-chart-scrub-dot" r="3.5" style="display:none"/>' +
    '<g class="index-chart-tooltip" style="display:none">' +
      '<rect class="index-chart-tooltip-bg" rx="3" ry="3"></rect>' +
      '<text class="index-chart-tooltip-text" text-anchor="middle"></text>' +
    '</g>' +
    xAxis +
    '</svg>';
}

// Ziehen auf einem Detailchart (Indizes-Detailkarte, Anleihen-Karten) zeigt
// laufend Datum+Kurs zum naechstgelegenen Punkt als Fadenkreuz+Tooltip -
// wie bei Trading-Apps, statt nur einzelne Punkte antippen zu muessen.
// Delegierter Pointer-Handler auf document (nicht nur ein Container), da
// mehrere Charts gleichzeitig auf der Seite stehen koennen (z.B. 5
// Anleihen-Karten); .index-chart hat "touch-action:none" (s. CSS), damit
// Ziehen nicht mit dem Scrollen der Seite kollidiert.
function setupIndexChartTooltip() {
  let activeSvg = null;

  function nearestPoint(svg, clientX) {
    let points;
    try { points = JSON.parse(svg.dataset.points || '[]'); } catch (e) { return null; }
    if (!points.length) return null;
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return null;
    const svgX = ((clientX - rect.left) / rect.width) * svg.viewBox.baseVal.width;
    let nearest = points[0], minDist = Infinity;
    for (const p of points) {
      const dist = Math.abs(p[0] - svgX);
      if (dist < minDist) { minDist = dist; nearest = p; }
    }
    return nearest;
  }

  function showAt(svg, point) {
    const [x, y, date, price] = point;
    const tooltip = svg.querySelector('.index-chart-tooltip');
    if (!tooltip) return;
    const crosshair = svg.querySelector('.index-chart-crosshair');
    const scrubDot = svg.querySelector('.index-chart-scrub-dot');
    const bg = tooltip.querySelector('.index-chart-tooltip-bg');
    const text = tooltip.querySelector('.index-chart-tooltip-text');
    const label = date + '   ' + price;
    text.textContent = label;
    const boxW = label.length * 5.4 + 12;
    const boxH = 16;
    const viewBoxW = svg.viewBox.baseVal.width;
    const tx = Math.min(Math.max(x - boxW / 2, 2), viewBoxW - boxW - 2);
    const ty = Math.max(y - boxH - 8, 2);
    bg.setAttribute('x', tx);
    bg.setAttribute('y', ty);
    bg.setAttribute('width', boxW);
    bg.setAttribute('height', boxH);
    text.setAttribute('x', tx + boxW / 2);
    text.setAttribute('y', ty + boxH / 2 + 3);
    tooltip.style.display = '';
    if (crosshair) {
      crosshair.setAttribute('x1', x);
      crosshair.setAttribute('x2', x);
      crosshair.style.display = '';
    }
    if (scrubDot) {
      scrubDot.setAttribute('cx', x);
      scrubDot.setAttribute('cy', y);
      scrubDot.style.display = '';
    }
  }

  document.addEventListener('pointerdown', (e) => {
    const svg = e.target.closest('.index-chart');
    if (!svg) return;
    activeSvg = svg;
    const point = nearestPoint(svg, e.clientX);
    if (point) showAt(svg, point);
  });
  document.addEventListener('pointermove', (e) => {
    if (!activeSvg) return;
    const point = nearestPoint(activeSvg, e.clientX);
    if (point) showAt(activeSvg, point);
  });
  const release = () => { activeSvg = null; };
  document.addEventListener('pointerup', release);
  document.addEventListener('pointercancel', release);
}

// Grosse, zentrierte Karte fuer einen ausgewaehlten Index (Nasdaq/S&P 500/
// DAX/KOSPI) statt des kleinen Grid-Feldes - inkl. Detailchart mit Achsen.
function bigIndexCardHtml(label, row, flag, hoursKey) {
  row = row || {};
  const dir = direction(row.change_pct);
  const chart = bigIndexChartHtml(row.sparkline, row.sparkline_dates, dir.cls !== 'down');
  const prefix = flag ? flag + ' ' : '';
  return '<div class="big-index-card">' +
    '<div class="big-index-label">' + prefix + esc(label) + '</div>' +
    '<div class="big-index-price">' + priceDisplay(row) + '</div>' +
    changeHtmlFor(row.change_pct) +
    chart +
    marketHoursLine(hoursKey) +
    '</div>';
}

// Waehrungskuerzel aus Yahoo (z.B. "KRW" fuer .KS-Ticker) als Symbol/Kuerzel
// hinter dem Preis - ohne das ist z.B. ein KRW-Kurs leicht mit USD zu verwechseln.
const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', KRW: '₩', JPY: '¥', HKD: 'HK$', CHF: 'CHF' };
function currencySuffix(currency) {
  if (!currency) return '';
  return ' <span class="price-currency">' + esc(CURRENCY_SYMBOLS[currency] || currency) + '</span>';
}

// Kurzform der 11 GICS-Sektoren fuers Badge - volle Namen in CONFIG.gicsSectors
// (auch als title-Attribut auf dem Badge), hier nur zur Platzersparnis auf
// der kompakten Karte.
const GICS_SHORT_LABELS = {
  "Information Technology": "Tech",
  "Health Care": "Health",
  "Industrials": "Industrials",
  "Energy": "Energy",
  "Materials": "Materials",
  "Consumer Discretionary": "Discretionary",
  "Consumer Staples": "Staples",
  "Financials": "Financials",
  "Communication Services": "Communication",
  "Utilities": "Utilities",
  "Real Estate": "Real Estate",
};

// GICS-Sektor-Badge - unabhaengig davon, in welchem eigenen Themen-Sektor
// (AI, Ruestung, ...) die Karte gerade angezeigt wird, zeigt das die
// tatsaechliche Marktkategorie (z.B. Teledyne im "Ruestung"-Sektor ist laut
// GICS eigentlich Information Technology).
function gicsTagHtml(ticker) {
  const sector = CONFIG.gicsSectors[ticker];
  if (!sector) return '';
  const short = GICS_SHORT_LABELS[sector] || sector;
  return '<span class="gics-tag" title="' + esc(sector) + '">' + esc(short) + '</span>';
}

// Kompakte Karte fuer Sektor-Positionen: Firmenname gross+fett+vorne (statt
// Ticker-Symbol - besser lesbar, gerade bei kryptischen Symbolen wie
// "005930.KS"), Ticker-Symbol klein darunter, Gewichtung im Sektor-ETF oben
// rechts, GICS-Sektor-Badge neben dem Namen. Klick/Tap klappt eine kurze
// Firmenbeschreibung auf (falls vorhanden).
function positionCardHtml(ticker, row, weight, newsItem) {
  row = row || {};
  const name = CONFIG.tickerNames[ticker] || ticker;
  const weightHtml = (weight !== undefined) ? '<span class="ticker-weight">' + weight + '%</span>' : '';
  const live = isLiveEligible(ticker) && FINNHUB_API_KEY;
  const liveDot = live ? '<span class="live-dot" title="Live-Kurs (Finnhub)"></span>' : '';
  // data-ticker steht immer drauf (fuer die Kennzahlen-Abfrage beim Aufklappen),
  // die Live-Kurs-Aktualisierung selbst filtert intern trotzdem auf isLiveEligible.
  const desc = CONFIG.tickerDescriptions[ticker];
  const descHtml = desc ? '<div class="ticker-desc">' + esc(desc) + '</div>' : '';
  const expandableClass = desc ? ' expandable' : '';
  const dir = direction(row.change_pct);
  const isUp = dir.cls !== 'down';
  // Eingeklappt zeigt der Mini-Chart YTD (row.sparkline kommt seit Kurzem
  // schon so vom Server, s. fetch_market.py), aufgeklappt zoomt er auf 1
  // Monat (per Default) mit Umschalter auf 1 Woche - beides aus derselben
  // YTD-Reihe client-seitig herausgeschnitten, kein zusaetzlicher Abruf
  // noetig. Dafuer hier fuer den Klick-Handler (setSparkRange) gecacht.
  sparklineDataByTicker.set(ticker, { closes: row.sparkline, dates: row.sparkline_dates, isUp });
  const spark = sparklineSvg(row.sparkline, isUp, 'mini');
  const sparkRangeToggle = spark ?
    '<div class="spark-range-toggle">' +
      '<button type="button" data-range="1w">1W</button>' +
      '<button type="button" data-range="1m" class="active">1M</button>' +
    '</div>' : '';
  // Nur bei "Groesste Bewegungen" gesetzt (s. renderTopMovers) - Schlagzeile
  // aus einer gezielten, nur fuer die aktuellen Top-5-Mover ausgefuehrten
  // Suche (label = Ticker-Symbol, s. mover_queries() in fetch_news.py),
  // Antwort auf "warum bewegt sich das heute so stark".
  const newsHtml = newsItem ? '<div class="ticker-news-hint">' +
    '<a href="' + esc(newsItem.link) + '" target="_blank" rel="noopener">' + esc(newsItem.title) + '</a>' +
    '</div>' : '';
  // Kennzahlen (Marktkap./KGV/Nettomarge) werden jetzt automatisch geladen
  // (s. loadFundamentalsForContainer), sobald die Karte sichtbar wird - nicht
  // mehr erst beim Antippen. Der Platzhalter wird von loadCardExtras ersetzt.
  // Die kurze Beschreibung (descHtml) bleibt weiterhin hinter dem Klick
  // versteckt (s. setupPositionExpand/.ticker-card.expanded .ticker-desc).
  const fundamentalsPlaceholder = '<div class="ticker-fundamentals">Lade Kennzahlen…</div>';
  // Aufgeklappt ordnet ein CSS-Grid (s. .ticker-card.compact.expanded.has-spark
  // in style.css) die Karte um: Kennzahlen+Beschreibung wandern in eine
  // schmalere linke Spalte, der Chart wird auf die rechte Haelfte der Karte
  // vergroessert (mehr Platz fuer den Woche/Monat-Umschalter) statt winzig
  // neben der Kopfzeile zu kleben. Dafuer sind main/spark/news/fund/desc
  // hier alle direkte Kind-Elemente von .ticker-card (Grid-Items) statt in
  // .ticker-card-row verschachtelt - eingeklappt sieht es dank des anderen
  // Grid-Templates trotzdem wie vorher aus (Chart klein oben rechts).
  const hasSparkClass = spark ? ' has-spark' : '';
  const mainHtml = '<div class="ticker-card-main">' +
    '<div class="ticker-top">' +
      '<span class="ticker-symbol">' + esc(ticker) + liveDot + '</span>' +
      weightHtml +
    '</div>' +
    '<div class="ticker-name-row">' +
      '<span class="ticker-name">' + esc(name) + '</span>' +
      gicsTagHtml(ticker) +
    '</div>' +
    '<div class="ticker-bottom">' +
      '<span class="ticker-price">' + priceDisplay(row) + '</span>' +
      changeHtmlFor(row.change_pct) +
    '</div>' +
  '</div>';
  const sparkHtml = spark ? '<div class="ticker-card-spark">' +
    '<div class="spark-chart">' + spark + '</div>' +
    sparkRangeToggle +
  '</div>' : '';
  return '<div class="ticker-card compact' + expandableClass + hasSparkClass + '" data-ticker="' + esc(ticker) + '">' +
    mainHtml +
    sparkHtml +
    newsHtml +
    fundamentalsPlaceholder +
    descHtml +
    '</div>';
}

// ---------- Rendering: Markets-Tab ----------
function renderMarketPills() {
  // Sektor-Pillen ohne die 4 reinen Index-Pillen (die kommen in die Indizes-Reihe)
  const indexPills = new Set(CONFIG.indexPills);
  const sektorRowHtml = CONFIG.sectorOrder
    .filter(label => !indexPills.has(label))
    .map(label => '<button class="pill" data-label="' + esc(label) + '">' + esc(label) + '</button>')
    .join('');
  document.getElementById('sektor-row').innerHTML = sektorRowHtml;

  document.getElementById('indizes-row').innerHTML = CONFIG.indexPills.map(label =>
    '<button class="pill" data-label="' + esc(label) + '">' + esc(label) + '</button>'
  ).join('');
}

function renderFutures(rowsByLabel) {
  const cards = Object.keys(CONFIG.tickerGroups['Futures (Vorbörse)']).map(label =>
    priceCardHtml(label, rowsByLabel[label])
  );
  document.querySelector('#futures-section .tickers').innerHTML = cards.join('');
}

function renderMacroBarometer(rowsByLabel) {
  const cards = Object.keys(CONFIG.tickerGroups['Makro-Barometer']).map(label =>
    priceCardHtml(label, rowsByLabel[label])
  );
  document.querySelector('#macro-barometer-section .tickers').innerHTML = cards.join('');
}

// Top 5 Einzel-Ticker (Sektor-Positionen + Index-Holdings) mit der groessten
// Tagesbewegung (unabhaengig von Richtung) - sofort sichtbar auf der Start-
// Ansicht, damit man nicht jeden Sektor einzeln durchklicken muss, um zu
// sehen wo's brennt. Nur Einzel-Ticker (CONFIG.tickerNames-Eintrag), nicht
// Futures/Indizes/Anleihen/Makro-Barometer - die sind schon eigene Karten.
function renderTopMovers(rowsByLabel, allHeadlines) {
  const movers = Object.values(rowsByLabel)
    .filter(r => r && CONFIG.tickerNames[r.label] && typeof r.change_pct === 'number')
    .sort((a, b) => Math.abs(b.change_pct) - Math.abs(a.change_pct))
    .slice(0, 5);
  const section = document.getElementById('top-movers-section');
  // Sichtbarkeit selbst regelt apply() unten (abhaengig vom Start-Filter) -
  // hier nur merken, ob es ueberhaupt Daten gibt, damit apply() bei leerem
  // Datensatz (z.B. ganz am Anfang) keine leere Ueberschrift zeigt.
  section.dataset.hasData = movers.length ? '1' : '0';
  // "Warum bewegt sich das": fetch_news.py sucht gezielt fuer die zuletzt
  // ermittelten Top-5-Mover (label = Ticker-Symbol, s. mover_queries()) -
  // allHeadlines ist bereits nach Datum sortiert, also reicht der erste Treffer.
  const cards = movers.map(r => {
    const newsItem = allHeadlines.find(h => h.label === r.label);
    return positionCardHtml(r.label, r, undefined, newsItem);
  });
  section.querySelector('.tickers').innerHTML = cards.join('');
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

function renderBonds(rowsByLabel) {
  // Anleihen zeigen den grossen Detailchart mit Achsen + Ziehen-Tooltip
  // (wie die Indizes-Detailkarte) statt der einfachen Sparkline - seit
  // fetch_market.py die YTD-Kursreihe liefert (statt nur der letzten paar
  // Tage), lohnt sich das; passt auch zur einspaltigen Anleihen-Rubrik mit
  // viel Platz pro Karte.
  const cards = Object.keys(CONFIG.tickerGroups['Anleihen']).map(label => {
    const row = rowsByLabel[label] || {};
    const dir = direction(row.change_pct);
    const chart = bigIndexChartHtml(row.sparkline, row.sparkline_dates, dir.cls !== 'down');
    return priceCardHtml(label, row, CONFIG.tickerFlags[label] || '', undefined, undefined, undefined, chart);
  });
  document.querySelector('#bonds-section .tickers').innerHTML = cards.join('');
}

// Sektor-Sentiment: Durchschnitt der heutigen %-Bewegung aller Top-20-
// Positionen des Sektors, grob in Buy/Hold/Sell uebersetzt. Bewusst simpel
// (nur Tagesbewegung, kein Kursziel/keine Anlageberatung) - reiner
// Schnelleindruck "ist der Sektor heute insgesamt eher gruen oder rot".
const SENTIMENT_BUY_THRESHOLD = 0.5;
const SENTIMENT_SELL_THRESHOLD = -0.5;
function sectorSentimentHtml(tickers, rowsByLabel) {
  const values = tickers
    .map(t => rowsByLabel[t] && rowsByLabel[t].change_pct)
    .filter(v => typeof v === 'number');
  if (!values.length) return '';
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  let label, cls;
  if (avg >= SENTIMENT_BUY_THRESHOLD) { label = 'Buy'; cls = 'up'; }
  else if (avg <= SENTIMENT_SELL_THRESHOLD) { label = 'Sell'; cls = 'down'; }
  else { label = 'Hold'; cls = 'neutral'; }
  const sign = avg > 0 ? '+' : '';
  return '<span class="sentiment-badge sentiment-' + cls + '" ' +
    'title="Durchschnittliche Tagesbewegung der ' + values.length + ' angezeigten Positionen - ' +
    'grober Schnelleindruck, keine Anlageberatung.">' +
    esc(label) + ' &middot; ' + sign + avg.toFixed(1) + '%</span>';
}

function renderPositionSections(rowsByLabel) {
  const container = document.getElementById('position-sections');
  let html = '';
  Object.keys(CONFIG.sectorPositions).forEach(sector => {
    const tickers = CONFIG.sectorPositions[sector];
    const cards = tickers.map(t => positionCardHtml(t, rowsByLabel[t], CONFIG.sectorWeights[t]));
    html += '<div class="section position-section" data-sector="' + esc(sector) + '" style="display:none">' +
      '<div class="section-header">' +
        '<h2>' + esc(sector) + ' – Top ' + tickers.length + '</h2>' +
        sectorSentimentHtml(tickers, rowsByLabel) +
      '</div>' +
      '<div class="tickers">' + cards.join('') + '</div></div>';
  });
  container.innerHTML = html;
}

// Top-Holdings des jeweils ausgewaehlten Index (Nasdaq/S&P 500/DAX/KOSPI aus
// dem "Indizes"-Dropdown) - nur sichtbar bei genau diesem Filter, siehe
// setupMarketFilter.
function renderIndexHoldings(rowsByLabel) {
  const container = document.getElementById('index-holdings');
  let html = '';
  Object.keys(CONFIG.indexHoldings).forEach(indexLabel => {
    const tickers = CONFIG.indexHoldings[indexLabel];
    const weights = CONFIG.indexWeights[indexLabel] || {};
    const cards = tickers.map(t => positionCardHtml(t, rowsByLabel[t], weights[t]));
    html += '<div class="section position-section" data-index="' + esc(indexLabel) + '" style="display:none">' +
      '<h2>' + esc(indexLabel) + ' – Top ' + tickers.length + ' Holdings</h2>' +
      '<div class="tickers">' + cards.join('') + '</div></div>';
  });
  container.innerHTML = html;
}

const MACRO_MAX_VISIBLE = 2;
// Immer nur 1 Schlagzeile sichtbar, Rest hinter "Mehr anzeigen" - damit der
// Block "Wichtigste News" immer gleich hoch ist (1 vs. 3 Zeilen liess vorher
// die sticky Pillen-Navigation je nach Filter an unterschiedlicher Stelle
// landen).
const TOP_NEWS_MAX_VISIBLE = 1;

// "Makro & Weltpolitik" ist kein Sektor-Filter, sondern liegt direkt unter
// dem Makro-Barometer (VIX/Gold/Oel/Dollar-Index) - deckt Zinsentscheide,
// Inflationsdaten und marktbewegende Geopolitik ab, unabhaengig vom
// gewaehlten Sektor-Filter (sichtbar nur auf der Start-Ansicht, s. apply()).
function renderMacroBlock(headlines) {
  const macroHeadlines = headlines.filter(h => h.label === 'Makro & Weltpolitik');
  const html = macroHeadlines.map((h, i) => headlineHtml(h, i, null)).join('');
  document.getElementById('headlines-macro').innerHTML = html || '<p>Noch keine Makro-Schlagzeilen gesammelt.</p>';
  return macroHeadlines;
}

function setupMacroExpand() {
  const items = document.querySelectorAll('#headlines-macro .headline');
  const moreBtn = document.getElementById('macro-more-btn');
  let expanded = false;
  function apply() {
    items.forEach((el, i) => { el.style.display = (i >= MACRO_MAX_VISIBLE && !expanded) ? 'none' : ''; });
    if (moreBtn) moreBtn.textContent = expanded ? 'Weniger anzeigen' : 'Mehr anzeigen';
  }
  if (moreBtn) {
    moreBtn.style.display = items.length > MACRO_MAX_VISIBLE ? 'block' : 'none';
    moreBtn.addEventListener('click', () => { expanded = !expanded; apply(); });
  }
  apply();
}

function sortByPriority(list) {
  const priority = list.filter(h => isPriority(h.title));
  const rest = list.filter(h => !isPriority(h.title));
  return [...priority, ...rest];
}

// "Wichtigste News": zeigt an derselben Stelle je nach gewaehltem Filter
// unterschiedliche Schlagzeilen - auf der Start-Ansicht die 3 wichtigsten
// ueber ALLE Kategorien hinweg, bei einem Sektor/Anleihen nur dessen
// Schlagzeilen, bei Indizes die der 4 Index-Pillen zusammen (Prioritaets-
// markierte zuerst, s. isPriority/PRIORITY_KEYWORDS, sonst nach Datum).
// Wird bei jedem Filterwechsel neu aufgerufen, s. apply() in setupMarketFilter.
function headlinesForFilter(allHeadlines, filter, indexPillSet) {
  if (filter === 'Alle') return sortByPriority(allHeadlines);
  if (filter === INDIZES_OVERVIEW) {
    return sortByPriority(allHeadlines.filter(h => indexPillSet.has(h.label)));
  }
  return sortByPriority(allHeadlines.filter(h => h.label === filter));
}

function topNewsHeadingFor(filter) {
  if (filter === 'Alle') return 'Wichtigste News';
  if (filter === INDIZES_OVERVIEW) return 'Indizes – News';
  return filter + ' – News';
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

// ---------- Interaktion: Markets-Filter ----------
// Pseudo-Filterwert fuer die Indizes-Uebersicht (kleines Raster aller 7
// globalen Indizes) - im Unterschied zu den 4 Index-Pillen (Nasdaq/S&P 500/
// DAX/KOSPI), die auf die grosse Detailkarte mit Top-Holdings springen.
const INDIZES_OVERVIEW = 'IndizesUebersicht';

function setupMarketFilter(rowsByLabel, allHeadlines) {
  const pillsContainer = document.getElementById('pills-markets');
  const topNewsHeading = document.getElementById('top-news-heading');
  const topNewsContainer = document.getElementById('headlines-top');
  const topNewsMoreBtn = document.getElementById('top-news-more-btn');
  const topMoversSection = document.getElementById('top-movers-section');
  const macroBarometerSection = document.getElementById('macro-barometer-section');
  const futuresSection = document.getElementById('futures-section');
  const bondsSection = document.getElementById('bonds-section');
  const globalSection = document.getElementById('global-indices-section');
  const globalHeading = globalSection.querySelector('h2');
  const tickersGrid = globalSection.querySelector('.tickers');
  const globalCards = globalSection.querySelectorAll('.ticker-card');
  const bigIndexView = document.getElementById('big-index-view');
  const positionSections = document.querySelectorAll('.position-section[data-sector]');
  const indexHoldingSections = document.querySelectorAll('.position-section[data-index]');
  const refreshBtn = document.getElementById('markets-refresh-btn');
  const titleEl = document.querySelector('.site-title');
  const sektorBtn = document.getElementById('pill-sektoren-markets');
  const indizesBtn = document.getElementById('pill-indizes-markets');
  const anleihenBtn = document.getElementById('pill-anleihen-markets');
  const sektorRow = document.getElementById('sektor-row');
  const indizesRow = document.getElementById('indizes-row');
  const indexPillSet = new Set(CONFIG.indexPills);
  const sektorPillSet = new Set(CONFIG.sectorOrder.filter(l => !indexPillSet.has(l)));
  // Ob "Wichtigste News" gerade aufgeklappt ist - wird bei jedem Filter-
  // wechsel zurueckgesetzt (neue Auswahl startet immer eingeklappt).
  let expanded = false;
  // "Alle" ist kein eigener Button mehr (Start-Seite ist einfach der
  // Zustand vor jeder Kategorie-Auswahl) - zeigt nur noch Futures + Makro
  // + allgemeine Schlagzeilen, keine Globalen Indizes/Anleihen mehr.
  let filter = 'Alle';
  // Merkt sich den zuletzt gewaehlten Sektor, damit ein Klick auf "Sektoren"
  // selbst (ohne konkrete Unterauswahl) nicht auf einer leeren Seite landet.
  let lastSector = [...sektorPillSet][0];
  const marketOpen = isUsMarketOpen();

  // Die zuletzt gewaehlte Ansicht wird in localStorage gemerkt (in apply()
  // unten), damit JEDE Art von Neuladen - Aktualisieren-Button, Browser-
  // Reload, Pull-to-Refresh, erneutes Oeffnen ueber ein Lesezeichen - auf
  // derselben Seite landet statt immer auf die Start-Ansicht zu springen.
  // Ein Filter in der URL (z.B. bei einem geteilten Link) hat Vorrang.
  const FILTER_STORAGE_KEY = 'marketFilter';
  const knownFilters = new Set([...CONFIG.sectorOrder, 'Alle', 'Anleihen', INDIZES_OVERVIEW]);
  const urlFilter = new URLSearchParams(location.search).get('filter');
  let storedFilter = null;
  try { storedFilter = localStorage.getItem(FILTER_STORAGE_KEY); } catch (e) { /* z.B. Privatmodus */ }
  const initialFilter = (urlFilter && knownFilters.has(urlFilter)) ? urlFilter
    : (storedFilter && knownFilters.has(storedFilter)) ? storedFilter
    : null;
  if (initialFilter) {
    filter = initialFilter;
    if (sektorPillSet.has(initialFilter)) lastSector = initialFilter;
  }
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => location.reload());
  }
  if (topNewsMoreBtn) {
    topNewsMoreBtn.addEventListener('click', () => { expanded = !expanded; apply(); });
  }
  // Einziger Weg zurueck zur Start-Ansicht (Futures/Makro-Barometer/Groesste
  // Bewegungen) - es gibt keinen eigenen "Alle"-Button mehr, und seit die
  // Ansicht in localStorage gemerkt wird, kaeme man sonst ohne manuelle
  // URL-Aenderung nie wieder dorthin zurueck.
  if (titleEl) {
    titleEl.addEventListener('click', () => {
      filter = 'Alle';
      expanded = false;
      apply();
    });
  }

  function apply() {
    try { localStorage.setItem(FILTER_STORAGE_KEY, filter); } catch (e) { /* z.B. Privatmodus */ }
    const isSektorFilter = sektorPillSet.has(filter);
    const isIndexFilter = indexPillSet.has(filter);
    const isIndizesCategory = isIndexFilter || filter === INDIZES_OVERVIEW;
    const isBondsFilter = filter === 'Anleihen';
    const isStartFilter = filter === 'Alle';
    globalSection.style.display = isIndizesCategory ? '' : 'none';
    // Groesste Bewegungen + Makro-Barometer (VIX/Gold/Oel/Dollar) sind wie
    // Futures immer auf der Start-Ansicht sichtbar, unabhaengig vom
    // gewaehlten Sektor - morgendlicher Marktueberblick auf einen Blick.
    const showTopMovers = isStartFilter && topMoversSection.dataset.hasData === '1';
    topMoversSection.style.display = showTopMovers ? '' : 'none';
    if (showTopMovers) loadFundamentalsForContainer(topMoversSection);
    macroBarometerSection.style.display = isStartFilter ? '' : 'none';
    // Futures gelten nur der Vorboersen-Uebersicht: nur auf der Start-Ansicht
    // und nur solange die Kassaboerse noch geschlossen ist.
    futuresSection.style.display = (isStartFilter && !marketOpen) ? '' : 'none';
    // Anleihen sind eine eigene Rubrik, nicht mehr Teil der Start-Uebersicht.
    bondsSection.style.display = isBondsFilter ? '' : 'none';

    sektorRow.style.display = isSektorFilter ? '' : 'none';
    indizesRow.style.display = isIndizesCategory ? '' : 'none';

    // Innerhalb der Indizes-Kategorie: entweder das kleine Raster aller 7
    // globalen Indizes (Uebersicht) oder die grosse Detailkarte mit
    // Top-Holdings fuer einen der 4 Indizes mit eigener Pille.
    globalHeading.style.display = isIndexFilter ? 'none' : '';
    tickersGrid.style.display = isIndexFilter ? 'none' : '';
    bigIndexView.style.display = isIndexFilter ? '' : 'none';
    if (isIndexFilter) {
      const label = CONFIG.sectorTickerMap[filter][0];
      bigIndexView.innerHTML = bigIndexCardHtml(label, rowsByLabel[label], CONFIG.tickerFlags[label] || '', filter);
    } else {
      globalCards.forEach(card => card.classList.remove('dimmed'));
    }
    positionSections.forEach(sec => {
      const visible = sec.dataset.sector === filter;
      sec.style.display = visible ? '' : 'none';
      if (visible) loadFundamentalsForContainer(sec);
    });
    // Top-Holdings des ausgewaehlten Index unter der grossen Index-Karte zeigen.
    indexHoldingSections.forEach(sec => {
      const visible = sec.dataset.index === filter;
      sec.style.display = visible ? '' : 'none';
      if (visible) loadFundamentalsForContainer(sec);
    });
    // "Wichtigste News" zeigt je nach Filter etwas anderes an derselben
    // Stelle (s. headlinesForFilter) - komplett neu gerendert statt nur
    // ein-/auszublenden, da sich Inhalt und Reihenfolge je Filter unterscheiden.
    if (topNewsHeading) topNewsHeading.textContent = topNewsHeadingFor(filter);
    const topNews = headlinesForFilter(allHeadlines, filter, indexPillSet);
    topNewsContainer.innerHTML = topNews.map((h, i) => headlineHtml(h, i, TOP_NEWS_MAX_VISIBLE)).join('')
      || '<p>Noch keine Schlagzeilen zu dieser Auswahl.</p>';
    topNewsContainer.querySelectorAll('.headline').forEach((el, i) => {
      el.style.display = (i >= TOP_NEWS_MAX_VISIBLE && !expanded) ? 'none' : '';
    });
    if (topNewsMoreBtn) {
      topNewsMoreBtn.classList.toggle('has-more', topNews.length > TOP_NEWS_MAX_VISIBLE);
      topNewsMoreBtn.textContent = expanded ? 'Weniger anzeigen' : 'Mehr anzeigen';
    }

    // Die 3 Kategorie-Pillen sind aktiv, sobald der Filter zu ihrer Kategorie
    // gehoert (nicht 1:1 gleich dem Filterwert - "Sektoren" z.B. fuer alle 5
    // Sektoren). Die Unter-Pillen in den beiden Reihen weiterhin per Wert.
    sektorBtn.classList.toggle('active', isSektorFilter);
    indizesBtn.classList.toggle('active', isIndizesCategory);
    anleihenBtn.classList.toggle('active', isBondsFilter);
    sektorRow.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.label === filter));
    indizesRow.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.label === filter));
  }

  // Delegierter Klick-Handler, da die Sektor-/Indizes-Pillen dynamisch sind
  pillsContainer.addEventListener('click', (e) => {
    const catBtn = e.target.closest('.pill[data-category]');
    if (catBtn) {
      const cat = catBtn.dataset.category;
      if (cat === 'sektor') filter = lastSector;
      else if (cat === 'index') filter = INDIZES_OVERVIEW;
      else if (cat === 'anleihen') filter = 'Anleihen';
      expanded = false;
      apply();
      return;
    }
    const pill = e.target.closest('.pill[data-label]');
    if (!pill) return;
    filter = pill.dataset.label;
    if (sektorPillSet.has(filter)) lastSector = filter;
    expanded = false;
    apply();
  });

  // Klick auf eine Globale-Indizes-Karte (z.B. DAX) in der Indizes-Uebersicht
  // springt direkt zu diesem Index-Filter - so als haette man ihn in der
  // Indizes-Reihe ausgewaehlt. data-sectors traegt bereits den passenden
  // Filter-Namen (siehe renderGlobalIndices); Karten ohne Filter-Pendant
  // (z.B. Nikkei) reagieren nicht.
  tickersGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.ticker-card[data-sectors]');
    if (!card) return;
    const sectors = (card.dataset.sectors || '').split('|').filter(Boolean);
    if (!sectors.length) return;
    filter = sectors[0];
    expanded = false;
    apply();
  });

  apply();
}

// Schneidet die gecachte YTD-Reihe (s. sparklineDataByTicker) auf den
// gewuenschten Zeitraum zu und zeichnet den Mini-Chart der Karte neu -
// Aufruf beim Auf-/Zuklappen (1M beim Aufklappen, YTD beim Zuklappen) und
// beim Antippen des Woche/Monat-Umschalters selbst.
const SPARK_RANGE_DAYS = { '1w': 7, '1m': 30 };
function setSparkRange(card, range) {
  const cached = sparklineDataByTicker.get(card.dataset.ticker);
  const chartBox = card.querySelector('.spark-chart');
  if (!cached || !chartBox) return;
  const days = SPARK_RANGE_DAYS[range];
  const closes = days ? sliceSparklineByDays(cached.closes, cached.dates, days) : cached.closes;
  chartBox.innerHTML = sparklineSvg(closes, cached.isUp, 'mini');
  const toggle = card.querySelector('.spark-range-toggle');
  if (toggle) {
    toggle.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.range === range));
  }
}

// Klick/Tap auf eine Holding-Karte (Markets Top-20 + Index-Holdings) klappt
// die kurze Firmenbeschreibung auf/zu und zoomt den Mini-Chart von YTD auf
// 1 Monat (nochmal antippen klappt beides wieder zu -> zurueck auf YTD) -
// aufgeklappt laesst sich per Umschalter zusaetzlich auf 1 Woche zoomen.
// Kennzahlen (Marktkap./KGV/Marge) laufen separat automatisch, s.
// loadFundamentalsForContainer. Ein Handler je Container statt pro Karte,
// da die Karten dynamisch sind.
function setupPositionExpand() {
  ['position-sections', 'index-holdings'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
      const rangeBtn = e.target.closest('.spark-range-toggle button');
      if (rangeBtn) {
        setSparkRange(rangeBtn.closest('.ticker-card'), rangeBtn.dataset.range);
        return;
      }
      const card = e.target.closest('.ticker-card.expandable');
      if (!card) return;
      const nowExpanded = card.classList.toggle('expanded');
      setSparkRange(card, nowExpanded ? '1m' : 'ytd');
    });
  });
}

// ---------- Fundamentaldaten (Finnhub, on demand beim Aufklappen) ----------
// Marktkap./KGV/Marge nur fuer US-gelistete Ticker (isLiveEligible) verfuegbar
// - Finnhubs Free-Tier deckt auslaendische Boersen nicht ab. Wird nur einmal
// pro Ticker geladen und danach gecacht, damit wiederholtes Auf-/Zuklappen
// nicht erneut Anfragen ausloest.
const fundamentalsCache = new Map();

// Grenzwert deutlich ueber der aktuell groessten realen Marktkapitalisierung -
// manche auslaendisch gelisteten ADRs (z.B. TSM) liefern bei Finnhub
// gelegentlich einen falsch skalierten/waehrungsverwechselten Wert. Statt
// eine offensichtlich unsinnige Zahl (z.B. "$62T") anzuzeigen, dann lieber "n/a".
const MARKET_CAP_SANITY_LIMIT_USD = 15e12;

function formatMarketCap(millions) {
  if (millions === undefined || millions === null || !isFinite(millions)) return 'n/a';
  const usd = millions * 1e6;
  if (usd > MARKET_CAP_SANITY_LIMIT_USD) return 'n/a';
  if (usd >= 1e12) return '$' + (usd / 1e12).toFixed(2) + 'T';
  if (usd >= 1e9) return '$' + (usd / 1e9).toFixed(2) + 'B';
  if (usd >= 1e6) return '$' + (usd / 1e6).toFixed(2) + 'M';
  return '$' + Math.round(usd).toLocaleString('de-DE');
}

// Grobe Einordnung "guenstig/teuer" anhand des KGV - eine reine Faustregel
// ohne Sektor-/Wachstumsbezug, aber fuer einen schnellen ersten Eindruck okay.
function peColorClass(pe) {
  if (pe === undefined || pe === null || !isFinite(pe)) return 'neutral';
  if (pe < 0) return 'down';   // negatives KGV = kein Gewinn, nicht "guenstig"
  if (pe < 15) return 'up';    // eher guenstig/unterbewertet
  if (pe > 25) return 'down';  // eher teuer/ueberbewertet
  return 'neutral';
}

// KGV wird bei einem Gewinn pro Aktie nahe Null technisch korrekt, aber
// praktisch bedeutungslos riesig (z.B. gerade erst profitable Wachstums-
// firmen wie Bloom Energy: 10047x). Trotzdem soll sichtbar bleiben, dass es
// extrem ist - nur eben kompakt als "&gt;500x" statt der ausgeschriebenen
// grossen Zahl, die auf den ersten Blick wie ein Fehler wirkt.
const PE_SANITY_LIMIT = 500;

function peDisplay(pe) {
  if (pe === undefined || pe === null || !isFinite(pe)) return 'n/a';
  if (pe > PE_SANITY_LIMIT) return '>' + PE_SANITY_LIMIT + 'x';
  if (pe < -PE_SANITY_LIMIT) return '<-' + PE_SANITY_LIMIT + 'x';
  return pe.toFixed(1) + 'x';
}

function fundamentalsHtml(data) {
  if (!data) return '<div class="ticker-fundamentals">Kennzahlen aktuell nicht verfügbar.</div>';
  const m = data.metric || {};
  const marketCap = formatMarketCap(m.marketCapitalization);
  const pe = m.peBasicExclExtraTTM ?? m.peExclExtraTTM ?? m.peTTM ?? m.peNormalizedAnnual;
  const peStr = peDisplay(pe);
  const peHtml = '<span class="chg ' + peColorClass(pe) + '">' + peStr + '</span>';
  const margin = m.netProfitMarginTTM ?? m.netProfitMarginAnnual ?? m.netMarginTTM;
  const marginHtml = (margin !== undefined && margin !== null && isFinite(margin))
    ? '<span class="chg ' + (margin > 0 ? 'up' : 'down') + '">' + margin.toFixed(1) + '%</span>'
    : '<span class="chg neutral">n/a</span>';

  // Fehlertext direkt mit anzeigen statt nur in der Konsole - einfacher zu
  // diagnostizieren, ohne dass dafuer die Browser-Devtools noetig sind.
  const errorNote = data.metricError
    ? '<div class="fund-error">Kennzahlen: ' + esc(data.metricError) + '</div>'
    : '';

  return '<div class="ticker-fundamentals">' +
    '<div class="fund-row"><span>Marktkap.</span><span class="fund-value">' + marketCap + '</span></div>' +
    '<div class="fund-row"><span>KGV (P/E)</span>' + peHtml + '</div>' +
    '<div class="fund-row"><span>Nettomarge</span>' + marginHtml + '</div>' +
    errorNote +
    '</div>';
}

// Baut die URL ueber das URL/URLSearchParams-API statt per String-Konkatenation -
// robuster gegen Sonderzeichen/Encoding-Eigenheiten als reines String-Zusammenkleben.
function finnhubUrl(path, params) {
  const url = new URL('https://finnhub.io/api/v1/' + path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set('token', FINNHUB_API_KEY);
  return url.toString();
}

// Holt eine URL und meldet Fehler (HTTP-Status, Nicht-JSON-Antwort oder
// CORS/Netzwerkfehler) zurueck statt zu werfen, damit ein fehlschlagender
// Endpunkt den anderen nicht mitreisst und die Ursache sichtbar bleibt.
// Liest den Body IMMER als Text und parst danach selbst - res.json() wuerde
// bei einer Nicht-JSON-Antwort (z.B. HTML-Fehlerseite) nur einen kryptischen
// Parse-Fehler werfen, ohne zu zeigen was tatsaechlich zurueckkam.
async function fetchJsonSafe(url) {
  let raw;
  try {
    const res = await fetch(url);
    raw = await res.text();
    if (!res.ok) return { error: 'HTTP ' + res.status + (raw ? ' – ' + raw.slice(0, 150) : '') };
  } catch (e) {
    const label = (e && e.name) ? e.name + ': ' : '';
    return { error: label + ((e && e.message) || String(e)) };
  }
  try {
    return { data: JSON.parse(raw) };
  } catch (e) {
    return { error: 'Antwort ist kein JSON: ' + (raw ? raw.slice(0, 150) : '(leer)') };
  }
}

async function loadFundamentals(ticker) {
  if (fundamentalsCache.has(ticker)) return fundamentalsCache.get(ticker);
  const metricResult = await fetchJsonSafe(finnhubUrl('stock/metric', { symbol: ticker, metric: 'all' }));
  const data = {
    metric: (metricResult.data && metricResult.data.metric) || {},
    metricError: metricResult.error || null,
  };
  // Fehlschlaege NICHT cachen (z.B. Finnhub-Rate-Limit) - sonst wuerde ein
  // erneuter Versuch (siehe loadCardExtras) denselben alten Fehler aus dem
  // Cache zurueckbekommen statt wirklich neu abzufragen.
  if (!data.metricError) fundamentalsCache.set(ticker, data);
  return data;
}

// Laedt die Kennzahlen fuer eine Holding-Karte (nur US-gelistete Ticker,
// siehe isLiveEligible - Finnhubs Free-Tier deckt auslaendische Boersen
// nicht ab) - ersetzt den in positionCardHtml immer vorhandenen Platzhalter.
// Wird jetzt automatisch fuer jede sichtbare Karte angestossen (s.
// loadFundamentalsForContainer), nicht mehr erst beim Antippen. Ueber
// card.dataset.extrasLoaded nur einmal PRO ERFOLG geladen - schlaegt der
// Abruf fehl (z.B. Finnhubs Free-Tier-Rate-Limit von 60 Calls/Min, das die
// staendig laufende Live-Kurs-Abfrage schon ausschoepft), wird das Flag
// NICHT gesetzt, damit ein erneuter Besuch der Kategorie es nochmal versucht.
async function loadCardExtras(card) {
  const ticker = card.dataset.ticker;
  const box = card.querySelector('.ticker-fundamentals');
  if (!ticker || !box) return;
  if (card.dataset.extrasLoaded === '1') return;
  const canFetchFundamentals = FINNHUB_API_KEY && isLiveEligible(ticker);
  if (!canFetchFundamentals) {
    // Finnhubs Free-Tier deckt nur US-gelistete Ticker ab - ohne diesen
    // Hinweis sieht eine leere Karte (z.B. bei 600900.SS) wie ein Fehler
    // aus, ist aber gewollt (lieber ehrlich nichts zeigen als geraten).
    box.outerHTML = '<div class="fund-note">Kennzahlen nur für US-gelistete Werte verfügbar.</div>';
    card.dataset.extrasLoaded = '1';
    return;
  }
  const data = await loadFundamentals(ticker);
  // Karte kann inzwischen neu gerendert worden sein (z.B. Live-Preis-Update) -
  // Platzhalter darum erst jetzt frisch nachschlagen statt der alten Referenz
  // von oben zu vertrauen.
  const freshBox = card.querySelector('.ticker-fundamentals');
  if (freshBox) freshBox.outerHTML = fundamentalsHtml(data);
  if (!data.metricError) card.dataset.extrasLoaded = '1';
}

// Serialisierte Warteschlange fuer die Kennzahlen-Abfrage: laedt jetzt
// automatisch fuer alle sichtbaren Holding-Karten (statt erst beim Antippen),
// aber weiterhin nacheinander mit Abstand statt parallel - sonst wuerde das
// Aufrufen einer 20er-Liste sofort 20 gleichzeitige Finnhub-Calls ausloesen
// und zusammen mit der laufenden Live-Kurs-Abfrage (s. startLiveUpdates)
// das Free-Tier-Limit von 60 Calls/Min sprengen.
const fundamentalsQueue = [];
let fundamentalsQueueRunning = false;
function enqueueFundamentals(card) {
  fundamentalsQueue.push(card);
  runFundamentalsQueue();
}
async function runFundamentalsQueue() {
  if (fundamentalsQueueRunning) return;
  fundamentalsQueueRunning = true;
  while (fundamentalsQueue.length) {
    const card = fundamentalsQueue.shift();
    try {
      await loadCardExtras(card);
    } catch (e) {
      console.warn('Kennzahlen-Ladefehler', e);
    }
    delete card.dataset.extrasQueued;
    await new Promise(r => setTimeout(r, FINNHUB_POLL_DELAY_MS));
  }
  fundamentalsQueueRunning = false;
}

// Wird bei jedem Filterwechsel fuer die gerade sichtbare Sektion aufgerufen
// (s. apply() in setupMarketFilter) - stoesst nur Karten an, die noch nicht
// geladen/eingereiht sind, wiederholte Besuche derselben Kategorie sind
// dadurch billig (ueberspringen bereits geladene Karten sofort).
function loadFundamentalsForContainer(container) {
  if (!container) return;
  container.querySelectorAll('.ticker-card.compact[data-ticker]').forEach(card => {
    if (card.dataset.extrasLoaded === '1' || card.dataset.extrasQueued === '1') return;
    // Nur-US-Ticker (kein Finnhub-Call, s. loadCardExtras) muessen nicht in
    // der ratenbegrenzten Warteschlange auf US-Ticker vor ihnen warten -
    // sofort aufloesen, damit sie nicht unnoetig den "Lade..."-Platzhalter
    // haengen lassen.
    if (FINNHUB_API_KEY && isLiveEligible(card.dataset.ticker)) {
      card.dataset.extrasQueued = '1';
      enqueueFundamentals(card);
    } else {
      loadCardExtras(card);
    }
  });
}

// ---------- Live-Kurse (Finnhub) ----------
// Sammelt alle Einzel-Ticker (Sektor-Positionen), die Finnhub im Free-Tier
// in Echtzeit liefert (siehe isLiveEligible), einmal dedupliziert -
// unabhaengig davon, in wie vielen Gruppen sie auftauchen.
function collectLiveTickers() {
  const set = new Set();
  Object.values(CONFIG.sectorPositions).forEach(list => list.forEach(t => { if (isLiveEligible(t)) set.add(t); }));
  return [...set];
}

function updateCardLive(ticker, quote) {
  // c=aktueller Kurs, pc=Vortagesschluss (Finnhub-Feldnamen)
  if (!quote || !quote.c) return;
  const changePct = quote.pc ? Math.round((quote.c - quote.pc) / quote.pc * 1000) / 10 : quote.dp;
  document.querySelectorAll('.ticker-card[data-ticker="' + CSS.escape(ticker) + '"]').forEach(card => {
    card.querySelector('.ticker-price').textContent = priceStrFor(quote.c);
    const chg = card.querySelector('.chg');
    if (chg) chg.outerHTML = changeHtmlFor(changePct);
  });
}

async function fetchQuote(ticker) {
  const res = await fetch('https://finnhub.io/api/v1/quote?symbol=' + encodeURIComponent(ticker) + '&token=' + FINNHUB_API_KEY);
  if (!res.ok) throw new Error('Finnhub HTTP ' + res.status);
  return res.json();
}

async function startLiveUpdates() {
  if (!FINNHUB_API_KEY) return;
  const tickers = collectLiveTickers();
  for (;;) {
    if (document.hidden) {
      await new Promise(r => setTimeout(r, 10000));
      continue;
    }
    for (const ticker of tickers) {
      try {
        const quote = await fetchQuote(ticker);
        updateCardLive(ticker, quote);
      } catch (e) {
        console.warn('Live-Kurs fehlgeschlagen fuer', ticker, e);
      }
      await new Promise(r => setTimeout(r, FINNHUB_POLL_DELAY_MS));
    }
    await new Promise(r => setTimeout(r, FINNHUB_CYCLE_PAUSE_MS));
  }
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

  renderTopMovers(rowsByLabel, headlines);
  renderMacroBarometer(rowsByLabel);
  renderFutures(rowsByLabel);
  renderGlobalIndices(rowsByLabel);
  renderBonds(rowsByLabel);
  renderPositionSections(rowsByLabel);
  renderIndexHoldings(rowsByLabel);
  renderMacroBlock(headlines);

  document.getElementById('updated-line').textContent =
    'Kurse zuletzt: ' + (market.fetched_at ? fmtTime(market.fetched_at) : 'n/a');

  setupMarketFilter(rowsByLabel, headlines);
  setupPositionExpand();
  setupMacroExpand();
  setupIndexChartTooltip();
  startLiveUpdates();
}

init();
