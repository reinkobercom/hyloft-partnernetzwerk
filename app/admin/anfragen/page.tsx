import Link from "next/link";
import { sql } from "@/lib/db";
import { gewerkBySlug } from "@/lib/data";
import { anfrageStatus } from "../actions";

export default async function Anfragen({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { filter } = await searchParams;
  const nurLoft = filter === "lofttuer";
  const rows = await sql()<{ id: string; quelle: string; name: string; email: string; telefon: string; ort: string; gewerke: string[]; art: string; zeitraum: string; beschreibung: string; lofttuer: string; lofttuer_kontakt: boolean; status: string; created_at: Date; empfaenger: string[] }[]>`
    select a.*, coalesce((select array_agg(p.firma) from partners p where p.id = any(a.partner_ids)), '{}') as empfaenger
    from anfragen a where (${nurLoft} = false or a.lofttuer in ('Ja', 'Vielleicht'))
    order by a.created_at desc limit 200`;
  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold">Anfragen</h1>
          <p className="mt-1 text-sm text-muted">Alle Anfragen von Bauherren. Lofttür-Leads sind markiert.</p>
        </div>
        <div className="inline-flex self-start rounded-full border border-line bg-white p-1 text-sm font-medium">
          <Link href="/admin/anfragen" className={`rounded-full px-4 py-1.5 ${!nurLoft ? "bg-forest text-white" : "text-muted"}`}>Alle</Link>
          <Link href="/admin/anfragen?filter=lofttuer" className={`rounded-full px-4 py-1.5 ${nurLoft ? "bg-forest text-white" : "text-muted"}`}>Nur Lofttür</Link>
        </div>
      </div>
      {rows.length === 0 && <p className="mt-6 rounded-3xl bg-white p-10 text-center text-muted">Noch keine Anfragen.</p>}
      <div className="mt-6 grid gap-4">
        {rows.map((a) => {
          const loft = a.lofttuer === "Ja" || a.lofttuer === "Vielleicht";
          return (
            <div key={a.id} className={`rounded-3xl bg-white p-6 ${loft ? "ring-1 ring-mint-strong" : ""} ${a.status === "bearbeitet" ? "opacity-60" : ""}`}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{a.name}</p>
                <span className="text-sm text-muted">· {a.ort || "–"} · {new Date(a.created_at).toLocaleString("de-DE")} · {a.quelle === "profil" ? "über Profil" : "Sammelanfrage"}</span>
                {loft && <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.7rem] font-semibold text-white">Lofttür: {a.lofttuer}{a.lofttuer_kontakt ? " · Kontakt erlaubt" : " · kein Kontakt erlaubt"}</span>}
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/80">{a.beschreibung}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {[a.art, a.zeitraum, ...a.gewerke.map((g) => gewerkBySlug(g)?.plural ?? g)].filter(Boolean).map((x) => (
                  <span key={x} className="rounded-full bg-stone px-2.5 py-1 text-muted">{x}</span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted">
                  <a href={`mailto:${a.email}`} className="font-semibold text-forest">{a.email}</a>
                  {a.telefon && <> · <a href={`tel:${a.telefon.replace(/[^\d+]/g, "")}`} className="font-semibold text-forest">{a.telefon}</a></>}
                  {" · "}Weitergeleitet an: {a.empfaenger.join(", ") || "– (persönlich vermitteln)"}
                </p>
                <form action={anfrageStatus}>
                  <input type="hidden" name="id" value={a.id} />
                  <input type="hidden" name="status" value={a.status === "neu" ? "bearbeitet" : "neu"} />
                  <button className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-forest hover:bg-mint">{a.status === "neu" ? "Als bearbeitet markieren" : "Wieder öffnen"}</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
