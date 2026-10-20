"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services",    href: "#services"  },
  { label: "How We Work", href: "#process"   },
  { label: "Founders",    href: "#founders"  },
  { label: "Contact",     href: "#contact"   },
];

const goto = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open,   setOpen]   = useState(false);

  /* active section via IntersectionObserver */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Desktop + mobile bar ─────────────────────────────────── */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ background: "var(--navy)", borderBottom: "1px solid rgba(255,255,255,.07)" }}
      >
        <div className="container" style={{ paddingBlock: "var(--s-16)" }}>
          <div className="flex items-center justify-between gap-8">

            {/* Logo */}
            <Link href="/" onClick={close} aria-label="A&O Holdings and Consulting"
              className="flex items-center gap-3 flex-shrink-0"
            >
              <span
                className="t-eyebrow text-[11px]"
                style={{ color: "var(--gold)", letterSpacing: ".25em" }}
              >
                A&amp;O
              </span>
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--off-white)",
                }}
              >
                Holdings &amp; Consulting
              </span>
            </Link>

            {/* Desktop nav — centered */}
            <nav
              className="hidden lg:flex items-center gap-8 flex-1 justify-center"
              aria-label="Primary"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a key={href} href={href}
                  onClick={e => { e.preventDefault(); goto(href); }}
                  className="t-eyebrow text-[12px] transition-colors duration-200"
                  style={{
                    color: active === href.slice(1)
                      ? "var(--off-white)"
                      : "rgba(245,243,238,.5)",
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a href="#contact"
              onClick={e => { e.preventDefault(); goto("#contact"); }}
              className="btn-primary hidden lg:inline-flex text-[12px]"
              style={{ padding: "12px 24px" }}
            >
              Get in Touch
            </a>

            {/* Hamburger — mobile / tablet */}
            <button
              className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 flex-shrink-0"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: .22, ease: EASE }}
                className="block w-5 h-[1.5px] origin-center"
                style={{ background: "var(--off-white)" }}
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: .15 }}
                className="block w-5 h-[1.5px]"
                style={{ background: "var(--off-white)" }}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: .22, ease: EASE }}
                className="block w-5 h-[1.5px] origin-center"
                style={{ background: "var(--off-white)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ───────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mob"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: .22 }}
            className="fixed inset-0 z-40 flex flex-col lg:hidden"
            style={{ background: "var(--navy)" }}
            role="dialog" aria-modal="true" aria-label="Navigation"
          >
            {/* Spacer for header height */}
            <div style={{ height: "65px", flexShrink: 0 }} />

            {/* Links */}
            <nav className="flex flex-col flex-1 justify-center px-8 gap-2" aria-label="Mobile">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href} href={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: .04 + i * .07, ease: EASE }}
                  onClick={e => { e.preventDefault(); close(); goto(href); }}
                  className="flex items-center gap-4 py-5 border-b"
                  style={{
                    borderColor: "rgba(255,255,255,.07)",
                    minHeight: "48px",
                  }}
                >
                  <span className="t-eyebrow text-[11px] w-6 flex-shrink-0"
                    style={{ color: "var(--gold)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(28px, 6vw, 36px)",
                      fontWeight: 600,
                      color: active === href.slice(1) ? "var(--gold)" : "var(--off-white)",
                    }}
                  >
                    {label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .34, ease: EASE }}
              className="px-8 pb-10 pt-6 border-t"
              style={{ borderColor: "rgba(255,255,255,.07)" }}
            >
              <p className="t-small mb-4" style={{ color: "rgba(245,243,238,.5)" }}>
                Free 30-minute discovery call — no pitch, no pressure.
              </p>
              <a href="#contact"
                onClick={e => { e.preventDefault(); close(); goto("#contact"); }}
                className="btn-primary w-full justify-center"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
