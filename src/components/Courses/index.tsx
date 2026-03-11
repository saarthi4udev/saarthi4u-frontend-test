// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import {
//   discoveryCourses,
//   getCategoriesWithStats,
// } from "@/app/api/courseDiscovery";



// import { DegreeLevel } from "@/types/courseDiscovery";

// const ALL_STATES = "All States";
// const ALL_LEVELS = "All Levels";
// const ALL_STREAMS = "All Streams";

// export default function CoursesSection() {
//   const [stateFilter, setStateFilter] = useState(ALL_STATES);
//   const [levelFilter, setLevelFilter] = useState(ALL_LEVELS);
//   const [streamFilter, setStreamFilter] = useState(ALL_STREAMS);
//   const [popularOnly, setPopularOnly] = useState(false);

//   const categories = getCategoriesWithStats();

//   const states = useMemo(
//     () => [
//       ALL_STATES,
//       ...Array.from(new Set(discoveryCourses.flatMap((course) => course.states))).sort(),
//     ],
//     [],
//   );

//   const levels = useMemo(
//     () => [
//       ALL_LEVELS,
//       ...Array.from(
//         new Set(discoveryCourses.map((course) => course.degreeLevel as DegreeLevel)),
//       ),
//     ],
//     [],
//   );

//   const streams = useMemo(
//     () => [
//       ALL_STREAMS,
//       ...Array.from(new Set(categories.map((category) => category.stream))),
//     ],
//     [categories],
//   );

//   const filteredCategories = useMemo(() => {
//     return categories.filter((category) => {
//       const matchingCourses = discoveryCourses.filter(
//         (course) => course.categorySlug === category.slug,
//       );

//       const hasFilteredCourses = matchingCourses.some((course) => {
//         const levelMatch =
//           levelFilter === ALL_LEVELS || course.degreeLevel === levelFilter;
//         const stateMatch =
//           stateFilter === ALL_STATES || course.states.includes(stateFilter);
//         const popularMatch = !popularOnly || course.popular;

//         return levelMatch && stateMatch && popularMatch;
//       });

//       const streamMatch =
//         streamFilter === ALL_STREAMS || category.stream === streamFilter;

//       return hasFilteredCourses && streamMatch;
//     });
//   }, [categories, levelFilter, popularOnly, stateFilter, streamFilter]);

//   return (
//     <section className="relative overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-slate-950">
//   <div className="pointer-events-none absolute inset-0 -z-10">
//     <div className="absolute -left-14 top-8 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
//     <div className="absolute -right-14 bottom-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
//   </div>

//   <div className="container mx-auto px-4 sm:px-6">

//     {/* HEADER */}
//     <div className="text-center max-w-3xl mx-auto mb-12">
//       <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors dark:border-primary/35 dark:bg-slate-800">
//         <Icon icon="mdi:shape-outline" className="w-4 h-4" />
//         Course Discovery
//       </span>

//       <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
//         Explore <span className="text-primary">Categories</span>
//       </h2>

//       <p className="mt-3 text-gray-500 dark:text-gray-400 text-base font-medium">
//         Find the right path from category to specialization and college.
//       </p>
//     </div>

//     {/* FILTER BAR */}
//     <div className="
//       grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 p-4 mb-10
//       rounded-2xl border shadow-sm
//       bg-gradient-to-r from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-900
//       border-gray-200 dark:border-slate-800
//       transition-all duration-300 hover:shadow-md
//     ">

//       {/* STATE */}
//       <select
//         value={stateFilter}
//         onChange={(e) => setStateFilter(e.target.value)}
//         className="
//           h-11 px-3 rounded-lg border
//           bg-white dark:bg-slate-800
//           border-gray-300 dark:border-slate-700
//           text-gray-800 dark:text-gray-100
//           focus:outline-none focus:ring-2 focus:ring-primary
//           transition-all duration-200 hover:border-primary/40
//         "
//       >
//         {states.map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>

//       {/* LEVEL */}
//       <select
//         value={levelFilter}
//         onChange={(e) => setLevelFilter(e.target.value)}
//         className="
//           h-11 px-3 rounded-lg border
//           bg-white dark:bg-slate-800
//           border-gray-300 dark:border-slate-700
//           text-gray-800 dark:text-gray-100
//           focus:outline-none focus:ring-2 focus:ring-primary
//           transition-all duration-200 hover:border-primary/40
//         "
//       >
//         {levels.map((level) => (
//           <option key={level} value={level}>
//             {level}
//           </option>
//         ))}
//       </select>

//       {/* STREAM */}
//       <select
//         value={streamFilter}
//         onChange={(e) => setStreamFilter(e.target.value)}
//         className="
//           h-11 px-3 rounded-lg border
//           bg-white dark:bg-slate-800
//           border-gray-300 dark:border-slate-700
//           text-gray-800 dark:text-gray-100
//           focus:outline-none focus:ring-2 focus:ring-primary
//           transition-all duration-200 hover:border-primary/40
//         "
//       >
//         {streams.map((stream) => (
//           <option key={stream} value={stream}>
//             {stream}
//           </option>
//         ))}
//       </select>

//       {/* POPULAR */}
//       <label className="
//         flex items-center gap-3 h-11 px-3 rounded-lg border text-sm
//         bg-white dark:bg-slate-800
//         border-gray-300 dark:border-slate-700
//         text-gray-800 dark:text-gray-100
//         transition-all duration-200 hover:border-primary/40
//       ">
//         <input
//           type="checkbox"
//           checked={popularOnly}
//           onChange={(e) => setPopularOnly(e.target.checked)}
//           className="w-4 h-4 accent-primary"
//         />
//         Popular Courses
//       </label>

