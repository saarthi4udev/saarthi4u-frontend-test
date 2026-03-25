"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
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

  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadExams() {
      const res = await getAllExams(page, limit);
      setExams(res.data || []);
      setTotalPages(res.totalPages || 1);
    }

    loadExams();
  }, [page]);

  useEffect(() => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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

      if (!query) {
        return (
          categoryMatch &&
          levelMatch &&
          bodyMatch &&
          modeMatch &&
          frequencyMatch &&
          streamMatch
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
    setPage(1);
  };

  const pageItems = getVisiblePageItems(page, totalPages);
  const currentTotalLabel = `${filteredExams.length} exam${filteredExams.length === 1 ? "" : "s"}`;

  const handleFilterChange = <T extends string>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_34%,#f1faf8_100%)] py-16 transition-colors dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)] sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-6 overflow-hidden rounded-lg border border-primary/10 bg-white/85 p-4 text-center shadow-md backdrop-blur sm:rounded-2xl sm:p-6 md:rounded-[2rem] md:p-8 lg:p-10 dark:border-white/10 dark:bg-slate-900/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_31%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FAFA33]/45 bg-[#FAFA33]/20 px-3 py-1.5 text-10 font-semibold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-[#FAFA33]/30 dark:text-primary sm:mb-4 sm:px-4 sm:py-2 sm:text-xs">
              <Icon icon="mdi:file-document-outline" className="h-3 w-3 sm:h-4 sm:w-4" />
              Exam Discovery
            </span>
            <h2 className="text-24 font-extrabold text-primary dark:text-white sm:text-28 md:text-35 lg:text-40">
              Explore <span className="text-secondary">Exams</span>
            </h2>
            <p className="mt-2 text-13 font-medium leading-6 text-slate-600 dark:text-slate-300 sm:mt-3 sm:text-14 md:text-16">
              Filter exams by category, level, stream, and conducting body to shortlist faster.
            </p>
          </div>
        </div>

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
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Browse by Exam Details</p>
                <h3 className="mt-1 text-lg font-bold text-primary dark:text-white">Exam Filters</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 ring-1 ring-primary/10 dark:bg-slate-900/70 dark:text-slate-300">
                  Showing {currentTotalLabel} on this page
                </div>
                <button
                  onClick={resetFilters}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-primary/15 bg-primary/5 px-3 text-xs font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
                >
                  <Icon icon="solar:restart-bold-duotone" className="text-sm text-secondary" />
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300" htmlFor="exam-search-filter">
                Search
              </label>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:magnify" className="h-4 w-4 text-secondary" />
                <input
                  id="exam-search-filter"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search exam, category, body, stream..."
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary placeholder:text-slate-400 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
              {categories.length > 0 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => handleFilterChange(setCategoryFilter, e.target.value)}
                    className={filterClassName}
                  >
                    <option>{ALL.category}</option>
                    {categories.map((item, index) => (
                      <option key={`cat-${item}-${index}`} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}

              {levels.length > 0 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Level</label>
                  <select
                    value={levelFilter}
                    onChange={(e) => handleFilterChange(setLevelFilter, e.target.value)}
                    className={filterClassName}
                  >
                    <option>{ALL.level}</option>
                    {levels.map((item, index) => (
                      <option key={`level-${item}-${index}`} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}

              {streams.length > 0 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Stream</label>
                  <select
                    value={streamFilter}
                    onChange={(e) => handleFilterChange(setStreamFilter, e.target.value)}
                    className={filterClassName}
                  >
                    <option>{ALL.stream}</option>
                    {streams.map((item, index) => (
                      <option key={`stream-${item}-${index}`} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}

              {bodies.length > 0 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Conducting Body</label>
                  <select
                    value={bodyFilter}
                    onChange={(e) => handleFilterChange(setBodyFilter, e.target.value)}
                    className={filterClassName}
                  >
                    <option>{ALL.body}</option>
                    {bodies.map((item, index) => (
                      <option key={`body-${item}-${index}`} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}

              {modes.length > 0 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Mode</label>
                  <select
                    value={modeFilter}
                    onChange={(e) => handleFilterChange(setModeFilter, e.target.value)}
                    className={filterClassName}
                  >
                    <option>{ALL.mode}</option>
                    {modes.map((item, index) => (
                      <option key={`mode-${item}-${index}`} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}

              {frequencies.length > 0 && (
                <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Frequency</label>
                  <select
                    value={frequencyFilter}
                    onChange={(e) => handleFilterChange(setFrequencyFilter, e.target.value)}
                    className={filterClassName}
                  >
                    <option>{ALL.frequency}</option>
                    {frequencies.map((item, index) => (
                      <option key={`freq-${item}-${index}`} value={item}>{item}</option>
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
                Page {page} of {Math.max(totalPages, 1)}
              </p>
            </div>
          </div>
        </motion.div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6"
        >
          {filteredExams.length === 0 && (
            <div className="col-span-full mt-1 rounded-[2rem] border border-primary/10 bg-white/90 px-6 py-12 text-center shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
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

          {filteredExams.map((exam, index) => (
            <motion.div
              key={exam.slug ?? exam.id ?? `${exam.name}-${index}`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.24), ease: "easeOut" }}
            >
              <Link
                href={`/exam/${exam.slug}`}
                className="group relative block overflow-hidden rounded-[1.8rem] border border-primary/10 bg-white/90 p-6 shadow-[0_22px_55px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_28px_65px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
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
            </motion.div>
          ))}
        </div>

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
              onClick={() => setPage((prev) => prev - 1)}
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
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-white dark:hover:bg-primary sm:text-sm"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
