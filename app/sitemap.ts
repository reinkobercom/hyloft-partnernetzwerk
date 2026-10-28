import type { MetadataRoute } from "next";
import { GEWERKE, GEWERK_SEO, ORTE, PARTNER, ortSlug } from "@/lib/data";
import { ARTIKEL } from "@/lib/blog";

const BASE = "https://hyloft-partnernetzwerk.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const statisch = ["", "/suche", "/fuer-partner", "/blog", "/regionen", "/anfrage"].map((p) => ({ url: `${BASE}${p}` }));
  const partner = PARTNER.map((p) => ({ url: `${BASE}/partner/${p.slug}` }));
  const artikel = ARTIKEL.map((a) => ({ url: `${BASE}/blog/${a.slug}`, lastModified: a.datum }));
  const seo = GEWERKE.flatMap((g) => ORTE.map((o) => ({ url: `${BASE}/${GEWERK_SEO[g.slug].slug}/${ortSlug(o.name)}` })));
  return [...statisch, ...partner, ...artikel, ...seo];
}
