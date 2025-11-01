import Link from "next/link";
import Image from "next/image";
import { allPosts } from "contentlayer/generated";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/site/post-card";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

export default function LandingPage() {
	const posts = (allPosts as any[])
		.filter((p: any) => p.published)
		.sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date))
		.slice(0, 3);

	return (
		<div className="pb-16">
			{/* Fullscreen banner with bottom-left text */}
			<section className="relative h-[80svh] w-full -mt-[72px] pt-[72px]">
				<Image
					src="/images/LandingPage.png"
					alt="Caring more about you"
					fill
					priority
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-black/40" />
				<div className="absolute bottom-0 left-0 w-full">
					<div className="mx-auto max-w-6xl px-4 py-10">
						<div className="space-y-4 max-w-2xl">
							<h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
								CARING MORE ABOUT YOU
							</h1>
							<p className="text-muted-foreground">
								SkyTeam ROBLOX is an alliance of exceptional
								virtual airlines looking to provide the best
								connected experience within our platform.
							</p>
							<div className="flex items-center gap-3">
								<Button asChild>
									<Link
										href="/blog"
										className="flex items-center"
									>
										What's new
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<a
										href="https://discord.gg/skyteam"
										target="_blank"
										rel="noreferrer"
										className="flex items-center gap-2"
									>
										<DiscordLogoIcon className="w-4 h-4" />
										Join our Discord
									</a>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Container>
				<section className="mt-16">
					<Link
						href="/blog"
						className="group flex items-center gap-2 mb-6"
					>
						<h2 className="text-3xl font-bold font-display">
							WHAT'S NEW
						</h2>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6 group-hover:translate-x-1 transition-transform"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</Link>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{posts.map((post: any) => (
							<PostCard key={post.slug} post={post} />
						))}
					</div>
				</section>
			</Container>
		</div>
	);
}
