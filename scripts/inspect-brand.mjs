import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
});
const page = await browser.newPage({
  reducedMotion: "reduce",
  viewport: { width: 1080, height: 900 },
});
const data = async (file) =>
  `data:image/png;base64,${(await readFile(file)).toString("base64")}`;
const sizes = [16, 24, 32, 64, 128];
const light = await data("public/brand/keikora_logo.png");
const dark = await data("public/brand/keikora_logo.png");
const logo = await data("public/brand/keikora_text.png");
const logoDark = await data("public/brand/keikora_text.png");
const row = (src) =>
  sizes
    .map(
      (size) =>
        `<div class="sample"><img src="${src}" width="${size}" height="${size}" alt="Keikora symbol at ${size} pixels"><span>${size}px</span></div>`,
    )
    .join("");
await page.setContent(
  `<style>body{margin:0;background:#f0f4f9;color:#14283f;font:15px Arial,sans-serif;padding:36px}h1{font-size:25px;margin:0 0 8px}p{color:#52647b;margin:0 0 24px}.panel{background:#fff;border-radius:12px;margin:20px 0;padding:26px}.panel.dark{background:#14283f;color:white}.samples{display:flex;align-items:center;justify-content:space-around;gap:20px}.sample{min-width:125px;display:flex;align-items:center;flex-direction:column;gap:18px}.sample img{object-fit:contain}.sample span{font-size:12px}.lockups{display:flex;align-items:center;gap:40px;justify-content:space-around}.lockups img{width:360px;height:85px}.label{font-size:12px;margin-bottom:18px;color:#52647b}.dark .label{color:#b8cbe0}</style><h1>Keikora · connected workflow identity</h1><p>Original PNG symbol legibility at 16, 24, 32, 64 and 128 pixels.</p><div class="panel"><div class="label">Transparent favicon on a light surface</div><div class="samples">${row(light)}</div></div><div class="panel dark"><div class="label">Original symbol on a dark surface</div><div class="samples">${row(dark)}</div></div><div class="panel"><div class="label">Original wordmark artwork</div><div class="lockups"><img src="${logo}" alt="Light Keikora logo"><div style="background:#fff;border-radius:10px;padding:16px"><img src="${logoDark}" alt="Dark Keikora logo"></div></div></div>`,
);
await page
  .locator("img")
  .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
await page.screenshot({
  path: "test-results/brand-legibility.png",
  fullPage: true,
});
for (const width of [375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://127.0.0.1:4173");
  await page.screenshot({ path: `test-results/brand-hero-${width}.png` });
  await page.locator("#workflow").screenshot({
    path: `test-results/brand-workflow-${width}.png`,
    style: ".site-header { visibility: hidden; }",
  });
}
await browser.close();
