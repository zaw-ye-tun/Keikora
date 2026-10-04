import { ArrowRight } from "lucide-react";
import { demoRecord, type TourId } from "@/lib/product-data";

const contexts: Record<TourId, string> = {
  operations: "Visible in the operational work queue",
  bookings: "Customer, service and assigned employee on the booking",
  calendar: "Booked time alongside employee availability",
  availability: "Employee 1’s saved availability, independently of assignments",
  customers: "The linked customer’s directory record and counts",
  invoices: "Booking details available for invoice PDF preparation",
};
export function RecordContext({ active }: { active: TourId }) {
  return (
    <div className="tour-record" data-context={active}>
      <div>
        <small>FOLLOW ONE FICTIONAL RECORD</small>
        <strong>
          {demoRecord.code} · {demoRecord.customer}
        </strong>
        <span>
          {demoRecord.service} · {demoRecord.date} · 09:00–11:00
        </span>
      </div>
      <ArrowRight size={20} aria-hidden="true" />
      <p>
        {contexts[active]}
        <small>
          Illustrative views of connected records, not a live transaction.
        </small>
      </p>
    </div>
  );
}
