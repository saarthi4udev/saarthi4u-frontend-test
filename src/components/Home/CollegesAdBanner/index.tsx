"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

const CollegesAdBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-[#ebf4ff] py-4 dark:bg-slate-950"
    >
      <div className="container mx-auto px-4 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl)">
        <Link
          href="/associated-universities"
          className="group flex flex-col gap-4 rounded-[32px] border border-border bg-white px-5 py-4 text-left shadow-sm transition hover:border-secondary/50 hover:shadow-lg dark:border-dark_border dark:bg-midnight_text/5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition group-hover:bg-secondary/15">
              <Icon icon="solar:buildings-2-bold" className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Explore Colleges
              </p>
              <h2 className="mt-2 text-xl font-bold text-midnight_text dark:text-white sm:text-2xl">
                100+ Colleges • Compare Fees • Rankings • Placements
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 text-right">
            <span className="text-sm text-muted dark:text-slate-300">
              Click to view our associated university network
            </span>
            <Icon
              icon="solar:arrow-right-linear"
              className="text-2xl text-secondary transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </Link>
      </div>
    </motion.section>
  );
};

export default CollegesAdBanner;
