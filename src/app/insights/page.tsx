import { InsightsList } from "@/components/insights/insights-list";
import { PageHeading } from "@/components/shared/page-heading";
import { Container } from "@/components/shared/container";
import { CTA } from "@/components/shared/cta";
import { insights } from "@/data/insights";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Insights",
  "Explore general perspectives on corporate governance, compliance and business organization.",
  "/insights",
);
export default function Insights() {
  return (
    <>
      <PageHeading
        eyebrow="PERSPECTIVES & INSIGHTS"
        title="Room for a clearer perspective."
        description="Thoughtful reading on the structures, habits and questions that support a well-organized business."
      />
      <section className="section-space">
        <Container>
          {insights.some((a) => a.sample) && (
            <p className="mb-10 border-l-2 border-highlight bg-surface px-5 py-4 text-base leading-6 text-muted-foreground">
              Articles marked{" "}
              <strong className="font-medium text-foreground">
                sample editorial
              </strong>{" "}
              are draft content for owner review. They are not verified company
              publications, regulatory updates or legal advice.
            </p>
          )}
          <InsightsList articles={insights} />
        </Container>
      </section>
      <CTA />
    </>
  );
}
