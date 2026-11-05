import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";
import { GEWERKE, GEWERK_SEO, ORTE } from "@/lib/data";

export const metadata = {
  title: "Fachbetriebe nach Stadt in NRW – Hyloft Partnernetz",
  description: "Innenarchitekten, Architekten, Tischler, Innenausbauer, Trockenbauer, Maler und Bodenleger in über 200 Städten in Nordrhein-Westfalen.",
};

export default function Regionen() {
  const orte = [...ORTE].sort((a, b) => a.name.localeCompare(b.name, "de"));
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="pt-14">
          <p className="eyebrow text-muted">Regionen</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Fachbetriebe in NRW</h1>
          <p className="mt-4 max-w-2xl text-muted">Wählen Sie Gewerk und Stadt – Sie sehen geprüfte Betriebe aus dem Hyloft Partnernetz in Ihrer Nähe.</p>
        </section>
        <div className="mt-12 grid gap-4">
          {GEWERKE.map((g, i) => (
            <details key={g.slug} open={i === 0} className="group rounded-3xl border border-line bg-white p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">{g.plural} in NRW</h2>
                <span className="text-xl text-forest transition group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3 lg:grid-cols-5">
                {orte.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/${GEWERK_SEO[g.slug].slug}/${o.slug}`} className="text-muted hover:text-forest">{o.name}</Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
