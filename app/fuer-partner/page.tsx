import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";
import { Check } from "@/components/PartnerCard";

export const metadata = { title: "Für Betriebe – kostenlos eintragen | Hyloft Partnernetz" };

const VORTEILE = [
  ["Kostenloses Firmenprofil", "Leistungen, Referenzfotos, Einsatzgebiet und Ansprechpartner – dauerhaft kostenlos, ohne Vertragslaufzeit."],
  ["Sichtbar bei Hyloft-Kunden", "Wir verweisen unsere Kunden im Konfigurator, in der Beratung und im Showroom auf das Partnernetz."],
  ["Eigene Seite bei Google", "Ihr Profil erscheint als eigene Seite – z. B. „Tischler in Lüdinghausen“ – und stärkt Ihre Online-Präsenz."],
  ["Siegel „Von Hyloft geprüft“", "Nach einem kurzen Gespräch schalten wir Ihr Profil frei und kennzeichnen es als geprüft."],
];

const FAQ = [
  ["Was kostet der Eintrag?", "Nichts. Das Profil ist kostenlos, es gibt keine Provision und keine Vertragslaufzeit."],
  ["Bekomme ich garantiert Aufträge?", "Nein. Wir versprechen Sichtbarkeit bei Bauherren, die gerade planen – keine vermittelten Aufträge. Wer Sie über Ihr Profil findet, nimmt direkt mit Ihnen Kontakt auf."],
  ["Warum ruft Hyloft mich an?", "Jedes Profil wird vor der Freischaltung persönlich geprüft. Das Gespräch dauert etwa zehn Minuten – so stellen wir sicher, dass Bauherren nur echte, aktive Betriebe finden."],
  ["Kann ich Lofttüren über Hyloft für meine Projekte beziehen?", "Ja. Partner erhalten auf Anfrage ein individuelles Projektangebot, kostenlose Musterstücke und einen festen Ansprechpartner."],
];

export default function FuerPartner() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <p className="eyebrow rise text-muted">Für Innenarchitekten, Tischler & Innenausbauer</p>
            <h1 className="rise rise-2 mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Werden Sie gefunden, wenn Bauherren planen.
            </h1>
            <p className="rise rise-3 mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Hyloft steht täglich im Austausch mit Bauherren, die umbauen, sanieren oder neu bauen. Tragen Sie Ihren Betrieb
              kostenlos ins Partnernetz ein – wir empfehlen Sie weiter.
            </p>
            <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-4">
              <Link href="/registrieren" className="rounded-full bg-forest px-7 py-4 text-sm font-semibold text-white transition hover:bg-forest-soft">
                Kostenlos eintragen
              </Link>
              <span className="text-sm text-muted">Dauert ca. 3 Minuten</span>
            </div>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/p2.jpg" alt="Lofttür von Hyloft in offener Küche" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-5 shadow-2xl shadow-forest/15 sm:left-auto sm:right-6 sm:w-72">
              <p className="text-3xl font-semibold text-forest">500+</p>
              <p className="mt-1 text-sm text-muted">Hyloft-Kunden, die zu Planung, Boden oder Ausbau oft noch einen Fachbetrieb suchen.</p>
            </div>
          </div>
        </section>

        {/* VORTEILE */}
        <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
          <p className="eyebrow text-muted">Ihre Vorteile</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">Mehr Sichtbarkeit, ohne Mehraufwand.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {VORTEILE.map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-line bg-white p-7">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-forest">{Check}</span>
                <p className="mt-5 text-lg font-semibold">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABLAUF */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div className="rounded-[2rem] bg-forest p-8 text-white sm:p-12">
            <p className="eyebrow text-mint-strong">So läuft&apos;s ab</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">In drei Schritten online.</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ["Registrieren", "Firma, Gewerk und Einsatzgebiet angeben. Fotos können Sie später ergänzen."],
                ["Kurzes Gespräch", "Wir rufen Sie innerhalb von 48 Stunden an und prüfen gemeinsam Ihr Profil."],
                ["Profil ist live", "Ihr Profil erscheint mit dem Siegel „Von Hyloft geprüft“ im Partnernetz."],
              ].map(([t, d], i) => (
                <li key={t} className="border-t border-white/15 pt-6">
                  <span className="text-sm font-semibold text-mint-strong">0{i + 1}</span>
                  <p className="mt-2 text-lg font-semibold">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BONUS LOFTTÜR */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-muted">Für Ihre eigenen Projekte</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Lofttüren aus echtem Stahl – mit Partnerservice.</h2>
              <ul className="mt-6 space-y-3 text-ink/80">
                {[
                  "Individuelles Projektangebot auf Anfrage",
                  "Visualisierung und technische Konstruktionszeichnung",
                  "Kostenlose Musterstücke für Ihre Kunden",
                  "Showroom in Lüdinghausen für die Bemusterung",
                  "Lieferung direkt aus der Fabrik, ohne Umladen",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 text-forest">{Check}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/p16.jpg" alt="Glastrennwand im Büro" className="aspect-square w-full rounded-3xl object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/p4.jpg" alt="Lofttür mit Oberlicht" className="aspect-square w-full rounded-3xl object-cover" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Häufige Fragen</h2>
          <div className="mt-10 divide-y divide-line rounded-3xl border border-line bg-white">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {q}
                  <span className="text-xl text-forest transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/registrieren" className="inline-block rounded-full bg-forest px-8 py-4 text-sm font-semibold text-white hover:bg-forest-soft">
              Jetzt kostenlos eintragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
