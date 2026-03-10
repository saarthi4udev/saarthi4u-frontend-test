"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const consultationPoints = [
  "Personalized course and college guidance",
  "Scholarship and admission roadmap",
  "One-on-one mentor interaction",
];

const ContactForm = () => {
  return (
    <section id="contact-form" className="dark:bg-darkmode pb-16 md:pb-18">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 md:gap-7 items-start">
          <motion.div
            className="lg:col-span-5 rounded-2xl border border-border bg-gradient-to-b from-heroBg to-white p-5 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.03] md:p-6 dark:border-dark_border dark:from-darkheader dark:to-darkheader dark:hover:border-primary/40 dark:hover:bg-primary/[0.08]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Expert Guidance
            </span>
            <h2 className="mb-4 mt-4 text-35 font-extrabold text-midnight_text dark:text-white">Get Online Consultation</h2>
            <p className="text-muted dark:text-white/80 mb-6 text-sm leading-6">
              Fill the form and our counselling team will connect with you to discuss courses,
              colleges, scholarships, and a practical next-step plan.
            </p>

            <ul className="space-y-3 mb-6">
              {consultationPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted dark:text-white/80">
                  <Icon icon="mdi:check-circle-outline" className="w-4 h-4 text-primary mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-border bg-white p-4 text-sm shadow-sm dark:border-dark_border dark:bg-darkmode">
              <p className="font-medium text-midnight_text dark:text-white mb-1">Support Promise</p>
              <p className="text-muted dark:text-white/70">We usually respond within 24 working hours.</p>
            </div>

            <Image
              src="/images/contact-page/contact.jpg"
              alt="Consultation support"
              width={1000}
              height={600}
              className="mt-5 h-auto w-full rounded-xl transition-transform duration-500 hover:scale-[1.01]"
            />
          </motion.div>

          <motion.div
            className="lg:col-span-7 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.02] hover:shadow-xl md:p-6 dark:border-dark_border dark:bg-darkheader dark:hover:border-primary/40 dark:hover:bg-primary/[0.06]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <h3 className="mb-5 text-28 font-extrabold text-midnight_text dark:text-white">Send Us Your Query</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Full Name*</label>
                <input className="w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" type="text" placeholder="Enter your full name" required />
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Email Address*</label>
                <input className="w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" type="email" placeholder="info@saarthi4u.com" required />
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Phone Number*</label>
                <input className="w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" type="tel" placeholder="+91 98XXXXXXXX" required />
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Course Interest*</label>
                <select className="w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" required>
                  <option value="">Select course area</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                  <option value="management">Management</option>
                  <option value="law">Law</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Preferred State / City</label>
                <input className="w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" type="text" placeholder="e.g. Delhi / Noida" />
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Preferred Consultation Date</label>
                <input className="w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" type="date" />
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Preferred Time</label>
                <input className="w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" type="time" />
              </div>

              <div className="md:col-span-2">
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Message / Query*</label>
                <textarea className="min-h-[130px] w-full rounded-xl border border-border px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-transparent dark:text-white" placeholder="Tell us about your goals, preferred courses, budget, or any concerns..." required />
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-sm text-muted dark:text-white/70">
                  Need direct support? Email us at <a href="mailto:info@saarthi4u.com" className="text-primary font-medium">info@saarthi4u.com</a>
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Request Consultation
                  <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
