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

The second content review preserved both image files and added an SVG connector
that progressively draws as the reader scrolls. The labels now explicitly refer
to operations capturing the booking, employee intervals informing assignment and
employees seeing assigned work. Translation is restrained and the image request
has low fetch priority. See `content-motion-audit.md` for current QA.

The Playwright illustration check verifies the asset loads, scrolling changes its
transform, reduced motion removes movement, and the desktop/mobile layouts do
not overflow. Existing accessibility, workflow, and original-PNG checks remain.
