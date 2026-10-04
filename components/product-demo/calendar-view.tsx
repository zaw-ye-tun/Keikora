"use client";

import { useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import {
  assignLanes, assignmentError, autoAssignEmployee, availabilityForDate,
  dateAtOffset, demoEmployees, employeeName, formatDemoDate,
  timeToMinutes, type DemoBooking,
} from "@/lib/demo-scheduler";
import { ScreenHeading, Status } from "./views";

type Props = {
  bookings: DemoBooking[];
  onAssign: (code: string, employeeId: string | null) => void;
  onReset: () => void;
};
type Edit = { employeeId: string; message: string; error: string };

export function CalendarView({ bookings, onAssign, onReset }: Props) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [dayIndex, setDayIndex] = useState(0);
  const [showAvailability, setShowAvailability] = useState(true);
  const [showBookings, setShowBookings] = useState(true);
  const [compact, setCompact] = useState(false);
  const [edits, setEdits] = useState<Record<string, Edit>>({});
  const days = Array.from({ length: 7 }, (_, index) => dateAtOffset(weekOffset * 7 + index));
  const selectedDate = days[dayIndex];
  const selectedAvailability = availabilityForDate(selectedDate);
  const selectedBookings = bookings.filter((booking) => booking.date === selectedDate);
  const weekBookings = bookings.filter((booking) => days.includes(booking.date));
  const minutes = [
    ...days.flatMap((date) => availabilityForDate(date).flatMap((slot) => [timeToMinutes(slot.startTime), timeToMinutes(slot.endTime)])),
    ...weekBookings.flatMap((booking) => [timeToMinutes(booking.startTime), timeToMinutes(booking.endTime)]),
  ];
  const firstHour = Math.max(0, Math.floor(Math.min(...minutes) / 60) - 1);
  const lastHour = Math.min(24, Math.ceil(Math.max(...minutes) / 60) + 1);
  const totalMinutes = Math.max(lastHour - firstHour, 4) * 60;
  const hours = Array.from({ length: lastHour - firstHour + 1 }, (_, index) => firstHour + index);
  const position = (start: string, end: string): CSSProperties => ({
    top: `${((timeToMinutes(start) - firstHour * 60) / totalMinutes) * 100}%`,
    height: `${Math.max(8, ((timeToMinutes(end) - timeToMinutes(start)) / totalMinutes) * 100)}%`,
  });
  const getEdit = (booking: DemoBooking): Edit => edits[booking.code] ?? { employeeId: booking.employeeId ?? "", message: "", error: "" };
  const patchEdit = (booking: DemoBooking, patch: Partial<Edit>) => {
    setEdits((previous) => ({ ...previous, [booking.code]: { ...getEdit(booking), ...patch } }));
  };
  const save = (booking: DemoBooking, automatic: boolean) => {
    const employeeId = automatic ? autoAssignEmployee(booking, bookings) : getEdit(booking).employeeId || null;
    const error = automatic && !employeeId
      ? "No available employee found for that time"
      : employeeId ? assignmentError(booking, employeeId, bookings) : null;
    if (error) {
      patchEdit(booking, { error, message: "" });
      return;
    }
    onAssign(booking.code, employeeId);
    patchEdit(booking, {
      employeeId: employeeId ?? "", error: "",
      message: employeeId ? `Assigned to ${employeeName(employeeId)} · Confirmed in this demo` : "Unassigned · Pending in this demo",
    });
  };
  const reset = () => {
    onReset(); setEdits({}); setWeekOffset(0); setDayIndex(0);
    setShowAvailability(true); setShowBookings(true); setCompact(false);
  };

  return (
    <div className="demo-calendar">
      <ScreenHeading title="Calendar" text="Employee availability and booked work, positioned by time.">
        <button type="button" className="calendar-button" onClick={reset}><RotateCcw size={12} /> Reset demo</button>
      </ScreenHeading>
      <div className="calendar-toolbar">
        <div className="calendar-week-controls">
          <button type="button" className="calendar-button" onClick={() => setWeekOffset((week) => week - 1)}><ChevronLeft size={12} /> Previous</button>
          {weekOffset !== 0 && <button type="button" className="calendar-button" onClick={() => setWeekOffset(0)}>Sample week</button>}
          <button type="button" className="calendar-button" onClick={() => setWeekOffset((week) => week + 1)}>Next <ChevronRight size={12} /></button>
        </div>
        <div className="calendar-display-controls">
          <label><input type="checkbox" checked={showAvailability} onChange={(event) => setShowAvailability(event.target.checked)} /> Availability</label>
          <label><input type="checkbox" checked={showBookings} onChange={(event) => setShowBookings(event.target.checked)} /> Bookings</label>
          <label><input type="checkbox" checked={compact} onChange={(event) => setCompact(event.target.checked)} /> Compact</label>
        </div>
      </div>
      <div className="source-card calendar-week-card">
        <p className="calendar-week-title" aria-live="polite">{formatDemoDate(days[0], { day: "numeric" })}–{formatDemoDate(days[6], { day: "numeric", month: "long" })} · sample week</p>
        <div className={`calendar-timeline-grid ${compact ? "is-compact" : ""}`} aria-label="Seven-day operational calendar">
          {days.map((date, index) => {
            const availability = availabilityForDate(date);
            const dayBookings = bookings.filter((booking) => booking.date === date);
            const availabilityLanes = assignLanes(availability);
            const bookingLanes = assignLanes(dayBookings.map((booking) => ({ ...booking, id: booking.code })));
            const laneLeft = (lane: number) => `calc(28px + (100% - 42px) * ${lane / Math.max(1, availabilityLanes.laneCount + bookingLanes.laneCount)})`;
            return (
              <div className="calendar-timeline-day" key={date}>
                <button type="button" className="calendar-day-heading" aria-pressed={dayIndex === index} onClick={() => setDayIndex(index)} aria-label={`Show ${formatDemoDate(date, { weekday: "long", day: "numeric", month: "long" })}`}>
                  <span>{formatDemoDate(date, { weekday: "short" })}</span>
                  <strong>{formatDemoDate(date, { day: "numeric", month: "numeric" })}</strong>
                  {index === 6 && <small>Sunday (closed)</small>}
                </button>
                <div className="calendar-time-track">
                  {hours.map((hour) => <div className="calendar-hour" key={hour} style={{ top: `${((hour - firstHour) * 60 / totalMinutes) * 100}%` }}><span>{String(hour).padStart(2, "0")}:00</span></div>)}
                  {showAvailability && availability.map((slot) => <span
                    key={slot.id} className="calendar-availability-bar" data-employee={slot.employeeId}
                    style={{ ...position(slot.startTime, slot.endTime), left: laneLeft(availabilityLanes.laneMap[slot.id]) }}
                    title={`${employeeName(slot.employeeId)} · Available ${slot.startTime}–${slot.endTime}`} aria-hidden="true"
                  />)}
                  {showBookings && dayBookings.map((booking) => <button
                    type="button" key={booking.code} className="calendar-booking-bar" data-code={booking.code} data-employee={booking.employeeId ?? "unassigned"}
                    style={{ ...position(booking.startTime, booking.endTime), left: laneLeft(availabilityLanes.laneCount + bookingLanes.laneMap[booking.code]) }}
                    title={`${booking.code} · ${booking.customer} · ${booking.startTime}–${booking.endTime} · ${booking.service} · ${employeeName(booking.employeeId)}`}
                    aria-label={`${booking.code}, ${booking.startTime}–${booking.endTime}, ${employeeName(booking.employeeId)}. Show day details.`}
                    onClick={() => { setDayIndex(index); document.getElementById("calendar-day-details")?.scrollIntoView({ block: "nearest", behavior: "instant" }); }}
                  />)}
                </div>
                <div className="calendar-day-summary">
                  {showAvailability && (availability.length ? availability.map((slot) => <span key={slot.id}><i data-employee={slot.employeeId} />{employeeName(slot.employeeId)}<small>{slot.startTime}–{slot.endTime}</small></span>) : <span>No availability</span>)}
                  {showBookings && (dayBookings.length ? dayBookings.map((booking) => <span key={booking.code}><i data-employee={booking.employeeId ?? "unassigned"} />{booking.code}<small>{booking.startTime}–{booking.endTime}</small></span>) : <span>No bookings</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="source-card calendar-employee-key">
        <h5>Employees</h5>
        <div>{demoEmployees.map((employee) => <span key={employee.id}><i data-employee={employee.id} />{employee.name}</span>)}<span><i data-employee="unassigned" />Unassigned</span></div>
        <p>Thin bars show availability. Thick bars show bookings. Overlapping work uses separate lanes.</p>
      </div>
      <div className="source-card calendar-day-details" id="calendar-day-details">
        <div className="calendar-day-controls">
          <button type="button" className="calendar-button" disabled={dayIndex === 0} onClick={() => setDayIndex((day) => day - 1)}><ChevronLeft size={12} /> Previous day</button>
          <h5 aria-live="polite">{formatDemoDate(selectedDate, { weekday: "long", day: "numeric", month: "long" })}</h5>
          <button type="button" className="calendar-button" disabled={dayIndex === 6} onClick={() => setDayIndex((day) => day + 1)}>Next day <ChevronRight size={12} /></button>
        </div>
        <p className="calendar-demo-note">Try assigning the sample work. Changes stay in this tour; nothing is saved or sent.</p>
        {dayIndex === 6 && <p className="calendar-closed-note">Sunday (closed)</p>}
        {showAvailability && <section className="calendar-day-availability" aria-label="Selected day availability">
          <h5>Availability</h5>
          <div>{selectedAvailability.length ? selectedAvailability.map((slot) => <span key={slot.id}><i data-employee={slot.employeeId} /><strong>{employeeName(slot.employeeId)}</strong><small>{slot.startTime}–{slot.endTime}</small></span>) : <p>No availability</p>}</div>
        </section>}
        {showBookings && <section className="calendar-day-bookings" aria-label="Selected day bookings">
          <h5>Bookings</h5>
          <div className="calendar-booking-list">{selectedBookings.length ? selectedBookings.map((booking) => {
            const edit = getEdit(booking);
            return (
              <article className="calendar-assignment-card" data-code={booking.code} data-employee={booking.employeeId ?? "unassigned"} key={booking.code} aria-label={`Booking ${booking.code}`}>
                <div className="calendar-booking-heading"><strong>{booking.customer}</strong><Status>{booking.status}</Status></div>
                <p>{booking.startTime}–{booking.endTime} · {booking.service}</p>
                <small>{booking.code} · Service location withheld</small>
                <div className="calendar-current-assignment"><i data-employee={booking.employeeId ?? "unassigned"} />{employeeName(booking.employeeId)}</div>
                <label className="calendar-assign-label">Assign employee
                  <select aria-label={`Employee for ${booking.code}`} value={edit.employeeId} onChange={(event) => patchEdit(booking, { employeeId: event.target.value, message: "", error: "" })}>
                    <option value="">Unassigned</option>
                    {demoEmployees.map((employee) => <option value={employee.id} key={employee.id}>{employee.name}</option>)}
                  </select>
                </label>
                <div className="calendar-assignment-actions">
                  <button type="button" className="calendar-button" onClick={() => save(booking, false)}>Save</button>
                  <button type="button" className="calendar-button calendar-button-primary" onClick={() => save(booking, true)}>Auto-assign</button>
                </div>
                <p className={`calendar-feedback ${edit.error ? "is-error" : ""}`} role="status">{edit.error || edit.message}</p>
              </article>
            );
          }) : <p>No bookings</p>}</div>
        </section>}
        <p className="calendar-rule-note">Assignment needs one availability interval covering the whole job and a 15-minute gap from other work. Auto-assign uses priority, then daily booking count, then name.</p>
      </div>
    </div>
  );
}
