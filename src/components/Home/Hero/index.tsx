"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Hero = () => {
  const [collegeCount, setCollegeCount] = useState<string>("1,200+");

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${baseUrl}/college/all`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const list: unknown[] = data?.data ?? (Array.isArray(data) ? data : []);
        const count = list.length;
        if (count > 0) {
          setCollegeCount(
            count >= 1000
              ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K+`
              : `${count}+`
          );
        }
      })
      .catch(() => { });
  }, []);

  const leftAnimation = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.65 },
  };

  const rightAnimation = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.65 },
  };

  const heroVisuals = [
    {
      src: "/images/hero/guidence.svg",
      title: "Personalized direction",
      subtitle: "Find paths that match your goals",
      gradient: "from-secondary/15 via-heroBg to-primary/10 dark:from-primary/25 dark:via-darkHeroBg dark:to-midnight_text",
    },
    {
      src: "/images/hero/ai_rec.svg",
      title: "Confident comparisons",
      subtitle: "Compare colleges and outcomes faster",
      gradient: "from-primary/10 via-heroBg to-secondary/15 dark:from-midnight_text dark:via-darkHeroBg dark:to-primary/20",
    },
    {
      src: "/images/hero/decision.svg",
      title: "Admission support",
      subtitle: "Move from planning to action",
      gradient: "from-accent/10 via-heroBg to-secondary/10 dark:from-primary/20 dark:via-darkHeroBg dark:to-midnight_text",
    },
  ];

  const trustPoints = [
    "Personalized recommendations",
    "Admission timeline support",
    "Expert counseling guidance",
  ];

  const stats = [
    { value: "50K+", label: "students guided" },
    { value: collegeCount, label: "colleges listed" },
    { value: "95%", label: "satisfaction rate" },
  ];

  return (
    <section className="relative overflow-hidden bg-heroBg pb-4 pt-2 dark:bg-midnight_text lg:pb-6 lg:pt-3">
      <div className="absolute -left-1/4 top-0 z-0 h-full w-full rounded-b-[120px] bg-heroBg dark:bg-darkHeroBg" />
      {/* Floating glow orbs */}
      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute right-10 top-28 z-0 hidden h-44 w-44 rounded-full bg-secondary/15 blur-3xl lg:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-12 left-8 z-0 hidden h-40 w-40 rounded-full bg-accent/15 blur-3xl lg:block"
      />
      {/* Sparkle dots */}
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[18%] top-20 z-0 hidden h-2 w-2 rounded-full bg-accent lg:block"
      />
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
        className="pointer-events-none absolute right-[30%] top-44 z-0 hidden h-1.5 w-1.5 rounded-full bg-secondary lg:block"
      />
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
        className="pointer-events-none absolute left-[15%] top-36 z-0 hidden h-1.5 w-1.5 rounded-full bg-accent lg:block"
      />
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        className="pointer-events-none absolute bottom-24 right-[25%] z-0 hidden h-2 w-2 rounded-full bg-secondary/80 lg:block"
      />

      <div className="container relative z-10 mx-auto px-4 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-12 items-center gap-y-6 lg:gap-x-8">
          <motion.div {...leftAnimation} className="col-span-12 lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-white/70 px-3 py-1.5 text-13 font-semibold text-secondary dark:bg-darkHeroBg/60">
              <Icon icon="solar:shield-check-linear" className="text-sm" />
              Trusted platform for education planning
            </div>

            <div className="relative">
              {/* Golden star sparkles near heading */}
              <motion.div
                animate={{ opacity: [0, 1, 0], rotate: [0, 180, 360], scale: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-3 top-2 hidden lg:block"
              >
                <Icon icon="ph:sparkle-fill" className="text-accent text-lg" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0], rotate: [0, -180, -360], scale: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="pointer-events-none absolute -right-2 top-10 hidden lg:block"
              >
                <Icon icon="ph:sparkle-fill" className="text-secondary text-sm" />
              </motion.div>

              <h1 className="mb-4 text-32 leading-tight font-extrabold text-midnight_text dark:text-white sm:text-44 md:text-50">
                Build your future with the
                <span className="mt-1 block bg-linear-to-r from-secondary via-secondary/80 to-accent bg-clip-text text-transparent">
                  right college and course choices
                </span>
              </h1>
            </div>

            <p className="max-w-2xl text-17 text-muted dark:text-white/70 sm:text-19">
              Saarthi4U helps students and families discover options, compare outcomes,
              and move from confusion to confident admission decisions.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/signup"
                className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-lg border border-accent bg-accent px-6 text-15 font-semibold text-primary transition hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Start Your Journey
                <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
              </Link>

              <Link
                href="/college"
                className="flex h-12 items-center rounded-lg border border-secondary/40 px-6 text-15 font-semibold text-secondary transition hover:bg-secondary hover:text-white"
              >
                Explore Colleges
              </Link>

              <Link
                href="/course"
                className="flex h-12 items-center rounded-lg px-2 text-15 font-semibold text-muted transition hover:text-secondary dark:text-white/80"
              >
                Explore Courses
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {trustPoints.map((point) => (
                <p
                  key={point}
                  className="inline-flex items-center gap-1.5 text-14 font-medium text-muted dark:text-white/75"
                >
                  <Icon icon="solar:verified-check-bold" className="text-secondary" />
                  {point}
                </p>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="group rounded-xl border border-border bg-white px-4 py-3 text-center transition-all duration-300 hover:border-secondary/40 hover:shadow-md hover:shadow-secondary/10 dark:border-dark_border dark:bg-darkHeroBg">
                  <p className="text-22 font-bold text-secondary transition-transform duration-300 group-hover:scale-105">{item.value}</p>
                  <p className="text-13 text-muted dark:text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...rightAnimation} className="relative col-span-12 lg:col-span-6 lg:pl-2">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="mx-auto w-full max-w-2xl rounded-3xl border border-border bg-white/80 p-4 shadow-xl backdrop-blur-sm dark:border-dark_border dark:bg-darkHeroBg/70"
            >
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2400 }}
                loop
                className="w-full"
              >
                {heroVisuals.map((slide, index) => (
                  <SwiperSlide key={slide.src}>
                    <div className={`rounded-2xl border border-border bg-linear-to-br p-5 dark:border-dark_border ${slide.gradient}`}>
                      <div className="mb-4">
                        <p className="text-16 font-semibold text-midnight_text dark:text-white">{slide.title}</p>
                        <p className="text-14 text-muted dark:text-white/70">{slide.subtitle}</p>
                      </div>
                      <Image
                        src={slide.src}
                        alt="Saarthi4U feature"
                        width={680}
                        height={560}
                        priority={index === 0}
                        className="mx-auto h-[300px] w-full max-w-xl object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            <div className="mx-auto mt-3 w-full max-w-2xl rounded-xl border border-border bg-white px-4 py-2.5 dark:border-dark_border dark:bg-darkHeroBg">
              <p className="text-center text-14 font-medium text-muted dark:text-white/75">
                Guidance, discovery, and admission support in one place.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
