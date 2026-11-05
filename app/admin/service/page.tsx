import Link from "next/link";
import { sql } from "@/lib/db";
import { serviceStatus } from "../actions";

const TITEL: Record<string, string> = { projekt: "Projektanfrage", muster: "Musterstück", showroom: "Showroom-Termin" };
const FELDER: Record<string, string> = { projekt: "Projekt", anzahl: "Anzahl Türen", ab: "Ausführung ab", details: "Details", adresse: "Lieferadresse", zeitraum: "Wunschzeitraum" };

export default async function Service() {
  const rows = await sql()<{ id: string; typ: string; daten: Record<string, string>; status: string; created_at: Date; partner_id: string; firma: string; ort: string; telefon: string; inhaber: string }[]>`
    select s.*, p.firma, p.ort, p.telefon, p.inhaber from partner_service s join partners p on p.id = s.partner_id
    order by (s.status = 'neu') desc, s.created_at desc limit 200`;
  return (
    <section>
      <h1 className="text-2xl font-semibold">Partnerservice</h1>
      <p className="mt-1 text-sm text-muted">Projektanfragen, Musterstücke und Showroom-Termine von Partnern.</p>
      {rows.length === 0 && <p className="mt-6 rounded-3xl bg-white p-10 text-center text-muted">Noch keine Anfragen von Partnern.</p>}
      <div className="mt-6 grid gap-4">
        {rows.map((r) => (
          <div key={r.id} className={`rounded-3xl bg-white p-6 ${r.status === "bearbeitet" ? "opacity-60" : ""}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.7rem] font-semibold text-white">{TITEL[r.typ]}</span>
              <Link href={`/admin/partner/${r.partner_id}`} className="font-semibold hover:text-forest">{r.firma}</Link>
              <span className="text-sm text-muted">· {r.ort} · {new Date(r.created_at).toLocaleString("de-DE")}</span>
            </div>
            <dl className="mt-3 grid gap-1 text-sm">
              {Object.entries(r.daten).map(([k, v]) => (
                <div key={k} className="flex gap-2"><dt className="text-muted">{FELDER[k] ?? k}:</dt><dd className="whitespace-pre-line">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted">{r.inhaber} · {r.telefon || "keine Telefonnummer"}</p>
              <form action={serviceStatus}>
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="status" value={r.status === "neu" ? "bearbeitet" : "neu"} />
                <button className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-forest hover:bg-mint">{r.status === "neu" ? "Erledigt" : "Wieder öffnen"}</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
