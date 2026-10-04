import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Keikora",
    short_name: "Keikora",
    description:
      "Implemented service operations software. Broader Keikora platform in development.",
    start_url: "/",
    display: "browser",
    background_color: "#fafcff",
    theme_color: "#12243c",
    icons: [
      {
        src: "/brand/keikora_logo.png",
        sizes: "589x464",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
