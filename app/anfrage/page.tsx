import { Header, Footer } from "@/components/Chrome";
import { Check } from "@/components/PartnerCard";
import { livePartner } from "@/lib/repo";
import AnfrageForm from "./AnfrageForm";

export const metadata = {
  title: "Eine Anfrage an bis zu 3 Fachbetriebe – Hyloft Partnernetz",
  description: "Beschreiben Sie Ihr Projekt einmal – geprüfte Innenarchitekten, Tischler und Innenausbauer aus NRW melden sich bei Ihnen. Kostenlos und unverbindlich.",
};

export default async function AnfragePage({ searchParams }: { searchParams: Promise<{ gewerk?: string; wo?: string }> }) {
  const { gewerk, wo } = await searchParams;
  const partner = await livePartner();
  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:pt-6">
          <p className="eyebrow text-muted">Kostenlos & unverbindlich</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Eine Anfrage, bis zu drei passende Betriebe.</h1>
          <p className="mt-4 leading-relaxed text-muted">
            Beschreiben Sie Ihr Projekt einmal. Wir leiten es an geprüfte Fachbetriebe in Ihrer Nähe weiter – Sie entscheiden, wer es erhält.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Nur geprüfte Betriebe aus dem Partnernetz", "Sie wählen die Empfänger selbst aus", "Keine Kosten, keine Verpflichtung"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-forest">{Check}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <AnfrageForm partner={partner} startGewerk={gewerk} startOrt={wo} />
      </main>
      <Footer />
    </>
  );
}
