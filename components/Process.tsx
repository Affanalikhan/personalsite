"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const STEPS = [
  {
    n: "01", title: "Discovery",
    body: "We talk to your team and map how the business actually works — not just the stated problem, but the context around it. What data exists, how decisions are made, where the real friction is.",
    optional: false,
  },
  {
    n: "02", title: "Scoping",
    body: "We scope the engagement around what's technically feasible, commercially meaningful, and achievable within your timeline. We agree success metrics up front so there's no ambiguity at the end.",
    optional: false,
  },
  {
    n: "03", title: "Build",
    body: "We build the model, agent, automation, or web product to the agreed specification — clean code, proper testing, documentation throughout. We ship iteratively and keep you in the loop.",
    optional: false,
  },
  {
    n: "04", title: "Handoff",
    body: "We deploy into your environment and run knowledge-transfer sessions. Full documentation, clean handoff — your team can operate what we've built without calling us for every change.",
    optional: false,
  },
  {
    n: "05", title: "Advisory",
    body: "Ongoing strategic input for clients who want continued engagement: reviewing what's working, identifying new opportunities, adjusting the roadmap as the business evolves.",
    optional: true,
  },
];

export default function Process() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="process" aria-labelledby="process-h2"
      style={{ background: "var(--navy)", paddingBlock: "var(--s-96)" }}
    >
      <div className="container">
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "var(--s-64)" }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .55 }}
            className="flex items-center gap-3" style={{ marginBottom: "var(--s-24)" }}
          >
            <span className="divider-gold inline-block" style={{ width: "32px" }} aria-hidden="true" />
            <span className="t-eyebrow" style={{ color: "var(--gold)" }}>How We Work</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.h2 id="process-h2"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .65, delay: .08, ease: EASE }}
              className="t-h2" style={{ color: "var(--off-white)" }}
            >
              Rigorous by design.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--gold)" }}>
                Fast where it counts.
              </em>
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .6, delay: .16 }}
            >
              <p className="t-body" style={{ color: "rgba(245,243,238,.6)", marginBottom: "var(--s-24)" }}>
                Every engagement follows the same five-phase structure. Depth scales to
                scope — but the discipline never changes. We start with a free
                30-minute discovery call.
              </p>
              <a href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary"
              >
                Book a Discovery Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stepper — horizontal on desktop, vertical on mobile */}
        {/* ── Desktop: horizontal track ──────────────────────────── */}
        <div className="hidden lg:block">
          {/* Number row */}
          <div className="grid grid-cols-5 relative" style={{ marginBottom: "var(--s-32)" }}>
            {/* Track line */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-px"
              style={{ background: "rgba(255,255,255,.12)" }} aria-hidden="true"
            />
            {STEPS.map((s, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const inV = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div key={s.n} ref={ref}
                  initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: .55, delay: i * .1, ease: EASE }}
                  className="flex flex-col items-center text-center"
                  style={{ opacity: s.optional ? .55 : 1 }}
                >
                  {/* Circle */}
                  <div
                    style={{
                      width: "56px", height: "56px",
                      border: `2px solid ${s.optional ? "rgba(255,255,255,.15)" : "var(--gold)"}`,
                      background: s.optional ? "transparent" : "var(--gold)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      marginBottom: "var(--s-16)",
                      position: "relative", zIndex: 1,
                    }}
                  >
                    <span style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: s.optional ? "rgba(245,243,238,.4)" : "var(--charcoal)",
                    }}>
                      {s.n}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: s.optional ? "rgba(245,243,238,.45)" : "var(--off-white)",
                    marginBottom: "var(--s-8)",
                  }}>
                    {s.title}
                    {s.optional && (
                      <span className="t-eyebrow text-[10px] block mt-1" style={{ color: "rgba(245,243,238,.35)" }}>Optional</span>
                    )}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Body text row */}
          <div className="grid grid-cols-5 gap-6">
            {STEPS.map((s, i) => (
              <p key={s.n} className="t-small text-center"
                style={{ color: "rgba(245,243,238,.5)", opacity: s.optional ? .6 : 1 }}>
                {s.body}
              </p>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical list ─────────────────────────────── */}
        <div className="lg:hidden flex flex-col" style={{ gap: "var(--s-32)" }}>
          {STEPS.map((s, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inV = useInView(ref, { once: true, margin: "-60px" });
            return (
              <motion.div key={s.n} ref={ref}
                initial={{ opacity: 0, x: -16 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: .55, delay: i * .09, ease: EASE }}
                className="flex gap-5"
                style={{ opacity: s.optional ? .55 : 1 }}
              >
                <div style={{
                  width: "48px", height: "48px", flexShrink: 0,
                  border: `2px solid ${s.optional ? "rgba(255,255,255,.15)" : "var(--gold)"}`,
                  background: s.optional ? "transparent" : "var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 700, color: s.optional ? "rgba(245,243,238,.4)" : "var(--charcoal)" }}>
                    {s.n}
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 600, color: "var(--off-white)", marginBottom: "var(--s-8)" }}>
                    {s.title}
                    {s.optional && <span className="t-eyebrow text-[10px] ml-2" style={{ color: "rgba(245,243,238,.35)", display:"inline" }}>(Optional)</span>}
                  </p>
                  <p className="t-small" style={{ color: "rgba(245,243,238,.55)" }}>{s.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
