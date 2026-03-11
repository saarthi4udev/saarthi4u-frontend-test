"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { CourseCategory, DegreeLevel, DiscoveryCourse } from "@/types/courseDiscovery";
import { formatFees } from "@/app/api/courseDiscovery";

type Props = {
  category: CourseCategory;
  courses: DiscoveryCourse[];
};

const ALL_STATES = "All States";
const ALL_LEVELS = "All Levels";
const ALL_MODES = "All Modes";

const filterClassName =
  "h-12 rounded-xl border border-primary/10 bg-white/90 px-4 text-sm text-primary shadow-sm transition-all duration-200 hover:border-secondary/35 focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white";

function truncateText(value?: string, maxLength = 110) {
  const safeValue = (value ?? "").trim();

  if (safeValue.length <= maxLength) {
    return safeValue;
  }

  return `${safeValue.slice(0, maxLength).trimEnd()}...`;
}

export default function CategoryCoursesView({
  category,
  courses,
}: Readonly<Props>) {
  const [stateFilter, setStateFilter] = useState(ALL_STATES);
  const [levelFilter, setLevelFilter] = useState(ALL_LEVELS);
  const [modeFilter, setModeFilter] = useState(ALL_MODES);
  const [popularOnly, setPopularOnly] = useState(false);

  const stateOptions = useMemo(
    () => [
      ALL_STATES,
      ...Array.from(new Set(courses.flatMap((course) => course.states))).sort(),
    ],
    [courses],
  );

  const levelOptions = useMemo(
    () => [
      ALL_LEVELS,
      ...Array.from(
        new Set(courses.map((course) => course.degreeLevel as DegreeLevel)),
      ),
    ],
    [courses],
  );

  const modeOptions = useMemo(
    () => [ALL_MODES, ...Array.from(new Set(courses.map((course) => course.mode)))],
    [courses],
  );

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesState =
          stateFilter === ALL_STATES || course.states.includes(stateFilter);
        const matchesLevel =
          levelFilter === ALL_LEVELS || course.degreeLevel === levelFilter;
        const matchesMode = modeFilter === ALL_MODES || course.mode === modeFilter;
        const matchesPopular = !popularOnly || course.popular;

        return matchesState && matchesLevel && matchesMode && matchesPopular;
      }),
    [courses, levelFilter, modeFilter, popularOnly, stateFilter],
  );

  const resetFilters = () => {
    setStateFilter(ALL_STATES);
    setLevelFilter(ALL_LEVELS);
    setModeFilter(ALL_MODES);
    setPopularOnly(false);
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_34%,#f0fdfa_100%)] py-16 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_40%,#05111b_100%)] sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] overflow-hidden">
        <div className="animate-gradient-shift absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="animate-float absolute right-[-4rem] top-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/85 p-6 shadow-[0_30px_80px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.10),transparent_32%)]" />

          <div className="relative flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/course" className="font-medium transition-colors hover:text-primary">
              Categories
            </Link>
            <Icon icon="mdi:chevron-right" className="h-4 w-4" />
            <span className="font-semibold text-primary dark:text-white">{category.name}</span>
          </div>

          <div className="relative mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:items-start">
            <div className="space-y-4">
              <h1 className="text-35 font-extrabold leading-tight text-primary dark:text-white sm:text-48 lg:text-[3.3rem]">
                {category.name}
                <span className="ml-3 inline-block text-secondary">courses and pathways</span>
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                {truncateText(category.description, 220) ||
                  `Discover course options, compare formats, and shortlist the best-fit pathway inside ${category.name}.`}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.6rem] border border-white/60 bg-white/80 p-5 shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Category Snapshot
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary dark:bg-white/10 dark:text-white">
                    <p className="text-2xl font-black">{courses.length}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em]">Total</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/15 p-3 text-primary dark:bg-secondary/10 dark:text-secondary">
                    <p className="text-2xl font-black">{filteredCourses.length}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em]">Filtered</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/60 bg-[linear-gradient(135deg,rgba(23,30,76,0.96),rgba(48,216,201,0.72))] p-5 text-white shadow-[0_24px_60px_rgba(10,24,58,0.10)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
                  Smart Flow
                </p>
                <p className="mt-3 text-sm leading-7 text-white/85">
                  Use filters to narrow by state, level, and mode, then open a card to explore related colleges for that course.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-primary/10 bg-white/90 p-5 shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-6">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className={filterClassName}>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className={filterClassName}>
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} className={filterClassName}>
              {modeOptions.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>

            <label className="flex h-12 items-center gap-3 rounded-xl border border-primary/10 bg-white/90 px-4 text-sm text-primary shadow-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-white">
              <input
                type="checkbox"
                checked={popularOnly}
                onChange={(e) => setPopularOnly(e.target.checked)}
                className="h-4 w-4 rounded border-primary/20"
              />
              Popular courses only
            </label>

            <button
              onClick={resetFilters}
              className="h-12 rounded-xl border border-primary bg-white text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white dark:bg-transparent dark:text-secondary"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <Link
              key={course.slug ?? `${course.name}-${index}`}
              href={`/course/${category.slug}/${course.slug}`}
              className="group relative overflow-hidden rounded-[1.8rem] border border-primary/10 bg-white/90 p-6 shadow-[0_22px_55px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_28px_65px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:bg-white/10 dark:text-secondary">
                  {course.degreeLevel}
                </span>
                {course.popular && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    Popular
                  </span>
                )}
              </div>

              <div className="mt-5">
                <h3 className="text-24 font-extrabold text-primary transition-colors duration-300 group-hover:text-secondary dark:text-white">
                  {course.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {truncateText(course.specialization, 110) || "Explore curriculum and college options for this course."}
                </p>
              </div>

              <div className="mt-5 grid gap-3 rounded-[1.3rem] bg-slate-50 p-4 text-sm dark:bg-white/5">
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Icon icon="mdi:clock-outline" className="h-4 w-4 text-secondary" />
                  {course.duration} • {course.mode}
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Icon icon="mdi:currency-inr" className="h-4 w-4 text-secondary" />
                  {formatFees(course.feesRange)}
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Icon icon="mdi:map-marker-outline" className="h-4 w-4 text-secondary" />
                  {course.states.join(", ")}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-primary/10 pt-4 text-sm font-semibold text-primary dark:border-white/10 dark:text-secondary">
                <span>View Colleges</span>
                <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                  Open
                  <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-primary/10 bg-white/90 px-6 py-12 text-center shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              No Match Found
            </p>
            <h3 className="mt-3 text-28 font-extrabold text-primary dark:text-white">
              Try different filters for better results
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              We could not find courses for the selected filters. Reset filters or select a broader state, level, or mode.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
