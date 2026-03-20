"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const servicePillars = [
  {
    title: "Career Guidance",
    description:
      "Get one-on-one counseling to choose the right path based on your goals, strengths, and budget.",
    icon: "solar:user-check-linear",
  },
  {
    title: "College & Course Discovery",
    description:
      "Compare colleges and courses with structured information, eligibility, and outcomes in one place.",
    icon: "solar:buildings-3-linear",
  },
  {
    title: "Exams & Scholarship Support",
    description:
      "Track entrance exams, important dates, and scholarship opportunities tailored to your profile.",
    icon: "solar:medal-ribbons-star-outline",
  },
  {
    title: "Admission Assistance",
    description:
      "From shortlisting to final application, get practical support to improve your admission success.",
    icon: "solar:clipboard-check-linear",
  },
];

const processSteps = [
  {
    title: "Tell us your goals",
    description:
      "Share your interests, budget, location preference, and career targets so we understand your profile.",
    icon: "solar:target-linear",
  },
  {
    title: "Get your roadmap",
    description:
      "Receive a guided plan with suitable colleges, courses, exams, and scholarship options.",
    icon: "solar:map-point-wave-linear",
  },
  {
    title: "Apply with confidence",
    description:
      "Move ahead with clear timelines, documentation help, and expert support at each stage.",
    icon: "solar:verified-check-linear",
  },
];

const keyBenefits = [
  "Save time with structured college and course comparisons.",
  "Reduce confusion with expert-backed recommendations.",
  "Improve decision quality with transparent information.",
  "Never miss key exam and admission deadlines.",
  "Get practical support from exploration to admission.",
];

const ServicesView = () => {
  return (
    <>
      <section className="py-10 sm:py-12 md:py-14 dark:bg-darkmode">
        <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10 text-center"
          >
            <h2 className="mb-2 sm:mb-3 text-24 sm:text-28 md:text-35 font-bold text-midnight_text dark:text-white">
              Services built for smarter education decisions
            </h2>
            <p className="mx-auto max-w-3xl text-14 sm:text-16 md:text-18 text-muted dark:text-white/70">
              Saarthi4u combines guidance, discovery, and admission support so
              students and families can make confident choices without guesswork.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {servicePillars.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group rounded-2xl border border-border bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-dark_border dark:bg-midnight_text"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Icon icon={item.icon} className="text-2xl" />
                </div>
                <h3 className="mb-2 text-20 font-semibold text-midnight_text dark:text-white">
                  {item.title}
                </h3>
                <p className="text-16 text-muted dark:text-white/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-14 bg-hero-bg dark:bg-dark_b">
        <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="grid items-center gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-3 sm:mb-4 text-24 sm:text-28 md:text-35 font-bold text-midnight_text dark:text-white">
                How Saarthi4u supports your journey
              </h2>
              <p className="mb-4 sm:mb-6 text-14 sm:text-16 md:text-18 text-muted dark:text-white/70">
                A simple process designed to keep your planning clear, practical,
                and outcome-focused.
              </p>

              <div className="space-y-3 md:space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-3 rounded-xl border border-border bg-white p-3 sm:p-4 dark:border-dark_border dark:bg-midnight_text"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                      <Icon icon={step.icon} className="text-xl" />
                    </div>
                    <div>
                      <p className="mb-1 text-16 sm:text-18 font-semibold text-midnight_text dark:text-white">
                        {index + 1}. {step.title}
                      </p>
                      <p className="text-14 sm:text-16 text-muted dark:text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-border bg-white p-4 sm:p-5 md:p-6 shadow-sm dark:border-dark_border dark:bg-midnight_text"
            >
              <h3 className="mb-3 sm:mb-4 text-20 sm:text-24 font-semibold text-midnight_text dark:text-white">
                Why students choose Saarthi4u
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {keyBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="mt-0.5 shrink-0 text-lg text-primary"
                    />
                    <span className="text-14 sm:text-16 text-muted dark:text-white/75">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/college"
                  className="flex h-11 items-center rounded-full bg-primary px-5 text-14 font-semibold text-white transition-all duration-300 hover:opacity-90"
                >
                  Explore Colleges
                </Link>
                <Link
                  href="/contact"
                  className="flex h-11 items-center rounded-full border border-primary/50 px-5 text-14 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  Get Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesView;
