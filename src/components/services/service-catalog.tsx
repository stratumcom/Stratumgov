"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ServiceGrid } from "./service-grid";
import { getServiceCategory } from "@/data/services";
import type { Service } from "@/types/service";
export function ServiceCatalog({ services }: { services: Service[] }) {
  const [category, setCategory] = useState("All services");
  const categories = [...new Set(services.map((service) => service.category))];
  const visibleServices = services.filter(
    (service) => category === "All services" || service.category === category,
  );
  const groups = categories
    .filter((name) => category === "All services" || category === name)
    .map((name) => ({
      name,
      definition: getServiceCategory(name),
      services: visibleServices.filter((service) => service.category === name),
    }));
  return (
    <>
      <div
        className="mb-9 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter service categories"
      >
        {["All services", ...categories].map((c) => (
          <Button
            key={c}
            variant={category === c ? "default" : "outline"}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            aria-controls="service-results"
          >
            {c}
          </Button>
        ))}
      </div>
      <p
        className="mb-8 text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {visibleServices.length} service{" "}
        {visibleServices.length === 1 ? "area" : "areas"}
        {category === "All services"
          ? ` across ${categories.length} categories`
          : ` in ${category}`}
        .
      </p>
      <div id="service-results">
        {groups.map((group) => {
          const id =
            group.definition?.id ||
            group.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <section
              key={group.name}
              id={id}
              className="catalog-category"
              aria-labelledby={`${id}-title`}
            >
              <div className="catalog-heading">
                <h2
                  id={`${id}-title`}
                  className="text-2xl font-medium tracking-tight sm:text-3xl"
                >
                  {group.definition?.title || group.name}
                </h2>
                {group.definition && (
                  <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                    {group.definition.description}
                  </p>
                )}
              </div>
              <ServiceGrid services={group.services} />
            </section>
          );
        })}
      </div>
    </>
  );
}
