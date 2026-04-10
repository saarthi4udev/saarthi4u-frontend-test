"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";
import { getAllColleges } from "@/app/api/colleges";
import { compareCollegesByIds } from "@/app/api/collegeCompare";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";

/* --------------- CONSTANTS --------------- */

const ALL_LOCATIONS = "All Locations";
const ALL_TYPES = "All Types";
const ALL_OWNERSHIP = "All Ownership";

type CompareCollege = {
  id: string;
  name: string;
  location?: string;
  city?: string;
  type?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  avgFees?: number;
  facultyCount?: number;
  studentFacultyRatio?: number;
  recruiterCount?: number;
  placementScore?: number;
  overallScore?: number;
  averagePackage?: string;
  highlights?: string[];
  facilities?: string[];
  recruiters?: string[];
  courses?: Array<{ name?: string; duration?: string; fee?: number | string }>;
  established?: string | number;
  nirfRanking?: string | number;
  avgPackage?: string;
  highestPackage?: string;
  campusSize?: string;
  description?: string;
};

type CompareVerdict = {
  winner?: string;
  summary?: string;
  categoryLeaders?: {
    bestOverall?: string;
    bestRating?: string;
    bestPlacement?: string;
    bestROI?: string;
    bestFacultyRatio?: string;
  };
};

type CompareResult = {
  summary: string;
  colleges: CompareCollege[];
  verdict?: CompareVerdict;
};

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

