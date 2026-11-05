import { Header, Footer } from "./Chrome";
import type { RBlock } from "@/lib/rechtstexte";

export default function RechtsSeite({ titel, bloecke, zusatz }: { titel: string; bloecke: RBlock[]; zusatz?: RBlock[] }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-14 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight">{titel}</h1>
        <div className="mt-8">
          {[...bloecke, ...(zusatz ?? [])].map((b, i) => {
            if ("h2" in b) return <h2 key={i} className="mt-10 text-xl font-semibold text-ink">{b.h2}</h2>;
            if ("h3" in b) return <h3 key={i} className="mt-6 font-semibold text-ink">{b.h3}</h3>;
            if ("liste" in b)
              return (
                <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed text-ink/85">
                  {b.liste.map((l, j) => <li key={j}>{l}</li>)}
                </ul>
              );
            const entwurf = b.p.startsWith("Entwurf");
            return (
              <p key={i} className={entwurf ? "mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-200" : "mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/85"}>
                {b.p}
              </p>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
