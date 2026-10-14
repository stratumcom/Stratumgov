import { Quote } from "lucide-react";
import { Container } from "@/components/shared/container";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";
import { isApprovedTestimonial, testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/testimonial";

export function TestimonialsSection({
  items = testimonials,
}: {
  items?: readonly Testimonial[];
}) {
  const approvedItems = items.filter(isApprovedTestimonial);
  const isDevelopment = process.env.NODE_ENV === "development";
  const slides = isDevelopment ? items : approvedItems;

  if (slides.length === 0) return null;

  return (
    <section
      className="testimonials-section section-space bg-surface"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">CLIENT PERSPECTIVES</p>
            <h2 id="testimonials-heading" className="section-title mt-4">
              {approvedItems.length > 0
                ? "Trusted by Businesses. Built on Confidence."
                : "Client perspectives."}
            </h2>
          </div>
          <p className="max-w-lg text-base leading-8 text-muted-foreground">
            {approvedItems.length > 0
              ? "Discover how our commitment to corporate compliance and professional advisory services supports our clients."
              : "Approved client feedback will be shared here."}
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <TestimonialCarousel>
            {slides.map((testimonial, index) =>
              testimonial.text.trim() ? (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  preview={isDevelopment}
                />
              ) : (
                <div
                  key={testimonial.id}
                  className="flex min-h-72 h-full flex-col gap-5 border border-border border-l-2 border-l-brand-blue bg-brand-white p-6 sm:flex-row sm:items-start sm:p-8"
                >
                  <Quote
                    className="size-8 shrink-0 text-highlight"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="mb-2 text-sm font-medium text-highlight">
                      TESTIMONIAL SLOT {String(index + 1).padStart(2, "0")} ·
                      PREVIEW
                    </p>
                    <h3 className="text-xl font-medium">
                      Awaiting approved client feedback.
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                      An approved client quote and attribution will appear here.
                      This is an empty slot, not a client testimonial.
                    </p>
                  </div>
                </div>
              ),
            )}
          </TestimonialCarousel>
        </div>
      </Container>
    </section>
  );
}
