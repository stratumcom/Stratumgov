import { Mail, Phone, MapPin, Clock, MessageSquareText } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeMap } from "@/components/contact/office-map";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { PageHeading } from "@/components/shared/page-heading";
import { Container } from "@/components/shared/container";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Contact us",
  "Start a conversation with Stratum Governance Ltd. about your corporate needs.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  return (
    <>
      <PageHeading
        eyebrow="GET IN TOUCH"
        title="Good conversations start here."
        description="Have a question or a corporate challenge in mind? Tell us a little about it and let’s discuss the next step."
      />
      <section className="section-space">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="form-panel">
            <p className="eyebrow mb-4">LET’S CONNECT</p>
            <h2 className="mb-3 text-2xl font-semibold">Send an enquiry.</h2>
            <p className="mb-8 text-base text-muted-foreground">
              We’d love to hear from you. Fields marked with an asterisk are
              required.
            </p>
            <ContactForm
              key={subject?.slice(0, 150) || "general"}
              defaultSubject={subject?.slice(0, 150) || ""}
            />
          </div>
          <aside
            className="contact-details-panel"
            aria-labelledby="contact-details-title"
          >
            <p className="eyebrow">GET IN TOUCH</p>
            <h2
              id="contact-details-title"
              className="mb-7 mt-4 text-2xl font-semibold"
            >
              Contact details
            </h2>
            <OfficeMap />
            <div className="my-9 space-y-7">
              {site.email && (
                <div className="flex gap-4">
                  <Mail className="mt-1 size-5 text-highlight" />
                  <div>
                    <h3 className="text-base font-semibold">Email us</h3>
                    <a
                      className="mt-2 block break-all text-base text-muted-foreground"
                      href={`mailto:${site.email}`}
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              )}
              {site.phone && (
                <div className="flex gap-4">
                  <Phone className="mt-1 size-5 text-highlight" />
                  <div>
                    <h3 className="text-base font-semibold">Call us</h3>
                    <a
                      className="mt-2 block text-base text-muted-foreground"
                      href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              )}
              {site.address && (
                <div className="flex gap-4">
                  <MapPin className="mt-1 size-5 text-highlight" />
                  <div>
                    <h3 className="text-base font-semibold">Office address</h3>
                    <p className="mt-2 text-base text-muted-foreground">
                      {site.address}
                    </p>
                  </div>
                </div>
              )}
              {site.businessHours && (
                <div className="flex gap-4">
                  <Clock className="mt-1 size-5 text-highlight" />
                  <div>
                    <h3 className="text-base font-semibold">Business hours</h3>
                    <p className="mt-2 text-base text-muted-foreground">
                      {site.businessHours}
                    </p>
                  </div>
                </div>
              )}
              {!site.email && !site.phone && (
                <div className="flex gap-4 border-t border-border pt-7">
                  <MessageSquareText className="mt-1 size-5 shrink-0 text-highlight" />
                  <p className="text-base leading-7 text-muted-foreground">
                    Direct contact details are awaiting owner confirmation.
                    Online delivery becomes available once the business email is
                    configured.
                  </p>
                </div>
              )}
              <WhatsAppCTA />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
