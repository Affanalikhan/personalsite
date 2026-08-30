"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const FOUNDERS = [
  {
    name: "Affan Ali Khan",
    role: "Co-Founder",
    focus: "Data Science & AI Architecture",
    bio: "Affan leads the technical side of A&O Holdings. His work sits at the intersection of data science and AI systems engineering — building predictive models that inform high-stakes business decisions and designing multi-agent AI frameworks that operate inside real workflows.",
    extended: "He takes a problem-first approach to every engagement: the right technical solution only becomes clear after you fully understand what the business is actually trying to achieve. Affan has experience across the full data science lifecycle — problem framing, feature engineering, model development, MLOps, and deployment — and brings the same rigour to agentic AI architecture and AI-native web development.",
    linkedin: "https://linkedin.com/in/affan-ali-khan",
    initials: "AK",
    accentBg: "#dbeafe",
    accentText: "#1e40af",
    accentBorder: "#93c5fd",
    tags: ["Predictive Modeling", "Agentic AI", "ML Engineering", "AI-Powered Web"],
  },
  {
    name: "Mohammed Omer Khan",
    role: "Co-Founder",
    focus: "Commercial Strategy & AI Enablement",
    bio: "Omer leads the commercial and strategic side of A&O Holdings — client relationships, business development, and the translation of AI capability into business value. He has a sharp instinct for where AI creates genuine advantage versus where it's a distraction.",
    extended: "He runs engagements spanning AI strategy advisory, workflow automation, contract acquisition, and sales infrastructure. His approach is direct and commercially grounded: every recommendation is tested against ROI, feasibility, and what the client's team can actually sustain. Omer is the reason clients understand exactly what they're getting before a single line of code is written.",
    linkedin: "https://linkedin.com/in/mohammed-omer-khan",
    initials: "OK",
    accentBg: "#fef9ec",
    accentText: "#92400e",
    accentBorder: "#d4aa55",
    tags: ["AI Strategy", "Business Development", "AI Automation", "Contract Acquisition"],
  },
];

function FounderCard({ f, i }: { f: typeof FOUNDERS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.14, ease: EASE }}
      className="h-full"
    >
      <div className="h-full border transition-all duration-300 hover:shadow-[0_8px_40px_rgba(13,20,32,0.09)] overflow-hidden"
        style={{ background: "var(--white)", borderColor: "var(--border)" }}
      >
        {/* Top accent stripe */}
        <div className="h-1 w-full" style={{ background: f.accentBorder }} aria-hidden="true" />

        <div className="p-8 lg:p-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-7">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 flex items-center justify-center border-2 font-display text-base font-bold tracking-wider"
                style={{ background: f.accentBg, borderColor: f.accentBorder, color: f.accentText }}
                aria-hidden="true"
              >{f.initials}</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 translate-x-1 translate-y-1"
                style={{ background: f.accentBorder }} aria-hidden="true" />
            </div>

            {/* LinkedIn */}
            <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border text-sm font-medium transition-all duration-200 flex-shrink-0"
              style={{ borderColor: "var(--border)", color: "var(--ink-3)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = f.accentBorder; el.style.color = f.accentText; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--ink-3)"; }}
              aria-label={`${f.name} on LinkedIn`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="eyebrow text-[0.6rem]">LinkedIn</span>
            </a>
          </div>

          {/* Name block */}
          <h3 className="font-display text-2xl font-semibold mb-1 leading-tight mt-1" style={{ color: "var(--ink)" }}>{f.name}</h3>
          <p className="eyebrow text-[0.62rem] mb-1" style={{ color: f.accentText }}>{f.role}</p>
          <p className="text-sm mb-6" style={{ color: "var(--ink-3)" }}>{f.focus}</p>

          {/* Rule */}
          <div className="h-px mb-6" style={{ background: "var(--border)" }} aria-hidden="true" />

          {/* Bio */}
          <p className="text-sm mb-4" style={{ lineHeight: 1.8, color: "var(--ink-2)" }}>{f.bio}</p>
          <p className="text-sm mb-7" style={{ lineHeight: 1.8, color: "var(--ink-3)" }}>{f.extended}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {f.tags.map(t => (
              <span key={t} className="eyebrow text-[0.58rem] px-3 py-1.5 border"
                style={{ borderColor: f.accentBorder, color: f.accentText, background: f.accentBg }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Founders() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="founders" aria-labelledby="founders-h2"
      className="relative overflow-hidden" style={{ background: "var(--bg-2)" }}
    >
      <div className="rule" aria-hidden="true" />

      <div className="wrap section-y relative z-10">

        {/* Header */}
        <div ref={headRef} className="mb-14 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }} className="flex items-center gap-3 mb-5"
          >
            <span className="w-7 h-px" style={{ background: "var(--gold)" }} aria-hidden="true" />
            <span className="eyebrow">The Team</span>
          </motion.div>

          <motion.h2 id="founders-h2"
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-display font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", color: "var(--ink)" }}
          >
            Two founders.{" "}
            <span className="font-serif font-light italic" style={{ color: "var(--gold-dark)" }}>One shared conviction.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-[0.9375rem]" style={{ lineHeight: 1.8, color: "var(--ink-3)" }}
          >
            A&amp;O Holdings is founder-led in the truest sense: both founders work directly
            on client engagements. When you work with us, you get senior expertise on every
            deliverable — not a junior team operating off a template.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FOUNDERS.map((f, i) => <FounderCard key={f.name} f={f} i={i} />)}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 pt-12 border-t max-w-2xl" style={{ borderColor: "var(--border)" }}
        >
          <div className="w-8 h-8 flex items-center justify-center mb-5 border" style={{ borderColor: "var(--border-gold)", background: "var(--gold-pale)" }}>
            <span className="font-serif text-xl font-bold" style={{ color: "var(--gold-dark)", lineHeight: 1 }}>&ldquo;</span>
          </div>
          <p className="font-serif italic text-[1.15rem] mb-5" style={{ lineHeight: 1.9, color: "var(--ink-2)" }}>
            We started A&amp;O because we kept seeing the same pattern: companies spending
            significant budget on AI projects that didn&apos;t move the needle — not because
            the technology failed, but because no one had properly identified the right
            problem to solve in the first place. That&apos;s the gap we fill.
          </p>
          <p className="eyebrow text-[0.62rem]" style={{ color: "var(--gold-dark)" }}>
            — Affan &amp; Omer, Co-Founders
          </p>
        </motion.div>

      </div>

      <div className="rule" aria-hidden="true" />
    </section>
  );
}
