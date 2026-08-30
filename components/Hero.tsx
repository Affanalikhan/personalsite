"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";

const TICKER_ITEMS = [
  "Predictive Modeling",
  "Agentic AI Systems",
  "AI-Powered Web",
  "Business Automation",
  "AI Strategy Advisory",
  "Data Intelligence",
];

function DataOrb() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric rings */}
      {[320, 260, 200, 140, 80].map((r, i) => (
        <circle
          key={r}
          cx="400"
          cy="400"
          r={r}
          stroke="#c9a84c"
          strokeWidth="0.5"
          strokeDasharray={`${4 + i * 2} ${8 + i * 3}`}
          opacity={0.4 - i * 0.04}
        />
      ))}
      {/* Network nodes */}
      {[
        [400, 80], [620, 200], [700, 420], [600, 650],
        [380, 720], [160, 620], [100, 380], [210, 160],
        [500, 310], [300, 490], [560, 500], [260, 280],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3" fill="#c9a84c" opacity="0.7" />
          <circle cx={cx} cy={cy} r="8" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}
      {/* Connecting lines */}
      {[
        "400,80 620,200", "620,200 700,420", "700,420 600,650",
        "600,650 380,720", "380,720 160,620", "160,620 100,380",
        "100,380 210,160", "210,160 400,80", "500,310 260,280",
        "500,310 560,500", "300,490 560,500", "300,490 260,280",
        "400,80 500,310", "700,420 560,500", "380,720 300,490",
        "100,380 260,280",
      ].map((pts, i) => (
        <polyline key={i} points={pts} stroke="#c9a84c" strokeWidth="0.4" opacity="0.25" />
      ))}
      {/* Central glow */}
      <circle cx="400" cy="400" r="30" fill="#c9a84c" opacity="0.06" />
      <circle cx="400" cy="400" r="12" fill="#c9a84c" opacity="0.15" />
      <circle cx="400" cy="400" r="4" fill="#c9a84c" opacity="0.8" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yHeadline = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yOrb = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const springY = useSpring(yHeadline, { stiffness: 80, damping: 20 });

  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let pos = 0;
    const speed = 0.4;
    const half = ticker.scrollWidth / 2;
    let raf: number;

    const run = () => {
      pos -= speed;
      if (Math.abs(pos) >= half) pos = 0;
      ticker.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: i * 0.12 },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden gradient-navy grid-lines section-transition"
      aria-labelledby="hero-headline"
    >
      {/* Noise */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Background orb — parallax */}
      <motion.div
        style={{ y: yOrb }}
        className="absolute right-[-5%] top-[10%] w-[600px] h-[600px] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <DataOrb />
      </motion.div>

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30,77,140,0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        style={{ y: springY, opacity }}
        className="container-site relative z-10 pt-32 pb-20"
      >
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-[var(--gold)]" />
          Independent AI & Data Consultancy
        </motion.p>

        {/* Headline */}
        <motion.h1
          id="hero-headline"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] max-w-4xl"
        >
          We build the models{" "}
          <span className="font-editorial font-light italic gradient-text-gold">
            your competitors
          </span>
          <br />
          haven&apos;t thought of yet.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 text-lg sm:text-xl text-[var(--mist)] max-w-xl leading-relaxed"
        >
          A&O Holdings partners with ambitious companies to turn data into
          decisions, deploy intelligent agents, and build AI-native products
          that compound in value over time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--gold)] text-[var(--navy)] font-semibold tracking-wide text-sm hover:bg-[var(--gold-light)] transition-all duration-300"
          >
            Book a Consultation
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 text-[var(--cream)] text-sm font-medium tracking-wide border-b border-[var(--cream)]/30 pb-0.5 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300"
          >
            Explore our services
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-20 pt-10 border-t border-[var(--gold)]/15 grid grid-cols-2 sm:grid-cols-3 gap-10 max-w-xl"
        >
          {[
            { num: "3", label: "Service Pillars" },
            { num: "2", label: "Expert Founders" },
            { num: "∞", label: "Compounding Value" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-display text-4xl font-bold gradient-text-gold">{num}</p>
              <p className="text-eyebrow text-[var(--mist)] mt-2">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="text-eyebrow text-[var(--mist)]/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent"
        />
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[var(--gold)]/10 py-3 z-10 bg-[var(--navy)]/60 backdrop-blur-sm">
        <div ref={tickerRef} className="flex gap-12 whitespace-nowrap" aria-hidden="true">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (item, i) => (
              <span
                key={i}
                className="text-eyebrow text-[var(--mist)]/40 flex items-center gap-4"
              >
                {item}
                <span className="inline-block w-1 h-1 rounded-full bg-[var(--gold)]/40" />
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
