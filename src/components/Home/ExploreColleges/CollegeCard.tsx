"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

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
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {

  const location =
    [college.city, college.state].filter(Boolean).join(", ") ||
    "Location not available";

  /**
   * Remove HTML tags from overview
   */
  const cleanOverview = college.overview
    ? college.overview.replace(/<[^>]*>?/gm, "")
    : "No description available.";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        bg-white dark:bg-slate-900
        border border-gray-200 dark:border-slate-700
        rounded-2xl p-6
        flex flex-col
        shadow-sm hover:shadow-lg
        transition
        h-full min-h-[24rem]
      "
    >
      {/* Logo + Category */}
      <div className="flex items-start justify-between mb-4">

        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">

          {college.logo ? (
            <Image
              src={college.logo}
              alt={college.name}
              width={60}
              height={60}
              className="object-contain"
            />
          ) : (
            <Icon
              icon="mdi:school"
              className="w-8 h-8 text-primary"
            />
          )}

        </div>

        {college.Category?.name && (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {college.Category.name}
          </span>
        )}

      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {college.name}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-3">
        <Icon icon="mdi:map-marker-outline" width="16" height="16" />
        <span>{location}</span>
      </div>

      {/* Type */}
      {college.type && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
          <Icon icon="mdi:domain" width="16" height="16" />
          <span>
            Type: <span className="font-medium capitalize">{college.type}</span>
          </span>
        </div>
      )}

      {/* Established */}
      {college.establishedYear && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
          <Icon icon="mdi:calendar" width="16" height="16" />
          <span>Established: {college.establishedYear}</span>
        </div>
      )}

      {/* Affiliation */}
      {college.affiliation && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <Icon icon="mdi:school-outline" width="16" height="16" />
          <span>{college.affiliation}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-grow">
        {cleanOverview}
      </p>

      {/* Explore Button */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
        <Link
          href={`/college/${college.slug}`}
          className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-semibold transition"
        >
          <Icon icon="mdi:eye-outline" width="18" height="18" />
          Explore
          <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
        </Link>
      </div>

    </motion.div>
  );
};

export default CollegeCard;