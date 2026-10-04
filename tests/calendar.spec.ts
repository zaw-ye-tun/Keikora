import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { assignmentError, autoAssignEmployee, initialCalendarBookings } from "../lib/demo-scheduler";

test("mock assignment preserves the scheduler's conflict, coverage and ranking boundaries", () => {
  const sample = initialCalendarBookings;
  const booking = sample.find((item) => item.code === "DEMO-105")!;
  expect(assignmentError(booking, "emp-1", sample)).toMatch(/15 minutes/);
  expect(assignmentError(booking, "emp-2", sample)).toBeNull();
  expect(assignmentError(booking, "emp-3", sample)).toMatch(/15 minutes/);
  expect(autoAssignEmployee(booking, sample)).toBe("emp-2");
  // One employee can have several jobs, but the 15-minute boundary must hold.
  const afterMorning = { ...booking, startTime: "11:14", endTime: "12:00" };
  expect(assignmentError(afterMorning, "emp-1", sample)).toMatch(/15 minutes/);
  expect(assignmentError({ ...afterMorning, startTime: "11:15" }, "emp-1", sample)).toBeNull();
  // Saving the same booking again must exclude its own occupied time.
  expect(assignmentError(sample[0], "emp-1", sample)).toBeNull();
  const splitShift = sample.find((item) => item.code === "DEMO-107")!;
  expect(assignmentError(splitShift, "emp-3", sample)).toMatch(/not available/);
  expect(autoAssignEmployee(splitShift, sample)).toBe("emp-1");
  expect(autoAssignEmployee(sample.find((item) => item.code === "DEMO-112")!, sample)).toBeNull();
  const afternoon = sample.find((item) => item.code === "DEMO-102")!;
  expect(autoAssignEmployee(afternoon, sample)).toBe("emp-1");
  // Equal priority: fewer jobs first, then alphabetical name. Higher rank loses.
  const noLoad = sample.filter((item) => item.date !== booking.date);
  expect(autoAssignEmployee(booking, noLoad)).toBe("emp-1");
  const onlyEmployeeOneBusyLater = [...noLoad, { ...sample[0], startTime: "14:00", endTime: "15:00" }];
  expect(autoAssignEmployee(booking, onlyEmployeeOneBusyLater)).toBe("emp-2");
});

test("calendar assigns concurrent work to different employees and shares the updated record", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Calendar", exact: true }).click();
  const calendar = page.locator(".demo-calendar");
  const booking = calendar.getByRole("article", { name: "Booking DEMO-105", exact: true });
  await booking.getByLabel("Employee for DEMO-105").selectOption("emp-1");
  await booking.getByRole("button", { name: "Save", exact: true }).click();
  await expect(booking.getByRole("status")).toContainText("within 15 minutes");
  await expect(booking).toHaveAttribute("data-employee", "unassigned");
  await booking.getByLabel("Employee for DEMO-105").selectOption("emp-2");
  await booking.getByRole("button", { name: "Save", exact: true }).click();
  await expect(booking.getByRole("status")).toContainText("Assigned to Demo employee 2");
  await expect(booking.locator(".source-status")).toHaveText("Confirmed");
  await expect(calendar.locator('.calendar-booking-bar[data-code="DEMO-105"]')).toHaveAttribute("data-employee", "emp-2");
  await booking.getByRole("button", { name: "Save", exact: true }).click();
  await expect(booking.getByRole("status")).toContainText("Confirmed in this demo");
  await page.getByRole("tab", { name: "Operations", exact: true }).click();
  const operation = page.getByRole("tabpanel").locator(".source-booking").filter({ hasText: "DEMO-105" });
  await expect(operation).toContainText("Demo employee 2");
  await page.getByRole("tab", { name: "Bookings", exact: true }).click();
  await expect(page.getByRole("tabpanel").locator(".confirmed-summary").filter({ hasText: "DEMO-105" })).toContainText("Demo employee 2");
  await page.getByRole("tab", { name: "Calendar", exact: true }).click();
  await expect(booking.getByLabel("Employee for DEMO-105")).toHaveValue("emp-2");
  await calendar.getByRole("button", { name: "Reset demo", exact: true }).click();
  await expect(booking).toHaveAttribute("data-employee", "unassigned");
});

