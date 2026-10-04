import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ reducedMotion: "reduce" });
for (const width of [375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://127.0.0.1:4173");
  console.log(
    width,
    await page.evaluate(() =>
      [...document.querySelectorAll("body *")]
        .map((el) => ({
          tag: el.tagName,
          class: el.className.baseVal ?? el.className,
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right),
        }))
        .filter((el) => el.right > innerWidth + 1 || el.left < -1)
        .slice(0, 15),
    ),
  );
  await page.screenshot({
    path: `test-results/inspect-${width}.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `test-results/hero-${width}.png` });
  if (width === 1440 || width === 375) {
    await page
      .locator(".source-tour:not(.source-tour-hero)")
      .screenshot({
        path: `test-results/demo-${width}.png`,
        style: ".site-header { visibility: hidden; }",
      });
  }
}
await browser.close();
