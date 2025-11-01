import Link from "next/link";
import { ScrollSnapWrapper } from "./scroll-snap-wrapper";
import { Logo } from "./logo";
import {
	DiscordLogoIcon,
	TwitterLogoIcon,
	EnvelopeOpenIcon,
} from "@radix-ui/react-icons";

export function Footer() {
	return (
		<ScrollSnapWrapper>
			<footer className="border-t min-h-[50vh] bg-gradient-to-b from-accent/50 to-transparent">
				<div className="mx-auto max-w-6xl px-4 py-12">
					{/* Top section with logo and disclaimer */}
					<div className="mb-8 flex items-center gap-10 flex-col md:flex-row">
						<div>
							<Logo scale={1.2} />
						</div>
						<p className="text-xs text-muted-foreground max-w-2xl">
							We want to make it clear that we do not represent
							ourselves as the real life SkyTeam alliance, rather
							a roblox recreation/parody.
						</p>
					</div>

					{/* Middle section with links and social */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						{/* Navigation Links */}
						<div>
							<h3 className="text-sm font-semibold mb-4">
								NAVIGATION
							</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link
										href="/"
										className="hover:text-foreground transition-colors"
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href={"/flights" as any}
										className="hover:text-foreground transition-colors"
									>
										Flights
									</Link>
								</li>
								<li>
									<Link
										href="/blog"
										className="hover:text-foreground transition-colors"
									>
										Blog
									</Link>
								</li>
							</ul>
						</div>

						{/* Social Links */}
						<div>
							<h3 className="text-sm font-semibold mb-4">
								CONNECT
							</h3>
							<div className="flex items-center gap-4">
								<a
									href="https://discord.gg/skyteam"
									target="_blank"
									rel="noreferrer"
									className="text-muted-foreground hover:text-foreground transition-colors"
									aria-label="Discord"
								>
									<DiscordLogoIcon className="w-6 h-6" />
								</a>
								<a
									href="https://twitter.com/SkyTeam_RBX"
									target="_blank"
									rel="noreferrer"
									className="text-muted-foreground hover:text-foreground transition-colors"
									aria-label="Twitter"
								>
									<TwitterLogoIcon className="w-6 h-6" />
								</a>
								<a
									href="mailto:office@skyteam.dev"
									target="_blank"
									rel="noreferrer"
									className="text-muted-foreground hover:text-foreground transition-colors"
									aria-label="Email"
								>
									<EnvelopeOpenIcon className="w-6 h-6" />
								</a>
							</div>
						</div>
					</div>

					{/* Bottom section */}
					<div className="pt-8 border-t text-sm text-muted-foreground">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
							{/* <p>© {new Date().getFullYear()} SkyTeam</p> */}
							<p></p>
							<p>Caring More About You</p>
						</div>
						<div className="flex items-center justify-center gap-4 text-xs">
							<Link
								href="/privacy"
								className="hover:text-foreground transition-colors"
							>
								Privacy Policy
							</Link>
							<span>•</span>
							<Link
								href="/terms"
								className="hover:text-foreground transition-colors"
							>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</ScrollSnapWrapper>
	);
}
