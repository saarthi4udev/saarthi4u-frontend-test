'use client';

import React from 'react';

const HelpPage = () => {
  return (
    <main className="bg-white dark:bg-slate-900 w-full">

      {/* HERO */}
      <section className="pt-28 pb-24 bg-heroBg dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Saarthi4u Help Center
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Your one-stop destination for support, guidance, and quick solutions.
            We’re here to ensure your experience with Saarthi4u is smooth and stress-free.
          </p>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: February 07, 2026
          </p>
        </div>
      </section>

      {/* HOW CAN WE HELP */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-10 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
              How can we help you?
            </h2>

            <p className="mb-10 text-slate-600 dark:text-slate-300">
              Whether you’re exploring courses, seeking counseling, facing technical issues,
              or need help with applications — find support below.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "🎓",
                  title: "Student Support",
                  items: [
                    "Course & college selection",
                    "Admission guidance & timelines",
                    "Entrance exams & eligibility",
                    "Study abroad options",
                  ],
                },
                {
                  icon: "💳",
                  title: "Payments & Refunds",
                  items: [
                    "Accepted payment methods",
                    "Payment confirmation issues",
                    "Refund eligibility & timelines",
                  ],
                },
                {
                  icon: "🛠",
                  title: "Technical Support",
                  items: [
                    "Page not loading or errors",
                    "App installation & updates",
                    "Feature access issues",
                  ],
                },
              ].map((block, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                    {block.icon}
                  </div>
                  <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    {block.title}
                  </h3>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR TOPICS */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-14 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Popular Help Topics
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: "🔍",
                title: "Account & Login Support",
                items: [
                  "Creating and managing your account",
                  "Login or OTP issues",
                  "Updating personal details",
                  "Resetting passwords",
                ],
              },
              {
                icon: "🧾",
                title: "Counseling & Services",
                items: [
                  "How Saarthi4u counseling works",
                  "Booking free or paid sessions",
                  "Counselor assignment & follow-ups",
                ],
              },
              {
                icon: "🏫",
                title: "Colleges, Courses & Exams",
                items: [
                  "Finding the right college or course",
                  "Eligibility criteria & deadlines",
                  "Entrance exam guidance",
                ],
              },
              {
                icon: "🌍",
                title: "Study Abroad Assistance",
                items: [
                  "Country & university shortlisting",
                  "Application guidance",
                  "General visa process information",
                ],
              },
            ].map((topic, index) => (
              <div
                key={index}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {topic.icon}
                </div>
                <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                  {topic.title}
                </h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {topic.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL & PRIVACY */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Technical Support",
              text:
                "If basic troubleshooting doesn’t resolve your issue, our technical team is ready to help.",
              items: [
                "Report bugs with screenshots and steps",
                "Include device & browser details",
                "Mention app version if applicable",
              ],
            },
            {
              title: "Privacy, Data & Security",
              text:
                "We protect your personal data and share information only with your consent.",
              items: [
                "Request data access or deletion",
                "Industry-standard security practices",
                "We do not sell user data",
              ],
            },
          ].map((block, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            >
              <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                {block.title}
              </h3>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                {block.text}
              </p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-slate-50 py-24 dark:bg-slate-800">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            Contact Support
          </h2>
          <p className="mb-10 text-slate-600 dark:text-slate-300">
            Still need help? Our support team is ready to assist you.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "📧", title: "Email", value: "info@saarthi4u.com", href: "mailto:info@saarthi4u.com" },
              { icon: "📞", title: "Phone", value: "+91 9958989150", href: "tel:+919958989150" },
              { icon: "🏢", title: "Office", value: "Sector-63, Noida – 201301", href: "#" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {item.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
            Grievance Redressal
          </h3>
          <p className="mb-8 text-sm text-slate-600 dark:text-slate-300">
            If your issue is not resolved through regular support, escalate it by
            contacting our team.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-lg bg-accent px-10 py-3 font-semibold text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-accent-dark"
          >
            Contact Support
          </a>
        </div>
      </section>

    </main>
  );
};

export default HelpPage;
