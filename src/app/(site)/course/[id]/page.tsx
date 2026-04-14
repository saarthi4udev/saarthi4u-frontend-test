import { getAllCategories, getCategoryContent } from "@/app/api/category";
import Image from "next/image";
import Link from "next/link";
import NavLink from "@/components/Common/NavLink";
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
  "rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5";

const sectionClassName =
  "rounded-2xl border border-primary/10 bg-white/90 p-5 shadow-[0_12px_36px_rgba(10,24,58,0.06)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-6";

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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] overflow-hidden">
        <div className="absolute -left-20 top-4 h-48 w-48 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute -right-16 top-8 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10 lg:gap-8 lg:py-12">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden rounded-2xl border border-primary/10 bg-white/85 px-5 py-6 shadow-[0_16px_48px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:px-7 sm:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.06),transparent_30%)]" />

          <div className="relative space-y-5">
            {/* Top row: badge + stats inline */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary dark:text-secondary">
                  Explore Category
                </span>

                <h1 className="text-2xl font-extrabold leading-snug text-primary dark:text-white sm:text-3xl lg:text-4xl">
                  {category.name}
                  <span className="ml-2 text-secondary">pathways</span>
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {`Explore trusted colleges, entrance exams, practical guides, and current updates for ${category.name}.`}
                </p>
              </div>

              {/* Compact resource stats */}
              <div className="shrink-0 rounded-xl border border-primary/10 bg-white/80 p-3.5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 lg:min-w-[16rem]">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-primary dark:text-white">{totalResources}</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">curated resources</span>
                </div>
                <div className="mt-2.5 grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { n: colleges?.total ?? 0, l: "Colleges" },
                    { n: exams?.total ?? 0, l: "Exams" },
                    { n: blogs?.total ?? 0, l: "Guides" },
                    { n: news?.total ?? 0, l: "Updates" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg bg-hero-bg p-2 dark:bg-white/5">
                      <p className="text-base font-bold text-primary dark:text-white">{s.n}</p>
                      <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick-nav pills */}
            {sectionLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {sectionLinks.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-3 py-1.5 text-xs font-medium text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-secondary/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    {section.label}
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary dark:bg-white/10 dark:text-secondary">
                      {section.count}
                    </span>
                  </a>
                ))}
              </div>
            )}

            {/* Description */}
            {description && (
              <p className="max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        </section>

        {colleges?.data?.length > 0 && (
          <section id="colleges" className={sectionClassName}>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Best-Fit Institutes</p>
                <h2 className="mt-1 text-xl font-extrabold text-primary dark:text-white sm:text-2xl">Top Colleges</h2>
              </div>
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-white/5 dark:text-secondary">
                {colleges?.data?.length} options
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {colleges?.data?.map((college: any) => (
                <NavLink
                  key={college.id}
                  href={`/college/${college.slug}`}
                  className="group overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_12px_32px_rgba(10,24,58,0.10)] dark:border-white/10 dark:bg-slate-950/70"
                >
                  <div className="relative h-36 overflow-hidden bg-[linear-gradient(135deg,rgba(23,30,76,0.95),rgba(48,216,201,0.75))]">
                    {college.bannerImg ? (
                      <Image src={college.bannerImg} alt={college.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-end p-4 text-lg font-bold text-white/90">{college.name}</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{college.name}</h3>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{college.city}, {college.state}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-primary/10 pt-3 text-xs font-semibold text-primary dark:border-white/10 dark:text-secondary">
                      <span>View details</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </NavLink>
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
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Admission Route</p>
                <h2 className="mt-1 text-xl font-extrabold text-primary dark:text-white sm:text-2xl">Entrance Exams</h2>
              </div>
              <span className="w-fit rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-primary dark:bg-secondary/10 dark:text-secondary">
                {exams?.data?.length} exams
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {exams?.data?.map((exam: any) => (
                <NavLink
                  key={exam.id}
                  href={`/exam/${exam.slug}`}
                  className="group rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_12px_32px_rgba(10,24,58,0.10)] dark:border-white/10 dark:bg-slate-950/70"
                >
                  <h3 className="text-base font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{exam.name}</h3>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <p><span className="font-semibold text-primary dark:text-white">Conducted by:</span> {exam.conductingBody || "TBD"}</p>
                    <p><span className="font-semibold text-primary dark:text-white">Mode:</span> {exam.examMode || "—"}</p>
                    <p><span className="font-semibold text-primary dark:text-white">Level:</span> {exam.level || "—"}</p>
                  </div>
                  <div className="mt-3 border-t border-primary/10 pt-3 text-xs font-semibold text-primary dark:border-white/10 dark:text-secondary">
                    See details &rarr;
                  </div>
                </NavLink>
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
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Insights &amp; Guides</p>
              <h2 className="mt-1 text-xl font-extrabold text-primary dark:text-white sm:text-2xl">Related Blogs</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {blogs?.data?.map((blog: any) => (
                <NavLink
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_12px_32px_rgba(10,24,58,0.10)] dark:border-white/10 dark:bg-slate-950/70"
                >
                  {blog.featuredImage && (
                    <div className="relative h-36 overflow-hidden">
                      <Image src={blog.featuredImage} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{blog.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{truncateText(blog.excerpt, 120)}</p>
                  </div>
                </NavLink>
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
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Stay Informed</p>
              <h2 className="mt-1 text-xl font-extrabold text-primary dark:text-white sm:text-2xl">Latest News</h2>
            </div>
            <div className="space-y-3">
              {news?.data?.map((item: any) => (
                <NavLink
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group block rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/35 hover:shadow-[0_12px_32px_rgba(10,24,58,0.10)] dark:border-white/10 dark:bg-slate-950/70"
                >
                  <h3 className="text-base font-bold text-primary transition-colors group-hover:text-secondary dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{truncateText(item.summary, 160)}</p>
                </NavLink>
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
            <div className="mx-auto max-w-2xl space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Content Coming Soon</p>
              <h2 className="text-xl font-extrabold text-primary dark:text-white sm:text-2xl">
                We are preparing resources for {category.name}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                This category page is ready, but detailed content is not available yet.
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
