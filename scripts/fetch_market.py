"""
Holt aktuelle Kurse/Futures-Staende direkt vom oeffentlichen Yahoo-Finance-
Chart-Endpunkt und speichert eine Momentaufnahme in data/market.json.
Reine Zahlen, keine Interpretation.

Bewusst OHNE yfinance's fast_info/quoteSummary: der braucht ein
Crumb/Cookie-Consent-Verfahren, das auf CI-Runnern unzuverlaessig ist.
Der Chart-Endpunkt liefert Kurs + Vortagesschluss ohne diesen Aufwand.
"""
import json
import os
import sys
import threading
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone

from curl_cffi import requests as cffi_requests

sys.path.insert(0, os.path.dirname(__file__))
from config import (
    TICKER_GROUPS, SECTOR_POSITIONS, INDEX_HOLDINGS, FRED_BOND_SERIES,
)

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "docs", "data", "market.json")

# Anzahl gleichzeitiger Anfragen an Yahoo/FRED. Frueher lief das strikt
# sequenziell mit 1.5s Pause zwischen jedem Call (~170 Ticker * 1.5s = ueber
# 4 Min. allein fuer diesen Schritt, ohne dass dafuer je ein konkretes
# Rate-Limit-Problem beobachtet wurde - reine Vorsicht). Ein Thread-Pool
# schickt stattdessen bis zu 8 Anfragen gleichzeitig raus, was den Schritt
# auf ca. 15-25s druecken sollte. 8 ist bewusst moderat (kein unbegrenztes
# asyncio-Sperrfeuer) - reicht fuer die Beschleunigung, ohne wie ein DoS
# auf Yahoos Endpunkt auszusehen.
MAX_WORKERS = 8

# curl_cffi imitiert einen echten Chrome-Browser (TLS-Fingerprint) -
# umgeht Yahoos Bot-/Cloud-IP-Erkennung besser als ein normaler requests-Call.
# Eine Session pro Thread (nicht global geteilt) - curl_cffi-Sessions sind
# nicht als thread-safe dokumentiert, parallele .get()-Aufrufe auf demselben
# Objekt waeren ein Risiko. threading.local() gibt jedem Worker-Thread seine
# eigene, wiederverwendete Session (kein Handshake-Overhead pro Ticker).
_thread_local = threading.local()


def _session() -> cffi_requests.Session:
    if not hasattr(_thread_local, "session"):
        _thread_local.session = cffi_requests.Session(impersonate="chrome")
    return _thread_local.session

CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart/{ticker}"
FRED_CSV_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"

# Gruppen-Ticker (Futures/Globale Indizes) - Label != Ticker-Symbol
GROUP_TICKERS = {
    label: ticker
    for group in TICKER_GROUPS.values()
    for label, ticker in group.items()
}

# Alle Einzel-Ticker aus Sektor-Positionen + Index-Holdings, dedupliziert.
# Hier ist Label == Ticker-Symbol selbst (Anzeigename kommt aus TICKER_NAMES
# in build_page.py).
_position_tickers = set()
for _tickers in SECTOR_POSITIONS.values():
    _position_tickers.update(_tickers)
for _tickers in INDEX_HOLDINGS.values():
    _position_tickers.update(_tickers)

ALL_TICKERS = {**GROUP_TICKERS, **{t: t for t in _position_tickers}}

# Anleihen-Renditen sind Prozentwerte, keine Geldbetraege - fuer diese Labels
# wird nie in Euro umgerechnet (und das Waehrungsfeld wird verworfen, sonst
# koennte die Anzeige faelschlich einen Waehrungs-Badge dazu zeigen). Gilt
# fuer beide Anleihen-Quellen (Yahoo + FRED).
BOND_LABELS = set(TICKER_GROUPS["Anleihen"].keys()) | set(FRED_BOND_SERIES.keys())

