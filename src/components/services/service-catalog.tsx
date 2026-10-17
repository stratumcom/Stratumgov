"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ServiceGrid } from "./service-grid";
import type { Service } from "@/types/service";

export function ServiceCatalog({ services }: { services: Service[] }) {
  const [category, setCategory] = useState("All services");
  const categories = [...new Set(services.map((service) => service.category))];
  const visible = services.filter(
    (service) => category === "All services" || service.category === category,
  );
  return (
    <>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter service categories"
      >
        {["All services", ...categories].map((name) => (
          <Button
            key={name}
            variant={category === name ? "default" : "outline"}
            onClick={() => setCategory(name)}
            aria-pressed={category === name}
            aria-controls="service-results"
          >
            {name}
          </Button>
        ))}
      </div>
      <p
        className="mb-8 text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {visible.length} service {visible.length === 1 ? "area" : "areas"}
        {category === "All services"
          ? ` across ${categories.length} categories`
          : ` in ${category}`}
        .
      </p>
      <div id="service-results">
        <ServiceGrid services={visible} />
      </div>
    </>
  );
}
