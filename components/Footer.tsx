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
    <footer aria-label="Site footer" style={{ background: "#030912", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="wrap py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3 mb-5" aria-label="A&O Holdings">
              <div className="w-9 h-9 border border-[var(--border-gold)] flex items-center justify-center group-hover:border-[var(--gold)] transition-colors duration-300">
                <span className="font-display text-[0.58rem] font-bold text-[var(--gold)] tracking-[0.15em]">A&O</span>
              </div>
              <span className="font-display text-sm tracking-[0.18em] text-[var(--cream)] uppercase">Holdings</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[14rem]" style={{ color: "var(--cream-dim)" }}>
              Independent consulting at the intersection of data science, AI, and commercial strategy.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow text-[0.62rem] mb-5" style={{ color: "var(--slate)" }}>Navigation</p>
            <nav className="flex flex-col gap-3" aria-label="Footer">
              {NAV.map(({ label, href }) => (
                <a key={href} href={href}
                  onClick={e => { e.preventDefault(); scrollTo(href); }}
                  className="text-sm hover-line w-fit transition-colors duration-250"
                  style={{ color: "var(--cream-dim)" }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <p className="eyebrow text-[0.62rem] mb-5" style={{ color: "var(--slate)" }}>Start a conversation</p>
            <p className="text-sm leading-relaxed mb-6 max-w-[15rem]" style={{ color: "var(--cream-dim)" }}>
              Most engagements begin with a free 30-minute discovery call. No pitch, no pressure.
            </p>
            <a href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-gold)] text-[var(--gold)] eyebrow text-[0.62rem] hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-300"
            >
              Book a Call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--slate)" }}>
            © {new Date().getFullYear()} A&amp;O Holdings. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(100,116,139,0.5)" }}>
            Co-founded by Affan Ali Khan &amp; Mohammed Omer Khan.
          </p>
        </div>
      </div>
    </footer>
  );
}
