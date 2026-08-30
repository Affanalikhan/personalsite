"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import Link from "next/link";

const NAV = [
  { label: "Services",    href: "#services",  num: "01" },
  { label: "How We Work", href: "#process",   num: "02" },
  { label: "Founders",    href: "#founders",  num: "03" },
  { label: "Contact",     href: "#contact",   num: "04" },
];

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("");

  /* ── scroll detection ── */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* ── active section ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── body scroll lock ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "py-3 bg-[var(--navy-1)] border-b border-white/[0.07]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="wrap flex items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={close} className="group flex items-center gap-3 flex-shrink-0" aria-label="A&O Holdings — Home">
            <div className="w-8 h-8 border border-[var(--gold-dim)] flex items-center justify-center group-hover:border-[var(--gold)] transition-colors duration-300">
              <span className="font-display text-[0.58rem] font-bold text-[var(--gold)] tracking-[0.12em]">A&O</span>
            </div>
            <span className="font-display text-[0.8rem] tracking-[0.22em] text-[var(--cream)] uppercase hidden sm:block">
              Holdings
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV.map(({ label, href }) => (
              <a key={href} href={href}
                onClick={e => { e.preventDefault(); scrollTo(href); }}
                className={`eyebrow text-[0.65rem] transition-colors duration-300 ${
                  active === href.slice(1) ? "text-[var(--cream)]" : "text-[var(--cream-dim)] hover:text-[var(--cream)]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[0.8rem] font-semibold tracking-wide bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-bright)] transition-colors duration-300"
            >
              Book a Call
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[5px] z-[60]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="block w-[22px] h-[1.5px] bg-[var(--cream)] origin-center"
              />
              <motion.span
                animate={menuOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-[22px] h-[1.5px] bg-[var(--cream)] origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="block w-[22px] h-[1.5px] bg-[var(--cream)] origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 z-[45] bg-black/60 md:hidden"
              aria-hidden="true"
            />

            {/* Panel — slides in from right */}
            <motion.div
              id="mobile-menu"
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: EASE }}
              className="fixed top-0 right-0 bottom-0 z-[55] w-[min(340px,90vw)] flex flex-col md:hidden"
              style={{ background: "var(--navy-1)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Panel top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <span className="font-display text-[0.75rem] tracking-[0.22em] text-[var(--cream)] uppercase">Menu</span>
                <button
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col flex-1 px-6 pt-8 pb-6 overflow-y-auto" aria-label="Mobile navigation">
                {NAV.map(({ label, href, num }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, ease: EASE }}
                    onClick={e => { e.preventDefault(); close(); scrollTo(href); }}
                    className="group flex items-baseline gap-4 py-5 border-b border-white/[0.06] last:border-0"
                  >
                    <span className="eyebrow text-[0.58rem] w-5 flex-shrink-0" style={{ color: "var(--gold-dim)" }}>
                      {num}
                    </span>
                    <span
                      className={`font-display text-2xl font-semibold transition-colors duration-250 ${
                        active === href.slice(1) ? "text-[var(--gold)]" : "text-[var(--cream)] group-hover:text-[var(--gold)]"
                      }`}
                    >
                      {label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA block */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, ease: EASE }}
                className="px-6 pb-8 pt-6 border-t border-white/[0.06]"
              >
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--cream-dim)" }}>
                  Start with a free 30-minute discovery call — no pitch, no pressure.
                </p>
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); close(); scrollTo("#contact"); }}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm tracking-wide hover:bg-[var(--gold-bright)] transition-colors duration-300"
                >
                  Book a Consultation
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                {/* Founder note */}
                <p className="eyebrow text-[0.58rem] text-center mt-4" style={{ color: "var(--slate)" }}>
                  A&amp;O Holdings · Affan &amp; Omer
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
