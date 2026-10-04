# Keikora brand assets

The user's latest instruction is authoritative: use the exact supplied PNG artwork. The recreated vector identity has been removed.

## Production artwork

- `public/brand/keikora_logo.png`: original 589 x 464 transparent symbol.
- `public/brand/keikora_text.png`: original 1042 x 372 transparent wordmark, including its supplied tagline.
- `components/brand/keikora-logo.tsx`: displays both files directly through native images with explicit intrinsic dimensions and useful alternative text. The navbar requests them immediately at low priority; later placements are lazy-loaded. No image transformation or client image runtime is used.
- `app/icon.png`: a byte-identical copy of the original symbol for the browser icon.
- `app/manifest.ts` and organization metadata reference the original symbol PNG.
- `public/brand/social-card.svg`: embeds the original PNG bytes; `social-card.png` is the social preview export.

Neither original file is edited, traced, cropped, recolored, filtered or recompressed. CSS only changes display size while retaining aspect ratio. On dark surfaces, a light backing keeps the original navy wordmark readable. The supplied artwork's original blue/teal/green colors remain intact.

## Placement and motion

Navigation, product-shell headers, the origin-story endpoint and footer use the supplied symbol and wordmark together. The hero, architecture and comparison use the supplied symbol alone. The workflow now follows a persistent DEMO booking card rather than repeating the logo in every step. The hero fades the intact symbol in once over 1.4 seconds; reduced-motion preferences show it statically. There is no reconstruction of individual nodes or a replacement symbol.

The operational workflow now advances with normal page scrolling: the preview stays in view, its content fades/slides between steps, and the linking path fills continuously. Reverse scrolling reverses the story. Reduced motion removes transitions; short screens use a natural sequence of readable chapters. The PNG artwork itself remains unchanged. See [the workflow motion guide](scroll-workflow.md).

The supporting operational connections still follow the read-only product audit: booking details, employee availability, assignment checks and connected records. No public booking or employee-completion journey is introduced by the branding.

## Maintenance and verification

Run `node scripts/create-brand-assets.mjs` after replacing supplied artwork, then `node scripts/create-social-card.mjs` to export the social image. The first script copies the original symbol to the favicon and embeds PNG bytes in the social template; it never overwrites the original PNGs.

`node scripts/inspect-brand.mjs` generates ignored image-size and responsive layout previews. Browser tests check the actual served PNGs and favicon against the original file bytes, layout at 375/768/1024/1440px, accessibility, interactions and reduced-motion behavior.

The earlier custom SVG logos, alternate-color variants and `lib/brand.ts` were removed. The source product at `E:/Lab_arena/puhdasfix-scheduler` remains untouched.
