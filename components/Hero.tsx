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
  "Contract Acquisition",
  "Independent Consulting",
];

function DataOrb() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[320, 260, 200, 140, 80].map((r, i) => (
        <circle
          key={r}
          cx="400" cy="400" r={r}
          stroke="#c9a84c"
          strokeWidth="0.6"
          strokeDasharray={`${4 + i * 2} ${10 + i * 3}`}
          opacity={0.18 - i * 0.02}
        />
      ))}
      {[
        [400,80],[620,200],[700,420],[600,650],
        [380,720],[160,620],[100,380],[210,160],
        [500,310],[300,490],[560,500],[260,280],
        [450,190],[330,360],[520,420],[240,510],
      ].map(([cx,cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="2.5" fill="#c9a84c" opacity="0.5" />
          <circle cx={cx} cy={cy} r="7" stroke="#c9a84c" strokeWidth="0.5" opacity="0.15" />
        </g>
      ))}
      {[
        "400,80 620,200","620,200 700,420","700,420 600,650",
        "600,650 380,720","380,720 160,620","160,620 100,380",
        "100,380 210,160","210,160 400,80","500,310 260,280",
        "500,310 560,500","300,490 560,500","300,490 260,280",
        "400,80 500,310","700,420 560,500","380,720 300,490",
        "450,190 500,310","330,360 300,490","520,420 560,500",
      ].map((pts, i) => (
        <polyline key={i} points={pts} stroke="#c9a84c" strokeWidth="0.35" opacity="0.15" />
      ))}
      <circle cx="400" cy="400" r="28" fill="#c9a84c" opacity="0.04" />
      <circle cx="400" cy="400" r="10" fill="#c9a84c" opacity="0.1" />
      <circle cx="400" cy="400" r="3.5" fill="#c9a84c" opacity="0.7" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yHeadline = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const yOrb     = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const springY  = useSpring(yHeadline, { stiffness: 80, damping: 22 });

  const tickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let pos = 0;
    const speed = 0.35;
    let raf: number;
    const half = () => ticker.scrollWidth / 2;
    const run = () => {
      pos -= speed;
      if (Math.abs(pos) >= half()) pos = 0;
      ticker.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.9, ease: EASE, delay: i * 0.11 },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden section-transition"
      style={{ background: "linear-gradient(135deg, #08111f 0%, #0a1628 45%, #0d1f3a 100%)" }}
      aria-labelledby="hero-headline"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines pointer-events-none" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(30,77,140,0.18) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Data orb */}
      <motion.div
        style={{ y: yOrb }}
        className="absolute right-[-6%] top-[8%] w-[580px] h-[580px] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <DataOrb />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: springY, opacity }}
        className="container-site relative z-10 pt-36 pb-24"
      >
        {/* Eyebrow */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          className="text-eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-[var(--gold)]" />
          Independent AI &amp; Data Consultancy · London
        </motion.p>

        {/* Headline */}
        <motion.h1
          id="hero-headline"
          custom={1} variants={fadeUp} initial="hidden" animate="show"
          className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] font-bold leading-[1.06] max-w-4xl"
        >
          We build the models{" "}
          <span
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 300, color: "var(--gold)" }}
          >
            your competitors
          </span>
          <br />
          haven&apos;t thought of yet.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="show"
          className="mt-7 text-base sm:text-lg text-[var(--mist)] max-w-[34rem] leading-[1.8]"
        >
          A&amp;O Holdings is a founder-led consulting firm. We work directly
          with companies — no account managers, no junior teams — to deploy
          predictive intelligence, build agentic AI systems, and drive the
          kind of business growth that compounds over time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="show"
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--gold)] text-[var(--navy)] font-semibold tracking-wide text-sm hover:bg-[var(--gold-light)] transition-all duration-300"
          >
            Book a Consultation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-[var(--cream)] text-sm font-medium tracking-wide pb-px border-b border-[var(--cream)]/25 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300"
          >
            See what we do
          </a>
        </motion.div>

        {/* Value props */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="show"
          className="mt-16 pt-10 border-t border-[var(--gold)]/12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl"
        >
          {[
            {
              heading: "Founder-led",
              body: "Both founders work directly on every engagement. You'll never be handed to someone junior.",
            },
            {
              heading: "Cross-functional",
              body: "Data science, AI systems, and business development under one roof — fewer vendors, cleaner outcomes.",
            },
            {
              heading: "Independent",
              body: "We work as external consultants — brought in for a specific problem, not added to your org chart.",
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <p className="font-display text-sm font-semibold text-[var(--cream)] mb-2">{heading}</p>
              <p className="text-[var(--mist)] text-xs leading-[1.75]">{body}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="text-eyebrow text-[var(--mist)]/50 text-[0.6rem]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-9 bg-gradient-to-b from-[var(--gold)]/60 to-transparent"
        />
      </motion.div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[var(--gold)]/8 py-2.5 z-10 bg-[var(--navy)]/50 backdrop-blur-sm">
        <div ref={tickerRef} className="flex gap-10 whitespace-nowrap" aria-hidden="true">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-eyebrow text-[var(--mist)]/35 flex items-center gap-4 text-[0.6rem]">
              {item}
              <span className="inline-block w-1 h-1 rounded-full bg-[var(--gold)]/30" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
