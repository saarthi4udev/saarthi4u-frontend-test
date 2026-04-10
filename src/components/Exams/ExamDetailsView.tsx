"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";

type Props = {
  exam: any;
  relatedColleges: any[];
};

function formatDate(value?: string) {
  if (!value) return "TBA";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function sectionText(value: unknown, fallback: string) {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value.join(", ");
  }

  return fallback;
}

function StatItem({ icon, label, value }: { icon: string; label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        <Icon icon={icon} className="h-4 w-4 text-secondary" />
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-primary dark:text-white">{value || "-"}</p>
    </div>
  );
}

function DetailCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] dark:border-white/10 dark:bg-slate-900/80">
      <h3 className="text-24 font-extrabold text-primary dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

function DateItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl border border-primary/10 bg-white/85 p-4 dark:border-white/10 dark:bg-slate-950/70">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-primary dark:text-white">{formatDate(value)}</p>
    </div>
  );
}

export default function ExamDetailsView({ exam, relatedColleges }: Props) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_34%,#f0fdfa_100%)] py-16 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_40%,#05111b_100%)] sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] overflow-hidden">
        <div className="animate-gradient-shift absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="animate-float absolute right-[-4rem] top-8 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/exam" className="font-medium transition-colors hover:text-primary">
            Exams
          </Link>
          <Icon icon="mdi:chevron-right" className="h-4 w-4" />
          <span className="font-semibold text-primary dark:text-white">{exam.name}</span>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-primary/10 bg-white/85 p-6 shadow-[0_30px_80px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.10),transparent_32%)]" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:bg-white/10 dark:text-secondary">
                {exam.level || "Exam"}
              </span>
              {exam.popular && (
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  Popular Exam
                </span>
              )}
            </div>

            <h1 className="mt-6 text-white text-35 font-extrabold leading-tight sm:text-48">
              {exam.name}
            </h1>

            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {sectionText(exam.overview, "Detailed exam information will be updated shortly.")}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <StatItem icon="mdi:office-building-outline" label="Conducting Body" value={exam.conductingBody} />
              <StatItem icon="mdi:refresh" label="Frequency" value={exam.frequency} />
              <StatItem icon="mdi:head-cog-outline" label="Mode" value={exam.examMode} />
              <StatItem icon="mdi:clock-outline" label="Duration" value={exam.duration} />
              <StatItem icon="mdi:currency-inr" label="Application Fee" value={sectionText(exam.applicationFee, "N/A")} />
              <StatItem icon="mdi:book-open-page-variant-outline" label="Category" value={exam.category} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.9fr)]">
          <div className="space-y-6">
            <DetailCard title="Eligibility" text={sectionText(exam.eligibility, "Eligibility details will be shared soon.")} />
            <DetailCard title="Exam Pattern" text={sectionText(exam.examPattern, "Exam pattern details will be shared soon.")} />
            <DetailCard title="Syllabus" text={sectionText(exam.syllabus, "Syllabus details will be shared soon.")} />
            <DetailCard title="Application Process" text={sectionText(exam.applicationProcess, "Application process details will be shared soon.")} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] dark:border-white/10 dark:bg-slate-900/80">
              <h3 className="text-24 font-extrabold text-primary dark:text-white">Important Dates</h3>
              <div className="mt-4 space-y-3">
                <DateItem label="Application Start" value={exam.importantDates?.applicationStart} />
                <DateItem label="Application End" value={exam.importantDates?.applicationEnd} />
                <DateItem label="Exam Date" value={exam.importantDates?.examDate} />
                <DateItem label="Result Date" value={exam.importantDates?.resultDate} />
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] dark:border-white/10 dark:bg-slate-900/80">
              <h3 className="text-24 font-extrabold text-primary dark:text-white">Official Website</h3>
              {exam.officialWebsite ? (
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Visit Website
                  <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
                </a>
              ) : (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Official website link is not available right now.</p>
              )}
            </div>
          </aside>
        </div>

        {relatedColleges.length > 0 && (
          <div className="mt-12">
            <h2 className="text-28 font-extrabold text-primary dark:text-white sm:text-35">
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
