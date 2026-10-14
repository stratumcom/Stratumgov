import Link from "next/link";
import { LegalLayout } from "@/components/shared/legal-layout";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Terms of service",
  "Draft terms for using the Stratum Governance Ltd. website.",
  "/terms-of-service",
  true,
);
export default function Terms() {
  return (
    <LegalLayout
      title="Terms of service."
      description="Draft terms for website use and the initial enquiry process."
      sections={[
        {
          heading: "Website information",
          body: "This website introduces Stratum Governance Ltd. and provides a way to make enquiries. Proposed service descriptions and sample editorial content require business owner review. Website content is general information and should not be relied on as legal, tax or regulatory advice.",
        },
        {
          heading: "Enquiries and consultations",
          body: "Submitting a form does not create a professional engagement or confirm a consultation booking. The team will confirm suitability, scope, availability, fees and the applicable engagement terms separately. A preferred date is a request only.",
        },
        {
          heading: "Fees and payment discussions",
          body: "No payment gateway is included in this website. WhatsApp links open a conversation and do not collect, verify or confirm payment. Fees, payment instructions and payment status must be confirmed directly with the business through verified contact channels.",
        },
        {
          heading: "Acceptable use",
          body: "Provide accurate information and use the enquiry forms for legitimate communications. Do not submit malicious content, spam or information you are not authorized to share. Public forms may be rate limited or temporarily unavailable.",
        },
        {
          heading: "Content and third-party links",
          body: "Branding and original website content are subject to applicable intellectual property rights. Stock imagery is illustrative and does not represent the company’s actual staff or premises. External websites and messaging services operate under their own terms.",
        },
        {
          heading: "Availability and responsibility",
          body: "The business owner must review the final provisions concerning availability, accuracy, liability, applicable law and dispute resolution with a qualified professional. This draft does not attempt to exclude statutory rights or impose unreviewed liability limitations.",
        },
        {
          heading: "Privacy",
          body: (
            <p>
              Use of enquiry information is described in the{" "}
              <Link className="underline" href="/privacy-policy">
                privacy notice
              </Link>
              . Please do not send confidential records or sensitive documents
              through a general enquiry form.
            </p>
          ),
        },
        {
          heading: "Questions and updates",
          body: (
            <p>
              Questions can be directed to the business through verified details
              on the{" "}
              <Link className="underline" href="/contact">
                contact page
              </Link>
              . These draft terms require owner and professional review,
              complete company details and an accurate effective date before
              launch.
            </p>
          ),
        },
      ]}
    />
  );
}
