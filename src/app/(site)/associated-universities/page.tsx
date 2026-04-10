import { Metadata } from "next";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Associated Universities & Boards | Saarthi4u",
  description: "Explore our associated universities and educational boards",
};

const universities = [
  { name: "Sikkim University", fileName: "sikkim-university-fee-structure.pdf" },
  { name: "Asian International University", fileName: "asian-international-university-fee-structure.pdf" },
  { name: "Vivekananda Global University (VGU)", fileName: "vivekananda-global-university-fee-structure.pdf" },
  { name: "GLA University", fileName: "gla-university-fee-structure.pdf" },
  { name: "Sikkim Manipal University (SMU)", fileName: "sikkim-manipal-university-fee-structure.pdf" },
  { name: "Online Manipal University", fileName: "online-manipal-university-fee-structure.pdf" },
  { name: "Lovely Professional University (LPU)", fileName: "lovely-professional-university-fee-structure.pdf" },
  { name: "Sharda University (Bangalore)", fileName: "sharda-university-bangalore-fee-structure.pdf" },
  { name: "Amity University", fileName: "amity-university-fee-structure.pdf" },
  { name: "Sharda University (Deemed-to-be University)", fileName: "sharda-university-deemed-fee-structure.pdf" },
  { name: "BOSSE Open Board (10th/12th)", fileName: "bosse-open-board-fee-structure.pdf" },
  { name: "Suresh Gyan Vihar University", fileName: "suresh-gyan-vihar-university-fee-structure.pdf" },
];

export default function AssociatedUniversitiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Header Background Blur */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-600/10" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/10" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) md:py-20">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary dark:border-secondary/35 dark:bg-secondary/15">
            <Icon icon="solar:buildings-2-bold" className="text-base" />
            Our Network
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-midnight_text dark:text-white sm:text-5xl">
            Associated{" "}
            <span className="bg-gradient-to-r from-secondary via-secondary/80 to-accent bg-clip-text text-transparent">
              Universities & Boards
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted dark:text-slate-300 sm:text-lg">
            We are proud to collaborate with India's leading universities and educational boards to provide comprehensive career guidance and admission support.
          </p>
        </div>

        {/* Grid of Universities */}
        <div className="grid gap-4 sm:grid-cols-2">
          {universities.map((university, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/60 bg-white/95 p-6 shadow-sm transition hover:border-secondary/50 hover:shadow-md dark:border-dark_border/60 dark:bg-slate-900/90"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-midnight_text dark:text-white">
                    {university.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">
                    Download fee structure and student details for this college.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-midnight_text dark:bg-slate-800/80 dark:text-white">
                <span>Fee structure</span>
                <a
                  href={`/files/${university.fileName}`}
                  download
                  className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary transition hover:bg-secondary/15"
                >
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 rounded-2xl border border-border/60 bg-gradient-to-br from-cyan-50/80 via-blue-50/80 to-indigo-50/80 p-8 text-center backdrop-blur-sm dark:from-cyan-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 dark:border-dark_border/60 sm:p-12">
          <Icon
            icon="solar:star-bold"
            className="mx-auto text-4xl text-secondary/30 mb-4"
          />
          <h2 className="text-2xl font-bold text-midnight_text dark:text-white sm:text-3xl">
            Ready to Explore Colleges?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted dark:text-slate-300">
            Get personalized guidance, compare fees, check rankings, and understand placement records.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/college"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secondary to-accent px-8 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-secondary/30"
            >
              <Icon icon="solar:buildings-2-bold" className="text-lg" />
              Explore All Colleges
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-secondary bg-white px-8 py-3 text-sm font-bold text-secondary transition hover:bg-secondary/5 dark:bg-slate-900 dark:hover:bg-secondary/10"
            >
              <Icon icon="solar:chat-linear" className="text-lg" />
              Get Consultation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