test("calendar supports repeated jobs, reassignment, unassignment and no-candidate feedback locally", async ({ page }) => {
  const apiRequests: string[] = [];
  page.on("request", (request) => { if (new URL(request.url()).pathname.startsWith("/api/")) apiRequests.push(request.url()); });
  await page.goto("/");
  await page.getByRole("tab", { name: "Calendar", exact: true }).click();
  const calendar = page.locator(".demo-calendar");
  const afternoon = calendar.getByRole("article", { name: "Booking DEMO-102", exact: true });
  await afternoon.getByRole("button", { name: "Auto-assign", exact: true }).click();
  await expect(afternoon).toHaveAttribute("data-employee", "emp-1");
  await afternoon.getByLabel("Employee for DEMO-102").selectOption("emp-3");
  await afternoon.getByRole("button", { name: "Save", exact: true }).click();
  await expect(afternoon).toHaveAttribute("data-employee", "emp-3");
  await afternoon.getByLabel("Employee for DEMO-102").selectOption("emp-2");
  await afternoon.getByRole("button", { name: "Save", exact: true }).click();
  await expect(afternoon.getByRole("status")).toContainText("within 15 minutes");
  await expect(afternoon).toHaveAttribute("data-employee", "emp-3");
  await afternoon.getByLabel("Employee for DEMO-102").selectOption("");
  await afternoon.getByRole("button", { name: "Save", exact: true }).click();
  await expect(afternoon.locator(".source-status")).toHaveText("Pending");
  await expect(afternoon).toHaveAttribute("data-employee", "unassigned");
  const late = calendar.getByRole("article", { name: "Booking DEMO-112", exact: true });
  await late.getByRole("button", { name: "Auto-assign", exact: true }).click();
  await expect(late.getByRole("status")).toContainText("No available employee found");
  await late.getByLabel("Employee for DEMO-112").selectOption("emp-1");
  await late.getByRole("button", { name: "Save", exact: true }).click();
  await expect(late.getByRole("status")).toContainText("not available");
  await calendar.getByRole("button", { name: "Next day", exact: true }).click();
  await calendar.getByRole("button", { name: "Next day", exact: true }).click();
  const split = calendar.getByRole("article", { name: "Booking DEMO-107", exact: true });
  await split.getByLabel("Employee for DEMO-107").selectOption("emp-3");
  await split.getByRole("button", { name: "Save", exact: true }).click();
  await expect(split.getByRole("status")).toContainText("not available");
  await split.getByRole("button", { name: "Auto-assign", exact: true }).click();
  await expect(split).toHaveAttribute("data-employee", "emp-1");
  await calendar.getByRole("button", { name: "Previous day", exact: true }).click();
  const upcoming = calendar.getByRole("article", { name: "Booking DEMO-106", exact: true });
  await upcoming.getByLabel("Employee for DEMO-106").selectOption("emp-3");
  await upcoming.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("tab", { name: "Operations", exact: true }).click();
  await expect(page.getByRole("tabpanel").locator(".upcoming-row")).toContainText("Demo customer F");
  await expect(page.getByRole("tabpanel").locator(".upcoming-row")).toContainText("Demo employee 3");
  expect(apiRequests).toEqual([]);
});

test("seven-day time lanes, day navigation and display filters stay accessible at all tour widths", async ({ page }) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.getByRole("tab", { name: "Calendar", exact: true }).click();
    const calendar = page.locator(".demo-calendar");
    await expect(calendar.locator(".calendar-timeline-day")).toHaveCount(7);
    await expect(calendar.locator(".calendar-employee-key")).toContainText("Demo employee 3");
    if (width >= 768) {
      const first = calendar.locator(".calendar-timeline-day").first();
      const a = await first.locator('.calendar-booking-bar[data-code="DEMO-101"]').boundingBox();
      const b = await first.locator('.calendar-booking-bar[data-code="DEMO-104"]').boundingBox();
      expect(a!.y).toBe(b!.y);
      expect(a!.x).not.toBe(b!.x);
      const track = await first.locator(".calendar-time-track").boundingBox();
      for (const bar of await first.locator(".calendar-booking-bar").all()) {
        const box = await bar.boundingBox();
        expect(box!.x + box!.width).toBeLessThanOrEqual(track!.x + track!.width);
      }
      await calendar.getByLabel("Compact", { exact: true }).check();
      await expect(first.locator(".calendar-time-track")).toHaveCSS("height", "260px");
      await calendar.getByLabel("Compact", { exact: true }).uncheck();
    } else await expect(calendar.locator(".calendar-timeline-grid")).toBeHidden();
    await calendar.getByLabel("Availability", { exact: true }).uncheck();
    await expect(calendar.locator(".calendar-availability-bar")).toHaveCount(0);
    await expect(calendar.locator(".calendar-day-availability")).toHaveCount(0);
    await calendar.getByLabel("Availability", { exact: true }).check();
    await calendar.getByLabel("Bookings", { exact: true }).uncheck();
    await expect(calendar.locator(".calendar-booking-bar")).toHaveCount(0);
    await expect(calendar.locator(".calendar-day-bookings")).toHaveCount(0);
    await calendar.getByLabel("Bookings", { exact: true }).check();
    const violations = (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations;
    expect(violations.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target) }))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await calendar.screenshot({ path: `test-results/calendar-${width}.png`, style: ".site-header { visibility: hidden; }" });
    for (let day = 0; day < 6; day++) await calendar.getByRole("button", { name: "Next day", exact: true }).click();
    await expect(calendar.locator(".calendar-day-details")).toContainText("Sunday (closed)");
    await expect(calendar.getByRole("button", { name: "Next day", exact: true })).toBeDisabled();
    await calendar.getByRole("button", { name: "Next", exact: true }).click();
    await expect(calendar.locator(".calendar-week-title")).toContainText("19–25 October");
    await calendar.getByRole("button", { name: "Sample week", exact: true }).click();
    await expect(calendar.locator(".calendar-week-title")).toContainText("12–18 October");
  }
  expect(errors).toEqual([]);
});
