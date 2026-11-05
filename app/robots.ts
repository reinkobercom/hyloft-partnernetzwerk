import type { MetadataRoute } from "next";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://partner.hyloft.de").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  // Vorschau-Deployments nicht indexieren, nur die Produktivseite
  const produktiv = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: produktiv
      ? { userAgent: "*", allow: "/", disallow: ["/admin", "/partnerbereich", "/login", "/setup", "/api/", "/suche?"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
