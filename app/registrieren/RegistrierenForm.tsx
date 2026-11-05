"use client";

import Link from "next/link";
import { useState } from "react";
import { registrieren } from "../actions";
import { GEWERKE, LEISTUNGS_VORSCHLAEGE } from "@/lib/data";
import { EINWILLIGUNG_REGISTRIERUNG } from "@/lib/rechtstexte";
import { Absenden, Honigtopf, Meldung, inputCls, labelCls, useFormular } from "@/components/Formular";

const STEPS = ["Betrieb", "Kontakt", "Profil"];

type R = {
  firma: string; gewerk: string; ort: string; radius: string; name: string; email: string;
  telefon: string; website: string; beschreibung: string; leistungen: string[]; lofttuer_bedarf: string; rueckruf: string;
};

export default function RegistrierenForm() {
  const [step, setStep] = useState(0);
  const { status, onSubmit: senden, pending } = useFormular(registrieren);
  const [r, setR] = useState<R>({ firma: "", gewerk: "", ort: "", radius: "50", name: "", email: "", telefon: "", website: "", beschreibung: "", leistungen: [], lofttuer_bedarf: "", rueckruf: "Egal" });
  const set = <K extends keyof R>(k: K, v: R[K]) => setR((x) => ({ ...x, [k]: v }));
  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm transition ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest/40"}`;

  return (
    <form
      onSubmit={(e) => {
        if (step < 2) {
          e.preventDefault();
          setStep(step + 1);
        } else senden(e);
      }}
      className="relative rounded-[2rem] bg-white p-6 shadow-xl shadow-forest/5 sm:p-10"
    >
      <Honigtopf />
      {/* Alle Werte werden im letzten Schritt gesammelt übertragen */}
      {step === 2 &&
        (Object.entries(r) as [keyof R, R[keyof R]][]).map(([k, v]) =>
          Array.isArray(v) ? v.map((x) => <input key={`${k}-${x}`} type="hidden" name={k} value={x} />) : k === "beschreibung" ? null : <input key={k} type="hidden" name={k} value={v} />
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
        <div className="mt-8 grid gap-5">
          <div>
            <label className={labelCls}>Firmenname</label>
            <input required autoFocus value={r.firma} onChange={(e) => set("firma", e.target.value)} className={inputCls} placeholder="z. B. Tischlerei Muster" />
          </div>
          <div>
            <label className={labelCls}>Gewerk</label>
            <div className="flex flex-wrap gap-2">
              {GEWERKE.map((g) => (
                <button type="button" key={g.slug} onClick={() => setR((x) => ({ ...x, gewerk: g.slug, leistungen: [] }))} className={chip(r.gewerk === g.slug)}>
                  {g.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
            <div>
              <label className={labelCls}>Standort (PLZ und Ort)</label>
              <input required value={r.ort} onChange={(e) => set("ort", e.target.value)} className={inputCls} placeholder="z. B. 59348 Lüdinghausen" />
            </div>
            <div>
              <label className={labelCls}>Einsatzgebiet</label>
              <select value={r.radius} onChange={(e) => set("radius", e.target.value)} className={inputCls}>
                {["25", "50", "75", "100"].map((k) => <option key={k} value={k}>bis {k} km</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-8 grid gap-5">
          <div>
            <label className={labelCls}>Ansprechpartner</label>
            <input required autoFocus value={r.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Vor- und Nachname" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>E-Mail</label>
              <input required type="email" value={r.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Telefon</label>
              <input required type="tel" minLength={5} value={r.telefon} onChange={(e) => set("telefon", e.target.value)} className={inputCls} />
              <p className="mt-1.5 text-xs text-muted">Für das kurze Freischaltungsgespräch.</p>
            </div>
          </div>
          <div>
            <label className={labelCls}>Wann erreichen wir Sie am besten?</label>
            <div className="flex flex-wrap gap-2">
              {["Vormittags", "Mittags", "Nachmittags", "Egal"].map((z) => (
                <button type="button" key={z} onClick={() => set("rueckruf", z)} className={chip(r.rueckruf === z)}>{z}</button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Website <span className="font-normal text-muted">(optional)</span></label>
            <input value={r.website} onChange={(e) => set("website", e.target.value)} className={inputCls} placeholder="www.ihr-betrieb.de" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 grid gap-5">
          <div>
            <label className={labelCls}>Leistungen</label>
            <div className="flex flex-wrap gap-2">
              {(LEISTUNGS_VORSCHLAEGE[r.gewerk] ?? []).map((l) => {
                const on = r.leistungen.includes(l);
                return (
                  <button type="button" key={l} onClick={() => set("leistungen", on ? r.leistungen.filter((x) => x !== l) : [...r.leistungen, l])} className={chip(on)}>
                    {l}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className={labelCls}>Kurzbeschreibung <span className="font-normal text-muted">(optional)</span></label>
            <textarea name="beschreibung" rows={3} value={r.beschreibung} onChange={(e) => set("beschreibung", e.target.value)} className={inputCls} placeholder="Was zeichnet Ihren Betrieb aus?" />
          </div>
          <div className="rounded-2xl bg-mint/60 p-5">
            <label className={labelCls}>Haben Sie Projekte, in denen eine Lofttür oder Glastrennwand passen könnte?</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Ja, konkret geplant", "Gelegentlich", "Eher nicht"].map((z) => (
                <button type="button" key={z} onClick={() => set("lofttuer_bedarf", z)} className={chip(r.lofttuer_bedarf === z)}>{z}</button>
              ))}
            </div>
          </div>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
            <input required name="einwilligung" type="checkbox" className="mt-0.5 accent-[#213a34]" />
            <span>
              {EINWILLIGUNG_REGISTRIERUNG}{" "}
              <Link href="/partnerbedingungen" target="_blank" className="font-semibold text-forest underline">Partnerbedingungen</Link> ·{" "}
              <Link href="/datenschutz" target="_blank" className="font-semibold text-forest underline">Datenschutz</Link>
            </span>
          </label>
          <Meldung status={status} />
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-semibold text-muted hover:text-ink">← Zurück</button>
        ) : (
          <Link href="/fuer-partner" className="text-sm font-semibold text-muted hover:text-ink">← Abbrechen</Link>
        )}
        {step < 2 ? (
          <button disabled={step === 0 && !r.gewerk} className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-40">
            Weiter
          </button>
        ) : (
          <Absenden pending={pending}>Kostenlos registrieren</Absenden>
        )}
      </div>
    </form>
  );
}
