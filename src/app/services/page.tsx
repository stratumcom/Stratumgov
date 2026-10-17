import { PageHeading } from "@/components/shared/page-heading";
import { Container } from "@/components/shared/container";
import { ServiceCatalog } from "@/components/services/service-catalog";
import { CTA } from "@/components/shared/cta";
import { activeServices } from "@/data/services";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Service areas",
  "Explore company formation, restructuring, management and HR, intellectual property, statutory compliance and product licensing services.",
  "/services",
);
export default function Services() {
  return (
    <>
      <PageHeading
        eyebrow="OUR SERVICE AREAS"
        title="Our comprehensive corporate & management solutions."
        description="Six service areas supporting your business from formation and market entry through growth, governance and ongoing compliance. Select a service to explore the full details."
      />
      <section className="section-space">
        <Container>
          <ServiceCatalog services={activeServices} />
        </Container>
      </section>
      <CTA />
    </>
  );
}
