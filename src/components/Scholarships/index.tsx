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

  /* ------------------------------------------------ */
  /* FETCH SCHOLARSHIPS                               */
  /* ------------------------------------------------ */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAllScholarships();
      setScholarships(data);
      setLoading(false);
    };

    fetchData();
  }, []);

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
    <section className="relative min-h-screen overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-slate-950">

      <div className="container mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow-sm dark:border-primary/35 dark:bg-slate-800">
            <Icon icon="mdi:gift-outline" className="w-4 h-4" />
            Scholarship Discovery
          </span>

          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
            Explore <span className="text-primary">Scholarships</span>
          </h2>

          <p className="mt-3 text-base font-medium text-gray-500 dark:text-gray-400">
            Discover scholarships by eligibility, funding type, provider, and stream.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <div className="flex items-center px-4 h-12 rounded-xl border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search scholarship, provider..."
              className="bg-transparent w-full text-gray-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.type}</option>
            {scholarshipTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.level}</option>
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={providerTypeFilter}
            onChange={(e) => setProviderTypeFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.providerType}</option>
            {providerTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="h-11 px-3 rounded-lg border bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-100"
          >
            <option>{ALL.mode}</option>
            {modes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button
            onClick={resetFilters}
            className="h-11 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white"
          >
            Reset Filters
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Loading scholarships...
          </div>
        )}

        {/* CARDS */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredScholarships.map((item) => (
              <Link
                key={item.slug}
                href={`/scholarships/${item.slug}`}
                className="group p-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {item.level}
                </span>

                <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
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

                <div className="mt-5 flex items-center gap-1 border-t border-gray-200 dark:border-slate-700 pt-4 text-sm font-semibold text-primary">
                  View Details
                  <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                </div>
              </Link>
            ))}
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