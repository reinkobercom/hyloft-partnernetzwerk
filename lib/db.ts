import "server-only";
import postgres from "postgres";

/** Verbindungs-URL: lokal DATABASE_URL, auf Vercel setzt die Supabase-Integration POSTGRES_URL. */
export const DB_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
export const dbKonfiguriert = Boolean(DB_URL);

const g = globalThis as unknown as { __hpSql?: postgres.Sql };

export function sql(): postgres.Sql {
  if (!DB_URL) throw new Error("Datenbank nicht konfiguriert (DATABASE_URL / POSTGRES_URL fehlt).");
  if (!g.__hpSql) {
    const lokal = /localhost|127\.0\.0\.1/.test(DB_URL);
    g.__hpSql = postgres(DB_URL, {
      max: 3,
      idle_timeout: 20,
      prepare: false, // nötig für den Supabase-Transaction-Pooler
      ssl: lokal ? false : "require",
    });
  }
  return g.__hpSql;
}
