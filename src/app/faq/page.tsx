// 'use client';

// import { useState } from 'react';
// import { Metadata } from 'next';

// const FAQPage = () => {
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

//   const faqCategories = [
//     {
//       category: 'GENERAL QUESTIONS',
//       icon: '❓',
//       color: 'indigo',
//       questions: [
//         {
//           q: 'What is Saarthi4u?',
//           a: 'Saarthi4u is an education information, counseling, and career-guidance platform that helps students and parents explore colleges, courses, exams, careers, and study-abroad opportunities. We guide students in making informed academic and career decisions.',
//         },
//         {
//           q: 'Is Saarthi4u an admission agency or university?',
//           a: 'No. Saarthi4u is not a university, admission authority, or government body. We provide verified information, counseling, and guidance. Final admission decisions are always made by the respective colleges, universities, or institutions.',
//         },
//         {
//           q: 'Who can use Saarthi4u services?',
//           a: 'Our services are designed for school students, college aspirants, graduates and professionals, parents and guardians, and study abroad aspirants.',
//         },
//       ],
//     },
//     {
//       category: 'COUNSELING & GUIDANCE',
//       icon: '🎯',
//       color: 'blue',
//       questions: [
//         {
//           q: 'How does Saarthi4u counseling work?',
//           a: 'Our counseling process includes understanding your interests, strengths, and goals, shortlisting suitable courses and colleges, providing admission guidance and timelines, and supporting documentation and application steps. Counseling can be online or offline.',
//         },
//         {
//           q: 'Are the counselors experienced?',
//           a: 'Yes. Our counselors are experienced education and career advisors who stay updated with admission trends, eligibility criteria, and industry requirements.',
//         },
//         {
//           q: 'Is counseling free or paid?',
//           a: 'We offer both free basic guidance and paid premium counseling services. Any applicable fees are clearly communicated before you opt for paid services.',
//         },
//       ],
//     },
//     {
//       category: 'COLLEGES, COURSES & ADMISSIONS',
//       icon: '🎓',
//       color: 'purple',
//       questions: [
//         {
//           q: 'How accurate is the information on Saarthi4u?',
//           a: 'We collect information from official institute websites, brochures, public sources, and verified partners. While we strive for accuracy, details such as fees, eligibility, and deadlines may change. We strongly recommend verifying critical details directly with institutions.',
//         },
//         {
//           q: 'Can Saarthi4u guarantee admission or scholarships?',
//           a: 'No. Saarthi4u does not guarantee admissions, scholarships, or placements. We guide and support you, but final outcomes depend on institutional criteria and student eligibility.',
//         },
//         {
//           q: 'Does Saarthi4u help with entrance exams?',
//           a: 'Yes. We provide guidance related to entrance exams such as eligibility, exam patterns, important dates, and preparation pathways.',
//         },
//       ],
//     },
//     {
//       category: 'STUDY ABROAD',
//       icon: '✈️',
//       color: 'cyan',
//       questions: [
//         {
//           q: 'Do you provide study abroad counseling?',
//           a: 'Yes. Saarthi4u offers study abroad guidance including country and university selection, course shortlisting, application process overview, and general visa guidance (non-legal).',
//         },
//         {
//           q: 'Do you guarantee visas or overseas admissions?',
//           a: 'No. Visa approvals and overseas admissions are governed by foreign universities and embassies. Saarthi4u only provides guidance and support.',
//         },
//       ],
//     },
//     {
//       category: 'PAYMENTS & REFUNDS',
//       icon: '💳',
//       color: 'green',
//       questions: [
//         {
//           q: 'Are Saarthi4u services paid?',
//           a: 'Some services are free, while others require payment. Pricing details are shared transparently before any payment is collected.',
//         },
//         {
//           q: 'What payment methods are accepted?',
//           a: 'We accept payments through secure online payment gateways, UPI, bank transfers, and other approved methods.',
//         },
//         {
//           q: 'Is there a refund policy?',
//           a: 'Refund policies (if applicable) are shared at the time of purchase and vary depending on the service. Please review the refund terms carefully before making a payment.',
//         },
//       ],
//     },
//     {
//       category: 'ACCOUNT & DATA PRIVACY',
//       icon: '🔐',
//       color: 'rose',
//       questions: [
//         {
//           q: 'Do I need to create an account to use Saarthi4u?',
//           a: 'You can browse general information without an account. However, account creation may be required for counseling, personalized services, or applications.',
//         },
//         {
//           q: 'Is my personal data safe with Saarthi4u?',
//           a: 'Yes. We use industry-standard security measures to protect your personal data. Your information is handled as per our Privacy Policy.',
//         },
//         {
//           q: 'Will my data be shared with colleges?',
//           a: 'Your data is shared only with your consent and strictly for academic counseling or admission-related purposes.',
//         },
//         {
//           q: 'Can I request deletion of my data?',
//           a: 'Yes. You may request data access, correction, or deletion by contacting us at infodesk@saarthi4u.com, subject to legal and regulatory requirements.',
//         },
//       ],
//     },
//   ];

