"use server";

import { redirect } from "next/navigation";
import { sql, dbKonfiguriert } from "@/lib/db";
import { GEWERKE, gewerkBySlug } from "@/lib/data";
import { HYLOFT_INTERN, SITE_URL, sendeMail } from "@/lib/mail";
import { rateLimit } from "@/lib/security";

export type FormStatus = { fehler?: string; ok?: string } | null;

const txt = (fd: FormData, k: string, max = 300) => String(fd.get(k) ?? "").trim().slice(0, max);
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const istBot = (fd: FormData) => Boolean(String(fd.get("firma_website") ?? "").trim());

type LivePartner = { id: string; slug: string; firma: string; email: string; telefon: string; ort: string; gewerk: string };

// ---------------- Bauherren-Anfrage ----------------

export async function anfrageSenden(_: FormStatus, fd: FormData): Promise<FormStatus> {
  if (!dbKonfiguriert) return { fehler: "Die Plattform wird gerade eingerichtet. Bitte schreiben Sie uns solange an info@hyloft.de." };
  if (istBot(fd)) return { ok: "Danke!" };
  const name = txt(fd, "name", 120);
  const email = txt(fd, "email", 160).toLowerCase();
  const telefon = txt(fd, "telefon", 60);
  const ort = txt(fd, "ort", 120);
  const beschreibung = txt(fd, "beschreibung", 4000);
  const art = txt(fd, "art", 60);
  const zeitraum = txt(fd, "zeitraum", 60);
  const lofttuer = txt(fd, "lofttuer", 20);
  const lofttuerKontakt = fd.get("lofttuer_kontakt") === "on";
  const quelle = fd.get("quelle") === "profil" ? "profil" : "sammel";
  const gewerke = fd.getAll("gewerke").map(String).filter((g) => GEWERKE.some((x) => x.slug === g)).slice(0, 7);
  const slugs = [...new Set(fd.getAll("partner").map(String))].slice(0, 3);

  if (!name || !emailOk(email) || beschreibung.length < 10) return { fehler: "Bitte Name, gültige E-Mail und eine kurze Projektbeschreibung angeben." };
  if (fd.get("einwilligung") !== "on") return { fehler: "Bitte stimmen Sie der Weitergabe Ihrer Anfrage zu." };
  if (!(await rateLimit("anfrage", 5, 60))) return { fehler: "Sie haben bereits mehrere Anfragen gesendet. Bitte versuchen Sie es später erneut." };

  const db = sql();
  const partner = slugs.length
    ? await db<LivePartner[]>`select id, slug, firma, email, telefon, ort, gewerk from partners where slug in ${db(slugs)} and status = 'live'`
    : [];

  await db`insert into anfragen (quelle, name, email, telefon, ort, gewerke, art, zeitraum, beschreibung, lofttuer, lofttuer_kontakt, partner_ids, einwilligung_at)
           values (${quelle}, ${name}, ${email}, ${telefon}, ${ort}, ${gewerke}, ${art}, ${zeitraum}, ${beschreibung}, ${lofttuer}, ${lofttuerKontakt},
                   ${partner.map((p) => p.id)}::uuid[], now())`;

  const eckdaten = [
    ort && `Ort: ${ort}`,
    art && `Vorhaben: ${art}`,
    zeitraum && `Zeitraum: ${zeitraum}`,
    gewerke.length && `Gewerke: ${gewerke.map((g) => gewerkBySlug(g)?.plural).join(", ")}`,
  ].filter(Boolean).join("\n");
  const kontakt = `Name: ${name}\nE-Mail: ${email}${telefon ? `\nTelefon: ${telefon}` : ""}`;

  for (const p of partner) {
    if (!p.email) continue;
    await sendeMail(
      p.email,
      `Neue Anfrage über das Hyloft Partnernetz${ort ? ` aus ${ort}` : ""}`,
      `Guten Tag,\n\nüber Ihr Profil im Hyloft Partnernetz ist eine neue Anfrage eingegangen.\n\n${beschreibung}\n\n${eckdaten}\n\nKontakt:\n${kontakt}\n\nBitte melden Sie sich innerhalb von zwei Werktagen direkt beim Bauherrn. Die Anfrage finden Sie auch in Ihrem Partnerbereich.\n\nViele Grüße\nIhr Hyloft-Team`,
      { text: "Zum Partnerbereich", url: `${SITE_URL}/partnerbereich?tab=anfragen` }
    );
  }

  const liste = partner.length
    ? partner.map((p) => `• ${p.firma}, ${p.ort}${p.telefon ? ` – ${p.telefon}` : ""}`).join("\n")
    : "Wir suchen persönlich einen passenden Betrieb für Sie und melden uns.";
  await sendeMail(
    email,
    "Ihre Anfrage im Hyloft Partnernetz",
    `Guten Tag ${name},\n\nvielen Dank für Ihre Anfrage. ${partner.length ? "Folgende Betriebe haben Ihre Projektbeschreibung erhalten:" : ""}\n\n${liste}\n\n${partner.length ? "Die Betriebe melden sich in der Regel innerhalb von zwei Werktagen bei Ihnen." : ""}\n\nIhre Anfrage:\n${beschreibung}\n\nViele Grüße\nIhr Hyloft-Team`
  );

  await sendeMail(
    HYLOFT_INTERN,
    `${lofttuer === "Ja" || lofttuer === "Vielleicht" ? "[Lofttür] " : ""}Neue Bauherren-Anfrage: ${name}${ort ? `, ${ort}` : ""}`,
    `Neue Anfrage (${quelle === "profil" ? "über Profil" : "Sammelanfrage"})\n\n${kontakt}\n\n${eckdaten}\nLofttür geplant: ${lofttuer || "–"}\nKontakt wegen Lofttür erlaubt: ${lofttuerKontakt ? "JA" : "nein"}\n\n${beschreibung}\n\nWeitergeleitet an: ${partner.map((p) => p.firma).join(", ") || "– (persönlich vermitteln)"}`,
    { text: "Im Admin öffnen", url: `${SITE_URL}/admin/anfragen` }
  );

  return { ok: partner.length ? partner.map((p) => p.slug).join(",") : "persoenlich" };
}