# Globale Indizes sind Punktestaende, keine Geldbetraege - Yahoo haengt zwar
# trotzdem eine "Waehrung" der jeweiligen Boerse dran (z.B. KRW fuer KOSPI),
# aber der Indexstand durch den EUR/KRW-Kurs zu teilen ergibt keinen echten
# Euro-Preis, nur eine sinnlose Zahl. Also wie Anleihen von der Umrechnung
# ausnehmen. VIX und Dollar-Index sind ebenfalls Punktestaende (kein reales
# Handelsgut wie Gold/Oel) - Gold/Oel aus "Makro-Barometer" bekommen
# bewusst KEINEN Sonderstatus und werden ganz normal in Euro umgerechnet.
INDEX_STYLE_LABELS = {"VIX (Volatilität)", "Dollar-Index"}
NO_CURRENCY_LABELS = BOND_LABELS | set(TICKER_GROUPS["Globale Indizes"].keys()) | INDEX_STYLE_LABELS

# Fuer diese Labels wird zusaetzlich eine kurze Kursreihe gespeichert -
# Grundlage fuer die Mini-Graphen bei der Index-Detailansicht sowie (seit
# der einspaltigen Top-20-Listendarstellung) den Mini-Chart auf jeder
# Positions-/Holdings-Karte. Kein zusaetzlicher API-Call: fetch_ticker()
# berechnet die Kursreihe ohnehin fuer jeden Ticker, sie wurde bisher nur
# fuer Nicht-Positions-Ticker verworfen statt gespeichert.
SPARKLINE_LABELS = (
    set(TICKER_GROUPS["Globale Indizes"].keys())
    | set(TICKER_GROUPS["Anleihen"].keys())
    | set(TICKER_GROUPS["Makro-Barometer"].keys())
    | set(FRED_BOND_SERIES.keys())
    | _position_tickers
)


