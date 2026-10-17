export type ConversionType =
  "consultation" | "whatsapp-enquiry" | "whatsapp-payment";
export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}
export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  offerings?: { title: string; description: string }[];
  actionLabel?: string;
  problem: string;
  category: string;
  benefits: string[];
  deliverables: string[];
  faqs: FAQ[];
  featured: boolean;
  active: boolean;
  confirmed: boolean;
  conversionType: ConversionType;
  pricingLabel?: string;
  icon:
    | "governance"
    | "regulatory"
    | "secretarial"
    | "incorporation"
    | "filings"
    | "review"
    | "training"
    | "advisory";
}
