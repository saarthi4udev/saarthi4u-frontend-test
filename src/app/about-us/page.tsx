import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Saarthi4u | Expert Career Mentors & Education Consulting",
  description: "Learn about Saarthi4u, your trusted partner for personalized career guidance and student future planning. We help you select the right college and course for a successful career.",
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

  const missionVision = [
    {
      title: "Our Mission",
      text: "Helping students and parents find the right college and career path through personalized, transparent guidance.",
      accent: "from-secondary to-secondary/60",
      badge: "🎯",
    },
    {
      title: "Our Vision",
      text: "A world where every student discovers their true potential through the right education and support.",
      accent: "from-accent to-accent-dark",
      badge: "🚀",
    },
  ];

  return (
    <main className="w-full overflow-hidden bg-white dark:bg-slate-900">

      {/* HERO WITH IMAGE */}
      <section className="relative border-b border-slate-200 bg-gradient-to-br from-heroBg via-secondary/5 to-accent/5 pb-24 pt-28 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">

          {/* TEXT */}
          <div className="animate-fadeIn">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-sm dark:border-primary/40 dark:bg-slate-800/70">
              Student Success Partner
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              About
              <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text pl-3 text-transparent">
                Saarthi4u
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg font-medium text-slate-600 dark:text-slate-300">
              Empowering students with the right guidance, at the right time,
              to build meaningful academic and career journeys.
            </p>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-secondary/15 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/90"
                >
                  <div className="text-2xl font-extrabold text-secondary transition-transform duration-300 group-hover:scale-105 dark:text-secondary">
                    {stat.number}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center animate-fadeInUp">
            <div className="absolute inset-x-8 bottom-8 h-24 rounded-full bg-secondary/25 blur-2xl" />
            <Image
              src="/images/about-hero.svg"
              alt="About Saarthi4u"
              width={520}
              height={420}
              priority
              className="relative w-full max-w-md transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          {missionVision.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${item.accent}`} />
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-2xl dark:bg-slate-700">
                {item.badge}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                {item.text}
              </p>
              <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-secondary to-secondary/60 transition-all duration-500 group-hover:w-24" />
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="inline-flex rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-secondary">
              Principles We Follow
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/15 to-accent/15 text-2xl transition-transform duration-300 group-hover:scale-110 dark:from-slate-700 dark:to-slate-600">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
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
      <section className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 py-20 text-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-base font-medium text-white/90">
            Join thousands of students who trust Saarthi4u for guidance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-xl bg-accent px-8 py-3 font-bold text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Get Free Consultation
            </a>
            <a
              href="/course"
              className="rounded-xl border border-white/70 px-8 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
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
