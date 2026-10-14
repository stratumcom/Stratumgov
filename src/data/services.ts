import type { Service } from "@/types/service";
export const serviceCategories = [
  {
    id: "governance",
    name: "Governance",
    title: "Governance & advisory",
    description:
      "Leadership frameworks and considered advice for your next corporate decision.",
  },
  {
    id: "compliance",
    name: "Compliance",
    title: "Regulatory compliance",
    description:
      "Understand obligations, organize recurring filings and identify priorities for review.",
  },
  {
    id: "corporate-services",
    name: "Corporate services",
    title: "Corporate services",
    description:
      "A coordinated approach to company administration, corporate records and business setup.",
  },
  {
    id: "development",
    name: "Development",
    title: "Training & development",
    description:
      "Learning discussions shaped around your team's governance and compliance needs.",
  },
] as const;

export const getServiceCategory = (name: string) =>
  serviceCategories.find((category) => category.name === name);

const proposals = [
  {
    slug: "corporate-governance",
    title: "Corporate governance & advisory",
    category: "Governance",
    icon: "governance",
    shortDescription:
      "Clear structures. Accountable leadership. Better corporate decisions.",
    description:
      "Explore a practical governance framework shaped around your organization, its leadership and its responsibilities.",
    problem:
      "Unclear responsibilities and inconsistent decision processes can make it difficult to maintain oversight.",
    deliverables: [
      "Review of governance arrangements",
      "Board and committee framework discussion",
      "Practical governance action plan",
    ],
    benefits: [
      "Clearer roles and accountability",
      "A consistent approach to decisions",
      "Practical priorities for leadership",
    ],
    conversionType: "consultation",
  },
  {
    slug: "regulatory-compliance",
    title: "Regulatory compliance",
    category: "Compliance",
    icon: "regulatory",
    shortDescription:
      "Navigate your obligations with clarity, structure and confidence.",
    description:
      "Discuss how to identify, organize and monitor the obligations relevant to your business. Applicable requirements depend on your activities and jurisdiction.",
    problem:
      "Fragmented obligations and unclear ownership can leave businesses unsure of their next steps.",
    deliverables: [
      "Discussion of relevant obligations",
      "Compliance responsibility mapping",
      "A proposed monitoring framework",
    ],
    benefits: [
      "Better visibility of obligations",
      "Clear responsibility for next steps",
      "A more organized compliance process",
    ],
    conversionType: "consultation",
  },
  {
    slug: "company-secretarial",
    title: "Company secretarial services",
    category: "Corporate services",
    icon: "secretarial",
    shortDescription:
      "Keep corporate records, meetings and administration in order.",
    description:
      "Explore support for the corporate administration that underpins effective governance, with the final scope agreed after an initial discussion.",
    problem:
      "Disorganized records and meeting administration can undermine continuity and accountability.",
    deliverables: [
      "Corporate records review",
      "Meeting administration scope",
      "A proposed records maintenance plan",
    ],
    benefits: [
      "Organized corporate information",
      "A clearer administrative workflow",
      "Better continuity across your team",
    ],
    conversionType: "whatsapp-enquiry",
  },
  {
    slug: "business-incorporation",
    title: "Incorporation & business setup",
    category: "Corporate services",
    icon: "incorporation",
    shortDescription:
      "Give your next business chapter a considered foundation.",
    description:
      "Discuss your intended business structure and the information needed to plan an incorporation or setup engagement. Availability and scope require confirmation.",
    problem:
      "Choosing a structure without understanding responsibilities can create avoidable uncertainty.",
    deliverables: [
      "Business structure discussion",
      "Document preparation checklist",
      "Agreed setup roadmap",
    ],
    benefits: [
      "A clearer starting point",
      "An organized preparation process",
      "A scope aligned with your plans",
    ],
    conversionType: "whatsapp-payment",
  },
  {
    slug: "statutory-filings",
    title: "Corporate filings & obligations",
    category: "Compliance",
    icon: "filings",
    shortDescription:
      "Bring structure to recurring filings and corporate obligations.",
    description:
      "Explore a coordinated approach to tracking corporate filing requirements. Deadlines and filing requirements must be verified for each engagement.",
    problem:
      "Untracked recurring obligations make planning and document preparation more difficult.",
    deliverables: [
      "Obligations inventory discussion",
      "Document readiness checklist",
      "Proposed filing calendar",
    ],
    benefits: [
      "Improved visibility of recurring work",
      "Better document preparation",
      "Clear ownership of filing tasks",
    ],
    conversionType: "whatsapp-enquiry",
  },
  {
    slug: "compliance-health-check",
    title: "Corporate compliance health check",
    category: "Compliance",
    icon: "review",
    shortDescription:
      "Understand where you stand and what deserves attention next.",
    description:
      "Discuss a focused review of your corporate compliance arrangements, followed by practical priorities suited to the agreed scope.",
    problem:
      "Without a structured review, gaps in records and processes can be hard to identify.",
    deliverables: [
      "Agreed review checklist",
      "Findings and priorities discussion",
      "Recommended next steps",
    ],
    benefits: [
      "A clearer view of current processes",
      "Focused improvement priorities",
      "A practical basis for action",
    ],
    conversionType: "consultation",
  },
  {
    slug: "professional-training",
    title: "Training & development",
    category: "Development",
    icon: "training",
    shortDescription:
      "Build a shared understanding of governance and compliance.",
    description:
      "Explore tailored learning sessions for leadership and teams. Topics, facilitators, availability and delivery format are agreed before booking.",
    problem:
      "Different levels of understanding can make consistent implementation difficult.",
    deliverables: [
      "Learning needs discussion",
      "Proposed session outline",
      "Agreed delivery format",
    ],
    benefits: [
      "A shared vocabulary",
      "More informed internal conversations",
      "Learning aligned with your team",
    ],
    conversionType: "consultation",
  },
  {
    slug: "business-advisory",
    title: "Business & corporate advisory",
    category: "Governance",
    icon: "advisory",
    shortDescription:
      "A thoughtful perspective on your next corporate decision.",
    description:
      "Start a conversation about the corporate challenges facing your business and confirm whether an advisory engagement is appropriate.",
    problem:
      "Complex corporate decisions often need a clear problem definition and organized options.",
    deliverables: [
      "Initial needs assessment",
      "Agreed advisory scope",
      "Documented recommendations",
    ],
    benefits: [
      "A clearer understanding of options",
      "Structured priorities",
      "Advice shaped around an agreed brief",
    ],
    conversionType: "consultation",
  },
] satisfies Pick<
  Service,
  | "slug"
  | "title"
  | "category"
  | "icon"
  | "shortDescription"
  | "description"
  | "problem"
  | "deliverables"
  | "benefits"
  | "conversionType"
>[];
export const services: Service[] = proposals.map((s, i) => ({
  ...s,
  id: `service-${i + 1}`,
  featured: i < 3,
  active: true,
  confirmed: false,
  pricingLabel: "Scope and fees agreed after enquiry",
  faqs: [
    {
      question: "How is the scope of work agreed?",
      answer:
        "The first conversation helps define your needs. Availability, deliverables, timelines and fees are confirmed in writing before an engagement begins.",
    },
    {
      question: "What should I prepare for an initial discussion?",
      answer:
        "A brief overview of your organization, the issue you want to address and any relevant deadlines is a useful starting point. Please do not submit confidential documents through the enquiry form.",
    },
  ],
}));
export const activeServices = services.filter((s) => s.active);
export const getService = (slug: string) =>
  activeServices.find((s) => s.slug === slug);
