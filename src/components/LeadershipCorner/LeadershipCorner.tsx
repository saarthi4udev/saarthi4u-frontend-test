"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const LeadershipCorner = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const badgeAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 },
    transition: { duration: 0.6 },
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const contentAnimation = {
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  return (
    <section
      ref={ref}
      className="relative py-28 bg-white dark:bg-midnight_text"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* TOP BADGE */}
        <motion.div
          {...badgeAnimation}
          className="flex justify-center mb-10"
        >
          <span
            className="
              px-6 py-2 rounded-full text-sm font-medium
              bg-primary/10 text-primary dark:bg-primary/20
            "
          >
            Leadership Corner
          </span>
        </motion.div>

        {/* CENTERED MESSAGE CARD */}
        <div className="flex justify-center">
          <motion.div
            {...cardAnimation}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="
              w-full max-w-4xl
              rounded-3xl p-10 md:p-12
              bg-gradient-to-br from-slate-900 to-slate-800
              dark:from-slate-800 dark:to-slate-900
              text-white shadow-xl relative overflow-hidden hover:shadow-2xl transition-shadow
            "
          >
            {/* Decorative Accent */}
            <motion.div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* PROFILE */}
            <motion.div
              {...contentAnimation}
              className="flex items-center gap-4 mb-8 relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/leadership/ceo.jpeg"
                  alt="Deepshikha V Jain"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-white"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h4 className="font-semibold text-lg">
                  Deepshikha V Jain
                </h4>
                <p className="text-sm text-white/70">
                  CEO & Co-founder · Saarthi4u Education
                </p>
              </motion.div>
            </motion.div>

            {/* MESSAGE */}
            <div className="space-y-5 text-white/90 leading-relaxed relative z-10 text-base md:text-lg">
              <p>Dear Students and Parents,</p>

              <p>
                At Saarthi4u, we are deeply committed to empowering your
                educational journey with clarity, confidence, and expert
                guidance at every step.
              </p>

              <p>
                Whether you are exploring career paths, choosing the right
                college, or preparing for competitive exams, our team is here
                to support you with personalized insights and trusted
                recommendations.
              </p>

              <p>
                Thank you for trusting Saarthi4u as your partner in success.
                We look forward to growing and achieving together.
              </p>

              <p className="pt-4 font-medium">
                Warm regards, <br />
                <span className="text-primary">
                  Deepshikha V Jain
                </span>
              </p>
            </div>

            {/* FOOTER */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 relative z-10">
              <div className="flex gap-4 text-xl">
                <Icon icon="mdi:instagram" />
                <Icon icon="mdi:youtube" />
                <Icon icon="mdi:linkedin" />
                <Icon icon="mdi:facebook" />
              </div>

              <button
                className="
                  px-6 py-2 rounded-full
                  border border-white/30
                  hover:bg-white hover:text-slate-900
                  transition
                "
              >
                Connect
              </button>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default LeadershipCorner;
