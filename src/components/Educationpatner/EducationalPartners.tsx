"use client";

import Image from "next/image";
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
  const inView = useInView(ref);

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

  const cardAnimation = (index: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.6, delay: 0.3 + index * 0.1 },
  });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white dark:bg-midnight_text"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* BADGE */}
        <motion.div {...badgeAnimation} className="flex justify-center mb-6">
          <span className="px-6 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20">
            TRUSTED PARTNERS
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.h2
          {...titleAnimation}
          className="text-40 md:text-48 font-semibold text-center text-midnight_text dark:text-white"
        >
          Our Educational <span className="text-primary">Partners</span>
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          {...descriptionAnimation}
          className="mt-4 max-w-3xl mx-auto text-center text-muted dark:text-white/80 text-18"
        >
          Collaborating with top institutions to provide quality education
        </motion.p>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              {...cardAnimation(index)}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="
                  bg-white dark:bg-[#0f172a]
                  rounded-3xl p-8
                  shadow-md hover:shadow-xl transition-all duration-300
                  border border-border dark:border-white/10
                "
              >
                {/* LOGO */}
                <motion.div
                  className="
                    rounded-2xl
                    bg-white dark:bg-white
                    border border-border dark:border-white/10
                    p-10 flex justify-center items-center
                  "
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </motion.div>

                {/* TEXT */}
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.h3
                    className="text-20 font-semibold text-midnight_text dark:text-white"
                    whileHover={{ letterSpacing: "0.5px" }}
                  >
                    {partner.name}
                  </motion.h3>
                  <motion.p
                    className="mt-2 text-muted dark:text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    {partner.description}
                  </motion.p>
                </motion.div>

                {/* VERIFIED */}
                <motion.div
                  className="mt-8 flex justify-center items-center gap-2 text-primary font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    ✓
                  </motion.span>
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
