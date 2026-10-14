import { z } from "zod/v4";
const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(100, "Use at most 100 characters.");
const email = z.email("Please enter a valid email address.").max(254);
const phone = z
  .string()
  .trim()
  .max(30)
  .refine(
    (v) =>
      !v ||
      (/^[+\d\s().-]+$/.test(v) &&
        v.replace(/\D/g, "").length >= 7 &&
        v.replace(/\D/g, "").length <= 15),
    "Please enter a valid phone number.",
  );
const shared = {
  name,
  email,
  phone,
  consent: z.boolean().refine((v) => v, "Please agree to the privacy notice."),
  website: z.string().max(0, "Unable to submit this request.").default(""),
  requestId: z.uuid("Invalid enquiry reference."),
};
export const contactSchema = z
  .object({
    ...shared,
    subject: z.string().trim().min(3, "Please enter a subject.").max(150),
    message: z
      .string()
      .trim()
      .min(1, "Please enter a message.")
      .max(5000),
  })
  .strict();
export const consultationSchema = z
  .object({
    ...shared,
    phone: phone.refine((v) => v.length > 0, "Please enter your phone number."),
    company: z.string().trim().max(150),
    service: z.string().min(1, "Please select a service.").max(100),
    format: z.enum(["video", "phone", "in-person", "no-preference"], {
      error: "Please select a consultation format.",
    }),
    message: z
      .string()
      .trim()
      .min(1, "Please enter a message.")
      .max(5000),
    availability: z.string().trim().max(200),
  })
  .strict();
export type ContactInput = z.input<typeof contactSchema>;
export type ConsultationInput = z.input<typeof consultationSchema>;
