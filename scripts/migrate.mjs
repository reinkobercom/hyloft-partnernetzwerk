// Führt alle SQL-Dateien aus db/ der Reihe nach aus (einmalig je Datei)
// und legt die Admin-Konten aus ADMIN_EMAILS an. Läuft automatisch vor jedem Build.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const url = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  console.log("[migrate] Keine Datenbank konfiguriert – Migration übersprungen.");
  process.exit(0);
}

const lokal = /localhost|127\.0\.0\.1/.test(url);
const sql = postgres(url, { max: 1, prepare: false, ssl: lokal ? false : "require", onnotice: () => {} });
const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "db");

try {
  await sql`create table if not exists schema_migrations (name text primary key, applied_at timestamptz not null default now())`;
  const erledigt = new Set((await sql`select name from schema_migrations`).map((r) => r.name));
  const dateien = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
  for (const f of dateien) {
    if (erledigt.has(f)) continue;
    const inhalt = readFileSync(join(dir, f), "utf8");
    await sql.begin(async (tx) => {
      await tx.unsafe(inhalt);
      await tx`insert into schema_migrations (name) values (${f})`;
    });
    console.log(`[migrate] ${f} angewendet`);
  }

  const admins = (process.env.ADMIN_EMAILS || "simon@reinkober.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  for (const email of admins) {
    await sql`insert into users (email, role) values (${email}, 'admin')
              on conflict (email) do update set role = 'admin'`;
  }
  console.log(`[migrate] Fertig. Admins: ${admins.join(", ")}`);
} catch (e) {
  console.error("[migrate] Fehler:", e);
  process.exitCode = 1;
} finally {
  await sql.end();
}
