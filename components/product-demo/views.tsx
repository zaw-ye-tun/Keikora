import {
  CalendarDays,
  Check,
  Circle,
  FileText,
  Plus,
  Search,
} from "lucide-react";
import { bookings, demoRecord } from "@/lib/product-data";
import { employeeName, sampleMonday, type DemoBooking } from "@/lib/demo-scheduler";
type ViewProps = { compact?: boolean; demoBookings?: DemoBooking[] };
export function Status({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`source-status ${children === "Pending" ? "pending" : ""}`}
    >
      {children}
    </span>
  );
}
export function SampleAction({ children }: { children: React.ReactNode }) {
  return <span className="sample-action">{children}</span>;
}
export function ScreenHeading({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="source-heading">
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      {children}
    </div>
  );
}
export function OperationsView({ compact, demoBookings }: ViewProps) {
  const visibleBookings = demoBookings ? demoBookings.filter((booking) => booking.date === sampleMonday).slice(0, compact ? 3 : 5).map((booking) => ({ ...booking, time: booking.startTime, end: booking.endTime, employee: employeeName(booking.employeeId) })) : bookings;
  const upcomingBooking = demoBookings?.find((booking) => booking.date > sampleMonday);
  return (
    <>
      <ScreenHeading
        title="Welcome, Demo administrator!"
        text="Today’s bookings and the requests that need attention."
      />
      <div className="operations-grid">
        <div className="source-card">
          <div className="source-card-heading">
            <h5>Today’s bookings</h5>
            <span>View all →</span>
          </div>
          {visibleBookings.map((booking) => (
            <div
              className={`source-booking ${booking.code === demoRecord.code ? "demo-record-focus" : ""}`}
              key={booking.code}
            >
              <div className="source-time">
                {booking.time}
                <small>– {booking.end}</small>
              </div>
              <div className="source-booking-detail">
                <strong>{booking.customer}</strong>
                <span>{booking.service}</span>
                <small>{booking.code} · Service location withheld</small>
              </div>
              <span className="source-employee">{booking.employee}</span>
              <Status>{booking.status}</Status>
            </div>
          ))}
        </div>
        <div className="source-card request-card">
          <div className="source-card-heading">
            <h5>Pending requests</h5>
            <span className="request-count">Demo queue</span>
          </div>
          <div className="source-request">
            <span className="request-icon">
              <CalendarDays size={15} />
            </span>
            <div>
              <strong>Availability change</strong>
              <p>Demo employee 1 · 15 October</p>
              <span>Requested: 09:00–15:00</span>
            </div>
            <Status>Pending</Status>
          </div>
          <div className="request-category">
            <strong>Property inquiries</strong>
            <p>Review service requirements</p>
          </div>
          <div className="request-category">
            <strong>Pending recurring bookings</strong>
            <p>Review before generating the series</p>
          </div>
          {!compact && (
            <div className="request-category">
              <strong>Contact messages</strong>
              <p>Reply and track the conversation status</p>
            </div>
          )}
        </div>
        <div className="source-card source-upcoming">
          <div className="source-card-heading">
            <h5>Upcoming bookings</h5>
            <span>View all →</span>
          </div>
          <div className="upcoming-row">
            <span>
              13 October<small>09:00–11:00</small>
            </span>
            <span>
              <strong>{upcomingBooking?.customer ?? "Demo customer F"}</strong>
              <small>{upcomingBooking?.service ?? "Home cleaning"} · {upcomingBooking ? employeeName(upcomingBooking.employeeId) : "Demo employee 2"}</small>
            </span>
            <Status>{upcomingBooking?.status ?? "Confirmed"}</Status>
          </div>
        </div>
      </div>
    </>
  );
}
export function BookingView({ demoBookings }: ViewProps) {
  const pendingBookings = demoBookings?.filter((booking) => booking.date === sampleMonday && booking.status === "Pending") ?? [];
  const confirmedBookings = demoBookings?.filter((booking) => booking.date === sampleMonday && booking.status === "Confirmed") ?? [];
  return (
    <>
      <ScreenHeading
        title="Bookings"
        text="Create a job, then review and assign it."
      >
        <SampleAction>
          <Plus size={12} /> New booking
        </SampleAction>
      </ScreenHeading>
      <div className="booking-showcase-grid">
        <div className="source-card">
          <div className="source-filters">
            <span>
              <Search size={12} />
              Search
            </span>
            <span>All status</span>
            <span>Employee</span>
            <span>Service</span>
          </div>
          <div className="source-assignment-mode">
            <span>Assignment</span>
            <span>Manual</span>
            <strong>Auto-assign</strong>
          </div>
          <h5 className="source-section-title">Pending bookings</h5>
          {pendingBookings.length ? pendingBookings.map((booking) => (
            <div className="source-pending-booking" key={booking.code}>
              <div>
                <small>{booking.code}</small>
                <strong>{booking.customer}</strong>
                <span>{booking.service}</span>
                <span>12 October · {booking.startTime}–{booking.endTime}</span>
              </div>
              <Status>Pending</Status>
              <div className="assignment-details"><span>Employee<strong>Unassigned</strong></span><span>Work details<strong>Customer · service · duration</strong></span></div>
              <p className="source-inline-note">Open the Calendar tab to try assignment.</p>
            </div>
          )) : <p className="source-inline-note">No pending bookings in this sample day.</p>}
          <h5 className="source-section-title">Confirmed bookings</h5>
          {confirmedBookings.map((booking) => <div className={`confirmed-summary ${booking.code === demoRecord.code ? "demo-record-focus" : ""}`} key={booking.code}>
            <Check size={15} />
            <span>
              {booking.code} · {booking.customer} · {booking.service}
              <small>{employeeName(booking.employeeId)} · {booking.startTime}–{booking.endTime}</small>
            </span>
            <Status>Confirmed</Status>
          </div>)}
        </div>
        <NewBookingFields />
      </div>
    </>
  );
}
function NewBookingFields() {
  return (
    <div className="source-card booking-form-preview">
      <h5>New booking</h5>
      <p className="source-form-note">
        Operations form · selected fields before assignment
      </p>
      <div className="sample-form-field">
        <span>Customer</span>
        <div>Existing customer · {demoRecord.customer}</div>
      </div>
      <div className="sample-form-field">
        <span>Service</span>
        <div>{demoRecord.service}</div>
      </div>
      <div className="sample-field-pair">
        <div className="sample-form-field">
          <span>Date</span>
          <div>12 October</div>
        </div>
        <div className="sample-form-field">
          <span>Start time</span>
          <div>{demoRecord.time}</div>
        </div>
      </div>
      <div className="sample-form-field">
        <span>Recurrence</span>
        <div>One-time</div>
      </div>
      <div className="sample-form-field">
        <span>Employee</span>
        <div>Unassigned</div>
      </div>
      <div className="sample-form-field">
        <span>Payment method</span>
        <div>Invoice</div>
      </div>
      <p className="source-inline-note">
        Service-specific options calculate price and occupied duration in the
        implemented form.
      </p>
    </div>
  );
}
export function AvailabilityView() {
  return (
    <>
      <ScreenHeading
        title="Availability calendar"
        text="Select dates and record the time you’re available."
      />
      <div className="availability-showcase">
        <div className="source-card">
          <div className="source-card-heading">
            <h5>October · sample month</h5>
            <span>Employee view</span>
          </div>
          <div className="month-day-labels">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>
          <div className="month-grid">
            {Array.from({ length: 35 }, (_, i) => {
              const date = i - 2;
              return (
                <span
                  key={i}
                  className={
                    date === 12
                      ? "date-selected"
                      : date === 13 || date === 14 || date === 16
                        ? "date-available"
                        : ""
                  }
                >
                  {date > 0 && date <= 31 ? date : ""}
                  {[12, 13, 14, 16].includes(date) && <i />}
                </span>
              );
            })}
          </div>
          <div className="source-inline-note">
            <span className="green-dot" /> Saved availability is shown on the
            calendar.
          </div>
        </div>
        <div className="source-card availability-fields">
          <h5>{demoRecord.employee} · Monday, 12 October</h5>
          <div className="sample-field-pair">
            <div className="sample-form-field">
              <span>Start time</span>
              <div>08:00</div>
            </div>
            <div className="sample-form-field">
              <span>End time</span>
              <div>16:00</div>
            </div>
          </div>
          <SampleAction>
            <Plus size={12} /> Add time slot
          </SampleAction>
          <div className="range-sample">
            <Circle size={12} /> Apply to a date range
          </div>
          <div className="source-approval-note">
            <CalendarDays size={17} />
            <p>
              Changing existing availability at short notice? The interface asks
              you to submit a change request for admin review.
            </p>
          </div>
          <p className="source-form-note">
            Display example only. Nothing is saved from this tour.
          </p>
        </div>
      </div>
    </>
  );
}
export function CustomersView() {
  return (
    <>
      <ScreenHeading
        title="Customers"
        text="Contact details and connected work records."
      >
        <SampleAction>
          <Plus size={12} /> Add customer
        </SampleAction>
      </ScreenHeading>
      <div className="source-card">
        <div className="source-filters">
          <span>
            <Search size={12} />
            Search ID, name, email, phone, address
          </span>
          <span>Active records</span>
        </div>
        <div className="source-table-wrap">
          <table className="source-table">
            <caption className="sr-only">
              Sanitized customer directory based on the implemented customer
              table
            </caption>
            <thead>
              <tr>
                <th scope="col">Customer</th>
                <th scope="col">Contact</th>
                <th scope="col">Bookings</th>
                <th scope="col">Job logs</th>
                <th scope="col">Invoices</th>
              </tr>
            </thead>
            <tbody>
              {["A", "B", "C"].map((letter, i) => (
                <tr key={letter} className={i === 0 ? "demo-record-focus" : ""}>
                  <td>
                    <strong>Demo customer {letter}</strong>
                    <small>DEMO-C0{i + 1}</small>
                  </td>
                  <td>
                    <span>Contact details withheld</span>
                    <small>Address withheld</small>
                  </td>
                  <td>{i + 1}</td>
                  <td>{i}</td>
                  <td>{i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="source-inline-note">
          Sample counts illustrate record relationships, not business
          performance.
        </div>
      </div>
    </>
  );
}
export function InvoicesView() {
  return (
    <>
      <ScreenHeading
        title="Invoices"
        text="Booking-linked PDF preparation, previews and configured email delivery."
      />
      <div className="source-card">
        <div className="source-filters">
          <span>Filter customer</span>
          <span>Filter employee</span>
        </div>
        <div className="source-table-wrap invoice-list">
          <table className="source-table source-invoice-table">
            <caption className="sr-only">
              Selected invoice-list columns from the implemented screen
            </caption>
            <thead>
              <tr>
                <th scope="col">Preview</th>
                <th scope="col">Booking ID</th>
                <th scope="col">Work date</th>
                <th scope="col">Customer</th>
                <th scope="col">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="demo-record-focus">
                <td>
                  <SampleAction>Preview</SampleAction>
                </td>
                <td>{demoRecord.code}</td>
                <td>
                  12 October<small>09:00–11:00</small>
                </td>
                <td>
                  {demoRecord.customer}
                  <small>Contact details withheld</small>
                </td>
                <td>
                  <span>Generate / download PDF</span>
                  <small>Email needs setup</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoice-example">
          <div className="source-card-heading">
            <h5>Demo booking · DEMO-101</h5>
            <span>12 October · 09:00–11:00</span>
          </div>
          <div className="invoice-example-grid">
            <div>
              <span className="invoice-doc-icon">
                <FileText size={35} />
              </span>
              <strong>Booking-linked invoice</strong>
              <p>
                Demo customer A<br />
                Home cleaning
              </p>
              <span className="source-inline-note">
                Preview region simplified · financial details omitted
              </span>
            </div>
            <div className="invoice-actions">
              <div>
                <span>Preview</span>
                <small>Review the generated document</small>
              </div>
              <div>
                <span>Download PDF</span>
                <small>Use the booking and customer details</small>
              </div>
              <div>
                <span>Email invoice</span>
                <small>Requires configured email delivery</small>
              </div>
            </div>
          </div>
        </div>
        <p className="source-inline-note">
          The product generates invoice PDFs. This showcase does not generate or
          send an invoice.
        </p>
      </div>
    </>
  );
}
