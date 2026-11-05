import { Logo } from "@/components/Chrome";
import RegistrierenForm from "./RegistrierenForm";

export const metadata = { title: "Betrieb kostenlos eintragen – Hyloft Partnernetz" };

export default function Registrieren() {
  return (
    <div className="min-h-screen bg-stone">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <Logo />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:pt-10">
          <p className="eyebrow text-muted">Kostenlos eintragen</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Ihr Betrieb im Hyloft Partnernetz.</h1>
          <p className="mt-4 leading-relaxed text-muted">
            Nach der Registrierung rufen wir Sie innerhalb von 48 Stunden kurz an, prüfen Ihr Profil gemeinsam und schalten es frei. Danach erhalten Sie Ihren Zugang zum Partnerbereich.
          </p>
          <ul className="mt-8 hidden space-y-3 text-sm lg:block">
            {["Dauerhaft kostenlos, ohne Provision", "Eigene Profilseite, auffindbar bei Google", "Siegel „Von Hyloft geprüft“ für Ihre Website"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <RegistrierenForm />
      </div>
    </div>
  );
}
