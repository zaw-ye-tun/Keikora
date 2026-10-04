import { ArrowRight, CalendarDays, Users, ClipboardList } from "lucide-react";
import { WorkflowSymbol } from "@/components/brand/keikora-logo";
export function Architecture() {
  return (
    <section className="section architecture-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PRODUCT DEPTH, WITHOUT THE COMPLEXITY</p>
            <h2>Built around the operation.</h2>
          </div>
          <p>
            A shared data model connects the interfaces, rather than giving each
            task its own isolated record.
          </p>
        </div>
        <div className="architecture-grid">
          <article>
            <ClipboardList size={23} />
            <span className="eyebrow">OPERATIONS</span>
            <h3>Administrators & managers</h3>
            <p>
              Create and review bookings, manage customer records, coordinate
              assignments and prepare invoices.
            </p>
          </article>
          <div className="architecture-core">
            <WorkflowSymbol />
            <strong>One connected booking</strong>
            <div>
              {[
                "Customer",
                "Service",
                "Time",
                "Employee",
                "Status",
                "Job log",
                "Invoice",
              ].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
          <article>
            <Users size={23} />
            <span className="eyebrow">WORKFORCE</span>
            <h3>Employees</h3>
            <p>
              Publish availability, see assigned work, and record mileage and
              notes for the jobs they carry out.
            </p>
          </article>
        </div>
        <div className="architecture-notes">
          <span>
            <CalendarDays size={17} />
            Availability informs calendar & assignment
          </span>
          <span>
            <ArrowRight size={17} />
            Booking links events, job logs & invoice PDFs
          </span>
        </div>
        <p className="engineering-note">
          Role-based interfaces, shared records and application logic form the
          implemented foundation. Public customer booking and broader service
          configuration remain future product direction.
        </p>
      </div>
    </section>
  );
}
