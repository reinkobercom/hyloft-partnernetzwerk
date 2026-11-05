import { sql } from "@/lib/db";
import { MAIL_ABSENDER_ANZEIGE, mailKonfiguriert } from "@/lib/mail";
import { nutzerPflicht } from "@/lib/auth";
import { TestmailForm } from "../Teile";

export default async function Emails() {
  const ich = await nutzerPflicht("admin");
  const rows = await sql()<{ id: string; an: string; betreff: string; text: string; status: string; fehler: string; created_at: Date }[]>`
    select * from email_log order by created_at desc limit 150`;
  return (
    <section>
      <h1 className="text-2xl font-semibold">E-Mail-Protokoll</h1>
      <p className="mt-1 text-sm text-muted">
        {mailKonfiguriert ? "Versand über Resend ist aktiv." : "Versand noch nicht eingerichtet – Mails werden nur protokolliert."} Die letzten 150 Mails.
      </p>
      <div className="mt-6">
        <p className="mb-2 text-sm text-muted">Absender: <strong className="text-ink">{MAIL_ABSENDER_ANZEIGE}</strong></p>
        <TestmailForm standard={ich.email} />
      </div>
      {rows.length === 0 && <p className="mt-6 rounded-3xl bg-white p-10 text-center text-muted">Noch keine E-Mails.</p>}
      <div className="mt-6 grid gap-3">
        {rows.map((m) => (
          <details key={m.id} className="group rounded-2xl bg-white p-5">
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 text-sm">
              <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${m.status === "gesendet" ? "bg-mint text-forest" : m.status === "fehler" ? "bg-red-50 text-red-700" : "bg-stone text-muted"}`}>
                {m.status === "gesendet" ? "Gesendet" : m.status === "fehler" ? "Fehler" : "Nicht gesendet"}
              </span>
              <span className="font-semibold">{m.betreff}</span>
              <span className="text-muted">an {m.an}</span>
              <span className="ml-auto text-xs text-muted">{new Date(m.created_at).toLocaleString("de-DE")}</span>
            </summary>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink/80">{m.text}</pre>
            {m.fehler && <p className="mt-3 text-xs text-red-700">{m.fehler}</p>}
          </details>
        ))}
      </div>
    </section>
  );
}
