import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import CollegeTabs from "@/components/Colleges/CollegeTabs";

import {
  getCollegeBySlug,
  getCoursesByCollege,
  getAdmissionsByCollege,
  getCutoffsByCollege,
  getFacilitiesByCollege,
  getFacultiesByCollege,
  getFAQsByCollege,
  getGalleryByCollege,
  getReviewsByCollege,
  getPlacementsByCollege,
  getRecruitersByCollege,
  getCoursesWithFees
} from "@/app/api/colleges";

interface Props {
  params: Promise<{ slug: string }>;
}


function stripHtml(html?: string | null) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
}

export default async function CollegeDetailPage({ params }: Props) {
  const { slug } = await params;

  const college = await getCollegeBySlug(slug);
  if (!college) return notFound();

  const collegeId = college.id;

  const [
    courses, admissions, cutoffs, facilities, faculties,
    faqs, gallery, reviews, placements, recruiters,
  ] = await Promise.all([
    getCoursesWithFees(collegeId),
    getAdmissionsByCollege(collegeId),
    getCutoffsByCollege(collegeId),
    getFacilitiesByCollege(collegeId),
    getFacultiesByCollege(collegeId),
    getFAQsByCollege(collegeId),
    getGalleryByCollege(collegeId),
    getReviewsByCollege(collegeId),
    getPlacementsByCollege(collegeId),
    getRecruitersByCollege(collegeId),
  ]);

  const location =
    [college.city, college.state].filter(Boolean).join(", ") || "Location not available";

  const overviewText = stripHtml(college.overview);

  return (
    <div className="min-h-screen bg-heroBg dark:bg-slate-950">

      {/* ─── HERO ─── */}
      <div className="relative h-[280px] md:h-[340px] w-full overflow-hidden">
        <Image
          src={college.bannerImg || "/images/default-banner.jpg"}
          alt={college.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/65 to-primary/15" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto max-w-6xl w-full px-4 pb-7 text-white lg:px-6">

            {/* Breadcrumb */}
            <nav className="mb-3 flex items-center gap-1.5 text-xs font-medium text-white/55">
              <Link href="/" className="transition-colors hover:text-white/90">Home</Link>
              <Icon icon="solar:alt-arrow-right-linear" className="text-[0.6rem]" />
              <Link href="/college" className="transition-colors hover:text-white/90">Colleges</Link>
              <Icon icon="solar:alt-arrow-right-linear" className="text-[0.6rem]" />
              <span className="text-white/90">{college.name}</span>
            </nav>

            <div className="flex items-end gap-4">
              {/* Logo */}
              <div className="hidden h-[68px] w-[68px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/25 bg-white shadow-xl sm:flex">
                {college.logo ? (
                  <Image src={college.logo} alt={college.name} width={56} height={56} className="h-14 w-14 object-contain" />
                ) : (
                  <Icon icon="solar:buildings-3-bold-duotone" className="h-7 w-7 text-primary" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {college.Category?.name && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/25 px-2.5 py-1 text-[0.7rem] font-bold text-secondary backdrop-blur-sm">
                      <Icon icon="solar:tag-bold" className="text-[0.65rem]" />
                      {college.Category.name}
                    </span>
                  )}
                  {college.type && (
                    <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[0.7rem] font-bold text-white/85 backdrop-blur-sm">
                      {college.type}
                    </span>
                  )}
                </div>

                <h1 className="text-white text-[1.35rem] font-extrabold tracking-tight sm:text-2xl md:text-[1.75rem] leading-snug">
                  {college.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-[0.8rem] text-white/75">
                  <span className="flex items-center gap-1.5">
                    <Icon icon="solar:map-point-bold-duotone" className="text-sm text-secondary" />
                    {location}
                  </span>
                  {college.establishedYear && (
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:calendar-bold-duotone" className="text-sm text-secondary" />
                      Est. {college.establishedYear}
                    </span>
                  )}
                  {college.affiliation && (
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:diploma-verified-bold-duotone" className="text-sm text-secondary" />
                      {college.affiliation}
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="container mx-auto max-w-6xl px-4 py-6 lg:px-6">

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* LEFT — Primary content */}
          <div className="space-y-6">

            {/* Overview Card */}
            {overviewText && (
              <div className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm dark:border-dark_border dark:bg-midnight_text">
                <div className="flex items-center gap-2.5 border-b border-border/30 bg-gradient-to-r from-heroBg/60 to-white px-6 py-3.5 dark:border-dark_border dark:from-dark_b dark:to-midnight_text">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15">
                    <Icon icon="solar:document-text-bold-duotone" className="text-sm text-secondary" />
                  </div>
                  <h2 className="text-[0.9rem] font-bold text-primary dark:text-white">About this Institution</h2>
                </div>
                <div className="px-6 py-5">
                  {college.overview ? (
                    <div
                      className="prose prose-sm max-w-none text-[0.875rem] leading-[1.75] text-slate-600 dark:text-white/75 prose-p:my-1.5"
                      dangerouslySetInnerHTML={{ __html: college.overview }}
                    />
                  ) : (
                    <p className="text-[0.875rem] leading-[1.75] text-slate-600 dark:text-white/70">{overviewText}</p>
                  )}
                </div>
              </div>
            )}

            {/* All Sections */}
            <div className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm dark:border-dark_border dark:bg-midnight_text">
              <div className="p-4 md:p-6">
                <CollegeTabs
                  college={college}
                  courses={courses}
                  admissions={admissions}
                  cutoffs={cutoffs}
                  facilities={facilities}
                  faculties={faculties}
                  faqs={faqs}
                  gallery={gallery}
                  reviews={reviews}
                  placements={placements}
                  recruiters={recruiters}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-4 lg:self-start">

            {/* Quick Info Card */}
            <div className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm dark:border-dark_border dark:bg-midnight_text">
              <div className="bg-gradient-to-r from-primary to-primary/90 px-5 py-3.5">
                <h3 className="flex items-center gap-2 text-[0.85rem] font-bold text-white">
                  <Icon icon="solar:info-circle-bold" className="text-base text-secondary" />
                  Quick Info
                </h3>
              </div>
              <div className="divide-y divide-border/25 dark:divide-dark_border">
                <QuickInfoRow icon="solar:buildings-3-bold-duotone" label="Type" value={college.type} />
                <QuickInfoRow icon="solar:square-academic-cap-bold-duotone" label="Category" value={college.Category?.name} />
                <QuickInfoRow icon="solar:calendar-bold-duotone" label="Established" value={college.establishedYear} />
                <QuickInfoRow icon="solar:diploma-verified-bold-duotone" label="Affiliation" value={college.affiliation} />
                <QuickInfoRow icon="solar:map-point-bold-duotone" label="Location" value={location} />
              </div>
            </div>

            {/* CTA Card */}
            <div className="overflow-hidden rounded-2xl border border-secondary/25 bg-gradient-to-br from-secondary/5 via-heroBg to-white shadow-sm dark:border-secondary/20 dark:from-secondary/10 dark:via-dark_b dark:to-midnight_text">
              <div className="p-5 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15">
                  <Icon icon="solar:chat-round-call-bold-duotone" className="text-xl text-secondary" />
                </div>
                <h4 className="mb-1 text-[0.9rem] font-bold text-primary dark:text-white">Interested in this college?</h4>
                <p className="mb-4 text-[0.75rem] leading-relaxed text-slate-500 dark:text-white/55">Get details about admission, fees & scholarships</p>
                <button className="w-full rounded-xl bg-secondary px-4 py-3 text-[0.85rem] font-bold text-white shadow-md transition-all hover:bg-secondary/90 hover:shadow-lg">
                  Enquire Now
                </button>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

/* ─── Quick Info Row ─── */
function QuickInfoRow({ icon, label, value }: { icon: string; label: string; value?: any }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-heroBg dark:bg-dark_b">
        <Icon icon={icon} className="text-sm text-secondary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400 dark:text-white/45">{label}</p>
        <p className="mt-0.5 truncate text-[0.85rem] font-bold text-primary dark:text-white">{value || "N/A"}</p>
      </div>
    </div>
  );
}