import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/container";
import { Mdx } from "@/mdx-components";
import { ShareButton } from "@/components/site/share-button";
import { ScrollSnapWrapper } from "@/components/site/scroll-snap-wrapper";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export async function generateStaticParams() {
	return (allPosts as any[])
		.filter((p: any) => p.published)
		.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = (allPosts as any[]).find((p: any) => p.slug === slug);

	if (!post || !post.published) {
		return {
			title: "Post Not Found",
		};
	}

	const bannerUrl = post.banner || "/images/BannerImage.png";
	const fullBannerUrl =
		bannerUrl.startsWith("http") || bannerUrl.startsWith("/")
			? bannerUrl
			: `${process.env.NEXT_PUBLIC_SITE_URL || "https://skyteam.dev"}${bannerUrl}`;

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			images: [
				{
					url: fullBannerUrl,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [fullBannerUrl],
		},
	};
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = (allPosts as any[]).find((p: any) => p.slug === slug);
	if (!post || !post.published) return notFound();

	return (
		<ScrollSnapWrapper>
			<div className="-mt-[72px]">
				{/* Full-width banner */}
				<div className="relative w-full h-[400px] md:h-[500px] overflow-visible snap-end min-h-[400px] md:min-h-[500px]">
					{/* Blurred background for glow effect */}
					<div className="absolute inset-[-10px] scale-110 z-[-1]">
						<Image
							src={post.banner || "/images/BannerImage.svg"}
							alt=""
							fill
							className="object-cover blur-2xl"
							quality={95}
							priority
							sizes="100vw"
							aria-hidden="true"
						/>
					</div>
					{/* Main banner image */}
					<Image
						src={post.banner || "/images/BannerImage.svg"}
						alt={post.title}
						fill
						className="object-cover relative z-10"
						quality={95}
						priority
						sizes="100vw"
					/>
				</div>

				<div className="py-16 snap-start">
					<Container>
						<div className="max-w-3xl mx-auto">
							<div className="flex items-center justify-between mb-6">
								<Breadcrumb>
									<BreadcrumbList>
										<BreadcrumbItem>
											<BreadcrumbLink asChild>
												<Link href="/">Home</Link>
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbLink asChild>
												<Link href="/press-releases">Press Release</Link>
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbPage>
												{post.title}
											</BreadcrumbPage>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
								<ShareButton />
							</div>
							<h1 className="not-prose text-4xl md:text-5xl font-extrabold uppercase">
								{post.title}
							</h1>
							<p className="not-prose text-sm text-muted-foreground mt-2 mb-8">
								<time dateTime={post.date}>
									{(() => {
										const date = new Date(post.date);
										const day = String(
											date.getDate(),
										).padStart(2, "0");
										const month = String(
											date.getMonth() + 1,
										).padStart(2, "0");
										const year = date.getFullYear();
										return `${day}/${month}/${year}`;
									})()}
								</time>
							</p>
							<article className="prose prose-neutral dark:prose-invert max-w-none">
								<Mdx code={post.body.code} />
							</article>
						</div>
					</Container>
				</div>
			</div>
		</ScrollSnapWrapper>
	);
}

