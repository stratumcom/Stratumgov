# Stratum Governance Ltd.

A complete responsive corporate website built with Next.js App Router, strict TypeScript, Tailwind CSS, CLI-generated shadcn/ui, Lucide, React Hook Form, Zod, React Email and Resend. No content database, authentication system or payment gateway is included. Redis is used only for production rate limiting and short-lived retry metadata.

## Prerequisites and installation

Use Node.js **20.19+** (Node 22 LTS is recommended) and npm. Install the locked dependencies, configure the environment, then start the app:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The site address is detected automatically in local development and on Vercel. Put email and Redis secrets in `.env.local` or the hosting provider's secret manager. `.env.local` is ignored; never commit it.

## Pages

`/`, `/about`, `/services`, `/services/[slug]`, `/consultation`, `/promotions`, `/compliance-health-check`, `/health-safety-check`, `/contact`, `/insights`, `/insights/[slug]`, `/newsroom`, `/news/[slug]`, `/faqs`, `/privacy-policy`, and `/terms-of-service` are implemented. Unknown service and article slugs return the shared not-found page. Contact and consultation use separate POST endpoints. Next.js generates the sitemap, robots file and branded social preview image.

## Structure

```text
src/
  app/                 Pages, layouts, metadata routes and API endpoints
  components/
    layout/            Shared footer
    navigation/        Desktop navigation and accessible mobile Sheet
    home/              Reusable approach section
    services/          Cards, category filter, grid
    contact/           Contact form
    consultation/      Consultation form
    insights/          Article cards, filters and sharing
    newsroom/          Featured news, topic filters, search and internal story links
    faqs/              Search and accessible Accordion
    shared/            Container, headings, CTAs and form fields
    ui/                Official shadcn CLI-generated components
  config/              Company configuration and navigation
  data/                Typed service, FAQ and article content
  emails/              Owner notifications and optional acknowledgement
  lib/                 Validation, Resend, rate limiting, WhatsApp and SEO
  types/               Shared TypeScript models
public/
  images/              Local illustrative stock photography
  fonts/               Local fonts and licenses
  icons/               Editable brand mark
tests/                 Validation and conversion tests
docs/                  Implementation and verification notes
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only sending key from Resend. |
| `RESEND_FROM_EMAIL` | Verified sender, optionally `Business name <sender@verified-domain>`. Never the visitor's email. |
| `RESEND_SENDER_VERIFIED` | Set `true` **only after** Resend verifies the actual sender domain/address. Defaults to false. |
| `OWNER_EMAIL` | Notification recipient and public business contact email. Use an address suitable for publication. |
| `OWNER_PHONE_NUMBER` | Optional verified public phone number. |
| `OWNER_WHATSAPP_NUMBER` | Verified international digits only; no plus, spaces or punctuation. |
| `OWNER_LOCATION` | Short confirmed location for the header, such as the city and country. Falls back to the office address. |
| `OWNER_OFFICE_ADDRESS` | Confirmed full office address; displays in contact details and sets the Google Map location. Leave blank until confirmed. |
| `OWNER_BUSINESS_HOURS` | Confirmed hours displayed in the header and contact details. |
| `OWNER_FACEBOOK_URL`, `OWNER_X_URL`, `OWNER_LINKEDIN_URL`, `OWNER_INSTAGRAM_URL` | Actual HTTPS company profile URLs; configured profiles appear as header icons and footer links. |
| `SEND_CLIENT_ACKNOWLEDGEMENT` | Optional consultation acknowledgement; `true` to enable. |
| `UPSTASH_REDIS_REST_URL` | Shared production Redis HTTP endpoint from Upstash. |
| `UPSTASH_REDIS_REST_TOKEN` | Server-only Redis token. |
| `TRUSTED_CLIENT_IP_HEADER` | Non-Vercel hosts only: a header overwritten by the trusted reverse proxy with the actual client IP. |

None of the secret values are exposed to browser code. The deliberately public contact details are rendered into server-generated pages. Restart/rebuild after changing environment-backed contact information because static pages may contain build-time values.

On Vercel, enable **Automatically expose System Environment Variables** in Project Settings if it is off. The app uses Vercel's deployment and production domains for metadata, sitemap and sharing URLs. Form origin checking uses the address of the incoming request, so deploying to a new domain does not require editing an environment file.

The header information bar and contact sidebar share these contact settings. Set `OWNER_LOCATION` to a short confirmed location and `OWNER_BUSINESS_HOURS` to the actual opening hours. The full `OWNER_OFFICE_ADDRESS` displays below the contact map and determines its Google Maps search and embed location. Check the resulting pin against the actual office before publishing. When the address is blank, the map panel explains that the office location is awaiting confirmation. The header always shows Facebook, X, LinkedIn and Instagram icons. Icons become links when their HTTPS profile URLs are configured; until then they have a “profile link coming soon” label and no navigation target. The footer includes only configured links; no example company profiles are published.

## Resend setup and email flow

1. Create a [Resend account](https://resend.com/). Add your real sending domain in **Domains** and configure the DNS records supplied by Resend.
2. Wait for verification. Create an API key with appropriate sending permissions and put it in `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL` to an address at the verified domain and `OWNER_EMAIL` to the actual business recipient.
4. Set `RESEND_SENDER_VERIFIED=true` only once verified. This flag records the operator's confirmation; the app does not independently verify domain ownership. Resend will reject an unverified sender.
5. Configure the production rate limiter as described below and rebuild/restart.
6. Submit both forms using a real test address. Check the owner inbox, Resend logs, spam folders and optional acknowledgement. Confirm all fields and the Africa/Lagos timestamp. This live delivery check requires your credentials and has not been claimed without them.

Forms validate in the browser and again on the server. Notifications include every business field, explicit privacy consent, the UUID reference and submission time. Optional company, availability and phone fields are labeled "Not supplied" if empty. The honeypot is an anti-spam field, not business information. The sender is your verified address; reply-to is the visitor's email. User-provided text is escaped in the styled HTML emails, and plain-text alternatives are included. The HTML is built before calling Resend, so delivery does not depend on React email rendering in production.

Success is returned only after Resend accepts the owner notification. If notification delivery fails, the form displays an error. Resend acceptance does not guarantee final inbox delivery. The optional acknowledgement is sent after owner notification acceptance; acknowledgement failure does not misreport the successfully accepted owner notification. Submitting a preferred date does not confirm a booking.

Repeated attempts from the same form retain a UUID, passed as a Resend idempotency key. Resend deduplicates an unchanged request within its documented 24-hour retention window. A hashed reference and timestamp are retained in the same Redis instance for that period to keep retry email payloads identical. No message body is stored in Redis. Editing the submission creates a new reference, so a changed enquiry is not confused with a retry. New independent submissions receive a new reference.

Unconfigured email returns `503`; bad input returns `400`; invalid origin returns `403`; oversized input returns `413`; unsupported content type returns `415`; rate-limit violations return `429`; rejected email returns `502`. No secret or stack trace is sent to the client. For `502`, inspect the Vercel function log entry `[email] Owner notification rejected` for the provider error type and status, then check the matching request in Resend logs. A `403` from Resend commonly means the sender domain is not verified for that account; a `401` points to the API key. The sender address and key in Vercel's **Production** environment must match the verified Resend account. Redeploy after changing environment variables.

## Production spam protection

Create an [Upstash Redis database](https://upstash.com/docs/redis/overall/getstarted), then copy its REST URL and token into server secrets. The shared sliding-window limiter allows five requests per 15 minutes per hashed client IP and per hashed email across both forms. This works across server instances; Redis stores short-lived hashes rather than raw email or IP identifiers. A honeypot, strict field limits, streamed body-size enforcement and origin checks provide additional controls.

On Vercel, the app uses the platform's overwritten `x-vercel-forwarded-for`. Else configure a trusted reverse proxy to **replace** the selected header and block direct origin access, then set `TRUSTED_CLIENT_IP_HEADER`. Never trust a header a visitor can pass through unchanged. Production forms fail closed when the client IP or shared limiter cannot be verified. Development uses a small in-memory fallback only when Redis is unconfigured. Set an appropriate platform firewall/edge rate limit for overall request volume as well.

## WhatsApp and conversion settings

Set `OWNER_WHATSAPP_NUMBER` to the actual business number in international format with digits only. Links use `https://wa.me/<number>?text=<encoded message>` and include the selected service title and slug. No fake number is included. When unconfigured, the CTA routes visitors to a working enquiry/consultation page and explains WhatsApp availability.

