"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { getAllScholarships } from "@/app/api/Scholarship";
import EduLoader from "@/components/Common/EduLoader";

const ALL = {
  type: "All Types",
  level: "All Levels",
  providerType: "All Providers",
  mode: "All Modes",
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

export default function ScholarshipsSection() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(ALL.type);
  const [levelFilter, setLevelFilter] = useState(ALL.level);
  const [providerTypeFilter, setProviderTypeFilter] = useState(ALL.providerType);
  const [modeFilter, setModeFilter] = useState(ALL.mode);

  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------ */
  /* FETCH SCHOLARSHIPS                               */
  /* ------------------------------------------------ */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await getAllScholarships(page, limit);

      // Keep compatibility with both legacy and new API response shapes.
      const scholarshipList =
        (Array.isArray(res?.data) && res.data) ||
        (Array.isArray(res?.data?.data) && res.data.data) ||
        [];

      const pages =
        Number(res?.totalPages) ||
        Number(res?.pagination?.totalPages) ||
        Number(res?.data?.pagination?.totalPages) ||
        1;

      setScholarships(scholarshipList);
      setTotalPages(pages > 0 ? pages : 1);

      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  /* ------------------------------------------------ */
  /* CREATE FILTER OPTIONS FROM API DATA              */
  /* ------------------------------------------------ */

  const scholarshipTypes = useMemo(
    () =>
      Array.from(
        new Set(
          scholarships
            .map((item) => String(item.scholarshipType || "").trim())
            .filter(Boolean)
        )
      ),
    [scholarships]
  );

  const levels = useMemo(
    () =>
      Array.from(
        new Set(
          scholarships
            .map((item) => String(item.level || "").trim())
            .filter(Boolean)
        )
      ),
    [scholarships]
  );

  const providerTypes = useMemo(
    () =>
      Array.from(
        new Set(
          scholarships
            .map((item) => String(item.provider || "").trim())
            .filter(Boolean)
        )
      ),
    [scholarships]
  );

  const modes = useMemo(
    () =>
      Array.from(
        new Set(
          scholarships
            .map((item) => String(item.applicationMode || "").trim())
            .filter(Boolean)
        )
      ),
    [scholarships]
  );

  /* ------------------------------------------------ */
  /* FILTER LOGIC                                     */
  /* ------------------------------------------------ */

  const filteredScholarships = useMemo<any[]>(() => {
    const query = searchQuery.trim().toLowerCase();

    return scholarships.filter((item) => {
      const typeMatch =
        typeFilter === ALL.type ||
        String(item.scholarshipType || "").toLowerCase() === typeFilter.toLowerCase();

      const levelMatch =
        levelFilter === ALL.level ||
        String(item.level || "").toLowerCase() === levelFilter.toLowerCase();

      const providerMatch =
        providerTypeFilter === ALL.providerType ||
        String(item.provider || "").toLowerCase() === providerTypeFilter.toLowerCase();

      const modeMatch =
        modeFilter === ALL.mode ||
        String(item.applicationMode || "").toLowerCase() === modeFilter.toLowerCase();

      if (!query) {
        return typeMatch && levelMatch && providerMatch && modeMatch;
      }

      const searchMatch =
        item.name?.toLowerCase().includes(query) ||
        item.provider?.toLowerCase().includes(query) ||
        item.overview?.toLowerCase().includes(query);

      return typeMatch && levelMatch && providerMatch && modeMatch && searchMatch;
    });
  }, [
    scholarships,
    searchQuery,
    typeFilter,
    levelFilter,
    providerTypeFilter,
    modeFilter,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setTypeFilter(ALL.type);
    setLevelFilter(ALL.level);
    setProviderTypeFilter(ALL.providerType);
    setModeFilter(ALL.mode);
    setPage(1);
  };

  const pageItems = getVisiblePageItems(page, totalPages);
  const currentTotalLabel = `${filteredScholarships.length} scholarship${filteredScholarships.length === 1 ? "" : "s"}`;

  const handleFilterChange = <T extends string>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_34%,#f1faf8_100%)] py-16 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)] sm:py-20"
    >
      {/* bg blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute -right-16 bottom-16 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        {/* ── HEADER ── */}
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-primary/10 bg-white/85 p-6 text-center shadow-[0_28px_75px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_31%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-4 inline-flex h-9 items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-secondary">
              <Icon icon="solar:medal-ribbons-star-bold-duotone" className="h-4 w-4" />
            Scholarship Discovery
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary dark:text-white md:text-5xl">
              Explore <span className="text-secondary">Scholarships</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Discover scholarships by eligibility, funding type, provider, and application mode with a cleaner browse flow.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-6 rounded-[1.8rem] border border-primary/10 bg-white/90 p-5 shadow-[0_22px_56px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-6"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Browse by Scholarship Details</p>
                <h3 className="mt-1 text-lg font-bold text-primary dark:text-white">Scholarship Filters</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 ring-1 ring-primary/10 dark:bg-slate-900/70 dark:text-slate-300">
                  Showing {currentTotalLabel}
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
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300" htmlFor="scholarship-search-filter">
                Search
              </label>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:magnify" className="h-4 w-4 text-secondary" />
                <input
                  id="scholarship-search-filter"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search scholarship, provider..."
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary placeholder:text-slate-400 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => handleFilterChange(setTypeFilter, e.target.value)}
                  className={filterClassName}
                >
                  <option>{ALL.type}</option>
                  {scholarshipTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Level</label>
                <select
                  value={levelFilter}
                  onChange={(e) => handleFilterChange(setLevelFilter, e.target.value)}
                  className={filterClassName}
                >
                  <option>{ALL.level}</option>
                  {levels.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Provider</label>
                <select
                  value={providerTypeFilter}
                  onChange={(e) => handleFilterChange(setProviderTypeFilter, e.target.value)}
                  className={filterClassName}
                >
                  <option>{ALL.providerType}</option>
                  {providerTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Mode</label>
                <select
                  value={modeFilter}
                  onChange={(e) => handleFilterChange(setModeFilter, e.target.value)}
                  className={filterClassName}
                >
                  <option>{ALL.mode}</option>
                  {modes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
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

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <EduLoader overlay={false} message="Loading scholarships…" />
          </div>
        )}

        {/* CARDS */}
        {!loading && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredScholarships.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.24), ease: "easeOut" }}
                className="h-full"
              >
                <Link
                  href={`/scholarships/${item.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_28px_64px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

                  <span className="self-start rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                    {item.level}
                  </span>

                  <h3 className="mt-3 min-h-[3.5rem] text-xl font-bold text-primary dark:text-white">
                    {item.name}
                  </h3>

                  <p className="mt-2 min-h-[2.5rem] line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {item.overview}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <p className="flex items-center gap-2">
                      <Icon icon="mdi:office-building-outline" className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.provider}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Icon icon="mdi:currency-inr" className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.amount}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Icon icon="mdi:calendar-month-outline" className="h-4 w-4 shrink-0" />
                      <span className="truncate">Deadline: {item.importantDates?.applicationEnd}</span>
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-1 border-t border-primary/10 pt-4 text-sm font-semibold text-primary dark:border-white/10" style={{ marginTop: "auto", paddingTop: "1rem" }}>
                    View Details
                    <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}


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

        {!loading && filteredScholarships.length === 0 && (
          <div className="mt-8 rounded-[2rem] border border-primary/10 bg-white/90 px-6 py-12 text-center text-gray-500 shadow-[0_24px_60px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:text-gray-400">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              No Match Found
            </p>
            <h3 className="mt-3 text-28 font-extrabold text-primary dark:text-white">
              Try broader filters
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              No scholarships match your current filters. Reset and search with a broader keyword.
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
    </motion.section>
  );
}