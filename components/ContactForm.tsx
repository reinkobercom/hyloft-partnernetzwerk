"use client";

import { useState } from "react";

export default function ContactForm({ firma }: { firma: string }) {
  const [sent, setSent] = useState(false);

  if (sent)
    return (
      <div className="rounded-3xl bg-mint p-7">
        <p className="text-lg font-semibold text-forest">Anfrage gesendet</p>
        <p className="mt-2 text-sm leading-relaxed text-forest/80">
          {firma} meldet sich in der Regel innerhalb von zwei Werktagen bei Ihnen. (Prototyp – es wurde nichts verschickt.)
        </p>
      </div>
    );

  const input = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-forest";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-line bg-white p-6 sm:p-7"
    >
      <p className="text-lg font-semibold">Kostenlos anfragen</p>
      <p className="mt-1 text-sm text-muted">Unverbindlich, direkt an {firma}.</p>
      <div className="mt-5 grid gap-3">
        <input required placeholder="Ihr Name" className={input} />
        <input required type="email" placeholder="E-Mail" className={input} />
        <input placeholder="Telefon (optional)" className={input} />
        <textarea required rows={4} placeholder="Worum geht es in Ihrem Projekt?" className={input} />
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
          <input type="checkbox" className="mt-0.5 accent-[#213a34]" />
          Ich plane auch eine Lofttür – bitte Hyloft ebenfalls informieren.
        </label>
        <button className="mt-1 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-soft">
          Anfrage senden
        </button>
      </div>
    </form>
  );
}
