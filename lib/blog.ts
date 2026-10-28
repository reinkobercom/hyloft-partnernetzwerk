// Klickdummy: Beispielartikel für den Blogbereich.

export type Block = { h2: string } | { p: string } | { tipp: string } | { liste: string[] };

export type Artikel = {
  slug: string;
  titel: string;
  teaser: string;
  kategorie: "Planung" | "Ausbau" | "Für Betriebe";
  datum: string; // ISO
  lesezeit: number;
  bild: string;
  autor: string;
  cta?: { text: string; was: string };
  inhalt: Block[];
};

export const KATEGORIEN = ["Planung", "Ausbau", "Für Betriebe"] as const;

export const ARTIKEL: Artikel[] = [
  {
    slug: "wanddurchbruch-fuer-lofttuer",
    titel: "Wanddurchbruch für eine Lofttür: Darauf kommt es an",
    teaser: "Wer eine Lofttür einbauen will, braucht oft eine größere Öffnung. Was Sie vorab klären sollten – und wer Ihnen dabei hilft.",
    kategorie: "Ausbau",
    datum: "2026-10-20",
    lesezeit: 5,
    bild: "/img/p6.jpg",
    autor: "Hyloft Redaktion",
    cta: { text: "Trockenbauer in Ihrer Nähe finden", was: "Trockenbau" },
    inhalt: [
      { p: "Eine Lofttür lebt von ihrer Größe. Viele Bauherren entscheiden sich deshalb für eine breitere oder höhere Öffnung als die bisherige Zimmertür – oft mit Seitenteil oder Oberlicht. Damit das Projekt reibungslos läuft, lohnt sich ein Blick auf ein paar Grundlagen." },
      { h2: "Tragend oder nicht tragend?" },
      { p: "Die wichtigste Frage zuerst: Ist die Wand tragend? Bei nichttragenden Ständer- oder Leichtbauwänden ist ein Durchbruch in der Regel unkompliziert. Bei tragenden Wänden muss ein Statiker die Öffnung berechnen und einen passenden Sturz festlegen. Planen Sie dafür etwas Vorlauf ein." },
      { tipp: "Klären Sie die Statik, bevor Sie das Aufmaß für die Lofttür machen lassen. So stimmt das Rohbaumaß von Anfang an." },
      { h2: "Was im Vorfeld zu klären ist" },
      { liste: ["Leitungen in der Wand (Strom, Wasser, Heizung)", "Bodenaufbau und Höhe der fertigen Oberfläche", "Gewünschte Türart: Drehtür, Schiebetür oder Pendeltür", "Seitenteile und Oberlichter", "Ausführung der Laibung: verputzt, gespachtelt oder mit Holz verkleidet"] },
      { h2: "Wer macht was?" },
      { p: "Den Durchbruch selbst übernimmt meist ein Trockenbauer oder Maurer, bei tragenden Wänden zusammen mit einem Statiker. Für saubere Laibungen und Anschlüsse sorgen Maler oder Tischler. Die Lofttür wird anschließend passgenau nach Aufmaß gefertigt." },
    ],
  },
  {
    slug: "innenarchitekt-beauftragen",
    titel: "Innenarchitekt beauftragen: Wann lohnt es sich?",
    teaser: "Vom Grundriss bis zur Lichtplanung: Wann sich professionelle Planung auszahlt und wie Sie den passenden Innenarchitekten finden.",
    kategorie: "Planung",
    datum: "2026-10-14",
    lesezeit: 4,
    bild: "/img/p13.jpg",
    autor: "Hyloft Redaktion",
    cta: { text: "Innenarchitekten in Ihrer Nähe finden", was: "Innenarchitektur" },
    inhalt: [
      { p: "Viele denken bei Innenarchitektur an große Neubauprojekte. Dabei hilft ein Innenarchitekt gerade bei Umbauten im Bestand: wenn Räume zusammengelegt, Wände geöffnet oder Licht neu verteilt werden soll." },
      { h2: "Typische Anlässe" },
      { liste: ["Offener Wohn- und Essbereich statt einzelner Zimmer", "Sanierung eines Altbaus mit verwinkeltem Grundriss", "Neue Küche mit Blickbeziehung zum Wohnraum", "Abgrenzung von Arbeitsbereichen im Homeoffice"] },
      { h2: "Was ein Innenarchitekt konkret leistet" },
      { p: "Neben der Grundrissplanung erarbeitet ein Innenarchitekt Material-, Farb- und Lichtkonzepte, koordiniert die Gewerke und begleitet die Bemusterung. Gerade bei gläsernen Trennungen wie Lofttüren entsteht so ein stimmiges Gesamtbild." },
      { tipp: "Bringen Sie zum Erstgespräch Fotos, Grundrisse und Inspirationsbilder mit. Je konkreter Ihre Vorstellung, desto zielgerichteter die Beratung." },
      { h2: "So finden Sie den passenden Planer" },
      { p: "Achten Sie auf Referenzen, die zu Ihrem Vorhaben passen, und auf das Einsatzgebiet. Ein persönliches Gespräch zeigt schnell, ob die Zusammenarbeit passt." },
    ],
  },
  {
    slug: "lofttuer-im-altbau",
    titel: "Lofttür im Altbau: 5 Tipps für die Sanierung",
    teaser: "Schiefe Wände, hohe Decken, alte Dielen: Wie Lofttüren auch im Altbau perfekt sitzen.",
    kategorie: "Planung",
    datum: "2026-10-07",
    lesezeit: 6,
    bild: "/img/p10.jpg",
    autor: "Hyloft Redaktion",
    cta: { text: "Innenausbauer in Ihrer Nähe finden", was: "Innenausbau" },
    inhalt: [
      { p: "Die Kombination aus Altbau-Charme und Stahl-Glas-Elementen gehört zu den schönsten Gestaltungsideen überhaupt. Damit das Ergebnis überzeugt, sollten Sie ein paar Besonderheiten beachten." },
      { h2: "1. Genau aufmessen lassen" },
      { p: "Im Altbau ist selten etwas im Lot. Ein sorgfältiges Aufmaß an mehreren Punkten ist deshalb Pflicht – Abweichungen werden in der Fertigung berücksichtigt." },
      { h2: "2. Deckenhöhe nutzen" },
      { p: "Hohe Räume vertragen ein Oberlicht über der Tür. Das bringt Licht in Flure und betont die Proportionen." },
      { h2: "3. Sprossenteilung passend wählen" },
      { p: "Die Aufteilung der Sprossen kann sich an bestehenden Fenstern orientieren. So wirkt die Lofttür, als hätte sie schon immer dazugehört." },
      { h2: "4. Bodenübergänge planen" },
      { p: "Alte Dielen und neue Fliesen treffen oft genau unter der Tür aufeinander. Klären Sie den Übergang früh mit dem Bodenleger." },
      { h2: "5. Muster ansehen" },
      { tipp: "Lassen Sie sich ein Musterstück schicken oder besuchen Sie den Showroom. Profilstärke und Oberfläche wirken in echt anders als auf Fotos." },
    ],
  },
  {
    slug: "parkett-und-lofttuer-uebergaenge",
    titel: "Fischgrätparkett und Lofttür: Übergänge sauber planen",
    teaser: "Wo Boden und Tür aufeinandertreffen, entscheidet sich die Wirkung. So gelingt der Anschluss.",
    kategorie: "Ausbau",
    datum: "2026-09-29",
    lesezeit: 3,
    bild: "/img/p12.jpg",
    autor: "Hyloft Redaktion",
    cta: { text: "Bodenleger in Ihrer Nähe finden", was: "Bodenleger" },
    inhalt: [
      { p: "Fischgrätparkett und schwarze Stahlrahmen sind ein Klassiker. Damit der Übergang unter der Tür nicht zum Stolperstein wird, sollte die Reihenfolge der Gewerke stimmen." },
      { h2: "Reihenfolge der Arbeiten" },
      { liste: ["Estrich und Bodenaufbau festlegen", "Fertigbodenhöhe für das Aufmaß der Tür bestimmen", "Boden verlegen oder Anschlussfuge vorsehen", "Lofttür montieren"] },
      { h2: "Schwelle oder bodengleich?" },
      { p: "Bodengleiche Übergänge wirken am elegantesten. Wichtig ist eine saubere Fuge, die unterschiedliche Materialien voneinander trennt. Ihr Bodenleger berät Sie zu passenden Profilen." },
      { tipp: "Teilen Sie dem Türhersteller die exakte Fertigbodenhöhe mit – nicht die Höhe des Rohbodens." },
    ],
  },
  {
    slug: "offener-grundriss-glastrennwand",
    titel: "Offener Grundriss mit Glastrennwand: Licht und Ruhe zugleich",
    teaser: "Offen wohnen, ohne auf Rückzug zu verzichten: Wie Glastrennwände Räume verbinden und trotzdem trennen.",
    kategorie: "Planung",
    datum: "2026-09-22",
    lesezeit: 4,
    bild: "/img/p2.jpg",
    autor: "Hyloft Redaktion",
    cta: { text: "Innenarchitekten in Ihrer Nähe finden", was: "Innenarchitektur" },
    inhalt: [
      { p: "Offene Grundrisse sind beliebt, haben aber Nachteile: Gerüche aus der Küche, Geräusche und fehlende Rückzugsorte. Eine Glastrennwand löst viele dieser Probleme, ohne das Licht zu nehmen." },
      { h2: "Wo Glastrennwände sinnvoll sind" },
      { liste: ["Zwischen Küche und Wohnbereich", "Als Abtrennung des Treppenhauses", "Für ein Homeoffice im Wohnraum", "Als Windfang im Eingangsbereich"] },
      { h2: "Privatsphäre nach Bedarf" },
      { p: "Mit satiniertem oder teilweise mattiertem Glas lassen sich Sichtbereiche gezielt schließen – etwa im unteren Drittel einer Bürotrennwand." },
      { tipp: "Denken Sie bei der Planung an Lichtschalter und Steckdosen in der Nähe der Trennwand. Sie lassen sich nachträglich nur schwer versetzen." },
    ],
  },
  {
    slug: "mehr-anfragen-mit-firmenprofil",
    titel: "Mehr Anfragen über ein gutes Firmenprofil",
    teaser: "Für Fachbetriebe: Was ein Online-Profil braucht, damit Bauherren anfragen – und welche Fehler Sie vermeiden sollten.",
    kategorie: "Für Betriebe",
    datum: "2026-09-15",
    lesezeit: 4,
    bild: "/img/p16.jpg",
    autor: "Hyloft Partnerteam",
    inhalt: [
      { p: "Bauherren entscheiden sich oft innerhalb weniger Sekunden, ob sie einen Betrieb anfragen. Ein vollständiges, ehrliches Profil macht dabei den Unterschied." },
      { h2: "Das gehört in jedes Profil" },
      { liste: ["Drei bis sechs eigene Referenzfotos", "Klar benannte Leistungen statt allgemeiner Floskeln", "Realistisches Einsatzgebiet", "Ein Ansprechpartner mit Namen", "Eine kurze Beschreibung, was Sie auszeichnet"] },
      { h2: "Typische Fehler" },
      { p: "Stockfotos, veraltete Kontaktdaten und zu breite Leistungsversprechen schrecken ab. Lieber weniger Leistungen nennen, die Sie wirklich gern machen." },
      { tipp: "Profile im Hyloft Partnernetz werden nach einem kurzen Gespräch freigeschaltet und erhalten das Siegel „Von Hyloft geprüft“." },
    ],
  },
];

export const artikelBySlug = (slug: string) => ARTIKEL.find((a) => a.slug === slug);

export function datumDE(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}
