"use client";
import { useState } from "react";
import { ArrowRight, Check, ChevronRight, Layers } from "lucide-react";
import { tour, type TourId } from "@/lib/product-data";
import { Logo } from "@/components/ui/logo";
import { RecordContext } from "./record-context";
import { CalendarView } from "./calendar-view";
import { initialCalendarBookings } from "@/lib/demo-scheduler";
import {
  OperationsView,
  BookingView,
  AvailabilityView,
  CustomersView,
  InvoicesView,
} from "./views";
const views = {
  operations: OperationsView,
  bookings: BookingView,
  availability: AvailabilityView,
  customers: CustomersView,
  invoices: InvoicesView,
};
export function ProductDemo({ hero = false }: { hero?: boolean }) {
  const [active, setActive] = useState<TourId>("operations");
  const [calendarBookings, setCalendarBookings] = useState(initialCalendarBookings);
  const selected = tour.find((view) => view.id === active)!;
  const View = active === "calendar" ? null : views[active];
  return (
    <div className={`source-tour ${hero ? "source-tour-hero" : ""}`}>
      {!hero && (
        <>
          <div
            className="tour-tabs"
            role="tablist"
            aria-label="Implemented product areas"
          >
            {tour.map((view, index) => (
              <button
                key={view.id}
                id={`tour-tab-${view.id}`}
                role="tab"
                aria-selected={active === view.id}
                aria-controls="product-tour-panel"
                tabIndex={active === view.id ? 0 : -1}
                onClick={() => setActive(view.id)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight")
                    next = (index + 1) % tour.length;
                  else if (event.key === "ArrowLeft")
                    next = (index + tour.length - 1) % tour.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = tour.length - 1;
                  else return;
                  event.preventDefault();
                  setActive(tour[next].id);
                  document.getElementById(`tour-tab-${tour[next].id}`)?.focus();
                }}
              >
                {view.label}
              </button>
            ))}
          </div>
          <RecordContext active={active} />
          <div className="tour-explanation" aria-live="polite">
            <div>
              <span className="tour-role">{selected.user}</span>
              <h3>{selected.heading}</h3>
              <p>{selected.description}</p>
            </div>
            <div className="tour-connection">
              <span className="built-label">
                <Check size={13} />
                {selected.status}
              </span>
              <p>
                <ArrowRight size={15} />
                {selected.connection}
              </p>
            </div>
          </div>
        </>
      )}
      <div
        id={hero ? undefined : "product-tour-panel"}
        role={hero ? undefined : "tabpanel"}
        aria-labelledby={hero ? undefined : `tour-tab-${active}`}
        tabIndex={hero ? undefined : 0}
        className="source-window"
      >
        <div className="source-topbar">
          <Logo />
          <span className="source-workspace">
            <Layers size={13} />{" "}
            {active === "availability"
              ? "Employee workspace"
              : "Operations workspace"}
          </span>
          <span className="source-user">
            Demo {active === "availability" ? "employee" : "administrator"}
            <small>
              {active === "availability" ? "Employee view" : "Operations view"}
            </small>
          </span>
        </div>
        <div className="source-nav" aria-hidden="true">
          {(active === "availability"
            ? ["Home", "Jobs", "Availability", "Logs", "Invoices", "Settings"]
            : [
                "Dashboard",
                "Employees",
                "Bookings",
                "Inquiries",
                "Messages",
                "Recurring",
                "Customers",
                "Calendar",
                "Invoices",
                "Settings",
              ]
          ).map((name) => (
            <span
              key={name}
              className={
                (name === "Dashboard" && active === "operations") ||
                name.toLowerCase() === active
                  ? "current"
                  : ""
              }
            >
              {name}
            </span>
          ))}
        </div>
        {hero && <h3 className="sr-only">Operations workspace preview</h3>}
        <div className="source-view" key={active}>
          {active === "calendar" ? (
            <CalendarView
              bookings={calendarBookings}
              onAssign={(code, employeeId) => setCalendarBookings((previous) => previous.map((booking) => booking.code === code ? { ...booking, employeeId, status: employeeId ? "Confirmed" : "Pending" } : booking))}
              onReset={() => setCalendarBookings(initialCalendarBookings)}
            />
          ) : View && <View compact={hero} demoBookings={calendarBookings} />}
        </div>
        <div className="source-caption">
          <span>
            <Check size={12} /> Based on implemented screens
          </span>
          <span>Recreated UI · synthetic data · Keikora styling</span>
        </div>
      </div>
      {hero && (
        <div className="source-hero-caption">
          <span className="green-dot" /> Real operational software. A broader
          product taking shape.
          <ChevronRight size={12} />
        </div>
      )}
    </div>
  );
}
