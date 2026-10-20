import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, PUBLIC_EMAIL, FOUNDERS } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),

  title: {
    default: "A&O Holdings — AI Strategy & Data Intelligence",
    template: "%s | A&O Holdings",
  },
  description:
    "A&O Holdings is a founder-led AI consultancy delivering predictive intelligence, agentic AI frameworks, AI-powered web products, and business growth strategy.",
  keywords: [
    "AI consulting",
    "data science",
    "predictive modeling",
    "agentic AI",
    "AI automation",
    "business analytics",
    "AI strategy",
    "machine learning consulting",
  ],

  // Canonical
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "A&O Holdings",
    title: "A&O Holdings — AI Strategy & Data Intelligence",
    description:
      "We build the models your competitors haven't thought of yet. Founder-led AI & data science consultancy.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "A&O Holdings — AI Strategy & Data Intelligence",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "A&O Holdings — AI Strategy & Data Intelligence",
    description:
      "We build the models your competitors haven't thought of yet. Founder-led AI & data science consultancy.",
    images: ["/opengraph-image"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Google Search Console verification (DNS TXT method also works — see LAUNCH_CHECKLIST.md)
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    },
  }),

  // Icons
  icons: {
    icon: "/favicon.ico",
  },
};

// JSON-LD structured data — no phone number, no personal emails
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: "A&O Holdings",
      url: SITE_URL,
      email: PUBLIC_EMAIL,
      description:
        "A&O Holdings is a founder-led consultancy delivering predictive intelligence, agentic AI frameworks, AI-powered web products, and business growth strategy.",
      areaServed: "Worldwide",
      serviceType: [
        "AI Strategy Advisory",
        "Data Science & Predictive Modeling",
        "Agentic AI Framework",
        "AI-Powered Web Development",
        "Business Automation",
      ],
      founder: FOUNDERS.map(f => ({
        "@type": "Person",
        name: f.name,
        jobTitle: `${f.role} — ${f.focus}`,
        sameAs: [f.linkedin],
        worksFor: { "@id": `${SITE_URL}/#organization` },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "A&O Holdings",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full antialiased"
        style={{ background: "var(--ivory)", color: "var(--charcoal)" }}
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
