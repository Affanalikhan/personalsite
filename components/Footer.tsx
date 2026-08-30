"use client";

import Link from "next/link";

const NAV = [
  { label: "Services",    href: "#services"  },
  { label: "How We Work", href: "#process"   },
  { label: "Founders",    href: "#founders"  },
  { label: "Contact",     href: "#contact"   },
];

const goto = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer aria-label="Site footer" style={{ background: "var(--navy)" }}>

      {/* ── Main footer content ─────────────────────────────────── */}
      <div className="container" style={{ paddingBlock: "var(--s-96)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-16">

          {/* Brand column */}
          <div>
            {/* Large wordmark */}
            <div style={{ marginBottom: "var(--s-32)" }}>
              <Link href="/" aria-label="A&O Holdings — Home"
                style={{ textDecoration: "none" }}
              >
                <span style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(40px,5vw,64px)",
                  fontWeight: 700,
                  letterSpacing: "-.03em",
                  lineHeight: 1,
                  color: "var(--off-white)",
                  display: "block",
                }}>
                  A&amp;O
                </span>
                <span style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(40px,5vw,64px)",
                  fontWeight: 700,
                  letterSpacing: "-.03em",
                  lineHeight: 1,
                  color: "var(--gold)",
                  display: "block",
                }}>
                  Holdings
                </span>
              </Link>
            </div>

            <p className="t-body" style={{ color: "rgba(245,243,238,.5)", maxWidth: "34ch", marginBottom: "var(--s-32)" }}>
              Independent consulting at the intersection of data science, AI,
              product strategy, and commercial growth.
            </p>

            <a href="#contact"
              onClick={e => { e.preventDefault(); goto("#contact"); }}
              className="btn-primary"
            >
              Book a Free Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="t-eyebrow text-[11px]" style={{ color: "var(--gold)", marginBottom: "var(--s-24)" }}>Navigation</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "var(--s-16)" }} aria-label="Footer">
              {NAV.map(({ label, href }) => (
                <a key={href} href={href}
                  onClick={e => { e.preventDefault(); goto(href); }}
                  className="text-link"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    color: "rgba(245,243,238,.55)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Founders */}
          <div>
            <p className="t-eyebrow text-[11px]" style={{ color: "var(--gold)", marginBottom: "var(--s-24)" }}>Co-Founders</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-16)" }}>
              {[
                { name: "Affan Ali Khan",    focus: "Data Science & AI",        href: "https://linkedin.com/in/affan-ali-khan" },
                { name: "Mohammed Omer Khan", focus: "Strategy & BD",             href: "https://linkedin.com/in/mohammed-omer-khan" },
              ].map(({ name, focus, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "rgba(245,243,238,.7)", marginBottom: "2px" }}>{name}</p>
                  <p className="t-small" style={{ color: "rgba(245,243,238,.35)", fontSize: "12px" }}>{focus}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <div className="container"
          style={{
            paddingBlock: "var(--s-24)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--s-8)",
            alignItems: "flex-start",
          }}
        >
          <div className="flex flex-wrap gap-6 justify-between w-full items-center">
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(245,243,238,.3)" }}>
              © {new Date().getFullYear()} A&amp;O Holdings. All rights reserved.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(245,243,238,.2)" }}>
              Founded by Affan Ali Khan &amp; Mohammed Omer Khan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
