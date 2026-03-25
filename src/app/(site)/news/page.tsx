import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News | Saarthi4u",
  description:
    "Latest education and admission news, deadlines, policy updates, and student opportunities from Saarthi4u.",
};

const newsItems = [
  {
    id: "admission-calendar-2026",
    title: "Admission Calendar 2026: Key Milestones for Students",
    excerpt:
      "A practical timeline to track application forms, document windows, counseling rounds, and final admission confirmations.",
    category: "Admissions",
    publishedOn: "March 20, 2026",
  },
  {
    id: "scholarship-deadlines-q2",
    title: "Scholarship Deadlines You Should Not Miss This Quarter",
    excerpt:
      "An updated shortlist of major scholarship deadlines and how to prepare your application package in advance.",
    category: "Scholarships",
    publishedOn: "March 14, 2026",
  },
  {
    id: "exam-pattern-updates",
    title: "Entrance Exam Pattern Updates: What Changed This Year",
    excerpt:
      "A clear summary of exam-format changes, marking updates, and preparation adjustments for top entrance tests.",
    category: "Exams",
    publishedOn: "March 5, 2026",
  },
  {
    id: "campus-recruitment-trends",
    title: "Campus Recruitment Trends Students Should Watch",
    excerpt:
      "An overview of skill trends, sector demand, and internship signals to help students plan stronger career pathways.",
    category: "Careers",
    publishedOn: "February 28, 2026",
  },
];

export default function NewsPage() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_34%,#f1faf8_100%)] py-16 transition-colors dark:bg-[linear-gradient(180deg,#07111f_0%,#09182d_42%,#05111b_100%)] sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-16 bottom-14 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-primary/10 bg-white/85 p-6 text-center shadow-[0_28px_75px_rgba(10,24,58,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,216,201,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(23,30,76,0.08),transparent_30%)]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FAFA33]/45 bg-[#FAFA33]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-[#FAFA33]/30 dark:text-primary">
              Resource Updates
            </span>
            <h1 className="text-35 font-extrabold text-primary dark:text-white sm:text-48">
              Latest <span className="text-secondary">News</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Stay updated with important education announcements, exam policy changes, scholarships, and admission alerts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_50px_rgba(10,24,58,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_28px_64px_rgba(10,24,58,0.14)] dark:border-white/10 dark:bg-slate-900/80"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:bg-white/10 dark:text-secondary">
                  {item.category}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  {item.publishedOn}
                </span>
              </div>
              <h2 className="text-xl font-bold text-primary dark:text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.excerpt}</p>
              <div className="mt-5 border-t border-primary/10 pt-4 text-sm font-semibold text-primary dark:border-white/10 dark:text-secondary">
                Full article coming soon
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-secondary/10"
          >
            Explore Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
