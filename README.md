# Hyloft Partnernetz

Plattform unter **partner.hyloft.de**: Bauherren finden geprüfte Fachbetriebe (Innenarchitekten, Architekten, Tischler,
Innenausbauer, Trockenbauer, Maler, Bodenleger) in NRW. Betriebe tragen sich kostenlos ein, Hyloft prüft und schaltet frei.

## Technik

- Next.js (App Router) auf Vercel, Postgres (Neon über den Vercel Marketplace, Region Frankfurt)
- Login im Projekt selbst: Passwort (scrypt) oder Einmal-Link per E-Mail, Sitzung als httpOnly-Cookie (30 Tage)
- Bilder liegen in der Datenbank (Tabelle `dateien`), werden im Browser verkleinert und unter `/api/datei/[id]` ausgeliefert
- E-Mails über Resend; ohne `RESEND_API_KEY` werden sie nur im Admin unter „E-Mails“ protokolliert
- Datenbank-Migrationen in `db/*.sql` laufen automatisch vor jedem Build (`scripts/migrate.mjs`)

## Bereiche

| Pfad | Inhalt |
|---|---|
| `/` | Startseite mit Was/Wo-Suche |
| `/suche` | Liste und Karte |
| `/partner/[slug]` | Profil mit Anfrageformular |
| `/anfrage` | Eine Anfrage an bis zu 3 Betriebe |
| `/[gewerk]/[stadt]` | Seiten wie `/tischler/muenster` für 7 Gewerke × 209 Städte (ohne Partner: noindex) |
| `/fuer-partner`, `/registrieren` | Akquise und Registrierung für Betriebe |
| `/partnerbereich` | Profil, Fotos, Anfragen, Statistik, Siegel, Partnerservice |
| `/admin` | Registrierungen, Partner + Logins, Anfragen, Partnerservice, Referenzprojekte, E-Mail-Protokoll, Team |
| `/setup?token=…` | Einmalige Einrichtung des Admin-Passworts |
| `/impressum`, `/datenschutz`, `/partnerbedingungen` | Rechtstexte (Entwürfe, anwaltliche Prüfung ausstehend) |

## Lokal starten

```bash
cp .env.example .env.local   # DATABASE_URL eintragen
npm install
npm run db:migrate
npm run dev
```

## Datenquellen

Orte: Destatis Gemeindeverzeichnis (dl-de/by-2-0), Koordinaten und PLZ: GeoNames (CC BY 4.0), Karte: © OpenStreetMap-Mitwirkende.
