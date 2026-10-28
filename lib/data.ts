// Klickdummy: Alle Partnerprofile sind erfundene Beispielprofile.

export type Gewerk = {
  slug: string;
  name: string;
  plural: string;
  kurz: string;
};

export const GEWERKE: Gewerk[] = [
  { slug: "innenarchitektur", name: "Innenarchitektur", plural: "Innenarchitekten", kurz: "Raumplanung, Material- und Lichtkonzepte" },
  { slug: "tischlerei", name: "Tischlerei & Schreinerei", plural: "Tischler & Schreiner", kurz: "Möbel, Einbauten, Laibungen nach Maß" },
  { slug: "innenausbau", name: "Innenausbau", plural: "Innenausbauer", kurz: "Komplette Ausbauten aus einer Hand" },
  { slug: "trockenbau", name: "Trockenbau", plural: "Trockenbauer", kurz: "Wände öffnen, schließen, Durchbrüche" },
  { slug: "maler", name: "Maler & Lackierer", plural: "Maler", kurz: "Wände, Decken, Spachteltechnik" },
  { slug: "boden", name: "Bodenleger", plural: "Bodenleger", kurz: "Parkett, Fliese, Designboden" },
];

export type Ort = { name: string; plz: string; lat: number; lng: number };

export const ORTE: Ort[] = [
  { name: "Lüdinghausen", plz: "59348", lat: 51.768, lng: 7.443 },
  { name: "Münster", plz: "48143", lat: 51.962, lng: 7.626 },
  { name: "Dortmund", plz: "44135", lat: 51.514, lng: 7.468 },
  { name: "Werne", plz: "59368", lat: 51.664, lng: 7.633 },
  { name: "Lünen", plz: "44532", lat: 51.616, lng: 7.527 },
  { name: "Coesfeld", plz: "48653", lat: 51.946, lng: 7.168 },
  { name: "Dülmen", plz: "48249", lat: 51.831, lng: 7.278 },
  { name: "Hamm", plz: "59065", lat: 51.681, lng: 7.815 },
  { name: "Bochum", plz: "44787", lat: 51.481, lng: 7.216 },
  { name: "Essen", plz: "45127", lat: 51.456, lng: 7.012 },
  { name: "Recklinghausen", plz: "45657", lat: 51.614, lng: 7.197 },
  { name: "Haltern am See", plz: "45721", lat: 51.743, lng: 7.183 },
  { name: "Senden", plz: "48308", lat: 51.857, lng: 7.483 },
  { name: "Ahlen", plz: "59227", lat: 51.763, lng: 7.892 },
  { name: "Unna", plz: "59423", lat: 51.535, lng: 7.689 },
  { name: "Gelsenkirchen", plz: "45879", lat: 51.517, lng: 7.085 },
  { name: "Düsseldorf", plz: "40213", lat: 51.227, lng: 6.773 },
  { name: "Köln", plz: "50667", lat: 50.938, lng: 6.96 },
  { name: "Bielefeld", plz: "33602", lat: 52.021, lng: 8.532 },
  { name: "Borken", plz: "46325", lat: 51.844, lng: 6.858 },
];

export type Partner = {
  slug: string;
  firma: string;
  gewerk: string;
  ort: string;
  inhaber: string;
  seit: number;
  mitarbeiter: string;
  radiusKm: number;
  claim: string;
  beschreibung: string;
  leistungen: string[];
  bilder: string[];
  verifiziert: boolean;
  lofttuerErfahrung: boolean;
};

