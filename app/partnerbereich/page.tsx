"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Chrome";
import { Check } from "@/components/PartnerCard";
import { statistik } from "@/lib/data";
import { DEMO, load, save, type Registrierung } from "@/lib/session";

type Tab = "uebersicht" | "profil" | "anfragen" | "statistik" | "siegel";
type Modal = null | "projekt" | "muster" | "showroom";

const TABS: [Tab, string][] = [
  ["uebersicht", "Übersicht"],
  ["profil", "Profil bearbeiten"],
  ["anfragen", "Anfragen"],
  ["statistik", "Statistik"],
  ["siegel", "Siegel"],
];

const DEMO_ANFRAGEN = [
  { name: "Familie Schulte", ort: "Lüdinghausen", datum: "24.10.2026", text: "Wir möchten zwischen Flur und Wohnzimmer eine Lofttür einsetzen und brauchen eine neue Laibung aus Eiche.", status: "Neu", lofttuer: true },
  { name: "J. Wiewel", ort: "Senden", datum: "19.10.2026", text: "Einbauschrank unter der Treppe, ca. 2,40 m breit, weiß lackiert.", status: "Beantwortet", lofttuer: false },
  { name: "M. & K. Bröker", ort: "Nordkirchen", datum: "11.10.2026", text: "Altbau-Sanierung: drei Innentüren, eine davon als Glastür. Zeitraum Frühjahr.", status: "Beantwortet", lofttuer: true },
];

const input = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-forest";

