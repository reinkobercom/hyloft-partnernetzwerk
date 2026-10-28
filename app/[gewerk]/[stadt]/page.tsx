import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/Chrome";
import PartnerCard from "@/components/PartnerCard";
import BlogCard from "@/components/BlogCard";
import { GEWERKE, GEWERK_SEO, ORTE, PARTNER, distanceKm, gewerkBySeo, ortByName, ortBySlug, ortSlug, suche, type Treffer } from "@/lib/data";
import { ARTIKEL_ZU_GEWERK, SEO_TEXTE } from "@/lib/seo";
import { artikelBySlug } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return GEWERKE.flatMap((g) => ORTE.map((o) => ({ gewerk: GEWERK_SEO[g.slug].slug, stadt: ortSlug(o.name) })));
}

export async function generateMetadata({ params }: { params: Promise<{ gewerk: string; stadt: string }> }) {
  const { gewerk, stadt } = await params;
  const g = gewerkBySeo(gewerk);
  const o = ortBySlug(stadt);
  if (!g || !o) return {};
  return {
    title: `${g.plural} in ${o.name} – geprüfte Betriebe | Hyloft Partnernetz`,
    description: `${g.plural} in ${o.name} und Umgebung finden: persönlich geprüfte Fachbetriebe im Hyloft Partnernetz. Kostenlos und unverbindlich anfragen.`,
  };
}

export default async function SeoSeite({ params }: { params: Promise<{ gewerk: string; stadt: string }> }) {
  const { gewerk, stadt } = await params;
  const g = gewerkBySeo(gewerk);
  const o = ortBySlug(stadt);
  if (!g || !o) notFound();

  const text = SEO_TEXTE[g.slug];
  const { treffer } = suche(g.name, o.name);
  // Fallback: nächstgelegene Betriebe des Gewerks in NRW
  const umgebung: Treffer[] =
    treffer.length > 0
      ? []
      : PARTNER.filter((p) => p.gewerk === g.slug)
          .map((p) => ({ ...p, distanz: distanceKm(o, ortByName(p.ort)!) }))
          .sort((a, b) => a.distanz! - b.distanz!)
          .slice(0, 3);

  const nachbarn = ORTE.filter((x) => x.name !== o.name)
    .map((x) => ({ ...x, d: distanceKm(o, x) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 8);
  const artikel = artikelBySlug(ARTIKEL_ZU_GEWERK[g.slug]);
  const seoG = GEWERK_SEO[g.slug];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: text.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="pt-8 text-sm text-muted">
          <Link href="/regionen" className="hover:text-ink">Regionen</Link>
          <span className="mx-2">/</span>
          <span>{g.plural}</span>
          <span className="mx-2">/</span>
          <span className="text-ink">{o.name}</span>
        </nav>

        <section className="grid gap-10 pt-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-muted">{g.name} · {o.plz} {o.name}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{g.plural} in {o.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{text.intro}</p>
          </div>
          <Link
            href={`/anfrage?gewerk=${g.slug}&wo=${encodeURIComponent(o.name)}`}
            className="group rounded-3xl bg-forest p-6 text-white transition hover:bg-forest-soft"
          >
            <p className="font-semibold">Eine Anfrage an bis zu 3 {g.plural}</p>
            <p className="mt-1 text-sm text-white/70">Projekt einmal beschreiben – geprüfte Betriebe aus {o.name} und Umgebung melden sich.</p>
            <span className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest">Kostenlos anfragen →</span>
          </Link>
        </section>

        <section className="mt-14">
          {treffer.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold tracking-tight">{treffer.length} geprüfte {treffer.length === 1 ? seoG.singular : g.plural} in der Nähe von {o.name}</h2>
              <div className="mt-6 grid gap-5">
                {treffer.map((p) => <PartnerCard key={p.slug} p={p} />)}
              </div>
            </>
          ) : (
            <>
              <div className="rounded-3xl border border-dashed border-line bg-white p-7">
                <p className="font-semibold">In {o.name} ist noch kein {seoG.singular} im Partnernetz.</p>
                <p className="mt-1 text-sm text-muted">Stellen Sie eine Anfrage – wir vermitteln Ihnen persönlich einen passenden Betrieb.</p>
              </div>
              {umgebung.length > 0 && (
                <>
                  <h2 className="mt-10 text-2xl font-semibold tracking-tight">{g.plural} in der weiteren Umgebung</h2>
                  <div className="mt-6 grid gap-5">
                    {umgebung.map((p) => <PartnerCard key={p.slug} p={p} />)}
                  </div>
                </>
              )}
            </>
          )}
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-stone p-7 sm:p-9">
            <h2 className="text-xl font-semibold">Darauf sollten Sie bei der Auswahl achten</h2>
            <ul className="mt-5 space-y-3">
              {text.achten.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed text-ink/85">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Alle Betriebe im Hyloft Partnernetz werden vor der Freischaltung in einem persönlichen Gespräch geprüft.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7 sm:p-9">
            <h2 className="text-xl font-semibold">Häufige Fragen</h2>
            <div className="mt-4 divide-y divide-line">
              {text.faq.map(([q, a]) => (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {q}
                    <span className="text-xl text-forest transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {artikel && (
          <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <p className="eyebrow text-muted">Ratgeber</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Gut vorbereitet ins Gespräch</h2>
              <p className="mt-3 text-muted">Unser Ratgeber hilft Ihnen, die richtigen Fragen zu stellen.</p>
            </div>
            <div className="max-w-md"><BlogCard a={artikel} /></div>
          </section>
        )}

        <section className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">{g.plural} in der Umgebung</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {nachbarn.map((n) => (
                <Link key={n.name} href={`/${seoG.slug}/${ortSlug(n.name)}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-forest/40">
                  {n.name} <span className="text-muted">· {n.d} km</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Weitere Gewerke in {o.name}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {GEWERKE.filter((x) => x.slug !== g.slug).map((x) => (
                <Link key={x.slug} href={`/${GEWERK_SEO[x.slug].slug}/${stadt}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-forest/40">
                  {x.plural}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
