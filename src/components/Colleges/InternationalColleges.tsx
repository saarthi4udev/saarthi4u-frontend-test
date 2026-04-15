"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";
import { getAllInternationalColleges } from "@/app/api/colleges";
import { Icon } from "@iconify/react";
import EduLoader from "@/components/Common/EduLoader";
import { motion } from "motion/react";

/* --------------- CONSTANTS --------------- */

const ALL_LOCATIONS = "All Locations";
const ALL_COUNTRIES = "All Countries";
const ALL_CITIES = "All Cities";

const getCollegeLocationValues = (college: any) => {
  return Array.from(
    new Set(
      [college?.location, college?.city, college?.state, college?.country]
        .filter(Boolean)
        .flatMap((value) =>
          String(value)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
    )
  );
};

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

/* --------------- MAIN COMPONENT --------------- */

export default function InternationalColleges() {
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const [collegesData, setCollegesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  const countryOptions = useMemo(() => {
    const countries = collegesData
      .map((college) => college.country)
      .filter(Boolean);
    return [
      ALL_COUNTRIES,
      ...Array.from(new Set(countries)).sort((a, b) =>
        String(a).localeCompare(String(b))
      ),
    ];
  }, [collegesData]);

  const cityOptions = useMemo(() => {
    const cities = collegesData
      .map((college) => college.city)
      .filter(Boolean);
    return [
      ALL_CITIES,
      ...Array.from(new Set(cities)).sort((a, b) =>
        String(a).localeCompare(String(b))
      ),
    ];
  }, [collegesData]);

  const stateOptions = useMemo(() => {
    const values = collegesData.flatMap((college) =>
      getCollegeLocationValues(college)
    );
    return [
      ALL_LOCATIONS,
      ...Array.from(new Set(values)).sort((a, b) =>
        String(a).localeCompare(String(b))
      ),
    ];
  }, [collegesData]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const [filters, setFilters] = useState({
    state: ALL_LOCATIONS,
    country: ALL_COUNTRIES,
    city: ALL_CITIES,
  });


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setDebouncedSearch("");
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setSearching(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const res = await getAllInternationalColleges(1, 9999);

        const raw = res?.data || [];

        const normalized = raw.map((college: any) => {
          const locationStr = college?.location || "";
          const parts = locationStr.split(",").map((s: string) => s.trim());
          const city = parts[0] || "";
          const country = parts[1] || "";
          return {
            ...college,
            city,
            country,
            location: locationStr,
            description: college?.description || "",
            logo: college?.logo || "",
            type: college?.type || "College",
          };
        });

        setCollegesData(normalized);
      } catch (error) {
        console.error("Error fetching international colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    gridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  const handleReset = () => {
    setFilters({
      state: ALL_LOCATIONS,
      country: ALL_COUNTRIES,
      city: ALL_CITIES,
    });
    setSearchQuery("");
    setDebouncedSearch("");
    setSearching(false);
    setCurrentPage(1);
  };

  const filteredColleges = collegesData.filter((college) => {
    const selectedRegion = filters.state;
    const collegeLocations = getCollegeLocationValues(college);

    const locationMatch =
      selectedRegion === ALL_LOCATIONS ||
      collegeLocations.includes(selectedRegion);

    const countryMatch =
      filters.country === ALL_COUNTRIES ||
      college.country === filters.country;

    const cityMatch =
      filters.city === ALL_CITIES ||
      college.city === filters.city;

    const searchMatch =
      debouncedSearch === "" ||
      college.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      college.location?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      college.country?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      college.city?.toLowerCase().includes(debouncedSearch.toLowerCase());

    return locationMatch && countryMatch && cityMatch && searchMatch;
  });

  const filteredTotalPages = Math.max(1, Math.ceil(filteredColleges.length / limit));

  const displayedColleges = filteredColleges.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const currentTotalLabel = `${filteredColleges.length} college${filteredColleges.length === 1 ? "" : "s"}`;
  const pageItems = getVisiblePageItems(currentPage, filteredTotalPages);

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
        {/* HEADER */}
        <div className="relative mb-6 overflow-hidden rounded-lg border border-primary/10 bg-white/85 p-4 text-center shadow-md backdrop-blur sm:rounded-2xl sm:p-6 md:rounded-[2rem] md:p-8 lg:p-10 dark:border-white/10 dark:bg-slate-900/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_31%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FAFA33]/45 bg-[#FAFA33]/20 px-3 py-1.5 text-10 font-semibold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-[#FAFA33]/30 dark:text-primary sm:mb-4 sm:px-4 sm:py-2 sm:text-xs">
              <Icon icon="mdi:globe" className="w-3 h-3 sm:w-4 sm:h-4" />
              International Education
            </span>
            <h2 className="text-24 font-extrabold text-primary dark:text-white sm:text-28 md:text-35 lg:text-40">
              Explore <span className="text-secondary">International Colleges</span>
            </h2>
            <p className="mt-2 text-13 font-medium leading-6 text-slate-600 dark:text-slate-300 sm:mt-3 sm:text-14 md:text-16">
              Study abroad at world-class institutions. Filter by location, country, and program to find your perfect match.
            </p>
          </div>
        </div>

        {/* FILTERS SECTION - Simplified without toggle */}
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
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Browse by Destination</p>
                <h3 className="mt-1 text-lg font-bold text-primary dark:text-white">College Filters</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-stretch">
              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300" htmlFor="college-location-filter">Location</label>
                <select
                  id="college-location-filter"
                  value={filters.state}
                  onChange={(event) => {
                    setFilters((prev) => ({ ...prev, state: event.target.value }));
                    setCurrentPage(1);
                  }}
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary outline-none dark:text-white"
                >
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Country</label>
                <select
                  value={filters.country}
                  onChange={(event) => {
                    setFilters((prev) => ({ ...prev, country: event.target.value }));
                    setCurrentPage(1);
                  }}
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary outline-none dark:text-white"
                >
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">City</label>
                <select
                  value={filters.city}
                  onChange={(event) => {
                    setFilters((prev) => ({ ...prev, city: event.target.value }));
                    setCurrentPage(1);
                  }}
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary outline-none dark:text-white"
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-stretch xl:justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex h-full min-h-[4.4rem] w-full items-center justify-center gap-1.5 rounded-xl border border-primary/15 bg-primary/5 px-3 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white xl:w-[150px]"
                >
                  <Icon icon="solar:restart-bold-duotone" className="text-sm text-secondary" />
                  Reset Filters
                </button>
              </div>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative">
              <div className="flex items-center gap-2 rounded-xl border border-primary/10 bg-white px-3.5 py-2.5 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <Icon icon="solar:magnifer-linear" className="shrink-0 text-lg text-slate-400" />
                <input
                  type="text"
                  placeholder="Search colleges by name, location, or country…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent text-sm font-medium text-primary outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setDebouncedSearch("");
                      setSearching(false);
                    }}
                    className="shrink-0 rounded-full p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  >
                    <Icon icon="mdi:close" className="text-base" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3.5 py-2 text-sm dark:border-white/10 dark:bg-slate-950/60">
              <p className="font-semibold text-primary dark:text-white">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#FAFA33] align-middle" />
                Showing {currentTotalLabel} on this listing
              </p>
              <p className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-300">
                International Colleges
              </p>
            </div>
          </div>
        </motion.div>

        {/* COLLEGES GRID */}
        <div ref={gridRef} className="mb-8">
          {loading || searching ? (
            <div className="flex items-center justify-center py-20">
              <EduLoader overlay={false} message={searching ? "Searching colleges…" : "Loading colleges…"} />
            </div>
          ) : filteredColleges.length === 0 ? (
            <div className="rounded-2xl border border-primary/10 bg-white/95 px-6 py-16 text-center dark:border-white/10 dark:bg-slate-900/85">
              <Icon icon="mdi:globe" width="48" height="48" className="mx-auto text-slate-300 dark:text-slate-600" />
              <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">No colleges found</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} basePath="/international-colleges" />
                ))}
              </div>

              {filteredTotalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:opacity-50 dark:border-primary/30"
                  >
                    Previous
                  </button>

                  {pageItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (typeof item === "number") setCurrentPage(item);
                      }}
                      disabled={item === "..."}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        item === currentPage
                          ? "bg-primary text-white shadow-sm"
                          : item === "..."
                            ? "cursor-default text-slate-400"
                            : "border border-primary/25 bg-primary/5 text-primary hover:bg-primary/10"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(filteredTotalPages, currentPage + 1))}
                    disabled={currentPage === filteredTotalPages}
                    className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:opacity-50 dark:border-primary/30"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
