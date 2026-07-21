# Marktfeed

Sammelt stündlich Schlagzeilen (Oracle, Meta, DAX, KOSPI, Nasdaq, Fed/Makro,
AI-Sektor) über Google-News-RSS und Kurse/Futures über yfinance. Keine
Bewertung, keine Kommentare – nur Rohdaten auf einer statischen Seite, die
ich morgens durchscrollst.



## Anpassen

Alles Inhaltliche steckt in `scripts/config.py`:
- `NEWS_QUERIES`: Themen/Suchbegriffe, pro Eintrag Sprache (`hl`) und Land (`gl`)
- `MARKET_TICKERS`: Yahoo-Finance-Ticker für die Kurs-Kacheln oben
- `RETENTION_DAYS`: wie viele Tage Schlagzeilen im Feed bleiben

## Bekannte Einschränkungen

- **Google News RSS** ist eine inoffizielle, kostenlose Schnittstelle -
  kein SLA, kann sich ändern. Bei Ausfall liefert der Workflow einfach
  weniger/keine neuen Treffer für die betroffene Suche (kein Crash).
- **yfinance** nutzt inoffizielle Yahoo-Finance-Endpunkte. Bei Kursdaten
  außerhalb der Handelszeiten können Werte verzögert oder `n/a` sein.
- Der Cron läuft **rund um die Uhr**, nicht nur 22:30–08:00 - die Seite
  zeigt einfach die letzten `RETENTION_DAYS` Tage. Wenn du eine harte
  Uhrzeit-Filterung willst (nur Meldungen seit 22:30), sag Bescheid, das
  lässt sich in `build_page.py` leicht ergänzen (Timezone-Vergleich).
- Bei privatem Repo zählen die Actions-Minuten gegen dein kostenloses
  Kontingent (2.000 Min/Monat) - bei stündlichem Lauf à ~1 Min liegst du
  bei ca. 720 Min/Monat, also unkritisch. Bei öffentlichem Repo unlimitiert.
