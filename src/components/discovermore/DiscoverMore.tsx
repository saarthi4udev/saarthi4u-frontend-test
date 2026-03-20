"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

const discoverItems = [
  {
    id: "01",
    title: "Online & Offline Courses",
    label: "Dual Learning",
    description: "Compare flexible online and campus-based programs in one place.",
    highlight: "Find the right format faster",
    image: "/images/discover/courses.jpg",
    href: "/course",
  },
  {
    id: "02",
    title: "Admission",
    label: "College Entry",
    description: "Explore institutions and find admission-ready college options.",
    highlight: "Shortlist top colleges confidently",
    image: "/images/discover/admission.jpg",
    href: "/college",
  },
  {
    id: "03",
    title: "Examination",
    label: "Exam Insights",
    description: "Discover exam details, timelines, and preparation pathways.",
    highlight: "Track exams and next deadlines",
    image: "/images/discover/exam.jpg",
    href: "/exam",
  },
  {
    id: "04",
    title: "Contact Us",
    label: "Get Guidance",
    description: "Connect with our team for counseling and personalized support.",
    highlight: "Get expert help instantly",
    image: "/images/discover/more.jpg",
    href: "/contact",
  },
];

const DiscoverMore = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = discoverItems[activeIndex];

  const sectionAnimation = {
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7 },
  };

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

  const rowAnimation = (index: number) => ({
    initial: { opacity: 0, x: -20 },
    animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
    transition: { duration: 0.45, delay: 0.25 + index * 0.08 },
  });

  return (
    <section ref={ref} className="relative overflow-hidden py-8 bg-heroBg dark:bg-black">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/10"
        animate={{ x: [0, 30, 0], y: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl dark:bg-accent/10"
        animate={{ x: [0, -30, 0], y: [0, 14, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Sparkle dots */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[12%] top-16 hidden h-2 w-2 rounded-full bg-accent lg:block"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="pointer-events-none absolute left-[10%] bottom-20 hidden h-1.5 w-1.5 rounded-full bg-secondary lg:block"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          {...sectionAnimation}
          className="rounded-3xl border border-secondary/15 bg-gradient-to-b from-secondary/5 via-white to-white p-5 shadow-sm backdrop-blur-sm dark:border-primary/30 dark:from-slate-900 dark:via-black dark:to-black md:p-7"
        >
        <motion.div {...badgeAnimation} className="flex justify-center mb-4">
          <span className="px-6 py-2 rounded-full text-sm font-semibold tracking-wide bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary">
            DISCOVER MORE
          </span>
        </motion.div>

        <motion.h2
          {...titleAnimation}
          className="text-32 md:text-40 font-semibold text-center text-gray-900 dark:text-white"
        >
          Choose Your Next <span className="text-secondary">Academic Step</span>
        </motion.h2>

        <motion.p
          {...descriptionAnimation}
          className="mt-2 max-w-2xl mx-auto text-center text-base leading-relaxed text-gray-600 dark:text-gray-300"
        >
          Explore key journeys from learning mode to admissions, exams, and
          direct expert support.
        </motion.p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            "Real-time route navigation",
            "Quick decision flow",
            "Personalized support ready",
          ].map((point, index) => (
            <motion.span
              key={point}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
              className="rounded-full border border-secondary/20 bg-white/80 px-4 py-2 text-xs font-medium text-primary dark:border-secondary/30 dark:bg-slate-900 dark:text-secondary"
            >
              {point}
            </motion.span>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white/70 p-2 dark:border-gray-700 dark:bg-slate-900/60">
              {discoverItems.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={item.title}
                    {...rowAnimation(index)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={`group mt-2 flex items-center justify-between rounded-xl px-4 py-4 transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "bg-transparent text-gray-700 hover:bg-secondary/8 dark:text-gray-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div>
                        <p className={`text-xs font-semibold tracking-wider ${isActive ? "text-secondary" : "text-secondary dark:text-secondary"}`}>
                          STEP {item.id}
                        </p>
                        <p className="mt-1 text-lg font-semibold">{item.title}</p>
                        <p className={`mt-1 text-sm ${isActive ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                          {item.highlight}
                        </p>
                      </div>
                      <span className={`text-xl transition-transform duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`} aria-hidden>
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 22 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-7"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900">
              <div className="relative h-64 w-full md:h-72">
                <Image
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 720px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                <motion.div
                  key={activeItem.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {activeItem.label}
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                    {activeItem.title}
                  </h3>
                </motion.div>
              </div>

              <motion.div
                key={activeItem.description}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="p-5 md:p-6"
              >
                <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                  {activeItem.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href={activeItem.href}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    Continue to {activeItem.title}
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-secondary/30 px-5 py-2.5 text-sm font-semibold text-secondary transition hover:bg-secondary/10 dark:border-secondary/40 dark:text-secondary dark:hover:bg-slate-800"
                  >
                    Talk to Counselor
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoverMore;
