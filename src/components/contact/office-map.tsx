import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/config/site";

export function OfficeMap() {
  const address = site.address.trim();
  const query = encodeURIComponent(address);

  return (
    <section
      id="office-location"
      className="office-location scroll-mt-8"
      aria-labelledby="office-location-title"
    >
      <h3 id="office-location-title" className="mb-4 text-lg font-semibold">
        Find our office
      </h3>
      {address ? (
        <>
          <div className="office-map-frame">
            <iframe
              title={`Map showing ${site.name} at ${address}`}
              src={`https://www.google.com/maps?q=${query}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link mt-2 text-sm"
          >
            Open in Google Maps
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </>
      ) : (
        <div className="office-map-placeholder">
          <span className="office-map-marker" aria-hidden="true">
            <MapPin className="size-7" />
          </span>
          <p className="text-base font-semibold">
            Office location coming soon.
          </p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
            Contact us to confirm the office address before visiting.
          </p>
        </div>
      )}
    </section>
  );
}
