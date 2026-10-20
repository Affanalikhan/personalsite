"use client";

import Link from "next/link";
import { FOUNDERS } from "@/lib/site";

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
            <div style={{ marginBottom: "var(--s-32)" }}>
              <Link href="/" aria-label="A&O Holdings — Home" style={{ textDecoration: "none" }}>
                <span style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(40px,5vw,64px)",
                  fontWeight: 700,
                  letterSpacing: "-.03em",
                  lineHeight: 1,
                  color: "var(--off-white)",
                  display: "block",
                }}>A&amp;O</span>
                <span style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(40px,5vw,64px)",
                  fontWeight: 700,
                  letterSpacing: "-.03em",
                  lineHeight: 1,
                  color: "var(--gold)",
                  display: "block",
                }}>Holdings</span>
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
            <nav style={{ display: "flex", flexDirection: "column", gap: "var(--s-16)" }} aria-label="Footer navigation">
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

          {/* Founders — sourced from lib/site.ts */}
          <div>
            <p className="t-eyebrow text-[11px]" style={{ color: "var(--gold)", marginBottom: "var(--s-24)" }}>Co-Founders</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-16)" }}>
              {FOUNDERS.map(({ name, focus, linkedin }) => (
                <a key={name} href={linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  aria-label={`${name} on LinkedIn`}
                >
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "rgba(245,243,238,.7)", marginBottom: "2px" }}>
                    {name}
                  </p>
                  <p className="t-small" style={{ color: "rgba(245,243,238,.35)", fontSize: "12px" }}>
                    {focus}
                  </p>
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
            flexWrap: "wrap",
            gap: "var(--s-16)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(245,243,238,.3)" }}>
            © {new Date().getFullYear()} A&amp;O Holdings. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "var(--s-24)", alignItems: "center" }}>
            <Link href="/privacy"
              style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(245,243,238,.3)", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
            <Link href="/terms"
              style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(245,243,238,.3)", textDecoration: "none" }}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
