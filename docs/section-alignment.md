# Section Alignment

Updated 4 October 2026 after the user reported that For businesses and Our story, then Product and How it works, did not align with the main navigation and website.

## Changes

- `app/page.tsx`: the major page sections now follow the menu order: Product, How it works, For businesses and Our story.
- `components/features/features.tsx`: the Product section is explicitly labeled Product and comes before the workflow. For businesses is explicitly labeled too. Three current workflows - Operations, Employees and Administration - connect its content to the implemented tour. Industry names and status labels are grouped together. Cleaning remains the originating environment; five other sectors remain product direction. Links lead to the product views and Our story.
- `components/workflow/workflow.tsx`: the scroll-driven workflow is explicitly labeled How it works, matching the main navigation.
- `components/story/story.tsx`: the section is explicitly labeled Our story. Its diagram names the same implemented booking, customer, availability, assignment, employee work and invoice PDF functions shown in the tour. The supplied logo PNGs remain intact. PuhdasFix is still the originating business, not a paying-customer endorsement, and broader Keikora support is still in development.
- `components/navigation/navigation.tsx`: the current section is marked with `aria-current="location"`, updated through passive scroll events, one scheduled animation-frame callback, hash changes and layout resizing. Opening the mobile menu retains the selection from where it was opened. No wheel interception or forced page scrolling is used.
- `components/story/section-alignment.css`: these sections use the existing container and typography system. The header is fixed with its original height reserved in body padding (83px desktop, 71px tablet, 67px mobile). This avoids browser focus scrolling toward a sticky header's original document position. The mobile menu overlays the page instead of shifting the content and changing anchor positions. Industry cards stack on narrow screens.
- `components/footer/footer.tsx`: includes For businesses, in the same order as header navigation.

Product wording follows the audited capabilities in [product-audit.md](product-audit.md). No functionality, market proof or source-app behavior was added to the product claims.

## Verification

The navigation regression checks Product, How it works, For businesses and Our story at 375, 768, 1024 and 1440px: page order, native hash links, matching visible labels, headings below the header, identical section/header container alignment, current-link indication on desktop and mobile, keyboard menu focus without changing scroll position, browser back/forward, links into the product tour, footer navigation and no horizontal overflow. Desktop, tablet and mobile section screenshots were visually reviewed. Existing layout/accessibility and product-tour checks remain part of the complete regression suite.

No source scheduler files or supplied PNG assets were modified. No deployment or fresh Lighthouse measurement was performed.

Final results: static build, lint and TypeScript passed; all 18 Edge/Playwright tests passed. The read-only integrity comparison reports 207 source files, zero changed/deleted/added.
