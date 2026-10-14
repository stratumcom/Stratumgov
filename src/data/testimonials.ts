import type { Testimonial } from "@/types/testimonial";

/**
 * Add genuine, company-approved testimonials here.
 * Each entry needs a stable id, testimonial text and explicit approval.
 * Attribution, imagery and service details are optional; omit unknown details.
 * These ten suggested quotes are fictional drafts, not real client feedback.
 * Replace them with genuine quotes and attribution, then approve each entry
 * before publication. Unapproved drafts are visible only in development.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: "testimonial-01",
    text: "Stratum Governance helped us turn a complicated set of corporate responsibilities into a clear, manageable plan. We appreciated knowing what needed attention and what to do next.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-02",
    text: "The advice was practical and easy to understand. Each conversation gave us a clearer view of our priorities and the decisions we needed to make.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-03",
    text: "What stood out was the time taken to understand our business before recommending an approach. The conversation felt focused on our needs from the beginning.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-04",
    text: "We appreciated the straightforward communication and the clearly defined scope of work. It made the process easier for our team to follow.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-05",
    text: "Reviewing our corporate records felt far less overwhelming with a structured approach. We came away with useful priorities and a better sense of direction.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-06",
    text: "The guidance helped us think more carefully about roles, responsibilities and how decisions are recorded. It gave our internal discussions a stronger starting point.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-07",
    text: "As we planned our next business chapter, having the available options explained clearly was valuable. We felt better prepared to ask the right questions.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-08",
    text: "Our team valued the organized approach and attention to detail. The next steps were explained in a way that made it easier to coordinate internally.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-09",
    text: "We wanted advice that connected with the way our business actually works. The discussion helped us focus on practical improvements we could understand and plan for.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
  {
    id: "testimonial-10",
    text: "The experience reinforced the value of keeping corporate responsibilities organized. We appreciated having a thoughtful perspective on the questions that mattered to us.",
    approved: false,
    clientName: "",
    clientRole: "",
    companyName: "",
  },
];

export function isApprovedTestimonial(testimonial: Testimonial): boolean {
  return testimonial.approved === true && testimonial.text.trim().length > 0;
}
