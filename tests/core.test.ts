import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema, consultationSchema } from "../src/lib/validations";
import { whatsappUrl } from "../src/lib/whatsapp";
import { services } from "../src/data/services";
import { siteUrl } from "../src/config/site";
const base = {
  name: "Jane Example",
  email: "jane@example.com",
  phone: "+234 801 234 5678",
  consent: true,
  website: "",
  requestId: "dc6e17ba-ed35-4985-b6ee-e937327a9cdd",
  message: "I would like to discuss corporate record organization.",
};
test("contact validation accepts short messages and requires consent, a message, and a valid email", () => {
  assert.equal(
    contactSchema.safeParse({ ...base, subject: "Corporate records" }).success,
    true,
  );
  for (const message of ["Hi", "a"])
    assert.equal(
      contactSchema.safeParse({ ...base, subject: "Hello", message }).success,
      true,
    );
  for (const invalid of [
    { email: "invalid" },
    { consent: false },
    { message: "" },
    { message: "   " },
    { name: "" },
    { phone: "abc123456789" },
    { requestId: "arbitrary" },
    { extra: "unexpected" },
  ])
    assert.equal(
      contactSchema.safeParse({
        ...base,
        subject: "Corporate records",
        ...invalid,
      }).success,
      false,
    );
});
test("consultations support individuals while requiring valid contact details and format", () => {
  const valid = {
    ...base,
    company: "",
    service: "not-sure",
    format: "video",
    availability: "Weekday afternoons",
  };
  assert.equal(consultationSchema.safeParse(valid).success, true);
  for (const message of ["Hi", "a"])
    assert.equal(
      consultationSchema.safeParse({ ...valid, message }).success,
      true,
    );
  for (const message of ["", "   "])
    assert.equal(
      consultationSchema.safeParse({ ...valid, message }).success,
      false,
    );
  assert.equal(
    consultationSchema.safeParse({ ...valid, phone: "" }).success,
    false,
  );
  assert.equal(
    consultationSchema.safeParse({ ...valid, format: "invalid" }).success,
    false,
  );
  assert.equal(
    consultationSchema.safeParse({ ...valid, service: "" }).success,
    false,
  );
});
test("honeypot and oversized fields are rejected", () => {
  assert.equal(
    contactSchema.safeParse({ ...base, subject: "Hello", website: "bot" })
      .success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({
      ...base,
      subject: "Hello",
      message: "a".repeat(5001),
    }).success,
    false,
  );
});
test("WhatsApp rejects unconfigured numbers and safely encodes the selected service", () => {
  for (const n of [
    "",
    "234XXXXXXXXXX",
    "+234 801 234 5678",
    "https://malicious.test",
    "0012345",
  ])
    assert.equal(whatsappUrl(n), null);
  const service = {
    title: "Governance & advisory / review",
    slug: "governance-review",
  };
  const url = new URL(whatsappUrl("2348012345678", service, true)!);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/2348012345678");
  assert.match(
    url.searchParams.get("text")!,
    /Governance & advisory \/ review/,
  );
  assert.match(url.searchParams.get("text")!, /service: governance-review/);
  assert.match(url.searchParams.get("text")!, /payment arrangements/);
});
test("catalog has six confirmed service areas with unique slugs and detailed offerings", () => {
  assert.equal(new Set(services.map((s) => s.slug)).size, services.length);
  for (const s of services) {
    assert.match(s.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(s.confirmed, true);
    assert.ok(s.offerings?.length);
    assert.ok(s.deliverables.length);
    assert.ok(s.shortDescription);
    assert.ok(s.faqs.length);
  }
});

test("site address follows Vercel deployment and production domains", () => {
  const previous = {
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  };
  try {
    delete process.env.VERCEL_ENV;
    delete process.env.VERCEL_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    assert.equal(siteUrl(), "http://localhost:3000");
    process.env.VERCEL_ENV = "preview";
    process.env.VERCEL_URL = "preview.example.vercel.app";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "example.vercel.app";
    assert.equal(siteUrl(), "https://preview.example.vercel.app");
    process.env.VERCEL_ENV = "production";
    assert.equal(siteUrl(), "https://example.vercel.app");
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
