"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const contactCards = [
  {
    title: "Business Email",
    value: "info@saarthi4u.com",
    href: "mailto:info@saarthi4u.com",
    icon: "mdi:email-outline",
    description: "For admissions, counselling, and support queries.",
  },
  {
    title: "Call Support",
    value: "+91 9958989150",
    href: "tel:+919958989150",
    icon: "mdi:phone-outline",
    description: "Talk directly with our student guidance team.",
  },
  {
    title: "Office Hours",
    value: "Mon - Sat • 9:30 AM - 7:00 PM",
    href: "#office-locations",
    icon: "mdi:clock-time-four-outline",
    description: "Fast responses during active support hours.",
  },
  {
    title: "Quick Help",
    value: "FAQs & Priority Support",
    href: "/faq",
    icon: "mdi:help-circle-outline",
    description: "Get instant answers or continue with human support.",
  },
];

const trustItems = [
  "Dedicated student counselling support",
  "Response within 24 working hours",
  "Confidential and secure communication",
];

const ContactInfo = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-14 dark:bg-darkmode">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-12 bottom-4 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex rounded-full border border-primary/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary dark:border-primary/35 dark:bg-darkheader/80">
            Contact Saarthi4u
          </span>
          <h2 className="mt-4 text-40 font-extrabold leading-tight text-midnight_text dark:text-white">
            Let&apos;s Start Your <span className="text-primary">Journey</span>
          </h2>
          <p className="mt-4 text-18 font-medium text-midnight_text/70 dark:text-white/80">
            Whether you need course guidance, college shortlisting, or scholarship support,
            our team is here to help you make confident decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8 items-stretch">
          {contactCards.map((item, index) => (
            <motion.div
              key={item.title}
              className="h-full"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <Link
                href={item.href}
                className="group block h-full rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/[0.04] hover:shadow-xl dark:border-dark_border dark:bg-darkheader dark:hover:border-primary/50 dark:hover:bg-primary/[0.08]"
              >
                <motion.div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-colors duration-300 group-hover:from-primary group-hover:to-secondary group-hover:text-white"
                  whileHover={{ rotate: 6, scale: 1.06 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                </motion.div>
                <h3 className="mb-2 text-20 font-bold text-midnight_text dark:text-white">
                  {item.title}
                </h3>
                <p className="text-14 font-semibold text-primary mb-2 break-all">{item.value}</p>
                <p className="text-14 text-midnight_text/65 dark:text-white/75 leading-6 min-h-[78px]">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid items-center gap-6 rounded-2xl border border-border bg-gradient-to-r from-heroBg to-white p-6 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.03] md:grid-cols-5 md:p-7 dark:border-dark_border dark:from-darkheader dark:to-darkheader dark:hover:border-primary/40 dark:hover:bg-primary/[0.08]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div className="md:col-span-3">
            <h3 className="mb-3 text-24 font-extrabold text-midnight_text dark:text-white">
              Why Students Contact Saarthi4u
            </h3>
            <ul className="space-y-2 text-midnight_text/70 dark:text-white/80 text-14">
              {trustItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle-outline" className="w-4 h-4 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-3 md:justify-end">
            <Link
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Online Consultation
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 rounded-xl border border-primary px-5 py-3.5 font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              Visit Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
