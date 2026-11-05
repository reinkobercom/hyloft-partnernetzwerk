"use client";

import Link from "next/link";
import { useState } from "react";
import { linkAnfordern, passwortLogin } from "./actions";
import { Absenden, Meldung, inputCls, useFormular } from "@/components/Formular";

export default function LoginForm({ weiter, mailAktiv }: { weiter?: string; mailAktiv: boolean }) {
  const [modus, setModus] = useState<"passwort" | "link">("passwort");
  const { status: pwStatus, onSubmit: pwAction, pending: pwLaeuft } = useFormular(passwortLogin);
  const { status: linkStatus, onSubmit: linkAction, pending: linkLaeuft } = useFormular(linkAnfordern);

  return (
    <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-forest/5 sm:p-10">
      <h1 className="text-2xl font-semibold tracking-tight">Anmelden</h1>
      <p className="mt-1 text-sm text-muted">Für Partnerbetriebe und das Hyloft-Team.</p>

      <div className="mt-6 inline-flex rounded-full border border-line p-1 text-sm font-medium">
        <button type="button" onClick={() => setModus("passwort")} className={`rounded-full px-4 py-1.5 ${modus === "passwort" ? "bg-forest text-white" : "text-muted"}`}>
          Mit Passwort
        </button>
        <button type="button" onClick={() => setModus("link")} className={`rounded-full px-4 py-1.5 ${modus === "link" ? "bg-forest text-white" : "text-muted"}`}>
          Login-Link per E-Mail
        </button>
      </div>

      {modus === "passwort" ? (
        <form onSubmit={pwAction} className="mt-6 grid gap-3">
          <input type="hidden" name="weiter" value={weiter ?? ""} />
          <input name="email" type="email" required autoComplete="email" placeholder="E-Mail" className={inputCls} />
          <input name="passwort" type="password" required autoComplete="current-password" placeholder="Passwort" className={inputCls} />
          <Meldung status={pwStatus} />
          <Absenden pending={pwLaeuft} className="mt-2">Anmelden</Absenden>
          <button type="button" onClick={() => setModus("link")} className="mt-1 text-center text-sm font-medium text-forest hover:underline">
            Passwort vergessen?
          </button>
        </form>
      ) : (
        <form onSubmit={linkAction} className="mt-6 grid gap-3">
          <p className="text-sm leading-relaxed text-muted">
            Wir senden Ihnen einen Link, mit dem Sie sich ohne Passwort anmelden. Danach können Sie im Partnerbereich ein neues Passwort festlegen.
          </p>
          <input name="email" type="email" required autoComplete="email" placeholder="E-Mail" className={inputCls} />
          {!mailAktiv && <p className="text-xs text-muted">Hinweis: Der E-Mail-Versand wird gerade eingerichtet. Bis dahin hilft Ihnen das Hyloft-Team unter info@hyloft.de.</p>}
          <Meldung status={linkStatus} />
          <Absenden pending={linkLaeuft} className="mt-2">Login-Link senden</Absenden>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        Noch kein Profil? <Link href="/registrieren" className="font-semibold text-forest">Kostenlos eintragen</Link>
      </p>
    </div>
  );
}
