import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";
import SearchBar from "@/components/SearchBar";
import PartnerCard from "@/components/PartnerCard";
import PartnerMapLazy from "@/components/PartnerMapLazy";
import { GEWERKE, gewerkBySlug, initialen, ortByName, suche } from "@/lib/data";

export const metadata = { title: "Partner finden – Hyloft Partnernetz" };

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<{ was?: string; wo?: string; ansicht?: string }>;
}) {
  const { was = "", wo = "", ansicht } = await searchParams;
  const karte = ansicht === "karte";
  const { treffer, gewerk, ort } = suche(was, wo);

  const titel = [gewerk ? gewerk.plural : was ? `„${was}“` : "Fachbetriebe", ort ? `in der Nähe von ${ort.name}` : "in NRW"].join(" ");

  const qs = (extra: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const all = { was: was || undefined, wo: wo || undefined, ansicht: karte ? "karte" : undefined, ...extra };
    Object.entries(all).forEach(([k, v]) => v && p.set(k, v));
    const s = p.toString();
    return `/suche${s ? `?${s}` : ""}`;
  };

  const punkte = treffer.map((p) => {
    const o = ortByName(p.ort)!;
    return { slug: p.slug, firma: p.firma, gewerk: gewerkBySlug(p.gewerk)?.name ?? "", ort: p.ort, lat: o.lat, lng: o.lng, initialen: initialen(p.firma), distanz: p.distanz };
  });

  const anfrageLink = `/anfrage?${new URLSearchParams({ ...(gewerk ? { gewerk: gewerk.slug } : {}), ...(wo ? { wo } : {}) })}`;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pt-10">
          <SearchBar initialWas={was} initialWo={wo} />
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          <Link href={qs({ was: undefined })} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${!gewerk ? "border-forest bg-forest text-white" : "border-line bg-white text-muted hover:text-ink"}`}>
            Alle
          </Link>
          {GEWERKE.map((g) => {
            const on = gewerk?.slug === g.slug;
            return (
              <Link
                key={g.slug}
                href={qs({ was: g.name })}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-muted hover:text-ink"}`}
              >
                {g.plural}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{titel}</h1>
            <p className="mt-1 text-sm text-muted">
              {treffer.length} {treffer.length === 1 ? "Betrieb" : "Betriebe"} gefunden
            </p>
          </div>
          <div className="inline-flex self-start rounded-full border border-line bg-white p-1 text-sm font-medium sm:self-auto">
            <Link href={qs({ ansicht: undefined })} className={`rounded-full px-4 py-1.5 ${!karte ? "bg-forest text-white" : "text-muted hover:text-ink"}`}>
              Liste
            </Link>
            <Link href={qs({ ansicht: "karte" })} className={`rounded-full px-4 py-1.5 ${karte ? "bg-forest text-white" : "text-muted hover:text-ink"}`}>
              Karte
            </Link>
          </div>
        </div>

        {/* Sammelanfrage */}
        <Link
          href={anfrageLink}
          className="group mt-6 flex flex-col justify-between gap-3 rounded-3xl bg-mint p-5 transition hover:bg-mint-strong/60 sm:flex-row sm:items-center sm:px-7"
        >
          <div>
            <p className="font-semibold text-forest">Keine Lust, jeden Betrieb einzeln anzufragen?</p>
            <p className="mt-0.5 text-sm text-forest/75">Beschreiben Sie Ihr Projekt einmal – bis zu 3 passende Betriebe melden sich bei Ihnen.</p>
          </div>
          <span className="shrink-0 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white">Eine Anfrage an mehrere →</span>
        </Link>

        {treffer.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-line bg-white p-10 text-center">
            <p className="text-lg font-semibold">Hier ist noch kein Partner eingetragen.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Unser Netzwerk wächst gerade. Stellen Sie eine Anfrage – wir empfehlen Ihnen persönlich einen Betrieb aus unserem Umfeld.
            </p>
            <Link href={anfrageLink} className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white">
              Empfehlung anfragen
            </Link>
          </div>
        ) : karte ? (
          <div className="mt-6">
            <PartnerMapLazy punkte={punkte} zentrum={ort ? { lat: ort.lat, lng: ort.lng, name: ort.name } : undefined} />
          </div>
        ) : (
          <div className="mt-6 grid gap-5">
            {treffer.map((p) => (
              <PartnerCard key={p.slug} p={p} />
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-white p-7 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-ink">Sie führen selbst einen Fachbetrieb?</p>
            <p className="mt-1 text-sm text-muted">Kostenlos eintragen und von Bauherren in Ihrer Region gefunden werden.</p>
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
