"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { getAllScholarships } from "@/app/api/Scholarship";

const ALL = {
  type: "All Types",
  level: "All Levels",
  providerType: "All Providers",
  stream: "All Streams",
  mode: "All Modes",
  state: "All States",
};

export default function ScholarshipsSection() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(ALL.type);
  const [levelFilter, setLevelFilter] = useState(ALL.level);
  const [providerTypeFilter, setProviderTypeFilter] = useState(ALL.providerType);
  const [streamFilter, setStreamFilter] = useState(ALL.stream);
  const [modeFilter, setModeFilter] = useState(ALL.mode);
  const [stateFilter, setStateFilter] = useState(ALL.state);
  const [popularOnly, setPopularOnly] = useState(false);
  const [renewableOnly, setRenewableOnly] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [pagination, setPagination] = useState<any>(null);

  /* ------------------------------------------------ */
  /* FETCH SCHOLARSHIPS                               */
  /* ------------------------------------------------ */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await getAllScholarships(page, limit);
      console.log("API RESPONSE",res)


      setScholarships(res.data || []);
      setPagination(res.totalPages);

      setLoading(false);
    };

    fetchData();
  }, [page]);

  /* ------------------------------------------------ */
  /* CREATE FILTER OPTIONS FROM API DATA              */
  /* ------------------------------------------------ */

  const scholarshipTypes = [...new Set(scholarships.map((s) => s.scholarshipType))];
  const levels = [...new Set(scholarships.map((s) => s.level))];
  const providerTypes = [...new Set(scholarships.map((s) => s.provider))];
  const streams: string[] = [];
  const modes = [...new Set(scholarships.map((s) => s.applicationMode))];
  const states: string[] = [];

  /* ------------------------------------------------ */
  /* FILTER LOGIC                                     */
  /* ------------------------------------------------ */

  const filteredScholarships = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return scholarships.filter((item) => {
      const typeMatch =
        typeFilter === ALL.type || item.scholarshipType === typeFilter;

      const levelMatch =
        levelFilter === ALL.level || item.level === levelFilter;

      const providerMatch =
        providerTypeFilter === ALL.providerType ||
        item.provider === providerTypeFilter;

      const modeMatch =
        modeFilter === ALL.mode || item.applicationMode === modeFilter;

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
    setStreamFilter(ALL.stream);
    setModeFilter(ALL.mode);
    setStateFilter(ALL.state);
    setPopularOnly(false);
    setRenewableOnly(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_34%,#f1faf8_100%)] py-16 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)] sm:py-20">
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

        {/* SEARCH */}
        <div className="mb-6 rounded-[1.8rem] border border-primary/10 bg-white/90 p-5 shadow-[0_22px_56px_rgba(10,24,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-6">
          <div className="flex h-12 items-center rounded-xl border border-primary/10 bg-white px-4 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
            <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search scholarship, provider..."
              className="w-full bg-transparent text-sm text-primary placeholder:text-slate-400 focus:outline-none dark:text-white"
            />
          </div>

          {/* FILTERS */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-12 rounded-xl border border-primary/10 bg-white px-4 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
            >
              <option>{ALL.type}</option>
              {scholarshipTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="h-12 rounded-xl border border-primary/10 bg-white px-4 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
            >
              <option>{ALL.level}</option>
              {levels.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={providerTypeFilter}
              onChange={(e) => setProviderTypeFilter(e.target.value)}
              className="h-12 rounded-xl border border-primary/10 bg-white px-4 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
            >
              <option>{ALL.providerType}</option>
              {providerTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="h-12 rounded-xl border border-primary/10 bg-white px-4 text-sm text-primary shadow-sm focus:border-secondary focus:outline-none dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
            >
              <option>{ALL.mode}</option>
              {modes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="h-12 rounded-xl border border-primary bg-white px-4 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white dark:bg-transparent dark:text-secondary"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Loading scholarships...
          </div>
        )}

        {/* CARDS */}
        {!loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredScholarships.map((item) => (
              <Link
                key={item.slug}
                href={`/scholarships/${item.slug}`}
                className="group relative overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_28px_64px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {item.level}
                </span>

                <h3 className="mt-3 text-xl font-bold text-primary dark:text-white">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {item.overview}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <Icon icon="mdi:office-building-outline" className="w-4 h-4" />
                    {item.provider}
                  </p>

                  <p className="flex items-center gap-2">
                    <Icon icon="mdi:currency-inr" className="w-4 h-4" />
                    {item.amount}
                  </p>

                  <p className="flex items-center gap-2">
                    <Icon icon="mdi:calendar-month-outline" className="w-4 h-4" />
                    Deadline: {item.importantDates?.applicationEnd}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1 border-t border-primary/10 pt-4 text-sm font-semibold text-primary dark:border-white/10">
                  View Details
                  <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        )}


        {pagination && (
          <div className="mt-10 flex items-center justify-center gap-3">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 dark:text-white"
            >
              Prev
            </button>

            <span className="text-sm font-semibold text-primary dark:text-white">
              Page {page} of {typeof pagination === "number" ? pagination : pagination?.totalPages || 1}
            </span>

            <button
              disabled={page === (typeof pagination === "number" ? pagination : pagination?.totalPages || 1)}
              onClick={() => setPage(page + 1)}
              className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 dark:text-white"
            >
              Next
            </button>

          </div>
        )}

        {!loading && filteredScholarships.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No scholarships found.
          </div>
        )}

      </div>
    </section>
  );
}