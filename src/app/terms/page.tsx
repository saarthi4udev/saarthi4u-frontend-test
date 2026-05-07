import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Saarthi4u Education Consulting Services",
  description: "Review the terms and conditions for using Saarthi4u's career guidance and college admission platform.",
};

const TermsPage = () => {
  return (
    <main className="bg-white dark:bg-slate-900 w-full">

      {/* HERO */}
      <section className="pt-28 pb-20 bg-heroBg dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-3xl">
            ⚖️
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Terms & Conditions
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Please read these terms carefully before accessing or using
            Saarthi4u’s platform and services.
          </p>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: February 07, 2026 • Estimated reading time: 8–10 minutes
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2">

          {[
            {
              icon: "🎯",
              title: "1. Purpose of the Platform",
              content:
                "Saarthi4u provides educational counseling, institutional information, course discovery, and career guidance to assist students and parents in making informed academic decisions.",
            },
            {
              icon: "👤",
              title: "2. User Accounts & Responsibilities",
              content: (
                <ul className="list-disc list-inside space-y-1">
                  <li>Maintain confidentiality of login credentials</li>
                  <li>Provide accurate and up-to-date information</li>
                  <li>Immediately report unauthorized access</li>
                </ul>
              ),
            },
            {
              icon: "📋",
              title: "3. Platform Disclaimer",
              content: (
                <ul className="list-disc list-inside space-y-1">
                  <li>Information is provided on an “as-is” basis</li>
                  <li>No guarantees for admissions or outcomes</li>
                  <li>Third-party content is not endorsed</li>
                </ul>
              ),
            },
            {
              icon: "⚠️",
              title: "4. Limitation of Liability",
              content:
                "Saarthi4u shall not be liable for indirect or consequential damages. Liability shall not exceed INR 1,000 or the amount paid, whichever is greater.",
            },
            {
              icon: "📝",
              title: "5. Intellectual Property Rights",
              content: (
                <ul className="list-disc list-inside space-y-1">
                  <li>All content belongs to Saarthi4u or licensors</li>
                  <li>Protected under applicable IP laws</li>
                  <li>Personal, non-commercial use only</li>
                </ul>
              ),
            },
            {
              icon: "💬",
              title: "6. User-Generated Content",
              content:
                "Users are solely responsible for content they submit and grant Saarthi4u the right to use and display such content.",
            },
            {
              icon: "💳",
              title: "7. Payment Terms",
              content:
                "Paid services are non-refundable unless required by law. Pricing may change with prior notice.",
            },
            {
              icon: "⛔",
              title: "8. Termination of Service",
              content:
                "Accounts may be suspended or terminated for violations of these Terms or misuse of the platform.",
            },
            {
              icon: "🏛️",
              title: "9. Governing Law",
              content:
                "These Terms are governed by the laws of India, with jurisdiction in Noida, Uttar Pradesh.",
            },
            {
              icon: "🔄",
              title: "10. Amendments & Severability",
              content:
                "Invalid provisions do not affect remaining terms. Continued use implies acceptance of updates.",
            },
          ].map((section, index) => (
            <div
              key={index}
              className="
                group relative overflow-hidden rounded-xl
                border border-slate-200 bg-white p-8
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:border-secondary
                dark:bg-slate-800 dark:border-slate-700
              "
            >
              {/* Accent bar */}
              <div
                className="
                  absolute left-0 top-0 h-full w-1 bg-secondary
                  scale-y-0 origin-top transition-transform duration-300
                  group-hover:scale-y-100
                "
              />

              <div className="flex gap-4">
                <div
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-md bg-secondary/10 text-xl
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                >
                  {section.icon}
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>

                  <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL NOTE */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            By using Saarthi4u, you acknowledge that you have read, understood,
            and agreed to these Terms & Conditions.
          </p>
        </div>
      </section>

    </main>
  );
};

export default TermsPage;

