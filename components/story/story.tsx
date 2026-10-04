import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
export function Story() {
  return (
    <section id="story" aria-label="Our story" className="section story-section">
      <div className="container split">
        <div>
          <p className="eyebrow">OUR STORY</p>
          <h2>
            Built around the work.
            <br />
            <span>Shaped in Oulu.</span>
          </h2>
          <p className="body-copy">
            Keikora didn’t begin as a theoretical SaaS idea. It grew from
            software built around the day-to-day operations of PuhdasFix, a
            local cleaning-service business in Oulu, Finland.
          </p>
          <p className="body-copy">
            Booking administration, employee availability, assignment and
            customer records became parts of one operational system. The
            software connects the work instead of treating each task as a
            separate tool.
          </p>
          <p className="body-copy">
            Keikora is the product direction emerging from that work. The
            foundation exists; adapting its business-specific workflows for more
            local service businesses is the next step.
          </p>
          <div className="story-links"><span className="story-location">Oulu, Finland <ArrowUpRight size={15} aria-hidden="true" /></span>
            <a className="text-link" href="#product">See the implemented views <ArrowRight size={15} /></a>
          </div>
        </div>
        <div className="story-diagram">
          <div>
            <span className="eyebrow">REAL SERVICE BUSINESS</span>
            <strong>PuhdasFix</strong>
            <small>Originating cleaning-service business · Oulu, Finland</small>
          </div>
          <ArrowDown size={18} />
          <div className="story-middle">
            <span className="eyebrow">IMPLEMENTED OPERATIONAL FOUNDATION</span>
            <span>Bookings & customer records</span>
            <span>Availability & employee assignment</span>
            <span>Assigned work & invoice PDFs</span>
          </div>
          <ArrowDown size={18} />
          <div className="story-end">
            <Logo />
            <p>The broader product direction emerging from that software</p>
            <span className="badge">Broader platform in development</span>
          </div>
        </div>
      </div>
    </section>
  );
}
