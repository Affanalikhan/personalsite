"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const TICKER = [
  "Predictive Modeling", "Agentic AI Systems", "AI-Powered Web",
  "Business Automation", "AI Strategy Advisory", "Data Intelligence",
  "Product Management", "Contract Acquisition", "Independent Consulting",
];

const STATS = [
  { value: "4",    label: "Service Pillars"     },
  { value: "2",    label: "Expert Founders"      },
  { value: "100%", label: "Founder-led delivery" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const tickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0, raf: number;
    const half = () => el.scrollWidth / 2;
    const run = () => { pos -= 0.45; if (Math.abs(pos) >= half()) pos = 0; el.style.transform = `translateX(${pos}px)`; raf = requestAnimationFrame(run); };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  const up = (delay: number) => ({
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
  });

  return (
    <section ref={ref} id="hero" aria-labelledby="hero-h1"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />

      {/* Large decorative background text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold leading-none select-none pointer-events-none hidden xl:block"
        style={{ fontSize: "22rem", color: "rgba(13,20,32,0.025)", zIndex: 0, letterSpacing: "-0.05em" }}
        aria-hidden="true"
      >
        A&O
      </div>

      {/* Gold accent bar — left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1 hidden lg:block" style={{ background: "linear-gradient(180deg, transparent, var(--gold), transparent)", zIndex: 1 }} aria-hidden="true" />

      {/* Content */}
      <motion.div
        style={{ opacity: fade, zIndex: 2, paddingTop: "clamp(6rem,14vw,10rem)", paddingBottom: "clamp(4rem,8vw,6rem)" }}
        className="relative wrap"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-start">

          {/* Left — main copy */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div variants={up(0)} initial="hidden" animate="show" className="flex items-center gap-3 mb-7">
              <span className="w-8 h-px flex-shrink-0" style={{ background: "var(--gold)" }} aria-hidden="true" />
              <span className="eyebrow">Independent Consultancy</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-h1"
              variants={up(0.1)} initial="hidden" animate="show"
              className="font-display font-bold mb-7"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)", lineHeight: 1.06, color: "var(--ink)" }}
            >
              We build the models{" "}
              <span className="font-serif font-light italic" style={{ color: "var(--gold-dark)" }}>
                your competitors
              </span>
              {" "}haven&apos;t thought of yet.
            </motion.h1>

            {/* Sub */}
            <motion.p variants={up(0.2)} initial="hidden" animate="show"
              className="text-base mb-10 max-w-xl"
              style={{ lineHeight: 1.8, color: "var(--ink-3)" }}
            >
              A&amp;O Holdings is a founder-led consultancy. We work directly
              with companies across data science, AI systems, product strategy,
              and commercial growth — deploying predictive models, building
              agentic AI, shaping product direction, and driving pipeline — no
              account managers, no junior delivery teams.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={up(0.3)} initial="hidden" animate="show" className="flex flex-wrap items-center gap-4 mb-14">
              <a href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold text-sm tracking-wide transition-all duration-300"
                style={{ background: "var(--navy)", color: "var(--white)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--navy)"; }}
              >
                Book a Consultation
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#services"
                onClick={e => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 text-sm font-medium hover-line pb-px transition-colors duration-200"
                style={{ color: "var(--ink-3)" }}
              >
                Explore our services
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={up(0.42)} initial="hidden" animate="show"
              className="flex flex-wrap gap-8 pt-8 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl font-bold mb-1" style={{ color: "var(--ink)" }}>{value}</p>
                  <p className="eyebrow text-[0.6rem]" style={{ color: "var(--ink-light)" }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — value prop cards (desktop only) */}
          <motion.div variants={up(0.5)} initial="hidden" animate="show"
            className="hidden lg:flex flex-col gap-3 w-[260px] flex-shrink-0 pt-4"
          >
            {[
              { icon: "✦", label: "Founder-led",      body: "Both founders on every project. No handoff to junior staff." },
              { icon: "⊕", label: "Cross-functional",  body: "Data, AI, product, and BD under one roof." },
              { icon: "◎", label: "Independent",       body: "External consultants — brought in for a problem, not headcount." },
            ].map(({ icon, label, body }) => (
              <div key={label} className="p-5 border"
                style={{ background: "var(--white)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-sm" style={{ color: "var(--gold)" }} aria-hidden="true">{icon}</span>
                  <p className="font-display text-sm font-semibold" style={{ color: "var(--ink)" }}>{label}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        style={{ zIndex: 2 }} aria-hidden="true"
      >
        <span className="eyebrow text-[0.55rem]" style={{ color: "var(--ink-light)", opacity: 0.6 }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7" style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }}
        />
      </motion.div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden py-2.5 border-t"
        style={{ background: "var(--navy)", borderColor: "var(--navy)", zIndex: 3 }}
      >
        <div ref={tickerRef} className="flex gap-10 whitespace-nowrap" aria-hidden="true">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="eyebrow flex items-center gap-4 text-[0.58rem]"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              {t}
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--gold)" }} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
