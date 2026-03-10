"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  getAllExams,
  getUniqueExamFilters,
  formatFeeRange,
} from "@/app/api/exam";

const ALL = {
  category: "All Categories",
  level: "All Levels",
  body: "All Bodies",
  mode: "All Modes",
  frequency: "All Frequencies",
  stream: "All Streams",
};

export default function ExamsSection() {

  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    async function loadExams() {
      const data = await getAllExams();
      setExams(data);
    }

    loadExams();
  }, []);

  const { categories, levels, bodies, modes, frequencies, streams } =
    getUniqueExamFilters(exams);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(ALL.category);
  const [levelFilter, setLevelFilter] = useState(ALL.level);
  const [bodyFilter, setBodyFilter] = useState(ALL.body);
  const [modeFilter, setModeFilter] = useState(ALL.mode);
  const [frequencyFilter, setFrequencyFilter] = useState(ALL.frequency);
  const [streamFilter, setStreamFilter] = useState(ALL.stream);
  const [popularOnly, setPopularOnly] = useState(false);

  const filteredExams = useMemo(() => {

    const query = searchQuery.trim().toLowerCase();

    return exams.filter((exam) => {

      const categoryMatch =
        categoryFilter === ALL.category ||
        (exam.category ?? "").toLowerCase() === categoryFilter.toLowerCase();

      const levelMatch =
        levelFilter === ALL.level ||
        (exam.level ?? "").toLowerCase() === levelFilter.toLowerCase();

      const bodyMatch =
        bodyFilter === ALL.body ||
        (exam.conductingBody ?? "").toLowerCase() === bodyFilter.toLowerCase();

      const modeMatch =
        modeFilter === ALL.mode ||
        (exam.examMode ?? "").toLowerCase() === modeFilter.toLowerCase();

      const frequencyMatch =
        frequencyFilter === ALL.frequency ||
        (exam.frequency ?? "").toLowerCase() === frequencyFilter.toLowerCase();

      const streamMatch =
        streamFilter === ALL.stream ||
        (exam.stream ?? "").toLowerCase() === streamFilter.toLowerCase();

      const popularMatch = !popularOnly || exam.popular;

      if (!query) {
        return (
          categoryMatch &&
          levelMatch &&
          bodyMatch &&
          modeMatch &&
          frequencyMatch &&
          streamMatch &&
          popularMatch
        );
      }

      const searchMatch =
        (exam.name ?? "").toLowerCase().includes(query) ||
        (exam.category ?? "").toLowerCase().includes(query) ||
        (exam.conductingBody ?? "").toLowerCase().includes(query) ||
        (exam.acceptedFor ?? []).some((item: string) =>
          item.toLowerCase().includes(query)
        );

      return (
        categoryMatch &&
        levelMatch &&
        bodyMatch &&
        modeMatch &&
        frequencyMatch &&
        streamMatch &&
        popularMatch &&
        searchMatch
      );

    });

  }, [
    exams,
    bodyFilter,
    categoryFilter,
    frequencyFilter,
    levelFilter,
    modeFilter,
    popularOnly,
    searchQuery,
    streamFilter,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter(ALL.category);
    setLevelFilter(ALL.level);
    setBodyFilter(ALL.body);
    setModeFilter(ALL.mode);
    setFrequencyFilter(ALL.frequency);
    setStreamFilter(ALL.stream);
    setPopularOnly(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-slate-950">

      <div className="container mx-auto px-4 sm:px-6">

        {/* SEARCH */}
        <div className="mb-6">
          <div className="flex items-center px-4 h-12 rounded-xl border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam, category, body..."
              className="bg-transparent w-full text-gray-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4 mb-10 rounded-2xl border shadow-sm bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.category}</option>
            {categories.map((item, index) => (
              <option key={`cat-${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.level}</option>
            {levels.map((item, index) => (
              <option key={`level-${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={bodyFilter}
            onChange={(e) => setBodyFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.body}</option>
            {bodies.map((item, index) => (
              <option key={`body-${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.mode}</option>
            {modes.map((item, index) => (
              <option key={`mode-${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.frequency}</option>
            {frequencies.map((item, index) => (
              <option key={`freq-${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.stream}</option>
            {streams.map((item, index) => (
              <option key={`stream-${item}-${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-3 h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100">
            <input
              type="checkbox"
              checked={popularOnly}
              onChange={(e) => setPopularOnly(e.target.checked)}
              className="w-4 h-4"
            />
            Popular Exams
          </label>

          <button
            onClick={resetFilters}
            className="h-11 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white"
          >
            Reset Filters
          </button>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredExams.map((exam) => (

            <Link
              key={exam.slug ?? exam.id}
              href={`/exam/${exam.slug}`}
className="group p-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm"
          >

              <div className="flex items-start justify-between mb-4">

                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {exam.level}
                </span>

                {exam.popular && (
                  <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-semibold text-green-700 dark:text-green-300">
                    Popular
                  </span>
                )}

              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {exam.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {exam.overview}
              </p>

              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">

                <p className="flex items-center gap-2">
                  <Icon icon="mdi:office-building-outline" className="w-4 h-4" />
                  {exam.conductingBody}
                </p>

                <p className="flex items-center gap-2">
                  <Icon icon="mdi:refresh" className="w-4 h-4" />
                  {exam.frequency} • {exam.examMode}
                </p>

                <p className="flex items-center gap-2">
                  <Icon icon="mdi:currency-inr" className="w-4 h-4" />
                  Application Fee: {formatFeeRange(exam.applicationFee)}
                </p>

              </div>

            </Link>

          ))}

        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No exams found for selected filters.
          </div>
        )}

      </div>
    </section>
  );
}