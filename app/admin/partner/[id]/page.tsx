import Link from "next/link";
import { notFound } from "next/navigation";
import ProfilForm from "@/components/ProfilForm";
import { sql } from "@/lib/db";
import { partnerRowById } from "@/lib/repo";
import { mailKonfiguriert } from "@/lib/mail";
import { partnerLoeschen, partnerSpeichern, zugangEntfernen } from "../../actions";
import { ZugangPanel } from "../../Teile";

export default async function PartnerBearbeiten({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ neu?: string; fehler?: string }> }) {
  const { id } = await params;
  const { neu, fehler } = await searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const p = await partnerRowById(id);
  if (!p) notFound();
  const db = sql();
  const [login, [z]] = await Promise.all([
    p.user_id ? db<{ email: string; last_login_at: Date | null; passwort_temporaer: boolean }[]>`select email, last_login_at, passwort_temporaer from users where id = ${p.user_id}` : Promise.resolve([]),
    db<{ aufrufe: number; anfragen: number }[]>`
      select (select coalesce(sum(anzahl), 0) from profil_aufrufe where partner_id = ${p.id} and tag > now() - interval '30 days')::int as aufrufe,
             (select count(*) from anfragen where ${p.id} = any(partner_ids))::int as anfragen`,
  ]);
  const l = login[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-3xl bg-white p-6 sm:p-8">
        <Link href="/admin/partner" className="text-sm text-muted hover:text-ink">← Partner</Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">{p.firma}</h1>
          {p.status === "live" && <Link href={`/partner/${p.slug}`} target="_blank" className="text-sm font-semibold text-forest hover:underline">Öffentliches Profil ↗</Link>}
        </div>
        {neu && <p className="mt-4 rounded-xl bg-mint px-4 py-3 text-sm text-forest">Partner angelegt. Lege jetzt rechts den Login an.</p>}
        <div className="mt-8">
          <ProfilForm admin action={partnerSpeichern} werte={{ ...p }} />
        </div>
      </section>

      <aside className="grid gap-6 self-start lg:sticky lg:top-6">
        <section className="rounded-3xl bg-white p-6">
          <p className="font-semibold">Zugang zum Partnerbereich</p>
          <div className="mt-4">
            <ZugangPanel partnerId={p.id} loginEmail={l?.email ?? null} vorschlagEmail={p.email} mailAktiv={mailKonfiguriert} />
          </div>
          {l && (
            <>
              <p className="mt-4 text-xs text-muted">
                Letzter Login: {l.last_login_at ? new Date(l.last_login_at).toLocaleString("de-DE") : "noch nie"}
                {l.passwort_temporaer ? " · Startpasswort noch nicht geändert" : ""}
              </p>
              <form action={zugangEntfernen} className="mt-3">
                <input type="hidden" name="id" value={p.id} />
                <button className="text-xs font-semibold text-red-700 hover:underline">Zugang entfernen</button>
              </form>
            </>
          )}
        </section>
        <section className="rounded-3xl bg-white p-6 text-sm">
          <p className="font-semibold">Kennzahlen</p>
          <p className="mt-3 text-muted">Profilaufrufe (30 Tage): <strong className="text-ink">{z.aufrufe}</strong></p>
          <p className="text-muted">Anfragen gesamt: <strong className="text-ink">{z.anfragen}</strong></p>
          <p className="mt-3 text-xs text-muted">Angelegt am {new Date(p.created_at).toLocaleDateString("de-DE")} · zuletzt geändert {new Date(p.updated_at).toLocaleString("de-DE")}</p>
        </section>
        <section className="rounded-3xl bg-white p-6">
          <p className="font-semibold text-red-800">Partner löschen</p>
          <p className="mt-1 text-xs text-muted">Löscht Profil und Login endgültig. Zur Bestätigung den Firmennamen eintippen.</p>
          {fehler === "loeschen" && <p className="mt-2 text-xs text-red-700">Der Firmenname stimmte nicht überein.</p>}
          <form action={partnerLoeschen} className="mt-3 grid gap-2">
            <input type="hidden" name="id" value={p.id} />
            <input name="bestaetigung" placeholder={p.firma} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm" />
            <button className="justify-self-start rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Endgültig löschen</button>
          </form>
        </section>
      </aside>
    </div>
  );
}
