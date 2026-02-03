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

  /* SAME animation pattern as other sections */
  const topAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.3 },
  };

  const bottomAnimation = (index: number) => ({
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 + index * 0.3 },
  });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white dark:bg-midnight_text"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* BADGE */}
        <motion.div {...topAnimation} className="flex justify-center mb-6">
          <span className="px-6 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20">
            TRUSTED PARTNERS
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.h2
          {...topAnimation}
          className="text-40 md:text-48 font-semibold text-center text-midnight_text dark:text-white"
        >
          Our Educational <span className="text-primary">Partners</span>
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          {...topAnimation}
          className="mt-4 max-w-3xl mx-auto text-center text-muted dark:text-white/80 text-18"
        >
          Collaborating with top institutions to provide quality education
        </motion.p>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              {...bottomAnimation(index)}
              className="
                bg-white dark:bg-[#0f172a]
                rounded-3xl p-8
                shadow-md hover:shadow-xl transition-all duration-300
                border border-border dark:border-white/10
              "
            >
              {/* LOGO */}
              <div
                className="
                  rounded-2xl
                  bg-white dark:bg-white
                  border border-border dark:border-white/10
                  p-10 flex justify-center items-center
                "
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>

              {/* TEXT */}
              <div className="text-center mt-8">
                <h3 className="text-20 font-semibold text-midnight_text dark:text-white">
                  {partner.name}
                </h3>
                <p className="mt-2 text-muted dark:text-white/80">
                  {partner.description}
                </p>
              </div>

              {/* VERIFIED */}
              <div className="mt-8 flex justify-center items-center gap-2 text-primary font-medium">
                <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                Verified Partner
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalPartners;
