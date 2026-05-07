"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { getAllNews, UiNewsItem } from "@/app/api/news";
import EduLoader from "@/components/Common/EduLoader";

const ALL_CATEGORIES = "All Categories";
const PAGE_LIMIT = 6;

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

export default function NewsList() {
  const [items, setItems] = useState<UiNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [breakingOnly, setBreakingOnly] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  /* INITIAL FETCH — pull a large page once and paginate client-side
     so users get instant page transitions like the colleges screen. */
  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      try {
        setLoading(true);
        const response = await getAllNews(1, 1000);
        if (!cancelled) setItems(response?.data ?? []);
      } catch (error) {
        console.error("News fetch error:", error);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAll();
    return () => {
      cancelled = true;
    };
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
  }, [debouncedQuery, category, breakingOnly]);

  /* SCROLL TO GRID ON PAGE CHANGE */
  useEffect(() => {
    if (currentPage === 1) return;
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  /* CATEGORIES */
  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...Array.from(new Set(items.map((item) => item.category).filter(Boolean))).sort(),
    ],
    [items]
  );

  /* FILTER */
  const filteredItems = useMemo(() => {
    const normalizedQuery = debouncedQuery.toLowerCase();

    return items.filter((item) => {
      const categoryMatch = category === ALL_CATEGORIES || item.category === category;
      const breakingMatch = !breakingOnly || item.isBreaking;

      if (!normalizedQuery) return categoryMatch && breakingMatch;

      const textMatch =
        item.title?.toLowerCase().includes(normalizedQuery) ||
        item.excerpt?.toLowerCase().includes(normalizedQuery) ||
        item.category?.toLowerCase().includes(normalizedQuery);

      return categoryMatch && breakingMatch && textMatch;
    });
  }, [items, category, debouncedQuery, breakingOnly]);

  /* PAGINATION */
  const filteredTotalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / PAGE_LIMIT)
  );
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT
  );
  const pageItems = getVisiblePageItems(currentPage, filteredTotalPages);

  const handleReset = () => {
    setQuery("");
    setDebouncedQuery("");
    setCategory(ALL_CATEGORIES);
    setBreakingOnly(false);
    setCurrentPage(1);
  };

  const resultsLabel = `${filteredItems.length} update${filteredItems.length === 1 ? "" : "s"}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_34%,#f1faf8_100%)] py-16 transition-colors dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)] sm:py-20"
    >
      {/* BACKGROUND BLOBS */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-16 bottom-14 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="relative mb-6 overflow-hidden rounded-lg border border-primary/10 bg-white/85 p-4 text-center shadow-md backdrop-blur sm:rounded-2xl sm:p-6 md:rounded-[2rem] md:p-8 lg:p-10 dark:border-white/10 dark:bg-slate-900/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_30%)]" />

          <div className="relative mx-auto max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FAFA33]/45 bg-[#FAFA33]/20 px-3 py-1.5 text-10 font-semibold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-[#FAFA33]/30 dark:text-primary sm:mb-4 sm:px-4 sm:py-2 sm:text-xs">
              <Icon icon="mdi:newspaper-variant-outline" className="w-3 h-3 sm:w-4 sm:h-4" />
              Resource Updates
            </span>

            <h1 className="text-24 font-extrabold text-primary dark:text-white sm:text-28 md:text-35 lg:text-40">
              Latest <span className="text-secondary">News</span>
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-13 font-medium leading-6 text-slate-600 dark:text-slate-300 sm:mt-3 sm:text-14 md:text-16">
              Stay updated with important education announcements, exam policy
              changes, scholarships, and admission alerts.
            </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-5 rounded-2xl border border-primary/10 bg-white/95 p-4 shadow-[0_18px_44px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/85 sm:p-5"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                  Filter Updates
                </p>
                <h3 className="mt-1 text-lg font-bold text-primary dark:text-white">
                  News Filters
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-stretch">
              {/* CATEGORY */}
              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label
                  className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300"
                  htmlFor="news-category-filter"
                >
                  Category
                </label>
                <select
                  id="news-category-filter"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary outline-none dark:text-white"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* BREAKING TOGGLE */}
              <div className="flex min-h-[4.4rem] items-center justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                    Breaking Only
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {breakingOnly ? "Showing breaking news only" : "Show all updates"}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={breakingOnly}
                  onClick={() => setBreakingOnly((prev) => !prev)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    breakingOnly ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                      breakingOnly ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* RESET */}
              <div className="flex items-stretch xl:justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex h-full min-h-[4.4rem] w-full items-center justify-center gap-1.5 rounded-xl border border-primary/15 bg-primary/5 px-3 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white xl:w-[150px]"
                >
                  <Icon icon="solar:restart-bold-duotone" className="text-sm text-secondary" />
                  Reset Filters
                </button>
              </div>
            </div>

            {/* SEARCH */}
            <div className="relative">
              <div className="flex items-center gap-2 rounded-xl border border-primary/10 bg-white px-3.5 py-2.5 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <Icon icon="solar:magnifer-linear" className="shrink-0 text-lg text-slate-400" />
                <input
                  type="text"
                  placeholder="Search news by title, summary, or category…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-primary outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setDebouncedQuery("");
                      setSearching(false);
                    }}
                    aria-label="Clear search"
                    className="shrink-0 rounded-full p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  >
                    <Icon icon="mdi:close" className="text-base" />
                  </button>
                )}
              </div>
            </div>

            {/* RESULTS BAR */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3.5 py-2 text-sm dark:border-white/10 dark:bg-slate-950/60">
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
                Latest News
              </p>
            </div>
          </div>
        </motion.div>

        {/* GRID */}
        <div ref={gridRef} className="mb-8">
          {loading || searching ? (
            <div className="flex items-center justify-center py-20">
              <EduLoader
                overlay={false}
                message={searching ? "Searching news…" : "Loading news…"}
              />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-primary/10 bg-white/95 px-6 py-16 text-center dark:border-white/10 dark:bg-slate-900/85">
              <Icon
                icon="mdi:newspaper-variant-outline"
                className="mx-auto text-slate-300 dark:text-slate-600"
                width={48}
                height={48}
              />
              <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">
                No news found
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your filters or check back soon.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {displayedItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: (index % PAGE_LIMIT) * 0.04,
                      ease: "easeOut",
                    }}
                    className="group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_28px_64px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
                  >
                    {/* TOP BORDER */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

                    {/* CATEGORY + DATE */}
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:bg-white/10 dark:text-secondary">
                        {item.category}
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                        {item.publishedOn}
                      </span>
                    </div>

                    {/* BREAKING */}
                    {item.isBreaking && (
                      <span className="inline-flex items-center gap-1 self-start rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-red-500 dark:bg-red-500/20">
                        <Icon icon="mdi:fire" className="text-sm" />
                        Breaking
                      </span>
                    )}

                    {/* TITLE */}
                    <h2 className="mt-2 line-clamp-2 text-xl font-bold text-primary dark:text-white">
                      {item.title}
                    </h2>

                    {/* SUMMARY */}
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.excerpt}
                    </p>

                    {/* LINK */}
                    <Link
                      href={`/news/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3 dark:text-secondary"
                    >
                      Read more
                      <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* PAGINATION */}
              {filteredTotalPages > 1 && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary/30"
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
                    className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary/30"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* BLOG LINK */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-secondary/10"
          >
            <Icon icon="solar:notebook-minimalistic-bold-duotone" className="text-base" />
            Explore Blog
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
