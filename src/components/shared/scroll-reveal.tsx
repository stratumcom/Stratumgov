"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Content is visible by default; animation starts only after intersection. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const elements = document.querySelectorAll<HTMLElement>(
      "main section:not(.hero) > .container-shell, main .service-card",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          // A focused control should remain still and immediately usable.
          if (!target.contains(document.activeElement)) {
            (target as HTMLElement).dataset.reveal = "entered";
          }
          observer.unobserve(target);
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(element);
      }
    });
    const stop = () => {
      observer.disconnect();
      elements.forEach((element) => delete element.dataset.reveal);
    };
    const onPreferenceChange = () => {
      if (preference.matches) stop();
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        const element = event.target.closest<HTMLElement>("[data-reveal]");
        if (element) delete element.dataset.reveal;
      }
    };
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("focusin", onFocus);
    return () => {
      stop();
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
