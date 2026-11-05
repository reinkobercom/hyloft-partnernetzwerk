import RechtsSeite from "@/components/RechtsSeite";
import { DATENSCHUTZ } from "@/lib/rechtstexte";

export const metadata = { title: "Datenschutzerklärung – Hyloft Partnernetz" };

export default function Datenschutz() {
  return <RechtsSeite titel="Datenschutzerklärung" bloecke={DATENSCHUTZ} />;
}
