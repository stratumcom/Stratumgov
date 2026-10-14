# Verification — 9 October 2026

## Passed

- `npm run lint`: no errors or warnings.
- `npx tsc --noEmit`: strict type checking passes.
- `npm run build`: production Webpack build passes; all required routes are present and 27 static outputs are generated.
- `npm test`: five core tests plus one email-flow integration test pass. The email-flow test contains assertions for full notification contents, verified sender/reply-to behavior, safe HTML rendering, stable idempotency payloads, rejection handling, individual enquiries and fail-closed production behavior.
- 100 browser viewport checks: all 20 content routes at widths of 320, 375, 768, 1280 and 1920 pixels. Pages return 200, have one primary heading, load their images, and have no horizontal overflow.
- Production browser checks: mobile menu navigation and closing, FAQ search and accordion, FAQ empty search state, category filter, contact subject prefill, consultation service preselection, client validation, consent and useful unconfigured email errors.
- Server API checks: invalid input and honeypot return 400; invalid origin returns 403; unsupported content type returns 415; oversized body returns 413; unconfigured email returns 503. No false success is displayed.
- Production unknown service, article and general page paths return 404. Unknown dynamic routes are rejected using `dynamicParams: false` and the generated slug catalog.
- `/robots.txt`, `/sitemap.xml`, and `/opengraph-image` return 200.
- Browser interaction checks produce no JavaScript page errors.
- Dependency manifest and npm lockfile match.
- `npm audit --omit=dev`: **zero** runtime vulnerabilities.

Viewport checks used the local development server. Final interaction/API/404/SEO checks used an isolated `next start` production server on port 3100 with email sending disabled. The production server was stopped after checks. The final default local build uses the default localhost:3000 configuration.

Screenshots: [desktop](preview/home-desktop.png), [full desktop page](preview/home-1280.png), [full mobile page](preview/home-375.png). The first screenshot is from production; full-page images were captured during development.

## Environment and dependency notes

Turbopack compilation was blocked by this environment's internal worker port permissions. The project uses the supported `next build --webpack` path. The build required execution outside the restricted process sandbox for compiler subprocesses; type checking was retained and completed successfully. Dependencies were installed and source was generated with the official shadcn CLI. Interrupted npm downloads were repaired using the cache.

