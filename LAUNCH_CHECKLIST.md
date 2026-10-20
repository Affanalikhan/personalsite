# A&O Holdings and Consulting — Launch Checklist

Everything here requires *your* credentials or registrar access.
Work through the steps in order — each one unblocks the next.

---

## 1. Domain — confirm you own aoholdings.com

- [ ] Log in to your domain registrar (GoDaddy / Cloudflare / Namecheap / etc.)
- [ ] Confirm the domain is registered and not expired

---

## 2. Add the custom domain in Vercel

1. Go to your project → **Settings → Domains**
2. Add `aoholdings.com` (apex) — Vercel will generate DNS records
3. Also add `www.aoholdings.com` and set it to **Redirect to** `aoholdings.com` (301)
4. Vercel shows you two DNS records to create at your registrar (see step 3)

---

## 3. DNS records at your registrar

Create all of these. The values for rows marked **[Vercel]** come from the Vercel dashboard.

| Type  | Name         | Value / Target                  | Notes                         |
|-------|--------------|---------------------------------|-------------------------------|
| A     | @            | 76.76.21.21                     | Vercel apex IP                |
| CNAME | www          | cname.vercel-dns.com            | Vercel www redirect           |
| TXT   | @            | `google-site-verification=...` | Google Search Console (step 5)|
| TXT   | @            | `v=spf1 include:amazonses.com ~all` | Resend SPF (step 6)      |
| CNAME | resend._domainkey | (from Resend dashboard)    | Resend DKIM (step 6)          |
| TXT   | _dmarc       | `v=DMARC1; p=none; rua=mailto:hello@aoholdings.com` | DMARC (step 6) |

> **Propagation:** DNS changes take 5–30 minutes; sometimes up to 48 hours.

---

## 4. Set environment variables in Vercel

Go to **Project → Settings → Environment Variables** and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aoholdings.com` |
| `NEXT_PUBLIC_BOOKING_URL` | `https://calendly.com/ao-holdings/intro` |
| `RESEND_API_KEY` | (from Resend, step 6) |
| `CONTACT_TO_EMAILS` | `affanaftab786@gmail.com,mohammedomerkhan516@gmail.com` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | (from Google Search Console, step 5) |
| `UPSTASH_REDIS_REST_URL` | (optional — from Upstash, step 7) |
| `UPSTASH_REDIS_REST_TOKEN` | (optional — from Upstash, step 7) |

After adding variables, **redeploy** (Deployments → redeploy latest).

---

## 5. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → **URL prefix** → `https://aoholdings.com`
3. Choose **HTML tag** verification → copy the `content="..."` value
4. Set `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel to that value (or use the DNS TXT method — see step 3 table)
5. After deploying, click **Verify** in Search Console
6. Submit sitemap: `https://aoholdings.com/sitemap.xml`

---

## 6. Resend — email delivery

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. **Add a domain** → enter `aoholdings.com`
3. Resend shows you SPF, DKIM and DMARC records → add them to your DNS (see step 3 table)
4. Click **Verify** in Resend once DNS propagates
5. Go to **API Keys** → create a key → paste it as `RESEND_API_KEY` in Vercel

> **Important:** Until the domain is verified, Resend only delivers to the *account owner's* email address (the one you signed up with). Test with that address first.

### DMARC note
Start with `p=none` (monitoring only). After 2–4 weeks, review the `rua` reports and move to `p=quarantine` then `p=reject`.

---

## 7. Email forwarding for hello@aoholdings.com

`hello@aoholdings.com` is listed publicly on the site. Set up free forwarding so anything sent to it lands in both inboxes.

### Option A — Cloudflare Email Routing (free, recommended if domain is on Cloudflare)
1. In Cloudflare dashboard → **Email → Email Routing**
2. Enable Email Routing for `aoholdings.com`
3. Add a **Catch-all** rule → forward to both Gmail addresses
4. Cloudflare automatically adds required MX + SPF records

### Option B — Registrar forwarding
Most registrars (GoDaddy, Namecheap, etc.) offer free email forwarding.
Set `hello@aoholdings.com` to forward to both Gmail addresses.

---

## 8. Rate limiting (optional upgrade)

If you want persistent rate limiting across Vercel edge instances:
1. Sign up at [console.upstash.com](https://console.upstash.com) (free tier)
2. Create a Redis database → copy REST URL and token
3. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to Vercel

Without these, the built-in in-memory fallback still rate-limits (5 requests/minute per IP per serverless instance).

---

## 9. Calendly booking link

1. Sign up / log in at [calendly.com](https://calendly.com)
2. Create an event type → **30-minute intro call**
3. Copy the event URL (e.g. `https://calendly.com/ao-holdings/intro`)
4. Set `NEXT_PUBLIC_BOOKING_URL` in Vercel to that URL

---

## 10. Final smoke test

- [ ] `https://aoholdings.com` loads and shows the site
- [ ] `https://www.aoholdings.com` redirects → `https://aoholdings.com`
- [ ] `https://ao-holding.vercel.app` redirects → `https://aoholdings.com`
- [ ] Contact form submits → both founders receive the email
- [ ] Visitor receives confirmation email
- [ ] `https://aoholdings.com/sitemap.xml` returns valid XML
- [ ] `https://aoholdings.com/robots.txt` is accessible
- [ ] Google Search Console shows domain verified
- [ ] `/privacy` and `/terms` pages load correctly
- [ ] LinkedIn links in footer go to correct profiles

---

## SPF / DKIM / DMARC quick reference

```
SPF   (TXT @):         v=spf1 include:amazonses.com ~all
DKIM  (CNAME):         resend._domainkey → [value from Resend dashboard]
DMARC (TXT _dmarc):    v=DMARC1; p=none; rua=mailto:hello@aoholdings.com
```

> SPF: tells receiving servers that Resend's servers are authorised to send on behalf of `aoholdings.com`.
> DKIM: cryptographically signs outgoing email so it can't be spoofed.
> DMARC: tells receiving servers what to do with unauthenticated mail (start with `p=none` to monitor).
