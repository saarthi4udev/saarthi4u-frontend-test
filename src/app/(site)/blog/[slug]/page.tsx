


import { Metadata } from "next";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { getBlogBySlug, getAllBlogs } from "@/app/api/blog";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, ReactPortal } from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/* ---------------- SEO METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Not Found | Saarthi4u",
      description: "No blog article found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.title} | Saarthi4u Blog`,
    description: post.excerpt || "Read this blog on Saarthi4u",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: "article",
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function BlogPostPage({ params }: Props) {
  const {slug} = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogs();

  /* ---------------- RELATED POSTS ---------------- */

  const relatedPosts = allPosts
    .filter((item: { slug: any; }) => item.slug !== post.slug)
    .sort((a: { popularScore: number; }, b: { popularScore: number; }) => b.popularScore - a.popularScore)
    .slice(0, 3);

  return (
    <section className="py-10 md:py-16 lg:py-20 dark:bg-darkmode">
      <div className="container mx-auto px-4 sm:px-6">

        {/* FEATURED IMAGE */}

        <div className="rounded-3xl overflow-hidden border dark:border-slate-800 mb-8">
          <div className="relative h-[260px] md:h-[420px]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* BLOG CONTENT */}

        <div className="max-w-4xl mx-auto">

          {/* BREADCRUMB */}

          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted">

            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>

            <Icon icon="mdi:chevron-right" className="w-4 h-4" />

            <span>{post.category}</span>

          </div>

          {/* TITLE */}

          <h1 className="text-28 md:text-40 font-bold text-midnight_text dark:text-white mb-4">
            {post.title}
          </h1>

          {/* AUTHOR + DATE */}

          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-sm text-muted">

            <span className="font-medium text-midnight_text dark:text-white">
              {post.author}
            </span>

            <span>
              {format(new Date(post.date), "dd MMM yyyy")}
            </span>

            <span>{post.readingTime} min read</span>

          </div>

          {/* BLOG BODY */}

          <div className="blog-details rounded-3xl border dark:border-slate-800 bg-white dark:bg-darkmode p-5 md:p-8 lg:p-10 interactive-surface">

            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />

          </div>

          {/* TAGS */}

          <div className="mt-6 flex flex-wrap gap-2">

            {post.tags?.map((tag: string) => (

              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs border border-primary/20 text-primary bg-primary/5"
              >
                {tag}
              </span>

            ))}

          </div>

        </div>

        {/* RELATED POSTS */}

        <div className="max-w-6xl mx-auto mt-14">

          <h2 className="text-24 md:text-28 font-semibold text-midnight_text dark:text-white mb-6">
            Related Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {relatedPosts.map((item: { slug: Key | null | undefined; featuredImage: string | StaticImport; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; date: string | number | Date; excerpt: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (

              <article
                key={item.slug}
                className="rounded-2xl border dark:border-slate-800 bg-white dark:bg-darkmode overflow-hidden interactive-surface"
              >

                <Link
                  href={`/blog/${item.slug}`}
                  className="block relative h-48"
                >

                  <Image
                    src={item.featuredImage}
                    alt={String(item.title) || "Blog post image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />

                </Link>

                <div className="p-5">

                  <p className="text-xs text-muted mb-2">
                    {format(new Date(item.date), "dd MMM yyyy")}
                  </p>

                  <h3 className="text-20 font-semibold text-midnight_text dark:text-white line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>

                  <Link
                    href={`/blog/${item.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium"
                  >

                    Read More

                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      className="w-4 h-4"
                    />

                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}