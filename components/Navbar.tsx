"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#process" },
  { label: "Founders", href: "#founders" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[var(--navy)]/95 backdrop-blur-md border-b border-[var(--gold)]/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="A&O Holdings — Home"
          >
            <div className="w-9 h-9 border border-[var(--gold)]/60 flex items-center justify-center group-hover:border-[var(--gold)] transition-colors duration-300">
              <span className="font-display text-xs font-700 text-[var(--gold)] tracking-widest">
                A&O
              </span>
            </div>
            <span className="font-display text-sm tracking-[0.15em] text-[var(--cream)] hidden sm:block">
              HOLDINGS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-eyebrow text-[var(--mist)] hover:text-[var(--cream)] transition-colors duration-300 link-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--gold)]/50 text-[var(--gold)] text-eyebrow hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-300"
            >
              Book a Call
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-[var(--cream)] origin-center transition-all duration-300"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-px bg-[var(--cream)]"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-[var(--cream)] origin-center transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 bg-[var(--navy)] flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-10" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-3xl text-[var(--cream)] hover:text-[var(--gold)] transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-4 px-8 py-3 border border-[var(--gold)] text-[var(--gold)] font-display text-lg hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-300"
              >
                Book a Call
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
