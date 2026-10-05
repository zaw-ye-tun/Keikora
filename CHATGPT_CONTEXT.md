# Keikora — complete project context for ChatGPT

Updated: 4 October 2026. This file is a handoff for a new ChatGPT/Codex session.
It includes the current project state and the original user instructions.

**Read the current context first. The original instructions in the appendices
are historical: later user corrections take precedence. In particular, use the
user's exact PNG logos, not a recreated SVG logo.**

## 1. How to use this file

The user can upload this file to a new ChatGPT conversation with:

> Read this Keikora project context first. Preserve its product-truth and
> read-only boundaries, use my exact supplied PNG logos, and continue with this
> new task: [describe the task].

This is context, not an instruction to redesign or deploy the project again.
If you have workspace access, inspect the relevant current files before editing.
If you only have this document, you can understand the project but cannot claim
to have inspected, modified or tested the repository.

## 2. Projects and absolute boundary

| Project                   | Local path                         | Allowed work                         |
| ------------------------- | ---------------------------------- | ------------------------------------ |
| Keikora showcase website  | `E:/Lab_arena/Keikora`             | Read, edit and validate this project |
| Source operations product | `E:/Lab_arena/puhdasfix-scheduler` | **Read-only evidence**               |

Only modify Keikora. Never edit, format, rename, delete or create source-product
files; install packages there; change environment files, lockfiles or databases;
run migrations, seeds, auto-fixes, commits or deployments there; or save
screenshots there. Do not start the source application or invoke its APIs for
showcase work: runtime actions can affect records and notifications.

Do not read or publish secret environment values, credentials, tokens or private
customer/employee records. The source audit used code inspection rather than a
running product. A local ignored `source-audit-baseline.json` records file hashes;
earlier comparisons found all 207 audited source files unchanged. This is a
historical verification, not permission to mutate that project or a fresh check.

Read `AGENTS.md` before implementation. It requires reading relevant local
Next.js guides under `node_modules/next/dist/docs/` before writing Next.js code.
`CLAUDE.md` refers to `AGENTS.md`.

## 3. What Keikora is

Keikora is an early-stage product identity and showcase for software developed
from real service-business operations in Oulu, Finland. The originating business
is PuhdasFix. Mention PuhdasFix as the origin/testing environment in the story,
not as a claimed paying Keikora customer or a customer-logo endorsement.

Positioning: **Operations software for local service businesses.**
Brand phrase: **Orchestrating service work.**
Core idea: connect bookings, people, available time and operational records.

The inspected source is an implemented **single-business operations application**,
not proof of an already released generic multi-tenant SaaS. Its service/pricing
logic is tailored to the originating cleaning/service business. Broader support
for maintenance, installation, repair, home services and field-service teams is
product direction, not an existing specialization claim.

Keikora should look like a broader operations platform. Keep the true source
service examples in clearly labeled demonstrations; do not invent implemented
industry functionality to make the demo feel broader.

## 4. Product facts that may be presented as implemented

The detailed source paths, limitations and user journeys are in
`docs/product-audit.md`. The source uses Next.js 14, Prisma/PostgreSQL and
ADMIN, MANAGER and EMPLOYEE roles. The showcase is a separate static project.

| Capability               | Actual scope and qualification                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Booking creation         | Administrator/manager selects a customer and configured service, captures date/time, work details, duration, recurrence and payment method              |
| Booking administration   | Operational queues, filters, details, status/events and assignment controls                                                                             |
| Employee availability    | Employee calendar, date ranges and time intervals                                                                                                       |
| Availability approvals   | Short-notice changes to existing availability have a request/approval UI; implementation limitations mean this is not an absolute enforcement guarantee |
| Operations calendar      | Bookings and employee availability, week/day views, employee lanes and filters                                                                          |
| Assignment               | Manual assignment and an explicitly triggered rule-based auto-assignment action                                                                         |
| Assignment rules         | Active employees, availability coverage, existing-work conflicts, a 15-minute buffer, priority rank and workload/name tie-breaking; no guaranteed fit   |
| Employee work view       | Employees see their assigned upcoming work and relevant booking/customer/service details                                                                |
| Mileage and notes        | Mounted mileage/job-log recorder; do not imply a fully shipped employee start/finish interface                                                          |
| Customer directory       | Contact records, search/edit and connected booking/job-log/invoice counts                                                                               |
| Service pricing/duration | Existing configured records and business-specific rules, not a general service-catalog editor                                                           |
| Recurring work           | Weekly/monthly creation and recurring-request review; do not imply every schema enum is supported                                                       |
| Inquiries/messages       | Operations inboxes, status and email replies; not universal live chat                                                                                   |
| Invoice PDFs             | Booking-linked preparation, preview/download and email when delivery is configured                                                                      |
| Payment state            | Record tracking, not proof of online card processing or settlement                                                                                      |
| Operational dashboard    | Actionable bookings, change requests, inquiries/messages, recurrence and notifications; not invented SaaS growth analytics                              |
| Email notifications      | Implementation exists; SMTP/settings and actual delivery require configuration                                                                          |
| Telegram alerts          | Selected alerts depend on settings/link configuration                                                                                                   |
| Google Sheets mirroring  | Internal database mirroring depends on configuration; not a connector marketplace                                                                       |

The operational calendar and booking/order flow are implemented. Google Calendar
OAuth connection groundwork exists, but employee availability synchronization is
partial/disconnected. Label **Google Calendar availability sync** in development,
not completed. A schema model, unused component or helper function alone does
not establish shipped functionality.

## 5. Claims to avoid and future direction

Do not present any of the following as already built or commercially proven:

- Public customer online-booking UI or a customer account portal.
- Generic multi-tenant onboarding, arbitrary service-catalog editing or a CMS.
- AI assignment, skill matching, route optimization or guaranteed assignment.
- Payroll, accounting replacement, online payment gateway or a full analytics suite.
- A mounted employee start/finish journey: the inspected `TodayJobs` component
  was not imported by a route.
- Finished Google Calendar availability synchronization.
- Verified delivery of email, Telegram or spreadsheet synchronization merely
  because integration code exists.
- Paying customers, revenue, market leadership, testimonials, customer logos,
  awards, uptime statistics, real booking volumes or growth percentages.

Broader platform adaptation, customer experience and configurable business
workflows must remain labeled in development/planned/exploring as appropriate.
Do not invent release dates, version milestones or prices.

## 6. Visual direction and user's latest priorities

The desired feel is Nordic, calm, modern, capable, trustworthy, practical,
technical, human and slightly premium. Use generous whitespace, readable
typography, restrained borders/shadows, deep navy, electric blue, teal and a
small fresh-green accent. Avoid generic SaaS templates, sci-fi/robot imagery,
excessive gradients/glassmorphism and decorative clutter.

Connection, coordination, simplicity, automation and flow guide the brand.
Do not claim a dictionary meaning or false etymology for the name Keikora.
Do not use guaranteed growth as the primary brand promise.

Important later user requests:

1. The user supplied logo PNGs inside `public`.
2. The user repeatedly insisted: **“use exactly what I provide as PNG.”**
3. The user felt the site was too static and wanted scrolling to advance the
   workflow without having to click.
4. The user asked for another picture to introduce more motion.
5. The user asked for this Markdown file so ChatGPT can understand all context.
6. The user asked for shorter workflow pacing (100px per chapter).
7. The user said the calendar did not reflect the real admin dashboard and asked
   for Demo employee 1, 2 and 3, repeated/concurrent assignments and working
   assignment controls using mock data. The source was rechecked before editing.
8. The user said For businesses and Our story were not aligned with the main
   navigation and site, then said Product and How it works had the same problem.
   Those page sections now follow the menu order, section labels match their
   links, and the content names the same implemented workflows.
9. The user said the large dashboard-style product preview did not need to be
   on the first page/hero. The first screen now keeps only the headline,
   actions and compact orchestration cue; the full product interface starts in
   the Product section.

Motion should explain connected work and follow natural scrolling. Respect
`prefers-reduced-motion`. Do not replace the current work with an unsolicited
redesign or require clicks to progress through the workflow.

## 7. Exact production branding — preserve this

| Asset                                     | Dimensions             | Purpose                                         |
| ----------------------------------------- | ---------------------- | ----------------------------------------------- |
| `public/brand/keikora_logo.png`           | 589 × 464              | Original transparent symbol                     |
| `public/brand/keikora_text.png`           | 1042 × 372             | Original wordmark, including embedded tagline   |
| `app/icon.png`                            | 589 × 464              | Byte-identical copy of the original symbol      |
| `public/brand/social-card.svg` and `.png` | 1200 × 630 composition | Social preview incorporating original logo PNGs |

Display the supplied logos intact at their original aspect ratio. Do not trace,
redraw, crop, recolor, morph, regenerate, optimize or replace them. Do not remove
the embedded tagline. This later instruction overrides the original temporary
wordmark and SVG-production-logo suggestions in the historical briefs.

The reusable logo component is `components/brand/keikora-logo.tsx`.
`components/ui/logo.tsx` re-exports it. Original PNGs appear in navigation, hero,
product demos, architecture, comparison, story and footer. Dark placements use a light
backplate so the original navy artwork stays readable.

Logos use native `<img>` elements with dimensions, asynchronous decoding and
appropriate eager/lazy loading. A local lint exception is documented. Logo motion
only fades/translates the intact artwork; the image itself is not modified.
Decorative workflow SVG paths are allowed; they are not replacement logo art.

`scripts/create-brand-assets.mjs` embeds the original PNG bytes in the social SVG
and copies the symbol to `app/icon.png`. It does not overwrite the source logos.
`scripts/create-social-card.mjs` renders the social composition with Sharp.
See `docs/brand-system.md` for placement, dimensions and motion guidance.

## 8. Current site and interaction

The homepage currently contains, in order:

1. Fixed navigation (with its original space reserved) and hero.
2. Trust principles.
3. Booking/problem explanation with the new connected-work illustration.
4. Connected feature explanations and six-view product tour.
5. Scroll-driven five-step workflow.
6. High-level operational architecture.
7. For businesses: current roles/workflows and broader industry direction.
8. Our story: PuhdasFix origin and the implemented operational foundation.
9. Disconnected/connected workflow comparison.
10. Product philosophy, development roadmap, contact section and footer.

