"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  college: any;
  courses?: any[];
  admissions?: any[];
  cutoffs?: any[];
  facilities?: any[];
  faculties?: any[];
  faqs?: any[];
  gallery?: any[];
  reviews?: any[];
  placements?: any[];
  recruiters?: any[];
}

const navItems = [
  { key: "courses", label: "Courses & Fees", icon: "solar:notebook-bold-duotone" },
  { key: "placements", label: "Placements", icon: "solar:graph-up-bold-duotone" },
  { key: "facilities", label: "Facilities", icon: "solar:buildings-2-bold-duotone" },
  { key: "faculty", label: "Faculty", icon: "solar:users-group-two-rounded-bold-duotone" },
  { key: "gallery", label: "Gallery", icon: "solar:gallery-bold-duotone" },
  { key: "faq", label: "FAQs", icon: "solar:chat-round-dots-bold-duotone" },
  { key: "reviews", label: "Reviews", icon: "solar:star-bold-duotone" },
];

const base = process.env.NEXT_PUBLIC_API_URL;


export default function CollegeTabs({
  college,
  courses = [],
  facilities = [],
  gallery = [],
  placements = [],
  faculties = [],
  faqs = [],
  reviews = [],
  recruiters = [],
}: Props) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (key: string) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visibleCourses = showAllCourses ? courses : courses.slice(0, 3);

  /* avg rating */
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((a: number, r: any) => a + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="space-y-8">

      {/* QUICK NAV */}
      <div className="sticky top-0 z-20 -mx-1 rounded-xl border border-border/30 bg-gradient-to-r from-heroBg/80 to-white px-2 py-2 shadow-sm dark:border-dark_border dark:from-dark_b/80 dark:to-midnight_text">
        <div className="scrollbar-hide flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.key)}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[0.78rem] font-semibold text-slate-500 transition-all hover:bg-white hover:text-primary hover:shadow-sm dark:text-white/55 dark:hover:bg-dark_b dark:hover:text-white"
            >
              <Icon icon={item.icon} className="text-[0.9rem] text-secondary" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── COURSES & FEES ─── */}
      <section ref={(el) => { sectionRefs.current["courses"] = el; }}>
        <SectionHeader icon="solar:notebook-bold-duotone" title="Courses & Fees" count={courses.length} />
        {courses.length === 0 ? (
          <EmptyState icon="solar:notebook-bold-duotone" text="No courses listed yet" />
        ) : (
          <div className="space-y-3">
            {visibleCourses.map((course: any, idx: number) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-xl border border-border/30 bg-white transition-shadow hover:shadow-md dark:border-dark_border dark:bg-midnight_text"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-heroBg/70 to-white px-5 py-3 dark:from-dark_b/60 dark:to-midnight_text">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon icon="solar:notebook-bold-duotone" className="text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[0.85rem] font-bold text-primary dark:text-white">{course.name}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-[0.7rem] text-slate-400 dark:text-white/50">
                        {course.specialization && (
                          <span className="flex items-center gap-1">
                            <Icon icon="solar:routing-2-bold" className="text-xs text-secondary" />
                            {course.specialization}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:clock-circle-bold" className="text-xs text-secondary" />
                          {course.duration || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[0.65rem] font-bold text-secondary">#{idx + 1}</span>
                </div>

                {course.fees?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[0.8rem]">
                      <thead>
                        <tr className="border-b border-border/25 bg-slate-50/50 dark:border-dark_border dark:bg-dark_b/20">
                          <th className="px-4 py-2 text-left text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40">Year</th>
                          <th className="px-4 py-2 text-left text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40">Tuition</th>
                          <th className="px-4 py-2 text-left text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40">Hostel</th>
                          <th className="px-4 py-2 text-left text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40">Exam</th>
                          <th className="px-4 py-2 text-left text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40">Other</th>
                          <th className="px-4 py-2 text-left text-[0.68rem] font-bold uppercase tracking-wider text-secondary">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.fees.map((fee: any) => (
                          <tr key={fee.id} className="border-b border-border/10 last:border-0 dark:border-dark_border/20">
                            <td className="px-4 py-2.5 font-semibold text-primary dark:text-white">{fee.year}</td>
                            <td className="px-4 py-2.5 text-slate-500 dark:text-white/65">₹{fee.tuitionFee?.toLocaleString()}</td>
                            <td className="px-4 py-2.5 text-slate-500 dark:text-white/65">₹{fee.hostelFee?.toLocaleString()}</td>
                            <td className="px-4 py-2.5 text-slate-500 dark:text-white/65">₹{fee.examFee?.toLocaleString()}</td>
                            <td className="px-4 py-2.5 text-slate-500 dark:text-white/65">₹{fee.otherFee?.toLocaleString()}</td>
                            <td className="px-4 py-2.5 font-bold text-secondary">₹{fee.totalFee?.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="px-5 py-3 text-[0.78rem] text-slate-400 dark:text-white/45">Fee details not available</p>
                )}
              </div>
            ))}

            {courses.length > 3 && (
              <button
                onClick={() => setShowAllCourses(!showAllCourses)}
                className="mx-auto flex items-center gap-1.5 rounded-lg bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 dark:bg-primary/15 dark:text-white dark:hover:bg-primary/25"
              >
                {showAllCourses ? "Show Less" : `View All ${courses.length} Courses`}
                <Icon icon={showAllCourses ? "solar:alt-arrow-up-bold" : "solar:alt-arrow-down-bold"} className="text-base" />
              </button>
            )}
          </div>
        )}
      </section>

      {/* ─── PLACEMENTS ─── */}
      <section ref={(el) => { sectionRefs.current["placements"] = el; }}>
        <SectionHeader icon="solar:graph-up-bold-duotone" title="Placements" count={placements.length} />
        {placements.length === 0 ? (
          <EmptyState icon="solar:graph-up-bold-duotone" text="No placement data available" />
        ) : (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {placements.map((p: any) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-border/30 bg-gradient-to-br from-heroBg/50 to-white p-4 transition-shadow hover:shadow-sm dark:border-dark_border dark:from-dark_b/50 dark:to-midnight_text"
                >
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/8 px-2 py-0.5 text-[0.68rem] font-bold text-primary dark:bg-primary/20 dark:text-white">
                    <Icon icon="solar:calendar-minimalistic-bold" className="text-[0.65rem]" />
                    {p.year}
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400 dark:text-white/45">Avg Package</p>
                      <p className="mt-0.5 text-[0.9rem] font-bold text-primary dark:text-white">{p.avgPackage || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400 dark:text-white/45">Highest</p>
                      <p className="mt-0.5 text-[0.9rem] font-bold text-secondary">{p.highestPackage || "—"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recruiters */}
            {recruiters.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-[0.82rem] font-bold text-primary dark:text-white">
                  <Icon icon="solar:case-round-bold-duotone" className="text-sm text-secondary" />
                  Top Recruiters
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recruiters.map((r: any) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-center rounded-lg border border-border/25 bg-white px-4 py-2.5 shadow-sm dark:border-dark_border dark:bg-midnight_text"
                    >
                      {r.logo ? (
                        <Image src={`${base}${r.logo}`} alt={r.name} width={80} height={40} className="h-7 w-auto object-contain" />
                      ) : (
                        <span className="text-[0.75rem] font-semibold text-slate-600 dark:text-white/60">{r.name || "Recruiter"}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── FACILITIES ─── */}
      <section ref={(el) => { sectionRefs.current["facilities"] = el; }}>
        <SectionHeader icon="solar:buildings-2-bold-duotone" title="Facilities" count={facilities.length} />
        {facilities.length === 0 ? (
          <EmptyState icon="solar:buildings-2-bold-duotone" text="No facilities listed" />
        ) : (
          <div className="flex flex-wrap gap-2">
            {facilities.map((f: any) => (
              <span
                key={f.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-secondary/15 bg-secondary/5 px-3 py-1.5 text-[0.78rem] font-medium text-slate-600 transition-colors hover:bg-secondary/10 hover:text-primary dark:border-secondary/25 dark:bg-secondary/10 dark:text-white/80"
              >
                <Icon icon="solar:check-circle-bold" className="text-xs text-secondary" />
                {f.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* ─── FACULTY ─── */}
      <section ref={(el) => { sectionRefs.current["faculty"] = el; }}>
        <SectionHeader icon="solar:users-group-two-rounded-bold-duotone" title="Faculty" count={faculties.length} />
        {faculties.length === 0 ? (
          <EmptyState icon="solar:users-group-two-rounded-bold-duotone" text="No faculty data available" />
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {faculties.map((f: any) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-xl border border-border/25 bg-white p-3 transition-shadow hover:shadow-sm dark:border-dark_border dark:bg-midnight_text"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/8">
                  <Icon icon="solar:user-bold-duotone" className="text-sm text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[0.82rem] font-bold text-primary dark:text-white">{f.name}</p>
                  <p className="truncate text-[0.7rem] text-slate-400 dark:text-white/50">{f.designation || "Faculty"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── GALLERY ─── */}
      <section ref={(el) => { sectionRefs.current["gallery"] = el; }}>
        <SectionHeader icon="solar:gallery-bold-duotone" title="Gallery" count={gallery.length} />
        {gallery.length === 0 ? (
          <EmptyState icon="solar:gallery-bold-duotone" text="No gallery images" />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {gallery.map((img: any, i: number) => {
              const src = img?.imageUrl || null;
              if (!src) return null;
              return (
                <div key={i} className="group relative overflow-hidden rounded-xl border border-border/30 dark:border-dark_border">
                  <Image
                    src={src}
                    alt={img.caption || "Gallery"}
                    width={400}
                    height={250}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent px-3 py-2.5 text-[0.7rem] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {img.caption}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── FAQs ─── */}
      <section ref={(el) => { sectionRefs.current["faq"] = el; }}>
        <SectionHeader icon="solar:chat-round-dots-bold-duotone" title="Frequently Asked Questions" count={faqs.length} />
        {faqs.length === 0 ? (
          <EmptyState icon="solar:chat-round-dots-bold-duotone" text="No FAQs available" />
        ) : (
          <div className="space-y-2">
            {faqs.map((f: any) => {
              const isOpen = openFaq === f.id;
              return (
                <div
                  key={f.id}
                  className={`overflow-hidden rounded-xl border transition-colors ${isOpen ? "border-secondary/25 bg-heroBg/40 dark:border-secondary/15 dark:bg-dark_b/50" : "border-border/25 bg-white dark:border-dark_border dark:bg-midnight_text"}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : f.id)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left"
                  >
                    <span className="text-[0.82rem] font-semibold text-primary dark:text-white">{f.question}</span>
                    <Icon
                      icon="solar:alt-arrow-down-bold"
                      className={`flex-shrink-0 text-lg text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-secondary" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/15 px-5 py-3 text-[0.8rem] leading-relaxed text-slate-500 dark:border-dark_border/30 dark:text-white/65">
                          {f.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── REVIEWS ─── */}
      <section ref={(el) => { sectionRefs.current["reviews"] = el; }}>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeader icon="solar:star-bold-duotone" title="Reviews" count={reviews.length} />
          {avgRating && (
            <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 dark:bg-amber-950/30">
              <Icon icon="solar:star-bold" className="text-sm text-amber-400" />
              <span className="text-[0.82rem] font-bold text-amber-600 dark:text-amber-300">{avgRating}</span>
              <span className="text-[0.7rem] text-slate-400 dark:text-white/45">/ 5</span>
            </div>
          )}
        </div>
        {reviews.length === 0 ? (
          <EmptyState icon="solar:star-bold-duotone" text="No reviews yet" />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {reviews.map((r: any) => (
              <div
                key={r.id}
                className="rounded-xl border border-border/25 bg-white p-4 dark:border-dark_border dark:bg-midnight_text"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/8">
                      <Icon icon="solar:user-bold-duotone" className="text-sm text-primary" />
                    </div>
                    <p className="text-[0.82rem] font-bold text-primary dark:text-white">{r.userName || "Anonymous"}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon={i < (r.rating || 0) ? "solar:star-bold" : "solar:star-line-duotone"}
                        className={`text-xs ${i < (r.rating || 0) ? "text-amber-400" : "text-border dark:text-dark_border"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-slate-500 dark:text-white/65">{r.review}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ icon, title, count }: { icon: string; title: string; count?: number }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/12">
        <Icon icon={icon} className="text-sm text-secondary" />
      </div>
      <h3 className="text-[0.9rem] font-bold text-primary dark:text-white">{title}</h3>
      {count !== undefined && count > 0 && (
        <span className="rounded-md bg-primary/6 px-1.5 py-0.5 text-[0.68rem] font-bold text-primary/70 dark:bg-primary/20 dark:text-white/70">
          {count}
        </span>
      )}
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/30 py-8 text-center dark:border-dark_border">
      <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-heroBg dark:bg-dark_b">
        <Icon icon={icon} className="text-xl text-slate-300 dark:text-white/30" />
      </div>
      <p className="text-[0.78rem] text-slate-400 dark:text-white/45">{text}</p>
    </div>
  );
}