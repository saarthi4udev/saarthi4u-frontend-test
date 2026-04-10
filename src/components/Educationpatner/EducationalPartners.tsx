// "use client";

// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import { motion, useInView } from "motion/react";
// import { useRef, useState, useEffect } from "react";
// import { getAllPartners, Partner } from "@/app/api/partner";


// const EducationalPartners = () => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.2 });
//   const [partners, setPartners] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const badgeAnimation = {
//     initial: { opacity: 0, y: -20 },
//     animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 },
//     transition: { duration: 0.6 },
//   };

//   const titleAnimation = {
//     initial: { opacity: 0, y: 20 },
//     animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
//     transition: { duration: 0.8, delay: 0.1 },
//   };

//   const descriptionAnimation = {
//     initial: { opacity: 0, y: 20 },
//     animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
//     transition: { duration: 0.8, delay: 0.2 },
//   };

//   const itemAnimation = (index: number) => ({
//     initial: { opacity: 0, y: 30 },
//     animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
//     transition: { duration: 0.6, delay: 0.3 + index * 0.1 },
//   });



//   useEffect(() => {
//     const loadPartners = async () => {
//       const data = await getAllPartners();

//       console.log("THIS IS MY DATA", data)
//       setPartners(data);
//       setLoading(false);
//     };

//     loadPartners();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-10">Loading partners...</div>;
//   }

//   return (
//     <section ref={ref} className="relative overflow-hidden py-14 bg-hero-bg dark:bg-dark_b">
//       <motion.div
//         className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
//         animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl"
//         animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.55, 0.35] }}
//         transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
//         <motion.div {...badgeAnimation} className="flex justify-center mb-5">
//           <span className="inline-flex h-9 items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 text-13 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/15">
//             TRUSTED PARTNERS
//           </span>
//         </motion.div>

//         <motion.h2
//           {...titleAnimation}
//           className="text-center text-24 font-bold text-midnight_text dark:text-white sm:text-28 md:text-35 lg:text-50"
//         >
//           Our Educational <span className="text-secondary">Partners</span>
//         </motion.h2>

//         <motion.p
//           {...descriptionAnimation}
//           className="mx-auto mt-3 max-w-3xl text-center text-16 leading-relaxed text-muted dark:text-white/70"
//         >
//           We collaborate with trusted institutions to provide clear guidance,
//           quality programs, and better career outcomes.
//         </motion.p>

//         <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
//           {partners.map((partner, index) => (
//             <motion.div key={partner.id} {...itemAnimation(index)} className="h-full">
//               <motion.div
//                 whileHover={{ y: -8, scale: 1.01 }}
//                 transition={{ duration: 0.35, type: "spring", stiffness: 230, damping: 16 }}
//                 className="relative h-full overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-secondary/35 hover:shadow-xl dark:border-dark_border dark:bg-midnight_text md:p-7"
//               >
//                 <motion.div
//                   className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent dark:via-white/10"
//                   initial={{ x: "-140%", opacity: 0 }}
//                   whileHover={{ x: "350%", opacity: [0, 1, 0] }}
//                   transition={{ duration: 0.85, ease: "easeOut" }}
//                 />
//                 <motion.div
//                   className="flex min-h-[170px] items-center justify-center rounded-2xl border border-border bg-hero-bg/80 p-6 dark:border-dark_border dark:bg-dark_b"
//                   whileHover={{ scale: 1.03 }}
//                   transition={{ duration: 0.35 }}
//                 >
//                   <motion.div
//                     animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
//                     transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
//                   >
//                     {/* {partner.image ? (
//                       <img
//                         src={partner.image}
//                         alt={partner.name}
//                         onError={(e) => {
//                           e.currentTarget.style.display = "none"; // ✅ hide broken image
//                         }}
//                         className="h-auto max-h-[120px] w-auto max-w-[190px] object-contain"
//                       />
//                     ) : (
//                       <div className="flex h-[92px] w-[150px] items-center justify-center rounded-2xl border border-primary/20 bg-white text-35 font-extrabold tracking-widest text-primary dark:border-white/20 dark:bg-white/10 dark:text-white">
//                         LIT
//                       </div>
//                     )} */}
//                   </motion.div>
//                 </motion.div>

