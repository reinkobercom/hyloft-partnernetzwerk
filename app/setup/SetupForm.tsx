"use client";

import { adminEinrichten } from "../login/actions";
import { useFormular, Absenden, Meldung, inputCls } from "@/components/Formular";

export default function SetupForm({ token }: { token: string }) {
  const { status, onSubmit, pending } = useFormular(adminEinrichten);
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-forest/5 sm:p-10">
      <input type="hidden" name="token" value={token} />
      <h1 className="text-2xl font-semibold tracking-tight">Admin-Zugang einrichten</h1>
      <p className="mt-1 text-sm text-muted">Einmalig: Legen Sie Ihr Passwort für den Admin-Bereich fest.</p>
      <div className="mt-6 grid gap-3">
        <input name="email" type="email" required placeholder="Admin-E-Mail" className={inputCls} />
        <input name="passwort" type="password" required minLength={12} autoComplete="new-password" placeholder="Neues Passwort (mind. 12 Zeichen)" className={inputCls} />
        <input name="passwort2" type="password" required autoComplete="new-password" placeholder="Passwort wiederholen" className={inputCls} />
        <Meldung status={status} />
        <Absenden pending={pending} className="mt-2">Passwort festlegen</Absenden>
      </div>
    </form>
  );
}
