"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { getAllCategories } from "@/app/api/category";

const ALL_STATES = "All States";
const ALL_LEVELS = "All Levels";
const ALL_STREAMS = "All Streams";

const filterClassName =
  "h-8 w-full bg-transparent text-sm font-medium text-primary outline-none dark:text-white";

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

const stripHtml = (value?: string) =>
  (value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const truncateText = (value?: string, maxLength = 120) => {
  const plainText = stripHtml(value);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
};

export default function CoursesSection() {
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const states = useMemo(() => {
    return [
      ALL_STATES,
      ...Array.from(
        new Set(
          categoriesData
            .map((category) => String(category.state || "").trim())
            .filter(Boolean)
        )
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }, [categoriesData]);

  const levels = useMemo(() => {
    return [
      ALL_LEVELS,
      ...Array.from(
        new Set(
          categoriesData
            .map((category) => String(category.level || "").trim())
            .filter(Boolean)
        )
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }, [categoriesData]);

  const streams = useMemo(() => {
    return [
      ALL_STREAMS,
      ...Array.from(
        new Set(
          categoriesData
            .map((category) => String(category.stream || "").trim())
            .filter(Boolean)
        )
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }, [categoriesData]);

  const [stateFilter, setStateFilter] = useState<string>(ALL_STATES);
  const [levelFilter, setLevelFilter] = useState<string>(ALL_LEVELS);
  const [streamFilter, setStreamFilter] = useState<string>(ALL_STREAMS);

  const [page, setPage] = useState(1);
  const limit = 8;
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categoriesData.filter((category) => {
      const stateMatch =
        stateFilter === ALL_STATES ||
        String(category.state || "").toLowerCase() === stateFilter.toLowerCase();

      const levelMatch =
        levelFilter === ALL_LEVELS ||
        String(category.level || "").toLowerCase() === levelFilter.toLowerCase();

      const streamMatch =
        streamFilter === ALL_STREAMS ||
        String(category.stream || "").toLowerCase() === streamFilter.toLowerCase();

      if (!query) {
        return stateMatch && levelMatch && streamMatch;
      }

      const searchMatch =
        String(category.name || "").toLowerCase().includes(query) ||
        stripHtml(category.description).toLowerCase().includes(query);

      return stateMatch && levelMatch && streamMatch && searchMatch;
    });
  }, [categoriesData, levelFilter, searchQuery, stateFilter, streamFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / limit));

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredCategories.slice(start, start + limit);
  }, [filteredCategories, page]);

  const pageItems = getVisiblePageItems(page, totalPages);
  const currentTotalLabel = `${filteredCategories.length} categor${filteredCategories.length === 1 ? "y" : "ies"}`;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        const formatted = result.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          state: cat.state,
          level: cat.level,
          stream: cat.stream,
          totalCourses: cat.totalCourses,
          visible: cat.visible,
        }));

        setCategoriesData(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const handleFilterChange = <T extends string>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setStateFilter(ALL_STATES);
    setLevelFilter(ALL_LEVELS);
    setStreamFilter(ALL_STREAMS);
    setPage(1);
  };


  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_36%,#f3faf8_100%)] py-12 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)] sm:py-14 md:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/10 bg-white/85 p-4 sm:p-6 md:p-8 lg:p-10 text-center shadow-[0_28px_75px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_30%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-[#FAFA33]/45 bg-[#FAFA33]/20 px-3 py-1.5 text-10 font-semibold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-[#FAFA33]/30 dark:text-primary sm:px-4 sm:py-2 sm:text-xs">
              <Icon icon="mdi:shape-outline" className="h-3 sm:h-4 w-3 sm:w-4" />
              Category Explorer
            </span>
            <h2 className="text-22 sm:text-28 md:text-35 lg:text-40 font-extrabold text-primary dark:text-white">
              Explore <span className="text-secondary">Categories</span>
            </h2>
            <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-13 sm:text-14 md:text-16 font-medium leading-6 sm:leading-7 text-slate-600 dark:text-slate-300">
              Find the right path from category to specialization and college with cleaner filters and quicker browsing.
            </p>
          </div>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-6 rounded-2xl border border-primary/10 bg-white/95 p-4 shadow-[0_18px_44px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/85 sm:mt-8 sm:p-5"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Browse by Category Details</p>
                <h3 className="mt-1 text-lg font-bold text-primary dark:text-white">Category Filters</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 ring-1 ring-primary/10 dark:bg-slate-900/70 dark:text-slate-300">
                  Showing {currentTotalLabel}
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-primary/15 bg-primary/5 px-3 text-xs font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
                >
                  <Icon icon="solar:restart-bold-duotone" className="text-sm text-secondary" />
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300" htmlFor="category-search-filter">
                Search
              </label>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:magnify" className="h-4 w-4 text-secondary" />
                <input
                  id="category-search-filter"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search category name or description..."
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary placeholder:text-slate-400 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:items-stretch">
              {states.length > 1 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">State</label>
                  <select
                    value={stateFilter}
                    onChange={(e) => handleFilterChange(setStateFilter, e.target.value)}
                    className={filterClassName}
                  >
                    {states.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                </div>
              )}

              {levels.length > 1 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Level</label>
                  <select
                    value={levelFilter}
                    onChange={(e) => handleFilterChange(setLevelFilter, e.target.value)}
                    className={filterClassName}
                  >
                    {levels.map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </div>
              )}

              {streams.length > 1 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Stream</label>
                  <select
                    value={streamFilter}
                    onChange={(e) => handleFilterChange(setStreamFilter, e.target.value)}
                    className={filterClassName}
                  >
                    {streams.map((stream) => (
                      <option key={stream}>{stream}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3.5 py-2 text-sm dark:border-white/10 dark:bg-slate-950/60">
              <p className="font-semibold text-primary dark:text-white">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#FAFA33] align-middle" />
                Showing {currentTotalLabel}
              </p>
              <p className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-300">
                Page {page} of {totalPages}
              </p>
            </div>
          </div>
        </motion.div>


        {/* CATEGORY GRID */}
        <div
          ref={gridRef}
          className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4"
        >

          {paginatedCategories.map((category, index) => (

            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.24), ease: "easeOut" }}
            >
              <Link
                href={`/course/${category.id}`}
                className="group relative block overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_28px_64px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
              >

                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon icon="mdi:shape-outline" className="w-6 h-6" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-primary dark:text-white">
                  {category.name}
                </h3>

                <p className="min-h-10 text-sm text-gray-500 dark:text-gray-400">
                  {truncateText(category.description, 120)}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4 text-sm dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-300">
                    {category.totalCourses || "Courses"}
                  </span>

                  <span className="flex items-center gap-1 font-semibold text-primary">
                    Explore
                    <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
                  </span>
                </div>

              </Link>
            </motion.div>

          ))}

        </div>


        {/* PAGINATION */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          >

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-white dark:hover:bg-primary sm:text-sm"
            >
              Previous
            </button>

            {pageItems.map((item, index) => (
              <button
                key={`${item}-${index}`}
                disabled={item === "..."}
                onClick={() => {
                  if (typeof item === "number") {
                    setPage(item);
                  }
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                  item === page
                    ? "border-primary bg-primary text-white ring-2 ring-[#FAFA33]/65"
                    : item === "..."
                      ? "cursor-default border-transparent bg-transparent text-slate-500"
                      : "border-primary/20 bg-white text-primary hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 dark:border-white/15 dark:bg-slate-900/70 dark:text-white"
                }`}
              >
                {item}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-white dark:hover:bg-primary sm:text-sm"
            >
              Next
            </button>

          </motion.div>
        )}

        {filteredCategories.length === 0 && (
          <div className="mt-8 rounded-[2rem] border border-primary/10 bg-white/90 px-6 py-12 text-center text-gray-500 shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:text-gray-400">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              No Match Found
            </p>
            <h3 className="mt-3 text-28 font-extrabold text-primary dark:text-white">
              Try broader filters
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              No categories match your current filters. Reset and search with a broader keyword.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </motion.section>
  );
}