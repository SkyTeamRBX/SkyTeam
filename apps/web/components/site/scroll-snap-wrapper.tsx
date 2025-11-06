"use client";

import { useEffect } from "react";

export function ScrollSnapWrapper({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// Add scroll snap to html element with mandatory snapping for better control
		document.documentElement.style.scrollSnapType = "y mandatory";
		// document.documentElement.style.scrollBehavior = "smooth";
		document.documentElement.style.scrollPaddingTop = "30px";

		return () => {
			// Cleanup on unmount
			document.documentElement.style.scrollSnapType = "";
			document.documentElement.style.scrollBehavior = "";
			document.documentElement.style.scrollPaddingTop = "";
		};
	}, []);

	return <>{children}</>;
}
