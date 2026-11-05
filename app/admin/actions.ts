"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { loginTokenAnlegen, nutzerPflicht } from "@/lib/auth";
import { freierSlug, partnerRowById } from "@/lib/repo";
import { profilAusFormular } from "@/lib/profil";
import { hashPassword, startPasswort } from "@/lib/security";
import { SITE_URL, mailKonfiguriert, sendeMail } from "@/lib/mail";
import { slugify } from "@/lib/data";

type Status = { fehler?: string; ok?: string } | null;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const id = (fd: FormData, k = "id") => {
  const v = String(fd.get(k) ?? "");
  return UUID.test(v) ? v : null;
};

function oeffentlichNeuLaden(slug?: string) {
  revalidatePath("/");
  revalidatePath("/suche");
  if (slug) revalidatePath(`/partner/${slug}`);
}

async function existierendeDateien(ids: string[]) {
  if (ids.length === 0) return [];
  const rows = await sql()<{ id: string }[]>`select id from dateien where id = any(${ids}::uuid[])`;
  const ok = new Set(rows.map((r) => r.id));
  return ids.filter((i) => ok.has(i));
}

const statusAus = (fd: FormData) => {
  const s = String(fd.get("status"));
  return s === "live" || s === "gesperrt" ? s : "entwurf";
};

// ---------------- Partner ----------------

export async function partnerAnlegen(_: Status, fd: FormData): Promise<Status> {
  await nutzerPflicht("admin");
  const { daten, fehler } = profilAusFormular(fd);
  if (!daten) return { fehler };
  const slug = await freierSlug(slugify(`${daten.firma} ${daten.ort}`));
  const bilder = await existierendeDateien(daten.bilder);
  const logo = daten.logo_id ? (await existierendeDateien([daten.logo_id]))[0] ?? null : null;
  const [row] = await sql()<{ id: string }[]>`
    insert into partners (slug, status, firma, gewerk, ort, plz, lat, lng, radius_km, inhaber, telefon, email, website, claim, beschreibung,
                          leistungen, seit, mitarbeiter, logo_id, bilder, lofttuer_erfahrung, verifiziert, notiz_intern)
    values (${slug}, ${statusAus(fd)}, ${daten.firma}, ${daten.gewerk}, ${daten.ort}, ${daten.plz}, ${daten.lat}, ${daten.lng}, ${daten.radius_km},
            ${daten.inhaber}, ${daten.telefon}, ${daten.email}, ${daten.website}, ${daten.claim}, ${daten.beschreibung}, ${daten.leistungen},
            ${daten.seit}, ${daten.mitarbeiter}, ${logo}, ${bilder}::uuid[], ${daten.lofttuer_erfahrung}, ${fd.get("verifiziert") === "on"},
            ${String(fd.get("notiz_intern") ?? "").slice(0, 2000)})
    returning id`;
  const reg = id(fd, "registrierung");
  if (reg) await sql()`update registrierungen set status = 'angelegt', partner_id = ${row.id} where id = ${reg}`;
  oeffentlichNeuLaden(slug);
  redirect(`/admin/partner/${row.id}?neu=1`);
}

export async function partnerSpeichern(_: Status, fd: FormData): Promise<Status> {
  await nutzerPflicht("admin");
  const pid = id(fd);
  const alt = pid ? await partnerRowById(pid) : null;
  if (!alt) return { fehler: "Partner nicht gefunden." };
  const { daten, fehler } = profilAusFormular(fd);
  if (!daten) return { fehler };
  const bilder = await existierendeDateien(daten.bilder);
  const logo = daten.logo_id ? (await existierendeDateien([daten.logo_id]))[0] ?? null : null;
  await sql()`
    update partners set
      status = ${statusAus(fd)}, verifiziert = ${fd.get("verifiziert") === "on"}, notiz_intern = ${String(fd.get("notiz_intern") ?? "").slice(0, 2000)},
      firma = ${daten.firma}, gewerk = ${daten.gewerk}, ort = ${daten.ort}, plz = ${daten.plz}, lat = ${daten.lat}, lng = ${daten.lng},
      radius_km = ${daten.radius_km}, inhaber = ${daten.inhaber}, telefon = ${daten.telefon}, email = ${daten.email}, website = ${daten.website},
      claim = ${daten.claim}, beschreibung = ${daten.beschreibung}, leistungen = ${daten.leistungen}, seit = ${daten.seit},
      mitarbeiter = ${daten.mitarbeiter}, logo_id = ${logo}, bilder = ${bilder}::uuid[], lofttuer_erfahrung = ${daten.lofttuer_erfahrung},
      updated_at = now()
    where id = ${alt.id}`;
  oeffentlichNeuLaden(alt.slug);
  return { ok: "Gespeichert." };
}

