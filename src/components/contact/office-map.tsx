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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.4398418975015!2d7.483528676029717!3d9.023579489071441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0c7f383b69a9%3A0xb140a20917ded3d3!2s1611%20Oka%20-%20Akoko%20St%2C%20off%20Lagos%20Crescent%2C%20Garki%2C%20Abuja%20900104%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1794516329461!5m2!1sen!2sng"
              width={600}
              height={450}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
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
