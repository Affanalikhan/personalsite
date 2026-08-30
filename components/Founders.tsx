"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const FOUNDERS = [
  {
    name: "Affan Ali Khan",
    role: "Co-Founder",
    focus: "Data Science & AI Architecture",
    bio: "Affan leads the technical side of A&O Holdings. His work sits at the intersection of data science and AI systems engineering — from building predictive models that inform high-stakes business decisions, to designing multi-agent AI frameworks that operate inside real workflows.",
    extended:
      "He takes a problem-first approach to every engagement: the right technical solution only becomes clear after you fully understand what the business is actually trying to achieve. Affan has experience across the full data science lifecycle — problem framing, feature engineering, model development, MLOps, and deployment — and brings the same rigour to agentic AI architecture and AI-native web development. He believes the best technical work is the kind that becomes invisible: it just makes the business run better.",
    linkedin: "https://linkedin.com/in/affan-ali-khan",
    initials: "AK",
    accentColor: "#1e4d8c",
    tags: ["Predictive Modeling", "Agentic AI", "ML Engineering", "AI-Powered Web"],
  },
  {
    name: "Mohammed Omer Khan",
    role: "Co-Founder",
    focus: "Commercial Strategy & AI Enablement",
    bio: "Omer leads the commercial and strategic side of A&O Holdings. He owns client relationships, business development, and the translation of AI capability into business value — and has a sharp instinct for where AI creates genuine advantage versus where it's a distraction.",
    extended:
      "He runs engagements spanning AI strategy advisory, workflow automation, contract acquisition, and sales infrastructure. His approach is direct and grounded in commercial reality: every recommendation is tested against ROI, feasibility, and what the client's team can actually sustain long-term. Omer is the reason clients understand what they're getting before a single line of code is written — and the reason they come back when the next problem surfaces.",
    linkedin: "https://linkedin.com/in/mohammed-omer-khan",
    initials: "OK",
    accentColor: "#c9a84c",
    tags: ["AI Strategy", "Business Development", "AI Automation", "Contract Acquisition"],
  },
];

function FounderCard({ founder, index }: { founder: (typeof FOUNDERS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.16, ease: EASE }}
    >
      <div className="border border-white/[0.07] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_50px_rgba(201,168,76,0.04)] h-full"
        style={{ background: `linear-gradient(160deg, ${founder.accentColor}06 0%, transparent 50%)` }}
      >
        {/* Top accent */}
        <div
          className="h-[2px]"
          style={{ background: `linear-gradient(90deg, ${founder.accentColor}, ${founder.accentColor}20)` }}
          aria-hidden="true"
        />

        <div className="p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-7">
            <div className="relative flex-shrink-0">
              <div
                className="w-14 h-14 flex items-center justify-center border font-display text-base font-bold tracking-widest"
                style={{
                  borderColor: `${founder.accentColor}45`,
                  background: `linear-gradient(135deg, ${founder.accentColor}15, ${founder.accentColor}05)`,
                  color: founder.accentColor,
                }}
                aria-hidden="true"
              >
                {founder.initials}
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-3 h-3"
                style={{ background: founder.accentColor, opacity: 0.75 }}
                aria-hidden="true"
              />
            </div>

            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-[var(--mist)] hover:text-[var(--cream)] transition-colors duration-300 border border-white/[0.08] px-3 py-2 hover:border-[var(--gold)]/30 mt-0.5"
              aria-label={`${founder.name} on LinkedIn`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Name */}
          <h3 className="font-display text-[1.4rem] font-semibold text-[var(--cream)] mb-0.5 leading-tight">
            {founder.name}
          </h3>
          <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-1" style={{ color: founder.accentColor }}>
            {founder.role}
          </p>
          <p className="text-[var(--mist)] text-xs mb-6">{founder.focus}</p>

          {/* Divider */}
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${founder.accentColor}35, transparent)` }} aria-hidden="true" />

          {/* Bio */}
          <p className="text-[var(--cream)]/80 text-sm leading-[1.85] mb-4">
            {founder.bio}
          </p>
          <p className="text-[var(--mist)] text-sm leading-[1.85] mb-7">
            {founder.extended}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {founder.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.55rem] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 border"
                style={{ borderColor: `${founder.accentColor}28`, color: `${founder.accentColor}bb` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Founders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="relative section-transition overflow-hidden"
      style={{ background: "linear-gradient(180deg, #081220 0%, #060f1c 50%, #0a1628 100%)" }}
      aria-labelledby="founders-heading"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute left-[-2%] top-1/2 -translate-y-1/2 font-display text-[16vw] font-bold text-white/[0.016] leading-none select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        FOUNDERS
      </motion.div>

      <div className="absolute inset-0 grid-lines opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(30,77,140,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="section-pad container-site relative z-10">

        {/* Header */}
        <div ref={headingRef} className="mb-14 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-eyebrow mb-5 flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-[var(--gold)]" />
            The Team
          </motion.p>

          <motion.h2
            id="founders-heading"
            initial={{ opacity: 0, y: 24 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5"
          >
            Two founders.{" "}
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 300, color: "var(--gold)" }}>
              One shared conviction.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--mist)] leading-[1.8] text-[0.95rem]"
          >
            A&amp;O Holdings is founder-led in the truest sense: both founders work
            directly on client engagements. When you work with us, you get senior
            expertise on every deliverable — not a junior team working off a template
            while the founders are busy selling the next project.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FOUNDERS.map((founder, i) => (
            <FounderCard key={founder.name} founder={founder} index={i} />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 pt-10 border-t border-[var(--gold)]/8 max-w-xl"
        >
          <p
            className="text-[var(--cream)]/65 leading-[1.9] mb-4"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.15rem", fontStyle: "italic" }}
          >
            &ldquo;We started A&amp;O because we kept seeing the same pattern: companies
            spending significant budget on AI and data projects that didn&apos;t move
            the needle — not because the technology failed, but because no one had
            properly identified the right problem to solve in the first place. That&apos;s
            the gap we fill.&rdquo;
          </p>
          <p className="text-eyebrow text-[var(--gold)]/55">— Affan &amp; Omer, Co-Founders</p>
        </motion.div>

      </div>

      <div className="divider-gold" aria-hidden="true" />
    </section>
  );
}
