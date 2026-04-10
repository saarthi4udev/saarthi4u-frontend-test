import { getAllCategories, getCategoryContent } from "@/app/api/category";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    collegesPage?: string;
    examsPage?: string;
    blogsPage?: string;
    newsPage?: string;
  }>;
};

const normalizeSlug = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

const stripHtml = (value?: string) =>
  (value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const truncateText = (value?: string, maxLength = 120) => {
  const plainText = stripHtml(value);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
};

const statCardClassName =
  "rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/5";

const sectionClassName =
  "rounded-[2rem] border border-primary/10 bg-white/90 p-6 shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-8";

export default async function CategoryDetailPage({ params, searchParams }: Props) {
  const { id } = await params;

  const sp = await searchParams;

  const collegesPage = Number(sp?.collegesPage || 1);
  const examsPage = Number(sp?.examsPage || 1);
  const blogsPage = Number(sp?.blogsPage || 1);
  const newsPage = Number(sp?.newsPage || 1);


  const categories = await getAllCategories();
  const category = categories?.find((c: any) => String(c.id) === id);

  if (!category) return notFound();

  const data = await getCategoryContent(category.id, {
    page: collegesPage,        
    limit: 3,

    examPage: examsPage,      
    examLimit: 3,

    blogPage: blogsPage,      
    blogLimit: 3,

    newsPage: newsPage,        
    newsLimit: 3,
  });


  const { colleges, exams, blogs, news } = data;

  const sectionLinks = [
    { id: "colleges", label: "Top Colleges", count: colleges?.total ?? 0 },
    { id: "exams", label: "Entrance Exams", count: exams?.total ?? 0 },
    { id: "blogs", label: "Guides & Blogs", count: blogs?.total ?? 0 },
    { id: "news", label: "Latest News", count: news?.total ?? 0 },
  ].filter((section) => section.count > 0);

  const totalResources = sectionLinks.reduce((sum, section) => sum + section.count, 0);
  const description = stripHtml(category.description);

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_34%,#f0fdfa_100%)] transition-colors dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_40%,#05111b_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] overflow-hidden">
        <div className="animate-gradient-shift absolute left-[-8rem] top-8 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="animate-float absolute right-[-6rem] top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="animate-glow-pulse absolute left-1/2 top-24 h-44 w-44 -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:gap-14 lg:py-16">
        <section className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/85 px-6 py-8 shadow-[0_30px_80px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:px-8 sm:py-10 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.10),transparent_32%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)] lg:items-start">
            <div className="space-y-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Explore Category
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-white text-35 font-extrabold leading-tight sm:text-48 lg:text-[3.6rem]">
                  {category.name}
                  <span className="ml-3 inline-block text-secondary">pathways</span>
                </h1>

                <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {`Explore trusted colleges, entrance exams, practical guides, and current updates for ${category.name}.`}
                </p>
              </div>

              {sectionLinks.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {sectionLinks.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-secondary/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    >
                      <span>{section.label}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary transition-colors group-hover:bg-secondary/20 dark:bg-white/10 dark:text-secondary">
                        {section.count}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {description && (
                <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {description}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className={`${statCardClassName} animate-slide-up`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Resource Snapshot
                </p>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-5xl font-black text-primary dark:text-white">{totalResources}</span>
                  <span className="pb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    curated items available now
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="rounded-2xl bg-primary/10 p-3 dark:bg-white/5">
                    <p className="text-2xl font-bold text-primary dark:text-white">{colleges?.total ?? 0}</p>
                    <p className="mt-1">Colleges</p>
                  </div>

                  <div className="rounded-2xl bg-secondary/15 p-3 dark:bg-secondary/10">
                    <p className="text-2xl font-bold text-primary dark:text-white">{exams?.total ?? 0}</p>
                    <p className="mt-1">Exams</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-3 dark:bg-white/5">
                    <p className="text-2xl font-bold text-primary dark:text-white">{blogs?.total ?? 0}</p>
                    <p className="mt-1">Guides</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/15 p-3 dark:bg-secondary/10">
                    <p className="text-2xl font-bold text-primary dark:text-white">{news?.total ?? 0}</p>
                    <p className="mt-1">Updates</p>
                  </div>
                </div>
              </div>

              <div className={statCardClassName}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  How To Use This Page
                </p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <p>Start with colleges to compare where this category is strongest.</p>
                  <p>Review entrance exams to understand admission requirements early.</p>
                  <p>Use blogs and news to stay updated on trends, deadlines, and preparation strategy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {colleges?.data?.length > 0 && (
          <section id="colleges" className={sectionClassName}>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Best-Fit Institutes</p>
                <h2 className="mt-2 text-28 font-extrabold text-primary dark:text-white sm:text-35">Top Colleges</h2>
              </div>
              <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-white/5 dark:text-secondary">
                {colleges?.data?.length} options
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {colleges?.data?.map((college: any) => (
                <Link
                  key={college.id}
                  href={`/college/${college.slug}`}
                  className="group overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_24px_50px_rgba(10,24,58,0.12)] dark:border-white/10 dark:bg-slate-950/70"
                >
                  <div className="relative h-48 overflow-hidden bg-[linear-gradient(135deg,rgba(23,30,76,0.95),rgba(48,216,201,0.75))]">
                    {college.bannerImg ? (
                      <Image src={college.bannerImg} alt={college.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-end p-6 text-2xl font-bold text-white/90">{college.name}</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{college.name}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{college.city}, {college.state}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4 text-sm font-semibold text-primary dark:border-white/10 dark:text-secondary">
                      <span>View college details</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {colleges?.totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: colleges.totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={`?collegesPage=${pageNum}&examsPage=${examsPage}&blogsPage=${blogsPage}&newsPage=${newsPage}`}
                      className={`px-4 py-2 rounded-full border ${collegesPage === pageNum
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-900"
                        }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {exams?.data?.length > 0 && (
          <section id="exams" className={sectionClassName}>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Admission Route</p>
                <h2 className="mt-2 text-28 font-extrabold text-primary dark:text-white sm:text-35">Entrance Exams</h2>
              </div>
              <span className="w-fit rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-primary dark:bg-secondary/10 dark:text-secondary">
                {exams?.data?.length} exams
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {exams?.data?.map((exam: any) => (
                <Link
                  key={exam.id}
                  href={`/exam/${exam.slug}`}
                  className="group rounded-[1.6rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(240,253,250,0.9))] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_24px_50px_rgba(10,24,58,0.12)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(7,17,31,0.95))]"
                >
                  <h3 className="text-xl font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{exam.name}</h3>
                  <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <p><span className="font-semibold text-primary dark:text-white">Conducted by:</span> {exam.conductingBody || "To be updated"}</p>
                    <p><span className="font-semibold text-primary dark:text-white">Mode:</span> {exam.examMode || "Check details"}</p>
                    <p><span className="font-semibold text-primary dark:text-white">Level:</span> {exam.level || "Check details"}</p>
                  </div>
                  <div className="mt-6 border-t border-primary/10 pt-4 text-sm font-semibold text-primary dark:border-white/10 dark:text-secondary">
                    See exam details -&gt;
                  </div>
                </Link>
              ))}
            </div>

            {exams?.totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: exams.totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={`?collegesPage=${collegesPage}&examsPage=${pageNum}&blogsPage=${blogsPage}&newsPage=${newsPage}`}
                      className={`px-4 py-2 rounded-full border ${examsPage === pageNum
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-900"
                        }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {blogs?.data?.length > 0 && (
          <section id="blogs" className={sectionClassName}>
            <h2 className="mb-6 text-28 font-extrabold text-primary dark:text-white sm:text-35">Related Blogs</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {blogs?.data?.map((blog: any) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_24px_50px_rgba(10,24,58,0.12)] dark:border-white/10 dark:bg-slate-950/70"
                >
                  {blog.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image src={blog.featuredImage} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/5 to-transparent" />
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{blog.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{truncateText(blog.excerpt, 135)}</p>
                  </div>
                </Link>
              ))}
            </div>
            {blogs?.totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: blogs.totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={`?collegesPage=${collegesPage}&examsPage=${examsPage}&blogsPage=${pageNum}&newsPage=${newsPage}`}
                      className={`px-4 py-2 rounded-full border ${blogsPage === pageNum
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-900"
                        }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {news?.data?.length > 0 && (
          <section id="news" className={sectionClassName}>
            <h2 className="mb-6 text-28 font-extrabold text-primary dark:text-white sm:text-35">Latest News</h2>
            <div className="space-y-4">
              {news?.data?.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group block rounded-[1.4rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(245,251,255,0.85))] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/35 hover:shadow-[0_24px_50px_rgba(10,24,58,0.12)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(7,17,31,0.95))] sm:p-6"
                >
                  <h3 className="text-xl font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{truncateText(item.summary, 180)}</p>
                </Link>
              ))}
            </div>
            {news?.totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: news.totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={`?collegesPage=${collegesPage}&examsPage=${examsPage}&blogsPage=${blogsPage}&newsPage=${pageNum}`}
                      className={`px-4 py-2 rounded-full border ${newsPage === pageNum
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-900"
                        }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {sectionLinks.length === 0 && (
          <section className={`${sectionClassName} text-center`}>
            <div className="mx-auto max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Content Coming Soon</p>
              <h2 className="text-28 font-extrabold text-primary dark:text-white sm:text-35">
                We are preparing resources for {category.name}
              </h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                This category page is ready, but detailed blocks are not available yet.
              </p>
              <Link
                href="/course"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Browse all categories
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
