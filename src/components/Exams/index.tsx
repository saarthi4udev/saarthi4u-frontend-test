"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import {
  formatFeeRange,
  getAllExams,
  getUniqueExamFilters,
} from "@/app/api/exam";

const ALL = {
  category: "All Categories",
  level: "All Levels",
  body: "All Bodies",
  mode: "All Modes",
  frequency: "All Frequencies",
  stream: "All Streams",
};

const filterClassName =
  "h-12 rounded-xl border border-primary/10 bg-white/90 px-4 text-sm text-primary shadow-sm transition-all duration-200 hover:border-secondary/35 focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white";

function truncateText(value?: string, maxLength = 120) {
  const safeValue = (value ?? "").trim();

  if (safeValue.length <= maxLength) {
    return safeValue;
  }

  return `${safeValue.slice(0, maxLength).trimEnd()}...`;
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export default function ExamsSection() {
  const [exams, setExams] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(ALL.category);
  const [levelFilter, setLevelFilter] = useState(ALL.level);
  const [bodyFilter, setBodyFilter] = useState(ALL.body);
  const [modeFilter, setModeFilter] = useState(ALL.mode);
  const [frequencyFilter, setFrequencyFilter] = useState(ALL.frequency);
  const [streamFilter, setStreamFilter] = useState(ALL.stream);
  const [popularOnly, setPopularOnly] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadExams() {
      const res = await getAllExams(page, limit);
      console.log("API RESPONSE:", res);
      setExams(res.data || []);
      setTotalPages(res.totalPages || 1);
    }

    loadExams();
  }, [page]);

  const { categories, levels, bodies, modes, frequencies, streams } =
    getUniqueExamFilters(exams);

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
        (exam.stream ?? "").toLowerCase().includes(query) ||
        toArray(exam.acceptedFor).some((item) => item.toLowerCase().includes(query));

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
    bodyFilter,
    categoryFilter,
    exams,
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_34%,#f0fdfa_100%)] py-16 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_40%,#05111b_100%)] sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] overflow-hidden">
        <div className="animate-gradient-shift absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="animate-float absolute right-[-4rem] top-8 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/85 p-6 shadow-[0_30px_80px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.10),transparent_32%)]" />
          <div className="relative space-y-4 text-center sm:text-left">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Exam Explorer
            </div>
            <h1 className="text-35 font-extrabold leading-tight text-primary dark:text-white sm:text-48 lg:text-[3.4rem]">
              Explore exams faster,
              <span className="ml-3 inline-block text-secondary">decide smarter</span>
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              Find the right entrance exam by level, body, stream, and mode with a cleaner layout designed for quick scanning.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[1.8rem] border border-primary/10 bg-white/90 p-5 shadow-[0_22px_56px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-primary/10 bg-white px-4 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
              <Icon icon="mdi:magnify" className="h-5 w-5 text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exam, category, body, stream..."
                className="w-full bg-transparent text-sm text-primary placeholder:text-slate-400 focus:outline-none dark:text-white"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={filterClassName}>
                <option>{ALL.category}</option>
                {categories.map((item, index) => (
                  <option key={`cat-${item}-${index}`} value={item}>{item}</option>
                ))}
              </select>
              <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className={filterClassName}>
                <option>{ALL.level}</option>
                {levels.map((item, index) => (
                  <option key={`level-${item}-${index}`} value={item}>{item}</option>
                ))}
              </select>
              <select value={streamFilter} onChange={(e) => setStreamFilter(e.target.value)} className={filterClassName}>
                <option>{ALL.stream}</option>
                {streams.map((item, index) => (
                  <option key={`stream-${item}-${index}`} value={item}>{item}</option>
                ))}
              </select>
              <select value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)} className={filterClassName}>
                <option>{ALL.body}</option>
                {bodies.map((item, index) => (
                  <option key={`body-${item}-${index}`} value={item}>{item}</option>
                ))}
              </select>
              <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} className={filterClassName}>
                <option>{ALL.mode}</option>
                {modes.map((item, index) => (
                  <option key={`mode-${item}-${index}`} value={item}>{item}</option>
                ))}
              </select>
              <select value={frequencyFilter} onChange={(e) => setFrequencyFilter(e.target.value)} className={filterClassName}>
                <option>{ALL.frequency}</option>
                {frequencies.map((item, index) => (
                  <option key={`freq-${item}-${index}`} value={item}>{item}</option>
                ))}
              </select>
              <label className="flex h-12 items-center gap-3 rounded-xl border border-primary/10 bg-white/90 px-4 text-sm text-primary shadow-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-white">
                <input
                  type="checkbox"
                  checked={popularOnly}
                  onChange={(e) => setPopularOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-primary/20"
                />
                Popular only
              </label>
              <button
                onClick={resetFilters}
                className="h-12 rounded-xl border border-primary bg-white text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white dark:bg-transparent dark:text-secondary"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredExams.map((exam, index) => (
            <Link
              key={exam.slug ?? exam.id ?? `${exam.name}-${index}`}
              href={`/exam/${exam.slug}`}
              className="group relative overflow-hidden rounded-[1.8rem] border border-primary/10 bg-white/90 p-6 shadow-[0_22px_55px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_28px_65px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:bg-white/10 dark:text-secondary">
                    {exam.level || "Exam"}
                  </span>
                  {exam.category && (
                    <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:bg-secondary/10 dark:text-secondary">
                      {exam.category}
                    </span>
                  )}
                </div>

                {exam.popular && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    Popular
                  </span>
                )}
              </div>

              <div className="mt-5">
                <h3 className="text-24 font-extrabold text-primary transition-colors duration-300 group-hover:text-secondary dark:text-white">
                  {exam.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {truncateText(exam.overview, 120) || "Open the exam page for eligibility, dates, and application process."}
                </p>
              </div>

              <div className="mt-5 grid gap-3 rounded-[1.3rem] bg-slate-50 p-4 text-sm dark:bg-white/5">
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Icon icon="mdi:office-building-outline" className="h-4 w-4 text-secondary" />
                  {exam.conductingBody || "Body pending"}
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Icon icon="mdi:refresh" className="h-4 w-4 text-secondary" />
                  {exam.frequency || "Schedule TBA"} • {exam.examMode || "Mode TBA"}
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Icon icon="mdi:currency-inr" className="h-4 w-4 text-secondary" />
                  Application Fee: {formatFeeRange(exam.applicationFee)}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-primary/10 pt-4 text-sm font-semibold text-primary dark:border-white/10 dark:text-secondary">
                <span>Explore Exam</span>
                <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                  Open
                  <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-primary/20 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg border ${page === i + 1
                    ? "bg-primary text-white"
                    : "border-primary/20"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-primary/20 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}



        {filteredExams.length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-primary/10 bg-white/90 px-6 py-12 text-center shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              No Match Found
            </p>
            <h3 className="mt-3 text-28 font-extrabold text-primary dark:text-white">
              Try broader filters
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              No exams match your current filters. Reset and search with a broader keyword.
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
