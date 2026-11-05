"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { anfrageSenden } from "../actions";
import { Avatar, Check, entfernungText } from "@/components/PartnerCard";
import { Absenden, Honigtopf, Meldung, inputCls, useFormular } from "@/components/Formular";
import { GEWERKE, gewerkBySlug, suche, type Partner, type Treffer } from "@/lib/data";
import { EINWILLIGUNG_ANFRAGE, EINWILLIGUNG_LOFTTUER } from "@/lib/rechtstexte";

const STEPS = ["Projekt", "Ort & Lofttür", "Betriebe & Kontakt"];

export default function AnfrageForm({ partner, startGewerk, startOrt }: { partner: Partner[]; startGewerk?: string; startOrt?: string }) {
  const [step, setStep] = useState(0);
  const { status, onSubmit: senden, pending } = useFormular(anfrageSenden);
  const [gewerke, setGewerke] = useState<string[]>(startGewerk && gewerkBySlug(startGewerk) ? [startGewerk] : []);
  const [art, setArt] = useState("");
  const [zeitraum, setZeitraum] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [ort, setOrt] = useState(startOrt ?? "");
  const [lofttuer, setLofttuer] = useState("");
  const [auswahl, setAuswahl] = useState<string[] | null>(null);

  const vorschlaege: Treffer[] = useMemo(() => {
    const gew = gewerke.length ? gewerke : [undefined];
    const alle = gew.flatMap((g) => suche(partner, g ? gewerkBySlug(g)?.name : undefined, ort).treffer);
    const uniq = alle.filter((p, i) => alle.findIndex((q) => q.slug === p.slug) === i);
    return uniq.sort((x, y) => (x.distanz ?? 0) - (y.distanz ?? 0)).slice(0, 6);
  }, [partner, gewerke, ort]);

  useEffect(() => {
    if (step === 2 && auswahl === null) setAuswahl(vorschlaege.slice(0, 3).map((p) => p.slug));
  }, [step, auswahl, vorschlaege]);

  const gewaehlt = auswahl ?? [];
  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm transition ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest/40"}`;
  const label = "mb-2 block text-sm font-medium text-ink";

  if (status?.ok) {
    const slugs = status.ok === "persoenlich" ? [] : status.ok.split(",");
    const liste = vorschlaege.filter((p) => slugs.includes(p.slug));
    return (
      <div className="pt-4">
        <div className="rise text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-mint">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Ihre Anfrage ist unterwegs.</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            {liste.length
              ? `${liste.length} ${liste.length === 1 ? "Betrieb erhält" : "Betriebe erhalten"} Ihre Projektbeschreibung und melden sich in der Regel innerhalb von zwei Werktagen.`
              : "Wir suchen persönlich einen passenden Betrieb für Sie und melden uns in Kürze."}{" "}
            Eine Bestätigung haben wir Ihnen per E-Mail geschickt.
          </p>
        </div>
        <div className="mt-10 grid gap-3">
          {liste.map((p) => (
            <Link key={p.slug} href={`/partner/${p.slug}`} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 hover:border-forest/30">
              <Avatar firma={p.firma} logo={p.logo} />
              <span className="flex-1">
                <span className="block font-semibold">{p.firma}</span>
                <span className="block text-sm text-muted">{gewerkBySlug(p.gewerk)?.name} · {p.ort}</span>
              </span>
              <span className="text-sm font-semibold text-forest">Profil →</span>
            </Link>
          ))}
        </div>
        {lofttuer !== "Nein" && lofttuer !== "" && (
          <div className="mt-6 grid items-center gap-5 overflow-hidden rounded-3xl bg-forest text-white sm:grid-cols-[180px_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/p11.jpg" alt="" className="h-full max-h-48 w-full object-cover sm:max-h-none" />
            <div className="p-6 sm:py-7 sm:pl-0 sm:pr-8">
              <p className="font-semibold">Sie planen eine Lofttür?</p>
              <p className="mt-1 text-sm leading-relaxed text-white/75">Konfigurieren Sie Ihre Wunschtür online oder lassen Sie sich im Showroom in Lüdinghausen beraten.</p>
              <a href="https://www.hyloft.de" target="_blank" rel="noopener" className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest hover:bg-mint">
                Lofttür konfigurieren
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        if (step < 2) {
          e.preventDefault();
          setStep(step + 1);
        } else senden(e);
      }}
      className="relative rounded-[2rem] border border-line bg-white p-6 sm:p-10"
    >
      <Honigtopf />
      <input type="hidden" name="quelle" value="sammel" />
      {step === 2 && (
        <>
          {gewerke.map((g) => <input key={g} type="hidden" name="gewerke" value={g} />)}
          {gewaehlt.map((s) => <input key={s} type="hidden" name="partner" value={s} />)}
          <input type="hidden" name="art" value={art} />
          <input type="hidden" name="zeitraum" value={zeitraum} />
          <input type="hidden" name="beschreibung" value={beschreibung} />
          <input type="hidden" name="ort" value={ort} />
          <input type="hidden" name="lofttuer" value={lofttuer} />
        </>
      )}

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
            <span className={label}>Welche Gewerke brauchen Sie?</span>
            <div className="flex flex-wrap gap-2">
              {GEWERKE.map((g) => {
                const on = gewerke.includes(g.slug);
                return (
                  <button type="button" key={g.slug} className={chip(on)} onClick={() => setGewerke(on ? gewerke.filter((x) => x !== g.slug) : [...gewerke, g.slug])}>
                    {g.plural}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <span className={label}>Art des Vorhabens</span>
            <div className="flex flex-wrap gap-2">
              {["Neubau", "Sanierung", "Umbau", "Renovierung"].map((x) => (
                <button type="button" key={x} className={chip(art === x)} onClick={() => setArt(x)}>{x}</button>
              ))}
            </div>
          </div>
          <div>
            <span className={label}>Wann soll es losgehen?</span>
            <div className="flex flex-wrap gap-2">
              {["So bald wie möglich", "In 1–3 Monaten", "In 3–6 Monaten", "Noch offen"].map((x) => (
                <button type="button" key={x} className={chip(zeitraum === x)} onClick={() => setZeitraum(x)}>{x}</button>
              ))}
            </div>
          </div>
          <div>
            <label className={label} htmlFor="beschreibung">Beschreiben Sie kurz Ihr Projekt</label>
            <textarea id="beschreibung" required minLength={10} rows={4} value={beschreibung} onChange={(e) => setBeschreibung(e.target.value)} className={inputCls} placeholder="z. B. Wand zwischen Flur und Wohnzimmer öffnen, neue Tür einsetzen, Parkett anpassen …" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-8 grid gap-6">
          <div>
            <label className={label} htmlFor="ort">Wo liegt das Objekt?</label>
            <input id="ort" required autoFocus value={ort} onChange={(e) => setOrt(e.target.value)} className={inputCls} placeholder="PLZ oder Ort, z. B. 48143 Münster" />
          </div>
          <div className="rounded-2xl bg-mint/60 p-5">
            <span className={label}>Planen Sie auch eine Lofttür oder Glastrennwand?</span>
            <div className="flex flex-wrap gap-2">
              {["Ja", "Vielleicht", "Nein"].map((x) => (
                <button type="button" key={x} className={chip(lofttuer === x)} onClick={() => setLofttuer(x)}>{x}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 grid gap-6">
          <div>
            <span className={label}>Wer soll Ihre Anfrage erhalten? <span className="font-normal text-muted">(max. 3)</span></span>
            {vorschlaege.length === 0 ? (
              <p className="rounded-2xl bg-stone p-4 text-sm leading-relaxed text-muted">
                In Ihrer Region ist noch kein passender Betrieb im Partnernetz. Senden Sie die Anfrage trotzdem – das Hyloft-Team empfiehlt Ihnen persönlich einen Betrieb.
              </p>
            ) : (
              <div className="grid gap-2">
                {vorschlaege.map((p) => {
                  const on = gewaehlt.includes(p.slug);
                  const voll = !on && gewaehlt.length >= 3;
                  return (
                    <button
                      type="button"
                      key={p.slug}
                      disabled={voll}
                      onClick={() => setAuswahl(on ? gewaehlt.filter((x) => x !== p.slug) : [...gewaehlt, p.slug])}
                      className={`flex items-center gap-4 rounded-2xl border p-3.5 text-left transition ${on ? "border-forest bg-mint/50" : "border-line"} ${voll ? "opacity-40" : ""}`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${on ? "border-forest bg-forest text-white" : "border-line"}`}>{on && Check}</span>
                      <Avatar firma={p.firma} logo={p.logo} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{p.firma}</span>
                        <span className="block text-xs text-muted">
                          {gewerkBySlug(p.gewerk)?.name} · {p.ort}
                          {p.distanz !== undefined && ` · ${entfernungText(p.distanz)}`}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" required autoComplete="name" className={`${inputCls} sm:col-span-2`} placeholder="Ihr Name" />
            <input name="email" required type="email" autoComplete="email" className={inputCls} placeholder="E-Mail" />
            <input name="telefon" type="tel" autoComplete="tel" className={inputCls} placeholder="Telefon (optional)" />
          </div>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
            <input required name="einwilligung" type="checkbox" className="mt-0.5 accent-[#213a34]" />
            <span>
              {EINWILLIGUNG_ANFRAGE} <Link href="/datenschutz" target="_blank" className="font-semibold text-forest underline">Datenschutz</Link>
            </span>
          </label>
          {(lofttuer === "Ja" || lofttuer === "Vielleicht") && (
            <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
              <input name="lofttuer_kontakt" type="checkbox" className="mt-0.5 accent-[#213a34]" />
              <span>{EINWILLIGUNG_LOFTTUER} <span className="text-muted/80">(freiwillig)</span></span>
            </label>
          )}
          <Meldung status={status?.fehler ? status : null} />
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-semibold text-muted hover:text-ink">← Zurück</button>
        ) : (
          <Link href="/suche" className="text-sm font-semibold text-muted hover:text-ink">← Zur Suche</Link>
        )}
        {step < 2 ? (
          <button disabled={step === 0 && gewerke.length === 0} className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-40">
            Weiter
          </button>
        ) : (
          <Absenden pending={pending}>Anfrage senden</Absenden>
        )}
      </div>
    </form>
  );
}
