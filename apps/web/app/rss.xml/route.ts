import { NextResponse } from "next/server";
import { allPosts } from "contentlayer/generated";

export async function GET() {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	const items = (allPosts as any[])
		.filter((p: any) => p.published)
		.sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date))
		.map(
			(p: any) => `
      <item>
        <title>${escapeXml(p.title)}</title>
        <link>${baseUrl}/blog/${p.slug}</link>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <guid>${baseUrl}/blog/${p.slug}</guid>
        <description>${escapeXml(p.description || "")}</description>
      </item>
    `,
		)
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>SkyTeam Blog</title>
      <link>${baseUrl}</link>
      <description>RSS Feed</description>
      ${items}
    </channel>
  </rss>`;

	return new NextResponse(xml, {
		headers: { "Content-Type": "application/rss+xml" },
	});
}

function escapeXml(str: string) {
	return str.replace(/[<>&'\"]/g, (c) => {
		switch (c) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case '"':
				return "&quot;";
			case "'":
				return "&apos;";
			default:
				return c;
		}
	});
}
