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
            Your next step towards
            <br className="hidden md:block" /> greater confidence.
          </h2>
          <p className="mt-4 max-w-lg text-base text-white/80">
            Tell us where your business is today. Let’s discuss where you want
            it to be.
          </p>
        </div>
        <Button
          asChild
          className="cta-button bg-brand-white text-brand-blue hover:bg-brand-white/90"
        >
          <Link href="/consultation">
            Book a consultation <ArrowUpRight className="ml-4 size-4" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
