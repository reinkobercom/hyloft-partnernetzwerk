import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/Chrome";
import BlogCard from "@/components/BlogCard";
import { ARTIKEL, artikelBySlug, datumDE } from "@/lib/blog";

export function generateStaticParams() {
  return ARTIKEL.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = artikelBySlug(slug);
  return { title: a ? `${a.titel} | Hyloft Partnernetz` : "Ratgeber", description: a?.teaser };
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = artikelBySlug(slug);
  if (!a) notFound();
  const weitere = ARTIKEL.filter((x) => x.slug !== a.slug)
    .sort((x, y) => Number(y.kategorie === a.kategorie) - Number(x.kategorie === a.kategorie))
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <article>
          <header className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6">
            <Link href={`/blog?kategorie=${encodeURIComponent(a.kategorie)}`} className="eyebrow rounded-full bg-mint px-3 py-1.5 text-forest">
              {a.kategorie}
            </Link>
            <h1 className="rise mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{a.titel}</h1>
            <p className="rise rise-2 mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{a.teaser}</p>
            {a.entwurf && (
              <p className="mx-auto mt-6 w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                Entwurf · fachliche Freigabe durch Hyloft ausstehend
              </p>
            )}
            <p className="mt-6 text-sm text-muted">
              {a.autor} · {datumDE(a.datum)} · {a.lesezeit} Min. Lesezeit
            </p>
          </header>

          <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.bild} alt="" className="aspect-[16/9] w-full rounded-[2rem] object-cover" />
          </div>

          <div className="mx-auto mt-12 max-w-2xl px-4 sm:px-6">
            {a.inhalt.map((b, i) => {
              if ("h2" in b) return <h2 key={i} className="mt-12 text-2xl font-semibold tracking-tight text-ink">{b.h2}</h2>;
              if ("h3" in b) return <h3 key={i} className="mt-8 text-lg font-semibold text-ink">{b.h3}</h3>;
              if ("p" in b) return <p key={i} className="mt-5 text-[1.05rem] leading-[1.8] text-ink/85">{b.p}</p>;
              if ("liste" in b)
                return (
                  <ul key={i} className="mt-5 space-y-2.5">
                    {b.liste.map((l) => (
                      <li key={l} className="flex gap-3 text-[1.05rem] leading-relaxed text-ink/85">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                        {l}
                      </li>
                    ))}
                  </ul>
                );
              return (
                <aside key={i} className="mt-8 rounded-2xl border-l-4 border-forest bg-mint/60 px-6 py-5">
                  <p className="eyebrow text-forest">Tipp</p>
                  <p className="mt-2 leading-relaxed text-ink/85">{b.tipp}</p>
                </aside>
              );
            })}

            {a.cta ? (
              <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-forest p-7 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">Passende Fachbetriebe im Partnernetz</p>
                  <p className="mt-1 text-sm text-white/70">Persönlich geprüft vom Hyloft-Team.</p>
                </div>
                <Link
                  href={`/suche?was=${encodeURIComponent(a.cta.was)}`}
                  className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest hover:bg-mint"
                >
                  {a.cta.text}
                </Link>
              </div>
            ) : (
              <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-forest p-7 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">Ihr Betrieb im Hyloft Partnernetz</p>
                  <p className="mt-1 text-sm text-white/70">Kostenlos eintragen und von Bauherren gefunden werden.</p>
                </div>
                <Link href="/fuer-partner" className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest hover:bg-mint">
                  Kostenlos eintragen
                </Link>
              </div>
            )}
          </div>
        </article>

        <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Weiterlesen</h2>
            <Link href="/blog" className="text-sm font-semibold text-forest hover:underline">Alle Artikel →</Link>
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {weitere.map((x) => (
              <BlogCard key={x.slug} a={x} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
