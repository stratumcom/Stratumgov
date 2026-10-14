import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Compass,
  MessageSquareText,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { CTA } from "@/components/shared/cta";
import { Approach } from "@/components/home/approach";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ServiceGrid } from "@/components/services/service-grid";
import { FAQAccordion } from "@/components/faqs/faq-accordion";
import { InsightCard } from "@/components/insights/insight-card";
import { activeServices } from "@/data/services";
import { insights } from "@/data/insights";
import { faqs } from "@/data/faqs";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Corporate compliance, considered.",
  site.description,
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero on-blue">
        <Container className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker  ">
              A STRONGER FOUNDATION & STRUCTURE FOR YOUR BUSINESS
            </div>
            <h1>
              <span>Stratum</span> <span>Governance Ltd.</span>
            </h1>
            <p className="hero-description">
              Navigate corporate governance and regulatory responsibilities with
              a clear perspective. Make your next business move with confidence.
            </p>
            <div className="hero-actions">
              <Button
                asChild
                className="bg-brand-white text-brand-blue hover:bg-brand-white/90"
              >
                <Link href="/consultation">
                  Book a consultation
                  <ArrowUpRight className="ml-4 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6">
                <Link href="/services">
                  Explore our services
                  <ArrowUpRight className="ml-3 size-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src="/images/architecture.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="corporate-image object-cover"
            />
            <div className="hero-image-shade" aria-hidden="true" />
            <div className="hero-image-label">
              <p>
                Strong foundations.
                <br />
                Possibilities ahead.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="section-space">
        <Container className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">WELCOME TO STRATUMGOV</p>
            <h2 className="section-title mt-5">
              A clearer perspective.
              <br />A stronger business.
            </h2>
          </div>
          <div className="md:pt-7">
            <p className="text-base leading-8 text-muted-foreground">
              Corporate compliance is part of building a business that is ready
              for what comes next. Stratum Governance Ltd. brings a
              considered perspective to governance, regulatory advisory and
              corporate services.
            </p>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Our starting point is simple: understand your needs, define the
              right scope and make the next steps clear.
            </p>
            <Link href="/about" className="text-link mt-7">
              Get to know stratumgov
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
      <section className="section-space bg-surface">
        <Container>
          <div className="section-header">
            <div>
              <p className="eyebrow">HOW WE CAN HELP</p>
              <h2 className="section-title mt-4">
                Expertise for your next chapter.
              </h2>
            </div>
            <Link href="/services" className="text-link">
              View all service areas
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <ServiceGrid services={activeServices.filter((s) => s.featured)} />
          <p className="mt-6 text-sm leading-5 text-muted-foreground">
            Proposed service areas for discussion. Availability and scope are
            confirmed before engagement.
          </p>
        </Container>
      </section>
      <section className="section-space">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden">
            <Image
              src="/images/workspace.jpg"
              alt="Open, light-filled workspace with carefully organized seating"
              fill
              sizes="(max-width:1023px) 100vw, 50vw"
              className="corporate-image object-cover"
            />
            <div className="image-caption">
              <ShieldCheck
                className="size-8 text-highlight"
                strokeWidth={1.3}
              />
              <span>
                Grounded in clarity.
                <br />
                <strong>Guided by your priorities.</strong>
              </span>
            </div>
          </div>
          <div className="py-2">
            <p className="eyebrow">THE STRATUMGOV PERSPECTIVE</p>
            <h2 className="section-title mt-5">
              Considered advice.
              <br />
              Practical direction.
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              A professional relationship starts with understanding. These
              principles shape the approach we aim to bring to every
              conversation.
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  icon: Compass,
                  title: "Clarity from the outset",
                  text: "Understand the scope, priorities and next steps before you commit.",
                },
                {
                  icon: Fingerprint,
                  title: "Context before recommendations",
                  text: "Start with the needs and circumstances of your organization.",
                },
                {
                  icon: MessageSquareText,
                  title: "Straightforward communication",
                  text: "Make complex questions easier to discuss and act on.",
                },
              ].map((v) => (
                <div className="flex gap-4" key={v.title}>
                  <v.icon
                    className="mt-1 size-5 shrink-0 text-highlight"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-base font-semibold">{v.title}</h3>
                    <p className="mt-2 text-base leading-6 text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <TestimonialsSection />
      <Approach />
      {site.industries.length > 0 && (
        <section className="audience-section on-blue">
          <Container>
            <p className="eyebrow">INDUSTRIES WE SERVE</p>
            <h2 className="section-title mt-5">
              Expertise shaped around your context.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {site.industries.map((industry) => (
                <li
                  key={industry}
                  className="border border-border px-4 py-3 text-base"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <section className="section-space">
        <Container>
          <div className="section-header">
            <div>
              <p className="eyebrow">PERSPECTIVES & INSIGHTS</p>
              <h2 className="section-title mt-4">
                Ideas for a better-informed business.
              </h2>
            </div>
            <Link href="/insights" className="text-link">
              Explore all insights
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((a) => (
              <InsightCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>
      <section className="section-space border-t border-border">
        <Container className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">A LITTLE MORE CLARITY</p>
            <h2 className="section-title mt-4">
              Your questions,
              <br />
              considered.
            </h2>
            <p className="mt-5 max-w-xs text-base leading-7 text-muted-foreground">
              A few helpful answers before we start the conversation.
            </p>
            <Link href="/faqs" className="text-link mt-6">
              View all FAQs
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <FAQAccordion items={faqs.slice(0, 4)} />
        </Container>
      </section>
      <CTA />
    </>
  );
}
