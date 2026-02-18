// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About Us | Saarthi4u",
//   description: "Learn about Saarthi4u - Your trusted education partner for academic and career success.",
// };

// const AboutUsPage = () => {
//   const stats = [
//     { number: "10,000+", label: "Students Guided" },
//     { number: "500+", label: "Partner Institutes" },
//     { number: "98%", label: "Success Rate" },
//     { number: "15+", label: "Years Experience" },
//   ];

//   const values = [
//     {
//       title: "Student-Centric Approach",
//       description: "We put students at the center of everything we do, tailoring our services to meet their unique needs and goals.",
//       icon: "👨‍🎓",
//     },
//     {
//       title: "Innovation & Excellence",
//       description: "We strive for innovation and excellence in all aspects of our platform, ensuring students have access to the best resources.",
//       icon: "⚡",
//     },
//     {
//       title: "Integrity & Transparency",
//       description: "We operate with integrity and transparency, building trust with our students and partners through our actions.",
//       icon: "🤝",
//     },
//     {
//       title: "Trust & Integrity",
//       description: "Building lasting relationships through transparency and ethical practices in every interaction.",
//       icon: "✨",
//     },
//   ];

//   const services = [
//     {
//       title: "College & School Discovery",
//       description: "Find the right colleges and schools that align with your interests, skills, and career goals.",
//       icon: "🎓",
//     },
//     {
//       title: "Skill Development",
//       description: "Enhance your inner skills like critical thinking, problem-solving, and communication.",
//       icon: "💡",
//     },
//     {
//       title: "Current Affairs & Industry Insights",
//       description: "Stay updated on the latest trends, news, and developments in your chosen field.",
//       icon: "📰",
//     },
//     {
//       title: "Personalized Guidance",
//       description: "Get expert counseling and mentorship to help you make informed decisions about your future.",
//       icon: "🧭",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Prashant Kumar",
//       role: "School of Health Sciences (SOH) Student",
//       quote: "I'm really grateful to Saarthi4u for recommending me this excellent course. Yasmeen Ma'am showed me a great career option in the Healthcare sector.",
//       image: "/images/testimonial-1.jpg",
//       rating: 5,
//     },
//     {
//       name: "Akash Vishwakarma",
//       role: "Engineering Student",
//       quote: "Deepshikha Madam helped me secure admission despite the deadline having passed. She went above and beyond, guiding me through the entire process.",
//       image: "/images/testimonial-2.jpg",
//       rating: 5,
//     },
//     {
//       name: "Rohan Verma",
//       role: "Engineering Student",
//       quote: "Saarthi4u made choosing my engineering branch and college simple. Their detailed guidance helped me make an informed decision.",
//       image: "/images/testimonial-3.jpg",
//       rating: 5,
//     },
//     {
//       name: "Ananya Gupta",
//       role: "Business Management Student",
//       quote: "Thanks to Saarthi4u, I found a business management course that perfectly fits my interests. Their advice was practical and tailored to my goals.",
//       image: "/images/testimonial-4.jpg",
//       rating: 5,
//     },
//   ];

//   return (
//     <main className="bg-white dark:bg-dark">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary/60 py-20 text-white dark:from-slate-900 dark:to-slate-800">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/20 blur-3xl"></div>
//           <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/20 blur-3xl"></div>
//         </div>

