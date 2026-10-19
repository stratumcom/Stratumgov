export type Answer = "yes" | "no" | "unsure" | "not-due";
export type Answers = Record<string, Answer>;
export type Profile = {
  companyType: "ltd" | "plc" | "business-name" | "trustee";
  foreignShareholders: "yes" | "no";
  foreignWorkers: "yes" | "no";
  employees: "0" | "1-2" | "3-4" | "5+";
  scumlSector: "yes" | "no" | "unsure";
  regulatedProducts: "yes" | "no" | "unsure";
};
export const companyTypes = {
  ltd: "Private Limited Company (Ltd)",
  plc: "Public Limited Company (Plc)",
  "business-name": "Business Name / Sole Proprietorship",
  trustee: "Incorporated Trustee (NGO / Foundation / Church)",
};
export const employeeCounts = {
  "0": "No employees",
  "1-2": "1 to 2 employees",
  "3-4": "3 to 4 employees",
  "5+": "5 or more employees",
};
export type Question = {
  id: string;
  section: string;
  title: string;
  prompt: string;
  help: string;
  healthyAnswer?: "yes" | "no";
  allowNotDue?: boolean;
  applicabilityUncertain?: boolean;
  action: string;
  serviceSlug: string;
};
const maintenance = "statutory-compliance-maintenance";
const formation = "company-formation-market-entry";
export function questionsFor(profile: Profile): Question[] {
  const corporate =
    profile.companyType === "ltd" || profile.companyType === "plc";
  const questions: Question[] = [
    {
      id: "annual-returns",
      section: "CAC status",
      title: "CAC annual returns",
      prompt: "Have you filed all CAC annual returns that are currently due?",
      help: "Use the due dates for your entity. If your first return is not due yet, choose that option.",
      allowNotDue: true,
      action:
        "Review your CAC filing history and arrange any outstanding annual returns.",
      serviceSlug: maintenance,
    },
    {
      id: "unfiled-changes",
      section: "CAC status",
      title: "Corporate record updates",
      prompt: corporate
        ? "Are there changes to shareholders, directors or share capital that still need to be filed with CAC?"
        : "Are there changes to your registered particulars, proprietors or trustees that still need to be filed with CAC?",
      help: "Choose No if there have been no changes, or all required changes have been filed.",
      healthyAnswer: "no",
      action: "Review recent changes and arrange the applicable CAC updates.",
      serviceSlug: "corporate-restructuring",
    },
    {
      id: "tax-id",
      section: "Fiscal & financial compliance",
      title: "Tax identification",
      prompt: "Does your business have an active Tax ID?",
      help: "Check your tax registration records. Tax ID registration and annual tax clearance are separate items.",
      action:
        "Confirm your Tax ID and complete any outstanding tax onboarding.",
      serviceSlug: formation,
    },
    {
      id: "tax-clearance",
      section: "Fiscal & financial compliance",
      title: "Tax clearance",
      prompt:
        "Do you have a valid Tax Clearance Certificate for the period applicable to your business?",
      help: "Choose Not yet due only if the requirement is not yet due for your circumstances.",
      allowNotDue: true,
      action:
        "Review your tax filings and clearance position with the relevant tax authority.",
      serviceSlug: maintenance,
    },
  ];
  if (profile.scumlSector !== "no")
    questions.push({
      id: "scuml",
      section: "Fiscal & financial compliance",
      title: "SCUML registration",
      prompt: "Do you hold a SCUML certificate for your business activities?",
      help:
        profile.scumlSector === "unsure"
          ? "We will flag sector applicability for review rather than assume you must register."
          : "This check concerns designated non-financial businesses and professions. SCUML itself issues certificates free of charge; professional assistance may carry a separate fee.",
      applicabilityUncertain: profile.scumlSector === "unsure",
      action:
        "Confirm whether your activities fall within SCUML's designated categories and arrange registration where required.",
      serviceSlug: maintenance,
    });
  if (profile.employees === "3-4" || profile.employees === "5+")
    questions.push({
      id: "pensions",
      section: "Workforce & operations",
      title: "Pension arrangements",
      prompt:
        "Are your employee pension registrations and required contributions up to date?",
      help: "This preliminary pension check is shown for employers reporting three or more employees.",
      action:
        "Review employee pension registrations and contribution records with your pension administrator.",
      serviceSlug: maintenance,
    });
  if (profile.employees !== "0")
    questions.push({
      id: "nsitf",
      section: "Workforce & operations",
      title: "NSITF workplace insurance",
      prompt:
        "Is your employer registration and contribution position with the NSITF Employees' Compensation Scheme up to date?",
      help: "NSITF is assessed separately from pensions and is not treated as an employee pension deduction.",
      action:
        "Check your NSITF employer registration and Employees' Compensation Scheme contributions.",
      serviceSlug: maintenance,
    });
  if (profile.foreignShareholders === "yes" && corporate) {
    questions.push({
      id: "nipc",
      section: "Foreign investment & market entry",
      title: "NIPC registration",
      prompt: "Has your company completed its NIPC registration?",
      help: "This question is shown because you reported foreign shareholding.",
      action:
        "Review your NIPC registration status and complete the relevant foreign-investment onboarding.",
      serviceSlug: formation,
    });
    questions.push({
      id: "business-permit",
      section: "Foreign investment & market entry",
      title: "Business permit",
      prompt:
        "Does your foreign-participating company hold its applicable business permit?",
      help: "Confirm the permit position for your company with a market-entry specialist.",
      action:
        "Review the business permit requirements for your company's foreign participation.",
      serviceSlug: formation,
    });
  }
  if (profile.foreignWorkers === "yes")
    questions.push({
      id: "immigration",
      section: "Foreign investment & market entry",
      title: "Expatriate documentation",
      prompt:
        "Are the applicable work and residence permits for your foreign personnel up to date?",
      help: "Consider the quota, visa and residence documentation relevant to the actual role and immigration status.",
      action:
        "Review your foreign personnel's applicable quota, work and residence documentation.",
      serviceSlug: formation,
    });
  if (profile.regulatedProducts !== "no")
    questions.push({
      id: "nafdac",
      section: "Products & specialized licensing",
      title: "NAFDAC product registration",
      prompt:
        "Do the products you handle have the NAFDAC registrations applicable to your activities?",
      help:
        profile.regulatedProducts === "unsure"
          ? "Your product scope needs review before a registration gap can be confirmed."
          : "Consider foods, drugs, cosmetics, medical devices and other regulated products relevant to your activities.",
      applicabilityUncertain: profile.regulatedProducts === "unsure",
      action:
        "Confirm the registrations applicable to your products and review any outstanding NAFDAC applications.",
      serviceSlug: "product-registration-licensing",
    });
  return questions;
}
export type Finding = {
  question: Question;
  answer: Answer;
  status: "strength" | "gap" | "unknown" | "excluded";
};
export function assess(profile: Profile, answers: Answers) {
  const findings: Finding[] = questionsFor(profile).map((question) => {
    const answer = answers[question.id];
    if (
      ![
        "yes",
        "no",
        "unsure",
        ...(question.allowNotDue ? ["not-due"] : []),
      ].includes(answer)
    )
      throw new Error(`Answer required: ${question.id}`);
    const status =
      answer === "not-due"
        ? "excluded"
        : answer === "unsure" || question.applicabilityUncertain
          ? "unknown"
          : answer === (question.healthyAnswer || "yes")
            ? "strength"
            : "gap";
    return { question, answer, status };
  });
  const strengths = findings.filter((finding) => finding.status === "strength");
  const gaps = findings.filter((finding) => finding.status === "gap");
  const unknowns = findings.filter((finding) => finding.status === "unknown");
  const excluded = findings.filter((finding) => finding.status === "excluded");
  const included = findings.length - excluded.length;
  const score = included ? Math.round((100 * strengths.length) / included) : 0;
  return {
    findings,
    strengths,
    gaps,
    unknowns,
    excluded,
    included,
    score,
    label: gaps.length
      ? "Action required"
      : unknowns.length
        ? "Clarification needed"
        : "Strong reported foundation",
  };
}
export type Assessment = ReturnType<typeof assess>;
export const complianceSources = [
  {
    title: "PenCom: employer pension contributions",
    url: "https://www.pencom.gov.ng/wp-content/uploads/2023/08/PRESS-RELEASE-ON-OUTSTANDING-PENSION-CONTRIBUTIONS-IN-THE-ACCOUNTS-OF-PFAs-With-Guidance-Note.pdf",
  },
  {
    title: "NSITF: Employees' Compensation Scheme",
    url: "https://nsitf.gov.ng/compensation",
  },
  {
    title: "NIPC: investment registration",
    url: "https://nipc.gov.ng/services/service-delivery-modes/online",
  },
  {
    title: "SCUML: registration and certification",
    url: "https://scuml.efcc.gov.ng/",
  },
];
export const assessmentNotice =
  "This preliminary self-assessment uses your answers only. It does not check government records, certify compliance or cover every obligation. Confirm applicability, due dates and next steps with a qualified adviser.";
export const scoreExplanation =
  "The score is the percentage of assessed items you report as up to date. Unknown answers and uncertain applicability receive no points; items marked not yet due are excluded. A high score can still include a gap that needs attention.";