//       {/* RESET */}
//       <button
//         onClick={() => {
//           setStateFilter(ALL_STATES);
//           setLevelFilter(ALL_LEVELS);
//           setStreamFilter(ALL_STREAMS);
//           setPopularOnly(false);
//         }}
//         className="
//           h-11 rounded-lg font-semibold
//           border border-primary text-primary
//           hover:bg-primary hover:text-white hover:-translate-y-0.5
//           transition-all duration-200
//         "
//       >
//         Reset Filters
//       </button>
//     </div>

//     {/* CATEGORY GRID */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {filteredCategories.map((category) => (
//         <Link
//           key={category.slug}
//           href={`/course/${category.slug}`}
//           className="
//             group p-6 rounded-2xl border
//             bg-white dark:bg-slate-900
//             border-gray-200 dark:border-slate-800
//             shadow-sm transition-all duration-300
//             hover:-translate-y-1 hover:shadow-xl hover:border-primary/40
//           "
//         >
//           <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-indigo-500/20 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-indigo-600 group-hover:text-white">
//             <Icon icon={category.icon} className="w-6 h-6" />
//           </div>

//           <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
//             {category.name}
//           </h3>

//           <p className="text-sm text-gray-500 dark:text-gray-400 min-h-10">
//             {category.description}
//           </p>

//           <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4 text-sm dark:border-slate-700">
//             <span className="text-gray-500 dark:text-gray-400">
//               {category.totalCourses} Courses
//             </span>
//             <span className="flex items-center gap-1 font-semibold text-primary">
//               Explore
//               <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
//             </span>
//           </div>
//         </Link>
//       ))}
//     </div>

//     {filteredCategories.length === 0 && (
//       <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//         No categories found for the selected filters.
//       </div>
//     )}

//   </div>
// </section>
//   );
// }


"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { discoveryCourses } from "@/app/api/courseDiscovery";
import { DegreeLevel } from "@/types/courseDiscovery";

const ALL_STATES = "All States";
const ALL_LEVELS = "All Levels";
const ALL_STREAMS = "All Streams";
const base = process.env.NEXT_PUBLIC_API_URL;

export default function CoursesSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [stateFilter, setStateFilter] = useState(ALL_STATES);
  const [levelFilter, setLevelFilter] = useState(ALL_LEVELS);
  const [streamFilter, setStreamFilter] = useState(ALL_STREAMS);
  const [popularOnly, setPopularOnly] = useState(false);

  // FETCH API CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${base}/category/all`);
        const result = await res.json();

        const formatted = result.data.map((cat: any) => ({
          id: cat.id,
          name: cat.name || "None",
          slug: cat.name
            ? cat.name.toLowerCase().replace(/\s+/g, "-")
            : "none",
          description: cat.description || "None",
          icon: "mdi:shape-outline",
          stream: cat.stream || "None",
          totalCourses: cat.totalCourses || "None",
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const states = useMemo(
    () => [
      ALL_STATES,
      ...Array.from(
        new Set(discoveryCourses.flatMap((course) => course.states))
      ).sort(),
    ],
    []
  );

  const levels = useMemo(
    () => [
      ALL_LEVELS,
      ...Array.from(
        new Set(
          discoveryCourses.map((course) => course.degreeLevel as DegreeLevel)
        )
      ),
    ],
    []
  );

  const streams = useMemo(
    () => [
      ALL_STREAMS,
      ...Array.from(new Set(categories.map((category) => category.stream))),
    ],
    [categories]
  );

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchingCourses = discoveryCourses.filter(
        (course) => course.categorySlug === category.slug
      );

      const hasFilteredCourses = matchingCourses.some((course) => {
        const levelMatch =
          levelFilter === ALL_LEVELS || course.degreeLevel === levelFilter;

        const stateMatch =
          stateFilter === ALL_STATES || course.states.includes(stateFilter);

        const popularMatch = !popularOnly || course.popular;

        return levelMatch && stateMatch && popularMatch;
      });

      const streamMatch =
        streamFilter === ALL_STREAMS || category.stream === streamFilter;

      return hasFilteredCourses && streamMatch;
    });
  }, [categories, levelFilter, popularOnly, stateFilter, streamFilter]);

  return (
    <section className="relative overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
            Explore <span className="text-primary">Categories</span>
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400 text-base font-medium">
            Find the right path from category to specialization and college.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 p-4 mb-10 rounded-2xl border shadow-sm bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">

          {/* STATE */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {/* LEVEL */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          {/* STREAM */}
          <select
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            {streams.map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </select>

          {/* POPULAR */}
          <label className="flex items-center gap-3 h-11 px-3 rounded-lg border text-sm bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100">
            <input
              type="checkbox"
              checked={popularOnly}
              onChange={(e) => setPopularOnly(e.target.checked)}
              className="w-4 h-4"
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
            }}
            className="h-11 rounded-lg font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Reset Filters
          </button>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/course/${category.slug}`}
              className="group p-6 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon icon={category.icon} className="w-6 h-6" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {category.name || "None"}
              </h3>

              <p
                className="text-sm text-gray-500 dark:text-gray-400 min-h-10"
                dangerouslySetInnerHTML={{
                  __html: category.description || "None",
                }}
              />

              <div className="mt-5 flex items-center justify-between border-t border-gray-200 dark:border-slate-700 pt-4 text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {category.totalCourses || "None"} Courses
                </span>

                <span className="flex items-center gap-1 font-semibold text-primary">
                  Explore
                  <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}

        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No categories found for the selected filters.
          </div>
        )}

      </div>
    </section>
  );
}