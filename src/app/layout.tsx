import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis";
import { Cursor } from "@/components/Cursor";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Nav } from "@/components/Nav";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});
const text = Inter({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AUREVIA — Where Curiosity Meets Research",
  description:
    "A scroll-driven editorial story of curiosity, questions, knowledge, and discovery. Where curiosity meets research.",
  metadataBase: new URL("https://aurevia.example"),
  openGraph: {
    title: "AUREVIA — Where Curiosity Meets Research",
    description: "Where curiosity meets research. Discover. Research. Innovate.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} lenis`}>
      <body>
        <LenisProvider>
          <Cursor />
          <ProgressIndicator />
          <Nav />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
