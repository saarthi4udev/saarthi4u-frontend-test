"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import InstagramSlider from "@/components/Instagram/InstagramSlider";

const InstagramSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-hero-bg py-16 dark:bg-dark_b">
      {/* Decorative background blobs */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl dark:bg-pink-500/6"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl dark:bg-purple-500/6"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/5 blur-3xl dark:bg-pink-400/4" />

      <div className="container relative mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        {/* ── Section header ── */}
        <div className="mb-10 flex flex-col items-center gap-4">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.55 }}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 text-13 font-semibold text-pink-600 dark:border-pink-500/25 dark:bg-pink-500/10 dark:text-pink-400"
          >
            <Icon icon="fa6-brands:instagram" className="text-base" />
            Our Instagram Feed
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-28 font-bold text-midnight_text dark:text-white md:text-35"
          >
            Follow Us on{" "}
            <span className="bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparent">
              Instagram
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="max-w-md text-center text-14 text-muted dark:text-foottext"
          >
            Stay updated with the latest career tips, college insights &amp; guidance from our experts.
          </motion.p>

          {/* Handle pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            <Link
              href="https://www.instagram.com/saarthi4uofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 text-13 font-semibold text-pink-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400 hover:shadow-md dark:border-pink-500/25 dark:bg-dark_b/60 dark:text-pink-400 dark:hover:border-pink-400/50"
            >
              {/* Animated IG icon */}
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] transition-transform duration-300 group-hover:scale-110">
                <Icon icon="fa6-brands:instagram" className="text-12 text-white" />
              </span>
              @saarthi4uofficial
              <Icon icon="fa6-solid:arrow-up-right-from-square" className="text-10 opacity-60 transition-opacity group-hover:opacity-100" />
            </Link>
          </motion.div>
        </div>

        {/* ── Slider ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, delay: 0.32 }}
        >
          <InstagramSlider limit={9} />
        </motion.div>

        {/* ── CTA row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="https://www.instagram.com/saarthi4uofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#ee2a7b] to-[#6228d7] px-7 py-3 text-14 font-semibold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/30"
          >
            <Icon icon="fa6-brands:instagram" className="text-lg transition-transform duration-300 group-hover:scale-110" />
            View All Posts
            <Icon icon="fa6-solid:arrow-right" className="text-12 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
