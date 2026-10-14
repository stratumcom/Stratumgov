import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 375, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const section = page.locator(".testimonials-section");
    await expect(section).toBeVisible();
    assert.equal(await section.locator(".testimonial-slide").count(), 10);
    assert.equal(await section.locator(".testimonial-dot").count(), 10);
    await expect(section.getByRole("status")).toHaveText("Testimonial 1 of 10");
    await expect(section.getByRole("button", { name: "Previous testimonial" })).toBeDisabled();
    await section.getByRole("button", { name: "Next testimonial" }).click();
    await expect(section.getByRole("status")).toHaveText("Testimonial 2 of 10");
    await section.getByRole("button", { name: "Go to testimonial 10", exact: true }).click();
    await expect(section.getByRole("status")).toHaveText("Testimonial 10 of 10");
    await expect(section.getByRole("button", { name: "Next testimonial" })).toBeDisabled();
    const viewport = section.locator(".testimonial-viewport");
    await viewport.focus();
    await page.keyboard.press("Home");
    await expect(section.getByRole("status")).toHaveText("Testimonial 1 of 10");
    await page.keyboard.press("ArrowRight");
    await expect(section.getByRole("status")).toHaveText("Testimonial 2 of 10");
    await page.keyboard.press("End");
    await expect(section.getByRole("status")).toHaveText("Testimonial 10 of 10");
    await page.keyboard.press("ArrowLeft");
    await expect(section.getByRole("status")).toHaveText("Testimonial 9 of 10");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `No page overflow at ${width}px`);
    console.log(`Passed ten slides, arrows, indicators and keyboard controls at ${width}px.`);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator(".testimonials-section").getByRole("status")).toHaveText("Testimonial 9 of 10");
  const viewport = page.locator(".testimonial-viewport");
  assert.ok(await viewport.evaluate(el => Math.abs(el.scrollLeft - el.children[8].offsetLeft) <= 1), "Selected slide stays aligned on resize");
  assert.deepEqual(errors, []);
  console.log("Passed resizing and reduced-motion behavior; no browser JavaScript errors.");
} finally {
  await browser.close();
}
