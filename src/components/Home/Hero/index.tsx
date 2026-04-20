"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { getCollegeCount } from "@/app/api/colleges";
import { getAllCarouselImages } from "@/app/api/carouselApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const [collegeCount, setCollegeCount] = useState<string>("");
  const swiperRef = useRef<SwiperType | null>(null);

  const [heroVisuals, setHeroVisuals] = useState<
    {
      src: string;
      title: string;
      subtitle: string;
      gradient: string;
    }[]
  >([]);

  useEffect(() => {
    getCollegeCount()
      .then((data) => {
            

        const count = data.total;
        if (count > 0) {
          setCollegeCount(
            count >= 1000
              ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K+`
              : `${count}+`
          );
        }
      })
      .catch(() => {});

    getAllCarouselImages()
      .then((data) => {
        const gradients = [
          "from-secondary/15 via-heroBg to-primary/10 dark:from-primary/25 dark:via-darkHeroBg dark:to-midnight_text",
          "from-primary/10 via-heroBg to-secondary/15 dark:from-midnight_text dark:via-darkHeroBg dark:to-primary/20",
          "from-accent/10 via-heroBg to-secondary/10 dark:from-primary/20 dark:via-darkHeroBg dark:to-midnight_text",
          "from-secondary/15 via-heroBg to-primary/10 dark:from-primary/25 dark:via-darkHeroBg dark:to-midnight_text",
        ];

        const formattedData = data.map((item, index) => ({
          src: item.imageUrl,
          title: item.title || `Slide ${index + 1}`,
          subtitle: item.description || "",
          gradient: gradients[index % gradients.length],
        }));

        setHeroVisuals(formattedData);
      })
      .catch(() => {});
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

  const fallbackVisuals: typeof heroVisuals = [];

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

  const sliderData = heroVisuals.length > 0 ? heroVisuals : fallbackVisuals;

  return (
    <section className="relative overflow-hidden bg-heroBg py-1 dark:bg-midnight_text lg:py-2">
      <div className="absolute -left-1/4 top-0 z-0 h-full w-full rounded-b-[120px] bg-heroBg dark:bg-darkHeroBg" />

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
        <div className="grid grid-cols-12 items-center gap-y-4 lg:gap-x-6">
          <motion.div {...leftAnimation} className="col-span-12 flex flex-col justify-center lg:col-span-6">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-white/70 px-3 py-1 text-13 font-semibold text-secondary dark:bg-darkHeroBg/60">
              <Icon icon="solar:shield-check-linear" className="text-sm" />
              Trusted platform for education planning
            </div>

            <div className="relative">
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

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mb-1 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-12 font-black tracking-[0.14em] text-secondary uppercase"
              >
                Your Journey, Our Passion
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="mb-2 text-28 leading-tight font-extrabold text-midnight_text dark:text-white sm:text-35 md:text-40 lg:text-48"
              >
                Build Your Future with the
                <span className="mt-1 block bg-linear-to-r from-secondary via-accent to-secondary bg-[length:200%_200%] bg-clip-text text-transparent">
                  Right College, Right Career at Right Time.
                </span>
              </motion.h1>

              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.92, 1, 0.92] }}
                transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="mb-3 h-1 w-full max-w-[200px] rounded-full bg-linear-to-r from-secondary/35 via-accent/65 to-secondary/35"
              />
            </div>

            <p className="max-w-xl text-14 leading-relaxed text-muted dark:text-white/70 sm:text-15 lg:text-16">
              Saarthi4u helps students and parents discover options and move from
              confusion to confident admission decisions.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:gap-3">
              <Link
                href="/signup"
                className="group relative flex h-11 items-center justify-center gap-2 overflow-hidden rounded-lg border border-accent bg-accent px-6 text-14 font-semibold text-primary transition hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 sm:h-12 sm:text-16"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Start Your Journey
                <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
              </Link>

              <Link
                href="/college"
                className="flex h-11 items-center justify-center rounded-lg border border-secondary/40 px-6 text-14 font-semibold text-secondary transition hover:bg-secondary hover:text-white sm:h-12 sm:text-16"
              >
                Explore Colleges
              </Link>

              <Link
                href="/course"
                className="flex h-11 items-center justify-center rounded-lg px-2 text-14 font-semibold text-muted transition hover:text-secondary dark:text-white/80 sm:h-12 sm:text-16"
              >
                Explore Courses
              </Link>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 sm:gap-x-5">
              {trustPoints.map((point) => (
                <p
                  key={point}
                  className="inline-flex items-center gap-1.5 text-13 font-medium text-muted dark:text-white/75"
                >
                  <Icon icon="solar:verified-check-bold" className="text-secondary text-sm" />
                  {point}
                </p>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="group rounded-lg border border-border bg-white px-2 py-2 text-center transition-all duration-300 hover:border-secondary/40 hover:shadow-md hover:shadow-secondary/10 dark:border-dark_border dark:bg-darkHeroBg sm:rounded-xl sm:px-3 sm:py-2.5"
                >
                  <p className="text-16 font-bold text-secondary transition-transform duration-300 group-hover:scale-105 sm:text-18">
                    {item.value}
                  </p>
                  <p className="text-12 text-muted dark:text-white/70 sm:text-13">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...rightAnimation} className="relative col-span-12 lg:col-span-6">
            {sliderData.length > 0 ? (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="relative w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/8 dark:ring-white/10 sm:rounded-3xl"
            >
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 2600, disableOnInteraction: false }}
                pagination={{ clickable: true, el: ".hero-swiper-pagination" }}
                loop={sliderData.length > 1}
                speed={800}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                className="w-full"
              >
                {sliderData.map((slide, index) => (
                  <SwiperSlide key={slide.src}>
                    <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10]">
                      <Image
                        src={slide.src}
                        alt={slide.title || "Saarthi4U feature"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        priority={index === 0}
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Nav arrows */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1.5 text-primary shadow-md backdrop-blur-sm transition hover:bg-white dark:bg-black/50 dark:text-white dark:hover:bg-black/70 sm:left-3 sm:p-2"
                aria-label="Previous slide"
              >
                <Icon icon="solar:alt-arrow-left-linear" width="16" height="16" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1.5 text-primary shadow-md backdrop-blur-sm transition hover:bg-white dark:bg-black/50 dark:text-white dark:hover:bg-black/70 sm:right-3 sm:p-2"
                aria-label="Next slide"
              >
                <Icon icon="solar:alt-arrow-right-linear" width="16" height="16" />
              </button>

              {/* Pagination dots */}
              <div className="hero-swiper-pagination absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5" />
            </motion.div>
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-white/50 dark:bg-slate-800/50 sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10]">
                <Icon icon="mdi:image-outline" width="48" height="48" className="text-slate-300 dark:text-slate-600" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;