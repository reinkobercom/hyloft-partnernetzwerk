"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/Chrome";
import { Check } from "@/components/PartnerCard";
import { GEWERKE, PARTNER, REFERENZEN, gewerkBySlug, partnerBySlug, type Referenz } from "@/lib/data";
import { load } from "@/lib/session";
import { ladeAnfragen, neueId, type Anfrage } from "@/lib/store";

type Tab = "start" | "freischaltungen" | "partner" | "anfragen" | "referenzen" | "emails";

type Offen = {
  id: string;
  firma: string;
  gewerk: string;
  ort: string;
  name: string;
  telefon: string;
  rueckruf: string;
  lofttuerBedarf: string;
  datum: string;
};

const SEED_OFFEN: Offen[] = [
  { id: "o1", firma: "Schreinerei Lütke-Wöstmann", gewerk: "Tischlerei & Schreinerei", ort: "Nordkirchen", name: "Peter Lütke-Wöstmann", telefon: "02596 000000", rueckruf: "Vormittags", lofttuerBedarf: "Ja, konkret geplant", datum: "2026-10-27" },
  { id: "o2", firma: "Raumkonzept Vogt", gewerk: "Innenarchitektur", ort: "Münster", name: "Sarah Vogt", telefon: "0251 000000", rueckruf: "Nachmittags", lofttuerBedarf: "Gelegentlich", datum: "2026-10-26" },
  { id: "o3", firma: "Trockenbau Yilmaz", gewerk: "Trockenbau", ort: "Dortmund", name: "Emre Yilmaz", telefon: "0231 000000", rueckruf: "Egal", lofttuerBedarf: "Eher nicht", datum: "2026-10-25" },
];

const SEED_ANFRAGEN: Anfrage[] = [
  { id: "a1", datum: "2026-10-26T10:12:00Z", gewerke: ["tischlerei", "trockenbau"], art: "Umbau", zeitraum: "In 1–3 Monaten", beschreibung: "Wand zwischen Flur und Wohnzimmer öffnen, Lofttür mit Seitenteil, Laibung in Eiche.", ort: "Lüdinghausen", lofttuer: "Ja", name: "Familie Schulte", email: "schulte@example.de", telefon: "", partner: ["tischlerei-brockmann-luedinghausen", "wandwerk-trockenbau-werne"] },
  { id: "a2", datum: "2026-10-23T15:40:00Z", gewerke: ["innenarchitektur"], art: "Sanierung", zeitraum: "Noch offen", beschreibung: "Altbauwohnung, Grundriss öffnen, Küche zum Wohnraum hin.", ort: "Bochum", lofttuer: "Vielleicht", name: "T. Krüger", email: "krueger@example.de", telefon: "", partner: ["studio-lichtung-bochum"] },
  { id: "a3", datum: "2026-10-20T08:05:00Z", gewerke: ["boden"], art: "Renovierung", zeitraum: "So bald wie möglich", beschreibung: "Fischgrätparkett im Wohnzimmer, ca. 40 m².", ort: "Coesfeld", lofttuer: "Nein", name: "A. Bense", email: "bense@example.de", telefon: "", partner: ["parkettmanufaktur-terhorst-coesfeld"] },
];

const BILDER = ["/img/p1.jpg", "/img/p2.jpg", "/img/p3.jpg", "/img/p4.jpg", "/img/p5.jpg", "/img/p7.jpg", "/img/p8.jpg", "/img/p9.jpg", "/img/p11.jpg", "/img/p12.jpg", "/img/p13.jpg", "/img/p14.jpg"];

