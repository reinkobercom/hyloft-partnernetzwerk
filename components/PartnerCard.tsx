import Link from "next/link";
import { gewerkBySlug, initialen, type Treffer } from "@/lib/data";

export function Avatar({ firma, size = "md" }: { firma: string; size?: "md" | "lg" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-forest font-semibold tracking-wider text-mint ${
        size === "lg" ? "h-20 w-20 text-2xl" : "h-12 w-12 text-sm"
      }`}
    >
      {initialen(firma)}
    </span>
  );
}

export function Badge({ children, tone = "mint" }: { children: React.ReactNode; tone?: "mint" | "stone" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${
        tone === "mint" ? "bg-mint text-forest" : "bg-stone text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export const Check = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export default function PartnerCard({ p }: { p: Treffer }) {
  const g = gewerkBySlug(p.gewerk);
  return (
    <Link
      href={`/partner/${p.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/10 sm:grid-cols-[220px_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone sm:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.bilder[0]} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <Avatar firma={p.firma} />
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-muted">{g?.name}</p>
            <h3 className="mt-1 text-lg font-semibold text-ink group-hover:text-forest">{p.firma}</h3>
            <p className="mt-0.5 text-sm text-muted">
              {p.ort}
              {p.distanz !== undefined && <> · {p.distanz < 3 ? "direkt vor Ort" : `ca. ${p.distanz} km entfernt`}</>}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink/80">{p.claim}</p>
        <p className="hidden text-xs leading-relaxed text-muted sm:block">{p.leistungen.join(" · ")}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {p.verifiziert && <Badge>{Check} Von Hyloft geprüft</Badge>}
          {p.lofttuerErfahrung && <Badge tone="stone">Erfahrung mit Lofttüren</Badge>}
          <Badge tone="stone">Beispielprofil</Badge>
        </div>
      </div>
    </Link>
  );
}
