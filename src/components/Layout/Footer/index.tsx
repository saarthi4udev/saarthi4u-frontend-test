import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { footerLinks } from "@/app/api/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-darkheader via-darkmode to-darkheader pt-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-secondary/12 blur-3xl" />
        <div className="absolute -right-20 top-24 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <div className="site-glass-card mb-6 rounded-2xl border border-dark_border/80 px-4 py-3 text-center sm:text-left">
          <p className="text-13 font-semibold tracking-[0.14em] text-secondary uppercase">Your Journey, Our Passion</p>
          <p className="mt-1 text-16 font-semibold text-white sm:text-18">
            Build your future with the right college and the right career at the right time.
          </p>
        </div>

        <div className="mb-10 grid gap-4 rounded-2xl border border-dark_border/90 bg-darkmode/70 p-4 shadow-[0_12px_34px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          <div className="flex items-start gap-3">
            <Icon icon="weui:location-outlined" className="mt-0.5 text-2xl text-secondary" />
            <p className="text-14 text-foottext">
              1st Floor G-69, Sector-63, Noida – 201301
            </p>
          </div>

          <Link
            href="tel:+919930718925"
            className="group flex items-start gap-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
          >
            <Icon icon="majesticons:phone-retro-line" className="mt-0.5 text-2xl text-secondary" />
            <span className="text-14 text-foottext transition-colors duration-200 group-hover:text-white">
              +91  9958989150
            </span>
          </Link>

          <Link
            href="mailto:info@saarthi4u.com"
            className="group flex items-start gap-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
          >
            <Icon icon="clarity:email-line" className="mt-0.5 text-2xl text-secondary" />
            <span className="text-14 text-foottext transition-colors duration-200 group-hover:text-white">
              info@saarthi4u.com
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:justify-end lg:justify-start">
            <Link
              href="https://www.facebook.com/Saarthi4uOfficial/"
              target="_blank"
              className="grid h-10 w-10 place-items-center rounded-full border border-dark_border bg-dark_b/55 text-foottext transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:text-secondary"
            >
              <Icon icon="fe:facebook" className="text-xl" />
            </Link>
            <Link
              href="https://www.instagram.com/saarthi4uofficial"
              target="_blank"
              className="grid h-10 w-10 place-items-center rounded-full border border-dark_border bg-dark_b/55 text-foottext transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:text-secondary"
            >
              <Icon icon="fa6-brands:square-instagram" className="text-xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/saarthi4u"
              target="_blank"
              className="grid h-10 w-10 place-items-center rounded-full border border-dark_border bg-dark_b/55 text-foottext transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:text-secondary"
            >
              <Icon icon="fa6-brands:linkedin" className="text-xl" />
            </Link>
            <Link
              href="https://www.youtube.com/@saarthi4uofficial"
              target="_blank"
              className="grid h-10 w-10 place-items-center rounded-full border border-dark_border bg-dark_b/55 text-foottext transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:text-secondary"
            >
              <Icon icon="fa6-brands:youtube" className="text-xl" />
            </Link>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-12 gap-7 border-b border-dark_border pb-12 sm:gap-8">
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/logo/new_logo.png"
                alt="Saarthi4u logo"
                width={170}
                height={38}
                sizes="170px"
                className="h-auto w-auto"
              />
            </Link>
            <p className="mb-5 max-w-md text-16 text-foottext">
              AI-powered guidance platform helping students discover colleges,
              courses, scholarships, and exams with confidence.
            </p>

            <p className="site-gradient-title mb-5 text-18 font-bold sm:text-20">
              From confusion to confident admission decisions.
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-dark_border bg-dark_b/50 px-3 py-1 text-13 text-foottext transition-colors duration-300 hover:border-secondary/50 hover:text-white">
                AI Guidance
              </span>
              <span className="rounded-full border border-dark_border bg-dark_b/50 px-3 py-1 text-13 text-foottext transition-colors duration-300 hover:border-secondary/50 hover:text-white">
                College Discovery
              </span>
              <span className="rounded-full border border-dark_border bg-dark_b/50 px-3 py-1 text-13 text-foottext transition-colors duration-300 hover:border-secondary/50 hover:text-white">
                Scholarship Support
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/college"
                className="group relative flex h-10 items-center overflow-hidden rounded-full bg-accent px-4 text-14 font-semibold text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-accent-dark"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Explore Colleges
              </Link>
              <Link
                href="/contact"
                className="flex h-10 items-center rounded-full border border-dark_border bg-dark_b/50 px-4 text-14 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:text-secondary"
              >
                Talk to Expert
              </Link>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <h4 className="mb-4 text-18 font-semibold text-white">Features</h4>
            <ul className="space-y-2.5">
              {footerLinks.features.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-16 text-foottext transition-all duration-200 hover:pl-1 hover:text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <h4 className="mb-4 text-18 font-semibold text-white">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-16 text-foottext transition-all duration-200 hover:pl-1 hover:text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <h4 className="mb-4 text-18 font-semibold text-white">Platform</h4>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-16 text-foottext transition-all duration-200 hover:pl-1 hover:text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-2">
            <div className="mx-auto max-w-[180px] text-center lg:mx-0 lg:max-w-none lg:text-left">
              <p className="mb-4 text-18 font-semibold text-white">Get App</p>
              <div className="space-y-3">
                <Link href="/contact" className="inline-block transition-transform duration-200 hover:-translate-y-0.5">
                <Image
                  src="/images/footer/play.png"
                  alt="Google Play"
                  width={140}
                  height={46}
                  sizes="140px"
                  className="h-auto w-auto rounded-lg opacity-90 transition-opacity duration-200 hover:opacity-100"
                />
                </Link>
                <Link href="/contact" className="inline-block transition-transform duration-200 hover:-translate-y-0.5">
                <Image
                  src="/images/footer/store.png"
                  alt="App Store"
                  width={140}
                  height={46}
                  sizes="140px"
                  className="h-auto w-auto rounded-lg opacity-90 transition-opacity duration-200 hover:opacity-100"
                />
                </Link>
              </div>
              <p className="mt-3 text-13 text-foottext">Coming soon on Android & iOS</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-16 text-foottext">
            © {currentYear} Saarthi4u. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-14">
            <Link href="/terms" className="text-foottext transition-colors duration-200 hover:text-secondary">
              Terms
            </Link>
            <Link href="/privacy-policy" className="text-foottext transition-colors duration-200 hover:text-secondary">
              Privacy
            </Link>
            <Link href="/contact" className="text-foottext transition-colors duration-200 hover:text-secondary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
