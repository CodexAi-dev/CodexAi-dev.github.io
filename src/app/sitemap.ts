import type { MetadataRoute } from "next";

import { site } from "@/content/site";

// Required by `output: export` — metadata routes must be statically resolvable.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
