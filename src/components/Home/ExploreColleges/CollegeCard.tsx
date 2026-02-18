"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { College } from "@/types/college";

interface CollegeCardProps {
  college: College;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Icon
            key={`full-${i}`}
            icon="ph:star-fill"
            className="w-4 h-4 text-yellow-400"
          />
        ))}
        {halfStars > 0 && (
          <Icon icon="ph:star-half-fill" className="w-4 h-4 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty-${i}`}
            icon="ph:star-bold"
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-darkmode border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow"
    >
      {/* Logo Section */}
      <motion.div
        className="flex items-start justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={college.logo}
            alt={college.name}
            width={60}
            height={60}
            className="object-contain p-2"
          />
        </motion.div>
        <motion.span
          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Icon icon="mdi:shield-check" width="14" height="14" />
          {college.category}
        </motion.span>
      </motion.div>

      {/* Name and Location */}
      <motion.h3
        className="text-lg font-semibold text-midnight_text dark:text-white mb-2 line-clamp-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {college.name}
      </motion.h3>

      <motion.div
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <Icon icon="mdi:map-marker" width="16" height="16" />
        <span>{college.location}</span>
      </motion.div>

      {/* Rating Section */}
      <motion.div
        className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            {renderStars(college.rating)}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {college.rating.toFixed(1)} ({college.reviews}) {college.category}
          </span>
        </div>
      </motion.div>

      {/* Type Badge */}
      <motion.div
        className="flex items-center gap-2 mb-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        <Icon icon="mdi:school" className="text-primary w-4 h-4" />
        <span className="text-gray-700 dark:text-gray-300">
          Type: <span className="font-medium">{college.type}</span>
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {college.description}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <motion.button
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon="mdi:eye" width="18" height="18" />
          View Details
        </motion.button>
        <motion.div className="ml-auto">
          <Link
            href={`/college/${college.slug}`}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition text-sm font-semibold"
          >
            <motion.span
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Explore
            </motion.span>
            <motion.span
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CollegeCard;
