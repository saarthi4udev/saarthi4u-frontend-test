"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const offices = [
  {
    title: "Delhi NCR Head Office",
    address: "1st Floor, G-69, Sector-63, Noida - 201301",
    phone: "+91 9930718925",
    hours: "Mon - Sat • 9:30 AM - 7:00 PM",
  },
  {
    title: "Mumbai Support Office",
    address: "Mumbai, Maharashtra",
    phone: "+91 9930718925",
    hours: "Mon - Sat • 10:00 AM - 7:00 PM",
  },
  {
    title: "Virtual Counselling Desk",
    address: "Pan India (Online Consultation)",
    phone: "+91 9930718925",
    hours: "Daily Slots • Subject to Availability",
  },
];

const Location = () => {
  return (
    <section id="office-locations" className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-white py-20 dark:from-darkmode dark:to-darkmode">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex rounded-full border border-primary/25 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary dark:border-primary/35 dark:bg-darkheader/80">
            Presence Across India
          </span>
          <h2 className="mt-4 text-40 font-extrabold text-midnight_text dark:text-white">
            Our <span className="text-primary">Offices & Support</span>
          </h2>
          <p className="mt-3 text-18 font-medium text-muted dark:text-white/80">
            Visit us in person or connect online. We are available across locations to support your journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {offices.map((office, index) => (
            <motion.div
              key={office.title}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-xl dark:border-dark_border dark:bg-darkheader dark:hover:border-primary/50 dark:hover:bg-primary/[0.08]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <h3 className="mb-4 text-22 font-extrabold text-midnight_text dark:text-white">{office.title}</h3>

              <div className="space-y-3 text-sm text-muted dark:text-white/80">
                <p className="flex items-start gap-2">
                  <Icon icon="mdi:map-marker-outline" className="w-4 h-4 text-primary mt-0.5" />
                  <span>{office.address}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Icon icon="mdi:phone-outline" className="w-4 h-4 text-primary mt-0.5" />
                  <Link href={`tel:${office.phone.replace(/\s+/g, "")}`} className="hover:text-primary">{office.phone}</Link>
                </p>
                <p className="flex items-start gap-2">
                  <Icon icon="mdi:email-outline" className="w-4 h-4 text-primary mt-0.5" />
                  <Link href="mailto:info@saarthi4u.com" className="hover:text-primary">info@saarthi4u.com</Link>
                </p>
                <p className="flex items-start gap-2">
                  <Icon icon="mdi:clock-time-four-outline" className="w-4 h-4 text-primary mt-0.5" />
                  <span>{office.hours}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-colors duration-300 hover:border-primary/40 dark:border-dark_border dark:bg-darkheader dark:hover:border-primary/40"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.240485599259!2d77.37517923452664!3d28.620466096688475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef050db2c1b3%3A0x5ad04213abb8ce96!2sSector%2063!5e0!3m2!1sen!2sin!4v1770057791236!5m2!1sen!2sin"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            title="Saarthi4u Office Map"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
