# Second product-truth and connected-motion review

Reviewed 2 October 2026. Editable project: `E:/Lab_arena/Keikora`.
Evidence project: `E:/Lab_arena/puhdasfix-scheduler`, strictly read-only.
This follow-up preserves the existing website and design system.

## Evidence rechecked

The source root redirects to authenticated administration/employee screens; no
public customer booking page was found. `NewBookingForm.tsx` and the booking API
support operations-created records. The booking model links customer, service,
occupied time, employee, status, events, job logs and invoice fields.

`src/app/api/bookings/auto-assign/route.ts` requires operations access, selects
active employees, tests coverage, rejects conflicting bookings with a 15-minute
buffer, then sorts by ascending priority rank, daily booking count and name.
It assigns an employee and confirms the booking, or returns no eligible employee.
It rejects property-service inquiries; this is not a universal service matcher.
The source's rules were inspected, not executed or recreated as a live service.

The operations calendar loads bookings and employee intervals independently.
Employee jobs are filtered by assigned employee. The mounted dashboard mileage
recorder exists; `TodayJobs` still has no consuming route. The customer directory
shows contact fields and booking/job-log/invoice counts. Invoice administration
selects booking records without a completed-only filter and supports preparation,
preview/download and configured email sending. It does not require the diagram's
preceding stages to complete before an invoice can be prepared.

Google Calendar helper functions remain unconnected to availability mutations.
Email, selected Telegram alerts and Google Sheets mirroring retain their setup
qualifications. No source runtime, API, database, integration or notification
was invoked. Existing details remain in `product-audit.md`.

## Section and claim review

These classifications are internal documentation, not visitor-facing labels.

| Section / meaningful statements                                                                                       | Classification before this pass                                   | Final disposition / evidence                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation: product, workflow, industry, story, development and contact anchors                                       | SUPPORTED                                                         | Retained working anchors; contact destination explains that outreach starts through email                                                                    |
| Hero: bookings meet availability; work gets coordinated                                                               | SUPPORTED                                                         | Retained headline because calendar and assignment implement this connection; supporting text now names administrators/managers and employee work visibility |
| Hero: operational foundation exists; broader platform in development                                                  | SUPPORTED / FUTURE DIRECTION                                      | Retained explicit distinction between source implementation and productization                                                                              |
| Trust: operations foundation, role workflows, connected records, rule-based assignment                                | SUPPORTED                                                         | Retained; assignment label now says support, not autonomous scheduling                                                                                      |
| Booking/problem: booking needs time, employee and customer context                                                    | SUPPORTED BUT WORDING TOO BROAD                                   | Explicit operations capture and availability context replace ambiguity about public booking                                                                 |
| Workflow: capture, availability, assignment, assigned work, records                                                   | SUPPORTED BUT WORDING TOO BROAD                                   | Availability now explicitly independent; assignment explicitly triggered; records/invoices are related actions rather than a rigid completion pipeline      |
| Workflow assignment: availability/conflicts/priority                                                                  | SUPPORTED                                                         | Added active-employee checks, 15-minute buffer, ascending priority rank and workload/name tie-breaking; no fit still needs attention                        |
| Feature: customer record to connected history                                                                         | SUPPORTED BUT WORDING TOO BROAD                                   | Replaced “Connected history” with “Bookings & record counts”; no profile timeline suggested                                                                 |
| Features: configured services, assignment checks, email/events/invoices                                               | SUPPORTED                                                         | Retained configured-service and notification wording; billing is PDF preparation, not accounting or payment processing                                      |
| Product tour: six implemented areas                                                                                   | SUPPORTED                                                         | Kept Operations, Bookings, Calendar, Availability, Customers and Invoices; each remains useful and source-derived                                           |
| Invoice view: email drafts                                                                                            | UNSUPPORTED wording                                               | Replaced with configured email delivery: the source sends prepared invoice emails, rather than merely drafting them                                         |
| Product examples: disconnected customers/dates/form values                                                            | SUPPORTED relationships, weak continuity                          | Central DEMO-101 identity now links booking, calendar, availability, customer and invoice context; pending DEMO-102 stays on its correct 12 October date    |
| Architecture: availability → calendar → assignment; booking → events → invoice                                        | SUPPORTED BUT WORDING TOO BROAD                                   | Rewritten as “informs” and “links” relationships; avoids implying events are a prerequisite for PDFs                                                        |
| Story: PuhdasFix origin and broader product direction                                                                 | SUPPORTED by user context / FUTURE DIRECTION                      | Retained; no paying-customer, traction or commercial-validation claim                                                                                       |
| Industries: originating business versus broader sectors                                                               | FUTURE DIRECTION insufficiently prominent on individual cards     | Cleaning card now says “Originating environment”; the other five each say “Product direction”                                                               |
| Before/after: connected operational records                                                                           | SUPPORTED                                                         | Retained connections; explanation identifies originating software and separates specialist accounting                                                       |
| Philosophy: clarity, connected workflows and purposeful automation                                                    | SUPPORTED as design principles                                    | Retained; rules/configuration are explicit, no AI or guaranteed outcomes                                                                                    |
| Roadmap: operations, communications and calendar implemented; broader platform/customer experience future | SUPPORTED / FUTURE DIRECTION                                      | Retained implemented operations/calendar foundations; omitted unfinished Google Calendar sync from the public timeline because it is not important to showcase |
| Contact: conversation form and no demo-account promise                                                                | SUPPORTED showcase behavior                                       | Form submits through FormSubmit to the monitored email address; retained honest notice that no demo account is created                                      |
| Final CTA: spend less time managing work                                                                              | UNSUPPORTED as a measured outcome                                 | Replaced with exploring connections and shaping the next product chapter                                                                                    |
| Footer: local-service operations brand, Oulu, in development                                                          | SUPPORTED positioning / FUTURE DIRECTION                          | Retained visible development status and truthful links                                                                                                      |
| Metadata, social/structured data and manifest                                                                         | SUPPORTED positioning, description too broad about productization | Description now emphasizes implemented operations/invoice workflows and broader platform in development; original logo and social artwork preserved         |