Each service has one conversion mode:

- `consultation`: consultation is primary, with a contact enquiry alternative.
- `whatsapp-enquiry`: consultation plus WhatsApp enquiry.
- `whatsapp-payment`: consultation plus a WhatsApp discussion about scope, fees and payment arrangements.

The website neither collects nor confirms payments. Payment instructions and status must be agreed directly with the business. The generic message does not include a client's name because it has not been collected for that interaction.

## Content and branding

Edit `src/config/site.ts` to set company details, verified address, business hours, social links, team profiles and confirmed industries. Unknown details are empty. Do not fill them with invented facts. The About page uses the supplied company profile, strategic focus areas and philosophy in `src/data/company-profile.ts`.

Edit `src/data/services.ts` for the service catalog. Every service is typed with a unique id/slug, title, descriptions, category, problem, benefits, deliverables, FAQs, icon, featured/active flags, confirmation status, conversion type and optional pricing label. Set `active: false` to hide a service from listing, routes, forms and related links. **Set `confirmed: true` only after the owner confirms that offering.** Proposed services are visibly labeled, noindexed and excluded from the sitemap; confirmed services receive Service structured data. No prices are invented.

Edit `src/data/insights.ts` to add articles with title, slug, excerpt, category, tags, author, date, image, reading time and section content. Sample editorials have `sample: true`, are explicitly labeled, noindexed and excluded from the sitemap. Replace them with owner-approved original publications and set `sample: false` only once approved. Dates use ISO `YYYY-MM-DD`. Do not fabricate regulatory announcements.

