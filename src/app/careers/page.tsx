// // 'use client';

// // import Link from 'next/link';

// // export default function CareersPage() {
// //   const openings = [
// //     {
// //       slug: 'product-counselor',
// //       title: 'Product Counselor',
// //       location: 'Noida (Remote-friendly)',
// //       exp: '2-5 yrs',
// //       summary: 'Guide students through course & college selection with personalised counseling.',
// //     },
// //     {
// //       slug: 'admissions-specialist',
// //       title: 'Admissions Specialist',
// //       location: 'Noida',
// //       exp: '1-3 yrs',
// //       summary: 'Assist applicants through documentation and admission processes.',
// //     },
// //     {
// //       slug: 'content-writer',
// //       title: 'Content Writer (Education)',
// //       location: 'Remote',
// //       exp: 'Fresher - 2 yrs',
// //       summary: 'Create insightful articles, admission guides and course comparisons.',
// //     },
// //   ];

// //   return (
// //     <main className="bg-white dark:bg-slate-900">
// //       <section className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 py-20 text-white">
// //         <div className="mx-auto max-w-6xl px-4 text-center">
// //           <div className="mb-4 text-6xl">🚀</div>
// //           <h1 className="mb-4 text-4xl font-bold md:text-5xl">Careers at Saarthi4u</h1>
// //           <p className="mx-auto max-w-2xl text-lg text-white/90">
// //             Join our mission to empower students. Browse openings below and apply with a short form.
// //           </p>
// //         </div>
// //       </section>

// //       <section className="mx-auto max-w-6xl px-4 py-12">
// //         <div className="mb-8 flex items-center justify-between">
// //           <h2 className="text-2xl font-bold">Open Positions</h2>
// //           <p className="text-sm text-gray-500">We update openings frequently — check back often.</p>
// //         </div>

// //         <div className="grid gap-6 md:grid-cols-2">
// //           {openings.map((o) => (
// //             <article key={o.slug} className="group rounded-lg border bg-white p-6 shadow-sm transition hover:scale-102 dark:bg-slate-800 dark:border-slate-700">
// //               <div className="flex items-start justify-between">
// //                 <div>
// //                   <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">{o.title}</h3>
// //                   <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{o.location} • {o.exp}</p>
// //                   <p className="text-sm text-gray-700 dark:text-gray-300">{o.summary}</p>
// //                 </div>
// //                 <div className="ml-4 text-right">
// //                   <span className="inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">{o.exp}</span>
// //                 </div>
// //               </div>

// //               <div className="mt-6 flex items-center gap-3">
// //                 <Link href={`/careers/${o.slug}`} className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">View & Apply</Link>
// //                 <a href="mailto:infodesk@saarthi4u.com?subject=Job%20Interest%20-%20" className="text-sm text-gray-500 hover:underline">Contact HR</a>
// //               </div>
// //             </article>
// //           ))}
// //         </div>

// //         <div className="mt-12 rounded-lg border bg-gradient-to-r from-violet-50 to-violet-100 p-6 dark:bg-slate-800">
// //           <h4 className="mb-2 text-lg font-semibold">Can’t find the right fit?</h4>
// //           <p className="text-sm text-gray-700 dark:text-gray-300">Share your resume at <a className="font-medium text-violet-600" href="mailto:careers@saarthi4u.com">careers@saarthi4u.com</a> and we’ll get in touch about future roles.</p>
// //         </div>
// //       </section>

// //       <section className="bg-violet-50 py-12 dark:bg-slate-800">
// //         <div className="mx-auto max-w-6xl px-4 text-center">
// //           <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">Ready to make an impact?</p>
// //           <a href="/contact" className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-3 text-white font-semibold hover:scale-105 transition">Contact Us</a>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }


// 'use client';

// import Link from 'next/link';

// export default function CareersPage() {
//   const openings = [
//     {
//       slug: 'product-counselor',
//       title: 'Product Counselor',
//       location: 'Noida (Remote-friendly)',
//       exp: '2–5 yrs',
//       summary:
//         'Guide students through course and college selection with personalized counseling.',
//     },
//     {
//       slug: 'admissions-specialist',
//       title: 'Admissions Specialist',
//       location: 'Noida',
//       exp: '1–3 yrs',
//       summary:
//         'Assist applicants through documentation, coordination, and admission processes.',
//     },
//     {
//       slug: 'content-writer',
//       title: 'Content Writer (Education)',
//       location: 'Remote',
//       exp: 'Fresher – 2 yrs',
//       summary:
//         'Create insightful education content including admission guides and comparisons.',
//     },
//   ];

//   return (
//     <main className="bg-white dark:bg-slate-900">

//       {/* HERO */}
//       <section className="pt-28 pb-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
//         <div className="mx-auto max-w-5xl px-6 text-center">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-3xl">
//             🚀
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
//             Careers at Saarthi4u
//           </h1>

//           <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
//             Join our mission to empower students with the right guidance at the
//             right time. Explore open roles and grow with us.
//           </p>
//         </div>
//       </section>

//       {/* OPENINGS */}
//       <section className="py-24">
//         <div className="mx-auto max-w-6xl px-6">