//   const toggleAccordion = (index: number) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <main className="bg-white dark:bg-dark">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 py-20 text-white dark:from-slate-900 dark:to-slate-800">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/20 blur-3xl"></div>
//           <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/20 blur-3xl"></div>
//         </div>

//         <div className="relative mx-auto max-w-6xl px-4 text-center">
//           <div className="mb-4 text-6xl">❓</div>
//           <h1 className="mb-4 text-5xl font-bold md:text-6xl">Frequently Asked Questions</h1>
//           <p className="mb-8 text-xl text-white/90">Find Answers to Your Questions</p>
//           <p className="mx-auto max-w-2xl text-lg text-white/80">
//             Explore our comprehensive FAQ section to get clarity on our services, counseling process, admissions guidance, and more
//           </p>
//           <p className="mt-6 text-sm text-white/70">
//             Last Updated: February 07, 2026 • Quick Access Guide
//           </p>
//         </div>
//       </section>

//       {/* Introduction Section */}
//       <section className="py-16">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 p-8 dark:from-slate-800 dark:to-slate-700">
//             <p className="mb-4 text-lg">
//               Welcome to the <strong>Saarthi4u FAQ section</strong>. Here you'll find clear answers to the most common questions about our services, counseling process, admissions guidance, payments, privacy, and more.
//             </p>
//             <p className="text-lg">
//               If you don't find what you're looking for, feel free to reach out to our support team — we're always happy to help. 🤝
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Sections */}
//       <section className="py-16">
//         <div className="mx-auto max-w-4xl px-4">
//           {faqCategories.map((categoryData, categoryIndex) => {
//             const colorMap: { [key: string]: string } = {
//               indigo: 'indigo',
//               blue: 'blue',
//               purple: 'purple',
//               cyan: 'cyan',
//               green: 'emerald',
//               rose: 'rose',
//             };
//             const color = colorMap[categoryData.color];
//             const baseIndex = categoryIndex * 100;

//             return (
//               <div key={categoryIndex} className="mb-16">
//                 {/* Category Header */}
//                 <div className="mb-8 flex items-center gap-4">
//                   <div className={`flex h-14 w-14 items-center justify-center rounded-lg bg-${color}-100 dark:bg-slate-700`}>
//                     <span className="text-3xl">{categoryData.icon}</span>
//                   </div>
//                   <h2 className="text-3xl font-bold">{categoryData.category}</h2>
//                   <div className={`ml-auto h-1 w-12 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full`}></div>
//                 </div>

//                 {/* Accordion Questions */}
//                 <div className="space-y-4">
//                   {categoryData.questions.map((item, qIndex) => {
//                     const itemIndex = baseIndex + qIndex;
//                     const isOpen = expandedIndex === itemIndex;

//                     return (
//                       <div
//                         key={qIndex}
//                         className={`overflow-hidden rounded-lg border-2 border-${color}-200 transition-all duration-300 dark:border-slate-600 ${
//                           isOpen ? `bg-${color}-50 dark:bg-slate-800` : 'bg-white dark:bg-slate-900'
//                         }`}
//                       >
//                         {/* Question Button */}
//                         <button
//                           onClick={() => toggleAccordion(itemIndex)}
//                           className={`w-full px-6 py-4 text-left transition-all duration-300 hover:bg-${color}-100 dark:hover:bg-slate-700 flex items-center justify-between`}
//                         >
//                           <span className={`text-lg font-semibold transition-colors duration-300 ${
//                             isOpen ? `text-${color}-700 dark:text-${color}-400` : 'text-gray-800 dark:text-gray-200'
//                           }`}>
//                             {item.q}
//                           </span>
//                           <span className={`ml-4 flex-shrink-0 text-2xl transition-transform duration-300 ${
//                             isOpen ? 'rotate-180' : ''
//                           } text-${color}-600 dark:text-${color}-400`}>
//                             ▼
//                           </span>
//                         </button>

