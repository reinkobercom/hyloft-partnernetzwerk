import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";
import SearchBar from "@/components/SearchBar";
import PartnerCard from "@/components/PartnerCard";
import { GEWERKE, PARTNER } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
import { ARTIKEL } from "@/lib/blog";

const GEWERK_ICONS: Record<string, React.ReactNode> = {
  innenarchitektur: <path d="M4 20h16M6 20V9l6-5 6 5v11M10 20v-5h4v5" />,
  tischlerei: <path d="M3 17l8-8m-3-3 3 3 7-7 3 3-7 7 3 3-5 5-3-3-4 4H3v-2Z" />,
  innenausbau: <path d="M4 4h16v16H4zM4 10h16M10 10v10" />,
  trockenbau: <path d="M4 20V4h6v16M14 20V8h6v12M4 12h6M14 14h6" />,
  maler: <path d="M5 4h12v5H5zM17 6h2v6h-8v3M10 15h2v5h-2z" />,
  boden: <path d="M3 21 21 3M3 15l6 6M3 9l12 12M9 3l12 12M15 3l6 6" />,
};

export default function Home() {
  const featured = PARTNER.filter((p) => p.verifiziert).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-visible">
        <Header overlay />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/p18.jpg" alt="" className="h-full w-full object-cover object-[50%_60%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/85 via-forest/75 to-forest-deep/90" />
        </div>
        <div className="mx-auto flex min-h-[88vh] max-w-4xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:px-6">
          <p className="eyebrow rise text-mint-strong">Das Netzwerk von Hyloft Lofttüren · NRW</p>
          <h1 className="rise rise-2 mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Die richtigen Fachbetriebe
            <br className="hidden sm:block" /> für Ihr Zuhause.
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Innenarchitekten, Tischler und Innenausbauer in Ihrer Nähe – persönlich geprüft vom Hyloft-Team.
          </p>
          <div className="rise rise-4 mt-10 w-full max-w-3xl">
            <SearchBar big />
          </div>
          <div className="rise rise-4 mt-6 flex flex-wrap justify-center gap-2">
            {GEWERKE.slice(0, 4).map((g) => (
              <Link
                key={g.slug}
                href={`/suche?was=${encodeURIComponent(g.name)}`}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur transition hover:bg-white/20"
              >
                {g.plural}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center sm:px-6 md:grid-cols-4">
          {[
            ["500+", "Hyloft-Kunden mit Lofttür"],
            ["Geprüft", "jeder Betrieb vor der Freischaltung"],
            ["0 €", "Kosten für Bauherren"],
            ["NRW", "Schwerpunkt Münsterland & Ruhrgebiet"],
          ].map(([k, v]) => (
            <div key={v}>
              <p className="text-2xl font-semibold text-forest sm:text-3xl">{k}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <main>
        {/* GEWERKE */}
        <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-muted">Gewerke</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Wen brauchen Sie?</h2>
            </div>
            <Link href="/suche" className="text-sm font-semibold text-forest hover:underline">
              Alle Partner ansehen →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {GEWERKE.map((g) => (
              <Link
                key={g.slug}
                href={`/suche?was=${encodeURIComponent(g.name)}`}
                className="group flex flex-col gap-6 rounded-3xl border border-line bg-white p-5 transition hover:border-forest/30 hover:bg-mint/40 sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone text-forest transition group-hover:bg-forest group-hover:text-mint">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {GEWERK_ICONS[g.slug]}
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold text-ink sm:text-lg">{g.plural}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted sm:text-sm">{g.kurz}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SO FUNKTIONIERT'S */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div className="grid gap-10 rounded-[2rem] bg-stone p-8 sm:p-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="eyebrow text-muted">So funktioniert&apos;s</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">In drei Schritten zum passenden Betrieb.</h2>
            </div>
            <ol className="grid gap-8 sm:grid-cols-3">
              {[
                ["Suchen", "Gewerk und Ort eingeben – Sie sehen sofort Betriebe in Ihrer Nähe."],
                ["Vergleichen", "Leistungen, Referenzen und Einsatzgebiet auf einen Blick."],
                ["Anfragen", "Direkt Kontakt aufnehmen – kostenlos und unverbindlich."],
              ].map(([t, d], i) => (
                <li key={t}>
                  <span className="text-sm font-semibold text-forest/50">0{i + 1}</span>
                  <p className="mt-2 text-lg font-semibold">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PARTNER */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <p className="eyebrow text-muted">Partner im Netzwerk</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Geprüfte Betriebe aus Ihrer Region</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {featured.map((p) => (
              <PartnerCard key={p.slug} p={p} />
            ))}
          </div>
        </section>

        {/* HYLOFT */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/p13.jpg" alt="Hyloft Lofttür im Wohnbereich" className="aspect-[3/4] w-full rounded-3xl object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/p11.jpg" alt="Hyloft Lofttür mit Seitenteil" className="mt-10 aspect-[3/4] w-full rounded-3xl object-cover" />
            </div>
            <div>
              <p className="eyebrow text-muted">Von Hyloft Lofttüren</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Die Lofttür kommt von uns. Den Rest machen die Profis vor Ort.</h2>
              <p className="mt-5 leading-relaxed text-muted">
                Hyloft fertigt Lofttüren aus echtem Stahl – mit rahmenverschweißten Sprossen, unsichtbaren Schweißnähten
                und 6&nbsp;mm VSG-Sicherheitsglas. Für Wanddurchbruch, Boden oder Raumplanung empfehlen wir die Betriebe aus
                unserem Netzwerk.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.hyloft.de" className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-soft">
                  Lofttür konfigurieren
                </a>
                <a href="https://www.hyloft.de" className="rounded-full border border-forest/20 px-6 py-3 text-sm font-semibold text-forest hover:bg-mint">
                  Showroom Lüdinghausen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* RATGEBER */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-muted">Ratgeber</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Gut geplant ist halb gebaut.</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-forest hover:underline">Alle Artikel →</Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {ARTIKEL.slice(0, 3).map((a) => (
              <BlogCard key={a.slug} a={a} />
            ))}
          </div>
        </section>

        {/* CTA BETRIEBE */}
        <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-8 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-forest-soft/60 blur-2xl" />
            <p className="eyebrow relative text-mint-strong">Für Fachbetriebe</p>
            <h2 className="relative mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Sie sind Innenarchitekt, Tischler oder Innenausbauer?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/70">
              Tragen Sie Ihren Betrieb kostenlos ein und werden Sie von Bauherren gefunden, die gerade planen.
            </p>
            <Link
              href="/fuer-partner"
              className="relative mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-forest transition hover:bg-mint"
            >
              Kostenlos eintragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
