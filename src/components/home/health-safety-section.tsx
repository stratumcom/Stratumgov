import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export function HealthSafetySection() {
  return (
    <section className="section-space border-b border-border" aria-labelledby="health-safety-heading">
      <Container className="grid items-start gap-10 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="eyebrow">HEALTH &amp; SAFETY COMPLIANCE HEALTH CHECK</p>
          <h2 id="health-safety-heading" className="section-title mt-5">
            How Safe and Compliant Is Your Workplace?
          </h2>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            Take our Health &amp; Safety Compliance Health Check to assess your
            company&apos;s current workplace safety practices, identify potential
            gaps, and discover areas that may require improvement.
          </p>
        </div>
        <div className="border border-border bg-surface p-6 sm:p-8">
          <ShieldCheck className="size-8 text-highlight" strokeWidth={1.5} aria-hidden="true" />
          <ul className="mt-6 space-y-4">
            {[
              "Assess your current workplace safety practices.",
              "Identify potential health and safety gaps.",
              "Receive an instant preliminary assessment with recommendations.",
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-base leading-7">
                <Check className="mt-1 size-5 shrink-0 text-highlight" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-7 w-full">
            <Link href="/health-safety-check">
              Take the Health &amp; Safety Test
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Approximately 3–5 minutes. Not a substitute for a formal audit or
            professional advice.
          </p>
        </div>
      </Container>
    </section>
  );
}
