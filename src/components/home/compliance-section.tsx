import Link from "next/link";
import { ArrowUpRight, Check, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
export function ComplianceSection() {
  return (
    <section className="section-space" aria-labelledby="compliance-heading">
      <Container className="grid items-start gap-10 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="eyebrow">FREE CORPORATE COMPLIANCE HEALTH CHECK</p>
          <h2 id="compliance-heading" className="section-title mt-5">
            Know where you stand.
            <br />
            See what comes next.
          </h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            From CAC records and tax onboarding to workforce arrangements and
            foreign investment registrations, get a clearer picture of your
            business with a short, personalized assessment.
          </p>
        </div>
        <div className="border border-border bg-surface p-6 sm:p-8">
          <ClipboardCheck
            className="size-8 text-highlight"
            aria-hidden="true"
          />
          <ul className="mt-6 space-y-4">
            {[
              "A checklist tailored to your company profile.",
              "Reported strengths, potential gaps and clear next steps.",
              "A free downloadable PDF report and strategy session request.",
            ].map((text) => (
              <li key={text} className="flex gap-3 leading-7">
                <Check
                  className="mt-1 size-5 shrink-0 text-highlight"
                  aria-hidden="true"
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-7 w-full">
            <Link href="/compliance-health-check">
              Take the free compliance health check{" "}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            No contact details required. A preliminary self-assessment based on
            your answers.
          </p>
        </div>
      </Container>
    </section>
  );
}
