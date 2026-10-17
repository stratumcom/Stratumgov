import Link from "next/link";
import { ArrowUpRight, Gift } from "lucide-react";
import { Container } from "@/components/shared/container";
import { promotions } from "@/data/promotions";
import { PromotionAvailability } from "@/components/shared/promotion-availability";
export function PromotionsSection() {
  return (
    <section
      className="section-space bg-surface"
      aria-labelledby="promotions-heading"
    >
      <Container>
        <div className="section-header">
          <div>
            <p className="eyebrow">SEE OUR PROMO</p>
            <h2 id="promotions-heading" className="section-title mt-4">
              More value for your next business move.
            </h2>
          </div>
          <Link href="/promotions" className="text-link">
            View offers &amp; conditions <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <PromotionAvailability />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((offer) => (
            <article
              key={offer.id}
              className="flex flex-col border border-border bg-card p-6"
            >
              <Gift aria-hidden="true" className="size-6 text-highlight" />
              <h3 className="mt-5 text-xl font-semibold">{offer.title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-muted-foreground">
                {offer.description}
              </p>
              <Link href={`/promotions#${offer.id}`} className="text-link mt-5">
                View offer details <ArrowUpRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          Free offers cover professional service fees only. Government fees,
          stamp duties and penalties remain payable. Eligibility and
          availability are confirmed before engagement.{" "}
          <Link className="underline" href="/promotions#terms">
            Read promotion terms
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