//                 <motion.div
//                   className="mt-6 flex min-h-[108px] flex-col items-center text-center"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <motion.h3 className="text-22 font-semibold text-midnight_text dark:text-white">
//                     {partner.name}
//                   </motion.h3>
//                   <motion.p
//                     className="mt-2 text-16 text-muted dark:text-white/75"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.15 }}
//                   >
//                     {partner.description}
//                   </motion.p>

//                   <motion.p
//                     className="mt-3 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-13 font-medium text-primary dark:border-white/15 dark:bg-white/10 dark:text-white/85"
//                     initial={{ opacity: 0, y: 6 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     {partner.services}
//                   </motion.p>
//                 </motion.div>

//                 <motion.div
//                   className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-secondary/20 bg-secondary/8 px-4 py-2 text-14 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/12"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.2 }}
//                   whileHover={{ scale: 1.03 }}
//                 >
//                   <motion.div
//                     animate={{ scale: [1, 1.12, 1] }}
//                     transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//                   >
//                     <Icon icon="solar:check-circle-bold" className="text-18" />
//                   </motion.div>
//                   Verified Partner
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EducationalPartners;


"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { getAllPartners } from "@/app/api/partner";

const EducationalPartners = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const badgeAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 },
    transition: { duration: 0.6 },
  };

  const titleAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay: 0.1 },
  };

  const descriptionAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const itemAnimation = (index: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.6, delay: 0.3 + index * 0.1 },
  });

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const data = await getAllPartners();
        console.log("THIS IS MY DATA", data);

        setPartners(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading partners...</div>;
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-14 bg-hero-bg dark:bg-dark_b">
      <motion.div
        className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <motion.div {...badgeAnimation} className="flex justify-center mb-5">
          <span className="inline-flex h-9 items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 text-13 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/15">
            TRUSTED PARTNERS
          </span>
        </motion.div>

        <motion.h2 {...titleAnimation} className="text-center text-24 font-bold text-midnight_text dark:text-white sm:text-28 md:text-35 lg:text-50">
          Our Educational <span className="text-secondary">Partners</span>
        </motion.h2>

        <motion.p {...descriptionAnimation} className="mx-auto mt-3 max-w-3xl text-center text-16 leading-relaxed text-muted dark:text-white/70">
          We collaborate with trusted institutions to provide clear guidance,
          quality programs, and better career outcomes.
        </motion.p>

        <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.isArray(partners) &&
            partners.map((partner, index) => (
              <motion.div key={partner.id || index} {...itemAnimation(index)} className="h-full">
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.35, type: "spring", stiffness: 230, damping: 16 }}
                  className="relative h-full overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-secondary/35 hover:shadow-xl dark:border-dark_border dark:bg-midnight_text md:p-7"
                >
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent dark:via-white/10"
                    initial={{ x: "-140%", opacity: 0 }}
                    whileHover={{ x: "350%", opacity: [0, 1, 0] }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                  />

                  {/* 👇 kept your layout intact, just safe fallback */}
                  <motion.div className="flex min-h-[170px] items-center justify-center rounded-2xl border border-border bg-hero-bg/80 p-6 dark:border-dark_border dark:bg-dark_b">
                    <span className="text-sm text-muted">Image not available</span>
                  </motion.div>

                  <motion.div className="mt-6 flex min-h-[108px] flex-col items-center text-center">
                    <motion.h3 className="text-22 font-semibold text-midnight_text dark:text-white">
                      {partner.name || "No Name"}
                    </motion.h3>

                    <motion.p className="mt-2 text-16 text-muted dark:text-white/75">
                      {partner.description || "No Description"}
                    </motion.p>

                    <motion.p className="mt-3 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-13 font-medium text-primary dark:border-white/15 dark:bg-white/10 dark:text-white/85">
                      {partner.services || "No Services"}
                    </motion.p>
                  </motion.div>

                  <motion.div className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-secondary/20 bg-secondary/8 px-4 py-2 text-14 font-semibold text-secondary dark:border-secondary/35 dark:bg-secondary/12">
                    <Icon icon="solar:check-circle-bold" className="text-18" />
                    Verified Partner
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalPartners;