"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const FOUNDERS = [
  {
    name: "Affan Ali Khan",
    role: "Co-Founder",
    focus: "Data Science & AI Architecture",
    initial: "A",
    bio: "Affan leads the technical side of A&O Holdings. His work sits at the intersection of data science and AI systems engineering — building predictive models that inform high-stakes business decisions and designing multi-agent AI frameworks that operate inside real workflows.",
    extended: "He takes a problem-first approach to every engagement: the right technical solution only becomes clear after you fully understand what the business is actually trying to achieve. Affan has experience across the full data science lifecycle — problem framing, feature engineering, model development, MLOps, and deployment — and brings the same rigour to agentic AI architecture and AI-native web development.",
    linkedin: "https://linkedin.com/in/affan-ali-khan",
    tags: ["Predictive Modeling", "Agentic AI", "ML Engineering", "AI-Powered Web"],
    accent: "#1e40af",
  },
  {
    name: "Mohammed Omer Khan",
    role: "Co-Founder",
    focus: "Commercial Strategy & AI Enablement",
    initial: "O",
    bio: "Omer leads the commercial and strategic side of A&O Holdings — client relationships, business development, and the translation of AI capability into business value. He has a sharp instinct for where AI creates genuine advantage versus where it's a distraction.",
    extended: "He runs engagements spanning AI strategy advisory, workflow automation, contract acquisition, and sales infrastructure. Every recommendation is tested against ROI, feasibility, and what the client's team can actually sustain long-term.",
    linkedin: "https://linkedin.com/in/mohammed-omer-khan",
    tags: ["AI Strategy", "Business Development", "AI Automation", "Contract Acquisition"],
    accent: "var(--gold)",
  },
];

function FounderCard({ f, i }: { f: typeof FOUNDERS[0]; i: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .75, delay: i * .14, ease: EASE }}
    >
      <div
        style={{
          background: "var(--ivory)",
          border: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr",
          overflow: "hidden",
          transition: "box-shadow .2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
        className="lg:grid-cols-[280px_1fr]"
      >
        {/* LEFT — accent sidebar ─────────────────────────────────── */}
        <div
          style={{
            background: "var(--navy)",
            padding: "var(--s-48) var(--s-32)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--s-16)",
            textAlign: "center",
            borderRight: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {/* Avatar circle */}
          <div style={{
            width: "96px", height: "96px",
            border: `2px solid ${f.accent}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,.04)",
            marginBottom: "var(--s-8)",
          }}>
            <span style={{
              fontFamily: "var(--font-serif)",
              fontSize: "40px",
              fontWeight: 700,
              color: f.accent,
            }} aria-hidden="true">
              {f.initial}
            </span>
          </div>

          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 600, color: "var(--off-white)", marginBottom: "4px" }}>
              {f.name}
            </p>
            <p className="t-eyebrow text-[11px]" style={{ color: f.accent }}>{f.role}</p>
            <p className="t-small mt-2" style={{ color: "rgba(245,243,238,.45)" }}>{f.focus}</p>
          </div>

          {/* LinkedIn */}
          <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
            className="btn-secondary-light mt-2"
            style={{ padding: "10px 20px", fontSize: "12px" }}
            aria-label={`${f.name} on LinkedIn`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* RIGHT — content ────────────────────────────────────────── */}
        <div style={{ padding: "var(--s-48) var(--s-48)" }}>
          {/* Bio */}
          <p className="t-body mb-4">{f.bio}</p>
          <p className="t-body" style={{ marginBottom: "var(--s-32)" }}>{f.extended}</p>

          {/* Divider */}
          <div className="divider" style={{ marginBottom: "var(--s-24)" }} aria-hidden="true" />

          {/* Expertise tags */}
          <p className="t-eyebrow text-[11px] mb-3" style={{ color: "var(--charcoal-3)" }}>Areas of Expertise</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-8)" }}>
            {f.tags.map(t => (
              <span key={t}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  padding: "6px 14px",
                  border: "1px solid var(--border)",
                  color: "var(--charcoal-2)",
                  background: "var(--ivory-2)",
                }}
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
  const inView  = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="founders" aria-labelledby="founders-h2"
      style={{ background: "var(--ivory-2)", paddingBlock: "var(--s-96)" }}
    >
      <div className="container">
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "var(--s-64)" }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .55 }}
            className="flex items-center gap-3" style={{ marginBottom: "var(--s-24)" }}
          >
            <span className="divider-gold inline-block" style={{ width: "32px" }} aria-hidden="true" />
            <span className="t-eyebrow">The Team</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.h2 id="founders-h2"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .65, delay: .08, ease: EASE }}
              className="t-h2" style={{ color: "var(--charcoal)" }}
            >
              Two founders.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>One shared conviction.</em>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .6, delay: .16 }}
              className="t-body"
            >
              A&amp;O Holdings is founder-led in the truest sense: both founders work directly
              on client engagements. You get senior expertise on every deliverable — not a
              junior team operating off a template.
            </motion.p>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-24)" }}>
          {FOUNDERS.map((f, i) => <FounderCard key={f.name} f={f} i={i} />)}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: .65, delay: .3 }}
          style={{
            marginTop: "var(--s-64)",
            paddingTop: "var(--s-48)",
            borderTop: "1px solid var(--border)",
            maxWidth: "72ch",
          }}
        >
          <p style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(18px,2vw,22px)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.65,
            color: "var(--charcoal-2)",
            marginBottom: "var(--s-16)",
          }}>
            &ldquo;We started A&amp;O because we kept seeing the same pattern: companies spending
            significant budget on AI projects that didn&apos;t move the needle — not because
            the technology failed, but because no one had properly identified the right
            problem to solve in the first place. That&apos;s the gap we fill.&rdquo;
          </p>
          <footer className="t-eyebrow text-[11px]" style={{ color: "var(--gold)" }}>
            — Affan &amp; Omer, Co-Founders
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
