# Admin calendar reconstruction and mock assignment

Updated 4 October 2026, following the user's request to reflect the scheduler's actual admin calendar and use Demo employee 1, 2 and 3.

## Read-only evidence

The source application was inspected only by reading files. It was not started, queried, edited or used to send anything.

Source paths are relative to `E:/Lab_arena/puhdasfix-scheduler`:

- `src/components/admin/CalendarView.tsx`: seven Monday–Sunday columns; adaptive hour scale; availability and booking bars positioned by start/end time; separate overlap lanes; employee colors; Previous/Next week controls; Availability, Bookings and Compact checkboxes. Small screens have selected-day navigation, availability cards, booking cards and employee select / Save / Auto-assign controls. Employees and closed-day legend follow the calendar.
- `src/app/(dashboard)/admin/calendar/page.tsx`: operations access, active employees, non-archived/non-deleted bookings for the chosen week, recurring and specific-date available intervals. Manual-invoice records are excluded. The component receives sanitized serializable booking/employee/availability objects.
- `src/app/api/bookings/route.ts`, `employeeAvailableForBooking` and `PUT`: one availability interval must cover the whole job; check other active pending/confirmed/in-progress bookings for the employee, excluding the booking being edited; 15-minute buffer; manual assignment confirms, unassignment returns to pending when no explicit status is supplied.
- `src/app/api/bookings/auto-assign/route.ts`: explicitly triggered, active employees, full interval coverage, the same conflict buffer; ascending priority rank, then same-day booking count, then name. No eligible candidate returns an error and leaves the booking unchanged.

The source booking has one `employeeId`. Several employees may have work at the same time; one employee may have multiple separated jobs. This is not evidence of assigning one booking to several employees or accepting overlapping work for a single employee.

## Showcase implementation

- `lib/demo-scheduler.ts`: synthetic employees, bookings, recurring availability, UTC-safe sample dates, overlap lane allocation and pure mock assignment checks/ranking. Fixtures have explicit start/end times and only Pending/Confirmed status. All three employees are active. The booking sample is fixed to 12–18 October 2026; it has no Finnish public holidays. Sunday is closed. No claim of replicating the complete booking backend, holiday engine, authentication, notifications or integrations is made.
- `components/product-demo/calendar-view.tsx` / `.css`: seven-day timed bars on desktop, selected-day cards on mobile, week navigation, display filters, compact timeline, employee key, local select/Save/Auto-assign/unassign and Reset demo. Desktop also exposes the source's day-card assignment controls below the weekly grid to make them usable in the showcase. Day headings/bars can select those details. Those two desktop interactions and Reset demo are showcase adaptations, not literal original desktop controls.
- `components/product-demo/product-demo.tsx`: holds booking state above the tabs. Assignment persists when visiting Operations or Bookings and returning to Calendar. Reloading or Reset demo restores fixtures; no localStorage, API calls, persistence or delivery is involved.
- `components/product-demo/views.tsx`: operation rows, upcoming row and pending/confirmed booking lists reflect that state. Other tour views remain source-derived display examples, not an editable product replica.
- `lib/product-data.ts`, `record-context.tsx`, workflow `record-scene.tsx`: use the same numbered employee naming, with disclosures retained. The workflow assignment illustration remains a separate illustrative scenario rather than a live transaction driven by tour edits.

## Illustrative scenarios

| Fixture | Purpose |
| --- | --- |
| DEMO-101 / DEMO-104 | Both 09:00–11:00 on Monday, assigned to employees 1 and 3 in separate lanes |
| DEMO-105 | 09:30–10:30 Monday; employees 1 and 3 conflict, employee 2 can take it |
| DEMO-102 | 12:00–16:00 Monday; employee 1 can take another job after DEMO-101; employee 3 can be selected manually; employee 2 conflicts with DEMO-103 |
| DEMO-111 | Short illustrative 11:00–11:15 slot, showing pending work next to the morning jobs and their buffer |
| DEMO-112 | 17:00–18:00 outside every employee's availability; manual assignment and Auto-assign return feedback |
| DEMO-107 | Wednesday 12:00–13:00; employee 3 has split availability 08:00–12:00 / 13:00–16:00, so neither interval covers the whole job |

Auto-assign outcomes are recomputed from the current mock state; changing another assignment can change the eligible employee and daily workload ranking. Failure never changes the saved assignment or booking status.

## Validation

Lint, TypeScript and the production static export passed. All 17 Playwright tests passed using installed Microsoft Edge, including four new calendar tests covering source-rule boundaries, exact 15-minute spacing, self-exclusion on resave, concurrent work on different employees, repeated work, manual reassignment, unassignment, no-candidate feedback, split interval coverage, priority/load/name ranking, cross-tab consistency and absence of API calls.

The calendar was checked at 375, 768, 1024 and 1440px with axe WCAG A/AA checks, no horizontal overflow, bars fitting their day columns, filters, compact view, day/week navigation and no page errors. Calendar screenshots at mobile, tablet and desktop widths were visually inspected. Existing tour, workflow, exact-PNG branding, form, SEO and reduced-motion tests also passed. Lighthouse was not rerun for this revision.

Read-only SHA-256 source integrity comparison: 207 baseline files; 0 changed, 0 deleted, 0 added.