//         <div className="relative mx-auto max-w-6xl px-4 text-center">
//           <h1 className="mb-4 text-5xl font-bold md:text-6xl">Welcome to Saarthi4u</h1>
//           <p className="mb-8 text-xl text-white/90">
//             Empowering Dreams, Transforming Futures
//           </p>
//           <p className="mx-auto max-w-2xl text-lg text-white/80">
//             We're not just an education platform - we're your lifelong partner in achieving academic and career success
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="transform rounded-lg bg-white/10 p-6 text-center backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white/20"
//             >
//               <div className="mb-2 text-3xl font-bold md:text-4xl">{stat.number}</div>
//               <div className="text-sm text-white/80 md:text-base">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Mission & Vision Section */}
//       <section className="py-20">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="grid gap-12 md:grid-cols-2">
//             {/* Mission */}
//             <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-8 dark:from-slate-800 dark:to-slate-700">
//               <h2 className="mb-4 text-3xl font-bold text-primary">Our Mission</h2>
//               <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
//                 "Right college, Right career at Right time."
//               </p>
//               <p className="text-gray-700 dark:text-gray-300">
//                 Helping students and parents to find the perfect match — enabling a brighter future through personalized guidance, quality education, and career opportunities that transform dreams into reality.
//               </p>
//             </div>

//             {/* Vision */}
//             <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-8 dark:from-slate-800 dark:to-slate-700">
//               <h2 className="mb-4 text-3xl font-bold text-primary">Our Vision</h2>
//               <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
//                 Your Journey, Our Passion
//               </p>
//               <p className="text-gray-700 dark:text-gray-300">
//                 A world where every student finds their spark through the right education and the right path, accelerating pathways for an extraordinary future globally.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Offer Section */}
//       <section className="bg-gray-50 py-20 dark:bg-slate-900">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="mb-16 text-center">
//             <h2 className="mb-4 text-4xl font-bold">What We Offer</h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               Comprehensive services designed to support your academic and professional journey
//             </p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="transform rounded-lg border border-gray-200 bg-white p-6 transition duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
//               >
//                 <div className="mb-4 text-5xl">{service.icon}</div>
//                 <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Core Values Section */}
//       <section className="py-20">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="mb-16 text-center">
//             <h2 className="mb-4 text-4xl font-bold">Our Core Values</h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               At Saarthi4u, we are committed to these fundamental principles
//             </p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className="flex gap-6 rounded-lg border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent p-6 dark:from-primary/10"
//               >
//                 <div className="text-4xl">{value.icon}</div>
//                 <div>
//                   <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
//                     {value.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Success Stories Section */}
//       <section className="bg-gray-50 py-20 dark:bg-slate-900">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="mb-16 text-center">
//             <h2 className="mb-4 text-4xl font-bold">Success Stories</h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               Voices of Success - Hear from our students who transformed their dreams into reality
//             </p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="transform rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-xl dark:bg-slate-800"
//               >
//                 <div className="mb-4 flex gap-1">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <span key={i} className="text-yellow-400">
//                       ⭐
//                     </span>
//                   ))}
//                 </div>
//                 <p className="mb-6 text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
//                 <div className="border-t border-gray-200 pt-4 dark:border-slate-700">
//                   <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="py-20">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="rounded-lg bg-gradient-to-r from-primary/10 to-purple-100 p-12 dark:from-slate-800 dark:to-slate-700">
//             <h2 className="mb-8 text-4xl font-bold">Why Choose Saarthi4u?</h2>
//             <div className="grid gap-8 md:grid-cols-2">
//               <div>
//                 <h3 className="mb-4 text-xl font-semibold text-primary">
//                   15+ Years of Excellence
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   Dedicated to transforming education and career pathways for students worldwide with proven expertise and track record.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="mb-4 text-xl font-semibold text-primary">
//                   Empowering Your Future
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   We're not just an edutech company - we're your partners in education. Our team of experts is passionate about helping you discover your passions and stay ahead of the curve.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-primary to-primary/80 py-20 text-white dark:from-slate-900 dark:to-slate-800">
//         <div className="mx-auto max-w-4xl px-4 text-center">
//           <h2 className="mb-6 text-4xl font-bold">Ready to Start Your Journey?</h2>
//           <p className="mb-8 text-lg text-white/90">
//             Join thousands of successful students who transformed their careers with Saarthi4u guidance
//           </p>
//           <div className="flex flex-col justify-center gap-4 sm:flex-row">
//             <button className="transform rounded-lg bg-white px-8 py-3 font-semibold text-primary transition duration-300 hover:scale-105 hover:shadow-lg">
//               Get Free Consultation
//             </button>
//             <button className="transform rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition duration-300 hover:bg-white/10">
//               Explore Courses
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="bg-gray-50 py-20 dark:bg-slate-900">
//         <div className="mx-auto max-w-6xl px-4">
//           <h2 className="mb-12 text-center text-4xl font-bold">Get In Touch</h2>
//           <div className="grid gap-8 md:grid-cols-3">
//             <div className="rounded-lg bg-white p-8 text-center dark:bg-slate-800">
//               <div className="mb-4 text-4xl">📞</div>
//               <h3 className="mb-2 text-xl font-semibold">Phone</h3>
//               <a href="tel:+919930718925" className="text-primary hover:underline">
//                 +91 9930718925
//               </a>
//             </div>
//             <div className="rounded-lg bg-white p-8 text-center dark:bg-slate-800">
//               <div className="mb-4 text-4xl">📧</div>
//               <h3 className="mb-2 text-xl font-semibold">Email</h3>
//               <a href="mailto:info@saarthi4u.com" className="text-primary hover:underline">
//                 info@saarthi4u.com
//               </a>
//             </div>
//             <div className="rounded-lg bg-white p-8 text-center dark:bg-slate-800">
//               <div className="mb-4 text-4xl">📍</div>
//               <h3 className="mb-2 text-xl font-semibold">Address</h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 1st Floor G-69, Sector-63<br />
//                 Noida – 201301
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default AboutUsPage;



import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Saarthi4u",
  description:
    "Learn about Saarthi4u – your trusted education partner for academic and career success.",
};

const AboutUsPage = () => {
  const stats = [
    { number: "10,000+", label: "Students Guided" },
    { number: "500+", label: "Partner Institutes" },
    { number: "98%", label: "Success Rate" },
    { number: "15+", label: "Years Experience" },
  ];

  const values = [
    {
      title: "Student-Centric Approach",
      description:
        "We put students at the center of everything we do, tailoring guidance to their goals.",
      icon: "👨‍🎓",
    },
    {
      title: "Innovation & Excellence",
      description:
        "We continuously innovate to deliver high-quality guidance and resources.",
      icon: "⚡",
    },
    {
      title: "Integrity & Transparency",
      description:
        "Honest guidance, ethical practices, and clear communication.",
      icon: "🤝",
    },
    {
      title: "Trust & Commitment",
      description:
        "Building long-term relationships through reliability and care.",
      icon: "✨",
    },
  ];

  return (
    <main className="bg-white dark:bg-slate-900 w-full">

      {/* HERO WITH IMAGE */}
      <section className="pt-28 pb-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-6xl px-6 grid items-center gap-12 md:grid-cols-2">

          {/* TEXT */}
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              About Saarthi4u
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Empowering students with the right guidance, at the right time,
              to build meaningful academic and career journeys.
            </p>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white p-5
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {stat.number}
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center animate-fadeInUp">
            <Image
              src="/images/about-hero.svg"
              alt="About Saarthi4u"
              width={520}
              height={420}
              priority
              className="w-full max-w-md"
            />
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-2">
          {[
            {
              title: "Our Mission",
              text:
                "Helping students and parents find the right college and career path through personalized, transparent guidance.",
            },
            {
              title: "Our Vision",
              text:
                "A world where every student discovers their true potential through the right education and support.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-8
              transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
              dark:border-slate-700 dark:bg-slate-800"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-6
                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-3 text-3xl">{value.icon}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Join thousands of students who trust Saarthi4u for guidance.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/contact"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white
              transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-blue-700"
            >
              Get Free Consultation
            </a>
            <a
              href="/course"
              className="rounded-lg border border-slate-300 px-8 py-3 font-semibold text-slate-700
              transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100
              dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutUsPage;
