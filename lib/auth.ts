import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql, dbKonfiguriert } from "./db";
import { sha256, zufallsToken } from "./security";

export const SESSION_COOKIE = "hp_session";
const SESSION_TAGE = 30;

export type Nutzer = { id: string; email: string; name: string; role: "admin" | "partner"; hatPasswort: boolean; passwortTemporaer: boolean };

export async function sessionAnlegen(userId: string) {
  const token = zufallsToken();
  await sql()`insert into sessions (token_hash, user_id, expires_at)
              values (${sha256(token)}, ${userId}, now() + make_interval(days => ${SESSION_TAGE}))`;
  await sql()`update users set last_login_at = now() where id = ${userId}`;
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TAGE * 24 * 60 * 60,
  });
}

export async function sessionBeenden() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token && dbKonfiguriert) await sql()`delete from sessions where token_hash = ${sha256(token)}`;
  jar.delete(SESSION_COOKIE);
}

export const aktuellerNutzer = cache(async (): Promise<Nutzer | null> => {
  if (!dbKonfiguriert) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const rows = await sql()<{ id: string; email: string; name: string; role: "admin" | "partner"; password_hash: string | null; passwort_temporaer: boolean }[]>`
    select u.id, u.email, u.name, u.role, u.password_hash, u.passwort_temporaer
    from sessions s join users u on u.id = s.user_id
    where s.token_hash = ${sha256(token)} and s.expires_at > now()`;
  const u = rows[0];
  return u ? { id: u.id, email: u.email, name: u.name, role: u.role, hatPasswort: Boolean(u.password_hash), passwortTemporaer: u.passwort_temporaer } : null;
});

export async function nutzerPflicht(rolle: "admin" | "partner"): Promise<Nutzer> {
  const u = await aktuellerNutzer();
  if (!u) redirect(`/login?weiter=${rolle === "admin" ? "/admin" : "/partnerbereich"}`);
  if (rolle === "admin" && u.role !== "admin") redirect("/partnerbereich");
  if (rolle === "partner" && u.role !== "partner") redirect("/admin");
  return u;
}

/** Einmal-Link (Login per E-Mail). Gültig 30 Minuten. */
export async function loginTokenAnlegen(userId: string, purpose: "login" | "setup" = "login", minuten = 30) {
  const token = zufallsToken();
  await sql()`insert into login_tokens (token_hash, user_id, purpose, expires_at)
              values (${sha256(token)}, ${userId}, ${purpose}, now() + make_interval(mins => ${minuten}))`;
  return token;
}

/** Löst einen Einmal-Link ein und gibt die Nutzer-ID zurück (oder null). */
export async function loginTokenEinloesen(token: string) {
  const rows = await sql()<{ user_id: string }[]>`
    update login_tokens set used_at = now()
    where token_hash = ${sha256(token)} and used_at is null and expires_at > now()
    returning user_id`;
  return rows[0]?.user_id ?? null;
}

export const startseiteFuer = (u: Pick<Nutzer, "role">) => (u.role === "admin" ? "/admin" : "/partnerbereich");
