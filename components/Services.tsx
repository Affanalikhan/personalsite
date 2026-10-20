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
    services: [
      { name: "Predictive Modeling & Business Analytics", body: "End-to-end data science: problem framing, data audit, feature engineering, model development, validation, deployment. Deliverables include churn prediction, revenue forecasting, risk scoring, anomaly detection, customer segmentation, and inventory optimisation — at whatever fidelity your situation requires." },
      { name: "Agentic AI Frameworks", body: "We design and build multi-agent AI systems that take multi-step actions inside your existing tools. Architecture, tool integrations, safety guardrails, testing, and deployment included." },
    ],
  },
  {
    id: "ai", num: "02",
    label: "AI Enablement",
    tagline: "Embed AI where it actually changes outcomes.",
    description: "AI needs to be embedded at the right level of your organisation to generate real returns — in your customer-facing products, your internal workflows, and your strategic planning. The goal is deployed capability that sticks, not a proof of concept that goes nowhere after the engagement ends.",
    services: [
      { name: "AI-Powered Web Development", body: "Websites and web applications with AI built into the product itself — recommendation engines, AI-assisted search, automated content generation, chat interfaces connected to real backend logic, dynamic personalisation." },
      { name: "AI Automation for Businesses", body: "We audit your workflows, find where repetitive tasks consume team time, then build automations to handle them. Most engagements show positive ROI within the first quarter." },
      { name: "AI Strategy Advisory", body: "Structured advisory for leadership teams: where AI fits in your business, what's realistic vs. hype, how to prioritise investments by ROI. Output is a prioritised AI roadmap with defined success metrics." },
    ],
  },
  {
    id: "growth", num: "03",
    label: "Growth & Business Development",
    tagline: "Pipeline, contracts, commercial momentum.",
    description: "Beyond technical work, we help businesses of all kinds — e-commerce, retail, service businesses, local and traditional companies, startups and established firms — with the commercial foundations they need to grow. Whether the question is how to find new customers, grow revenue, fix operations, or simply decide what to do next, we help you think it through and build a plan you can actually execute. AI is one tool among several; we'll only recommend it when it genuinely helps.",
    services: [
      { name: "Business Growth Advisory", body: "We work with any type of business — from a local service company to an e-commerce brand to a growing startup. We look at pricing, positioning, customer acquisition, retention, and operations, and we build a clear plan for what to do next. No jargon, no fluff." },
      { name: "Contract Acquisition Support", body: "Identify, pursue, and win high-value contracts — public-sector tenders, enterprise procurement, framework agreements. Opportunity mapping, bid strategy, proposal structuring." },
      { name: "Sales & Business Development", body: "Repeatable sales infrastructure: ICP definition, outreach sequencing, pipeline architecture, partner strategy, CRM setup. We can run outbound programmes on your behalf with full transparency." },
    ],
  },
  {
    id: "product", num: "04",
    label: "Product & Strategy",
    tagline: "Shape what gets built and why.",
    description: "Great execution on the wrong product is still a failure. We work with companies to define what to build, validate it early, and ensure product direction is grounded in business reality — not just technical possibility.",
    services: [
      { name: "Product Development & Management", body: "We scope, prioritise, and drive product development — from initial discovery through delivery management and iteration. Roadmap ownership, sprint planning, stakeholder alignment." },
      { name: "Business Analysis & Insight", body: "Structured analysis of business problems and opportunities — translating complex operational realities into clear requirements, decision frameworks, and actionable recommendations." },
      { name: "Strategic Advisory", body: "Engagement-level strategic input for leadership teams: entering a new market, repositioning a product, evaluating a technology investment, or restructuring a commercial operation." },
    ],
  },
];

function ServiceRow({
  p, index,
}: { p: typeof PILLARS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .6, delay: index * .08, ease: EASE }}
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Row header — always visible, clickable */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left"
        aria-expanded={open}
        style={{ padding: "var(--s-32) 0", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "var(--s-32)", alignItems: "center" }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px,4vw,52px)",
            fontWeight: 700,
            lineHeight: 1,
            color: open ? "var(--gold)" : "var(--ivory-3)",
            transition: "color .2s",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {p.num}
        </span>

        {/* Label + tagline */}
        <div>
          <h3 className="t-h3 mb-1" style={{ color: "var(--charcoal)" }}>{p.label}</h3>
          <p className="t-small" style={{ color: "var(--charcoal-3)" }}>{p.tagline}</p>
        </div>

        {/* Toggle icon */}
        <div
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center border transition-colors duration-200"
          style={{
            borderColor: open ? "var(--gold)" : "var(--border)",
            background: open ? "var(--gold)" : "transparent",
          }}
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300"
            style={{
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              color: open ? "var(--charcoal)" : "var(--charcoal-3)",
            }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .32, ease: EASE }}
            className="overflow-hidden"
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              style={{ paddingBottom: "var(--s-48)", paddingLeft: "calc(80px + var(--s-32))" }}
            >
              {/* Description */}
              <div>
                <p className="t-body" style={{ marginBottom: "var(--s-24)" }}>{p.description}</p>
                <div className="divider-gold" style={{ width: "32px" }} aria-hidden="true" />
              </div>

              {/* Sub-services */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-16)" }}>
                {p.services.map((s, i) => (
                  <div key={s.name}
                    style={{
                      padding: "var(--s-24)",
                      background: "var(--ivory-2)",
                      borderLeft: "2px solid var(--gold)",
                    }}
                  >
                    <p style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      marginBottom: "var(--s-8)",
                    }}>
                      {s.name}
                    </p>
                    <p className="t-small">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="services" aria-labelledby="services-h2"
      style={{ background: "var(--ivory)", paddingBlock: "var(--s-96)" }}
    >
      <div className="container">
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "var(--s-64)" }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .55 }}
            className="flex items-center gap-3" style={{ marginBottom: "var(--s-24)" }}
          >
            <span className="divider-gold inline-block" style={{ width: "32px" }} aria-hidden="true" />
            <span className="t-eyebrow">What We Do</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.h2 id="services-h2"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .65, delay: .08, ease: EASE }}
              className="t-h2" style={{ color: "var(--charcoal)" }}
            >
              Intelligence built{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>for the real world.</em>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .6, delay: .16 }}
              className="t-body"
            >
              Five service pillars — data intelligence, AI enablement, business growth
              advisory, commercial development, and product strategy. Each designed to
              compound on the others. We work across all five, or go deep on one.
            </motion.p>
          </div>
        </div>

        {/* Accordion rows */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {PILLARS.map((p, i) => (
            <ServiceRow key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
