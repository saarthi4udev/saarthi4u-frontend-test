// "use client";

// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { ScholarshipItem } from "@/types/scholarshipDiscovery";
// import { College } from "@/types/college";
// import { formatScholarshipAmount } from "@/app/api/scholarshipDiscovery";
// import CollegeCard from "@/components/Home/ExploreColleges/CollegeCard";

// type Props = {
//   scholarship: ScholarshipItem;
//   relatedColleges: College[];
// };

// export default function ScholarshipDetailsView({ scholarship, relatedColleges }: Readonly<Props>) {
//   return (
//   <section className="py-14 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
//   <div className="container mx-auto px-4 sm:px-6">

//     {/* BREADCRUMB */}
//     <div className="flex flex-wrap items-center gap-2 text-sm mb-8 text-gray-500 dark:text-gray-400">
//       <Link href="/scholarships" className="hover:text-primary transition-colors">
//         Scholarships
//       </Link>
//       <Icon icon="mdi:chevron-right" />
//       <span className="text-gray-900 dark:text-white font-medium">
//         {scholarship.name}
//       </span>
//     </div>

//     {/* HERO CARD */}
//     <div className="
//       rounded-2xl border
//       bg-white dark:bg-slate-900
//       border-gray-200 dark:border-slate-800
//       p-6 md:p-8 mb-8
//       shadow-sm transition-colors
//     ">
//       <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
//         <h1 className="text-4xl font-semibold max-w-4xl text-gray-900 dark:text-white">
//           {scholarship.name}
//         </h1>

//         {scholarship.popular && (
//           <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 h-fit mt-1">
//             Popular
//           </span>
//         )}
//       </div>

//       <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-4xl">
//         {scholarship.shortDescription}
//       </p>

//       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 text-sm">
//         {[
//           { label: "Type", value: scholarship.scholarshipType },
//           { label: "Provider", value: scholarship.provider },
//           { label: "Level", value: scholarship.level },
//           { label: "Funding", value: scholarship.amountType },
//           { label: "Amount", value: formatScholarshipAmount(scholarship.amountRange) },
//           { label: "Deadline", value: scholarship.deadlineMonth },
//         ].map((item) => (
//           <div
//             key={item.label}
//             className="rounded-xl border border-gray-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-800 transition-colors"
//           >
//             <p className="text-gray-500 dark:text-gray-400 text-xs">
//               {item.label}
//             </p>
//             <p className="font-medium text-gray-900 dark:text-white mt-1">
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* MAIN GRID */}
//     <div className="grid lg:grid-cols-3 gap-8">

//       {/* LEFT CONTENT */}
//       <div className="lg:col-span-2 space-y-8">

//         {[
//           {
//             title: "Eligibility",
//             content: (
//               <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
//                 <li><span className="font-medium text-gray-900 dark:text-white">Education:</span> {scholarship.eligibility.education.join(", ")}</li>
//                 <li><span className="font-medium text-gray-900 dark:text-white">Minimum Marks:</span> {scholarship.eligibility.minPercentage}</li>
//                 <li><span className="font-medium text-gray-900 dark:text-white">Family Income:</span> {scholarship.eligibility.familyIncome}</li>
//                 <li><span className="font-medium text-gray-900 dark:text-white">State Quota:</span> {scholarship.eligibility.stateQuota}</li>
//                 <li><span className="font-medium text-gray-900 dark:text-white">Additional:</span> {scholarship.eligibility.additional.join(", ")}</li>
//               </ul>
//             ),
//           },
//           {
//             title: "Required Documents",
//             content: (
//               <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
//                 {scholarship.requiredDocuments.map((doc) => (
//                   <li key={doc} className="flex items-start gap-2">
//                     <Icon icon="mdi:file-document-outline" className="w-4 h-4 text-primary mt-0.5" />
//                     <span>{doc}</span>
//                   </li>
//                 ))}
//               </ul>
//             ),
//           },
//         ].map((section) => (
//           <div
//             key={section.title}
//             className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 transition-colors"
//           >
//             <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//               {section.title}
//             </h2>
//             {section.content}
//           </div>
//         ))}

