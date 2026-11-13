import { site } from "@/config/site";
import { activeServices } from "@/data/services";
import type { Service } from "@/types/service";

const businessId = `${site.url}/#business`;
const nigeria = { "@type": "Country", name: "Nigeria" };

export function businessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        legalName: site.name,
        alternateName: site.shortName,
        description: site.description,
        url: site.url,
        logo: new URL(site.logo, site.url).href,
        image: new URL(site.logo, site.url).href,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "NG",
        },
        areaServed: nigeria,
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`,
        ...(site.email ? { email: site.email } : {}),
        ...(site.phone ? { telephone: site.phone } : {}),
        ...(site.socialLinks.length
          ? { sameAs: site.socialLinks.map(({ url }) => url) }
          : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Corporate services in Nigeria",
          itemListElement: activeServices
            .filter((service) => service.confirmed)
            .map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${site.url}/services/${service.slug}#service`,
                name: service.title,
                url: `${site.url}/services/${service.slug}`,
              },
            })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        inLanguage: "en-NG",
        publisher: { "@id": businessId },
      },
    ] as const,
  };
}

export function serviceStructuredData(service: Service) {
  const url = `${site.url}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: service.seoDescription || service.shortDescription,
        serviceType: service.category,
        url,
        provider: { "@id": businessId },
        areaServed: nigeria,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${site.url}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: url,
          },
        ],
      },
    ] as const,
  };
}
