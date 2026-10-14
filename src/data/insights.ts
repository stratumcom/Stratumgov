export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  sample: boolean;
  image: string;
  readingTime: string;
  sections: { heading: string; paragraphs: string[] }[];
}
export const insights: Insight[] = [
  {
    slug: "a-more-organized-approach-to-compliance",
    title: "A more organized approach to corporate compliance",
    excerpt:
      "A practical starting point for bringing responsibilities, records and recurring tasks into focus.",
    category: "Compliance",
    tags: ["Planning", "Corporate records"],
    author: "Sample editorial",
    date: "2026-10-09",
    sample: true,
    image: "/images/architecture.jpg",
    readingTime: "4 min read",
    sections: [
      {
        heading: "Begin with a clear picture",
        paragraphs: [
          "An organized compliance process starts with understanding the business: how it operates, who makes decisions and where its records live. A simple inventory can reveal where information is scattered and which responsibilities need a clearer owner.",
          "This sample article offers general organizational ideas. It is not a verified company publication or legal advice, and it does not describe current regulatory requirements.",
        ],
      },
      {
        heading: "Give each task an owner",
        paragraphs: [
          "For each recurring task, record the responsible person, the source of the requirement, the supporting documents and the next review date. Verify requirements with a qualified adviser rather than relying on an assumed deadline.",
        ],
      },
      {
        heading: "Make review part of the routine",
        paragraphs: [
          "A short, regular review can help a team track open questions and changing business activities. Keep the record usable: it should help people act, not become another document nobody opens.",
        ],
      },
    ],
  },
  {
    slug: "governance-beyond-the-boardroom",
    title: "Good governance starts beyond the boardroom",
    excerpt:
      "Why clear roles and everyday decisions matter to a more accountable organization.",
    category: "Governance",
    tags: ["Leadership", "Accountability"],
    author: "Sample editorial",
    date: "2026-10-09",
    sample: true,
    image: "/images/meeting.jpg",
    readingTime: "3 min read",
    sections: [
      {
        heading: "Clarity in everyday decisions",
        paragraphs: [
          "Governance is reflected in the way decisions are made and recorded throughout an organization. Clear responsibilities make it easier to know who should act, who should review and when an issue should be escalated.",
          "This is sample editorial content for owner review, not a verified publication or a statement of legal requirements.",
        ],
      },
      {
        heading: "Build a useful decision record",
        paragraphs: [
          "A proportionate decision record captures the question, the options considered, the decision and the person responsible for carrying it out. The right level of detail depends on the organization and the decision.",
        ],
      },
      {
        heading: "Review the framework as you grow",
        paragraphs: [
          "Roles that worked for a small team may need to change as a business grows. Periodic conversations about ownership and oversight help keep the framework relevant.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-a-corporate-health-check",
    title: "Preparing for your corporate health check",
    excerpt:
      "The questions and records that can make an initial review more useful.",
    category: "Corporate services",
    tags: ["Preparation", "Reviews"],
    author: "Sample editorial",
    date: "2026-10-09",
    sample: true,
    image: "/images/workspace.jpg",
    readingTime: "3 min read",
    sections: [
      {
        heading: "Agree the question first",
        paragraphs: [
          "Before gathering records, define what the review should help you understand. A focused question makes it easier to agree the scope, identify relevant records and discuss what a useful outcome looks like.",
          "This sample editorial is a general preparation guide for review by the business owner. It is not legal advice or a confirmed description of a service offering.",
        ],
      },
      {
        heading: "Organize the available information",
        paragraphs: [
          "Prepare an inventory of available corporate documents, current processes and open questions. Share sensitive documents only through a channel agreed with your adviser, not through a general website enquiry.",
        ],
      },
      {
        heading: "Turn findings into next steps",
        paragraphs: [
          "A review is most useful when observations become prioritized actions with owners and review dates. Discuss the proposed steps and their dependencies before committing to a timeline.",
        ],
      },
    ],
  },
];
export const getInsight = (slug: string) =>
  insights.find((i) => i.slug === slug);
