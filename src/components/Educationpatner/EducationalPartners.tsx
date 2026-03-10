"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const partners = [
  {
    name: "Physics Wallah",
    logo: "/images/Education/pw.png",
    description: "Leading EdTech Platform",
  },
  {
    name: "Amity University",
    logo: "/images/Education/amity.png",
    description: "Leading EdTech Platform",
  },
  {
    name: "IDP",
    logo: "/images/Education/idp.png",
    description: "Leading EdTech Platform",
  },
];

const EducationalPartners = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const badgeAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 },
    transition: { duration: 0.6 },
  };

  const titleAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay: 0.1 },
  };

  const descriptionAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const itemAnimation = (index: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.6, delay: 0.3 + index * 0.1 },
  });

  return (
    <section ref={ref} className="relative overflow-hidden py-14 bg-hero-bg dark:bg-dark_b">
      <motion.div
        className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <motion.div {...badgeAnimation} className="flex justify-center mb-5">
          <span className="inline-flex h-9 items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 text-13 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/15">
            TRUSTED PARTNERS
          </span>
        </motion.div>

        <motion.h2
          {...titleAnimation}
          className="text-center text-28 font-bold text-midnight_text dark:text-white md:text-35"
        >
          Our Educational <span className="text-secondary">Partners</span>
        </motion.h2>

        <motion.p
          {...descriptionAnimation}
          className="mx-auto mt-3 max-w-3xl text-center text-16 leading-relaxed text-muted dark:text-white/70"
        >
          Collaborating with top institutions to provide quality education
        </motion.p>

        <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div key={partner.name} {...itemAnimation(index)} className="h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.35, type: "spring", stiffness: 230, damping: 16 }}
                className="relative h-full overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-secondary/35 hover:shadow-xl dark:border-dark_border dark:bg-midnight_text md:p-7"
              >
                <motion.div
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent dark:via-white/10"
                  initial={{ x: "-140%", opacity: 0 }}
                  whileHover={{ x: "350%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                />
                <motion.div
                  className="flex min-h-[170px] items-center justify-center rounded-2xl border border-border bg-hero-bg/80 p-6 dark:border-dark_border dark:bg-dark_b"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35 }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={140}
                      height={100}
                      className="h-auto max-h-[90px] w-auto max-w-[150px] object-contain"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-6 flex min-h-[108px] flex-col items-center text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.h3 className="text-22 font-semibold text-midnight_text dark:text-white">
                    {partner.name}
                  </motion.h3>
                  <motion.p
                    className="mt-2 text-15 text-muted dark:text-white/75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    {partner.description}
                  </motion.p>
                </motion.div>

                <motion.div
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-secondary/20 bg-secondary/8 px-4 py-2 text-14 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon icon="solar:check-circle-bold" className="text-18" />
                  </motion.div>
                  Verified Partner
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalPartners;
