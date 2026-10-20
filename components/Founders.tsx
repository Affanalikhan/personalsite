"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { EASE } from "@/lib/motion";
import { FOUNDERS } from "@/lib/site";

function FounderCard({ f, i }: { f: typeof FOUNDERS[number]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
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
        {/* LEFT — accent sidebar */}
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
          <div style={{
            width: "120px", height: "120px",
            border: `2px solid ${f.accent}`,
            overflow: "hidden",
            flexShrink: 0,
            marginBottom: "var(--s-8)",
            position: "relative",
          }}>
            <Image
              src={f.photo}
              alt={`Photo of ${f.name}`}
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="120px"
            />
          </div>

          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 600, color: "var(--off-white)", marginBottom: "4px" }}>
              {f.name}
            </p>
            <p className="t-eyebrow text-[11px]" style={{ color: f.accent }}>{f.role}</p>
            <p className="t-small mt-2" style={{ color: "rgba(245,243,238,.45)" }}>{f.focus}</p>
          </div>

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

        {/* RIGHT — content */}
        <div style={{ padding: "var(--s-48) var(--s-48)" }}>
          <p className="t-body mb-4">{f.bio}</p>
          <p className="t-body" style={{ marginBottom: "var(--s-32)" }}>{f.extended}</p>

          <div className="divider" style={{ marginBottom: "var(--s-24)" }} aria-hidden="true" />

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

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-24)" }}>
          {FOUNDERS.map((f, i) => <FounderCard key={f.name} f={f} i={i} />)}
        </div>

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
