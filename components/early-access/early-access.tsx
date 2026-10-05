"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type SubmitState = "idle" | "sending" | "sent" | "error";

const endpoint = siteConfig.contactEmail
  ? `https://formsubmit.co/ajax/${siteConfig.contactEmail}`
  : "";

export function EarlyAccess() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [notice, setNotice] = useState("");

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("_honey")) {
      setSubmitState("sent");
      setNotice("Thank you. Your message has been received.");
      form.reset();
      return;
    }

    if (!endpoint) {
      setSubmitState("error");
      setNotice("The contact form is not available yet.");
      return;
    }

    setSubmitState("sending");
    setNotice("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = (await response.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      if (!response.ok || result?.success === false) {
        throw new Error(result?.message ?? "Form submission failed");
      }

      setSubmitState("sent");
      setNotice(
        "Thank you. Your message was sent to Keikora. If this is the first website message, check info@keikora.fi for a FormSubmit confirmation email.",
      );
      form.reset();
    } catch {
      setSubmitState("error");
      setNotice(
        "The form could not send right now. Please email info@keikora.fi directly.",
      );
    }
  }

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
              Start with a practical conversation.
              <br />
              <span>
                Tell us about your workflow and what would make Keikora useful.
              </span>
            </p>
          </div>
        </div>
        <form
          className="contact-card contact-form"
          aria-label="Contact Keikora"
          onSubmit={submitContact}
        >
          <p className="eyebrow">CONTACT</p>
          <h3 id="contact-card-title">Send a message.</h3>
          <p>
            Tell us a little about your business, how bookings are coordinated
            today, and what is difficult to manage.
          </p>
          <input
            className="visually-hidden"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input
            type="hidden"
            name="_subject"
            value="New Keikora website message"
          />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
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
          <label>
            Message
            <textarea
              name="message"
              placeholder="Tell us how bookings, availability and assignments work today."
              required
              maxLength={1200}
              rows={5}
            />
          </label>
          <button
            className="button contact-email"
            type="submit"
            disabled={submitState === "sending"}
          >
            {submitState === "sending" ? "Sending..." : "Send message"}
            <ArrowUpRight size={17} />
          </button>
          <p className="form-note">
            This sends your message to {siteConfig.contactEmail} through
            FormSubmit. Read our{" "}
            <a href="/privacy/">privacy information</a>.
          </p>
          <p className={`form-notice ${submitState}`} role="status">
            {notice}
          </p>
        </form>
      </div>
    </section>
  );
}
