# Scroll-driven operational workflow

The workflow section advances through the existing five source-derived steps with ordinary page scrolling. A sticky presentation keeps the step list and preview visible during the sequence. Content enters with a short opacity/translation transition, the active step shifts slightly, and a continuous path/progress line follows scroll position. Scrolling upward reverses the sequence. The section releases naturally into the following product section.

The implementation does not intercept wheel/touch events, lock the document, run an automatic timer or change any product capability claim. All workflow content continues to come from `lib/product-data.ts`. Original logo and wordmark PNG files remain unchanged.

## Interaction and accessibility

- All five steps progress without clicking on desktop, tablet and mobile.
- The original buttons remain accessible shortcuts; Enter/Space select a chapter and align the page to its scroll position.
- Scroll updates do not use an ARIA live region that would repeatedly interrupt a screen reader. Buttons retain their accessible names and pressed state; the preview is a named region.
- Reduced-motion preferences remove scene entry and selection movement while retaining scroll progression.
- At viewport heights of 760px or less, the pinned presentation is replaced by five readable articles and their mini visuals in the normal document flow. No chapter requires a click or fits inside a constrained scrolling box. The threshold was raised for the fuller assignment explanation.

## Implementation and tuning

`components/workflow/workflow.tsx` manages the current step with a passive scroll listener and a single requestAnimationFrame update per frame. React updates occur only when the selected chapter changes; continuous progress is a CSS custom property. ResizeObserver refreshes the sticky offset when viewport/layout dimensions change. Listeners, observers and queued frames are cleaned up on unmount.

`components/workflow/workflow.css` controls sticky positioning, scroll distance, compact mobile navigation, scene transitions and the short-screen/reduced-motion rules. As of 4 October 2026, each chapter occupies 100px of natural scrolling on desktop and mobile, replacing the longer 320px/270px transition spacing. The track height equals the sticky stage height plus the chapter count multiplied by `--workflow-step-distance`; the stage inset is shared so viewport height cannot add hidden scroll distance. This makes a typical 100px wheel movement advance one step. Hardware wheel/trackpad/swipe deltas vary, so the site does not force a fixed step per gesture. Scenes enter over 0.4 seconds. `app/layout.tsx` imports this stylesheet after the existing brand styles.

## Validation

The 4 October pacing change passed lint, TypeScript, static build and three focused
browser checks. The fixed-wheel check advances each chapter with a single 100px
wheel movement at 375, 768, 1024 and 1440px, verifies reverse progression, and
retains keyboard shortcuts, reduced motion and normal scrolling out of the section.
Assignment-check progression and the short-screen linear mode also passed.

The second truth review added `record-scene.tsx` and overrides in `components/product-demo/connected-motion.css`. One DEMO-101 card remains mounted as the surrounding capture, calendar, assignment, employee-work and administrative contexts change. Within the assignment chapter, `--assignment-progress` progressively marks coverage, conflict rejection and priority selection. Every row and the illustrative outcome remain readable without movement. Availability is independent input; invoice preparation is a separate action, not a completion gate. See [the second review](content-motion-audit.md) for current validation and content changes. Results below describe the earlier scroll implementation.

Lint, TypeScript and the production static build passed. All ten browser tests passed, including genuine wheel scrolling through all five chapters and reverse scrolling at 375, 768, 1024 and 1440px, visibility of the pinned preview, continued scrolling into later content, keyboard shortcuts, reduced-motion behavior and accessible short-screen articles. Existing product-tour, original-PNG, navigation, form, SEO-asset and accessibility checks also passed. Mobile and desktop screenshots were reviewed manually.

Brand images now use native image elements rather than a client image runtime, retaining the exact PNG bytes, explicit dimensions and asynchronous decoding. Navbar assets are requested immediately at low priority; other placements remain lazy-loaded. The decorative mono font is no longer preloaded ahead of the main reading font.

The earlier scroll-update Lighthouse measurement was 89 performance, 100 accessibility, 100 best practices and 100 SEO, with zero measured layout shift and 60ms total blocking time. It predates the illustration and second truth review. Current measurement details belong in `content-motion-audit.md`; these are local export results rather than deployed-site guarantees.

Changed files: `components/workflow/workflow.tsx`, new `components/workflow/workflow.css`, `components/brand/keikora-logo.tsx`, `components/navigation/navigation.tsx`, `app/layout.tsx`, `tests/site.spec.ts`, this guide, `README.md` and `docs/brand-system.md`. No new dependency was introduced and no source-product file was modified.
