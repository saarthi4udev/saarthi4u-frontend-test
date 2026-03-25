"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { getAllTestimonials } from "@/app/api/testimonials";
import type { Testimonial } from "@/types/testimonial";
import { DEMO_TESTIMONIALS } from "@/types/testimonial";

function mapApiToTestimonial(item: any, fallbackId: number): Testimonial {
  return {
    id: String(item?._id || item?.id || fallbackId),
    name: item?.name || item?.fullName || "Student",
    role: item?.role || "Student",
    city: item?.city || "",
    quote: item?.message || item?.quote || "Great guidance and very smooth experience.",
    rating: Number(item?.rating || 5),
    avatarUrl: item?.avatarUrl || item?.image || "/avatar.png",
  };
}

function getCardsPerPage(width: number): number {
  if (width >= 1200) {
    return 3;
  }
  if (width >= 700) {
    return 2;
  }
  return 1;
}

// ---------------------------------------------------------------------------
// Star Rating
// ---------------------------------------------------------------------------
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon={
            star <= Math.floor(rating)
              ? "ph:star-fill"
              : star - 0.5 <= rating
              ? "ph:star-half-fill"
              : "ph:star"
          }
          className="h-4 w-4 text-amber-400"
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="group flex h-full min-h-[250px] flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-dark_border dark:bg-midnight_text md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-secondary/25 bg-slate-100 shadow-sm dark:bg-slate-800">
          <Image
            src={t.avatarUrl}
            alt={t.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-15 font-bold text-midnight_text dark:text-white">{t.name}</p>
          <p className="truncate text-13 text-muted dark:text-white/55">
            {t.role}
            {t.city ? `, ${t.city}` : ""}
          </p>
          <div className="mt-1">
            <StarRating rating={t.rating} />
          </div>
        </div>
      </div>

      <div className="mb-2">
        <Icon icon="solar:chat-round-bold-duotone" className="text-24 text-secondary/45" />
      </div>

      <p className="flex-1 text-14 leading-relaxed text-midnight_text/85 dark:text-white/80">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="mt-4 h-px w-full rounded-full bg-secondary/20" />
    </article>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(3);

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // ---------------------------------------------------------------------------
  // API CALL
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTestimonials();
        const dataArray = Array.isArray(res) ? res : (res as any)?.data || [];
        const formatted = dataArray.map((item: any, index: number) =>
          mapApiToTestimonial(item, index + 1)
        );

        setTestimonials(formatted);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const syncPerPage = () => {
      const cards = getCardsPerPage(window.innerWidth);
      setPerPage(cards);
    };

    syncPerPage();
    window.addEventListener("resize", syncPerPage);

    return () => {
      window.removeEventListener("resize", syncPerPage);
    };
  }, []);

  // fallback
  const finalTestimonials =
    testimonials.length > 0 ? testimonials : DEMO_TESTIMONIALS;

  const totalPages = Math.max(1, Math.ceil(finalTestimonials.length / perPage));
  const avgRating =
    finalTestimonials.reduce((sum, item) => sum + item.rating, 0) /
    finalTestimonials.length;

  const goTo = useCallback(
    (page: number, dir: 1 | -1) => {
      setDirection(dir);
      setPageIndex(((page % totalPages) + totalPages) % totalPages);
    },
    [totalPages]
  );

  const prev = () => goTo(pageIndex - 1, -1);
  const next = () => goTo(pageIndex + 1, 1);

  const startIdx = pageIndex * perPage;
  const visibleCards = finalTestimonials.slice(startIdx, startIdx + perPage);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  // ---------------------------------------------------------------------------
  // LOADING UI
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <section className="py-10 text-center text-midnight_text dark:text-white">
        <p>Loading testimonials...</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-12 dark:bg-dark_b md:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-12 h-52 w-52 rounded-full bg-secondary/8 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
      </div>
      <div className="container mx-auto px-4">

        <div className="relative z-10 mb-8 text-center md:mb-9">
          <h2 className="text-28 font-bold text-midnight_text dark:text-white md:text-35">
            What Our Students Say
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-14 text-muted dark:text-white/65">
            Real feedback from students and parents across cities.
          </p>
        </div>

        <div className="relative z-10 mb-5 flex flex-wrap items-center justify-center gap-3 text-13">
          <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 font-semibold text-secondary">
            {finalTestimonials.length}+ reviews
          </span>
          <span className="rounded-full border border-border bg-white px-3 py-1 font-semibold text-midnight_text dark:border-dark_border dark:bg-midnight_text dark:text-white">
            Avg rating {avgRating.toFixed(1)} / 5
          </span>
        </div>

        <div className="relative z-10">
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute -left-1 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-midnight_text shadow-sm transition hover:border-secondary hover:text-secondary md:flex dark:border-dark_border dark:bg-midnight_text dark:text-white"
          >
            <Icon icon="solar:arrow-left-bold" className="text-18" />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute -right-1 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-midnight_text shadow-sm transition hover:border-secondary hover:text-secondary md:flex dark:border-dark_border dark:bg-midnight_text dark:text-white"
          >
            <Icon icon="solar:arrow-right-bold" className="text-18" />
          </button>

          <div className="overflow-hidden md:px-8">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={pageIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleCards.map((t) => (
                  <TestimonialCard key={t.id} t={t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > pageIndex ? 1 : -1)}
              aria-label={`Go to testimonial page ${i + 1}`}
              className={`h-2 rounded-full ${
                i === pageIndex
                  ? "w-7 bg-secondary"
                  : "w-2 bg-slate-300 dark:bg-slate-600"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 mt-4 flex justify-center md:hidden">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white p-1 dark:border-dark_border dark:bg-midnight_text">
            <button
              onClick={prev}
              aria-label="Previous testimonials"
              className="flex h-8 w-8 items-center justify-center rounded-full text-midnight_text transition hover:bg-secondary/10 hover:text-secondary dark:text-white"
            >
              <Icon icon="solar:arrow-left-bold" className="text-16" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonials"
              className="flex h-8 w-8 items-center justify-center rounded-full text-midnight_text transition hover:bg-secondary/10 hover:text-secondary dark:text-white"
            >
              <Icon icon="solar:arrow-right-bold" className="text-16" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}