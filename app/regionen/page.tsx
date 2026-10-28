import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";
import { GEWERKE, GEWERK_SEO, ORTE, ortSlug } from "@/lib/data";

export const metadata = { title: "Fachbetriebe nach Region – Hyloft Partnernetz" };

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
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GEWERKE.map((g) => (
            <section key={g.slug} className="rounded-3xl border border-line bg-white p-6">
              <h2 className="text-lg font-semibold">{g.plural}</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                {orte.map((o) => (
                  <li key={o.name}>
                    <Link href={`/${GEWERK_SEO[g.slug].slug}/${ortSlug(o.name)}`} className="text-muted hover:text-forest">
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
