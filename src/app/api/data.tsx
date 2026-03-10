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
    { label: "Career Guidance", href: "/services" },
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
    { label: "How It Works", href: "/services" },
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
// export const colleges = [
//   {
//     id: "1",
//     name: "Amity University",
//     shortName: "Amity Universit...",
//     logo: "/images/colleges/amity.png",
//     location: "Jaipur",
//     city: "Jaipur",
//     rating: 5.0,
//     reviews: 1,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "India&rsquo;s Leading Research &amp; Innovation Driven Pvt...",
//     slug: "amity-university-jaipur",
//     featuredImage: "/images/colleges/amity-featured.jpg",
//   },
//   {
//     id: "2",
//     name: "Jawaharlal Nehru University",
//     shortName: "Jawaharlal Ne...",
//     logo: "/images/colleges/jnu.png",
//     location: "Noida",
//     city: "Noida",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "About Jawaharlal Nehru University (JNU) Established i...",
//     slug: "jawaharlal-nehru-university",
//     featuredImage: "/images/colleges/jnu-featured.jpg",
//   },
//   {
//     id: "3",
//     name: "Nalanda University",
//     shortName: "Nalanda Univ...",
//     logo: "/images/colleges/nalanda.png",
//     location: "Delhi",
//     city: "Delhi",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "Reviving an Ancient Legacy for...",
//     slug: "nalanda-university-delhi",
//     featuredImage: "/images/colleges/nalanda-featured.jpg",
//   },
//   {
//     id: "4",
//     name: "Dr Bhimrao Ambedkar University",
//     shortName: "Dr Bhimrao A...",
//     logo: "/images/colleges/dbrau.png",
//     location: "Agra",
//     city: "Agra",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "ABOUT US Dr Bhimrao Ambedkar University (DBRAU)...",
//     slug: "dr-bhimrao-ambedkar-university",
//     featuredImage: "/images/colleges/dbrau-featured.jpg",
//   },
//   {
//     id: "5",
//     name: "Dayalbagh Educational Institute",
//     shortName: "Dayalbagh Ed...",
//     logo: "/images/colleges/dayalbagh.png",
//     location: "Agra",
//     city: "Agra",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "ABOUT DAYALBAGH EDUCATIONAL INSTITUTE...",
//     slug: "dayalbagh-educational-institute",
//     featuredImage: "/images/colleges/dayalbagh-featured.jpg",
//   },
//   {
//     id: "6",
//     name: "GLA University",
//     shortName: "GLA Universit...",
//     logo: "/images/colleges/gla.png",
//     location: "Mathura",
//     city: "Mathura",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "About GLA University It was the year 1998, when Shri Narayan...",
//     slug: "gla-university-Do you have a Personal Access Token ready, or would you like me to walk you through how to generate one on GitHub?mathura",
//     featuredImage: "/images/colleges/gla-featured.jpg",
//   },
//   {
//     id: "7",
//     name: "St. John's College",
//     shortName: "St. John's Coll...",
//     logo: "/images/colleges/sjc.png",
//     location: "Agra",
//     city: "Agra",
//     rating: 0.0,
//     reviews: 0,
//     type: "College" as const,
//     category: "Govt." as const,
//     description: "St. John&rsquo;s College, Agra WELCOME TO ST...",
//     slug: "st-johns-college-agra",
//     featuredImage: "/images/colleges/sjc-featured.jpg",
//   },
//   {
//     id: "8",
//     name: "Mangalayatan University",
//     shortName: "Mangalayata...",
//     logo: "/images/colleges/mdu.png",
//     location: "Aligarh",
//     city: "Aligarh",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "Mangalayatan University About Us Mangalayatan University...",
//     slug: "mangalayatan-university",
//     featuredImage: "/images/colleges/mdu-featured.jpg",
//   },
//   {
//     id: "9",
//     name: "Guru Gobind Singh Indraprastha University",
//     shortName: "Guru Gobind ...",
//     logo: "/images/colleges/ggsipu.png",
//     location: "Delhi",
//     city: "Delhi",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "About us Guru Gobind Singh Indraprastha University...",
//     slug: "guru-gobind-singh-indraprastha-university",
//     featuredImage: "/images/colleges/ggsipu-featured.jpg",
//   },
//   {
//     id: "10",
//     name: "Indira Gandhi National Open University",
//     shortName: "Indira Gandhi ...",
//     logo: "/images/colleges/ignou.png",
//     location: "New Delhi",
//     city: "New Delhi",
//     rating: 0.0,
//     reviews: 0,
//     type: "University" as const,
//     category: "Govt." as const,
//     description: "About us Indira Gandhi National Open University (IGNOU) is a...",
//     slug: "indira-gandhi-national-open-university",
//     featuredImage: "/images/colleges/ignou-featured.jpg",
//   },
// ];




