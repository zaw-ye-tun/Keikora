import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const contactSubject = "Keikora conversation";
const contactBody =
  "Hello Keikora,\n\nI would like to talk about our service business, booking flow and team coordination.\n\nBusiness:\nTeam size:\nCurrent scheduling process:\n";

export function EarlyAccess() {
  const mailHref = siteConfig.contactEmail
    ? `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactBody)}`
    : undefined;

  return (
    <section id="contact" className="section early-section">
      <div className="container split">
        <div>
          <p className="eyebrow">START A CONVERSATION</p>
          <h2>Talk with Keikora.</h2>
          <p className="body-copy">
            Keikora is growing from implemented service-business software. We are
            exploring how that foundation can serve more local teams. If you
            coordinate bookings, people and customer work, we would like to hear
            about your working day.
          </p>
          <div className="early-note">
            <Mail size={19} />
            <p>
              No demo account is promised from this page.
              <br />
              <span>
                Just a practical conversation about your workflow and what would
                make Keikora useful.
              </span>
            </p>
          </div>
        </div>
        <aside className="contact-card" aria-labelledby="contact-card-title">
          <p className="eyebrow">CONTACT</p>
          <h3 id="contact-card-title">Email us directly.</h3>
          <p>
            Send a short note about your business, how bookings are coordinated
            today, and what is difficult to manage.
          </p>
          {mailHref ? (
            <a className="button contact-email" href={mailHref}>
              {siteConfig.contactEmail} <ArrowUpRight size={17} />
            </a>
          ) : (
            <p className="contact-unavailable">
              A monitored contact email will be published here before outreach
              opens.
            </p>
          )}
          <ul>
            <li>Business type and location</li>
            <li>Approximate team size</li>
            <li>How bookings and availability are handled now</li>
          </ul>
          <p className="form-note">
            Clicking the email address opens your email app. You choose what to
            send. Read our <a href="/privacy/">privacy information</a>.
          </p>
        </aside>
      </div>
    </section>
  );
}
