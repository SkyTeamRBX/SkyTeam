import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	const routes: MetadataRoute.Sitemap = [
		{ url: `${baseUrl}/`, lastModified: new Date() },
		{ url: `${baseUrl}/blog`, lastModified: new Date() },
		...allPosts
			.filter((p: { published: boolean }) => p.published)
			.map((p: { slug: string; date: string | number | Date }) => ({
				url: `${baseUrl}/blog/${p.slug}`,
				lastModified: new Date(p.date),
			})),
	];

	return routes;
}
