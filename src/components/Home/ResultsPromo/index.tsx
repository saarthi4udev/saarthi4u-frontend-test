"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const quickPoints = [
  "Board-wise structured result links",
  "Fast access to official result portals",
  "Updated and easy-to-navigate listings",
];

const ResultsPromo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-10 bg-hero-bg dark:bg-dark_b">
      <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm dark:border-dark_border dark:bg-midnight_text md:p-8 lg:p-9"
        >
          <motion.div
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-secondary/12"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="pointer-events-none absolute left-[15%] top-6 h-1.5 w-1.5 rounded-full bg-accent"
          />

          <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: -12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-4 inline-flex h-9 items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 text-13 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/15"
              >
                <Icon icon="solar:document-text-bold" className="text-16" />
                New: Result Section
              </motion.span>

              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-28 font-bold text-midnight_text dark:text-white"
              >
                Check Board Results in One Place
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="mt-3 max-w-2xl text-16 leading-relaxed text-muted dark:text-white/70"
              >
                Quickly view SSC, HSC, CBSE, NCERT and other board result links,
                then continue directly to the official website.
              </motion.p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {quickPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                    transition={{ duration: 0.45, delay: 0.25 + index * 0.08 }}
                    className="flex items-center gap-2 rounded-xl border border-border bg-hero-bg/70 px-3 py-2 text-14 text-midnight_text dark:border-dark_border dark:bg-dark_b dark:text-white/80"
                  >
                    <Icon icon="solar:check-circle-bold" className="text-16 text-secondary" />
                    {point}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex items-center justify-start lg:justify-end lg:self-end"
            >
              <Link
                href="/results"
                className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-accent px-6 text-14 font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25 hover:bg-accent-dark"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                View Results
                <Icon
                  icon="solar:arrow-right-outline"
                  className="text-18 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsPromo;
