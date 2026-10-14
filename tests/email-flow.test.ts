import { test } from "node:test";
import assert from "node:assert/strict";

test("notification acceptance, complete fields, escaped content, retries and failure states", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  Object.assign(process.env, {
    NODE_ENV: "development",
    RESEND_API_KEY: "re_mock_test_only",
    RESEND_FROM_EMAIL: "stratum Governance <sender@example.com>",
    RESEND_SENDER_VERIFIED: "true",
    OWNER_EMAIL: "business@example.com",
    UPSTASH_REDIS_REST_URL: "",
    UPSTASH_REDIS_REST_TOKEN: "",
    SEND_CLIENT_ACKNOWLEDGEMENT: "false",
  });
  delete process.env.NEXT_PUBLIC_SITE_URL;
  const calls: { body: Record<string, unknown>; headers: Headers }[] = [];
  let fail = false;
  globalThis.fetch = async (input, init) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    assert.equal(
      url,
      "https://api.resend.com/emails",
      "only the mocked Resend endpoint is called",
    );
    calls.push({
      body: JSON.parse(String(init?.body)),
      headers: new Headers(init?.headers),
    });
    return new Response(
      JSON.stringify(
        fail
          ? { name: "validation_error", message: "Mock sender rejection" }
          : { id: "mock-email-id" },
      ),
      {
        status: fail ? 422 : 200,
        headers: { "content-type": "application/json" },
      },
    );
  };
  try {
    const { handleEnquiry } = await import("../src/lib/enquiry-handler");
    const contact = {
      name: "QA Example",
      email: "visitor@example.com",
      phone: "+2348012345678",
      subject: "Corporate review",
      message:
        'Please discuss <script>alert("unsafe")</script> and our records.',
      consent: true,
      website: "",
      requestId: "de1e5a19-e348-48cc-bad5-8b8051253c5e",
    };
    const request = (body: unknown) =>
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          origin: "http://localhost:3000",
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    const first = await handleEnquiry(request(contact), "contact");
    assert.equal(first.status, 200);
    assert.equal(calls[0].body.to, "business@example.com");
    assert.equal(calls[0].body.from, "stratum Governance <sender@example.com>");
    assert.equal(calls[0].body.reply_to, "visitor@example.com");
    const html = String(calls[0].body.html);
    for (const expected of [
      "QA Example",
      "visitor@example.com",
      "+2348012345678",
      "Corporate review",
      "Privacy consent",
      "Agreed",
      "Africa/Lagos",
      contact.requestId,
    ])
      assert.ok(html.includes(expected), `email includes ${expected}`);
    assert.ok(html.includes("&lt;script&gt;"));
    assert.ok(!html.includes('<script>alert("unsafe")</script>'));
    assert.ok(html.includes("NEW WEBSITE ENQUIRY"));
    assert.ok(html.includes("background:#101F8F"));
    assert.ok(!("react" in calls[0].body));
    assert.equal(
      calls[0].headers.get("idempotency-key"),
      `contact/${contact.requestId}`,
    );
    assert.equal(
      (await handleEnquiry(request(contact), "contact")).status,
      200,
    );
    assert.deepEqual(
      calls[0].body,
      calls[1].body,
      "retry notification payloads remain identical",
    );
    fail = true;
    const failed = await handleEnquiry(
      request({
        ...contact,
        requestId: "b252212c-065f-4428-80f6-4b0fbfb8c314",
      }),
      "contact",
    );
    assert.equal(failed.status, 502);
    assert.match((await failed.json()).message, /could not send/);
    fail = false;
    const deployedRequest = (origin: string) =>
      new Request("https://deployed.example/api/contact", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify({
          ...contact,
          email: "deployed-visitor@example.com",
          requestId: "86be81ef-4086-42c2-88ad-99da207fd9de",
        }),
      });
    assert.equal(
      (await handleEnquiry(deployedRequest("https://deployed.example"), "contact"))
        .status,
      200,
      "the deployed origin is accepted without a site URL environment variable",
    );
    assert.equal(
      (await handleEnquiry(deployedRequest("https://evil.example"), "contact"))
        .status,
      403,
      "a different origin is rejected",
    );
    const consultation = {
      name: "QA Individual",
      email: "individual@example.com",
      phone: "+2348012345678",
      company: "",
      service: "regulatory-compliance",
      format: "video",
      message: "Please discuss the scope of a compliance review.",
      availability: "Weekday afternoons",
      consent: true,
      website: "",
      requestId: "ea6d5d87-36e1-45d4-b4ca-621f36cd4b4f",
    };
    assert.equal(
      (await handleEnquiry(request(consultation), "consultation")).status,
      200,
    );
    const notification = String(calls.at(-1)!.body.html);
    for (const expected of [
      "QA Individual",
      "Not supplied",
      "Regulatory compliance",
      "regulatory-compliance",
      "video",
      "Weekday afternoons",
      "Please discuss the scope",
      "Africa/Lagos",
    ])
      assert.ok(
        notification.includes(expected),
        `consultation email includes ${expected}`,
      );
    assert.equal(
      (await handleEnquiry(request({ ...contact, website: "bot" }), "contact"))
        .status,
      400,
    );
    process.env.SEND_CLIENT_ACKNOWLEDGEMENT = "true";
    const before = calls.length;
    const { sendEnquiry } = await import("../src/lib/email");
    const acknowledged = await sendEnquiry(
      "consultation",
      consultation.email,
      { "Full name": consultation.name, "Client needs": consultation.message },
      "a791db0f-1c93-4c0a-b6b4-8d80a35dfb2d",
      consultation.name,
    );
    assert.equal(acknowledged, true);
    assert.equal(calls.length, before + 2);
    assert.ok(String(calls.at(-2)!.body.html).includes("NEW WEBSITE ENQUIRY"));
    assert.ok(String(calls.at(-1)!.body.html).includes("REQUEST RECEIVED"));
    assert.ok(String(calls.at(-1)!.body.html).includes("What happens next?"));
    assert.ok(!("react" in calls.at(-1)!.body));
    process.env.SEND_CLIENT_ACKNOWLEDGEMENT = "false";
    const count = calls.length;
    Object.assign(process.env, {
      NODE_ENV: "production",
      TRUSTED_CLIENT_IP_HEADER: "",
    });
    delete process.env.VERCEL;
    assert.equal(
      (await handleEnquiry(request(contact), "contact")).status,
      503,
    );
    assert.equal(
      calls.length,
      count,
      "invalid and unprotected production requests send no emails",
    );
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env))
      if (!(key in originalEnv)) delete process.env[key];
    Object.assign(process.env, originalEnv);
  }
});
