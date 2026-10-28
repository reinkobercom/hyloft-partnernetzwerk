"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Chrome";
import { Check } from "@/components/PartnerCard";
import { DEMO, load, type Registrierung } from "@/lib/session";

type Modal = null | "projekt" | "muster" | "showroom";

export default function Partnerbereich() {
  const [r, setR] = useState<Registrierung>(DEMO);
  const [neu, setNeu] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [erledigt, setErledigt] = useState<string[]>([]);

  useEffect(() => {
    const saved = load();
    if (saved) setR(saved);
    setNeu(new URLSearchParams(window.location.search).has("neu"));
  }, []);

  const todos = [
    ["Firmendaten", true],
    ["Kontakt & Telefon", Boolean(r.telefon)],
    ["Leistungen", r.leistungen.length > 0],
    ["Kurzbeschreibung", Boolean(r.beschreibung)],
    ["Logo hochladen", false],
    ["3 Referenzfotos", false],
  ] as const;
  const done = todos.filter(([, d]) => d).length;
  const pct = Math.round((done / todos.length) * 100);

  const initials = r.name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

  return (
    <div className="min-h-screen bg-stone">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:block">{r.name}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-xs font-semibold text-mint">{initials}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {neu && (
          <div className="rise mb-8 rounded-3xl bg-forest p-6 text-white sm:p-8">
            <p className="text-xl font-semibold">Willkommen im Partnernetz, {r.name.split(" ")[0]}!</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">
              Ihre Registrierung ist eingegangen. Wir rufen Sie innerhalb von 48 Stunden an
              {r.rueckruf && r.rueckruf !== "Egal" ? ` (bevorzugt ${r.rueckruf.toLowerCase()})` : ""}, um Ihr Profil gemeinsam
              freizuschalten.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Status */}
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-muted">Profilstatus</p>
                <h1 className="mt-1 text-2xl font-semibold">{r.firma}</h1>
                <p className="text-sm text-muted">{r.gewerk} · {r.ort}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                In Prüfung
              </span>
            </div>

            <ol className="mt-8 grid gap-0">
              {[
                ["Registrierung eingegangen", "Ihre Angaben liegen uns vor.", "done"],
                ["Freischaltungsgespräch", "Wir rufen Sie unter " + (r.telefon || "Ihrer Nummer") + " an – ca. 10 Minuten.", "current"],
                ["Profil ist live", "Mit Siegel „Von Hyloft geprüft“ sichtbar für Bauherren.", "todo"],
              ].map(([t, d, s], i, arr) => (
                <li key={t} className="relative flex gap-4 pb-7 last:pb-0">
                  {i < arr.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-line" />}
                  <span
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      s === "done" ? "bg-forest text-mint" : s === "current" ? "bg-amber-100 text-amber-800 ring-4 ring-amber-50" : "bg-stone text-muted"
                    }`}
                  >
                    {s === "done" ? Check : i + 1}
                  </span>
                  <div className="pt-1">
                    <p className={`font-semibold ${s === "todo" ? "text-muted" : ""}`}>{t}</p>
                    <p className="mt-0.5 text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Vollständigkeit */}
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <p className="eyebrow text-muted">Profil vervollständigen</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-semibold text-forest">{pct} %</p>
              <p className="text-xs text-muted">Vollständige Profile werden öfter angefragt</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone">
              <div className="h-full rounded-full bg-forest transition-all" style={{ width: `${pct}%` }} />
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              {todos.map(([t, d]) => (
                <li key={t} className="flex items-center justify-between">
                  <span className={`flex items-center gap-2.5 ${d ? "text-muted line-through decoration-line" : ""}`}>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full ${d ? "bg-mint text-forest" : "border border-line"}`}>
                      {d && Check}
                    </span>
                    {t}
                  </span>
                  {!d && <button className="text-xs font-semibold text-forest hover:underline">Ergänzen</button>}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Lofttüren für Ihre Projekte */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-white">
          <div className="grid lg:grid-cols-[1fr_1.6fr]">
            <div className="relative min-h-[220px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/p4.jpg" alt="Hyloft Lofttür" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow text-muted">Partnerservice von Hyloft</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Lofttüren für Ihre Projekte</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Echte Stahlprofile, rahmenverschweißte Sprossen, 6 mm VSG. Als Partner bekommen Sie für jedes Projekt ein
                individuelles Angebot – inklusive Visualisierung und technischer Zeichnung.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {(
                  [
                    ["projekt", "Projekt anfragen", "Angebot, Visualisierung & Zeichnung"],
                    ["muster", "Musterstück", "Kostenlos zu Ihnen ins Büro"],
                    ["showroom", "Showroom-Termin", "Bemusterung in Lüdinghausen"],
                  ] as const
                ).map(([k, t, d]) => {
                  const ok = erledigt.includes(k);
                  return (
                    <button
                      key={k}
                      onClick={() => !ok && setModal(k)}
                      className={`rounded-2xl border p-4 text-left transition ${ok ? "border-mint-strong bg-mint" : "border-line hover:border-forest/40 hover:bg-mint/40"}`}
                    >
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        {ok && <span className="text-forest">{Check}</span>}
                        {t}
                      </p>
                      <p className="mt-1 text-xs text-muted">{ok ? "Angefragt – wir melden uns" : d}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-col justify-between gap-3 rounded-3xl bg-white p-6 text-sm sm:flex-row sm:items-center">
          <p>
            <span className="font-semibold">Fragen?</span> <span className="text-muted">Ihr Hyloft-Team erreichen Sie unter</span>{" "}
            <a href="mailto:info@hyloft.de" className="font-semibold text-forest">info@hyloft.de</a>
          </p>
          <Link href="/" className="font-semibold text-muted hover:text-ink">Zur Partnersuche →</Link>
        </div>
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 p-4 backdrop-blur-sm sm:items-center" onClick={() => setModal(null)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              setErledigt((x) => [...x, modal]);
              setModal(null);
            }}
            className="rise w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8"
          >
            <p className="text-xl font-semibold">
              {modal === "projekt" ? "Projekt anfragen" : modal === "muster" ? "Musterstück anfordern" : "Showroom-Termin"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {modal === "projekt"
                ? "Wir erstellen ein individuelles Angebot und melden uns per E-Mail."
                : modal === "muster"
                ? "Wir senden Ihnen ein Profil-Musterstück kostenlos zu."
                : "Wir schlagen Ihnen per E-Mail Termine vor – gern mit Ihrem Kunden."}
            </p>
            <div className="mt-6 grid gap-3">
              {modal === "projekt" && (
                <>
                  <input required placeholder="Projektname / Bauvorhaben" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Anzahl Türen" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest" />
                    <input placeholder="Ausführung ab (Monat)" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest" />
                  </div>
                  <textarea rows={3} placeholder="Maße, Türart, Besonderheiten" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest" />
                </>
              )}
              {modal === "muster" && (
                <textarea required rows={3} placeholder="Lieferadresse" defaultValue={`${r.firma}\n${r.ort}`} className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest" />
              )}
              {modal === "showroom" && (
                <input placeholder="Wunschzeitraum, z. B. KW 46" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest" />
              )}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setModal(null)} className="rounded-full px-5 py-3 text-sm font-semibold text-muted">Abbrechen</button>
              <button className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-soft">Absenden</button>
            </div>
            <p className="mt-4 text-center text-xs text-muted">Prototyp – es wird nichts verschickt.</p>
          </form>
        </div>
      )}
    </div>
  );
}
