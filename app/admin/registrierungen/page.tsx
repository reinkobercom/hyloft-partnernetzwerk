import Link from "next/link";
import { sql } from "@/lib/db";
import { gewerkBySlug } from "@/lib/data";
import { registrierungStatus } from "../actions";

type Reg = { id: string; firma: string; gewerk: string; ort: string; radius_km: number; name: string; email: string; telefon: string; website: string; beschreibung: string; leistungen: string[]; lofttuer_bedarf: string; rueckruf: string; status: string; partner_id: string | null; created_at: Date };

export default async function Registrierungen() {
  const rows = await sql()<Reg[]>`select * from registrierungen order by (status = 'offen') desc, created_at desc limit 200`;
  return (
    <section>
      <h1 className="text-2xl font-semibold">Registrierungen</h1>
      <p className="mt-1 text-sm text-muted">Betriebe, die sich selbst eingetragen haben. Nach dem Anruf als Partner anlegen – die Daten werden übernommen.</p>
      {rows.length === 0 && <p className="mt-6 rounded-3xl bg-white p-10 text-center text-muted">Noch keine Registrierungen.</p>}
      <div className="mt-6 grid gap-4">
        {rows.map((r) => (
          <div key={r.id} className={`grid gap-4 rounded-3xl bg-white p-6 lg:grid-cols-[1.4fr_1fr_auto] lg:items-start ${r.status !== "offen" ? "opacity-60" : ""}`}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-lg font-semibold">{r.firma}</p>
                <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${r.status === "offen" ? "bg-amber-100 text-amber-900" : r.status === "angelegt" ? "bg-mint text-forest" : "bg-stone text-muted"}`}>{r.status}</span>
              </div>
              <p className="text-sm text-muted">{gewerkBySlug(r.gewerk)?.name} · {r.ort} (bis {r.radius_km} km) · {new Date(r.created_at).toLocaleDateString("de-DE")}</p>
              {r.beschreibung && <p className="mt-2 text-sm text-ink/80">{r.beschreibung}</p>}
              {r.leistungen.length > 0 && <p className="mt-2 text-xs text-muted">{r.leistungen.join(" · ")}</p>}
            </div>
            <div className="text-sm">
              <p><span className="text-muted">Kontakt:</span> {r.name}</p>
              <p><span className="text-muted">Telefon:</span> <a className="font-semibold text-forest" href={`tel:${r.telefon.replace(/[^\d+]/g, "")}`}>{r.telefon}</a> <span className="text-muted">({r.rueckruf || "egal"})</span></p>
              <p><span className="text-muted">E-Mail:</span> {r.email}</p>
              {r.website && <p><span className="text-muted">Web:</span> {r.website}</p>}
              <p><span className="text-muted">Lofttür-Bedarf:</span> <span className={r.lofttuer_bedarf.startsWith("Ja") ? "font-semibold text-forest" : ""}>{r.lofttuer_bedarf || "–"}</span></p>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.status === "offen" && (
                <>
                  <form action={registrierungStatus}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="status" value="abgelehnt" />
                    <button className="rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted hover:text-ink">Ablehnen</button>
                  </form>
                  <Link href={`/admin/partner/neu?registrierung=${r.id}`} className="rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft">Als Partner anlegen</Link>
                </>
              )}
              {r.status === "angelegt" && r.partner_id && <Link href={`/admin/partner/${r.partner_id}`} className="text-sm font-semibold text-forest">Zum Partner →</Link>}
              {r.status === "abgelehnt" && (
                <form action={registrierungStatus}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="offen" />
                  <button className="text-sm font-semibold text-muted hover:text-ink">Wieder öffnen</button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
