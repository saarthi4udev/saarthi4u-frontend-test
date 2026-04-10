import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { footerLinks } from "@/app/api/data";

const socialLinks = [
  {
    href: "https://www.facebook.com/Saarthi4uOfficial/",
    icon: "fe:facebook",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/saarthi4uofficial",
    icon: "fa6-brands:square-instagram",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/saarthi4u",
    icon: "fa6-brands:linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://www.youtube.com/@saarthi4uofficial",
    icon: "fa6-brands:youtube",
    label: "YouTube",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-gradient-to-b from-heroBg/70 via-white to-white py-6 dark:border-dark_border/80 dark:from-darkheader dark:via-darkmode dark:to-darkheader sm:py-8 lg:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-8 h-40 w-40 rounded-full bg-secondary/15 blur-3xl dark:bg-secondary/10" />
        <div className="absolute -right-20 top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl dark:bg-accent/10" />
      </div>

      <div className="container relative mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        {/* Contact Info Strip - Compact */}
        <div className="mb-5 grid gap-2 rounded-lg border border-border/70 bg-white/60 p-2 shadow-sm dark:border-dark_border/70 dark:bg-darkmode/50 sm:grid-cols-2 sm:p-3 lg:mb-6 lg:grid-cols-4 lg:gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="weui:location-outlined" className="text-lg text-secondary" />
            <p className="text-13 font-medium text-muted dark:text-foottext">1st Floor G-69, Sector-63, Noida</p>
          </div>

          <Link href="tel:+919958989150" className="flex items-center gap-2 transition-colors duration-200 hover:text-primary dark:hover:text-white">
            <Icon icon="majesticons:phone-retro-line" className="text-lg text-secondary" />
            <span className="text-13 font-medium text-muted dark:text-foottext">+91 9958989150</span>
          </Link>

          <Link href="mailto:info@saarthi4u.com" className="flex items-center gap-2 transition-colors duration-200 hover:text-primary dark:hover:text-white">
            <Icon icon="clarity:email-line" className="text-lg text-secondary" />
            <span className="text-13 font-medium text-muted dark:text-foottext">info@saarthi4u.com</span>
          </Link>

          <div className="flex items-center gap-2">
            {socialLinks.map((item) => (
              <Link key={item.label} href={item.href} target="_blank" aria-label={item.label} className="grid h-8 w-8 place-items-center rounded-full border border-border/60 bg-white text-muted transition-colors duration-200 hover:border-secondary hover:text-secondary dark:border-dark_border dark:bg-darkmode dark:text-foottext">
                <Icon icon={item.icon} className="text-base" />
              </Link>
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-12 gap-x-3 gap-y-4 border-t border-border/70 pt-5 dark:border-dark_border/70 sm:gap-x-5 sm:gap-y-5 sm:pt-6 lg:gap-y-6 lg:pt-7">
          {/* Brand Section */}
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block mb-2">
              <Image src="/images/logo/new_logo.png" alt="Saarthi4u" width={160} height={40} sizes="160px" className="h-auto w-auto" />
            </Link>
            <p className="text-14 leading-tight text-muted dark:text-foottext mb-2">AI-powered guidance for colleges, courses, scholarships & exams.</p>
            <p className="site-gradient-title text-16 font-bold leading-snug">From confusion to confident admission decisions.</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="rounded-full border border-border/60 bg-white/60 px-2.5 py-0.5 text-12 font-medium text-muted dark:border-dark_border dark:bg-dark_b/30 dark:text-foottext">AI Guidance</span>
              <span className="rounded-full border border-border/60 bg-white/60 px-2.5 py-0.5 text-12 font-medium text-muted dark:border-dark_border dark:bg-dark_b/30 dark:text-foottext">College Finder</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Link href="/college" className="site-cta h-9 px-3 rounded-full bg-accent text-13 font-semibold text-primary flex items-center">Explore</Link>
              <Link href="/contact" className="site-cta h-9 px-3 rounded-full border border-border/60 bg-white text-13 font-semibold text-primary dark:border-dark_border dark:bg-dark_b/30">Contact</Link>
            </div>
          </div>

          {/* Features */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h4 className="mb-2 text-14 font-semibold text-primary dark:text-white">Features</h4>
            <ul className="space-y-1.5">
              {footerLinks.features.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-13 text-muted transition-colors hover:text-secondary dark:text-foottext">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h4 className="mb-2 text-14 font-semibold text-primary dark:text-white">Resources</h4>
            <ul className="space-y-1.5">
              {footerLinks.resources.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-13 text-muted transition-colors hover:text-secondary dark:text-foottext">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h4 className="mb-2 text-14 font-semibold text-primary dark:text-white">Platform</h4>
            <ul className="space-y-1.5">
              {footerLinks.platform.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-13 text-muted transition-colors hover:text-secondary dark:text-foottext">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get App */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h4 className="mb-2 text-14 font-semibold text-primary dark:text-white">Get App</h4>
            <div className="flex flex-col gap-1.5">
              <Link href="/contact" className="inline-block hover:-translate-y-0.5 transition-transform">
                <Image src="/images/footer/play.png" alt="Google Play" width={100} height={30} sizes="100px" className="h-auto w-auto rounded-md max-w-full" />
              </Link>
              <Link href="/contact" className="inline-block hover:-translate-y-0.5 transition-transform">
                <Image src="/images/footer/store.png" alt="App Store" width={100} height={30} sizes="100px" className="h-auto w-auto rounded-md max-w-full" />
              </Link>
              <p className="text-11 text-muted dark:text-foottext mt-1">Coming soon on Android & iOS</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-2 border-t border-border/70 mt-4 pt-3 text-center dark:border-dark_border/70 sm:flex-row sm:justify-between sm:text-left sm:gap-3 sm:mt-5 sm:pt-4">
          <p className="text-12 text-muted dark:text-foottext">© {currentYear} Saarthi4u. All rights reserved.</p>
          <div className="flex items-center gap-3 text-12">
            <Link href="/terms" className="text-muted hover:text-secondary dark:text-foottext">Terms</Link>
            <Link href="/privacy-policy" className="text-muted hover:text-secondary dark:text-foottext">Privacy</Link>
            <Link href="/contact" className="text-muted hover:text-secondary dark:text-foottext">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
