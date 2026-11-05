import { sql, dbKonfiguriert } from "@/lib/db";

/** Zählt einen Profilaufruf (nur Zähler pro Tag, keine personenbezogenen Daten). */
export async function POST(req: Request) {
  if (!dbKonfiguriert) return new Response(null, { status: 204 });
  const { slug } = (await req.json().catch(() => ({}))) as { slug?: string };
  if (!slug || typeof slug !== "string" || slug.length > 80) return new Response(null, { status: 400 });
  await sql()`
    insert into profil_aufrufe (partner_id, tag, anzahl)
    select id, current_date, 1 from partners where slug = ${slug} and status = 'live'
    on conflict (partner_id, tag) do update set anzahl = profil_aufrufe.anzahl + 1`;
  return new Response(null, { status: 204 });
}
