import { test } from "node:test";
import assert from "node:assert/strict";
import { site } from "../src/config/site";
import { activeServices } from "../src/data/services";
import { insights } from "../src/data/insights";
import { newsroomArticles } from "../src/data/newsroom";
import sitemap from "../src/app/sitemap";
import { seo } from "../src/lib/seo";
import {
  businessStructuredData,
  serviceStructuredData,
} from "../src/lib/structured-data";

test("business markup connects the public office, website and confirmed services", () => {
  const [business, website] = businessStructuredData()["@graph"];
  assert.equal(business["@type"], "LocalBusiness");
  assert.equal(business.name, site.name);
  assert.equal(business.url, site.url);
  assert.deepEqual(business.address, {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "NG",
  });
  assert.deepEqual(website.publisher, { "@id": business["@id"] });
  assert.equal(website.url, site.url);
  assert.deepEqual(
    business.hasOfferCatalog.itemListElement.map((offer) => offer.itemOffered.url),
    activeServices
      .filter((service) => service.confirmed)
      .map((service) => `${site.url}/services/${service.slug}`),
  );
  assert.ok(!("aggregateRating" in business), "no invented review ratings");
  assert.ok(!("openingHours" in business), "no invented opening hours");
});

test("service search metadata and breadcrumbs connect to the same business", () => {
  const businessId = businessStructuredData()["@graph"][0]["@id"];
  for (const service of activeServices.filter((entry) => entry.confirmed)) {
    assert.ok(service.seoTitle, `${service.slug} has a search title`);
    assert.ok(service.seoDescription, `${service.slug} has a search description`);
    const [details, breadcrumb] = serviceStructuredData(service)["@graph"];
    assert.deepEqual(details.provider, { "@id": businessId });
    assert.deepEqual(details.areaServed, { "@type": "Country", name: "Nigeria" });
    assert.equal(breadcrumb.itemListElement.at(-1)?.item, details.url);
    const metadata = seo(
      service.seoTitle,
      service.seoDescription,
      `/services/${service.slug}`,
    );
    assert.equal(metadata.alternates?.canonical, `/services/${service.slug}`);
    assert.equal(metadata.description, service.seoDescription);
  }
});

test("the sitemap uses canonical URLs and excludes draft or unpublished pages", () => {
  const urls = sitemap().map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  for (const url of urls) assert.equal(new URL(url).origin, site.url);
  for (const service of activeServices.filter((entry) => entry.confirmed)) {
    assert.ok(urls.includes(`${site.url}/services/${service.slug}`));
  }
  for (const article of insights.filter((entry) => entry.sample)) {
    assert.ok(!urls.includes(`${site.url}/insights/${article.slug}`));
  }
  for (const article of newsroomArticles.filter((entry) => !entry.published)) {
    assert.ok(!urls.includes(`${site.url}/news/${article.slug}`));
  }
  assert.ok(!urls.includes(`${site.url}/privacy-policy`));
  assert.deepEqual(seo("Draft", "Draft content", "/draft", true).robots, {
    index: false,
    follow: true,
  });
});
