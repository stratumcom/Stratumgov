import { HealthSafetyAssessment } from "@/components/health-safety/health-safety-assessment";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { seo } from "@/lib/seo";

export const metadata = seo(
  "Health & Safety Compliance Health Check",
  "Assess your workplace safety practices with a free preliminary health check. Explore reported strengths, potential gaps, and practical recommendations.",
  "/health-safety-check",
);

export default function HealthSafetyCheckPage() {
  return (
    <>
      <PageHeading
        eyebrow="WORKPLACE HEALTH & SAFETY"
        title="Health & Safety Compliance Health Check"
        description="Understand your current practices, identify potential gaps, and find practical next steps for your workplace."
        breadcrumb="Health & Safety Health Check"
      />
      <section className="section-space">
        <Container>
          <div className="mx-auto max-w-3xl rounded-md border border-border bg-card p-5 sm:p-8 lg:p-10">
            <HealthSafetyAssessment />
          </div>
        </Container>
      </section>
    </>
  );
}
