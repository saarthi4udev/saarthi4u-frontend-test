"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { Testimonial } from "@/app/api/testimonials";

// ---------------------------------------------------------------------------
// Star rating helper
// ---------------------------------------------------------------------------
function StarRating({ rating, size = "md" }: Readonly<{ rating: number; size?: "sm" | "md" }>) {
  const cls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
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
          className={`${cls} text-amber-400`}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Individual testimonial card
// ---------------------------------------------------------------------------
function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
      className="group flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg dark:border-dark_border dark:bg-midnight_text"
    >
      {/* Top row: avatar + name/role */}
      <div className="mb-5 flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-secondary/25 shadow-sm">
          <Image
            src={testimonial.avatarUrl}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-16 font-bold text-midnight_text dark:text-white">
            {testimonial.name}
          </p>
          <p className="truncate text-13 text-muted dark:text-white/55">
            {testimonial.role}
            {testimonial.city ? `, ${testimonial.city}` : ""}
          </p>
          <div className="mt-1">
            <StarRating rating={testimonial.rating} size="sm" />
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="relative flex-1">
        <Icon
          icon="solar:chat-round-bold-duotone"
          className="mb-2 text-28 text-secondary/35"
        />
        <p className="text-14 leading-relaxed text-midnight_text/80 dark:text-white/75">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Stats bar
// ---------------------------------------------------------------------------
function StatsBar({ testimonials }: { testimonials: Testimonial[] }) {
  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;
  const fiveStarCount = testimonials.filter((t) => t.rating === 5).length;

  const stats = [
    { icon: "solar:users-group-rounded-bold-duotone", label: "Happy Students", value: `${testimonials.length}+` },
    { icon: "solar:star-bold-duotone", label: "Average Rating", value: avg.toFixed(1) },
    { icon: "solar:medal-ribbons-star-bold-duotone", label: "5-Star Reviews", value: `${fiveStarCount}+` },
    { icon: "solar:verified-check-bold-duotone", label: "Verified Stories", value: `${testimonials.length}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-white p-5 text-center shadow-sm dark:border-dark_border dark:bg-midnight_text"
        >
          <Icon icon={s.icon} className="text-28 text-secondary" />
          <p className="text-24 font-bold text-midnight_text dark:text-white">{s.value}</p>
          <p className="text-13 text-muted dark:text-white/55">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// Props:
//   testimonials – pass backend-fetched data; falls back to demo data
// ---------------------------------------------------------------------------
interface TestimonialsPageProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsPage({
  testimonials,
}: TestimonialsPageProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });

  // Filter state: 0 = all
  const [activeFilter, setActiveFilter] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  const testimonialsList = testimonials ?? [];

  const filtered = useMemo(
    () =>
      activeFilter === 0
        ? testimonialsList
        : testimonialsList.filter((t) => Math.floor(t.rating) === activeFilter),
    [testimonialsList, activeFilter]
  );

  const filterOptions: { label: string; value: 0 | 5 | 4 | 3 }[] = [
    { label: "All", value: 0 },
    { label: "5 Stars", value: 5 },
    { label: "4 Stars", value: 4 },
    { label: "3 Stars", value: 3 },
  ];

  return (
    <main className="min-h-screen bg-hero-bg dark:bg-dark_b">
      {/* ── Hero header ── */}
      <section
        ref={headerRef}
        className="relative overflow-hidden bg-white py-16 dark:bg-darkmode md:py-20"
      >
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/6 blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container relative mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-2 text-13 text-muted dark:text-white/50"
          >
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <Icon icon="solar:alt-arrow-right-bold" className="text-13" />
            <span className="text-midnight_text dark:text-white">Testimonials</span>
          </motion.nav>

          <div className="flex flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="mb-5 inline-flex h-9 items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 text-13 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/15"
            >
              <Icon icon="solar:star-bold-duotone" className="text-16" />
              Student Stories
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-35 font-bold tracking-tight text-midnight_text dark:text-white md:text-50"
            >
              What Our Students{" "}
              <span className="text-secondary">Say About Us</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-4 max-w-2xl text-16 leading-relaxed text-muted dark:text-white/65"
            >
              Real experiences from students and parents who navigated their future
              with Saarthi4u. Every story here is genuine — submitted directly through
              our platform.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-10">
        <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <StatsBar testimonials={testimonialsList} />
        </div>
      </section>

      {/* ── Grid section ── */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">

          {/* Filter pills */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-14 font-medium text-muted dark:text-white/55">
              Filter by:
            </span>
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value as 0 | 1 | 2 | 3 | 4 | 5)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-13 font-semibold transition-all duration-200 ${
                  activeFilter === opt.value
                    ? "border-secondary bg-secondary text-white shadow-sm"
                    : "border-border bg-white text-midnight_text hover:border-secondary/40 hover:bg-secondary/8 dark:border-dark_border dark:bg-midnight_text dark:text-white/80"
                }`}
              >
                {opt.value !== 0 && (
                  <Icon icon="ph:star-fill" className="h-3 w-3 text-amber-400" />
                )}
                {opt.label}
                <span
                  className={`ml-0.5 rounded-full px-1.5 py-0.5 text-11 ${
                    activeFilter === opt.value
                      ? "bg-white/25 text-white"
                      : "bg-secondary/10 text-secondary dark:bg-secondary/15"
                  }`}
                >
                  {opt.value === 0
                    ? testimonialsList.length
                    : testimonialsList.filter((t) => Math.floor(t.rating) === opt.value).length}
                </span>
              </button>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Icon icon="solar:star-bold-duotone" className="text-48 text-secondary/30" />
              <p className="text-16 font-semibold text-muted dark:text-white/50">
                No testimonials for this rating yet.
              </p>
            </div>
          )}

          {/* Responsive grid — grows automatically as backend sends more items */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>

          {/* Future: pagination / load-more can be added here */}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-darkmode via-dark_b to-midnight_text p-8 text-center text-white shadow-xl md:p-12">
            <motion.div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/15"
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <p className="mb-2 text-14 font-semibold uppercase tracking-widest text-secondary">
                Your Story Next?
              </p>
              <h2 className="mb-4 text-28 font-bold md:text-35">
                Start Your Journey with Saarthi4u
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-16 leading-relaxed text-white/70">
                Join thousands of students who found their path with personalised guidance,
                expert coaches, and smart tools — all in one place.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3 text-16 font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Free Guidance
                <Icon icon="solar:arrow-right-bold" className="text-16" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