export const PARTNER: Partner[] = [
  {
    slug: "atelier-raumform-muenster",
    firma: "Atelier Raumform",
    gewerk: "innenarchitektur",
    ort: "Münster",
    inhaber: "Lena Hartmann",
    seit: 2014,
    mitarbeiter: "4–6",
    radiusKm: 60,
    claim: "Räume, die mit Licht arbeiten statt gegen es.",
    beschreibung:
      "Wir planen Wohnräume ganzheitlich: von der Grundrissidee über Material- und Lichtkonzept bis zur Bauleitung. Offene Grundrisse mit gläsernen Trennungen gehören zu unseren liebsten Aufgaben.",
    leistungen: ["Grundrissplanung", "Material- & Farbkonzept", "Lichtplanung", "Bauleitung", "3D-Visualisierung"],
    bilder: ["/img/p13.jpg", "/img/p3.jpg", "/img/p18.jpg"],
    verifiziert: true,
    lofttuerErfahrung: true,
  },
  {
    slug: "tischlerei-brockmann-luedinghausen",
    firma: "Tischlerei Brockmann",
    gewerk: "tischlerei",
    ort: "Lüdinghausen",
    inhaber: "Thomas Brockmann",
    seit: 1987,
    mitarbeiter: "7–10",
    radiusKm: 40,
    claim: "Meisterbetrieb für Einbaumöbel und Innenausbau.",
    beschreibung:
      "Familiengeführte Tischlerei in zweiter Generation. Wir fertigen Einbauschränke, Garderoben und Wandverkleidungen nach Maß und übernehmen die Anpassung von Laibungen und Zargen.",
    leistungen: ["Einbaumöbel", "Garderoben", "Laibungen & Zargen", "Treppenverkleidung", "Wandpaneele"],
    bilder: ["/img/p18.jpg", "/img/p4.jpg", "/img/p7.jpg"],
    verifiziert: true,
    lofttuerErfahrung: true,
  },
  {
    slug: "kaiser-innenausbau-dortmund",
    firma: "Kaiser Innenausbau",
    gewerk: "innenausbau",
    ort: "Dortmund",
    inhaber: "Marco Kaiser",
    seit: 2009,
    mitarbeiter: "11–20",
    radiusKm: 80,
    claim: "Ein Ansprechpartner für den kompletten Ausbau.",
    beschreibung:
      "Wir koordinieren alle Ausbaugewerke – von Trockenbau über Elektro-Vorbereitung bis zum fertigen Boden. Ideal für Sanierungen, bei denen ein Ansprechpartner alles im Blick behält.",
    leistungen: ["Komplettsanierung", "Trockenbau", "Akustikdecken", "Bodenbeläge", "Koordination"],
    bilder: ["/img/p16.jpg", "/img/p17.jpg", "/img/p2.jpg"],
    verifiziert: true,
    lofttuerErfahrung: true,
  },
  {
    slug: "wandwerk-trockenbau-werne",
    firma: "Wandwerk Trockenbau",
    gewerk: "trockenbau",
    ort: "Werne",
    inhaber: "Sven Albers",
    seit: 2016,
    mitarbeiter: "4–6",
    radiusKm: 50,
    claim: "Wände versetzen, Öffnungen schaffen – sauber und schnell.",
    beschreibung:
      "Ob neue Raumaufteilung, Wanddurchbruch für eine Lofttür oder abgehängte Decke: Wir arbeiten staubarm und termintreu, auch im bewohnten Haus.",
    leistungen: ["Ständerwände", "Wanddurchbrüche", "Abgehängte Decken", "Schallschutz", "Spachtelarbeiten"],
    bilder: ["/img/p6.jpg", "/img/p1.jpg", "/img/p14.jpg"],
    verifiziert: true,
    lofttuerErfahrung: false,
  },
  {
    slug: "farbraum-malerbetrieb-luenen",
    firma: "Farbraum Malerbetrieb",
    gewerk: "maler",
    ort: "Lünen",
    inhaber: "Jana Kötter",
    seit: 2012,
    mitarbeiter: "4–6",
    radiusKm: 35,
    claim: "Ruhige Oberflächen, präzise Kanten.",
    beschreibung:
      "Malerarbeiten im Wohnbereich mit Schwerpunkt auf mineralischen Farben, Kalkputz und Spachteltechniken. Wir arbeiten eng mit Innenarchitekten zusammen.",
    leistungen: ["Innenanstrich", "Kalkputz", "Spachteltechnik", "Tapezierarbeiten", "Lackierarbeiten"],
    bilder: ["/img/p5.jpg", "/img/p11.jpg", "/img/p9.jpg"],
    verifiziert: true,
    lofttuerErfahrung: false,
  },
  {
    slug: "parkettmanufaktur-terhorst-coesfeld",
    firma: "Parkettmanufaktur Terhorst",
    gewerk: "boden",
    ort: "Coesfeld",
    inhaber: "Bernd Terhorst",
    seit: 1998,
    mitarbeiter: "4–6",
    radiusKm: 60,
    claim: "Fischgrät, Landhausdiele, Werkstattqualität.",
    beschreibung:
      "Wir verlegen Massiv- und Mehrschichtparkett, besonders gern im Fischgrätmuster, und schleifen Altböden wieder auf. Übergänge zu Fliese und Türschwellen lösen wir nahtlos.",
    leistungen: ["Fischgrätparkett", "Landhausdielen", "Schleifen & Ölen", "Übergänge", "Treppenbeläge"],
    bilder: ["/img/p12.jpg", "/img/p13.jpg", "/img/p11.jpg"],
    verifiziert: true,
    lofttuerErfahrung: false,
  },
  {
    slug: "studio-lichtung-bochum",
    firma: "Studio Lichtung",
    gewerk: "innenarchitektur",
    ort: "Bochum",
    inhaber: "Deniz Aksoy",
    seit: 2019,
    mitarbeiter: "1–3",
    radiusKm: 70,
    claim: "Innenarchitektur für Bestandsbauten im Ruhrgebiet.",
    beschreibung:
      "Wir machen aus verwinkelten Altbau-Grundrissen offene, helle Wohnungen. Spezialisiert auf Sanierungen von Zechenhäusern und Gründerzeit-Wohnungen.",
    leistungen: ["Bestandsaufnahme", "Umbauplanung", "Küchenplanung", "Materialberatung"],
    bilder: ["/img/p8.jpg", "/img/p10.jpg", "/img/p5.jpg"],
    verifiziert: true,
    lofttuerErfahrung: true,
  },
  {
    slug: "holzwerk-hueging-duelmen",
    firma: "Holzwerk Hüging",
    gewerk: "tischlerei",
    ort: "Dülmen",
    inhaber: "Andreas Hüging",
    seit: 2003,
    mitarbeiter: "4–6",
    radiusKm: 45,
    claim: "Massivholz, ehrlich verarbeitet.",
    beschreibung:
      "Schreinerei mit eigener Werkstatt für Massivholzmöbel, Treppen und Innentüren. Wir beraten gern auch bei der Kombination von Holz und Stahl.",
    leistungen: ["Massivholzmöbel", "Treppen", "Innentüren", "Küchenfronten"],
    bilder: ["/img/p3.jpg", "/img/p12.jpg", "/img/p4.jpg"],
    verifiziert: true,
    lofttuerErfahrung: false,
  },
  {
    slug: "ausbau-plus-hamm",
    firma: "Ausbau Plus",
    gewerk: "innenausbau",
    ort: "Hamm",
    inhaber: "Kevin Rademacher",
    seit: 2015,
    mitarbeiter: "7–10",
    radiusKm: 60,
    claim: "Büro- und Praxisausbau mit Termingarantie.",
    beschreibung:
      "Gewerblicher Innenausbau für Büros, Praxen und Studios. Glastrennwände, Akustik und Beleuchtung planen und setzen wir gemeinsam mit Fachpartnern um.",
    leistungen: ["Büroausbau", "Praxisausbau", "Glastrennwände", "Akustiklösungen"],
    bilder: ["/img/p17.jpg", "/img/p16.jpg", "/img/p14.jpg"],
    verifiziert: true,
    lofttuerErfahrung: true,
  },
  {
    slug: "glanzpunkt-maler-recklinghausen",
    firma: "Glanzpunkt Maler",
    gewerk: "maler",
    ort: "Recklinghausen",
    inhaber: "Patrick Wolters",
    seit: 2010,
    mitarbeiter: "7–10",
    radiusKm: 40,
    claim: "Malerfachbetrieb mit festen Teams.",
    beschreibung:
      "Feste Teams, klare Absprachen, saubere Baustelle. Wir übernehmen Renovierungen im bewohnten Zustand inklusive Abdeckung und Endreinigung.",
    leistungen: ["Renovierung", "Fassade", "Lackierarbeiten", "Bodenbeschichtung"],
    bilder: ["/img/p9.jpg", "/img/p7.jpg", "/img/p1.jpg"],
    verifiziert: false,
    lofttuerErfahrung: false,
  },
  {
    slug: "raumgefuehl-innenarchitektur-senden",
    firma: "Raumgefühl Innenarchitektur",
    gewerk: "innenarchitektur",
    ort: "Senden",
    inhaber: "Miriam Schulze Hobeling",
    seit: 2017,
    mitarbeiter: "1–3",
    radiusKm: 50,
    claim: "Wohnen im Münsterland, neu gedacht.",
    beschreibung:
      "Persönliche Planung für Neubau und Umbau. Wir begleiten Bauherren von der ersten Skizze bis zur Bemusterung – auch gern gemeinsam im Showroom unserer Partner.",
    leistungen: ["Neubauplanung", "Umbau", "Bemusterung", "Möblierung"],
    bilder: ["/img/p7.jpg", "/img/p13.jpg", "/img/p8.jpg"],
    verifiziert: true,
    lofttuerErfahrung: true,
  },
  {
    slug: "boden-und-mehr-unna",
    firma: "Boden & Mehr",
    gewerk: "boden",
    ort: "Unna",
    inhaber: "Oliver Brandt",
    seit: 2011,
    mitarbeiter: "4–6",
    radiusKm: 40,
    claim: "Großformatige Fliesen und Designböden.",
    beschreibung:
      "Verlegung von Großformatfliesen, Vinyl- und Designböden. Bodengleiche Übergänge zu Türen und Trennwänden sind unser Standard.",
    leistungen: ["Großformatfliesen", "Designboden", "Estrichvorbereitung", "Sockelleisten"],
    bilder: ["/img/p14.jpg", "/img/p6.jpg", "/img/p2.jpg"],
    verifiziert: true,
    lofttuerErfahrung: false,
  },
];

