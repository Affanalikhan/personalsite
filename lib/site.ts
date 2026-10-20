/** Single source of truth for site-wide constants. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ao-holding.vercel.app";

export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendly.com/ao-holdings/intro";

export const PUBLIC_EMAIL = "hello@aoholdings.com";

export const FOUNDERS = [
  {
    name: "Affan Ali Khan",
    role: "Co-Founder",
    focus: "Data Science & AI Architecture",
    photo: "/affanalikhan.jpeg",
    bio: "Affan leads the technical side of A&O Holdings and Consulting. His work sits at the intersection of data science and AI systems engineering — building predictive models that inform high-stakes business decisions and designing multi-agent AI frameworks that operate inside real workflows.",
    extended:
      "He takes a problem-first approach to every engagement: the right technical solution only becomes clear after you fully understand what the business is actually trying to achieve. Affan has experience across the full data science lifecycle — problem framing, feature engineering, model development, MLOps, and deployment — and brings the same rigour to agentic AI architecture and AI-native web development.",
    linkedin: "https://www.linkedin.com/in/affan-ali-khan-679a27249/",
    tags: ["Predictive Modeling", "Agentic AI", "ML Engineering", "AI-Powered Web"],
    accent: "#1e40af",
  },
  {
    name: "Mohammed Omer Khan",
    role: "Co-Founder",
    focus: "Commercial Strategy & AI Enablement",
    photo: "/mohammedomerkhan.jpeg",
    bio: "Omer leads the commercial and strategic side of A&O Holdings and Consulting — client relationships, business development, and the translation of AI capability into business value. He has a sharp instinct for where AI creates genuine advantage versus where it's a distraction.",
    extended:
      "He runs engagements spanning AI strategy advisory, workflow automation, contract acquisition, and sales infrastructure. Every recommendation is tested against ROI, feasibility, and what the client's team can actually sustain long-term.",
    linkedin: "https://www.linkedin.com/in/mohammedomer112/",
    tags: ["AI Strategy", "Business Development", "AI Automation", "Contract Acquisition"],
    accent: "var(--gold)",
  },
] as const;
