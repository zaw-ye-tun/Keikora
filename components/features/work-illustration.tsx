import { CalendarDays, Check, ClipboardList, UserRound } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function WorkIllustration() {
  return (
    <Reveal className="work-illustration-reveal">
      <figure className="work-illustration">
        <div className="work-illustration-scene">
          <svg
            className="work-illustration-path"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="illustration-connection-base"
              d="M 23 17 C 45 12, 67 20, 76 32 S 77 65, 40 87"
            />
            <path
              className="illustration-connection-progress"
              pathLength="100"
              d="M 23 17 C 45 12, 67 20, 76 32 S 77 65, 40 87"
            />
          </svg>
          <div className="work-illustration-glow" aria-hidden="true" />
          {/* Pre-encoded static asset: native lazy loading needs no image runtime. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="work-illustration-image"
            src="/illustrations/connected-work.webp"
            width={1000}
            height={667}
            alt="A calendar, work checklist and employee view linked by a blue and teal ribbon."
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div
            className="work-illustration-card work-illustration-booking"
            aria-hidden="true"
          >
            <span className="work-illustration-icon">
              <ClipboardList size={17} />
            </span>
            <span>
              <small>BOOKING RECORD</small>
              <strong>Operations captures the details</strong>
            </span>
            <Check size={13} />
          </div>
          <div
            className="work-illustration-card work-illustration-time"
            aria-hidden="true"
          >
            <span className="work-illustration-icon">
              <CalendarDays size={17} />
            </span>
            <span>
              <small>AVAILABLE TIME</small>
              <strong>Employee intervals inform assignment</strong>
            </span>
          </div>
          <div
            className="work-illustration-card work-illustration-employee"
            aria-hidden="true"
          >
            <span className="work-illustration-icon">
              <UserRound size={17} />
            </span>
            <span>
              <small>ASSIGNED WORK</small>
              <strong>Employees see their jobs</strong>
            </span>
            <span className="work-illustration-dot" />
          </div>
        </div>
        <figcaption>People, time and work details. Connected.</figcaption>
      </figure>
    </Reveal>
  );
}
