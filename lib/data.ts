// Stammdaten (Gewerke, Orte) und Suchlogik. Partnerdaten kommen aus der Datenbank (lib/repo.ts).
import { ORTE_NRW, type OrtNRW } from "./orte-nrw";
import PLZ from "./plz-nrw.json";

export type Gewerk = { slug: string; name: string; plural: string; kurz: string };

export const GEWERKE: Gewerk[] = [
  { slug: "innenarchitektur", name: "Innenarchitektur", plural: "Innenarchitekten", kurz: "Raumplanung, Material- und Lichtkonzepte" },
  { slug: "architektur", name: "Architektur", plural: "Architekten", kurz: "Entwurf, Genehmigung, Bauleitung" },
  { slug: "tischlerei", name: "Tischlerei & Schreinerei", plural: "Tischler & Schreiner", kurz: "Möbel, Einbauten, Laibungen nach Maß" },
  { slug: "innenausbau", name: "Innenausbau", plural: "Innenausbauer", kurz: "Komplette Ausbauten aus einer Hand" },
  { slug: "trockenbau", name: "Trockenbau", plural: "Trockenbauer", kurz: "Wände öffnen, schließen, Durchbrüche" },
  { slug: "maler", name: "Maler & Lackierer", plural: "Maler", kurz: "Wände, Decken, Spachteltechnik" },
  { slug: "boden", name: "Bodenleger", plural: "Bodenleger", kurz: "Parkett, Fliese, Designboden" },
];

/** URL-Slug je Gewerk für Seiten wie /tischler/muenster */
export const GEWERK_SEO: Record<string, { slug: string; singular: string }> = {
  innenarchitektur: { slug: "innenarchitekten", singular: "Innenarchitekt" },
  architektur: { slug: "architekten", singular: "Architekt" },
  tischlerei: { slug: "tischler", singular: "Tischler" },
  innenausbau: { slug: "innenausbauer", singular: "Innenausbauer" },
  trockenbau: { slug: "trockenbauer", singular: "Trockenbauer" },
  maler: { slug: "maler", singular: "Maler" },
  boden: { slug: "bodenleger", singular: "Bodenleger" },
};

export const LEISTUNGS_VORSCHLAEGE: Record<string, string[]> = {
  innenarchitektur: ["Grundrissplanung", "Lichtplanung", "Material- & Farbkonzept", "Bauleitung", "3D-Visualisierung", "Küchenplanung"],
  architektur: ["Entwurfsplanung", "Bauantrag", "Umbau & Sanierung", "Bauleitung", "Energieberatung", "Denkmalschutz"],
  tischlerei: ["Einbaumöbel", "Innentüren", "Treppen", "Laibungen & Zargen", "Küchen", "Garderoben", "Wandpaneele"],
  innenausbau: ["Komplettsanierung", "Trockenbau", "Akustik", "Bodenbeläge", "Koordination", "Decken"],
  trockenbau: ["Ständerwände", "Wanddurchbrüche", "Abgehängte Decken", "Schallschutz", "Spachtelarbeiten"],
  maler: ["Innenanstrich", "Spachteltechnik", "Kalkputz", "Tapezieren", "Lackierarbeiten"],
  boden: ["Parkett", "Fliese", "Designboden", "Schleifen & Ölen", "Treppenbeläge", "Übergänge"],
};

export const gewerkBySlug = (slug: string) => GEWERKE.find((g) => g.slug === slug);
export const gewerkBySeo = (slug: string) => GEWERKE.find((g) => GEWERK_SEO[g.slug]?.slug === slug);

// ---------- Orte ----------

export type Ort = { name: string; plz: string; lat: number; lng: number };
export const ORTE: OrtNRW[] = ORTE_NRW;

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

export const ortBySlug = (slug: string) => ORTE_NRW.find((o) => o.slug === slug);

const PLZ_MAP = PLZ as unknown as Record<string, [number, number, string]>;

function norm(s: string) {
  return s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ").trim();
}

