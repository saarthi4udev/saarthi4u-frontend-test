"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";

type Props = {
  scholarship: any;
  relatedColleges: any[];
};

/* ---------------- HELPERS ---------------- */

function formatDate(value?: string) {
  if (!value) return "TBA";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function sectionText(value: unknown, fallback: string) {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value) && value.length > 0) return value.join(", ");
  return fallback;
}

/* ---------------- UI COMPONENTS ---------------- */

function StatItem({ icon, label, value }: any) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        <Icon icon={icon} className="h-4 w-4 text-secondary" />
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-primary dark:text-white">
        {value || "-"}
      </p>
    </div>
  );
}

function DetailCard({ title, text }: any) {
  return (
    <div className="rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] dark:border-white/10 dark:bg-slate-900/80">
      <h3 className="text-24 font-extrabold text-primary dark:text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
}

function DateItem({ label, value }: any) {
  return (
    <div className="rounded-xl border border-primary/10 bg-white/85 p-4 dark:border-white/10 dark:bg-slate-950/70">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-primary dark:text-white">
        {formatDate(value)}
      </p>
    </div>
  );
}

/* ---------------- MAIN ---------------- */

export default function ScholarshipDetailsView({
  scholarship,
  relatedColleges,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_34%,#f0fdfa_100%)] py-16 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_40%,#05111b_100%)]">
      
      {/* BACKGROUND EFFECT */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem]">
        <div className="absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute right-[-4rem] top-8 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/scholarships" className="hover:text-primary">
            Scholarships
          </Link>
          <Icon icon="mdi:chevron-right" />
          <span className="font-semibold text-primary dark:text-white">
            {scholarship.name}
          </span>
        </div>

        {/* HERO */}
        <div className="mt-6 rounded-[2rem] border border-primary/10 bg-white/85 p-6 shadow-[0_30px_80px_rgba(10,24,58,0.10)] dark:border-white/10 dark:bg-slate-900/80">
          
          <h1 className="text-35 font-extrabold text-primary dark:text-white">
            {scholarship.name}
          </h1>

          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-4xl">
            {sectionText(
              scholarship.overview,
              "Scholarship details will be updated soon."
            )}
          </p>

          {/* STATS */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <StatItem icon="mdi:tag-outline" label="Type" value={scholarship.scholarshipType} />
            <StatItem icon="mdi:office-building-outline" label="Provider" value={scholarship.provider} />
            <StatItem icon="mdi:school-outline" label="Level" value={scholarship.level} />
            <StatItem icon="mdi:currency-inr" label="Amount" value={scholarship.amount} />
            <StatItem icon="mdi:application-outline" label="Mode" value={scholarship.applicationMode} />
            <StatItem icon="mdi:web" label="Website" value={scholarship.officialWebsite} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">

          {/* LEFT */}
          <div className="space-y-6">
            <DetailCard title="Eligibility" text={sectionText(scholarship.eligibility, "Details coming soon.")} />
            <DetailCard title="Benefits" text={sectionText(scholarship.benefits, "Details coming soon.")} />
            <DetailCard title="Application Process" text={sectionText(scholarship.applicationProcess, "Details coming soon.")} />
            <DetailCard title="Documents Required" text={sectionText(scholarship.documentsRequired, "Details coming soon.")} />
            <DetailCard title="Selection Process" text={sectionText(scholarship.selectionProcess, "Details coming soon.")} />
            <DetailCard title="Renewal Process" text={sectionText(scholarship.renewalProcess, "Details coming soon.")} />
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">

            {/* DATES */}
            <div className="rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/80">
              <h3 className="text-24 font-extrabold text-primary dark:text-white">
                Important Dates
              </h3>

              <div className="mt-4 space-y-3">
                <DateItem label="Application Start" value={scholarship.importantDates?.applicationStart} />
                <DateItem label="Application End" value={scholarship.importantDates?.applicationEnd} />
                <DateItem label="Result Date" value={scholarship.importantDates?.resultDate} />
              </div>
            </div>

            {/* WEBSITE */}
            <div className="rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/80">
              <h3 className="text-24 font-extrabold text-primary dark:text-white">
                Official Website
              </h3>

              {scholarship.officialWebsite ? (
                <a
                  href={scholarship.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  Visit Website
                  <Icon icon="solar:alt-arrow-right-linear" />
                </a>
              ) : (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Website not available.
                </p>
              )}
            </div>

          </aside>
        </div>

        {/* RELATED COLLEGES */}
        {relatedColleges.length > 0 && (
          <div className="mt-12">
            <h2 className="text-28 font-extrabold text-primary dark:text-white">
              Related <span className="text-secondary">Colleges</span>
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}