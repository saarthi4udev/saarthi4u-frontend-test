"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import EduLoader from "@/components/Common/EduLoader";

interface College {
  id: any;
  name: string;
  slug: string;
  logo?: string | null;
  type?: string | null;
  establishedYear?: number | null;
  affiliation?: string | null;
  city?: string | null;
  state?: string | null;
  overview?: string | null;
  Category?: {
    name?: string;
  };
}

interface CollegeCardProps {
  college: College;
  basePath?: string;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college, basePath = "/college" }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleNavigation = () => {
    setLoading(true);
    router.push(`${basePath}/${college.slug}`);
  };

  const location =
    [college.city, college.state].filter(Boolean).join(", ") ||
    "Location not available";

  /**
   * Remove HTML tags from overview
   */
  const cleanOverview = college.overview
    ? college.overview.replace(/<[^>]*>?/gm, "")
    : "No description available.";

  const quickMeta = [
    college.type ? { icon: "mdi:domain", label: college.type } : null,
    college.establishedYear
      ? { icon: "mdi:calendar", label: `Est. ${college.establishedYear}` }
      : null,
    college.affiliation
      ? { icon: "mdi:school-outline", label: college.affiliation }
      : null,
  ].filter(Boolean) as Array<{ icon: string; label: string }>;

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="
          group relative overflow-hidden
          rounded-2xl
          border border-primary/10 dark:border-white/10
          bg-white/95 dark:bg-slate-900/85
          p-4 sm:p-5
          flex flex-col
          shadow-[0_20px_44px_rgba(10,24,58,0.08)]
          transition-all duration-300
          hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_26px_60px_rgba(10,24,58,0.14)]
          h-full
        "
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

        {/* Logo + Category */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:border-white/10 dark:bg-slate-800">
            {college.logo ? (
              <Image
                src={college.logo}
                alt={college.name}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <Icon icon="mdi:school" className="w-8 h-8 text-primary" />
            )}
          </div>

          {college.Category?.name && (
            <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary dark:text-secondary">
              {college.Category.name}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="mb-1.5 line-clamp-2 text-sm font-bold leading-5 text-primary dark:text-white">
          {college.name}
        </h3>

        {/* Location */}
        <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-300">
          <Icon icon="mdi:map-marker-outline" width="16" height="16" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {quickMeta.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {quickMeta.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1 rounded-md border border-primary/10 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary/90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <Icon
                  icon={item.icon}
                  width="13"
                  height="13"
                  className="text-secondary"
                />
                <span className="line-clamp-1">{item.label}</span>
              </span>
            ))}
          </div>
        )}

  

        {/* Explore Button */}
        <div className="mt-auto pt-3">
          <button
            onClick={handleNavigation}
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:border-secondary/35 hover:bg-secondary/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <Icon icon="mdi:eye-outline" width="18" height="18" />
            View College
            <Icon
              icon="solar:alt-arrow-right-linear"
              width="14"
              height="14"
            />
          </button>
        </div>
      </motion.div>

      {/* Overlay Loader */}
      {loading && <EduLoader message="Loading…" />}
    </>
  );
};

export default CollegeCard;