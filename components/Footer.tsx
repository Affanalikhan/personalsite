"use client";

import Link from "next/link";

const NAV = [
  { label: "Services",    href: "#services"  },
  { label: "How We Work", href: "#process"   },
  { label: "Founders",    href: "#founders"  },
  { label: "Contact",     href: "#contact"   },
];

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer aria-label="Site footer" style={{ background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="wrap py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group" aria-label="A&O Holdings">
              <div className="w-9 h-9 border flex items-center justify-center transition-colors duration-300 group-hover:border-[var(--gold)]"
                style={{ borderColor: "rgba(184,145,58,0.35)", background: "rgba(184,145,58,0.08)" }}>
                <span className="font-display text-[0.58rem] font-bold tracking-[0.14em]" style={{ color: "var(--gold)" }}>A&O</span>
              </div>
              <span className="font-display text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--white)" }}>Holdings</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[15rem]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Independent consulting at the intersection of data science, AI, product strategy, and commercial growth.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow text-[0.6rem] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>Navigation</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV.map(({ label, href }) => (
                <a key={href} href={href}
                  onClick={e => { e.preventDefault(); scrollTo(href); }}
                  className="text-sm w-fit hover-line transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <p className="eyebrow text-[0.6rem] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>Start a conversation</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Most engagements begin with a free 30-minute discovery call. No pitch, no pressure.
            </p>
            <a href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300"
              style={{ background: "var(--gold)", color: "var(--white)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
            >
              Book a Call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} A&amp;O Holdings. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Co-founded by Affan Ali Khan &amp; Mohammed Omer Khan.
          </p>
        </div>
      </div>
    </footer>
  );
}
