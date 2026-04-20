"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getHomeSection, HomeSectionData } from "@/app/api/homeSectionApi";

const PromoSection = () => {
  const [promoData, setPromoData] = useState<HomeSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromoSection = async () => {
      try {
        setLoading(true);
        const data = await getHomeSection();
        setPromoData(data);
      } catch (error) {
        console.error("Failed to fetch promo section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoSection();
  }, []);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-14 pt-8 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
        <div className="container relative mx-auto px-4 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl)">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6 lg:max-w-xl">
              <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-16 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-24 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-[500px] animate-pulse rounded-[2rem] bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </section>
    );
  }

  if (!promoData) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-14 pt-8 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="container relative mx-auto px-4 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl)">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75 }}
          className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
        >
          <div className="space-y-6 lg:max-w-xl">
            <span className="inline-flex rounded-full border border-secondary/25 bg-secondary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-secondary dark:border-secondary/35 dark:bg-secondary/15">
              {promoData.header}
            </span>

            <h2 className="text-4xl font-extrabold leading-tight text-midnight_text dark:text-white sm:text-5xl">
              {promoData.title}
            </h2>

            <p className="max-w-2xl text-base leading-8 text-muted dark:text-slate-300 sm:text-lg">
              {promoData.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/course"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-primary transition duration-200 hover:bg-accent-dark"
              >
                View CAT + ICMAI course
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-6 text-sm font-semibold text-midnight_text transition duration-200 hover:border-secondary hover:bg-secondary/10 dark:border-dark_border dark:bg-slate-900 dark:text-white"
              >
                Book a demo session
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {promoData.tags?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-border bg-white/85 px-4 py-3 text-sm text-muted shadow-sm dark:border-dark_border dark:bg-slate-900/85 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_40px_80px_rgba(15,23,42,0.08)] dark:border-dark_border dark:bg-slate-900"
          >
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-950">
              <Image
                src={promoData.imageUrl}
                alt={promoData.title || "Promo image"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;