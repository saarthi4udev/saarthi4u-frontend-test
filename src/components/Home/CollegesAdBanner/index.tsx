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
          className="group flex flex-col gap-4 rounded-2xl border border-border bg-white px-5 py-4 text-left shadow-sm transition hover:border-secondary/50 hover:shadow-lg dark:border-dark_border dark:bg-midnight_text/5 sm:flex-row sm:items-center sm:justify-between sm:rounded-3xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition group-hover:bg-secondary/15">
              <Icon icon="solar:document-add-bold" className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Associated Universities
              </p>
              <h2 className="mt-0.5 text-base font-bold text-midnight_text dark:text-white sm:text-lg">
                Download Fee Structures, Brochures & College Details
              </h2>
              <p className="mt-0.5 text-xs text-muted dark:text-slate-400">
                Compare fees, rankings & placements across 100+ partner colleges — all in downloadable PDFs
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-lg bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary transition group-hover:bg-secondary/15 sm:self-center">
            <Icon icon="solar:download-minimalistic-bold" className="text-base" />
            View & Download
            <Icon
              icon="solar:arrow-right-linear"
              className="text-base transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </Link>
      </div>
    </motion.section>
  );
};

export default CollegesAdBanner;
