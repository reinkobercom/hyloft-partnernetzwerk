// Textbausteine für die automatisch erzeugten Seiten je Gewerk und Stadt.

export const SEO_TEXTE: Record<string, { intro: string; achten: string[]; faq: [string, string][] }> = {
  innenarchitektur: {
    intro: "Ein Innenarchitekt plant Räume ganzheitlich – vom Grundriss über Material und Licht bis zur Abstimmung der Gewerke. Gerade bei Umbauten mit offenen Grundrissen oder gläsernen Trennungen lohnt sich professionelle Planung.",
    achten: ["Referenzen, die zu Ihrem Vorhaben passen (Neubau, Altbau, Wohnung)", "Klare Absprache zum Leistungsumfang und zur Abrechnung", "Erfahrung mit der Koordination von Handwerksbetrieben"],
    faq: [
      ["Wann lohnt sich ein Innenarchitekt?", "Vor allem bei Umbauten, bei denen Räume neu aufgeteilt, Wände geöffnet oder Licht- und Materialkonzepte entwickelt werden. Ein Innenarchitekt hilft, teure Planungsfehler zu vermeiden."],
      ["Wie läuft die Zusammenarbeit ab?", "Meist beginnt sie mit einem Erstgespräch vor Ort. Danach folgen Entwurf, Detailplanung und – je nach Auftrag – die Begleitung der Umsetzung."],
      ["Plant ein Innenarchitekt auch Lofttüren und Glastrennwände?", "Ja. Viele Innenarchitekten im Partnernetz haben Erfahrung mit Stahl-Glas-Elementen und stimmen Profile, Glas und Sprossenteilung auf den Raum ab."],
    ],
  },
  tischlerei: {
    intro: "Tischler und Schreiner fertigen Möbel, Einbauten und Innenausbauten nach Maß. Bei Lofttüren übernehmen sie oft die Anpassung von Laibungen, Zargen oder angrenzenden Einbauschränken.",
    achten: ["Meisterbetrieb mit eigener Werkstatt", "Referenzfotos von vergleichbaren Arbeiten", "Realistische Terminplanung und schriftliches Angebot"],
    faq: [
      ["Was ist der Unterschied zwischen Tischler und Schreiner?", "Keiner – es ist dasselbe Handwerk. „Schreiner“ ist vor allem in Süd- und Westdeutschland gebräuchlich, „Tischler“ im Norden und Osten."],
      ["Kann ein Tischler auch eine Laibung für eine Lofttür bauen?", "Ja, Laibungen und Wandverkleidungen aus Holz gehören zu den typischen Arbeiten. Wichtig ist die Abstimmung der Maße mit dem Türhersteller."],
      ["Wie lange dauert eine Maßanfertigung?", "Das hängt vom Umfang und der Auslastung des Betriebs ab. Fragen Sie früh an und klären Sie Liefer- und Montagetermine im Angebot."],
    ],
  },
  innenausbau: {
    intro: "Innenausbauer koordinieren mehrere Gewerke aus einer Hand – von Trockenbau über Böden bis zu Decken und Akustik. Ideal, wenn Sie bei einer Sanierung nur einen Ansprechpartner möchten.",
    achten: ["Ein fester Ansprechpartner für alle Gewerke", "Transparenter Zeitplan mit klarer Reihenfolge", "Erfahrung mit Arbeiten im bewohnten Zustand"],
    faq: [
      ["Was übernimmt ein Innenausbauer?", "Typisch sind Trockenbau, Decken, Bodenbeläge, Akustiklösungen und die Koordination weiterer Handwerker – je nach Betrieb mit eigenem Team oder Partnern."],
      ["Lohnt sich ein Generalunternehmer für den Innenausbau?", "Bei größeren Umbauten spart ein zentraler Ansprechpartner viel Abstimmungsaufwand. Bei kleineren Projekten kann die direkte Beauftragung einzelner Gewerke günstiger sein."],
      ["Kann der Innenausbauer den Einbau einer Lofttür vorbereiten?", "Ja – etwa den Wanddurchbruch, die Laibung und den Bodenanschluss. Die Tür selbst wird nach Aufmaß gefertigt."],
    ],
  },
  trockenbau: {
    intro: "Trockenbauer setzen neue Wände, öffnen bestehende Leichtbauwände und schaffen Durchbrüche für Türen und Glaselemente – schnell, sauber und meist ohne lange Trocknungszeiten.",
    achten: ["Staubarmes Arbeiten, besonders im bewohnten Haus", "Klärung, ob die Wand tragend ist", "Saubere Spachtelung als Vorbereitung für den Maler"],
    faq: [
      ["Darf ich jede Wand für eine Tür öffnen?", "Nein. Bei tragenden Wänden muss vorab ein Statiker eingebunden werden. Nichttragende Leichtbauwände lassen sich in der Regel unkompliziert öffnen."],
      ["Wie schnell ist eine neue Trockenbauwand fertig?", "Kleinere Wände sind oft in wenigen Tagen gestellt, beplankt und gespachtelt. Den genauen Zeitrahmen nennt Ihnen der Betrieb im Angebot."],
      ["Welche Wandstärke braucht eine Lofttür?", "Lofttüren werden nach Aufmaß gefertigt und passen sich der vorhandenen Wandstärke an. Wichtig ist ein sauber ausgeführtes Rohbaumaß."],
    ],
  },
  maler: {
    intro: "Malerbetriebe sorgen für den Abschluss, der ins Auge fällt: saubere Wände, präzise Kanten an Laibungen und Türrahmen und Oberflächen, die zur Einrichtung passen.",
    achten: ["Sorgfältiges Abdecken und Endreinigung", "Beratung zu Farben und Oberflächen", "Feste Teams statt wechselnder Subunternehmer"],
    faq: [
      ["Wann kommt der Maler bei einem Türeinbau?", "Meist nach dem Wanddurchbruch und vor oder nach der Montage der Tür – das hängt von der Laibungsausführung ab. Stimmen Sie die Reihenfolge mit allen Beteiligten ab."],
      ["Welche Farben passen zu schwarzen Lofttüren?", "Helle, warme Weißtöne und gedeckte Naturtöne betonen den Kontrast. Ein Maler berät Sie gern mit Mustern vor Ort."],
      ["Streicht der Maler auch im bewohnten Zustand?", "Ja, die meisten Betriebe arbeiten auch in bewohnten Räumen – mit Abdeckung, Abklebung und Reinigung."],
    ],
  },
  boden: {
    intro: "Bodenleger verlegen Parkett, Fliesen und Designböden und lösen Übergänge zwischen verschiedenen Belägen – oft genau dort, wo später die Lofttür steht.",
    achten: ["Erfahrung mit bodengleichen Übergängen", "Prüfung des Untergrunds vor der Verlegung", "Klare Angabe der Fertigbodenhöhe für alle Gewerke"],
    faq: [
      ["Was muss ich beim Übergang unter einer Lofttür beachten?", "Entscheidend ist die Fertigbodenhöhe. Sie wird für das Aufmaß der Tür benötigt. Unterschiedliche Beläge werden mit einer Fuge oder einem Profil getrennt."],
      ["Erst Boden, dann Tür – oder umgekehrt?", "In der Regel wird zuerst der Boden verlegt oder zumindest die Höhe festgelegt. Stimmen Sie die Reihenfolge mit Bodenleger und Türhersteller ab."],
      ["Passt Fischgrätparkett zu Lofttüren?", "Sehr gut – die Kombination aus Holz und schwarzem Stahl ist ein Klassiker. Achten Sie auf einen sauberen Anschluss an der Türschwelle."],
    ],
  },
};

/** Artikel-Slug, der zu einem Gewerk passt */
export const ARTIKEL_ZU_GEWERK: Record<string, string> = {
  innenarchitektur: "innenarchitekt-beauftragen",
  tischlerei: "lofttuer-im-altbau",
  innenausbau: "lofttuer-im-altbau",
  trockenbau: "wanddurchbruch-fuer-lofttuer",
  maler: "wanddurchbruch-fuer-lofttuer",
  boden: "parkett-und-lofttuer-uebergaenge",
};