// ---------------- Registrierung von Betrieben ----------------

export async function registrieren(_: FormStatus, fd: FormData): Promise<FormStatus> {
  if (!dbKonfiguriert) return { fehler: "Die Plattform wird gerade eingerichtet. Bitte schreiben Sie uns solange an info@hyloft.de." };
  if (istBot(fd)) redirect("/registrieren/danke");
  const firma = txt(fd, "firma", 120);
  const gewerk = txt(fd, "gewerk", 40);
  const ort = txt(fd, "ort", 120);
  const radius = Math.min(150, Math.max(10, Number(fd.get("radius")) || 50));
  const name = txt(fd, "name", 120);
  const email = txt(fd, "email", 160).toLowerCase();
  const telefon = txt(fd, "telefon", 60);
  const website = txt(fd, "website", 200);
  const beschreibung = txt(fd, "beschreibung", 2000);
  const leistungen = fd.getAll("leistungen").map((x) => String(x).slice(0, 60)).slice(0, 20);
  const lofttuer = txt(fd, "lofttuer_bedarf", 40);
  const rueckruf = txt(fd, "rueckruf", 40);

  if (!firma || !gewerkBySlug(gewerk) || !ort || !name || !emailOk(email) || telefon.length < 5)
    return { fehler: "Bitte alle Pflichtfelder ausfüllen (Firma, Gewerk, Ort, Name, E-Mail, Telefon)." };
  if (fd.get("einwilligung") !== "on") return { fehler: "Bitte stimmen Sie den Partnerbedingungen und der Kontaktaufnahme zu." };
  if (!(await rateLimit("registrierung", 3, 60))) return { fehler: "Bitte versuchen Sie es später erneut." };

  await sql()`insert into registrierungen (firma, gewerk, ort, radius_km, name, email, telefon, website, beschreibung, leistungen, lofttuer_bedarf, rueckruf, einwilligung_at)
              values (${firma}, ${gewerk}, ${ort}, ${radius}, ${name}, ${email}, ${telefon}, ${website}, ${beschreibung}, ${leistungen}, ${lofttuer}, ${rueckruf}, now())`;

  await sendeMail(
    HYLOFT_INTERN,
    `Neue Registrierung: ${firma} (${gewerkBySlug(gewerk)?.name}, ${ort})`,
    `Neue Partner-Registrierung\n\nFirma: ${firma}\nGewerk: ${gewerkBySlug(gewerk)?.name}\nOrt: ${ort} (bis ${radius} km)\nAnsprechpartner: ${name}\nTelefon: ${telefon}\nE-Mail: ${email}\nWebsite: ${website || "–"}\nRückruf: ${rueckruf || "egal"}\nLofttür-Bedarf: ${lofttuer || "–"}\nLeistungen: ${leistungen.join(", ") || "–"}\n\n${beschreibung}\n\n→ Freischaltungsanruf innerhalb von 48 Stunden.`,
    { text: "Im Admin öffnen", url: `${SITE_URL}/admin/registrierungen` }
  );
  await sendeMail(
    email,
    "Ihre Registrierung im Hyloft Partnernetz",
    `Guten Tag ${name},\n\nvielen Dank für Ihre Registrierung im Hyloft Partnernetz. Ihre Angaben für ${firma} liegen uns vor.\n\nWir rufen Sie innerhalb von 48 Stunden unter ${telefon} an, um Ihr Profil gemeinsam zu prüfen. Nach dem Gespräch erhalten Sie Ihren Zugang zum Partnerbereich.\n\nViele Grüße\nIhr Hyloft-Team`
  );
  redirect("/registrieren/danke");
}
