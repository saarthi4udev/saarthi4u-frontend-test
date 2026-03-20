"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { getAllTestimonials } from "@/app/api/testimonials";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Testimonial {
  id: string;
  name: string;
  role: string;
  city?: string;
  quote: string;
  rating: number;
  avatarUrl: string;
}

// Fallback demo data
const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Demo User",
    role: "Student",
    city: "Mumbai",
    quote: "This platform really helped me shape my future.",
    rating: 5,
    avatarUrl: "/avatar.png",
  },
];

// Cards per page
const PER_PAGE = 2;

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
    <div className="flex h-full flex-col rounded-3xl border border-border bg-hero-bg p-6 shadow-sm dark:border-dark_border dark:bg-midnight_text md:p-8">
      <div className="mb-5 flex justify-center">
        <div className="relative h-18 w-18 overflow-hidden rounded-full border-4 border-white shadow-md dark:border-midnight_text">
          <Image
            src={t.avatarUrl}
            alt={t.name}
            fill
            sizes="72px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-3 flex justify-center">
        <Icon icon="solar:chat-round-bold-duotone" className="text-28 text-secondary/50" />
      </div>

      <p className="mb-6 flex-1 text-center text-16 leading-relaxed text-midnight_text dark:text-white/85">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="mx-auto mb-5 h-px w-14 rounded-full bg-secondary/30" />

      <div className="flex flex-col items-center gap-1.5">
        <StarRating rating={t.rating} />
        <p className="mt-1.5 text-16 font-bold text-midnight_text dark:text-white">
          {t.name}
        </p>
        <p className="text-13 text-muted dark:text-white/55">
          {t.role}
          {t.city ? `, ${t.city}` : ""}
        </p>
      </div>
    </div>
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

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // ---------------------------------------------------------------------------
  // API CALL
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTestimonials();

        // Map backend → UI format
        const dataArray = Array.isArray(res) ? res : (res as any)?.data || [];
        const formatted = dataArray.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || item.fullName,
          role: item.role || "Student",
          city: item.city || "",
          quote: item.message || item.quote,
          rating: item.rating || 5,
          avatarUrl: item.avatarUrl || "/avatar.png",
        }));

        setTestimonials(formatted);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // fallback
  const finalTestimonials =
    testimonials.length > 0 ? testimonials : DEMO_TESTIMONIALS;

  const totalPages = Math.ceil(finalTestimonials.length / PER_PAGE);

  const goTo = useCallback(
    (page: number, dir: 1 | -1) => {
      setDirection(dir);
      setPageIndex(((page % totalPages) + totalPages) % totalPages);
    },
    [totalPages]
  );

  const prev = () => goTo(pageIndex - 1, -1);
  const next = () => goTo(pageIndex + 1, 1);

  const startIdx = pageIndex * PER_PAGE;
  const visibleCards = finalTestimonials.slice(startIdx, startIdx + PER_PAGE);

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
      <section className="py-10 text-center">
        <p>Loading testimonials...</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-14 bg-white dark:bg-dark_b">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold dark:text-white">
            What Our Students Say
          </h2>
        </div>

        {/* SLIDER */}
        <div className="flex items-center gap-3">
          <button onClick={prev} className="hidden sm:flex">
            <Icon icon="solar:arrow-left-bold" />
          </button>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={pageIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid gap-5 sm:grid-cols-2"
              >
                {visibleCards.map((t) => (
                  <TestimonialCard key={t.id} t={t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={next} className="hidden sm:flex">
            <Icon icon="solar:arrow-right-bold" />
          </button>
        </div>

        {/* DOTS */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > pageIndex ? 1 : -1)}
              className={`h-2 rounded-full ${
                i === pageIndex ? "w-6 bg-secondary" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}