import { aktuellerNutzer } from "@/lib/auth";
import { sql } from "@/lib/db";

const MAX = 4 * 1024 * 1024;

function erkenneBild(b: Uint8Array): string | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP") return "image/webp";
  return null;
}

/** Nimmt ein Bild entgegen (nur eingeloggte Partner/Admins) und gibt die Datei-ID zurück. */
export async function POST(req: Request) {
  const u = await aktuellerNutzer();
  if (!u) return Response.json({ fehler: "Nicht angemeldet" }, { status: 401 });
  const form = await req.formData();
  const datei = form.get("datei");
  if (!(datei instanceof File)) return Response.json({ fehler: "Keine Datei" }, { status: 400 });
  if (datei.size > MAX) return Response.json({ fehler: "Datei zu groß (max. 4 MB)" }, { status: 413 });
  const bytes = new Uint8Array(await datei.arrayBuffer());
  const mime = erkenneBild(bytes);
  if (!mime) return Response.json({ fehler: "Nur JPG, PNG oder WebP" }, { status: 415 });
  const [row] = await sql()<{ id: string }[]>`
    insert into dateien (mime, bytes, groesse) values (${mime}, ${Buffer.from(bytes)}, ${bytes.length}) returning id`;
  return Response.json({ id: row.id, url: `/api/datei/${row.id}` });
}