Current hero headline: **“Bookings meet availability. Work gets coordinated.”**
Navigation anchors: `#product`, `#workflow`, `#businesses`, `#story`, `#roadmap`.
Contact anchor: `#contact`. There is also `/privacy/`.

The hero no longer renders the large source-derived dashboard preview. It keeps
the headline, actions, note and compact orchestration cue. The detailed
source-derived product interface appears in the Product section.

Header navigation uses a passive scroll listener and requestAnimationFrame to
mark the section currently in view with `aria-current="location"`. Hash links,
browser history and resized layouts are accounted for. The fixed header avoids
focus scrolling toward a sticky header's original document position. Its mobile
menu overlays the content, preserving page/anchor positions and the selected
section. Product, How it works, For businesses and Our story follow the main
menu order and use matching section labels. For businesses is also present in
footer navigation. Those sections use the same content container as the header;
their links return to the implemented product views. Cleaning remains the
originating environment and all five other sectors remain product direction. See
`components/story/section-alignment.css` and `docs/section-alignment.md`.

### Product tour

The working tabs are Operations, Bookings, Calendar, Availability, Customers and
Invoices. They show faithful **source-derived HTML/CSS reconstructions** with
Keikora styling and fictional DEMO customers, employees and bookings.
They are not production screenshots, invented future screens or live backend
access. Keep reconstruction and synthetic-data disclosures visible.

Tabs support keyboard arrow keys, Home and End. Operations is an actual work
queue, not fake commercial KPI cards. No private source records were exposed.

Calendar now reconstructs the source's seven-day timed grid, employee colors,
separate overlap lanes, adaptive hour scale, week navigation, display filters,
compact view and mobile day cards. It includes Demo employee 1, 2 and 3 and
working local employee select / Save / Auto-assign / unassign controls. Desktop
also shows the source's mobile assignment cards beneath its weekly grid; this
and Reset demo are showcase adaptations. One availability interval must cover
the entire job, with a 15-minute gap from other jobs for that employee.
Different employees can have concurrent jobs; an employee can have several
separated jobs. One booking still has one employee, matching the source schema.
Auto-assign ranks eligible employees by priority, daily booking count, then name.
Assignments carry across Calendar, Operations and Bookings tabs in React state.
Nothing is sent, persisted or stored; Reset demo/reload restores fixtures.
Fixtures are anchored to 12–18 October 2026, with recurring availability,
Wednesday split intervals and closed Sunday. They are not real production data.
See `docs/calendar-demo.md`, `lib/demo-scheduler.ts` and the new
`components/product-demo/calendar-view.tsx` / `.css` for evidence and behavior.

### Workflow

The five source-grounded steps are:

1. Capture the booking.
2. Connect employee availability.
3. Assign and confirm the work.
4. Give employees their work view.
5. Keep the operational record.

Natural scrolling advances the selected step and preview while the presentation
stays pinned. Scrolling back reverses it. A connection path and progress meter
fill continuously. Optional step buttons are keyboard-accessible shortcuts.
No wheel/touch interception, automatic timer or scroll locking is used.

On 4 October the user reported needing about three wheel movements per step.
The chapter distance was reduced to 100px on desktop/mobile. The track reserves
exactly five times that distance beyond the sticky stage height, making a typical
100px wheel movement advance one chapter. Gesture deltas vary by device; no
forced scrolling or input interception was introduced.

Implementation: passive scroll listener, one requestAnimationFrame update,
ResizeObserver and CSS progress variables. React updates only when the active
chapter changes. Screens 760px high or shorter show all five chapters as ordinary
articles, including the assignment mini visual. A persistent DEMO-101 booking
card anchors calendar, assignment, employee-work and administrative contexts.
Reduced motion removes decorative transitions while preserving
readable content and step progression. See `docs/scroll-workflow.md`.

### New illustration and motion

`components/features/work-illustration.tsx` replaces the earlier static fragmented
tools diagram beside the booking explanation. It shows an editorial 3D calendar,
checklist and employee view connected by a blue–teal ribbon. This is conceptual
art, not an actual application screenshot or customer photograph.

- Original generated PNG: `public/illustrations/connected-work.png`, 1536 × 1024.
- Website WebP: `public/illustrations/connected-work.webp`, 1000 × 667, 67,988 bytes.
- Generated with the built-in image tool; the supplied logos were not inputs.
- Three HTML cards describe booking details, available time and assigned work.
- The picture and cards move at different speeds through a CSS view timeline.
- Motion follows scrolling and reverses with it; there is no autoplay loop.
- Reduced motion gives a still image. Unsupported browsers retain a readable
  composition and the existing entry reveal.
- Image dimensions reserve space; loading is lazy.

`components/features/work-illustration.css` controls this visual.
`scripts/create-work-illustration.mjs` copies a generated PNG and creates the
smaller WebP. The complete generation prompt is in `docs/work-illustration.md`.
General section entry motion uses `components/ui/reveal.tsx`, IntersectionObserver
and CSS. No general Motion/Framer Motion runtime remains in the project.

## 9. Technology, commands and hosting

Environment used during this work: Windows, PowerShell, Node.js 24.11.1, npm.
Project guidance supports Node.js 22 or newer. Declared dependencies include
Next.js `^16.3.8`, React/React DOM `^19.3.0`, TypeScript `^6.0.3`, Tailwind `^4.3.3`
and Lucide `^1.49.0`. Inspect installed versions before assuming they are unchanged.

App Router, strict TypeScript, Geist/Geist Mono via `next/font`, static export.
`next.config.ts`: `output: "export"`, `trailingSlash: true`, images unoptimized.
No marketing-site database, authentication system or paid backend API is needed.

Run commands from **Keikora**, never the source project:

```powershell
Set-Location E:\Lab_arena\Keikora
npm install
npm run dev
```

Development URL: `http://localhost:3000`.

```powershell
npm run lint
npm run typecheck
npm run build
node scripts/serve-export.mjs
```

Build output is `out/`. The export preview server uses
`http://127.0.0.1:4173`, with text compression and immutable static-asset caching.
Do not use `next start` for this static export. Check existing server processes
before starting duplicates; previously running development/preview servers are
not guaranteed to remain active in a new session.

Browser tests with installed Edge:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
```

Alternatively install Playwright Chromium with `npx playwright install chromium`
and run the tests without the channel override. Tests use the production export,
so rebuild it after website changes before relying on browser results.

Intended deployment: Cloudflare Pages static HTML export, build command
`npm run build`, output directory `out`, Node 22+. No deployment was performed
during this work. `siteUrl` is configured as `https://keikora.fi`; DNS and
Cloudflare Pages custom-domain connection still need to be completed outside
this repository.

## 10. Contact, privacy and SEO

`lib/site-config.ts` centralizes name, URL, description, location, contact and
social links. Current location is Oulu, Finland. `siteUrl` is
`https://keikora.fi`, `contactEmail` is `info@keikora.fi`, and `socialLinks` is
empty. Do not invent social accounts.

The contact section shows a direct `mailto:` link to `info@keikora.fi`. The
visitor must send the message from their email application. Opening a draft is
not delivery, and the website itself does not store submissions. The copy avoids
promising demo access or account provisioning.

Metadata/canonical/OpenGraph/Twitter/Organization and WebSite JSON-LD are in
`app/layout.tsx`. Robots, sitemap and manifest have their own app files.
`public/_headers` contains static-host security headers. Keep URLs, product claims
and privacy text accurate. No private product endpoints or credentials belong
in the marketing page, public handoff or client bundle.

## 11. File map

| Area                                         | Files                                                                                  |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| Homepage composition                         | `app/page.tsx`                                                                         |
| Layout, metadata, fonts, CSS imports         | `app/layout.tsx`                                                                       |
| Main responsive styles                       | `app/globals.css`                                                                      |
| Configuration                                | `lib/site-config.ts`, `next.config.ts`                                                 |
| Product facts, examples, navigation, roadmap | `lib/product-data.ts`                                                                  |
| Navigation and hero                          | `components/navigation/navigation.tsx`, `components/hero/hero.tsx`                     |
| Branding                                     | `components/brand/keikora-logo.tsx`, `hero-flow.tsx`, `workflow-rail.tsx`, `brand.css` |
| Workflow                                     | `components/workflow/workflow.tsx`, `workflow.css`                                     |
| Illustrative picture                         | `components/features/work-illustration.tsx`, `work-illustration.css`                   |
| Product tour                                 | `components/product-demo/product-demo.tsx`, `views.tsx`, `product-demo.css`            |
| Features and architecture                    | `components/features/features.tsx`, `architecture.tsx`                                 |
| Story, roadmap, CTA, footer                  | Corresponding folders under `components/`                                              |
| Entry motion                                 | `components/ui/reveal.tsx`                                                             |
| Privacy                                      | `app/privacy/page.tsx`                                                                 |
| Browser/accessibility checks                 | `tests/site.spec.ts`, `playwright.config.ts`                                           |
| Build preview and asset generation           | `scripts/`                                                                             |
| Product evidence                             | `docs/product-audit.md`                                                                |
| Branding guide                               | `docs/brand-system.md`                                                                 |
| Scroll behavior guide                        | `docs/scroll-workflow.md`                                                              |
| Illustration provenance and full prompt      | `docs/work-illustration.md`                                                            |
| Setup and hosting instructions               | `README.md`                                                                            |

Ignored/generated material includes `node_modules/`, `.next/`, `out/`,
`test-results/`, Playwright reports, `.env*`, TypeScript build info and the private
audit-baseline JSON. Do not treat generated outputs as source files to edit.
No Git repository had been initialized during the earlier implementation; check
current state before assuming a branch, commit or remote exists.

## 12. Latest validation and known limitations

The later 4 October hero/section-alignment revision passed lint,
TypeScript, static build and all **18 Playwright tests** in Edge. The new test
covers Product, How it works, For businesses and Our story anchors, matching
labels, page order, container alignment, current section indicators, mobile
keyboard focus without page jumps, browser history and product/footer links at
four widths. It also asserts that the first screen has no hero product dashboard
and that the detailed product tour remains in the Product section. Section
screenshots were visually reviewed. Supplied PNG branding checks still pass.
Source integrity remains 207 files with zero changed/deleted/added; no source
runtime was used. No fresh Lighthouse run was performed for this revision.