def fetch_ticker(
    ticker: str, range_: str = "5d"
) -> tuple[float | None, float | None, list[float], str | None, list[str]]:
    resp = _session().get(
        CHART_URL.format(ticker=ticker),
        params={"interval": "1d", "range": range_},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()

    result = data.get("chart", {}).get("result")
    if not result:
        err = data.get("chart", {}).get("error")
        raise ValueError(f"Kein Ergebnis von Yahoo: {err}")

    meta = result[0]["meta"]
    price = meta.get("regularMarketPrice")
    prev_close = meta.get("previousClose") or meta.get("chartPreviousClose")
    # Waehrung, in der Yahoo den Kurs ausliefert (z.B. KRW fuer .KS-Ticker,
    # EUR fuer .DE) - ohne diese Angabe sind auslaendische Kurse (z.B. SK
    # Hynix in KRW) leicht mit USD zu verwechseln.
    currency = meta.get("currency")

    # Datum je Schlusskurs (parallel zur Kursreihe) - fuer die X-Achse des
    # Index-Detailcharts. Yahoos "timestamp"-Array ist parallel zu
    # quote[0].close, deswegen vor dem Rausfiltern von None-Kursen zippen.
    closes = []
    dates: list[str] = []
    timestamps = result[0].get("timestamp") or []
    quotes = result[0].get("indicators", {}).get("quote", [{}])
    if quotes:
        raw_closes = quotes[0].get("close", []) or []
        for ts, c in zip(timestamps, raw_closes):
            if c is not None:
                closes.append(round(c, 2))
                dates.append(datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%d"))
    if price is not None and (not closes or closes[-1] != price):
        closes.append(round(price, 2))
        dates.append(datetime.now(timezone.utc).strftime("%Y-%m-%d"))

    return price, prev_close, closes, currency, dates


def fetch_fred_series(
    series_id: str, since: str | None = None, tail: int = 6
) -> tuple[float, float | None, list[float], list[str]]:
    """Anleihen-Rendite von FRED (St. Louis Fed) - oeffentlicher CSV-Export,
    kein API-Key noetig, liefert die komplette Historie (FRED filtert nicht
    serverseitig). "since" (YYYY-MM-DD) schneidet hier lokal auf einen
    Zeitraum zu (z.B. Jahresanfang fuer eine YTD-Ansicht) - ein Punkt VOR
    dem Cutoff bleibt zusaetzlich drin, damit z.B. im Januar trotzdem ein
    echter Vortagesschluss fuer change_pct existiert. Ohne "since": nur die
    letzten `tail` Punkte (Kurzform fuer Faelle ohne YTD-Bedarf)."""
    resp = _session().get(FRED_CSV_URL.format(series_id=series_id), timeout=10)
    resp.raise_for_status()
    lines = resp.text.strip().splitlines()
    dates: list[str] = []
    values: list[float] = []
    for line in lines[1:]:  # erste Zeile ist der Spaltenkopf
        date, _, value = line.partition(",")
        if not value or value == ".":  # "." = fehlender Monatswert bei FRED
            continue
        dates.append(date)
        values.append(round(float(value), 2))
    if not values:
        raise ValueError(f"Keine Datenpunkte fuer FRED-Serie {series_id}")
    if since:
        idx = next((i for i, d in enumerate(dates) if d >= since), len(dates))
        start = max(idx - 1, 0)
        dates, values = dates[start:], values[start:]
    else:
        values, dates = values[-tail:], dates[-tail:]
    price = values[-1]
    prev_close = values[-2] if len(values) >= 2 else None
    return price, prev_close, values, dates


def fetch_fx_rates(currencies: set[str]) -> dict[str, float]:
    """EUR-Wechselkurse fuer alle Fremdwaehrungen, die tatsaechlich gebraucht
    werden (z.B. EURKRW=X liefert, wie viel Won 1 Euro gerade wert ist)."""
    def _one(ccy: str) -> tuple[str, float | None]:
        try:
            price, _, _, _, _ = fetch_ticker(f"EUR{ccy}=X")
            return ccy, price
        except Exception as e:
            print(f"[WARN] Wechselkurs EUR/{ccy} nicht abrufbar: {e}", file=sys.stderr)
            return ccy, None

    rates: dict[str, float] = {}
    if not currencies:
        return rates
    with ThreadPoolExecutor(max_workers=min(MAX_WORKERS, len(currencies))) as pool:
        for ccy, price in pool.map(_one, sorted(currencies)):
            if price:
                rates[ccy] = price
    return rates


YTD_SINCE = f"{datetime.now(timezone.utc).year}-01-01"


def _fetch_yahoo_row(label: str, ticker: str) -> dict:
    try:
        # Anleihen, Globale Indizes (Detailchart) und alle einzelnen Holdings
        # zeigen einen detaillierten YTD-Graph statt nur der letzten paar
        # Tage - Yahoo liefert das direkt ueber range=ytd, keine eigene
        # Backfill-/Speicherlogik noetig. Futures/Makro-Barometer bleiben bei
        # "5d" (kurzfristige Signale, YTD waere dort wenig aussagekraeftig).
        range_ = "ytd" if (
            label in TICKER_GROUPS["Anleihen"]
            or label in TICKER_GROUPS["Globale Indizes"]
            or label in _position_tickers
        ) else "5d"
        price, prev_close, closes, currency, dates = fetch_ticker(ticker, range_=range_)
        # Yahoos meta.previousClose haengt manchmal der taeglichen
        # Schlusskurs-Reihe hinterher (asynchrone Cache-Aktualisierung) - das
        # fuehrt zu falschen Tagesveraenderungen, die nicht zum angezeigten
        # Sparkline-Verlauf passen (beobachtet u.a. bei DAX, Amundi Stoxx
        # Europe 600, iShares Global Clean Energy, Jul 2026). Die
        # tatsaechliche Kursreihe ist verlaesslicher: der vorletzte Eintrag
        # (der letzte ist der aktuelle Kurs) ist der echte Vortagesschluss.
        if len(closes) >= 2:
            prev_close = closes[-2]
        change_pct = None
        if price is not None and prev_close:
            change_pct = round((price - prev_close) / prev_close * 100, 2)
        row = {
            "label": label,
            "ticker": ticker,
            "price": round(price, 2) if price is not None else None,
            "prev_close": round(prev_close, 2) if prev_close else None,
            "change_pct": change_pct,
            "currency": None if label in NO_CURRENCY_LABELS else currency,
        }
        if label in SPARKLINE_LABELS:
            row["sparkline"] = closes
            row["sparkline_dates"] = dates
        return row
    except Exception as e:
        print(f"[WARN] Fehler bei {label} ({ticker}): {e}", file=sys.stderr)
        return {
            "label": label, "ticker": ticker,
            "price": None, "prev_close": None, "change_pct": None,
            "error": str(e),
        }


def _fetch_fred_row(label: str, series_id: str) -> dict:
    try:
        price, prev_close, values, dates = fetch_fred_series(series_id, since=YTD_SINCE)
        change_pct = None
        if price is not None and prev_close:
            change_pct = round((price - prev_close) / prev_close * 100, 2)
        row = {
            "label": label,
            "ticker": series_id,
            "price": price,
            "prev_close": prev_close,
            "change_pct": change_pct,
            "currency": None,
        }
        if label in SPARKLINE_LABELS:
            row["sparkline"] = values
            row["sparkline_dates"] = dates
        return row
    except Exception as e:
        print(f"[WARN] Fehler bei {label} ({series_id}): {e}", file=sys.stderr)
        return {
            "label": label, "ticker": series_id,
            "price": None, "prev_close": None, "change_pct": None,
            "error": str(e),
        }


def fetch_snapshot() -> list[dict]:
    # Frueher sequenziell mit 1.5s Pause zwischen jedem der ~170 Ticker (ueber
    # 4 Min. allein hierfuer). ALL_TICKERS ist bereits vollstaendig
    # dedupliziert (kein Ticker wird doppelt abgefragt, s. _position_tickers/
    # ALL_TICKERS oben) - der Zeitgewinn kommt also nicht aus weniger
    # Anfragen, sondern daraus, bis zu MAX_WORKERS davon gleichzeitig statt
    # nacheinander zu stellen (s. MAX_WORKERS-Kommentar oben).
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        rows = list(pool.map(_fetch_yahoo_row, ALL_TICKERS.keys(), ALL_TICKERS.values()))

        # Zusaetzliche Anleihen-Renditen ueber FRED statt Yahoo (s. Kommentar
        # bei FRED_BOND_SERIES in config.py) - eigener, kleiner Durchlauf, da
        # andere Quelle/Funktion als die Yahoo-Ticker oben. Laeuft im selben
        # Pool, sobald die Yahoo-Ticker-Futures abgearbeitet sind.
        rows += list(pool.map(
            _fetch_fred_row, FRED_BOND_SERIES.keys(), FRED_BOND_SERIES.values(),
        ))

    # Alles in Euro umrechnen (bewusst nicht fuer Anleihen/Indizes, s.
    # NO_CURRENCY_LABELS oben) - Nutzerin ist in Europa und will keine
    # Fremdwaehrungen im Kopf umrechnen. change_pct bleibt unveraendert
    # (Tagesbewegung in Prozent ist waehrungsunabhaengig genug dafuer).
    currencies_needed = {
        r["currency"] for r in rows
        if r.get("currency") and r["currency"] != "EUR" and r.get("price") is not None
    }
    fx_rates = fetch_fx_rates(currencies_needed)
    for r in rows:
        ccy = r.get("currency")
        if ccy and ccy != "EUR" and r.get("price") is not None:
            rate = fx_rates.get(ccy)
            if rate:
                r["price_eur"] = round(r["price"] / rate, 2)
    return rows


def compute_top_movers(rows: list[dict], count: int = 5) -> list[str]:
    """5 Einzel-Ticker (Sektor-Positionen/Index-Holdings) mit der groessten
    Tagesbewegung - nicht fuer die Anzeige (das berechnet renderTopMovers()
    in app.js nochmal selbst client-seitig aus denselben Daten), sondern
    damit fetch_news.py weiss, fuer welche Ticker sich eine gezielte "warum
    bewegt sich das" News-Suche lohnt. Zahl (5) muss mit app.js uebereinstimmen."""
    candidates = [
        r for r in rows
        if r["label"] in _position_tickers and isinstance(r.get("change_pct"), (int, float))
    ]
    candidates.sort(key=lambda r: abs(r["change_pct"]), reverse=True)
    return [r["label"] for r in candidates[:count]]


def main():
    rows = fetch_snapshot()
    snapshot = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "rows": rows,
        "top_movers": compute_top_movers(rows),
    }
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, ensure_ascii=False, indent=2)
    print("Markt-Snapshot gespeichert.")


if __name__ == "__main__":
    main()