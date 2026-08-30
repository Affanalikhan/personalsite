"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

const PILLARS = [
  {
    id: "data", num: "01",
    label: "Data & Predictive Intelligence",
    tagline: "Turn raw data into forward-looking decisions.",
    description: "Most companies have more data than they know what to do with. We start by identifying which business questions are actually worth modeling — not every problem needs an ML solution, and part of our job is being honest about that. Where a model is the right tool, we build it production-quality and tied to decisions your team can act on the same week.",
    color: "#1e40af",
    services: [
      { name: "Predictive Modeling & Business Analytics", body: "End-to-end data science: problem framing, data audit, feature engineering, model development, validation, deployment. Deliverables include churn prediction, revenue forecasting, risk scoring, anomaly detection, customer segmentation, and inventory optimisation — at whatever fidelity your situation requires." },
      { name: "Agentic AI Frameworks", body: "We design and build multi-agent AI systems that take multi-step actions inside your existing tools — not just answer questions. Architecture, tool integrations, safety guardrails, testing, and deployment all included." },
    ],
  },
  {
    id: "ai", num: "02",
    label: "AI Enablement",
    tagline: "Embed AI where it actually changes outcomes.",
    description: "AI needs to be embedded at the right level of your organisation to generate real returns — in your customer-facing products, your internal workflows, and your strategic planning. The goal is deployed capability that sticks, not a proof of concept that goes nowhere after the engagement ends.",
    color: "#b8913a",
    services: [
      { name: "AI-Powered Web Development", body: "Websites and web applications with AI built into the product itself — recommendation engines, AI-assisted search, automated content generation, chat interfaces connected to real backend logic. Every build engineered for performance and measurable business outcomes." },
      { name: "AI Automation for Businesses", body: "We audit your workflows to find where repetitive tasks are consuming team time, then build automations to handle them. Data entry, report generation, email triage, document processing, CRM enrichment. Most engagements show positive ROI within the first quarter." },
      { name: "AI Strategy Advisory", body: "Structured advisory for leadership teams: where AI fits in your business, what's realistic vs hype, how to evaluate vendors, how to prioritise investments by ROI. Output is a prioritised AI roadmap with defined success metrics." },
    ],
  },
  {
    id: "growth", num: "03",
    label: "Growth & Business Development",
    tagline: "Pipeline, contracts, commercial momentum.",
    description: "Beyond technical work, we help small and growing companies with the commercial infrastructure they often lack. Contract acquisition, sales systems, opening doors. Delivered as independent consulting — you get senior commercial expertise without the overhead of a permanent hire.",
    color: "#374151",
    services: [
      { name: "Contract Acquisition Support", body: "Identify, pursue, and win high-value contracts — public-sector tenders, enterprise procurement, framework agreements. Opportunity mapping, bid strategy, proposal structuring, win-rate analysis." },
      { name: "Sales & Business Development", body: "Repeatable sales infrastructure: ICP definition, outreach sequencing, pipeline architecture, partner strategy, CRM setup. We can run outbound programmes on your behalf with full transparency on results." },
    ],
  },
  {
    id: "product", num: "04",
    label: "Product & Strategy",
    tagline: "Shape what gets built and why.",
    description: "Great execution on the wrong product is still a failure. We work with companies to define what to build, validate it early, and ensure product direction is grounded in business reality. From zero-to-one discovery through to ongoing product management, we bring structure and commercial judgement.",
    color: "#065f46",
    services: [
      { name: "Product Development & Management", body: "We scope, prioritise, and drive product development — from initial discovery through to delivery management and iteration. Roadmap ownership, sprint planning, stakeholder alignment, and the ongoing judgment calls that determine whether a product actually ships." },
      { name: "Business Analysis & Insight", body: "Structured analysis of business problems, processes, and opportunities — translating complex operational realities into clear requirements, decision frameworks, and actionable recommendations." },
      { name: "Strategic Advisory", body: "Engagement-level strategic input for leadership teams: entering a new market, repositioning a product, evaluating a technology investment, or restructuring a commercial operation. Real delivery experience, not a methodology playbook." },
    ],
  },
];

