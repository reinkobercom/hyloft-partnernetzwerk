import Link from "next/link";
import { sql } from "@/lib/db";
import { mailKonfiguriert } from "@/lib/mail";

export default async function AdminStart() {
  const db = sql();
  const [[z], neueReg, loftLeads] = await Promise.all([
    db<{ live: number; entwurf: number; reg: number; anf30: number; loft30: number }[]>`
      select (select count(*) from partners where status = 'live')::int as live,
             (select count(*) from partners where status = 'entwurf')::int as entwurf,
             (select count(*) from registrierungen where status = 'offen')::int as reg,
             (select count(*) from anfragen where created_at > now() - interval '30 days')::int as anf30,
             (select count(*) from anfragen where created_at > now() - interval '30 days' and lofttuer in ('Ja', 'Vielleicht'))::int as loft30`,
    db<{ id: string; firma: string; ort: string; rueckruf: string; telefon: string }[]>`
      select id, firma, ort, rueckruf, telefon from registrierungen where status = 'offen' order by created_at limit 5`,
    db<{ id: string; name: string; ort: string; lofttuer: string; lofttuer_kontakt: boolean }[]>`
      select id, name, ort, lofttuer, lofttuer_kontakt from anfragen where lofttuer in ('Ja', 'Vielleicht') order by created_at desc limit 5`,
  ]);
  const karten: [string, number, string, string][] = [
    ["Offene Registrierungen", z.reg, "/admin/registrierungen", "Freischaltungsanrufe ausstehend"],
    ["Partner live", z.live, "/admin/partner", `${z.entwurf} in Vorbereitung`],
    ["Anfragen (30 Tage)", z.anf30, "/admin/anfragen", "von Bauherren"],
    ["Lofttür-Leads (30 Tage)", z.loft30, "/admin/anfragen?filter=lofttuer", "Bauherren planen eine Lofttür"],
  ];
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold">Übersicht</h1>
          <p className="mt-1 text-sm text-muted">Das steht im Partnernetz an.</p>
        </div>
        <Link href="/admin/partner/neu" className="self-start rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft">+ Partner anlegen</Link>
      </div>
      {!mailKonfiguriert && (
        <p className="mt-6 rounded-2xl bg-amber-50 px-5 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
          E-Mail-Versand ist noch nicht eingerichtet. Alle Mails werden unter „E-Mails“ protokolliert, aber nicht verschickt.
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {karten.map(([k, v, href, d]) => (
          <Link key={k} href={href} className="rounded-3xl bg-white p-6 hover:ring-1 hover:ring-forest/20">
            <p className="text-xs text-muted">{k}</p>
            <p className="mt-2 text-3xl font-semibold text-forest">{v}</p>
            <p className="mt-1 text-xs text-muted">{d}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-6">
          <p className="font-semibold">Nächste Freischaltungsanrufe</p>
          {neueReg.length === 0 ? <p className="mt-4 text-sm text-muted">Keine offenen Registrierungen.</p> : (
            <ul className="mt-4 divide-y divide-line text-sm">
              {neueReg.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <span><span className="font-medium">{r.firma}</span> <span className="text-muted">· {r.ort}</span></span>
                  <a href={`tel:${r.telefon.replace(/[^\d+]/g, "")}`} className="text-xs font-semibold text-forest">{r.telefon} ({r.rueckruf || "egal"})</a>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-3xl bg-white p-6">
          <p className="font-semibold">Neueste Lofttür-Leads</p>
          {loftLeads.length === 0 ? <p className="mt-4 text-sm text-muted">Noch keine.</p> : (
            <ul className="mt-4 divide-y divide-line text-sm">
              {loftLeads.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <span><span className="font-medium">{a.name}</span> <span className="text-muted">· {a.ort || "–"}</span></span>
                  <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${a.lofttuer_kontakt ? "bg-forest text-white" : "bg-mint text-forest"}`}>
                    {a.lofttuer}{a.lofttuer_kontakt ? " · Kontakt erlaubt" : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
