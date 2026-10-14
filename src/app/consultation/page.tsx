import {
  Check,
  MessageSquareText,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";
import { ConsultationForm } from "@/components/consultation/consultation-form";
import { PageHeading } from "@/components/shared/page-heading";
import { Container } from "@/components/shared/container";
import { activeServices, getService } from "@/data/services";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Book a consultation",
  "Request a consultation to discuss your governance, corporate compliance or regulatory advisory needs.",
  "/consultation",
);
export default async function Consultation({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected = service && getService(service) ? service : "";
  return (
    <>
      <PageHeading
        eyebrow="BOOK A CONSULTATION"
        title="Let’s find your next step."
        description="Share a little about your business and what you would like to address. We’ll use your enquiry to begin a focused conversation."
      />
      <section className="section-space">
        <Container className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">WHAT TO EXPECT</p>
            <h2 className="section-title mt-5">
              A useful conversation.
              <br />A clearer direction.
            </h2>
            <div className="mt-9 space-y-8">
              {[
                {
                  icon: MessageSquareText,
                  title: "Tell us what’s on your mind",
                  text: "A short overview of your needs and any relevant deadlines is enough to get started.",
                },
                {
                  icon: ClipboardList,
                  title: "We review your request",
                  text: "Your enquiry helps identify the scope to discuss and the information that may be useful.",
                },
                {
                  icon: CalendarCheck,
                  title: "Confirm the conversation",
                  text: "The team will contact you to agree availability, format and any applicable fees.",
                },
              ].map((v) => (
                <div className="flex gap-4" key={v.title}>
                  <v.icon
                    className="mt-1 size-5 shrink-0 text-highlight"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-base font-semibold">{v.title}</h3>
                    <p className="mt-2 text-base leading-7 text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
              <Check className="mr-2 inline size-4 text-highlight" />
              No company name? You can enquire as an individual.
              <p className="mt-3">
                Service areas are proposed and subject to confirmation. A
                submitted request is not a confirmed booking.
              </p>
            </div>
          </div>
          <div className="form-panel">
            <h2 className="mb-3 text-2xl font-semibold">
              Request your consultation.
            </h2>
            <p className="mb-8 text-base text-muted-foreground">
              Fields marked with an asterisk are required.
            </p>
            <ConsultationForm
              key={selected}
              services={activeServices.map((s) => ({
                slug: s.slug,
                title: s.title,
              }))}
              selectedService={selected}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
