"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Header, Footer } from "@/components/Chrome";
import { Avatar, Check } from "@/components/PartnerCard";
import { GEWERKE, gewerkBySlug, suche, type Treffer } from "@/lib/data";
import { neueId, speichereAnfrage, type Anfrage } from "@/lib/store";

const STEPS = ["Projekt", "Ort & Lofttür", "Betriebe & Kontakt"];

export default function AnfragePage() {
  const [step, setStep] = useState(0);
  const [fertig, setFertig] = useState<Anfrage | null>(null);
  const [a, setA] = useState<Anfrage>({
    id: "",
    datum: "",
    gewerke: [],
    art: "",
    zeitraum: "",
    beschreibung: "",
    ort: "",
    lofttuer: "",
    name: "",
    email: "",
    telefon: "",
    partner: [],
  });
  const set = <K extends keyof Anfrage>(k: K, v: Anfrage[K]) => setA((x) => ({ ...x, [k]: v }));

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const g = p.get("gewerk");
    const wo = p.get("wo");
    setA((x) => ({ ...x, gewerke: g ? [g] : x.gewerke, ort: wo ?? x.ort }));
  }, []);

  // Passende Betriebe: je Gewerk die nächsten, max. 3 insgesamt
  const vorschlaege: Treffer[] = useMemo(() => {
    const gew = a.gewerke.length ? a.gewerke : [undefined];
    const alle = gew.flatMap((g) => suche(g ? gewerkBySlug(g)?.name : undefined, a.ort).treffer);
    const uniq = alle.filter((p, i) => alle.findIndex((q) => q.slug === p.slug) === i);
    return uniq.sort((x, y) => (x.distanz ?? 0) - (y.distanz ?? 0)).slice(0, 5);
  }, [a.gewerke, a.ort]);

  useEffect(() => {
    if (step === 2 && a.partner.length === 0) set("partner", vorschlaege.slice(0, 3).map((p) => p.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const input = "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-forest";
  const label = "mb-2 block text-sm font-medium text-ink";
  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest/40"}`;

  if (fertig) {
    const gewaehlt = vorschlaege.filter((p) => fertig.partner.includes(p.slug));
    return (
      <>
        <Header />
        <main className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
          <div className="rise text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-mint">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Ihre Anfrage ist unterwegs.</h1>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              {gewaehlt.length} {gewaehlt.length === 1 ? "Betrieb erhält" : "Betriebe erhalten"} Ihre Projektbeschreibung und melden sich in der Regel innerhalb von zwei Werktagen.
            </p>
          </div>
          <div className="mt-10 grid gap-3">
            {gewaehlt.map((p) => (
              <Link key={p.slug} href={`/partner/${p.slug}`} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 hover:border-forest/30">
                <Avatar firma={p.firma} />
                <span className="flex-1">
                  <span className="block font-semibold">{p.firma}</span>
                  <span className="block text-sm text-muted">{gewerkBySlug(p.gewerk)?.name} · {p.ort}</span>
                </span>
                <span className="text-sm font-semibold text-forest">Profil →</span>
              </Link>
            ))}
          </div>
          {fertig.lofttuer !== "Nein" && (
            <div className="mt-6 grid items-center gap-5 overflow-hidden rounded-3xl bg-forest text-white sm:grid-cols-[180px_1fr]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/p11.jpg" alt="" className="h-full max-h-48 w-full object-cover sm:max-h-none" />
              <div className="p-6 sm:py-7 sm:pl-0 sm:pr-8">
                <p className="font-semibold">Sie planen eine Lofttür?</p>
                <p className="mt-1 text-sm leading-relaxed text-white/75">
                  Das Hyloft-Team meldet sich zusätzlich bei Ihnen – auf Wunsch mit kostenloser Visualisierung und Musterstück.
                </p>
                <a href="https://www.hyloft.de" className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest hover:bg-mint">
                  Lofttür konfigurieren
                </a>
              </div>
            </div>
          )}
          <p className="mt-6 text-center text-xs text-muted">Prototyp – es wurde nichts verschickt. Die Anfrage erscheint im Admin-Bereich.</p>
        </main>
        <Footer />
      </>
    );
  }

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) return setStep(step + 1);
            const fertigeAnfrage = { ...a, id: neueId(), datum: new Date().toISOString() };
            speichereAnfrage(fertigeAnfrage);
            setFertig(fertigeAnfrage);
            window.scrollTo({ top: 0 });
          }}
          className="rounded-[2rem] border border-line bg-white p-6 sm:p-10"
        >
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-1 flex-col gap-2">
                <div className={`h-1 rounded-full ${i <= step ? "bg-forest" : "bg-line"}`} />
                <span className={`text-xs font-medium ${i === step ? "text-forest" : "text-muted"}`}>{i + 1}. {s}</span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="mt-8 grid gap-6">
              <div>
                <label className={label}>Welche Gewerke brauchen Sie?</label>
                <div className="flex flex-wrap gap-2">
                  {GEWERKE.map((g) => {
                    const on = a.gewerke.includes(g.slug);
                    return (
                      <button type="button" key={g.slug} className={chip(on)} onClick={() => set("gewerke", on ? a.gewerke.filter((x) => x !== g.slug) : [...a.gewerke, g.slug])}>
                        {g.plural}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className={label}>Art des Vorhabens</label>
                <div className="flex flex-wrap gap-2">
                  {["Neubau", "Sanierung", "Umbau", "Renovierung"].map((x) => (
                    <button type="button" key={x} className={chip(a.art === x)} onClick={() => set("art", x)}>{x}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={label}>Wann soll es losgehen?</label>
                <div className="flex flex-wrap gap-2">
                  {["So bald wie möglich", "In 1–3 Monaten", "In 3–6 Monaten", "Noch offen"].map((x) => (
                    <button type="button" key={x} className={chip(a.zeitraum === x)} onClick={() => set("zeitraum", x)}>{x}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={label}>Beschreiben Sie kurz Ihr Projekt</label>
                <textarea required rows={4} value={a.beschreibung} onChange={(e) => set("beschreibung", e.target.value)} className={input} placeholder="z. B. Wand zwischen Flur und Wohnzimmer öffnen, neue Tür einsetzen, Parkett anpassen …" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 grid gap-6">
              <div>
                <label className={label}>Wo liegt das Objekt?</label>
                <input required autoFocus value={a.ort} onChange={(e) => set("ort", e.target.value)} className={input} placeholder="PLZ oder Ort, z. B. 48143 Münster" />
              </div>
              <div className="rounded-2xl bg-mint/60 p-5">
                <label className={label}>Planen Sie auch eine Lofttür oder Glastrennwand?</label>
                <div className="flex flex-wrap gap-2">
                  {["Ja", "Vielleicht", "Nein"].map((x) => (
                    <button type="button" key={x} className={chip(a.lofttuer === x)} onClick={() => set("lofttuer", x)}>{x}</button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-forest/70">Bei „Ja“ oder „Vielleicht“ meldet sich zusätzlich das Hyloft-Team.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 grid gap-6">
              <div>
                <label className={label}>Wer soll Ihre Anfrage erhalten? <span className="font-normal text-muted">(max. 3)</span></label>
                {vorschlaege.length === 0 ? (
                  <p className="rounded-2xl bg-stone p-4 text-sm text-muted">In Ihrer Region gibt es noch keinen passenden Partner. Wir vermitteln Ihre Anfrage persönlich weiter.</p>
                ) : (
                  <div className="grid gap-2">
                    {vorschlaege.map((p) => {
                      const on = a.partner.includes(p.slug);
                      const voll = !on && a.partner.length >= 3;
                      return (
                        <button
                          type="button"
                          key={p.slug}
                          disabled={voll}
                          onClick={() => set("partner", on ? a.partner.filter((x) => x !== p.slug) : [...a.partner, p.slug])}
                          className={`flex items-center gap-4 rounded-2xl border p-3.5 text-left transition ${on ? "border-forest bg-mint/50" : "border-line"} ${voll ? "opacity-40" : ""}`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${on ? "border-forest bg-forest text-white" : "border-line"}`}>{on && Check}</span>
                          <Avatar firma={p.firma} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-semibold">{p.firma}</span>
                            <span className="block text-xs text-muted">
                              {gewerkBySlug(p.gewerk)?.name} · {p.ort}
                              {p.distanz !== undefined && (p.distanz < 3 ? " · vor Ort" : ` · ca. ${p.distanz} km`)}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required value={a.name} onChange={(e) => set("name", e.target.value)} className={`${input} sm:col-span-2`} placeholder="Ihr Name" />
                <input required type="email" value={a.email} onChange={(e) => set("email", e.target.value)} className={input} placeholder="E-Mail" />
                <input value={a.telefon} onChange={(e) => set("telefon", e.target.value)} className={input} placeholder="Telefon (optional)" />
              </div>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
                <input required type="checkbox" className="mt-0.5 accent-[#213a34]" />
                Ich bin einverstanden, dass meine Anfrage an die ausgewählten Betriebe und an die Hyloft GmbH weitergegeben wird.
              </label>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-semibold text-muted hover:text-ink">← Zurück</button>
            ) : (
              <Link href="/suche" className="text-sm font-semibold text-muted hover:text-ink">← Zur Suche</Link>
            )}
            <button
              disabled={(step === 0 && a.gewerke.length === 0) || (step === 2 && vorschlaege.length > 0 && a.partner.length === 0)}
              className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step < 2 ? "Weiter" : "Anfrage senden"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
