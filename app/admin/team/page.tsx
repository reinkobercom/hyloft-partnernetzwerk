import { sql } from "@/lib/db";
import { nutzerPflicht } from "@/lib/auth";
import { adminEntfernen } from "../actions";
import { TeamForm } from "../Teile";
import { PasswortForm } from "../../partnerbereich/Teile";

export default async function Team() {
  const ich = await nutzerPflicht("admin");
  const admins = await sql()<{ id: string; email: string; name: string; last_login_at: Date | null }[]>`
    select id, email, name, last_login_at from users where role = 'admin' order by created_at`;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-semibold">Team</h1>
        <p className="mt-1 text-sm text-muted">Diese Personen haben Zugang zum Admin-Bereich.</p>
        <ul className="mt-6 divide-y divide-line text-sm">
          {admins.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 py-3">
              <span>
                <span className="font-medium">{a.name || a.email}</span>
                {a.name && <span className="text-muted"> · {a.email}</span>}
                <span className="block text-xs text-muted">Letzter Login: {a.last_login_at ? new Date(a.last_login_at).toLocaleString("de-DE") : "noch nie"}</span>
              </span>
              {a.id !== ich.id && (
                <form action={adminEntfernen}>
                  <input type="hidden" name="id" value={a.id} />
                  <button className="text-xs font-semibold text-red-700 hover:underline">Entfernen</button>
                </form>
              )}
            </li>
          ))}
        </ul>
        <p className="mb-3 mt-8 font-semibold">Admin hinzufügen</p>
        <TeamForm />
      </section>
      <section id="passwort" className="self-start rounded-3xl bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Mein Passwort</h2>
        <p className="mb-6 mt-1 text-sm text-muted">Angemeldet als {ich.email}</p>
        <PasswortForm hatPasswort={ich.hatPasswort} />
      </section>
    </div>
  );
}
