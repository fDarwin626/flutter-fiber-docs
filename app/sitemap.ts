import type { MetadataRoute } from "next";
import { TOPICS } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://flutter-fiber-docs.vercel.app"
  ).replace(/\/$/, "");

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...TOPICS.map((t) => ({
      url: `${siteUrl}/guides/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}