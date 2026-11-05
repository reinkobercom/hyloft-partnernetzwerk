"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { sql, dbKonfiguriert } from "@/lib/db";
import { SESSION_COOKIE, aktuellerNutzer, loginTokenAnlegen, loginTokenEinloesen, sessionAnlegen, sessionBeenden, startseiteFuer } from "@/lib/auth";
import { gleich, hashPassword, rateLimit, sha256, verifyPassword } from "@/lib/security";
import { SITE_URL, mailKonfiguriert, sendeMail } from "@/lib/mail";

export type FormStatus = { fehler?: string; ok?: string } | null;

const sichererPfad = (p: unknown) => (typeof p === "string" && /^\/(partnerbereich|admin)(\/|$|\?)/.test(p) ? p : null);

export async function passwortLogin(_: FormStatus, fd: FormData): Promise<FormStatus> {
  if (!dbKonfiguriert) return { fehler: "Die Anmeldung ist noch nicht freigeschaltet." };
  const email = String(fd.get("email") || "").trim().toLowerCase();
  const pw = String(fd.get("passwort") || "");
  if (!email || !pw) return { fehler: "Bitte E-Mail und Passwort eingeben." };
  if (!(await rateLimit("login", 10, 15))) return { fehler: "Zu viele Versuche. Bitte in 15 Minuten erneut versuchen." };
  const [u] = await sql()<{ id: string; role: "admin" | "partner"; password_hash: string | null }[]>`
    select id, role, password_hash from users where email = ${email}`;
  const ok = await verifyPassword(pw, u?.password_hash ?? null);
  if (!u || !ok) return { fehler: "E-Mail oder Passwort ist nicht korrekt." };
  await sessionAnlegen(u.id);
  const weiter = sichererPfad(fd.get("weiter"));
  const passt = weiter && weiter.startsWith(startseiteFuer(u));
  redirect(passt ? weiter : startseiteFuer(u));
}

export async function linkAnfordern(_: FormStatus, fd: FormData): Promise<FormStatus> {
  if (!dbKonfiguriert) return { fehler: "Die Anmeldung ist noch nicht freigeschaltet." };
  const email = String(fd.get("email") || "").trim().toLowerCase();
  if (!email) return { fehler: "Bitte E-Mail eingeben." };
  if (!mailKonfiguriert) return { fehler: "Der Login-Link ist noch nicht verfügbar. Bitte mit Passwort anmelden oder Hyloft kontaktieren." };
  if (!(await rateLimit("login-link", 5, 15))) return { fehler: "Zu viele Anfragen. Bitte später erneut versuchen." };
  const [u] = await sql()<{ id: string; name: string }[]>`select id, name from users where email = ${email}`;
  if (u) {
    const token = await loginTokenAnlegen(u.id, "login", 30);
    await sendeMail(
      email,
      "Ihr Login-Link für das Hyloft Partnernetz",
      `Guten Tag${u.name ? ` ${u.name}` : ""},\n\nmit dem folgenden Link melden Sie sich im Hyloft Partnernetz an. Der Link ist 30 Minuten gültig und kann nur einmal verwendet werden.\n\nFalls Sie den Link nicht angefordert haben, können Sie diese E-Mail ignorieren.`,
      { text: "Jetzt anmelden", url: `${SITE_URL}/login/link?token=${encodeURIComponent(token)}` }
    );
  }
  // Immer gleiche Antwort, damit nicht erkennbar ist, ob ein Konto existiert
  return { ok: "Falls ein Konto mit dieser Adresse existiert, ist ein Login-Link unterwegs. Bitte prüfen Sie Ihr Postfach." };
}

export async function linkEinloesen(_: FormStatus, fd: FormData): Promise<FormStatus> {
  if (!dbKonfiguriert) return { fehler: "Die Anmeldung ist noch nicht freigeschaltet." };
  const token = String(fd.get("token") || "");
  if (!(await rateLimit("link-einloesen", 20, 15))) return { fehler: "Zu viele Versuche." };
  const userId = token ? await loginTokenEinloesen(token) : null;
  if (!userId) return { fehler: "Dieser Link ist abgelaufen oder wurde bereits verwendet. Bitte fordern Sie einen neuen an." };
  const [u] = await sql()<{ role: "admin" | "partner" }[]>`select role from users where id = ${userId}`;
  await sessionAnlegen(userId);
  redirect(startseiteFuer(u));
}

export async function abmelden() {
  await sessionBeenden();
  redirect("/login");
}

export async function passwortAendern(_: FormStatus, fd: FormData): Promise<FormStatus> {
  const u = await aktuellerNutzer();
  if (!u) return { fehler: "Nicht angemeldet." };
  const neu = String(fd.get("neu") || "");
  const neu2 = String(fd.get("neu2") || "");
  if (neu.length < 10) return { fehler: "Das neue Passwort muss mindestens 10 Zeichen haben." };
  if (neu !== neu2) return { fehler: "Die Passwörter stimmen nicht überein." };
  if (u.hatPasswort) {
    const [row] = await sql()<{ password_hash: string | null }[]>`select password_hash from users where id = ${u.id}`;
    if (!(await verifyPassword(String(fd.get("alt") || ""), row?.password_hash ?? null))) return { fehler: "Das aktuelle Passwort ist nicht korrekt." };
  }
  await sql()`update users set password_hash = ${await hashPassword(neu)}, passwort_temporaer = false where id = ${u.id}`;
  // Alle anderen Sitzungen dieses Kontos beenden
  const aktuell = (await cookies()).get(SESSION_COOKIE)?.value ?? "";
  await sql()`delete from sessions where user_id = ${u.id} and token_hash <> ${sha256(aktuell)}`;
  return { ok: "Passwort gespeichert." };
}

/** Ersteinrichtung: Admin setzt sein Passwort mit dem SETUP_TOKEN aus den Vercel-Einstellungen. */
export async function adminEinrichten(_: FormStatus, fd: FormData): Promise<FormStatus> {
  if (!dbKonfiguriert) return { fehler: "Die Anmeldung ist noch nicht freigeschaltet." };
  const token = String(fd.get("token") || "");
  const soll = process.env.SETUP_TOKEN || "";
  if (!(await rateLimit("setup", 10, 60))) return { fehler: "Zu viele Versuche." };
  if (!soll || soll.length < 20 || !gleich(token, soll)) return { fehler: "Der Einrichtungs-Link ist ungültig." };
  const email = String(fd.get("email") || "").trim().toLowerCase();
  const pw = String(fd.get("passwort") || "");
  if (pw.length < 12) return { fehler: "Bitte mindestens 12 Zeichen wählen." };
  if (pw !== String(fd.get("passwort2") || "")) return { fehler: "Die Passwörter stimmen nicht überein." };
  const [u] = await sql()<{ id: string; password_hash: string | null }[]>`select id, password_hash from users where email = ${email} and role = 'admin'`;
  if (!u) return { fehler: "Diese Adresse ist nicht als Admin hinterlegt." };
  if (u.password_hash) return { fehler: "Für dieses Konto ist bereits ein Passwort gesetzt. Bitte normal anmelden." };
  await sql()`update users set password_hash = ${await hashPassword(pw)} where id = ${u.id}`;
  await sessionAnlegen(u.id);
  redirect("/admin");
}
