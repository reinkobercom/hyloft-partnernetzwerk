"use client";

import { useEffect } from "react";

/** Zählt einen Profilaufruf je Browser-Sitzung */
export default function Aufruf({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const k = `aufruf:${slug}`;
      if (sessionStorage.getItem(k)) return;
      sessionStorage.setItem(k, "1");
    } catch {}
    fetch("/api/aufruf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }), keepalive: true }).catch(() => {});
  }, [slug]);
  return null;
}
