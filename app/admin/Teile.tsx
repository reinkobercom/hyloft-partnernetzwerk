"use client";

import { useEffect, useRef, useState } from "react";
import { adminAnlegen, loginLinkSenden, referenzAnlegen, testmailSenden, zugangAnlegen } from "./actions";
import { Absenden, Meldung, inputCls, labelCls, useFormular } from "@/components/Formular";
import { FotosUpload } from "@/components/BildUpload";

function PasswortAnzeige({ pw, email }: { pw: string; email?: string }) {
  const [kopiert, setKopiert] = useState(false);
  return (
    <div className="rounded-2xl bg-forest p-5 text-white">
      <p className="text-sm text-white/75">Startpasswort – wird nur jetzt angezeigt. Bitte am Telefon durchgeben{email ? ` (Login: ${email})` : ""}:</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <code className="rounded-xl bg-white/10 px-4 py-2 text-lg font-semibold tracking-wide">{pw}</code>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(pw).catch(() => {});
            setKopiert(true);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest"
        >
          {kopiert ? "Kopiert ✓" : "Kopieren"}
        </button>
      </div>
      <p className="mt-3 text-xs text-white/60">Der Partner wird beim ersten Login gebeten, ein eigenes Passwort festzulegen.</p>
    </div>
  );
}

export function ZugangPanel({ partnerId, loginEmail, vorschlagEmail, mailAktiv }: { partnerId: string; loginEmail: string | null; vorschlagEmail: string; mailAktiv: boolean }) {
  const { status, onSubmit: action, pending } = useFormular(zugangAnlegen);
  const { status: linkStatus, onSubmit: linkAction } = useFormular(loginLinkSenden);
  const pw = status?.ok;
  return (
    <div className="grid gap-4">
      {loginEmail ? (
        <p className="text-sm">
          Login: <strong>{loginEmail}</strong>
        </p>
      ) : (
        <p className="text-sm text-muted">Noch kein Zugang. Lege einen Login an und gib das Startpasswort am Telefon durch.</p>
      )}
      {pw ? (
        <PasswortAnzeige pw={pw} email={loginEmail ?? undefined} />
      ) : (
        <form onSubmit={action} className="grid gap-3">
          <input type="hidden" name="id" value={partnerId} />
          {!loginEmail && (
            <div>
              <label className={labelCls}>Login-E-Mail</label>
              <input name="email" type="email" required defaultValue={vorschlagEmail} className={inputCls} />
            </div>
          )}
          <Meldung status={status?.fehler ? status : null} />
          <div>
            <Absenden pending={pending}>{loginEmail ? "Neues Startpasswort erzeugen" : "Zugang anlegen"}</Absenden>
          </div>
        </form>
      )}
      {loginEmail && (
        <form onSubmit={linkAction} className="grid gap-2">
          <input type="hidden" name="id" value={partnerId} />
          <Meldung status={linkStatus} />
          <button disabled={!mailAktiv} className="justify-self-start rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-forest hover:bg-mint disabled:opacity-40">
            Login-Link per E-Mail senden
          </button>
          {!mailAktiv && <p className="text-xs text-muted">Verfügbar, sobald der E-Mail-Versand eingerichtet ist.</p>}
        </form>
      )}
    </div>
  );
}

export function ReferenzForm({ partner }: { partner: { id: string; firma: string; ort: string }[] }) {
  const { status, onSubmit: action, pending } = useFormular(referenzAnlegen);
  const [bild, setBild] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (status?.ok) {
      setBild([]);
      formRef.current?.reset();
    }
  }, [status]);
  const liste = partner.filter((p) => !filter || `${p.firma} ${p.ort}`.toLowerCase().includes(filter.toLowerCase()));
  return (
    <form
      ref={formRef}
      onSubmit={action}
      className="grid gap-3"
    >
      {bild[0] && <input type="hidden" name="bild_id" value={bild[0]} />}
      <input name="titel" required placeholder="Titel, z. B. Offener Wohnbereich mit Lofttür" className={inputCls} />
      <div className="grid grid-cols-2 gap-3">
        <input name="ort" placeholder="Ort" className={inputCls} />
        <input name="jahr" inputMode="numeric" placeholder="Jahr" defaultValue={new Date().getFullYear()} className={inputCls} />
      </div>
      <input name="tuer" placeholder="Türart, z. B. Drehtür mit Seitenteil" className={inputCls} />
      <div>
        <p className={labelCls}>Foto</p>
        <FotosUpload werte={bild} onChange={setBild} max={1} />
      </div>
      <div>
        <p className={labelCls}>Partner verknüpfen</p>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Suchen …" className={`${inputCls} mb-2 py-2.5`} />
        <div className="max-h-48 space-y-1 overflow-auto rounded-xl border border-line p-2">
          {liste.length === 0 && <p className="p-2 text-xs text-muted">Keine Partner gefunden.</p>}
          {liste.map((p) => (
            <label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-stone">
              <input type="checkbox" name="partner_ids" value={p.id} className="accent-[#213a34]" />
              {p.firma} <span className="text-muted">· {p.ort}</span>
            </label>
          ))}
        </div>
      </div>
      <Meldung status={status} />
      <div><Absenden pending={pending}>Anlegen & verknüpfen</Absenden></div>
    </form>
  );
}

export function TeamForm() {
  const { status, onSubmit: action, pending } = useFormular(adminAnlegen);
  return (
    <div className="grid gap-3">
      {status?.ok ? (
        <PasswortAnzeige pw={status.ok} />
      ) : (
        <form onSubmit={action} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
          <input name="name" placeholder="Name" className={inputCls} />
          <input name="email" type="email" required placeholder="E-Mail" className={inputCls} />
          <Absenden pending={pending}>Admin anlegen</Absenden>
          <div className="sm:col-span-3"><Meldung status={status?.fehler ? status : null} /></div>
        </form>
      )}
    </div>
  );
}

export function TestmailForm({ standard }: { standard: string }) {
  const { status, onSubmit, pending } = useFormular(testmailSenden);
  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-center">
      <input name="an" type="email" defaultValue={standard} className={inputCls} />
      <Absenden pending={pending}>Testmail senden</Absenden>
      <div className="sm:col-span-2"><Meldung status={status} /></div>
    </form>
  );
}
