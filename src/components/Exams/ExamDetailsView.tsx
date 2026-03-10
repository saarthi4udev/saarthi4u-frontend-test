// "use client";

// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { ExamItem } from "@/types/examDiscovery";
// import { College } from "@/types/college";
// import { formatFeeRange } from "@/app/api/examDiscovery";
// import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";

// type Props = {
//   exam: ExamItem;
//   relatedColleges: College[];
// };

// export default function ExamDetailsView({ exam, relatedColleges }: Readonly<Props>) {
//   return (
//     <section className="py-14 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
//   <div className="container mx-auto px-4 sm:px-6">

//     {/* Breadcrumb */}
//     <div className="flex flex-wrap items-center gap-2 text-sm mb-8 text-gray-500 dark:text-gray-400">
//       <Link href="/exam" className="hover:text-primary transition-colors">
//         Exams
//       </Link>
//       <Icon icon="mdi:chevron-right" />
//       <span className="text-gray-900 dark:text-white">{exam.name}</span>
//     </div>

//     {/* Hero Card */}
//     <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 mb-8 transition-colors">
//       <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
//         <h1 className="text-4xl font-semibold text-gray-900 dark:text-white max-w-4xl">
//           {exam.name}
//         </h1>

//         {exam.popular && (
//           <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 h-fit mt-1">
//             Popular Exam
//           </span>
//         )}
//       </div>

//       <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-4xl">
//         {exam.description}
//       </p>

//       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 text-sm">
//         {[
//           { label: "Category", value: exam.category },
//           { label: "Conducting Body", value: exam.conductingBody },
//           { label: "Level", value: exam.level },
//           { label: "Mode", value: exam.mode },
//           { label: "Frequency", value: exam.frequency },
//           { label: "Application Fee", value: formatFeeRange(exam.applicationFeeRange) },
//         ].map((item) => (
//           <div
//             key={item.label}
//             className="border border-gray-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 transition-colors"
//           >
//             <p className="text-gray-500 dark:text-gray-400">{item.label}</p>
//             <p className="font-medium text-gray-900 dark:text-white">
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Main Grid */}
//     <div className="grid lg:grid-cols-3 gap-8">

//       {/* Left Content */}
//       <div className="lg:col-span-2 space-y-8">

//         {/* Eligibility */}
//         <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 transition-colors">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
//             Eligibility
//           </h2>
//           <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
//             <li>
//               <span className="font-medium text-gray-900 dark:text-white">
//                 Education:
//               </span>{" "}
//               {exam.eligibility.education.join(", ")}
//             </li>
//             <li>
//               <span className="font-medium text-gray-900 dark:text-white">
//                 Age Limit:
//               </span>{" "}
//               {exam.eligibility.ageLimit}
//             </li>
//             <li>
//               <span className="font-medium text-gray-900 dark:text-white">
//                 Attempts:
//               </span>{" "}
//               {exam.eligibility.attempts}
//             </li>
//             <li>
//               <span className="font-medium text-gray-900 dark:text-white">
//                 Nationality:
//               </span>{" "}
//               {exam.eligibility.nationality}
//             </li>
//           </ul>
//         </div>

//         {/* Reusable Card Wrapper Style Below */}
//         {[
//           {
//             title: "Exam Pattern",
//             content: (
//               <div className="space-y-4">
//                 {exam.examPattern.map((pattern) => (
//                   <div
//                     key={pattern.stage}
//                     className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900"
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {pattern.stage}
//                       </h3>
//                       <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
//                         {pattern.mode}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Duration: {pattern.duration} • Marks: {pattern.totalMarks}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Subjects: {pattern.subjects.join(", ")}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ),
//           },
//           {
//             title: `Career Paths After ${exam.name}`,
//             content: (
//               <div className="grid md:grid-cols-2 gap-4">
//                 {exam.careerPaths.map((path) => (
//                   <div
//                     key={path.role}
//                     className="rounded-xl border border-gray-200 dark:border-slate-700 p-4"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       {path.role}
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                       Sector: {path.sector}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Starting Package: {path.avgStartingPackage}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ),
//           },
//         ].map((section) => (
//           <div
//             key={section.title}
//             className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 transition-colors"
//           >
//             <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
//               {section.title}
//             </h2>
//             {section.content}
//           </div>
//         ))}

//       </div>

//       {/* Sidebar */}
//       <aside className="space-y-6">

//         <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 transition-colors">
//           <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//             Important Dates
//           </h3>

//           <div className="space-y-3">
//             {exam.importantDates.map((item) => (
//               <div
//                 key={`${item.label}-${item.month}`}
//                 className="rounded-lg border border-gray-200 dark:border-slate-700 p-3"
//               >
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {item.label}
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   {item.month}
//                 </p>
//                 <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
//                   {item.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </aside>
//     </div>

//     {/* Related Colleges */}
//     {relatedColleges.length > 0 && (
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
//           Related <span className="text-primary">Colleges</span>
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {relatedColleges.map((college) => (
//             <CollegeCard key={college.id} college={college} />
//           ))}
//         </div>
//       </div>
//     )}

//   </div>
// </section>
//   );
// }



"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";

type Props = {
  exam: any;
  relatedColleges: any[];
};

export default function ExamDetailsView({ exam, relatedColleges }: Props) {
  return (
    <section className="py-14 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 text-gray-500 dark:text-gray-400">
          <Link href="/exam" className="hover:text-primary transition-colors">
            Exams
          </Link>

          <Icon icon="mdi:chevron-right" />

          <span className="text-gray-900 dark:text-white">
            {exam.name}
          </span>
        </div>

        {/* HERO CARD */}
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 mb-8">

          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            {exam.name}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-4xl">
            {exam.overview}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 text-sm">

            <Info label="Conducting Body" value={exam.conductingBody} />
            <Info label="Level" value={exam.level} />
            <Info label="Mode" value={exam.examMode} />
            <Info label="Frequency" value={exam.frequency} />
            <Info label="Duration" value={exam.duration} />
            <Info label="Application Fee" value={exam.applicationFee} />

          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            <Card title="Eligibility">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {exam.eligibility}
              </p>
            </Card>

            <Card title="Exam Pattern">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {exam.examPattern}
              </p>
            </Card>

            <Card title="Syllabus">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {exam.syllabus}
              </p>
            </Card>

            <Card title="Application Process">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {exam.applicationProcess}
              </p>
            </Card>

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">

            <Card title="Important Dates">

              <DateItem
                label="Application Start"
                value={exam.importantDates?.applicationStart}
              />

              <DateItem
                label="Application End"
                value={exam.importantDates?.applicationEnd}
              />

              <DateItem
                label="Exam Date"
                value={exam.importantDates?.examDate}
              />

              <DateItem
                label="Result Date"
                value={exam.importantDates?.resultDate}
              />

            </Card>

            <Card title="Official Website">
              <a
                href={exam.officialWebsite}
                target="_blank"
                className="text-primary underline text-sm"
              >
                Visit Official Website
              </a>
            </Card>

          </aside>

        </div>

        {/* RELATED COLLEGES (empty for now) */}
        {relatedColleges.length > 0 && (
          <div className="mt-12">

            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Related <span className="text-primary">Colleges</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

/* ----------------------------- COMPONENTS ----------------------------- */

function Card({ title, children }: any) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-xl p-3">
      <p className="text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="font-medium text-gray-900 dark:text-white">
        {value || "-"}
      </p>
    </div>
  );
}

function DateItem({ label, value }: any) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-slate-700 p-3 mb-2">

      <p className="font-medium text-gray-900 dark:text-white">
        {label}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {value || "TBA"}
      </p>

    </div>
  );
}