//           <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
//             <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
//               Open Positions
//             </h2>
//             <p className="text-sm text-slate-500 dark:text-slate-400">
//               We regularly update openings — check back often.
//             </p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2">
//             {openings.map((o) => (
//               <article
//                 key={o.slug}
//                 className="
//                   group relative overflow-hidden rounded-xl
//                   border border-slate-200 bg-white p-6
//                   transition-all duration-300
//                   hover:-translate-y-1 hover:shadow-xl hover:border-blue-500
//                   dark:bg-slate-800 dark:border-slate-700
//                 "
//               >
//                 {/* Accent bar */}
//                 <div
//                   className="
//                     absolute left-0 top-0 h-full w-1 bg-blue-600
//                     scale-y-0 origin-top transition-transform duration-300
//                     group-hover:scale-y-100
//                   "
//                 />

//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <h3 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
//                       {o.title}
//                     </h3>
//                     <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
//                       {o.location} • {o.exp}
//                     </p>
//                     <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
//                       {o.summary}
//                     </p>
//                   </div>

//                   <span
//                     className="
//                       shrink-0 rounded-full bg-blue-100 px-3 py-1
//                       text-xs font-medium text-blue-700
//                     "
//                   >
//                     {o.exp}
//                   </span>
//                 </div>

//                 <div className="mt-6 flex items-center gap-4">
//                   <Link
//                     href={`/careers/${o.slug}`}
//                     className="
//                       inline-flex items-center rounded-md
//                       bg-blue-600 px-4 py-2
//                       text-sm font-semibold text-white
//                       transition hover:bg-blue-700
//                     "
//                   >
//                     View & Apply →
//                   </Link>

//                   <a
//                     href={`mailto:infodesk@saarthi4u.com?subject=Job Interest - ${o.title}`}
//                     className="text-sm text-slate-500 hover:text-blue-600 transition"
//                   >
//                     Contact HR
//                   </a>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {/* NO MATCH */}
//           <div
//             className="
//               mt-14 rounded-xl border border-slate-200
//               bg-slate-50 p-8 text-center
//               dark:bg-slate-800 dark:border-slate-700
//             "
//           >
//             <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
//               Can’t find the right role?
//             </h4>
//             <p className="text-sm text-slate-600 dark:text-slate-300">
//               Share your resume at{" "}
//               <a
//                 href="mailto:careers@saarthi4u.com"
//                 className="font-medium text-blue-600"
//               >
//                 careers@saarthi4u.com
//               </a>{" "}
//               and we’ll reach out for future opportunities.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-16 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
//         <div className="mx-auto max-w-4xl px-6 text-center">
//           <p className="mb-6 text-lg text-slate-600 dark:text-slate-300">
//             Ready to make an impact in education?
//           </p>

//           <a
//             href="/contact"
//             className="
//               inline-block rounded-lg
//               bg-blue-600 px-8 py-3
//               font-semibold text-white
//               transition hover:scale-105 hover:bg-blue-700
//             "
//           >
//             Contact Us
//           </a>
//         </div>
//       </section>

//     </main>
//   );
// }


'use client';

import Link from 'next/link';

export default function CareersPage() {
  const openings = [
    {
      slug: 'product-counselor',
      title: 'Product Counselor',
      location: 'Noida (Remote-friendly)',
      exp: '2–5 yrs',
      summary:
        'Guide students through course and college selection with personalized counseling.',
    },
    {
      slug: 'admissions-specialist',
      title: 'Admissions Specialist',
      location: 'Noida',
      exp: '1–3 yrs',
      summary:
        'Assist applicants with documentation, coordination, and admission processes.',
    },
    {
      slug: 'content-writer',
      title: 'Content Writer (Education)',
      location: 'Remote',
      exp: 'Fresher – 2 yrs',
      summary:
        'Create insightful education content including admission guides and comparisons.',
    },
  ];

  return (
    <main className="bg-white dark:bg-slate-900 w-full overflow-x-hidden">

      {/* HERO */}
      <section className="pt-28 pb-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-6 grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Build Your Career <br className="hidden sm:block" />
              with Saarthi4u
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Join a purpose-driven team helping students make the right academic
              and career decisions. Grow, learn, and create real impact.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Education & Counseling',
                'Growth-Focused Culture',
                'Meaningful Impact',
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end animate-fadeIn">
            {/* Soft background glow */}
            <div className="absolute -top-12 -right-12 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-70"></div>

            <img
              src="/images/careers-hero.png"
              alt="Careers at Saarthi4u"
              className="
                relative z-10
                w-full max-w-xl
                transition-transform duration-500
                hover:scale-[1.02]
              "
            />
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">

          <div className="mb-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Open Positions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We update openings regularly — check back often.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {openings.map((o) => (
              <article
                key={o.slug}
                className="
                  group relative rounded-xl
                  border border-slate-200 bg-white p-7
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl
                  dark:border-slate-700 dark:bg-slate-800
                "
              >
                {/* Hover accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-blue-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
                      {o.title}
                    </h3>
                    <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                      {o.location} • {o.exp}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {o.summary}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {o.exp}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href={`/careers/${o.slug}`}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View & Apply →
                  </Link>

                  <a
                    href={`mailto:careers@saarthi4u.com?subject=Job Interest - ${o.title}`}
                    className="text-sm text-slate-500 hover:text-blue-600 transition"
                  >
                    Contact HR
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* NO MATCH */}
          <div className="mt-20 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center dark:bg-slate-800 dark:border-slate-700">
            <h4 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
              Don’t see the right role?
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Share your resume at{' '}
              <a
                href="mailto:careers@saarthi4u.com"
                className="font-medium text-blue-600"
              >
                careers@saarthi4u.com
              </a>{' '}
              and we’ll reach out when a suitable opportunity opens.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-6 text-lg text-slate-600 dark:text-slate-300">
            Ready to create impact in education?
          </p>

          <a
            href="/contact"
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:scale-105 hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
