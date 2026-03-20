"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const LeadershipCorner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const badgeAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 },
    transition: { duration: 0.6 },
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 },
    transition: { duration: 0.9, delay: 0.2, type: "spring", stiffness: 130, damping: 16 },
  };

  const contentAnimation = {
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-14 bg-hero-bg dark:bg-dark_b">
      <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <motion.div {...badgeAnimation} className="flex justify-center mb-6">
          <span className="inline-flex h-9 items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 text-13 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/15">
            Leadership Corner
          </span>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            {...cardAnimation}
            whileHover={{ y: -6, scale: 1.003 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-accent/35 bg-gradient-to-br from-[#0D1738] via-[#1A2755] to-[#081225] p-6 text-white shadow-[0_20px_50px_rgba(6,14,35,0.35)] transition-all duration-300 hover:shadow-[0_30px_70px_rgba(245,166,35,0.25)] md:p-8"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[2rem] border border-accent/35"
              animate={{ opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-accent/35 to-transparent"
              animate={{ x: ["-140%", "420%"] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/14 blur-2xl"
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-160%", "400%"] }}
              transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            />
            <div className="pointer-events-none absolute -left-16 -bottom-24 h-56 w-56 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute left-8 top-8 h-20 w-20 rounded-full border border-secondary/20" />
            <div className="pointer-events-none absolute right-12 bottom-10 h-10 w-10 rounded-full bg-secondary/20 blur-sm" />

            <div className="relative z-10 grid gap-7 lg:grid-cols-[300px_1fr] lg:gap-9">
              <motion.div
                {...contentAnimation}
                className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent" />
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.35 }}
                  className="relative mx-auto mb-4 h-[270px] w-full max-w-[240px] overflow-hidden rounded-2xl border border-white/25"
                >
                  <Image
                    src="/images/leadership/ceo.JPG"
                    alt="Deepshikha Jain"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 240px, 280px"
                    priority
                  />
                </motion.div>

                <div className="relative text-center">
                  <h4 className="text-24 font-semibold text-white md:text-25">
                    Deepshikha Jain
                  </h4>
                  <p className="mt-1 text-14 font-medium tracking-wide text-secondary">
                    Co-Founder / CEO
                  </p>
                  <p className="mt-1 text-14 text-white/70">
                    Saarthi4u Education
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                  },
                }}
              >
                <motion.p
                  className="mb-3 text-16 font-extrabold uppercase tracking-[0.22em] text-accent"
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  Your Journey, Our Passion
                </motion.p>

                <motion.h3
                  className="mb-4 text-28 font-extrabold leading-tight text-white md:text-35"
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  Dream Big, Achieve Bigger
                </motion.h3>

                <motion.p
                  className="mb-6 max-w-2xl text-17 leading-relaxed text-white/85"
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  Dear Students and Parents,
                </motion.p>

                <div className="space-y-4 text-16 leading-relaxed text-white/88 md:text-[1.03rem]">
                  <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
                    At Saarthi4u, we believe every student deserves <span className="font-semibold text-white">the right direction, the right support, and the right opportunities</span> to unlock their full potential.
                  </motion.p>

                  <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
                    Woh kahate hain na, agar hausle ho majbut, to sanson se bhi tufan uthaya ja sakta hai. Pathar par bhi phool khilaya ja sakta hai. <span className="font-semibold text-secondary">Aapke irade ho aasman se bhi unche, to suraj se bhi hath milaya ja sakta hai.</span>
                  </motion.p>

                  <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
                    Whether you are exploring careers, choosing the perfect college, or applying for scholarships, <span className="font-semibold text-white">our dedicated team stands with you at every step.</span>
                  </motion.p>

                  <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
                    Yeh mauka mila hai, ise hath se mat jaane dijiye. Karm bhumi par fal ke liye shram sabko karna padta hai. Rab to keval lakiren deta hai, rang to humko bharna hota hai.
                  </motion.p>

                  <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
                    We are here to help you add those colors to your journey, one milestone at a time. <span className="font-semibold text-secondary">Start today, dream bigger, and achieve bigger.</span>
                  </motion.p>
                </div>

                <motion.p
                  className="mt-6 border-l-2 border-secondary/70 pl-4 text-16 font-medium text-white"
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                >
                  Best Regards,
                  <br />
                  <span className="text-secondary font-semibold">Deepshikha Jain</span>
                </motion.p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {["Career Guidance", "College Admissions", "Scholarship Support"].map((tag) => (
                    <motion.span
                      key={tag}
                      variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                      className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-13 text-white/90"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="relative z-10 mt-9 flex items-center justify-end border-t border-white/12 pt-6">
              <Link
                href="/contact"
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-secondary/65 bg-secondary px-6 text-16 font-semibold text-primary transition-all duration-300 hover:scale-[1.02] hover:bg-[#4de4d7]"
              >
                Start Your Journey
                <motion.span
                  className="inline-flex"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon
                    icon="solar:arrow-right-outline"
                    className="text-18 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipCorner;
