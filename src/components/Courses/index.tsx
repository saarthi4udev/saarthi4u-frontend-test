"use client";

import { div } from "motion/react-m";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

/* ---------------- FILTER DATA ---------------- */

const STATES = [
  "All States",
  "Delhi",
  "Maharashtra",
  "Tamil Nadu",
  "Karnataka",
  "Uttar Pradesh",
  "Rajasthan",
  "West Bengal",
  "Gujarat",
  "Punjab",
];

const COURSE_CATEGORIES = [
  "All Categories",
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Arts & Science",
];

const COURSE_LEVELS = [
  "All Levels",
  "UG",
  "PG",
  "Diploma",
];

/* ---------------- COURSES DATA ---------------- */

const courses = [
  { name: "B.Tech (Computer Science)", state: "Tamil Nadu", category: "Engineering", level: "UG" },
  { name: "B.Tech (Mechanical Engineering)", state: "Maharashtra", category: "Engineering", level: "UG" },
  { name: "B.Tech (Civil Engineering)", state: "Delhi", category: "Engineering", level: "UG" },
  { name: "M.Tech (Computer Science)", state: "Karnataka", category: "Engineering", level: "PG" },
  { name: "Diploma in Electrical Engineering", state: "Gujarat", category: "Engineering", level: "Diploma" },

  { name: "MBBS", state: "Delhi", category: "Medical", level: "UG" },
  { name: "BDS (Dental Surgery)", state: "Uttar Pradesh", category: "Medical", level: "UG" },
  { name: "B.Sc Nursing", state: "Kerala", category: "Medical", level: "UG" },
  { name: "MD (General Medicine)", state: "Maharashtra", category: "Medical", level: "PG" },
  { name: "Diploma in Medical Laboratory Technology", state: "Punjab", category: "Medical", level: "Diploma" },

  { name: "BBA", state: "Delhi", category: "Management", level: "UG" },
  { name: "MBA (Marketing)", state: "Maharashtra", category: "Management", level: "PG" },
  { name: "MBA (Finance)", state: "Karnataka", category: "Management", level: "PG" },
  { name: "PGDM", state: "Uttar Pradesh", category: "Management", level: "PG" },
  { name: "Diploma in Business Management", state: "Rajasthan", category: "Management", level: "Diploma" },

  { name: "BA LLB", state: "Delhi", category: "Law", level: "UG" },
  { name: "BBA LLB", state: "Haryana", category: "Law", level: "UG" },
  { name: "LLB", state: "Uttar Pradesh", category: "Law", level: "UG" },
  { name: "LLM (Corporate Law)", state: "Maharashtra", category: "Law", level: "PG" },
  { name: "Diploma in Cyber Law", state: "Gujarat", category: "Law", level: "Diploma" },

  { name: "BA (Economics)", state: "Delhi", category: "Arts & Science", level: "UG" },
  { name: "BA (Psychology)", state: "Tamil Nadu", category: "Arts & Science", level: "UG" },
  { name: "B.Sc (Mathematics)", state: "West Bengal", category: "Arts & Science", level: "UG" },
  { name: "MA (English)", state: "Rajasthan", category: "Arts & Science", level: "PG" },
  { name: "M.Sc (Physics)", state: "Karnataka", category: "Arts & Science", level: "PG" },
  { name: "Diploma in Data Science", state: "Maharashtra", category: "Arts & Science", level: "Diploma" },
];

const getRandomImage = (seed: number) =>
  `https://picsum.photos/seed/${seed}/600/400`;


/* ---------------- COMPONENT ---------------- */

export default function CoursesSection() {
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    state: "All States",
    category: "All Categories",
    level: "All Levels",
  });

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filteredCourses = courses.filter((c) =>
    (filters.state === "All States" || c.state === filters.state) &&
    (filters.category === "All Categories" || c.category === filters.category) &&
    (filters.level === "All Levels" || c.level === filters.level)
  );

  const Dropdown = ({ label, value, options, keyName }: any) => (
    <div className="relative w-1/3">
      <button
        onClick={() => setOpen(open === keyName ? null : keyName)}
        className="w-full h-14 px-6 flex justify-between items-center text-sm font-medium
                   hover:bg-gray-50 dark:hover:bg-[#020617]"
      >
        <span>
          <span className="text-muted mr-1">{label}:</span>
          {value}
        </span>
        <span>▾</span>
      </button>

      {open === keyName && (
        <div className="absolute z-50 w-full mt-2 max-h-64 overflow-auto rounded-xl border
                        bg-white dark:bg-[#0f172a] shadow">
          {options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => {
                setFilters({ ...filters, [keyName]: opt });
                setOpen(null);
              }}
              className="block w-full text-left px-5 py-3
                         hover:bg-gray-100 dark:hover:bg-[#020617]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-24 bg-white dark:bg-midnight_text">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-40 font-semibold">
            Explore <span className="text-primary">Courses</span>
          </h2>
          <p className="text-muted mt-3">
            Browse courses by state, category, and level
          </p>
        </div>

        {/* FILTER BAR */}
        <div
          ref={barRef}
          className="flex border rounded-2xl mb-12
                     dark:border-slate-800"
        >
          <Dropdown label="State" value={filters.state} options={STATES} keyName="state" />
          <Dropdown label="Category" value={filters.category} options={COURSE_CATEGORIES} keyName="category" />
          <Dropdown label="Level" value={filters.level} options={COURSE_LEVELS} keyName="level" />
        </div>

        {/* COURSES LIST */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <li
              key={idx}
              className="relative overflow-hidden rounded-2xl border dark:border-slate-800"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
                style={{
                  backgroundImage: `url(${getRandomImage(idx)})`,
                }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

              {/* Content (NOT blurred) */}
              <Link href="#" className="relative block p-6 h-full">
                <h3 className="font-semibold text-white">
                  {course.name}
                </h3>
                <p className="mt-2 text-sm text-gray-200">
                  {course.state} • {course.category} • {course.level}
                </p>
              </Link>
            </li>

          ))}

          {filteredCourses.length === 0 && (
            <li className="col-span-full px-6 py-10 text-center text-muted">
              No courses found for selected filters
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
