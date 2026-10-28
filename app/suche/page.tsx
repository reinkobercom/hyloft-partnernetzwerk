import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";
import SearchBar from "@/components/SearchBar";
import PartnerCard from "@/components/PartnerCard";
import { GEWERKE, suche } from "@/lib/data";

export const metadata = { title: "Partner finden – Hyloft Partnernetz" };

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<{ was?: string; wo?: string }>;
}) {
  const { was = "", wo = "" } = await searchParams;
  const { treffer, gewerk, ort } = suche(was, wo);

  const titel = [gewerk ? gewerk.plural : was ? `„${was}“` : "Fachbetriebe", ort ? `in der Nähe von ${ort.name}` : "in NRW"].join(" ");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pt-10">
          <SearchBar initialWas={was} initialWo={wo} />
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          <Link
            href={`/suche${wo ? `?wo=${encodeURIComponent(wo)}` : ""}`}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${!gewerk ? "border-forest bg-forest text-white" : "border-line bg-white text-muted hover:text-ink"}`}
          >
            Alle
          </Link>
          {GEWERKE.map((g) => {
            const p = new URLSearchParams({ was: g.name });
            if (wo) p.set("wo", wo);
            const on = gewerk?.slug === g.slug;
            return (
              <Link
                key={g.slug}
                href={`/suche?${p}`}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-muted hover:text-ink"}`}
              >
                {g.plural}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{titel}</h1>
          <p className="text-sm text-muted">
            {treffer.length} {treffer.length === 1 ? "Betrieb" : "Betriebe"} gefunden
          </p>
        </div>

        {treffer.length > 0 ? (
          <div className="mt-6 grid gap-5">
            {treffer.map((p) => (
              <PartnerCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-line bg-white p-10 text-center">
            <p className="text-lg font-semibold">Hier ist noch kein Partner eingetragen.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Unser Netzwerk wächst gerade. Schreiben Sie uns – wir empfehlen Ihnen persönlich einen Betrieb aus unserem
              Umfeld.
            </p>
            <a href="mailto:info@hyloft.de" className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white">
              Empfehlung anfragen
            </a>
          </div>
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-mint p-7 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-forest">Sie führen selbst einen Fachbetrieb?</p>
            <p className="mt-1 text-sm text-forest/75">Kostenlos eintragen und von Bauherren in Ihrer Region gefunden werden.</p>
          </div>
          <Link href="/fuer-partner" className="shrink-0 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-soft">
            Betrieb eintragen
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
