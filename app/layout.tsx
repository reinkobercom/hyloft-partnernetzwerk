import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://partner.hyloft.de"),
  openGraph: { siteName: "Hyloft Partnernetz", locale: "de_DE", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={montserrat.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
