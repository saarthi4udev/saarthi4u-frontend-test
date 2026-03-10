"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { CourseCategory, DiscoveryCourse, DegreeLevel } from "@/types/courseDiscovery";
import { formatFees } from "@/app/api/courseDiscovery";

type Props = {
  category: CourseCategory;
  courses: DiscoveryCourse[];
};

const ALL_STATES = "All States";
const ALL_LEVELS = "All Levels";
const ALL_MODES = "All Modes";

export default function CategoryCoursesView({ category, courses }: Readonly<Props>) {
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
      ...Array.from(new Set(courses.map((course) => course.degreeLevel as DegreeLevel))),
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

  return (
    <section className="py-16 bg-white dark:bg-midnight_text min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-sm mb-8 text-muted">
          <Link href="/course" className="hover:text-primary">
            Categories
          </Link>
          <Icon icon="mdi:chevron-right" />
          <span className="text-midnight_text dark:text-white">{category.name}</span>
        </div>

        <div className="mb-10">
          <h1 className="text-40 font-semibold">
            {category.name} <span className="text-primary">Courses</span>
          </h1>
          <p className="text-muted mt-3 max-w-3xl">{category.description}</p>
        </div>

        <div className="interactive-surface grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 p-4 border rounded-2xl dark:border-slate-800 mb-10 bg-white dark:bg-darkmode">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="interactive-control h-11 px-3 border rounded-lg dark:bg-darkheader dark:border-slate-700"
          >
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="interactive-control h-11 px-3 border rounded-lg dark:bg-darkheader dark:border-slate-700"
          >
            {levelOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="interactive-control h-11 px-3 border rounded-lg dark:bg-darkheader dark:border-slate-700"
          >
            {modeOptions.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>

          <label className="interactive-control h-11 px-3 border rounded-lg dark:bg-darkheader dark:border-slate-700 flex items-center gap-3 text-sm text-midnight_text dark:text-white">
            <input
              type="checkbox"
              checked={popularOnly}
              onChange={(e) => setPopularOnly(e.target.checked)}
              className="w-4 h-4"
            />
            Popular courses
          </label>

          <button
            onClick={() => {
              setStateFilter(ALL_STATES);
              setLevelFilter(ALL_LEVELS);
              setModeFilter(ALL_MODES);
              setPopularOnly(false);
            }}
            className="h-11 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/course/${category.slug}/${course.slug}`}
              className="interactive-surface group border rounded-2xl p-6 bg-white dark:bg-darkmode dark:border-slate-800 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {course.degreeLevel}
                </span>
                {course.popular && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Popular
                  </span>
                )}
              </div>

              <h3 className="text-20 font-semibold text-midnight_text dark:text-white mb-2">
                {course.name}
              </h3>
              <p className="text-sm text-muted mb-4">{course.specialization}</p>

              <div className="space-y-2 text-sm text-muted dark:text-slate-300">
                <p className="flex items-center gap-2">
                  <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                  {course.duration} • {course.mode}
                </p>
                <p className="flex items-center gap-2">
                  <Icon icon="mdi:currency-inr" className="w-4 h-4" />
                  {formatFees(course.feesRange)}
                </p>
                <p className="flex items-center gap-2">
                  <Icon icon="mdi:map-marker-outline" className="w-4 h-4" />
                  {course.states.join(", ")}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t dark:border-slate-700 text-primary text-sm font-medium flex items-center gap-1">
                View Colleges <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-muted">
            No courses found for the selected filters.
          </div>
        )}
      </div>
    </section>
  );
}
