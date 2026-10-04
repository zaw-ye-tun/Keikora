import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCheck,
  ClipboardList,
  Contact,
  FileSpreadsheet,
  House,
  Mail,
  MessageSquare,
  Phone,
  Settings2,
  Sparkles,
  Users,
  Wrench,
  Building2,
  Cable,
  NotebookPen,
  Layers,
  Route,
} from "lucide-react";
import { WorkflowSymbol } from "@/components/brand/keikora-logo";
import { Reveal } from "@/components/ui/reveal";
import { ProductDemo } from "@/components/product-demo/product-demo";
import { WorkIllustration } from "@/components/features/work-illustration";

export function Trust() {
  const principles = [
    [Layers, "Implemented operational foundation"],
    [Users, "Admin, manager and employee workflows"],
    [CheckCheck, "Connected work records"],
    [Settings2, "Rule-based assignment support"],
  ] as const;
  return (
    <section className="trust container">
      <p>
        Real software behind the product direction. Real workflows behind the
        design.
      </p>
      <div>
        {principles.map(([Icon, text]) => (
          <span key={text}>
            <Icon size={18} />
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
export function Problem() {
  return (
    <section className="section problem-section">
      <div className="container split">
        <div>
          <p className="eyebrow">LESS FRAGMENTATION. MORE FLOW.</p>
          <h2>
            A booking doesn’t
            <br />
            end at the calendar.
          </h2>
          <p className="body-copy">
            An administrator or manager captures the customer, configured
            service, occupied time and work details. Employee availability gives
            operations the context to assign it.
          </p>
          <p className="body-copy">
            The implemented system connects those pieces. A booking is part of
            the operation, rather than another note to copy between tools.
          </p>
        </div>
        <WorkIllustration />
      </div>
    </section>
  );
}
export function Features() {
  const connections = [
    {
      icon: ClipboardList,
      title: "Capture → coordinate",
      text: "An operations user creates the booking with a customer, configured service, date, time and work details.",
      from: "Customer & service",
      to: "Booking record",
    },
    {
      icon: CalendarDays,
      title: "Availability → assignment",
      text: "Employee time intervals inform the calendar and manual or triggered rule-based assignment checks.",
      from: "Available time",
      to: "Assigned work",
    },
    {
      icon: Contact,
      title: "Customer → ongoing work",
      text: "A customer record connects contact details, bookings, job logs and invoice counts.",
      from: "Customer record",
      to: "Bookings & record counts",
    },
    {
      icon: Mail,
      title: "Booking → administration",
      text: "Booking events, configured email updates and invoice PDFs keep the administrative record connected.",
      from: "Booking record",
      to: "Events & invoice PDFs",
    },
  ];
  return (
    <section id="product" aria-label="Product" className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PRODUCT</p>
          <h2>
            One booking.
            <br />
            More than a booking form.
          </h2>
        </div>
        <p>
          The operational foundation is implemented.
          <br />
          <span className="built-label">
            <Check size={12} /> Broader Keikora platform in development
          </span>
        </p>
      </div>
      <div className="connection-features">
        {connections.map(({ icon: Icon, title, text, from, to }, i) => (
          <Reveal className="connection-feature" key={title}>
            <div className="connection-feature-top">
              <Icon size={22} />
              <span>0{i + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="connection-path">
              <span>{from}</span>
              <ArrowRight size={15} />
              <span>{to}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="showcase-heading">
        <div>
          <p className="eyebrow">EXPLORE THE IMPLEMENTED SYSTEM</p>
          <h3>
            Different views.
            <br />
            The same connected work.
          </h3>
        </div>
        <p>
          Source-derived screens with synthetic data.
          <br />
          Keikora styling, not live product access.
        </p>
      </div>
      <Reveal>
        <ProductDemo />
      </Reveal>
    </section>
  );
}
export function Industries() {
  const sectors = [
    [Sparkles, "Cleaning services"],
    [Building2, "Property maintenance"],
    [Cable, "Installation teams"],
    [Wrench, "Repair services"],
    [House, "Home services"],
    [Route, "Small field-service teams"],
  ] as const;
  return (
    <section id="businesses" aria-label="For businesses" className="section container industries">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FOR BUSINESSES</p>
          <h2>
            For teams that coordinate
            <br />
            bookings, people and time.
          </h2>
        </div>
        <p>
          Built first around a cleaning-service business: operations creates
          bookings, employees provide availability, and work gets assigned.
          Adapting those workflows for more service businesses is in development.
        </p>
      </div>
      <div className="business-workflows">
        {([
          [ClipboardList, "Operations", "Create bookings, compare available time and assign an employee."],
          [Users, "Employees", "Supply availability and see assigned upcoming work."],
          [FileSpreadsheet, "Administration", "Keep customer records and prepare booking-linked invoice PDFs."],
        ] as const).map(([Icon, title, text]) => (
          <div key={title}><Icon size={20} /><h3>{title}</h3><p>{text}</p></div>
        ))}
      </div>
      <p className="business-sectors-label">Where it began, and where the product could go</p>
      <div className="industry-grid">
        {sectors.map(([Icon, title]) => (
          <div key={title}>
            <Icon size={23} />
            <div className="industry-labels"><h3>{title}</h3>
            <span
              className={`industry-status ${title === "Cleaning services" ? "industry-origin" : ""}`}
            >
              {title === "Cleaning services"
                ? "Originating environment"
                : "Product direction"}
            </span>
            </div>
          </div>
        ))}
      </div>
      <div className="business-section-links">
        <a className="text-link" href="#product">Explore the implemented product <ArrowRight size={15} /></a>
        <a className="text-link" href="#story">Read our story <ArrowRight size={15} /></a>
      </div>
    </section>
  );
}
export function Comparison() {
  const fragments = [
    [Phone, "Phone calls"],
    [MessageSquare, "Messages"],
    [FileSpreadsheet, "Spreadsheet"],
    [CalendarDays, "Calendar"],
    [NotebookPen, "Paper notes"],
    [Contact, "Separate customer records"],
  ] as const;
  return (
    <section className="section comparison-section">
      <div className="container">
        <p className="eyebrow">THE DIRECTION IS SIMPLE</p>
        <h2>
          Less scattered.
          <br />
          More connected.
        </h2>
        <div className="comparison">
          <div className="before">
            <span className="eyebrow">DISCONNECTED WORKFLOW</span>
            <div>
              {fragments.map(([Icon, name]) => (
                <span key={name}>
                  <Icon size={17} />
                  {name}
                </span>
              ))}
            </div>
          </div>
          <span className="comparison-arrow">
            <ArrowRight />
          </span>
          <div className="after">
            <span className="eyebrow">IMPLEMENTED OPERATIONAL CONNECTIONS</span>
            <div className="comparison-brand">
              <WorkflowSymbol light />
              <strong>Connected operations</strong>
            </div>
            <div>
              {[
                "Bookings",
                "Customers",
                "Availability",
                "Assignments",
                "Calendar",
                "Invoices",
              ].map((name) => (
                <span key={name}>
                  <Check size={14} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="comparison-note">
          Booking records, employee time and administration are connected in the
          originating software. Invoices use booking details; specialist
          accounting tools remain separate.
        </p>
      </div>
    </section>
  );
}
export function Philosophy() {
  const principles = [
    [
      Layers,
      "Clarity in everyday work",
      "Keep the information needed for the next operational decision in context.",
    ],
    [
      Route,
      "Connections that matter",
      "Availability informs assignment. The booking connects the customer, employee and service.",
    ],
    [
      Settings2,
      "Automation with a purpose",
      "Use explicit assignment rules and configured notifications, while retaining operational controls.",
    ],
  ] as const;
  return (
    <section className="section container philosophy">
      <p className="eyebrow">OUR PRODUCT PHILOSOPHY</p>
      <h2>
        Software should remove admin,
        <br />
        not create more of it.
      </h2>
      <div className="principle-grid">
        {principles.map(([Icon, title, text]) => (
          <div key={title}>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
