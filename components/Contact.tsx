"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

type Status = "idle" | "sending" | "success" | "error";
interface FD { name: string; email: string; company: string; service: string; message: string; }

const SERVICES = ["Data & Predictive Modeling","Agentic AI Framework","AI-Powered Web Development","AI Automation","AI Strategy Advisory","Business Development Support","Not sure — let's talk"];

function Field({ label, id, type = "text", required, value, onChange, placeholder }: {
  label: string; id: keyof FD; type?: string; required?: boolean;
  value: string; onChange: (id: keyof FD, v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow text-[0.65rem]" style={{ color: "var(--cream-dim)" }}>
        {label}{required && <span className="text-[var(--gold)] ml-1" aria-hidden="true">*</span>}
      </label>
      <input id={id} name={id} type={type} required={required} value={value}
        onChange={e => onChange(id, e.target.value)} placeholder={placeholder}
        className="border px-4 py-3 text-[var(--cream)] text-sm placeholder:text-white/20 focus:outline-none transition-colors duration-250 bg-transparent"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
        onFocus={e => e.currentTarget.style.borderColor = "var(--gold)"}
        onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
      />
    </div>
  );
}

export default function Contact() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const [fd, setFd] = useState<FD>({ name:"", email:"", company:"", service:"", message:"" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (id: keyof FD, v: string) => setFd(p => ({ ...p, [id]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1400));
    // TODO: replace simulation with real endpoint
    // const res = await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(fd) });
    // if (!res.ok) { setStatus("error"); return; }
    setStatus("success");
  };

  return (
    <section id="contact" aria-labelledby="contact-h2"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07111d 0%, #040b14 100%)" }}
    >
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(200,169,110,0.07) 0%, transparent 60%)" }} aria-hidden="true" />

      <div className="wrap section-y relative z-10">

        {/* Header */}
        <div ref={headRef} className="mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="eyebrow">Get in Touch</span>
          </motion.div>

          <motion.h2 id="contact-h2"
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="font-display font-bold leading-[1.1] mb-5 max-w-2xl"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}
          >
            Let&apos;s figure out{" "}
            <span className="font-serif font-light italic" style={{ color: "var(--gold)" }}>what&apos;s actually possible</span>
            {" "}for your business.
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.18 }}
            className="text-[0.9375rem] max-w-lg" style={{ lineHeight: 1.75, color: "var(--cream-dim)" }}
          >
            Start with a free 30-minute discovery call — no pitch, no obligation. We&apos;ll ask
            questions, understand your situation, and tell you honestly whether and how
            we can help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            {status === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="border border-white/[0.08] p-10 flex flex-col gap-5"
                style={{ background: "rgba(200,169,110,0.04)" }}
              >
                <div className="w-10 h-10 border border-[var(--gold)] flex items-center justify-center text-[var(--gold)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--cream)] mb-2">Message received.</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--cream-dim)" }}>
                    We&apos;ll come back to you within one business day. In the meantime, grab a
                    slot directly via Calendly if you&apos;d prefer to move faster.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" id="name" required value={fd.name} onChange={set} placeholder="Jane Smith" />
                  <Field label="Work Email" id="email" type="email" required value={fd.email} onChange={set} placeholder="jane@company.com" />
                </div>
                <Field label="Company / Organisation" id="company" value={fd.company} onChange={set} placeholder="Acme Corp" />

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="eyebrow text-[0.65rem]" style={{ color: "var(--cream-dim)" }}>
                    Area of Interest
                  </label>
                  <select id="service" name="service" value={fd.service} onChange={e => set("service", e.target.value)}
                    className="border px-4 py-3 text-sm focus:outline-none transition-colors duration-250 appearance-none"
                    style={{ background: "var(--navy-1)", borderColor: "rgba(255,255,255,0.1)", color: fd.service ? "var(--cream)" : "rgba(255,255,255,0.3)" }}
                  >
                    <option value="" disabled>Select a service area…</option>
                    {SERVICES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="eyebrow text-[0.65rem]" style={{ color: "var(--cream-dim)" }}>
                    Tell us about your challenge <span className="text-[var(--gold)]" aria-hidden="true">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={5} value={fd.message}
                    onChange={e => set("message", e.target.value)}
                    placeholder="Give us the rough shape of the problem — we'll ask the smart questions in the call."
                    className="border px-4 py-3 text-[var(--cream)] text-sm placeholder:text-white/20 focus:outline-none transition-colors duration-250 bg-transparent resize-none"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    onFocus={e => e.currentTarget.style.borderColor = "var(--gold)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>

                {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}

                <button type="submit" disabled={status === "sending"}
                  className="group self-start inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm tracking-wide hover:bg-[var(--gold-bright)] disabled:opacity-50 transition-colors duration-300"
                >
                  {status === "sending" ? (
                    <><span className="w-4 h-4 border-2 border-[var(--navy)] border-t-transparent rounded-full animate-spin" aria-hidden="true" />Sending…</>
                  ) : (
                    <>Send Message
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
            className="flex flex-col gap-5"
          >
            {/* Calendly */}
            <div className="border border-white/[0.08] overflow-hidden" style={{ background: "rgba(255,255,255,0.025)" }}>
              <div className="px-6 py-5 border-b border-white/[0.06]">
                <p className="eyebrow text-[0.65rem] text-[var(--gold)] mb-1.5">Book Directly</p>
                <p className="text-sm text-[var(--cream)]">Skip the back-and-forth — grab a 30-minute intro call.</p>
              </div>
              <div className="calendly-inline-widget w-full"
                data-url="https://calendly.com/ao-holdings/intro"
                style={{ minWidth: "260px", height: "460px" }}
                aria-label="Calendly booking widget"
              />
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
            </div>

            {/* Contact info */}
            <div className="border border-white/[0.08] p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="eyebrow text-[0.65rem] mb-5" style={{ color: "var(--cream-dim)" }}>Direct Contact</p>
              {[
                { label: "Email", value: "hello@aoholdings.com", href: "mailto:hello@aoholdings.com" },
                { label: "Response time", value: "Within 1 business day", href: null },
                { label: "Engagements", value: "Global — fully remote", href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="py-4 border-b border-white/[0.05] last:border-0 last:pb-0">
                  <p className="eyebrow text-[0.58rem] mb-1" style={{ color: "var(--slate)" }}>{label}</p>
                  {href
                    ? <a href={href} className="text-sm text-[var(--cream)] hover-line hover:text-[var(--gold)] transition-colors duration-250">{value}</a>
                    : <p className="text-sm text-[var(--cream)]">{value}</p>
                  }
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