export default function NationalColleges() {
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [collegesData, setCollegesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

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

  const typeOptions = useMemo(
    () => [
      ALL_TYPES,
      ...Array.from(
        new Set(
          collegesData
            .map((college) => college.category)
            .filter(Boolean)
        )
      ),
    ],
    [collegesData]
  );

  const ownershipOptions = [ALL_OWNERSHIP, "Public", "Private"];

  const [filters, setFilters] = useState({
    state: ALL_LOCATIONS,
    type: ALL_TYPES,
    ownership: ALL_OWNERSHIP,
  });

  const [selectedCollegeOneId, setSelectedCollegeOneId] = useState("");
  const [selectedCollegeTwoId, setSelectedCollegeTwoId] = useState("");
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);
  const [compareResult, setCompareResult] = useState<CompareResult | null>(null);
  const [showCompareDetails, setShowCompareDetails] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const res = await getAllColleges(currentPage, limit);

        setTotalPages(res?.pagination?.totalPages || 1);

        const raw = res?.data || [];

        const normalized = raw.map((college: any) => ({
          ...college,
          category: college?.Category?.name || "",
          established: college?.establishedYear || null,
          location: [college?.city, college?.state, college?.country]
            .filter(Boolean)
            .join(", "),
          description: college?.overview
            ? college.overview.replace(/<[^>]*>?/gm, "")
            : "",
          logo: college?.logo || "",
          type: college?.type || "College",
        }));

        setCollegesData(normalized);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [currentPage]);

  useEffect(() => {
    gridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  const handleReset = () => {
    setFilters({
      state: ALL_LOCATIONS,
      type: ALL_TYPES,
      ownership: ALL_OWNERSHIP,
    });
    setCurrentPage(1);
  };

  const collegeOptions = useMemo(
    () =>
      collegesData
        .map((college) => ({
          id: String(college.id),
          name: college.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [collegesData]
  );

  const canCompare =
    selectedCollegeOneId.length > 0 &&
    selectedCollegeTwoId.length > 0 &&
    selectedCollegeOneId !== selectedCollegeTwoId;

  const selectedCollegeOne = useMemo(
    () =>
      collegesData.find(
        (college) => String(college.id) === String(selectedCollegeOneId)
      ),
    [selectedCollegeOneId, collegesData]
  );

  const selectedCollegeTwo = useMemo(
    () =>
      collegesData.find(
        (college) => String(college.id) === String(selectedCollegeTwoId)
      ),
    [selectedCollegeTwoId, collegesData]
  );

  const getFallbackCompare = (collegeIds: string[]): CompareResult => {
    const selected = collegeIds
      .map((id) =>
        collegesData.find((college) => String(college.id) === String(id))
      )
      .filter(
        (college): college is (typeof collegesData)[number] => Boolean(college)
      )
      .map((college) => ({
        id: String(college.id),
        name: college.name,
        location: college.location,
        city: college.city,
        type: college.type,
        category: college.category,
        rating: college.rating,
        reviews: college.reviews,
        established: college.established,
        nirfRanking: college.nirfRanking,
        avgPackage: college.avgPackage,
        highestPackage: college.highestPackage,
        campusSize: college.campusSize,
        description: college.description,
      }));

    return {
      summary: "",
      colleges: selected,
    };
  };

  const normalizeCompareResponse = (payload: any): CompareResult | null => {
    const root = payload?.data ?? payload;
    const verdict: CompareVerdict | undefined = root?.verdict;
    const summary =
      verdict?.summary ||
      root?.summary ||
      root?.overallSummary ||
      root?.comparisonSummary ||
      "";

    const rawColleges =
      (Array.isArray(root?.data) && root?.data) ||
      root?.colleges ||
      root?.items ||
      root?.data?.colleges ||
      root?.result?.colleges ||
      [];

    if (!Array.isArray(rawColleges)) {
      return null;
    }

    const colleges: CompareCollege[] = rawColleges.map((college: any) => ({
      id: String(college?.id ?? ""),
      name: college?.name ?? "N/A",
      location: college?.location,
      city: college?.city,
      type: college?.type,
      category: college?.category,
      rating: college?.avgRating ?? college?.rating,
      reviews: college?.reviews,
      avgFees: college?.avgFees,
      facultyCount: college?.facultyCount,
      studentFacultyRatio: college?.studentFacultyRatio,
      highestPackage: college?.highestPackage,
      averagePackage: college?.averagePackage,
      avgPackage: college?.avgPackage,
      recruiterCount: college?.recruiterCount,
      placementScore: college?.placementScore,
      overallScore: college?.overallScore,
      highlights: college?.highlights,
      facilities: college?.facilities,
      recruiters: college?.recruiters,
      courses: college?.courses,
      established: college?.established,
      nirfRanking: college?.nirfRanking,
      campusSize: college?.campusSize,
      description: college?.description,
    }));

    return {
      summary,
      colleges,
      verdict,
    };
  };

  const handleCompare = async () => {
    if (!canCompare) {
      setCompareError("Please select two different colleges.");
      return;
    }

    setCompareLoading(true);
    setCompareError(null);

    const collegeIds = [selectedCollegeOneId, selectedCollegeTwoId];

    try {
      const response = await compareCollegesByIds(collegeIds);
      const normalized = normalizeCompareResponse(response);

      if (!normalized || normalized.colleges.length < 2) {
        setCompareResult(getFallbackCompare(collegeIds));
      } else {
        setCompareResult(normalized);
      }
      setShowCompareDetails(true);
    } catch {
      setCompareResult(getFallbackCompare(collegeIds));
      setCompareError(null);
      setShowCompareDetails(true);
    } finally {
      setCompareLoading(false);
    }
  };

  const handleSwap = () => {
    if (!selectedCollegeOneId || !selectedCollegeTwoId) return;
    setSelectedCollegeOneId(selectedCollegeTwoId);
    setSelectedCollegeTwoId(selectedCollegeOneId);
    setCompareError(null);
  };

  const handleCompareReset = () => {
    setSelectedCollegeOneId("");
    setSelectedCollegeTwoId("");
    setCompareError(null);
    setCompareResult(null);
    setShowCompareDetails(false);
  };

  const compareRows = useMemo(() => {
    if (!compareResult || compareResult.colleges.length < 2) return [];

    const [collegeOne, collegeTwo] = compareResult.colleges;
    const formatValue = (value: unknown) =>
      value === null || value === undefined || value === "" ? "N/A" : String(value);
    const formatCurrency = (value: unknown) => {
      if (value === null || value === undefined || value === "") return "N/A";
      const numberValue = Number(value);
      if (!Number.isFinite(numberValue)) return String(value);
      return `₹${numberValue.toLocaleString("en-IN")}`;
    };

    return [
      { label: "Location", first: [collegeOne.location, collegeOne.city].filter(Boolean).join(", ") || "N/A", second: [collegeTwo.location, collegeTwo.city].filter(Boolean).join(", ") || "N/A" },
      { label: "Type", first: collegeOne.type || "N/A", second: collegeTwo.type || "N/A" },
      { label: "Category", first: collegeOne.category || "N/A", second: collegeTwo.category || "N/A" },
      { label: "Avg Rating", first: formatValue(collegeOne.rating), second: formatValue(collegeTwo.rating) },
      { label: "Avg Fees", first: formatCurrency(collegeOne.avgFees), second: formatCurrency(collegeTwo.avgFees) },
      { label: "Faculty Count", first: formatValue(collegeOne.facultyCount), second: formatValue(collegeTwo.facultyCount) },
      { label: "Student/Faculty Ratio", first: formatValue(collegeOne.studentFacultyRatio), second: formatValue(collegeTwo.studentFacultyRatio) },
      { label: "Highest Package", first: formatValue(collegeOne.highestPackage), second: formatValue(collegeTwo.highestPackage) },
      { label: "Average Package", first: formatValue(collegeOne.averagePackage || collegeOne.avgPackage), second: formatValue(collegeTwo.averagePackage || collegeTwo.avgPackage) },
      { label: "Recruiter Count", first: formatValue(collegeOne.recruiterCount), second: formatValue(collegeTwo.recruiterCount) },
      { label: "Placement Score", first: formatValue(collegeOne.placementScore), second: formatValue(collegeTwo.placementScore) },
      { label: "Overall Score", first: formatValue(collegeOne.overallScore), second: formatValue(collegeTwo.overallScore) },
      { label: "Courses", first: formatValue(collegeOne.courses?.length), second: formatValue(collegeTwo.courses?.length) },
      { label: "Facilities", first: formatValue(collegeOne.facilities?.length), second: formatValue(collegeTwo.facilities?.length) },
    ];
  }, [compareResult]);

  const compareHighlights = useMemo(() => {
    if (!compareResult || compareResult.colleges.length < 2) return null;

    const [first, second] = compareResult.colleges;
    const categoryLeaders = compareResult.verdict?.categoryLeaders;

    const firstRating = typeof first.rating === "number" ? first.rating : Number(first.rating);
    const secondRating = typeof second.rating === "number" ? second.rating : Number(second.rating);

    const firstPlacement = Number(first.placementScore);
    const secondPlacement = Number(second.placementScore);

    const firstFacultyRatio = Number(first.studentFacultyRatio);
    const secondFacultyRatio = Number(second.studentFacultyRatio);

    const higherRatingWinner =
      Number.isFinite(firstRating) && Number.isFinite(secondRating)
        ? firstRating > secondRating
          ? first.name
          : secondRating > firstRating
            ? second.name
            : "Tie"
        : "N/A";

    const strongerPlacementWinner =
      Number.isFinite(firstPlacement) && Number.isFinite(secondPlacement)
        ? firstPlacement > secondPlacement
          ? first.name
          : secondPlacement > firstPlacement
            ? second.name
            : "Tie"
        : "N/A";

    const betterFacultyRatioWinner =
      Number.isFinite(firstFacultyRatio) && firstFacultyRatio > 0 && Number.isFinite(secondFacultyRatio) && secondFacultyRatio > 0
        ? firstFacultyRatio < secondFacultyRatio
          ? first.name
          : secondFacultyRatio < firstFacultyRatio
            ? second.name
            : "Tie"
        : "N/A";

    return {
      higherRatingWinner: categoryLeaders?.bestRating || higherRatingWinner,
      strongerPlacementWinner: categoryLeaders?.bestPlacement || strongerPlacementWinner,
      betterFacultyRatioWinner: categoryLeaders?.bestFacultyRatio || betterFacultyRatioWinner,
    };
  }, [compareResult]);

  const compareMeta = useMemo(() => {
    if (!compareResult || compareResult.colleges.length < 2) {
      return { first: null, second: null };
    }

    const findMeta = (item: CompareCollege) =>
      collegesData.find((college) => String(college.id) === String(item.id)) ||
      collegesData.find((college) => college.name === item.name) ||
      null;

    return {
      first: findMeta(compareResult.colleges[0]),
      second: findMeta(compareResult.colleges[1]),
    };
  }, [compareResult]);

  const compareRecommendation = useMemo(() => {
    if (!compareResult || compareResult.colleges.length < 2 || !compareHighlights) {
      return null;
    }

    if (compareResult.verdict?.winner || compareResult.verdict?.summary) {
      return {
        title: `Recommended: ${compareResult.verdict?.winner || "Best Match"}`,
        subtitle:
          compareResult.verdict?.summary ||
          "This recommendation is based on overall comparison metrics.",
      };
    }

    const firstName = compareResult.colleges[0].name;
    const secondName = compareResult.colleges[1].name;

    let firstScore = 0;
    let secondScore = 0;

    const winners = [
      compareHighlights.higherRatingWinner,
      compareHighlights.strongerPlacementWinner,
      compareHighlights.betterFacultyRatioWinner,
    ];

    winners.forEach((winner) => {
      if (winner === firstName) firstScore += 1;
      if (winner === secondName) secondScore += 1;
    });

    if (firstScore === secondScore) {
      return {
        title: "Balanced Comparison",
        subtitle: "Both colleges perform similarly based on current metrics.",
      };
    }

    const bestName = firstScore > secondScore ? firstName : secondName;
    const score = Math.max(firstScore, secondScore);

    return {
      title: `Recommended: ${bestName}`,
      subtitle: `Leads in ${score} out of 3 key benchmark metrics.`,
    };
  }, [compareHighlights, compareResult]);

  const filteredColleges = collegesData.filter((college) => {
    const selectedRegion = filters.state;
    const collegeLocations = getCollegeLocationValues(college);

    const stateMatch =
      selectedRegion === ALL_LOCATIONS ||
      collegeLocations.includes(selectedRegion);

    const typeMatch =
      filters.type === ALL_TYPES ||
      college.category === filters.type;

    const ownershipMatch =
      filters.ownership === ALL_OWNERSHIP ||
      college.ownership === filters.ownership;

    return stateMatch && typeMatch && ownershipMatch;
  });

  const currentTotalLabel = `${filteredColleges.length} college${filteredColleges.length === 1 ? "" : "s"}`;
  const pageItems = getVisiblePageItems(currentPage, totalPages);

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
              <Icon icon="mdi:school-outline" className="w-3 h-3 sm:w-4 sm:h-4" />
              College Discovery
            </span>
            <h2 className="text-24 font-extrabold text-primary dark:text-white sm:text-28 md:text-35 lg:text-40">
              Explore <span className="text-secondary">National Colleges</span>
            </h2>
            <p className="mt-2 text-13 font-medium leading-6 text-slate-600 dark:text-slate-300 sm:mt-3 sm:text-14 md:text-16">
              Discover top colleges across India. Filter by location, category, and ownership to find the right institute.
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
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Type</label>
                <select
                  value={filters.type}
                  onChange={(event) => {
                    setFilters((prev) => ({ ...prev, type: event.target.value }));
                    setCurrentPage(1);
                  }}
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary outline-none dark:text-white"
                >
                  {typeOptions.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="flex min-h-[4.4rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3.5 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Ownership</label>
                <select
                  value={filters.ownership}
                  onChange={(event) => {
                    setFilters((prev) => ({ ...prev, ownership: event.target.value }));
                    setCurrentPage(1);
                  }}
                  className="h-8 w-full bg-transparent text-sm font-medium text-primary outline-none dark:text-white"
                >
                  {ownershipOptions.map((ownership) => (
                    <option key={ownership}>{ownership}</option>
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

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3.5 py-2 text-sm dark:border-white/10 dark:bg-slate-950/60">
              <p className="font-semibold text-primary dark:text-white">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#FAFA33] align-middle" />
                Showing {currentTotalLabel} on this listing
              </p>
              <p className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-300">
                National Colleges
              </p>
            </div>
          </div>
        </motion.div>

        {/* COMPARE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mb-4 overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-white via-white to-primary/5 shadow-[0_18px_44px_rgba(10,24,58,0.08)] dark:border-primary/25 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"
        >
          <motion.div
            aria-hidden
            className="absolute -top-16 -left-10 w-44 h-44 rounded-full bg-primary/10 blur-2xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-16 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl"
            animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="border-b border-gray-200 bg-white/75 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/72">
            <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <motion.span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon icon="mdi:compare-horizontal" width="18" height="18" />
                  </motion.span>
                  Compare Colleges
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Pick two colleges, compare fast, and open detailed results only when needed.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 p-3.5 sm:p-4">
            <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-stretch">
              <div className="flex min-h-[4.25rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label
                  htmlFor="compare-college-one"
                  className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
                >
                  College 1
                </label>
                <select
                  id="compare-college-one"
                  value={selectedCollegeOneId}
                  onChange={(event) => {
                    setSelectedCollegeOneId(event.target.value);
                    setCompareError(null);
                  }}
                  className="h-8 w-full bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-gray-100"
                >
                  <option value="">Select first college</option>
                  {collegeOptions.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex min-h-[4.25rem] flex-col justify-between rounded-xl border border-primary/10 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <label
                  htmlFor="compare-college-two"
                  className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
                >
                  College 2
                </label>
                <select
                  id="compare-college-two"
                  value={selectedCollegeTwoId}
                  onChange={(event) => {
                    setSelectedCollegeTwoId(event.target.value);
                    setCompareError(null);
                  }}
                  className="h-8 w-full bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-gray-100"
                >
                  <option value="">Select second college</option>
                  {collegeOptions.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2 xl:justify-end xl:self-stretch">
                <button
                  onClick={handleCompare}
                  disabled={!canCompare || compareLoading}
                  className="h-10 rounded-lg bg-primary px-4 text-xs font-semibold whitespace-nowrap text-white shadow-sm shadow-primary/30 transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="mdi:scale-balance" width="16" height="16" />
                    {compareLoading ? "Comparing..." : "Compare Colleges"}
                  </span>
                </button>
                <button
                  onClick={handleSwap}
                  disabled={!canCompare}
                  className="h-10 rounded-lg border border-primary/25 bg-primary/5 px-3 text-xs font-semibold whitespace-nowrap text-primary transition hover:-translate-y-0.5 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary/30 sm:text-sm"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="mdi:swap-horizontal" width="16" height="16" />
                    Swap
                  </span>
                </button>
                <button
                  onClick={handleCompareReset}
                  className="h-10 rounded-lg border border-rose-200 bg-rose-50/60 px-3 text-xs font-semibold whitespace-nowrap text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100/70 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20 sm:text-sm"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="mdi:close-circle-outline" width="16" height="16" />
                    Clear Compare
                  </span>
                </button>

                {compareResult && compareResult.colleges.length >= 2 && (
                  <button
                    onClick={() => setShowCompareDetails((prev) => !prev)}
                    className="h-10 rounded-lg border border-primary/30 px-3 text-xs font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary/10 sm:text-sm"
                  >
                    {showCompareDetails ? "Hide Details" : "View Details"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs sm:text-sm dark:border-white/10 dark:bg-slate-950/55">
              <span className="font-medium text-gray-500 dark:text-gray-400">Selected:</span>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-800/40 text-gray-800 dark:text-gray-100">
                <Icon icon="mdi:school-outline" width="14" height="14" className="mr-1.5 text-primary" />
                {selectedCollegeOne?.name || "College 1"}
              </span>
              <span className="text-primary font-semibold">vs</span>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-800/40 text-gray-800 dark:text-gray-100">
                <Icon icon="mdi:school-outline" width="14" height="14" className="mr-1.5 text-primary" />
                {selectedCollegeTwo?.name || "College 2"}
              </span>
            </div>

            {compareError && (
              <p className="text-sm text-amber-600 dark:text-amber-400">{compareError}</p>
            )}
          </div>
        </motion.div>

        {/* COLLEGES GRID */}
        <div ref={gridRef} className="mb-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">Loading colleges...</p>
              </div>
            </div>
          ) : filteredColleges.length === 0 ? (
            <div className="rounded-2xl border border-primary/10 bg-white/95 px-6 py-16 text-center dark:border-white/10 dark:bg-slate-900/85">
              <Icon icon="mdi:school-outline" width="48" height="48" className="mx-auto text-slate-300 dark:text-slate-600" />
              <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">No colleges found</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {totalPages > 1 && (
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
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
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
