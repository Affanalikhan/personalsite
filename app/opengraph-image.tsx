import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "A&O Holdings and Consulting — AI Strategy & Data Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0B1220",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Gold accent bar top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#C9A15B" }} />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 96px",
            height: "100%",
          }}
        >
          {/* Top: eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C9A15B" }} />
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C9A15B",
              }}
            >
              Independent AI Consultancy
            </span>
          </div>

          {/* Middle: headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "80px",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "#F5F3EE",
                }}
              >
                A&amp;O
              </span>
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "80px",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "#C9A15B",
                }}
              >
                Holdings
              </span>
            </div>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "22px",
                lineHeight: 1.5,
                color: "rgba(245,243,238,0.65)",
                maxWidth: "540px",
                margin: 0,
              }}
            >
              We build the models your competitors haven&apos;t thought of yet.
            </p>
          </div>

          {/* Bottom: tags */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["Data Science", "Agentic AI", "AI Strategy", "Predictive Modeling"].map(tag => (
              <div
                key={tag}
                style={{
                  padding: "8px 16px",
                  border: "1px solid rgba(201,161,91,0.4)",
                  fontFamily: "sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(245,243,238,0.6)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
