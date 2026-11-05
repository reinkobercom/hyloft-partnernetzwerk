"use client";

import { useState } from "react";

/** Verkleinert ein Bild im Browser (spart Upload-Zeit) und lädt es hoch. Gibt die Datei-ID zurück. */
export async function bildHochladen(datei: File, maxKante: number, alsPng = false): Promise<string> {
  const bitmap = await createImageBitmap(datei);
  const faktor = Math.min(1, maxKante / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * faktor);
  canvas.height = Math.round(bitmap.height * faktor);
  const ctx = canvas.getContext("2d")!;
  if (!alsPng) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob: Blob = await new Promise((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error("Bild konnte nicht verarbeitet werden"))), alsPng ? "image/png" : "image/jpeg", 0.84)
  );
  const fd = new FormData();
  fd.append("datei", blob, alsPng ? "bild.png" : "bild.jpg");
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.fehler || "Upload fehlgeschlagen");
  return json.id as string;
}

const url = (id: string) => `/api/datei/${id}`;

export function LogoUpload({ wert, onChange }: { wert: string | null; onChange: (id: string | null) => void }) {
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState("");
  return (
    <div className="flex items-center gap-5">
      <label className="relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-stone text-xs text-muted hover:border-forest/40">
        {wert ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url(wert)} alt="Logo" className="h-full w-full bg-white object-contain p-2" />
        ) : laedt ? "Lädt …" : "Logo"}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setLaedt(true);
            setFehler("");
            try {
              onChange(await bildHochladen(f, 600, true));
            } catch (err) {
              setFehler(String((err as Error).message));
            }
            setLaedt(false);
          }}
        />
      </label>
      <div className="text-sm">
        <p className="font-medium">Firmenlogo</p>
        <p className="text-muted">PNG, JPG oder WebP. Quadratisch wirkt am besten.</p>
        {wert && <button type="button" onClick={() => onChange(null)} className="mt-1 text-xs font-semibold text-red-700">Entfernen</button>}
        {fehler && <p className="mt-1 text-xs text-red-700">{fehler}</p>}
      </div>
    </div>
  );
}

export function FotosUpload({ werte, onChange, max = 6 }: { werte: string[]; onChange: (ids: string[]) => void; max?: number }) {
  const [laedt, setLaedt] = useState(0);
  const [fehler, setFehler] = useState("");
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {werte.map((id, i) => (
          <div key={id} className="group relative aspect-square overflow-hidden rounded-2xl bg-stone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url(id)} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-x-2 top-2 flex justify-between gap-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
              {i > 0 ? (
                <button type="button" onClick={() => onChange([id, ...werte.filter((x) => x !== id)])} className="rounded-full bg-white/90 px-2 py-0.5 text-[0.7rem] font-semibold text-ink">
                  Als Titelbild
                </button>
              ) : <span className="rounded-full bg-forest px-2 py-0.5 text-[0.7rem] font-semibold text-white">Titelbild</span>}
              <button type="button" onClick={() => onChange(werte.filter((x) => x !== id))} className="rounded-full bg-white/90 px-2 py-0.5 text-[0.7rem] font-semibold text-red-700">
                ✕
              </button>
            </div>
          </div>
        ))}
        {werte.length + laedt < max && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-line bg-stone text-center text-xs text-muted hover:border-forest/40">
            <span className="text-2xl leading-none text-forest">+</span>
            {laedt ? `Lädt ${laedt} …` : "Foto hinzufügen"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="hidden"
              onChange={async (e) => {
                const files = Array.from(e.target.files ?? []).slice(0, max - werte.length);
                e.target.value = "";
                setFehler("");
                setLaedt(files.length);
                const neu: string[] = [];
                for (const f of files) {
                  try {
                    neu.push(await bildHochladen(f, 1600));
                  } catch (err) {
                    setFehler(String((err as Error).message));
                  }
                }
                setLaedt(0);
                onChange([...werte, ...neu]);
              }}
            />
          </label>
        )}
      </div>
      {fehler && <p className="mt-2 text-xs text-red-700">{fehler}</p>}
    </div>
  );
}
