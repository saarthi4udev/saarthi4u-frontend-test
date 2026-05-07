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
      <section className="w-full bg-heroBg dark:bg-slate-900 pt-28 pb-24">
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
              <span className="rounded-md bg-secondary/10 px-4 py-2 text-secondary font-medium">
                Admissions & Courses
              </span>
              <span className="rounded-md bg-secondary/10 px-4 py-2 text-secondary font-medium">
                Counseling & Guidance
              </span>
              <span className="rounded-md bg-secondary/10 px-4 py-2 text-secondary font-medium">
                Study Abroad
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-secondary/15 blur-3xl"></div>
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
            className="mt-8 inline-block rounded-lg bg-accent px-10 py-3 font-semibold text-primary hover:bg-accent-dark transition"
          >
            Get Free Counseling →
          </a>
        </div>
      </section>

    </main>
  );
};

export default FAQPage;
