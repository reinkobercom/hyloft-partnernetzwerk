import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DemoBanner } from "@/components/Chrome";

const montserrat = localFont({
  src: "./fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hyloft Partnernetz – Fachbetriebe für Planung & Ausbau in NRW",
  description:
    "Finden Sie Innenarchitekten, Tischler, Innenausbauer und weitere Fachbetriebe in Ihrer Nähe – geprüft vom Hyloft-Team.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={montserrat.variable}>
      <body className="font-sans">
        <DemoBanner />
        {children}
      </body>
    </html>
  );
}
