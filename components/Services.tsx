"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const PILLARS = [
  {
    id: "data",
    num: "01",
    label: "Data & Predictive Intelligence",
    tagline: "Turn raw data into forward-looking decisions.",
    description: "Most companies have more data than they know what to do with. We start by identifying which business questions are actually worth modeling — not every problem needs an ML solution, and part of our job is being honest about that. Where a model is the right tool, we build it production-quality and tied to decisions your team can act on the same week.",
    color: "#2563a8",
    services: [
      {
        name: "Predictive Modeling & Business Analytics",
        body: "End-to-end data science: problem framing, data audit, feature engineering, model development, validation, deployment. Deliverables include churn prediction, revenue forecasting, risk scoring, anomaly detection, customer segmentation, and inventory optimisation — at whatever fidelity your situation requires, from a report to a live pipeline.",
      },
      {
        name: "Agentic AI Frameworks",
        body: "We design and build multi-agent AI systems that take multi-step actions inside your existing tools — not just answer questions. An agent that reads incoming requests, checks your CRM, drafts a structured response, and routes it for human approval. We handle architecture, tool integrations, safety guardrails, testing, and deployment.",
      },
    ],
  },
  {
    id: "ai",
    num: "02",
    label: "AI Enablement",
    tagline: "Embed AI where it actually changes outcomes.",
    description: "AI needs to be embedded at the right level of your organisation to generate real returns — in your customer-facing products, your internal workflows, and your strategic planning. We work across all three fronts. The goal is deployed capability that sticks, not a proof of concept that goes nowhere after the engagement ends.",
    color: "#c8a96e",
    services: [
      {
        name: "AI-Powered Web Development",
        body: "Websites and web applications with AI built into the product itself — not a chatbot widget bolted on. Recommendation engines, AI-assisted search, automated content generation, chat interfaces connected to real backend logic, dynamic personalisation. Every build is engineered for performance, accessibility, and measurable business outcomes.",
      },
      {
        name: "AI Automation for Businesses",
        body: "We audit your workflows to find where repetitive, high-volume tasks are consuming team time, then build the automations to handle them. Data entry, report generation, email triage, document processing, CRM enrichment, internal approvals. Integrates cleanly into your existing stack. Most engagements show positive ROI within the first quarter.",
      },
      {
        name: "AI Strategy Advisory",
        body: "Structured advisory for leadership teams: where AI fits in your business, what's realistic vs. hype, how to evaluate vendors, how to prioritise investments by ROI. Output is a prioritised AI roadmap with clear ownership, defined success metrics, and build-vs-buy recommendations for each initiative. No generic frameworks.",
      },
    ],
  },
  {
    id: "growth",
    num: "03",
    label: "Growth & Business Development",
    tagline: "Pipeline, contracts, commercial momentum.",
    description: "Beyond technical work, we help small and growing companies with the commercial infrastructure they often lack. Contract acquisition, sales systems, opening doors. Delivered as independent consulting — you get senior commercial expertise without the overhead of a permanent business development hire.",
    color: "#64748b",
    services: [
      {
        name: "Contract Acquisition Support",
        body: "Identify, pursue, and win high-value contracts — public-sector tenders, enterprise procurement, framework agreements. Opportunity mapping, bid strategy, proposal structuring, win-rate analysis. Each pursuit is treated as a campaign with a clear thesis, not a form-filling exercise.",
      },
      {
        name: "Sales & Business Development",
        body: "Repeatable sales infrastructure: ICP definition, outreach sequencing, pipeline architecture, partner and channel strategy, CRM setup. We can run outbound programmes on your behalf with full transparency on activity and results — scoped as independent consulting, not a permanent hire.",
      },
    ],
  },
  {
    id: "product",
    num: "04",
    label: "Product & Strategy",
    tagline: "Shape what gets built and why.",
    description: "Great execution on the wrong product is still a failure. We work with companies to define what to build, validate it early, and ensure product direction is grounded in business reality — not just technical possibility. From zero-to-one discovery through to ongoing product management, we bring structure and commercial judgement to product decisions.",
    color: "#6d8a6e",
    services: [
      {
        name: "Product Development & Management",
        body: "We scope, prioritise, and drive product development — from initial discovery and requirements definition through to delivery management and iteration. This includes roadmap ownership, sprint planning, stakeholder alignment, and the ongoing judgment calls that determine whether a product actually ships and succeeds.",
      },
      {
        name: "Business Analysis & Insight",
        body: "Structured analysis of business problems, processes, and opportunities — translating complex operational realities into clear requirements, decision frameworks, and actionable recommendations. Useful as a standalone engagement before a technical build, or as a continuous input into product and strategy decisions.",
      },
      {
        name: "Strategic Advisory",
        body: "Engagement-level strategic input for leadership teams navigating major decisions: entering a new market, repositioning a product, evaluating a technology investment, or restructuring a commercial operation. We bring an outside perspective grounded in real delivery experience — not slides from a methodology playbook.",
      },
    ],
  },
];

