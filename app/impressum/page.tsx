import RechtsSeite from "@/components/RechtsSeite";
import { IMPRESSUM } from "@/lib/rechtstexte";

export const metadata = { title: "Impressum – Hyloft Partnernetz" };

export default function Impressum() {
  return (
    <RechtsSeite
      titel="Impressum"
      bloecke={IMPRESSUM}
      zusatz={[{ p: "Gemeinde- und Einwohnerdaten: Quelle Statistisches Bundesamt (Destatis), Gemeindeverzeichnis, Datenlizenz Deutschland – Namensnennung – Version 2.0 (dl-de/by-2-0)." }]}
    />
  );
}
