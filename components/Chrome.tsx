import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex w-[132px] flex-col leading-none" aria-label="Hyloft Partnernetz Startseite">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? "/img/logo-white.png" : "/img/logo-forest.png"} alt="Hyloft" width={132} height={18} className="h-[18px] w-[132px]" />
      <span
        className={`mt-[7px] flex justify-between text-[0.6rem] font-medium ${light ? "text-white/85" : "text-forest"}`}
        aria-hidden
      >
        {"PARTNERNETZ".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </span>
    </Link>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-forest-deep px-4 py-1.5 text-center text-[0.7rem] font-medium tracking-wide text-mint-strong">
      Prototyp · Alle Firmenprofile sind erfundene Beispielprofile
    </div>
  );
}

export function Header({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-30" : "sticky top-0 z-30 border-b border-line bg-[#fbfaf8]/90 backdrop-blur"}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo light={overlay} />
        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <Link
            href="/suche"
            className={`hidden rounded-full px-4 py-2 sm:inline-block ${overlay ? "text-white/85 hover:text-white" : "text-muted hover:text-ink"}`}
          >
            Partner finden
          </Link>
          <Link
            href="/blog"
            className={`hidden rounded-full px-4 py-2 sm:inline-block ${overlay ? "text-white/85 hover:text-white" : "text-muted hover:text-ink"}`}
          >
            Ratgeber
          </Link>
          <Link
            href="/login"
            className={`rounded-full px-3 py-2 sm:px-4 ${overlay ? "text-white/85 hover:text-white" : "text-muted hover:text-ink"}`}
          >
            Login
          </Link>
          <Link
            href="/fuer-partner"
            className={`rounded-full px-4 py-2 transition ${
              overlay ? "bg-white text-forest hover:bg-mint" : "bg-forest text-white hover:bg-forest-soft"
            }`}
          >
            Für Betriebe
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-forest text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            Das Partnernetz von Hyloft verbindet Bauherren mit geprüften Fachbetrieben für Planung und Ausbau rund um
            Lofttüren aus Stahl und Glas.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4 text-mint-strong">Für Bauherren</p>
          <ul className="space-y-2.5">
            <li><Link href="/suche" className="hover:text-white">Partner finden</Link></li>
            <li><Link href="/anfrage" className="hover:text-white">Eine Anfrage an mehrere</Link></li>
            <li><Link href="/regionen" className="hover:text-white">Betriebe nach Region</Link></li>
            <li><Link href="/blog" className="hover:text-white">Ratgeber & Blog</Link></li>
            <li><a href="https://www.hyloft.de" className="hover:text-white">Lofttür konfigurieren</a></li>
            <li><a href="https://www.hyloft.de" className="hover:text-white">Showroom Lüdinghausen</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4 text-mint-strong">Für Betriebe</p>
          <ul className="space-y-2.5">
            <li><Link href="/fuer-partner" className="hover:text-white">Kostenlos eintragen</Link></li>
            <li><Link href="/login" className="hover:text-white">Partner-Login</Link></li>
            <li><a href="mailto:info@hyloft.de" className="hover:text-white">info@hyloft.de</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Hyloft GmbH</span>
          <span className="flex gap-5">
            <a href="https://www.hyloft.de" className="hover:text-white">Impressum</a>
            <a href="https://www.hyloft.de" className="hover:text-white">Datenschutz</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
