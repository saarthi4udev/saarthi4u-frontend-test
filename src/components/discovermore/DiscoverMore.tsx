"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const discoverItems = [
  {
    title: "Online Courses",
    image: "/images/discover/online_learning.jpg",
    href: "/online-courses",
  },
  {
    title: "Courses",
    image: "/images/discover/courses.jpg",
    href: "/courses",
  },
  {
    title: "Admission",
    image: "/images/discover/admission.jpg",
    href: "/admission",
  },
  {
    title: "Examination",
    image: "/images/discover/exam.jpg",
    href: "/exams",
  },
  {
    title: "Seminar 2026",
    image: "/images/discover/seminar.jpg",
    href: "/seminars",
  },
  {
    title: "More",
    image: "/images/discover/more.jpg",
    href: "/explore",
  },
];

const DiscoverMore = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  /* SAME animation style as Payment */
  const topAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.3 },
  };

  const bottomAnimation = (index: number) => ({
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.3 + index * 0.2 },
  });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* BADGE */}
        <motion.div {...topAnimation} className="flex justify-center mb-6">
          <span className="px-6 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            EXPLORE MORE
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.h2
          {...topAnimation}
          className="text-40 md:text-48 font-semibold text-center text-gray-900 dark:text-white"
        >
          Discover <span className="text-blue-600">More</span>
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          {...topAnimation}
          className="mt-4 max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 text-18"
        >
          Find your perfect academic path with Saarthi4u, simplifying complex
          college and course decisions with confidence and multiple choices.
        </motion.p>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {discoverItems.map((item, index) => (
            <motion.div
              key={index}
              {...bottomAnimation(index)}
            >
              <Link
                href={item.href}
                className="
                  group
                  bg-gray-50
                  dark:bg-gray-900
                  rounded-2xl
                  p-6
                  flex flex-col items-center text-center
                  border border-gray-200 dark:border-gray-700
                  shadow-sm hover:shadow-lg transition-all
                "
              >
                {/* IMAGE */}
                <div className="w-28 h-28 rounded-xl overflow-hidden mb-6 bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-18 font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverMore;
