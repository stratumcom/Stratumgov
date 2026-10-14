# Stratumgov design refinement

10 October 2026

The existing Next.js site now uses Imperial Blue (#101F8F) and White Convolvulus (#F7F5F6). The canonical palette lives in `src/config/brand.ts`, is exposed as CSS custom properties through the root layout, and supplies Tailwind's semantic theme, social preview and email presentation. Existing local fonts and dependencies are retained.

## Presentation and structure

- Imperial Blue navigation and hero, soft white content sections, neutral surfaces and a complementary blue footer.
- Exact hero text: **Stratum Governance Ltd.**. Navbar and footer brand: **stratumgov**.
- Existing architectural imagery receives a restrained blue treatment. The hero has clear consultation and services links.
- Homepage order: hero, introduction, featured services, company perspective, approach, verified industries when available, insights, FAQs and consultation CTA.
- Empty industry/client and team sections stay hidden until verified data is available. Existing draft statements and proposed-service notices remain identified as such.
- Related services are grouped into governance/advisory, regulatory compliance, corporate services, and training/development. All eight original slugs, descriptions, confirmation statuses, conversion types and detail routes remain available.
- Service categories follow the broad practice-area approach in [DCSL's company profile](https://portal.dcsl.com.ng/data/resources/_1709125339_1YP42PI540.pdf), reviewed alongside [its services page](https://dcsl.com.ng/services). No DCSL wording, credentials or additional offerings were imported.

## Readability and accessibility

- Desktop navigation 16px; mobile navigation 18px; body text generally 16px, hero supporting copy 17px; supporting text at least 14px.
- Responsive headings, comfortable line heights, readable footer links and 48px form controls.
- Mobile menu retains Radix's dialog semantics, focus trapping, expanded/control relationships and Escape handling. Its close target is 44px.
- Visible focus indicators, a working skip link, active-link underlines and pressed-state category controls with a live result count.
- Long selected service names and form button labels can wrap. Form feedback uses both text and semantic alerts.
- Hero entrances and one-time section/card reveals use CSS and IntersectionObserver. Content is visible before JavaScript; reduced-motion preferences disable animation. No animation library was added.

## Preservation

API handlers, validation, business logic, service types and integrations match the original files byte for byte. Changes to forms and email templates are presentation-only. Existing tests exercise validation, WhatsApp URL generation and mocked Resend notification flows.

## Verification

- ESLint: passed.
- TypeScript: passed.
- Production build: passed.
- Existing validation/WhatsApp/catalog/email tests: passed (6 tests).
- Computed text contrast: 774 checks across 12 representative pages, zero failures. This audit covers solid backgrounds; architectural-image overlays were reviewed visually. It is not a full WCAG certification.
- Responsive layouts: passed all 200 route/viewport checks at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1600 and 1920px, including loaded images and zero horizontal overflow.
- Interaction QA: passed menu keyboard activation, expanded/control attributes, focus trapping, Escape and focus return, route navigation, FAQ search/accordion, category filters and live counts, service preselection, form validation, expected unconfigured-email feedback, API safeguards and missing-route checks.
- Final form checks: long service selections and consultation submit labels fit at nine widths from 320px to 1920px.
- Reduced motion, skip-link focus, rendered content without animation JavaScript, and browser JavaScript-error checks: passed.

The production build was repeated successfully after the final form refinements. Production QA uses an isolated local server with email credentials blank. Live delivery and confirmed business details remain dependent on the owner's configuration and review.

## Changed files

- `src/app/about/page.tsx`
- `src/app/consultation/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/faqs/page.tsx`
- `src/app/globals.css`
- `src/app/insights/[slug]/page.tsx`
- `src/app/insights/page.tsx`
- `src/app/layout.tsx`
- `src/app/loading.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/page.tsx`
- `src/app/services/[slug]/page.tsx`
- `src/app/services/page.tsx`
- `src/components/consultation/consultation-form.tsx`
- `src/components/contact/contact-form.tsx`
- `src/components/faqs/faq-accordion.tsx`
- `src/components/home/approach.tsx`
- `src/components/insights/insight-card.tsx`
- `src/components/insights/share-links.tsx`
- `src/components/layout/footer.tsx`
- `src/components/navigation/header.tsx`
- `src/components/services/service-card.tsx`
- `src/components/services/service-catalog.tsx`
- `src/components/shared/cta.tsx`
- `src/components/shared/form-field.tsx`
- `src/components/shared/legal-layout.tsx`
- `src/components/shared/page-heading.tsx`
- `src/components/shared/scroll-reveal.tsx`
- `src/components/shared/whatsapp-cta.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/textarea.tsx`
- `src/config/brand.ts`
- `src/config/site.ts`
- `src/data/services.ts`
- `src/emails/notification-layout.tsx`
- `public/icons/mark.svg`
- `scripts/browser-qa.mjs`

Screenshots and contrast results are in `docs/preview/`.

No regressions were found in the completed checks. Real notification delivery was not sent during QA; mocked Resend tests passed.
