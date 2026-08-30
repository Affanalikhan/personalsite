"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#process" },
  { label: "Founders", href: "#founders" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative border-t border-[var(--gold)]/10 bg-[#06101f]"
      aria-label="Site footer"
    >
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 mb-6 group w-fit"
              aria-label="A&O Holdings"
            >
              <div className="w-10 h-10 border border-[var(--gold)]/50 flex items-center justify-center group-hover:border-[var(--gold)] transition-colors duration-300">
                <span className="font-display text-xs font-bold text-[var(--gold)] tracking-widest">
                  A&O
                </span>
              </div>
              <span className="font-display text-sm tracking-[0.15em] text-[var(--cream)]">
                HOLDINGS
              </span>
            </Link>
            <p className="text-[var(--mist)] text-sm leading-relaxed max-w-xs">
              Independent consulting at the intersection of data science,
              AI, and commercial strategy.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-eyebrow mb-5">Navigation</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-[var(--mist)] text-sm hover:text-[var(--cream)] transition-colors duration-300 link-underline w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <p className="text-eyebrow mb-5">Ready to start?</p>
            <p className="text-[var(--mist)] text-sm mb-6 leading-relaxed">
              Most engagements begin with a free 30-minute discovery call.
              No pitch, no pressure.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold)]/50 text-[var(--gold)] text-eyebrow hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-300"
            >
              Book a Call
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--gold)]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[var(--mist)] text-xs">
            © {currentYear} A&O Holdings. All rights reserved.
          </p>
          <p className="text-[var(--mist)]/40 text-xs">
            Co-founded by Affan Ali Khan &amp; Mohammed Omer Khan.
          </p>
        </div>
      </div>
    </footer>
  );
}
