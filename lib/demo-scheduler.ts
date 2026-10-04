import { demoRecord } from "./product-data";

// Synthetic fixtures only. Assignment rules mirror the scheduler source;
// this module never contacts its API, database or notification services.
export const demoEmployees = [
  { id: "emp-1", name: "Demo employee 1", priorityRank: 1 },
  { id: "emp-2", name: "Demo employee 2", priorityRank: 1 },
  { id: "emp-3", name: "Demo employee 3", priorityRank: 2 },
] as const;

export type DemoBooking = {
  code: string;
  date: string;
  startTime: string;
  endTime: string;
  customer: string;
  service: string;
  employeeId: string | null;
  status: "Pending" | "Confirmed";
};
export type DemoAvailability = {
  id: string;
  employeeId: string;
  startTime: string;
  endTime: string;
};
export const sampleMonday = "2026-10-12";
export const initialCalendarBookings: DemoBooking[] = [
  { code: demoRecord.code, date: sampleMonday, startTime: "09:00", endTime: "11:00", customer: demoRecord.customer, service: demoRecord.service, employeeId: "emp-1", status: "Confirmed" },
  { code: "DEMO-102", date: sampleMonday, startTime: "12:00", endTime: "16:00", customer: "Demo customer B", service: "Move-out cleaning", employeeId: null, status: "Pending" },
  { code: "DEMO-103", date: sampleMonday, startTime: "14:00", endTime: "16:00", customer: "Demo customer C", service: "Textile cleaning", employeeId: "emp-2", status: "Confirmed" },
  { code: "DEMO-104", date: sampleMonday, startTime: "09:00", endTime: "11:00", customer: "Demo customer D", service: "Home cleaning", employeeId: "emp-3", status: "Confirmed" },
  { code: "DEMO-105", date: sampleMonday, startTime: "09:30", endTime: "10:30", customer: "Demo customer E", service: "Textile cleaning", employeeId: null, status: "Pending" },
  { code: "DEMO-106", date: "2026-10-13", startTime: "09:00", endTime: "11:00", customer: "Demo customer F", service: "Home cleaning", employeeId: "emp-2", status: "Confirmed" },
  { code: "DEMO-107", date: "2026-10-14", startTime: "12:00", endTime: "13:00", customer: "Demo customer G", service: "Textile cleaning", employeeId: null, status: "Pending" },
  { code: "DEMO-108", date: "2026-10-15", startTime: "13:00", endTime: "15:00", customer: "Demo customer H", service: "Home cleaning", employeeId: "emp-3", status: "Confirmed" },
  { code: "DEMO-109", date: "2026-10-16", startTime: "09:00", endTime: "11:00", customer: "Demo customer I", service: "Home cleaning", employeeId: "emp-1", status: "Confirmed" },
  { code: "DEMO-110", date: "2026-10-17", startTime: "10:00", endTime: "12:00", customer: "Demo customer J", service: "Textile cleaning", employeeId: "emp-2", status: "Confirmed" },
  { code: "DEMO-111", date: sampleMonday, startTime: "11:00", endTime: "11:15", customer: "Demo customer K", service: "Textile cleaning", employeeId: null, status: "Pending" },
  { code: "DEMO-112", date: sampleMonday, startTime: "17:00", endTime: "18:00", customer: "Demo customer L", service: "Textile cleaning", employeeId: null, status: "Pending" },
];

export function dateAtOffset(offset: number) {
  const date = new Date(`${sampleMonday}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}
export function formatDemoDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
export function employeeName(id: string | null) {
  return demoEmployees.find((employee) => employee.id === id)?.name || "Unassigned";
}
export function availabilityForDate(date: string): DemoAvailability[] {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  if (weekday === 0) return [];
  if (weekday === 6) return [{ id: "sat-2", employeeId: "emp-2", startTime: "09:00", endTime: "14:00" }];
  return demoEmployees.flatMap((employee) => {
    // A split shift demonstrates that one complete interval must cover a job.
    const spans = employee.id === "emp-3" && weekday === 3
      ? [["08:00", "12:00"], ["13:00", "16:00"]]
      : [["08:00", "16:00"]];
    return spans.map(([startTime, endTime], index) => ({
      id: `${employee.id}-${weekday}-${index}`, employeeId: employee.id, startTime, endTime,
    }));
  });
}
export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
export function assignLanes(spans: { id: string; startTime: string; endTime: string }[]) {
  const ends: number[] = [];
  const laneMap: Record<string, number> = {};
  const sorted = [...spans].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime) || timeToMinutes(a.endTime) - timeToMinutes(b.endTime));
  for (const span of sorted) {
    let lane = ends.findIndex((end) => timeToMinutes(span.startTime) >= end);
    if (lane === -1) lane = ends.length;
    ends[lane] = timeToMinutes(span.endTime);
    laneMap[span.id] = lane;
  }
  return { laneMap, laneCount: ends.length };
}
export function assignmentError(booking: DemoBooking, employeeId: string, bookings: DemoBooking[]) {
  if (!demoEmployees.some((employee) => employee.id === employeeId)) return "Employee not found";
  if (new Date(`${booking.date}T00:00:00Z`).getUTCDay() === 0) return "Service is closed on Sundays";
  const start = timeToMinutes(booking.startTime);
  const end = timeToMinutes(booking.endTime);
  const covered = availabilityForDate(booking.date).some((slot) => slot.employeeId === employeeId && timeToMinutes(slot.startTime) <= start && timeToMinutes(slot.endTime) >= end);
  if (!covered) return "Employee not available at that time";
  const conflicts = bookings.some((other) => other.code !== booking.code && other.date === booking.date && other.employeeId === employeeId && start < timeToMinutes(other.endTime) + 15 && timeToMinutes(other.startTime) < end + 15);
  return conflicts ? "Employee already has a booking within 15 minutes of this work" : null;
}
export function autoAssignEmployee(booking: DemoBooking, bookings: DemoBooking[]) {
  return demoEmployees.filter((employee) => !assignmentError(booking, employee.id, bookings)).sort((a, b) => {
    const load = (id: string) => bookings.filter((other) => other.code !== booking.code && other.date === booking.date && other.employeeId === id).length;
    return a.priorityRank - b.priorityRank || load(a.id) - load(b.id) || a.name.localeCompare(b.name);
  })[0]?.id ?? null;
}
