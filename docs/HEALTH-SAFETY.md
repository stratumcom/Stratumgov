# Health & Safety Compliance Health Check

The homepage introduces the assessment immediately after the service overview.
Its “Take the Health & Safety Test” link opens `/health-safety-check`.
The feature uses the existing brand tokens, typography, responsive utilities,
shared button, container, and page heading. No additional dependencies are needed.

## Review locally

Run `npm run dev`, open `http://localhost:3000`, and find the new homepage section.
Start the test, select answers, use Previous to edit an answer, and view results
after question 10. Retake returns to the introduction and clears all answers.
Answers exist only in React state; refreshing or leaving resets the assessment.
No personal information is collected and no answers are submitted to an API.

## Scoring and recommendations

Each of the 10 questions has four answers: established (3 points), partial
(1 point), missing (0 points), and unsure (0 points). The percentage is the
rounded total divided by 30. Indicative bands are:

- 80–100%: strong reported foundation.
- 50–79%: improvements need attention.
- 0–49%: significant gaps or unknowns to address.

An unsure answer triggers verification, rather than a claim that a control is
absent. Established answers appear as reported strengths. Other answers produce
topic-specific gaps and actions. Serious concern flags are attached to specific
answers about missing risk controls, training, emergency arrangements, first aid,
and safe equipment. They override the results heading and take priority in the
recommendations even when the score is high.

The questions draw on ILO guidance linked in the results screen. The scoring is
specific to this feature and is not an ILO rating or a validated audit standard.
The assessment states that it cannot certify safety or legal compliance and
cannot replace a formal audit or professional advice.

## Source files

- `src/app/page.tsx`: inserts the homepage section.
- `src/components/home/health-safety-section.tsx`: homepage explanation and link.
- `src/app/health-safety-check/page.tsx`: route, metadata, and page layout.
- `src/components/health-safety/`: state controller, question, progress, results,
  and reusable assessment notice.
- `src/data/health-safety-questions.ts`: questions, answer-specific serious
  concerns, strengths, recommendations, and guidance links.
- `src/types/health-safety.ts`: shared TypeScript contracts.
- `src/lib/health-safety/scoring.ts`: answer validation and score calculation.
- `src/lib/health-safety/recommendations.ts`: strengths, gaps, concern priority,
  recommendation ordering, and result summaries.
- `src/app/sitemap.ts`: includes the new route.
- `tests/health-safety.test.ts`: scoring, unknowns, boundaries, changing answers,
  incomplete answers, and serious concerns independent of score.
- `scripts/health-safety-qa.mjs`: browser flow, keyboard controls, navigation,
  answer retention, retake reset, results, and responsive checks.
- `scripts/browser-qa.mjs`: waits for contact and consultation error messages
  to render after their responses, avoiding premature regression assertions.
- `package.json`: includes the new tests in `npm test` and adds
  `npm run qa:health-safety`.

## Verification commands

Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.
With a local server running, run `npm run qa:health-safety`. The browser check
uses Chrome at `/usr/bin/google-chrome` or the executable specified by
`CHROME_PATH`; use `QA_ORIGIN` to point it at a different local server.
It checks widths of 320, 375, 768, and 1280 pixels and saves homepage section,
question, and results screenshots in `docs/preview/health-safety/`.

The existing `npm run qa` also covers navigation, FAQ search, service filters,
contact/consultation validation, API safeguards, and unknown routes. It expects
email delivery to be unconfigured; run its server with `RESEND_API_KEY=''`
and `RESEND_SENDER_VERIFIED=false` so verification cannot send real mail.
Use `QA_INTERACTIONS_ONLY=true npm run qa` to run those interaction checks
without replacing the existing homepage screenshots.

Verified on 14 October 2026: typecheck, lint, production build, all 15 automated
tests (including eight assessment tests), assessment browser QA at four widths,
and the existing browser interaction checks all passed. The existing checks
also verified long service selections and form labels at nine screen widths.
No browser JavaScript errors were observed. No changes were pushed or deployed,
and no GitHub configuration was changed.
