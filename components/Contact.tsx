"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

type Status = "idle" | "sending" | "success" | "error";
interface FD { name: string; email: string; company: string; service: string; message: string; }

const SERVICES = [
  "Data & Predictive Modeling", "Agentic AI Framework", "AI-Powered Web Development",
  "AI Automation", "AI Strategy Advisory", "Product & Strategy",
  "Business Development Support", "Not sure — let's talk",
];

const inputStyle = {
  base: { borderColor: "var(--border)", background: "var(--white)", color: "var(--ink)" } as React.CSSProperties,
  focus: { borderColor: "var(--gold)", outline: "none" } as React.CSSProperties,
};

function Field({ label, id, type = "text", required, value, onChange, placeholder }: {
  label: string; id: keyof FD; type?: string; required?: boolean;
  value: string; onChange: (id: keyof FD, v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="eyebrow text-[0.63rem]" style={{ color: "var(--ink-3)" }}>
        {label}{required && <span className="ml-1" style={{ color: "var(--gold)" }} aria-hidden="true">*</span>}
      </label>
      <input id={id} name={id} type={type} required={required} value={value}
        onChange={e => onChange(id, e.target.value)} placeholder={placeholder}
        className="border px-4 py-3 text-sm transition-colors duration-200 placeholder:opacity-30"
        style={inputStyle.base}
        onFocus={e => Object.assign(e.currentTarget.style, inputStyle.focus)}
        onBlur={e => Object.assign(e.currentTarget.style, inputStyle.base)}
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
    e.preventDefault(); setStatus("sending");
    await new Promise(r => setTimeout(r, 1400));
    // TODO: replace with real endpoint
    // const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(fd) });
    // if (!res.ok) { setStatus("error"); return; }
    setStatus("success");
  };

  return (
    <section id="contact" aria-labelledby="contact-h2"
      className="relative overflow-hidden" style={{ background: "var(--bg-dark)" }}
    >
      {/* Subtle dot grid on dark bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* Gold glow bottom right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(184,145,58,0.12) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="wrap section-y relative z-10">

        {/* Header */}
        <div ref={headRef} className="mb-14">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }} className="flex items-center gap-3 mb-5"
          >
            <span className="w-7 h-px flex-shrink-0" style={{ background: "var(--gold)" }} aria-hidden="true" />
            <span className="eyebrow">Get in Touch</span>
          </motion.div>

          <motion.h2 id="contact-h2"
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-display font-bold leading-tight mb-5 max-w-2xl"
            style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", color: "var(--white)" }}
          >
            Let&apos;s figure out{" "}
            <span className="font-serif font-light italic" style={{ color: "var(--gold-light)" }}>what&apos;s actually possible</span>
            {" "}for your business.
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-[0.9375rem] max-w-lg" style={{ lineHeight: 1.75, color: "rgba(255,255,255,0.55)" }}
          >
            Start with a free 30-minute discovery call — no pitch, no obligation.
            We&apos;ll understand your situation and tell you honestly whether and how we can help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16">

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {status === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="border p-10 flex flex-col gap-5"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(184,145,58,0.3)" }}
              >
                <div className="w-10 h-10 border flex items-center justify-center"
                  style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: "var(--white)" }}>Message received.</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    We&apos;ll come back to you within one business day.
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

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="eyebrow text-[0.63rem]" style={{ color: "var(--ink-3)" }}>Area of Interest</label>
                  <select id="service" name="service" value={fd.service} onChange={e => set("service", e.target.value)}
                    className="border px-4 py-3 text-sm focus:outline-none transition-colors duration-200 appearance-none"
                    style={{ ...inputStyle.base, color: fd.service ? "var(--ink)" : "var(--ink-light)" }}
                    onFocus={e => Object.assign(e.currentTarget.style, inputStyle.focus)}
                    onBlur={e => Object.assign(e.currentTarget.style, inputStyle.base)}
                  >
                    <option value="" disabled>Select a service area…</option>
                    {SERVICES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="eyebrow text-[0.63rem]" style={{ color: "var(--ink-3)" }}>
                    Tell us about your challenge <span style={{ color: "var(--gold)" }} aria-hidden="true">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={5} value={fd.message}
                    onChange={e => set("message", e.target.value)}
                    placeholder="Give us the rough shape of the problem — we'll ask the smart questions in the call."
                    className="border px-4 py-3 text-sm transition-colors duration-200 bg-white resize-none placeholder:opacity-30"
                    style={{ ...inputStyle.base, color: "var(--ink)" }}
                    onFocus={e => Object.assign(e.currentTarget.style, inputStyle.focus)}
                    onBlur={e => Object.assign(e.currentTarget.style, inputStyle.base)}
                  />
                </div>

                {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}

                <button type="submit" disabled={status === "sending"}
                  className="group self-start inline-flex items-center gap-3 px-7 py-3.5 font-semibold text-sm tracking-wide transition-colors duration-300 disabled:opacity-50"
                  style={{ background: "var(--gold)", color: "var(--white)" }}
                  onMouseEnter={e => { if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
                >
                  {status === "sending" ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />Sending…</>
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

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="flex flex-col gap-5"
          >
            {/* Calendly */}
            <div className="border overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <p className="eyebrow text-[0.63rem] mb-1.5" style={{ color: "var(--gold)" }}>Book Directly</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>Skip the back-and-forth — grab a 30-minute intro call.</p>
              </div>
              <div className="calendly-inline-widget w-full"
                data-url="https://calendly.com/ao-holdings/intro"
                style={{ minWidth: "240px", height: "460px" }}
                aria-label="Calendly booking widget"
              />
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
            </div>

            {/* Contact info */}
            <div className="border p-6" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="eyebrow text-[0.63rem] mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>Direct Contact</p>
              {[
                { label: "Email",         value: "hello@aoholdings.com", href: "mailto:hello@aoholdings.com" },
                { label: "Response time", value: "Within 1 business day", href: null },
                { label: "Engagements",   value: "Global — fully remote",  href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="py-4 border-b last:border-0 last:pb-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <p className="eyebrow text-[0.58rem] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                  {href
                    ? <a href={href} className="text-sm hover-line transition-colors duration-200" style={{ color: "rgba(255,255,255,0.7)" }}>{value}</a>
                    : <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{value}</p>
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
