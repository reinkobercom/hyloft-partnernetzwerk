// Rechtstexte für das Hyloft Partnernetz (partner.hyloft.de)
// ENTWÜRFE – vor Veröffentlichung durch einen Rechtsanwalt prüfen lassen.
// Platzhalter stehen in [eckigen Klammern].

export type RBlock = { h2: string } | { h3: string } | { p: string } | { liste: string[] };

export const STAND = "November 2026";

/* ------------------------------------------------------------------ */
/* IMPRESSUM                                                           */
/* ------------------------------------------------------------------ */

export const IMPRESSUM: RBlock[] = [
  { h2: "Angaben gemäß § 5 DDG" },
  { p: "Hyloft GmbH" },
  { p: "Postanschrift: Stemmenkamp 83a, 59368 Werne" },
  { p: "Büro / Verwaltung: Stockumer Straße 30, 59368 Werne" },
  { p: "Showroom (Beratung ausschließlich hier): Kirchstraße 1, 59348 Lüdinghausen" },

  { h3: "Vertreten durch" },
  { p: "Geschäftsführer: Douwe Dam, Simon Reinkober" },

  { h3: "Kontakt" },
  { p: "Telefon: +49 172 5374847" },
  { p: "E-Mail: info@hyloft.de" },

  { h3: "Registereintrag" },
  { p: "Eintragung im Handelsregister. Registergericht: Amtsgericht Dortmund. Registernummer: HRB 36367" },

  { h3: "Umsatzsteuer-ID" },
  { p: "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE369080384" },

  { h3: "Inhaltlich verantwortlich nach § 18 Abs. 2 MStV" },
  { p: "[Name, Anschrift]" },

  { h3: "Verbraucherstreitbeilegung" },
  {
    p: "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. [Hinweis zur Prüfung: Formulierung und Erforderlichkeit dieses Hinweises prüfen.]",
  },

  { h3: "Haftung für Inhalte" },
  {
    p: "Die Inhalte dieser Plattform wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Die Profile der Fachbetriebe werden von den jeweiligen Betrieben selbst gepflegt; für deren Angaben sind die Betriebe verantwortlich. Als Diensteanbieter sind wir für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Für fremde Informationen, die wir für Nutzer speichern, sind wir nach Maßgabe der gesetzlichen Vorschriften erst ab Kenntnis einer konkreten Rechtsverletzung verantwortlich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
  },

  { h3: "Haftung für Links" },
  {
    p: "Die Plattform enthält Links zu externen Websites Dritter, insbesondere zu Websites der eingetragenen Fachbetriebe, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
  },

  { h3: "Urheberrecht" },
  {
    p: "Die durch Hyloft erstellten Inhalte und Werke auf dieser Plattform unterliegen dem deutschen Urheberrecht. Logos, Fotos und Texte in den Profilen der Fachbetriebe stammen von den jeweiligen Betrieben bzw. deren Rechteinhabern.",
  },

  { h3: "Kartendaten und Geodaten" },
  {
    p: "Kartendarstellung: © OpenStreetMap-Mitwirkende. Die Kartendaten stehen unter der Open Database License (ODbL); siehe https://www.openstreetmap.org/copyright.",
  },
  {
    p: "Ortsdaten: Diese Plattform verwendet Daten von GeoNames (https://www.geonames.org), lizenziert unter Creative Commons Namensnennung 4.0 International (CC BY 4.0, https://creativecommons.org/licenses/by/4.0/). Die Daten wurden aufbereitet (auf Nordrhein-Westfalen gefiltert, Koordinaten gerundet).",
  },
];

/* ------------------------------------------------------------------ */
/* DATENSCHUTZERKLÄRUNG                                                */
/* ------------------------------------------------------------------ */

