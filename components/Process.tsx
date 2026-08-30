"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    subtitle: "Understand the business before prescribing anything.",
    body: "We start by talking to your team and getting a clear picture of how the business actually works — not just the stated problem, but the context around it. What data exists, how decisions are made, where the real friction is. No assumptions. No pre-packaged recommendations. Just listening and asking the right questions.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M26 26 L34 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Scoping",
    subtitle: "Define what's worth building — and what isn't.",
    body: "Most companies don't lack data or ambition — they lack a clear definition of what success looks like. We scope the engagement around what's technically feasible, commercially meaningful, and achievable within the timeline and budget. We agree on metrics up front so there's no ambiguity at the end. If something isn't worth building, we'll say so at this stage.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
        <rect x="7" y="7" width="26" height="26" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 20 L17 24 L27 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Build",
    subtitle: "Production quality from day one.",
    body: "We build the model, agent, automation, or web product to the agreed specification. This means clean code, proper testing, and documentation throughout — not a prototype that needs to be rebuilt before it's useful. We ship iteratively and keep you in the loop, so there are no surprises at handoff.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
        <rect x="6" y="22" width="6" height="12" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="17" y="14" width="6" height="20" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="28" y="6" width="6" height="28" rx="1" fill="currentColor" opacity="0.85" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Deployment & Handoff",
    subtitle: "Yours to own and operate.",
    body: "We deploy into your environment and run knowledge-transfer sessions with your team. Full documentation, clean handoff, and no artificial dependency on us to keep things running. Your team should be able to operate what we've built without needing to call us for every change.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M20 6 L34 20 L20 34 L6 20 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 20 L18 24 L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Ongoing Advisory",
    subtitle: "Optional — for clients who want continued input.",
    body: "For clients who want continued AI strategy input beyond the initial build, we offer ongoing advisory access. This isn't a support contract — it's structured advisory: regular sessions to review what's working, identify new opportunities, and adjust the roadmap as the business evolves.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 13 L20 20 L26 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isOptional = index === STEPS.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.12, ease: EASE }}
      className="relative"
    >
      {/* Connector */}
      {index < STEPS.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.7, delay: index * 0.12 + 0.4, ease: "easeOut" }}
          className="absolute left-[2rem] top-[4.8rem] bottom-[-2.5rem] w-px origin-top hidden md:block"
          style={{ background: index === STEPS.length - 2
            ? "linear-gradient(180deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.05) 100%)"
            : "linear-gradient(180deg, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0.08) 100%)" }}
          aria-hidden="true"
        />
      )}

      <div className="flex gap-7 items-start group">
        {/* Icon */}
        <div className="flex-shrink-0 relative">
          <div
            className={`w-16 h-16 border flex items-center justify-center transition-colors duration-300 ${
              isOptional
                ? "border-white/[0.08] text-[var(--mist)] bg-transparent"
                : "border-[var(--gold)]/25 text-[var(--gold)] group-hover:border-[var(--gold)]/50 bg-[var(--navy-mid)]"
            }`}
          >
            {step.icon}
          </div>
          <span
            className={`absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] font-bold flex items-center justify-center leading-none ${
              isOptional ? "bg-[var(--mist)]/30 text-[var(--mist)]" : "bg-[var(--gold)] text-[var(--navy)]"
            }`}
          >
            {index + 1}
          </span>
        </div>

        {/* Content */}
        <div className={`pb-12 flex-1 ${isOptional ? "opacity-70" : ""}`}>
          <p className="text-eyebrow text-[var(--gold)]/50 mb-2 text-[0.6rem]">{step.num}</p>
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="font-display text-xl font-semibold text-[var(--cream)] leading-tight">
              {step.title}
            </h3>
            {isOptional && (
              <span className="text-[0.55rem] font-semibold tracking-[0.15em] uppercase border border-white/[0.12] text-[var(--mist)] px-2 py-0.5">
                Optional
              </span>
            )}
          </div>
          <p
            className="text-[var(--mist)] text-sm mb-3 leading-snug"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontSize: "1rem" }}
          >
            {step.subtitle}
          </p>
          <p className="text-[var(--mist)] text-sm leading-[1.8] max-w-lg">
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
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative section-transition overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0e2040 0%, #0a1628 50%, #081220 100%)" }}
      aria-labelledby="process-heading"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute right-[-3%] top-1/2 -translate-y-1/2 font-display text-[18vw] font-bold text-white/[0.016] leading-none select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        PROCESS
      </motion.div>

      <div className="absolute inset-0 grid-lines opacity-35 pointer-events-none" aria-hidden="true" />

      <div className="section-pad container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left sticky */}
          <div ref={headingRef} className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-eyebrow mb-5 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-[var(--gold)]" />
              How We Work
            </motion.p>

            <motion.h2
              id="process-heading"
              initial={{ opacity: 0, y: 24 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6"
            >
              Rigorous by design.{" "}
              <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 300, color: "var(--gold)" }}>
                Fast where it counts.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[var(--mist)] leading-[1.8] mb-8 max-w-sm text-[0.95rem]"
            >
              Every engagement follows the same five-phase structure. The phases scale
              in depth depending on what you need — a one-week strategy sprint looks
              different from a six-month build — but the discipline never changes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-[var(--mist)] leading-[1.8] mb-10 max-w-sm text-[0.95rem]"
            >
              We start every engagement with a free 30-minute discovery call — no
              pitch, no obligation. If we can help, we'll tell you how. If we can't,
              we'll tell you that too.
            </motion.p>

            {/* Phase pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {STEPS.map((s, i) => (
                <span
                  key={s.num}
                  className="text-[0.58rem] font-semibold tracking-[0.15em] uppercase px-2.5 py-1.5 border border-[var(--gold)]/15 text-[var(--mist)]"
                  style={{ opacity: i === STEPS.length - 1 ? 0.55 : 1 }}
                >
                  {s.title}
                </span>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 12 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.42 }}
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-[var(--gold)]/40 text-[var(--gold)] text-eyebrow hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-300"
            >
              Book a free discovery call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* Right: steps */}
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
