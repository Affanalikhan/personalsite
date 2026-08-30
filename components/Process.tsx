"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    subtitle: "Understand before we prescribe.",
    body: "We spend time inside your business — talking to your team, auditing existing data infrastructure, and mapping the decisions that matter most. No assumptions, no cookie-cutter decks.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M26 26 L34 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Problem Identification",
    subtitle: "Name the real constraint.",
    body: "Most businesses don't lack data — they lack clarity on what problem actually needs solving. We surface root causes, size the opportunity, and define success in measurable terms before a single line of code is written.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M8 30 L16 18 L22 24 L30 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="10" r="3" fill="currentColor" opacity="0.6" />
        <path d="M6 34 H34" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Build",
    subtitle: "Model, system, or product — engineered to spec.",
    body: "Depending on scope: a predictive model, an agentic AI framework, an automated workflow, or an AI-native web product. Built with production quality from day one, not prototype quality shipped as final.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="6" y="20" width="6" height="14" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="17" y="12" width="6" height="22" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="28" y="6" width="6" height="28" rx="1" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Deployment & Handoff",
    subtitle: "Yours to own, easy to run.",
    body: "We deploy into your environment and run knowledge-transfer sessions with your team. Full documentation, clean code, and ongoing advisory access so the investment compounds well beyond the engagement.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M20 6 L34 20 L20 34 L6 20 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 20 L18 24 L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.14, ease: EASE }}
      className="relative"
    >
      {/* Connector line (not on last) */}
      {index < STEPS.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.14 + 0.4, ease: "easeInOut" }}
          className="absolute left-[2.1rem] top-[5.5rem] bottom-[-3rem] w-px origin-top hidden md:block"
          style={{
            background: "linear-gradient(180deg, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.05) 100%)",
          }}
          aria-hidden="true"
        />
      )}

      <div className="flex gap-8 items-start group">
        {/* Step icon circle */}
        <div className="flex-shrink-0 relative">
          <div className="w-[4.2rem] h-[4.2rem] border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] group-hover:border-[var(--gold)]/70 transition-colors duration-400 bg-[var(--navy-mid)]">
            {step.icon}
          </div>
          {/* Number badge */}
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--gold)] text-[var(--navy)] text-[10px] font-bold flex items-center justify-center leading-none">
            {step.num.slice(-1)}
          </span>
        </div>

        {/* Content */}
        <div className="pb-14 flex-1">
          <p className="text-eyebrow text-[var(--gold)]/60 mb-2">{step.num}</p>
          <h3 className="font-display text-2xl font-semibold text-[var(--cream)] mb-1 leading-tight">
            {step.title}
          </h3>
          <p className="font-editorial italic text-[var(--mist)] text-lg mb-4">
            {step.subtitle}
          </p>
          <p className="text-[var(--mist)] text-sm leading-relaxed max-w-lg">
            {step.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative section-transition overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0e1f3d 0%, var(--navy-mid) 50%, var(--navy) 100%)" }}
      aria-labelledby="process-heading"
    >
      {/* Parallax background text */}
      <motion.div
        style={{ y: bgY }}
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display text-[20vw] font-bold text-white/[0.015] leading-none select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        PROCESS
      </motion.div>

      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="section-pad container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — sticky heading */}
          <div ref={headingRef} className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-eyebrow mb-6 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-[var(--gold)]" />
              How We Work
            </motion.p>

            <motion.h2
              id="process-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-8"
            >
              Rigorous by design.{" "}
              <span className="font-editorial italic font-light gradient-text-gold">
                Fast where it counts.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[var(--mist)] leading-relaxed mb-10 max-w-sm"
            >
              Every engagement follows the same four-phase arc. The phases
              scale in depth — a one-week sprint looks different from a
              six-month build — but the discipline never changes.
            </motion.p>

            {/* Phase summary pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {STEPS.map((s) => (
                <span
                  key={s.num}
                  className="text-eyebrow px-3 py-1.5 border border-[var(--gold)]/20 text-[var(--mist)]"
                >
                  {s.title}
                </span>
              ))}
            </motion.div>

            {/* Decorative line art */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-14 hidden lg:block"
              aria-hidden="true"
            >
              <svg viewBox="0 0 200 120" fill="none" className="w-48 opacity-30">
                <path d="M10 60 Q50 20 100 60 Q150 100 190 60" stroke="#c9a84c" strokeWidth="1" fill="none" />
                <path d="M10 60 Q50 100 100 60 Q150 20 190 60" stroke="#1e4d8c" strokeWidth="1" fill="none" />
                <circle cx="100" cy="60" r="4" fill="#c9a84c" opacity="0.6" />
              </svg>
            </motion.div>
          </div>

          {/* Right — steps */}
          <div className="relative">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="divider-gold" aria-hidden="true" />
    </section>
  );
}
