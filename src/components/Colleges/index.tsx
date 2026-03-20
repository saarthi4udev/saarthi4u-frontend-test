"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";
// import { colleges as collegesData } from "@/app/api/data";
import { getAllColleges } from "@/app/api/colleges";
import { compareCollegesByIds } from "@/app/api/collegeCompare";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";

/* ---------------- CONSTANTS ---------------- */

const ALL_STATES = "All States";
const ALL_TYPES = "All Types";
const ALL_OWNERSHIP = "All Ownership";


type CollegeFilterKey = "state" | "type" | "ownership";

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

/* ---------------- DROPDOWN ---------------- */

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  keyName: CollegeFilterKey;
  open: string | null;
  setOpen: (value: string | null) => void;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      state: string;
      type: string;
      ownership: string;
    }>
  >;
};

const Dropdown = ({
  label,
  value,
  options,
  keyName,
  open,
  setOpen,
  setFilters,
}: DropdownProps) => (
  <div className="relative flex-1">
    <button
      onClick={() => setOpen(open === keyName ? null : keyName)}
      className="
          w-full h-12 px-4 flex justify-between items-center text-sm font-semibold
          rounded-xl border border-primary/10 shadow-sm
          bg-white dark:bg-slate-950/70
          text-primary dark:text-white
          hover:border-secondary/40
          transition-all duration-200
        "
    >
      <span>
        <span className="text-gray-500 dark:text-gray-400">
          {label}:
        </span>{" "}
        {value}
      </span>
      <span className="text-gray-500 dark:text-gray-400">▾</span>
    </button>

    {open === keyName && (
      <div
        className="
            absolute z-50 mt-2 w-full max-h-64 overflow-auto rounded-xl shadow-xl
            bg-white dark:bg-slate-900
            border border-primary/10 dark:border-white/10
          "
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              setFilters((prev) => ({ ...prev, [keyName]: opt }));
              setOpen(null);
            }}
            className="
                block w-full text-left px-5 py-3 text-sm
                text-gray-800 dark:text-gray-100
                hover:bg-primary/10
                transition-colors duration-200
              "
          >
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
);

/* ---------------- MAIN SECTION ---------------- */

