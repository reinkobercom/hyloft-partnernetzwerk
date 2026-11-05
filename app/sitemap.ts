import type { MetadataRoute } from "next";
import { GEWERKE, GEWERK_SEO, ORTE, suche } from "@/lib/data";
import { ARTIKEL } from "@/lib/blog";
import { livePartner } from "@/lib/repo";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://partner.hyloft.de").replace(/\/$/, "");

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const partner = await livePartner();
  const statisch = ["", "/suche", "/anfrage", "/fuer-partner", "/registrieren", "/blog", "/regionen"].map((p) => ({ url: `${BASE}${p}` }));
  const profile = partner.map((p) => ({ url: `${BASE}/partner/${p.slug}` }));
  const artikel = ARTIKEL.map((a) => ({ url: `${BASE}/blog/${a.slug}`, lastModified: a.datum }));
  // Nur Gewerk-/Stadtseiten, auf denen mindestens ein Betrieb steht
  const seo = GEWERKE.flatMap((g) =>
    ORTE.filter((o) => suche(partner, g.name, o.name).treffer.length > 0).map((o) => ({ url: `${BASE}/${GEWERK_SEO[g.slug].slug}/${o.slug}` }))
  );
  return [...statisch, ...profile, ...artikel, ...seo];
}
