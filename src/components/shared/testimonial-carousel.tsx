"use client";

import { Children, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TestimonialCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const slides = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => {
      const slide = viewport.children.item(
        currentRef.current,
      ) as HTMLElement | null;
      if (slide)
        viewport.scrollTo({ left: slide.offsetLeft, behavior: "auto" });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const viewport = viewportRef.current;
    const slide = viewport?.children.item(index) as HTMLElement | null;
    if (!viewport || !slide) return;
    viewport.scrollTo({
      left: slide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  function updateCurrent() {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let nearest = 0;
    let distance = Infinity;
    Array.from(viewport.children).forEach((child, index) => {
      const offset = Math.abs(
        (child as HTMLElement).offsetLeft - viewport.scrollLeft,
      );
      if (offset < distance) {
        distance = offset;
        nearest = index;
      }
    });
    currentRef.current = nearest;
    setCurrent(nearest);
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div
        ref={viewportRef}
        className="testimonial-viewport"
        tabIndex={0}
        aria-label="Testimonial slides. Use the left and right arrow keys to browse."
        onScroll={updateCurrent}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const index =
            event.key === "ArrowRight"
              ? Math.min(current + 1, slides.length - 1)
              : event.key === "ArrowLeft"
                ? Math.max(current - 1, 0)
                : event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? slides.length - 1
                    : null;
          if (index !== null) {
            event.preventDefault();
            goTo(index);
          }
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="testimonial-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== current}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous testimonial"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <span
            className="min-w-16 text-center text-sm tabular-nums text-muted-foreground"
            aria-hidden="true"
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next testimonial"
            disabled={current === slides.length - 1}
            onClick={() => goTo(current + 1)}
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
        <div
          className="flex flex-wrap justify-center"
          role="group"
          aria-label="Choose a testimonial"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className="testimonial-dot"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-pressed={current === index}
              onClick={() => goTo(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Testimonial {current + 1} of {slides.length}
      </p>
    </div>
  );
}
