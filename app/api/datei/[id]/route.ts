import { sql, dbKonfiguriert } from "@/lib/db";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!dbKonfiguriert || !UUID.test(id)) return new Response("Nicht gefunden", { status: 404 });
  const rows = await sql()<{ mime: string; bytes: Buffer }[]>`select mime, bytes from dateien where id = ${id}`;
  if (!rows[0]) return new Response("Nicht gefunden", { status: 404 });
  return new Response(new Uint8Array(rows[0].bytes), {
    headers: {
      "Content-Type": rows[0].mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'",
    },
  });
}
