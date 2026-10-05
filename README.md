# Keikora

For a new ChatGPT/Codex session, start with [CHATGPT_CONTEXT.md](CHATGPT_CONTEXT.md). It contains the current project state, user requirements, source-product boundaries, validation results and the original briefs in one handoff file.

A static, responsive showcase for Keikora, the product direction emerging from implemented service-business operations software built around PuhdasFix in Oulu. The operational foundation includes booking administration, availability, assignment, customer records, inquiries and booking-linked invoices. Adapting business-specific workflows for a broader SaaS audience remains in development.

The product tour uses source-derived reconstructions of implemented screens with synthetic data and Keikora styling. It is not a set of invented future dashboard concepts, a screenshot of production records, or live access to the source application. See `docs/product-audit.md` for the evidence inventory, actual user journeys, previous claim corrections and limitations.

The first screen stays focused on the headline, actions and compact orchestration cue. The large dashboard-style product interface starts in the Product section instead of appearing in the hero.

The Calendar tab includes a seven-day timed grid, three demo employees and local manual/automatic assignment controls that reproduce availability and conflict checks. Changes carry into the Operations and Bookings tabs, and Reset demo restores the examples. See [calendar evidence and mock-data behavior](docs/calendar-demo.md).

Product, How it works, For businesses and Our story follow their menu order, use the same content alignment as the header, and describe the implemented workflows. Navigation indicates the current section, with a mobile menu that preserves page position. See [section alignment](docs/section-alignment.md).

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run typecheck
npm run build
```

`next build` creates the static deployment in `out/`. There is no runtime server, database, account system or paid API. `next start` is not used with this export.

## Cloudflare Pages

Push the repository to your Git provider and create a Cloudflare Pages project connected to it. Choose the **Next.js (Static HTML Export)** preset, or configure:

- Build command: `npm run build`
- Build output directory: `out`
- Root directory: the repository root
- Node.js: 22 or newer

Cloudflare serves the generated HTML and assets directly; no adapter or Worker is needed. You can also upload the contents of `out/` using Pages Direct Upload. Attach `keikora.fi` through Pages custom domains and rebuild after DNS is configured. The public `_headers` file supplies basic browser security headers.

Official guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

## Edit the site

| Change                                                      | Location                                                             |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Domain, description, location, contact email, social links  | `lib/site-config.ts`                                                 |
| Development statuses, navigation, sample bookings, workflow | `lib/product-data.ts`                                                |
| Brand colors and responsive styling                         | CSS custom properties in `app/globals.css`                           |
| Exact supplied symbol and wordmark                          | `public/brand/keikora_logo.png`, `keikora_text.png`                  |
| Reusable logo and motion                                    | `components/brand/`                                                  |
| Scroll-driven workflow and transitions                      | `components/workflow/workflow.tsx`, `workflow.css`                   |
| Scroll-linked illustration                                  | `components/features/work-illustration.tsx`, `work-illustration.css` |
| Illustration artwork and generation prompt                  | `public/illustrations/`, `docs/work-illustration.md`                 |
| Browser icon                                                | `app/icon.png` (byte-identical symbol copy)                          |
| Titles, social metadata and JSON-LD                         | `app/layout.tsx`                                                     |
| Social preview                                              | `public/brand/social-card.svg` and its PNG export                    |
| Privacy content                                             | `app/privacy/page.tsx`                                               |
| Source-derived product screens                              | `components/product-demo/views.tsx`                                  |
| Admin calendar and local assignment examples                | `components/product-demo/calendar-view.tsx`, `.css`, `lib/demo-scheduler.ts` |
| Product tour styling                                        | `components/product-demo/product-demo.css`                           |
| Capability evidence and claim audit                         | `docs/product-audit.md`                                              |

The social image PNG can be regenerated from the SVG with `node scripts/create-social-card.mjs` (uses Sharp bundled with Next.js).

Production branding uses the exact supplied `public/brand/keikora_logo.png` and `keikora_text.png`, including the original wordmark and tagline. The artwork is displayed at its original aspect ratio with no cropping, recoloring, tracing or image optimization. Run `node scripts/create-brand-assets.mjs` to copy the original symbol bytes to the favicon and embed the original PNGs in the social-card SVG, then run the social PNG command above. See `docs/brand-system.md` for placement and motion guidance.

## Contact section

`contactEmail` is set to `info@keikora.fi`. The contact section submits through FormSubmit's AJAX endpoint, so visitors do not need a local email app. The first live submission may send a FormSubmit confirmation email to `info@keikora.fi`; click that confirmation to activate delivery. Do not put API secrets in client code.

## Structure and implementation

- `app/`: page composition, layout, CSS, privacy, robots, sitemap and manifest.
- `components/`: navigation, hero, demo, workflow, modules, story, roadmap, contact section, footer and shared UI.
- `lib/`: central configuration and editable product data.
- `public/brand/`: source and rendered social preview.
- `tests/`: browser checks for the actual interaction, contact behavior, overflow and accessibility.

Next.js App Router, strict TypeScript, Tailwind CSS v4, Geist via `next/font` and Lucide. Most sections are server-rendered; client components are limited to navigation, lightweight entrance motion and interactive examples. Product previews are HTML/CSS rather than raster screenshots; branding uses the supplied PNGs. CSS animation and a small IntersectionObserver replace a general animation runtime; reduced-motion preferences are respected. Demo tabs support arrow keys, Home and End. The mobile navigation supports Escape, visible focus, native links and an expanded-state announcement.

The workflow is a scroll-driven story: its preview stays in view while natural page scrolling advances the five source-derived steps, connecting path and progress indicator. One DEMO-101 card remains visible across calendar, assignment, employee-work and record contexts. Scrolling upward reverses the sequence. Mouse/touch scrolling is never intercepted. Step buttons remain keyboard-accessible shortcuts. Reduced-motion preferences remove scene/selection animation; screens 760px high or shorter show all five chapters and mini visuals as a normal vertical sequence. See `docs/scroll-workflow.md` for tuning and validation.

The booking explanation includes a generated conceptual illustration with three detail cards. The image and cards move at different speeds as the reader scrolls, using a CSS view timeline. Reduced motion keeps the composition still; unsupported browsers retain the entry reveal. The transparent WebP is lazy-loaded and approximately 68 KB. Original supplied brand PNGs remain unchanged. See `docs/work-illustration.md` for the artwork, generation prompt and implementation details.

## Browser verification

```sh
npx playwright install chromium
npm run test:e2e
```

Tests run against a production export served by a small local test server. Screenshots at 375, 768, 1024 and 1440 pixels are written to ignored `test-results/`. Tests include axe checks, overflow checks, demo tabs, workflow selection, mobile menu and mocked contact-form submission. These checks do not establish full WCAG conformance or guarantee Lighthouse targets. Run Lighthouse on the deployed URL before launch; network, hosting and device conditions affect scores.

The test server applies compression and immutable asset caching to approximate production hosting. For an installed browser, set `PLAYWRIGHT_CHANNEL=msedge` or `chrome`; otherwise the tests use Playwright Chromium. Tests cover all six source-derived views on desktop/mobile and the requested 375, 768, 1024 and 1440px layouts. Run the checks again after changing source-derived representations.

After the scroll-driven workflow update, lint, TypeScript, static build and all ten browser tests passed. All six tour views passed overflow and automated accessibility checks at each of the four widths; tests verify original PNG bytes, forward/reverse scroll progression without clicks, keyboard step selection, reduced motion and the short-screen fallback. Detailed product evidence is in `docs/product-audit.md`; current brand usage is in `docs/brand-system.md`. Earlier Lighthouse measurements in the product audit refer to the preceding revisions.

## Before publication

The second product-truth review and connected-motion implementation are documented in `docs/content-motion-audit.md`. It records the six-view DEMO identity, role/industry qualifications, hero connections, assignment-check progression, current validation and fresh Lighthouse result. Run `node scripts/check-source-integrity.mjs` for a read-only comparison with the ignored local source baseline; `node scripts/review-connected-story.mjs` captures local rendered text and desktop/mobile story screenshots after a build.

Confirm the Cloudflare project/domain, configure the monitored contact channel if registration should be open, and review development statuses against the source product. Keep reconstruction/synthetic-data labels visible. The implementation audit does not prove commercial availability, delivery of notifications, external integration setup or production readiness. The operational calendar and booking/order flow are implemented; Google Calendar availability sync still has connection groundwork but is not fully wired into availability changes. Email, Telegram and Google Sheets depend on configuration. Public customer booking, configurable catalogs and broader business adaptation are future direction. No deployment has been performed by this repository alone.
