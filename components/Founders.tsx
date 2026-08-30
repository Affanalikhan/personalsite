"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const FOUNDERS = [
  {
    name: "Affan Ali Khan",
    role: "Co-Founder",
    focus: "AI Strategy & Data Science",
    bio: "Affan brings deep expertise in predictive modeling, agentic AI architecture, and business analytics. He leads client engagements where the core challenge is turning messy, complex data into decisions that move the needle — and building the AI frameworks that sustain that advantage over time.",
    linkedin: "https://linkedin.com/in/affan-ali-khan",
    initials: "AK",
    accentColor: "#1e4d8c",
  },
  {
    name: "Muhammad Umar Khan",
    role: "Co-Founder",
    focus: "Business Development & AI Enablement",
    bio: "Umar operates at the intersection of commercial strategy and AI implementation. He leads engagements spanning AI-powered web development, workflow automation, and contract acquisition — translating what's technically possible into what's commercially valuable for each client.",
    linkedin: "https://linkedin.com/in/muhammad-umar-khan",
    initials: "MK",
    accentColor: "#c9a84c",
  },
];

function FounderCard({
  founder,
  index,
}: {
  founder: (typeof FOUNDERS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.18, ease: EASE }}
      className="group relative"
    >
      {/* Card */}
      <div className="glass-card overflow-hidden transition-all duration-500 hover:border-[var(--gold)]/30 hover:shadow-[0_0_80px_rgba(201,168,76,0.06)]">
        {/* Top accent */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${founder.accentColor}, transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-6 mb-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {/* Placeholder avatar with initials — replace with real photo via <Image> */}
              <div
                className="w-20 h-20 flex items-center justify-center border-2 font-display text-xl font-bold"
                style={{
                  borderColor: `${founder.accentColor}60`,
                  background: `linear-gradient(135deg, ${founder.accentColor}15, ${founder.accentColor}05)`,
                  color: founder.accentColor,
                }}
                aria-hidden="true"
              >
                {founder.initials}
              </div>
              {/* Corner mark */}
              <div
                className="absolute -bottom-1 -right-1 w-4 h-4"
                style={{ background: founder.accentColor, opacity: 0.7 }}
                aria-hidden="true"
              />
            </div>

            {/* LinkedIn */}
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-eyebrow text-[var(--mist)] hover:text-[var(--cream)] transition-colors duration-300 border border-[var(--gold)]/15 px-3 py-2 hover:border-[var(--gold)]/40"
              aria-label={`${founder.name} on LinkedIn`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Name & role */}
          <h3 className="font-display text-2xl font-semibold text-[var(--cream)] mb-1">
            {founder.name}
          </h3>
          <p className="text-eyebrow mb-1" style={{ color: founder.accentColor }}>
            {founder.role}
          </p>
          <p className="text-[var(--mist)] text-xs tracking-wide mb-6">
            {founder.focus}
          </p>

          {/* Divider */}
          <div
            className="h-px mb-6 w-12"
            style={{ background: `${founder.accentColor}60` }}
            aria-hidden="true"
          />

          {/* Bio */}
          <p className="text-[var(--mist)] text-sm leading-relaxed">{founder.bio}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Founders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="relative section-transition overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--navy) 0%, #091830 50%, var(--navy) 100%)",
      }}
      aria-labelledby="founders-heading"
    >
      {/* Parallax watermark */}
      <motion.div
        style={{ y: bgY }}
        className="absolute left-[-4%] top-1/2 -translate-y-1/2 font-display text-[18vw] font-bold text-white/[0.015] leading-none select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        FOUNDERS
      </motion.div>

      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Top radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(30,77,140,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-pad container-site relative z-10">
        {/* Header */}
        <div ref={headingRef} className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-eyebrow mb-6 flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-[var(--gold)]" />
            The Team
          </motion.p>

          <motion.h2
            id="founders-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6"
          >
            Two founders.{" "}
            <span className="font-editorial italic font-light gradient-text-gold">
              One shared conviction.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--mist)] leading-relaxed"
          >
            A&O Holdings was built on the belief that AI and data, applied
            with rigour and commercial honesty, can fundamentally change what
            a business is capable of — regardless of its size.
          </motion.p>
        </div>

        {/* Founder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {FOUNDERS.map((founder, i) => (
            <FounderCard key={founder.name} founder={founder} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-[var(--gold)]/10 max-w-xl"
        >
          <p className="text-[var(--mist)] text-sm italic leading-relaxed font-editorial text-lg">
            &ldquo;We work as independent consultants — which means your company
            gets senior-level expertise on every engagement, not a junior
            team working off a playbook.&rdquo;
          </p>
          <p className="text-eyebrow text-[var(--gold)]/60 mt-4">
            — A&O Holdings
          </p>
        </motion.div>
      </div>

      <div className="divider-gold mt-0" aria-hidden="true" />
    </section>
  );
}