The 4 October admin-calendar revision passed lint, TypeScript and static build.
All **17 Playwright tests** passed, including four new calendar tests covering
assignment rules, ranking/buffer boundaries, reassignment/unassignment, conflicts,
split availability, no eligible worker, cross-tab consistency, no API requests,
filters, day/week navigation and four-width accessibility/overflow checks.
Mobile/tablet/desktop calendar screenshots were visually inspected. Source
integrity remains 207 files, zero changed/deleted/added. Lighthouse was not rerun;
its historical measurements below must not be described as current validation.

The 4 October pacing-only update passed lint, TypeScript, static build and three
focused browser tests. A fixed 100px wheel movement advances each workflow chapter
and reverses through every chapter at 375, 768, 1024 and 1440px. Assignment-check
progression and short-screen mode also passed. Source integrity still reports all
207 baseline files unchanged. The complete-suite/Lighthouse results below are
from the preceding second content/motion review, not a fresh Lighthouse run for
this spacing adjustment.

After the second content/motion review, the following passed:

- `npm run lint`.
- `npm run typecheck`.
- `npm run build` (static export).
- All **13 Playwright browser tests**, using installed Edge. Two motion checks were also rerun after refining their assertions.

The checks cover four layouts (375, 768, 1024 and 1440px), automated axe
accessibility, no horizontal overflow or browser errors, six demo views and
keyboard navigation, mobile menu, honest contact behavior, privacy/SEO assets,
byte-identical supplied branding, forward/reverse workflow scrolling without
clicks, reduced motion, short-screen fallback and the new picture's scroll motion.
Desktop and mobile illustration screenshots were visually reviewed.

These results describe the completed revision, not future edits. Automated axe
checks do not prove full WCAG conformance. Re-run appropriate checks after changes.

The fresh production-export Lighthouse run after the second review measured
Performance **86**, Accessibility **100**, Best Practices **100**, SEO **100**,
CLS 0, LCP 4.13 seconds and total blocking time 75.5ms. It is a local export
result, not a deployed guarantee. An earlier run during this review measured 84;
font display and image priority were then refined. Fonts now use `display: optional`
so slow loads can retain the adjusted fallback rather than a late font swap.
Earlier 95+ measurements apply to older revisions; do not claim the current
performance target of 95+ has been achieved. Detailed results are in
`docs/content-motion-audit.md`.
Preserving the supplied PNGs is an explicit user requirement.

Other outstanding setup: monitored contact channel, real hosting/domain
configuration and broader product development. Do not claim these are completed.

## 13. Continue from here

The second product-truth/motion review tightened administrative-booking copy,
independent availability, triggered rule checks and separate invoice preparation.
“Connected history,” sequential architecture arrows, “email drafts” and the
time-saving CTA were corrected. Each industry card now distinguishes the
originating cleaning environment from future sectors. All six tour contexts
follow DEMO-101; the detailed product tour now starts in the Product section,
while connecting paths and assignment-check markers move with scrolling. The
original PNGs and illustration files remain unchanged.
See `docs/content-motion-audit.md` for the complete review and latest validation.

The requested branding, scroll-driven workflow, extra moving illustration and
this context handoff are completed. There is no pending authorization to publish,
contact anyone, change the source product or invent additional product features.
Continue with the user's next specific request while preserving this foundation.

For implementation, read only the relevant existing files and audit evidence,
make changes within Keikora, respect responsive/reduced-motion behavior and run
appropriate validation. Keep documentation current when behavior materially
changes. For purely editorial documentation changes, a content review is enough;
do not imply the application was retested unless it was.

## Appendices — original user-provided instructions

The following original briefs are included verbatim for completeness. They are
**historical reference**, not a request to redo completed work. Their speculative
screens/features were corrected by the later source audit; their SVG-logo
suggestions were overridden by the user's exact-PNG requirement. The current
context above describes the implemented revision and these later corrections.


### A. Initial showcase website brief

~~~~~~text
You are acting as a senior product designer, UX engineer, frontend engineer, and SaaS brand designer.

Build a complete, production-quality showcase website for a new SaaS product called:

KEIKORA

Do not just create a generic template. Treat this as a real early-stage Nordic SaaS product that may later become a commercial company.

==================================================
1. PRODUCT CONTEXT
==================================================

Keikora is an early-stage SaaS platform being developed for small local service businesses.

Target businesses can eventually include:

- cleaning companies
- property/service maintenance businesses
- installers
- repair businesses
- home-service businesses
- small field-service teams
- other appointment/job-based local businesses

The core problem:

Small local service businesses often operate using a fragmented combination of:

- phone calls
- WhatsApp/messages
- email
- spreadsheets
- paper notes
- separate calendars
- manual booking confirmation
- manual worker scheduling
- manual customer records
- manual follow-up
- disconnected accounting/invoicing tools

Keikora aims to make day-to-day service operations simpler by bringing the important operational workflow together.

Potential product areas:

1. Online booking
2. Service configuration
3. Customer management
4. Job/work-order management
5. Employee availability
6. Employee assignment
7. Calendar/scheduling
8. Automated customer communication
9. Booking administration
10. Operational overview/dashboard
11. Basic business reporting
12. Integrations/automation

IMPORTANT:
Keikora is currently being developed.

Do NOT claim:
- thousands of customers
- paying customers
- revenue figures
- market leadership
- AI capabilities that do not exist
- integrations that have not been built
- fake testimonials
- fake reviews
- fake statistics
- fake company logos
- fake awards

The website must feel ambitious and mature without making false claims.

==================================================
2. REAL-WORLD ORIGIN
==================================================

Keikora is being developed from lessons learned while operating PuhdasFix, a real local cleaning-service business in Oulu, Finland.

PuhdasFix has been used as a real-world environment for developing and testing digital service-business workflows.

This includes problems around:

- customer booking
- service selection
- availability
- scheduling
- customer communication
- booking administration
- employee availability
- work assignment
- operational tracking

This is an important part of Keikora's story.

However:

Keikora is NOT a cleaning product.

Do not make the site visually look like cleaning software.

PuhdasFix should appear only in the "Why Keikora / Our Story" area as the origin and real-world testing environment.

Position this carefully:

"Built from real service operations."

Do not say PuhdasFix is a Keikora customer if that relationship has not formally existed.

==================================================
3. BRAND POSITIONING
==================================================

Brand:
Keikora

Working positioning:

"Operations software for local service businesses."

Main conceptual message:

Run your service business, not your spreadsheets.

Supporting message:

Bookings, customers, scheduling and everyday operations in one clearer workflow.

Do not overuse the word "AI".

Keikora should feel like an operations platform first.

Future automation/AI can be mentioned carefully as a direction, not as an existing magical capability.

Brand personality:

- Nordic
- modern
- calm
- capable
- trustworthy
- practical
- technical
- clean
- slightly premium
- human
- not corporate-heavy
- not playful/cartoonish
- not futuristic sci-fi

The design should feel appropriate for a Finnish SaaS startup in 2026.

==================================================
4. TECHNOLOGY
==================================================

Use:

- Next.js latest stable version
- App Router
- TypeScript
- Tailwind CSS
- Framer Motion / Motion where appropriate
- Lucide icons
- modern responsive CSS
- next/font
- next/image where appropriate

Package manager:
npm

The application must work with:

npm install
npm run dev
npm run build

The final project must successfully pass:

npm run build

Do not leave TypeScript errors.

Do not suppress errors unnecessarily.

Avoid unnecessary dependencies.

==================================================
5. HOSTING TARGET
==================================================

The site will initially be deployed free using Cloudflare.

Architecture must therefore remain compatible with Cloudflare deployment.

This is primarily a static marketing website.

Prefer static rendering where possible.

Do not introduce:
- unnecessary databases
- authentication
- server infrastructure
- paid APIs
- backend services

The first deployment may use:

keikora.pages.dev

Later:

keikora.fi

Structure URLs and metadata so changing to the final domain is simple.

Create an obvious configuration/constants location for the production site URL.

==================================================
6. DESIGN DIRECTION
==================================================

Create an original high-end SaaS visual identity.

Do NOT make it look like a generic Tailwind landing-page template.

Use generous whitespace.

Suggested visual direction:

Background:
#FAFCFF / off-white

Primary:
deep navy / dark blue

Accent:
modern electric blue

Secondary accent:
subtle fresh green

Text:
near-black navy

Muted text:
blue-gray

Use gradients very sparingly.

Avoid excessive:
- glassmorphism
- neon gradients
- glowing blobs
- giant rounded cards everywhere
- meaningless floating 3D objects
- stock photography
- robot/AI imagery

Use subtle borders, shadows and layering.

Border radius should be modern but not excessively rounded.

Typography should be excellent.

Consider Inter, Geist, Manrope or another strong modern variable font.

==================================================
7. LOGO
==================================================

Initially create a text-based Keikora wordmark.

Example:

KEIKORA

or

Keikora

Do not invent an overly complicated logo.

Create a simple temporary abstract mark that could suggest:

- connection
- workflow
- jobs
- movement
- coordination

Keep the logo implementation separate so it can easily be replaced later.

==================================================
8. NAVIGATION
==================================================

Desktop navigation:

Keikora logo

Product
How it works
For businesses
Our story
Roadmap

Right side:

"Contact Keikora"

Optional secondary:
"View demo"

Use sticky navigation.

When scrolling, navigation can gain a subtle border/background.

Mobile navigation must be excellent.

==================================================
9. HERO SECTION
==================================================

The hero is extremely important.

Headline:

"Run your service business.
Not your spreadsheets."

Visually emphasize "service business".

Supporting text:

"Keikora brings bookings, customers, scheduling and everyday operations into one clearer workflow for local service businesses."

Primary CTA:

"Explore the product"

Secondary CTA:

"Contact Keikora"

Below/alongside the hero, create a sophisticated PRODUCT UI MOCKUP.

Do not use a generic stock image.

The UI mockup should look like the future Keikora dashboard.

Show realistic sample UI:

Keikora

Overview

Today

New bookings
5

Jobs today
8

Team available
3

Customers
128

Today's schedule:

09:00 Home service
10:30 Installation
12:00 Maintenance
14:00 Site visit

