"use client";

import { Icon } from "@iconify/react";
import React, { useState, useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { colleges } from "@/app/api/data";
import CollegeCard from "./CollegeCard";

const ExploreColleges: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref);

  // Filter colleges based on search query
  const filteredColleges = useMemo(() => {
    if (!searchQuery.trim()) {
      return colleges.slice(0, 10); // Show first 10 by default
    }

    const query = searchQuery.toLowerCase();
    return colleges.filter(
      (college) =>
        college.name.toLowerCase().includes(query) ||
        college.shortName?.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        college.city.toLowerCase().includes(query) ||
        college.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Animation variants
  const badgeAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 },
    transition: { duration: 0.6 },
  };

  const titleAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay: 0.1 },
  };

  const descriptionAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const statsAnimation = (index: number) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
    transition: { duration: 0.6, delay: 0.3 + index * 0.1 },
  });

  const searchAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, delay: 0.5 },
  };

  const cardAnimation = (index: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.6, delay: 0.6 + index * 0.05 },
  });

  const emptyStateAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            {...badgeAnimation}
            className="inline-flex items-center bg-border dark:bg-darkHeroBg rounded-full px-4 py-2 mb-6"
          >
            <Icon icon="mdi:school" className="text-primary w-5 h-5 mr-2" />
            <span className="text-primary text-sm">Premier Institutions</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            {...titleAnimation}
            className="md:text-50 sm:text-40 text-28 text-midnight_text dark:text-white font-bold leading-tight"
          >
            Explore Top Colleges
            <br />
            <span className="text-primary">&amp; Universities</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            {...descriptionAnimation}
            className="mt-6 text-muted dark:text-white/70 sm:text-lg"
          >
            Explore trending colleges and universities with expert guidance,
            helping you choose courses that match your passion, goals, and
            career aspirations effortlessly.
          </motion.p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {[0, 1, 2].map((index) => (
              <motion.div key={index} {...statsAnimation(index)}>
                <div className="text-4xl font-bold text-midnight_text dark:text-white">
                  {index === 0 ? colleges.length : index === 1 ? "30" : "50+"}
                </div>
                <div className="text-muted text-sm">
                  {index === 0
                    ? "Colleges Listed"
                    : index === 1
                    ? "Universities"
                    : "Top Rankings"}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search Box */}
          <motion.div {...searchAnimation} className="mt-12 mx-auto max-w-2xl">
            <div className="flex items-center bg-white dark:bg-darkHeroBg shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="px-6 py-4 flex items-center text-muted dark:text-white/70 w-full">
                <Icon icon="mdi:magnify" className="w-5 h-5 mr-3 text-muted flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by college name, location, or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full placeholder:text-muted focus:outline-none text-base bg-transparent dark:text-white text-midnight_text transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* College Cards Grid */}
        <div className="mt-16">
          {filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {filteredColleges.map((college, index) => (
                <motion.div key={college.id} {...cardAnimation(index)}>
                  <CollegeCard college={college} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div {...emptyStateAnimation} className="text-center py-12">
              <Icon icon="mdi:magnify-off" className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No colleges found for &quot;{searchQuery}&quot;
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Try searching with different keywords
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreColleges;
