"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const PILLARS = [
  {
    id: "data",
    index: "01",
    label: "Data & Predictive Intelligence",
    tagline: "Turn raw data into forward-looking answers.",
    description:
      "Most companies are sitting on more data than they know what to do with. We help by first identifying which business questions are actually worth modeling — not every problem needs a machine learning solution, and part of our job is being honest about that. Where a model is the right tool, we build it properly: end-to-end, production-quality, and tied to decisions your team can act on the same week.",
    accentColor: "#1e4d8c",
    services: [
      {
        name: "Predictive Modeling & Business Analytics",
        detail:
          "We take on the full data science lifecycle — problem framing, data audit, feature engineering, model development, validation, and deployment. Deliverables scale to what you actually need: a scored dataset, a live prediction pipeline, a demand forecast, or a decision-ready dashboard. Common use cases include churn prediction, revenue forecasting, risk scoring, anomaly detection, customer segmentation, and inventory optimisation. We also build custom analytics infrastructure for companies that need to move beyond off-the-shelf BI tools.",
      },
      {
        name: "Agentic AI Frameworks",
        detail:
          "We design and build AI agent systems — software that doesn't just answer questions but takes multi-step actions inside your existing tools and workflows. A practical example: an agent that reads incoming client requests, checks your CRM and data systems, drafts a structured response, and routes it to the right person for approval. This is for companies that want AI to actually do work, not just chat. We handle architecture, tool integrations, safety guardrails, testing, and deployment.",
      },
    ],
  },
  {
    id: "ai",
    index: "02",
    label: "AI Enablement",
    tagline: "Embed AI where it actually changes outcomes.",
    description:
      "AI isn't one product — it's a capability that needs to be embedded at the right level of your organisation to generate real returns. We work across three fronts: the digital products your customers interact with, the internal workflows your team runs every day, and the strategic decisions your leadership makes about where AI belongs in the first place. The goal is always the same: deployed capability that sticks, not a proof of concept that goes nowhere.",
    accentColor: "#c9a84c",
    services: [
      {
        name: "AI-Powered Web Development",
        detail:
          "We build websites and web applications with AI capabilities built into the product itself — not just a marketing site with a chatbot widget bolted on. That means recommendation engines, AI-assisted search, automated content generation, chat interfaces tied to real backend logic, dynamic personalisation, and intelligent onboarding flows. Every product we build is engineered for performance, accessibility, and measurable business outcomes.",
      },
      {
        name: "AI Automation for Businesses",
        detail:
          "We identify manual, repetitive processes inside your operations — data entry, report generation, routine communications, internal approvals, compliance checks — and automate them using AI. This isn't RPA for the sake of it: we start with a process audit to find the bottlenecks that are actually costing you time and money, then build automations that integrate cleanly into your existing tools. Most engagements deliver positive ROI within the first quarter.",
      },
      {
        name: "AI Strategy Advisory",
        detail:
          "Not every client needs something built immediately — some need to understand how to use AI at all. We advise leadership teams on where AI fits in their business, what's realistic versus hype, how to evaluate vendors, and how to prioritise AI investments against actual ROI. Engagements typically result in a prioritised AI roadmap with clear ownership, defined success metrics, and a build-vs-buy recommendation for each initiative.",
      },
    ],
  },
  {
    id: "growth",
    index: "03",
    label: "Growth & Business Development",
    tagline: "Pipeline, contracts, and commercial momentum.",
    description:
      "Beyond technical work, we help small and growing companies with the commercial infrastructure they often lack: finding and winning contracts, building sales systems, and opening the right doors. This is delivered as independent consulting — not a full-time hire. You get senior commercial expertise on a defined scope, without the overhead of a permanent business development function.",
    accentColor: "#8b9ab0",
    services: [
      {
        name: "Contract Acquisition Support",
        detail:
          "We help you identify, pursue, and win high-value contracts — including public-sector tenders, enterprise procurement, and framework agreements. That means opportunity mapping, bid strategy, proposal structuring, and win-rate analysis. We treat each pursuit as a campaign with a clear thesis, not a form-filling exercise. We can also run post-award debrief analysis to sharpen future bids.",
      },
      {
        name: "Sales & Business Development",
        detail:
          "We design and build repeatable sales infrastructure: ideal client profile definition, outreach sequencing, pipeline architecture, partner and channel strategy, and CRM setup. We can run outbound programmes directly on your behalf, with full transparency on activity and results. Engagements are scoped as independent consulting — you get the capability without the fixed overhead of a permanent BD hire.",
      },
    ],
  },
];

