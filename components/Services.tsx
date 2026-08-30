"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const PILLARS = [
  {
    id: "data",
    index: "01",
    label: "Data & Predictive Intelligence",
    tagline: "Turn raw data into competitive foresight.",
    description:
      "We dig into your data to surface patterns invisible to conventional analysis — then build the forecasting infrastructure that keeps your leadership one step ahead.",
    accentColor: "#1e4d8c",
    services: [
      {
        name: "Predictive Modeling & Business Analytics",
        detail:
          "End-to-end data science engagements: problem framing, feature engineering, model development, and validated forecasts your teams can act on immediately.",
      },
      {
        name: "Agentic AI Frameworks",
        detail:
          "Custom multi-agent systems that perceive, reason, and act within your business environment — automating complex decision workflows that no static tool can handle.",
      },
    ],
  },
  {
    id: "ai",
    index: "02",
    label: "AI Enablement",
    tagline: "Embed intelligence into every layer of your business.",
    description:
      "From customer-facing web products to back-office workflows and executive strategy, we translate AI's potential into tangible, deployed capability.",
    accentColor: "#c9a84c",
    services: [
      {
        name: "AI-Powered Web Development",
        detail:
          "Websites and web products with AI capabilities built in from the ground up — dynamic personalisation, intelligent search, generative content, and real-time data surfaces.",
      },
      {
        name: "AI Automation",
        detail:
          "Process audits followed by automated workflow design that removes bottlenecks, eliminates repetitive overhead, and scales your operations without scaling headcount.",
      },
      {
        name: "AI Strategy Advisory",
        detail:
          "Structured advisory sessions with your leadership team to map AI opportunity across the business, prioritise initiatives by ROI, and build a coherent AI roadmap.",
      },
    ],
  },
  {
    id: "growth",
    index: "03",
    label: "Growth & Business Development",
    tagline: "Pipeline, contracts, and commercial momentum.",
    description:
      "Strategic business development support delivered by independent consultants — not an in-house team. We help you win contracts, open doors, and build repeatable growth systems.",
    accentColor: "#8b9ab0",
    services: [
      {
        name: "Contract Acquisition Support",
        detail:
          "Opportunity identification, proposal strategy, and bid support to improve your win rate on high-value contracts and public-sector tenders.",
      },
      {
        name: "Sales & Business Development",
        detail:
          "Pipeline architecture, outreach strategy, and partnership development — designed as independent consulting engagements that supplement your existing team.",
      },
    ],
  },
];

/* ─── Sub-components ───────────────────────────────────────────────────────── */

function ServiceItem({
  name,
  detail,
  index,
}: {
  name: string;
  detail: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="border-b border-[var(--gold)]/10 last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[var(--cream)] text-base font-medium leading-snug group-hover:text-[var(--gold)] transition-colors duration-300">
          {name}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-0.5 flex-shrink-0 w-5 h-5 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] text-sm leading-none"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-sm text-[var(--mist)] leading-relaxed">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PillarCard({
  pillar,
  isActive,
  onClick,
  cardIndex,
}: {
  pillar: (typeof PILLARS)[0];
  isActive: boolean;
  onClick: () => void;
  cardIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: cardIndex * 0.15,
        ease: EASE,
      }}
      onClick={onClick}
      className={`relative glass-card p-8 cursor-pointer transition-all duration-500 group overflow-hidden ${
        isActive
          ? "border-[var(--gold)]/50 shadow-[0_0_60px_rgba(201,168,76,0.08)]"
          : "hover:border-[var(--gold)]/25"
      }`}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Accent bar */}
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: pillar.accentColor }}
        aria-hidden="true"
      />

      {/* Background glow on active */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${pillar.accentColor}10 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Index */}
        <p
          className="font-display text-6xl font-bold leading-none select-none mb-6 transition-colors duration-300"
          style={{
            color: isActive ? pillar.accentColor : "rgba(139,154,176,0.2)",
          }}
          aria-hidden="true"
        >
          {pillar.index}
        </p>

        {/* Label */}
        <h3 className="font-display text-xl font-semibold text-[var(--cream)] leading-tight mb-3">
          {pillar.label}
        </h3>

        {/* Tagline */}
        <p className="text-[var(--mist)] text-sm leading-relaxed mb-6">
          {pillar.tagline}
        </p>

        {/* Service count badge */}
        <div className="flex items-center gap-2">
          <span
            className="text-eyebrow px-2 py-1 border transition-colors duration-300"
            style={{
              borderColor: isActive ? `${pillar.accentColor}60` : "rgba(139,154,176,0.2)",
              color: isActive ? pillar.accentColor : "var(--mist)",
            }}
          >
            {pillar.services.length} service{pillar.services.length > 1 ? "s" : ""}
          </span>
          <motion.span
            animate={{ x: isActive ? 4 : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm"
            style={{ color: pillar.accentColor }}
            aria-hidden="true"
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */

export default function Services() {
  const [activePillar, setActivePillar] = useState<string>(PILLARS[0].id);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const active = PILLARS.find((p) => p.id === activePillar) ?? PILLARS[0];

  return (
    <section
      id="services"
      className="relative section-transition overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--navy) 0%, #0e1f3d 100%)" }}
      aria-labelledby="services-heading"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden="true" />

      {/* Top divider */}
      <div className="divider-gold" aria-hidden="true" />

      <div className="section-pad container-site relative z-10">
        {/* Section header */}
        <div ref={headingRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-eyebrow mb-6 flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-[var(--gold)]" />
            What We Do
          </motion.p>

          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold max-w-2xl leading-tight"
          >
            Intelligence built{" "}
            <span className="font-editorial italic font-light gradient-text-gold">
              for the real world.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-[var(--mist)] max-w-lg text-base leading-relaxed"
          >
            Three focused pillars. Each one built to compound — data insights
            feed AI strategy, AI strategy drives automation, automation creates
            room for growth.
          </motion.p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {PILLARS.map((pillar, i) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              isActive={activePillar === pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              cardIndex={i}
            />
          ))}
        </div>

        {/* Expanded detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left — description */}
              <div>
                <p
                  className="text-eyebrow mb-4"
                  style={{ color: active.accentColor }}
                >
                  {active.label}
                </p>
                <p className="font-editorial text-2xl sm:text-3xl text-[var(--cream)] leading-snug mb-6">
                  {active.description}
                </p>
                <div
                  className="w-12 h-px"
                  style={{ background: active.accentColor }}
                  aria-hidden="true"
                />
              </div>

              {/* Right — services accordion */}
              <div>
                <p className="text-eyebrow text-[var(--mist)] mb-4">
                  Included Services
                </p>
                <div>
                  {active.services.map((svc, i) => (
                    <ServiceItem
                      key={svc.name}
                      name={svc.name}
                      detail={svc.detail}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom divider */}
      <div className="divider-gold" aria-hidden="true" />
    </section>
  );
}
