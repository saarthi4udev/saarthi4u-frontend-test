import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { getInternationalCollegeBySlug } from "@/app/api/colleges";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const college = await getInternationalCollegeBySlug(slug);

  if (!college) {
    return {
      title: "College Not Found | Saarthi4u",
    };
  }

  return {
    title: `${college.name} | Study Abroad Admission Guidance`,
    description: `Explore ${college.name} for international education. Get details on courses, admission process, and global career opportunities at Saarthi4u.`,
  };
}

export default async function InternationalCollegeDetailPage({ params }: Props) {
  const { slug } = await params;

  const college = await getInternationalCollegeBySlug(slug);
  if (!college) return notFound();

  const locationParts = (college.location || "").split(",").map((s: string) => s.trim());
  const city = locationParts[0] || "";
  const country = locationParts[1] || "";

  return (
    <div className="min-h-screen bg-heroBg dark:bg-slate-950">

      {/* HERO */}
      <div className="relative h-[220px] md:h-[280px] w-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.2),transparent_45%)]" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto max-w-6xl w-full px-4 pb-7 text-white lg:px-6">

            {/* Breadcrumb */}
            <nav className="mb-3 flex items-center gap-1.5 text-xs font-medium text-white/55">
              <span>Home</span>
              <Icon icon="solar:alt-arrow-right-linear" className="text-[0.6rem]" />
              <span>International Colleges</span>
              <Icon icon="solar:alt-arrow-right-linear" className="text-[0.6rem]" />
              <span className="text-white/90">{college.name}</span>
            </nav>

            <div className="flex items-end gap-4">
              <div className="hidden h-[68px] w-[68px] flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/25 bg-white shadow-xl sm:flex">
                <Icon icon="mdi:school" className="h-7 w-7 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-white text-[1.35rem] font-extrabold tracking-tight sm:text-2xl md:text-[1.75rem] leading-snug">
                  {college.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-[0.8rem] text-white/75">
                  {college.location && (
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:map-point-bold-duotone" className="text-sm text-secondary" />
                      {college.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto max-w-6xl px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Description */}
            {college.description && (
              <div className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm dark:border-dark_border dark:bg-midnight_text">
                <div className="flex items-center gap-2.5 border-b border-border/30 bg-gradient-to-r from-heroBg/60 to-white px-6 py-3.5 dark:border-dark_border dark:from-dark_b dark:to-midnight_text">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15">
                    <Icon icon="solar:document-text-bold-duotone" className="text-sm text-secondary" />
                  </div>
                  <h2 className="text-[0.9rem] font-bold text-primary dark:text-white">About this Institution</h2>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[0.875rem] leading-[1.75] text-slate-600 dark:text-white/70">
                    {college.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-4 lg:self-start">

            {/* Quick Info */}
            <div className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm dark:border-dark_border dark:bg-midnight_text">
              <div className="bg-gradient-to-r from-primary to-primary/90 px-5 py-3.5">
                <h3 className="flex items-center gap-2 text-[0.85rem] font-bold text-white">
                  <Icon icon="solar:info-circle-bold" className="text-base text-secondary" />
                  Quick Info
                </h3>
              </div>
              <div className="divide-y divide-border/25 dark:divide-dark_border">
                <QuickInfoRow icon="solar:map-point-bold-duotone" label="City" value={city} />
                <QuickInfoRow icon="solar:globe-bold-duotone" label="Country" value={country} />
                <QuickInfoRow icon="solar:map-point-bold-duotone" label="Location" value={college.location} />
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

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
