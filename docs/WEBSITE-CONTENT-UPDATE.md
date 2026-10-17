# Website content update — 17 October 2026

Source: the owner's `Website Details.pdf`. Changes are local; no commit, push or deployment is part of this update.

The homepage and `/services` now present the full six-category structure, including institutional management and HR. Each category opens a detailed service page containing its source descriptions. Existing service URLs redirect permanently to the corresponding new category, and old consultation selections resolve to the current catalog. About content contains the supplied profile, four strategic focus areas and philosophy. The supplied ten-section Terms of Service replace the starter text; its effective date is stated as the website launch, since a launch date has not been supplied. This is content implementation, not a legal review of the supplied terms.

`/promotions` includes all six offers, their eligibility conditions and all four promotional terms. The offer is carried into the consultation message. Free offers waive professional fees only. No discount percentage has been invented for the annual returns offer. The document's six-month validity rule is preserved. `websiteLastUpdated` in `src/data/promotions.ts` must be updated whenever technical or content changes are released; `promotionsEnabled` can disable all offers immediately. Availability recalculates in the visitor's browser each minute, including after expiry. The current reference date is 17 October 2026, with expiry at the start of 17 April 2027 in Lagos. Availability still requires confirmation as specified by the supplied withdrawal clause.

`/compliance-health-check` is a separate corporate assessment. The existing workplace safety assessment and its homepage link are retained. No contact details, server storage or network requests are used to process answers. Answers are held in component state; the PDF is generated locally. Booking is an enquiry through the existing consultation flow, with a free strategy-session message, and is confirmed separately.

## Assessment rules

The profile asks about company type, foreign equity, foreign personnel working in Nigeria, employee count, SCUML sector classification and regulated products. The checklist has four core questions and up to eleven total, depending on the profile. Tax ID and clearance, pension arrangements and NSITF, and foreign equity and foreign personnel are assessed separately. NIPC and business-permit questions are shown for companies reporting foreign equity. NSITF appears for any reported employees; the preliminary pension question appears from three employees. Unknown sector/product applicability is flagged for clarification rather than asserted as a violation. Changing the profile clears old answers. Reverse-worded unfiled-change answers are scored in the opposite direction.

The score is the percentage of assessed items reported up to date. Unknowns count as unconfirmed, receiving no points; permitted not-yet-due responses are excluded from the denominator. A high score does not hide a reported gap. Results list strengths, potential gaps, unknowns and excluded items, with relevant service links. Missing responses prevent completion. The generated multipage PDF contains the profile, answers, findings, recommended actions, scoring explanation, scope and source links.

Official references checked for assessment logic (17 October 2026):

- [PenCom employer contribution guidance](https://www.pencom.gov.ng/wp-content/uploads/2023/08/PRESS-RELEASE-ON-OUTSTANDING-PENSION-CONTRIBUTIONS-IN-THE-ACCOUNTS-OF-PFAs-With-Guidance-Note.pdf)
- [NSITF Employees' Compensation Scheme](https://nsitf.gov.ng/compensation)
- [NIPC online services and foreign participation registration](https://nipc.gov.ng/services/service-delivery-modes/online)
- [SCUML registration and free certification](https://scuml.efcc.gov.ng/)

The assessment is preliminary, does not query agency records and does not assert universal penalties or guaranteed outcomes. It covers the selected checklist, not every tax, employment or industry obligation.

## Verification

Run `npm test`, `npm run typecheck`, `npm run build`, and `QA_ORIGIN=http://localhost:3100 npm run qa:compliance` against a local server. Browser QA covers 320, 375, 768 and 1280px layouts, all new pages, category links, conditional questions, keyboard navigation, answer review and reset, PDF download and text extraction, offer and consultation prefill, and old service redirects. Screenshots are saved in `docs/preview/compliance/`. No live email delivery is part of these checks.

Verified on 17 October 2026:

- All 21 automated tests passed across validation/catalog, mocked email delivery, workplace safety and corporate compliance suites.
- TypeScript checks and the final production build passed, generating all six service detail routes and the new promotions and corporate assessment pages.
- Corporate browser QA passed against the production build at 320, 375, 768 and 1280px. Downloaded PDFs were parsed with `pdftotext` and checked against the displayed score and NIPC findings.
- Existing browser interaction checks passed for mobile navigation, FAQ search, category filters, service preselection, form validation, unconfigured email responses, API safeguards and unknown routes. Long consultation selections fit at nine widths from 320 to 1920px.
- Browser QA reported no JavaScript page errors. No live email was sent; the local verification server used empty email credentials.
- `git diff --check` passed. No commit, push or deployment was performed.
