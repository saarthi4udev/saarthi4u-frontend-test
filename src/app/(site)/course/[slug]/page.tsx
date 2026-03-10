import { getAllCategories, getCategoryContent } from "@/app/api/category";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;

  // 1️⃣ Get all categories
  const categories = await getAllCategories();

  const category = categories?.find(
    (c: any) =>
      c.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  if (!category) return notFound();

  // 2️⃣ Get category content
  const data = await getCategoryContent(category.id);

  const { colleges, exams, blogs, news } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 min-h-screen bg-white dark:bg-slate-950 transition-colors">
      
      {/* CATEGORY HEADER */}
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{category.name}</h1>

        {category.description && (
          <div
            className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        )}
      </div>

      {/* COLLEGES */}
      {colleges?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Top Colleges</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {colleges.map((college: any) => (
              <Link
                key={college.id}
                href={`/college/${college.slug}`}
                className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition bg-white dark:bg-slate-900"
              >
                <div className="relative h-40">
                  <Image
                    src={college.bannerImg}
                    alt={college.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src={college.logo}
                      alt={college.name}
                      width={40}
                      height={40}
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{college.name}</h3>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {college.city}, {college.state}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Est. {college.establishedYear}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* EXAMS */}
      {exams?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Entrance Exams</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {exams.map((exam: any) => (
              <Link
                key={exam.id}
                href={`/exam/${exam.slug}`}
                className="border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md bg-white dark:bg-slate-900 transition"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{exam.name}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conducted by {exam.conductingBody}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mode: {exam.examMode}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Level: {exam.level}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* BLOGS */}
      {blogs?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Blogs</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog: any) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md bg-white dark:bg-slate-900 transition"
              >
                {blog.featuredImage && (
                  <div className="relative h-40">
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{blog.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{blog.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* NEWS */}
      {news?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Latest News</h2>

          <div className="space-y-4">
            {news.map((item: any) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="block border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md bg-white dark:bg-slate-900 transition"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}