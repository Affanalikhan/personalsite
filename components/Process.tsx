"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const STEPS = [
  {
    n: "01", title: "Discovery", optional: false,
    sub: "Understand the business before prescribing anything.",
    body: "We talk to your team and map how the business actually works — not just the stated problem, but the context around it. What data exists, how decisions are made, where the real friction is. No assumptions, no pre-packaged recommendations.",
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M20 20L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="14" r="2.5" fill="currentColor" opacity="0.4"/></svg>,
  },
  {
    n: "02", title: "Scoping", optional: false,
    sub: "Define what's worth building — and what isn't.",
    body: "We scope the engagement around what's technically feasible, commercially meaningful, and achievable within your timeline. We agree success metrics up front so there's no ambiguity at the end. If something isn't worth building, we'll say so here.",
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><rect x="5" y="5" width="22" height="22" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    n: "03", title: "Build", optional: false,
    sub: "Production quality from day one.",
    body: "We build the model, agent, automation, or web product to the agreed specification — clean code, proper testing, documentation throughout. Not a prototype that needs rebuilding. We ship iteratively and keep you in the loop.",
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><rect x="4" y="18" width="5" height="10" rx="1" fill="currentColor" opacity="0.35"/><rect x="14" y="11" width="5" height="17" rx="1" fill="currentColor" opacity="0.6"/><rect x="24" y="4" width="5" height="24" rx="1" fill="currentColor" opacity="0.9"/></svg>,
  },
  {
    n: "04", title: "Deployment & Handoff", optional: false,
    sub: "Yours to own and operate.",
    body: "We deploy into your environment and run knowledge-transfer sessions. Full documentation, clean handoff — your team can operate what we've built without calling us for every change. No artificial dependency.",
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><path d="M16 4L28 16L16 28L4 16Z" stroke="currentColor" strokeWidth="1.5"/><path d="M11 16L14 19L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    n: "05", title: "Ongoing Advisory", optional: true,
    sub: "For clients who want continued strategic input.",
    body: "Regular sessions to review what's working, identify new opportunities, and adjust the roadmap as the business evolves. Not a support contract — structured strategic advisory.",
    icon: <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true"><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5"/><path d="M16 10L16 16L21 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

function Step({ s, i }: { s: typeof STEPS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
      className={`flex gap-5 pb-10 relative ${s.optional ? "opacity-55" : ""}`}
    >
      {/* Vertical connector */}
      {i < STEPS.length - 1 && (
        <div className="absolute left-[1.35rem] top-[3rem] bottom-0 w-px hidden md:block"
          style={{ background: "linear-gradient(180deg, var(--border), transparent)" }}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <div className="flex-shrink-0 relative">
        <div className="w-11 h-11 border flex items-center justify-center"
          style={{
            borderColor: s.optional ? "var(--border)" : "var(--border-gold)",
            background: s.optional ? "var(--bg-2)" : "var(--gold-pale)",
            color: s.optional ? "var(--ink-light)" : "var(--gold-dark)",
          }}
        >
          {s.icon}
        </div>
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[9px] font-bold flex items-center justify-center"
          style={{ background: s.optional ? "var(--ink-light)" : "var(--gold)", color: "var(--white)" }}>
          {i + 1}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 pt-0.5">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>{s.title}</h3>
          {s.optional && (
            <span className="eyebrow text-[0.55rem] px-2 py-0.5 border" style={{ borderColor: "var(--border)", color: "var(--ink-light)" }}>Optional</span>
          )}
        </div>
        <p className="font-serif italic text-[0.95rem] mb-2.5" style={{ color: "var(--gold-dark)", fontWeight: 300, lineHeight: 1.5 }}>
          {s.sub}
        </p>
        <p className="text-sm" style={{ lineHeight: 1.8, color: "var(--ink-3)" }}>{s.body}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="process" aria-labelledby="process-h2"
      className="relative overflow-hidden" style={{ background: "var(--white)" }}
    >
      <div className="rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="wrap section-y relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">

          {/* Sticky left */}
          <div ref={headRef} className="lg:sticky lg:top-28">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }} className="flex items-center gap-3 mb-5"
            >
              <span className="w-7 h-px" style={{ background: "var(--gold)" }} aria-hidden="true" />
              <span className="eyebrow">How We Work</span>
            </motion.div>

            <motion.h2 id="process-h2"
              initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", color: "var(--ink)" }}
            >
              Rigorous by design.{" "}
              <span className="font-serif font-light italic" style={{ color: "var(--gold-dark)" }}>Fast where it counts.</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-[0.9375rem] mb-5 max-w-xs" style={{ lineHeight: 1.8, color: "var(--ink-3)" }}
            >
              Every engagement follows the same five-phase structure. Depth scales to scope —
              a one-week sprint looks different from a six-month build — but the discipline never changes.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-[0.9375rem] mb-9 max-w-xs" style={{ lineHeight: 1.8, color: "var(--ink-3)" }}
            >
              We start every engagement with a free 30-minute discovery call.
              No pitch. If we can&apos;t help, we&apos;ll tell you.
            </motion.p>

            {/* Phase pills */}
            <motion.div initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap gap-2 mb-9"
            >
              {STEPS.map((s, i) => (
                <span key={s.n} className="eyebrow text-[0.58rem] px-2.5 py-1.5 border"
                  style={{ borderColor: "var(--border-gold)", color: i === 4 ? "var(--ink-light)" : "var(--gold-dark)", opacity: i === 4 ? 0.6 : 1 }}>
                  {s.title}
                </span>
              ))}
            </motion.div>

            <motion.a href="#contact"
              initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.34 }}
              onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 px-6 py-3 font-semibold text-sm tracking-wide transition-all duration-300"
              style={{ background: "var(--navy)", color: "var(--white)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--navy)"; }}
            >
              Book a free discovery call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* Steps */}
          <div className="relative">
            {STEPS.map((s, i) => <Step key={s.n} s={s} i={i} />)}
          </div>
        </div>
      </div>

      <div className="rule" aria-hidden="true" />
    </section>
  );
}
