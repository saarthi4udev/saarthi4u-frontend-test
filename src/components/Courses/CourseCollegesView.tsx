"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { College } from "@/types/college";

import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";
import { CourseCategory, DiscoveryCourse } from "@/types/courseDiscovery";
import { formatFeeRange } from "@/app/api/exam";

type Props = {
  category: CourseCategory;
  course: DiscoveryCourse;
  colleges: College[];
};

const ALL_LOCATIONS = "All Locations";

export default function CourseCollegesView({
  category,
  course,
  colleges,
}: Readonly<Props>) {
  const [locationFilter, setLocationFilter] = useState(ALL_LOCATIONS);
  const [typeFilter, setTypeFilter] = useState("All Types");

  const locationOptions = useMemo(
    () => [
      ALL_LOCATIONS,
      ...Array.from(new Set(colleges.map((college) => college.location))).sort(),
    ],
    [colleges],
  );

  const typeOptions = useMemo(
    () => [
      "All Types",
      ...Array.from(new Set(colleges.map((college) => college.type))),
    ],
    [colleges],
  );

  const filteredColleges = useMemo(
    () =>
      colleges.filter((college) => {
        const locationMatch =
          locationFilter === ALL_LOCATIONS || college.location === locationFilter;
        const typeMatch = typeFilter === "All Types" || college.type === typeFilter;
        return locationMatch && typeMatch;
      }),
    [colleges, locationFilter, typeFilter],
  );

  return (
    <section className="py-16 bg-white dark:bg-midnight_text min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-sm mb-8 text-muted">
          <Link href="/course" className="hover:text-primary">
            Categories
          </Link>
          <Icon icon="mdi:chevron-right" />
          <Link href={`/course/${category.slug}`} className="hover:text-primary">
            {category.name}
          </Link>
          <Icon icon="mdi:chevron-right" />
          <span className="text-midnight_text dark:text-white">{course.name}</span>
        </div>

        <div className="mb-8">
          <h1 className="text-40 font-semibold">
            {course.name} <span className="text-primary">Colleges</span>
          </h1>
          <p className="text-muted mt-3 max-w-4xl">
            Degree level: {course.degreeLevel} • Duration: {course.duration} • Mode: {course.mode} • Estimated Fees: {formatFeeRange(course.feesRange)}
          </p>
        </div>

        <div className="interactive-surface grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-2xl dark:border-slate-800 mb-10 bg-white dark:bg-darkmode">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="interactive-control h-11 px-3 border rounded-lg dark:bg-darkheader dark:border-slate-700"
          >
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="interactive-control h-11 px-3 border rounded-lg dark:bg-darkheader dark:border-slate-700"
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setLocationFilter(ALL_LOCATIONS);
              setTypeFilter("All Types");
            }}
            className="h-11 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12 text-muted">
            No colleges found for selected filters.
          </div>
        )}
      </div>
    </section>
  );
}
