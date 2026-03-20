"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getAllCategories } from "@/app/api/category";

const ALL_STATES = "All States";
const ALL_LEVELS = "All Levels";
const ALL_STREAMS = "All Streams";

export default function CoursesSection() {

  const [categories, setCategories] = useState<any[]>([]);
  const [states, setStates] = useState<string[]>([ALL_STATES]);
  const [levels, setLevels] = useState<string[]>([ALL_LEVELS]);
  const [streams, setStreams] = useState<string[]>([ALL_STREAMS]);

  const [stateFilter, setStateFilter] = useState(ALL_STATES);
  const [levelFilter, setLevelFilter] = useState(ALL_LEVELS);
  const [streamFilter, setStreamFilter] = useState(ALL_STREAMS);
  const [popularOnly, setPopularOnly] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const filters = {
          state: stateFilter !== ALL_STATES ? stateFilter : undefined,
          level: levelFilter !== ALL_LEVELS ? levelFilter : undefined,
          stream: streamFilter !== ALL_STREAMS ? streamFilter : undefined,
          popular: popularOnly || undefined,
        };

        const result = await getAllCategories();
        console.log("API RESPONSE:", result);


        const formatted = result.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
          description: cat.description,
          icon: "mdi:shape-outline",
          visible: cat.visible,
          state: cat.state,
          level: cat.level,
          stream: cat.stream,
          totalCourses: cat.totalCourses,
          popular: cat.popular
        }));

        setCategories(formatted);
        setTotalPages(result.totalPages || 1);

        const uniqueStates = [
          ALL_STATES,
          ...Array.from(
            new Set(formatted.map((c: any) => c.state || ""))
          ).filter(Boolean),
        ] as string[];

        setStates(uniqueStates);

        const uniqueLevels = [
          ALL_LEVELS,
          ...Array.from(
            new Set(formatted.map((c: any) => c.level || ""))
          ).filter(Boolean),
        ] as string[];

        setLevels(uniqueLevels);

        const uniqueStreams = [
          ALL_STREAMS,
          ...Array.from(
            new Set(formatted.map((c: any) => c.stream || ""))
          ).filter(Boolean),
        ] as string[];

        setStreams(uniqueStreams);

        setStates(uniqueStates);
        setLevels(uniqueLevels);
        setStreams(uniqueStreams);

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

  }, [page, stateFilter, levelFilter, streamFilter, popularOnly]);


  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_36%,#f3faf8_100%)] py-12 sm:py-14 md:py-16 lg:py-20 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] overflow-hidden">
        <div className="absolute -left-16 top-14 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute -right-20 top-8 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-3 sm:px-4 md:px-6">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/10 bg-white/85 p-4 sm:p-6 md:p-8 lg:p-10 text-center shadow-[0_28px_75px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_30%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-10 sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-secondary">
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


        {/* FILTER BAR */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 rounded-2xl sm:rounded-[1.8rem] border border-primary/10 bg-white/90 p-3 sm:p-5 md:p-6 shadow-[0_22px_56px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">

          {/* STATE */}
          <select
            value={stateFilter}
            onChange={(e) => {
              setStateFilter(e.target.value);
              setPage(1);
            }}
            className="h-12 rounded-xl border border-primary/10 bg-white px-4 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>


          {/* LEVEL */}
          <select
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value);
              setPage(1);
            }}
            className="h-12 rounded-xl border border-primary/10 bg-white px-4 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          >
            {levels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>


          {/* STREAM */}
          <select
            value={streamFilter}
            onChange={(e) => {
              setStreamFilter(e.target.value);
              setPage(1);
            }}
            className="h-12 rounded-xl border border-primary/10 bg-white px-4 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          >
            {streams.map((stream) => (
              <option key={stream}>{stream}</option>
            ))}
          </select>


          {/* POPULAR */}
          <label className="flex h-10 sm:h-11 md:h-12 items-center gap-3 rounded-lg sm:rounded-xl border border-primary/10 bg-white px-3 sm:px-4 text-xs sm:text-sm text-primary shadow-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-white">
            <input
              type="checkbox"
              checked={popularOnly}
              onChange={(e) => {
                setPopularOnly(e.target.checked);
                setPage(1);
              }}
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            Popular Courses
          </label>


          {/* RESET */}
          <button
            onClick={() => {
              setStateFilter(ALL_STATES);
              setLevelFilter(ALL_LEVELS);
              setStreamFilter(ALL_STREAMS);
              setPopularOnly(false);
              setPage(1);
            }}
            className="h-10 sm:h-11 md:h-12 rounded-lg sm:rounded-xl border border-primary bg-white px-3 sm:px-4 text-xs sm:text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white dark:bg-transparent dark:text-secondary"
          >
            Reset Filters
          </button>

        </div>


        {/* CATEGORY GRID */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {categories.map((category) => (

            <Link
              key={category.id}
              href={`/course/${category.slug}`}
              className="group relative overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_28px_64px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
            >

              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon icon="mdi:shape-outline" className="w-6 h-6" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-primary dark:text-white">
                {category.name}
              </h3>

              <p
                className="text-sm text-gray-500 dark:text-gray-400 min-h-10"
                dangerouslySetInnerHTML={{
                  __html: category.description,
                }}
              />

              <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4 text-sm dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-300">
                  {category.totalCourses || "Courses"}
                </span>

                <span className="flex items-center gap-1 font-semibold text-primary">
                  Explore
                  <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                </span>
              </div>

            </Link>

          ))}

        </div>


        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 dark:text-white"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${page === i + 1
                  ? "border-primary bg-primary text-white"
                  : "border-primary/20 text-primary dark:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 dark:text-white"
            >
              Next
            </button>

          </div>
        )}

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No categories found for the selected filters.
          </div>
        )}

      </div>
    </section>
  );
}