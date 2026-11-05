"use client";

import Link from "next/link";
import { useState } from "react";
import { anfrageSenden } from "@/app/actions";
import { Absenden, Honigtopf, Meldung, inputCls, useFormular } from "./Formular";
import { EINWILLIGUNG_ANFRAGE, EINWILLIGUNG_LOFTTUER } from "@/lib/rechtstexte";

export default function ContactForm({ firma, slug, gewerk }: { firma: string; slug: string; gewerk: string }) {
  const { status, onSubmit, pending } = useFormular(anfrageSenden);
  const [loft, setLoft] = useState(false);

  if (status?.ok)
    return (
      <div className="rounded-3xl bg-mint p-7">
        <p className="text-lg font-semibold text-forest">Anfrage gesendet</p>
        <p className="mt-2 text-sm leading-relaxed text-forest/80">{firma} meldet sich in der Regel innerhalb von zwei Werktagen bei Ihnen. Eine Bestätigung haben wir Ihnen per E-Mail geschickt.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="relative rounded-3xl border border-line bg-white p-6 sm:p-7">
      <Honigtopf />
      <input type="hidden" name="quelle" value="profil" />
      <input type="hidden" name="partner" value={slug} />
      <input type="hidden" name="gewerke" value={gewerk} />
      <input type="hidden" name="lofttuer" value={loft ? "Ja" : "Nein"} />
      <p className="text-lg font-semibold">Kostenlos anfragen</p>
      <p className="mt-1 text-sm text-muted">Unverbindlich, direkt an {firma}.</p>
      <div className="mt-5 grid gap-3">
        <input name="name" required autoComplete="name" placeholder="Ihr Name" className={inputCls} />
        <input name="email" required type="email" autoComplete="email" placeholder="E-Mail" className={inputCls} />
        <input name="telefon" type="tel" autoComplete="tel" placeholder="Telefon (optional)" className={inputCls} />
        <input name="ort" placeholder="Ort des Projekts" className={inputCls} />
        <textarea name="beschreibung" required minLength={10} rows={4} placeholder="Worum geht es in Ihrem Projekt?" className={inputCls} />
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
          <input type="checkbox" checked={loft} onChange={(e) => setLoft(e.target.checked)} className="mt-0.5 accent-[#213a34]" />
          Ich plane auch eine Lofttür oder Glastrennwand.
        </label>
        {loft && (
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
            <input name="lofttuer_kontakt" type="checkbox" className="mt-0.5 accent-[#213a34]" />
            <span>{EINWILLIGUNG_LOFTTUER} (freiwillig)</span>
          </label>
        )}
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
          <input name="einwilligung" required type="checkbox" className="mt-0.5 accent-[#213a34]" />
          <span>{EINWILLIGUNG_ANFRAGE} <Link href="/datenschutz" target="_blank" className="font-semibold text-forest underline">Datenschutz</Link></span>
        </label>
        <Meldung status={status?.fehler ? status : null} />
        <Absenden pending={pending} className="mt-1">Anfrage senden</Absenden>
      </div>
    </form>
  );
}
