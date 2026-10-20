"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import Script from "next/script";
import { BOOKING_URL, FOUNDERS } from "@/lib/site";

export default function Contact() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-80px" });

  const bookingUrl = BOOKING_URL;
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section id="contact" aria-labelledby="contact-h2" style={{ background: "var(--ivory)" }}>

      {/* ── Top header strip — navy ─────────────────────────────── */}
      <div style={{ background: "var(--navy)", paddingBlock: "var(--s-96)" }}>
        <div className="container" ref={headRef}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={reducedMotion ? { duration: 0 } : { duration: .55 }}
            className="flex items-center gap-3"
            style={{ marginBottom: "var(--s-24)" }}
          >
            <span className="divider-gold inline-block" style={{ width: "32px" }} aria-hidden="true" />
            <span className="t-eyebrow" style={{ color: "var(--gold)" }}>Get in Touch</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              id="contact-h2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={reducedMotion ? { duration: 0 } : { duration: .65, delay: .08, ease: EASE }}
              className="t-h2"
              style={{ color: "var(--off-white)" }}
            >
              Let&apos;s figure out{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--gold)" }}>
                what&apos;s actually possible
              </em>{" "}
              for your business.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={reducedMotion ? { duration: 0 } : { duration: .6, delay: .16 }}
            >
              <p className="t-body" style={{ color: "rgba(245,243,238,.6)", marginBottom: "var(--s-32)" }}>
                Start with a free 30-minute discovery call. No pitch, no obligation. We&apos;ll
                understand your situation and tell you honestly whether and how we can help.
              </p>

              {[
                { label: "Response", value: "Within 1 business day" },
                { label: "Location", value: "Global — fully remote" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", gap: "var(--s-16)", marginBottom: "var(--s-16)", alignItems: "baseline" }}>
                  <span className="t-eyebrow text-[11px]" style={{ color: "var(--gold)", minWidth: "80px" }}>{label}</span>
                  <span className="t-small" style={{ color: "rgba(245,243,238,.65)" }}>{value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Contact cards + Booking — ivory ────────────────────── */}
      <div className="container" style={{ paddingBlock: "var(--s-96)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16">

          {/* Founder contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: .65, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", gap: "var(--s-24)" }}
          >
            <div style={{ marginBottom: "var(--s-8)" }}>
              <p className="t-eyebrow text-[11px]" style={{ color: "var(--charcoal-3)", marginBottom: "var(--s-16)" }}>
                Reach us directly
              </p>
              <p className="t-body">
                Email either founder directly — we both check our inboxes daily and reply within one business day.
              </p>
            </div>

            {FOUNDERS.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reducedMotion ? { duration: 0 } : { duration: .55, delay: i * .1, ease: EASE }}
                style={{
                  border: "1px solid var(--border)",
                  borderTop: "3px solid var(--gold)",
                  padding: "var(--s-32)",
                  background: "var(--ivory-2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--s-16)",
                }}
              >
                <div>
                  <p style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    marginBottom: "4px",
                  }}>
                    {f.name}
                  </p>
                  <p className="t-small" style={{ color: "var(--charcoal-3)" }}>{f.focus}</p>
                </div>

                <div className="divider" aria-hidden="true" />

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-12)" }}>
                  {/* Email — shown as clickable mailto */}
                  <div style={{ display: "flex", gap: "var(--s-12)", alignItems: "center" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth={1.5}
                      style={{ width: "16px", height: "16px", flexShrink: 0 }} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a
                      href={`mailto:${i === 0 ? "affanaftab786@gmail.com" : "mohammedomerkhan516@gmail.com"}`}
                      className="text-link"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "15px",
                        color: "var(--charcoal-2)",
                        textDecoration: "none",
                      }}
                    >
                      {i === 0 ? "affanaftab786@gmail.com" : "mohammedomerkhan516@gmail.com"}
                    </a>
                  </div>

                  {/* LinkedIn */}
                  <div style={{ display: "flex", gap: "var(--s-12)", alignItems: "center" }}>
                    <svg viewBox="0 0 24 24" fill="var(--gold)"
                      style={{ width: "16px", height: "16px", flexShrink: 0 }} aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "15px",
                        color: "var(--charcoal-2)",
                        textDecoration: "none",
                      }}
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Calendly / booking sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: .65, delay: .12, ease: EASE }}
          >
            <div style={{ border: "1px solid var(--border)", overflow: "hidden", background: "var(--ivory)" }}>
              <div style={{
                padding: "var(--s-24) var(--s-32)",
                borderBottom: "1px solid var(--border)",
                borderTop: "3px solid var(--gold)",
              }}>
                <p className="t-eyebrow text-[11px]" style={{ color: "var(--gold)", marginBottom: "var(--s-8)" }}>Book Directly</p>
                <p className="t-small">Skip the back-and-forth — grab a 30-minute intro call.</p>
              </div>

              {bookingUrl ? (
                <>
                  <div
                    className="calendly-inline-widget"
                    data-url={bookingUrl}
                    style={{ minWidth: "240px", height: "460px" }}
                    aria-label="Calendly booking widget"
                  />
                  {!calendlyLoaded && (
                    <noscript>
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ margin: "24px", display: "inline-flex" }}
                      >
                        Open Booking Page
                      </a>
                    </noscript>
                  )}
                </>
              ) : (
                <div style={{ padding: "var(--s-32)", display: "flex", flexDirection: "column", gap: "var(--s-16)", alignItems: "flex-start" }}>
                  <p className="t-body">
                    Email us directly and we&apos;ll schedule a call at a time that works for you.
                  </p>
                  <a
                    href={`mailto:affanaftab786@gmail.com`}
                    className="btn-primary"
                  >
                    Send an Email
                  </a>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {bookingUrl && (
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
          onLoad={() => setCalendlyLoaded(true)}
        />
      )}
    </section>
  );
}
