import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollSnapManager } from "@/components/site/scroll-snap-manager";

export const metadata: Metadata = {
	title: "SkyTeam ROBLOX",
	description:
		"SkyTeam ROBLOX is an alliance of exceptional virtual airlines looking to provide the best connected experience within our platform.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className="dark overflow-x-hidden"
		>
			<body className="min-h-dvh flex flex-col">
				<ScrollSnapManager />
				<Header />
				<main className="flex-1 relative">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