const EMAILS = [
  {
    key: "reg-partner",
    an: "Partner",
    ausloeser: "Nach der Registrierung",
    betreff: "Ihre Registrierung im Hyloft Partnernetz",
    text: "Guten Tag {Name},\n\nvielen Dank für Ihre Registrierung im Hyloft Partnernetz. Ihr Profil für {Firma} liegt uns vor.\n\nWir rufen Sie innerhalb von 48 Stunden unter {Telefon} an, um Ihr Profil gemeinsam zu prüfen und freizuschalten. Das Gespräch dauert etwa zehn Minuten.\n\nBis dahin können Sie Ihr Profil im Partnerbereich ergänzen – mit Logo und Referenzfotos wird es deutlich häufiger angefragt.\n\nViele Grüße\nIhr Hyloft-Team",
  },
  {
    key: "reg-intern",
    an: "Hyloft intern",
    ausloeser: "Nach der Registrierung",
    betreff: "Neue Registrierung: {Firma} ({Gewerk}, {Ort})",
    text: "Neue Partner-Registrierung\n\nFirma: {Firma}\nGewerk: {Gewerk}\nOrt: {Ort}\nAnsprechpartner: {Name}\nTelefon: {Telefon}\nRückruf: {Rückrufzeit}\nLofttür-Bedarf: {Lofttür-Bedarf}\n\n→ Freischaltungsanruf innerhalb von 48 Stunden.",
  },
  {
    key: "live",
    an: "Partner",
    ausloeser: "Nach der Freischaltung",
    betreff: "Ihr Profil ist jetzt live",
    text: "Guten Tag {Name},\n\nschön, dass wir gesprochen haben. Ihr Profil ist ab sofort im Hyloft Partnernetz sichtbar – mit dem Siegel „Von Hyloft geprüft“.\n\nIhr Siegel für die eigene Website finden Sie im Partnerbereich unter „Siegel“.\n\nViele Grüße\nIhr Hyloft-Team",
  },
  {
    key: "anfrage-betrieb",
    an: "Betrieb",
    ausloeser: "Neue Anfrage eines Bauherrn",
    betreff: "Neue Anfrage aus {Ort}: {Art}",
    text: "Guten Tag {Name},\n\nüber das Hyloft Partnernetz ist eine neue Anfrage für Sie eingegangen:\n\n{Beschreibung}\n\nOrt: {Ort} · Zeitraum: {Zeitraum}\n\nBitte melden Sie sich innerhalb von zwei Werktagen direkt beim Bauherrn.\n\nViele Grüße\nIhr Hyloft-Team",
  },
  {
    key: "anfrage-bauherr",
    an: "Bauherr",
    ausloeser: "Nach dem Absenden einer Anfrage",
    betreff: "Ihre Anfrage ist unterwegs",
    text: "Guten Tag {Name},\n\nvielen Dank für Ihre Anfrage. Folgende Betriebe haben Ihre Projektbeschreibung erhalten:\n\n{Betriebe}\n\nSie melden sich in der Regel innerhalb von zwei Werktagen bei Ihnen.\n\nViele Grüße\nIhr Hyloft-Team",
  },
];