export const DATENSCHUTZ: RBlock[] = [
  { p: "Entwurf – rechtliche Prüfung ausstehend." },

  { h2: "1. Überblick" },
  {
    p: "Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten wir beim Betrieb der Plattform „Hyloft Partnernetz“ (partner.hyloft.de) verarbeiten, zu welchen Zwecken, auf welcher Rechtsgrundlage und welche Rechte Ihnen zustehen. Die Plattform ermöglicht es Bauherren, geprüfte Fachbetriebe aus Nordrhein-Westfalen – etwa Innenarchitekten, Architekten, Tischler und Schreiner, Innenausbauer, Trockenbauer, Maler und Bodenleger – zu finden und anzufragen. Fachbetriebe können sich kostenlos eintragen und ihr Profil pflegen.",
  },
  {
    p: "Wir setzen keine Analyse- oder Tracking-Tools ein, verwenden keine Werbe-Cookies und binden keine Schriften von externen Servern (z. B. Google Fonts) ein; alle Schriften werden lokal von unserem Server ausgeliefert.",
  },

  { h2: "2. Verantwortlicher" },
  { p: "Verantwortlich für die Datenverarbeitung auf dieser Plattform im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:" },
  {
    liste: [
      "Hyloft GmbH",
      "Stemmenkamp 83a, 59368 Werne (Postanschrift)",
      "Vertreten durch die Geschäftsführer Douwe Dam und Simon Reinkober",
      "Telefon: +49 172 5374847",
      "E-Mail: info@hyloft.de",
    ],
  },

  { h2: "3. Datenschutzbeauftragter" },
  {
    p: "[Datenschutzbeauftragter, falls vorhanden: Name und Kontaktdaten. Falls keine Benennungspflicht besteht und kein Datenschutzbeauftragter benannt ist, diesen Abschnitt entfernen oder durch einen Hinweis ersetzen, dass Datenschutzanfragen an info@hyloft.de gerichtet werden können.]",
  },

  { h2: "4. Hosting und Datenbank" },
  { h3: "4.1 Hosting durch Vercel" },
  {
    p: "Die Plattform wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA [Anschrift prüfen] gehostet. Vercel verarbeitet in unserem Auftrag die Daten, die beim Aufruf der Plattform anfallen (insbesondere IP-Adresse und technische Verbindungsdaten), um die Website auszuliefern. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO [prüfen]. Die Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss nach Art. 45 DSGVO) bzw. auf Grundlage von EU-Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO. [Prüfen, ob Vercel Inc. aktuell nach dem EU-US Data Privacy Framework zertifiziert ist.]",
  },
  {
    p: "Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren, zuverlässigen und effizienten Bereitstellung der Plattform (Art. 6 Abs. 1 lit. f DSGVO).",
  },
  { h3: "4.2 Datenbank durch Supabase" },
  {
    p: "Für die Speicherung von Profilen, Registrierungen, Anfragen und Zugangsdaten nutzen wir den Datenbankdienst der Supabase Inc. [Anschrift ergänzen]. Die Daten werden auf Servern in Frankfurt am Main (Deutschland) gespeichert. Mit Supabase besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO [prüfen]. Da es sich um ein Unternehmen mit Sitz in den USA handelt, kann ein Zugriff aus den USA, etwa im Rahmen von Support oder Wartung, nicht vollständig ausgeschlossen werden; insoweit gelten die Ausführungen unter Ziffer 17 [prüfen, ob Supabase nach dem EU-US Data Privacy Framework zertifiziert ist bzw. Standardvertragsklauseln vereinbart sind].",
  },
  {
    p: "Rechtsgrundlage ist die jeweils zugrunde liegende Verarbeitung (siehe die folgenden Abschnitte) in Verbindung mit unserem berechtigten Interesse an einer sicheren Datenhaltung (Art. 6 Abs. 1 lit. f DSGVO).",
  },

  { h2: "5. Server-Logfiles" },
  {
    p: "Beim Aufruf der Plattform werden durch unseren Hosting-Dienstleister automatisch Informationen erfasst, die Ihr Browser übermittelt. Dazu gehören insbesondere:",
  },
  {
    liste: [
      "IP-Adresse des anfragenden Geräts",
      "Datum und Uhrzeit des Zugriffs",
      "aufgerufene Seite bzw. Datei",
      "HTTP-Statuscode und übertragene Datenmenge",
      "Referrer-URL (zuvor besuchte Seite), soweit übermittelt",
      "Browsertyp und -version sowie Betriebssystem",
    ],
  },
  {
    p: "Diese Daten werden zur Auslieferung der Website, zur Gewährleistung der Systemsicherheit und zur Fehleranalyse verarbeitet. Eine Zusammenführung mit anderen Datenquellen erfolgt nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der Plattform. Die Logfiles werden vom Hosting-Dienstleister nach [Speicherdauer bei Vercel prüfen und ergänzen] automatisch gelöscht.",
  },

  { h2: "6. Cookies" },
  {
    p: "Wir verwenden ausschließlich ein technisch notwendiges Session-Cookie. Dieses wird nur gesetzt, wenn sich ein Partner oder ein Administrator in den geschützten Bereich der Plattform einloggt. Es dient dazu, Sie nach dem Login als angemeldet wiederzuerkennen, damit Sie Ihr Profil bearbeiten oder Anfragen einsehen können. Ohne dieses Cookie ist der Login-Bereich nicht nutzbar.",
  },
  {
    p: "Die Speicherung des Cookies auf Ihrem Endgerät ist nach § 25 Abs. 2 Nr. 2 TDDDG ohne Einwilligung zulässig, da sie unbedingt erforderlich ist, um den von Ihnen ausdrücklich gewünschten Dienst (Partner- bzw. Admin-Login) bereitzustellen. Die anschließende Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Durchführung des Nutzungsverhältnisses) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Login). Das Cookie wird beim Abmelden bzw. nach Ablauf von 30 Tage gelöscht.",
  },
  {
    p: "Besucher, die sich nicht einloggen – insbesondere Bauherren – erhalten keine Cookies.",
  },

  { h2: "7. Registrierung von Fachbetrieben und öffentliche Profile" },
  { h3: "7.1 Registrierung und Prüfung" },
  {
    p: "Fachbetriebe können sich über ein Formular kostenlos für das Partnernetz registrieren. Dabei verarbeiten wir die im Formular angegebenen Daten, insbesondere Firmenname, Name des Ansprechpartners, Anschrift bzw. Ort, Gewerk und Leistungen, Telefonnummer, E-Mail-Adresse und Website sowie etwaige freiwillige Angaben. Die Registrierungsdaten werden gespeichert. Zur Prüfung und Freischaltung rufen wir den Betrieb unter der angegebenen Telefonnummer an.",
  },
  {
    p: "In einzelnen Fällen legen wir Profile von Fachbetrieben selbst an, etwa nach einem persönlichen Gespräch. In diesem Fall stimmen wir die Veröffentlichung vorab mit dem Betrieb ab. [Prüfen: Rechtsgrundlage und Informationspflicht nach Art. 14 DSGVO, falls Daten nicht beim Betrieb selbst erhoben werden; Anlage nur mit vorheriger Zustimmung des Betriebs empfehlenswert.]",
  },
  {
    p: "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen und des Nutzungsverhältnisses nach den Partnerbedingungen). Soweit personenbezogene Daten von Mitarbeitenden des Betriebs (z. B. Ansprechpartner) betroffen sind, stützen wir die Verarbeitung zusätzlich auf Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse besteht in der Darstellung und Kontaktierbarkeit der Betriebe.",
  },
  { h3: "7.2 Öffentliche Profile" },
  {
    p: "Nach der Freischaltung ist das Profil eines Fachbetriebs öffentlich auf der Plattform abrufbar. Öffentlich sichtbar sind insbesondere: Firmenname, Ansprechpartner, Ort, Leistungen bzw. Gewerke, Telefonnummer, E-Mail-Adresse, Website, Logo und Fotos (z. B. Referenzprojekte). Diese Angaben sind für jeden Besucher sichtbar und können von Suchmaschinen erfasst werden. Zweck ist, dass Bauherren den Betrieb finden und direkt kontaktieren können. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.",
  },
  {
    p: "Wir bitten Partner, auf Fotos keine erkennbaren Personen ohne deren Einwilligung zu zeigen und keine Fotos zu verwenden, die Rückschlüsse auf private Wohnräume Dritter mit Personenbezug zulassen, sofern keine Zustimmung der Betroffenen vorliegt.",
  },

  { h2: "8. Partner-Login" },
  {
    p: "Freigeschaltete Partner erhalten einen Zugang zum Partnerbereich. Die Anmeldung erfolgt wahlweise mit E-Mail-Adresse und Passwort oder über einen Login-Link, den wir an die hinterlegte E-Mail-Adresse senden. Passwörter werden ausschließlich in verschlüsselter (gehashter) Form gespeichert (mit dem Verfahren scrypt). Im Partnerbereich können Partner ihr Profil, ihr Logo und ihre Fotos pflegen sowie die an sie gerichteten Anfragen einsehen.",
  },
  {
    p: "Wir verarbeiten hierfür die E-Mail-Adresse, das Passwort (als Hash), Zeitpunkte von Logins und die im Partnerbereich hochgeladenen Inhalte. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO; die Absicherung des Zugangs erfolgt zudem auf Grundlage unseres berechtigten Interesses an der Sicherheit der Plattform (Art. 6 Abs. 1 lit. f DSGVO).",
  },

  { h2: "9. Anfragen von Bauherren" },
  { h3: "9.1 Erhobene Daten" },
  { p: "Bauherren können über ein Anfrageformular einen oder mehrere Fachbetriebe anfragen. Dabei verarbeiten wir:" },
  {
    liste: [
      "Name",
      "E-Mail-Adresse",
      "Telefonnummer (optional)",
      "Ort des Bauvorhabens",
      "Projektbeschreibung",
      "gewünschte Gewerke",
      "geplanter Zeitraum",
      "Angabe, ob eine Lofttür geplant ist",
    ],
  },
  {
    p: "Bitte geben Sie in der Projektbeschreibung nur die Informationen an, die für die Anfrage erforderlich sind, und keine besonderen Kategorien personenbezogener Daten (z. B. Gesundheitsdaten).",
  },
  { h3: "9.2 Weitergabe an die ausgewählten Fachbetriebe" },
  {
    p: "Zweck der Anfrage ist die Kontaktaufnahme mit den von Ihnen ausgewählten Fachbetrieben. Ihre Anfrage wird daher wie folgt übermittelt bzw. bereitgestellt:",
  },
  {
    liste: [
      "per E-Mail an die von Ihnen ausgewählten Fachbetriebe (höchstens drei) bzw. bei einer Anfrage über ein einzelnes Profil an diesen Betrieb,",
      "zusätzlich sichtbar im Partnerbereich der ausgewählten Betriebe,",
      "per E-Mail an Hyloft sowie sichtbar im Admin-Bereich von Hyloft (zur Qualitätssicherung, Missbrauchsabwehr und Betreuung des Partnernetzes),",
      "als Bestätigung per E-Mail an Sie selbst.",
    ],
  },
  {
    p: "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, da die Weitergabe zur Erfüllung Ihres Anliegens – der Anfrage bei den gewählten Betrieben – erforderlich ist. Die Verarbeitung der Anfrage durch Hyloft zur Qualitätssicherung und Missbrauchsabwehr erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. [Prüfen: ob für die Weitergabe zusätzlich eine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO eingeholt werden soll bzw. ob die Checkbox im Formular als Einwilligung oder als Bestätigung der Kenntnisnahme formuliert wird.]",
  },
  {
    p: "Mit dem Erhalt der Anfrage wird der jeweilige Fachbetrieb für die weitere Verarbeitung Ihrer Daten (z. B. Kontaktaufnahme, Angebotserstellung, Auftragsabwicklung) eigenständiger Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO. Für diese Verarbeitung gelten die Datenschutzhinweise des jeweiligen Betriebs. Hyloft hat auf die weitere Verarbeitung durch den Betrieb keinen Einfluss. Die Partner sind nach unseren Partnerbedingungen verpflichtet, Anfragen datenschutzkonform zu behandeln und nicht an Dritte weiterzugeben.",
  },
  { h3: "9.3 Kontaktaufnahme durch Hyloft wegen einer Lofttür" },
  {
    p: "Hyloft bietet Lofttüren an. Wenn Sie im Formular angeben, dass eine Lofttür geplant ist, und zusätzlich die gesonderte, freiwillige Einwilligung erteilen, kontaktiert Hyloft Sie per E-Mail oder – sofern angegeben – telefonisch, um Sie zu Lofttüren zu beraten. Ohne diese gesonderte Einwilligung nimmt Hyloft wegen einer Lofttür keinen Kontakt zu Ihnen auf; die Angabe „Lofttür geplant“ wird dann nur an die ausgewählten Betriebe weitergegeben.",
  },
  {
    p: "Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO; für Telefonanrufe zusätzlich § 7 Abs. 2 Nr. 1 UWG). Die Einwilligung ist freiwillig und keine Voraussetzung für das Absenden der Anfrage. Sie können sie jederzeit mit Wirkung für die Zukunft widerrufen, z. B. per E-Mail an info@hyloft.de.",
  },

  { h2: "10. E-Mail-Versand" },
  {
    p: "Für den Versand von System-E-Mails (Anfragen an Fachbetriebe, Bestätigungen an Bauherren, Benachrichtigungen an Hyloft, Login-Links und Hinweise zur Registrierung) nutzen wir den Dienst der Resend Inc. [Anschrift ergänzen], USA. Dabei werden die E-Mail-Adressen der Empfänger, der Inhalt der E-Mail sowie technische Versanddaten (z. B. Zeitpunkt, Zustellstatus) verarbeitet. Mit Resend besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO [prüfen]. Zur Übermittlung in die USA siehe Ziffer 17 Öffnungs- und Klick-Tracking ist deaktiviert. [prüfen, ob Resend nach dem EU-US Data Privacy Framework zertifiziert ist bzw. Standardvertragsklauseln vereinbart sind].",
  },
  {
    p: "Rechtsgrundlage ist die jeweils zugrunde liegende Verarbeitung (insbesondere Art. 6 Abs. 1 lit. b DSGVO) sowie unser berechtigtes Interesse an einer zuverlässigen Zustellung (Art. 6 Abs. 1 lit. f DSGVO).",
  },

  { h2: "11. Kartenansicht (OpenStreetMap)" },
  {
    p: "Auf der Plattform können Fachbetriebe in einer Kartenansicht angezeigt werden. Die Kartenkacheln werden beim Aufruf der Kartenansicht direkt von Servern der OpenStreetMap Foundation (OSMF), St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, Vereinigtes Königreich [Anschrift prüfen], geladen. Dabei wird Ihre IP-Adresse sowie die üblichen technischen Verbindungsdaten (z. B. Browsertyp, aufgerufene Kartenkacheln, Referrer) an die OSMF übertragen. Auf die weitere Verarbeitung durch die OSMF haben wir keinen Einfluss; nähere Informationen finden Sie in der Datenschutzerklärung der OSMF unter https://osmfoundation.org/wiki/Privacy_Policy.",
  },
  {
    p: "Für das Vereinigte Königreich besteht ein Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO. [Prüfen: aktuelle Gültigkeit bzw. Verlängerung des Angemessenheitsbeschlusses.]",
  },
  {
    p: "Rechtsgrundlage ist unser berechtigtes Interesse an einer anschaulichen Darstellung der Standorte der Fachbetriebe (Art. 6 Abs. 1 lit. f DSGVO). [Besonders prüfbedürftig: ob das berechtigte Interesse als Rechtsgrundlage für das direkte Laden der Kacheln ausreicht oder ob eine Einwilligung (Zwei-Klick-Lösung bzw. Einwilligung vor Laden der Karte, ggf. auch nach § 25 TDDDG) erforderlich ist; alternativ Proxy oder selbst gehostete Kacheln erwägen.]",
  },

  { h2: "12. Statistik der Profilaufrufe" },
  {
    p: "Damit wir und die Partner einschätzen können, wie häufig Profile aufgerufen werden, zählen wir die Aufrufe der Profilseiten. Gespeichert wird ausschließlich ein Zähler pro Tag und Profil. IP-Adressen, Cookies, Gerätekennungen oder sonstige Informationen mit Bezug zu einzelnen Besuchern werden hierfür nicht gespeichert. Es handelt sich daher nicht um eine Verarbeitung personenbezogener Daten der Besucher. Für die Zählung wird lediglich die Kennung des aufgerufenen Profils an unseren Server übermittelt; ob ein Profil in der aktuellen Browsersitzung bereits gezählt wurde, wird ausschließlich im Sitzungsspeicher Ihres Browsers vermerkt.",
  },

  { h2: "13. Spamschutz in Formularen" },
  {
    p: "Zum Schutz vor Missbrauch (z. B. automatisierten Massenanfragen) verarbeiten wir beim Absenden des Anfrage- bzw. Registrierungsformulars Ihre IP-Adresse. Die IP-Adresse wird dabei ausschließlich in gehashter Form, also als nicht ohne Weiteres rückrechenbarer Prüfwert, gespeichert und nach 24 Stunden gelöscht (Vorschlag). Eine Klar-Speicherung der IP-Adresse erfolgt nicht.",
  },
  {
    p: "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der Abwehr von Spam und Missbrauch sowie im Schutz der Fachbetriebe vor unerwünschten Massenanfragen. Der Hash wird mit einem geheimen Schlüssel gebildet (gesalzen). [Prüfen: gehashte IP-Adressen gelten in der Regel weiterhin als personenbezogen bzw. pseudonym.]",
  },

  { h2: "14. Kontakt per E-Mail oder Telefon" },
  {
    p: "Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihr Anliegen mit einem Vertrag oder vorvertraglichen Maßnahmen zusammenhängt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
  },

  { h2: "15. Speicherdauer" },
  {
    p: "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Die folgenden Fristen sind Vorschläge und vor Veröffentlichung festzulegen:",
  },
  {
    liste: [
      "Registrierungsdaten nicht freigeschalteter Betriebe: Löschung 6 Monate nach Ablehnung bzw. nach letzter Kontaktaufnahme ohne Freischaltung (Vorschlag).",
      "Profil- und Zugangsdaten von Partnern: für die Dauer der Partnerschaft; Löschung bzw. Deaktivierung des öffentlichen Profils unverzüglich nach Beendigung, vollständige Löschung spätestens 3 Monate danach (Vorschlag), soweit keine Aufbewahrungspflichten entgegenstehen.",
      "Bauherren-Anfragen in der Datenbank (Partner- und Admin-Bereich): Löschung 24 Monate nach Eingang (Vorschlag).",
      "Daten zur Lofttür-Kontaktaufnahme: bis zum Widerruf der Einwilligung oder bis der Zweck erreicht ist, spätestens 24 Monate nach Eingang der Anfrage (Vorschlag).",
      "Gehashte IP-Adressen zum Spamschutz: 24 Stunden (Vorschlag).",
      "Server-Logfiles beim Hosting-Dienstleister: [Frist bei Vercel prüfen].",
      "Versanddaten beim E-Mail-Dienstleister: [Frist bei Resend prüfen].",
      "Geschäftskorrespondenz, soweit handels- oder steuerrechtlich relevant: 6 bzw. 10 Jahre nach § 257 HGB, § 147 AO.",
    ],
  },
  {
    p: "Daten, die bereits an Fachbetriebe übermittelt wurden, unterliegen den Löschfristen des jeweiligen Betriebs.",
  },

  { h2: "16. Empfänger" },
  { p: "Empfänger bzw. Kategorien von Empfängern Ihrer personenbezogenen Daten sind:" },
  {
    liste: [
      "die von Bauherren ausgewählten Fachbetriebe (für Anfragen, als eigenständige Verantwortliche),",
      "Besucher der Plattform (für die öffentlichen Profildaten der Fachbetriebe),",
      "Vercel Inc. (Hosting, Auftragsverarbeiter),",
      "Supabase Inc. (Datenbank, Auftragsverarbeiter),",
      "Resend Inc. (E-Mail-Versand, Auftragsverarbeiter),",
      "OpenStreetMap Foundation (Auslieferung der Kartenkacheln beim Aufruf der Kartenansicht),",
      "Behörden und sonstige Stellen, soweit wir gesetzlich dazu verpflichtet sind.",
    ],
  },
  { p: "Eine Weitergabe zu Werbezwecken an Dritte findet nicht statt." },

  { h2: "17. Übermittlung in Drittländer" },
  {
    p: "Einige unserer Dienstleister haben ihren Sitz in den USA (Vercel, Supabase, Resend). Eine Übermittlung personenbezogener Daten in die USA erfolgt nur, soweit die Voraussetzungen der Art. 44 ff. DSGVO erfüllt sind. Für Unternehmen, die nach dem EU-US Data Privacy Framework zertifiziert sind, besteht ein Angemessenheitsbeschluss der Europäischen Kommission (Art. 45 DSGVO). Soweit eine solche Zertifizierung nicht besteht, stützen wir die Übermittlung auf die von der EU-Kommission erlassenen Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO). [Für jeden Dienstleister prüfen und ergänzen: Zertifizierung ja/nein, Standardvertragsklauseln vereinbart ja/nein.]",
  },
  {
    p: "Beim Laden der Kartenkacheln werden Daten an die OpenStreetMap Foundation im Vereinigten Königreich übermittelt; hierfür besteht ein Angemessenheitsbeschluss (siehe Ziffer 11).",
  },

  { h2: "18. Ihre Rechte" },
  { p: "Ihnen stehen nach der DSGVO folgende Rechte zu:" },
  {
    liste: [
      "Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO),",
      "Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO),",
      "Recht auf Löschung (Art. 17 DSGVO),",
      "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO),",
      "Recht auf Datenübertragbarkeit (Art. 20 DSGVO),",
      "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).",
    ],
  },
  {
    p: "Zur Ausübung Ihrer Rechte genügt eine Nachricht an info@hyloft.de oder an die oben genannte Postanschrift. Bitte beachten Sie, dass wir für Verarbeitungen durch Fachbetriebe, die Ihre Anfrage erhalten haben, nicht verantwortlich sind; insoweit wenden Sie sich bitte direkt an den jeweiligen Betrieb.",
  },
  { h3: "Widerspruchsrecht nach Art. 21 DSGVO" },
  {
    p: "Soweit wir Ihre Daten auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung einzulegen. Wir verarbeiten Ihre Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.",
  },

  { h2: "19. Widerruf von Einwilligungen" },
  {
    p: "Sofern eine Verarbeitung auf Ihrer Einwilligung beruht – insbesondere die Kontaktaufnahme durch Hyloft wegen einer Lofttür –, können Sie diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Eine formlose Mitteilung an info@hyloft.de genügt. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.",
  },

  { h2: "20. Beschwerderecht bei einer Aufsichtsbehörde" },
  {
    p: "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig ist:",
  },
  {
    liste: [
      "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)",
      "Kavalleriestraße 2–4, 40213 Düsseldorf [Anschrift prüfen]",
      "Website: https://www.ldi.nrw.de",
    ],
  },

  { h2: "21. Pflicht zur Bereitstellung, keine automatisierte Entscheidung" },
  {
    p: "Die Bereitstellung Ihrer Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die als Pflichtfeld gekennzeichneten Angaben können wir eine Anfrage oder Registrierung jedoch nicht bearbeiten. Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht statt; über die Freischaltung von Fachbetrieben entscheidet Hyloft nach einem persönlichen Telefonat.",
  },

  { h2: "22. Änderungen dieser Datenschutzerklärung" },
  {
    p: "Wir passen diese Datenschutzerklärung an, wenn sich die Plattform, die eingesetzten Dienste oder die Rechtslage ändern. Es gilt die jeweils auf der Plattform veröffentlichte Fassung.",
  },
  { p: "Stand: " + STAND },
];

