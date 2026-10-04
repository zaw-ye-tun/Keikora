import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";
export function Footer() {
  return (
    <>
      <section className="final-cta container">
        <p className="eyebrow">FOLLOW THE CONNECTED WORK</p>
        <h2>
          See how the operation connects.
          <br />
          <span>Help shape what comes next.</span>
        </h2>
        <div>
          <a className="button" href="#early-access">
            Join early access <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href="#product">
            Explore Keikora <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-top">
          <div>
            <Link href="/" aria-label="Keikora home">
              <Logo />
            </Link>
            <p>
              Operations software for
              <br />
              local service businesses.
            </p>
            <span className="footer-location">
              <span className="green-dot" />
              {siteConfig.location}
            </span>
          </div>
          <div className="footer-links">
            {[
              ["Product", "/#product"],
              ["How it works", "/#workflow"],
              ["For businesses", "/#businesses"],
              ["Our story", "/#story"],
              ["Development", "/#roadmap"],
              ["Contact", "/#early-access"],
              ["Privacy", "/privacy/"],
            ].map(([name, href]) => (
              <a href={href} key={name}>
                {name}
              </a>
            ))}
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Keikora</span>
          <span>Built with care. Shaped by real work.</span>
          <span className="badge">In development</span>
        </div>
      </footer>
    </>
  );
}
