import "server-only";
import { sql } from "./db";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://partner.hyloft.de").replace(/\/$/, "");
/** Interne Benachrichtigungen (Registrierungen, Anfragen, Partnerservice) – mehrere Adressen per Komma */
export const HYLOFT_INTERN = process.env.HYLOFT_INTERN_EMAIL || "simon@reinkober.com,info@hyloft.de";
const ABSENDER = process.env.MAIL_ABSENDER || "Hyloft Partnernetz <info@partner.hyloft.de>";
const ANTWORT_AN = process.env.MAIL_ANTWORT_AN || "info@hyloft.de";

export const mailKonfiguriert = Boolean(process.env.RESEND_API_KEY);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function html(text: string, knopf?: { text: string; url: string }) {
  const absaetze = esc(text)
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px;line-height:1.6">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  const btn = knopf
    ? `<p style="margin:24px 0"><a href="${esc(knopf.url)}" style="display:inline-block;background:#213a34;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:bold">${esc(knopf.text)}</a></p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#f4f3ef;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1b2421;font-size:15px">
<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #dcdfdc"><tr><td style="padding:28px 32px">
<p style="margin:0 0 24px;font-size:20px;letter-spacing:3px;color:#213a34"><strong>HYLOFT</strong> <span style="font-size:11px;letter-spacing:4px;color:#5e6b66">PARTNERNETZ</span></p>
${absaetze}${btn}
<p style="margin:28px 0 0;font-size:12px;color:#5e6b66;line-height:1.5">Hyloft GmbH · Stemmenkamp 83a · 59368 Werne · info@hyloft.de · +49 172 5374847</p>
</td></tr></table></body></html>`;
}

/** Sendet eine Mail über Resend (falls konfiguriert) und protokolliert sie immer. Wirft nie. */
export async function sendeMail(an: string, betreff: string, text: string, knopf?: { text: string; url: string }) {
  const empfaenger = an.split(",").map((x) => x.trim()).filter(Boolean);
  const volltext = knopf ? `${text}\n\n${knopf.text}: ${knopf.url}` : text;
  let status: "gesendet" | "nicht_konfiguriert" | "fehler" = "nicht_konfiguriert";
  let fehler = "";
  if (mailKonfiguriert) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: ABSENDER, to: empfaenger, reply_to: ANTWORT_AN, subject: betreff, text: volltext, html: html(text, knopf) }),
      });
      if (res.ok) status = "gesendet";
      else {
        status = "fehler";
        fehler = `${res.status} ${(await res.text()).slice(0, 300)}`;
      }
    } catch (e) {
      status = "fehler";
      fehler = String(e).slice(0, 300);
    }
  }
  try {
    await sql()`insert into email_log (an, betreff, text, status, fehler) values (${empfaenger.join(", ")}, ${betreff}, ${volltext}, ${status}, ${fehler})`;
  } catch {}
  return status;
}
