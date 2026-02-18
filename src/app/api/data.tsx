import { text } from "stream/consumers";

//hero
export const Heroimage = [
  {
    lightimage: "/images/hero/google.png",
    darkimage: "/images/hero/google_white.png",
  },
  {
    lightimage: "/images/hero/pay.png",
    darkimage: "/images/hero/pay_white.png",
  },
  {
    lightimage: "/images/hero/stripe.png",
    darkimage: "/images/hero/stripe_white.png",
  },
  {
    lightimage: "/images/hero/wise.png",
    darkimage: "/images/hero/wise_white.png",
  },
];

// payment
export const PaymentImage = [
  {
    image: "/images/payment/user.svg",
    title: "Create an account",
    details:
      "Mobile app made easy check out across the web and in apps without having to enter any payment information.",
  },
  {
    image: "/images/payment/user.svg",
    title: "Verify your identity",
    details:
      "Mobile app made easy check out across the web and in apps without having to enter any payment information.",
  },
  {
    image: "/images/payment/user.svg",
    title: "Link your bank account",
    details:
      "Mobile app made easy check out across the web and in apps without having to enter any payment information.",
  },
];

// Beneifit
export const BeneifitImage = [
  {
    image: "/images/benefit/pic.svg",
    alt: "Trusted brand",
    details:
      "Stop wasteful spend and save thousands with unlimited points and insights that maximize savings.",
  },
  {
    image: "/images/benefit/contact.svg",
    alt: "Trusted brand",
    details: "See where the company money is going in real time.",
  },
  {
    image: "/images/benefit/bank.svg",
    alt: "Trusted brand",
    details: "Powered by the free app that helps you run your whole business.",
  },
  {
    image: "/images/benefit/files.svg",
    alt: "Trusted brand",
    details: "No more lost receipts and tedious paperwork.",
  },
  {
    image: "/images/benefit/setting.svg",
    alt: "Trusted brand",
    details:
      "It's an all-digital card designed for online, and even in-store shopping.",
  },
];

// // Footer Links
// export const footerLinks: { link: string }[] = [
//   {
//     link: "Online Payments",
//   },
//   {
//     link: "Financial Projections",
//   },
//   {
//     link: "Bookkeeping",
//   },
//   {
//     link: "Banking",
//   },
//   {
//     link: "Documentation",
//   },
//   {
//     link: "Integrations",
//   },
//   {
//     link: "API Reference",
//   },
//   {
//     link: "Support",
//   },
//   {
//     link: "Help",
//   },
//   {
//     link: "Infrastructure",
//   },
//   {
//     link: "Certifications",
//   },
//   {
//     link: "Licenses",
//   },
//   {
//     link: "Terms and conditions",
//   },
//   {
//     link: "Legal",
//   },
//   {
//     link: "Privacy",
//   },
//   {
//     link: "Cookies",
//   },
//   {
//     link: "Disclaimer",
//   },
// ];

export const footerLinks = {
  features: [
    { label: "Career Guidance", href: "/career-guidance" },
    { label: "College Finder", href: "/college" },
    { label: "Scholarships", href: "/scholarships" },
    { label: "Entrance Exams", href: "/exam" },
  ],
  resources: [
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faq" },
    { label: "Help Center", href: "/help" },
  ],
  platform: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Careers", href: "/careers" },
  ],
};


// Perks
export const perks = [
  {
    text: "When you pay with a debit or credit card, Mobile App doesn't keep transaction information that can be tied back to you.",
  },
  {
    text: "Digital wallets are becoming more popular than ever before.",
  },
  {
    text: "You can also add your student ID card to Wallet to access places like your dorm and the library.",
  },
];

// review
export const review = [
  {
    text: "It's easy to set up and the support experience is unparalleled. every transaction the instant it happens and correct wasteful behavior. What a relief.",
    name: "Nina B. Freeman",
    post: "Founder at Litchi Care",
    image: "/images/search/profile.png",
    appstorerating: "4.5",
    gplayrating: "4.5",
  },
];

