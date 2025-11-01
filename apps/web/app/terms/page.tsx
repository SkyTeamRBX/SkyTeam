import Link from "next/link";
import { Container } from "@/components/site/container";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function TermsOfService() {
	return (
		<div className="py-10">
			<Container>
				<Breadcrumb className="mb-6">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Terms of Service</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h1 className="text-3xl font-bold mb-6">TERMS OF SERVICE</h1>
				<div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
					<p className="text-sm text-muted-foreground">
						Last updated: {new Date().toLocaleDateString()}
					</p>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Agreement to Terms
						</h2>
						<p>
							These Terms of Service ("Terms") constitute a
							legally binding agreement made between you, whether
							personally or on behalf of an entity ("you"), and
							SkyTeam ROBLOX ("we," "us," or "our"), concerning
							your access to and use of our website and services.
						</p>
						<p>
							You agree that by accessing the site, you have read,
							understood, and agree to be bound by all of these
							Terms. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS,
							THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
							SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Disclaimer and Important Notice
						</h2>
						<p>
							<strong>
								We want to make it clear that we do not
								represent ourselves as the real life SkyTeam
								alliance, rather a ROBLOX recreation/parody.
							</strong>
						</p>
						<p>
							SkyTeam ROBLOX is an independent virtual airline
							alliance operating within the ROBLOX platform. We
							are not affiliated with, endorsed by, or connected
							to the real-world SkyTeam alliance in any way. Our
							services, content, and branding are created for
							entertainment purposes within the ROBLOX
							environment.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							User Accounts
						</h2>
						<p>
							When you create an account with us, you must provide
							information that is accurate, complete, and current
							at all times. You are responsible for safeguarding
							the password and for all activities that occur under
							your account.
						</p>
						<p>
							You agree not to disclose your password to any third
							party. You must notify us immediately upon becoming
							aware of any breach of security or unauthorized use
							of your account.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Acceptable Use
						</h2>
						<p>
							You may not access or use the site for any purpose
							other than that for which we make the site
							available. The site may not be used in connection
							with any commercial endeavors except those that are
							specifically endorsed or approved by us.
						</p>
						<p>As a user of the site, you agree not to:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Violate any applicable laws or regulations</li>
							<li>Infringe upon the rights of others</li>
							<li>Transmit any harmful or malicious code</li>
							<li>Harass, abuse, or harm other users</li>
							<li>Impersonate any person or entity</li>
							<li>
								Interfere with or disrupt the site or servers
							</li>
							<li>
								Use the site in any way that could damage,
								disable, or overburden the site
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Intellectual Property Rights
						</h2>
						<p>
							Unless otherwise indicated, the site is our
							proprietary property and all source code, databases,
							functionality, software, website designs, audio,
							video, text, photographs, and graphics on the site
							(collectively, the "Content") and the trademarks,
							service marks, and logos contained therein (the
							"Marks") are owned or controlled by us or licensed
							to us.
						</p>
						<p>
							The Content and Marks are provided on the site "AS
							IS" for your information and personal use only. You
							are granted a limited license to access and use the
							site and to download or print a copy of any portion
							of the Content to which you have properly gained
							access solely for your personal, non-commercial use.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							ROBLOX Terms
						</h2>
						<p>
							By using our services, you agree to comply with
							ROBLOX&apos;s Terms of Service and Community
							Guidelines. Any violation of ROBLOX&apos;s terms may
							result in the termination of your access to our
							services.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Termination
						</h2>
						<p>
							We may terminate or suspend your account and bar
							access to the site immediately, without prior notice
							or liability, under our sole discretion, for any
							reason whatsoever and without limitation, including
							but not limited to a breach of the Terms.
						</p>
						<p>
							If you wish to terminate your account, you may
							simply discontinue using the site.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Limitation of Liability
						</h2>
						<p>
							IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR
							AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
							DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY,
							INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING
							LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER
							DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF
							WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
							DAMAGES.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Changes to Terms
						</h2>
						<p>
							We reserve the right, in our sole discretion, to
							make changes or modifications to these Terms at any
							time and for any reason. We will alert you about any
							changes by updating the "Last updated" date of these
							Terms.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Contact Information
						</h2>
						<p>
							If you have any questions about these Terms of
							Service, please contact us through our{" "}
							<a
								href="https://discord.gg/skyteam"
								target="_blank"
								rel="noreferrer"
								className="text-primary hover:underline"
							>
								Discord server
							</a>
							.
						</p>
					</section>
				</div>
			</Container>
		</div>
	);
}