export async function partnerLoeschen(fd: FormData) {
  await nutzerPflicht("admin");
  const pid = id(fd);
  const p = pid ? await partnerRowById(pid) : null;
  if (!p) return;
  if (String(fd.get("bestaetigung")).trim() !== p.firma) redirect(`/admin/partner/${p.id}?fehler=loeschen`);
  await sql().begin(async (tx) => {
    await tx`delete from partners where id = ${p.id}`;
    if (p.user_id) await tx`delete from users where id = ${p.user_id} and role = 'partner'`;
  });
  oeffentlichNeuLaden(p.slug);
  redirect("/admin/partner");
}

/** Legt den Login für einen Partner an (oder setzt ein neues Startpasswort). Das Passwort wird einmalig angezeigt. */
export async function zugangAnlegen(_: Status, fd: FormData): Promise<Status> {
  await nutzerPflicht("admin");
  const pid = id(fd);
  const p = pid ? await partnerRowById(pid) : null;
  if (!p) return { fehler: "Partner nicht gefunden." };
  const pw = startPasswort();
  const hash = await hashPassword(pw);
  if (p.user_id) {
    await sql()`update users set password_hash = ${hash}, passwort_temporaer = true where id = ${p.user_id}`;
    await sql()`delete from sessions where user_id = ${p.user_id}`;
    return { ok: pw };
  }
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { fehler: "Bitte eine gültige Login-E-Mail angeben." };
  const vorhanden = await sql()`select 1 from users where email = ${email}`;
  if (vorhanden.length) return { fehler: "Für diese E-Mail gibt es bereits einen Zugang." };
  await sql().begin(async (tx) => {
    const [u] = await tx<{ id: string }[]>`
      insert into users (email, name, role, password_hash, passwort_temporaer) values (${email}, ${p.inhaber}, 'partner', ${hash}, true) returning id`;
    await tx`update partners set user_id = ${u.id} where id = ${p.id}`;
  });
  revalidatePath(`/admin/partner/${p.id}`);
  return { ok: pw };
}

export async function loginLinkSenden(_: Status, fd: FormData): Promise<Status> {
  await nutzerPflicht("admin");
  if (!mailKonfiguriert) return { fehler: "Der E-Mail-Versand ist noch nicht eingerichtet." };
  const pid = id(fd);
  const p = pid ? await partnerRowById(pid) : null;
  if (!p?.user_id) return { fehler: "Kein Zugang vorhanden." };
  const [u] = await sql()<{ email: string }[]>`select email from users where id = ${p.user_id}`;
  const token = await loginTokenAnlegen(p.user_id, "login", 60 * 24 * 3);
  const status = await sendeMail(
    u.email,
    "Ihr Zugang zum Hyloft Partnernetz",
    `Guten Tag${p.inhaber ? ` ${p.inhaber}` : ""},\n\nIhr Profil für ${p.firma} ist im Hyloft Partnernetz angelegt. Mit dem folgenden Link melden Sie sich im Partnerbereich an. Dort können Sie Logo und Fotos ergänzen und ein eigenes Passwort festlegen.\n\nDer Link ist drei Tage gültig.\n\nViele Grüße\nIhr Hyloft-Team`,
    { text: "Zum Partnerbereich", url: `${SITE_URL}/login/link?token=${encodeURIComponent(token)}` }
  );
  return status === "gesendet" ? { ok: `Login-Link an ${u.email} gesendet.` } : { fehler: "Versand fehlgeschlagen – siehe E-Mail-Protokoll." };
}