Use fictional generic businesses/customers only.

The mockup should contain:

sidebar:
Overview
Bookings
Calendar
Jobs
Customers
Team
Messages
Reports
Settings

Make this mock dashboard one of the main visual elements of the site.

Animate it subtly on entrance.

==================================================
10. TRUST MESSAGE
==================================================

Immediately after the hero, DO NOT create fake customer logos.

Instead write something such as:

"Designed around the realities of running a local service business."

Then show four principles:

Built from real operations
Simple enough for small teams
Designed for everyday work
Automation where it actually helps

==================================================
11. PROBLEM SECTION
==================================================

Headline:

"Your business shouldn't live in six different tools."

Create a visual representation of fragmented operations:

Phone
Messages
Calendar
Spreadsheet
Customer notes
Bookings

Show them visually converging into:

KEIKORA

Then explain:

"A booking is more than a calendar entry. It affects availability, customer communication, work assignments and the rest of your day."

This section should visually explain the problem rather than relying on paragraphs.

==================================================
12. PRODUCT WORKFLOW
==================================================

Create an interactive/animated section:

"From booking to completed job."

Workflow:

1.
Customer books

↓

2.
Availability is checked

↓

3.
Job enters schedule

↓

4.
Work is assigned

↓

5.
Customer stays informed

↓

6.
Job is completed

↓

7.
Operations stay updated

On desktop make this visually sophisticated.

On mobile make it vertically scrollable and easy to understand.

Use subtle scroll-triggered animation.

==================================================
13. CORE PRODUCT MODULES
==================================================

Headline:

"One workflow. The tools you actually need."

Create four primary areas.

BOOKINGS

Description:
Let customers request or book services without relying entirely on phone calls.

Show a booking UI mockup.

--------------------------------

WORK

Description:
See upcoming jobs, availability and assignments in one operational view.

Show schedule/calendar UI.

--------------------------------

CUSTOMERS

Description:
Keep customer and service information connected to the work being done.

Show customer profile UI.

--------------------------------

OPERATIONS

Description:
Understand what is happening across the business without maintaining another spreadsheet.

Show dashboard/report UI.

Do not imply every feature is already production-ready.

Use labels such as:

"In development"

where appropriate.

==================================================
14. INTERACTIVE PRODUCT SHOWCASE
==================================================

Create a large section resembling a real application.

Tabs:

Dashboard
Bookings
Calendar
Customers

Clicking a tab should change the displayed mock interface.

This must actually work in the frontend.

Use animations between views.

It should feel like a miniature product demonstration.

No backend is necessary.

Use realistic local data.

Example city:
Oulu

Example service categories:
Home service
Maintenance
Installation
Site visit

Avoid making the entire demo cleaning-specific.

==================================================
15. REAL-WORLD STORY
==================================================

Create a section:

"Built from a real service business."

Copy concept:

"Keikora didn't begin as a theoretical SaaS idea.

It grew from building digital workflows for PuhdasFix, a local service business in Oulu, Finland.

Managing real bookings, availability, customer communication and everyday operations exposed a simple problem: small service businesses often need better connected tools, without enterprise complexity.

Keikora is our attempt to build that system."

Improve this writing where appropriate, but preserve the honesty.

Visual:

Show:

REAL SERVICE BUSINESS
PuhdasFix

↓

REAL OPERATIONAL PROBLEMS

↓

DIGITAL WORKFLOWS

↓

KEIKORA

↓

PLATFORM FOR LOCAL SERVICE BUSINESSES

Do not over-promote PuhdasFix.

==================================================
16. WHO IT IS FOR
==================================================

Section:

"Made for businesses that do real work in the real world."

Cards/categories:

Cleaning services
Property maintenance
Installation teams
Repair services
Home services
Small field-service teams

Use simple line icons.

Don't claim specialization where it doesn't exist.

Say:

"Keikora is being designed around businesses that schedule people, jobs and customer work."

==================================================
17. BEFORE / AFTER
==================================================

Create a visual comparison.

BEFORE

Phone calls
WhatsApp
Spreadsheet
Calendar
Paper notes
Separate customer records

AFTER

Keikora

Bookings
Customers
Jobs
Team
Schedule
Operations

Do not claim that Keikora replaces accounting software unless that functionality actually exists.

==================================================
18. PRODUCT PHILOSOPHY
==================================================

Section:

"Software should remove admin, not create more of it."

Three principles:

Simple by default

Small service businesses shouldn't need enterprise software training.

Connected workflows

Bookings, jobs and customers should not become separate islands of information.

Automation with purpose

Automate repetitive operational work while keeping people in control.

==================================================
19. ROADMAP
==================================================

Because the product is early-stage, be transparent.

Create:

"Building Keikora"

Stages:

01
Foundation
Booking and service workflows

02
Operations
Scheduling, jobs and customers

03
Teams
Availability and work assignment

04
Automation
Reduce repetitive administrative work

05
Integrations
Connect with the tools service businesses already use

Do NOT put fake completion dates.

Create visual status indicators such as:

Building
Exploring
Planned

Make status data easy to edit from a single file.

==================================================
20. EARLY ACCESS
==================================================

Section:

"Help shape Keikora."

Copy:

"We're developing Keikora with real service-business workflows in mind. If you run a local service business and this problem sounds familiar, we'd like to hear from you."

Fields:

Name
Business name
Email
Type of service business

Button:

"Contact Keikora"

Initially no backend is required.

Implement frontend validation.

For now submission can either:
- use a configurable mailto fallback
OR
- clearly contain a documented placeholder for a future form endpoint.

Do not pretend submission succeeded if data is not actually sent.

==================================================
21. FINAL CTA
==================================================

Large clean final statement:

"Spend less time managing the work.
Spend more time doing it."

CTA:

Contact Keikora

Secondary:

Explore Keikora

==================================================
22. FOOTER
==================================================

Keikora

"Operations software for local service businesses."

Links:

Product
How it works
Our story
Roadmap
Contact
Privacy

Location:

Oulu, Finland

Include:

© current year Keikora

Do not invent a legal company name.

==================================================
23. SEO
==================================================

Implement excellent technical SEO.

Create:

metadata
title templates
description
OpenGraph metadata
Twitter/X metadata
canonical handling
robots.ts
sitemap.ts
manifest where appropriate

Homepage title:

Keikora | Operations Software for Local Service Businesses

Meta description:

Keikora is an operations platform in development for local service businesses, bringing bookings, customers, scheduling and everyday work into one clearer workflow.

Use semantic HTML.

One clear H1.

Logical heading hierarchy.

==================================================
24. STRUCTURED DATA
==================================================

Add appropriate JSON-LD.

Be conservative.

Do not claim:
- ratings
- reviews
- offers
- pricing
- customers
- awards

Use appropriate Organization/WebSite/SoftwareApplication schema only where factually supportable.

If SoftwareApplication schema would require unsupported information, omit unsupported properties.

==================================================
25. PERFORMANCE
==================================================

Target Lighthouse:

Performance 95+
Accessibility 95+
Best Practices 95+
SEO 100

Prefer:
- CSS effects over heavy graphics
- SVG/icons
- optimized images
- lazy loading
- minimal client-side JS

Do not sacrifice usability for animation.

Respect:

prefers-reduced-motion

==================================================
26. ACCESSIBILITY
==================================================

WCAG-conscious implementation.

Ensure:

keyboard navigation
visible focus states
semantic buttons
ARIA where actually necessary
proper labels
sufficient color contrast
accessible mobile navigation
accessible forms
reduced motion support

==================================================
27. RESPONSIVENESS
==================================================

Design deliberately for:

375px mobile
768px tablet
1024px laptop
1440px desktop
large desktop

Do not simply shrink the desktop site.

On mobile:

- simplify visual effects
- stack product UI intelligently
- keep CTA visible
- maintain readable typography
- avoid horizontal overflow

==================================================
28. COMPONENT ARCHITECTURE
==================================================

Create reusable components.

Suggested structure:

app/
  layout.tsx
  page.tsx
  globals.css
  sitemap.ts
  robots.ts

components/
  navigation/
  hero/
  product-demo/
  workflow/
  features/
  story/
  industries/
  roadmap/
  early-access/
  footer/
  ui/

lib/
  site-config.ts
  product-data.ts

public/
  brand/
  images/

Do not put the entire website into page.tsx.

==================================================
29. CONTENT ARCHITECTURE
==================================================

Put easily editable content/data into centralized files where reasonable.

For example:

site-config.ts

Include:

name
description
siteUrl
location
contactEmail
social links

roadmap data should also be easy to edit.

This site will evolve frequently while the product develops.

==================================================
30. CODE QUALITY
==================================================

Requirements:

TypeScript strictness
clean components
meaningful names
no dead code
no unnecessary comments
no giant components
no duplicated UI
no console errors
no hydration warnings
no broken links
no placeholder lorem ipsum

Do not create fake functionality.

==================================================
31. README
==================================================

Create an excellent README.md.

Explain:

What Keikora is

Technology stack

Local development:

npm install
npm run dev

Production build:

npm run build

Cloudflare deployment instructions

How to change:

domain
brand colors
logo
contact email
roadmap
SEO metadata

Also explain the main project structure.

==================================================
32. GIT
==================================================

Create a suitable .gitignore.

Do not include:

node_modules
.next
environment secrets
deployment artifacts

Never hard-code secrets.

Provide .env.example only if environment variables actually become necessary.

==================================================
33. VISUAL QUALITY REQUIREMENT
==================================================

This is extremely important.

The finished website should look like a professionally funded SaaS startup landing page, not a coding tutorial.

Pay special attention to:

typographic hierarchy
spacing
section transitions
product mockups
visual storytelling
responsive composition
micro-interactions
hover states
navigation
CTA hierarchy

Use motion sparingly and intentionally.

The product UI mockups should be visually convincing enough that screenshots could be used in:

LinkedIn posts
pitch decks
portfolio
product presentations

==================================================
34. IMPORTANT HONESTY RULE
==================================================

Never make Keikora look more commercially established than it really is.

The site should communicate:

"We are building something serious."

NOT:

"We already dominate this market."

Use language such as:

Building
In development
Early access
Exploring
Designed for
Being developed

instead of unsupported claims.