//       </div>

//       {/* RIGHT SIDEBAR */}
//       <aside className="space-y-6">
//         <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 transition-colors">
//           <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//             Quick Facts
//           </h3>

//           <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
//             <li><span className="font-medium text-gray-900 dark:text-white">Provider Type:</span> {scholarship.providerType}</li>
//             <li><span className="font-medium text-gray-900 dark:text-white">Application Fee:</span> ₹{scholarship.applicationFee}</li>
//             <li><span className="font-medium text-gray-900 dark:text-white">Mode:</span> {scholarship.mode}</li>
//             <li><span className="font-medium text-gray-900 dark:text-white">Renewable:</span> {scholarship.renewable ? "Yes" : "No"}</li>
//             <li><span className="font-medium text-gray-900 dark:text-white">Applicable States:</span> {scholarship.applicableStates.join(", ")}</li>
//           </ul>
//         </div>
//       </aside>

//     </div>

//     {/* RELATED COLLEGES */}
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
  scholarship: any;
  relatedColleges: any[];
};

export default function ScholarshipDetailsView({
  scholarship,
  relatedColleges,
}: Props) {
  return (
    <section className="py-14 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">

        {/* BREADCRUMB */}
        <div className="flex flex-wrap items-center gap-2 text-sm mb-8 text-gray-500 dark:text-gray-400">
          <Link href="/scholarships" className="hover:text-primary transition-colors">
            Scholarships
          </Link>

          <Icon icon="mdi:chevron-right" />

          <span className="text-gray-900 dark:text-white font-medium">
            {scholarship.name}
          </span>
        </div>

        {/* HERO CARD */}
        <div className="rounded-2xl border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-6 md:p-8 mb-8 shadow-sm">

          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            {scholarship.name}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-4xl">
            {scholarship.overview}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 text-sm">

            <Info label="Type" value={scholarship.scholarshipType} />
            <Info label="Provider" value={scholarship.provider} />
            <Info label="Level" value={scholarship.level} />
            <Info label="Amount" value={scholarship.amount} />
            <Info label="Application Mode" value={scholarship.applicationMode} />
            <Info label="Website" value={scholarship.officialWebsite} />

          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* Eligibility */}
            <Card title="Eligibility">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {scholarship.eligibility}
              </p>
            </Card>

            {/* Benefits */}
            <Card title="Benefits">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {scholarship.benefits}
              </p>
            </Card>

            {/* Application Process */}
            <Card title="Application Process">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {scholarship.applicationProcess}
              </p>
            </Card>

            {/* Documents Required */}
            <Card title="Documents Required">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {scholarship.documentsRequired}
              </p>
            </Card>

            {/* Selection Process */}
            <Card title="Selection Process">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {scholarship.selectionProcess}
              </p>
            </Card>

            {/* Renewal Process */}
            <Card title="Renewal Process">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {scholarship.renewalProcess}
              </p>
            </Card>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">

            {/* Important Dates */}
            <Card title="Important Dates">

              <DateItem
                label="Application Start"
                value={scholarship.importantDates?.applicationStart}
              />

              <DateItem
                label="Application End"
                value={scholarship.importantDates?.applicationEnd}
              />

              <DateItem
                label="Result Date"
                value={scholarship.importantDates?.resultDate}
              />

            </Card>

            {/* Official Website */}
            <Card title="Official Website">
              <a
                href={scholarship.officialWebsite}
                target="_blank"
                className="text-primary underline text-sm"
              >
                Visit Official Website
              </a>
            </Card>

          </aside>

        </div>

        {/* RELATED COLLEGES */}
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

/* ---------------- COMPONENTS ---------------- */

function Card({ title, children }: any) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-800">
      <p className="text-gray-500 dark:text-gray-400 text-xs">
        {label}
      </p>

      <p className="font-medium text-gray-900 dark:text-white mt-1">
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