The full npm audit reports **five high-severity entries** in the Next.js ESLint dependency chain (`eslint-config-next`, `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, `braces`). They derive from the same [unpatched braces stack-exhaustion advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). These are development/lint dependencies; the runtime-only audit reports zero. Do not feed untrusted glob patterns into the lint tooling. Keep the Next.js lint packages updated when an upstream patch is released. No incompatible forced downgrade or unreviewed patch was applied.

## Requires owner configuration or external verification

Real Resend sending and inbox delivery have **not** been tested: no business credentials or verified sender were supplied. Notifications and rejection behavior were tested with a mock that intercepts all Resend requests; it sends no real email. Production shared Redis rate limiting has not been tested against a provisioned account. Its missing-configuration fail-closed behavior is verified.

Before launch, configure Resend, verified sender confirmation, the recipient/contact email, phone and WhatsApp numbers, production Redis and a trusted client IP source. Confirm proposed services and pricing approaches; replace or approve sample editorials and company statements; provide verified team/industry/contact details; obtain owner and qualified professional review of legal drafts. No real address, credentials, client testimonials, registration number or prices have been invented. No site has been deployed to external hosting.

## Testimonial carousel — 10 October 2026

Ten suggested testimonials were added as individually editable, unapproved drafts. The development preview labels them as sample wording. Unapproved entries are excluded from the production homepage, verified against the built HTML.

Lint, strict TypeScript checks, and the production build pass. Browser checks pass at 320, 375, 768, 1280 and 1920 pixels: ten slides and ten indicators, previous/next controls, Home/End/arrow-key navigation, resize alignment, reduced-motion behavior, no horizontal page overflow and no JavaScript page errors. A native mobile touch swipe also advances the visible testimonial. Run `node scripts/testimonial-qa.mjs` with a development server on port 3000 for the repeatable carousel checks.

## Header information bar and contact map — 10 October 2026

- Added a blue information strip above navigation with a welcome message and configurable location, business hours, and social profiles. Location links to the contact page's office section. Unconfigured business facts are omitted. Facebook, X, LinkedIn and Instagram icons now remain visible even without configured URLs; these are labeled placeholders until actual HTTPS profile links are supplied.
- Contact page places the enquiry form beside a contact-details sidebar on desktop, and stacks them on mobile. A confirmed office address enables a lazy-loaded Google Maps iframe and an external Maps link; an unconfigured address shows a clear location placeholder.
- Browser checks passed at 320, 375, 768, 1280, and 1920px for the current configuration and isolated sample configuration. Checked contact panel order, no horizontal overflow, four labeled social links with 44px touch targets, map URL encoding and iframe attributes, mobile menu behavior, and no application JavaScript errors. Sample business details were used only in temporary browser fixtures.
- The external Google Maps embed rendered successfully in the browser using an isolated location fixture. The actual office address and map pin still require owner confirmation.
- TypeScript, ESLint, and the complete production build passed.

Social icon visibility was subsequently checked with profile URLs unconfigured: Facebook, X, LinkedIn and Instagram are visible at 320, 375, 768, 1280 and 1920px, with no horizontal overflow or application JavaScript errors. TypeScript and ESLint pass after this visibility change.

The main navigation now uses the brand white background with blue branding, blue links, and a blue consultation button. The information bar keeps its blue background and white text/icons with its own contrast context. ESLint and browser checks passed at 320, 375, 768, 1280 and 1920px, including computed color checks, preserved social icons, no horizontal overflow, mobile menu opening/closing and no application JavaScript errors.

## Newsroom — 10 October 2026

- Added `/newsroom` to desktop/mobile navigation, footer and sitemap, with page-specific title, description and canonical metadata.
- Added six manually curated official-source news summaries dated April through October 2026. Cards preserve publisher attribution, original publication dates and HTTPS source links. The CAC story links to the official news archive containing its announcement. No company announcements or regulator requirements were invented.
- Added a featured story, newest-first ordering, topic filters, search across titles/summaries/sources/categories, combined filtering, live result counts, reset controls, a company-news empty state and official publisher links. Full external stories open at the original publisher.
- Browser checks passed at 320, 375, 768, 1280 and 1920px: page returns 200, one primary heading, six news cards, featured image loaded, publisher links have appropriate external-link attributes, canonical metadata, footer link and no horizontal overflow.
- Interaction checks passed for topic filters, combined search, no-match and company-news empty states, clear/reset actions, active desktop navigation, mobile menu route change/closure, sitemap inclusion and no application JavaScript errors.
- ESLint and strict TypeScript checks passed. Production compilation, TypeScript and all 28 static outputs completed successfully.
- Added `docs/NEWSROOM.md` with manual publishing steps, an entry template, guidance for company articles, and future CMS/RSS/API integration. No automatic feed or paid news service was connected.

## Internal news article pages — 10 October 2026

- Each of the six published stories now has its own `/news/[slug]` page with the shared website header and footer, headline, original publication date, original summary and article paragraphs, source attribution, sharing controls and related news. Newsroom titles, story buttons and source-directory cards open internal pages in the same tab. Original publisher references are separate, explicitly labeled links on the article page.
- Published stories are included in the sitemap and have canonical and article Open Graph metadata using the configured site domain. Desktop and mobile navigation keep Newsroom active on article pages. Unpublished entries are excluded from listing, article lookup, generated routes and sitemap; unknown slugs return 404.
- ESLint, strict TypeScript and the production build passed; all 34 static outputs were generated. Subsequent edits to source files were formatting only.
- Browser checks passed for all six articles at 320, 375, 768, 1280 and 1920px: HTTP 200, one primary heading, article content and source link, loaded image, three related cards, correct canonical metadata and no horizontal overflow. Desktop and mobile screenshots were visually reviewed.
- Same-tab story navigation, internal source-directory links, copy/share URLs, category filtering, active desktop/mobile navigation, mobile-menu closure, sitemap inclusion and unknown-article 404 passed. No application JavaScript errors occurred. Separate data checks confirmed unique valid slugs and exclusion of unpublished articles. No forms or real email delivery were exercised.
- Updated `docs/NEWSROOM.md` with automatic article creation from slugs and paragraphs, original company announcements, local versus production URLs, and the static-route changes required for a future CMS/feed. The site remains local; no deployment or domain configuration was performed.
