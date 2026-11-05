import "server-only";
import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { headers } from "next/headers";
import { sql } from "./db";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number, opts: object) => Promise<Buffer>;
const N = 16384, R = 8, P = 1, LEN = 64;

export async function hashPassword(pw: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(pw, salt, LEN, { N, r: R, p: P, maxmem: 64 * 1024 * 1024 });
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(pw: string, stored: string | null) {
  if (!stored) {
    // Zeitverhalten angleichen, damit nicht erkennbar ist, ob ein Konto existiert
    await scrypt(pw, randomBytes(16), LEN, { N, r: R, p: P, maxmem: 64 * 1024 * 1024 });
    return false;
  }
  const [alg, n, r, p, salt, hash] = stored.split("$");
  if (alg !== "scrypt") return false;
  const erwartet = Buffer.from(hash, "base64");
  const ist = await scrypt(pw, Buffer.from(salt, "base64"), erwartet.length, {
    N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024,
  });
  return ist.length === erwartet.length && timingSafeEqual(ist, erwartet);
}

export const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
export const zufallsToken = (bytes = 32) => randomBytes(bytes).toString("base64url");

/** Gut lesbares Startpasswort, z. B. „Tuer-Kx7p-Glas-42“ */
export function startPasswort() {
  const w = ["Tuer", "Glas", "Stahl", "Loft", "Raum", "Licht", "Rahmen", "Sprosse"];
  const pick = () => w[randomBytes(1)[0] % w.length];
  const z = randomBytes(4).toString("base64url").replace(/[-_]/g, "x").slice(0, 4);
  return `${pick()}-${z}-${pick()}-${10 + (randomBytes(1)[0] % 90)}`;
}

export function gleich(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

async function clientIpHash() {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unbekannt";
  return sha256(`${ip}|${process.env.SESSION_SECRET || "hyloft"}`).slice(0, 32);
}

/**
 * Einfacher Missbrauchsschutz: höchstens `max` Aktionen je IP in `fensterMin` Minuten.
 * Gibt true zurück, wenn die Aktion erlaubt ist.
 */
export async function rateLimit(aktion: string, max: number, fensterMin: number) {
  const key = `${aktion}:${await clientIpHash()}`;
  const db = sql();
  if (Math.random() < 0.05) await db`delete from rate_limits where created_at < now() - interval '24 hours'`;
  const [{ n }] = await db<{ n: number }[]>`
    select count(*)::int as n from rate_limits
    where schluessel = ${key} and created_at > now() - make_interval(mins => ${fensterMin})`;
  if (n >= max) return false;
  await db`insert into rate_limits (schluessel) values (${key})`;
  return true;
}
