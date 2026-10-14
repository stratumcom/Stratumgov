import Link from "next/link";
import { FAQAccordion } from "@/components/faqs/faq-accordion";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { CTA } from "@/components/shared/cta";
import { faqs } from "@/data/faqs";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Frequently asked questions",
  "Find answers about consultation requests, enquiries, proposed service areas, fees and privacy.",
  "/faqs",
);
export default function FAQs() {
  return (
    <>
      <PageHeading
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="A little more clarity."
        description="Useful answers about starting a conversation, exploring service areas and planning your next step."
      />
      <section className="section-space">
        <Container className="max-w-4xl">
          <FAQAccordion items={faqs} searchable />
          <p className="mt-9 text-base text-muted-foreground">
            Still have a question?{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href="/contact"
            >
              Let’s talk about it.
            </Link>
          </p>
        </Container>
      </section>
      <CTA />
    </>
  );
}
