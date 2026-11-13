import { PageHeading } from "@/components/shared/page-heading";
import { Container } from "@/components/shared/container";
import { ServiceCatalog } from "@/components/services/service-catalog";
import { CTA } from "@/components/shared/cta";
import { activeServices } from "@/data/services";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Corporate Services in Abuja, Nigeria",
  "Explore CAC registration, company restructuring, HR policies, trademarks, statutory compliance and NAFDAC licensing with Stratum Corporate Ltd. in Abuja.",
  "/services",
);
export default function Services() {
  return (
    <>
      <PageHeading
        eyebrow="OUR SERVICE AREAS"
        title="Our comprehensive corporate & management solutions."
        description="From Abuja, we support businesses across Nigeria with company registration, market entry, restructuring, HR policies, intellectual property, statutory compliance and product licensing. Select a service to explore the details."
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
