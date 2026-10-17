import type { Service } from "@/types/service";
import serviceAliases from "./service-aliases.json";

export const serviceCategories = [
  {
    id: "company-formation-market-entry",
    name: "Formation & market entry",
    title: "Company Formation & Market Entry Structuring",
    description:
      "We deliver end-to-end legal architecture and operational roadmaps for domestic entrepreneurs, non-profit organizations, and international entities entering the Nigerian economic market.",
  },
  {
    id: "corporate-restructuring",
    name: "Corporate restructuring",
    title: "Corporate Restructuring & Post-Incorporation Modifications",
    description:
      "We manage the structural variations, equity expansions, and statutory constitutional updates filed officially to reflect your company's growth, financing rounds, or rebranding.",
  },
  {
    id: "institutional-management-hr",
    name: "Management & HR",
    title:
      "Institutional Management, Human Resources (HR) Procedures & Work Policies",
    description:
      "We provide expert, internal management consulting to architect your company's internal operational environment. These are proprietary, tailored solutions executed directly within your organization.",
  },
  {
    id: "intellectual-property-protection",
    name: "Brand & intellectual property",
    title: "Brand Architecture & Intellectual Property Protection",
    description:
      "We translate your commercial branding, hardware mechanics, and software systems into legally protected, monetizable corporate assets.",
  },
  {
    id: "statutory-compliance-maintenance",
    name: "Statutory compliance",
    title: "Statutory Compliance & Global Corporate Maintenance",
    description:
      "We manage your daily, quarterly, and annual maintenance obligations, ensuring your corporate entity remains in good standing across all federal databases and banking institutions.",
  },
  {
    id: "product-registration-licensing",
    name: "Product & industry licensing",
    title: "Product Registration & Specialized Industry Licensing",
    description:
      "We break down the regulatory bottlenecks preventing your products from reaching retail shelves or passing through international custom borders safely.",
  },
] as const;

export const getServiceCategory = (name: string) =>
  serviceCategories.find((category) => category.name === name);

