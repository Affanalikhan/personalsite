import type { Metadata } from "next";
import Link from "next/link";
import { PUBLIC_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How A&O Holdings collects, uses and protects your personal data.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const LAST_UPDATED = "October 2026";

export default function PrivacyPage() {
  return (
    <main style={{ background: "var(--ivory)", paddingTop: "65px" }}>
      <div
        className="container"
        style={{ paddingBlock: "var(--s-96)", maxWidth: "760px" }}
      >
        {/* Back */}
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
          Privacy Policy
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
              1. Who we are
            </h2>
            <p>
              A&amp;O Holdings (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an independent AI and data science
              consultancy. Our website is <a href={SITE_URL} style={{ color: "var(--gold)" }}>{SITE_URL}</a>. You can
              contact us at <a href={`mailto:${PUBLIC_EMAIL}`} style={{ color: "var(--gold)" }}>{PUBLIC_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              2. Data we collect
            </h2>
            <p>When you submit our contact form we collect:</p>
            <ul style={{ paddingLeft: "24px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Your name and email address</li>
              <li>Your company name (optional)</li>
              <li>Your service area of interest (optional)</li>
              <li>The message you write to us</li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              We do not collect payment details, government IDs or any special-category personal data via this website.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              3. How we use your data
            </h2>
            <p>We use the data you submit to:</p>
            <ul style={{ paddingLeft: "24px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Respond to your enquiry (legitimate interest / contractual necessity)</li>
              <li>Send you a one-time confirmation email</li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              We will never sell your data, add you to a marketing list without explicit consent,
              or share it with third parties except as described in section 4.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              4. Third-party processors
            </h2>
            <ul style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><strong>Resend</strong> — used to deliver transactional emails. Your name and email are passed to Resend solely for email delivery. <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>Resend Privacy Policy</a>.</li>
              <li><strong>Vercel</strong> — hosts this website and collects aggregate performance analytics (no personally identifiable data). <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>Vercel Privacy Policy</a>.</li>
              <li><strong>Calendly</strong> — if you book a call via our embedded widget, Calendly&apos;s own privacy policy applies. <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>Calendly Privacy Policy</a>.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              5. Analytics
            </h2>
            <p>
              We use Vercel Analytics to collect anonymised, aggregated page-view statistics.
              No cookies are set and no personal data is collected by this tool.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              6. Data retention
            </h2>
            <p>
              Enquiry emails are retained in our email inbox for up to 2 years, after which
              they are deleted. We do not maintain a separate database of contact submissions.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              7. Your rights (GDPR / UK GDPR)
            </h2>
            <p>
              If you are in the UK or EEA you have the right to access, correct, erase, or
              restrict our processing of your personal data. To exercise any of these rights,
              email us at <a href={`mailto:${PUBLIC_EMAIL}`} style={{ color: "var(--gold)" }}>{PUBLIC_EMAIL}</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              8. Cookies
            </h2>
            <p>
              This website does not set any first-party tracking cookies. The Calendly widget
              may set cookies from <code>calendly.com</code> if you interact with it; those are
              governed by Calendly&apos;s own policy.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              9. Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. Material changes will be noted by
              updating the &ldquo;Last updated&rdquo; date above.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "12px" }}>
              10. Contact
            </h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a href={`mailto:${PUBLIC_EMAIL}`} style={{ color: "var(--gold)" }}>{PUBLIC_EMAIL}</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
