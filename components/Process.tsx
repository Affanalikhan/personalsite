"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const STEPS = [
  {
    n: "01", title: "Discovery",
    sub: "Understand the business before prescribing anything.",
    body: "We talk to your team and map how the business actually works — not just the stated problem, but the context around it. What data exists, how decisions are made, where the real friction is. No assumptions, no pre-packaged recommendations.",
    optional: false,
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M20 20 L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="14" r="2.5" fill="currentColor" opacity="0.5"/></svg>,
  },
  {
    n: "02", title: "Scoping",
    sub: "Define what's worth building — and what isn't.",
    body: "We scope the engagement around what's technically feasible, commercially meaningful, and achievable within your timeline. We agree success metrics up front so there's no ambiguity at the end. If something isn't worth building, we'll say so here.",
    optional: false,
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><rect x="5" y="5" width="22" height="22" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M10 16 L14 20 L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    n: "03", title: "Build",
    sub: "Production quality from day one.",
    body: "We build the model, agent, automation, or web product to the agreed specification — clean code, proper testing, documentation throughout. Not a prototype that needs rebuilding before it's useful. We ship iteratively and keep you in the loop.",
    optional: false,
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><rect x="4" y="18" width="5" height="10" rx="1" fill="currentColor" opacity="0.4"/><rect x="14" y="11" width="5" height="17" rx="1" fill="currentColor" opacity="0.65"/><rect x="24" y="4" width="5" height="24" rx="1" fill="currentColor" opacity="0.9"/></svg>,
  },
  {
    n: "04", title: "Deployment & Handoff",
    sub: "Yours to own and operate.",
    body: "We deploy into your environment and run knowledge-transfer sessions. Full documentation, clean handoff — your team can operate what we've built without calling us for every change. No artificial dependency.",
    optional: false,
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><path d="M16 4 L28 16 L16 28 L4 16 Z" stroke="currentColor" strokeWidth="1.5"/><path d="M11 16 L14 19 L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    n: "05", title: "Ongoing Advisory",
    sub: "Optional — for clients who want continued input.",
    body: "Structured advisory beyond the initial build: regular sessions to review what's working, identify new opportunities, and adjust the roadmap as the business evolves. Not a support contract — strategic input.",
    optional: true,
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5"/><path d="M16 10 L16 16 L21 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

function Step({ s, i }: { s: typeof STEPS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
      className={`flex gap-6 pb-12 relative ${s.optional ? "opacity-60" : ""}`}
    >
      {/* Connector */}
      {i < STEPS.length - 1 && (
        <div className="absolute left-[1.4rem] top-[3.2rem] bottom-0 w-px hidden md:block"
          style={{ background: "linear-gradient(180deg, rgba(200,169,110,0.25) 0%, rgba(200,169,110,0.04) 100%)" }}
          aria-hidden="true"
        />
      )}

      {/* Icon column */}
      <div className="flex-shrink-0 relative">
        <div className={`w-11 h-11 border flex items-center justify-center transition-colors ${
          s.optional ? "border-white/10 text-[var(--slate)]" : "border-[var(--border-gold)] text-[var(--gold)]"
        }`}>
          {s.icon}
        </div>
        {/* Step number badge */}
        <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 text-[9px] font-bold flex items-center justify-center ${
          s.optional ? "bg-[var(--slate)] text-[var(--navy)]" : "bg-[var(--gold)] text-[var(--navy)]"
        }`}>
          {i + 1}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-display text-lg font-semibold text-[var(--cream)]">{s.title}</h3>
          {s.optional && (
            <span className="eyebrow text-[0.55rem] px-2 py-0.5 border border-white/10 text-[var(--slate)]">Optional</span>
          )}
        </div>
        <p className="font-serif italic text-[0.95rem] mb-3" style={{ color: "var(--gold)", fontWeight: 300, lineHeight: 1.5 }}>
          {s.sub}
        </p>
        {/* FIX #4: explicit line-height on body */}
        <p className="text-sm" style={{ lineHeight: 1.8, color: "var(--cream-dim)" }}>{s.body}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="process" ref={ref} aria-labelledby="process-h2"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1c30 0%, #091422 100%)" }}
    >
      {/* Ghost text */}
      <motion.div
        style={{ y: bgY, fontSize: "clamp(8rem, 20vw, 18rem)" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold leading-none select-none pointer-events-none text-white/[0.025]"
        aria-hidden="true"
      >
        PROCESS
      </motion.div>

      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="wrap section-y relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* Sticky left */}
          <div ref={headRef} className="lg:sticky lg:top-28">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-[var(--gold)]" />
              <span className="eyebrow">How We Work</span>
            </motion.div>

            <motion.h2 id="process-h2"
              initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
              className="font-display font-bold leading-[1.1] mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}
            >
              Rigorous by design.{" "}
              <span className="font-serif font-light italic" style={{ color: "var(--gold)" }}>Fast where it counts.</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
              className="text-[0.95rem] leading-[1.8] mb-6 max-w-xs" style={{ color: "var(--cream-dim)" }}
            >
              Every engagement follows the same five-phase structure. Depth
              scales to scope — a one-week strategy sprint looks different
              from a six-month build — but the discipline never changes.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.26 }}
              className="text-[0.95rem] leading-[1.8] mb-10 max-w-xs" style={{ color: "var(--cream-dim)" }}
            >
              We start every engagement with a free 30-minute discovery call.
              No pitch. If we can&apos;t help, we&apos;ll tell you that too.
            </motion.p>

            {/* Phase pills */}
            <motion.div initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap gap-1.5 mb-10"
            >
              {STEPS.map((s, i) => (
                <span key={s.n} className="eyebrow text-[0.58rem] px-2.5 py-1.5 border border-white/[0.08]"
                  style={{ color: "var(--cream-dim)", opacity: i === 4 ? 0.5 : 0.8 }}>
                  {s.title}
                </span>
              ))}
            </motion.div>

            <motion.a href="#contact"
              initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.38 }}
              onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-[var(--border-gold)] text-[var(--gold)] eyebrow hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-300"
            >
              Book a free discovery call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* Steps */}
          <div>
            {STEPS.map((s, i) => <Step key={s.n} s={s} i={i} />)}
          </div>
        </div>
      </div>

      <div className="rule" aria-hidden="true" />
    </section>
  );
}
