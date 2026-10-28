import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";
import BlogCard from "@/components/BlogCard";
import { ARTIKEL, KATEGORIEN, datumDE } from "@/lib/blog";

export const metadata = { title: "Ratgeber – Planung & Ausbau rund um Lofttüren | Hyloft Partnernetz" };

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ kategorie?: string }> }) {
  const { kategorie } = await searchParams;
  const aktiv = KATEGORIEN.find((k) => k === kategorie);
  const liste = aktiv ? ARTIKEL.filter((a) => a.kategorie === aktiv) : ARTIKEL;
  const [top, ...rest] = liste;

  const chip = (on: boolean) =>
    `shrink-0 rounded-full border px-4 py-1.5 text-sm ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-muted hover:text-ink"}`;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="pt-14 text-center">
          <p className="eyebrow rise text-muted">Ratgeber</p>
          <h1 className="rise rise-2 mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Wissen für Planung und Ausbau.
          </h1>
          <p className="rise rise-3 mx-auto mt-4 max-w-xl text-muted">
            Praxistipps rund um Lofttüren, offene Grundrisse und die Zusammenarbeit mit Fachbetrieben.
          </p>
        </section>

        <div className="mt-10 flex justify-center gap-2 overflow-x-auto pb-2">
          <Link href="/blog" className={chip(!aktiv)}>Alle</Link>
          {KATEGORIEN.map((k) => (
            <Link key={k} href={`/blog?kategorie=${encodeURIComponent(k)}`} className={chip(aktiv === k)}>
              {k}
            </Link>
          ))}
        </div>

        {top && (
          <Link href={`/blog/${top.slug}`} className="group mt-10 grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-[1.3fr_1fr]">
            <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={top.bild} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-xs text-muted">
                <span className="font-semibold text-forest">{top.kategorie}</span> · {datumDE(top.datum)} · {top.lesezeit} Min.
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight group-hover:text-forest sm:text-3xl">{top.titel}</h2>
              <p className="mt-4 leading-relaxed text-muted">{top.teaser}</p>
              <span className="mt-7 text-sm font-semibold text-forest">Artikel lesen →</span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <BlogCard key={a.slug} a={a} />
            ))}
          </div>
        )}

        <div className="mt-20 grid items-center gap-6 rounded-[2rem] bg-forest p-8 text-white sm:p-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow text-mint-strong">Sie planen gerade?</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Finden Sie geprüfte Fachbetriebe in Ihrer Nähe.</h2>
          </div>
          <div className="flex lg:justify-end">
            <Link href="/suche" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-forest hover:bg-mint">
              Partner finden
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