export default function Admin() {
  const [tab, setTab] = useState<Tab>("start");
  const [offen, setOffen] = useState<Offen[]>(SEED_OFFEN);
  const [status, setStatus] = useState<Record<string, "live" | "gesperrt">>(Object.fromEntries(PARTNER.map((p) => [p.slug, "live"])));
  const [anfragen, setAnfragen] = useState<Anfrage[]>(SEED_ANFRAGEN);
  const [refs, setRefs] = useState<Referenz[]>(REFERENZEN);
  const [neueRef, setNeueRef] = useState({ titel: "", ort: "", tuer: "", bild: BILDER[0], partner: [] as string[] });
  const [mail, setMail] = useState(EMAILS[0].key);
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const reg = load();
    if (reg) setOffen((o) => [{ id: "neu", firma: reg.firma, gewerk: reg.gewerk, ort: reg.ort, name: reg.name, telefon: reg.telefon, rueckruf: reg.rueckruf, lofttuerBedarf: reg.lofttuerBedarf || "—", datum: reg.datum.slice(0, 10) }, ...o]);
    const eigene = ladeAnfragen();
    if (eigene.length) setAnfragen((a) => [...eigene, ...a]);
  }, []);

  const zeige = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 2500);
  };

  const partnerGefiltert = useMemo(
    () => PARTNER.filter((p) => !filter || p.gewerk === filter),
    [filter]
  );

  const loftLeads = anfragen.filter((a) => a.lofttuer !== "Nein").length;

  const TABS: [Tab, string, number?][] = [
    ["start", "Übersicht"],
    ["freischaltungen", "Freischaltungen", offen.length],
    ["partner", "Partner"],
    ["anfragen", "Anfragen", anfragen.length],
    ["referenzen", "Referenzprojekte"],
    ["emails", "E-Mails"],
  ];

  const input = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest";
  const aktiveMail = EMAILS.find((m) => m.key === mail)!;

  return (
    <div className="min-h-screen bg-stone">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="rounded-full bg-forest px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-mint">Admin</span>
          </div>
          <Link href="/" className="text-sm font-medium text-muted hover:text-ink">Zur Website →</Link>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map(([k, t, n]) => (
            <button key={k} onClick={() => setTab(k)} className={`shrink-0 border-b-2 px-3 pb-3 pt-1 text-sm font-medium ${tab === k ? "border-forest text-forest" : "border-transparent text-muted hover:text-ink"}`}>
              {t}
              {n !== undefined && n > 0 && <span className="ml-1.5 rounded-full bg-stone px-1.5 py-0.5 text-[0.65rem] text-ink">{n}</span>}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {tab === "start" && (
          <>
            <h1 className="text-2xl font-semibold">Guten Tag!</h1>
            <p className="mt-1 text-sm text-muted">Das steht heute im Partnernetz an. (Prototyp mit Beispieldaten)</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Offene Freischaltungen", offen.length, "freischaltungen", "Anrufe ausstehend"],
                ["Aktive Partner", Object.values(status).filter((s) => s === "live").length, "partner", "im Partnernetz"],
                ["Anfragen (30 Tage)", anfragen.length, "anfragen", "von Bauherren"],
                ["Lofttür-Leads", loftLeads, "anfragen", "Bauherren planen eine Lofttür"],
              ].map(([k, v, t, d]) => (
                <button key={k as string} onClick={() => setTab(t as Tab)} className="rounded-3xl bg-white p-6 text-left hover:ring-1 hover:ring-forest/20">
                  <p className="text-xs text-muted">{k}</p>
                  <p className="mt-2 text-3xl font-semibold text-forest">{v}</p>
                  <p className="mt-1 text-xs text-muted">{d}</p>
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-6">
                <p className="font-semibold">Nächste Anrufe</p>
                <ul className="mt-4 divide-y divide-line text-sm">
                  {offen.slice(0, 4).map((o) => (
                    <li key={o.id} className="flex items-center justify-between py-3">
                      <span><span className="font-medium">{o.firma}</span> <span className="text-muted">· {o.ort}</span></span>
                      <span className="text-xs text-muted">{o.rueckruf}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-white p-6">
                <p className="font-semibold">Neueste Lofttür-Leads</p>
                <ul className="mt-4 divide-y divide-line text-sm">
                  {anfragen.filter((a) => a.lofttuer !== "Nein").slice(0, 4).map((a) => (
                    <li key={a.id} className="flex items-center justify-between py-3">
                      <span><span className="font-medium">{a.name}</span> <span className="text-muted">· {a.ort}</span></span>
                      <span className="rounded-full bg-mint px-2 py-0.5 text-[0.7rem] font-semibold text-forest">Lofttür: {a.lofttuer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {tab === "freischaltungen" && (
          <section>
            <h1 className="text-2xl font-semibold">Freischaltungen</h1>
            <p className="mt-1 text-sm text-muted">Neue Registrierungen warten auf das Freischaltungsgespräch.</p>
            {offen.length === 0 ? (
              <div className="mt-6 rounded-3xl bg-white p-10 text-center text-muted">Alles erledigt – keine offenen Freischaltungen.</div>
            ) : (
              <div className="mt-6 grid gap-4">
                {offen.map((o) => (
                  <div key={o.id} className="grid gap-4 rounded-3xl bg-white p-6 lg:grid-cols-[1.4fr_1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold">{o.firma}</p>
                        {o.id === "neu" && <span className="rounded-full bg-forest px-2 py-0.5 text-[0.65rem] font-semibold text-white">Ihre Test-Registrierung</span>}
                      </div>
                      <p className="text-sm text-muted">{o.gewerk} · {o.ort} · registriert am {new Date(o.datum).toLocaleDateString("de-DE")}</p>
                    </div>
                    <div className="text-sm">
                      <p><span className="text-muted">Kontakt:</span> {o.name}</p>
                      <p><span className="text-muted">Telefon:</span> {o.telefon} <span className="text-muted">({o.rueckruf})</span></p>
                      <p><span className="text-muted">Lofttür-Bedarf:</span> <span className={o.lofttuerBedarf.startsWith("Ja") ? "font-semibold text-forest" : ""}>{o.lofttuerBedarf}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setOffen(offen.filter((x) => x.id !== o.id)); zeige(`${o.firma} abgelehnt`); }} className="rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted hover:text-ink">
                        Ablehnen
                      </button>
                      <button onClick={() => { setOffen(offen.filter((x) => x.id !== o.id)); zeige(`${o.firma} freigeschaltet – Bestätigungsmail (Vorschau)`); }} className="rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-soft">
                        Anruf erledigt · Freischalten
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === "partner" && (
          <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-2xl font-semibold">Partner</h1>
                <p className="mt-1 text-sm text-muted">{PARTNER.length} Betriebe im Partnernetz</p>
              </div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full border border-line bg-white px-4 py-2 text-sm">
                <option value="">Alle Gewerke</option>
                {GEWERKE.map((g) => <option key={g.slug} value={g.slug}>{g.name}</option>)}
              </select>
            </div>
            <div className="mt-6 overflow-x-auto rounded-3xl bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Betrieb</th>
                    <th className="px-4 py-4 font-semibold">Gewerk</th>
                    <th className="px-4 py-4 font-semibold">Ort</th>
                    <th className="px-4 py-4 font-semibold">Geprüft</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {partnerGefiltert.map((p) => (
                    <tr key={p.slug}>
                      <td className="px-6 py-4 font-medium">{p.firma}</td>
                      <td className="px-4 py-4 text-muted">{gewerkBySlug(p.gewerk)?.name}</td>
                      <td className="px-4 py-4 text-muted">{p.ort}</td>
                      <td className="px-4 py-4">{p.verifiziert ? <span className="text-forest">{Check}</span> : <span className="text-muted">–</span>}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setStatus({ ...status, [p.slug]: status[p.slug] === "live" ? "gesperrt" : "live" })}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${status[p.slug] === "live" ? "bg-mint text-forest" : "bg-red-50 text-red-700"}`}
                        >
                          {status[p.slug] === "live" ? "Live" : "Gesperrt"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/partner/${p.slug}`} className="text-xs font-semibold text-forest hover:underline">Profil →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "anfragen" && (
          <section>
            <h1 className="text-2xl font-semibold">Anfragen</h1>
            <p className="mt-1 text-sm text-muted">Alle Anfragen von Bauherren. Lofttür-Leads sind markiert.</p>
            <div className="mt-6 grid gap-4">
              {anfragen.map((a) => (
                <div key={a.id} className={`rounded-3xl bg-white p-6 ${a.lofttuer !== "Nein" ? "ring-1 ring-mint-strong" : ""}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{a.name}</p>
                    <span className="text-sm text-muted">· {a.ort} · {new Date(a.datum).toLocaleDateString("de-DE")}</span>
                    {a.lofttuer !== "Nein" && <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.7rem] font-semibold text-white">Lofttür: {a.lofttuer}</span>}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{a.beschreibung}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-stone px-2.5 py-1 text-muted">{a.art || "–"}</span>
                    <span className="rounded-full bg-stone px-2.5 py-1 text-muted">{a.zeitraum || "–"}</span>
                    {a.gewerke.map((g) => <span key={g} className="rounded-full bg-stone px-2.5 py-1 text-muted">{gewerkBySlug(g)?.plural}</span>)}
                  </div>
                  <p className="mt-4 text-xs text-muted">
                    Weitergeleitet an: {a.partner.map((s) => partnerBySlug(s)?.firma ?? s).join(", ") || "– (persönliche Vermittlung)"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "referenzen" && (
          <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div>
              <h1 className="text-2xl font-semibold">Referenzprojekte</h1>
              <p className="mt-1 text-sm text-muted">Gemeinsame Projekte mit Hyloft-Tür – erscheinen im Profil der verknüpften Partner.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {refs.map((r) => (
                  <div key={r.id} className="overflow-hidden rounded-3xl bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.bild} alt="" className="aspect-[16/10] w-full object-cover" />
                    <div className="p-5">
                      <p className="font-semibold leading-snug">{r.titel}</p>
                      <p className="mt-1 text-xs text-muted">{r.ort} · {r.jahr} · {r.tuer}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {r.partner.map((s) => <span key={s} className="rounded-full bg-mint px-2.5 py-1 text-[0.7rem] font-semibold text-forest">{partnerBySlug(s)?.firma}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRefs([{ id: neueId(), jahr: 2026, ...neueRef }, ...refs]);
                setNeueRef({ titel: "", ort: "", tuer: "", bild: BILDER[0], partner: [] });
                zeige("Referenzprojekt angelegt und verknüpft");
              }}
              className="self-start rounded-3xl bg-white p-6 lg:sticky lg:top-6"
            >
              <p className="font-semibold">Neues Referenzprojekt</p>
              <div className="mt-4 grid gap-3">
                <input required value={neueRef.titel} onChange={(e) => setNeueRef({ ...neueRef, titel: e.target.value })} placeholder="Titel" className={input} />
                <div className="grid grid-cols-2 gap-3">
                  <input required value={neueRef.ort} onChange={(e) => setNeueRef({ ...neueRef, ort: e.target.value })} placeholder="Ort" className={input} />
                  <input value={neueRef.tuer} onChange={(e) => setNeueRef({ ...neueRef, tuer: e.target.value })} placeholder="Türart" className={input} />
                </div>
                <p className="mt-2 text-xs font-medium text-muted">Foto</p>
                <div className="grid grid-cols-4 gap-2">
                  {BILDER.map((b) => (
                    <button type="button" key={b} onClick={() => setNeueRef({ ...neueRef, bild: b })} className={`overflow-hidden rounded-lg ring-2 ${neueRef.bild === b ? "ring-forest" : "ring-transparent"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b} alt="" className="aspect-square w-full object-cover" />
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs font-medium text-muted">Partner verknüpfen</p>
                <div className="max-h-44 space-y-1 overflow-auto rounded-xl border border-line p-2">
                  {PARTNER.map((p) => {
                    const on = neueRef.partner.includes(p.slug);
                    return (
                      <label key={p.slug} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-stone">
                        <input type="checkbox" checked={on} onChange={() => setNeueRef({ ...neueRef, partner: on ? neueRef.partner.filter((x) => x !== p.slug) : [...neueRef.partner, p.slug] })} className="accent-[#213a34]" />
                        {p.firma}
                      </label>
                    );
                  })}
                </div>
                <button disabled={neueRef.partner.length === 0} className="mt-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-soft disabled:opacity-40">
                  Anlegen & verknüpfen
                </button>
              </div>
            </form>
          </section>
        )}

        {tab === "emails" && (
          <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div>
              <h1 className="text-2xl font-semibold">E-Mails</h1>
              <p className="mt-1 text-sm text-muted">Automatische Benachrichtigungen. Versand wird später angebunden.</p>
              <div className="mt-6 grid gap-2">
                {EMAILS.map((m) => (
                  <button key={m.key} onClick={() => setMail(m.key)} className={`rounded-2xl p-4 text-left transition ${mail === m.key ? "bg-forest text-white" : "bg-white hover:ring-1 hover:ring-forest/20"}`}>
                    <p className="text-sm font-semibold">{m.betreff}</p>
                    <p className={`mt-1 text-xs ${mail === m.key ? "text-white/70" : "text-muted"}`}>An: {m.an} · {m.ausloeser}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="self-start rounded-3xl bg-white p-6 sm:p-8">
              <div className="border-b border-line pb-4 text-sm">
                <p><span className="text-muted">Von:</span> Hyloft Partnernetz &lt;partner@hyloft.de&gt;</p>
                <p className="mt-1"><span className="text-muted">An:</span> {aktiveMail.an}</p>
                <p className="mt-1"><span className="text-muted">Betreff:</span> <span className="font-semibold">{aktiveMail.betreff}</span></p>
              </div>
              <div className="mt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/logo-forest.png" alt="Hyloft" className="h-4 w-auto" />
                <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink/85">
                  {aktiveMail.text.split(/(\{[^}]+\})/).map((t, i) =>
                    t.startsWith("{") ? <mark key={i} className="rounded bg-mint px-1 text-forest">{t}</mark> : <span key={i}>{t}</span>
                  )}
                </pre>
              </div>
              <p className="mt-8 text-xs text-muted">Platzhalter in grün werden beim Versand automatisch ersetzt.</p>
            </div>
          </section>
        )}
      </main>

      {toast && (
        <div className="rise fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-xl">{toast}</div>
      )}
    </div>
  );
}
