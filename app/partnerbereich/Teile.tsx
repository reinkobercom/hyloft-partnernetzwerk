"use client";

import { useState } from "react";
import { serviceAnfrage } from "./actions";
import { passwortAendern, abmelden } from "../login/actions";
import { Check } from "@/components/PartnerCard";
import { Absenden, Meldung, inputCls, useFormular } from "@/components/Formular";

type Typ = "projekt" | "muster" | "showroom";

export function ServiceKarten({ firma, ort }: { firma: string; ort: string }) {
  const [modal, setModal] = useState<Typ | null>(null);
  const [erledigt, setErledigt] = useState<string[]>([]);
  const { status, onSubmit: action, pending: serviceLaeuft } = useFormular(async (s: { fehler?: string; ok?: string } | null, fd: FormData) => {
    const r = await serviceAnfrage(s, fd);
    if (r?.ok) {
      setErledigt((x) => [...x, r.ok!]);
      setModal(null);
    }
    return r;
  });

  const karten: [Typ, string, string][] = [
    ["projekt", "Projekt anfragen", "Angebot, Visualisierung & Zeichnung"],
    ["muster", "Musterstück", "Kostenlos zu Ihnen ins Büro"],
    ["showroom", "Showroom-Termin", "Bemusterung in Lüdinghausen"],
  ];

  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {karten.map(([k, t, d]) => {
          const ok = erledigt.includes(k);
          return (
            <button key={k} type="button" onClick={() => !ok && setModal(k)} className={`rounded-2xl border p-4 text-left transition ${ok ? "border-mint-strong bg-mint" : "border-line hover:border-forest/40 hover:bg-mint/40"}`}>
              <p className="flex items-center gap-2 font-semibold text-ink">{ok && <span className="text-forest">{Check}</span>}{t}</p>
              <p className="mt-1 text-xs text-muted">{ok ? "Angefragt – wir melden uns" : d}</p>
            </button>
          );
        })}
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 p-4 backdrop-blur-sm sm:items-center" onClick={() => setModal(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={action} className="rise w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8">
            <input type="hidden" name="typ" value={modal} />
            <p className="text-xl font-semibold">{modal === "projekt" ? "Projekt anfragen" : modal === "muster" ? "Musterstück anfordern" : "Showroom-Termin"}</p>
            <p className="mt-1 text-sm text-muted">
              {modal === "projekt" ? "Wir erstellen ein individuelles Angebot und melden uns per E-Mail." : modal === "muster" ? "Wir senden Ihnen ein Profil-Musterstück kostenlos zu." : "Wir schlagen Ihnen Termine vor – gern gemeinsam mit Ihrem Kunden."}
            </p>
            <div className="mt-6 grid gap-3">
              {modal === "projekt" && (
                <>
                  <input name="projekt" required placeholder="Projektname / Bauvorhaben" className={inputCls} />
                  <div className="grid grid-cols-2 gap-3">
                    <input name="anzahl" placeholder="Anzahl Türen" className={inputCls} />
                    <input name="ab" placeholder="Ausführung ab (Monat)" className={inputCls} />
                  </div>
                  <textarea name="details" rows={3} placeholder="Maße, Türart, Besonderheiten" className={inputCls} />
                </>
              )}
              {modal === "muster" && <textarea name="adresse" required rows={3} placeholder="Lieferadresse" defaultValue={`${firma}\n${ort}`} className={inputCls} />}
              {modal === "showroom" && <input name="zeitraum" required placeholder="Wunschzeitraum, z. B. KW 46" className={inputCls} />}
              <Meldung status={status?.fehler ? status : null} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setModal(null)} className="rounded-full px-5 py-3 text-sm font-semibold text-muted">Abbrechen</button>
              <Absenden pending={serviceLaeuft}>Absenden</Absenden>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export function SiegelCode({ profilUrl, origin }: { profilUrl: string; origin: string }) {
  const [variante, setVariante] = useState<"hell" | "dunkel">("hell");
  const [kopiert, setKopiert] = useState(false);
  const code = `<a href="${profilUrl}" target="_blank" rel="noopener" title="Von Hyloft geprüfter Partnerbetrieb">\n  <img src="${origin}/siegel/${variante}.svg" alt="Von Hyloft geprüft – Partner im Hyloft Partnernetz" width="200" height="80">\n</a>`;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="min-w-0 rounded-3xl bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-semibold">Ihr Partner-Siegel</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">Zeigen Sie auf Ihrer Website, dass Ihr Betrieb von Hyloft geprüft ist. Das Siegel verlinkt auf Ihr Profil im Partnernetz.</p>
        <div className="mt-6 inline-flex rounded-full border border-line p-1 text-sm font-medium">
          {(["hell", "dunkel"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setVariante(v)} className={`rounded-full px-4 py-1.5 capitalize ${variante === v ? "bg-forest text-white" : "text-muted"}`}>{v}</button>
          ))}
        </div>
        <div className={`mt-6 flex items-center justify-center rounded-2xl p-10 ${variante === "hell" ? "bg-stone" : "bg-ink"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/siegel/${variante}.svg`} alt="Von Hyloft geprüft" width={240} height={96} />
        </div>
      </div>
      <div className="min-w-0 rounded-3xl bg-white p-6 sm:p-8">
        <p className="font-semibold">Einbindungscode</p>
        <p className="mt-1 text-sm text-muted">Kopieren Sie den Code und fügen Sie ihn z. B. im Footer Ihrer Website ein.</p>
        <pre className="mt-5 whitespace-pre-wrap break-all rounded-2xl bg-forest-deep p-5 text-xs leading-relaxed text-mint">{code}</pre>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code).catch(() => {});
            setKopiert(true);
            setTimeout(() => setKopiert(false), 2000);
          }}
          className="mt-4 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
        >
          {kopiert ? "Kopiert ✓" : "Code kopieren"}
        </button>
        <p className="mt-6 text-xs leading-relaxed text-muted">Das Siegel darf nur unverändert und nur während einer aktiven Partnerschaft verwendet werden (siehe Partnerbedingungen).</p>
      </div>
    </div>
  );
}

export function PasswortForm({ hatPasswort }: { hatPasswort: boolean }) {
  const { status, onSubmit, pending } = useFormular(passwortAendern);
  return (
    <form onSubmit={onSubmit} className="grid max-w-md gap-3">
      {hatPasswort && <input name="alt" type="password" required autoComplete="current-password" placeholder="Aktuelles Passwort" className={inputCls} />}
      <input name="neu" type="password" required minLength={10} autoComplete="new-password" placeholder="Neues Passwort (mind. 10 Zeichen)" className={inputCls} />
      <input name="neu2" type="password" required autoComplete="new-password" placeholder="Neues Passwort wiederholen" className={inputCls} />
      <Meldung status={status} />
      <div><Absenden pending={pending}>Passwort speichern</Absenden></div>
    </form>
  );
}

export function AbmeldenKnopf() {
  return (
    <form action={abmelden}>
      <button className="text-sm font-medium text-muted hover:text-ink">Abmelden</button>
    </form>
  );
}
