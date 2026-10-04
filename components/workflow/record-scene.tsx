import { CalendarDays, Check, FileText, MapPin, UserRound } from "lucide-react";
import { demoRecord } from "@/lib/product-data";

// Website storytelling of verified relationships, not another product screenshot.
export function RecordScene({ step }: { step: number }) {
  if (step === 0)
    return (
      <div className="record-scene record-capture">
        <span>
          Customer<strong>{demoRecord.customer}</strong>
        </span>
        <span>
          Service<strong>{demoRecord.service}</strong>
        </span>
        <span>
          Occupied time
          <strong>
            {demoRecord.time}–{demoRecord.end}
          </strong>
        </span>
      </div>
    );
  if (step === 1)
    return (
      <div className="record-scene record-calendar">
        <div>
          <CalendarDays size={15} />
          <strong>{demoRecord.employee}</strong>
          <span>{demoRecord.availability}</span>
        </div>
        <div className="record-time-band">
          <span className="record-available-band">Available time</span>
          <span className="record-booked-band">
            {demoRecord.code} · 09:00–11:00
          </span>
        </div>
        <small>
          Saved employee availability covers this booking’s occupied time.
        </small>
      </div>
    );
  if (step === 2)
    return (
      <div
        className="record-scene assignment-example"
        aria-label="Illustrative rule-based assignment checks"
      >
        <div className="assignment-check" data-check="coverage">
          <Check size={13} />
          <span>
            Employee 1
            <small>Covers 09:00–11:00 · no conflict · priority 1</small>
          </span>
          <strong>Eligible</strong>
        </div>
        <div className="assignment-check" data-check="conflict">
          <span className="assignment-conflict">×</span>
          <span>
            Employee 2<small>Existing work at 10:00–12:00</small>
          </span>
          <strong>Conflict</strong>
        </div>
        <div className="assignment-check" data-check="ranking">
          <Check size={13} />
          <span>
            Employee 3<small>Covers the time · no conflict · priority 2</small>
          </span>
          <strong>Eligible</strong>
        </div>
        <div className="assignment-result">
          <UserRound size={13} />
          <strong>Example result: Employee 1</strong>
          <span>Assigned · Confirmed</span>
        </div>
      </div>
    );
  if (step === 3)
    return (
      <div className="record-scene record-work">
        <div>
          <UserRound size={15} />
          <strong>{demoRecord.employee} · Upcoming jobs</strong>
        </div>
        <span>
          {demoRecord.date} · {demoRecord.time}–{demoRecord.end}
        </span>
        <strong>
          {demoRecord.customer} · {demoRecord.service}
        </strong>
        <small>
          <MapPin size={12} /> Relevant customer details stay with the assigned
          work.
        </small>
      </div>
    );
  return (
    <div className="record-scene record-administration">
      <span>
        <MapPin size={16} />
        Mileage & notes<small>Employee records</small>
      </span>
      <span>
        <Check size={16} />
        Booking status<small>Operations controls</small>
      </span>
      <span>
        <FileText size={16} />
        Invoice PDF<small>Prepared when needed</small>
      </span>
    </div>
  );
}
