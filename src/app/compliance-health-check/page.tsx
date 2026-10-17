import { ComplianceAssessment } from "@/components/compliance/compliance-assessment";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Free Corporate Compliance Health Check",
  "Assess your corporate records, tax onboarding, workforce arrangements and relevant registrations. Get personalized findings and a downloadable report.",
  "/compliance-health-check",
);
export default function ComplianceHealthCheck() {
  return (
    <>
      <PageHeading
        eyebrow="FREE CORPORATE COMPLIANCE HEALTH CHECK"
        title="How healthy is your corporate compliance?"
        description="Understand your reported position, identify potential gaps and plan your next steps with a personalized checklist."
      />
      <section className="section-space">
        <Container>
          <div className="mx-auto max-w-3xl rounded-md border border-border bg-card p-5 sm:p-8 lg:p-10">
            <ComplianceAssessment />
          </div>
        </Container>
      </section>
    </>
  );
}
