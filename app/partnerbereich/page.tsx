import Link from "next/link";
import { Logo } from "@/components/Chrome";
import { Check } from "@/components/PartnerCard";
import ProfilForm from "@/components/ProfilForm";
import { nutzerPflicht } from "@/lib/auth";
import { sql } from "@/lib/db";
import { gewerkBySlug } from "@/lib/data";
import { partnerRowByUser, referenzenFuer } from "@/lib/repo";
import { SITE_URL } from "@/lib/mail";
import { profilSpeichern } from "./actions";
import { AbmeldenKnopf, PasswortForm, ServiceKarten, SiegelCode } from "./Teile";

export const metadata = { title: "Partnerbereich – Hyloft Partnernetz", robots: { index: false } };
export const dynamic = "force-dynamic";

const TABS = [
  ["uebersicht", "Übersicht"],
  ["profil", "Profil bearbeiten"],
  ["anfragen", "Anfragen"],
  ["statistik", "Statistik"],
  ["siegel", "Siegel"],
  ["konto", "Konto"],
] as const;
type Tab = (typeof TABS)[number][0];

const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

export default async function Partnerbereich({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const u = await nutzerPflicht("partner");
  const { tab: t } = await searchParams;
  const tab: Tab = TABS.some(([k]) => k === t) ? (t as Tab) : "uebersicht";
  const p = await partnerRowByUser(u.id);
  const initials = (u.name || u.email).split(/[\s@.]+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

  const kopf = (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted sm:block">{u.name || u.email}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-xs font-semibold text-mint">{initials}</span>
          <AbmeldenKnopf />
        </div>
      </div>
      {p && (
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map(([k, titel]) => (
            <Link key={k} href={`/partnerbereich?tab=${k}`} className={`shrink-0 border-b-2 px-3 pb-3 pt-1 text-sm font-medium ${tab === k ? "border-forest text-forest" : "border-transparent text-muted hover:text-ink"}`}>
              {titel}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );

  if (!p)
    return (
      <div className="min-h-screen bg-stone">
        {kopf}
        <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-2xl font-semibold">Ihr Zugang ist noch keinem Profil zugeordnet.</h1>
          <p className="mt-3 text-muted">Bitte wenden Sie sich an das Hyloft-Team unter <a className="font-semibold text-forest" href="mailto:info@hyloft.de">info@hyloft.de</a> oder +49 172 5374847.</p>
        </main>
      </div>
    );

  const db = sql();
  const [anfragen, aufrufe, anfrageMonate, refs] = await Promise.all([
    db<{ id: string; name: string; email: string; telefon: string; ort: string; art: string; zeitraum: string; beschreibung: string; lofttuer: string; created_at: Date }[]>`
      select id, name, email, telefon, ort, art, zeitraum, beschreibung, lofttuer, created_at from anfragen
      where ${p.id} = any(partner_ids) order by created_at desc limit 100`,
    db<{ monat: Date; anzahl: number }[]>`
      select date_trunc('month', tag) as monat, sum(anzahl)::int as anzahl from profil_aufrufe
      where partner_id = ${p.id} and tag >= date_trunc('month', now()) - interval '5 months' group by 1`,
    db<{ monat: Date; anzahl: number }[]>`
      select date_trunc('month', created_at) as monat, count(*)::int as anzahl from anfragen
      where ${p.id} = any(partner_ids) and created_at >= date_trunc('month', now()) - interval '5 months' group by 1`,
    referenzenFuer(p.id),
  ]);

  const jetzt = new Date();
  const monate = Array.from({ length: 6 }, (_, i) => new Date(jetzt.getFullYear(), jetzt.getMonth() - 5 + i, 1));
  const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;
  const mapA = new Map(aufrufe.map((r) => [key(new Date(r.monat)), r.anzahl]));
  const mapQ = new Map(anfrageMonate.map((r) => [key(new Date(r.monat)), r.anzahl]));
  const stats = monate.map((m) => ({ monat: MONATE[m.getMonth()], aufrufe: mapA.get(key(m)) ?? 0, anfragen: mapQ.get(key(m)) ?? 0 }));
  const summe = (k: "aufrufe" | "anfragen") => stats.reduce((a, s) => a + s[k], 0);
  const maxA = Math.max(1, ...stats.map((s) => s.aufrufe));

  const todos: [string, boolean][] = [
    ["Firmendaten & Ort", Boolean(p.firma && p.plz)],
    ["Telefon", Boolean(p.telefon)],
    ["Leistungen", p.leistungen.length > 0],
    ["Beschreibung", p.beschreibung.length >= 80],
    ["Logo", Boolean(p.logo_id)],
    ["3 Referenzfotos", p.bilder.length >= 3],
  ];
  const pct = Math.round((todos.filter(([, d]) => d).length / todos.length) * 100);
  const statusInfo = {
    live: { text: "Live", cls: "bg-mint text-forest ring-mint-strong", punkt: "bg-forest" },
    entwurf: { text: "In Vorbereitung", cls: "bg-amber-50 text-amber-800 ring-amber-200", punkt: "bg-amber-500" },
    gesperrt: { text: "Pausiert", cls: "bg-red-50 text-red-800 ring-red-200", punkt: "bg-red-500" },
  }[p.status];

  return (
    <div className="min-h-screen bg-stone">
      {kopf}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {tab === "uebersicht" && (
          <>
            {(!u.hatPasswort || u.passwortTemporaer) && (
              <Link href="/partnerbereich?tab=konto" className="mb-6 block rounded-3xl bg-forest p-6 text-white">
                <p className="font-semibold">Willkommen im Partnernetz!</p>
                <p className="mt-1 text-sm text-white/75">{u.passwortTemporaer ? "Bitte ersetzen Sie Ihr Startpasswort jetzt durch ein eigenes →" : "Bitte legen Sie jetzt ein eigenes Passwort fest →"}</p>
              </Link>
            )}
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <section className="rounded-3xl bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow text-muted">Ihr Profil</p>
                    <h1 className="mt-1 text-2xl font-semibold">{p.firma}</h1>
                    <p className="text-sm text-muted">{gewerkBySlug(p.gewerk)?.name} · {p.plz} {p.ort}</p>
                  </div>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ${statusInfo.cls}`}>
                    <span className={`h-2 w-2 rounded-full ${statusInfo.punkt}`} />
                    {statusInfo.text}
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  {p.status === "live"
                    ? "Ihr Profil ist öffentlich sichtbar und kann von Bauherren angefragt werden."
                    : p.status === "entwurf"
                      ? "Ihr Profil wird gerade vom Hyloft-Team vorbereitet und ist noch nicht öffentlich sichtbar."
                      : "Ihr Profil ist derzeit nicht öffentlich sichtbar. Bei Fragen melden Sie sich gern bei uns."}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {p.status === "live" && <Link href={`/partner/${p.slug}`} target="_blank" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-forest hover:bg-mint">Profil ansehen ↗</Link>}
                  <Link href="/partnerbereich?tab=profil" className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft">Profil bearbeiten</Link>
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 sm:p-8">
                <p className="eyebrow text-muted">Profil vervollständigen</p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-3xl font-semibold text-forest">{pct} %</p>
                  <p className="text-xs text-muted">Vollständige Profile werden öfter angefragt</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone">
                  <div className="h-full rounded-full bg-forest" style={{ width: `${pct}%` }} />
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {todos.map(([titel, d]) => (
                    <li key={titel} className="flex items-center justify-between">
                      <span className={`flex items-center gap-2.5 ${d ? "text-muted line-through decoration-line" : ""}`}>
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${d ? "bg-mint text-forest" : "border border-line"}`}>{d && Check}</span>
                        {titel}
                      </span>
                      {!d && <Link href="/partnerbereich?tab=profil" className="text-xs font-semibold text-forest hover:underline">Ergänzen</Link>}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                ["Profilaufrufe (6 Monate)", summe("aufrufe"), "statistik"],
                ["Anfragen gesamt", anfragen.length, "anfragen"],
                ["Gemeinsame Projekte mit Hyloft", refs.length, "uebersicht"],
              ].map(([k, v, z]) => (
                <Link key={k as string} href={`/partnerbereich?tab=${z}`} className="rounded-3xl bg-white p-6 hover:ring-1 hover:ring-forest/20">
                  <p className="text-xs text-muted">{k}</p>
                  <p className="mt-2 text-2xl font-semibold text-forest">{v}</p>
                </Link>
              ))}
            </div>

            <section className="mt-6 overflow-hidden rounded-3xl bg-white">
              <div className="grid lg:grid-cols-[1fr_1.6fr]">
                <div className="relative min-h-[220px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/p4.jpg" alt="Hyloft Lofttür" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="eyebrow text-muted">Partnerservice von Hyloft</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Lofttüren für Ihre Projekte</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Vorder- und Rückseite aus Stahl, rahmenverschweißte Sprossen, 6 mm VSG. Als Partner erhalten Sie für jedes Projekt ein individuelles Angebot – inklusive Visualisierung und technischer Zeichnung.
                  </p>
                  <ServiceKarten firma={p.firma} ort={`${p.plz} ${p.ort}`} />
                </div>
              </div>
            </section>

            {refs.length > 0 && (
              <section className="mt-6 rounded-3xl bg-white p-6 sm:p-8">
                <p className="eyebrow text-muted">Gemeinsame Projekte mit Hyloft</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {refs.map((r) => (
                    <figure key={r.id} className="overflow-hidden rounded-2xl border border-line">
                      {r.bild && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.bild} alt="" className="aspect-[4/3] w-full object-cover" />
                      )}
                      <figcaption className="p-3 text-sm font-medium">{r.titel}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {tab === "profil" && (
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <h1 className="text-2xl font-semibold">Profil bearbeiten</h1>
            <p className="mb-8 mt-1 text-sm text-muted">Änderungen sind nach dem Speichern sofort sichtbar.</p>
            <ProfilForm action={profilSpeichern} werte={{ ...p, seit: p.seit, logo_id: p.logo_id, bilder: p.bilder }} />
          </section>
        )}

        {tab === "anfragen" && (
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <h1 className="text-2xl font-semibold">Anfragen</h1>
            <p className="mt-1 text-sm text-muted">Anfragen von Bauherren über Ihr Profil oder die Sammelanfrage. Bitte melden Sie sich innerhalb von zwei Werktagen.</p>
            {anfragen.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">Noch keine Anfragen. Ein vollständiges Profil mit Fotos erhöht Ihre Chancen.</p>
            ) : (
              <ul className="mt-6 divide-y divide-line">
                {anfragen.map((a) => (
                  <li key={a.id} className="py-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{a.name}</p>
                      <span className="text-sm text-muted">· {a.ort || "–"} · {new Date(a.created_at).toLocaleDateString("de-DE")}</span>
                      {(a.lofttuer === "Ja" || a.lofttuer === "Vielleicht") && <span className="rounded-full bg-mint px-2 py-0.5 text-[0.7rem] font-semibold text-forest">plant Lofttür</span>}
                    </div>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/80">{a.beschreibung}</p>
                    <p className="mt-2 text-xs text-muted">{[a.art, a.zeitraum].filter(Boolean).join(" · ")}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      <a href={`mailto:${a.email}`} className="rounded-full bg-forest px-4 py-1.5 font-semibold text-white">{a.email}</a>
                      {a.telefon && <a href={`tel:${a.telefon.replace(/[^\d+]/g, "")}`} className="rounded-full border border-line px-4 py-1.5 font-semibold text-forest">{a.telefon}</a>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === "statistik" && (
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <h1 className="text-2xl font-semibold">Statistik</h1>
            <p className="mt-1 text-sm text-muted">So oft wurde Ihr Profil in den letzten 6 Monaten aufgerufen.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Profilaufrufe", String(summe("aufrufe"))],
                ["Anfragen", String(summe("anfragen"))],
                ["Anfragequote", summe("aufrufe") ? `${((summe("anfragen") / summe("aufrufe")) * 100).toFixed(1).replace(".", ",")} %` : "–"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-stone p-5">
                  <p className="text-xs text-muted">{k}</p>
                  <p className="mt-1 text-2xl font-semibold text-forest">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <div className="flex h-56 items-end gap-3 border-b border-line sm:gap-6">
                {stats.map((s) => (
                  <div key={s.monat} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-xs font-semibold text-forest">{s.aufrufe}</span>
                    <div className="w-full max-w-14 rounded-t-lg bg-mint-strong" style={{ height: `${Math.max(2, (s.aufrufe / maxA) * 180)}px` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-3 sm:gap-6">
                {stats.map((s) => (
                  <span key={s.monat} className="flex-1 text-center text-xs text-muted">{s.monat}<br /><span className="text-forest">{s.anfragen} Anfr.</span></span>
                ))}
              </div>
            </div>
          </section>
        )}

        {tab === "siegel" &&
          (p.status === "live" ? (
            <SiegelCode profilUrl={`${SITE_URL}/partner/${p.slug}`} origin={SITE_URL} />
          ) : (
            <section className="rounded-3xl bg-white p-8 text-center text-sm text-muted">Das Siegel steht zur Verfügung, sobald Ihr Profil live ist.</section>
          ))}

        {tab === "konto" && (
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <h1 className="text-2xl font-semibold">Konto</h1>
            <p className="mt-1 text-sm text-muted">Angemeldet als {u.email}</p>
            <h2 className="mb-4 mt-8 font-semibold">{u.hatPasswort ? "Passwort ändern" : "Passwort festlegen"}</h2>
            <PasswortForm hatPasswort={u.hatPasswort} />
            <p className="mt-8 text-xs text-muted">Sie möchten Ihr Profil löschen? Schreiben Sie uns an info@hyloft.de.</p>
          </section>
        )}
      </main>
    </div>
  );
}
