import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

async function main() {
  const origin = process.env.QA_ORIGIN || "http://localhost:3000";
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  const routes = [
    "/",
    "/about",
    "/services",
    "/consultation",
    "/contact",
    "/insights",
    "/newsroom",
    "/faqs",
    "/privacy-policy",
    "/terms-of-service",
  ];
  await page.goto(origin + "/services");
  const serviceRoutes = await page
    .locator('main a[href^="/services/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((a) => a.getAttribute("href"))),
    ]);
  await page.goto(origin + "/insights");
  const articleRoutes = await page
    .locator('main a[href^="/insights/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((a) => a.getAttribute("href"))),
    ]);
  await page.goto(origin + "/newsroom");
  const newsRoutes = await page
    .locator('.news-card a[href^="/news/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((a) => a.getAttribute("href"))),
    ]);
  routes.push(...serviceRoutes, ...articleRoutes, ...newsRoutes);
  let checked = 0;
  await fs.mkdir("docs/preview", { recursive: true });
  for (const width of process.env.QA_INTERACTIONS_ONLY === "true"
    ? []
    : [320, 375, 390, 430, 768, 1024, 1280, 1440, 1600, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(origin + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, `${route} returns 200`);
      assert.equal(
        await page.locator("h1").count(),
        1,
        `${route} has one primary heading`,
      );
      const dimensions = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
      }));
      assert.ok(
        dimensions.document <= dimensions.viewport + 1,
        `${route} overflows at ${width}px: ${JSON.stringify(dimensions)}`,
      );
      await page.locator("img").evaluateAll((images) =>
        Promise.all(
          images.map((image) => {
            image.loading = "eager";
            return image.decode().catch(() => {});
          }),
        ),
      );
      const brokenImages = await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((i) => !i.complete || i.naturalWidth === 0)
            .map((i) => i.src),
        );
      assert.deepEqual(brokenImages, [], `${route} has loaded images`);
      if (route === "/") {
        assert.equal(
          (await page.locator("h1").textContent()).replace(/\s+/g, " ").trim(),
          "Stratum Governance Ltd.",
        );
        await expect(page.locator("header .brand-name")).toHaveText(
          "stratumgov",
        );
        if (width >= 1280) {
          assert.equal(
            await page
              .locator(".nav-link")
              .first()
              .evaluate((link) => getComputedStyle(link).fontSize),
            "16px",
          );
        }
      }
      if (route === "/" && (width === 375 || width === 1280)) {
        for (
          let y = 0;
          y < (await page.evaluate(() => document.body.scrollHeight));
          y += 650
        ) {
          await page.evaluate((offset) => window.scrollTo(0, offset), y);
          await page.waitForTimeout(70);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(700);
        await page.screenshot({
          path: `docs/preview/home-${width}.png`,
          fullPage: true,
        });
      }
      checked++;
    }
  }
  if (checked)
    console.log(
      `Responsive routes: ${checked} checks at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1600 and 1920px.`,
    );

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(origin);
  const menu = page.getByRole("button", {
    name: "Open navigation",
    includeHidden: true,
  });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  const controls = await menu.getAttribute("aria-controls");
  assert.ok(
    controls && (await page.locator(`[id="${controls}"]`).isVisible()),
    "menu references its dialog",
  );
  assert.equal(
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link")
      .first()
      .evaluate((link) => getComputedStyle(link).fontSize),
    "18px",
  );
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await page
        .getByRole("dialog")
        .evaluate((dialog) => dialog.contains(document.activeElement)),
      "menu traps keyboard focus",
    );
  }
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About Us", exact: true })
    .click();
  await page.waitForURL("**/about");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto(origin + "/faqs");
  await page
    .getByRole("textbox", { name: "Search frequently asked questions" })
    .fill("preferred date");
  assert.equal(
    await page.locator('[data-slot="accordion-trigger"]').count(),
    1,
  );
  await page.locator('[data-slot="accordion-trigger"]').click();
  assert.ok(
    await page
      .getByText("No. Your preferred date or availability", { exact: false })
      .isVisible(),
  );
  await page
    .getByRole("textbox", { name: "Search frequently asked questions" })
    .fill("no-matching-question-9999");
  assert.ok(await page.getByRole("status").isVisible());
  await page.goto(origin + "/services");
  assert.equal(await page.locator(".catalog-category").count(), 4);
  await page.getByRole("button", { name: "Development", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText(
    "1 service area in Development.",
  );
  assert.equal(await page.locator(".service-card").count(), 1);

  await page.goto(origin + "/contact?subject=Governance%20enquiry", {
    waitUntil: "networkidle",
  });
  await expect(page.getByLabel("Subject", { exact: false })).toHaveValue(
    "Governance enquiry",
  );
  await page.getByRole("button", { name: "Send your message" }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await page.getByLabel("Full name", { exact: false }).fill("QA Example");
  await page
    .getByLabel("Email address", { exact: false })
    .fill("qa@example.com");
  await page
    .getByLabel("Your message", { exact: false })
    .fill("This is a verification enquiry; no real email should be sent.");
  await page.locator("#contact-consent").click();
  const contactResponse = page.waitForResponse(
    (r) => r.url().endsWith("/api/contact") && r.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Send your message" }).click();
  assert.equal((await contactResponse).status(), 503);
  assert.ok(
    await page
      .getByRole("alert")
      .filter({ hasText: "awaiting email configuration" })
      .isVisible(),
  );
  assert.equal(await page.getByText("Message received.").count(), 0);

  await page.goto(origin + "/consultation?service=regulatory-compliance", {
    waitUntil: "networkidle",
  });
  assert.match(
    await page.locator("#consultation-service").innerText(),
    /Regulatory compliance/,
  );
  await page.getByRole("button", { name: "Request a consultation" }).click();
  await expect(page.getByText("Please enter your phone number.")).toBeVisible();
  await page.getByLabel("Full name", { exact: false }).fill("QA Example");
  await page
    .getByLabel("Email address", { exact: false })
    .fill("qa@example.com");
  await page
    .getByLabel("Phone number", { exact: false })
    .fill("+2348012345678");
  await page
    .getByLabel("How can we help?", { exact: false })
    .fill(
      "I would like to understand the next steps for corporate compliance.",
    );
  await page.locator("#consultation-consent").click();
  const consultationResponse = page.waitForResponse(
    (r) =>
      r.url().endsWith("/api/consultation") && r.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Request a consultation" }).click();
  assert.equal((await consultationResponse).status(), 503);
  assert.ok(
    await page
      .getByRole("alert")
      .filter({ hasText: "awaiting email configuration" })
      .isVisible(),
  );

  const valid = {
    name: "QA Example",
    email: "qa@example.com",
    phone: "",
    subject: "Verification",
    message: "A sufficiently long verification enquiry.",
    consent: true,
    website: "",
    requestId: "dc6e17ba-ed35-4985-b6ee-e937327a9cdd",
  };
  const post = (data, headers = {}) =>
    page.request.post(origin + "/api/contact", {
      data,
      headers: { Origin: origin, ...headers },
    });
  assert.equal((await post(valid)).status(), 503);
  assert.equal((await post({ ...valid, email: "invalid" })).status(), 400);
  assert.equal((await post({ ...valid, consent: false })).status(), 400);
  assert.equal((await post({ ...valid, website: "bot" })).status(), 400);
  assert.equal(
    (await post(valid, { Origin: "https://invalid.example" })).status(),
    403,
  );
  assert.equal(
    (await post("text", { "Content-Type": "text/plain" })).status(),
    415,
  );
  assert.equal(
    (await post({ ...valid, message: "a".repeat(21000) })).status(),
    413,
  );
  const badService = await page.request.post(origin + "/api/consultation", {
    data: {
      name: valid.name,
      email: valid.email,
      phone: "+2348012345678",
      company: "",
      service: "not-a-real-service",
      format: "video",
      availability: "",
      message: valid.message,
      consent: true,
      website: "",
      requestId: valid.requestId,
    },
    headers: { Origin: origin },
  });
  assert.equal(badService.status(), 400);
  for (const missing of [
    "/services/missing-service",
    "/insights/missing-article",
    "/missing-page",
  ]) {
    assert.equal((await page.request.get(origin + missing)).status(), 404);
  }
  // Verify long service selections and wrapping form CTAs at narrow widths.
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1600, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + "/consultation?service=corporate-governance", {
      waitUntil: "networkidle",
    });
    await expect(page.locator("#consultation-service")).toContainText(
      "Corporate governance & advisory",
    );
    const geometry = await page.evaluate(() => {
      const trigger = document.querySelector("#consultation-service");
      const value = trigger.querySelector('[data-slot="select-value"]');
      const submit = document.querySelector('button[type="submit"]');
      return {
        document: document.documentElement.scrollWidth,
        viewport: innerWidth,
        valueWidth: value.clientWidth,
        valueScrollWidth: value.scrollWidth,
        buttonHeight: submit.clientHeight,
        buttonScrollHeight: submit.scrollHeight,
      };
    });
    assert.ok(
      geometry.document <= geometry.viewport + 1,
      `consultation fits at ${width}px`,
    );
    assert.ok(
      geometry.valueScrollWidth <= geometry.valueWidth + 1,
      `selected service fits at ${width}px`,
    );
    assert.ok(
      geometry.buttonScrollHeight <= geometry.buttonHeight + 1,
      `submit label fits at ${width}px`,
    );
  }
  console.log(
    "Long selected services and form labels fit at nine screen widths.",
  );

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(origin);
  assert.equal(
    await page
      .locator(".hero-copy h1")
      .evaluate((heading) => getComputedStyle(heading).animationName),
    "none",
  );
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const noScript = await browser.newPage({ javaScriptEnabled: false });
  // Isolate presentation from Next's existing streamed loading boundary.
  // The rendered markup must remain readable without animation JavaScript.
  await noScript.setContent(
    (await page.content()).replace("<head>", `<head><base href="${origin}/">`),
  );
  await expect(noScript.locator("h1")).toBeVisible();
  await expect(noScript.locator(".service-card").first()).toBeVisible();
  await noScript.close();
  assert.deepEqual(pageErrors, [], "no browser JavaScript errors");
  console.log(
    "Passed mobile navigation, FAQ search/accordion, filters, service preselection, form validation, honest unconfigured errors, API safeguards and unknown-route checks.",
  );
  await browser.close();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
