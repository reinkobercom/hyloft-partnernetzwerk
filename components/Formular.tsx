"use client";

import { startTransition, useActionState } from "react";
import { useFormStatus } from "react-dom";

type S = { fehler?: string; ok?: string } | null;

/**
 * Sendet ein Formular an eine Server Action, ohne dass React die Eingaben danach zurücksetzt
 * (sonst wären bei einer Fehlermeldung alle Felder leer).
 */
export function useFormular(action: (s: S, fd: FormData) => Promise<S>) {
  const [status, dispatch, pending] = useActionState(action, null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
  return { status, onSubmit, pending };
}

export const inputCls = "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-forest";
export const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function Absenden({ children, className = "", disabled, pending: p }: { children: React.ReactNode; className?: string; disabled?: boolean; pending?: boolean }) {
  const fs = useFormStatus();
  const pending = p ?? fs.pending;
  return (
    <button
      disabled={pending || disabled}
      className={`rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {pending ? "Bitte warten …" : children}
    </button>
  );
}

export function Meldung({ status }: { status: { fehler?: string; ok?: string } | null }) {
  if (!status) return null;
  if (status.fehler) return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">{status.fehler}</p>;
  if (status.ok) return <p className="rounded-xl bg-mint px-4 py-3 text-sm text-forest ring-1 ring-mint-strong">{status.ok}</p>;
  return null;
}

/** Unsichtbares Feld gegen Spam-Bots */
export function Honigtopf() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website (bitte leer lassen)
        <input type="text" name="firma_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
