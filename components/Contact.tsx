"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import Script from "next/script";
import { BOOKING_URL } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";
interface FD {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const SERVICES = [
  "Data & Predictive Modeling",
  "Agentic AI Framework",
  "AI-Powered Web Development",
  "AI Automation",
  "AI Strategy Advisory",
  "Product & Strategy",
  "Business Development Support",
  "Not sure — let's talk",
];

const INPUT = {
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  padding: "14px 16px",
  border: "1px solid var(--border)",
  background: "var(--ivory)",
  color: "var(--charcoal)",
  width: "100%",
  outline: "none",
  transition: "border-color .18s ease",
  display: "block",
} as React.CSSProperties;

function Field({
  label, id, type = "text", required, value, onChange, placeholder,
}: {
  label: string; id: keyof FD; type?: string; required?: boolean;
  value: string; onChange: (id: keyof FD, v: string) => void; placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-8)" }}>
      <label htmlFor={id} className="t-eyebrow text-[11px]" style={{ color: "var(--charcoal-3)" }}>
        {label}
        {required && <span style={{ color: "var(--gold)", marginLeft: "4px" }} aria-hidden="true">*</span>}
      </label>
      <input
        id={id} name={id} type={type} required={required} value={value}
        onChange={e => onChange(id, e.target.value)}
        placeholder={placeholder}
        style={INPUT}
        onFocus={e => { e.currentTarget.style.borderColor = "var(--gold)"; }}
        onBlur={e =>  { e.currentTarget.style.borderColor = "var(--border)"; }}
      />
    </div>
  );
}

export default function Contact() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-80px" });

  const [fd, setFd]       = useState<FD>({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Calendly fallback — if env var isn't set, show a button instead
  const bookingUrl = BOOKING_URL;
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Detect reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const set = (id: keyof FD, v: string) => setFd(p => ({ ...p, [id]: v }));

  const transProps = reducedMotion
    ? { duration: 0 }
    : { duration: 0.55 };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(fd),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setErrorMsg((json as { error?: string }).error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-h2" style={{ background: "var(--ivory)" }}>

      {/* ── Top header strip — navy ─────────────────────────────── */}
      <div style={{ background: "var(--navy)", paddingBlock: "var(--s-96)" }}>
        <div className="container" ref={headRef}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={transProps}
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
                { label: "Email",    value: "hello@aoholdings.com", href: "mailto:hello@aoholdings.com" },
                { label: "Response", value: "Within 1 business day" },
                { label: "Location", value: "Global — fully remote" },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: "var(--s-16)", marginBottom: "var(--s-16)", alignItems: "baseline" }}>
                  <span className="t-eyebrow text-[11px]" style={{ color: "var(--gold)", minWidth: "80px" }}>{label}</span>
                  {href
                    ? <a href={href} className="t-small text-link" style={{ color: "rgba(245,243,238,.65)" }}>{value}</a>
                    : <span className="t-small" style={{ color: "rgba(245,243,238,.65)" }}>{value}</span>
                  }
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Form + Booking — ivory ──────────────────────────────── */}
      <div className="container" style={{ paddingBlock: "var(--s-96)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: .65, ease: EASE }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: .97 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "var(--ivory-2)",
                  border: "1px solid var(--border)",
                  borderTop: "3px solid var(--gold)",
                  padding: "var(--s-48)",
                }}
              >
                <div style={{
                  width: "48px", height: "48px",
                  border: "2px solid var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "var(--s-24)",
                }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="var(--gold)" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="t-h3" style={{ color: "var(--charcoal)", marginBottom: "var(--s-16)" }}>
                  Message received.
                </h3>
                <p className="t-body">We&apos;ll come back to you within one business day.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--s-24)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--s-24)" }}>
                  <Field label="Full Name"  id="name"  required value={fd.name}  onChange={set} placeholder="Jane Smith" />
                  <Field label="Work Email" id="email" type="email" required value={fd.email} onChange={set} placeholder="jane@company.com" />
                </div>

                <Field label="Company / Organisation" id="company" value={fd.company} onChange={set} placeholder="Acme Corp" />

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-8)" }}>
                  <label htmlFor="service" className="t-eyebrow text-[11px]" style={{ color: "var(--charcoal-3)" }}>
                    Area of Interest
                  </label>
                  <select
                    id="service" name="service" value={fd.service}
                    onChange={e => set("service", e.target.value)}
                    style={{ ...INPUT, appearance: "none" as "none", color: fd.service ? "var(--charcoal)" : "var(--charcoal-3)" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "var(--gold)"; }}
                    onBlur={e =>  { e.currentTarget.style.borderColor = "var(--border)"; }}
                  >
                    <option value="" disabled>Select a service area…</option>
                    {SERVICES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-8)" }}>
                  <label htmlFor="message" className="t-eyebrow text-[11px]" style={{ color: "var(--charcoal-3)" }}>
                    Tell us about your challenge
                    <span style={{ color: "var(--gold)" }} aria-hidden="true"> *</span>
                  </label>
                  <textarea
                    id="message" name="message" required rows={6} value={fd.message}
                    onChange={e => set("message", e.target.value)}
                    placeholder="Give us the rough shape of the problem — we'll ask the smart questions in the call."
                    style={{ ...INPUT, resize: "none" as "none" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "var(--gold)"; }}
                    onBlur={e =>  { e.currentTarget.style.borderColor = "var(--border)"; }}
                  />
                </div>

                {status === "error" && (
                  <p role="alert" style={{ color: "#dc2626", fontSize: "14px" }}>
                    {errorMsg || "Something went wrong. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary self-start"
                  style={{ opacity: status === "sending" ? .65 : 1 }}
                >
                  {status === "sending" ? (
                    <>
                      <span
                        style={{
                          width: "16px", height: "16px",
                          border: "2px solid var(--charcoal)",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 1s linear infinite",
                        }}
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
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
                /* Fallback when NEXT_PUBLIC_BOOKING_URL is not set */
                <div style={{ padding: "var(--s-32)", display: "flex", flexDirection: "column", gap: "var(--s-16)", alignItems: "flex-start" }}>
                  <p className="t-body">
                    Fill in the contact form and we&apos;ll schedule a call at a time that works for you.
                  </p>
                  <a
                    href="#contact"
                    onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="btn-primary"
                  >
                    Send a Message
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

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
