"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";

/* ---------------- FILTER DATA ---------------- */

const EXAM_TYPES = [
  "All Exams",
  "Engineering",
  "Medical",
  "Civil Services",
  "Defence",
  "Banking",
  "Railways",
  "Teaching",
];

const EXAM_LEVELS = ["All Levels", "National", "State"];

const CONDUCTING_BODY = ["All Bodies", "UPSC", "SSC", "IBPS", "RRB", "NTA"];

/* ---------------- EXAMS ---------------- */

const exams = [
  { name: "UPSC Civil Services", type: "Civil Services", level: "National", body: "UPSC", slug: "upsc-cse" },
  { name: "JEE Main", type: "Engineering", level: "National", body: "NTA", slug: "jee-main" },
  { name: "NEET", type: "Medical", level: "National", body: "NTA", slug: "neet" },
  { name: "SSC CGL", type: "Government Jobs", level: "National", body: "SSC", slug: "ssc-cgl" },
  { name: "IBPS PO", type: "Banking", level: "National", body: "IBPS", slug: "ibps-po" },
];

/* ---------------- HELPERS ---------------- */

const randomImage = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/400`;

/* ---------------- COMPONENT ---------------- */

export default function ExamsSection() {
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    type: "All Exams",
    level: "All Levels",
    body: "All Bodies",
  });

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* memoized filtering */
  const filteredExams = useMemo(() => {
    return exams.filter(
      (e) =>
        (filters.type === "All Exams" || e.type === filters.type) &&
        (filters.level === "All Levels" || e.level === filters.level) &&
        (filters.body === "All Bodies" || e.body === filters.body)
    );
  }, [filters]);

  /* reusable dropdown */
  const Dropdown = ({ label, value, options, filterKey }: any) => (
    <div className="relative w-1/3">
      <button
        onClick={() => setOpen(open === filterKey ? null : filterKey)}
        className="
          w-full h-14 px-6 flex justify-between items-center text-sm font-medium
          hover:bg-gray-50 dark:hover:bg-[#020617]
        "
      >
        <span>
          <span className="text-muted mr-1">{label}:</span>
          {value}
        </span>
        <span>▾</span>
      </button>

      {open === filterKey && (
        <div
          className="
            absolute z-50 w-full mt-2 rounded-xl border shadow
            bg-white dark:bg-[#0f172a] dark:border-slate-800
            max-h-60 overflow-auto
          "
        >
          {options.map((o: string) => (
            <button
              key={o}
              onClick={() => {
                setFilters({ ...filters, [filterKey]: o });
                setOpen(null);
              }}
              className="block w-full px-5 py-3 text-left hover:bg-gray-100 dark:hover:bg-[#020617]"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-24 bg-white dark:bg-midnight_text">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-40 font-semibold">
            Explore <span className="text-primary">Exams</span>
          </h2>
          <p className="text-muted mt-3">
            Filter exams by type, level, and conducting body
          </p>
        </div>

        {/* FILTER BAR */}
        <div
          ref={barRef}
          className="flex border rounded-2xl mb-12 dark:border-slate-800"
        >
          <Dropdown label="Exam Type" value={filters.type} options={EXAM_TYPES} filterKey="type" />
          <Dropdown label="Level" value={filters.level} options={EXAM_LEVELS} filterKey="level" />
          <Dropdown label="Conducted By" value={filters.body} options={CONDUCTING_BODY} filterKey="body" />
        </div>

        {/* EXAMS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExams.map((exam) => (
            <Link
              key={exam.slug}
              href={`/exams/${exam.slug}`}
              className="
                group relative overflow-hidden rounded-2xl border
                dark:border-slate-800
                transition hover:-translate-y-1 hover:shadow-xl
              "
            >
              {/* background image */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
                style={{ backgroundImage: `url(${randomImage(exam.slug)})` }}
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

              {/* content */}
              <div className="relative p-6">
                <h3 className="font-semibold text-white">
                  {exam.name}
                </h3>
                <p className="text-sm text-gray-200 mt-1">
                  {exam.type} · {exam.body}
                </p>
              </div>
            </Link>
          ))}

          {filteredExams.length === 0 && (
            <div className="col-span-full text-center text-muted py-12">
              No exams found for selected filters
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
