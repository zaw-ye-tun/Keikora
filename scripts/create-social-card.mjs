import sharp from "sharp";
await sharp("public/brand/social-card.svg")
  .png()
  .toFile("public/brand/social-card.png");
