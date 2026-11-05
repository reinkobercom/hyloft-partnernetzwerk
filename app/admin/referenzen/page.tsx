import { sql } from "@/lib/db";
import { dateiUrl } from "@/lib/repo";
import { referenzLoeschen } from "../actions";
import { ReferenzForm } from "../Teile";

export default async function Referenzen() {
  const db = sql();
  const [refs, partner] = await Promise.all([
    db<{ id: string; titel: string; ort: string; jahr: number | null; tuer: string; bild_id: string | null; firmen: string[] }[]>`
      select r.*, coalesce((select array_agg(p.firma) from partners p where p.id = any(r.partner_ids)), '{}') as firmen
      from referenzen r order by r.created_at desc`,
    db<{ id: string; firma: string; ort: string }[]>`select id, firma, ort from partners where status <> 'gesperrt' order by firma`,
  ]);
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div>
        <h1 className="text-2xl font-semibold">Referenzprojekte</h1>
        <p className="mt-1 text-sm text-muted">Gemeinsame Projekte mit Hyloft-Tür. Sie erscheinen im Profil der verknüpften Partner. Bitte nur mit Zustimmung von Partner und Bauherr veröffentlichen.</p>
        {refs.length === 0 && <p className="mt-6 rounded-3xl bg-white p-10 text-center text-muted">Noch keine Referenzprojekte.</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {refs.map((r) => (
            <div key={r.id} className="overflow-hidden rounded-3xl bg-white">
              {r.bild_id && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={dateiUrl(r.bild_id)!} alt="" className="aspect-[16/10] w-full object-cover" />
              )}
              <div className="p-5">
                <p className="font-semibold leading-snug">{r.titel}</p>
                <p className="mt-1 text-xs text-muted">{[r.ort, r.jahr, r.tuer].filter(Boolean).join(" · ")}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.firmen.map((f) => <span key={f} className="rounded-full bg-mint px-2.5 py-1 text-[0.7rem] font-semibold text-forest">{f}</span>)}
                </div>
                <form action={referenzLoeschen} className="mt-4">
                  <input type="hidden" name="id" value={r.id} />
                  <button className="text-xs font-semibold text-red-700 hover:underline">Löschen</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="self-start rounded-3xl bg-white p-6 lg:sticky lg:top-6">
        <p className="mb-4 font-semibold">Neues Referenzprojekt</p>
        {partner.length === 0 ? <p className="text-sm text-muted">Lege zuerst einen Partner an.</p> : <ReferenzForm partner={partner} />}
      </div>
    </section>
  );
}
