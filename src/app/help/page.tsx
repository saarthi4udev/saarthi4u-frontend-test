// 'use client';

// import React from 'react';

// const HelpPage = () => {
//   return (
//     <main className="bg-white dark:bg-slate-900">
//       {/* Hero */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 py-20 text-white">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/20 blur-3xl"></div>
//           <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/20 blur-3xl"></div>
//         </div>
//         <div className="relative mx-auto max-w-6xl px-4 text-center">
//           <div className="mb-4 text-6xl">🛟</div>
//           <h1 className="mb-4 text-5xl font-bold md:text-6xl">Saarthi4u Help Center</h1>
//           <p className="mx-auto mb-6 max-w-2xl text-lg text-white/90">
//             Your one-stop destination for support, guidance, and quick solutions. We’re here to ensure your experience with Saarthi4u is smooth and stress-free.
//           </p>
//           <p className="text-sm text-white/80">Last Updated: February 07, 2026</p>
//         </div>
//       </section>

//       {/* How can we help */}
//       <section className="py-16">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="rounded-lg bg-gradient-to-r from-teal-50 to-teal-100 p-8 dark:from-slate-800 dark:to-slate-700">
//             <h2 className="mb-4 text-2xl font-bold">How can we help you?</h2>
//             <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
//               Whether you’re exploring courses, seeking counseling, facing technical issues, or need help with applications, find clear answers and support options below.
//             </p>
//             <div className="grid gap-6 md:grid-cols-3">
//               <div className="rounded-lg border p-6">
//                 <div className="mb-3 text-3xl">🎓</div>
//                 <h3 className="mb-2 font-semibold">Student Support</h3>
//                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-inside list-disc">
//                   <li>Course & college selection</li>
//                   <li>Admission guidance & timelines</li>
//                   <li>Entrance exams & eligibility</li>
//                   <li>Study abroad options</li>
//                 </ul>
//               </div>

//               <div className="rounded-lg border p-6">
//                 <div className="mb-3 text-3xl">💳</div>
//                 <h3 className="mb-2 font-semibold">Payments & Refunds</h3>
//                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-inside list-disc">
//                   <li>Accepted payment methods</li>
//                   <li>Payment confirmation issues</li>
//                   <li>Refund eligibility & timelines</li>
//                 </ul>
//               </div>

//               <div className="rounded-lg border p-6">
//                 <div className="mb-3 text-3xl">🛠</div>
//                 <h3 className="mb-2 font-semibold">Technical Support</h3>
//                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-inside list-disc">
//                   <li>Page not loading or errors</li>
//                   <li>App installation & updates</li>
//                   <li>Feature access issues</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Popular Help Topics */}
//       <section className="py-12">
//         <div className="mx-auto max-w-6xl px-4">
//           <h2 className="mb-8 text-center text-3xl font-bold">Popular Help Topics</h2>
//           <div className="grid gap-6 md:grid-cols-2">
//             <article className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
//               <div className="mb-3 text-4xl">🔍</div>
//               <h3 className="mb-2 text-xl font-semibold">Account & Login Support</h3>
//               <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
//                 <li>Creating and managing your account</li>
//                 <li>Login or OTP issues</li>
//                 <li>Updating personal details</li>
//                 <li>Resetting passwords</li>
//               </ul>
//             </article>

//             <article className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
//               <div className="mb-3 text-4xl">🧾</div>
//               <h3 className="mb-2 text-xl font-semibold">Counseling & Services</h3>
//               <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
//                 <li>How Saarthi4u counseling works</li>
//                 <li>Booking free or paid counseling sessions</li>
//                 <li>Counselor assignment & follow-ups</li>
//               </ul>
//             </article>

//             <article className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
//               <div className="mb-3 text-4xl">🏫</div>
//               <h3 className="mb-2 text-xl font-semibold">Colleges, Courses & Exams</h3>
//               <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
//                 <li>Finding the right college or course</li>
//                 <li>Eligibility criteria & deadlines</li>
//                 <li>Entrance exam guidance & prep pathways</li>
//               </ul>
//             </article>

//             <article className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
//               <div className="mb-3 text-4xl">🌍</div>
//               <h3 className="mb-2 text-xl font-semibold">Study Abroad Assistance</h3>
//               <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
//                 <li>Country & university shortlisting</li>
//                 <li>Application guidance</li>
//                 <li>General visa process information</li>
//               </ul>
//             </article>
//           </div>
//         </div>
//       </section>

