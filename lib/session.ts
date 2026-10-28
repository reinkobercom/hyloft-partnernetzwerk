"use client";

export type Registrierung = {
  firma: string;
  gewerk: string;
  ort: string;
  radius: string;
  name: string;
  email: string;
  telefon: string;
  website: string;
  beschreibung: string;
  leistungen: string[];
  lofttuerBedarf: string;
  rueckruf: string;
  datum: string;
};

const KEY = "hyloft-partner-registrierung";

export const DEMO: Registrierung = {
  firma: "Tischlerei Musterbetrieb",
  gewerk: "Tischlerei & Schreinerei",
  ort: "Lüdinghausen",
  radius: "50",
  name: "Max Mustermann",
  email: "info@musterbetrieb.de",
  telefon: "02591 000000",
  website: "",
  beschreibung: "",
  leistungen: ["Einbaumöbel", "Innentüren"],
  lofttuerBedarf: "Ja, konkret geplant",
  rueckruf: "Vormittags",
  datum: new Date().toISOString(),
};

export function save(r: Registrierung) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(r));
  } catch {}
}

export function load(): Registrierung | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Registrierung) : null;
  } catch {
    return null;
  }
}
