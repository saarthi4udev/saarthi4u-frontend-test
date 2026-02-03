"use client";

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
  "Haryana",
];

const CATEGORIES = [
  "All Categories",
  "Engineering",
  "Medical",
  "Arts & Science",
];

const OWNERSHIP = [
  "All Ownership",
  "Government",
  "Private",
];

/* ---------------- COLLEGES DATA (40+) ---------------- */

const colleges = [
  // DELHI
  { name: "AIIMS Delhi", state: "Delhi", category: "Medical", ownership: "Government", slug: "aiims-delhi" },
  { name: "Delhi Technological University (DTU)", state: "Delhi", category: "Engineering", ownership: "Government", slug: "dtu" },
  { name: "Jamia Millia Islamia", state: "Delhi", category: "Arts & Science", ownership: "Government", slug: "jamia" },
  { name: "University of Delhi", state: "Delhi", category: "Arts & Science", ownership: "Government", slug: "du" },

  // MAHARASHTRA
  { name: "IIT Bombay", state: "Maharashtra", category: "Engineering", ownership: "Government", slug: "iit-bombay" },
  { name: "AIIMS Nagpur", state: "Maharashtra", category: "Medical", ownership: "Government", slug: "aiims-nagpur" },
  { name: "College of Engineering Pune (COEP)", state: "Maharashtra", category: "Engineering", ownership: "Government", slug: "coep" },
  { name: "Symbiosis International University", state: "Maharashtra", category: "Arts & Science", ownership: "Private", slug: "symbiosis" },

  // TAMIL NADU
  { name: "IIT Madras", state: "Tamil Nadu", category: "Engineering", ownership: "Government", slug: "iit-madras" },
  { name: "Christian Medical College, Vellore", state: "Tamil Nadu", category: "Medical", ownership: "Private", slug: "cmc-vellore" },
  { name: "Anna University", state: "Tamil Nadu", category: "Engineering", ownership: "Government", slug: "anna-university" },
  { name: "Madras University", state: "Tamil Nadu", category: "Arts & Science", ownership: "Government", slug: "madras-university" },

  // KARNATAKA
  { name: "IISc Bangalore", state: "Karnataka", category: "Engineering", ownership: "Government", slug: "iisc" },
  { name: "NIMHANS", state: "Karnataka", category: "Medical", ownership: "Government", slug: "nimhans" },
  { name: "RV College of Engineering", state: "Karnataka", category: "Engineering", ownership: "Private", slug: "rvce" },
  { name: "Bangalore University", state: "Karnataka", category: "Arts & Science", ownership: "Government", slug: "bangalore-university" },

  // UTTAR PRADESH
  { name: "IIT Kanpur", state: "Uttar Pradesh", category: "Engineering", ownership: "Government", slug: "iit-kanpur" },
  { name: "AIIMS Gorakhpur", state: "Uttar Pradesh", category: "Medical", ownership: "Government", slug: "aiims-gorakhpur" },
  { name: "Amity University Noida", state: "Uttar Pradesh", category: "Engineering", ownership: "Private", slug: "amity-noida" },
  { name: "Banaras Hindu University (BHU)", state: "Uttar Pradesh", category: "Arts & Science", ownership: "Government", slug: "bhu" },

  // GUJARAT
  { name: "IIT Gandhinagar", state: "Gujarat", category: "Engineering", ownership: "Government", slug: "iit-gandhinagar" },
  { name: "AIIMS Rajkot", state: "Gujarat", category: "Medical", ownership: "Government", slug: "aiims-rajkot" },
  { name: "Nirma University", state: "Gujarat", category: "Engineering", ownership: "Private", slug: "nirma" },

  // RAJASTHAN
  { name: "IIT Jodhpur", state: "Rajasthan", category: "Engineering", ownership: "Government", slug: "iit-jodhpur" },
  { name: "AIIMS Jodhpur", state: "Rajasthan", category: "Medical", ownership: "Government", slug: "aiims-jodhpur" },
  { name: "University of Rajasthan", state: "Rajasthan", category: "Arts & Science", ownership: "Government", slug: "university-of-rajasthan" },
];

const getRandomImage = (seed: number) =>
  `https://picsum.photos/seed/${seed}/600/400`;


/* ---------------- COMPONENT ---------------- */

export default function CollegesSection() {
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    state: "All States",
    category: "All Categories",
    ownership: "All Ownership",
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

  const filteredColleges = colleges.filter((c) =>
    (filters.state === "All States" || c.state === filters.state) &&
    (filters.category === "All Categories" || c.category === filters.category) &&
    (filters.ownership === "All Ownership" || c.ownership === filters.ownership)
  );

  const Dropdown = ({ label, value, options, keyName }: any) => (
    <div className="relative w-1/3">
      <button
        onClick={() => setOpen(open === keyName ? null : keyName)}
        className="w-full h-14 px-6 flex justify-between items-center text-sm font-medium"
      >
        <span><span className="text-muted">{label}:</span> {value}</span>
        <span>▾</span>
      </button>

      {open === keyName && (
        <div className="absolute z-50 bg-white dark:bg-[#0f172a] border rounded-xl w-full mt-2 max-h-64 overflow-auto">
          {options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => {
                setFilters({ ...filters, [keyName]: opt });
                setOpen(null);
              }}
              className="block w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-[#020617]"
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
            Explore <span className="text-primary">Colleges</span>
          </h2>
          <p className="text-muted mt-3">
            Filter colleges by state, category, and ownership
          </p>
        </div>

        {/* FILTER BAR */}
        <div ref={barRef} className="flex border rounded-2xl mb-12">
          <Dropdown label="State" value={filters.state} options={STATES} keyName="state" />
          <Dropdown label="Category" value={filters.category} options={CATEGORIES} keyName="category" />
          <Dropdown label="Ownership" value={filters.ownership} options={OWNERSHIP} keyName="ownership" />
        </div>

        {/* COLLEGE LIST */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college, idx) => (
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
                  {college.name}
                </h3>
                <p className="mt-2 text-sm text-gray-200">
                  {college.state} • {college.category} • {college.ownership}
                </p>
              </Link>
            </li>

          ))}

          {filteredColleges.length === 0 && (
            <li className="col-span-full px-6 py-10 text-center text-muted">
              No colleges found for selected filters
            </li>
          )}
        </ul>

      </div>
    </section>
  );
}
