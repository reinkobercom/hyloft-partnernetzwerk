import "server-only";
import { gewerkBySlug, resolveOrt } from "./data";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ProfilDaten = {
  firma: string;
  gewerk: string;
  ort: string;
  plz: string;
  lat: number;
  lng: number;
  radius_km: number;
  inhaber: string;
  telefon: string;
  email: string;
  website: string;
  claim: string;
  beschreibung: string;
  leistungen: string[];
  seit: number | null;
  mitarbeiter: string;
  logo_id: string | null;
  bilder: string[];
  lofttuer_erfahrung: boolean;
};

const t = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);

/** Liest und prüft die Profilfelder aus einem Formular. */
export function profilAusFormular(fd: FormData): { daten?: ProfilDaten; fehler?: string } {
  const firma = t(fd, "firma", 120);
  const gewerk = t(fd, "gewerk", 40);
  const plzEingabe = t(fd, "plz", 10);
  const ortEingabe = t(fd, "ort", 120);
  if (!firma) return { fehler: "Bitte den Firmennamen angeben." };
  if (!gewerkBySlug(gewerk)) return { fehler: "Bitte ein Gewerk wählen." };
  const geo = resolveOrt(plzEingabe || ortEingabe) ?? resolveOrt(ortEingabe);
  if (!geo) return { fehler: "Der Ort wurde nicht gefunden. Bitte eine Postleitzahl aus NRW angeben." };
  const seitRoh = Number(t(fd, "seit", 4));
  const email = t(fd, "email", 160).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { fehler: "Die E-Mail-Adresse ist ungültig." };
  const website = t(fd, "website", 200);
  if (website && /^(javascript|data):/i.test(website)) return { fehler: "Die Website-Adresse ist ungültig." };
  const logo = t(fd, "logo_id", 40);
  const bilder = fd.getAll("bilder").map(String).filter((b) => UUID.test(b)).slice(0, 6);
  const leistungen = [...new Set(fd.getAll("leistungen").map((l) => String(l).trim().slice(0, 60)).filter(Boolean))].slice(0, 20);
  return {
    daten: {
      firma,
      gewerk,
      ort: ortEingabe || geo.name,
      plz: geo.plz,
      lat: geo.lat,
      lng: geo.lng,
      radius_km: Math.min(150, Math.max(5, Number(fd.get("radius_km")) || 50)),
      inhaber: t(fd, "inhaber", 120),
      telefon: t(fd, "telefon", 60),
      email,
      website,
      claim: t(fd, "claim", 160),
      beschreibung: t(fd, "beschreibung", 3000),
      leistungen,
      seit: seitRoh >= 1800 && seitRoh <= new Date().getFullYear() ? seitRoh : null,
      mitarbeiter: t(fd, "mitarbeiter", 20),
      logo_id: UUID.test(logo) ? logo : null,
      bilder,
      lofttuer_erfahrung: fd.get("lofttuer_erfahrung") === "on",
    },
  };
}
