import Link from "next/link";
import ProfilForm, { type ProfilWerte } from "@/components/ProfilForm";
import { sql } from "@/lib/db";
import { resolveOrt } from "@/lib/data";
import { partnerAnlegen } from "../../actions";

export default async function PartnerNeu({ searchParams }: { searchParams: Promise<{ registrierung?: string }> }) {
  const { registrierung } = await searchParams;
  let werte: ProfilWerte = {
    firma: "", gewerk: "", ort: "", plz: "", radius_km: 50, inhaber: "", telefon: "", email: "", website: "", claim: "", beschreibung: "",
    leistungen: [], seit: null, mitarbeiter: "", logo_id: null, bilder: [], lofttuer_erfahrung: false, status: "live", verifiziert: true, notiz_intern: "",
  };
  let regId: string | null = null;
  if (registrierung && /^[0-9a-f-]{36}$/i.test(registrierung)) {
    const [r] = await sql()<{ id: string; firma: string; gewerk: string; ort: string; radius_km: number; name: string; email: string; telefon: string; website: string; beschreibung: string; leistungen: string[]; lofttuer_bedarf: string; rueckruf: string }[]>`
      select * from registrierungen where id = ${registrierung}`;
    if (r) {
      regId = r.id;
      const geo = resolveOrt(r.ort);
      werte = {
        ...werte,
        firma: r.firma, gewerk: r.gewerk, ort: geo?.name ?? r.ort.replace(/\d{5}/, "").trim(), plz: geo?.plz ?? (r.ort.match(/\d{5}/)?.[0] ?? ""),
        radius_km: r.radius_km, inhaber: r.name, telefon: r.telefon, email: r.email, website: r.website, beschreibung: r.beschreibung, leistungen: r.leistungen,
        notiz_intern: `Aus Registrierung vom ${new Date().toLocaleDateString("de-DE")}. Lofttür-Bedarf: ${r.lofttuer_bedarf || "–"}`,
      };
    }
  }
  return (
    <section className="rounded-3xl bg-white p-6 sm:p-8">
      <Link href="/admin/partner" className="text-sm text-muted hover:text-ink">← Partner</Link>
      <h1 className="mt-3 text-2xl font-semibold">Partner anlegen</h1>
      <p className="mb-8 mt-1 text-sm text-muted">{regId ? "Daten aus der Registrierung übernommen. Im nächsten Schritt legst du den Login an." : "Im nächsten Schritt legst du den Login für den Partner an."}</p>
      <ProfilForm admin werte={werte} action={partnerAnlegen} knopf="Partner anlegen" registrierung={regId ?? undefined} />
    </section>
  );
}
