// -----------------------------------------------------------------------
// Struktur-Konfiguration. Aendert sich selten - nur anfassen wenn du
// Sektoren/ETFs/Ticker-Zuordnungen aendern willst. Aktuelle Kurse/News
// kommen separat aus data/headlines.json + data/market.json.
// -----------------------------------------------------------------------
const CONFIG = {
  "tickerGroups": {
    "Futures (Vorbörse)": {
      "Nasdaq Futures": "NQ=F",
      "S&P 500 Futures": "ES=F",
      "Dow Jones Futures": "YM=F",
      "Russell 2000 Futures": "RTY=F",
      "Nikkei 225 Futures": "NIY=F"
    },
    "Globale Indizes": {
      "S&P 500 (USA)": "^GSPC",
      "Nasdaq Composite (USA)": "^IXIC",
      "DAX (Deutschland)": "^GDAXI",
      "Nikkei 225 (Japan)": "^N225",
      "FTSE 100 (UK)": "^FTSE",
      "KOSPI (Südkorea)": "^KS11",
      "Hang Seng (Hongkong)": "^HSI"
    }
  },
  "tickerFlags": {
    "S&P 500 (USA)": "🇺🇸",
    "Nasdaq Composite (USA)": "🇺🇸",
    "DAX (Deutschland)": "🇩🇪",
    "Nikkei 225 (Japan)": "🇯🇵",
    "FTSE 100 (UK)": "🇬🇧",
    "KOSPI (Südkorea)": "🇰🇷",
    "Hang Seng (Hongkong)": "🇭🇰"
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
    "Chips & AI",
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
      "NVDA", "TSM", "MU", "AMD", "INTC", "AVGO", "QCOM", "TXN", "LRCX", "KLAC",
      "AMAT", "ASML", "ARM", "MRVL", "NXPI", "ADI", "ON", "MCHP", "MPWR", "SWKS"
    ],
    "Healthcare": [
      "LLY", "JNJ", "ABBV", "MRK", "UNH", "AMGN", "TMO", "ABT", "GILD", "ISRG",
      "PFE", "DHR", "BSX", "SYK", "VRTX", "BMY", "MDT", "CVS", "CI", "ELV"
    ],
    "Rüstung": [
      "GE", "RTX", "BA", "HWM", "GD", "LHX", "TDG", "NOC", "LMT", "AXON",
      "TXT", "HEI", "CW", "TDY", "LDOS", "HII", "BWXT", "WWD", "KTOS", "MRCY"
    ],
    "Energie & Rohstoffe": [
      "XOM", "CVX", "COP", "EOG", "SLB", "WMB", "VLO", "PSX", "MPC", "BKR",
      "KMI", "TRG", "OXY", "FANG", "EQT", "HAL", "DVN", "CTRA", "HES", "APA"
    ],
    "Konsumgüter": [
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
  // Ungefaehre Gewichtung je Holding INNERHALB des jeweiligen ETFs (nicht zu
  // verwechseln mit sectorWeights, das sind andere Referenz-Indizes). Nur
  // fuer die Anzeige, manuell recherchiert (Stand Jul 2026), keine Live-Daten.
  "personalEtfWeights": {
    "Scalable MSCI ACWI": {
      "NVDA": 4.5, "MSFT": 4.2, "AAPL": 3.8, "AMZN": 2.0, "META": 1.5,
      "AVGO": 1.4, "GOOGL": 1.3, "GOOG": 1.1, "TSM": 1.0, "TSLA": 0.9
    },
    "Amundi Stoxx Europe 600": {
      "ASML.AS": 2.8, "SIE.DE": 1.7, "NOVN.SW": 1.8, "NESN.SW": 1.7,
      "SHEL.L": 1.6, "SAP.DE": 1.5, "AZN.L": 1.5, "ROG.SW": 1.3,
      "HSBA.L": 1.2, "SAN.MC": 0.9
    },
    "iShares Global Clean Energy": {
      "FSLR": 7.0, "IBE.MC": 6.0, "VWS.CO": 5.0, "EDP.LS": 4.5, "ENPH": 4.0,
      "600900.SS": 4.0, "ORA": 3.5, "EQTL3.SA": 3.0, "BE": 3.0, "NXT": 2.5
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
    "ASML.AS": "Einziger Hersteller von EUV-Lithografiemaschinen – ohne diese Maschinen keine modernen Chips.",
    "ROG.SW": "Schweizer Pharma- und Diagnostik-Konzern, u.a. stark in Onkologie.",
    "HSBA.L": "Eine der größten Banken Europas/der Welt, Fokus auf Asien-Geschäft.",
    "AZN.L": "Britisch-schwedischer Pharmakonzern, u.a. Onkologie und Atemwegserkrankungen.",
    "NOVN.SW": "Schweizer Pharmakonzern mit Fokus auf verschreibungspflichtige Medikamente.",
    "NESN.SW": "Weltgrößter Lebensmittelkonzern (u.a. Nescafé, KitKat, Babynahrung).",
    "SIE.DE": "Deutscher Industriekonzern – Automatisierung, Energietechnik, Mobilität.",
    "SHEL.L": "Britisch-niederländischer Öl- und Gaskonzern, einer der globalen \"Supermajors\".",
    "SAP.DE": "Größter europäischer Softwarekonzern, v.a. Unternehmenssoftware (ERP).",
    "SAN.MC": "Eine der größten Banken Spaniens/Europas mit starkem Lateinamerika-Geschäft.",
    "NXT": "Baut Nachführsysteme für Solarparks (Solar-Tracker), die Sonnenkollektoren effizienter ausrichten.",
    "BE": "Stellt Brennstoffzellen zur dezentralen Stromerzeugung her.",
    "FSLR": "Einer der größten US-Solarmodul-Hersteller.",
    "IBE.MC": "Spanischer Energiekonzern, weltweit einer der größten im Bereich Windkraft.",
    "600900.SS": "Größter Wasserkraft-Betreiber Chinas (u.a. Drei-Schluchten-Damm).",
    "ORA": "Baut Geothermie-Kraftwerke zur Stromerzeugung aus Erdwärme.",
    "ENPH": "Stellt Wechselrichter und Speichersysteme für Solaranlagen her.",
    "EQTL3.SA": "Brasilianischer Energiekonzern (Stromverteilung/-erzeugung).",
    "VWS.CO": "Einer der größten Windturbinen-Hersteller der Welt.",
    "EDP.LS": "Portugiesischer Energiekonzern mit starkem Fokus auf erneuerbare Energien."
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

// Finnhub liefert Echtzeit-Kurse nur fuer normale, an US-Boersen gelistete
// Symbole (kein Praefix/Suffix). Indizes (^...), Futures (...=F) und
// auslaendische Ticker (z.B. ASML.AS) bleiben beim taeglichen Snapshot.
function isLiveEligible(ticker) {
  return !!ticker && !ticker.includes('.') && !ticker.startsWith('^') && !ticker.endsWith('=F');
}

function priceCardHtml(label, row, flag, extraAttrs, ticker) {
  row = row || {};
  const live = ticker && isLiveEligible(ticker) && FINNHUB_API_KEY;
  const liveDot = live ? '<span class="live-dot" title="Live-Kurs (Finnhub)"></span>' : '';
  const prefix = flag ? flag + ' ' : '';
  const tickerAttr = live ? ' data-ticker="' + esc(ticker) + '"' : '';
  const dir = direction(row.change_pct);
  const spark = sparklineSvg(row.sparkline, dir.cls !== 'down', 'small');
  return '<div class="ticker-card"' + (extraAttrs || '') + tickerAttr + '>' +
    '<div class="ticker-label">' + prefix + esc(label) + liveDot + '</div>' +
    '<div class="ticker-price">' + priceStrFor(row.price) + '</div>' +
    changeHtmlFor(row.change_pct) +
    spark +
    '</div>';
}

// Kleiner Trend-Graph (letzte paar Tagesschluesse + aktueller Kurs) fuer die
// grosse Index-Detailkarte. Reines SVG, keine Chart-Bibliothek.
function sparklineSvg(closes, isUp, extraClass) {
  if (!closes || closes.length < 2) return '';
  const w = 240, h = 56, pad = 4;
  const min = Math.min(...closes), max = Math.max(...closes);
  const range = (max - min) || 1;
  const stepX = (w - pad * 2) / (closes.length - 1);
  const points = closes.map((c, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (c - min) / range) * (h - pad * 2);
    return x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
  const color = isUp ? '#3fb950' : '#f85149';
  const cls = 'sparkline' + (extraClass ? ' ' + extraClass : '');
  return '<svg class="' + cls + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
    '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="2" ' +
    'stroke-linejoin="round" stroke-linecap="round"/></svg>';
}

// Grosse, zentrierte Karte fuer einen ausgewaehlten Index (Nasdaq/S&P 500/
// DAX/KOSPI) statt des kleinen Grid-Feldes - inkl. Mini-Graph der letzten Tage.
function bigIndexCardHtml(label, row, flag) {
  row = row || {};
  const dir = direction(row.change_pct);
  const spark = sparklineSvg(row.sparkline, dir.cls !== 'down');
  const prefix = flag ? flag + ' ' : '';
  return '<div class="big-index-card">' +
    '<div class="big-index-label">' + prefix + esc(label) + '</div>' +
    '<div class="big-index-price">' + priceStrFor(row.price) + '</div>' +
    changeHtmlFor(row.change_pct) +
    spark +
    '</div>';
}

// Kompakte Karte fuer Sektor-Positionen: Ticker-Symbol gross+vorne (statt
// Vollname), Vollname klein darunter, Gewichtung im Sektor-ETF oben rechts.
// Klick/Tap klappt eine kurze Firmenbeschreibung auf (falls vorhanden).
function positionCardHtml(ticker, row, weight) {
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
  return '<div class="ticker-card compact' + expandableClass + '" data-ticker="' + esc(ticker) + '">' +
    '<div class="ticker-top">' +
      '<span class="ticker-symbol">' + esc(ticker) + liveDot + '</span>' +
      weightHtml +
    '</div>' +
    '<div class="ticker-name">' + esc(name) + '</div>' +
    '<div class="ticker-bottom">' +
      '<span class="ticker-price">' + priceStrFor(row.price) + '</span>' +
      changeHtmlFor(row.change_pct) +
    '</div>' +
    descHtml +
    '</div>';
}

// ---------- Rendering: Markets-Tab ----------
function renderMarketPills() {
  // "Alle" separat/abgesetzt oben, neben den "Sektor"- und "Indizes"-Dropdowns
  document.getElementById('pill-alle-markets').outerHTML =
    '<button class="pill pill-all active" id="pill-alle-markets" data-label="Alle">Alle</button>';

  // Sektor-Pillen ohne die 4 reinen Index-Pillen (die wandern ins "Indizes"-Dropdown)
  const indexPills = new Set(CONFIG.indexPills);
  const sectorMenuHtml = CONFIG.sectorOrder
    .filter(label => !indexPills.has(label))
    .map(label => '<button class="pill" data-label="' + esc(label) + '">' + esc(label) + '</button>')
    .join('');
  document.getElementById('sektor-menu').innerHTML = sectorMenuHtml;

  document.getElementById('indizes-menu').innerHTML = CONFIG.indexPills.map(label =>
    '<button class="pill" data-label="' + esc(label) + '">' + esc(label) + '</button>'
  ).join('');
}

function renderFutures(rowsByLabel) {
  const cards = Object.keys(CONFIG.tickerGroups['Futures (Vorbörse)']).map(label =>
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
    const cards = tickers.map(t => positionCardHtml(t, rowsByLabel[t], CONFIG.sectorWeights[t]));
    html += '<div class="section position-section" data-sector="' + esc(sector) + '" style="display:none">' +
      '<h2>' + esc(sector) + ' – Top ' + tickers.length + '</h2>' +
      '<div class="tickers">' + cards.join('') + '</div></div>';
  });
  container.innerHTML = html;
}

function renderMarketHeadlines(headlines) {
  const investLabels = new Set(Object.keys(CONFIG.personalEtfs));
  const marketHeadlines = headlines.filter(h => !investLabels.has(h.label) && h.label !== 'Fed / Makro');
  const html = marketHeadlines.map((h, i) => headlineHtml(h, i, MAX_VISIBLE)).join('');
  document.getElementById('headlines-markets').innerHTML = html || '<p>Noch keine Schlagzeilen gesammelt.</p>';
  document.getElementById('more-btn').style.display = marketHeadlines.length > MAX_VISIBLE ? 'block' : 'none';
  return marketHeadlines;
}

// Fed/Makro ist kein Sektor-Filter mehr, sondern ein eigener, immer
// sichtbarer Block oberhalb der Pillen (unabhaengig vom gewaehlten Filter).
function renderFedMakroBlock(headlines) {
  const fedHeadlines = headlines.filter(h => h.label === 'Fed / Makro');
  const html = fedHeadlines.map((h, i) => headlineHtml(h, i, null)).join('');
  document.getElementById('headlines-fedmakro').innerHTML = html || '<p>Noch keine Fed/Makro-Schlagzeilen gesammelt.</p>';
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
    const weights = CONFIG.personalEtfWeights[name] || {};
    const cards = tickers.map(t => positionCardHtml(t, rowsByLabel[t], weights[t]));
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
function setupMarketFilter(rowsByLabel) {
  const pillsContainer = document.getElementById('pills-markets');
  const headlines = document.querySelectorAll('#headlines-markets .headline');
  const futuresSection = document.getElementById('futures-section');
  const globalSection = document.getElementById('global-indices-section');
  const globalHeading = globalSection.querySelector('h2');
  const tickersGrid = globalSection.querySelector('.tickers');
  const globalCards = globalSection.querySelectorAll('.ticker-card');
  const bigIndexView = document.getElementById('big-index-view');
  const positionSections = document.querySelectorAll('.position-section[data-sector]');
  const moreBtn = document.getElementById('more-btn');
  const sektorDropdown = document.getElementById('sektor-dropdown');
  const indizesDropdown = document.getElementById('indizes-dropdown');
  const indexPillSet = new Set(CONFIG.indexPills);
  let expanded = false;
  let filter = 'Alle';
  const marketOpen = isUsMarketOpen();

  function apply() {
    const hasPositions = [...positionSections].some(s => s.dataset.sector === filter);
    const isIndexFilter = indexPillSet.has(filter);
    globalSection.style.display = hasPositions ? 'none' : '';
    // Futures gelten nur der Vorboersen-Uebersicht: nur im "Alle"-Filter und
    // nur solange die Kassaboerse noch geschlossen ist.
    futuresSection.style.display = (filter === 'Alle' && !marketOpen) ? '' : 'none';

    // Ein einzelner ausgewaehlter Index (Nasdaq/S&P 500/DAX/KOSPI) bekommt eine
    // grosse, zentrierte Karte mit Mini-Graph statt des kleinen Grid-Feldes.
    // Die "Globale Indizes"-Ueberschrift ist dann redundant und wird ausgeblendet.
    globalHeading.style.display = isIndexFilter ? 'none' : '';
    tickersGrid.style.display = isIndexFilter ? 'none' : '';
    bigIndexView.style.display = isIndexFilter ? '' : 'none';
    if (isIndexFilter) {
      const label = CONFIG.sectorTickerMap[filter][0];
      bigIndexView.innerHTML = bigIndexCardHtml(label, rowsByLabel[label], CONFIG.tickerFlags[label] || '');
    } else {
      globalCards.forEach(card => {
        if (filter === 'Alle') { card.classList.remove('dimmed'); return; }
        const sectors = (card.dataset.sectors || '').split('|');
        card.classList.toggle('dimmed', !sectors.includes(filter));
      });
    }
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
    sektorDropdown.classList.remove('open');
    indizesDropdown.classList.remove('open');
  }

  // Delegierter Klick-Handler, da die Sektor-/Indizes-Untermenue-Pillen dynamisch sind
  pillsContainer.addEventListener('click', (e) => {
    const sektorToggle = e.target.closest('#sektor-toggle');
    if (sektorToggle) { indizesDropdown.classList.remove('open'); sektorDropdown.classList.toggle('open'); return; }
    const indizesToggle = e.target.closest('#indizes-toggle');
    if (indizesToggle) { sektorDropdown.classList.remove('open'); indizesDropdown.classList.toggle('open'); return; }
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

// Klick/Tap auf eine Holding-Karte (Markets Top-20 + Invest-ETF-Holdings)
// klappt die Firmenbeschreibung auf und laedt bei Bedarf Kennzahlen nach.
// Ein Handler je Container statt pro Karte, da die Karten dynamisch sind.
function setupPositionExpand() {
  ['position-sections', 'invest-holdings'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
      const card = e.target.closest('.ticker-card.expandable');
      if (!card) return;
      card.classList.toggle('expanded');
      if (card.classList.contains('expanded')) loadCardFundamentals(card);
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

function fmtEps(v) {
  return (v !== undefined && v !== null && isFinite(v)) ? Number(v).toFixed(2) : 'n/a';
}

function fundamentalsHtml(data) {
  if (!data) return '<div class="ticker-fundamentals">Kennzahlen aktuell nicht verfügbar.</div>';
  const m = data.metric || {};
  const marketCap = formatMarketCap(m.marketCapitalization);
  const pe = m.peBasicExclExtraTTM ?? m.peExclExtraTTM ?? m.peTTM ?? m.peNormalizedAnnual;
  const peStr = (pe !== undefined && pe !== null && isFinite(pe)) ? pe.toFixed(1) + 'x' : 'n/a';
  const margin = m.netProfitMarginTTM ?? m.netProfitMarginAnnual ?? m.netMarginTTM;
  const marginHtml = (margin !== undefined && margin !== null && isFinite(margin))
    ? '<span class="chg ' + (margin > 0 ? 'up' : 'down') + '">' + margin.toFixed(1) + '%</span>'
    : '<span class="chg neutral">n/a</span>';

  let earningsRow = '';
  if (data.latestEarnings) {
    const e = data.latestEarnings;
    const hasBoth = e.actual !== null && e.actual !== undefined && e.estimate !== null && e.estimate !== undefined;
    const beatCls = hasBoth ? (e.actual >= e.estimate ? 'up' : 'down') : 'neutral';
    const valueStr = hasBoth
      ? 'EPS ' + fmtEps(e.actual) + ' / erw. ' + fmtEps(e.estimate)
      : 'EPS ' + fmtEps(e.actual);
    earningsRow = '<div class="fund-row"><span>Letzte Quartalszahlen' +
      (e.period ? ' (' + esc(e.period) + ')' : '') + '</span>' +
      '<span class="chg ' + beatCls + '">' + esc(valueStr) + '</span></div>';
  }

  // Fehlertext direkt mit anzeigen statt nur in der Konsole - einfacher zu
  // diagnostizieren, ohne dass dafuer die Browser-Devtools noetig sind.
  let errorNote = '';
  const errParts = [];
  if (data.metricError) errParts.push('Kennzahlen: ' + data.metricError);
  if (data.earningsError) errParts.push('Earnings: ' + data.earningsError);
  if (errParts.length) errorNote = '<div class="fund-error">' + esc(errParts.join(' · ')) + '</div>';

  return '<div class="ticker-fundamentals">' +
    '<div class="fund-row"><span>Marktkapitalisierung</span><span>' + marketCap + '</span></div>' +
    '<div class="fund-row"><span>KGV (P/E)</span><span>' + peStr + '</span></div>' +
    '<div class="fund-row"><span>Nettomarge</span>' + marginHtml + '</div>' +
    earningsRow +
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
  const [metricResult, earningsResult] = await Promise.all([
    fetchJsonSafe(finnhubUrl('stock/metric', { symbol: ticker, metric: 'all' })),
    fetchJsonSafe(finnhubUrl('stock/earnings', { symbol: ticker })),
  ]);
  const earningsList = Array.isArray(earningsResult.data) ? earningsResult.data.slice() : [];
  earningsList.sort((a, b) => new Date(b.period || 0) - new Date(a.period || 0));
  const data = {
    metric: (metricResult.data && metricResult.data.metric) || {},
    metricError: metricResult.error || null,
    latestEarnings: earningsList[0] || null,
    earningsError: earningsResult.error || null,
  };
  fundamentalsCache.set(ticker, data);
  return data;
}

async function loadCardFundamentals(card) {
  const ticker = card.dataset.ticker;
  if (!ticker || !FINNHUB_API_KEY || !isLiveEligible(ticker)) return;
  if (card.querySelector('.ticker-fundamentals')) return; // schon geladen/laedt bereits
  const desc = card.querySelector('.ticker-desc');
  const box = document.createElement('div');
  box.className = 'ticker-fundamentals';
  box.textContent = 'Lade Kennzahlen…';
  desc.insertAdjacentElement('afterend', box);
  const data = await loadFundamentals(ticker);
  box.outerHTML = fundamentalsHtml(data);
}

// ---------- Live-Kurse (Finnhub) ----------
// Sammelt alle Einzel-Ticker (Sektor-Positionen + ETF-Holdings), die
// Finnhub im Free-Tier in Echtzeit liefert (siehe isLiveEligible), einmal
// dedupliziert - unabhaengig davon, in wie vielen Gruppen sie auftauchen.
function collectLiveTickers() {
  const set = new Set();
  Object.values(CONFIG.sectorPositions).forEach(list => list.forEach(t => { if (isLiveEligible(t)) set.add(t); }));
  Object.values(CONFIG.personalEtfs).forEach(list => list.forEach(t => { if (isLiveEligible(t)) set.add(t); }));
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

  renderFutures(rowsByLabel);
  renderGlobalIndices(rowsByLabel);
  renderPositionSections(rowsByLabel);
  renderEtfCards(rowsByLabel);
  renderInvestHoldings(rowsByLabel);
  renderMarketHeadlines(headlines);
  renderFedMakroBlock(headlines);
  renderInvestHeadlines(headlines);

  document.getElementById('updated-line').textContent =
    'Kurse zuletzt: ' + (market.fetched_at ? fmtTime(market.fetched_at) : 'n/a');

  setupTabs();
  setupMarketFilter(rowsByLabel);
  setupInvestFilter();
  setupPositionExpand();
  startLiveUpdates();
}

init();
