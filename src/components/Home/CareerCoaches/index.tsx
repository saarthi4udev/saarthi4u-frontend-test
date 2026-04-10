"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getAllMentors, Mentor } from "@/app/api/mentor";




function StarRating({ rating }: { rating: number }) {

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon={star <= Math.floor(rating) ? "ph:star-fill" : star - 0.5 <= rating ? "ph:star-half-fill" : "ph:star"}
          className="h-3.5 w-3.5 text-amber-400"
        />
      ))}
    </div>
  );
}

const CareerCoaches = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardClass =
    "group relative flex h-full min-h-[575px] min-w-[280px] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/10 dark:border-dark_border dark:bg-darkHeroBg md:min-w-[320px]";

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
  };

  const scrollCoachesBy = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    const amount = Math.min(360, Math.round(el.clientWidth * 0.8));
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const [coaches, setCoaches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const data = await getAllMentors();

      const formatted = data.map((item: any) => {
        // Ensure specialties is always an array
        let specialties: string[] = [];
        if (item.shortQualifications) {
          if (Array.isArray(item.shortQualifications)) {
            specialties = item.shortQualifications;
          } else if (typeof item.shortQualifications === "string") {
            specialties = item.shortQualifications
              .split(",")
              .map((s: string) => s.trim())
              .filter((s: string) => s.length > 0);
          }
        }

        return {
          name: item.name,
          title: item.title,
          experience: `${item.experienceYears} Yrs`,
          studentsGuided: `${item.studentsGuided?.toLocaleString()}+`,
          rating: item.rating,
          reviews: item.totalReviews,
          specialties,
          bio: item.description,
          photo: item.profileImage,
          topBadge: item.role || "Mentor",
        };
      });

      setCoaches(formatted);
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-12 bg-white dark:bg-black">
      {/* Ambient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-secondary/12 blur-3xl dark:bg-secondary/8"
        animate={{ x: [0, 28, 0], y: [0, -14, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 h-80 w-80 rounded-full bg-accent/12 blur-3xl dark:bg-accent/8"
        animate={{ x: [0, -22, 0], y: [0, 16, 0], scale: [1, 1.09, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-secondary/8 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sparkle dots */}
      {[
        { top: "8%", left: "8%", delay: 0 },
        { top: "15%", right: "12%", delay: 0.7 },
        { bottom: "18%", left: "14%", delay: 1.2 },
        { bottom: "10%", right: "8%", delay: 0.4 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={pos}
          className="pointer-events-none absolute hidden h-2 w-2 rounded-full bg-secondary/60 lg:block"
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: pos.delay as number }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl)">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
          transition={{ duration: 0.6 }}
          className="mb-3 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-5 py-2 text-13 font-semibold text-secondary dark:border-secondary/30 dark:bg-secondary/15">
            <Icon icon="ph:users-three-bold" className="text-base" />
            Expert Career Coaches
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="text-center text-30 font-bold leading-tight text-midnight_text dark:text-white sm:text-36 md:text-44"
        >
          Meet Your Personal{" "}
          <span className="bg-gradient-to-r from-secondary via-secondary/80 to-accent bg-clip-text text-transparent">
            Career Guides
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-muted dark:text-white/70"
        >
          Trusted mentors with strong academic backgrounds, deep counseling experience, and practical admission guidance.
        </motion.p>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 flex flex-wrap justify-center gap-3"
        >
          {["Verified credentials", "Personalized sessions", "100% satisfaction guarantee"].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-4 py-1.5 text-13 font-medium text-muted dark:border-dark_border dark:bg-darkHeroBg/60 dark:text-white/70"
            >
              <Icon icon="solar:verified-check-bold" className="text-secondary text-sm" />
              {chip}
            </span>
          ))}
        </motion.div>

        {/* Single horizontal line scroller */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-muted dark:text-white/70">
            Scroll to check other coaches
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCoachesBy("left")}
              aria-label="Scroll coaches left"
              disabled={!canScrollLeft}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-midnight_text transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-darkHeroBg dark:text-white"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCoachesBy("right")}
              aria-label="Scroll coaches right"
              disabled={!canScrollRight}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-midnight_text transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark_border dark:bg-darkHeroBg dark:text-white"
            >
              <Icon icon="solar:alt-arrow-right-linear" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-white to-transparent dark:from-black lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-10 bg-gradient-to-l from-white to-transparent dark:from-black lg:block" />

          <div
            ref={scrollerRef}
            onScroll={updateScrollState}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {coaches.map((coach, index) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.96 }}
                transition={{ duration: 0.55, delay: 0.35 + index * 0.1, type: "spring", stiffness: 140, damping: 18 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="w-[320px] shrink-0 snap-start"
              >
                <div className={cardClass}>
                  <div className="h-1.5 w-full bg-gradient-to-r from-secondary/70 via-secondary to-accent/70" />

                  <div className="relative bg-gradient-to-br from-secondary/12 via-white to-accent/5 px-5 pt-5 pb-4 dark:from-secondary/12 dark:via-darkHeroBg dark:to-secondary/8">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0 rounded-full ring-4 ring-secondary/25 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={coach.photo}
                          alt={coach.name}
                          width={76}
                          height={76}
                          className="h-[76px] w-[76px] rounded-full object-cover"
                        />
                        <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400 dark:border-darkHeroBg" />
                      </div>

                      <div className="min-w-0 flex-1 pt-1">
                        <h3 className="line-clamp-2 min-h-[2.8rem] text-17 font-bold leading-tight text-midnight_text dark:text-white">
                          {coach.name}
                        </h3>
                        <p className="mt-0.5 line-clamp-2 min-h-[2.4rem] text-13 font-semibold text-secondary">
                          {coach.title}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <StarRating rating={coach.rating} />
                          <span className="text-13 font-bold text-midnight_text dark:text-white">{coach.rating}</span>
                          <span className="text-12 text-muted dark:text-white/50">({coach.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-11 font-semibold text-secondary">
                        <Icon icon="ph:medal-bold" className="text-xs" />
                        {coach.topBadge}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-4">
                    <p className="min-h-[4.9rem] text-13 leading-relaxed text-muted dark:text-white/65 line-clamp-4">
                      {coach.bio}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-border bg-gray-50/80 px-3 py-2.5 text-center dark:border-dark_border dark:bg-black/30">
                        <p className="text-17 font-bold text-secondary">{coach.experience}</p>
                        <p className="text-11 text-muted dark:text-white/50">Experience</p>
                      </div>
                      <div className="rounded-xl border border-border bg-gray-50/80 px-3 py-2.5 text-center dark:border-dark_border dark:bg-black/30">
                        <p className="text-17 font-bold text-secondary">{coach.studentsGuided}</p>
                        <p className="text-11 text-muted dark:text-white/50">Students Guided</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <Link
                        href="/contact#contact-form"
                        className="group/btn relative block h-11 w-full overflow-hidden rounded-xl bg-secondary py-2.5 text-center text-14 font-semibold text-white transition-all duration-300 hover:bg-secondary/90 hover:shadow-lg"
                      >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                        <span className="flex items-center justify-center gap-2">
                          <Icon icon="ph:chat-circle-dots-bold" className="h-4 w-4" />
                          Book a Free Session
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 text-center"
        >
          <p className="text-15 text-muted dark:text-white/60">
            Can&apos;t find the right coach?{" "}
            <a href="/contact#contact-form" className="font-semibold text-secondary underline underline-offset-2 hover:text-secondary/80 transition-colors">
              Talk to our team
            </a>{" "}
            for a personalized match.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerCoaches;


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { motion, useInView } from "motion/react";
// import { useEffect, useRef, useState } from "react";
// import { getAllMentors, Mentor } from "@/app/api/mentor";

// /* ⭐ Star Component (PURE UI ONLY) */
// function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Icon
//           key={star}
//           icon={
//             star <= Math.floor(rating)
//               ? "ph:star-fill"
//               : star - 0.5 <= rating
//               ? "ph:star-half-fill"
//               : "ph:star"
//           }
//           className="h-3.5 w-3.5 text-amber-400"
//         />
//       ))}
//     </div>
//   );
// }

// const CareerCoaches = () => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.1 });
//   const scrollerRef = useRef<HTMLDivElement>(null);

//   const [coaches, setCoaches] = useState<any[]>([]);
//   const [visibleCount, setVisibleCount] = useState(4); // pagination control

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   /* ✅ FETCH API */
//   useEffect(() => {
//     const fetchMentors = async () => {
//       const data = await getAllMentors();

//       const formatted = data.map((item: Mentor) => ({
//         name: item.name,
//         title: item.title,
//         experience: `${item.experienceYears} Yrs`,
//         studentsGuided: `${item.studentsGuided.toLocaleString()}+`,
//         rating: item.rating,
//         reviews: item.totalReviews,
//         specialties: item.shortQualifications || [],
//         bio: item.description,
//         photo: item.profileImage,
//         topBadge: item.role || "Mentor",
//       }));

//       setCoaches(formatted);
//     };

//     fetchMentors();
//   }, []);

//   /* ✅ SCROLL LOGIC */
//   const updateScrollState = () => {
//     const el = scrollerRef.current;
//     if (!el) return;

//     const maxScrollLeft = el.scrollWidth - el.clientWidth;
//     setCanScrollLeft(el.scrollLeft > 4);
//     setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
//   };

//   const scrollCoachesBy = (direction: "left" | "right") => {
//     const el = scrollerRef.current;
//     if (!el) return;

//     const amount = Math.min(360, Math.round(el.clientWidth * 0.8));
//     el.scrollBy({
//       left: direction === "right" ? amount : -amount,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     updateScrollState();
//     window.addEventListener("resize", updateScrollState);
//     return () => window.removeEventListener("resize", updateScrollState);
//   }, []);

//   /* ✅ LOAD MORE (Pagination style) */
//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 4);
//   };

//   const cardClass =
//     "group relative flex h-full min-h-[575px] min-w-[280px] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-lg";

//   return (
//     <section ref={ref} className="py-12">
//       <div className="container mx-auto px-4">

//         {/* HEADER */}
//         <h2 className="text-center text-3xl font-bold mb-6">
//           Meet Your Career Guides
//         </h2>

//         {/* SCROLLER */}
//         <div className="flex justify-between mb-3">
//           <button onClick={() => scrollCoachesBy("left")} disabled={!canScrollLeft}>
//             ◀
//           </button>
//           <button onClick={() => scrollCoachesBy("right")} disabled={!canScrollRight}>
//             ▶
//           </button>
//         </div>

//         <div
//           ref={scrollerRef}
//           onScroll={updateScrollState}
//           className="flex gap-5 overflow-x-auto pb-3"
//         >
//           {coaches.slice(0, visibleCount).map((coach, index) => (
//             <motion.div
//               key={index}
//               className="w-[320px] shrink-0"
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//             >
//               <div className={cardClass}>

//                 {/* IMAGE */}
//                 <div className="flex justify-center mt-4">
//                   <Image
//                     src={coach.photo || "/images/default.png"}
//                     alt={coach.name}
//                     width={80}
//                     height={80}
//                     className="rounded-full"
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-4 text-center">
//                   <h3 className="font-bold">{coach.name}</h3>
//                   <p className="text-sm text-secondary">{coach.title}</p>

//                   <div className="flex justify-center mt-2">
//                     <StarRating rating={coach.rating} />
//                   </div>

//                   <p className="text-xs mt-2">{coach.bio}</p>

//                   {/* TAGS */}
//                   <div className="flex flex-wrap justify-center gap-1 mt-2">
//                     {coach.specialties.map((s: string) => (
//                       <span key={s} className="text-xs bg-gray-200 px-2 py-1 rounded">
//                         {s}
//                       </span>
//                     ))}
//                   </div>

//                   {/* STATS */}
//                   <div className="flex justify-between mt-3 text-sm">
//                     <span>{coach.experience}</span>
//                     <span>{coach.studentsGuided}</span>
//                   </div>

//                   {/* CTA */}
//                   <Link href="/contact">
//                     <button className="mt-3 bg-secondary text-white px-4 py-2 rounded">
//                       Book Session
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* LOAD MORE BUTTON */}
//         {visibleCount < coaches.length && (
//           <div className="text-center mt-6">
//             <button
//               onClick={handleLoadMore}
//               className="px-6 py-2 bg-secondary text-white rounded"
//             >
//               Load More
//             </button>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// };

// export default CareerCoaches;