export async function zugangEntfernen(fd: FormData) {
  await nutzerPflicht("admin");
  const pid = id(fd);
  const p = pid ? await partnerRowById(pid) : null;
  if (!p?.user_id) return;
  await sql()`delete from users where id = ${p.user_id} and role = 'partner'`;
  revalidatePath(`/admin/partner/${p.id}`);
}

// ---------------- Registrierungen ----------------

export async function registrierungStatus(fd: FormData) {
  await nutzerPflicht("admin");
  const rid = id(fd);
  const s = String(fd.get("status"));
  if (!rid || !["offen", "abgelehnt"].includes(s)) return;
  await sql()`update registrierungen set status = ${s} where id = ${rid}`;
  revalidatePath("/admin/registrierungen");
}

// ---------------- Anfragen & Service ----------------

export async function anfrageStatus(fd: FormData) {
  await nutzerPflicht("admin");
  const aid = id(fd);
  const s = fd.get("status") === "bearbeitet" ? "bearbeitet" : "neu";
  if (aid) await sql()`update anfragen set status = ${s} where id = ${aid}`;
  revalidatePath("/admin/anfragen");
}

export async function serviceStatus(fd: FormData) {
  await nutzerPflicht("admin");
  const sid = id(fd);
  const s = fd.get("status") === "bearbeitet" ? "bearbeitet" : "neu";
  if (sid) await sql()`update partner_service set status = ${s} where id = ${sid}`;
  revalidatePath("/admin/service");
}

// ---------------- Referenzen ----------------

export async function referenzAnlegen(_: Status, fd: FormData): Promise<Status> {
  await nutzerPflicht("admin");
  const titel = String(fd.get("titel") ?? "").trim().slice(0, 160);
  if (!titel) return { fehler: "Bitte einen Titel angeben." };
  const bild = id(fd, "bild_id");
  const partnerIds = fd.getAll("partner_ids").map(String).filter((x) => UUID.test(x));
  if (partnerIds.length === 0) return { fehler: "Bitte mindestens einen Partner verknüpfen." };
  const jahr = Number(fd.get("jahr")) || null;
  await sql()`insert into referenzen (titel, ort, jahr, tuer, bild_id, partner_ids)
              values (${titel}, ${String(fd.get("ort") ?? "").slice(0, 120)}, ${jahr}, ${String(fd.get("tuer") ?? "").slice(0, 160)},
                      ${bild ? (await existierendeDateien([bild]))[0] ?? null : null}, ${partnerIds}::uuid[])`;
  const slugs = await sql()<{ slug: string }[]>`select slug from partners where id = any(${partnerIds}::uuid[])`;
  slugs.forEach((s) => revalidatePath(`/partner/${s.slug}`));
  revalidatePath("/admin/referenzen");
  return { ok: "Referenzprojekt angelegt." };
}

export async function referenzLoeschen(fd: FormData) {
  await nutzerPflicht("admin");
  const rid = id(fd);
  if (rid) await sql()`delete from referenzen where id = ${rid}`;
  revalidatePath("/admin/referenzen");
}

// ---------------- Team ----------------

export async function adminAnlegen(_: Status, fd: FormData): Promise<Status> {
  await nutzerPflicht("admin");
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const name = String(fd.get("name") ?? "").trim().slice(0, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { fehler: "Bitte eine gültige E-Mail angeben." };
  const vorhanden = await sql()`select 1 from users where email = ${email}`;
  if (vorhanden.length) return { fehler: "Für diese E-Mail gibt es bereits einen Zugang." };
  const pw = startPasswort();
  await sql()`insert into users (email, name, role, password_hash, passwort_temporaer) values (${email}, ${name}, 'admin', ${await hashPassword(pw)}, true)`;
  revalidatePath("/admin/team");
  return { ok: pw };
}

export async function adminEntfernen(fd: FormData) {
  const ich = await nutzerPflicht("admin");
  const uid = id(fd);
  if (!uid || uid === ich.id) return;
  await sql()`delete from users where id = ${uid} and role = 'admin'`;
  revalidatePath("/admin/team");
}
