import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { workflow } from "../lib/product-data";
test("main navigation links match the visible sections on desktop and mobile", async ({ page }) => {
  test.setTimeout(60_000);
  const sections = [
    ["Product", "product"],
    ["How it works", "workflow"],
    ["For businesses", "businesses"],
    ["Our story", "story"],
  ] as const;
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    expect(await page.evaluate(() => {
      const product = document.getElementById("product")!;
      const workflow = document.getElementById("workflow")!;
      const businesses = document.getElementById("businesses")!;
      const story = document.getElementById("story")!;
      return [
        [product, workflow],
        [workflow, businesses],
        [businesses, story],
      ].every(([before, after]) => Boolean(before.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_FOLLOWING));
    })).toBe(true);
    for (const [label, id] of sections) {
      const mobile = width <= 800;
      if (mobile) await page.getByRole("button", { name: "Open navigation" }).click();
      const links = page.locator(mobile ? "#mobile-navigation" : ".desktop-links");
      await links.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const section = page.getByRole("region", { name: label, exact: true });
      await expect(section.locator(".eyebrow").first()).toHaveText(label.toUpperCase());
      const heading = await section.locator("h2").boundingBox();
      const header = await page.locator(".site-header").boundingBox();
      expect(heading!.y).toBeGreaterThan(header!.y + header!.height);
      const nav = await page.locator(".nav").boundingBox();
      const container = await (id === "story" || id === "workflow" ? section.locator(".container").first() : section).boundingBox();
      expect(container!.x).toBe(nav!.x);
      expect(container!.width).toBe(nav!.width);
      await expect(page.locator(`.desktop-links a[href="#${id}"]`)).toHaveAttribute("aria-current", "location");
      if (mobile) {
        const beforeFocus = await page.evaluate(() => scrollY);
        await page.getByRole("button", { name: "Open navigation" }).focus();
        await page.keyboard.press("Enter");
        expect(await page.evaluate(() => scrollY)).toBe(beforeFocus);
        await expect(page.locator(`#mobile-navigation a[href="#${id}"]`)).toHaveAttribute("aria-current", "location");
        await page.getByRole("button", { name: "Close navigation" }).click();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await section.screenshot({ path: `test-results/${id}-${width}.png`, style: ".site-header { visibility: hidden; }" });
    }
    await page.goBack();
    await expect(page.locator('.desktop-links a[href="#businesses"]')).toHaveAttribute("aria-current", "location");
    await page.goForward();
    await expect(page.locator('.desktop-links a[href="#story"]')).toHaveAttribute("aria-current", "location");
    await page.getByRole("region", { name: "Our story", exact: true }).getByRole("link", { name: "See the implemented views" }).click();
    await expect(page.locator('.desktop-links a[href="#product"]')).toHaveAttribute("aria-current", "location");
    await expect(page.locator('.footer-links a[href="/#businesses"]')).toHaveText("For businesses");
  }
});
test("one fictional booking connects the six truthful product views", async ({
  page,
}) => {
  await page.goto("/");
  const tour = page.locator(".source-tour:not(.source-tour-hero)");
  for (const [tab, evidence] of [
    ["Operations", "DEMO-101"],
    ["Bookings", "DEMO-101"],
    ["Calendar", "DEMO-101"],
    ["Availability", "Demo employee 1"],
    ["Customers", "DEMO-C01"],
    ["Invoices", "DEMO-101"],
  ]) {
    await page.getByRole("tab", { name: tab, exact: true }).click();
    await expect(tour.locator(".tour-record")).toContainText(
      "DEMO-101 · Demo customer A",
    );
    await expect(page.getByRole("tabpanel")).toContainText(evidence);
    await expect(page.getByRole("tabpanel")).toContainText(
      "Recreated UI · synthetic data",
    );
  }
  await expect(page.locator("#businesses .industry-origin")).toHaveText(
    "Originating environment",
  );
  await expect(
    page.locator("#businesses .industry-status:not(.industry-origin)"),
  ).toHaveCount(5);
  await expect(page.locator("#roadmap")).toContainText("calendar and assignment");
  await expect(page.locator("#roadmap")).toContainText("Calendar");
  await expect(
    page.locator("#roadmap article").filter({
      has: page.locator("h3", { hasText: /^Calendar$/ }),
    }),
  ).toContainText("Implemented");
  await expect(page.locator("#roadmap")).not.toContainText("Google Calendar sync");
  await expect(page.getByRole("tabpanel")).not.toContainText("email drafts");
});
test("the first screen stays lean while scroll motion drives the workflow record", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".source-tour-hero")).toHaveCount(0);
  await expect(page.locator(".hero-flow")).toBeVisible();
  await expect(page.locator(".source-tour:not(.source-tour-hero)")).toHaveCount(1);
  const geometry = await page.locator(".workflow-track").evaluate((node) => {
    const stage = node.querySelector(".workflow-sticky") as HTMLElement;
    return {
      start:
        scrollY +
        node.getBoundingClientRect().top -
        parseFloat(getComputedStyle(stage).top),
      distance: (node as HTMLElement).offsetHeight - stage.offsetHeight,
    };
  });
  await page.evaluate(
    ({ start, distance }) => window.scrollTo(0, start + distance * 0.42),
    geometry,
  );
  await expect(page.locator("#workflow-preview h3")).toHaveText(
    "Assign and confirm the work",
  );
  const checks = page.locator("#workflow-preview .assignment-check");
  const checked = () =>
    checks.last().evaluate((node) => getComputedStyle(node, "::after").opacity);
  await expect.poll(checked).toBe("0");
  const record = await page.locator(".workflow-record").elementHandle();
  await page.mouse.wheel(0, geometry.distance * 0.17);
  await expect.poll(checked).toBe("1");
  await expect(page.locator(".assignment-result").first()).toContainText(
    "Employee 1",
  );
  await expect(
    page.locator(".assignment-check[data-check=conflict]").first(),
  ).toContainText("Conflict");
  expect(
    await page
      .locator(".workflow-record")
      .evaluate((node, original) => node === original, record),
  ).toBe(true);
  await page.mouse.wheel(0, -geometry.distance * 0.17);
  await expect.poll(checked).toBe("0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(checked).toBe("1");
  await expect(page.locator(".workflow-record")).toContainText("DEMO-101");
  expect(
    await page
      .locator(".workflow-record")
      .evaluate((node) => getComputedStyle(node).transform),
  ).toBe("none");
  await page.setViewportSize({ width: 375, height: 700 });
  await expect(page.locator(".workflow-track")).toBeHidden();
  await expect(
    page.locator(".workflow-linear .assignment-result"),
  ).toBeVisible();
});
test("illustration follows scrolling and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const scene = page.locator(".work-illustration");
    const image = scene.locator("img");
    await scene.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth))
      .toBe(1000);
    await expect(image).toHaveAttribute(
      "alt",
      /calendar, work checklist and employee view/,
    );
    const movement = async () =>
      image.evaluate((node) => getComputedStyle(node).transform);
    const before = await movement();
    const connector = scene.locator(".illustration-connection-progress");
    const connectorProgress = () =>
      connector.evaluate((node) => getComputedStyle(node).strokeDashoffset);
    const connectorBefore = await connectorProgress();
    await page.mouse.wheel(0, 180);
    await expect.poll(movement).not.toBe(before);
    await expect.poll(connectorProgress).not.toBe(connectorBefore);
    await scene.scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await scene.screenshot({
      path: `test-results/work-illustration-${width}.png`,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(movement).toBe("none");
    await page.mouse.wheel(0, -160);
    await expect.poll(movement).toBe("none");
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
});
for (const width of [375, 768, 1024, 1440]) {
  test(`layout, content and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("Work gets coordinated.");
    for (const href of await page
      .locator('a[href^="#"], a[href^="/#"]')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")!),
      )) {
      const id = href.split("#")[1];
      if (id) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
    }
    await page.locator("#early-access").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}
test("demo views, keyboard navigation and workflow actually change", async ({
  page,
}) => {
  test.setTimeout(60_000);
  // Taller displays use the pinned workflow; short ones show the linear story.
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/");
  await page.getByRole("tab", { name: "Bookings", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Pending bookings");
  await page
    .getByRole("tab", { name: "Bookings", exact: true })
    .press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Calendar", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("12–18 October");
  await page.getByRole("tab", { name: "Customers", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Job logs");
  await page
    .getByRole("button", { name: /Assign and confirm the work/ })
    .click();
  await expect(page.locator(".workflow-preview h3")).toHaveText(
    "Assign and confirm the work",
  );
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const name of [
      "Operations",
      "Bookings",
      "Calendar",
      "Availability",
      "Customers",
      "Invoices",
    ]) {
      await page.getByRole("tab", { name, exact: true }).click();
      await expect(
        page.getByRole("tab", { name, exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await expect(page.getByRole("tabpanel")).toContainText("Recreated UI");
      await expect(page.locator(".tour-explanation")).toContainText(
        "Implemented",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      await page.locator(".source-tour:not(.source-tour-hero)").screenshot({
        path: `test-results/tour-${name}-${width}.png`,
        style: ".site-header { visibility: hidden; }",
      });
    }
  }
});
test("mobile navigation and validated form opens a monitored email draft", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Development" })
    .press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  const form = page.locator("form");
  await form.getByRole("button").click();
  expect(
    await form.evaluate((el) => (el as HTMLFormElement).checkValidity()),
  ).toBe(false);
  await page.getByLabel("Name", { exact: true }).fill("Test Owner");
  await page.getByLabel("Business name").fill("Example Services");
  await page.getByLabel("Email", { exact: true }).fill("invalid");
  expect(
    await form.evaluate((el) => (el as HTMLFormElement).checkValidity()),
  ).toBe(false);
  await page.getByLabel("Email", { exact: true }).fill("owner@example.com");
  await page
    .getByLabel("Type of service business")
    .selectOption("Installation");
  await form.getByRole("button").click();
  await expect(page.getByRole("status")).toContainText(
    "Your email app has been requested",
  );
  await expect(page.getByText("This opens your email app")).toBeVisible();
});
test("privacy and exported SEO assets are available", async ({
  page,
  request,
}) => {
  await page.goto("/privacy/");
  await expect(page.locator("h1")).toContainText("Your information.");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.webmanifest",
    "/brand/social-card.png",
  ])
    expect((await request.get(path)).ok()).toBe(true);
  await page.goto("/");
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "https://keikora.fi/",
  );
});

test("original PNG branding and restrained motion respect visitor preferences", async ({
  page,
  request,
}) => {
  for (const asset of ["keikora_logo.png", "keikora_text.png"]) {
    const response = await request.get(`/brand/${asset}`);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
    expect(await response.body()).toEqual(
      await readFile(`public/brand/${asset}`),
    );
  }
  expect(await (await request.get("/icon.png")).body()).toEqual(
    await readFile("public/brand/keikora_logo.png"),
  );
  await page.goto("/");
  await expect(page.locator(".nav .logo-wordmark")).toHaveAttribute(
    "src",
    "/brand/keikora_text.png",
  );
  await expect(page.locator(".nav .workflow-mark")).toHaveAttribute(
    "src",
    "/brand/keikora_logo.png",
  );
  const symbol = page.locator(".hero-flow .workflow-mark");
  expect(await symbol.evaluate((el) => el.getAnimations().length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  const timings = await symbol.evaluate((el) =>
    el.getAnimations().map((animation) => animation.effect!.getTiming()),
  );
  expect(timings.length).toBeGreaterThan(0);
  expect(
    timings.every(
      (timing) => Number(timing.duration) <= 2000 && timing.iterations === 1,
    ),
  ).toBe(true);
  await symbol.evaluate((el) =>
    Promise.all(el.getAnimations().map((animation) => animation.finished)),
  );
  expect(
    await symbol.evaluate((el) => Number(getComputedStyle(el).opacity)),
  ).toBe(1);
});

test("one 100px wheel movement advances each workflow step and reverses without clicks", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const range = await page.locator(".workflow-track").evaluate((el) => {
      const stage = el.querySelector<HTMLElement>(".workflow-sticky")!;
      return {
        start:
          scrollY +
          el.getBoundingClientRect().top -
          Number.parseFloat(getComputedStyle(stage).top),
        travel: (el as HTMLElement).offsetHeight - stage.offsetHeight,
      };
    });
    expect(range.travel).toBe(workflow.length * 100);
    await page.evaluate(
      (y) => scrollTo({ top: y, behavior: "instant" }),
      range.start + range.travel * 0.07,
    );
    await expect(page.locator(".workflow-preview h3")).toHaveText(
      workflow[0].title,
    );
    for (let index = 1; index < workflow.length; index++) {
      await page.mouse.wheel(0, 100);
      await expect(page.locator(".workflow-preview h3")).toHaveText(
        workflow[index].title,
      );
      await expect(
        page.getByRole("button", { name: workflow[index].title, exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      const box = await page.locator(".workflow-preview").boundingBox();
      expect(box!.y).toBeGreaterThanOrEqual(66);
      expect(box!.y + box!.height).toBeLessThanOrEqual(900);
      if (index === 2 || index === 4)
        await page.screenshot({
          path: `test-results/scroll-workflow-${width}-${index}.png`,
          animations: "disabled",
        });
    }
    for (let index = workflow.length - 2; index >= 0; index--) {
      await page.mouse.wheel(0, -100);
      await expect(page.locator(".workflow-preview h3")).toHaveText(
        workflow[index].title,
      );
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(
      await page
        .locator(".workflow-scene")
        .evaluate((el) => el.getAnimations().length),
    ).toBe(0);
    await page
      .getByRole("button", { name: workflow[2].title, exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".workflow-preview h3")).toHaveText(
      workflow[2].title,
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const previousY = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, range.travel * 1.2);
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeGreaterThan(previousY + range.travel * 0.8);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("short screens show every workflow chapter in the normal page flow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 600 });
  await page.goto("/#workflow");
  await expect(page.locator(".workflow-track")).toBeHidden();
  await expect(page.locator(".workflow-chapter")).toHaveCount(workflow.length);
  for (const step of workflow)
    await expect(
      page
        .locator(".workflow-linear")
        .getByRole("heading", { name: step.title, exact: true }),
    ).toBeVisible();
  await page.locator(".workflow-chapter").last().scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
