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
    const h = () => setScrolled(window.scrollY > 50);
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          paddingBlock: scrolled ? "0.75rem" : "1.25rem",
          background: scrolled ? "rgba(250,250,248,0.97)" : "rgba(250,250,248,0.0)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="wrap flex items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={close} className="flex items-center gap-3 flex-shrink-0 group" aria-label="A&O Holdings">
            <div
              className="w-9 h-9 flex items-center justify-center border transition-all duration-300 group-hover:border-[var(--gold)]"
              style={{ borderColor: "var(--border-gold)", background: "var(--gold-pale)" }}
            >
              <span className="font-display text-[0.58rem] font-bold tracking-[0.14em]" style={{ color: "var(--gold-dark)" }}>A&O</span>
            </div>
            <span className="font-display text-[0.8rem] font-semibold tracking-[0.2em] uppercase hidden sm:block" style={{ color: "var(--ink)" }}>
              Holdings
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary">
            {NAV.map(({ label, href }) => (
              <a key={href} href={href}
                onClick={e => { e.preventDefault(); scrollTo(href); }}
                className="eyebrow text-[0.63rem] transition-colors duration-200"
                style={{ color: active === href.slice(1) ? "var(--ink)" : "var(--ink-3)" }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide transition-all duration-300"
              style={{ background: "var(--navy)", color: "var(--white)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--navy)"; }}
            >
              Book a Call
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <motion.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25, ease: EASE }}
                className="block w-5 h-[1.5px] origin-center" style={{ background: "var(--ink)" }} />
              <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }}
                className="block w-5 h-[1.5px] origin-center" style={{ background: "var(--ink)" }} />
              <motion.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25, ease: EASE }}
                className="block w-5 h-[1.5px] origin-center" style={{ background: "var(--ink)" }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: "var(--bg)" }}
            role="dialog" aria-modal="true" aria-label="Navigation"
          >
            <div className="h-[60px] flex-shrink-0 border-b" style={{ borderColor: "var(--border)" }} />

            <nav className="flex flex-col flex-1 overflow-y-auto px-6 pt-6 pb-4" aria-label="Mobile navigation">
              {NAV.map(({ label, href, num }, i) => (
                <motion.a key={href} href={href}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.07, ease: EASE }}
                  onClick={e => { e.preventDefault(); close(); scrollTo(href); }}
                  className="flex items-center gap-5 py-5 border-b"
                  style={{ borderColor: "var(--border-2)" }}
                >
                  <span className="eyebrow text-[0.58rem] w-6 flex-shrink-0" style={{ color: "var(--gold)" }}>{num}</span>
                  <span className="font-display text-[1.75rem] font-semibold leading-tight"
                    style={{ color: active === href.slice(1) ? "var(--gold-dark)" : "var(--ink)" }}>
                    {label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, ease: EASE }}
              className="px-6 pb-8 pt-5 border-t" style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--ink-3)" }}>
                Start with a free 30-minute discovery call — no pitch, no pressure.
              </p>
              <a href="#contact"
                onClick={e => { e.preventDefault(); close(); scrollTo("#contact"); }}
                className="flex items-center justify-center gap-2.5 w-full py-4 font-semibold text-sm tracking-wide transition-colors duration-300"
                style={{ background: "var(--navy)", color: "var(--white)" }}
              >
                Book a Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="eyebrow text-[0.56rem] text-center mt-4" style={{ color: "var(--ink-light)" }}>
                A&amp;O Holdings · Affan &amp; Omer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