function ServiceItem({
  name,
  detail,
  index,
  accentColor,
}: {
  name: string;
  detail: string;
  index: number;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.07] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[var(--cream)]/90 text-sm font-medium leading-snug group-hover:text-[var(--cream)] transition-colors duration-300">
          {name}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-0.5 flex-shrink-0 w-5 h-5 border flex items-center justify-center text-sm leading-none"
          style={{ borderColor: open ? `${accentColor}70` : "rgba(201,168,76,0.25)", color: open ? accentColor : "var(--gold)" }}
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
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-6 text-sm text-[var(--mist)] leading-[1.85]">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PillarCard({
  pillar, isActive, onClick, cardIndex,
}: {
  pillar: (typeof PILLARS)[0];
  isActive: boolean;
  onClick: () => void;
  cardIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: cardIndex * 0.11, ease: EASE }}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-400 overflow-hidden border ${
        isActive
          ? "bg-white/[0.05] border-[var(--gold)]/35"
          : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.03]"
      }`}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, ${pillar.accentColor}, transparent)`, opacity: isActive ? 1 : 0.2 }}
        aria-hidden="true"
      />

      <div className="p-6 lg:p-7">
        <p
          className="font-display text-[3.5rem] font-bold leading-none select-none mb-5 transition-all duration-400"
          style={{ color: isActive ? pillar.accentColor : "rgba(139,154,176,0.15)" }}
          aria-hidden="true"
        >
          {pillar.index}
        </p>
        <h3 className={`font-display text-[1.05rem] font-semibold leading-snug mb-2.5 transition-colors duration-300 ${isActive ? "text-[var(--cream)]" : "text-[var(--cream)]/75"}`}>
          {pillar.label}
        </h3>
        <p className="text-[var(--mist)] text-sm leading-relaxed mb-5">
          {pillar.tagline}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase px-2 py-1 border transition-all duration-300"
            style={{
              borderColor: isActive ? `${pillar.accentColor}45` : "rgba(139,154,176,0.15)",
              color: isActive ? pillar.accentColor : "var(--mist)",
            }}
          >
            {pillar.services.length} service{pillar.services.length > 1 ? "s" : ""}
          </span>
          <motion.span
            animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: pillar.accentColor }}
            className="text-base"
            aria-hidden="true"
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activePillar, setActivePillar] = useState<string>(PILLARS[0].id);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const detailRef = useRef<HTMLDivElement>(null);

  const active = PILLARS.find((p) => p.id === activePillar) ?? PILLARS[0];

  const handleClick = (id: string) => {
    setActivePillar(id);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  };

  return (
    <section
      id="services"
      className="relative section-transition overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0b1d35 60%, #0e2040 100%)" }}
      aria-labelledby="services-heading"
    >
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="divider-gold" aria-hidden="true" />

      <div className="section-pad container-site relative z-10">

        {/* Header */}
        <div ref={headingRef} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-eyebrow mb-5 flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-[var(--gold)]" />
            What We Do
          </motion.p>

          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 24 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold max-w-2xl leading-[1.1] mb-5"
          >
            Intelligence built{" "}
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontWeight: 300, color: "var(--gold)" }}>
              for the real world.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--mist)] max-w-2xl text-base leading-[1.8]"
          >
            Three service pillars — each designed to compound on the others. Data insights sharpen AI strategy.
            AI strategy drives automation. Automation frees your team for growth.
            We work across all three, or go deep on one.
          </motion.p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PILLARS.map((pillar, i) => (
            <PillarCard
              key={pillar.id} pillar={pillar}
              isActive={activePillar === pillar.id}
              onClick={() => handleClick(pillar.id)}
              cardIndex={i}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div ref={detailRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="border border-white/[0.07] overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${active.accentColor}06 0%, rgba(255,255,255,0.015) 50%, transparent 100%)` }}
            >
              {/* Accent bar */}
              <div
                className="h-[2px]"
                style={{ background: `linear-gradient(90deg, ${active.accentColor}, ${active.accentColor}20)` }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left: description */}
                <div className="lg:col-span-2 p-8 lg:p-10 lg:border-r border-white/[0.06]">
                  <p
                    className="text-[0.6rem] font-semibold tracking-[0.22em] uppercase mb-5"
                    style={{ color: active.accentColor }}
                  >
                    {active.label}
                  </p>
                  <p className="text-[var(--cream)]/85 text-[0.95rem] leading-[1.85] mb-6">
                    {active.description}
                  </p>
                  <div className="w-8 h-[2px]" style={{ background: active.accentColor }} aria-hidden="true" />
                </div>

                {/* Right: accordion */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <p className="text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-[var(--mist)] mb-1">
                    Included Services
                  </p>
                  <p className="text-[var(--mist)]/60 text-xs mb-4">Click to expand each service</p>
                  {active.services.map((svc, i) => (
                    <ServiceItem
                      key={svc.name} name={svc.name} detail={svc.detail}
                      index={i} accentColor={active.accentColor}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="divider-gold" aria-hidden="true" />
    </section>
  );
}