//       {/* Technical & Privacy Sections */}
//       <section className="py-12">
//         <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2">
//           <div className="rounded-lg bg-gradient-to-r from-white to-teal-50 p-6 dark:bg-slate-800">
//             <h3 className="mb-4 text-2xl font-semibold">Technical Support</h3>
//             <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
//               If basic troubleshooting doesn’t resolve your issue (clear cache, try other browser, check internet), our technical team is ready to help.
//             </p>
//             <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
//               <li>Report bugs with screenshots and steps to reproduce</li>
//               <li>Include device & browser details for faster troubleshooting</li>
//               <li>For app issues, mention app version and platform (iOS/Android)</li>
//             </ul>
//           </div>

//           <div className="rounded-lg bg-gradient-to-r from-white to-teal-50 p-6 dark:bg-slate-800">
//             <h3 className="mb-4 text-2xl font-semibold">Privacy, Data & Security</h3>
//             <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
//               We protect your personal data and share information with colleges only with your consent. See our Privacy Policy for full details.
//             </p>
//             <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
//               <li>Request data access, correction, or deletion via infodesk@saarthi4u.com</li>
//               <li>We use industry-standard security practices to safeguard data</li>
//               <li>We do not sell user data</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Report a Problem */}
//       <section className="py-12">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
//             <h3 className="mb-4 text-2xl font-semibold">Report a Problem or Concern</h3>
//             <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
//               You can contact us if you experience incorrect information, unprofessional behavior, technical glitches, or service delays. We take all concerns seriously.
//             </p>
//             <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
//               <li>Email with relevant details and attachments</li>
//               <li>Include user id, timeline and screenshots where possible</li>
//               <li>Our team will review and respond within a reasonable timeframe</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Resources & Contact */}
//       <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
//         <div className="mx-auto max-w-6xl px-4 text-center">
//           <h2 className="mb-6 text-3xl font-bold">Contact Support</h2>
//           <p className="mb-8 text-white/90">Still need help? Reach out to our support team and we will respond as soon as possible.</p>
//           <div className="grid gap-6 md:grid-cols-3">
//             <a href="mailto:infodesk@saarthi4u.com" className="group rounded-lg bg-white/10 p-6 backdrop-blur-sm transition hover:scale-105">
//               <div className="mb-4 text-4xl">📧</div>
//               <h3 className="mb-2 font-semibold">Email</h3>
//               <p className="text-white/90">infodesk@saarthi4u.com</p>
//             </a>

//             <a href="tel:+919958989150" className="group rounded-lg bg-white/10 p-6 backdrop-blur-sm transition hover:scale-105">
//               <div className="mb-4 text-4xl">📞</div>
//               <h3 className="mb-2 font-semibold">Phone</h3>
//               <p className="text-white/90">+91 9958989150</p>
//             </a>

//             <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
//               <div className="mb-4 text-4xl">🏢</div>
//               <h3 className="mb-2 font-semibold">Office</h3>
//               <p className="text-white/90">G-69, Sector-63, Noida – 201301, India</p>
//             </div>
//           </div>

//           <div className="mt-10 grid gap-6 md:grid-cols-2">
//             <a href="/faq" className="group rounded-lg bg-white/10 p-6 transition hover:scale-105">
//               <div className="mb-3 text-3xl">❓</div>
//               <h4 className="font-semibold">FAQs</h4>
//               <p className="text-white/90">Find quick answers to common questions</p>
//             </a>

//             <a href="/privacy-policy" className="group rounded-lg bg-white/10 p-6 transition hover:scale-105">
//               <div className="mb-3 text-3xl">🔐</div>
//               <h4 className="font-semibold">Privacy Policy</h4>
//               <p className="text-white/90">Learn how we handle your data</p>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Grievance & CTA */}
//       <section className="py-12">
//         <div className="mx-auto max-w-6xl px-4 text-center">
//           <h3 className="mb-4 text-2xl font-semibold">Grievance Redressal</h3>
//           <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">
//             If your issue is not resolved through regular support, escalate it by emailing details to our team. We will review and respond within a reasonable timeframe.
//           </p>
//           <a href="/contact" className="inline-block rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-3 font-semibold text-white hover:scale-105 transition">Contact Support</a>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default HelpPage;


'use client';

import React from 'react';

const HelpPage = () => {
  return (
    <main className="bg-white dark:bg-slate-900 w-full">

      {/* HERO */}
      <section className="pt-28 pb-24 bg-slate-50 dark:bg-slate-900">
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
              { icon: "📧", title: "Email", value: "infodesk@saarthi4u.com", href: "mailto:infodesk@saarthi4u.com" },
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
            className="inline-block rounded-lg bg-blue-600 px-10 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-blue-700"
          >
            Contact Support
          </a>
        </div>
      </section>

    </main>
  );
};

export default HelpPage;