No public booking portal, AI, skill/route matching, online payment integration,
customer traction or new third-party integration was added. The site was not
weakened by labeling every implemented function as merely planned.

## Product representations and record continuity

`demoRecord` in `lib/product-data.ts` defines DEMO-101: Demo customer A,
Home cleaning, 12 October, 09:00–11:00, Demo employee A, saved time 08:00–16:00.
The tour shows a confirmed example; the creation-form excerpt describes its
earlier, unassigned fields. These are illustrative snapshots, not live mutations.

A persistent context strip explains the relevant relationship for each of the
six tabs. The corresponding queue row, confirmed booking, Monday calendar block
and customer row are highlighted. Availability belongs to the employee, not the
customer or booking; the context strip explains coverage rather than inventing a
booking field in the availability screen. Invoice preparation uses the same ID.

Calendar samples no longer repeat unrelated booked work across every weekday.
The pending DEMO-102 appears on Monday 12 October, matching its booking detail.
The third queue service uses a supported textile-cleaning example, keeping the
demonstration focused on the source service rules.

All views retain source-reconstruction/synthetic-data disclosures. No private
screenshots or customer data were used. Static product actions remain display
examples; tab switching changes only the local showcase.

## Motion and what it communicates

| Motion                                                           | Meaning and controller                                                                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Hero connecting segments fill blue/teal/green                    | Natural scrolling connects booking record, available time, assignment and assigned work                                  |
| Hero booking/request panels move 6–20px at different rates       | Subtle separation of operational work and requests, without moving headings, controls or logos                           |
| Existing illustration connector progressively draws              | Links operations capture, employee intervals and assigned work; image preserved, translation reduced to restrained depth |
| Workflow keeps one booking card mounted across all five contexts | Same identifier moves into calendar, assignment, employee work and records contexts; no anonymous card replacement       |
| Mini calendar overlays booked time on an available interval      | Makes the coverage relationship visible                                                                                  |
| Assignment rows gain check markers as the third chapter scrolls  | Shows coverage, conflict rejection and priority selection; all explanatory text remains visible                          |
| Persistent tour context and matching record highlights           | Links the six source-derived views; tab controls remain optional exploration rather than a fake backend transaction      |