export default function Partnerbereich() {
  const [r, setR] = useState<Registrierung>(DEMO);
  const [neu, setNeu] = useState(false);
  const [tab, setTab] = useState<Tab>("uebersicht");
  const [modal, setModal] = useState<Modal>(null);
  const [erledigt, setErledigt] = useState<string[]>([]);
  const [logo, setLogo] = useState<string | null>(null);
  const [fotos, setFotos] = useState<string[]>([]);
  const [gespeichert, setGespeichert] = useState(false);
  const [kopiert, setKopiert] = useState(false);
  const [siegelVariante, setSiegelVariante] = useState<"hell" | "dunkel">("hell");

  useEffect(() => {
    const saved = load();
    if (saved) setR(saved);
    const p = new URLSearchParams(window.location.search);
    setNeu(p.has("neu"));
    const t = p.get("tab") as Tab | null;
    if (t && TABS.some(([k]) => k === t)) setTab(t);
  }, []);

  const todos = [
    ["Firmendaten", true],
    ["Kontakt & Telefon", Boolean(r.telefon)],
    ["Leistungen", r.leistungen.length > 0],
    ["Kurzbeschreibung", Boolean(r.beschreibung)],
    ["Logo hochladen", Boolean(logo)],
    ["3 Referenzfotos", fotos.length >= 3],
  ] as const;
  const pct = Math.round((todos.filter(([, d]) => d).length / todos.length) * 100);
  const initials = r.name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
  const stats = statistik(r.firma);
  const maxAufrufe = Math.max(...stats.map((s) => s.aufrufe));
  const summe = (k: "aufrufe" | "anfragen") => stats.reduce((a, s) => a + s[k], 0);

  const origin = typeof window !== "undefined" ? window.location.origin : "https://hyloft-partnernetzwerk.vercel.app";
  const profilUrl = `${origin}/partner/${r.firma.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const siegelCode = `<a href="${profilUrl}" target="_blank" rel="noopener" title="Von Hyloft geprüfter Partnerbetrieb">\n  <img src="${origin}/siegel/${siegelVariante}.svg" alt="Von Hyloft geprüft – Partner im Hyloft Partnernetz" width="200" height="80">\n</a>`;

  const leseDatei = (f: File) =>
    new Promise<string>((res) => {
      const fr = new FileReader();
      fr.onload = () => res(String(fr.result));
      fr.readAsDataURL(f);
    });

  const LEISTUNGEN = ["Einbaumöbel", "Innentüren", "Treppen", "Laibungen & Zargen", "Küchen", "Garderoben", "Wandpaneele"];

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
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map(([k, t]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`shrink-0 border-b-2 px-3 pb-3 pt-1 text-sm font-medium transition ${tab === k ? "border-forest text-forest" : "border-transparent text-muted hover:text-ink"}`}
            >
              {t}
              {k === "anfragen" && <span className="ml-1.5 rounded-full bg-forest px-1.5 py-0.5 text-[0.65rem] text-white">1</span>}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* ---------------- ÜBERSICHT ---------------- */}
        {tab === "uebersicht" && (
          <>
            {neu && (
              <div className="rise mb-8 rounded-3xl bg-forest p-6 text-white sm:p-8">
                <p className="text-xl font-semibold">Willkommen im Partnernetz, {r.name.split(" ")[0]}!</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">
                  Ihre Registrierung ist eingegangen. Wir rufen Sie innerhalb von 48 Stunden an
                  {r.rueckruf && r.rueckruf !== "Egal" ? ` (bevorzugt ${r.rueckruf.toLowerCase()})` : ""}, um Ihr Profil gemeinsam freizuschalten.
                </p>
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
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
                <ol className="mt-8">
                  {[
                    ["Registrierung eingegangen", "Ihre Angaben liegen uns vor.", "done"],
                    ["Freischaltungsgespräch", "Wir rufen Sie unter " + (r.telefon || "Ihrer Nummer") + " an – ca. 10 Minuten.", "current"],
                    ["Profil ist live", "Mit Siegel „Von Hyloft geprüft“ sichtbar für Bauherren.", "todo"],
                  ].map(([t, d, s], i, arr) => (
                    <li key={t} className="relative flex gap-4 pb-7 last:pb-0">
                      {i < arr.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-line" />}
                      <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${s === "done" ? "bg-forest text-mint" : s === "current" ? "bg-amber-100 text-amber-800 ring-4 ring-amber-50" : "bg-stone text-muted"}`}>
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
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${d ? "bg-mint text-forest" : "border border-line"}`}>{d && Check}</span>
                        {t}
                      </span>
                      {!d && <button onClick={() => setTab("profil")} className="text-xs font-semibold text-forest hover:underline">Ergänzen</button>}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {[
                ["Profilaufrufe (6 Monate)", String(summe("aufrufe")), "statistik"],
                ["Anfragen (6 Monate)", String(summe("anfragen")), "anfragen"],
                ["Siegel eingebunden", "Noch nicht", "siegel"],
              ].map(([k, v, t]) => (
                <button key={k} onClick={() => setTab(t as Tab)} className="rounded-3xl bg-white p-6 text-left transition hover:ring-1 hover:ring-forest/20">
                  <p className="text-xs text-muted">{k}</p>
                  <p className="mt-2 text-2xl font-semibold text-forest">{v}</p>
                  <p className="mt-2 text-xs font-semibold text-forest">Ansehen →</p>
                </button>
              ))}
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
                    Echte Stahlprofile, rahmenverschweißte Sprossen, 6 mm VSG. Als Partner bekommen Sie für jedes Projekt ein individuelles Angebot – inklusive Visualisierung und technischer Zeichnung.
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
                        <button key={k} onClick={() => !ok && setModal(k)} className={`rounded-2xl border p-4 text-left transition ${ok ? "border-mint-strong bg-mint" : "border-line hover:border-forest/40 hover:bg-mint/40"}`}>
                          <p className="flex items-center gap-2 font-semibold text-ink">{ok && <span className="text-forest">{Check}</span>}{t}</p>
                          <p className="mt-1 text-xs text-muted">{ok ? "Angefragt – wir melden uns" : d}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-3xl bg-white p-6 sm:p-8">
              <p className="eyebrow text-muted">Referenzprojekte mit Hyloft</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Haben Sie mit uns ein Projekt umgesetzt? Wir stellen gemeinsame Projekte mit Fotos ein und verknüpfen sie mit Ihrem Profil – Sie müssen nichts tun.
              </p>
              <div className="mt-5 rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">Noch keine gemeinsamen Projekte verknüpft.</div>
            </section>
          </>
        )}

        {/* ---------------- PROFIL ---------------- */}
        {tab === "profil" && (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                save(r);
                setGespeichert(true);
                setTimeout(() => setGespeichert(false), 2500);
              }}
              className="rounded-3xl bg-white p-6 sm:p-8"
            >
              <h1 className="text-2xl font-semibold">Profil bearbeiten</h1>
              <p className="mt-1 text-sm text-muted">Änderungen werden nach kurzer Prüfung durch Hyloft sichtbar.</p>

              <div className="mt-8 grid gap-5">
                <div className="flex items-center gap-5">
                  <label className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-stone text-xs text-muted hover:border-forest/40">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo} alt="Logo" className="h-full w-full object-contain p-2" />
                    ) : (
                      "Logo"
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => e.target.files?.[0] && setLogo(await leseDatei(e.target.files[0]))} />
                  </label>
                  <div className="text-sm">
                    <p className="font-medium">Firmenlogo</p>
                    <p className="text-muted">PNG oder SVG, quadratisch wirkt am besten.</p>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Firmenname</label>
                  <input value={r.firma} onChange={(e) => setR({ ...r, firma: e.target.value })} className={input} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Standort</label>
                    <input value={r.ort} onChange={(e) => setR({ ...r, ort: e.target.value })} className={input} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Einsatzgebiet</label>
                    <select value={r.radius} onChange={(e) => setR({ ...r, radius: e.target.value })} className={input}>
                      {["25", "50", "75", "100"].map((k) => <option key={k} value={k}>bis {k} km</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Kurzbeschreibung</label>
                  <textarea rows={4} value={r.beschreibung} onChange={(e) => setR({ ...r, beschreibung: e.target.value })} className={input} placeholder="Was zeichnet Ihren Betrieb aus?" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Leistungen</label>
                  <div className="flex flex-wrap gap-2">
                    {LEISTUNGEN.map((l) => {
                      const on = r.leistungen.includes(l);
                      return (
                        <button type="button" key={l} onClick={() => setR({ ...r, leistungen: on ? r.leistungen.filter((x) => x !== l) : [...r.leistungen, l] })}
                          className={`rounded-full border px-4 py-2 text-sm transition ${on ? "border-forest bg-forest text-white" : "border-line text-ink hover:border-forest/40"}`}>
                          {l}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Referenzfotos <span className="font-normal text-muted">({fotos.length}/6)</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    {fotos.map((f, i) => (
                      <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={f} alt="" className="h-full w-full object-cover" />
                        <button type="button" onClick={() => setFotos(fotos.filter((_, j) => j !== i))} className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-ink opacity-0 transition group-hover:opacity-100">
                          Entfernen
                        </button>
                      </div>
                    ))}
                    {fotos.length < 6 && (
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-line bg-stone text-xs text-muted hover:border-forest/40">
                        <span className="text-2xl leading-none text-forest">+</span>
                        Foto hinzufügen
                        <input type="file" accept="image/*" multiple className="hidden"
                          onChange={async (e) => {
                            const files = Array.from(e.target.files ?? []).slice(0, 6 - fotos.length);
                            const urls = await Promise.all(files.map(leseDatei));
                            setFotos([...fotos, ...urls]);
                          }} />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <button className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white hover:bg-forest-soft">Speichern</button>
                {gespeichert && <span className="text-sm font-medium text-forest">Gespeichert – wird von Hyloft geprüft.</span>}
              </div>
            </form>

            <aside className="lg:sticky lg:top-6 lg:self-start">
              <p className="eyebrow mb-3 text-muted">Vorschau in der Suche</p>
              <div className="overflow-hidden rounded-3xl border border-line bg-white">
                <div className="aspect-[16/10] bg-stone">
                  {fotos[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={fotos[0]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted">Erstes Referenzfoto</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-forest text-sm font-semibold text-mint">
                      {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logo} alt="" className="h-full w-full bg-white object-contain p-1" />
                      ) : (
                        r.firma.split(/\s+/).slice(0, 2).map((w) => w[0]).join("")
                      )}
                    </span>
                    <div>
                      <p className="eyebrow text-muted">{r.gewerk}</p>
                      <p className="mt-1 font-semibold">{r.firma}</p>
                      <p className="text-sm text-muted">{r.ort} · bis {r.radius} km</p>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm text-ink/80">{r.beschreibung || "Ihre Kurzbeschreibung erscheint hier."}</p>
                  <p className="mt-3 text-xs text-muted">{r.leistungen.join(" · ")}</p>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* ---------------- ANFRAGEN ---------------- */}
        {tab === "anfragen" && (
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <h1 className="text-2xl font-semibold">Anfragen</h1>
            <p className="mt-1 text-sm text-muted">Anfragen von Bauherren über Ihr Profil oder die Sammelanfrage. (Beispieldaten)</p>
            <ul className="mt-6 divide-y divide-line">
              {DEMO_ANFRAGEN.map((a) => (
                <li key={a.name} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{a.name}</p>
                      <span className="text-sm text-muted">· {a.ort} · {a.datum}</span>
                      {a.lofttuer && <span className="rounded-full bg-mint px-2 py-0.5 text-[0.7rem] font-semibold text-forest">plant Lofttür</span>}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">{a.text}</p>
                  </div>
                  <span className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-semibold ${a.status === "Neu" ? "bg-forest text-white" : "bg-stone text-muted"}`}>{a.status}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------------- STATISTIK ---------------- */}
        {tab === "statistik" && (
          <section className="rounded-3xl bg-white p-6 sm:p-8">
            <h1 className="text-2xl font-semibold">Statistik</h1>
            <p className="mt-1 text-sm text-muted">So oft wurde Ihr Profil in den letzten 6 Monaten gesehen. (Beispieldaten)</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Profilaufrufe", summe("aufrufe")],
                ["Anfragen", summe("anfragen")],
                ["Anfragequote", `${((summe("anfragen") / summe("aufrufe")) * 100).toFixed(1).replace(".", ",")} %`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-stone p-5">
                  <p className="text-xs text-muted">{k}</p>
                  <p className="mt-1 text-2xl font-semibold text-forest">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-5 text-xs text-muted">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-mint-strong" />Profilaufrufe</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-forest" />Anfragen</span>
              </div>
              <div className="mt-4 flex h-64 items-end gap-3 border-b border-line sm:gap-6">
                {stats.map((s) => (
                  <div key={s.monat} className="group flex flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-xs font-semibold text-forest opacity-0 transition group-hover:opacity-100">{s.aufrufe} / {s.anfragen}</span>
                    <div className="relative w-full max-w-14 rounded-t-lg bg-mint-strong" style={{ height: `${(s.aufrufe / maxAufrufe) * 200}px` }}>
                      <div className="absolute inset-x-0 bottom-0 rounded-t-lg bg-forest" style={{ height: `${Math.max(4, (s.anfragen / maxAufrufe) * 200 * 4)}px` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-3 sm:gap-6">
                {stats.map((s) => <span key={s.monat} className="flex-1 text-center text-xs text-muted">{s.monat}</span>)}
              </div>
              <p className="mt-4 text-xs text-muted">Anfragen zur besseren Lesbarkeit vierfach überhöht dargestellt.</p>
            </div>
          </section>
        )}

        {/* ---------------- SIEGEL ---------------- */}
        {tab === "siegel" && (
          <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="min-w-0 rounded-3xl bg-white p-6 sm:p-8">
              <h1 className="text-2xl font-semibold">Ihr Partner-Siegel</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Zeigen Sie auf Ihrer Website, dass Ihr Betrieb von Hyloft geprüft ist. Das Siegel verlinkt auf Ihr Profil im Partnernetz – Interessenten sehen sofort Ihr geprüftes Profil und Ihre Referenzen.
              </p>
              <div className="mt-6 inline-flex rounded-full border border-line p-1 text-sm font-medium">
                {(["hell", "dunkel"] as const).map((v) => (
                  <button key={v} onClick={() => setSiegelVariante(v)} className={`rounded-full px-4 py-1.5 capitalize ${siegelVariante === v ? "bg-forest text-white" : "text-muted"}`}>
                    {v}
                  </button>
                ))}
              </div>
              <div className={`mt-6 flex items-center justify-center rounded-2xl p-10 ${siegelVariante === "hell" ? "bg-stone" : "bg-ink"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/siegel/${siegelVariante}.svg`} alt="Von Hyloft geprüft" width={240} height={96} />
              </div>
              <p className="mt-4 text-xs text-muted">Verfügbar, sobald Ihr Profil freigeschaltet ist.</p>
            </div>
            <div className="min-w-0 rounded-3xl bg-white p-6 sm:p-8">
              <p className="font-semibold">Einbindungscode</p>
              <p className="mt-1 text-sm text-muted">Kopieren Sie den Code und fügen Sie ihn z. B. im Footer Ihrer Website ein.</p>
              <pre className="mt-5 whitespace-pre-wrap break-all rounded-2xl bg-forest-deep p-5 text-xs leading-relaxed text-mint">{siegelCode}</pre>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(siegelCode).catch(() => {});
                  setKopiert(true);
                  setTimeout(() => setKopiert(false), 2000);
                }}
                className="mt-4 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-soft"
              >
                {kopiert ? "Kopiert ✓" : "Code kopieren"}
              </button>
              <div className="mt-8 rounded-2xl bg-mint/60 p-5 text-sm leading-relaxed text-forest">
                <strong>Tipp:</strong> Binden Sie das Siegel dort ein, wo Kunden Vertrauen suchen – im Footer, auf der Referenzseite oder neben dem Kontaktformular.
              </div>
            </div>
          </section>
        )}

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
            <p className="text-xl font-semibold">{modal === "projekt" ? "Projekt anfragen" : modal === "muster" ? "Musterstück anfordern" : "Showroom-Termin"}</p>
            <p className="mt-1 text-sm text-muted">
              {modal === "projekt" ? "Wir erstellen ein individuelles Angebot und melden uns per E-Mail." : modal === "muster" ? "Wir senden Ihnen ein Profil-Musterstück kostenlos zu." : "Wir schlagen Ihnen per E-Mail Termine vor – gern mit Ihrem Kunden."}
            </p>
            <div className="mt-6 grid gap-3">
              {modal === "projekt" && (
                <>
                  <input required placeholder="Projektname / Bauvorhaben" className={input} />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Anzahl Türen" className={input} />
                    <input placeholder="Ausführung ab (Monat)" className={input} />
                  </div>
                  <textarea rows={3} placeholder="Maße, Türart, Besonderheiten" className={input} />
                </>
              )}
              {modal === "muster" && <textarea required rows={3} placeholder="Lieferadresse" defaultValue={`${r.firma}\n${r.ort}`} className={input} />}
              {modal === "showroom" && <input placeholder="Wunschzeitraum, z. B. KW 46" className={input} />}
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
