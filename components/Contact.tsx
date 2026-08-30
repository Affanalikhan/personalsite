"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const SERVICE_OPTIONS = [
  "Data & Predictive Modeling",
  "Agentic AI Framework",
  "AI-Powered Web Development",
  "AI Automation",
  "AI Strategy Advisory",
  "Business Development Support",
  "Not sure — let's talk",
];

function InputField({
  label,
  id,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: keyof FormData;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (id: keyof FormData, value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-eyebrow text-[var(--mist)]">
        {label}
        {required && <span className="text-[var(--gold)] ml-1" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        className="bg-transparent border border-[var(--gold)]/20 px-4 py-3 text-[var(--cream)] text-sm placeholder:text-[var(--mist)]/40 focus:border-[var(--gold)]/60 focus:outline-none transition-colors duration-300"
        aria-required={required}
      />
    </div>
  );
}

export default function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate send — wire to your actual endpoint / API route here
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // TODO: Replace with real fetch call:
    // const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) });
    // if (!res.ok) { setStatus("error"); return; }

    setStatus("success");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: EASE as [number, number, number, number] },
    }),
  };

  return (
    <section
      id="contact"
      className="relative section-transition overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--navy) 0%, #06101f 100%)",
      }}
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(201,168,76,0.07) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="section-pad container-site relative z-10">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-eyebrow mb-6 flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-[var(--gold)]" />
            Get in Touch
          </motion.p>

          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl"
          >
            Let&apos;s figure out{" "}
            <span className="font-editorial italic font-light gradient-text-gold">
              what&apos;s actually possible
            </span>{" "}
            for your business.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Left — form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 flex flex-col items-start gap-6"
              >
                <div className="w-12 h-12 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--cream)] mb-2">
                    Message received.
                  </h3>
                  <p className="text-[var(--mist)] leading-relaxed">
                    We'll review your note and come back to you within one business
                    day. In the meantime, feel free to book a slot directly via the
                    calendar on the right.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                  />
                  <InputField
                    label="Work Email"
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                  />
                </div>

                <InputField
                  label="Company / Organisation"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                />

                {/* Service select */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-eyebrow text-[var(--mist)]">
                    Area of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    className="bg-[var(--navy)] border border-[var(--gold)]/20 px-4 py-3 text-[var(--cream)] text-sm focus:border-[var(--gold)]/60 focus:outline-none transition-colors duration-300 appearance-none"
                  >
                    <option value="" disabled>
                      Select a service area…
                    </option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-eyebrow text-[var(--mist)]">
                    Tell us about your challenge
                    <span className="text-[var(--gold)] ml-1" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Give us the rough shape of the problem — we'll ask the smart questions in the call."
                    className="bg-transparent border border-[var(--gold)]/20 px-4 py-3 text-[var(--cream)] text-sm placeholder:text-[var(--mist)]/40 focus:border-[var(--gold)]/60 focus:outline-none transition-colors duration-300 resize-none"
                    aria-required="true"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex items-center gap-3 px-8 py-4 bg-[var(--gold)] text-[var(--navy)] font-semibold tracking-wide text-sm hover:bg-[var(--gold-light)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[var(--navy)] border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — calendar + info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Calendar embed */}
            <div className="glass-card overflow-hidden">
              <div className="px-6 py-5 border-b border-[var(--gold)]/10">
                <p className="text-eyebrow text-[var(--gold)] mb-1">Book Directly</p>
                <p className="text-[var(--cream)] text-sm">
                  Skip the back-and-forth — grab a 30-minute intro call.
                </p>
              </div>
              {/* Calendly inline embed — replace data-url with your real Calendly link */}
              <div
                className="calendly-inline-widget w-full"
                data-url="https://calendly.com/ao-holdings/intro"
                style={{ minWidth: "280px", height: "480px" }}
                aria-label="Calendly booking widget"
              />
              <script
                type="text/javascript"
                src="https://assets.calendly.com/assets/external/widget.js"
                async
              />
            </div>

            {/* Contact details */}
            <div className="glass-card p-6 flex flex-col gap-5">
              <p className="text-eyebrow text-[var(--mist)]">Direct Contact</p>

              {[
                {
                  label: "Email",
                  value: "hello@aoholdings.com",
                  href: "mailto:hello@aoholdings.com",
                },
                {
                  label: "Response time",
                  value: "Within 1 business day",
                  href: null,
                },
                {
                  label: "Engagements",
                  value: "Global — fully remote",
                  href: null,
                },
              ].map(({ label, value, href }) => (
                <div key={label} className="border-b border-[var(--gold)]/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-eyebrow text-[var(--mist)]/60 mb-1">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-[var(--cream)] text-sm hover:text-[var(--gold)] transition-colors duration-300 link-underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[var(--cream)] text-sm">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