//                         {/* Answer Content */}
//                         <div className={`overflow-hidden transition-all duration-300 ${
//                           isOpen ? 'max-h-96' : 'max-h-0'
//                         }`}>
//                           <div className={`border-t-2 border-${color}-200 bg-${color}-50 px-6 py-4 dark:border-slate-600 dark:bg-slate-800`}>
//                             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                               {item.a}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* Still Have Questions Section */}
//       <section className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-16 text-white dark:from-slate-900 dark:to-slate-800">
//         <div className="mx-auto max-w-4xl px-4 text-center">
//           <h2 className="mb-8 text-4xl font-bold">Still Have Questions?</h2>
//           <p className="mb-12 text-lg text-white/90">
//             Our dedicated support and counseling team is always ready to assist you. Don't hesitate to reach out!
//           </p>

//           <div className="grid gap-6 md:grid-cols-3">
//             <a
//               href="mailto:infodesk@saarthi4u.com"
//               className="group rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
//             >
//               <div className="mb-4 text-5xl">📧</div>
//               <h3 className="mb-2 font-semibold">Email</h3>
//               <p className="text-white/90 break-all group-hover:text-white transition-colors">
//                 infodesk@saarthi4u.com
//               </p>
//             </a>

//             <a
//               href="tel:+919958989150"
//               className="group rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
//             >
//               <div className="mb-4 text-5xl">📞</div>
//               <h3 className="mb-2 font-semibold">Phone</h3>
//               <p className="text-white/90 group-hover:text-white transition-colors">
//                 +91 9958989150
//               </p>
//             </a>

//             <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
//               <div className="mb-4 text-5xl">📍</div>
//               <h3 className="mb-2 font-semibold">Office</h3>
//               <p className="text-white/90">
//                 G-69, Sector-63<br />
//                 Noida – 201301, India
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Additional Resources */}
//       <section className="py-16">
//         <div className="mx-auto max-w-4xl px-4">
//           <h2 className="mb-12 text-center text-3xl font-bold">Additional Resources</h2>
//           <div className="grid gap-6 md:grid-cols-2">
//             <a
//               href="/privacy-policy"
//               className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
//             >
//               <div className="mb-4 text-4xl group-hover:scale-110 transition-transform">🔐</div>
//               <h3 className="mb-2 font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
//                 Privacy Policy
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Understand how we protect and handle your personal data
//               </p>
//             </a>

//             <a
//               href="/terms"
//               className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
//             >
//               <div className="mb-4 text-4xl group-hover:scale-110 transition-transform">⚖️</div>
//               <h3 className="mb-2 font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
//                 Terms & Conditions
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Review the terms governing your use of Saarthi4u
//               </p>
//             </a>

//             <a
//               href="/about-us"
//               className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
//             >
//               <div className="mb-4 text-4xl group-hover:scale-110 transition-transform">👥</div>
//               <h3 className="mb-2 font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
//                 About Us
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Learn more about Saarthi4u's mission and vision
//               </p>
//             </a>

//             <a
//               href="/contact"
//               className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
//             >
//               <div className="mb-4 text-4xl group-hover:scale-110 transition-transform">💬</div>
//               <h3 className="mb-2 font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
//                 Contact Us
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Get in touch with our team for any inquiries
//               </p>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="bg-indigo-50 py-12 dark:bg-slate-800">
//         <div className="mx-auto max-w-4xl px-4 text-center">
//           <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
//             Ready to begin your educational journey with Saarthi4u?
//           </p>
//           <a
//             href="/contact"
//             className="inline-block rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
//           >
//             Get Free Counseling Today →
//           </a>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default FAQPage;

'use client';

