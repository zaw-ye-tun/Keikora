export const navigation = [
  ["Product", "#product"],
  ["How it works", "#workflow"],
  ["For businesses", "#businesses"],
  ["Our story", "#story"],
  ["Development", "#roadmap"],
] as const;
// Synthetic examples; labels and field relationships follow the source application.
export const demoRecord = {
  code: "DEMO-101",
  customer: "Demo customer A",
  customerCode: "DEMO-C01",
  employee: "Demo employee 1",
  service: "Home cleaning",
  date: "12 October",
  time: "09:00",
  end: "11:00",
  availability: "08:00–16:00",
} as const;
export const bookings = [
  {
    ...demoRecord,
    status: "Confirmed",
  },
  {
    code: "DEMO-102",
    time: "12:00",
    end: "16:00",
    service: "Move-out cleaning",
    customer: "Demo customer B",
    employee: "Unassigned",
    status: "Pending",
  },
  {
    code: "DEMO-103",
    time: "14:00",
    end: "16:00",
    service: "Textile cleaning",
    customer: "Demo customer C",
    employee: "Demo employee 2",
    status: "Confirmed",
  },
] as const;
export const tour = [
  {
    id: "operations",
    label: "Operations",
    user: "Administrator · Manager",
    heading: "Start with the work that needs attention.",
    description:
      "Today’s and upcoming bookings sit alongside change requests, inquiries, messages and recurring requests.",
    connection:
      "Review a pending booking, then open its details or assign an employee.",
    source: "Operations dashboard",
    status: "Implemented",
  },
  {
    id: "bookings",
    label: "Bookings",
    user: "Administrator · Manager",
    heading: "A booking with the details attached.",
    description:
      "Create work for a new or existing customer. Capture a configured service, time, recurrence, service details and payment method.",
    connection:
      "The booking links the customer, service and assigned employee; its status stays visible to operations.",
    source: "Booking administration & new-booking form",
    status: "Implemented",
  },
  {
    id: "calendar",
    label: "Calendar",
    user: "Administrator · Manager",
    heading: "Booked time meets available time.",
    description:
      "A seven-day time grid shows employee-colored availability and bookings. Overlapping work uses separate lanes; day details include manual assignment and Auto-assign.",
    connection:
      "Try assigning mock work to Demo employee 1, 2 or 3. Availability and conflict checks mirror the scheduler’s rules.",
    source: "Operations calendar",
    status: "Implemented",
  },
  {
    id: "availability",
    label: "Availability",
    user: "Employee · Administrator for approvals",
    heading: "The team supplies the availability.",
    description:
      "Employees select dates or ranges and add time intervals. The interface routes short-notice changes to existing availability through an approval request.",
    connection:
      "Saved availability informs the calendar and assignment checks. Administrators review requested changes.",
    source: "Employee availability calendar",
    status: "Implemented",
  },
  {
    id: "customers",
    label: "Customers",
    user: "Administrator · Manager",
    heading: "Customer information stays with the work.",
    description:
      "Search and maintain customer records, contact details and booking, job-log and invoice counts in the operations directory.",
    connection:
      "Choose an existing customer when creating another booking; keep the records connected.",
    source: "Customer directory",
    status: "Implemented",
  },
  {
    id: "invoices",
    label: "Invoices",
    user: "Operations · Assigned employee access",
    heading: "From a booking to an invoice.",
    description:
      "Prepare booking-linked invoice PDFs, preview or download them, and email them when mail delivery is configured.",
    connection:
      "Invoice details use the booking and customer record. This is an invoicing workflow, not an accounting system.",
    source: "Invoice administration",
    status: "Implemented · email needs setup",
  },
] as const;
export type TourId = (typeof tour)[number]["id"];
export const workflow = [
  {
    title: "Capture the booking",
    user: "OPERATIONS",
    text: "An administrator or manager selects a customer and configured service, then records the date, time and work details.",
    detail: "Demo customer A · 12 October · 09:00–11:00",
    state: "Pending booking",
  },
  {
    title: "Connect employee availability",
    user: "EMPLOYEE → OPERATIONS",
    text: "Employees save available time independently of bookings. Operations sees those intervals alongside booked time in the calendar.",
    detail: "Demo employee 1 · 08:00–16:00",
    state: "Availability recorded",
  },
  {
    title: "Assign and confirm the work",
    user: "OPERATIONS",
    text: "Operations triggers checks for active employees, time coverage and conflicts with a 15-minute buffer. Lower priority rank wins; ties use daily workload, then name. No eligible employee means the booking needs attention.",
    detail: "Availability + conflicts + priority",
    state: "Confirmed when assigned",
  },
  {
    title: "Give employees their work view",
    user: "EMPLOYEE",
    text: "Assigned bookings appear in the employee’s upcoming-work view with service, time and relevant customer details.",
    detail: "Upcoming jobs + next site",
    state: "Assigned work visible",
  },
  {
    title: "Keep the operational record",
    user: "EMPLOYEE + OPERATIONS",
    text: "Employees record mileage and notes; operations manages booking status. Invoice PDFs use booking details and can be prepared separately when needed.",
    detail: "Job log + booking status + invoice",
    state: "Records stay connected",
  },
] as const;
export const roadmap = [
  {
    title: "Operations",
    text: "Booking administration, customers, availability, calendar and assignment.",
    status: "Implemented",
  },
  {
    title: "Communication",
    text: "Email, Telegram alerts and Google Sheets mirroring. Configuration-dependent.",
    status: "Implemented",
  },
  {
    title: "Calendar",
    text: "Bookings and employee availability appear together in the operations schedule.",
    status: "Implemented",
  },
  {
    title: "Broader platform",
    text: "Adapt business-specific service rules for more local service teams.",
    status: "Product direction",
  },
  {
    title: "Customer experience",
    text: "Explore public booking and a more configurable service catalog.",
    status: "Exploring",
  },
] as const;
