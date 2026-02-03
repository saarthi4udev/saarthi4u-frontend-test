import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { footerLinks } from "@/app/api/data";

const Footer = () => {
  return (
    <footer className="pt-16 bg-midnight_text relative">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-2">

        {/* TOP CONTACT + SOCIAL */}
        <div className="flex lg:items-center justify-between lg:flex-row flex-col border-b border-dark_border pb-14 mb-16">
          <div className="flex sm:flex-nowrap flex-wrap gap-6">
            <div className="flex items-center text-foottext text-16">
              <Icon icon="weui:location-outlined" className="w-7 h-7 mr-3" />
              <span>1st Floor G-69, Sector-63, Noida – 201301</span>
            </div>

            <div className="flex items-center gap-2 text-foottext">
              <Icon icon="majesticons:phone-retro-line" className="w-7 h-7" />
              <Link href="tel:+919930718925" className="hover:text-primary">
                +91 9930718925
              </Link>
            </div>

            <div className="flex items-center gap-2 text-foottext">
              <Icon icon="clarity:email-line" className="w-7 h-7" />
              <Link href="mailto:info@saarthi4u.com" className="hover:text-primary">
                info@saarthi4u.com
              </Link>
            </div>
          </div>

          <div className="flex gap-4 mt-4 lg:mt-0">
            <Link href="https://www.facebook.com/Saarthi4uOfficial/" target="_blank" className="hover:text-primary">
              <Icon icon="fe:facebook" width="32" height="32" />
            </Link>
            <Link href="https://www.instagram.com/saarthi4uofficial" target="_blank" className="hover:text-primary">
              <Icon icon="fa6-brands:square-instagram" width="32" height="32" />
            </Link>
            <Link href="https://www.linkedin.com/company/saarthi4u" target="_blank" className="hover:text-primary">
              <Icon icon="fa6-brands:linkedin" width="32" height="32" />
            </Link>
            <Link href="https://www.youtube.com/@saarthi4uofficial-o1k" target="_blank" className="hover:text-primary">
              <Icon icon="fa6-brands:youtube" width="32" height="32" />
            </Link>
          </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="grid grid-cols-12 gap-6 mb-16">

          {/* FEATURES */}
          <div className="md:col-span-2 col-span-6">
            <h4 className="text-white text-18 mb-3">Features</h4>
            <ul>
              {footerLinks.features.map((item, i) => (
                <li key={i} className="pb-3">
                  <Link href={item.href} className="text-foottext hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="md:col-span-2 col-span-6">
            <h4 className="text-white text-18 mb-3">Resources</h4>
            <ul>
              {footerLinks.resources.map((item, i) => (
                <li key={i} className="pb-3">
                  <Link href={item.href} className="text-foottext hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PLATFORM */}
          <div className="md:col-span-3 col-span-6">
            <h4 className="text-white text-18 mb-3">Platform</h4>
            <ul>
              {footerLinks.platform.map((item, i) => (
                <li key={i} className="pb-3">
                  <Link href={item.href} className="text-foottext hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GET APP */}
          <div className="md:col-span-5 col-span-12">
            <p className="text-white text-18 font-bold mb-6">Get App</p>
            <div className="flex gap-4">
              <Image src="/images/footer/play.png" alt="Google Play" width={150} height={50} />
              <Image src="/images/footer/store.png" alt="App Store" width={150} height={50} />
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-foottext text-16 py-6 border-t border-dark_border">
          © 2025 Saarthi4u. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
