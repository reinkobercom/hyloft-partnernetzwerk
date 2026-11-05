import "server-only";
import { sql, dbKonfiguriert } from "./db";
import type { Partner } from "./data";

export type PartnerRow = {
  id: string;
  slug: string;
  user_id: string | null;
  status: "entwurf" | "live" | "gesperrt";
  firma: string;
  gewerk: string;
  ort: string;
  plz: string;
  lat: number;
  lng: number;
  radius_km: number;
  inhaber: string;
  telefon: string;
  email: string;
  website: string;
  claim: string;
  beschreibung: string;
  leistungen: string[];
  seit: number | null;
  mitarbeiter: string;
  logo_id: string | null;
  bilder: string[];
  lofttuer_erfahrung: boolean;
  verifiziert: boolean;
  notiz_intern: string;
  created_at: Date;
  updated_at: Date;
};

export const dateiUrl = (id: string | null) => (id ? `/api/datei/${id}` : null);

export function zuPartner(r: PartnerRow): Partner {
  return {
    id: r.id,
    slug: r.slug,
    firma: r.firma,
    gewerk: r.gewerk,
    ort: r.ort,
    plz: r.plz,
    lat: r.lat,
    lng: r.lng,
    radiusKm: r.radius_km,
    inhaber: r.inhaber,
    telefon: r.telefon,
    email: "", // Anfrage-Adresse bleibt intern (wird nie an den Browser gegeben)
    website: r.website,
    claim: r.claim,
    beschreibung: r.beschreibung,
    leistungen: r.leistungen ?? [],
    seit: r.seit,
    mitarbeiter: r.mitarbeiter,
    logo: dateiUrl(r.logo_id),
    bilder: (r.bilder ?? []).map((b) => `/api/datei/${b}`),
    lofttuerErfahrung: r.lofttuer_erfahrung,
    verifiziert: r.verifiziert,
  };
}

/** Alle live geschalteten Partner (für Suche, Karte, SEO-Seiten). */
export async function livePartner(): Promise<Partner[]> {
  if (!dbKonfiguriert) return [];
  const rows = await sql()<PartnerRow[]>`select * from partners where status = 'live' order by firma`;
  return rows.map(zuPartner);
}

export async function livePartnerBySlug(slug: string): Promise<Partner | null> {
  if (!dbKonfiguriert) return null;
  const rows = await sql()<PartnerRow[]>`select * from partners where slug = ${slug} and status = 'live'`;
  return rows[0] ? zuPartner(rows[0]) : null;
}

export async function partnerRowById(id: string): Promise<PartnerRow | null> {
  const rows = await sql()<PartnerRow[]>`select * from partners where id = ${id}`;
  return rows[0] ?? null;
}

export async function partnerRowByUser(userId: string): Promise<PartnerRow | null> {
  const rows = await sql()<PartnerRow[]>`select * from partners where user_id = ${userId} order by created_at limit 1`;
  return rows[0] ?? null;
}

export type Referenz = { id: string; titel: string; ort: string; jahr: number | null; tuer: string; bild: string | null; partner_ids: string[] };

export async function referenzenFuer(partnerId: string): Promise<Referenz[]> {
  if (!dbKonfiguriert) return [];
  const rows = await sql()<(Omit<Referenz, "bild"> & { bild_id: string | null })[]>`
    select id, titel, ort, jahr, tuer, bild_id, partner_ids from referenzen
    where ${partnerId} = any(partner_ids) order by jahr desc nulls last, created_at desc`;
  return rows.map((r) => ({ ...r, bild: dateiUrl(r.bild_id) }));
}

/** Eindeutigen Slug aus Firma + Ort bauen */
export async function freierSlug(basis: string, ausserId?: string) {
  let slug = basis || "betrieb";
  for (let i = 2; i < 50; i++) {
    const rows = await sql()`select 1 from partners where slug = ${slug} and id is distinct from ${ausserId ?? null}`;
    if (rows.length === 0) return slug;
    slug = `${basis}-${i}`;
  }
  return `${basis}-${Date.now()}`;
}
