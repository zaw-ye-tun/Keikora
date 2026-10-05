import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroFlow } from "@/components/brand/hero-flow";
export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow pill">
          <span className="green-dot" /> Developed from real service operations
        </div>
        <h1>
          Bookings meet <span>availability.</span>
          <br />
          Work gets coordinated.
        </h1>
        <p>
          Administrators and managers create booking records, compare booked
          time with employee availability, and assign the work. Employees see
          their assigned jobs. This operational foundation exists; the broader
          Keikora platform is in development.
        </p>
        <div className="hero-actions">
          <a className="button" href="#product">
            Explore the product <ArrowRight size={17} />
          </a>
          <a className="text-link" href="#contact">
            Contact Keikora <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="hero-note">
          <span className="tiny-line" /> Built in Oulu. Broader platform in
          development.
        </div>
      </div>
      <HeroFlow />
    </section>
  );
}
