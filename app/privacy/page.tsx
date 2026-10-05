import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";
export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy/" },
  openGraph: { title: "Privacy | Keikora", url: "/privacy/" },
};
export default function Privacy() {
  return (
    <main id="main" className="container privacy-page">
      <Link href="/">
        <Logo />
      </Link>
      <p className="eyebrow">PRIVACY INFORMATION</p>
      <h1>
        Your information.
        <br />
        Handled simply.
      </h1>
      <p>
        This website presents Keikora, an operations software project in
        development in Oulu, Finland.
      </p>
      <h2>Contact form</h2>
      <p>
        {siteConfig.contactEmail
          ? "The contact form sends the details you enter through FormSubmit to our monitored email address. We use that information only to respond about Keikora. No demo account is created by submitting the form."
          : "A monitored contact channel is not published yet. This website does not send or store contact requests."}
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This site does not set application cookies, use browser storage, or
        include analytics or advertising trackers.
      </p>
      <h2>Hosting</h2>
      <p>
        The website is designed for Cloudflare hosting. The hosting provider may
        process technical request data, such as IP addresses, to deliver and
        protect the website, according to its own policies.
      </p>
      <h2>Contact and future changes</h2>
      <p>
        {siteConfig.contactEmail
          ? `For questions about information you have shared, contact ${siteConfig.contactEmail}.`
          : "A monitored contact channel will be published before outreach opens."}{" "}
        This information will be updated before new collection methods are
        introduced.
      </p>
      <Link className="text-link" href="/">
        ← Back to Keikora
      </Link>
    </main>
  );
}
