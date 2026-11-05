import { redirect } from "next/navigation";
import { Logo } from "@/components/Chrome";
import { aktuellerNutzer, startseiteFuer } from "@/lib/auth";
import { mailKonfiguriert } from "@/lib/mail";
import LoginForm from "./LoginForm";

export const metadata = { title: "Anmelden – Hyloft Partnernetz", robots: { index: false } };

export default async function Login({ searchParams }: { searchParams: Promise<{ weiter?: string }> }) {
  const u = await aktuellerNutzer();
  if (u) redirect(startseiteFuer(u));
  const { weiter } = await searchParams;
  return (
    <div className="flex min-h-screen flex-col bg-stone">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
        <Logo />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-20">
        <LoginForm weiter={weiter} mailAktiv={mailKonfiguriert} />
      </div>
    </div>
  );
}