// ---------- Hilfsfunktionen ----------

export const gewerkBySlug = (slug: string) => GEWERKE.find((g) => g.slug === slug);
export const partnerBySlug = (slug: string) => PARTNER.find((p) => p.slug === slug);
export const ortByName = (name: string) => ORTE.find((o) => o.name === name);

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .trim();
}

/** Findet einen Ort aus freier Eingabe (Ortsname oder PLZ). */
export function resolveOrt(input: string | undefined): Ort | undefined {
  if (!input) return undefined;
  const q = input.trim();
  if (!q) return undefined;
  if (/^\d{2,5}$/.test(q)) {
    const n = parseInt(q.padEnd(5, "0"), 10);
    return [...ORTE].sort(
      (a, b) => Math.abs(parseInt(a.plz, 10) - n) - Math.abs(parseInt(b.plz, 10) - n)
    )[0];
  }
  const nq = norm(q);
  return ORTE.find((o) => norm(o.name) === nq) ?? ORTE.find((o) => norm(o.name).startsWith(nq)) ?? ORTE.find((o) => norm(o.name).includes(nq));
}

/** Findet ein Gewerk aus freier Eingabe. */
export function resolveGewerk(input: string | undefined): Gewerk | undefined {
  if (!input) return undefined;
  const nq = norm(input);
  if (!nq) return undefined;
  return GEWERKE.find(
    (g) => g.slug === nq || norm(g.name).includes(nq) || norm(g.plural).includes(nq) || nq.includes(norm(g.name).split(" ")[0])
  );
}

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

