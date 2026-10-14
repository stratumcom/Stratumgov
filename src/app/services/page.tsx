import { PageHeading } from "@/components/shared/page-heading";
import { Container } from "@/components/shared/container";
import { ServiceCatalog } from "@/components/services/service-catalog";
import { CTA } from "@/components/shared/cta";
import { activeServices } from "@/data/services";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Service areas",
  "Explore proposed governance, compliance, corporate services and development areas. Scope and availability are confirmed after enquiry.",
  "/services",
);
export default function Services() {
  return (
    <>
      <PageHeading
        eyebrow="OUR SERVICE AREAS"
        title="The right perspective. The right next step."
        description="Explore the corporate challenges you would like to address. Each engagement begins with a conversation about your needs."
      />
      <section className="section-space">
        <Container>
          <div className="mb-10 border-l-2 border-highlight bg-surface px-5 py-4 text-base leading-6 text-muted-foreground">
            <strong className="font-medium text-foreground">
              A catalog for discussion.
            </strong>{" "}
            These are proposed service areas awaiting owner confirmation.
            Availability, scope, deliverables and fees are agreed before
            engagement.
          </div>
          <ServiceCatalog services={activeServices} />
        </Container>
      </section>
      <CTA />
    </>
  );
}