==================================================
35. IMPLEMENTATION PROCESS
==================================================

Do not ask me to manually create every file.

Work autonomously through the repository.

First:

1. Inspect the existing repository.
2. Determine whether it is empty or contains an existing project.
3. Preserve useful existing configuration if present.
4. Create an implementation plan.
5. Implement the complete website.
6. Run lint/type checks where configured.
7. Run npm run build.
8. Fix all errors.
9. Review the site for responsive/accessibility problems.
10. Review all text for unsupported claims.
11. Give me a concise completion report.

Do not stop after scaffolding.

Do not give me snippets and ask me to finish the implementation.

Actually create the complete working website.

==================================================
36. FINAL REVIEW
==================================================

Before finishing, review the site as four different people:

A local service-business owner:
Can I understand Keikora within 10 seconds?

A SaaS product designer:
Does this feel modern and credible?

A frontend engineer:
Is the implementation maintainable and performant?

A potential employer/investor:
Does this demonstrate thoughtful product development rather than simply generating a website?

Fix weaknesses you identify.

Then run the final production build again.

==================================================
37. OUTPUT
==================================================

At completion tell me:

- what you built
- important files created
- design decisions
- responsive behavior
- animations/interactions
- SEO implementation
- accessibility implementation
- build result
- how to run locally
- how to deploy to Cloudflare
- anything I need to replace later

Do not claim something was tested unless you actually tested it.

Begin by inspecting the repository and then implement the site.
~~~~~~


### B. Source-product audit and truthful showcase brief

~~~~~~text
You are working on the Keikora showcase website.

IMPORTANT: Before editing anything, read this entire instruction carefully.

There are TWO separate projects involved:

SOURCE PRODUCT — READ ONLY:
E:\Lab_arena\puhdasfix-scheduler

SHOWCASE WEBSITE — EDIT THIS PROJECT ONLY:
the current Keikora repository/workspace

========================================================
PRIMARY OBJECTIVE
========================================================

Keikora is the showcase/product brand for the actual software currently implemented in:

E:\Lab_arena\puhdasfix-scheduler

The current Keikora landing page may contain concepts, mock features, invented dashboard data, speculative capabilities, or generic SaaS language created before the actual product was inspected.

I now want Keikora to accurately showcase what has ACTUALLY been built.

Your job is therefore to:

1. Thoroughly inspect the real product in:
   E:\Lab_arena\puhdasfix-scheduler

2. Determine what the product genuinely does today.

3. Compare those findings with the existing Keikora website.

4. Update the Keikora website so its product messaging, screenshots, feature descriptions, UI showcase, workflow diagrams, architecture descriptions, and claims are grounded in the real product.

5. Preserve the polished, state-of-the-art SaaS presentation of Keikora.

The result should communicate:

"This is a real product being developed from real service-business operations."

It must NOT communicate:

"This is a fictional SaaS concept with beautiful mockups."

========================================================
ABSOLUTE SAFETY BOUNDARY
========================================================

E:\Lab_arena\puhdasfix-scheduler

IS STRICTLY READ-ONLY.

DO NOT:

- edit files there
- format files there
- rename anything there
- delete anything there
- create files there
- install packages there
- run migrations there
- modify databases there
- modify environment files there
- modify lock files there
- run commands that change repository state
- run auto-fix commands there
- commit anything there
- start destructive scripts there
- modify test data there
- modify CMS data there
- modify production data
- change configuration
- run deployment commands
- write screenshots into that repository

You may inspect/read the repository to understand the product.

If a command could modify the source repository, DO NOT RUN IT.

All implementation changes belong ONLY in the Keikora project.

Before making any edits, explicitly verify which directory is the editable Keikora repository.

========================================================
PHASE 1 — AUDIT THE REAL PRODUCT FIRST
========================================================

Do not immediately edit the Keikora website.

First investigate:

E:\Lab_arena\puhdasfix-scheduler

Study enough of the repository to understand the real application.

Inspect, where relevant:

README files
documentation
package files
application routes
pages
components
API routes
database/schema definitions
types
service definitions
booking logic
admin interfaces
employee functionality
availability logic
assignment logic
customer functionality
communication functionality
CMS/content functionality
authentication
roles
permissions
automation
reporting
financial/operational features
configuration
tests
deployment configuration

Do not assume a feature exists because its name appears somewhere.

Distinguish between:

IMPLEMENTED
PARTIALLY IMPLEMENTED
INTERNAL/ADMIN ONLY
EXPERIMENTAL
PLANNED/TODO
DEAD/UNUSED CODE
MOCK DATA
DOCUMENTATION-ONLY

Only describe functionality as existing when repository evidence supports it.

========================================================
PHASE 2 — CREATE AN INTERNAL PRODUCT INVENTORY
========================================================

Before modifying the landing page, construct an evidence-based inventory.

For each major capability identify:

CAPABILITY
STATUS
EVIDENCE
USER
PURPOSE
SHOWCASE VALUE

For example:

Capability:
Online booking

Status:
Implemented

Evidence:
Relevant routes/components/API/database structures

User:
Customer

Purpose:
Allows customers to choose/configure a service and submit/manage a booking.

Showcase value:
High

Do this for the full product.

Pay particular attention to actual workflows rather than isolated components.

I want you to discover the product rather than fit it into my assumptions.

========================================================
PHASE 3 — UNDERSTAND THE USERS
========================================================

Determine from the implementation which user groups actually exist.

Possible examples might include:

Customer
Business administrator
Employee/worker
Operations/admin user

Do NOT assume these roles exist exactly as written.

Derive them from the application.

Then map the real user journeys.

For example, if supported:

CUSTOMER
discover service
→ configure service
→ choose/request availability
→ create booking
→ receive information
→ manage booking

ADMIN
booking received
→ review booking
→ manage schedule
→ assign work
→ manage customer
→ monitor operation

EMPLOYEE
provide availability
→ receive assignment
→ view work information
→ update job

Again:

Do not invent these workflows.

Build them from actual implementation evidence.

========================================================
PHASE 4 — FIND THE PRODUCT'S REAL DIFFERENTIATORS
========================================================

Do not simply create a feature list.

Analyze what is interesting about this system compared with a basic booking form.

Look for actual evidence of things such as:

booking → availability → assignment

customer-facing workflow connected to administration

employee availability connected to operations

service configuration

pricing/service logic

booking management

work assignment

communication

CMS/content management

operational visibility

automation

role-based workflows

data relationships

integration between previously disconnected tasks

Only use those that actually exist.

The Keikora story should emerge from the implementation.

========================================================
PHASE 5 — COMPARE AGAINST CURRENT KEIKORA WEBSITE
========================================================

Now audit the existing Keikora landing page.

Identify every meaningful product claim.

Classify each as:

SUPPORTED
SUPPORTED BUT NEEDS REWORDING
PARTIALLY SUPPORTED
FUTURE/ROADMAP
UNSUPPORTED

Examples include:

feature descriptions
dashboard widgets
workflow diagrams
booking functionality
customer management
employee management
automation
reports
analytics
communications
integrations
AI
financial functionality
scheduling
service configuration

Do not silently leave unsupported claims on the website.

========================================================
PHASE 6 — REPOSITION KEIKORA
========================================================

Keikora should be positioned as the product/platform identity.

PuhdasFix remains the real service business where the system originated and has been developed around actual operational needs.

Keikora should NOT look like a cleaning-company website.

Target direction:

Keikora
Operations software for local service businesses.

Underlying brand idea:

Connect.
Coordinate.
Automate.
Simplify.

Conceptual meaning:

Keikora helps orchestrate service work.

The name can subtly connect to:

"keikka" → job / gig / work assignment

and

orchestration → coordinating the pieces of service operations.

Do NOT present this as a literal linguistic definition or fake etymology.

Use it as internal brand reasoning.

========================================================
PHASE 7 — CORE STORY
========================================================

The website should tell a truthful story:

A real local service business needed to manage digital bookings and day-to-day operations.

Instead of assembling disconnected tools indefinitely, software was developed around those workflows.

That system became increasingly reusable.

Keikora is the product direction emerging from that work.

Use PuhdasFix as evidence of the product's real-world origin.

Do NOT claim:

PuhdasFix is a paying Keikora customer.

Instead use language such as:

"Developed from real service operations."

"Keikora grew from software built around the day-to-day operations of PuhdasFix, a local service business in Oulu, Finland."

Keep this section factual and understated.

========================================================
PHASE 8 — HERO
========================================================

Review the existing hero based on what you discover.

Possible direction:

Keikora

Run your service business.
Not your spreadsheets.

Bookings, customers, people and everyday operations — connected in one workflow.

However:

Do not blindly retain this wording.

If the actual product supports a more accurate and compelling positioning, improve it.

The hero should communicate the product within approximately 5–10 seconds.

Avoid generic phrases such as:

"Revolutionize your business"
"AI-powered future"
"All-in-one solution"
"Transform your workflow"

unless genuinely justified.

========================================================
PHASE 9 — USE THE REAL PRODUCT UI
========================================================

This is extremely important.

The existing Keikora site may contain fictional UI mockups.

Replace appropriate fictional product representations with visuals based on the ACTUAL product.

Investigate whether the running application can be safely viewed without changing it.

If a safe local instance is already available, inspect it.

DO NOT start or modify the source application if doing so could alter data/state.

If screenshots can be obtained safely, use REAL PRODUCT SCREENSHOTS.

Good candidates could include actual:

customer booking interface
admin booking view
calendar/schedule
employee availability
assignment interface
customer management
service configuration
dashboard
CMS/editor
operational views

Choose only interfaces that genuinely help explain Keikora.

========================================================
SCREENSHOT PRIVACY RULES
========================================================

Never expose:

real customer names
phone numbers
email addresses
home addresses
booking addresses
employee private information
authentication tokens
API keys
internal secrets
financial identifiers
personal messages
production IDs where sensitive
private business information

Before using any screenshot, inspect it carefully.

If real personal/private information appears:

DO NOT publish it.

Prefer:

safe demo data
development data
cropping
redaction
or reconstructing the actual interface using sanitized data

If necessary, create a faithful showcase representation of the actual UI inside the KEIKORA project rather than exposing private information.

Never alter the source product just to create a screenshot.

