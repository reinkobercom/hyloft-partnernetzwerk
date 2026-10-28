"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Chrome";

export default function Login() {
  const router = useRouter();
  const input = "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-forest";
  return (
    <div className="flex min-h-[calc(100vh-28px)] flex-col bg-stone">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
        <Logo />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/partnerbereich");
          }}
          className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-forest/5 sm:p-10"
        >
          <h1 className="text-2xl font-semibold tracking-tight">Partner-Login</h1>
          <p className="mt-1 text-sm text-muted">Melden Sie sich in Ihrem Partnerbereich an.</p>
          <div className="mt-7 grid gap-3">
            <input type="email" placeholder="E-Mail" className={input} />
            <input type="password" placeholder="Passwort" className={input} />
            <button className="mt-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-soft">Anmelden</button>
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Noch kein Profil? <Link href="/registrieren" className="font-semibold text-forest">Kostenlos eintragen</Link>
          </p>
          <p className="mt-4 text-center text-xs text-muted">Prototyp – jede Eingabe führt zum Demo-Partnerbereich.</p>
        </form>
      </div>
    </div>
  );
}
