import { chromium, expect as defaultExpect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";
const expect = defaultExpect.configure({ timeout: 20000 });
const origin = process.env.QA_ORIGIN || "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await fs.mkdir("docs/preview/compliance", { recursive: true });
  const fits = async () =>
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `Page fits at ${(await page.viewportSize()).width}px: ${page.url()}`,
    );
  async function profile(overrides = {}) {
    const values = {
      companyType: "ltd",
      foreignShareholders: "yes",
      foreignWorkers: "yes",
      employees: "5+",
      scumlSector: "yes",
      regulatedProducts: "yes",
      ...overrides,
    };
    for (const [key, value] of Object.entries(values))
      await page.locator(`#profile-${key}`).selectOption(value);
    await page.getByRole("button", { name: "Continue to checklist" }).click();
  }
  async function finish(mode = "healthy") {
    let count = 0;
    while (await page.getByText("STEP 2 OF 3", { exact: false }).count()) {
      const radio = page.getByRole("radio").first();
      const name = await radio.getAttribute("name");
      const value =
        mode === "unknown"
          ? "unsure"
          : name === "unfiled-changes"
            ? "no"
            : mode === "gap" && name === "nipc"
              ? "no"
              : "yes";
      await page.locator(`input[name="${name}"][value="${value}"]`).check();
      await fits();
      await page.getByRole("button", { name: /^(Next|View results)$/ }).click();
      assert.ok(++count <= 12, "Question loop terminates");
    }
    return count;
  }
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/services",
      "/about",
      "/promotions",
      "/terms-of-service",
      "/compliance-health-check",
    ]) {
      const response = await page.goto(origin + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200);
      assert.equal(await page.locator("h1").count(), 1);
      await fits();
      if (route === "/services") {
        assert.equal(await page.locator(".service-card").count(), 6);
        await page
          .getByRole("button", { name: "Management & HR", exact: true })
          .click();
        assert.equal(await page.locator(".service-card").count(), 1);
        await page.locator(".service-card a").click();
        await page.waitForURL("**/services/institutional-management-hr");
        await expect(
          page.getByRole("heading", {
            name: "Custom Employee Handbooks",
            exact: true,
          }),
        ).toBeVisible();
        await fits();
      }
      if (route === "/") {
        assert.equal(await page.locator(".service-card").count(), 6);
        await expect(
          page.getByRole("link", {
            name: "Take the free compliance health check",
            exact: true,
          }),
        ).toHaveAttribute("href", "/compliance-health-check");
        if ([375, 1280].includes(width))
          await page
            .locator(".service-card")
            .first()
            .locator("..")
            .screenshot({
              path: `docs/preview/compliance/services-${width}.png`,
            });
      }
      if (route === "/promotions")
        await expect(page.getByRole("status")).toContainText("validity window");
    }
    await profile();
    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeDisabled();
    await page.getByRole("radio").first().focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("radio").nth(1)).toBeChecked();
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await page.getByRole("button", { name: "Previous", exact: true }).click();
    await expect(page.getByRole("radio").nth(1)).toBeChecked();
    assert.equal(await finish("gap"), 11);
    await expect(page.getByLabel("Score: 91 percent")).toBeVisible();
    await expect(
      page.getByRole("region", {
        name: "Potential gaps requiring action",
        exact: true,
      }),
    ).toContainText("NIPC registration");
    await fits();
    if ([375, 1280].includes(width))
      await page
        .locator("main")
        .screenshot({ path: `docs/preview/compliance/results-${width}.png` });
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Download my health report (PDF)" })
      .click();
    const download = await downloadPromise;
    const pdfPath = `/tmp/stratum-browser-report-${width}.pdf`;
    await download.saveAs(pdfPath);
    const text = execFileSync("pdftotext", [pdfPath, "-"], {
      encoding: "utf8",
    });
    assert.match(text, /91% - Action required/);
    assert.match(text, /ACTION REQUIRED: NIPC registration/);
    assert.match(text, /Your answer: No/);
    await page
      .getByRole("link", {
        name: "Book a free regularization strategy session",
        exact: true,
      })
      .click();
    await expect(page.locator("#consultation-message")).toHaveValue(
      /free regularization strategy session/,
    );
    await fits();
    console.log(
      `Passed pages, filtering, keyboard answers, 11-question flow, PDF download and consultation at ${width}px.`,
    );
  }
  await page.goto(origin + "/compliance-health-check");
  await profile({
    employees: "0",
    foreignShareholders: "no",
    foreignWorkers: "no",
    scumlSector: "no",
    regulatedProducts: "no",
  });
  assert.equal(await finish(), 4);
  await expect(page.getByLabel("Score: 100 percent")).toBeVisible();
  await page.getByRole("button", { name: "Review my answers" }).click();
  await expect(page.getByRole("radio").first()).toBeChecked();
  await page.getByRole("button", { name: "Edit company profile" }).click();
  await profile({
    foreignShareholders: "no",
    foreignWorkers: "no",
    employees: "1-2",
    scumlSector: "unsure",
    regulatedProducts: "unsure",
  });
  await expect(
    page.getByRole("button", { name: "Next", exact: true }),
  ).toBeDisabled();
  assert.equal(await finish("unknown"), 7);
  await expect(page.getByLabel("Score: 0 percent")).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Potential gaps requiring action" }),
  ).toContainText("No gaps reported");
  await page.getByRole("button", { name: "Start again" }).click();
  await expect(page.locator("#profile-companyType")).toHaveValue("");
  await page.goto(origin + "/promotions");
  await page
    .locator("#offer-5")
    .getByRole("link", { name: "Enquire about this offer" })
    .click();
  await expect(page.locator("#consultation-service")).toContainText(
    "Brand Architecture",
  );
  await expect(page.locator("#consultation-message")).toHaveValue(
    /Trademark Bundle/,
  );
  await page.goto(origin + "/services/business-incorporation");
  await expect(page).toHaveURL(/\/services\/company-formation-market-entry$/);
  assert.deepEqual(errors, [], "No browser JavaScript errors");
  console.log(
    "Passed shorter conditional checklist, unknowns, profile edits, reset, offer prefill, legacy URL redirect, and no JavaScript errors.",
  );
} finally {
  await browser.close();
}
