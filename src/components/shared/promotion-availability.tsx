"use client";
import { useEffect, useState } from "react";
import { promotionWindow } from "@/data/promotions";
export function PromotionAvailability() {
  const [active, setActive] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => setActive(promotionWindow().active);
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);
  const { ends } = promotionWindow();
  return (
    <div
      className="border-l-2 border-highlight bg-surface p-5 text-base leading-7"
      role="status"
    >
      <p className="font-semibold">
        {active === null
          ? "Confirm availability before applying."
          : active
            ? "Offers are within their published validity window."
            : "Offers are currently unavailable."}
      </p>
      <p className="mt-2 text-muted-foreground">
        The six-month window runs until{" "}
        {ends.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Africa/Lagos",
        })}
        , subject to earlier withdrawal. Contact the team to confirm eligibility
        and availability before payment.
      </p>
    </div>
  );
}
