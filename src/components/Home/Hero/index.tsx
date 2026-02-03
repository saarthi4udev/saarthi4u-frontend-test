"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Hero = () => {
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1 },
  };

  const heroVisuals = [
    "/images/hero/guidence.svg",
    "/images/hero/ai_rec.svg",
    "/images/hero/decision.svg",
  ];

  return (
    <section className="relative pt-44 pb-24 bg-heroBg dark:bg-midnight_text overflow-hidden">
      
      {/* Background Shape – SAME AS ORIGINAL */}
      <div className="absolute w-full h-full bg-heroBg rounded-b-[120px] -left-1/4 top-0 dark:bg-darkHeroBg z-0" />

      {/* Container – MATCHES ORIGINAL HERO + NAVBAR */}
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 relative z-10">
        <div className="grid grid-cols-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            {...leftAnimation}
            className="lg:col-span-6 col-span-12"
          >
            <h1 className="md:text-50 sm:text-40 text-28 text-midnight_text dark:text-white mb-8 leading-tight lg:w-full w-3/4">
              AI-Powered Guidance Platform
              <br />
              <span className="inline-block mt-2 px-3 py-1 bg-border dark:bg-darkHeroBg rounded-lg text-primary">
                for Smart Decisions
              </span>
            </h1>

            <p className="sm:text-19 text-muted dark:text-white/70 max-w-xl">
              Saarthi4U helps students, professionals, and businesses find the
              right path using intelligent recommendations, expert insights,
              and AI-driven support — all in one platform.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex items-center mt-12 gap-8">
              <Link
                href="/get-started"
                className="text-17 flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition"
              >
                Get Started
                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
              </Link>

              <Link
                href="/about"
                className="text-17 flex gap-2 items-center text-muted dark:text-white/70 hover:text-primary transition"
              >
                Learn More
              </Link>
            </div>

            {/* TRUST SECTION */}
            <div className="mt-16">
              <p className="text-20 text-muted dark:text-white/70 mb-4">
                Trusted for guidance in
              </p>

              <div className="flex flex-wrap gap-4">
                {["Education", "Career", "Business", "Technology"].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-border dark:bg-darkHeroBg text-primary text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT VISUAL – BALANCED LIKE ORIGINAL */}
          <motion.div
            {...rightAnimation}
            className="lg:col-span-6 col-span-12 hidden lg:block pl-20"
          >
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
              loop
              className="max-w-md"
            >
              {heroVisuals.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={img}
                    alt="Saarthi4U feature"
                    width={500}
                    height={600}
                    priority={index === 0}
                    className="w-full h-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "motion/react";
// import { Icon } from "@iconify/react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// const Hero = () => {
//   const leftAnimation = {
//     initial: { x: "-100%", opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     transition: { duration: 1 },
//   };

//   const rightAnimation = {
//     initial: { x: "100%", opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     transition: { duration: 1 },
//   };

//   const heroVisuals = [
//     "/images/hero/guidence.svg",
//     "/images/hero/ai_rec.svg",
//     "/images/hero/decision.svg",
//   ];

//   return (
//     <section className="relative pt-44 pb-24 bg-heroBg dark:bg-midnight_text overflow-hidden">
      
//       {/* Background Shape */}
//       <div className="absolute w-full h-full bg-heroBg rounded-b-[120px] -left-1/4 top-0 dark:bg-darkHeroBg z-0"></div>

//       <div className="container mx-auto relative z-10 px-4">
//         <div className="grid grid-cols-12 items-center gap-8">

//           {/* LEFT CONTENT */}
//           <motion.div
//             {...leftAnimation}
//             className="lg:col-span-6 col-span-12"
//           >
//             <h1 className="md:text-50 sm:text-40 text-28 text-midnight_text dark:text-white mb-8 leading-tight">
//               AI-Powered Guidance Platform
//               <br />
//               <span className="inline-block mt-2 px-3 py-1 bg-border dark:bg-darkHeroBg rounded-lg text-primary">
//                 for Smart Decisions
//               </span>
//             </h1>

//             <p className="sm:text-19 text-muted dark:text-white/70 max-w-xl">
//               Saarthi4U helps students, professionals, and businesses find the
//               right path using intelligent recommendations, expert insights,
//               and AI-driven support — all in one platform.
//             </p>

//             {/* CTA BUTTONS */}
//             <div className="flex items-center mt-12 gap-8">
//               <Link
//                 href="/get-started"
//                 className="text-17 flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition"
//               >
//                 Get Started
//                 <Icon
//                   icon="solar:alt-arrow-right-linear"
//                   width="13"
//                   height="13"
//                 />
//               </Link>

//               <Link
//                 href="/about"
//                 className="text-17 flex gap-2 items-center text-muted dark:text-white/70 hover:text-primary transition"
//               >
//                 Learn More
//               </Link>
//             </div>

//             {/* TRUST SECTION */}
//             <div className="mt-16">
//               <p className="text-20 text-muted dark:text-white/70 mb-4">
//                 Trusted for guidance in
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 {["Education", "Career", "Business", "Technology"].map(
//                   (item) => (
//                     <span
//                       key={item}
//                       className="px-4 py-2 rounded-full bg-border dark:bg-darkHeroBg text-primary text-sm"
//                     >
//                       {item}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* RIGHT VISUAL SLIDER */}
//           <motion.div
//             {...rightAnimation}
//             className="lg:col-span-6 col-span-12 hidden lg:block"
//           >
//             <Swiper
//               modules={[Autoplay]}
//               autoplay={{ delay: 3000 }}
//               loop
//               className="max-w-md mx-auto"
//             >
//               {heroVisuals.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <Image
//                     src={img}
//                     alt="Saarthi4U feature"
//                     width={500}
//                     height={600}
//                     priority={index === 0}
//                     className="w-full h-auto"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;










// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "motion/react";
// import { Icon } from "@iconify/react";
// import { Heroimage } from "@/app/api/data";

// const Hero = () => {
//   const leftAnimation = {
//     initial: { x: "-100%", opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     exit: { x: "-100%", opacity: 0 },
//     transition: { duration: 1 },
//   };

//   const rightAnimation = {
//     initial: { x: "100%", opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     exit: { x: "100%", opacity: 0 },
//     transition: { duration: 1 },
//   };
//   return (
//     <section className="relative pt-44 mb-14 bg-cover bg-center dark:bg-darkmode">
//       <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-midnight_text"></div>
//       <div className="container mx-auto lg:max-w-(--breakpoint-xl) relative z-1 md:max-w-(--breakpoint-md) px-4">
//         <div className="grid grid-cols-12 items-center">
//           <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
//             <h1 className="md:text-50 sm:text-40 text-28 text-midnight_text lg:text-start mb-9 lg:w-full w-3/4">
//               Quickest and easiest
//               <br />
//               <span className="bg-border dark:bg-darkHeroBg  md:text-50 text-36 rounded-lg lg:text-start text-primary max-w-max">
//                 online payment
//               </span>
//               <br />
//               platform for your product.
//             </h1>
//             <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75%">
//               Embed powerful financial features into your product, Build in
//               minutes, launch in weeks.
//             </p>
//             <div className="flex items-center mt-12 gap-11">
//               <div>
//                 <Link
//                   href="#"
//                   className="text-17 flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent"
//                 >
//                   Get Started
//                   <Icon
//                     icon="solar:alt-arrow-right-linear"
//                     width="13"
//                     height="13"
//                   />
//                 </Link>
//               </div>
//               <div>
//                 <Link
//                   href="#"
//                   className="text-17 flex gap-2 items-center text-muted dark:text-white dark:text-opacity-70 hover:text-primary"
//                 >
//                   See Features
//                   <Icon
//                     icon="solar:alt-arrow-right-linear"
//                     width="13"
//                     height="13"
//                   />
//                 </Link>
//               </div>
//             </div>

//             <div className="lg:my-28 my-12">
//               <p className="text-20 text-muted dark:text-white dark:text-opacity-70 text-start mb-7">
//                 Trusted by
//               </p>
//               <div className="flex space-x-6 justify-start w-full">
//                 {Heroimage.map((item, index) => (
//                   <Link key={index} href="/">
//                     <Image
//                       src={item.lightimage}
//                       alt="image"
//                       width={115}
//                       height={30}
//                       className="block dark:hidden"
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                     <Image
//                       src={item.darkimage}
//                       alt="image"
//                       width={115}
//                       height={30}
//                       className="hidden dark:block"
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//           <motion.div
//             {...rightAnimation}
//             className="lg:col-span-6 col-span-12 pl-20 lg:block hidden"
//           >
//             <Image
//               src="/images/hero/hero-image.png"
//               alt="image"
//               width={498}
//               height={651}
//               style={{ width: "100%", height: "100%" }}
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
