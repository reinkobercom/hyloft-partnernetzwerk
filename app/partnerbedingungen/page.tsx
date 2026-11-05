import RechtsSeite from "@/components/RechtsSeite";
import { PARTNERBEDINGUNGEN } from "@/lib/rechtstexte";

export const metadata = { title: "Partnerbedingungen – Hyloft Partnernetz" };

export default function Partnerbedingungen() {
  return <RechtsSeite titel="Partnerbedingungen" bloecke={PARTNERBEDINGUNGEN} />;
}
