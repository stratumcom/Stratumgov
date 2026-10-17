import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
export function CTA() {
  return (
    <section className="cta-section on-blue">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="eyebrow text-highlight">LET’S START A CONVERSATION</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            Ready to secure your
            <br className="hidden md:block" /> corporate footprint in Nigeria?
          </h2>
          <p className="mt-4 max-w-lg text-base text-white/80">
            Let Stratum Governance Ltd streamline your setup, manage your
            filings and support your compliance while you focus on growth.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-4 md:w-auto md:max-w-sm">
          <Button
            asChild
            className="cta-button bg-brand-white text-brand-blue hover:bg-brand-white/90"
          >
            <Link href="/consultation">
              Book a consultation <ArrowUpRight className="ml-4 size-4" />
            </Link>
          </Button>
          <Link
            href="/compliance-health-check"
            className="text-link text-white"
          >
            Take a free compliance health check{" "}
            <ArrowUpRight className="size-4 shrink-0" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
