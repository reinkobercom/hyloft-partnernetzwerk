"use client";

import Link from "next/link";
import { linkEinloesen } from "../actions";
import { useFormular, Absenden, Meldung } from "@/components/Formular";

export default function LinkForm({ token }: { token: string }) {
  const { status, onSubmit, pending } = useFormular(linkEinloesen);
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-forest/5 sm:p-10">
      <input type="hidden" name="token" value={token} />
      <h1 className="text-2xl font-semibold tracking-tight">Willkommen zurück</h1>
      <p className="mt-2 text-sm text-muted">Klicken Sie auf den Button, um sich anzumelden.</p>
      <div className="mt-6 grid gap-3">
        <Meldung status={status} />
        <Absenden pending={pending}>Jetzt anmelden</Absenden>
        <Link href="/login" className="text-sm font-medium text-muted hover:text-ink">Zur Anmeldung</Link>
      </div>
    </form>
  );
}
