"use client";
import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
export function EarlyAccess() {
  const [notice, setNotice] = useState("");
  return (
    <section id="early-access" className="section early-section">
      <div className="container split">
        <div>
          <p className="eyebrow">BUILD THE NEXT CHAPTER WITH US</p>
          <h2>Help shape Keikora.</h2>
          <p className="body-copy">
            Keikora is growing from implemented service-business software. We’re
            exploring how that foundation can serve more local teams. If you
            coordinate bookings, people and customer work, we’d like to hear
            about your working day.
          </p>
          <div className="early-note">
            <Mail size={19} />
            <p>
              Start a conversation.
              <br />
              <span>
                No sales pitch. Just a better understanding of your working day.
              </span>
            </p>
          </div>
        </div>
        <form
          className="early-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            if (!siteConfig.contactEmail) {
              setNotice(
                "Early-access requests are not open yet. No information has been sent or saved. Please check back once our contact channel is available.",
              );
              return;
            }
            const body = `Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nEmail: ${data.get("email")}\nService type: ${data.get("type")}\n\nI would like to hear about Keikora early access.`;
            window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Keikora early access")}&body=${encodeURIComponent(body)}`;
            setNotice(
              "Your email app has been requested. Send the draft there to contact us; this website has not submitted your request.",
            );
          }}
        >
          <div className="form-row">
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
                maxLength={100}
              />
            </label>
            <label>
              Business name
              <input
                name="business"
                autoComplete="organization"
                placeholder="Your business"
                required
                maxLength={150}
              />
            </label>
          </div>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@yourbusiness.fi"
              required
              maxLength={254}
            />
          </label>
          <label>
            Type of service business
            <select name="type" required defaultValue="">
              <option value="" disabled>
                Select your business type
              </option>
              {[
                "Cleaning services",
                "Property maintenance",
                "Installation",
                "Repair services",
                "Home services",
                "Field-service team",
                "Other local service",
              ].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <button className="button" type="submit">
            Join early access <ArrowUpRight size={17} />
          </button>
          <p className="form-note">
            {siteConfig.contactEmail
              ? "This opens your email app. You choose when to send."
              : "Early-access registration is being prepared. This form does not send or store your details yet."}{" "}
            Read our <a href="/privacy/">privacy information</a>.
          </p>
          <p className="form-notice" role="status">
            {notice}
          </p>
        </form>
      </div>
    </section>
  );
}
