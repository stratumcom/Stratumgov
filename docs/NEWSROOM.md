# Maintaining the Newsroom

The Newsroom lives at `/newsroom` and is linked from desktop navigation, mobile navigation, the footer and the sitemap. Each story has its own page at `/news/[slug]`, with the website header, article text, source attribution, sharing controls and related stories. Newsroom cards, titles and source-directory cards open these internal pages in the same tab. An optional reference link on the article page opens the original publisher separately. Insights remains the place for company perspectives and editorials.

The current collection is maintained manually in `src/data/newsroom.ts`. It does not poll a news service, scrape websites, or use a paid news API. The initial six entries were checked against official source material on 10 October 2026. Company news has a useful empty state until there is a genuine announcement to publish.

## Add an industry or regulatory story

1. Choose a relevant original announcement from a publisher such as the [Corporate Affairs Commission](https://www.cac.gov.ng/blog), [Financial Reporting Council](https://frcnigeria.gov.ng/posts/) or [Nigeria Data Protection Commission](https://www.ndpc.gov.ng/). Focus on company registration and records, governance, financial or sustainability reporting, and data protection.
2. Read the original item and record its publication date. Keep the date of publication separate from any event date or deadline mentioned in the announcement.
3. Write a short summary in your own words and keep a link to the original source. Write the article paragraphs in your own words too; do not copy a publisher’s complete article without permission.
4. Add an object to `newsroomArticles` in `src/data/newsroom.ts`. This is a template to replace with verified details, not an existing announcement:

```ts
{
  id: "your-unique-news-id",
  slug: "your-news-headline", // Creates /news/your-news-headline.
  title: "Your headline",
  summary: "Your short, original summary of the verified story.",
  paragraphs: [
    "Your first original article paragraph.",
    "Your second original article paragraph.",
  ],
  category: "Regulatory updates",
  source: "Original publisher name",
  date: "2026-10-10", // Replace with the source's actual publication date.
  sourceUrl: "https://publisher.example/original-story", // Optional attribution link.
  featured: false,
  published: false,
},
```

5. Use one of the supported categories: `Regulatory updates`, `Governance`, `Data protection`, or `Company news`. Each item needs a unique `id`, a unique lowercase `slug` using words separated by hyphens, and an ISO date in `YYYY-MM-DD` format. The slug is the last part of the internal article address; keep it stable after publishing.
6. Set `published: true` when the entry is ready. Set `featured: true` for a story you want highlighted. If several stories are featured, the newest one is used. Drafts with `published: false` are excluded from the listing, article routes and sitemap. Unknown or unpublished slugs return 404.
7. Check `/newsroom` and the new `/news/your-news-headline` page locally. Items sort automatically by publication date, and the search/topic controls use the new item without additional code.
8. Run `npm run typecheck` and `npm run build`, then redeploy your site. Local edits become visible in development immediately; production data is part of the build and does not update until deployment.

The CAC entry currently links to the official news archive, which contains the dated announcement. Replace it with a direct official article URL when one is available.

## Publish your own company announcements

Use `Company news` and your actual company name as the source. Add the headline, summary and complete original paragraphs directly to `src/data/newsroom.ts`; the matching `/news/[slug]` page is created automatically. You can omit `sourceUrl` for your own announcement. Set `published: true` only after approving the content.

## Your domain and article addresses

Links use relative paths such as `/news/frc-reporting-platform-receives-international-isar-recognition`. During local development the browser opens `http://localhost:3000/news/...`. When deployed on `stratumgov.com`, the same link opens `https://stratumgov.com/news/...` and the story stays on your website.

The site uses localhost in development and Vercel's automatically provided production domain after deployment. Canonical metadata, the sitemap and sharing URLs follow that domain without a site URL variable. To use `stratumgov.com`, configure it in Vercel's domain settings; the domain must point to the deployment.

## Edit through a CMS instead of code

A CMS gives your team an editor where they can write and publish stories without editing TypeScript. This requires a separate integration; there is no CMS or admin login in the current website.

The implementation would define news fields matching `NewsArticle`, retrieve only published entries in a server-side loader, and pass those entries to the existing `NewsroomList`. Keep private CMS keys in server environment variables. Cache the content and refresh it periodically or when a signed publishing webhook arrives. Source attribution, categories, search and card rendering can remain in place.

## Bring in an automatic RSS or API feed

An RSS feed is a publisher's machine-readable list of new stories. A news API supplies structured results through an endpoint. Both require checking that the selected publisher actually provides a supported feed or API and permits its intended use; the current source links are not feed endpoints.

The integration would:

1. Fetch from an approved list of publisher feed/API URLs on the server. Keep API keys server-side, if required.
2. Parse each response, validate it, and map titles, unique slugs, original summaries and paragraphs, source names, publication dates and attribution links into `NewsArticle` objects. Treat upstream text as untrusted plain text rather than inserting raw publisher HTML.
3. Deduplicate by original URL or publisher ID, exclude future or malformed dates, and filter for relevant corporate compliance, governance, reporting and data-protection topics.
4. Cache the result and refresh periodically. A one-hour cache is a possible starting point, rather than requesting every publisher on every visitor's page load. Next.js supports server fetch caching and time-based revalidation; see the [official fetch reference](https://nextjs.org/docs/app/api-reference/functions/fetch).
5. Keep the last successfully fetched collection available if a provider is unavailable. The existing curated collection can be the first fallback.
6. Prefer an editorial review step for regulatory stories before publishing summaries. Provider pricing and content-use terms depend on the source; an automatic integration does not mean a paid news API is required.

Once the source is chosen, replace the local data helpers with a shared validated loader used by the listing, article pages, metadata and sitemap. `NewsroomList` already accepts a `NewsArticle[]`. The current article route uses build-time static generation and `dynamicParams: false`; a live CMS/feed integration must also revise that strategy so newly published slugs can appear without a rebuild, or trigger a rebuild on publication.

## Initial sources

The initial entries link to:

- [FRC's ISAR recognition announcement, 1 October 2026](https://frcnigeria.gov.ng/2026/10/01/frc-wins-isar-honours-for-second-consecutive-year-elevates-nigerias-global-corporate-reporting-profile/).
- [CAC's news archive, including its 15 September 2026 ownership-register training announcement](https://www.cac.gov.ng/blog).
- [FRC's report on its audit and AI summit, 15 August 2026](https://frcnigeria.gov.ng/2026/08/15/frc-hosts-2026-audit-and-assurance-leadership-summit-on-strengthening-audit-integrity-in-the-ai-era/).
- [FRC's sustainability reporting report, published 1 July 2026](https://frcnigeria.gov.ng/2026/07/01/sustainability-reporting-key-to-competitiveness-access-to-finance-dr-olowo-tells-employers-summit/).
- [FRC's audit and assurance register announcement, 19 April 2026](https://frcnigeria.gov.ng/2026/04/19/frc-launches-national-audit-and-assurance-firms-register-bars-unregistered-firms-from-practice/).
- [NDPC's compliance audit returns session report, 10 April 2026](https://www.ndpc.gov.ng/ndpc-hosts-3rd-impact-initiative-positions-compliance-audit-returns-as-key-to-corporate-risk-management/).
