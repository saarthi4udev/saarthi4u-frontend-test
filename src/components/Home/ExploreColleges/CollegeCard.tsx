// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { motion } from "motion/react";

// interface College {
//   id: any;
//   name: string;
//   slug: string;
//   logo?: string | null;
//   type?: string | null;
//   establishedYear?: number | null;
//   affiliation?: string | null;
//   city?: string | null;
//   state?: string | null;
//   overview?: string | null;
//   Category?: {
//     name?: string;
//   };
// }

// interface CollegeCardProps {
//   college: College;
// }

// const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {

//   const location =
//     [college.city, college.state].filter(Boolean).join(", ") ||
//     "Location not available";

//   /**
//    * Remove HTML tags from overview
//    */
//   const cleanOverview = college.overview
//     ? college.overview.replace(/<[^>]*>?/gm, "")
//     : "No description available.";

//   const quickMeta = [
//     college.type ? { icon: "mdi:domain", label: college.type } : null,
//     college.establishedYear
//       ? { icon: "mdi:calendar", label: `Est. ${college.establishedYear}` }
//       : null,
//     college.affiliation
//       ? { icon: "mdi:school-outline", label: college.affiliation }
//       : null,
//   ].filter(Boolean) as Array<{ icon: string; label: string }>;

//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.25 }}
//       className="
//         group relative overflow-hidden
//         rounded-[1.5rem]
//         border border-primary/10 dark:border-white/10
//         bg-white/95 dark:bg-slate-900/85
//         p-5 sm:p-6
//         flex flex-col
//         shadow-[0_20px_44px_rgba(10,24,58,0.08)]
//         transition-all duration-300
//         hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_26px_60px_rgba(10,24,58,0.14)]
//         h-full min-h-[23rem]
//       "
//     >
//       <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

//       {/* Logo + Category */}
//       <div className="mb-4 flex items-start justify-between gap-3">

//         <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:border-white/10 dark:bg-slate-800">

//           {college.logo ? (
//             <Image
//               src={college.logo}
//               alt={college.name}
//               width={60}
//               height={60}
//               className="object-contain"
//             />
//           ) : (
//             <Icon
//               icon="mdi:school"
//               className="w-8 h-8 text-primary"
//             />
//           )}

//         </div>

//         {college.Category?.name && (
//           <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary dark:text-secondary">
//             {college.Category.name}
//           </span>
//         )}

//       </div>

//       {/* Name */}
//       <h3 className="mb-2 line-clamp-2 text-[1.02rem] font-bold leading-6 text-primary dark:text-white">
//         {college.name}
//       </h3>

//       {/* Location */}
//       <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
//         <Icon icon="mdi:map-marker-outline" width="16" height="16" />
//         <span className="line-clamp-1">{location}</span>
//       </div>

//       {quickMeta.length > 0 && (
//         <div className="mb-3 flex flex-wrap gap-1.5">
//           {quickMeta.map((item) => (
//             <span
//               key={item.label}
//               className="inline-flex items-center gap-1 rounded-md border border-primary/10 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary/90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
//             >
//               <Icon icon={item.icon} width="13" height="13" className="text-secondary" />
//               <span className="line-clamp-1">{item.label}</span>
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Description */}
//       <p className="flex-grow border-t border-primary/10 pt-3 text-sm leading-6 text-slate-500 dark:border-white/10 dark:text-slate-300 line-clamp-3">
//         {cleanOverview}
//       </p>

//       {/* Explore Button */}
//       <div className="mt-5">
//         <Link
//           href={`/college/${college.slug}`}
//           className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3.5 py-2 text-sm font-semibold text-primary transition-all hover:border-secondary/35 hover:bg-secondary/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
//         >
//           <Icon icon="mdi:eye-outline" width="18" height="18" />
//           View College
//           <Icon icon="solar:alt-arrow-right-linear" width="14" height="14" />
//         </Link>
//       </div>

//     </motion.div>
//   );
// };

// export default CollegeCard;


"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface College {
  id: any;
  name: string;
  slug: string;
  logo?: string | null;
  type?: string | null;
  establishedYear?: number | null;
  affiliation?: string | null;
  city?: string | null;
  state?: string | null;
  overview?: string | null;
  Category?: {
    name?: string;
  };
}

interface CollegeCardProps {
  college: College;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleNavigation = () => {
    setLoading(true);
    router.push(`/college/${college.slug}`);
  };

  const location =
    [college.city, college.state].filter(Boolean).join(", ") ||
    "Location not available";

  /**
   * Remove HTML tags from overview
   */
  const cleanOverview = college.overview
    ? college.overview.replace(/<[^>]*>?/gm, "")
    : "No description available.";

  const quickMeta = [
    college.type ? { icon: "mdi:domain", label: college.type } : null,
    college.establishedYear
      ? { icon: "mdi:calendar", label: `Est. ${college.establishedYear}` }
      : null,
    college.affiliation
      ? { icon: "mdi:school-outline", label: college.affiliation }
      : null,
  ].filter(Boolean) as Array<{ icon: string; label: string }>;

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="
          group relative overflow-hidden
          rounded-[1.5rem]
          border border-primary/10 dark:border-white/10
          bg-white/95 dark:bg-slate-900/85
          p-5 sm:p-6
          flex flex-col
          shadow-[0_20px_44px_rgba(10,24,58,0.08)]
          transition-all duration-300
          hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_26px_60px_rgba(10,24,58,0.14)]
          h-full min-h-[23rem]
        "
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#171e4c_0%,#30d8c9_100%)]" />

        {/* Logo + Category */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:border-white/10 dark:bg-slate-800">
            {college.logo ? (
              <Image
                src={college.logo}
                alt={college.name}
                width={60}
                height={60}
                className="object-contain"
              />
            ) : (
              <Icon icon="mdi:school" className="w-8 h-8 text-primary" />
            )}
          </div>

          {college.Category?.name && (
            <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary dark:text-secondary">
              {college.Category.name}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="mb-2 line-clamp-2 text-[1.02rem] font-bold leading-6 text-primary dark:text-white">
          {college.name}
        </h3>

        {/* Location */}
        <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
          <Icon icon="mdi:map-marker-outline" width="16" height="16" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {quickMeta.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {quickMeta.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1 rounded-md border border-primary/10 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary/90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <Icon
                  icon={item.icon}
                  width="13"
                  height="13"
                  className="text-secondary"
                />
                <span className="line-clamp-1">{item.label}</span>
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="flex-grow border-t border-primary/10 pt-3 text-sm leading-6 text-slate-500 dark:border-white/10 dark:text-slate-300 line-clamp-3">
          {cleanOverview}
        </p>

        {/* Explore Button */}
        <div className="mt-5">
          <button
            onClick={handleNavigation}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3.5 py-2 text-sm font-semibold text-primary transition-all hover:border-secondary/35 hover:bg-secondary/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <Icon icon="mdi:eye-outline" width="18" height="18" />
            View College
            <Icon
              icon="solar:alt-arrow-right-linear"
              width="14"
              height="14"
            />
          </button>
        </div>
      </motion.div>

      {/* Overlay Loader */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="text-white text-sm font-medium">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CollegeCard;