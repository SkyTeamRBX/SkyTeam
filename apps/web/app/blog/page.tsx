import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { Container } from '@/components/site/container';
import { PostCard } from '@/components/site/post-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function BlogIndex() {
  const posts = (allPosts as any[])
    .filter((p: any) => p.published)
    .sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date));

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
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mb-6">BLOG POSTS</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p: any) => (
            <PostCard key={p.slug} post={p as any} />
          ))}
        </div>
      </Container>
    </div>
  );
}


