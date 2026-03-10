import { getAllPosts, getPostBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

/* ============================= */
/* METADATA */
/* ============================= */

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug, [
    "title",
    "author",
    "content",
    "metadata",
  ]);

  const siteName = process.env.SITE_NAME || "Your Site Name";
  const authorName = process.env.AUTHOR_NAME || "Your Author Name";

  if (post) {
    return {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      author: authorName,
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }

  return {
    title: "Not Found",
    description: "No blog article has been found",
    author: authorName,
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ============================= */
/* PAGE */
/* ============================= */

export default async function BlogHead({ params }: Readonly<Props>) {
  const post = getPostBySlug(params.slug, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  const content = await markdownToHtml(post.content || "");

  return (
    <section className="pt-44 pb-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl px-4">

        {/* BLOG HEADER CARD */}
        <div className="
          rounded-3xl border
          bg-white dark:bg-slate-900
          border-gray-200 dark:border-slate-800
          p-8 md:p-12
          shadow-sm
          transition-colors
        ">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-10">

            {/* LEFT CONTENT */}
            <div className="col-span-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="pr-6 border-r border-gray-200 dark:border-slate-700">
                  {format(new Date(post.date), "dd MMM yyyy")}
                </span>
                <span>13 Comments</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white pt-6 leading-tight">
                {post.title}
              </h1>
            </div>

            {/* AUTHOR SECTION */}
            <div className="col-span-4 flex items-center gap-6">
              <Image
                src={post.authorImage}
                alt="Author Image"
                className="rounded-full border border-gray-200 dark:border-slate-700"
                width={84}
                height={84}
                quality={100}
              />
              <div>
                <span className="block text-lg font-semibold text-gray-900 dark:text-white">
                  {post.author || "Author Name"}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Author
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* BLOG CONTENT */}
        <div className="
          mt-12 rounded-3xl border
          bg-white dark:bg-slate-900
          border-gray-200 dark:border-slate-800
          p-8 md:p-12
          prose prose-lg max-w-none
          dark:prose-invert
          transition-colors
        ">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

      </div>
    </section>
  );
}