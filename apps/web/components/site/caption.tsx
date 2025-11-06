"use client";

import * as React from "react";

type CaptionProps = {
	children: React.ReactNode;
	className?: string;
};

export function Caption({ children, className }: CaptionProps) {
	return (
		<div
			className={
				"not-prose -mt-1 mb-0 rounded bg-muted px-4 py-3 text-sm text-muted-foreground [&>p]:!mt-0 [&>p]:!mb-0 [&>p]:!leading-6 " +
				(className ?? "")
			}
		>
			{children}
		</div>
	);
}
