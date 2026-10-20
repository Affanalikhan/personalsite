import { NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// ── Rate limiting (Upstash Redis when env vars present, else in-memory) ──
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;

// Simple in-memory fallback when Upstash isn't configured
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();
const IN_MEMORY_LIMIT = 5;
const IN_MEMORY_WINDOW = 60_000; // 1 minute

function inMemoryCheck(ip: string): boolean {
  const now = Date.now();
  const entry = inMemoryStore.get(ip);
  if (!entry || now > entry.resetAt) {
    inMemoryStore.set(ip, { count: 1, resetAt: now + IN_MEMORY_WINDOW });
    return true; // allowed
  }
  if (entry.count >= IN_MEMORY_LIMIT) return false; // blocked
  entry.count++;
  return true;
}

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: false,
  });
}

// ── Validation schema ─────────────────────────────────────────────────────
const schema = z.object({
  name:    z.string().min(2,  "Name must be at least 2 characters").max(100),
  email:   z.string().email("Please enter a valid email address"),
  company: z.string().max(200).optional(),
  service: z.string().max(200).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

// ── Email helpers ─────────────────────────────────────────────────────────
function buildHtml(data: z.infer<typeof schema>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Enquiry — A&amp;O Holdings</title></head>
<body style="margin:0;padding:0;background:#FAFAF8;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #E5E3DD;">
    <div style="background:#0B1220;padding:32px 40px;">
      <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#C9A15B;font-weight:600;">A&amp;O Holdings</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:700;color:#F5F3EE;">New Enquiry</p>
    </div>
    <div style="padding:40px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#6B6B6B;width:140px;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:15px;color:#1A1A1A;">${escHtml(data.name)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#6B6B6B;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:15px;color:#1A1A1A;"><a href="mailto:${escHtml(data.email)}" style="color:#C9A15B;">${escHtml(data.email)}</a></td></tr>
        ${data.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#6B6B6B;">Company</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:15px;color:#1A1A1A;">${escHtml(data.company)}</td></tr>` : ""}
        ${data.service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#6B6B6B;">Service</td>
            <td style="padding:10px 0;border-bottom:1px solid #E5E3DD;font-size:15px;color:#1A1A1A;">${escHtml(data.service)}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;">
        <p style="font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#6B6B6B;margin-bottom:10px;">Message</p>
        <div style="background:#FAFAF8;border:1px solid #E5E3DD;padding:20px;font-size:15px;line-height:1.7;color:#3D3D3D;">${escHtml(data.message).replace(/\n/g, "<br>")}</div>
      </div>
      <p style="margin-top:32px;font-size:13px;color:#6B6B6B;">
        Reply directly to this email — the reply-to is set to the visitor's address.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildText(data: z.infer<typeof schema>): string {
  return [
    "NEW ENQUIRY — A&O Holdings",
    "─".repeat(40),
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    data.company ? `Company: ${data.company}` : "",
    data.service ? `Service: ${data.service}` : "",
    "",
    "Message:",
    data.message,
    "",
    "─".repeat(40),
    "Reply to this email to respond directly to the visitor.",
  ].filter(l => l !== undefined).join("\n");
}

function buildConfirmHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>We received your message — A&amp;O Holdings</title></head>
<body style="margin:0;padding:0;background:#FAFAF8;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #E5E3DD;">
    <div style="background:#0B1220;padding:32px 40px;">
      <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#C9A15B;font-weight:600;">A&amp;O Holdings</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:700;color:#F5F3EE;">We&apos;ve received your message.</p>
    </div>
    <div style="padding:40px;">
      <p style="font-size:16px;line-height:1.7;color:#3D3D3D;">Hi ${escHtml(name)},</p>
      <p style="font-size:16px;line-height:1.7;color:#3D3D3D;">
        Thank you for reaching out to A&amp;O Holdings. We&apos;ve received your message and will come back to you within <strong>1 business day</strong>.
      </p>
      <p style="font-size:16px;line-height:1.7;color:#3D3D3D;">
        In the meantime, feel free to book a free 30-minute discovery call directly via our website.
      </p>
      <p style="margin-top:32px;font-size:15px;color:#6B6B6B;">
        — Affan &amp; Omer<br>
        <span style="color:#C9A15B;">A&amp;O Holdings</span>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#39;");
}

// ── Route handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return Response.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }
  } else {
    if (!inMemoryCheck(ip)) {
      return Response.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }
  }

  // Parse & validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Resolve recipients from env (server-only, never exposed to client)
  const toEnv = process.env.CONTACT_TO_EMAILS ?? "";
  const to = toEnv
    .split(",")
    .map(e => e.trim())
    .filter(Boolean);

  if (to.length === 0) {
    console.error("[contact] CONTACT_TO_EMAILS is not set.");
    return Response.json({ error: "Service unavailable." }, { status: 503 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[contact] RESEND_API_KEY is not set.");
    return Response.json({ error: "Service unavailable." }, { status: 503 });
  }

  const resend = new Resend(resendKey);
  const subject = `New enquiry – ${data.service || "General"} – ${data.name}`;

  try {
    // 1. Notify founders
    await resend.emails.send({
      from:     "A&O Holdings <hello@aoholdings.com>",
      to,
      replyTo:  data.email,
      subject,
      html:     buildHtml(data),
      text:     buildText(data),
    });

    // 2. Confirmation to visitor (fire-and-forget — don't fail the whole request)
    resend.emails.send({
      from:    "A&O Holdings <hello@aoholdings.com>",
      to:      [data.email],
      subject: "We received your message — A&O Holdings",
      html:    buildConfirmHtml(data.name),
      text:    `Hi ${data.name},\n\nThank you for reaching out. We'll get back to you within 1 business day.\n\n— Affan & Omer, A&O Holdings`,
    }).catch(err => console.error("[contact] confirmation email failed:", err));

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return Response.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