/** Findet einen Ort aus freier Eingabe: „59348“, „59348 Lüdinghausen“, „Lüdinghausen“, „Münst“. */
export function resolveOrt(input: string | undefined | null): Ort | undefined {
  if (!input) return undefined;
  const q = input.trim();
  if (!q) return undefined;
  const plz = q.match(/\b(\d{5})\b/)?.[1];
  if (plz && PLZ_MAP[plz]) {
    const [lat, lng, name] = PLZ_MAP[plz];
    return { name, plz, lat, lng };
  }
  const text = q.replace(/\d+/g, "").trim();
  if (text) {
    const nq = norm(text);
    const stadt =
      ORTE_NRW.find((o) => norm(o.name) === nq) ??
      ORTE_NRW.find((o) => norm(o.name).startsWith(nq)) ??
      ORTE_NRW.find((o) => norm(o.name).includes(nq));
    if (stadt) return { name: stadt.name, plz: stadt.plz, lat: stadt.lat, lng: stadt.lng };
    for (const [p, [lat, lng, name]] of Object.entries(PLZ_MAP)) {
      if (norm(name) === nq) return { name, plz: p, lat, lng };
    }
  }
  const prefix = q.match(/^\d{2,4}$/)?.[0];
  if (prefix) {
    const treffer = Object.keys(PLZ_MAP).filter((p) => p.startsWith(prefix)).sort()[0];
    if (treffer) {
      const [lat, lng, name] = PLZ_MAP[treffer];
      return { name, plz: treffer, lat, lng };
    }
  }
  return undefined;
}

/** Findet ein Gewerk aus freier Eingabe. */
export function resolveGewerk(input: string | undefined | null): Gewerk | undefined {
  if (!input) return undefined;
  const nq = norm(input);
  if (!nq) return undefined;
  return GEWERKE.find(
    (g) =>
      g.slug === nq ||
      norm(g.name) === nq ||
      norm(g.plural) === nq ||
      norm(g.name).includes(nq) ||
      norm(g.plural).includes(nq) ||
      norm(GEWERK_SEO[g.slug].singular).includes(nq) ||
      nq.includes(norm(GEWERK_SEO[g.slug].singular))
  );
}

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

// ---------- Partner (öffentliche Sicht) ----------

export type Partner = {
  id: string;
  slug: string;
  firma: string;
  gewerk: string;
  ort: string;
  plz: string;
  lat: number;
  lng: number;
  radiusKm: number;
  inhaber: string;
  telefon: string;
  email: string;
  website: string;
  claim: string;
  beschreibung: string;
  leistungen: string[];
  seit: number | null;
  mitarbeiter: string;
  logo: string | null;
  bilder: string[];
  lofttuerErfahrung: boolean;
  verifiziert: boolean;
};

export type Treffer = Partner & { distanz?: number };

export function suche(partner: Partner[], was?: string, wo?: string) {
  const gewerk = resolveGewerk(was);
  const ort = resolveOrt(wo);
  const freitext = was && !gewerk ? norm(was) : undefined;

  let treffer: Treffer[] = partner.map((p) => ({ ...p, distanz: ort ? distanceKm(ort, p) : undefined }));
  if (gewerk) treffer = treffer.filter((p) => p.gewerk === gewerk.slug);
  if (freitext) treffer = treffer.filter((p) => norm([p.firma, p.claim, p.beschreibung, ...p.leistungen].join(" ")).includes(freitext));
  if (ort) treffer = treffer.filter((p) => (p.distanz ?? 0) <= Math.max(p.radiusKm, 15));

  treffer.sort((a, b) =>
    a.distanz !== undefined && b.distanz !== undefined ? a.distanz - b.distanz : a.firma.localeCompare(b.firma, "de")
  );
  return { treffer, gewerk, ort, freitext };
}

export function initialen(firma: string) {
  const w = firma.split(/\s+/).filter((x) => /^[A-ZÄÖÜ0-9]/i.test(x));
  return (w.slice(0, 2).map((x) => x[0]).join("") || firma.slice(0, 2)).toUpperCase();
}

export function slugify(s: string) {
  return ortSlug(s).slice(0, 60);
}