const getOnlineImage = (slug: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(slug)}/1600/900`;


export const colleges = [
  {
    id: "1",
    name: "Amity University",
    shortName: "Amity Universit...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Jaipur",
    city: "Jaipur",
    rating: 4.5,
    reviews: 124,
    type: "University" as const,
    category: "Private" as const,
    description:
      "Amity University Jaipur is a leading research-driven university offering globally benchmarked education across engineering, management, law, and sciences.",
    slug: "amity-university-jaipur",
    featuredImage: getOnlineImage("Amity University"),

    established: 2008,
    accreditation: ["UGC", "NAAC A+", "AICTE"],
    campusSize: "152 Acres",
    avgPackage: "₹6.5 LPA",
    highestPackage: "₹32 LPA",
    nirfRanking: 28,

    courses: [
      { name: "B.Tech", duration: "4 Years", fees: "₹2.8L / Year" },
      { name: "MBA", duration: "2 Years", fees: "₹3.5L / Year" },
      { name: "BBA", duration: "3 Years", fees: "₹1.5L / Year" },
    ],

    facilities: ["Hostel", "Sports Complex", "WiFi Campus", "Digital Library"],

    gallery: [
      "/images/colleges/amity-featured.jpg",
      "/images/colleges/amity.png",
    ],
  },

  {
    id: "2",
    name: "Jawaharlal Nehru University",
    shortName: "Jawaharlal Ne...",
    logo: "/images/colleges/college_logo.jpg",
    location: "New Delhi",
    city: "Delhi",
    rating: 4.7,
    reviews: 342,
    type: "University" as const,
    category: "Govt." as const,
    description:
      "JNU is one of India's top central universities known for research excellence, humanities, social sciences, and international studies.",
    slug: "jawaharlal-nehru-university",
    featuredImage:getOnlineImage("Jawaharlal Nehru University"),

    established: 1969,
    accreditation: ["UGC", "NAAC A++"],
    campusSize: "1000 Acres",
    avgPackage: "₹8.2 LPA",
    highestPackage: "₹28 LPA",
    nirfRanking: 2,

    courses: [
      { name: "MA", duration: "2 Years", fees: "₹12,000 / Year" },
      { name: "M.Tech", duration: "2 Years", fees: "₹45,000 / Year" },
    ],

    facilities: ["Hostel", "Research Labs", "Library", "Sports Facilities"],

    gallery: [
      "/images/colleges/jnu-featured.jpg",
      "/images/colleges/jnu.png",
    ],
  },

  {
    id: "3",
    name: "Nalanda University",
    shortName: "Nalanda Univ...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Rajgir",
    city: "Bihar",
    rating: 4.2,
    reviews: 68,
    type: "University" as const,
    category: "Govt." as const,
    description:
      "Nalanda University is a modern revival of the ancient Nalanda University focusing on global studies, ecology, and sustainable development.",
    slug: "nalanda-university-delhi",
    featuredImage: getOnlineImage("Nalanda University"),

    established: 2010,
    accreditation: ["UGC"],
    campusSize: "455 Acres",
    avgPackage: "₹5.8 LPA",
    highestPackage: "₹18 LPA",
    nirfRanking: 60,

    courses: [
      { name: "MA", duration: "2 Years", fees: "₹1.2L / Year" },
    ],

    facilities: ["Eco Campus", "Digital Library", "Hostel"],

    gallery: [
      "/images/colleges/nalanda-featured.jpg",
    ],
  },

  {
    id: "4",
    name: "Dr Bhimrao Ambedkar University",
    shortName: "Dr Bhimrao A...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Agra",
    city: "Agra",
    rating: 3.8,
    reviews: 89,
    type: "University" as const,
    category: "Govt." as const,
    description:
      "DBRAU is a public state university in Agra offering undergraduate, postgraduate and doctoral programs.",
    slug: "dr-bhimrao-ambedkar-university",
    featuredImage: getOnlineImage("Dr Bhimrao Ambedkar University"),

    established: 1927,
    accreditation: ["UGC", "NAAC B+"],
    campusSize: "200 Acres",
    avgPackage: "₹3.2 LPA",
    highestPackage: "₹12 LPA",
    nirfRanking: 120,

    courses: [
      { name: "BA", duration: "3 Years", fees: "₹20,000 / Year" },
      { name: "B.Sc", duration: "3 Years", fees: "₹25,000 / Year" },
    ],

    facilities: ["Library", "Hostel", "Auditorium"],

    gallery: [
      "/images/colleges/dbrau-featured.jpg",
    ],
  },

  {
    id: "5",
    name: "Dayalbagh Educational Institute",
    shortName: "Dayalbagh Ed...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Agra",
    city: "Agra",
    rating: 4.0,
    reviews: 54,
    type: "University" as const,
    category: "Govt." as const,
    description:
      "Dayalbagh Educational Institute is known for value-based education and academic excellence.",
    slug: "dayalbagh-educational-institute",
    featuredImage: getOnlineImage("Dayalbagh Educational Institute"),

    established: 1917,
    accreditation: ["UGC", "NAAC A"],
    campusSize: "300 Acres",
    avgPackage: "₹4.5 LPA",
    highestPackage: "₹15 LPA",
    nirfRanking: 75,

    courses: [
      { name: "B.Tech", duration: "4 Years", fees: "₹1.8L / Year" },
    ],

    facilities: ["Hostel", "Sports Ground", "Library"],

    gallery: [
      "/images/colleges/dayalbagh-featured.jpg",
    ],
  },

  {
    id: "6",
    name: "GLA University",
    shortName: "GLA Universit...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Mathura",
    city: "Mathura",
    rating: 4.1,
    reviews: 98,
    type: "University" as const,
    category: "Private" as const,
    description:
      "GLA University is a private university offering engineering, management and applied sciences programs.",
    slug: "gla-university-mathura",
    featuredImage: getOnlineImage("GLA University"),

    established: 1998,
    accreditation: ["UGC", "NAAC A"],
    campusSize: "110 Acres",
    avgPackage: "₹5.2 LPA",
    highestPackage: "₹24 LPA",
    nirfRanking: 45,

    courses: [
      { name: "B.Tech", duration: "4 Years", fees: "₹2.2L / Year" },
      { name: "MBA", duration: "2 Years", fees: "₹2.5L / Year" },
    ],

    facilities: ["Innovation Labs", "Hostel", "Sports Complex"],

    gallery: [
      "/images/colleges/gla-featured.jpg",
    ],
  },

  {
    id: "7",
    name: "St. John's College",
    shortName: "St. John's Coll...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Agra",
    city: "Agra",
    rating: 3.9,
    reviews: 61,
    type: "College" as const,
    category: "Govt." as const,
    description:
      "St. John’s College is one of the oldest institutions in North India offering arts and science programs.",
    slug: "st-johns-college-agra",
    featuredImage: getOnlineImage("St. John's College"),

    established: 1850,
    accreditation: ["UGC", "NAAC B+"],
    campusSize: "45 Acres",
    avgPackage: "₹2.8 LPA",
    highestPackage: "₹9 LPA",
    nirfRanking: 150,

    courses: [
      { name: "BA", duration: "3 Years", fees: "₹18,000 / Year" },
    ],

    facilities: ["Library", "Playground", "Hostel"],

    gallery: [
      "/images/colleges/sjc-featured.jpg",
    ],
  },

  {
    id: "8",
    name: "Mangalayatan University",
    shortName: "Mangalayata...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Aligarh",
    city: "Aligarh",
    rating: 4.0,
    reviews: 70,
    type: "University" as const,
    category: "Private" as const,
    description:
      "Mangalayatan University focuses on holistic development with industry-aligned programs.",
    slug: "mangalayatan-university",
    featuredImage: getOnlineImage("Mangalayatan University"),

    established: 2006,
    accreditation: ["UGC", "NAAC A"],
    campusSize: "70 Acres",
    avgPackage: "₹4.8 LPA",
    highestPackage: "₹16 LPA",
    nirfRanking: 95,

    courses: [
      { name: "B.Tech", duration: "4 Years", fees: "₹1.9L / Year" },
    ],

    facilities: ["Hostel", "Transport", "Sports Complex"],

    gallery: [
      "/images/colleges/mdu-featured.jpg",
    ],
  },

  {
    id: "9",
    name: "Guru Gobind Singh Indraprastha University",
    shortName: "Guru Gobind ...",
    logo: "/images/colleges/college_logo.jpg",
    location: "Delhi",
    city: "Delhi",
    rating: 4.4,
    reviews: 210,
    type: "University" as const,
    category: "Govt." as const,
    description:
      "GGSIPU is a leading state university offering professional programs in engineering, law, management and healthcare.",
    slug: "guru-gobind-singh-indraprastha-university",
    featuredImage: getOnlineImage("Guru Gobind Singh Indraprastha University"),

    established: 1998,
    accreditation: ["UGC", "NAAC A+"],
    campusSize: "60 Acres",
    avgPackage: "₹7.1 LPA",
    highestPackage: "₹29 LPA",
    nirfRanking: 20,

    courses: [
      { name: "B.Tech", duration: "4 Years", fees: "₹1.4L / Year" },
    ],

    facilities: ["Research Labs", "Library", "Hostel"],

    gallery: [
      "/images/colleges/ggsipu-featured.jpg",
    ],
  },

  {
    id: "10",
    name: "Indira Gandhi National Open University",
    shortName: "Indira Gandhi ...",
    logo: "/images/colleges/college_logo.jpg",
    location: "New Delhi",
    city: "New Delhi",
    rating: 4.3,
    reviews: 520,
    type: "University" as const,
    category: "Govt." as const,
    description:
      "IGNOU is India's largest open university offering distance and online education programs across disciplines.",
    slug: "indira-gandhi-national-open-university",
    featuredImage:getOnlineImage("IGNOU New Delhi"),

    established: 1985,
    accreditation: ["UGC", "NAAC A++"],
    campusSize: "120 Acres",
    avgPackage: "₹4.2 LPA",
    highestPackage: "₹14 LPA",
    nirfRanking: 1,

    courses: [
      { name: "BA", duration: "3 Years", fees: "₹8,000 / Year" },
      { name: "MBA", duration: "2 Years", fees: "₹62,000 Total" },
    ],

    facilities: ["Online Learning", "Regional Centers", "Digital Library"],

    gallery: [
      "/images/colleges/ignou-featured.jpg",
    ],
  },
];