========================================================
PHASE 10 — PRODUCT SHOWCASE
========================================================

Create a premium product showcase based on the real system.

Instead of generic feature cards, show connected workflows.

For example, ONLY IF supported by the implementation:

BOOKING

Customer selects service
↓
booking details captured
↓
booking enters operations

AVAILABILITY

worker availability
↓
operational scheduling

ASSIGNMENT

booking/job
+
available worker
↓
assignment

ADMINISTRATION

bookings
customers
workers
services
↓
one operational interface

The website should visually demonstrate relationships.

The key idea is:

CONNECTED OPERATIONS

not:

MANY FEATURES.

========================================================
PHASE 11 — PRODUCT UI TOUR
========================================================

Create or improve an interactive product-tour section.

Use actual supported product areas.

Possible tabs might become:

Booking
Operations
Availability
Assignments
Customers
Services

BUT derive the final tabs from the real application.

Each tab should contain:

real screenshot OR faithful sanitized representation

short explanation

who uses it

what problem it solves

how it connects to the next part of the workflow

This section should be strong enough that I can show it to:

potential customers
employers
partners
investors
other developers

and they can understand that an actual system exists behind Keikora.

========================================================
PHASE 12 — PRODUCT DEPTH
========================================================

Where appropriate, show that Keikora is more than a marketing landing page.

For example:

"One booking. One connected workflow."

Then visually trace an actual data/workflow path through the application.

Example ONLY:

Customer
↓
Booking
↓
Availability
↓
Assignment
↓
Service delivery
↓
Administration

Do not use this exact sequence unless verified.

Derive the actual sequence.

========================================================
PHASE 13 — ARCHITECTURE / ENGINEERING STORY
========================================================

If the source repository supports it, add a restrained section demonstrating engineering depth.

Possible heading:

"Built as an operational system, not just a booking form."

Explain at a high level how different parts connect.

Potential categories:

Customer experience
Business operations
Workforce
Content/services
Data/API

Do NOT expose:

internal endpoints
secrets
security architecture details that create risk
database credentials
private infrastructure information

This is a product showcase, not internal technical documentation.

========================================================
PHASE 14 — CURRENT VS FUTURE
========================================================

Clearly distinguish:

AVAILABLE / BUILT

from

IN DEVELOPMENT

from

EXPLORING

If something exists only partially, do not present it as complete.

A roadmap is welcome, but it must be grounded in repository evidence or clearly labeled product direction.

Do not invent dates.

Do not invent release versions.

========================================================
PHASE 15 — REMOVE FAKE SaaS SIGNALS
========================================================

Delete or rewrite anything that suggests unsupported commercial maturity.

No:

fake testimonials
fake logos
fake customer counts
fake revenue
fake booking volumes
fake growth percentages
fake uptime
fake reviews
fake awards
fake integrations
fake pricing
fake AI functionality
fake analytics
fake screenshots

If demo numbers are required inside a sanitized UI representation, make them clearly illustrative and realistic rather than implying real company metrics.

========================================================
PHASE 16 — DESIGN QUALITY
========================================================

Preserve or improve the high-end SaaS visual quality.

Keikora should feel:

Nordic
clean
technical
calm
connected
modern
credible
slightly premium

The design concept should visually reinforce:

CONNECTION
COMFORT / SIMPLICITY
AUTOMATION
FLOW

Use connected paths, nodes, workflow transitions and movement subtly.

Avoid turning the site into a network-diagram cliché.

Do not overuse:

gradients
glassmorphism
glows
3D blobs
floating cards
huge rounded rectangles
generic AI graphics

Product UI should be the visual hero.

========================================================
PHASE 17 — MOTION
========================================================

Use motion to explain product behavior.

Good animation:

booking appears
→ workflow progresses
→ schedule updates
→ assignment connects

Bad animation:

random floating shapes
constant movement
decorative parallax everywhere

Animation must help explain the system.

Respect prefers-reduced-motion.

========================================================
PHASE 18 — RESPONSIVE PRODUCT SHOWCASE
========================================================

The real product visuals must work well on:

375px
768px
1024px
1440px+

Do not simply shrink desktop screenshots until they become unreadable.

On mobile:

crop/focus intelligently
use device frames sparingly
allow product panels to stack
highlight important UI regions
keep explanatory text readable

========================================================
PHASE 19 — SEO
========================================================

Update SEO to match the actual product.

Possible homepage title:

Keikora | Operations Software for Local Service Businesses

Possible description:

Keikora connects booking and everyday operations for local service businesses, developed from real service-business workflows in Oulu, Finland.

Improve based on actual discovered capabilities.

Do not keyword-stuff.

Keep:

metadata
canonical
OpenGraph
robots
sitemap
structured data

factually accurate.

========================================================
PHASE 20 — EARLY ACCESS / CTA
========================================================

Keikora is not being presented as a mature commercial SaaS unless repository/business evidence proves otherwise.

Prefer CTA language such as:

Explore the product
See how it works
Follow development
Contact Keikora
Talk to us

Avoid:

Buy now
Start paid plan
Join 10,000 businesses

unless actually supported.

========================================================
PHASE 21 — TECHNICAL CONSTRAINTS
========================================================

Only modify the Keikora project.

Maintain:

Next.js
TypeScript
Tailwind
existing architecture where reasonable

Do not rewrite the project unnecessarily.

Reuse good existing components.

Remove dead showcase components if replaced.

Avoid adding dependencies unless genuinely useful.

Maintain excellent:

performance
accessibility
responsive behavior
SEO
code quality

Target Lighthouse:

Performance 95+
Accessibility 95+
Best Practices 95+
SEO 100

========================================================
PHASE 22 — VALIDATION
========================================================

After implementation:

run the available lint command

run TypeScript validation if configured

run:

npm run build

Fix all errors.

Then manually review the implementation for:

unsupported claims
fake features
fake metrics
broken navigation
mobile overflow
poor screenshot readability
accessibility issues
console errors
hydration warnings
missing image dimensions
SEO problems

========================================================
PHASE 23 — FINAL PRODUCT TRUTH AUDIT
========================================================

Before finishing, perform one final comparison:

SOURCE:
E:\Lab_arena\puhdasfix-scheduler

VERSUS:

Keikora website

Ask:

"Could every important product claim on Keikora be defended by something that actually exists in the source product, or is explicitly labeled as future/in development?"

If NO:

fix it.

========================================================
PHASE 24 — FINAL REPORT
========================================================

When finished, give me a concise but useful report containing:

1. What you discovered in puhdasfix-scheduler
2. Major actual product capabilities
3. What you changed on Keikora
4. Which previous Keikora claims/mockups were removed or corrected
5. Which real product screenshots/representations were used
6. Any screenshots you deliberately did NOT use because of privacy
7. Features labeled in development/planned
8. Important design changes
9. Build/lint results
10. Files modified in Keikora
11. Confirmation that NOTHING in
    E:\Lab_arena\puhdasfix-scheduler
    was modified

Most importantly:

DO NOT start by redesigning the landing page.

START BY READING AND UNDERSTANDING THE ACTUAL PRODUCT.

The source product is evidence.
Keikora is the showcase.

Proceed.
~~~~~~


### C. Original brand concept brief (PNG correction takes precedence)

~~~~~~text
========================================================
BRAND CONCEPT + LOGO SYSTEM
========================================================

The Keikora visual identity must be derived from what the product actually does.

Do NOT design the brand around the letter "K" alone.

The central brand concepts are:

CONNECT
COORDINATE
COMFORT / SIMPLICITY
AUTOMATE
FLOW

Keikora should visually represent multiple parts of a service business
working together as one continuous operational flow.

Conceptually:

Customer
   ↓
Booking
   ↓
Service / Job
   ↓
Availability
   ↓
Worker / Assignment
   ↓
Completion
   ↓
Business operations

IMPORTANT:

Do not assume this exact workflow is implemented.

After auditing:
E:\Lab_arena\puhdasfix-scheduler

replace this conceptual sequence with the ACTUAL verified product workflow.

The logo and website visual language should then abstract that workflow.

--------------------------------------------------------
LOGO SYMBOL CONCEPT
--------------------------------------------------------

The Keikora symbol should NOT simply be:

- a stylized K
- generic lightning bolt
- AI sparkle
- robot
- gear
- calendar
- cleaning symbol

Instead create an abstract "connected workflow" symbol.

Think of:

multiple nodes
connected by one continuous flowing path

representing:

customer
work
people
operations

The path represents:

connection + coordination + automation.

The geometry should feel:

continuous
comfortable
smooth
organized
human
reliable

Avoid sharp/aggressive technology aesthetics.

The symbol should communicate:

"many moving parts becoming one smooth workflow."

It may subtly suggest:

∞ continuous flow
connected nodes
orchestration
a route/path
a completed loop

without becoming a literal infinity icon or network diagram.

--------------------------------------------------------
THREE-NODE IDEA
--------------------------------------------------------

Explore a minimal symbol based on three connected points.

Conceptually:

CUSTOMER ●
          \
           FLOW
          /
WORK ● ————— ● BUSINESS

or:

● → ● → ●
    ↘ ↗

The final mark must remain abstract.

Someone does NOT need to know what each node represents.

It should simply feel:

connected
organized
easy
moving

--------------------------------------------------------
KEIKORA NAME CONCEPT
--------------------------------------------------------

Internally, use this idea to guide the brand:

Keikora = service work being orchestrated.

The name can subtly evoke the Finnish concept of:

"keikka"

meaning a job / gig / work assignment,

combined conceptually with:

coordination
orchestration
automation.

DO NOT present "Keikora" publicly as a dictionary word.

DO NOT invent a false etymology.

This is brand reasoning, not a linguistic claim.

--------------------------------------------------------
BRAND PHRASE
--------------------------------------------------------

Use this as an internal design principle:

"Orchestrating service work."

It may appear subtly on the website if it works naturally.

Do NOT force it into every section.

Possible supporting brand language:

Connect the work.
Coordinate the day.
Automate the routine.

Or:

Connect.
Coordinate.
Automate.

Do NOT use:

Connect • Automate • Grow

as the primary brand concept.

"Grow" is a business outcome we cannot guarantee.

--------------------------------------------------------
LOGO + PRODUCT CONNECTION
--------------------------------------------------------