function Accordion({ name, body, color }: { name: string; body: string; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-medium leading-snug transition-colors duration-200"
          style={{ color: open ? color : "var(--ink-2)" }}>
          {name}
        </span>
        <span className="mt-0.5 flex-shrink-0 w-6 h-6 border flex items-center justify-center text-lg leading-none transition-all duration-200"
          style={{
            borderColor: open ? color : "var(--border)",
            color: open ? color : "var(--ink-3)",
            transform: open ? "rotate(45deg)" : "none",
          }}
          aria-hidden="true"
        >+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="b"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-6 text-sm" style={{ lineHeight: 1.8, color: "var(--ink-3)" }}>{body}</p>
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
    <motion.button ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
      onClick={onClick}
      className={`relative text-left w-full overflow-hidden transition-all duration-300 ${active ? "card-active" : "card"}`}
      aria-pressed={active}
    >
      {/* Left accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300"
        style={{ background: p.color, opacity: active ? 1 : 0 }}
        aria-hidden="true"
      />

      <div className="p-6 pl-8">
        <p className="font-display text-[3.5rem] font-bold leading-none mb-4 select-none transition-colors duration-300"
          style={{ color: active ? p.color : "rgba(13,20,32,0.06)" }}
          aria-hidden="true"
        >{p.num}</p>

        <h3 className="font-display text-base font-semibold leading-snug mb-2 transition-colors duration-200"
          style={{ color: active ? "var(--ink)" : "var(--ink-2)" }}>
          {p.label}
        </h3>
        <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--ink-3)" }}>
          {p.tagline}
        </p>

        <div className="flex items-center justify-between">
          <span className="eyebrow text-[0.58rem] px-2.5 py-1.5 border transition-all duration-300"
            style={{ borderColor: active ? p.color : "var(--border)", color: active ? p.color : "var(--ink-light)" }}>
            {p.services.length} services
          </span>
          <motion.span animate={{ x: active ? 0 : -6, opacity: active ? 1 : 0 }} transition={{ duration: 0.25 }}
            className="text-sm font-bold" style={{ color: p.color }} aria-hidden="true">→</motion.span>
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
      className="relative overflow-hidden" style={{ background: "var(--bg-2)" }}
    >
      <div className="rule" aria-hidden="true" />

      <div className="wrap section-y">

        {/* Header */}
        <div ref={headRef} className="mb-14 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }} className="flex items-center gap-3 mb-5"
          >
            <span className="w-7 h-px" style={{ background: "var(--gold)" }} aria-hidden="true" />
            <span className="eyebrow">What We Do</span>
          </motion.div>

          <motion.h2 id="services-h2"
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--ink)" }}
          >
            Intelligence built{" "}
            <span className="font-serif font-light italic" style={{ color: "var(--gold-dark)" }}>for the real world.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-[0.9375rem]" style={{ lineHeight: 1.75, color: "var(--ink-3)" }}
          >
            Four service pillars — data intelligence, AI enablement, commercial growth,
            and product strategy. Each designed to compound on the others.
            We work across all four, or go deep on one.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.id} p={p} active={active === p.id}
              onClick={() => { setActive(p.id); setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60); }}
              i={i}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div ref={panelRef} className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div key={current.id}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden border"
              style={{ background: "var(--white)", borderColor: "var(--border)", borderTop: `3px solid ${current.color}` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left */}
                <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "var(--border)" }}>
                  <span className="eyebrow text-[0.63rem] block mb-5" style={{ color: current.color }}>{current.label}</span>
                  <p className="font-display text-xl font-semibold mb-4 leading-snug" style={{ color: "var(--ink)" }}>
                    {current.tagline}
                  </p>
                  <p className="text-[0.9375rem]" style={{ lineHeight: 1.8, color: "var(--ink-3)" }}>
                    {current.description}
                  </p>
                  <div className="mt-8 w-10 h-[2px]" style={{ background: current.color }} aria-hidden="true" />
                </div>

                {/* Right */}
                <div className="p-8 lg:p-12">
                  <span className="eyebrow text-[0.63rem] block mb-5" style={{ color: "var(--ink-light)" }}>Included Services</span>
                  {current.services.map(s => (
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