import { useState } from 'react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      title: 'General Questions',
      description: 'Basic information about Saarthi4u and our platform',
      questions: [
        {
          q: 'What is Saarthi4u?',
          a: 'Saarthi4u is an education information, counseling, and career-guidance platform that helps students and parents explore colleges, courses, exams, careers, and study-abroad opportunities.',
        },
        {
          q: 'Is Saarthi4u an admission agency or university?',
          a: 'No. Saarthi4u is not a university, admission authority, or government body. We provide verified guidance and counseling only.',
        },
        {
          q: 'Who can use Saarthi4u services?',
          a: 'Our services are designed for school students, college aspirants, graduates, professionals, parents, and study-abroad aspirants.',
        },
      ],
    },
    {
      title: 'Counseling & Guidance',
      description: 'How our expert counseling process works',
      questions: [
        {
          q: 'How does Saarthi4u counseling work?',
          a: 'We understand your interests and goals, shortlist suitable courses and colleges, provide admission timelines, and guide you through documentation and application steps.',
        },
        {
          q: 'Are the counselors experienced?',
          a: 'Yes. Our counselors are experienced education and career advisors who stay updated with admission trends and eligibility criteria.',
        },
        {
          q: 'Is counseling free or paid?',
          a: 'We offer both free basic guidance and paid premium counseling services. Pricing is always communicated transparently.',
        },
      ],
    },
    {
      title: 'Colleges, Courses & Admissions',
      description: 'Admissions, exams, and information accuracy',
      questions: [
        {
          q: 'How accurate is the information on Saarthi4u?',
          a: 'We collect information from official institute websites and verified sources. However, details may change, so we recommend verifying critical information directly with institutions.',
        },
        {
          q: 'Can Saarthi4u guarantee admission or scholarships?',
          a: 'No. We do not guarantee admissions, scholarships, or placements. Final outcomes depend on institutional criteria and student eligibility.',
        },
        {
          q: 'Does Saarthi4u help with entrance exams?',
          a: 'Yes. We provide guidance on eligibility, exam patterns, important dates, and preparation pathways.',
        },
      ],
    },
    {
      title: 'Study Abroad',
      description: 'International education guidance',
      questions: [
        {
          q: 'Do you provide study abroad counseling?',
          a: 'Yes. We offer guidance for country selection, university shortlisting, applications, and general visa guidance (non-legal).',
        },
        {
          q: 'Do you guarantee visas or overseas admissions?',
          a: 'No. Visa approvals and overseas admissions are governed by embassies and universities. We provide guidance only.',
        },
      ],
    },
    {
      title: 'Payments & Privacy',
      description: 'Payments, refunds, and data security',
      questions: [
        {
          q: 'Are Saarthi4u services paid?',
          a: 'Some services are free, while others are paid. Pricing details are shared before any payment is collected.',
        },
        {
          q: 'Is my personal data safe with Saarthi4u?',
          a: 'Yes. We use industry-standard security practices and handle data according to our Privacy Policy.',
        },
      ],
    },
  ];

  return (
    <main className="bg-white dark:bg-slate-900 w-full">

      {/* HERO – FULL WIDTH */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">

          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Find clear answers about <strong>Saarthi4u Education</strong>. From
              course details and admissions to support services and career
              guidance, our FAQs cover everything you need to know for a smooth
              educational journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 font-medium">
                Admissions & Courses
              </span>
              <span className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 font-medium">
                Counseling & Guidance
              </span>
              <span className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 font-medium">
                Study Abroad
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-blue-100 blur-3xl"></div>
            <img
              src="/images/faq-education.png"
              alt="Education guidance and FAQs"
              className="relative z-10 w-full max-w-lg"
            />
          </div>

        </div>
      </section>

      {/* FAQ CONTENT – WIDER */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 space-y-20">

          {faqCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {category.title}
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const index = catIndex * 100 + qIndex;
                  const open = openIndex === index;

                  return (
                    <div
                      key={qIndex}
                      className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                    >
                      <button
                        onClick={() => setOpenIndex(open ? null : index)}
                        className="flex w-full items-center justify-between px-6 py-4 text-left"
                      >
                        <span className="font-medium text-slate-900 dark:text-white">
                          {item.q}
                        </span>
                        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
                          ▾
                        </span>
                      </button>

                      {open && (
                        <div className="border-t border-slate-200 px-6 py-4 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA – FULL WIDTH */}
      <section className="w-full bg-slate-50 dark:bg-slate-800 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Still have questions?
          </h3>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Our experts are ready to guide you at every step.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-10 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Get Free Counseling →
          </a>
        </div>
      </section>

    </main>
  );
};

export default FAQPage;
