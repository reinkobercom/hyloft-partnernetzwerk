# Hyloft Partnernetz – Klickdummy

Prototyp einer B2B-Plattform: Bauherren finden Fachbetriebe (Innenarchitekten, Tischler, Innenausbauer …) in NRW,
Betriebe tragen sich kostenlos ein. Jede Registrierung landet im Status „In Prüfung“ und wird erst nach einem
Freischaltungsanruf durch Hyloft live.

**Stand:** Klickdummy ohne Backend. Alle Firmenprofile sind erfundene Beispielprofile, Formulare speichern nichts.

## Seiten

| Pfad | Inhalt |
|---|---|
| `/` | Startseite mit zentraler Was/Wo-Suche |
| `/suche?was=…&wo=…` | Trefferliste, sortiert nach Entfernung |
| `/partner/[slug]` | Partnerprofil mit Anfrageformular |
| `/fuer-partner` | Landingpage für Betriebe (Ziel der Outbound-Mails) |
| `/registrieren` | 3-stufige Registrierung |
| `/partnerbereich` | Partnerbereich: Status, Profil-Fortschritt, Lofttür-Partnerservice |
| `/login` | Demo-Login |
| `/blog`, `/blog/[slug]` | Ratgeber mit Beispielartikeln (Daten in `lib/blog.ts`) |

## Entwicklung

```bash
npm install
npm run dev
```

Daten: `lib/data.ts` (Gewerke, Orte, Beispielpartner).

## Nächste Ausbaustufe

- Datenbank (z. B. Supabase) für Profile und Logins
- Registrierung per Webhook an Zapier → Pipedrive (Deal „Freischaltungsanruf“)
- Freischaltung durch das Hyloft-Team, Upload von Logo und Referenzfotos