The site uses existing passive scrolling/requestAnimationFrame logic and native
CSS view timelines. No animation dependency, autoplay carousel, timer, forced
scroll or wheel interception was introduced. SVG dash progress is limited to
connection paths; other movement uses transform/opacity.

Reduced motion disables animated movement and leaves every explanation/result
readable. Browsers without view timelines retain the complete static composition.
Short screens (760px high or less) show all five chapters and their mini visuals
in normal page flow so the fuller assignment explanation is not clipped. The
original PNG logos and connected-work image bytes are preserved.

## Validation and review

Lint, TypeScript and the static production build passed. All 13 Edge/Playwright
browser tests passed on the final export (1.1 minutes). Two refined motion
assertions also passed separately during the review.
Browser checks include connected identity across six tabs, genuine wheel-driven
hero/assignment progression and reverse progression, persistent booking DOM,
reduced-motion transforms, illustration connector progression and a 700px-high
linear fallback, in addition to the existing tests.

The first run found an existing keyboard test using a 720px-tall default viewport
and expecting pinned step buttons. Its setup now explicitly uses a taller viewport
for the pinned presentation; separate tests cover the intended short-screen
linear mode. This was a test expectation adjustment for the expanded explanation.

Responsive screenshots and rendered homepage text are produced by
`scripts/review-connected-story.mjs`. The review considers an owner’s understanding,
visible operational depth, source fidelity and purposeful scrolling. Headings,
body text, forms and navigation keep their established presentation.

Fresh Lighthouse against the final production export measured Performance **86**,
Accessibility **100**, Best Practices **100**, SEO **100**, CLS **0**, LCP **4.13s**
and total blocking time **75.5ms**. The report is
`test-results/lighthouse-truth-motion-final.json`. A first run during this review
measured 84 performance. Geist/Geist Mono now use optional font display, permitting
the adjusted fallback to remain on slow initial loads instead of a late swap;
the main font stays preloaded and the illustration has explicit low fetch priority.
No logo/image recompression or animation dependency was introduced.

The 95 performance target has not been reached. The older 89 result predates the
illustration; the older 95/96 results refer to earlier artwork/revisions. These
local runs do not establish a deployed performance guarantee or isolate every
source of variation. Added motion uses small CSS/markup and the existing scroll
listener; the preserved WebP is still 67,988 bytes and remains lazy-loaded.

Read-only source-integrity comparisons before and after implementation found
all 207 baseline source files unchanged, with zero added/deleted files. Source
environment and private-record values were not exposed. Original logo PNGs,
favicon and both illustration files were not edited.

## Files changed

- `lib/product-data.ts`, `lib/site-config.ts`: shared example, qualified workflow,
  metadata description.
- `components/hero/hero.tsx`, `components/brand/hero-flow.tsx`: explicit role copy
  and scroll-connection labels.
- `components/features/features.tsx`, `architecture.tsx`: claim corrections,
  relationship wording and individual industry status labels.
- `components/features/work-illustration.tsx`, `work-illustration.css`: preserved
  artwork, clearer labels and progressively connected, restrained motion.
- `components/workflow/workflow.tsx`, new `record-scene.tsx`: persistent record,
  mini context visuals, assignment explanation and linear-mode information.
- `components/product-demo/product-demo.tsx`, `views.tsx`, new `record-context.tsx`,
  new `connected-motion.css`: source-derived continuity, record focus and motion.
- `components/footer/footer.tsx`, `app/layout.tsx`, `app/manifest.ts`: truthful CTA,
  CSS import and development-aware metadata.
- `tests/site.spec.ts`: new/updated content and motion checks.
- New `scripts/check-source-integrity.mjs`, `scripts/review-connected-story.mjs`:
  read-only integrity comparison and local rendered review.
- This guide, `docs/product-audit.md`, `docs/brand-system.md`, `docs/scroll-workflow.md`,
  `docs/work-illustration.md`, `README.md`, `CHATGPT_CONTEXT.md`: current handoff.

No dependency was added and no original brand or illustration asset was modified.
