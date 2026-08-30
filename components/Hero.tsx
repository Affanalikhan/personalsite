"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const TICKER = ["Predictive Modeling","Agentic AI Systems","AI-Powered Web","Business Automation","AI Strategy Advisory","Data Intelligence","Contract Acquisition","Independent Consulting"];

function NetworkSVG() {
  const nodes: [number, number][] = [[400,100],[660,220],[740,440],[630,680],[390,760],[140,660],[80,420],[200,180],[520,320],[300,500],[590,510],[250,300]];
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[8,9],[8,10],[9,10],[0,8],[2,10],[4,9],[6,9]];
  return (
    <svg viewBox="0 0 800 800" fill="none" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="400" r="340" fill="url(#glow)" />
      {[300,230,160].map(r => (
        <circle key={r} cx="400" cy="400" r={r} stroke="#c8a96e" strokeWidth="0.5"
          strokeDasharray="3 14" opacity="0.12" />
      ))}
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#c8a96e" strokeWidth="0.5" opacity="0.18" />
      ))}
      {nodes.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="#c8a96e" opacity="0.06" />
          <circle cx={cx} cy={cy} r="2.5" fill="#c8a96e" opacity="0.5" />
        </g>
      ))}
      <circle cx="400" cy="400" r="5" fill="#c8a96e" opacity="0.9" />
      <circle cx="400" cy="400" r="18" stroke="#c8a96e" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const tickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;
    const half = () => el.scrollWidth / 2;
    const run = () => { pos -= 0.4; if (Math.abs(pos) >= half()) pos = 0; el.style.transform = `translateX(${pos}px)`; raf = requestAnimationFrame(run); };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stagger = (i: number) => ({ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay: i * 0.12 } } });

  return (
    <section ref={ref} id="hero" aria-labelledby="hero-h1"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #05090f 0%, #080e1a 40%, #0b1525 100%)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" aria-hidden="true" />

      {/* Blue radial glow left */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,168,0.14) 0%, transparent 70%)" }} aria-hidden="true" />

      {/* Network graphic right */}
      <motion.div style={{ y }} className="absolute right-[-4%] top-[6%] w-[540px] h-[540px] pointer-events-none hidden lg:block" aria-hidden="true">
        <NetworkSVG />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity: fade }} className="wrap relative z-10 pt-40 pb-28">

        {/* Eyebrow */}
        <motion.div variants={stagger(0)} initial="hidden" animate="show" className="flex items-center gap-3 mb-8">
          <span className="w-10 h-px bg-[var(--gold)]" />
          <span className="eyebrow text-[var(--gold)]">Independent AI &amp; Data Consultancy</span>
        </motion.div>

        {/* Headline — large editorial type */}
        <motion.h1 id="hero-h1" variants={stagger(1)} initial="hidden" animate="show"
          className="font-display font-bold leading-[1.04] max-w-3xl mb-7"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
        >
          We build the models{" "}
          <span className="font-serif font-light italic" style={{ color: "var(--gold)" }}>
            your competitors
          </span>
          <br />
          haven&apos;t thought of yet.
        </motion.h1>

        {/* Sub */}
        <motion.p variants={stagger(2)} initial="hidden" animate="show"
          className="max-w-[30rem] text-[1.05rem] leading-[1.75] mb-10"
          style={{ color: "var(--cream-dim)" }}
        >
          A&amp;O Holdings is a founder-led consulting firm. We work directly
          with companies to deploy predictive intelligence, build agentic AI
          systems, and drive business growth — no account managers, no
          junior delivery teams.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={stagger(3)} initial="hidden" animate="show" className="flex flex-wrap items-center gap-4 mb-20">
          <a href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm tracking-wide hover:bg-[var(--gold-bright)] transition-colors duration-300"
          >
            Book a Consultation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#services"
            onClick={e => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 text-sm font-medium hover-line pb-px"
            style={{ color: "var(--cream-dim)" }}
          >
            See what we do
          </a>
        </motion.div>

        {/* 3 pillars row */}
        <motion.div variants={stagger(4)} initial="hidden" animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-white/[0.07] max-w-2xl"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {[
            { label: "Founder-led", body: "Both founders work directly on your project — not handed off to junior staff." },
            { label: "Cross-functional", body: "Data science, AI systems, and business development under one roof." },
            { label: "Independent", body: "External consultants brought in for a problem, not added to your org chart." },
          ].map(({ label, body }) => (
            <div key={label} className="p-6" style={{ background: "var(--navy-1)" }}>
              <p className="font-display text-sm font-semibold text-[var(--cream)] mb-2">{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--cream-dim)" }}>{body}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="eyebrow text-[0.58rem]" style={{ color: "var(--cream-dim)", opacity: 0.5 }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--gold)] to-transparent"
        />
      </motion.div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden border-t border-white/[0.05] py-2.5 z-10"
        style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(8px)" }}
      >
        <div ref={tickerRef} className="flex gap-10 whitespace-nowrap" aria-hidden="true">
          {[...TICKER,...TICKER,...TICKER,...TICKER].map((t, i) => (
            <span key={i} className="eyebrow flex items-center gap-4 text-[0.58rem]" style={{ color: "var(--cream-dim)", opacity: 0.4 }}>
              {t}<span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-50 inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
