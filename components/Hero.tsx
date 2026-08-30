"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const TICKER = [
  "Predictive Modeling", "Agentic AI Systems", "AI-Powered Web",
  "Business Automation", "AI Strategy Advisory", "Data Intelligence",
  "Contract Acquisition", "Independent Consulting",
];

function NetworkSVG() {
  const nodes: [number, number][] = [
    [400,100],[660,220],[740,440],[630,680],[390,760],
    [140,660],[80,420],[200,180],[520,320],[300,500],[590,510],[250,300],
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],
    [8,9],[8,10],[9,10],[0,8],[2,10],[4,9],[6,9],
  ];
  return (
    <svg viewBox="0 0 800 800" fill="none" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="netglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="400" r="340" fill="url(#netglow)" />
      {[300, 230, 160].map(r => (
        <circle key={r} cx="400" cy="400" r={r}
          stroke="#c8a96e" strokeWidth="0.5" strokeDasharray="3 14" opacity="0.1" />
      ))}
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#c8a96e" strokeWidth="0.5" opacity="0.15" />
      ))}
      {nodes.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="9" fill="#c8a96e" opacity="0.05" />
          <circle cx={cx} cy={cy} r="2.5" fill="#c8a96e" opacity="0.45" />
        </g>
      ))}
      <circle cx="400" cy="400" r="5" fill="#c8a96e" opacity="0.85" />
      <circle cx="400" cy="400" r="18" stroke="#c8a96e" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const networkY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const tickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;
    const half = () => el.scrollWidth / 2;
    const run = () => {
      pos -= 0.4;
      if (Math.abs(pos) >= half()) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
  });

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-h1"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #05090f 0%, #080e1a 45%, #0b1525 100%)" }}
    >
      {/* Dot grid — decorative, z-0 */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />

      {/* Blue glow left — z-0 */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-40 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,168,0.12) 0%, transparent 70%)", zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Network SVG right — decorative, hidden on mobile */}
      {/* FIX #1: z-index:1, content sits at z-index:2 so network is always behind text */}
      <motion.div
        style={{ y: networkY, zIndex: 1 }}
        className="absolute right-[-4%] top-[5%] w-[500px] h-[500px] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <NetworkSVG />
      </motion.div>

      {/* ── Main content — z-index:2 so it's always above decorative layers ── */}
      <motion.div
        style={{ opacity: contentFade, zIndex: 2, paddingTop: "clamp(6rem, 14vw, 10rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}
        className="relative wrap"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate="show"
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-[var(--gold)] flex-shrink-0" aria-hidden="true" />
          <span className="eyebrow">Independent AI &amp; Data Consultancy</span>
        </motion.div>

        {/* Headline
            FIX #11: clamp keeps it readable on 375px without becoming enormous on 1440px.
            max-w-[16ch] forces natural wrapping at ~2–3 lines max on any screen. */}
        <motion.h1
          id="hero-h1"
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="show"
          className="font-display font-bold max-w-[16ch] mb-6"
          style={{ fontSize: "clamp(2.1rem, 5vw, 3.75rem)", lineHeight: 1.08 }}
        >
          We build the models{" "}
          <span className="font-serif font-light italic" style={{ color: "var(--gold)" }}>
            your competitors
          </span>{" "}
          haven&apos;t thought of yet.
        </motion.h1>

        {/* Sub-headline — FIX #4: explicit line-height 1.75 */}
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="show"
          className="max-w-[30rem] mb-9"
          style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--cream-dim)" }}
        >
          A&amp;O Holdings is a founder-led consulting firm. We work directly
          with companies to deploy predictive intelligence, build agentic AI
          systems, and drive business growth — no account managers, no
          junior delivery teams.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-4 mb-14"
        >
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm tracking-wide hover:bg-[var(--gold-bright)] transition-colors duration-300"
          >
            Book a Consultation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            onClick={e => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-sm font-medium hover-line pb-px"
            style={{ color: "var(--cream-dim)" }}
          >
            See what we do
          </a>
        </motion.div>

        {/* Value props grid
            FIX #5: consistent gap; FIX #7: each tile has a visible border;
            On mobile stacks to 1 col, tablet 2 col, desktop 3 col */}
        <motion.div
          variants={fadeUp(0.42)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-px max-w-2xl"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {[
            { label: "Founder-led",      body: "Both founders work directly on every project — no handoff to junior staff." },
            { label: "Cross-functional", body: "Data science, AI systems, and business development under one roof." },
            { label: "Independent",      body: "External consultants brought in for a problem, not added to your org chart." },
          ].map(({ label, body }) => (
            <div key={label} className="p-5" style={{ background: "var(--navy-1)" }}>
              <p className="font-display text-sm font-semibold text-[var(--cream)] mb-2">{label}</p>
              {/* FIX #4: explicit line-height */}
              <p className="text-xs" style={{ lineHeight: 1.7, color: "var(--cream-dim)" }}>{body}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* FIX #1: Scroll cue — positioned at bottom-20 to clear the ticker bar,
          z-index:2 same as content but placed AFTER content so it's on top if they
          ever intersect; on mobile hide it entirely so it doesn't float over text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <span className="eyebrow text-[0.55rem]" style={{ opacity: 0.45, color: "var(--cream-dim)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-[var(--gold)] to-transparent"
        />
      </motion.div>

      {/* Ticker strip — z-index:3 sits above everything */}
      <div
        className="absolute bottom-0 inset-x-0 overflow-hidden border-t border-white/[0.05] py-2.5"
        style={{ background: "rgba(8,14,26,0.85)", backdropFilter: "blur(8px)", zIndex: 3 }}
      >
        <div ref={tickerRef} className="flex gap-10 whitespace-nowrap" aria-hidden="true">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="eyebrow flex items-center gap-4 text-[0.58rem]"
              style={{ color: "var(--cream-dim)", opacity: 0.38 }}>
              {t}
              <span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-50 inline-block" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
