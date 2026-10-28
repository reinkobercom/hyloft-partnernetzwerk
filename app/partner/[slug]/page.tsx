import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/Chrome";
import { Avatar, Badge, Check } from "@/components/PartnerCard";
import ContactForm from "@/components/ContactForm";
import { PARTNER, gewerkBySlug, partnerBySlug } from "@/lib/data";

export function generateStaticParams() {
  return PARTNER.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = partnerBySlug(slug);
  const g = p && gewerkBySlug(p.gewerk);
  return { title: p ? `${p.firma} – ${g?.name} in ${p.ort} | Hyloft Partnernetz` : "Partner" };
}

export default async function PartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = partnerBySlug(slug);
  if (!p) notFound();
  const g = gewerkBySlug(p.gewerk);
  const aehnliche = PARTNER.filter((x) => x.gewerk === p.gewerk && x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="pt-8 text-sm text-muted">
          <Link href="/suche" className="hover:text-ink">Partner finden</Link>
          <span className="mx-2">/</span>
          <Link href={`/suche?was=${encodeURIComponent(g?.name ?? "")}`} className="hover:text-ink">{g?.plural}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{p.firma}</span>
        </nav>

        {/* Galerie */}
        <div className="mt-6 grid h-[260px] grid-cols-3 gap-2 overflow-hidden rounded-[2rem] sm:h-[420px] sm:grid-cols-4 sm:grid-rows-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.bilder[0]} alt="" className="col-span-2 h-full w-full object-cover sm:row-span-2" />
          {p.bilder.slice(1).map((b, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={b} src={b} alt="" className={`h-full w-full object-cover ${i === 0 ? "sm:col-span-2" : "hidden sm:col-span-2 sm:block"}`} />
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Beispielbilder</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex items-start gap-5">
              <Avatar firma={p.firma} size="lg" />
              <div>
                <p className="eyebrow text-muted">{g?.name}</p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{p.firma}</h1>
                <p className="mt-1 text-muted">{p.ort} · Einsatzgebiet ca. {p.radiusKm} km</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.verifiziert && <Badge>{Check} Von Hyloft geprüft</Badge>}
              {p.lofttuerErfahrung && <Badge tone="stone">Erfahrung mit Lofttüren</Badge>}
              <Badge tone="stone">Beispielprofil</Badge>
            </div>

            <p className="mt-8 text-xl font-medium leading-snug text-forest">{p.claim}</p>
            <p className="mt-4 leading-relaxed text-ink/80">{p.beschreibung}</p>

            <h2 className="mt-10 text-lg font-semibold">Leistungen</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.leistungen.map((l) => (
                <li key={l} className="rounded-full border border-line bg-white px-4 py-2 text-sm">{l}</li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
              {[
                ["Gegründet", String(p.seit)],
                ["Mitarbeitende", p.mitarbeiter],
                ["Ansprechpartner", p.inhaber],
                ["Standort", p.ort],
              ].map(([k, v]) => (
                <div key={k} className="bg-white p-5">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            {p.verifiziert && (
              <div className="mt-10 flex gap-4 rounded-3xl bg-stone p-6">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-mint">{Check}</span>
                <p className="text-sm leading-relaxed text-ink/80">
                  <strong className="text-ink">Persönlich geprüft.</strong> Das Hyloft-Team hat mit {p.inhaber} gesprochen
                  und die Angaben zu Leistungen und Einsatzgebiet bestätigt.
                </p>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ContactForm firma={p.firma} />
          </aside>
        </div>

        {aehnliche.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xl font-semibold">Weitere {g?.plural}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {aehnliche.map((x) => (
                <Link key={x.slug} href={`/partner/${x.slug}`} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 hover:border-forest/30">
                  <Avatar firma={x.firma} />
                  <span>
                    <span className="block font-semibold">{x.firma}</span>
                    <span className="block text-sm text-muted">{x.ort}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