export type Treffer = Partner & { distanz?: number };

export function suche(was?: string, wo?: string): { treffer: Treffer[]; gewerk?: Gewerk; ort?: Ort; freitext?: string } {
  const gewerk = resolveGewerk(was);
  const ort = resolveOrt(wo);
  const freitext = was && !gewerk ? norm(was) : undefined;

  let treffer: Treffer[] = PARTNER.map((p) => {
    const po = ortByName(p.ort);
    return { ...p, distanz: ort && po ? distanceKm(ort, po) : undefined };
  });

  if (gewerk) treffer = treffer.filter((p) => p.gewerk === gewerk.slug);
  if (freitext)
    treffer = treffer.filter((p) =>
      norm([p.firma, p.claim, p.beschreibung, ...p.leistungen].join(" ")).includes(freitext)
    );
  if (ort) treffer = treffer.filter((p) => (p.distanz ?? 0) <= Math.max(p.radiusKm, 25));

  treffer.sort((a, b) => {
    if (a.distanz !== undefined && b.distanz !== undefined) return a.distanz - b.distanz;
    return Number(b.verifiziert) - Number(a.verifiziert);
  });

  return { treffer, gewerk, ort, freitext };
}

export function initialen(firma: string) {
  return firma
    .split(/\s+/)
    .filter((w) => /^[A-ZÄÖÜ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

// ---------- SEO-Slugs ----------

/** URL-Slug je Gewerk für Seiten wie /tischler/muenster */
export const GEWERK_SEO: Record<string, { slug: string; singular: string }> = {
  innenarchitektur: { slug: "innenarchitekten", singular: "Innenarchitekt" },
  tischlerei: { slug: "tischler", singular: "Tischler" },
  innenausbau: { slug: "innenausbauer", singular: "Innenausbauer" },
  trockenbau: { slug: "trockenbauer", singular: "Trockenbauer" },
  maler: { slug: "maler", singular: "Maler" },
  boden: { slug: "bodenleger", singular: "Bodenleger" },
};

export function ortSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const gewerkBySeo = (slug: string) => GEWERKE.find((g) => GEWERK_SEO[g.slug]?.slug === slug);
export const ortBySlug = (slug: string) => ORTE.find((o) => ortSlug(o.name) === slug);

// ---------- Referenzprojekte (von Hyloft gepflegt) ----------

export type Referenz = {
  id: string;
  titel: string;
  ort: string;
  jahr: number;
  bild: string;
  tuer: string;
  partner: string[]; // Partner-Slugs
};

export const REFERENZEN: Referenz[] = [
  { id: "r1", titel: "Offener Wohnbereich mit Lofttür und Seitenteil", ort: "Senden", jahr: 2026, bild: "/img/p13.jpg", tuer: "Drehtür mit Seitenteil, 4 Sprossen", partner: ["raumgefuehl-innenarchitektur-senden", "parkettmanufaktur-terhorst-coesfeld"] },
  { id: "r2", titel: "Garderobe und Lofttür im Neubau", ort: "Lüdinghausen", jahr: 2026, bild: "/img/p18.jpg", tuer: "Drehtür mit Oberlicht", partner: ["tischlerei-brockmann-luedinghausen"] },
  { id: "r3", titel: "Büro mit Glastrennwänden", ort: "Hamm", jahr: 2025, bild: "/img/p17.jpg", tuer: "Trennwand mit satiniertem Mittelfeld", partner: ["ausbau-plus-hamm"] },
  { id: "r4", titel: "Treppenhaus-Abtrennung im Einfamilienhaus", ort: "Dortmund", jahr: 2025, bild: "/img/p2.jpg", tuer: "Doppeltür mit Festelement", partner: ["kaiser-innenausbau-dortmund", "wandwerk-trockenbau-werne"] },
  { id: "r5", titel: "Altbau-Umbau mit Doppelflügeltür", ort: "Bochum", jahr: 2025, bild: "/img/p10.jpg", tuer: "Zweiflügelige Drehtür", partner: ["studio-lichtung-bochum"] },
  { id: "r6", titel: "Lichtdurchflutete Diele", ort: "Münster", jahr: 2026, bild: "/img/p3.jpg", tuer: "Drehtür mit Seitenteil", partner: ["atelier-raumform-muenster"] },
];

export const referenzenFuer = (partnerSlug: string) => REFERENZEN.filter((r) => r.partner.includes(partnerSlug));

// ---------- Dummy-Statistik ----------

export function statistik(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => ((h = (h * 1103515245 + 12345) >>> 0) % 1000) / 1000;
  const monate = ["Mai", "Jun", "Jul", "Aug", "Sep", "Okt"];
  return monate.map((m, i) => {
    const aufrufe = Math.round(40 + i * 18 + rnd() * 40);
    return { monat: m, aufrufe, anfragen: Math.max(0, Math.round(aufrufe / 22 + rnd() * 2 - 1)) };
  });
}
