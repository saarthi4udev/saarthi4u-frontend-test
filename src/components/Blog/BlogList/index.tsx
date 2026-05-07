"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import EduLoader from "@/components/Common/EduLoader";

const ALL_CATEGORIES = "All Categories";
const ALL_TAGS = "All Tags";
const PAGE_LIMIT = 8;
const base = process.env.NEXT_PUBLIC_API_URL;

/* --------------- PAGINATION HELPER --------------- */

const getVisiblePageItems = (current: number, total: number) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 2) {
    return [1, 2, "...", total];
  }

  if (current >= total - 1) {
    return [1, "...", total - 1, total];
  }

  if (current === 3) {
    return [1, 2, 3, "...", total];
  }

  return [1, 2, "...", current, "...", total];
};

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [tag, setTag] = useState(ALL_TAGS);

  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  /* FETCH BLOGS — only the first call shows the loader; the 30s polling
     refresh stays silent so paged users aren't kicked back to a spinner. */
  const fetchBlogs = async ({ initial = false }: { initial?: boolean } = {}) => {
    try {
      if (initial) setLoading(true);
      const res = await fetch(`${base}/blog/all`);

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const json = await res.json();
      const blogs = json.data || [];

      const formattedBlogs = blogs.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || "",
        featuredImage: blog.featuredImage || "/placeholder.jpg",
        category: blog.category?.name || "Engineering",
        tags: blog.tags?.map((t: any) => t.name) || [],
        author: blog.author?.name || "Admin",
        readingTime: Math.max(3, Math.ceil((blog.content || "").length / 500)),
        date: blog.publishedAt || blog.createdAt,
        popularScore: blog.views || 0,
      }));

      // Newest first — most recently published/created blog appears at the top
      formattedBlogs.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setPosts(formattedBlogs);
    } catch (error) {
      console.error("Blog fetch error:", error);
    } finally {
      if (initial) setLoading(false);
    }
  };

  /* INITIAL LOAD + AUTO REFRESH */
  useEffect(() => {
    fetchBlogs({ initial: true });

    const interval = setInterval(() => fetchBlogs(), 30000);

    return () => clearInterval(interval);
  }, []);

  /* DEBOUNCE SEARCH */
  useEffect(() => {
    if (query.trim() === "") {
      setDebouncedQuery("");
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setSearching(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  /* RESET PAGE WHEN FILTERS CHANGE */
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, category, tag]);

  /* SCROLL TO GRID ON PAGE CHANGE */
  useEffect(() => {
    if (currentPage === 1) return; // skip initial mount
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  /* CATEGORIES */
  const categories = useMemo(
    () => [ALL_CATEGORIES, ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts]
  );

  /* TAGS */
  const tags = useMemo(
    () => [ALL_TAGS, ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()],
    [posts]
  );

  /* FILTER LOGIC */
  const filteredPosts = useMemo(() => {
    const normalizedQuery = debouncedQuery.toLowerCase();

    return posts.filter((post) => {
      const categoryMatch = category === ALL_CATEGORIES || post.category === category;
      const tagMatch = tag === ALL_TAGS || post.tags.includes(tag);

      if (!normalizedQuery) return categoryMatch && tagMatch;

      const textMatch =
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.author.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((t: string) => t.toLowerCase().includes(normalizedQuery));

      return categoryMatch && tagMatch && textMatch;
    });
  }, [category, posts, debouncedQuery, tag]);

  /* PAGINATION */
  const filteredTotalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / PAGE_LIMIT)
  );
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT
  );
  const pageItems = getVisiblePageItems(currentPage, filteredTotalPages);

  /* LATEST POSTS (sidebar) — top 5 newest */
  const latestPosts = useMemo(() => posts.slice(0, 5), [posts]);

  /* POPULAR POSTS (sidebar) — top 5 by score */
  const popularPosts = useMemo(
    () => [...posts].sort((a, b) => b.popularScore - a.popularScore).slice(0, 5),
    [posts]
  );

  const resultsLabel = `${filteredPosts.length} blog${filteredPosts.length === 1 ? "" : "s"}`;

  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white dark:bg-slate-950 transition-colors duration-300"
      id="blog"
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* FILTER BAR */}
        <div className="mb-10 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:p-6 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* SEARCH */}
            <div className="lg:col-span-6 flex items-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 h-12">
              <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search blogs, author, tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent w-full text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setDebouncedQuery("");
                    setSearching(false);
                  }}
                  aria-label="Clear search"
                  className="ml-2 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-700 dark:hover:text-gray-200"
                >
                  <Icon icon="mdi:close" className="text-base" />
                </button>
              )}
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="lg:col-span-3 h-12 px-3 rounded-xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            {/* TAG */}
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="lg:col-span-3 h-12 px-3 rounded-xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {tags.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

          </div>

          {/* RESULTS BAR */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3.5 py-2 text-sm dark:border-white/10 dark:bg-slate-950/60">
            <p className="font-semibold text-primary dark:text-white">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#FAFA33] align-middle" />
              Showing {resultsLabel}
              {filteredTotalPages > 1 && (
                <span className="ml-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  · Page {currentPage} of {filteredTotalPages}
                </span>
              )}
            </p>
            <p className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-300">
              Saarthi4u Blog
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* BLOG CARDS */}
          <div ref={gridRef} className="xl:col-span-8">
            {loading || searching ? (
              <div className="flex items-center justify-center py-20">
                <EduLoader
                  overlay={false}
                  message={searching ? "Searching blogs…" : "Loading blogs…"}
                />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-16 text-center">
                <Icon
                  icon="mdi:notebook-edit-outline"
                  className="mx-auto text-slate-300 dark:text-slate-600"
                  width={48}
                  height={48}
                />
                <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">
                  No blogs found
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  {displayedPosts.map((post) => (
                    <article
                      key={post.id || post.slug}
                      className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Link href={`/blog/${post.slug}`} className="relative h-52 block">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </Link>

                      <div className="p-5 flex flex-col h-full">
                        <div className="flex justify-between text-xs mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {post.category}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {post.readingTime} min read
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span>{post.author}</span>
                          <span>{format(new Date(post.date), "dd MMM yyyy")}</span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-auto inline-flex items-center gap-2 text-primary font-medium"
                        >
                          Read More
                          <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* PAGINATION */}
                {filteredTotalPages > 1 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed dark:border-primary/30"
                    >
                      Previous
                    </button>

                    {pageItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (typeof item === "number") setCurrentPage(item);
                        }}
                        disabled={item === "..."}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          item === currentPage
                            ? "bg-primary text-white shadow-sm"
                            : item === "..."
                              ? "cursor-default text-slate-400"
                              : "border border-primary/25 bg-primary/5 text-primary hover:bg-primary/10 dark:border-primary/30"
                        }`}
                      >
                        {item}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(filteredTotalPages, currentPage + 1))
                      }
                      disabled={currentPage === filteredTotalPages}
                      className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed dark:border-primary/30"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="xl:col-span-4 space-y-6">

            {/* Latest */}
            <SidebarBlock title="Latest Posts">
              {loading ? (
                <SidebarSkeleton />
              ) : latestPosts.length === 0 ? (
                <p className="text-xs text-slate-400">No posts yet.</p>
              ) : (
                latestPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <p className="text-sm text-gray-900 dark:text-white group-hover:text-primary line-clamp-2">
                      {post.title}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(post.date), "dd MMM yyyy")}
                    </span>
                  </Link>
                ))
              )}
            </SidebarBlock>

            {/* Popular */}
            <SidebarBlock title="Popular Posts">
              {loading ? (
                <SidebarSkeleton />
              ) : popularPosts.length === 0 ? (
                <p className="text-xs text-slate-400">No posts yet.</p>
              ) : (
                popularPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <p className="text-sm text-gray-900 dark:text-white group-hover:text-primary line-clamp-2">
                      {post.title}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.readingTime} min read
                    </span>
                  </Link>
                ))
              )}
            </SidebarBlock>

            {/* Tags */}
            <SidebarBlock title="Browse Tags">
              <div className="flex flex-wrap gap-2">
                {tags
                  .filter((item) => item !== ALL_TAGS)
                  .map((item) => (
                    <button
                      key={item}
                      onClick={() => setTag(item)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition ${
                        tag === item
                          ? "border-primary bg-primary text-white"
                          : "border-primary/30 text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </SidebarBlock>

          </aside>
        </div>
      </div>
    </section>
  );
}

/* SIDEBAR BLOCK */
function SidebarBlock({ title, children }: any) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 shadow-sm transition-colors">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* SIDEBAR SKELETON */
function SidebarSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-slate-800" />
          <div className="h-3 w-3/5 animate-pulse rounded bg-gray-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}
