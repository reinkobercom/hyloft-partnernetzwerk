"use client";

// Klickdummy-Speicher im Browser (sessionStorage). Wird später durch die Datenbank ersetzt.

export type Anfrage = {
  id: string;
  datum: string;
  gewerke: string[];
  art: string;
  zeitraum: string;
  beschreibung: string;
  ort: string;
  lofttuer: string;
  name: string;
  email: string;
  telefon: string;
  partner: string[]; // Partner-Slugs
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const ANFRAGEN = "hyloft-anfragen";

export const ladeAnfragen = () => read<Anfrage[]>(ANFRAGEN, []);
export const speichereAnfrage = (a: Anfrage) => write(ANFRAGEN, [a, ...ladeAnfragen()]);

export function neueId() {
  return Math.random().toString(36).slice(2, 9);
}
