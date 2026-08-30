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
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* FIX #2 & #8: lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-400"
        style={{
          paddingBlock: scrolled || open ? "0.625rem" : "1.125rem",
          background: scrolled || open ? "var(--navy-1)" : "transparent",
          borderBottom: scrolled || open ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div className="wrap flex items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={close} className="group flex items-center gap-2.5 flex-shrink-0" aria-label="A&O Holdings">
            <div className="w-8 h-8 border flex items-center justify-center transition-colors duration-300"
              style={{ borderColor: "var(--border-gold)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-gold)")}
            >
              <span className="font-display text-[0.56rem] font-bold text-[var(--gold)] tracking-[0.14em]">A&O</span>
            </div>
            <span className="font-display text-[0.78rem] tracking-[0.22em] text-[var(--cream)] uppercase hidden sm:block">
              Holdings
            </span>
          </Link>

          {/* FIX #9: Desktop nav — visible at md+, hidden below md */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Primary">
            {NAV.map(({ label, href }) => (
              <a key={href} href={href}
                onClick={e => { e.preventDefault(); scrollTo(href); }}
                className="eyebrow text-[0.63rem] transition-colors duration-250"
                style={{ color: active === href.slice(1) ? "var(--cream)" : "var(--cream-dim)" }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA — hidden below md */}
            <a href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[0.8rem] font-semibold tracking-wide bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-bright)] transition-colors duration-300"
            >
              Book a Call
            </a>

            {/* FIX #9: Hamburger — shown ONLY below md */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <motion.span animate={open ? { rotate: 45, y: 6 }  : { rotate: 0, y: 0 }}  transition={{ duration: 0.25, ease: EASE }} className="block w-[20px] h-[1.5px] bg-[var(--cream)] origin-center" />
              <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }}           className="block w-[20px] h-[1.5px] bg-[var(--cream)] origin-center" />
              <motion.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25, ease: EASE }} className="block w-[20px] h-[1.5px] bg-[var(--cream)] origin-center" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── FIX #2 & #8: Mobile full-screen OPAQUE overlay ───────────────── */}
      {/* No backdrop-blur, no transparency — solid navy covering 100vw×100vh */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-overlay"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-0 md:hidden flex flex-col"
            style={{
              /* FIX #2: fully opaque — no see-through, no bleeding */
              background: "var(--navy-1)",
              zIndex: 49,        /* below header (z-50) but above everything else */
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            {/* Spacer = header height */}
            <div className="h-[56px] flex-shrink-0" />

            {/* Nav links — FIX #8: generous tap targets, clear spacing */}
            <nav className="flex flex-col flex-1 overflow-y-auto px-6 pt-6 pb-4" aria-label="Mobile navigation">
              {NAV.map(({ label, href, num }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.07, ease: EASE }}
                  onClick={e => { e.preventDefault(); close(); scrollTo(href); }}
                  /* FIX #8: min 60px tap target via py-5 */
                  className="flex items-center gap-5 py-5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span className="eyebrow text-[0.58rem] w-6 flex-shrink-0" style={{ color: "var(--gold-dim)" }}>
                    {num}
                  </span>
                  <span className="font-display text-[1.75rem] font-semibold leading-tight transition-colors duration-200"
                    style={{ color: active === href.slice(1) ? "var(--gold)" : "var(--cream)" }}>
                    {label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, ease: EASE }}
              className="px-6 pb-8 pt-5 border-t"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <p className="text-sm mb-4 leading-[1.7]" style={{ color: "var(--cream-dim)" }}>
                Start with a free 30-minute discovery call — no pitch, no pressure.
              </p>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); close(); scrollTo("#contact"); }}
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm tracking-wide hover:bg-[var(--gold-bright)] transition-colors duration-300"
              >
                Book a Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="eyebrow text-[0.56rem] text-center mt-4" style={{ color: "var(--slate)" }}>
                A&amp;O Holdings · Affan &amp; Omer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
