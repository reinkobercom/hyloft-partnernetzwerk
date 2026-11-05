import Link from "next/link";
import { sql } from "@/lib/db";
import { GEWERKE, gewerkBySlug } from "@/lib/data";

export default async function PartnerListe({ searchParams }: { searchParams: Promise<{ gewerk?: string; status?: string; q?: string }> }) {
  const { gewerk = "", status = "", q = "" } = await searchParams;
  const rows = await sql()<{ id: string; slug: string; firma: string; gewerk: string; ort: string; status: string; user_id: string | null; bilder: string[]; logo_id: string | null; updated_at: Date }[]>`
    select id, slug, firma, gewerk, ort, status, user_id, bilder, logo_id, updated_at from partners
    where (${gewerk} = '' or gewerk = ${gewerk}) and (${status} = '' or status = ${status})
      and (${q} = '' or firma ilike ${"%" + q + "%"} or ort ilike ${"%" + q + "%"})
    order by firma`;
  const sel = "rounded-full border border-line bg-white px-4 py-2 text-sm";
  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold">Partner</h1>
          <p className="mt-1 text-sm text-muted">{rows.length} Betriebe</p>
        </div>
        <Link href="/admin/partner/neu" className="self-start rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft">+ Partner anlegen</Link>
      </div>
      <form className="mt-6 flex flex-wrap gap-2">
        <input name="q" defaultValue={q} placeholder="Firma oder Ort …" className={sel} />
        <select name="gewerk" defaultValue={gewerk} className={sel}>
          <option value="">Alle Gewerke</option>
          {GEWERKE.map((g) => <option key={g.slug} value={g.slug}>{g.name}</option>)}
        </select>
        <select name="status" defaultValue={status} className={sel}>
          <option value="">Alle Status</option>
          <option value="live">Live</option>
          <option value="entwurf">Entwurf</option>
          <option value="gesperrt">Gesperrt</option>
        </select>
        <button className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">Filtern</button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-3xl bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">Betrieb</th>
              <th className="px-4 py-4 font-semibold">Gewerk</th>
              <th className="px-4 py-4 font-semibold">Ort</th>
              <th className="px-4 py-4 font-semibold">Status</th>
              <th className="px-4 py-4 font-semibold">Zugang</th>
              <th className="px-4 py-4 font-semibold">Profil</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-10 text-center text-muted">Noch keine Partner. Lege den ersten Betrieb an.</td></tr>
            )}
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 font-medium"><Link href={`/admin/partner/${p.id}`} className="hover:text-forest">{p.firma}</Link></td>
                <td className="px-4 py-4 text-muted">{gewerkBySlug(p.gewerk)?.name}</td>
                <td className="px-4 py-4 text-muted">{p.ort}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.status === "live" ? "bg-mint text-forest" : p.status === "entwurf" ? "bg-amber-50 text-amber-800" : "bg-red-50 text-red-700"}`}>
                    {p.status === "live" ? "Live" : p.status === "entwurf" ? "Entwurf" : "Gesperrt"}
                  </span>
                </td>
                <td className="px-4 py-4 text-muted">{p.user_id ? "✓" : "–"}</td>
                <td className="px-4 py-4 text-xs text-muted">{p.logo_id ? "Logo · " : ""}{p.bilder.length} Fotos</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/partner/${p.id}`} className="text-xs font-semibold text-forest hover:underline">Bearbeiten →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
