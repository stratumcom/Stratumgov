export const newsroomCategories = [
  "Regulatory updates",
  "Governance",
  "Data protection",
  "Company news",
] as const;

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  paragraphs: string[];
  category: (typeof newsroomCategories)[number];
  source: string;
  date: string;
  /** Optional attribution link; story navigation always uses /news/[slug]. */
  sourceUrl?: string;
  featured?: boolean;
  published: boolean;
}

/** Manually curated and source-checked on 10 October 2026; not an automatic feed. */
export const newsroomArticles: NewsArticle[] = [
  {
    id: "frc-isar-recognition-2026",
    slug: "frc-reporting-platform-receives-international-isar-recognition",
    title: "FRC reporting platform receives international ISAR recognition",
    summary:
      "The Financial Reporting Council reports that its corporate reporting knowledge and digital platform received ISAR Honours. The initiative supports technical learning, reporting tools and the development of financial and sustainability disclosures in Nigeria.",
    category: "Governance",
    paragraphs: [
      "According to the Council’s announcement, the recognised initiative brings together corporate reporting knowledge and digital resources. Its focus includes technical learning and tools for financial and sustainability reporting.",
      "The announcement places the recognition in the context of developing reporting capacity in Nigeria. It highlights the role of accessible knowledge and practical resources in supporting the preparation of corporate disclosures.",
    ],
    source: "FRC Nigeria",
    date: "2026-10-01",
    sourceUrl:
      "https://frcnigeria.gov.ng/2026/10/01/frc-wins-isar-honours-for-second-consecutive-year-elevates-nigerias-global-corporate-reporting-profile/",
    featured: true,
    published: true,
  },
  {
    id: "cac-beneficial-ownership-training-2026",
    slug: "cac-training-on-the-beneficial-ownership-register",
    title: "CAC holds training on the Beneficial Ownership Register",
    summary:
      "The Corporate Affairs Commission announced training for journalists and civil society organisations on using its Beneficial Ownership Register, with a focus on corporate transparency and accountability. Find the announcement in CAC’s official news archive.",
    category: "Regulatory updates",
    paragraphs: [
      "The training announcement focuses on helping journalists and civil society organisations use the Commission’s Beneficial Ownership Register. The initiative connects access to ownership information with corporate transparency and accountability.",
      "CAC’s official news archive carries the dated announcement. It provides the source record for this update and a place to follow the Commission’s other corporate-registration and public-information announcements.",
    ],
    source: "Corporate Affairs Commission",
    date: "2026-09-15",
    sourceUrl: "https://www.cac.gov.ng/blog",
    published: true,
  },
  {
    id: "frc-audit-ai-summit-2026",
    slug: "audit-integrity-and-ai-at-frc-leadership-summit",
    title: "Audit integrity and AI take centre stage at FRC summit",
    summary:
      "FRC’s 2026 Audit and Assurance Leadership Summit explored how artificial intelligence is changing audit work, alongside the importance of professional judgement, independence, accountability and trustworthy financial reporting.",
    category: "Governance",
    paragraphs: [
      "The Council’s account of the summit considers the opportunities that artificial intelligence brings to audit and assurance work. Alongside those opportunities, the discussion emphasises the professional judgement and independence needed to maintain confidence in reporting.",
      "Accountability and audit integrity remain central themes in the report. The summit connects the use of emerging technology with the continuing responsibility of professionals to support trustworthy financial information.",
    ],
    source: "FRC Nigeria",
    date: "2026-08-15",
    sourceUrl:
      "https://frcnigeria.gov.ng/2026/08/15/frc-hosts-2026-audit-and-assurance-leadership-summit-on-strengthening-audit-integrity-in-the-ai-era/",
    published: true,
  },
  {
    id: "frc-sustainability-reporting-2026",
    slug: "frc-highlights-the-business-value-of-sustainability-reporting",
    title: "FRC highlights the business value of sustainability reporting",
    summary:
      "At the Nigeria Employers’ Summit, FRC discussed how sustainability disclosures can help businesses explain risks, build stakeholder trust and support access to finance. The official report sets out the Council’s perspective on reporting and competitiveness.",
    category: "Governance",
    paragraphs: [
      "The Council’s report from the Nigeria Employers’ Summit links sustainability disclosure with competitiveness and access to finance. It describes reporting as a way for businesses to communicate risks and give stakeholders a clearer view of their activities.",
      "Trust and transparency are recurring themes in the announcement. The report presents sustainability information as part of a broader conversation about how organisations explain their performance and build confidence with stakeholders.",
    ],
    source: "FRC Nigeria",
    date: "2026-07-01",
    sourceUrl:
      "https://frcnigeria.gov.ng/2026/07/01/sustainability-reporting-key-to-competitiveness-access-to-finance-dr-olowo-tells-employers-summit/",
    published: true,
  },
  {
    id: "frc-audit-assurance-register-2026",
    slug: "frc-national-audit-and-assurance-firms-register",
    title: "FRC announces its national audit and assurance firms register",
    summary:
      "The Council’s announcement introduces its national register and explains the registration checks it expects reporting entities to make when appointing audit and assurance providers. The original notice includes links to the relevant registers.",
    category: "Regulatory updates",
    paragraphs: [
      "FRC’s notice introduces a national register for audit and assurance firms. It also sets out the Council’s expectations for reporting entities checking the registration status of providers they intend to appoint.",
      "The original announcement includes links to the relevant registers. Readers can use that source to review the Council’s wording and locate the registration information referenced in the notice.",
    ],
    source: "FRC Nigeria",
    date: "2026-04-19",
    sourceUrl:
      "https://frcnigeria.gov.ng/2026/04/19/frc-launches-national-audit-and-assurance-firms-register-bars-unregistered-firms-from-practice/",
    published: true,
  },
  {
    id: "ndpc-compliance-audit-returns-2026",
    slug: "ndpc-compliance-audit-returns-and-corporate-risk",
    title: "NDPC discusses compliance audit returns and corporate risk",
    summary:
      "The Nigeria Data Protection Commission’s third IMPACT session examined compliance audit returns, accountability and risk management. Speakers also discussed internal audits and collaboration between organisations and data protection compliance professionals.",
    category: "Data protection",
    paragraphs: [
      "The Commission’s report on its third IMPACT session places compliance audit returns within a wider discussion of accountability and corporate risk management. The session also considers the part that internal audits play in reviewing an organisation’s practices.",
      "Collaboration between organisations and data protection compliance professionals is another theme in the report. The discussion connects audit activity with a clearer understanding of responsibilities and risk.",
    ],
    source: "Nigeria Data Protection Commission",
    date: "2026-04-10",
    sourceUrl:
      "https://www.ndpc.gov.ng/ndpc-hosts-3rd-impact-initiative-positions-compliance-audit-returns-as-key-to-corporate-risk-management/",
    published: true,
  },
];

export function getPublishedNews() {
  return newsroomArticles
    .filter((article) => article.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsArticle(slug: string) {
  return newsroomArticles.find(
    (article) => article.published && article.slug === slug,
  );
}

export const newsSources = [
  {
    name: "Corporate Affairs Commission",
    articleSource: "Corporate Affairs Commission",
    abbreviation: "CAC",
    description: "Company registration, corporate records and public notices.",
    url: "https://www.cac.gov.ng/blog",
  },
  {
    name: "Financial Reporting Council",
    articleSource: "FRC Nigeria",
    abbreviation: "FRC",
    description: "Governance, financial reporting and sustainability updates.",
    url: "https://frcnigeria.gov.ng/posts/",
  },
  {
    name: "Nigeria Data Protection Commission",
    articleSource: "Nigeria Data Protection Commission",
    abbreviation: "NDPC",
    description: "Privacy, data protection and compliance developments.",
    url: "https://www.ndpc.gov.ng/",
  },
];
