import Link from "next/link";
import { Header, Footer } from "@/components/Chrome";

export const metadata = { title: "Danke für Ihre Registrierung – Hyloft Partnernetz", robots: { index: false } };

export default function Danke() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 pt-20 text-center sm:px-6">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-mint">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Danke – Ihre Registrierung ist eingegangen.</h1>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted">
          Wir rufen Sie innerhalb von 48 Stunden an, um Ihr Profil gemeinsam zu prüfen. Nach dem Gespräch schalten wir Ihr Profil frei und Sie erhalten Ihren Zugang zum Partnerbereich.
        </p>
        <div className="mt-10 rounded-3xl bg-mint p-6 text-left text-sm leading-relaxed text-forest">
          <p className="font-semibold">Tipp für das Gespräch</p>
          <p className="mt-1">Legen Sie sich drei bis sechs Fotos von aktuellen Projekten und Ihr Logo bereit – vollständige Profile werden deutlich häufiger angefragt.</p>
        </div>
        <Link href="/" className="mt-10 inline-block text-sm font-semibold text-forest hover:underline">Zur Startseite</Link>
      </main>
      <Footer />
    </>
  );
}
