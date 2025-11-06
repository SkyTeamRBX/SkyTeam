"use client";
import * as React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Caption } from "@/components/site/caption";
import { SocialLinks } from "@/components/site/social-links";

export function Mdx({ code }: { code: string }) {
	const Component = useMDXComponent(code);
	const components = {
		Caption,
		SocialLinks,
		img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
			<img
				{...props}
				className={"rounded overflow-hidden " + (props.className ?? "")}
			/>
		),
	} as const;
	return (
		<div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-h1:!text-4xl md:prose-h1:!text-5xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:!text-3xl md:prose-h2:!text-4xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:!text-2xl md:prose-h3:!text-3xl prose-h3:mt-4 prose-h3:mb-2">
			<Component components={components} />
		</div>
	);
}
