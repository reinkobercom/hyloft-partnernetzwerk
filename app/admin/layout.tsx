import Link from "next/link";
import { Logo } from "@/components/Chrome";
import { nutzerPflicht } from "@/lib/auth";
import { sql } from "@/lib/db";
import { AbmeldenKnopf } from "../partnerbereich/Teile";
import AdminNav from "./AdminNav";

export const metadata = { title: "Admin – Hyloft Partnernetz", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const u = await nutzerPflicht("admin");
  const [z] = await sql()<{ reg: number; anf: number; srv: number }[]>`
    select (select count(*) from registrierungen where status = 'offen')::int as reg,
           (select count(*) from anfragen where status = 'neu')::int as anf,
           (select count(*) from partner_service where status = 'neu')::int as srv`;
  return (
    <div className="min-h-screen bg-stone">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="rounded-full bg-forest px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-mint">Admin</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-muted sm:block">{u.email}</span>
            <Link href="/" target="_blank" className="text-sm font-medium text-muted hover:text-ink">Website ↗</Link>
            <AbmeldenKnopf />
          </div>
        </div>
        <AdminNav zaehler={{ registrierungen: z.reg, anfragen: z.anf, service: z.srv }} />
      </header>
      {u.passwortTemporaer && (
        <div className="bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
          Sie nutzen noch ein Startpasswort. <Link href="/admin/team#passwort" className="font-semibold underline">Jetzt eigenes Passwort festlegen</Link>
        </div>
      )}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
