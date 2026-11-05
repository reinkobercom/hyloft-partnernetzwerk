import { notFound } from "next/navigation";
import { Logo } from "@/components/Chrome";
import SetupForm from "./SetupForm";

export const metadata = { title: "Einrichtung – Hyloft Partnernetz", robots: { index: false } };

export default async function Setup({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  if (!process.env.SETUP_TOKEN || !token) notFound();
  return (
    <div className="flex min-h-screen flex-col bg-stone">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
        <Logo />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-20">
        <SetupForm token={token} />
      </div>
    </div>
  );
}
