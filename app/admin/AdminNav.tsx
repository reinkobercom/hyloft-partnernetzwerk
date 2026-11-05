"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav({ zaehler }: { zaehler: Record<string, number> }) {
  const pfad = usePathname();
  const tabs: [string, string, number?][] = [
    ["/admin", "Übersicht"],
    ["/admin/registrierungen", "Registrierungen", zaehler.registrierungen],
    ["/admin/partner", "Partner"],
    ["/admin/anfragen", "Anfragen", zaehler.anfragen],
    ["/admin/service", "Partnerservice", zaehler.service],
    ["/admin/referenzen", "Referenzprojekte"],
    ["/admin/emails", "E-Mails"],
    ["/admin/team", "Team & Konto"],
  ];
  return (
    <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
      {tabs.map(([href, titel, n]) => {
        const aktiv = href === "/admin" ? pfad === "/admin" : pfad.startsWith(href);
        return (
          <Link key={href} href={href} className={`shrink-0 border-b-2 px-3 pb-3 pt-1 text-sm font-medium ${aktiv ? "border-forest text-forest" : "border-transparent text-muted hover:text-ink"}`}>
            {titel}
            {n ? <span className="ml-1.5 rounded-full bg-forest px-1.5 py-0.5 text-[0.65rem] text-white">{n}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
