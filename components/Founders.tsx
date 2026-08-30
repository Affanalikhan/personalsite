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
    color: "#2563a8",
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
    color: "#c8a96e",
    tags: ["AI Strategy", "Business Development", "AI Automation", "Contract Acquisition"],
  },
];

function FounderCard({ f, i }: { f: typeof FOUNDERS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: i * 0.15, ease: EASE }}
      className="h-full"
    >
      <div className="h-full border border-white/[0.08] overflow-hidden transition-all duration-400 hover:border-white/[0.15]"
        style={{ background: `linear-gradient(160deg, ${f.color}08 0%, rgba(255,255,255,0.02) 60%, transparent 100%)` }}
      >
        {/* Top accent */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${f.color}, transparent 70%)` }} aria-hidden="true" />

        <div className="p-8 lg:p-10 flex flex-col h-full">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 border-2 flex items-center justify-center font-display text-xl font-bold tracking-wider"
                style={{ borderColor: `${f.color}40`, background: `${f.color}10`, color: f.color }}
                aria-hidden="true"
              >
                {f.initials}
              </div>
              {/* Corner dot */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3" style={{ background: f.color }} aria-hidden="true" />
            </div>

            {/* LinkedIn */}
            <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-white/[0.08] text-[var(--cream-dim)] hover:text-[var(--cream)] hover:border-white/20 transition-all duration-250 flex-shrink-0"
              aria-label={`${f.name} on LinkedIn`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="eyebrow text-[0.6rem]">LinkedIn</span>
            </a>
          </div>

          {/* Name block */}
          <h3 className="font-display text-2xl font-semibold text-[var(--cream)] mb-1 leading-tight">
            {f.name}
          </h3>
          <p className="eyebrow text-[0.62rem] mb-1" style={{ color: f.color }}>{f.role}</p>
          <p className="text-sm mb-6" style={{ color: "var(--cream-dim)" }}>{f.focus}</p>

          {/* Rule */}
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${f.color}30, transparent)` }} aria-hidden="true" />

          {/* Bio */}
          <p className="text-[0.9rem] leading-[1.85] mb-4" style={{ color: "var(--cream)" }}>
            {f.bio}
          </p>
          <p className="text-[0.9rem] leading-[1.85] mb-8" style={{ color: "var(--cream-dim)" }}>
            {f.extended}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {f.tags.map(t => (
              <span key={t} className="eyebrow text-[0.58rem] px-2.5 py-1 border"
                style={{ borderColor: `${f.color}25`, color: `${f.color}cc` }}
              >
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
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #091422 0%, #07111d 100%)" }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(37,99,168,0.1) 0%, transparent 65%)" }} aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="wrap section-y relative z-10">

        {/* Header */}
        <div ref={headRef} className="mb-14 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="eyebrow">The Team</span>
          </motion.div>

          <motion.h2 id="founders-h2"
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="font-display font-bold leading-[1.1] mb-5"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}
          >
            Two founders.{" "}
            <span className="font-serif font-light italic" style={{ color: "var(--gold)" }}>One shared conviction.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.18 }}
            className="text-[0.95rem] leading-[1.8]" style={{ color: "var(--cream-dim)" }}
          >
            A&amp;O Holdings is founder-led in the truest sense: both founders work directly
            on client engagements. When you work with us, you get senior expertise on every
            deliverable — not a junior team operating off a template.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {FOUNDERS.map((f, i) => <FounderCard key={f.name} f={f} i={i} />)}
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-white/[0.06] max-w-2xl"
        >
          <p className="font-serif italic leading-[1.9] mb-5 text-[1.1rem]" style={{ color: "var(--cream-dim)" }}>
            &ldquo;We started A&amp;O because we kept seeing the same pattern: companies spending
            significant budget on AI projects that didn&apos;t move the needle — not because
            the technology failed, but because no one had properly identified the right
            problem to solve in the first place. That&apos;s the gap we fill.&rdquo;
          </p>
          <p className="eyebrow text-[0.62rem]" style={{ color: "var(--gold-dim)" }}>
            — Affan &amp; Omer, Co-Founders
          </p>
        </motion.div>

      </div>

      <div className="rule" aria-hidden="true" />
    </section>
  );
}
