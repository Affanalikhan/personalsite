import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A&O Holdings — AI Strategy & Data Intelligence",
  description:
    "A&O Holdings is an independent consulting firm delivering predictive intelligence, agentic AI frameworks, AI-powered web products, and business growth strategy.",
  keywords: [
    "AI consulting",
    "data science",
    "predictive modeling",
    "agentic AI",
    "AI automation",
    "business analytics",
    "AI strategy",
  ],
  openGraph: {
    title: "A&O Holdings",
    description: "We build the models your competitors haven't thought of yet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full antialiased" style={{ background: "var(--ivory)", color: "var(--charcoal)" }}>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
