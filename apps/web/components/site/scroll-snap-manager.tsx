"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollSnapManager() {
	const pathname = usePathname();
	const isBlogPost = pathname?.startsWith("/blog/") && pathname !== "/blog";

	useEffect(() => {
		// Only enable scroll snap on individual blog post pages
		if (!isBlogPost) {
			// Explicitly disable scroll snap on all other pages
			document.documentElement.style.removeProperty("scroll-snap-type");
			document.documentElement.style.removeProperty("scroll-behavior");
			document.documentElement.style.removeProperty("scroll-padding-top");
		}
	}, [pathname, isBlogPost]);

	return null;
}
