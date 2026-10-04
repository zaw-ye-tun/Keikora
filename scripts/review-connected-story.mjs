import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:4173");
  await writeFile(
    "test-results/rendered-home.txt",
    await page.locator("body").innerText(),
    "utf8",
  );
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:4173");
    await page.screenshot({ path: `test-results/connected-hero-${width}.png` });
    for (const step of [
      "Assign and confirm the work",
      "Give employees their work view",
      "Keep the operational record",
    ]) {
      await page.getByRole("button", { name: step, exact: true }).click();
      await page
        .locator("#workflow-preview")
        .screenshot({
          path: `test-results/connected-${width}-${step.split(" ")[0]}.png`,
        });
    }
    await page.getByRole("tab", { name: "Calendar", exact: true }).click();
    await page
      .locator(".source-tour:not(.source-tour-hero)")
      .screenshot({ path: `test-results/connected-calendar-${width}.png` });
  }
} finally {
  await browser.close();
}
