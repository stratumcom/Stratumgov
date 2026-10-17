import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import {
  activeServices,
  getService,
  getServiceCategory,
} from "@/data/services";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { CTA } from "@/components/shared/cta";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { FAQAccordion } from "@/components/faqs/faq-accordion";
import { ServiceGrid } from "@/components/services/service-grid";
export const dynamicParams = false;
export function generateStaticParams() {
  return activeServices.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = getService((await params).slug);
  return s
    ? seo(s.title, s.shortDescription, `/services/${s.slug}`, !s.confirmed)
    : {};
}
export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = getService((await params).slug);
  if (!s) notFound();
  return (
    <>
      <PageHeading
        eyebrow={(
          getServiceCategory(s.category)?.title || s.category
        ).toUpperCase()}
        title={s.title}
        description={s.shortDescription}
        breadcrumb="Service detail"
      />
      <section className="section-space">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {!s.confirmed && (
              <p className="mb-8 border-l-2 border-highlight bg-surface p-4 text-base leading-6 text-muted-foreground">
                Proposed service area — subject to owner confirmation. This page
                describes a potential engagement, not a confirmed offering.
              </p>
            )}
            <h2 className="text-3xl font-medium tracking-tight">
              How we can help
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              {s.description}
            </p>
            {s.problem && (
              <>
                <h2 className="mt-10 text-2xl font-semibold">The challenge</h2>
                <p className="mt-4 leading-8 text-muted-foreground">
                  {s.problem}
                </p>
              </>
            )}
            <h2 className="mt-10 text-2xl font-semibold">
              Our services in this area
            </h2>
            {s.offerings ? (
              <div className="mt-7 space-y-8">
                {s.offerings.map((offering) => (
                  <section
                    key={offering.title}
                    className="border-t border-border pt-6"
                  >
                    <h3 className="text-xl font-semibold">{offering.title}</h3>
                    <p className="mt-3 leading-8 text-muted-foreground">
                      {offering.description.split("○")[0].trim()}
                    </p>
                    {offering.description.includes("○") && (
                      <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-muted-foreground">
                        {offering.description
                          .split("○")
                          .slice(1)
                          .map((item) => (
                            <li key={item}>{item.trim()}</li>
                          ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <>
                <ul className="mt-5 space-y-4">
                  {s.deliverables.map((d) => (
                    <li className="flex gap-3 text-base leading-6" key={d}>
                      <Check className="mt-1 size-4 shrink-0 text-highlight" />
                      {d}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {s.benefits.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-semibold">
                  What this can support
                </h2>
                <ul className="mt-5 space-y-4">
                  {s.benefits.map((b) => (
                    <li className="flex gap-3 text-base leading-6" key={b}>
                      <Check className="mt-1 size-4 shrink-0 text-highlight" />
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <aside className="border border-border bg-surface p-8 lg:sticky lg:top-8">
            <p className="eyebrow">START WITH A CONVERSATION</p>
            <h2 className="mt-5 text-2xl font-medium tracking-tight">
              Let’s understand
              <br />
              your requirements.
            </h2>
            <p className="my-6 text-base leading-7 text-muted-foreground">
              {s.pricingLabel}
            </p>
            <div className="space-y-5">
              <Button asChild className="w-full">
                <Link href={`/consultation?service=${s.slug}`}>
                  Book a consultation
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              {s.conversionType !== "consultation" ? (
                <WhatsAppCTA service={s} />
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(s.title)}`}
                  >
                    Enquire about this service
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
            <p className="mt-7 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
              No payment is collected through this website. Scope, availability
              and fees require direct confirmation.
            </p>
          </aside>
        </Container>
      </section>
      <section className="section-space bg-surface">
        <Container className="max-w-4xl">
          <p className="eyebrow">USEFUL TO KNOW</p>
          <h2 className="section-title my-5">A few questions, answered.</h2>
          <FAQAccordion items={s.faqs} />
        </Container>
      </section>
      <section className="section-space">
        <Container>
          <p className="eyebrow">EXPLORE FURTHER</p>
          <h2 className="section-title mb-10 mt-5">Related service areas.</h2>
          <ServiceGrid
            services={activeServices
              .filter((r) => r.slug !== s.slug && r.category === s.category)
              .concat(
                activeServices.filter(
                  (r) => r.slug !== s.slug && r.category !== s.category,
                ),
              )
              .slice(0, 3)}
          />
        </Container>
      </section>
      <CTA />
      {s.confirmed && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: s.title,
              description: s.shortDescription,
              url: `${site.url}/services/${s.slug}`,
              provider: { "@type": "Organization", name: site.name },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
