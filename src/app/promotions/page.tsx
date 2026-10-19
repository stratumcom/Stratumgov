import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import {
  promotions,
  promotionTerms,
  websiteLastUpdated,
} from "@/data/promotions";
import { PromotionAvailability } from "@/components/shared/promotion-availability";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Promotional offers",
  "Explore company registration bundles, trademark filing offers and annual returns backlog discounts, including all eligibility conditions.",
  "/promotions",
);
export default function Promotions() {
  return (
    <>
      <PageHeading
        eyebrow="SEE OUR PROMO"
        title="Build more. Get more value."
        description="Corporate registration and compliance bundles, with clear conditions for every offer."
      />
      <section className="section-space">
        <Container>
          <PromotionAvailability />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {promotions.map((offer) => (
              <article
                id={offer.id}
                key={offer.id}
                className="flex scroll-mt-8 flex-col border border-border p-6 sm:p-8"
              >
                <p className="eyebrow">PROMOTIONAL OFFER</p>
                <h2 className="mt-4 text-2xl font-semibold">{offer.title}</h2>
                <p className="mt-5 flex-1 leading-8 text-muted-foreground">
                  {offer.description}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Professional fee offer only. Statutory charges remain payable.
                </p>
                <Button asChild className="mt-6 self-start">
                  <Link
                    href={`/consultation?service=${offer.serviceSlug}&offer=${offer.id}`}
                  >
                    Enquire about this offer <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
          <section id="terms" className="mx-auto mt-16 max-w-3xl scroll-mt-8">
            <p className="eyebrow">PROMO TERMS &amp; CONDITIONS</p>
            <h2 className="section-title mt-4">
              The details behind each offer.
            </h2>
            {/* <p className="mt-4 text-sm text-muted-foreground">
              Website update reference: {websiteLastUpdated}.
            </p> */}
            <div className="mt-8 space-y-8">
              {promotionTerms.map((term) => (
                <section key={term.title}>
                  <h3 className="text-xl font-semibold">{term.title}</h3>
                  <p className="mt-3 leading-8 text-muted-foreground">
                    {term.description}
                  </p>
                </section>
              ))}
            </div>
            <p className="mt-8 leading-7 text-muted-foreground">
              Engagements are also subject to our{" "}
              <Link className="underline" href="/terms-of-service">
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </Container>
      </section>
    </>
  );
}
