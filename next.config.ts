import type { NextConfig } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ao-holding.vercel.app";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: Next.js inline, Vercel Analytics, Calendly
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://va.vercel-scripts.com",
      // Styles: Next.js + Calendly embed
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: same-origin + data URIs + Calendly
      "img-src 'self' data: https://assets.calendly.com https://www.google-analytics.com",
      // Frames: Calendly widget
      "frame-src https://calendly.com",
      // Connects: Vercel Analytics, Calendly, Upstash
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://calendly.com",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Redirect *.vercel.app to the custom domain to prevent duplicate indexing
  // Only active once NEXT_PUBLIC_SITE_URL is set to the real domain
  async redirects() {
    const siteHost = (() => {
      try { return new URL(SITE_URL).hostname; } catch { return null; }
    })();

    if (!siteHost || siteHost.endsWith(".vercel.app")) return [];

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ao-holding.vercel.app" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
