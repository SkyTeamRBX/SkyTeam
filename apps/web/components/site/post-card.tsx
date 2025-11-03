import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PostLike = {
	title: string;
	description?: string;
	date: string;
	slug: string;
	tags?: string[];
	banner?: string;
};

export function PostCard({ post }: { post: PostLike }) {
	return (
		<Link href={`/blog/${post.slug}`}>
			<Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden">
				<div className="relative w-full h-40 overflow-hidden">
					<Image
						src={post.banner || "/images/BannerImage.svg"}
						alt={post.title}
						fill
						className="object-cover"
						quality={95}
						priority={!post.banner}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<CardHeader className="pb-2">
					<CardTitle className="line-clamp-2 text-xl">
						{post.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{post.description ? (
						<p className="text-sm text-muted-foreground line-clamp-3">
							{post.description}
						</p>
					) : null}
					<div className="flex items-center justify-between text-xs text-muted-foreground">
						<time dateTime={post.date}>
							{(() => {
								const date = new Date(post.date);
								const day = String(date.getDate()).padStart(
									2,
									"0",
								);
								const month = String(
									date.getMonth() + 1,
								).padStart(2, "0");
								const year = date.getFullYear();
								return `${day}/${month}/${year}`;
							})()}
						</time>
						<div className="flex gap-1">
							{post.tags
								?.slice(0, 2)
								.map((t) => <Badge key={t}>{t}</Badge>)}
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
