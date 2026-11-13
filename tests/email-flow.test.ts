import { test } from "node:test";
import assert from "node:assert/strict";
import { brand } from "../src/config/brand";

test("owner notifications and automatic client replies preserve fields, retries and failure states", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  Object.assign(process.env, {
    NODE_ENV: "development",
    RESEND_API_KEY: "re_mock_test_only",
    RESEND_FROM_EMAIL: "stratum Corporate<sender@example.com>",
    RESEND_SENDER_VERIFIED: "true",
    OWNER_EMAIL: "business@example.com",
    UPSTASH_REDIS_REST_URL: "",
    UPSTASH_REDIS_REST_TOKEN: "",
    SEND_CLIENT_ACKNOWLEDGEMENT: "false",
  });
  delete process.env.NEXT_PUBLIC_SITE_URL;
  const calls: { body: Record<string, unknown>; headers: Headers }[] = [];
  let fail = false;
  let failAcknowledgement: "reject" | "throw" | "missing-id" | false = false;
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
    const isAcknowledgement = calls.at(-1)!.body.to !== "business@example.com";
    if (isAcknowledgement && failAcknowledgement === "throw") {
      throw new Error("Mock acknowledgement network failure");
    }
    const rejected =
      fail || (isAcknowledgement && failAcknowledgement === "reject");
    return new Response(
      JSON.stringify(
        rejected
          ? { name: "validation_error", message: "Mock sender rejection" }
          : isAcknowledgement && failAcknowledgement === "missing-id"
            ? {}
            : { id: "mock-email-id" },
      ),
      {
        status: rejected ? 422 : 200,
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
    assert.equal(calls.length, 2, "a contact enquiry automatically sends a reply");
    assert.equal(calls[0].body.to, "business@example.com");
    assert.equal(calls[0].body.from, "stratum Corporate<sender@example.com>");
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
    assert.ok(html.includes(`background:${brand.blue}`));
    assert.ok(!("react" in calls[0].body));
    assert.equal(
      calls[0].headers.get("idempotency-key"),
      `contact/${contact.requestId}`,
    );
    const acknowledgement = calls[1];
    assert.equal(acknowledgement.body.to, contact.email);
    assert.equal(acknowledgement.body.from, calls[0].body.from);
    assert.equal(acknowledgement.body.reply_to, "business@example.com");
    assert.match(String(acknowledgement.body.subject), /received your message/);
    assert.match(String(acknowledgement.body.html), /get back to you shortly/);
    assert.match(String(acknowledgement.body.text), /get back to you shortly/);
    assert.ok(String(acknowledgement.body.html).includes(contact.requestId));
    assert.ok(!String(acknowledgement.body.html).includes("confirmed booking"));
    assert.equal(
      acknowledgement.headers.get("idempotency-key"),
      `ack/contact/${contact.requestId}`,
    );
    assert.equal(
      (await handleEnquiry(request(contact), "contact")).status,
      200,
    );
    assert.deepEqual(
      calls[0].body,
      calls[2].body,
      "retry notification payloads remain identical",
    );
    assert.deepEqual(
      calls[1].body,
      calls[3].body,
      "retry reply payloads remain identical",
    );
    assert.equal(
      calls[1].headers.get("idempotency-key"),
      calls[3].headers.get("idempotency-key"),
      "retries reuse the reply key to prevent duplicate confirmations",
    );
    fail = true;
    const beforeFailure = calls.length;
    const failed = await handleEnquiry(
      request({
        ...contact,
        requestId: "b252212c-065f-4428-80f6-4b0fbfb8c314",
      }),
      "contact",
    );
    assert.equal(failed.status, 502);
    assert.match((await failed.json()).message, /could not send/);
    assert.equal(
      calls.length,
      beforeFailure + 1,
      "a rejected owner email sends no acknowledgement",
    );
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
      (
        await handleEnquiry(
          deployedRequest("https://deployed.example"),
          "contact",
        )
      ).status,
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
      service: "statutory-compliance-maintenance",
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
    const notification = String(calls.at(-2)!.body.html);
    for (const expected of [
      "QA Individual",
      "Not supplied",
      "Statutory Compliance &amp; Global Corporate Maintenance",
      "statutory-compliance-maintenance",
      "video",
      "Weekday afternoons",
      "Please discuss the scope",
      "Africa/Lagos",
    ])
      assert.ok(
        notification.includes(expected),
        `consultation email includes ${expected}`,
      );
    const consultationReply = calls.at(-1)!;
    assert.equal(consultationReply.body.to, consultation.email);
    assert.match(
      String(consultationReply.body.subject),
      /received your consultation request/,
    );
    assert.match(String(consultationReply.body.html), /get back to you shortly/);
    assert.match(String(consultationReply.body.html), /not a confirmed booking/);
    assert.match(String(consultationReply.body.text), /not a confirmed booking/);
    assert.equal(
      (await handleEnquiry(request({ ...contact, website: "bot" }), "contact"))
        .status,
      400,
    );
    const before = calls.length;
    const { sendEnquiry } = await import("../src/lib/email");
    const acknowledged = await sendEnquiry(
      "consultation",
      consultation.email,
      { "Full name": consultation.name, "Client needs": consultation.message },
      "a791db0f-1c93-4c0a-b6b4-8d80a35dfb2d",
      '<script>alert("unsafe")</script>',
    );
    assert.equal(acknowledged, true);
    assert.equal(calls.length, before + 2);
    assert.ok(String(calls.at(-2)!.body.html).includes("NEW WEBSITE ENQUIRY"));
    assert.ok(String(calls.at(-1)!.body.html).includes("REQUEST RECEIVED"));
    assert.ok(String(calls.at(-1)!.body.html).includes("What happens next?"));
    assert.ok(String(calls.at(-1)!.body.html).includes("&lt;script&gt;"));
    assert.ok(
      !String(calls.at(-1)!.body.html).includes('<script>alert("unsafe")</script>'),
    );
    assert.ok(!("react" in calls.at(-1)!.body));
    for (const kind of ["contact", "consultation"] as const) {
      for (const mode of ["reject", "throw", "missing-id"] as const) {
        failAcknowledgement = mode;
        const beforeAcknowledgementFailure: number = calls.length;
        assert.equal(
          await sendEnquiry(
            kind,
            contact.email,
            { "Full name": contact.name },
            `ack-failure-${kind}-${mode}`,
            contact.name,
          ),
          true,
          `${kind}: acknowledgement ${mode} preserves the accepted owner notification`,
        );
        assert.equal(calls.length, beforeAcknowledgementFailure + 2);
        assert.equal(calls.at(-2)!.body.to, "business@example.com");
        assert.equal(calls.at(-1)!.body.to, contact.email);
      }
    }
    failAcknowledgement = false;
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
