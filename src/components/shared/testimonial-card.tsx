import Image from "next/image";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { isApprovedTestimonial } from "@/data/testimonials";
import type { Testimonial } from "@/types/testimonial";

export function TestimonialCard({
  testimonial,
  preview = false,
}: {
  testimonial: Testimonial;
  preview?: boolean;
}) {
  const approved = isApprovedTestimonial(testimonial);
  if (!approved && !preview) return null;

  const { text, clientName, clientRole, companyName, serviceReceived, image } =
    testimonial;
  const attribution = [clientRole, companyName].filter(Boolean).join(" · ");
  const hasCaption = clientName || attribution || serviceReceived || image;

  return (
    <Card className="testimonial-card h-full gap-0 rounded-sm py-0 shadow-none">
      <CardContent className="flex h-full flex-col p-6 sm:p-8">
        <figure className="flex h-full flex-col">
          {!approved && (
            <p className="mb-5 text-sm font-medium text-highlight">
              SAMPLE TESTIMONIAL · DRAFT FOR REVIEW
            </p>
          )}
          <Quote
            className="mb-6 size-8 text-highlight"
            strokeWidth={1.4}
            aria-hidden="true"
          />
          <blockquote className="flex-1">
            <p className="whitespace-pre-line text-base leading-8 [overflow-wrap:anywhere] sm:text-lg">
              {text}
            </p>
          </blockquote>
          {!approved && (
            <p className="mt-8 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
              Suggested wording, not real client feedback. Replace with an
              approved quote and client details before publication.
            </p>
          )}
          {hasCaption && (
            <figcaption className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-4">
                {image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={64}
                    height={64}
                    sizes="64px"
                    className={
                      image.kind === "logo"
                        ? "h-16 w-16 shrink-0 object-contain"
                        : "size-14 shrink-0 rounded-full object-cover"
                    }
                  />
                )}
                {(clientName || attribution) && (
                  <div className="min-w-0 [overflow-wrap:anywhere]">
                    {clientName && (
                      <p className="text-base font-semibold text-highlight">
                        {clientName}
                      </p>
                    )}
                    {attribution && (
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {attribution}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {serviceReceived && (
                <p className="mt-4 text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                  <span className="font-medium text-highlight">Service: </span>
                  {serviceReceived}
                </p>
              )}
            </figcaption>
          )}
        </figure>
      </CardContent>
    </Card>
  );
}
