"use client";

import * as React from "react";
import { Twitter, Youtube, Globe } from "lucide-react";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

type Social = {
	href: string;
	label: string;
	icon?: "discord" | "x" | "youtube" | "roblox" | "globe";
};

function RobloxIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<g clip-path="url(#clip0_144_17)">
				<path d="M1.3696 14.5036L14.5274 18.1559L18.1732 5.02166L5.0154 1.36932L1.3696 14.5036ZM15.7006 18.7927L15.6675 18.8899C15.4954 19.3305 15.0349 19.5912 14.5687 19.5113L14.4695 19.4888L0.733065 15.6758L0.635568 15.6437C0.19512 15.4717 -0.0653652 15.011 0.0142442 14.5449L0.0369651 14.4448L3.84314 0.732787C3.99086 0.200624 4.54201 -0.111031 5.07418 0.0366864L18.8107 3.84966L18.9072 3.88152C19.3795 4.06566 19.6453 4.5817 19.5068 5.08069L15.7006 18.7927Z" />
				<path d="M7.50087 7.19023C7.64868 6.65819 8.20022 6.34722 8.73232 6.49491L12.3466 7.49784C12.8787 7.64556 13.1906 8.19713 13.0429 8.72929L12.0419 12.3348L12.0097 12.4314C11.8379 12.8723 11.3773 13.1332 10.911 13.0535L10.8104 13.031L7.19618 12.0271C6.66432 11.8793 6.35327 11.3287 6.50087 10.7967L7.50087 7.19023ZM7.8329 10.8553L10.869 11.6971L11.7089 8.66972L8.67275 7.82695L7.8329 10.8553Z" />
			</g>
		</svg>
	);
}

function IconFor(kind?: Social["icon"]) {
	switch (kind) {
		case "discord":
			return <DiscordLogoIcon className="w-5 h-5" />;
		case "x":
			return <Twitter className="w-5 h-5" />; // stylistic choice
		case "youtube":
			return <Youtube className="w-5 h-5" />;
		case "roblox":
			return <RobloxIcon className="w-5 h-5" />;
		default:
			return <Globe className="w-5 h-5" />;
	}
}

export function SocialLinks({
	title = "Connect",
	links,
	className,
}: {
	title?: string;
	links: Social[];
	className?: string;
}) {
	return (
		<div className={"not-prose mt-6 " + (className ?? "")}>
			<div className="rounded-lg border bg-card/50 px-4 py-4">
				<h3 className="text-lg! font-semibold mb-3 mt-1! text-muted-foreground uppercase tracking-wide">
					{title}
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							target="_blank"
							rel="noreferrer"
							className="group flex items-center gap-3 rounded-md border bg-accent/40 px-3 py-2 hover:bg-accent transition-colors"
						>
							<span className="text-muted-foreground group-hover:text-foreground">
								{IconFor(link.icon)}
							</span>
							<span className="text-sm truncate">
								{link.label}
							</span>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
