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

export default function PrivacyPolicy() {
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
							<BreadcrumbPage>Privacy Policy</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h1 className="text-3xl font-bold mb-6">PRIVACY POLICY</h1>
				<div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
					<p className="text-sm text-muted-foreground">
						Last updated: {new Date().toLocaleDateString()}
					</p>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Introduction
						</h2>
						<p>
							SkyTeam ROBLOX ("we," "our," or "us") is committed
							to protecting your privacy. This Privacy Policy
							explains how we collect, use, disclose, and
							safeguard your information when you visit our
							website and use our services.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Information We Collect
						</h2>
						<p>
							We may collect information about you in a variety of
							ways. The information we may collect on the site
							includes:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Personal Data:</strong> Information that
								you voluntarily give to us when registering with
								our service or expressing interest in obtaining
								information about us or our products and
								services.
							</li>
							<li>
								<strong>Derived Data:</strong> Information our
								servers automatically collect when you access
								the site, such as your IP address, browser type,
								operating system, access times, and the pages
								you have viewed directly before and after
								accessing the site.
							</li>
							<li>
								<strong>Roblox Data:</strong> When you sign in
								with ROBLOX, we may collect certain information
								associated with your ROBLOX account as permitted
								by ROBLOX&apos;s terms of service.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Use of Your Information
						</h2>
						<p>
							Having accurate information about you permits us to:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Create and manage your account</li>
							<li>Provide, operate, and maintain our website</li>
							<li>
								Improve, personalize, and expand our website
							</li>
							<li>
								Understand and analyze how you use our website
							</li>
							<li>
								Develop new products, services, features, and
								functionality
							</li>
							<li>
								Communicate with you about updates, security
								alerts, and support messages
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Disclosure of Your Information
						</h2>
						<p>
							We may share information we have collected about you
							in certain situations. Your information may be
							disclosed as follows:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>By Law or to Protect Rights:</strong> If
								we believe the release of information about you
								is necessary to respond to legal process, to
								investigate or remedy potential violations of
								our policies, or to protect the rights,
								property, and safety of others.
							</li>
							<li>
								<strong>Third-Party Service Providers:</strong>{" "}
								We may share your information with third parties
								that perform services for us or on our behalf,
								including data analysis, email delivery, hosting
								services, and customer service.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Security of Your Information
						</h2>
						<p>
							We use administrative, technical, and physical
							security measures to help protect your personal
							information. While we have taken reasonable steps to
							secure the personal information you provide to us,
							please be aware that despite our efforts, no
							security measures are perfect or impenetrable, and
							no method of data transmission can be guaranteed
							against any interception or other type of misuse.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Policy for Children
						</h2>
						<p>
							We do not knowingly solicit information from or
							market to children under the age of 13. If we learn
							that personal information from users less than 13
							years of age has been collected, we will deactivate
							the account and take reasonable measures to promptly
							delete such data from our records.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Changes to This Privacy Policy
						</h2>
						<p>
							We may update this Privacy Policy from time to time
							in order to reflect changes to our practices or for
							other operational, legal, or regulatory reasons. We
							will notify you of any changes by posting the new
							Privacy Policy on this page and updating the "Last
							updated" date.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-foreground mb-3">
							Contact Us
						</h2>
						<p>
							If you have questions or comments about this Privacy
							Policy, please contact us through our{" "}
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
