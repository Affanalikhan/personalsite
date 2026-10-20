// TEMPORARY — remove after confirming env vars. Safe: never exposes values.
export async function GET() {
  return Response.json({
    hasResendKey:    !!process.env.RESEND_API_KEY,
    hasContactEmails: !!process.env.CONTACT_TO_EMAILS,
    hasSiteUrl:      !!process.env.NEXT_PUBLIC_SITE_URL,
    resendKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 8) ?? "not set",
    emailsCount:     process.env.CONTACT_TO_EMAILS?.split(",").length ?? 0,
  });
}
