"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
const consultationPoints = [
  "Personalized course and college guidance",
  "Scholarship and admission roadmap",
  "One-on-one mentor interaction",
];

const ContactForm = () => {

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  
  const validateForm = () => {
  let newErrors: any = {};

  // Name
  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  } else if (formData.name.length < 2) {
    newErrors.name = "Name must be at least 2 characters";
  }

  // Email
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  // Phone
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone is required";
  } else if (!/^[0-9]{7,15}$/.test(formData.phone)) {
    newErrors.phone = "Phone must be 7–15 digits";
  }

  // Course
  if (!formData.courseInterest) {
    newErrors.courseInterest = "Select a course";
  }

  // Location
  if (!formData.preferredLocation.trim()) {
    newErrors.preferredLocation = "Location is required";
  }

  // Message
  if (!formData.message.trim()) {
    newErrors.message = "Message is required";
  }

  // Date (optional but if present must be valid)
  if (formData.preferredConsultationDate) {
    const date = new Date(formData.preferredConsultationDate);
    if (isNaN(date.getTime())) {
      newErrors.preferredConsultationDate = "Invalid date";
    }
  }

  // Time (optional but must match HH:mm)
  if (formData.preferredTime) {
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.preferredTime)) {
      newErrors.preferredTime = "Invalid time format (HH:mm)";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    courseInterest: "",
    preferredLocation: "",
    preferredConsultationDate: "",
    preferredTime: "",
  });

  
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error on typing
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   // const courseMap: any = {
  //   //   engineering: "BTECH",
  //   //   medical: "MBBS",
  //   //   management: "MBA",
  //   //   law: "LLB",
  //   //   arts: "BA",
  //   //   other: "OTHER",
  //   // };

  //   const payload = {
  //     ...formData,
  //     subject: null,
  //     courseInterest: courseMap[formData.courseInterest] || null,
  //   };

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact/create`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     const data = await res.json();
  //     console.log("Success:", data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };



const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  const payload = {
    fullName: formData.name || null,
    email: formData.email || null,
    phone: formData.phone || null,
    message: formData.message || null,
    courseInterest: formData.courseInterest || null,
    preferredStateCity: formData.preferredLocation || null,
    preferredConsultationDate: formData.preferredConsultationDate || null,
    preferredTime: formData.preferredTime || null,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/consultation/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        courseInterest: "",
        preferredLocation: "",
        preferredConsultationDate: "",
        preferredTime: "",
      });
    } else {
     console.error("ERROR RESPONSE:", data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <section id="contact-form" className="relative overflow-hidden pb-16 md:pb-18 dark:bg-darkmode">
      {success && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg">
          Form submitted successfully 
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-14 h-64 w-64 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/12" />
        <div className="absolute bottom-[-120px] right-[-40px] h-72 w-72 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 md:gap-7 items-start">
          <motion.div
            className="lg:col-span-5 h-full rounded-2xl border border-border bg-gradient-to-b from-heroBg to-white p-5 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.03] md:p-6 dark:border-dark_border dark:from-darkheader dark:to-darkheader dark:hover:border-primary/40 dark:hover:bg-primary/[0.08]"
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

            <div className="rounded-xl border border-border bg-white p-4 text-sm shadow-sm dark:border-dark_border dark:bg-darkmode/80">
              <p className="font-medium text-midnight_text dark:text-white mb-1">Support Promise</p>
              <p className="text-muted dark:text-white/70">We usually respond within 24 working hours.</p>
            </div>

            <Image
              src="/images/contact-page/contact.jpg"
              alt="Consultation support"
              width={1000}
              height={600}
              className="mt-5 h-auto w-full rounded-xl border border-border object-cover transition-transform duration-500 hover:scale-[1.01] dark:border-dark_border"
            />
          </motion.div>

          <motion.div
            className="lg:col-span-7 h-full rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.02] hover:shadow-xl md:p-6 dark:border-dark_border dark:bg-darkheader dark:hover:border-primary/40 dark:hover:bg-primary/[0.06]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <h3 className="mb-5 text-28 font-extrabold text-midnight_text dark:text-white">Send Us Your Query</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Full Name*</label>
                <input className="w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white dark:placeholder:text-white/45"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" placeholder="Enter your full name" required />
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Email Address*</label>
                <input className="w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white dark:placeholder:text-white/45"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" placeholder="info@saarthi4u.com" required />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Phone Number*</label>
                <input className="w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white dark:placeholder:text-white/45"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel" placeholder="+91 98XXXXXXXX" required />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Course Interest*</label>
                <select className="w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white"
                  name="courseInterest"
                  value={formData.courseInterest}
                  onChange={handleChange} required>
                  <option value="">Select course area</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                  <option value="management">Management</option>
                  <option value="law">Law</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="other">Other</option>
                </select>
                {errors.courseInterest && <p className="text-red-500 text-xs mt-1">{errors.courseInterest}</p>}
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white" >Preferred State / City </label>
                <input className="w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white dark:placeholder:text-white/45"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  type="text" placeholder="e.g. Delhi / Noida" required />
                {errors.preferredLocation && <p className="text-red-500 text-xs mt-1">{errors.preferredLocation}</p>}
              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Preferred Consultation Date</label>
                <input className="w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white"
                  name="preferredConsultationDate"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.preferredConsultationDate}
                  onChange={handleChange}
                  type="date" />
                  {errors.preferredConsultationDate && <p className="text-red-500 text-xs mt-1">{errors.preferredConsultationDate}</p>}

              </div>

              <div>
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Preferred Time</label>
                <input className="w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  type="time" />
                  {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="inline-block pb-2 text-16 font-semibold text-midnight_text dark:text-white">Message / Query*</label>
                <textarea className="min-h-[130px] w-full rounded-xl border border-border bg-white px-4 py-3 text-16 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-dark_border dark:bg-dark_b dark:text-white dark:placeholder:text-white/45" placeholder="Tell us about your goals, preferred courses, budget, or any concerns..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-sm text-muted dark:text-white/70">
                  Need direct support? Email us at <a href="mailto:info@saarthi4u.com" className="text-primary font-medium">info@saarthi4u.com</a>
                </p>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                {/* <button
                  type="submit"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Request Consultation
                  <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                </button> */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {loading ? "Submitting..." : "Request Consultation"}

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
