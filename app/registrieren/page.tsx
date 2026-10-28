"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Chrome";
import { GEWERKE } from "@/lib/data";
import { save, type Registrierung } from "@/lib/session";

const LEISTUNGS_VORSCHLAEGE: Record<string, string[]> = {
  "Innenarchitektur": ["Grundrissplanung", "Lichtplanung", "Materialkonzept", "Bauleitung", "3D-Visualisierung"],
  "Tischlerei & Schreinerei": ["Einbaumöbel", "Innentüren", "Treppen", "Laibungen & Zargen", "Küchen"],
  "Innenausbau": ["Komplettsanierung", "Trockenbau", "Akustik", "Bodenbeläge", "Koordination"],
  "Trockenbau": ["Ständerwände", "Wanddurchbrüche", "Decken", "Schallschutz"],
  "Maler & Lackierer": ["Innenanstrich", "Spachteltechnik", "Tapezieren", "Lackierarbeiten"],
  "Bodenleger": ["Parkett", "Fliese", "Designboden", "Treppenbeläge"],
};

const STEPS = ["Betrieb", "Kontakt", "Profil"];

export default function Registrieren() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [r, setR] = useState<Registrierung>({
    firma: "",
    gewerk: "",
    ort: "",
    radius: "50",
    name: "",
    email: "",
    telefon: "",
    website: "",
    beschreibung: "",
    leistungen: [],
    lofttuerBedarf: "",
    rueckruf: "Egal",
    datum: "",
  });
  const set = (k: keyof Registrierung, v: string | string[]) => setR((x) => ({ ...x, [k]: v }));

  const input = "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-forest";
  const label = "mb-1.5 block text-sm font-medium text-ink";

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest/40"}`;

  return (
    <div className="min-h-screen bg-stone">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <Logo />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Linke Spalte */}
        <div className="lg:pt-10">
          <p className="eyebrow text-muted">Kostenlos eintragen</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Ihr Betrieb im Hyloft Partnernetz.</h1>
          <p className="mt-4 leading-relaxed text-muted">
            Nach der Registrierung rufen wir Sie innerhalb von 48 Stunden kurz an, prüfen Ihr Profil gemeinsam und schalten es
            frei.
          </p>
          <ul className="mt-8 hidden space-y-3 text-sm lg:block">
            {["Dauerhaft kostenlos, ohne Provision", "Eigene Profilseite bei Google", "Siegel „Von Hyloft geprüft“"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Formular */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) return setStep(step + 1);
            save({ ...r, datum: new Date().toISOString() });
            router.push("/partnerbereich?neu=1");
          }}
          className="rounded-[2rem] bg-white p-6 shadow-xl shadow-forest/5 sm:p-10"
        >
          {/* Fortschritt */}
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-1 flex-col gap-2">
                <div className={`h-1 rounded-full ${i <= step ? "bg-forest" : "bg-line"}`} />
                <span className={`text-xs font-medium ${i === step ? "text-forest" : "text-muted"}`}>
                  {i + 1}. {s}
                </span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="mt-8 grid gap-5">
              <div>
                <label className={label}>Firmenname</label>
                <input required autoFocus value={r.firma} onChange={(e) => set("firma", e.target.value)} className={input} placeholder="z. B. Tischlerei Muster" />
              </div>
              <div>
                <label className={label}>Gewerk</label>
                <div className="flex flex-wrap gap-2">
                  {GEWERKE.map((g) => (
                    <button type="button" key={g.slug} onClick={() => set("gewerk", g.name)} className={chip(r.gewerk === g.name)}>
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
                <div>
                  <label className={label}>Standort (PLZ oder Ort)</label>
                  <input required value={r.ort} onChange={(e) => set("ort", e.target.value)} className={input} placeholder="z. B. 59348 Lüdinghausen" />
                </div>
                <div>
                  <label className={label}>Einsatzgebiet</label>
                  <select value={r.radius} onChange={(e) => set("radius", e.target.value)} className={input}>
                    {["25", "50", "75", "100"].map((k) => (
                      <option key={k} value={k}>bis {k} km</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 grid gap-5">
              <div>
                <label className={label}>Ansprechpartner</label>
                <input required autoFocus value={r.name} onChange={(e) => set("name", e.target.value)} className={input} placeholder="Vor- und Nachname" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label}>E-Mail</label>
                  <input required type="email" value={r.email} onChange={(e) => set("email", e.target.value)} className={input} />
                </div>
                <div>
                  <label className={label}>Telefon</label>
                  <input required type="tel" value={r.telefon} onChange={(e) => set("telefon", e.target.value)} className={input} />
                  <p className="mt-1.5 text-xs text-muted">Für das kurze Freischaltungsgespräch.</p>
                </div>
              </div>
              <div>
                <label className={label}>Wann erreichen wir Sie am besten?</label>
                <div className="flex flex-wrap gap-2">
                  {["Vormittags", "Mittags", "Nachmittags", "Egal"].map((z) => (
                    <button type="button" key={z} onClick={() => set("rueckruf", z)} className={chip(r.rueckruf === z)}>
                      {z}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={label}>Website <span className="font-normal text-muted">(optional)</span></label>
                <input value={r.website} onChange={(e) => set("website", e.target.value)} className={input} placeholder="www.ihr-betrieb.de" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 grid gap-5">
              <div>
                <label className={label}>Leistungen</label>
                <div className="flex flex-wrap gap-2">
                  {(LEISTUNGS_VORSCHLAEGE[r.gewerk] ?? LEISTUNGS_VORSCHLAEGE["Innenausbau"]).map((l) => {
                    const on = r.leistungen.includes(l);
                    return (
                      <button
                        type="button"
                        key={l}
                        onClick={() => set("leistungen", on ? r.leistungen.filter((x) => x !== l) : [...r.leistungen, l])}
                        className={chip(on)}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className={label}>Kurzbeschreibung <span className="font-normal text-muted">(optional)</span></label>
                <textarea rows={3} value={r.beschreibung} onChange={(e) => set("beschreibung", e.target.value)} className={input} placeholder="Was zeichnet Ihren Betrieb aus?" />
              </div>
              <div className="rounded-2xl bg-mint/60 p-5">
                <label className={label}>Haben Sie Projekte, in denen eine Lofttür oder Glastrennwand passen könnte?</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Ja, konkret geplant", "Gelegentlich", "Eher nicht"].map((z) => (
                    <button type="button" key={z} onClick={() => set("lofttuerBedarf", z)} className={chip(r.lofttuerBedarf === z)}>
                      {z}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
                <input required type="checkbox" className="mt-0.5 accent-[#213a34]" />
                Ich bin einverstanden, dass die Hyloft GmbH mich zur Freischaltung meines Profils telefonisch und per E-Mail
                kontaktiert. Hinweise zum Datenschutz finden Sie auf hyloft.de.
              </label>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-semibold text-muted hover:text-ink">
                ← Zurück
              </button>
            ) : (
              <Link href="/fuer-partner" className="text-sm font-semibold text-muted hover:text-ink">← Abbrechen</Link>
            )}
            <button
              disabled={step === 0 && !r.gewerk}
              className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step < 2 ? "Weiter" : "Kostenlos registrieren"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