This is important.

The logo symbol should reappear throughout the website as a visual system.

For example:

Navbar:
small static Keikora workflow symbol

Hero:
the symbol can begin as separate nodes and smoothly connect

Workflow section:
the same path geometry becomes the real product workflow

Feature transitions:
the connecting line travels between product modules

Loading/microinteraction:
nodes connect briefly

Section dividers:
subtle continuation of the workflow path

Footer:
simplified static symbol

The result should make the website feel like one coherent brand system.

Do NOT randomly repeat the full logo everywhere.

--------------------------------------------------------
HERO ANIMATION
--------------------------------------------------------

Consider an understated animation:

STEP 1

Three/four separate nodes appear.

●     ●     ●

STEP 2

A path connects them.

● ─── ● ─── ●

STEP 3

The path smoothly transforms into the Keikora symbol.

STEP 4

The real product interface appears alongside/from the flow.

This should visually communicate:

disconnected operations
→ connected workflow
→ Keikora

Keep the entire animation subtle and approximately 1–2 seconds.

Do not create a flashy logo intro.

Respect prefers-reduced-motion.

--------------------------------------------------------
CONNECT BRAND TO REAL PRODUCT
--------------------------------------------------------

After auditing puhdasfix-scheduler, identify the strongest real connected
workflow in the product.

For example ONLY, if supported:

Booking
    ↓
Availability
    ↓
Assignment
    ↓
Administration

Use THAT verified workflow as the conceptual foundation of the Keikora
symbol and website motion.

This is important:

The visual brand should emerge from product architecture.

The product should not be forced to fit a pre-created logo.

--------------------------------------------------------
COLOR MEANING
--------------------------------------------------------

Use color intentionally.

Deep navy:
business / reliability / operations

Blue:
connection / digital workflow

Teal:
transition / coordination

Green:
successful state / completion / smooth operation

Do not create a rainbow gradient wordmark.

Prefer:

Keikora wordmark = primarily deep navy

Logo symbol = blue → teal with restrained green accent

Green should communicate completion/success rather than dominate the brand.

--------------------------------------------------------
WORDMARK
--------------------------------------------------------

Use:

Keikora

rather than:

KEIKORA

as the default wordmark unless uppercase demonstrably works better.

The wordmark should feel:

modern
approachable
technical
stable

Avoid overly futuristic typography.

The symbol must also work independently as:

favicon
app icon
social avatar
mobile navigation mark
future product icon

Test legibility at:

16px
24px
32px
64px
128px

--------------------------------------------------------
IMPORTANT IMPLEMENTATION RULE
--------------------------------------------------------

Do not use an AI-generated raster logo as the final production logo.

Create the production symbol as:

SVG / vector geometry

inside the Keikora project.

It must have:

clean paths
transparent background
scalable geometry
light-background version
dark-background version
symbol-only version
wordmark version

Create reusable logo components/assets.

For example:

components/brand/keikora-logo.tsx

and/or:

public/brand/keikora-symbol.svg
public/brand/keikora-logo.svg

The logo should be maintainable and editable.

--------------------------------------------------------
BRAND CONSISTENCY CHECK
--------------------------------------------------------

Before completing the site, ask:

Does the logo communicate connection and flow?

Does the website use the same visual language?

Does the real product workflow explain why this symbol exists?

Does the symbol still work without the word "Keikora"?

Does it avoid looking like:
a crypto company,
generic AI startup,
logistics company,
or cleaning company?

If not, refine it.
~~~~~~


### D. Final illustration prompt and implementation notes

~~~~~~text
# Connected work illustration

The booking explanation now includes a new editorial illustration: a calendar,
work checklist and employee view joined by a blue–teal ribbon. This is conceptual
art, not a product screenshot or customer photograph.

## Assets and generation

- Original transparent PNG: `public/illustrations/connected-work.png`
- Web asset: `public/illustrations/connected-work.webp` (1000 × 667, 67,988 bytes)
- Created with the built-in image generation tool using the imagegen skill.
- The original user-supplied logo PNGs are unchanged and were not generation inputs.
- `scripts/create-work-illustration.mjs` retains the generated original and creates
  a smaller WebP for the website. Pass the generated PNG path as its argument.

Final generation prompt:

> Use case: stylized-concept. Create a premium editorial 3D illustration for the
> Keikora service operations website, to accompany text about connecting bookings,
> employee availability and work details. A small sculptural composition: a white
> standing calendar with a few blue and teal schedule blocks, a white rounded
> clipboard with simple navy lines and one green check, and a smaller rounded
> mobile device with an abstract employee profile circle and blue work-detail
> blocks. Connect the three objects with a slender flowing cobalt-blue to teal
> ribbon resting on a small soft white oval platform. Objects are clustered as one
> balanced isometric scene, viewed slightly from above, full objects visible,
> generous clear margin on all sides. Matte ceramic surfaces, subtle translucent
> blue details, soft studio lighting and very light contact shadows, refined and
> quiet rather than toy-like. Palette: deep navy, vivid cobalt blue, teal, fresh
> green accent, white. Transparent background, real alpha outside objects and soft
> shadows. Landscape composition about 3:2. No letters, no words, no numbers, no
> logos, no watermark, no people, no scenery, no gradients filling the background.
> This is an illustration of a workflow, not a screenshot or a branded product interface.

## Motion

The picture and three HTML detail cards move at different speeds with a native
CSS view timeline. Scroll down to move them forward; scroll up to reverse them.
No clicking, timers, animation library, or JavaScript scroll listener is needed.
Browsers without view-timeline support retain the existing entry reveal and a
readable static composition. Reduced-motion users receive a static illustration.
The image is lazy-loaded, with dimensions reserved before it arrives.

The Playwright illustration check verifies the asset loads, scrolling changes its
transform, reduced motion removes movement, and the desktop/mobile layouts do
not overflow. Existing accessibility, workflow, and original-PNG checks remain.

~~~~~~


### E. Second product-truth and meaningful-motion request

~~~~~~text
You are working on the existing Keikora showcase website.

This is NOT a redesign-from-scratch task.

I believe some current Keikora website text, product descriptions, diagrams,
labels and visual storytelling still do not accurately align with what the
actual PuhdasFix scheduler/operations product really does.

I also want the website to feel more alive visually. It currently still feels
too static in some places. Add meaningful scroll-driven motion and product
visual movement, but do not add random decorative animation.

========================================================
PROJECT BOUNDARY
========================================================

EDITABLE PROJECT:
E:\Lab_arena\Keikora

SOURCE PRODUCT — STRICTLY READ ONLY:
E:\Lab_arena\puhdasfix-scheduler

NEVER modify anything in puhdasfix-scheduler.

Do not:
- edit files
- create files
- format files
- install packages
- run migrations
- modify databases
- change environment files
- run autofixes
- start the application
- invoke its APIs
- write screenshots into that repository

Use it only as evidence by reading source code/documentation.

Before doing anything, read:

E:\Lab_arena\Keikora\AGENTS.md
E:\Lab_arena\Keikora\CHATGPT_CONTEXT.md
E:\Lab_arena\Keikora\docs\product-audit.md

Also inspect the current Keikora implementation rather than relying only on
the context document.

========================================================
PRIMARY OBJECTIVE
========================================================

Perform a second, strict PRODUCT-TRUTH + CONTENT-ALIGNMENT review.

The question for every meaningful statement should be:

"Would someone reasonably believe this functionality exists in the actual
product today after reading this?"

If yes, there must be evidence in puhdasfix-scheduler.

If only partially implemented:
say so accurately.

If future product direction:
clearly label it as direction / in development / exploring.

If unsupported:
remove or rewrite it.

Do not make the product appear weaker than it is either. The goal is accurate,
clear and compelling communication of what has genuinely been built.

========================================================
START FROM THE REAL PRODUCT
========================================================

The strongest verified product story is approximately:

booking administration
        ↓
employee availability
        ↓
operations calendar
        ↓
assignment
        ↓
employee work visibility
        ↓
operational records / follow-up

But DO NOT blindly use this sequence.

Re-check the source implementation and docs/product-audit.md and determine the
most defensible actual workflow.

Known implemented areas that can be investigated include:

- administrator/manager booking creation
- booking queues and administration
- customer directory
- employee availability
- availability-change approval UI
- operations calendar
- manual assignment
- explicitly triggered rule-based auto-assignment
- employee assigned-work view
- recurring work
- inquiries/messages
- booking-linked invoice PDF preparation
- payment-state recording
- operational dashboard/work queues
- configured service/pricing/duration rules
- email notification implementation
- selected Telegram alert implementation
- Google Sheets mirroring implementation

Keep qualifications from the source audit.

For example:

Do NOT turn rule-based auto-assignment into:
"AI automatically finds the perfect worker."

Do NOT turn payment-state tracking into:
"Integrated payments."

Do NOT turn invoice preparation into:
"Complete accounting."

Do NOT turn inquiries/email replies into:
"Unified live customer chat."

Do NOT turn configured PuhdasFix service records into:
"Build any service catalog."

Do NOT turn integration code into:
"Connect with all your favorite tools."

Do NOT describe unfinished Google Calendar availability synchronization as
finished.

========================================================
IMPORTANT BOOKING DISTINCTION
========================================================

Be particularly careful with the word "booking."

The inspected source supports ADMINISTRATIVE booking creation and management.

Do not imply that the inspected product proves a completed public
customer-facing online booking portal unless current source evidence now
demonstrates it.

Therefore audit phrases such as:

"Customer books"
"Customers book online"
"Online booking"
"Let customers book"
"Booking automatically arrives from the website"

and replace them when necessary with wording grounded in the implementation,
for example:

"Capture the booking"
"Create and manage booking records"
"Booking details enter operations"

Use the best natural wording based on the actual implementation.

========================================================
REVIEW EVERY CURRENT SECTION
========================================================

Review the current homepage section by section:

1. Navigation
2. Hero
3. Trust principles
4. Booking/problem explanation
5. Scroll-driven workflow
6. Feature explanations
7. Product tour
8. Architecture
9. PuhdasFix origin story
10. Industry direction
11. Before/after comparison
12. Product philosophy
13. Roadmap
14. Early access
15. Final CTA
16. Footer
17. Metadata / SEO / structured data

