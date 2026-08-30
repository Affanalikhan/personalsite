"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

/* ── Ticker items ──────────────────────────────────────────────── */
const TICKER = [
  "Predictive Modeling", "Agentic AI Systems", "AI-Powered Web",
  "Business Automation", "AI Strategy Advisory", "Data Intelligence",
  "Product Management", "Contract Acquisition",
];

/* ── Geometric SVG decoration ──────────────────────────────────── */
function GeometricDecor() {
  return (
    <svg
      viewBox="0 0 560 560"
      fill="none"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Concentric squares rotated */}
      {[0, 15, 30, 45].map((deg, i) => (
        <rect
          key={deg}
          x={80 + i * 40} y={80 + i * 40}
          width={400 - i * 80} height={400 - i * 80}
          stroke="var(--gold)"
          strokeWidth=".75"
          opacity={0.15 - i * 0.03}
          transform={`rotate(${deg} 280 280)`}
        />
      ))}
      {/* Cross-hairs */}
      <line x1="280" y1="40"  x2="280" y2="520" stroke="var(--gold)" strokeWidth=".5" opacity=".12" />
      <line x1="40"  y1="280" x2="520" y2="280" stroke="var(--gold)" strokeWidth=".5" opacity=".12" />
      {/* Diagonal */}
      <line x1="80"  y1="80"  x2="480" y2="480" stroke="var(--gold)" strokeWidth=".5" opacity=".08" />
      <line x1="480" y1="80"  x2="80"  y2="480" stroke="var(--gold)" strokeWidth=".5" opacity=".08" />
      {/* Centre circle */}
      <circle cx="280" cy="280" r="120" stroke="var(--gold)" strokeWidth=".75" opacity=".18" />
      <circle cx="280" cy="280" r="60"  stroke="var(--gold)" strokeWidth=".75" opacity=".12" />
      <circle cx="280" cy="280" r="8"   fill="var(--gold)"   opacity=".5" />
      {/* Corner marks */}
      {[[80,80],[480,80],[480,480],[80,480]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="4" fill="var(--gold)" opacity=".35" />
          <circle cx={cx} cy={cy} r="12" stroke="var(--gold)" strokeWidth=".6" opacity=".15" />
        </g>
      ))}
      {/* Orbit dots */}
      {[0,60,120,180,240,300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 280 + 120 * Math.cos(rad);
        const y = 280 + 120 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="var(--gold)" opacity=".4" />;
      })}
    </svg>
  );
}

/* ── Stats bar ──────────────────────────────────────────────────── */
const STATS = [
  { value: "4",    label: "Service Pillars"      },
  { value: "2",    label: "Expert Founders"       },
  { value: "100%", label: "Founder-led Delivery"  },
  { value: "∞",    label: "Compounding Value"     },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const decorY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const fade   = useTransform(scrollYProgress, [0, .65], [1, 0]);

  /* Ticker RAF */
  const tickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0; let raf: number;
    const half = () => el.scrollWidth / 2;
    const run = () => {
      pos -= .42; if (Math.abs(pos) >= half()) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  const up = (d: number) => ({
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: .7, ease: EASE, delay: d } },
  });

  return (
    <section ref={ref} id="hero" aria-labelledby="hero-h1" style={{ paddingTop: "65px" }}>

      {/* ── SPLIT: navy left / ivory right ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-65px)]">

        {/* LEFT — navy panel ─────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: fade,
            background: "var(--navy)",
            padding: "var(--s-64) clamp(var(--s-32),5vw,var(--s-96))",
          }}
          className="relative flex flex-col justify-center"
        >
          {/* Subtle grid lines */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="relative z-10">
            {/* Eyebrow */}
            <motion.div variants={up(0)} initial="hidden" animate="show"
              className="flex items-center gap-3 mb-8"
            >
              <span className="divider-gold" style={{ width: "32px", display: "inline-block" }} aria-hidden="true" />
              <span className="t-eyebrow" style={{ color: "var(--gold)" }}>Independent Consultancy</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              id="hero-h1"
              variants={up(.1)} initial="hidden" animate="show"
              className="t-h1 mb-8"
              style={{ color: "var(--off-white)" }}
            >
              We build the models{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--gold)",
                }}
              >
                your competitors
              </em>
              {" "}haven&apos;t thought of yet.
            </motion.h1>

            {/* Sub */}
            <motion.p variants={up(.2)} initial="hidden" animate="show"
              className="t-body mb-10"
              style={{ color: "rgba(245,243,238,.65)", maxWidth: "52ch" }}
            >
              A&amp;O Holdings is a founder-led consultancy. We work directly
              with companies across data science, AI systems, product strategy,
              and commercial growth — no account managers, no junior teams.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={up(.3)} initial="hidden" animate="show"
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary"
              >
                Book a Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#services"
                onClick={e => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-secondary-light"
              >
                Our Services
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — ivory panel ───────────────────────────────────── */}
        <div className="relative flex flex-col justify-center items-center overflow-hidden"
          style={{ background: "var(--ivory)", padding: "var(--s-64) var(--s-48)" }}
        >
          {/* Geometric decoration */}
          <motion.div
            style={{ y: decorY }}
            className="w-[min(440px,85vw)] h-[min(440px,85vw)]"
            aria-hidden="true"
          >
            <GeometricDecor />
          </motion.div>

          {/* Floating tag pills */}
          {[
            { label: "Data Science",    top: "14%", left: "8%"  },
            { label: "Agentic AI",      top: "22%", right: "6%" },
            { label: "Product Strategy",bottom: "28%", left: "5%"},
            { label: "Commercial Growth",bottom:"20%", right:"4%"},
          ].map(({ label, ...pos }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: .6 + Math.random() * .4, duration: .5 }}
              className="absolute t-eyebrow text-[11px] px-3 py-2"
              style={{
                ...pos,
                border: "1px solid var(--gold)",
                background: "var(--ivory)",
                color: "var(--charcoal)",
                letterSpacing: ".14em",
              }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Stats bar ────────────────────────────────────────────── */}
      <div style={{ background: "var(--ivory-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4"
            style={{ gap: "0" }}
          >
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex flex-col items-center justify-center text-center"
                style={{
                  padding: "var(--s-32) var(--s-24)",
                  borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(36px,4vw,52px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "var(--gold)",
                    marginBottom: "var(--s-8)",
                    display: "block",
                  }}
                >
                  {value}
                </span>
                <span className="t-eyebrow text-[11px]" style={{ color: "var(--charcoal-3)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ticker ───────────────────────────────────────────────── */}
      <div style={{ background: "var(--navy)", overflow: "hidden", padding: "10px 0" }}>
        <div ref={tickerRef} className="flex gap-10 whitespace-nowrap" aria-hidden="true">
          {[...TICKER,...TICKER,...TICKER,...TICKER].map((t, i) => (
            <span key={i} className="t-eyebrow text-[11px] flex items-center gap-4"
              style={{ color: "rgba(245,243,238,.38)" }}>
              {t}
              <span className="inline-block w-1 h-1 rounded-full" style={{ background: "var(--gold)", opacity: .6 }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
