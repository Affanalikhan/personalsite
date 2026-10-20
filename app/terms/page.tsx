import type { Metadata } from "next";
import Link from "next/link";
import { PUBLIC_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using the A&O Holdings website.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

const LAST_UPDATED = "October 2026";

export default function TermsPage() {
  return (
    <main style={{ background: "var(--ivory)", paddingTop: "65px" }}>
      <div
        className="container"
        style={{ paddingBlock: "var(--s-96)", maxWidth: "760px" }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
            marginBottom: "var(--s-48)",
          }}
        >
          ← Back to Home
        </Link>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "var(--s-16)",
          }}
        >
          Legal
        </p>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px,4vw,48px)",
            fontWeight: 700,
            letterSpacing: "-.02em",
            color: "var(--charcoal)",
            marginBottom: "var(--s-8)",
          }}
        >
          Terms of Use
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "var(--charcoal-3)",
            marginBottom: "var(--s-64)",
          }}
        >
          Last updated: {LAST_UPDATED}
        </p>

        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            lineHeight: 1.75,
            color: "var(--charcoal-2)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--s-32)",
          }}
        >
          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              1. Acceptance
            </h2>
            <p>
              By accessing <a href={SITE_URL} style={{ color: "var(--gold)" }}>{SITE_URL}</a> you agree to
              these terms. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              2. Intellectual property
            </h2>
            <p>
              All content on this website — including text, graphics, logos and code — is the
              property of A&amp;O Holdings and is protected by applicable copyright and
              intellectual property laws. You may not reproduce, distribute or create derivative
              works without our prior written consent.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              3. No professional advice
            </h2>
            <p>
              Content on this website is for informational purposes only and does not constitute
              legal, financial, or professional advice. Engage us directly for consultancy
              services.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              4. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, A&amp;O Holdings shall not be liable for
              any indirect, incidental or consequential damages arising from your use of this
              website.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              5. External links
            </h2>
            <p>
              We may link to third-party websites (e.g. LinkedIn, Calendly). We are not
              responsible for the content or privacy practices of those sites.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              6. Governing law
            </h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes shall be
              subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              7. Changes
            </h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of the site
              after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              8. Contact
            </h2>
            <p>
              Questions?{" "}
              <a href={`mailto:${PUBLIC_EMAIL}`} style={{ color: "var(--gold)" }}>{PUBLIC_EMAIL}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