Edit `src/data/newsroom.ts` to add or update curated news. The newsroom has six initial source-checked stories, newest-first sorting, topic filters, search and internal article pages at `/news/[slug]`. Each story keeps a separate original-source reference link. Set `published: false` to exclude an entry from the listing, article pages and sitemap. Use `slug` to choose its URL and `paragraphs` for its article text. This is a manually maintained collection, not a live feed. See [the newsroom integration guide](docs/NEWSROOM.md) for a copyable entry, source selection, company announcements, CMS integration and RSS/API options. No news-provider account or API key is required by the current page.

Edit `src/data/faqs.ts` to update FAQ content. Replace legal drafts with reviewed documents and update the date and indexing behavior in the legal page metadata. Draft legal pages do not claim legal approval.

Brand tokens live in `src/app/globals.css`; update `src/config/site.ts` brand references alongside them. Replace `public/icons/mark.svg` and the `Brand` component for approved branding. The current wordmark/mark is an original proposed identity. Swap local photographs in `public/images/` and retain accurate alt text. Local fonts are declared in the root layout. Asset source and license notes live alongside the assets.

## Checks and local browser verification

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
npm run start
```

Core tests check invalid/valid fields, optional company support, honeypot and length limits, WhatsApp encoding/number validation, and catalog consistency. A test-only Resend mock verifies complete owner notifications, HTML escaping, identical retry payloads, sender/reply-to handling, rejected emails and fail-closed production behavior. [Verification notes](docs/VERIFICATION.md) document the checks actually performed, including browser viewport results. Browser tests use the locally installed Chrome executable when available; no real emails are sent by automated tests. Run `npm run qa` against a local server with email credentials unset. Set `QA_ORIGIN` when using a port other than 3000. `QA_INTERACTIONS_ONLY=true` runs focused interaction/API checks after viewport checks.

## Build and deploy

Deploy to Vercel or another host supporting Next.js **server route handlers**. This app requires a Node-capable server; a plain static export will not deliver forms. On Vercel, import the repository, use the standard Next.js preset and add all production environment variables. On another Node host, install with `npm ci`, build with `npm run build` and serve with `npm run start` behind an HTTPS reverse proxy.

Before deployment, configure the verified sender, owner email, shared rate limiter and verified contact number in the hosting environment. Confirm the service catalog, team details, editorial content, company statements and legal documents. Rebuild to refresh SEO URLs and static configuration. Preview/local origins are blocked from indexing by default; production uses page-specific indexing flags.

The build script uses Next.js’s supported Webpack path because this execution environment blocks Turbopack’s worker port binding. Standard Next.js server behavior and strict type checking are retained.

Security headers disable framing and MIME sniffing and restrict device permissions. Sensitive form contents are not logged by the application. Set provider log retention and access controls appropriate to the business. Keep dependencies updated and monitor provider errors and email deliverability. Run `npm audit --omit=dev` for runtime dependencies and consult verification notes for any tooling-only advisories.

No hosting deployment, business account configuration, sender verification or live inbox delivery is implied by creating this workspace project.

## Testimonial carousel

The homepage has a responsive carousel with ten suggested testimonials in `src/data/testimonials.ts`. These are fictional drafts, clearly marked as samples in development and hidden in production until individually approved. Replace each `text` with genuine client feedback, fill in approved attribution, and set that entry’s `approved` flag to `true`. Only approved, non-empty quotes are published.

Visitors can use previous/next buttons, slide indicators, keyboard arrows/Home/End, or swipe horizontally on a phone. The carousel respects reduced-motion preferences and does not autoplay.

## PDF content update and corporate assessment

The six service categories, About profile, promotional offers and Terms of Service use the owner-supplied Website Details PDF. Edit `src/data/company-profile.ts`, `src/data/services.ts`, `src/data/promotions.ts` and `src/data/terms.ts` for the respective content. The promotion update date and disable switch are in `src/data/promotions.ts`. The Terms effective date remains tied to launch until a launch date is supplied.

The corporate assessment at `/compliance-health-check` runs in the browser, adapts to the business profile, and downloads a real PDF report without sending answers to the server. It is separate from `/health-safety-check`. Run `npm run qa:compliance` against a local server (set `QA_ORIGIN` for a different port). See [content update notes](docs/WEBSITE-CONTENT-UPDATE.md) for scoring, promotion dates, source references and verification.