function Accordion({ name, body, color }: { name: string; body: string; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[var(--cream)] text-[0.95rem] font-medium leading-snug group-hover:text-[var(--gold)] transition-colors duration-250">
          {name}
        </span>
        <span
          className="mt-0.5 flex-shrink-0 w-6 h-6 border flex items-center justify-center text-lg leading-none transition-all duration-250"
          style={{
            borderColor: open ? color : "rgba(255,255,255,0.15)",
            color: open ? color : "var(--cream-dim)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-4 sm:pr-8 text-sm" style={{ lineHeight: 1.8, color: "var(--cream-dim)" }}>{body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PillarCard({ p, active, onClick, i }: { p: typeof PILLARS[0]; active: boolean; onClick: () => void; i: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
      onClick={onClick}
      className={`relative text-left w-full overflow-hidden border transition-all duration-350 ${
        active ? "card-active" : "card"
      }`}
      aria-pressed={active}
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-350"
        style={{ background: `linear-gradient(90deg, ${p.color}, transparent)`, opacity: active ? 1 : 0.25 }}
        aria-hidden="true"
      />

      <div className="p-7">
        {/* Number — large ghost */}
        <p className="font-display text-[4.5rem] font-bold leading-none mb-5 select-none transition-colors duration-350"
          style={{ color: active ? p.color : "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        >
          {p.num}
        </p>

        <h3 className="font-display text-lg font-semibold text-[var(--cream)] leading-snug mb-2">
          {p.label}
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--cream-dim)" }}>
          {p.tagline}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="eyebrow text-[0.6rem] px-3 py-1.5 border transition-all duration-350"
            style={{
              borderColor: active ? `${p.color}50` : "rgba(255,255,255,0.12)",
              color: active ? p.color : "var(--slate)",
            }}
          >
            {p.services.length} services
          </span>
          <span className="text-sm transition-all duration-350"
            style={{ color: p.color, opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-6px)" }}
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function Services() {
  const [active, setActive] = useState("data");
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const panelRef = useRef<HTMLDivElement>(null);

  const current = PILLARS.find(p => p.id === active)!;

  return (
    <section id="services" aria-labelledby="services-h2"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1525 0%, #0d1c30 100%)" }}
    >
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="rule" aria-hidden="true" />

      <div className="wrap section-y">

        {/* Header */}
        <div ref={headRef} className="mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="eyebrow">What We Do</span>
          </motion.div>

          <motion.h2 id="services-h2"
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="font-display font-bold leading-[1.12] mb-5"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Intelligence built{" "}
            <span className="font-serif font-light italic" style={{ color: "var(--gold)" }}>for the real world.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="text-[1rem] leading-[1.75]" style={{ color: "var(--cream-dim)" }}
          >
            Four service pillars — data intelligence, AI enablement, commercial growth,
            and product strategy. Each one distinct, each one designed to compound
            on the others. We work across all four, or go deep on one.
          </motion.p>
        </div>

        {/* Pillar cards — FIX #7: clear gap, each card has defined border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.id} p={p} active={active === p.id} onClick={() => {
              setActive(p.id);
              setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
            }} i={i} />
          ))}
        </div>

        {/* Detail panel — FIX #5: mt-6 breathing room from cards */}
        <div ref={panelRef} className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="border border-white/[0.08] overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${current.color}08 0%, rgba(255,255,255,0.02) 100%)` }}
            >
              {/* Top color bar */}
              <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${current.color}, transparent 60%)` }} aria-hidden="true" />

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left */}
                <div className="p-8 lg:p-12 lg:border-r border-white/[0.06]">
                  <span className="eyebrow text-[0.65rem] block mb-5" style={{ color: current.color }}>
                    {current.label}
                  </span>
                  <p className="font-display text-xl font-semibold text-[var(--cream)] leading-snug mb-4">
                    {current.tagline}
                  </p>
                  <p className="text-[0.95rem] leading-[1.8]" style={{ color: "var(--cream-dim)" }}>
                    {current.description}
                  </p>
                  <div className="mt-8 w-10 h-[2px]" style={{ background: current.color }} aria-hidden="true" />
                </div>

                {/* Right */}
                <div className="p-8 lg:p-12">
                  <span className="eyebrow text-[0.65rem] block mb-6" style={{ color: "var(--cream-dim)" }}>
                    Included Services
                  </span>
                  {current.services.map((s, i) => (
                    <Accordion key={s.name} name={s.name} body={s.body} color={current.color} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="rule" aria-hidden="true" />
    </section>
  );
}
