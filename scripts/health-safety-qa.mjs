import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

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
  await fs.mkdir("docs/preview/health-safety", { recursive: true });

  async function fits() {
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Content fits viewport");
  }

  async function finish(answerIndex, emergencyMissing = false) {
    for (let index = 0; index < 10; index++) {
      await expect(page.getByText(`Question ${index + 1} of 10`, { exact: true })).toBeVisible();
      await page.getByRole("radio").nth(emergencyMissing && index === 3 ? 2 : answerIndex).check();
      await page.getByRole("button", { name: index === 9 ? "View results" : "Next", exact: true }).click();
    }
  }

  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin, { waitUntil: "networkidle" });
    const section = page.getByRole("region", { name: "How Safe and Compliant Is Your Workplace?" });
    await expect(section).toBeVisible();
    assert.equal(await section.locator("li").count(), 3);
    await expect(section.getByText(/Approximately 3–5 minutes/)).toBeVisible();
    await expect(page.locator(".hero-copy h1")).toHaveText("Stratum Governance Ltd.");
    await expect(page.locator(".service-card").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "A clear path forward." })).toBeVisible();
    await fits();
    if (width === 375 || width === 1280) {
      await section.screenshot({ path: `docs/preview/health-safety/home-section-${width}.png` });
    }
    const cta = section.getByRole("link", { name: "Take the Health & Safety Test" });
    await expect(cta).toHaveAttribute("href", "/health-safety-check");
    await cta.click();
    await page.waitForURL("**/health-safety-check");
    await expect(page.getByRole("heading", { name: "A clearer picture of workplace safety." })).toBeVisible();
    assert.equal(await page.locator("h1").count(), 1);
    await fits();
    await page.getByRole("button", { name: "Start the health check" }).click();
    await expect(page.getByRole("button", { name: "Previous", exact: true })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    await expect(page.locator("h2").last()).toBeFocused();

    // Radio controls support keyboard interaction and retain edited answers.
    await page.getByRole("radio").first().focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("radio").nth(1)).toBeChecked();
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page.getByRole("radio").first()).not.toBeChecked();
    await page.getByRole("button", { name: "Previous", exact: true }).click();
    await expect(page.getByRole("radio").nth(1)).toBeChecked();
    await page.getByRole("radio").first().check();
    await fits();
    if (width === 375 || width === 1280) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `docs/preview/health-safety/question-${width}.png`, fullPage: true });
    }
    await finish(0, true);
    await expect(page.getByLabel("Score: 90 percent")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Priority safety concerns identified" })).toBeFocused();
    await expect(page.getByRole("heading", { name: "Potentially serious safety concerns" })).toBeVisible();
    assert.equal(await page.getByRole("region", { name: "Reported strengths" }).locator("li").count(), 9);
    assert.equal(await page.getByRole("region", { name: "Potential gaps and unknowns" }).locator("li").count(), 1);
    await expect(page.getByRole("region", { name: "Recommended next steps" })).toContainText("Keep escape routes clear");
    await fits();
    if (width === 375 || width === 1280) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `docs/preview/health-safety/results-${width}.png`, fullPage: true });
    }
    await page.getByRole("button", { name: "Retake the test" }).click();
    await expect(page.getByRole("heading", { name: "A clearer picture of workplace safety." })).toBeFocused();
    await page.getByRole("button", { name: "Start the health check" }).click();
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    assert.equal(await page.locator('input[type="radio"]:checked').count(), 0);
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
    console.log(`Passed homepage link, navigation, keyboard controls, serious concern at 90%, reset, and responsive layout at ${width}px.`);
  }

  await page.goto(origin + "/health-safety-check");
  await page.getByRole("button", { name: "Start the health check" }).click();
  await finish(0);
  await expect(page.getByLabel("Score: 100 percent")).toBeVisible();
  await expect(page.getByRole("heading", { name: "A strong reported foundation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Potentially serious safety concerns" })).toHaveCount(0);
  await page.getByRole("button", { name: "Retake the test" }).click();
  await page.getByRole("button", { name: "Start the health check" }).click();
  await finish(3);
  await expect(page.getByLabel("Score: 0 percent")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Significant gaps or unknowns to address" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Potentially serious safety concerns" })).toHaveCount(0);
  assert.equal(await page.getByRole("region", { name: "Recommended next steps" }).locator("li").count(), 10);
  await page.getByRole("link", { name: "Back to homepage", exact: true }).last().click();
  await page.waitForURL(origin + "/");

  await page.goto(origin + "/health-safety-check");
  await page.getByRole("button", { name: "Start the health check" }).click();
  await finish(2);
  await expect(page.getByLabel("Score: 0 percent")).toBeVisible();
  assert.equal(await page.getByRole("region", { name: "Potentially serious safety concerns" }).locator("li").count(), 5);
  await fits();
  assert.deepEqual(errors, [], "No browser JavaScript errors");
  console.log("Passed all-established, all-unknown, all-missing results and homepage return; no browser JavaScript errors.");
} finally {
  await browser.close();
}