export default function CollegesSection() {

  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalPages, setTotalPages] = useState(1);

  const [collegesData, setCollegesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const stateOptions = useMemo(
    () => [
      ALL_STATES,
      ...Array.from(
        new Set(collegesData.map((c) => c.state).filter(Boolean))
      ).sort(),
    ],
    [collegesData]
  );

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

  // const ownershipOptions = useMemo(
  //   () => [
  //     ALL_OWNERSHIP,
  //     ...Array.from(
  //       new Set(
  //         collegesData.map((c) => c.Category?.name).filter(Boolean)
  //       )
  //     ),
  //   ],
  //   [collegesData]
  // );
  const ownershipOptions = [
    ALL_OWNERSHIP,
    "Public",
    "Private",
  ];

  const [filters, setFilters] = useState({
    state: ALL_STATES,
    type: ALL_TYPES,
    ownership: ALL_OWNERSHIP,
  });

  const [selectedCollegeOneId, setSelectedCollegeOneId] = useState("");
  const [selectedCollegeTwoId, setSelectedCollegeTwoId] = useState("");
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);
  const [compareResult, setCompareResult] = useState<CompareResult | null>(null);
  const [showCompareDetails, setShowCompareDetails] = useState(false);

  /* -------- Close Dropdown Outside Click -------- */

  // useEffect(() => {
  //   const close = (e: MouseEvent) => {
  //     if (barRef.current && !barRef.current.contains(e.target as Node)) {
  //       setOpen(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", close);
  //   return () => document.removeEventListener("mousedown", close);
  // }, []);

  //   useEffect(() => {
  //   const fetchColleges = async () => {
  //     try {
  //       const raw = await getAllColleges();

  //       /**
  //        * Normalize new API → old UI structure
  //        * So your entire existing logic keeps working
  //        */
  //       const normalized = raw.map((college: any) => ({
  //         ...college,

  //         // category used in filters
  //         category: college?.Category?.name || "",

  //         // used in card + compare
  //         established: college?.establishedYear || null,

  //         // location used in compare table
  //         location: [college?.city, college?.state]
  //           .filter(Boolean)
  //           .join(", "),

  //         // remove html from overview
  //         description: college?.overview
  //           ? college.overview.replace(/<[^>]*>?/gm, "")
  //           : "",

  //         // ensure logo exists
  //         logo: college?.logo || "",

  //         // ensure type always exists
  //         type: college?.type || "College",
  //       }));

  //       setCollegesData(normalized);
  //     } catch (error) {
  //       console.error("Error fetching colleges:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchColleges();
  // }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);

        const res = await getAllColleges(page, limit);

        console.log("API RESPONSE:", res);

        const raw = res?.data || [];
        console.log("CURRENT PAGE:", page);
        setTotalPages(res?.pagination?.totalPages || 1);

        const normalized = raw.map((college: any) => ({
          ...college,
          category: college?.Category?.name || "",
          established: college?.establishedYear || null,
          location: [college?.city, college?.state].filter(Boolean).join(", "),
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
  }, [page]);


  useEffect(() => {
  gridRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}, [page]);
  /* -------- Reset -------- */

  const handleReset = () => {
    setFilters({
      state: ALL_STATES,
      type: ALL_TYPES,
      ownership: ALL_OWNERSHIP,
    });
    setOpen(null);
  };

  // const collegeOptions = useMemo(
  //   () =>
  //     collegesData
  //       .map((college) => ({ id: college.id, name: college.name }))
  //       .sort((a, b) => a.name.localeCompare(b.name)),
  //   [],
  // );

  const collegeOptions = useMemo(
    () =>
      collegesData
        .map((college) => ({
          id: String(college.id),
          name: college.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [collegesData]   // ✅ IMPORTANT
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
    // Normalise id comparison to avoid type mismatch (API ids may be numbers while selections are strings)
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
    const stateMatch =
      filters.state === ALL_STATES ||
      college.state === filters.state;

    const typeMatch =
      filters.type === ALL_TYPES ||
      college.category === filters.type;

    const ownershipMatch =
      filters.ownership === ALL_OWNERSHIP ||
      college.ownership === filters.ownership;

    return stateMatch && typeMatch && ownershipMatch;
  });

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_34%,#f1faf8_100%)] py-16 transition-colors dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)] sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="relative mb-6 overflow-hidden rounded-lg border border-primary/10 bg-white/85 p-4 text-center shadow-md backdrop-blur sm:rounded-2xl sm:p-6 md:rounded-[2rem] md:p-8 lg:p-10 dark:border-white/10 dark:bg-slate-900/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_31%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1.5 text-10 font-semibold uppercase tracking-[0.2em] text-primary shadow-sm dark:text-secondary sm:mb-4 sm:px-4 sm:py-2 sm:text-xs">
            <Icon icon="mdi:school-outline" className="w-3 h-3 sm:w-4 sm:h-4" />
            College Discovery
            </span>
            <h2 className="text-24 font-extrabold text-primary dark:text-white sm:text-28 md:text-35 lg:text-40">
              Explore <span className="text-secondary">Colleges</span>
            </h2>
            <p className="mt-2 text-13 font-medium leading-6 text-slate-600 dark:text-slate-300 sm:mt-3 sm:text-14 md:text-16">
              Filter colleges by state, type, and ownership with a cleaner comparison-first layout.
            </p>
          </div>
        </div>

        {/* COMPARE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mb-6 rounded-2xl border border-primary/20 dark:border-primary/30 bg-gradient-to-br from-white via-white to-primary/5 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 shadow-sm overflow-hidden"
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

          <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-3">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <motion.span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon icon="mdi:compare-horizontal" width="18" height="18" />
                  </motion.span>
                  Compare Colleges
                </h3>
                <p className="mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Pick two colleges, compare fast, and open detailed results only when needed.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">1</span>
                Select
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">2</span>
                Compare
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">3</span>
                Decide
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-end gap-3 xl:grid-cols-12 xl:gap-3">
              <div className="xl:col-span-4">
                <label
                  htmlFor="compare-college-one"
                  className="block text-10 sm:text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-1 sm:mb-1.5"
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
                  className="
                      w-full h-11 rounded-lg px-3
                      border border-gray-300 dark:border-slate-700
                      bg-white dark:bg-slate-900
                      text-sm text-gray-900 dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                    "
                >
                  <option value="">Select first college</option>
                  {collegeOptions.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="xl:col-span-4">
                <label
                  htmlFor="compare-college-two"
                  className="block text-10 sm:text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-1 sm:mb-1.5"
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
                  className="
                      w-full h-11 rounded-lg px-3
                      border border-gray-300 dark:border-slate-700
                      bg-white dark:bg-slate-900
                      text-sm text-gray-900 dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-primary/40
                    "
                >
                  <option value="">Select second college</option>
                  {collegeOptions.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 xl:col-span-4 flex items-center justify-start xl:justify-end gap-2 flex-wrap">
                <button
                  onClick={handleCompare}
                  disabled={!canCompare || compareLoading}
                  className="
                      h-9 sm:h-10 px-3 sm:px-4 rounded-lg font-medium whitespace-nowrap text-xs sm:text-sm
                      bg-primary text-white shadow-sm shadow-primary/30
                      disabled:opacity-50 disabled:cursor-not-allowed
                      hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition
                    "
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="mdi:scale-balance" width="16" height="16" />
                    {compareLoading ? "Comparing..." : "Compare Colleges"}
                  </span>
                </button>
                <button
                  onClick={handleSwap}
                  disabled={!canCompare}
                  className="
                      h-9 sm:h-10 px-3 sm:px-3.5 rounded-lg font-medium whitespace-nowrap text-xs sm:text-sm
                      border border-primary/25 dark:border-primary/30
                      text-primary
                      bg-primary/5
                      disabled:opacity-50 disabled:cursor-not-allowed
                      hover:bg-primary/10 hover:-translate-y-0.5 active:translate-y-0 transition
                    "
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="mdi:swap-horizontal" width="16" height="16" />
                    Swap
                  </span>
                </button>
                <button
                  onClick={handleCompareReset}
                  className="
                      h-9 sm:h-10 px-3 sm:px-3.5 rounded-lg font-medium whitespace-nowrap text-xs sm:text-sm
                      border border-rose-200 dark:border-rose-400/30
                      text-rose-600 dark:text-rose-300
                      bg-rose-50/60 dark:bg-rose-500/10
                      hover:bg-rose-100/70 dark:hover:bg-rose-500/20 hover:-translate-y-0.5 active:translate-y-0 transition
                    "
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="mdi:close-circle-outline" width="16" height="16" />
                    Clear Compare
                  </span>
                </button>

                {compareResult && compareResult.colleges.length >= 2 && (
                  <button
                    onClick={() => setShowCompareDetails((prev) => !prev)}
                    className="h-10 px-3.5 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 hover:-translate-y-0.5 active:translate-y-0 transition"
                  >
                    {showCompareDetails ? "Hide Details" : "View Details"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-500 dark:text-gray-400">Selected:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/40 text-gray-800 dark:text-gray-100">
                <Icon icon="mdi:school-outline" width="14" height="14" className="mr-1.5 text-primary" />
                {selectedCollegeOne?.name || "College 1"}
              </span>
              <span className="text-primary font-semibold">vs</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/40 text-gray-800 dark:text-gray-100">
                <Icon icon="mdi:school-outline" width="14" height="14" className="mr-1.5 text-primary" />
                {selectedCollegeTwo?.name || "College 2"}
              </span>
            </div>

            {compareError && (
              <p className="text-sm text-amber-600 dark:text-amber-400">{compareError}</p>
            )}

            <AnimatePresence initial={false}>
              {compareResult && compareResult.colleges.length >= 2 && showCompareDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900"
                >
                  {compareRecommendation && (
                    <div className="px-4 md:px-5 py-3 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{compareRecommendation.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{compareRecommendation.subtitle}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 sm:p-3 md:p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900">
                      {compareMeta.first?.logo ? (
                        <Image
                          src={compareMeta.first.logo}
                          alt={compareResult.colleges[0]?.name || "College 1"}
                          width={36}
                          height={36}
                          className="rounded-md border border-gray-200 dark:border-slate-700 bg-white"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-md border border-gray-200 dark:border-slate-700 flex items-center justify-center text-primary">
                          <Icon icon="mdi:school" width="18" height="18" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{compareResult.colleges[0]?.name || "College 1"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {[compareResult.colleges[0]?.location, compareResult.colleges[0]?.city].filter(Boolean).join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900">
                      {compareMeta.second?.logo ? (
                        <Image
                          src={compareMeta.second.logo}
                          alt={compareResult.colleges[1]?.name || "College 2"}
                          width={36}
                          height={36}
                          className="rounded-md border border-gray-200 dark:border-slate-700 bg-white"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-md border border-gray-200 dark:border-slate-700 flex items-center justify-center text-primary">
                          <Icon icon="mdi:school" width="18" height="18" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{compareResult.colleges[1]?.name || "College 2"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {[compareResult.colleges[1]?.location, compareResult.colleges[1]?.city].filter(Boolean).join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {compareResult.summary && (
                    <div className="px-4 md:px-5 py-3 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/40">
                      <p className="text-sm text-gray-700 dark:text-gray-200">{compareResult.summary}</p>
                    </div>
                  )}

                  {compareHighlights && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-4 md:px-5 py-3 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                      <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Best Rating</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{compareHighlights.higherRatingWinner}</p>
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Best Placement</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{compareHighlights.strongerPlacementWinner}</p>
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Best Faculty Ratio</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{compareHighlights.betterFacultyRatioWinner}</p>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left bg-gray-50 dark:bg-slate-900">
                          <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-slate-700 min-w-[160px]">Metric</th>
                          <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700 min-w-[220px]">{compareResult.colleges[0]?.name || "College 1"}</th>
                          <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700 min-w-[220px]">{compareResult.colleges[1]?.name || "College 2"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {compareRows.map((row) => (
                          <tr key={row.label} className="odd:bg-white even:bg-gray-50/70 dark:odd:bg-slate-900 dark:even:bg-slate-800/20">
                            <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800">{row.label}</td>
                            <td className="px-4 py-3 text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-slate-800">{row.first}</td>
                            <td className="px-4 py-3 text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-slate-800">{row.second}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* FILTER BAR */}
        <div
          ref={barRef}
          className="
              mt-6 sm:mt-8 flex flex-col sm:flex-wrap items-center gap-3 sm:gap-4 md:flex-nowrap
              rounded-2xl sm:rounded-[1.8rem] border border-primary/10 p-3 sm:p-5 md:p-6 mb-6 sm:mb-8
              bg-white/90 dark:bg-slate-900/80
              shadow-[0_22px_56px_rgba(10,24,58,0.08)] backdrop-blur
              dark:border-white/10
            "
        >
          <div className="flex flex-1 gap-4">
            <Dropdown
              label="State"
              value={filters.state}
              options={stateOptions}
              keyName="state"
              open={open}
              setOpen={setOpen}
              setFilters={setFilters}
            />
            <Dropdown
              label="Type"
              value={filters.type}
              options={typeOptions}
              keyName="type"
              open={open}
              setOpen={setOpen}
              setFilters={setFilters}
            />
            <Dropdown
              label="Ownership"
              value={filters.ownership}
              options={ownershipOptions}
              keyName="ownership"
              open={open}
              setOpen={setOpen}
              setFilters={setFilters}
            />
          </div>

          {/* RESET BUTTON */}
          <button
            onClick={handleReset}
            className="
                h-12 px-6 rounded-xl font-semibold whitespace-nowrap text-sm
                border border-primary bg-white
                text-primary transition-all duration-200
                hover:bg-primary hover:text-white
                dark:bg-transparent dark:text-secondary
              "
          >
            Reset Filters
          </button>
        </div>

        {/* GRID */}
        {/* GRID */}


        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
        >


          {/* Loading State */}
          {loading && (
            <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
              Loading colleges...
            </div>
          )}

          {/* Colleges */}
          {!loading && filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}

          {/* No Data */}
          {!loading && filteredColleges.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
              No colleges found for selected filters
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-3 mt-10">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary disabled:opacity-40 dark:text-white"
          >
            Prev
          </button>

          <span className="text-sm font-semibold text-primary dark:text-white">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary disabled:opacity-40 dark:text-white"
          >
            Next
          </button>

        </div>

      </div>
    </section>
  );
}
