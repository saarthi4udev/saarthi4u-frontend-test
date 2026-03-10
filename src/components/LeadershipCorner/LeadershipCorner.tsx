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
            whileHover={{ y: -6, scale: 1.004 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-darkmode via-dark_b to-midnight_text p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-dark_border md:p-9"
          >
            <motion.div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/12"
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/12 to-transparent"
              animate={{ x: ["-160%", "400%"] }}
              transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            />
            <div className="pointer-events-none absolute -left-16 -bottom-24 h-52 w-52 rounded-full border border-white/10" />

            <motion.div
              {...contentAnimation}
              className="relative z-10 mb-8 flex items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3 }}
                className="rounded-full border border-white/25 p-0.5"
              >
                <Image
                  src="/images/leadership/ceo.jpeg"
                  alt="Deepshikha V Jain"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h4 className="text-24 font-semibold text-white md:text-26">
                  Deepshikha V Jain
                </h4>
                <p className="text-15 text-white/70">
                  CEO & Co-founder · Saarthi4u Education
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative z-10 space-y-5 text-16 leading-relaxed text-white/90 md:text-17"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.11, delayChildren: 0.15 },
                },
              }}
            >
              <motion.p
                className="text-26 font-semibold text-white"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                Dear Students and Parents,
              </motion.p>

              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                At Saarthi4u, we are deeply committed to empowering your
                educational journey with clarity, confidence, and expert
                guidance at every step.
              </motion.p>

              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                Whether you are exploring career paths, choosing the right
                college, or preparing for competitive exams, our team is here
                to support you with personalized insights and trusted
                recommendations.
              </motion.p>

              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                Thank you for trusting Saarthi4u as your partner in success.
                We look forward to growing and achieving together.
              </motion.p>

              <motion.p
                className="pt-3 font-medium text-white"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                Warm regards, <br />
                <span className="text-secondary font-semibold">
                  Deepshikha V Jain
                </span>
              </motion.p>
            </motion.div>

            <div className="relative z-10 mt-9 flex items-center justify-end border-t border-white/12 pt-6">
              <Link
                href="/contact"
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 text-16 font-medium transition-all duration-300 hover:border-secondary/60 hover:bg-secondary hover:text-white"
              >
                Connect
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
