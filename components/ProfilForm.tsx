"use client";

import { useState } from "react";
import { GEWERKE, LEISTUNGS_VORSCHLAEGE } from "@/lib/data";
import { Absenden, Meldung, inputCls, labelCls, useFormular } from "./Formular";
import { FotosUpload, LogoUpload } from "./BildUpload";

export type ProfilWerte = {
  id?: string;
  firma: string;
  gewerk: string;
  ort: string;
  plz: string;
  radius_km: number;
  inhaber: string;
  telefon: string;
  email: string;
  website: string;
  claim: string;
  beschreibung: string;
  leistungen: string[];
  seit: number | null;
  mitarbeiter: string;
  logo_id: string | null;
  bilder: string[];
  lofttuer_erfahrung: boolean;
  // nur Admin
  status?: "entwurf" | "live" | "gesperrt";
  verifiziert?: boolean;
  notiz_intern?: string;
};

type Status = { fehler?: string; ok?: string } | null;

export default function ProfilForm({
  werte,
  action,
  admin = false,
  knopf = "Speichern",
  registrierung,
}: {
  werte: ProfilWerte;
  action: (s: Status, fd: FormData) => Promise<Status>;
  admin?: boolean;
  knopf?: string;
  registrierung?: string;
}) {
  const { status, onSubmit, pending } = useFormular(action);
  const [gewerk, setGewerk] = useState(werte.gewerk);
  const [leistungen, setLeistungen] = useState<string[]>(werte.leistungen);
  const [eigene, setEigene] = useState("");
  const [logo, setLogo] = useState<string | null>(werte.logo_id);
  const [bilder, setBilder] = useState<string[]>(werte.bilder);
  const vorschlaege = [...new Set([...(LEISTUNGS_VORSCHLAEGE[gewerk] ?? []), ...leistungen])];
  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm transition ${on ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest/40"}`;

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {werte.id && <input type="hidden" name="id" value={werte.id} />}
      {registrierung && <input type="hidden" name="registrierung" value={registrierung} />}
      <input type="hidden" name="gewerk" value={gewerk} />
      <input type="hidden" name="logo_id" value={logo ?? ""} />
      {bilder.map((b) => <input key={b} type="hidden" name="bilder" value={b} />)}
      {leistungen.map((l) => <input key={l} type="hidden" name="leistungen" value={l} />)}

      {admin && (
        <div className="grid gap-4 rounded-2xl bg-stone p-5 sm:grid-cols-3">
          <div>
            <label className={labelCls}>Status</label>
            <select name="status" defaultValue={werte.status ?? "entwurf"} className={inputCls}>
              <option value="entwurf">Entwurf (nicht sichtbar)</option>
              <option value="live">Live (öffentlich)</option>
              <option value="gesperrt">Gesperrt</option>
            </select>
          </div>
          <label className="flex items-center gap-3 self-end pb-3 text-sm">
            <input type="checkbox" name="verifiziert" defaultChecked={werte.verifiziert ?? true} className="h-4 w-4 accent-[#213a34]" />
            Siegel „Von Hyloft geprüft“
          </label>
          <div className="sm:col-span-3">
            <label className={labelCls}>Interne Notiz <span className="font-normal text-muted">(nur für Hyloft sichtbar)</span></label>
            <textarea name="notiz_intern" rows={2} defaultValue={werte.notiz_intern ?? ""} className={inputCls} />
          </div>
        </div>
      )}

      <LogoUpload wert={logo} onChange={setLogo} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Firmenname *</label>
          <input name="firma" required defaultValue={werte.firma} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Gewerk *</label>
          <div className="flex flex-wrap gap-2">
            {GEWERKE.map((g) => (
              <button type="button" key={g.slug} onClick={() => setGewerk(g.slug)} className={chip(gewerk === g.slug)}>{g.name}</button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelCls}>PLZ *</label>
          <input name="plz" required inputMode="numeric" pattern="\d{5}" defaultValue={werte.plz} className={inputCls} placeholder="59348" />
        </div>
        <div>
          <label className={labelCls}>Ort *</label>
          <input name="ort" required defaultValue={werte.ort} className={inputCls} placeholder="Lüdinghausen" />
        </div>
        <div>
          <label className={labelCls}>Einsatzgebiet</label>
          <select name="radius_km" defaultValue={String(werte.radius_km || 50)} className={inputCls}>
            {[25, 50, 75, 100, 150].map((k) => <option key={k} value={k}>bis {k} km</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Ansprechpartner</label>
          <input name="inhaber" defaultValue={werte.inhaber} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Telefon <span className="font-normal text-muted">(öffentlich)</span></label>
          <input name="telefon" type="tel" defaultValue={werte.telefon} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>E-Mail für Anfragen *</label>
          <input name="email" type="email" required defaultValue={werte.email} className={inputCls} />
          <p className="mt-1 text-xs text-muted">Hierhin senden wir Anfragen von Bauherren. Wird nicht öffentlich angezeigt.</p>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Website</label>
          <input name="website" defaultValue={werte.website} className={inputCls} placeholder="www.ihr-betrieb.de" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Kurzer Leitsatz <span className="font-normal text-muted">(max. 160 Zeichen)</span></label>
          <input name="claim" maxLength={160} defaultValue={werte.claim} className={inputCls} placeholder="z. B. Meisterbetrieb für Einbaumöbel und Innenausbau." />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Beschreibung</label>
          <textarea name="beschreibung" rows={5} maxLength={3000} defaultValue={werte.beschreibung} className={inputCls} placeholder="Was zeichnet Ihren Betrieb aus? Welche Projekte machen Sie am liebsten?" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Leistungen</label>
          <div className="flex flex-wrap gap-2">
            {vorschlaege.map((l) => {
              const on = leistungen.includes(l);
              return (
                <button type="button" key={l} onClick={() => setLeistungen(on ? leistungen.filter((x) => x !== l) : [...leistungen, l])} className={chip(on)}>{l}</button>
              );
            })}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={eigene} onChange={(e) => setEigene(e.target.value)} className={inputCls} placeholder="Eigene Leistung hinzufügen" />
            <button
              type="button"
              onClick={() => {
                const v = eigene.trim();
                if (v && !leistungen.includes(v)) setLeistungen([...leistungen, v]);
                setEigene("");
              }}
              className="shrink-0 rounded-xl border border-line px-4 text-sm font-semibold text-forest hover:bg-mint"
            >
              Hinzufügen
            </button>
          </div>
        </div>
        <div>
          <label className={labelCls}>Gegründet (Jahr)</label>
          <input name="seit" inputMode="numeric" defaultValue={werte.seit ?? ""} className={inputCls} placeholder="z. B. 2004" />
        </div>
        <div>
          <label className={labelCls}>Mitarbeitende</label>
          <select name="mitarbeiter" defaultValue={werte.mitarbeiter} className={inputCls}>
            {["", "1–3", "4–6", "7–10", "11–20", "21–50", "über 50"].map((m) => <option key={m} value={m}>{m || "–"}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-3 text-sm sm:col-span-2">
          <input type="checkbox" name="lofttuer_erfahrung" defaultChecked={werte.lofttuer_erfahrung} className="h-4 w-4 accent-[#213a34]" />
          Wir haben Erfahrung mit Lofttüren bzw. Stahl-Glas-Elementen
        </label>
      </div>

      <div>
        <label className={labelCls}>Referenzfotos <span className="font-normal text-muted">({bilder.length}/6 – das erste Foto erscheint in der Suche)</span></label>
        <FotosUpload werte={bilder} onChange={setBilder} />
        {!admin && <p className="mt-2 text-xs text-muted">Bitte nur eigene Fotos hochladen, an denen Sie die Rechte haben.</p>}
      </div>

      <Meldung status={status} />
      <div>
        <Absenden pending={pending}>{knopf}</Absenden>
      </div>
    </form>
  );
}