/* ------------------------------------------------------------------ */
/* PARTNERBEDINGUNGEN                                                  */
/* ------------------------------------------------------------------ */

export const PARTNERBEDINGUNGEN: RBlock[] = [
  { p: "Entwurf – rechtliche Prüfung ausstehend." },
  {
    p: "Nutzungsbedingungen für Fachbetriebe im „Hyloft Partnernetz“ (partner.hyloft.de) der Hyloft GmbH, Stemmenkamp 83a, 59368 Werne (nachfolgend „Hyloft“).",
  },

  { h2: "§ 1 Geltungsbereich" },
  {
    p: "(1) Diese Bedingungen regeln die Nutzung der Plattform „Hyloft Partnernetz“ durch Fachbetriebe, insbesondere Innenarchitekten, Architekten, Tischler und Schreiner, Innenausbauer, Trockenbauer, Maler und Bodenleger (nachfolgend „Partner“).",
  },
  {
    p: "(2) Die Plattform richtet sich ausschließlich an Unternehmer im Sinne von § 14 BGB sowie an freiberuflich Tätige in Ausübung ihrer beruflichen Tätigkeit. Verbraucher können sich nicht als Partner registrieren.",
  },
  {
    p: "(3) Abweichende oder ergänzende Geschäftsbedingungen des Partners gelten nicht, auch wenn Hyloft ihnen nicht ausdrücklich widerspricht.",
  },

  { h2: "§ 2 Leistungen von Hyloft" },
  {
    p: "(1) Hyloft stellt dem Partner nach Freischaltung ein kostenloses Profil auf der Plattform zur Verfügung. Über das Profil können Bauherren den Partner finden, sich über dessen Leistungen informieren und ihm Anfragen senden.",
  },
  {
    p: "(2) Die Nutzung ist für den Partner unentgeltlich. Hyloft erhebt keine Provisionen oder Vermittlungsgebühren auf Aufträge, die aus Anfragen über die Plattform entstehen. Sollte Hyloft künftig kostenpflichtige Zusatzleistungen anbieten, gelten diese nur nach gesonderter Vereinbarung.",
  },
  {
    p: "(3) Hyloft übernimmt keine Gewähr dafür, dass der Partner Anfragen erhält oder dass aus Anfragen Aufträge entstehen. Zwischen Hyloft und dem Partner kommt kein Makler-, Vermittlungs- oder Agenturvertrag zustande. Hyloft wird weder als Vertreter des Partners noch als Vertreter von Bauherren tätig.",
  },
  {
    p: "(4) Hyloft ist bemüht, die Plattform möglichst unterbrechungsfrei verfügbar zu halten, schuldet jedoch keine bestimmte Verfügbarkeit. Hyloft kann Gestaltung, Funktionen und Inhalte der Plattform jederzeit weiterentwickeln, ändern oder einschränken.",
  },

  { h2: "§ 3 Registrierung, Prüfung und Freischaltung" },
  {
    p: "(1) Die Registrierung erfolgt über das Formular auf der Plattform. Mit dem Absenden gibt der Partner ein Angebot auf Teilnahme an der Plattform zu diesen Bedingungen ab.",
  },
  {
    p: "(2) Hyloft prüft die Registrierung, in der Regel durch ein Telefonat mit dem Partner. Hyloft entscheidet frei darüber, ob ein Betrieb freigeschaltet wird. Ein Anspruch auf Freischaltung besteht nicht; eine Ablehnung kann ohne Angabe von Gründen erfolgen. Der Nutzungsvertrag kommt mit der Freischaltung des Profils zustande.",
  },
  {
    p: "(3) Hyloft kann Profile auch selbst anlegen, etwa nach einem persönlichen Gespräch mit dem Betrieb. In diesem Fall gelten diese Bedingungen, sobald der Partner der Veröffentlichung zugestimmt bzw. die Bedingungen – etwa beim ersten Login – akzeptiert hat. [Prüfen: Zustimmungsmechanismus bei von Hyloft angelegten Profilen.]",
  },
  {
    p: "(4) Der Partner erhält Zugang zum Partnerbereich per E-Mail und Passwort oder per Login-Link. Er hält seine Zugangsdaten geheim und informiert Hyloft unverzüglich, wenn er einen Missbrauch vermutet. Der Partner ist für Handlungen verantwortlich, die über seinen Zugang vorgenommen werden, sofern er den Missbrauch zu vertreten hat.",
  },

  { h2: "§ 4 Pflichten des Partners" },
  { p: "(1) Der Partner verpflichtet sich," },
  {
    liste: [
      "nur wahre, vollständige und nicht irreführende Angaben zu seinem Betrieb, seinen Leistungen und Qualifikationen zu machen,",
      "die für seine Tätigkeit erforderlichen Gewerbeanmeldungen, Eintragungen (z. B. in die Handwerksrolle oder Architektenkammer), Erlaubnisse und Versicherungen zu besitzen und Hyloft auf Nachfrage nachzuweisen,",
      "sein Profil aktuell zu halten und Änderungen (z. B. Anschrift, Kontaktdaten, Leistungsangebot, Aufgabe des Betriebs) zeitnah im Partnerbereich einzupflegen oder Hyloft mitzuteilen,",
      "keine rechtswidrigen, wettbewerbswidrigen, beleidigenden oder Rechte Dritter verletzenden Inhalte einzustellen,",
      "die Plattform nicht für Zwecke zu nutzen, die ihrem Zweck widersprechen, insbesondere keine Werbung für Dritte und keine automatisierten Abfragen.",
    ],
  },
  {
    p: "(2) Der Partner ist für die Einhaltung der für ihn geltenden gesetzlichen Informationspflichten (z. B. Anbieterkennzeichnung auf seiner eigenen Website) selbst verantwortlich.",
  },

  { h2: "§ 5 Inhalte und Bildrechte" },
  {
    p: "(1) Der Partner ist für alle Inhalte verantwortlich, die er in sein Profil einstellt oder Hyloft zur Veröffentlichung übermittelt, insbesondere Texte, Logos und Fotos (nachfolgend „Inhalte“).",
  },
  {
    p: "(2) Der Partner sichert zu, dass er über sämtliche erforderlichen Rechte an den Inhalten verfügt, insbesondere Urheber-, Marken- und Nutzungsrechte, und dass erkennbar abgebildete Personen sowie gegebenenfalls Eigentümer abgebildeter Räume der Veröffentlichung zugestimmt haben.",
  },
  {
    p: "(3) Der Partner räumt Hyloft an den Inhalten ein einfaches, unentgeltliches, räumlich unbeschränktes und auf die Dauer der Partnerschaft beschränktes Nutzungsrecht ein, die Inhalte auf der Plattform darzustellen sowie in den Kanälen von Hyloft (z. B. Website hyloft.de, Social-Media-Profile, Newsletter) zur Bewerbung der Plattform zu nutzen. Das Recht umfasst die Befugnis, Inhalte zu speichern, zu vervielfältigen, öffentlich zugänglich zu machen und in technisch erforderlichem Umfang anzupassen (z. B. Format, Größe, Bildausschnitt). Eine inhaltliche Veränderung, die den Aussagegehalt verfälscht, ist nicht gestattet. Hyloft ist berechtigt, den Partner dabei namentlich zu nennen. [Prüfen: Umfang und Dauer des Nutzungsrechts, insbesondere Weiternutzung bereits veröffentlichter Beiträge in Hyloft-Kanälen nach Ende der Partnerschaft.]",
  },
  {
    p: "(4) Der Partner stellt Hyloft von allen Ansprüchen Dritter frei, die wegen einer Verletzung ihrer Rechte durch vom Partner bereitgestellte Inhalte gegen Hyloft geltend gemacht werden, einschließlich der Kosten einer angemessenen Rechtsverteidigung. Dies gilt nicht, soweit der Partner die Rechtsverletzung nicht zu vertreten hat. Hyloft informiert den Partner unverzüglich über solche Ansprüche.",
  },
  {
    p: "(5) Hyloft ist berechtigt, Inhalte, die gegen diese Bedingungen oder gegen geltendes Recht verstoßen oder bei denen ein entsprechender begründeter Verdacht besteht, ganz oder teilweise zu entfernen oder nicht zu veröffentlichen.",
  },

  { h2: "§ 6 Referenzprojekte" },
  {
    p: "Hat der Partner gemeinsam mit Hyloft ein Projekt umgesetzt (z. B. Einbau einer Hyloft-Lofttür), darf Hyloft dieses Projekt mit Zustimmung des Partners auf der Plattform und in den Hyloft-Kanälen als Referenz darstellen und mit dem Profil des Partners verknüpfen. Die Zustimmung kann formlos, auch per E-Mail, erteilt und jederzeit mit Wirkung für die Zukunft widerrufen werden. Für Bildrechte und die Zustimmung Dritter gilt § 5 entsprechend.",
  },

  { h2: "§ 7 Siegel „Von Hyloft geprüft“" },
  {
    p: "(1) Freigeschaltete Partner dürfen das von Hyloft bereitgestellte Siegel „Von Hyloft geprüft“ während der aktiven Partnerschaft in ihrer eigenen Kommunikation (z. B. Website, Angebote, Social Media) verwenden.",
  },
  {
    p: "(2) Das Siegel darf nur in der von Hyloft bereitgestellten Form und unverändert verwendet werden. Es darf nicht in einer Weise genutzt werden, die den Eindruck erweckt, Hyloft übernehme eine Gewähr für die Leistungen des Partners oder sei an dessen Verträgen beteiligt.",
  },
  {
    p: "(3) Das Siegel bestätigt lediglich, dass Hyloft den Betrieb im Rahmen der Aufnahme in das Partnernetz kontaktiert und freigeschaltet hat. Es stellt keine Prüfung der Qualität einzelner Leistungen und keine Garantie dar. [Prüfen: Irreführungsrisiko nach UWG; Prüfkriterien ggf. auf der Plattform offenlegen.]",
  },
  {
    p: "(4) Mit Ende der Partnerschaft oder bei einer Sperrung ist der Partner verpflichtet, das Siegel unverzüglich, spätestens innerhalb von [14] Tagen, aus allen von ihm verantworteten Medien zu entfernen.",
  },

  { h2: "§ 8 Anfragen von Bauherren" },
  {
    p: "(1) Anfragen von Bauherren werden dem Partner per E-Mail übermittelt und im Partnerbereich angezeigt. Der Partner bearbeitet Anfragen eigenverantwortlich. Eine Pflicht zur Annahme einer Anfrage besteht nicht; Hyloft erwartet jedoch eine zeitnahe Rückmeldung an den Bauherrn.",
  },
  {
    p: "(2) Mit Erhalt einer Anfrage ist der Partner für die weitere Verarbeitung der darin enthaltenen personenbezogenen Daten eigenständiger Verantwortlicher im Sinne der DSGVO. Er verarbeitet die Daten ausschließlich zur Bearbeitung der Anfrage und zur Durchführung eines etwaigen Vertrags, hält die datenschutzrechtlichen Vorschriften ein und gibt die Daten nicht an Dritte weiter, soweit dies nicht zur Bearbeitung der Anfrage erforderlich oder gesetzlich erlaubt ist. Eine Nutzung der Daten für Werbung ist nur im gesetzlich zulässigen Rahmen gestattet.",
  },
  {
    p: "(3) Verträge über Planungs-, Bau- oder Handwerksleistungen kommen ausschließlich zwischen dem Partner und dem Bauherrn zustande. Hyloft ist nicht Vertragspartei und haftet nicht für die Erfüllung solcher Verträge.",
  },
  {
    p: "(4) Gibt ein Bauherr an, dass eine Lofttür geplant ist, kann Hyloft den Bauherrn nur kontaktieren, wenn dieser hierzu gesondert eingewilligt hat. Der Partner bleibt in der Wahl seiner Produkte und Lieferanten frei.",
  },

  { h2: "§ 9 Sperrung und Beendigung" },
  {
    p: "(1) Der Nutzungsvertrag läuft auf unbestimmte Zeit. Beide Seiten können ihn jederzeit ohne Einhaltung einer Frist beenden. Die Kündigung kann per E-Mail an info@hyloft.de bzw. an die hinterlegte E-Mail-Adresse des Partners erfolgen.",
  },
  {
    p: "(2) Hyloft kann das Profil des Partners vorübergehend sperren oder den Vertrag beenden, insbesondere wenn der Partner gegen diese Bedingungen verstößt, unwahre Angaben macht, Beschwerden von Bauherren auf ein erhebliches Fehlverhalten hindeuten oder die Voraussetzungen für eine Freischaltung nachträglich entfallen. Hyloft wird den Partner nach Möglichkeit vorab informieren und ihm Gelegenheit zur Stellungnahme geben.",
  },
  {
    p: "(3) Nach Beendigung wird das öffentliche Profil deaktiviert. Die Verpflichtungen aus § 5 Abs. 4, § 7 Abs. 4 und § 8 Abs. 2 gelten über das Vertragsende hinaus fort.",
  },

  { h2: "§ 10 Haftung" },
  {
    p: "(1) Hyloft haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei der Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz sowie im Umfang einer übernommenen Garantie.",
  },
  {
    p: "(2) Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht) ist die Haftung von Hyloft auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Partner regelmäßig vertrauen darf.",
  },
  {
    p: "(3) Im Übrigen ist die Haftung von Hyloft für leichte Fahrlässigkeit ausgeschlossen. Dies gilt insbesondere für entgangene Aufträge, entgangenen Gewinn, Ausfälle der Plattform sowie für Inhalte und Verhalten von Bauherren oder anderen Partnern.",
  },
  {
    p: "(4) Die vorstehenden Beschränkungen gelten auch zugunsten der gesetzlichen Vertreter, Mitarbeitenden und Erfüllungsgehilfen von Hyloft.",
  },

  { h2: "§ 11 Datenschutz" },
  {
    p: "Informationen zur Verarbeitung personenbezogener Daten durch Hyloft enthält die Datenschutzerklärung der Plattform. Für die Verarbeitung von Anfragedaten durch den Partner gilt § 8 Abs. 2.",
  },

  { h2: "§ 12 Änderungen dieser Bedingungen" },
  {
    p: "(1) Hyloft kann diese Bedingungen mit Wirkung für die Zukunft ändern, wenn hierfür ein sachlicher Grund besteht, etwa bei Änderungen der Rechtslage, der Rechtsprechung oder der Funktionen der Plattform.",
  },
  {
    p: "(2) Hyloft teilt dem Partner Änderungen mindestens [vier Wochen] vor ihrem Inkrafttreten per E-Mail mit. Widerspricht der Partner nicht innerhalb dieser Frist, gelten die Änderungen als angenommen. Hyloft weist in der Mitteilung auf das Widerspruchsrecht und die Folgen eines unterbliebenen Widerspruchs hin. Im Fall des Widerspruchs können beide Seiten den Vertrag nach § 9 Abs. 1 beenden. [Prüfen: Wirksamkeit der Zustimmungsfiktion im B2B-Verhältnis.]",
  },

  { h2: "§ 13 Schlussbestimmungen" },
  {
    p: "(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.",
  },
  {
    p: "(2) Ist der Partner Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit diesem Vertrag Dortmund. Hyloft bleibt berechtigt, den Partner auch an seinem allgemeinen Gerichtsstand zu verklagen.",
  },
  {
    p: "(3) Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform. Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.",
  },
  { p: "Stand: " + STAND },
];

/* ------------------------------------------------------------------ */
/* CHECKBOX-TEXTE                                                      */
/* ------------------------------------------------------------------ */

export const EINWILLIGUNG_REGISTRIERUNG =
  "Ich handle als Unternehmer bzw. für meinen Betrieb und akzeptiere die Partnerbedingungen. Ich habe die Datenschutzerklärung zur Kenntnis genommen und bin damit einverstanden, dass Hyloft mich zur Prüfung und Freischaltung telefonisch kontaktiert und mein Profil nach Freischaltung öffentlich darstellt.";

export const EINWILLIGUNG_ANFRAGE =
  "Ich bin damit einverstanden, dass meine Angaben an die von mir ausgewählten Fachbetriebe und an Hyloft übermittelt werden, damit die Betriebe mich zu meinem Vorhaben kontaktieren können. Die Hinweise in der Datenschutzerklärung habe ich zur Kenntnis genommen.";

export const EINWILLIGUNG_LOFTTUER =
  "Optional: Ich möchte, dass Hyloft mich per E-Mail oder – falls angegeben – telefonisch zu einer Lofttür für mein Vorhaben kontaktiert. Diese Einwilligung ist freiwillig und kann jederzeit per E-Mail an info@hyloft.de widerrufen werden.";