export const services: Service[] = [
  {
    id: "service-1",
    slug: "company-formation-market-entry",
    title: "Company Formation & Market Entry Structuring",
    category: "Formation & market entry",
    icon: "incorporation",
    shortDescription:
      "Launch your corporate vehicle with flawless structural planning. We manage end-to-end Corporate Affairs Commission (CAC) incorporations for domestic and foreign-participating entities, secure federal investment approvals, and handle immediate fiscal activation. Build your business on a legally secure foundation from day one.",
    description:
      "We deliver end-to-end legal architecture and operational roadmaps for domestic entrepreneurs, non-profit organizations, and international entities entering the Nigerian economic market.",
    offerings: [
      {
        title: "New Company Incorporation & Business Name Registration",
        description:
          "Structural setup of Private Limited Liability Companies (Ltd), Public Limited Liability Companies (Plc), and Limited Liability Partnerships (LLP) and Business Name registration via the Corporate Affairs Commission (CAC)—engineered to accommodate domestic founders and complex foreign participation structures.",
      },
      {
        title: "Foreign Investment Onboarding",
        description:
          "Processing and securing formal Business Registration Certificates with the Nigerian Investment Promotion Commission (NIPC) for foreign-owned or joint-venture enterprises.",
      },
      {
        title: "Global Workforce Onboarding & Immigration",
        description:
          "Managing applications for Business Permits, Expatriate Quota Allocations, Subject-to-Regularization (STR) Visas, and Combined Expatriate Residence Permit and Aliens Cards (CERPAC) documentation through the Ministry of Interior.",
      },
      {
        title: "Initial Fiscal Activation",
        description:
          "Rapid generation of your corporate Tax ID and Value Added Tax (VAT) registration via the Nigerian Revenue Service and States’ IRS portals.",
      },
      {
        title: "Market Entry Documentation",
        description:
          "Preparation of high-tier business proposals, investor-ready pitch decks, and commercial feasibility studies for local market penetration.",
      },
    ],
    problem: "",
    deliverables: [
      "New Company Incorporation & Business Name Registration",
      "Foreign Investment Onboarding",
      "Global Workforce Onboarding & Immigration",
      "Initial Fiscal Activation",
      "Market Entry Documentation",
    ],
    benefits: [],
    conversionType: "consultation",
    featured: true,
    active: true,
    confirmed: true,
    pricingLabel:
      "Professional fees and government levies are itemized in your quote.",
    actionLabel: "Secure your market entry structure",
    faqs: [
      {
        question: "How do we begin?",
        answer:
          "Book a consultation to discuss your structure, documents and priorities. We confirm the scope, requirements, professional fees and government levies before work begins.",
      },
      {
        question: "Are processing timelines guaranteed?",
        answer:
          "Timelines depend on document readiness and the relevant agencies. We explain expected turnaround times and communicate regulatory queries or portal delays.",
      },
    ],
  },
  {
    id: "service-2",
    slug: "corporate-restructuring",
    title: "Corporate Restructuring & Post-Incorporation Modifications",
    category: "Corporate restructuring",
    icon: "secretarial",
    shortDescription:
      "As your business scales, your corporate profile must adapt. We execute strategic share capital adjustments, handle high-level board re-configurations, process official constitutional alterations, and deliver seamless corporate entity conversions to accommodate new investments.",
    description:
      "We manage the structural variations, equity expansions, and statutory constitutional updates filed officially to reflect your company's growth, financing rounds, or rebranding.",
    offerings: [
      {
        title: "Corporate Rebranding & Name Changes",
        description:
          "Drafting Special Board Resolutions, filing for name reservations, processing consent approvals for restricted words with the Corporate Affairs Commission (CAC), and executing clean changes of corporate identity.",
      },
      {
        title: "Equity & Share Capital Adjustments",
        description:
          "Processing post-incorporation share capital increases, capital reductions, structural share allotments, and designing multi-class share options for venture capital onboarding on the Corporate Affairs Commission (CAC) portal.",
      },
      {
        title: "Board & Secretarial Governance Updates",
        description:
          "Structuring and filing official updates for the appointment, retirement, or legal removal of corporate Directors, Board Chairpersons, and accredited Company Secretaries.",
      },
      {
        title: "Constitutional & MEMART Alterations",
        description:
          "Drafting Special Resolutions to review, rewrite, and amend the Memorandum and Articles of Association (MEMART) to alter business objects, introduce director restrictions, or adjust internal bylaws.",
      },
      {
        title: "Corporate Conversions",
        description:
          "Processing complex transitions, including transforming a private entity into a public entity (Ltd to Plc), or converting to a Company Limited by Guarantee (Ltd/GTE).",
      },
    ],
    problem: "",
    deliverables: [
      "Corporate Rebranding & Name Changes",
      "Equity & Share Capital Adjustments",
      "Board & Secretarial Governance Updates",
      "Constitutional & MEMART Alterations",
      "Corporate Conversions",
    ],
    benefits: [],
    conversionType: "consultation",
    featured: true,
    active: true,
    confirmed: true,
    pricingLabel:
      "Professional fees and government levies are itemized in your quote.",
    actionLabel: "Manage your corporate restructuring",
    faqs: [
      {
        question: "How do we begin?",
        answer:
          "Book a consultation to discuss your structure, documents and priorities. We confirm the scope, requirements, professional fees and government levies before work begins.",
      },
      {
        question: "Are processing timelines guaranteed?",
        answer:
          "Timelines depend on document readiness and the relevant agencies. We explain expected turnaround times and communicate regulatory queries or portal delays.",
      },
    ],
  },
  {
    id: "service-3",
    slug: "institutional-management-hr",
    title:
      "Institutional Management, Human Resources (HR) Procedures & Work Policies",
    category: "Management & HR",
    icon: "governance",
    shortDescription:
      "Build a high-performance organization with structurally sound internal frameworks. We design custom corporate organograms, formulate compliant workplace policies, and craft strategic Employee Handbooks that shield your business from internal operational liabilities and labor risks.",
    description:
      "We provide expert, internal management consulting to architect your company's internal operational environment. These are proprietary, tailored solutions executed directly within your organization.",
    offerings: [
      {
        title: "Corporate Management & Administrative Structuring",
        description:
          "Designing optimal corporate organograms, defining lines of reporting, establishing administrative control structures, and engineering corporate governance workflows for functional accountability.",
      },
      {
        title: "Workplace Policy Formulation",
        description:
          "Developing operational codes of conduct, remote work policies, data protection guidelines, non-disclosure agreements, and operational health and safety protocols tailored to your industry.",
      },
      {
        title: "Human Resources (HR) Infrastructure",
        description:
          "Designing robust recruitment frameworks, performance appraisal systems, and structural disciplinary workflows.",
      },
      {
        title: "Custom Employee Handbooks",
        description:
          "Drafting comprehensive handbooks outlining employee benefits, leave policies, company values, and standardized resolution procedures for internal disputes to prevent labor friction.",
      },
    ],
    problem: "",
    deliverables: [
      "Corporate Management & Administrative Structuring",
      "Workplace Policy Formulation",
      "Human Resources (HR) Infrastructure",
      "Custom Employee Handbooks",
    ],
    benefits: [],
    conversionType: "consultation",
    featured: true,
    active: true,
    confirmed: true,
    pricingLabel:
      "Professional fees and government levies are itemized in your quote.",
    actionLabel: "Optimize your internal management",
    faqs: [
      {
        question: "How do we begin?",
        answer:
          "Book a consultation to discuss your structure, documents and priorities. We confirm the scope, requirements, professional fees and government levies before work begins.",
      },
      {
        question: "Are processing timelines guaranteed?",
        answer:
          "Timelines depend on document readiness and the relevant agencies. We explain expected turnaround times and communicate regulatory queries or portal delays.",
      },
    ],
  },
  {
    id: "service-4",
    slug: "intellectual-property-protection",
    title: "Brand Architecture & Intellectual Property Protection",
    category: "Brand & intellectual property",
    icon: "review",
    shortDescription:
      "Your brand equity, technological innovations, and proprietary designs are your ultimate commercial assets. We deliver statutory protection frameworks through aggressive trademarking, patent procurement, and industrial design insulation at the federal level to turn your ideas into legally defensible equity.",
    description:
      "We translate your commercial branding, hardware mechanics, and software systems into legally protected, monetizable corporate assets.",
    offerings: [
      {
        title: "Statutory Trademark Protection",
        description:
          "Executing rigorous availability searches, managing index filings, and securing formal Trademark Certificates for brand names, corporate logos, unique catchphrases, and product slogans at the Ministry of Trade and Investment.",
      },
      {
        title: "Patents & Industrial Designs",
        description:
          "Processing federal patent applications to secure exclusive exploitation rights for physical mechanisms, proprietary software algorithms, and unique visual industrial shapes through the Intellectual Property (IP) Registry.",
      },
    ],
    problem: "",
    deliverables: [
      "Statutory Trademark Protection",
      "Patents & Industrial Designs",
    ],
    benefits: [],
    conversionType: "consultation",
    featured: true,
    active: true,
    confirmed: true,
    pricingLabel:
      "Professional fees and government levies are itemized in your quote.",
    actionLabel: "Shield your intellectual property",
    faqs: [
      {
        question: "How do we begin?",
        answer:
          "Book a consultation to discuss your structure, documents and priorities. We confirm the scope, requirements, professional fees and government levies before work begins.",
      },
      {
        question: "Are processing timelines guaranteed?",
        answer:
          "Timelines depend on document readiness and the relevant agencies. We explain expected turnaround times and communicate regulatory queries or portal delays.",
      },
    ],
  },
  {
    id: "service-5",
    slug: "statutory-compliance-maintenance",
    title: "Statutory Compliance & Global Corporate Maintenance",
    category: "Statutory compliance",
    icon: "regulatory",
    shortDescription:
      "Insulate your enterprise from severe regulatory sanctions and operational shutdowns. We manage your full corporate status lifecycles, handle anti-money laundering certifications, secure cross-border capital repatriation channels, and administer comprehensive workspace social safety net bundles.",
    description:
      "We manage your daily, quarterly, and annual maintenance obligations, ensuring your corporate entity remains in good standing across all federal databases and banking institutions.",
    offerings: [
      {
        title: "CAC Annual Returns & Status Maintenance",
        description:
          "drafting mandatory returns, and executing timely portal updates to maintain an active, un-queried corporate status with the Corporate Affairs Commission (CAC).",
      },
      {
        title: "Financial Integrity & Anti-Money Laundering Certification",
        description:
          "Strategic onboarding and certification with the Special Control Unit Against Money Laundering (SCUML) under the Economic and Financial Crimes Commission (EFCC) for Designated Non-Financial Businesses and Professions (DNFBPs), unlocking restricted corporate banking channels.",
      },
      {
        title: "Project Financing Advisory & Capital Repatriation",
        description:
          "Structuring cross-border capital arrangements, debt-to-equity syndication frameworks, and advising on project finance models. Processing Certificates of Capital Importation (CCI) through Authorized Dealers to guarantee the frictionless, unconditional repatriation of foreign capital, dividends, and profits under Central Bank of Nigeria (CBN) regulations.",
      },
      {
        title: "Workspace Compliance Bundles",
        description:
          "End-to-end administration, payroll adjustments, and official clearance acquisitions for mandatory employee social welfare schemes: ○ PenCom: Registration and statutory remittance tracking with the National Pension Commission (PenCom) under the Pension Reform Act. ○ NSITF: Employee workplace safety insurance onboarding under the Nigeria Social Insurance Trust Fund (NSITF). ○ ITF: Regulatory remittance and human capital training verification with the Industrial Training Fund (ITF).",
      },
    ],
    problem: "",
    deliverables: [
      "CAC Annual Returns & Status Maintenance",
      "Financial Integrity & Anti-Money Laundering Certification",
      "Project Financing Advisory & Capital Repatriation",
      "Workspace Compliance Bundles",
    ],
    benefits: [],
    conversionType: "consultation",
    featured: true,
    active: true,
    confirmed: true,
    pricingLabel:
      "Professional fees and government levies are itemized in your quote.",
    actionLabel: "Maintain corporate compliance",
    faqs: [
      {
        question: "How do we begin?",
        answer:
          "Book a consultation to discuss your structure, documents and priorities. We confirm the scope, requirements, professional fees and government levies before work begins.",
      },
      {
        question: "Are processing timelines guaranteed?",
        answer:
          "Timelines depend on document readiness and the relevant agencies. We explain expected turnaround times and communicate regulatory queries or portal delays.",
      },
    ],
  },
  {
    id: "service-6",
    slug: "product-registration-licensing",
    title: "Product Registration & Specialized Industry Licensing",
    category: "Product & industry licensing",
    icon: "filings",
    shortDescription:
      "Navigate complex regulatory hurdles to bring your products to market safely and legally. We manage complete lab tests, factory audits, and compliance certifications required to secure high-tier government clearances for food, consumables, and manufactured goods.",
    description:
      "We break down the regulatory bottlenecks preventing your products from reaching retail shelves or passing through international custom borders safely.",
    offerings: [
      {
        title: "NAFDAC Product Certification",
        description:
          "Complete management of laboratory testing protocols, compliance documentation drafting, and veterinary/product factory audits required to secure official registration numbers from the National Agency for Food and Drug Administration and Control (NAFDAC) for foods, drugs, cosmetics, medical hardware, and agro-chemicals.",
      },
      {
        title: "SON Certification & Product Conformity",
        description:
          "Managing standard product conformity assessments, Standards Organisation of Nigeria Conformity Assessment Programme (SONCAP) processing, and mandatory factory certifications for local and imported non-consumable manufactured goods via the Standards Organisation of Nigeria (SON).",
      },
    ],
    problem: "",
    deliverables: [
      "NAFDAC Product Certification",
      "SON Certification & Product Conformity",
    ],
    benefits: [],
    conversionType: "consultation",
    featured: true,
    active: true,
    confirmed: true,
    pricingLabel:
      "Professional fees and government levies are itemized in your quote.",
    actionLabel: "Secure your product & industry licenses",
    faqs: [
      {
        question: "How do we begin?",
        answer:
          "Book a consultation to discuss your structure, documents and priorities. We confirm the scope, requirements, professional fees and government levies before work begins.",
      },
      {
        question: "Are processing timelines guaranteed?",
        answer:
          "Timelines depend on document readiness and the relevant agencies. We explain expected turnaround times and communicate regulatory queries or portal delays.",
      },
    ],
  },
];

export const activeServices = services.filter((service) => service.active);

// Preserve existing inbound service links and consultation selections.
export const legacyServiceSlugs: Record<string, string> = serviceAliases;
export const getService = (slug: string) =>
  activeServices.find(
    (service) => service.slug === (legacyServiceSlugs[slug] || slug),
  );
