# Marktfeed

Sammelt stündlich Schlagzeilen (Oracle, Meta, DAX, KOSPI, Nasdaq, Fed/Makro,
AI-Sektor) über Google-News-RSS und Kurse/Futures über yfinance. Keine
Bewertung, keine Kommentare – nur Rohdaten auf einer statischen Seite, die
du morgens durchscrollst.

## Setup (einmalig, ca. 10 Minuten)

1. **Repo erstellen**: Auf github.com ein neues, privates oder öffentliches
   Repository anlegen, z.B. `marktfeed`.
2. **Dateien hochladen**: Diesen gesamten Ordner in das neue Repo pushen
   (per `git push` oder Drag&Drop im Browser unter "Add file → Upload files").
3. **Actions-Rechte setzen**: Im Repo unter
   `Settings → Actions → General → Workflow permissions`
   → **"Read and write permissions"** auswählen und speichern.
   (Ohne das darf der Workflow nicht committen.)
4. **GitHub Pages aktivieren**: Unter `Settings → Pages`
   → *Source*: "Deploy from a branch" → Branch `main`, Ordner `/docs`
   → Speichern. Nach ein paar Minuten ist die Seite unter
   `https://<dein-username>.github.io/marktfeed/` erreichbar.
5. **Ersten Lauf manuell auslösen**: Tab `Actions` → Workflow
   "Marktfeed sammeln" → `Run workflow`. Nach ~1 Minute sollte
   `data/headlines.json`, `data/market.json` und `docs/index.html`
   befüllt sein (im Repo sichtbar).
6. Danach läuft es automatisch stündlich (`cron: "15 * * * *"`, UTC).

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
