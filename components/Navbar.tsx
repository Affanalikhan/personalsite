"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import Link from "next/link";

const NAV = [
  { label: "Services",    href: "#services" },
  { label: "How We Work", href: "#process"  },
  { label: "Founders",    href: "#founders" },
  { label: "Contact",     href: "#contact"  },
];

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeSection, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const ids = NAV.map(n => n.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[var(--navy-1)]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="wrap flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3" aria-label="A&O Holdings">
            <div className="relative w-8 h-8 border border-[var(--gold-dim)] flex items-center justify-center group-hover:border-[var(--gold)] transition-colors duration-300">
              <span className="font-display text-[0.6rem] font-bold text-[var(--gold)] tracking-[0.15em]">A&O</span>
            </div>
            <span className="font-display text-sm tracking-[0.2em] text-[var(--cream)] uppercase hidden sm:block">
              Holdings
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {NAV.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={e => { e.preventDefault(); scrollTo(href); }}
                  className={`eyebrow transition-colors duration-300 ${
                    isActive ? "text-[var(--cream)]" : "text-[var(--cream-dim)] hover:text-[var(--cream)]"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wide bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-bright)] transition-colors duration-300"
            >
              Book a Call
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-[var(--cream)] origin-center" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1.5px] bg-[var(--cream)]" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-[var(--cream)] origin-center" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mob"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--navy)]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {NAV.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={e => { e.preventDefault(); setMenuOpen(false); scrollTo(href); }}
                className="font-display text-4xl font-semibold text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              onClick={e => { e.preventDefault(); setMenuOpen(false); scrollTo("#contact"); }}
              className="mt-2 px-8 py-3 bg-[var(--gold)] text-[var(--navy)] font-semibold text-lg hover:bg-[var(--gold-bright)] transition-colors"
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
