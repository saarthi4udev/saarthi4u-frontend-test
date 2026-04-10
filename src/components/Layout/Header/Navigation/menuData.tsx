import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Explore",
    href: "/college",
    submenu: [
      {
        label: "Colleges",
        href: "/college",
        submenu: [
          { label: "National Colleges", href: "/college" },
          { label: "International Colleges", href: "/international-colleges" },
        ],
      },
      { label: "Category", href: "/course" },
      { label: "Exams", href: "/exam" },
      { label: "Scholarships", href: "/scholarships" },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    submenu: [
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" },
      { label: "Results", href: "/results" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "FAQ", href: "/faq" },
      { label: "Help Center", href: "/help" },
    ],
  },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];
