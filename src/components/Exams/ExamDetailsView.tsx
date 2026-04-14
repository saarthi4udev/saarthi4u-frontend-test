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
    <div className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 dark:border-dark_border dark:bg-darkheader">
      <Icon icon={icon} className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
      <div className="min-w-0">
        <p className="text-11 font-semibold uppercase tracking-[0.12em] text-muted dark:text-white/60">{label}</p>
        <p className="mt-0.5 text-14 font-bold text-midnight_text dark:text-white">{value || "-"}</p>
      </div>
    </div>
  );
}

function DetailCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:border-dark_border dark:bg-darkheader">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 dark:bg-primary/20">
          <Icon icon={icon} className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-18 font-extrabold text-midnight_text dark:text-white">{title}</h3>
      </div>
      <p className="mt-3 text-14 leading-relaxed text-muted dark:text-white/70">{text}</p>
    </div>
  );
}

function DateItem({ icon, label, value }: { icon: string; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-hero-bg px-4 py-3 dark:border-dark_border dark:bg-dark_b">
      <Icon icon={icon} className="h-4 w-4 shrink-0 text-secondary" />
      <div className="min-w-0">
        <p className="text-11 font-semibold uppercase tracking-[0.12em] text-muted dark:text-white/60">{label}</p>
        <p className="mt-0.5 text-14 font-bold text-midnight_text dark:text-white">{formatDate(value)}</p>
      </div>
    </div>
  );
}

export default function ExamDetailsView({ exam, relatedColleges }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-hero-bg to-white py-10 dark:from-darkmode dark:to-darkmode sm:py-14">
      <div className="pointer-events-none absolute -left-24 top-10 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />

      <div className="container relative mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary via-primary to-primary/90 p-6 shadow-lg sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-secondary/20 blur-2xl" />

          <div className="relative">
            <h1 className="text-32 font-extrabold leading-tight text-white sm:text-44">
              {exam.name}
            </h1>

            <p className="mt-2 max-w-3xl text-15 leading-relaxed text-white/80">
              {sectionText(exam.overview, "Detailed exam information will be updated shortly.")}
            </p>
          </div>
        </div>

        {/* Stat Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
          <StatItem icon="mdi:office-building-outline" label="Conducting Body" value={exam.conductingBody} />
          <StatItem icon="mdi:refresh" label="Frequency" value={exam.frequency} />
          <StatItem icon="mdi:head-cog-outline" label="Mode" value={exam.examMode} />
          <StatItem icon="mdi:clock-outline" label="Duration" value={exam.duration} />
          <StatItem icon="mdi:currency-inr" label="Application Fee" value={sectionText(exam.applicationFee, "N/A")} />
          <StatItem icon="mdi:book-open-page-variant-outline" label="Category" value={exam.category} />
        </div>

        {/* Content Grid */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_22rem]">
          {/* Left Column - Details */}
          <div className="space-y-5">
            <DetailCard icon="mdi:school-outline" title="Eligibility" text={sectionText(exam.eligibility, "Eligibility details will be shared soon.")} />
            <DetailCard icon="mdi:format-list-checks" title="Exam Pattern" text={sectionText(exam.examPattern, "Exam pattern details will be shared soon.")} />
            <DetailCard icon="mdi:book-open-variant" title="Syllabus" text={sectionText(exam.syllabus, "Syllabus details will be shared soon.")} />
            <DetailCard icon="mdi:file-document-edit-outline" title="Application Process" text={sectionText(exam.applicationProcess, "Application process details will be shared soon.")} />
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">
            {/* Important Dates */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:border-dark_border dark:bg-darkheader">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary/10 dark:bg-secondary/20">
                  <Icon icon="mdi:calendar-clock" className="h-4 w-4 text-secondary" />
                </div>
                <h3 className="text-18 font-extrabold text-midnight_text dark:text-white">Important Dates</h3>
              </div>
              <div className="mt-4 space-y-2.5">
                <DateItem icon="mdi:calendar-arrow-right" label="Application Start" value={exam.importantDates?.applicationStart} />
                <DateItem icon="mdi:calendar-remove" label="Application End" value={exam.importantDates?.applicationEnd} />
                <DateItem icon="mdi:calendar-edit" label="Exam Date" value={exam.importantDates?.examDate} />
                <DateItem icon="mdi:calendar-check" label="Result Date" value={exam.importantDates?.resultDate} />
              </div>
            </div>

            {/* Official Website */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:border-dark_border dark:bg-darkheader">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Icon icon="mdi:web" className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-18 font-extrabold text-midnight_text dark:text-white">Official Website</h3>
              </div>
              {exam.officialWebsite ? (
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-14 font-semibold text-white transition-all duration-300 hover:opacity-90"
                >
                  Visit Website
                  <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4" />
                </a>
              ) : (
                <p className="mt-3 text-13 text-muted dark:text-white/70">Official website link is not available right now.</p>
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
