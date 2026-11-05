import { Logo } from "@/components/Chrome";
import LinkForm from "./LinkForm";

export const metadata = { title: "Anmelden – Hyloft Partnernetz", robots: { index: false } };

// Der Link wird erst per Klick eingelöst – so verbrauchen Link-Scanner in E-Mail-Programmen ihn nicht.
export default async function LoginLink({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <div className="flex min-h-screen flex-col bg-stone">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
        <Logo />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-20">
        <LinkForm token={token} />
      </div>
    </div>
  );
}
