"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollSnapManager() {
	const pathname = usePathname();
	const isPressRelease = pathname?.startsWith("/press-releases/") && pathname !== "/press-releases";

	useEffect(() => {
		// Only enable scroll snap on individual press release pages
		if (!isPressRelease) {
			// Explicitly disable scroll snap on all other pages
			document.documentElement.style.removeProperty("scroll-snap-type");
			document.documentElement.style.removeProperty("scroll-behavior");
			document.documentElement.style.removeProperty("scroll-padding-top");
		}
	}, [pathname, isPressRelease]);

	return null;
}
