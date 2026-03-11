"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { colleges } from "@/app/api/data";

const ExploreColleges: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCollegeSlug, setActiveCollegeSlug] = useState(colleges[0]?.slug ?? "");
  const ref = useRef(null);
  const inView = useInView(ref);

  const [liveStats, setLiveStats] = useState({
    total: 0,
    universities: 0,
    topRanked: 0,
  });

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${baseUrl}/college/all`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const list: { type?: string; nirfRanking?: number }[] =
          data?.data ?? (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          setLiveStats({
            total: list.length,
            universities: list.filter((c) => c.type === "University").length,
            topRanked: list.filter((c) => c.nirfRanking != null && c.nirfRanking <= 100).length,
          });
        }
      })
      .catch(() => { });
  }, []);

  const filteredColleges = useMemo(() => {
    if (!searchQuery.trim()) {
      return colleges.slice(0, 6);
    }

    const query = searchQuery.toLowerCase();
    return colleges
      .filter(
        (college) =>
          college.name.toLowerCase().includes(query) ||
          college.shortName?.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.city.toLowerCase().includes(query) ||
          college.type.toLowerCase().includes(query) ||
          college.category?.toLowerCase().includes(query) ||
          college.description.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    if (!filteredColleges.length) {
      return;
    }

    const exists = filteredColleges.some((college) => college.slug === activeCollegeSlug);
    if (!exists) {
      setActiveCollegeSlug(filteredColleges[0].slug);
    }
  }, [filteredColleges, activeCollegeSlug]);

  const activeCollege =
    filteredColleges.find((college) => college.slug === activeCollegeSlug) ||
    filteredColleges[0];

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

  const listAnimation = (index: number) => ({
    initial: { opacity: 0, x: -20 },
    animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
    transition: { duration: 0.45, delay: 0.55 + index * 0.07 },
  });

  const emptyStateAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="relative overflow-hidden py-8 bg-white dark:bg-black" ref={ref}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/10"
        animate={{ x: [0, 24, 0], y: [0, -10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl dark:bg-accent/10"
        animate={{ x: [0, -24, 0], y: [0, 10, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Sparkle dots */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="pointer-events-none absolute left-[8%] top-24 hidden h-2 w-2 rounded-full bg-accent lg:block"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-[10%] top-32 hidden h-1.5 w-1.5 rounded-full bg-secondary lg:block"
      />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="relative overflow-hidden rounded-[28px] border border-secondary/15 bg-gradient-to-b from-secondary/5 via-white to-white px-5 py-7 shadow-sm dark:border-primary/30 dark:from-slate-900 dark:via-black dark:to-black md:px-10 md:py-8">
          <motion.div
            {...badgeAnimation}
            className="mx-auto mb-6 inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 dark:border-secondary/30 dark:bg-secondary/15"
          >
            <Icon icon="mdi:school" className="mr-2 h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">Premier Institutions</span>
          </motion.div>

          <motion.h2
            {...titleAnimation}
            className="text-center text-30 font-bold leading-tight text-midnight_text dark:text-white sm:text-36 md:text-44"
          >
            Explore Top Colleges
            <br />
            <span className="text-secondary">&amp; Universities</span>
          </motion.h2>

          <motion.p
            {...descriptionAnimation}
            className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted dark:text-white/70 sm:text-base"
          >
            Explore trending colleges and universities with expert guidance,
            helping you choose courses that match your passion, goals, and
            career aspirations effortlessly.
          </motion.p>

          <div className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-2 shadow-sm dark:border-gray-700 dark:bg-darkHeroBg/80">
            <div className="grid grid-cols-3 items-center divide-x divide-gray-200 dark:divide-gray-700">
              {[
                {
                  value: liveStats.total > 0 ? `${liveStats.total}` : "—",
                  label: "Colleges Listed",
                },
                {
                  value: liveStats.universities > 0 ? `${liveStats.universities}` : "—",
                  label: "Universities",
                },
                {
                  value: liveStats.topRanked > 0 ? `${liveStats.topRanked}+` : "—",
                  label: "Top Rankings",
                },
              ].map((item, index) => (
                <motion.div key={item.label} {...statsAnimation(index)} className="px-2 py-2 text-center">
                  <p className="text-2xl font-bold text-midnight_text dark:text-white sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted sm:text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...searchAnimation} className="mx-auto mt-5 max-w-2xl">
            <div className="interactive-surface flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-darkHeroBg">
              <div className="flex w-full items-center px-6 py-4 text-muted dark:text-white/70">
                <Icon icon="mdi:magnify" className="mr-3 h-5 w-5 flex-shrink-0 text-secondary" />
                <input
                  type="text"
                  placeholder="Search by college name, location, or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-base text-midnight_text placeholder:text-muted transition-all focus:outline-none dark:text-white"
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-8">
            {filteredColleges.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="lg:col-span-7"
                >
                  {activeCollege ? (
                    <div className="relative overflow-hidden rounded-3xl border border-secondary/15 bg-gradient-to-b from-secondary/5 via-white to-white shadow-sm dark:border-primary/30 dark:from-slate-900 dark:via-black dark:to-black">
                      <div className="relative h-[20rem] md:h-[24rem]">
                        {activeCollege.featuredImage ? (
                          <Image
                            src={activeCollege.featuredImage}
                            alt={activeCollege.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-primary/10 to-accent/10" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

                        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          <Icon icon="mdi:shield-check" className="h-4 w-4" />
                          {activeCollege.category || "Featured"}
                        </div>

                        <div className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {activeCollege.rating.toFixed(1)} ★
                        </div>

                        <motion.div
                          key={activeCollege.slug}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className="absolute bottom-5 left-5 right-5"
                        >
                          <p className="text-xs tracking-wide text-white/85">{activeCollege.city}</p>
                          <h3 className="mt-1 text-2xl font-bold leading-tight text-white md:text-3xl">
                            {activeCollege.name}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/90 line-clamp-2 md:line-clamp-3">
                            {activeCollege.description}
                          </p>
                        </motion.div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 border-t border-secondary/15 p-5 dark:border-primary/20 md:p-6">
                        <Link
                          href={`/college/${activeCollege.slug}`}
                          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
                        >
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                          Explore {activeCollege.shortName || "College"}
                          <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
                        </Link>

                        <Link
                          href="/college"
                          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-midnight_text transition hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-darkmode"
                        >
                          View All Colleges
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </motion.div>

                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-secondary/15 bg-gradient-to-b from-secondary/5 to-white p-3 shadow-sm dark:border-primary/30 dark:from-slate-900 dark:to-black">
                    <div className="mb-2 px-2 pt-2">
                      <p className="text-xs font-semibold tracking-wide text-secondary">QUICK PICKS</p>
                      <p className="mt-1 text-sm text-muted dark:text-white/60">
                        Hover a college to instantly preview details.
                      </p>
                    </div>

                    <div className="max-h-[28rem] overflow-y-auto pr-1">
                      {filteredColleges.map((college, index) => {
                        const isActive = activeCollege?.slug === college.slug;

                        return (
                          <motion.div key={college.id} {...listAnimation(index)}>
                            <button
                              type="button"
                              onClick={() => setActiveCollegeSlug(college.slug)}
                              onMouseEnter={() => setActiveCollegeSlug(college.slug)}
                              onFocus={() => setActiveCollegeSlug(college.slug)}
                              className={`group mt-2 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${isActive
                                  ? "border-secondary/35 bg-secondary/10 shadow-sm"
                                  : "border-secondary/10 bg-white/90 hover:-translate-y-0.5 hover:border-secondary/30 hover:bg-secondary/5 dark:border-primary/20 dark:bg-darkmode dark:hover:bg-slate-800"
                                }`}
                            >
                              <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-midnight_text dark:text-white">
                                  {college.name}
                                </p>
                                <p className="mt-1 text-xs text-muted dark:text-white/60">
                                  {college.type} • {college.location}
                                </p>
                              </div>

                              <div className="ml-3 flex items-center gap-2">
                                <span className="text-sm font-semibold text-midnight_text dark:text-white">
                                  {college.rating.toFixed(1)}
                                </span>
                                <Icon icon="ph:star-fill" className="h-4 w-4 text-yellow-400" />
                                <Icon
                                  icon="solar:alt-arrow-right-linear"
                                  className={`h-4 w-4 text-secondary transition-transform duration-300 ${isActive ? "translate-x-0.5" : "group-hover:translate-x-0.5"
                                    }`}
                                />
                              </div>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div {...emptyStateAnimation} className="py-12 text-center">
                <Icon icon="mdi:magnify-off" className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-700" />
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  No colleges found for &quot;{searchQuery}&quot;
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                  Try searching with different keywords
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreColleges;
