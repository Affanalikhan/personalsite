import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--navy)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--s-64)",
        textAlign: "center",
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--s-32)" }}>
        <span style={{ width: "32px", height: "1px", background: "var(--gold)", display: "inline-block" }} aria-hidden="true" />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          404
        </span>
        <span style={{ width: "32px", height: "1px", background: "var(--gold)", display: "inline-block" }} aria-hidden="true" />
      </div>

      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(44px,6vw,80px)",
          fontWeight: 700,
          letterSpacing: "-.02em",
          lineHeight: 1.08,
          color: "var(--off-white)",
          marginBottom: "var(--s-24)",
        }}
      >
        Page not found.
      </h1>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(15px,1.1vw,17px)",
          lineHeight: 1.7,
          color: "rgba(245,243,238,.55)",
          maxWidth: "48ch",
          marginBottom: "var(--s-48)",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Head back to the homepage.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "16px 32px",
          background: "var(--gold)",
          color: "var(--charcoal)",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        Back to Home
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </main>
  );
}