For each meaningful claim internally classify it:

SUPPORTED
SUPPORTED BUT WORDING TOO BROAD
PARTIALLY SUPPORTED
FUTURE DIRECTION
UNSUPPORTED

Then correct the site.

Do not show this classification table to visitors.

========================================================
HERO
========================================================

The hero must explain the REAL strength of the product in approximately
5–10 seconds.

Current:

"Bookings meet availability. Work gets coordinated."

Do not automatically keep or replace it.

Evaluate whether this accurately expresses the strongest implemented
workflow.

Potential conceptual direction:

"Bookings, availability and work — connected."

or

"Connect bookings, available time and the work that follows."

or another stronger phrase discovered from the actual product.

The supporting text should explain the operational connection without
claiming a generic mature SaaS platform.

Avoid generic marketing language such as:

"all-in-one"
"revolutionize"
"seamless"
"AI-powered"
"transform your business"
"everything you need"

unless literally justified.

========================================================
PRODUCT TOUR
========================================================

Current product-tour tabs are:

Operations
Bookings
Calendar
Availability
Customers
Invoices

Verify that these remain the six most useful representations of the actual
product.

The representations are source-derived HTML/CSS reconstructions using
fictional DEMO data.

KEEP the disclosure that they are sanitized/source-derived representations.

Do not present them as literal production screenshots.

However, make them visually feel like a connected application rather than six
independent static screenshots.

For example:

Operations → highlight an actionable booking
Bookings → same booking appears in booking context
Calendar → same work appears in the schedule
Availability → worker availability relates to assignment
Customers → booking connects back to customer
Invoices → completed/recorded work connects to invoice preparation

Only establish relationships that the real data model/workflow supports.

Use ONE consistent fictional example across views where useful so visitors can
understand that the records are connected.

========================================================
AUTO-ASSIGNMENT
========================================================

This is an interesting real feature and should be described accurately.

The source has an explicitly triggered rule-based assignment action using
criteria including:

- active employees
- availability coverage
- existing-work conflicts
- approximately 15-minute buffer
- priority
- workload/name tie-breaking

Present this as:

"Rule-based assignment support"

or similarly accurate language.

It can be a strong demonstration of purposeful automation.

Never call it:
AI scheduling
AI assignment
smart AI matching
route optimization
skill matching
perfect matching

unless those capabilities are actually added later.

========================================================
PUHDASFIX STORY
========================================================

Keep PuhdasFix as the origin of Keikora.

The story should approximately communicate:

PuhdasFix had real operational needs around bookings, customer records,
employee availability, scheduling, assignment and administration.

Software was developed around those needs.

Keikora is the broader product direction emerging from that work.

Do NOT describe PuhdasFix as:
- a paying Keikora customer
- one of Keikora's customers
- customer proof
- SaaS traction

Do not overstate commercial validation.

========================================================
INDUSTRIES
========================================================

Cleaning is the actual originating environment.

Maintenance, installation, repair, home services and field-service businesses
are broader product direction.

Make the distinction visually obvious.

Prefer wording such as:

"Designed to grow beyond its original service-business environment."

"Product direction"

"Keikora is being developed for businesses that coordinate people,
availability and customer work."

Do not imply the current source product has already been deployed across all
those industries.

========================================================
MOTION — IMPORTANT NEW REQUIREMENT
========================================================

The site still feels too static.

Do NOT solve this by making cards randomly float.

Motion should demonstrate:

CONNECTION
COORDINATION
AUTOMATION
FLOW

Use natural scrolling as the primary controller.

Scrolling down progresses the story.
Scrolling upward reverses it.

No forced scrolling.
No wheel interception.
No autoplay carousel.
No constant distracting loops.

========================================================
MOTION IDEA 1 — HERO PRODUCT FLOW
========================================================

Make the hero product visual subtly demonstrate:

Booking
        →
Available time
        →
Assignment
        →
Work

Do not necessarily display these exact labels if better source-grounded labels
exist.

A restrained blue → teal → green line can travel between product UI elements
as the visitor enters/scrolls through the hero.

Individual UI panels can shift by approximately 6–20px at slightly different
rates to create depth.

The movement should feel calm and controlled.

Do not animate the supplied Keikora PNG itself by morphing, recoloring or
redrawing it.

========================================================
MOTION IDEA 2 — CONNECTED-WORK ILLUSTRATION
========================================================

There is already:

public/illustrations/connected-work.webp

and components/features/work-illustration.tsx

Preserve it.

Improve its storytelling if appropriate.

As the visitor scrolls:

calendar/booking
        ↓
available time
        ↓
assigned work

should feel progressively connected.

Use subtle translation, depth and connector progression.

Do not make the image bob endlessly.

========================================================
MOTION IDEA 3 — PRODUCT UI STORY
========================================================

This should become one of the strongest visual elements.

Rather than static screens suddenly replacing each other:

1. Show a booking record.
2. On scroll, visually carry its identifier/card into calendar context.
3. Availability appears beside it.
4. Assignment connects worker + booking.
5. Operational status updates.

This can be a stylized transition between sanitized UI representations.

It does NOT need to pretend the actual application literally animates this
way.

The animation is website storytelling explaining relationships.

Keep the source-derived UI itself truthful.

========================================================
MOTION IDEA 4 — RULE-BASED ASSIGNMENT
========================================================

Create a small explanatory animation using DEMO records.

Example:

BOOKING
Tuesday 10:00–12:00

        ↓

AVAILABLE EMPLOYEES

Employee A   available
Employee B   conflict
Employee C   available

        ↓

RULE-BASED ASSIGNMENT

Employee A

Animate the eligibility checks progressively.

Do NOT call this AI.

This would communicate actual automation far better than generic SaaS
graphics.

========================================================
MOTION IDEA 5 — OPERATIONAL RECORD CONTINUITY
========================================================

Use one fictional DEMO booking throughout multiple sections.

Example only:

Demo booking
        ↓
calendar
        ↓
employee assignment
        ↓
work view
        ↓
invoice/record

If supported, maintain the same fictional booking/customer identity across
the product tour.

This makes the site communicate:

"one connected operational record"

instead of:

"here are six unrelated software screenshots."

========================================================
BRAND VISUAL LANGUAGE
========================================================

Use the Keikora concept throughout the site:

connection
comfort
coordination
automation
flow

Deep navy = operational foundation
Blue = connection
Teal = coordination/transition
Green = completed/successful state

Use the user's EXACT supplied PNG logos.

Do NOT:
trace
redraw
recolor
crop
morph
regenerate
replace

the production logos.

Motion may fade/translate the intact PNG as one object.

Decorative paths inspired by the workflow concept are allowed, but they must
not replace or modify the logo.

========================================================
STATIC VS MOVING BALANCE
========================================================

Do not animate everything.

Use approximately:

STATIC:
headings
body text
navigation
important controls
forms

MOVING:
workflow connectors
selected product UI layers
progress states
illustration depth
assignment explanation
section transitions

The page should still look excellent in a screenshot.

Motion should make it better when experienced interactively.

========================================================
TECHNICAL MOTION REQUIREMENTS
========================================================

Prefer:

CSS transforms
CSS opacity
CSS view timelines where supported
IntersectionObserver where appropriate
requestAnimationFrame only where justified

Avoid adding a heavy animation dependency merely for basic effects.

Animate:
transform
opacity

Avoid repeatedly animating layout properties.

Maintain:

prefers-reduced-motion

For reduced motion:
all information must remain visible and understandable.

Motion cannot be required to understand or operate the site.

========================================================
PERFORMANCE
========================================================

Do not sacrifice performance for animation.

The new connected-work illustration was added after the last Lighthouse run,
so do not assume the old performance score still applies.

After changes:

npm run lint
npm run typecheck
npm run build

Run existing Playwright tests.

Add/update tests where motion/content behavior materially changes.

Then run a fresh Lighthouse test against the production export if the existing
project workflow supports it.

Do not claim 95+ unless measured.

========================================================
CONTACT
========================================================

The current contact section does not actually submit/store messages.

Keep this completely honest.

Do not display a success message suggesting data was submitted when it was not.

No real contact email/social accounts have yet been supplied.

Do not invent them.

========================================================
FINAL CONTENT AUDIT
========================================================

After implementation, read the rendered homepage from beginning to end.

For every product statement ask:

1. Is this implemented?
2. If partially implemented, is the limitation clear?
3. If future direction, is that obvious?
4. Could a potential customer misunderstand this as an existing capability?
5. Does this wording describe what the software actually does rather than
   generic SaaS language?

Fix every questionable statement.

========================================================
FINAL EXPERIENCE AUDIT
========================================================

Review the final page as:

LOCAL SERVICE BUSINESS OWNER:
Can I understand what Keikora actually does?

PRODUCT DESIGNER:
Does the page explain connected operations visually?

ENGINEER:
Do the product representations correspond to real implementation?

POTENTIAL EMPLOYER/PARTNER:
Can I see that a substantial real application exists behind this showcase?

NEW VISITOR:
Does scrolling feel alive and purposeful rather than like a static brochure?

========================================================
DO NOT
========================================================

Do not rebuild the site from scratch.

Do not replace the established design system.

Do not modify puhdasfix-scheduler.

Do not modify the supplied logo PNGs.

Do not create fake product screenshots.

Do not invent customer-facing booking functionality.

Do not invent AI.

Do not invent integrations.

Do not invent commercial traction.

Do not add movement merely for decoration.

Do not remove truthful product depth just to simplify the landing page.

========================================================
FINAL REPORT
========================================================

When finished report:

1. Product claims reviewed
2. Claims corrected
3. Claims removed
4. Future capabilities relabeled
5. Actual product capabilities emphasized
6. Product-tour changes
7. Motion added and what each motion communicates
8. Accessibility/reduced-motion behavior
9. Performance implications
10. Files changed
11. lint/typecheck/build/test results
12. fresh Lighthouse result if actually run
13. explicit confirmation that puhdasfix-scheduler remained unchanged

Most importantly:

The site should no longer feel like:

"a SaaS concept describing what Keikora might eventually do."

It should feel like:

"a polished product showcase explaining software that genuinely grew from
PuhdasFix operations, while clearly showing where Keikora is going next."
~~~~~~