// colleges - Backend ready structure
export const colleges = [
  {
    id: "1",
    name: "Amity University",
    shortName: "Amity Universit...",
    logo: "/images/colleges/amity.png",
    location: "Jaipur",
    city: "Jaipur",
    rating: 5.0,
    reviews: 1,
    type: "University" as const,
    category: "Govt." as const,
    description: "India&rsquo;s Leading Research &amp; Innovation Driven Pvt...",
    slug: "amity-university-jaipur",
    featuredImage: "/images/colleges/amity-featured.jpg",
  },
  {
    id: "2",
    name: "Jawaharlal Nehru University",
    shortName: "Jawaharlal Ne...",
    logo: "/images/colleges/jnu.png",
    location: "Noida",
    city: "Noida",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "About Jawaharlal Nehru University (JNU) Established i...",
    slug: "jawaharlal-nehru-university",
    featuredImage: "/images/colleges/jnu-featured.jpg",
  },
  {
    id: "3",
    name: "Nalanda University",
    shortName: "Nalanda Univ...",
    logo: "/images/colleges/nalanda.png",
    location: "Delhi",
    city: "Delhi",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "Reviving an Ancient Legacy for...",
    slug: "nalanda-university-delhi",
    featuredImage: "/images/colleges/nalanda-featured.jpg",
  },
  {
    id: "4",
    name: "Dr Bhimrao Ambedkar University",
    shortName: "Dr Bhimrao A...",
    logo: "/images/colleges/dbrau.png",
    location: "Agra",
    city: "Agra",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "ABOUT US Dr Bhimrao Ambedkar University (DBRAU)...",
    slug: "dr-bhimrao-ambedkar-university",
    featuredImage: "/images/colleges/dbrau-featured.jpg",
  },
  {
    id: "5",
    name: "Dayalbagh Educational Institute",
    shortName: "Dayalbagh Ed...",
    logo: "/images/colleges/dayalbagh.png",
    location: "Agra",
    city: "Agra",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "ABOUT DAYALBAGH EDUCATIONAL INSTITUTE...",
    slug: "dayalbagh-educational-institute",
    featuredImage: "/images/colleges/dayalbagh-featured.jpg",
  },
  {
    id: "6",
    name: "GLA University",
    shortName: "GLA Universit...",
    logo: "/images/colleges/gla.png",
    location: "Mathura",
    city: "Mathura",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "About GLA University It was the year 1998, when Shri Narayan...",
    slug: "gla-university-mathura",
    featuredImage: "/images/colleges/gla-featured.jpg",
  },
  {
    id: "7",
    name: "St. John's College",
    shortName: "St. John's Coll...",
    logo: "/images/colleges/sjc.png",
    location: "Agra",
    city: "Agra",
    rating: 0.0,
    reviews: 0,
    type: "College" as const,
    category: "Govt." as const,
    description: "St. John&rsquo;s College, Agra WELCOME TO ST...",
    slug: "st-johns-college-agra",
    featuredImage: "/images/colleges/sjc-featured.jpg",
  },
  {
    id: "8",
    name: "Mangalayatan University",
    shortName: "Mangalayata...",
    logo: "/images/colleges/mdu.png",
    location: "Aligarh",
    city: "Aligarh",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "Mangalayatan University About Us Mangalayatan University...",
    slug: "mangalayatan-university",
    featuredImage: "/images/colleges/mdu-featured.jpg",
  },
  {
    id: "9",
    name: "Guru Gobind Singh Indraprastha University",
    shortName: "Guru Gobind ...",
    logo: "/images/colleges/ggsipu.png",
    location: "Delhi",
    city: "Delhi",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "About us Guru Gobind Singh Indraprastha University...",
    slug: "guru-gobind-singh-indraprastha-university",
    featuredImage: "/images/colleges/ggsipu-featured.jpg",
  },
  {
    id: "10",
    name: "Indira Gandhi National Open University",
    shortName: "Indira Gandhi ...",
    logo: "/images/colleges/ignou.png",
    location: "New Delhi",
    city: "New Delhi",
    rating: 0.0,
    reviews: 0,
    type: "University" as const,
    category: "Govt." as const,
    description: "About us Indira Gandhi National Open University (IGNOU) is a...",
    slug: "indira-gandhi-national-open-university",
    featuredImage: "/images/colleges/ignou-featured.jpg",
  },
];

