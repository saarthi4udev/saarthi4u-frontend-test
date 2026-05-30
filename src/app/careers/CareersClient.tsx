'use client';

import Link from 'next/link';
import CSSAnimatedCareer from '@/components/Common/CSSAnimatedCareer';

export default function CareersClient() {
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
      <section className="pt-28 pb-24 bg-heroBg dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
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
                  className="rounded-md bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end animate-fadeIn">
            <CSSAnimatedCareer />
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
                <div className="absolute inset-x-0 top-0 h-1 bg-secondary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

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

                  <span className="shrink-0 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                    {o.exp}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href={`/careers/${o.slug}`}
                    className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent-dark"
                  >
                    View & Apply →
                  </Link>

                  <a
                    href={`mailto:info@saarthi4u.com?subject=Job Interest - ${o.title}`}
                    className="text-sm text-slate-500 hover:text-secondary transition"
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
                href="mailto:info@saarthi4u.com"
                className="font-medium text-secondary"
              >
                info@saarthi4u.com
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
            className="inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-primary transition hover:scale-105 hover:bg-accent-dark"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
