import { readFile, writeFile, copyFile } from "node:fs/promises";

// Embed the supplied PNG bytes; never redraw, recolor, crop or modify the originals.
const symbol = `data:image/png;base64,${(await readFile("public/brand/keikora_logo.png")).toString("base64")}`;
const wordmark = `data:image/png;base64,${(await readFile("public/brand/keikora_text.png")).toString("base64")}`;
await copyFile("public/brand/keikora_logo.png", "app/icon.png");
const social = `<rect width="1200" height="630" fill="#fafcff"/>
<image href="${symbol}" x="70" y="48" width="82" height="65" preserveAspectRatio="xMidYMid meet"/>
<image href="${wordmark}" x="173" y="44" width="248" height="89" preserveAspectRatio="xMidYMid meet"/>
<g font-family="Arial, sans-serif">
<text x="72" y="270" font-size="63" font-weight="600" fill="#14283f">Bookings meet</text>
<text x="72" y="348" font-size="63" font-weight="600" fill="#2563eb">availability.</text>
<text x="72" y="426" font-size="63" font-weight="600" fill="#14283f">Work gets coordinated.</text>
<text x="75" y="494" font-size="21" fill="#52647b">Booking administration. Availability. Assignments.</text>
<circle cx="81" cy="562" r="5" fill="#33866b"/>
<text x="99" y="568" font-size="18" fill="#52647b">Broader platform in development &#183; Oulu, Finland</text>
</g><image href="${symbol}" x="910" y="216" width="220" height="173" preserveAspectRatio="xMidYMid meet"/>`;
await writeFile(
  "public/brand/social-card.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${social}</svg>\n`,
);
console.log(
  "Updated favicon and social preview using the exact supplied PNGs.",
);
