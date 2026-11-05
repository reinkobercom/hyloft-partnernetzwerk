"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { nutzerPflicht } from "@/lib/auth";
import { partnerRowByUser } from "@/lib/repo";
import { profilAusFormular } from "@/lib/profil";
import { HYLOFT_INTERN, SITE_URL, sendeMail } from "@/lib/mail";

type Status = { fehler?: string; ok?: string } | null;

/** Dateien dürfen nur verknüpft werden, wenn sie existieren */
async function nurExistierende(ids: string[]) {
  if (ids.length === 0) return [];
  const rows = await sql()<{ id: string }[]>`select id from dateien where id = any(${ids}::uuid[])`;
  const ok = new Set(rows.map((r) => r.id));
  return ids.filter((i) => ok.has(i));
}

export async function profilSpeichern(_: Status, fd: FormData): Promise<Status> {
  const u = await nutzerPflicht("partner");
  const p = await partnerRowByUser(u.id);
  if (!p) return { fehler: "Ihrem Zugang ist noch kein Profil zugeordnet." };
  const { daten, fehler } = profilAusFormular(fd);
  if (!daten) return { fehler };
  const bilder = await nurExistierende(daten.bilder);
  const logo = daten.logo_id ? (await nurExistierende([daten.logo_id]))[0] ?? null : null;
  await sql()`
    update partners set
      firma = ${daten.firma}, gewerk = ${daten.gewerk}, ort = ${daten.ort}, plz = ${daten.plz}, lat = ${daten.lat}, lng = ${daten.lng},
      radius_km = ${daten.radius_km}, inhaber = ${daten.inhaber}, telefon = ${daten.telefon}, email = ${daten.email}, website = ${daten.website},
      claim = ${daten.claim}, beschreibung = ${daten.beschreibung}, leistungen = ${daten.leistungen}, seit = ${daten.seit},
      mitarbeiter = ${daten.mitarbeiter}, logo_id = ${logo}, bilder = ${bilder}::uuid[], lofttuer_erfahrung = ${daten.lofttuer_erfahrung},
      updated_at = now()
    where id = ${p.id}`;
  revalidatePath(`/partner/${p.slug}`);
  revalidatePath("/");
  await sendeMail(HYLOFT_INTERN, `Profil aktualisiert: ${daten.firma}`, `${daten.firma} hat das Profil im Partnernetz aktualisiert.`, {
    text: "Profil prüfen",
    url: `${SITE_URL}/admin/partner/${p.id}`,
  });
  return { ok: "Gespeichert. Ihre Änderungen sind sofort sichtbar." };
}

export async function serviceAnfrage(_: Status, fd: FormData): Promise<Status> {
  const u = await nutzerPflicht("partner");
  const p = await partnerRowByUser(u.id);
  if (!p) return { fehler: "Kein Profil zugeordnet." };
  const typ = String(fd.get("typ"));
  if (!["projekt", "muster", "showroom"].includes(typ)) return { fehler: "Unbekannte Anfrage." };
  const daten: Record<string, string> = {};
  for (const k of ["projekt", "anzahl", "ab", "details", "adresse", "zeitraum"]) {
    const v = String(fd.get(k) ?? "").trim().slice(0, 2000);
    if (v) daten[k] = v;
  }
  await sql()`insert into partner_service (partner_id, typ, daten) values (${p.id}, ${typ}, ${sql().json(daten)})`;
  const titel = { projekt: "Projektanfrage", muster: "Musterstück", showroom: "Showroom-Termin" }[typ as "projekt"];
  await sendeMail(
    HYLOFT_INTERN,
    `[Partner] ${titel}: ${p.firma}`,
    `${p.firma} (${p.ort}) – ${titel}\n\nAnsprechpartner: ${p.inhaber || "–"}\nTelefon: ${p.telefon || "–"}\nE-Mail: ${p.email || u.email}\n\n${Object.entries(daten).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
    { text: "Im Admin öffnen", url: `${SITE_URL}/admin/service` }
  );
  revalidatePath("/partnerbereich");
  return { ok: typ };
}
