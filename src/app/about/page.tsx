import Image from "next/image";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { CTA } from "@/components/shared/cta";
import {
  companyProfile,
  strategicFocusAreas,
  companyPhilosophy,
} from "@/data/company-profile";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "About us",
  "Corporate governance, institutional management and regulatory compliance advisory for Nigerian businesses and international investors.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageHeading
        eyebrow="ABOUT STRATUM GOVERNANCE LTD"
        title="Corporate vision. Strong foundations."
        description="We bridge the gap between bold corporate vision and rigorous regulatory realities."
      />
      <section className="section-space">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">OUR COMPANY</p>
            <h2 className="section-title mt-5">About Stratum Governance Ltd</h2>
            {companyProfile.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 leading-8 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Image
            src="/images/meeting.jpg"
            width={800}
            height={650}
            alt="Business professionals collaborating in an office; illustrative stock photography"
            className="corporate-image h-96 w-full object-cover"
          />
        </Container>
      </section>
      <section className="section-space bg-surface">
        <Container>
          <p className="eyebrow">OUR STRATEGIC FOCUS AREAS</p>
          <h2 className="section-title mt-5">
            Built for growth in a connected economy.
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {strategicFocusAreas.map((area, index) => (
              <article key={area.title} className="border-t border-border pt-7">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold">{area.title}</h3>
                <p className="mt-5 leading-8 text-muted-foreground">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-space">
        <Container className="max-w-4xl">
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2 className="section-title mt-5">
            Good governance supports lasting businesses.
          </h2>
          {companyPhilosophy.map((paragraph) => (
            <p key={paragraph} className="mt-6 leading-8 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </Container>
      </section>
      <CTA />
    </>
  );
}
