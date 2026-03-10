import { colleges } from "@/app/api/data";
import { College } from "@/types/college";
import { CourseCategory, DiscoveryCourse } from "@/types/courseDiscovery";

export const courseCategories: CourseCategory[] = [
  { name: "MBA", slug: "mba", description: "Management programs for business leadership and strategy.", icon: "mdi:briefcase-variant-outline", stream: "Management" },
  { name: "Engineering", slug: "engineering", description: "Core and emerging engineering specializations.", icon: "mdi:cog-outline", stream: "STEM" },
  { name: "Medical", slug: "medical", description: "Healthcare and clinical education programs.", icon: "mdi:stethoscope", stream: "Healthcare" },
  { name: "Paramedical", slug: "paramedical", description: "Allied health and diagnostics-focused programs.", icon: "mdi:medical-bag", stream: "Healthcare" },
  { name: "Pharmacy", slug: "pharmacy", description: "Pharmaceutical sciences, drug safety, and clinical pharmacy.", icon: "mdi:pill", stream: "Healthcare" },
  { name: "Law", slug: "law", description: "Legal studies for advocacy, policy, and compliance.", icon: "mdi:scale-balance", stream: "Legal" },
  { name: "Design", slug: "design", description: "Creative disciplines in product, UI/UX, and visual design.", icon: "mdi:palette-outline", stream: "Creative" },
  { name: "Animation & Multimedia", slug: "animation-multimedia", description: "Programs in animation, VFX, gaming, and multimedia production.", icon: "mdi:movie-open-play-outline", stream: "Creative" },
  { name: "Commerce", slug: "commerce", description: "Accounting, finance, taxation, and business commerce.", icon: "mdi:finance", stream: "Business" },
  { name: "Arts", slug: "arts", description: "Humanities and social sciences programs.", icon: "mdi:book-open-variant", stream: "Humanities" },
  { name: "Computer Applications", slug: "computer-applications", description: "Software, applications, and IT-focused programs.", icon: "mdi:laptop", stream: "Technology" },
  { name: "Science", slug: "science", description: "Pure and applied science disciplines.", icon: "mdi:flask-outline", stream: "STEM" },
  { name: "Data & AI", slug: "data-ai", description: "Data analytics, AI, machine learning, and intelligent systems.", icon: "mdi:brain", stream: "Technology" },
  { name: "Management", slug: "management", description: "Programs for operations, analytics, and leadership.", icon: "mdi:chart-timeline-variant", stream: "Business" },
  { name: "Hospitality", slug: "hospitality", description: "Hotel, travel, tourism, and service industry programs.", icon: "mdi:food-fork-drink", stream: "Service" },
  { name: "Aviation", slug: "aviation", description: "Aviation operations, management, and pilot pathway programs.", icon: "mdi:airplane", stream: "Service" },
  { name: "Architecture", slug: "architecture", description: "Programs in architecture, planning, and built environment.", icon: "mdi:office-building-outline", stream: "STEM" },
  { name: "Agriculture", slug: "agriculture", description: "Agricultural sciences, agribusiness, and sustainability-focused programs.", icon: "mdi:sprout", stream: "STEM" },
  { name: "Media & Communication", slug: "media-communication", description: "Journalism, digital media, advertising, and communication studies.", icon: "mdi:microphone-variant", stream: "Humanities" },
  { name: "Education", slug: "education", description: "Teaching, pedagogy, and educational leadership.", icon: "mdi:school-outline", stream: "Academic" },
  { name: "Social Work", slug: "social-work", description: "Programs for community development and social impact careers.", icon: "mdi:hand-heart-outline", stream: "Humanities" },
];

export const discoveryCourses: DiscoveryCourse[] = [
  { name: "MBA Finance", slug: "mba-finance", categorySlug: "mba", specialization: "Finance", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [350000, 900000], popular: true, states: ["Delhi", "Uttar Pradesh", "Maharashtra"], collegeSlugs: ["amity-university-jaipur", "jawaharlal-nehru-university", "indira-gandhi-national-open-university"] },
  { name: "MBA Marketing", slug: "mba-marketing", categorySlug: "mba", specialization: "Marketing", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [300000, 850000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "MBA HR", slug: "mba-hr", categorySlug: "mba", specialization: "Human Resources", degreeLevel: "PG", duration: "2 Years", mode: "Hybrid", feesRange: [250000, 700000], popular: false, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "gla-university-mathura"] },
  { name: "MBA International Business", slug: "mba-international-business", categorySlug: "mba", specialization: "International Business", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [400000, 1000000], popular: false, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "nalanda-university-delhi"] },
  { name: "MBA Operations", slug: "mba-operations", categorySlug: "mba", specialization: "Operations", degreeLevel: "PG", duration: "2 Years", mode: "Online", feesRange: [220000, 650000], popular: false, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["indira-gandhi-national-open-university", "gla-university-mathura"] },
  { name: "MBA Business Analytics", slug: "mba-business-analytics", categorySlug: "mba", specialization: "Business Analytics", degreeLevel: "PG", duration: "2 Years", mode: "Hybrid", feesRange: [380000, 980000], popular: true, states: ["Delhi", "Rajasthan", "Maharashtra"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university", "jawaharlal-nehru-university"] },
  { name: "MBA Healthcare Management", slug: "mba-healthcare-management", categorySlug: "mba", specialization: "Healthcare Management", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [300000, 800000], popular: false, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "nalanda-university-delhi"] },

  { name: "B.Tech Computer Science", slug: "btech-cse", categorySlug: "engineering", specialization: "Computer Science", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [450000, 1200000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["guru-gobind-singh-indraprastha-university", "gla-university-mathura"] },
  { name: "B.Tech Mechanical", slug: "btech-mechanical", categorySlug: "engineering", specialization: "Mechanical", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [350000, 900000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "st-johns-college-agra"] },
  { name: "B.Tech Civil", slug: "btech-civil", categorySlug: "engineering", specialization: "Civil", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [300000, 850000], popular: false, states: ["Agra", "Delhi"], collegeSlugs: ["dayalbagh-educational-institute", "guru-gobind-singh-indraprastha-university"] },
  { name: "B.Tech Electrical Engineering", slug: "btech-electrical", categorySlug: "engineering", specialization: "Electrical", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [320000, 880000], popular: true, states: ["Delhi", "Uttar Pradesh", "Agra"], collegeSlugs: ["guru-gobind-singh-indraprastha-university", "dr-bhimrao-ambedkar-university"] },
  { name: "B.Tech AI & ML", slug: "btech-ai-ml", categorySlug: "engineering", specialization: "Artificial Intelligence & Machine Learning", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [500000, 1300000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "M.Tech Structural Engineering", slug: "mtech-structural", categorySlug: "engineering", specialization: "Structural Engineering", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [250000, 700000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "dayalbagh-educational-institute"] },
  { name: "Diploma in Mechatronics", slug: "diploma-mechatronics", categorySlug: "engineering", specialization: "Mechatronics", degreeLevel: "Diploma", duration: "3 Years", mode: "Full-time", feesRange: [120000, 320000], popular: false, states: ["Agra", "Uttar Pradesh"], collegeSlugs: ["st-johns-college-agra", "gla-university-mathura"] },

  { name: "MBBS", slug: "mbbs", categorySlug: "medical", specialization: "General Medicine", degreeLevel: "UG", duration: "5.5 Years", mode: "Full-time", feesRange: [700000, 2500000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["nalanda-university-delhi", "amity-university-jaipur"] },
  { name: "B.Sc Nursing", slug: "bsc-nursing", categorySlug: "medical", specialization: "Nursing", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [200000, 700000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "gla-university-mathura"] },
  { name: "BDS", slug: "bds", categorySlug: "medical", specialization: "Dental Surgery", degreeLevel: "UG", duration: "5 Years", mode: "Full-time", feesRange: [600000, 1800000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "amity-university-jaipur"] },
  { name: "MD Internal Medicine", slug: "md-internal-medicine", categorySlug: "medical", specialization: "Internal Medicine", degreeLevel: "Doctorate", duration: "3 Years", mode: "Full-time", feesRange: [900000, 3000000], popular: false, states: ["Delhi", "Rajasthan"], collegeSlugs: ["nalanda-university-delhi", "amity-university-jaipur"] },
  { name: "MS General Surgery", slug: "ms-general-surgery", categorySlug: "medical", specialization: "General Surgery", degreeLevel: "Doctorate", duration: "3 Years", mode: "Full-time", feesRange: [950000, 3200000], popular: false, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "gla-university-mathura"] },

  { name: "BPT", slug: "bpt", categorySlug: "paramedical", specialization: "Physiotherapy", degreeLevel: "UG", duration: "4.5 Years", mode: "Full-time", feesRange: [180000, 650000], popular: true, states: ["Delhi", "Agra"], collegeSlugs: ["st-johns-college-agra", "jawaharlal-nehru-university"] },
  { name: "BMLT", slug: "bmlt", categorySlug: "paramedical", specialization: "Medical Laboratory Technology", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [120000, 420000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["gla-university-mathura", "dr-bhimrao-ambedkar-university"] },
  { name: "Diploma in Radiology", slug: "diploma-radiology", categorySlug: "paramedical", specialization: "Radiology", degreeLevel: "Diploma", duration: "2 Years", mode: "Full-time", feesRange: [100000, 300000], popular: false, states: ["Agra", "Delhi"], collegeSlugs: ["st-johns-college-agra", "nalanda-university-delhi"] },

  { name: "B.Pharm", slug: "bpharm", categorySlug: "pharmacy", specialization: "Pharmacy", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [220000, 800000], popular: true, states: ["Delhi", "Uttar Pradesh", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "gla-university-mathura", "guru-gobind-singh-indraprastha-university"] },
  { name: "D.Pharm", slug: "dpharm", categorySlug: "pharmacy", specialization: "Pharmacy", degreeLevel: "Diploma", duration: "2 Years", mode: "Full-time", feesRange: [90000, 280000], popular: false, states: ["Agra", "Delhi"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "st-johns-college-agra"] },
  { name: "M.Pharm Pharmaceutics", slug: "mpharm-pharmaceutics", categorySlug: "pharmacy", specialization: "Pharmaceutics", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [180000, 600000], popular: false, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "jawaharlal-nehru-university"] },

  { name: "BA LLB", slug: "ba-llb", categorySlug: "law", specialization: "Integrated Law", degreeLevel: "UG", duration: "5 Years", mode: "Full-time", feesRange: [300000, 900000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["guru-gobind-singh-indraprastha-university", "amity-university-jaipur"] },
  { name: "LLM Corporate Law", slug: "llm-corporate-law", categorySlug: "law", specialization: "Corporate Law", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [220000, 650000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["jawaharlal-nehru-university", "dr-bhimrao-ambedkar-university"] },
  { name: "LLB", slug: "llb", categorySlug: "law", specialization: "Law", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [150000, 500000], popular: true, states: ["Delhi", "Uttar Pradesh", "Agra"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "guru-gobind-singh-indraprastha-university"] },
  { name: "Diploma in Cyber Law", slug: "diploma-cyber-law", categorySlug: "law", specialization: "Cyber Law", degreeLevel: "Certificate", duration: "1 Year", mode: "Online", feesRange: [45000, 180000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["indira-gandhi-national-open-university", "amity-university-jaipur"] },

  { name: "B.Des UI/UX", slug: "bdes-ui-ux", categorySlug: "design", specialization: "User Experience Design", degreeLevel: "UG", duration: "4 Years", mode: "Hybrid", feesRange: [400000, 1100000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "nalanda-university-delhi"] },
  { name: "M.Des Product Design", slug: "mdes-product-design", categorySlug: "design", specialization: "Product Design", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [300000, 800000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["dayalbagh-educational-institute", "st-johns-college-agra"] },
  { name: "B.Des Fashion Design", slug: "bdes-fashion-design", categorySlug: "design", specialization: "Fashion Design", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [260000, 900000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "Diploma in Interior Design", slug: "diploma-interior-design", categorySlug: "design", specialization: "Interior Design", degreeLevel: "Diploma", duration: "1 Year", mode: "Hybrid", feesRange: [80000, 260000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["st-johns-college-agra", "dayalbagh-educational-institute"] },

  { name: "B.Sc Animation", slug: "bsc-animation", categorySlug: "animation-multimedia", specialization: "Animation", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [150000, 500000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "nalanda-university-delhi"] },
  { name: "B.Sc VFX", slug: "bsc-vfx", categorySlug: "animation-multimedia", specialization: "VFX", degreeLevel: "UG", duration: "3 Years", mode: "Hybrid", feesRange: [180000, 550000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["st-johns-college-agra", "jawaharlal-nehru-university"] },
  { name: "Diploma in Game Design", slug: "diploma-game-design", categorySlug: "animation-multimedia", specialization: "Game Design", degreeLevel: "Diploma", duration: "1 Year", mode: "Online", feesRange: [70000, 220000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["indira-gandhi-national-open-university", "gla-university-mathura"] },

  { name: "B.Com Honors", slug: "bcom-hons", categorySlug: "commerce", specialization: "Accounting & Taxation", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [120000, 450000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "dr-bhimrao-ambedkar-university"] },
  { name: "M.Com Finance", slug: "mcom-finance", categorySlug: "commerce", specialization: "Finance", degreeLevel: "PG", duration: "2 Years", mode: "Online", feesRange: [100000, 350000], popular: false, states: ["Delhi", "Mathura"], collegeSlugs: ["indira-gandhi-national-open-university", "gla-university-mathura"] },
  { name: "B.Com Banking & Insurance", slug: "bcom-banking-insurance", categorySlug: "commerce", specialization: "Banking & Insurance", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [130000, 420000], popular: false, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "dr-bhimrao-ambedkar-university"] },
  { name: "Certificate in GST & Taxation", slug: "certificate-gst-taxation", categorySlug: "commerce", specialization: "Taxation", degreeLevel: "Certificate", duration: "6 Months", mode: "Online", feesRange: [25000, 90000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["indira-gandhi-national-open-university", "jawaharlal-nehru-university"] },

  { name: "BA Psychology", slug: "ba-psychology", categorySlug: "arts", specialization: "Psychology", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [100000, 400000], popular: true, states: ["Delhi", "Agra"], collegeSlugs: ["dayalbagh-educational-institute", "st-johns-college-agra"] },
  { name: "MA English", slug: "ma-english", categorySlug: "arts", specialization: "English Literature", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [90000, 300000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "st-johns-college-agra"] },
  { name: "BA Economics", slug: "ba-economics", categorySlug: "arts", specialization: "Economics", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [110000, 420000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "dr-bhimrao-ambedkar-university"] },
  { name: "MA Sociology", slug: "ma-sociology", categorySlug: "arts", specialization: "Sociology", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [90000, 280000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["nalanda-university-delhi", "dayalbagh-educational-institute"] },

  { name: "BCA", slug: "bca", categorySlug: "computer-applications", specialization: "Software Applications", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [200000, 700000], popular: true, states: ["Delhi", "Mathura"], collegeSlugs: ["gla-university-mathura", "guru-gobind-singh-indraprastha-university"] },
  { name: "MCA", slug: "mca", categorySlug: "computer-applications", specialization: "Computer Applications", degreeLevel: "PG", duration: "2 Years", mode: "Hybrid", feesRange: [250000, 800000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "indira-gandhi-national-open-university"] },
  { name: "PGDCA", slug: "pgdca", categorySlug: "computer-applications", specialization: "Computer Applications", degreeLevel: "Diploma", duration: "1 Year", mode: "Full-time", feesRange: [80000, 250000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "st-johns-college-agra"] },
  { name: "Certificate in Full Stack Development", slug: "certificate-full-stack", categorySlug: "computer-applications", specialization: "Full Stack Development", degreeLevel: "Certificate", duration: "8 Months", mode: "Online", feesRange: [60000, 220000], popular: true, states: ["Delhi", "Rajasthan", "Uttar Pradesh"], collegeSlugs: ["indira-gandhi-national-open-university", "gla-university-mathura", "amity-university-jaipur"] },

  { name: "B.Sc Data Science", slug: "bsc-data-science", categorySlug: "science", specialization: "Data Science", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [220000, 750000], popular: true, states: ["Delhi", "Mathura"], collegeSlugs: ["gla-university-mathura", "nalanda-university-delhi"] },
  { name: "M.Sc Physics", slug: "msc-physics", categorySlug: "science", specialization: "Physics", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [100000, 350000], popular: false, states: ["Agra", "Delhi"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "dayalbagh-educational-institute"] },
  { name: "B.Sc Biotechnology", slug: "bsc-biotechnology", categorySlug: "science", specialization: "Biotechnology", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [180000, 620000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "nalanda-university-delhi"] },
  { name: "M.Sc Chemistry", slug: "msc-chemistry", categorySlug: "science", specialization: "Chemistry", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [95000, 320000], popular: false, states: ["Agra", "Delhi"], collegeSlugs: ["dayalbagh-educational-institute", "jawaharlal-nehru-university"] },

  { name: "B.Sc Artificial Intelligence", slug: "bsc-artificial-intelligence", categorySlug: "data-ai", specialization: "Artificial Intelligence", degreeLevel: "UG", duration: "3 Years", mode: "Hybrid", feesRange: [240000, 900000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "M.Sc Data Analytics", slug: "msc-data-analytics", categorySlug: "data-ai", specialization: "Data Analytics", degreeLevel: "PG", duration: "2 Years", mode: "Hybrid", feesRange: [220000, 750000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["gla-university-mathura", "jawaharlal-nehru-university"] },
  { name: "Certificate in Machine Learning", slug: "certificate-machine-learning", categorySlug: "data-ai", specialization: "Machine Learning", degreeLevel: "Certificate", duration: "6 Months", mode: "Online", feesRange: [50000, 180000], popular: true, states: ["Delhi", "Rajasthan", "Uttar Pradesh"], collegeSlugs: ["indira-gandhi-national-open-university", "amity-university-jaipur", "gla-university-mathura"] },

  { name: "BBA", slug: "bba", categorySlug: "management", specialization: "Business Administration", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [200000, 650000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "PGDM", slug: "pgdm", categorySlug: "management", specialization: "Management", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [320000, 900000], popular: true, states: ["Delhi", "Mathura"], collegeSlugs: ["gla-university-mathura", "jawaharlal-nehru-university"] },
  { name: "BBA Digital Marketing", slug: "bba-digital-marketing", categorySlug: "management", specialization: "Digital Marketing", degreeLevel: "UG", duration: "3 Years", mode: "Hybrid", feesRange: [180000, 600000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "Executive Management Program", slug: "executive-management-program", categorySlug: "management", specialization: "Executive Leadership", degreeLevel: "Certificate", duration: "1 Year", mode: "Online", feesRange: [100000, 350000], popular: false, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["indira-gandhi-national-open-university", "jawaharlal-nehru-university"] },

  { name: "BHM", slug: "bhm", categorySlug: "hospitality", specialization: "Hotel Management", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [180000, 600000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["st-johns-college-agra", "dayalbagh-educational-institute"] },
  { name: "BTTM", slug: "bttm", categorySlug: "hospitality", specialization: "Travel & Tourism", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [150000, 500000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["nalanda-university-delhi", "amity-university-jaipur"] },
  { name: "Diploma in Culinary Arts", slug: "diploma-culinary-arts", categorySlug: "hospitality", specialization: "Culinary Arts", degreeLevel: "Diploma", duration: "1 Year", mode: "Full-time", feesRange: [90000, 280000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["st-johns-college-agra", "dayalbagh-educational-institute"] },

  { name: "BBA Aviation", slug: "bba-aviation", categorySlug: "aviation", specialization: "Aviation Management", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [240000, 850000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "Commercial Pilot Ground School", slug: "commercial-pilot-ground-school", categorySlug: "aviation", specialization: "Pilot Training Foundation", degreeLevel: "Certificate", duration: "18 Months", mode: "Full-time", feesRange: [800000, 2500000], popular: false, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "gla-university-mathura"] },
  { name: "Airport Operations Management", slug: "airport-operations-management", categorySlug: "aviation", specialization: "Airport Operations", degreeLevel: "Diploma", duration: "1 Year", mode: "Hybrid", feesRange: [120000, 380000], popular: false, states: ["Delhi", "Rajasthan"], collegeSlugs: ["indira-gandhi-national-open-university", "amity-university-jaipur"] },

  { name: "B.Arch", slug: "barch", categorySlug: "architecture", specialization: "Architecture", degreeLevel: "UG", duration: "5 Years", mode: "Full-time", feesRange: [450000, 1400000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "guru-gobind-singh-indraprastha-university"] },
  { name: "M.Arch Urban Design", slug: "march-urban-design", categorySlug: "architecture", specialization: "Urban Design", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [280000, 850000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["nalanda-university-delhi", "dayalbagh-educational-institute"] },
  { name: "Diploma in Interior Architecture", slug: "diploma-interior-architecture", categorySlug: "architecture", specialization: "Interior Architecture", degreeLevel: "Diploma", duration: "2 Years", mode: "Hybrid", feesRange: [100000, 320000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["st-johns-college-agra", "dr-bhimrao-ambedkar-university"] },

  { name: "B.Sc Agriculture", slug: "bsc-agriculture", categorySlug: "agriculture", specialization: "Agriculture", degreeLevel: "UG", duration: "4 Years", mode: "Full-time", feesRange: [180000, 650000], popular: true, states: ["Uttar Pradesh", "Rajasthan"], collegeSlugs: ["gla-university-mathura", "amity-university-jaipur"] },
  { name: "M.Sc Agronomy", slug: "msc-agronomy", categorySlug: "agriculture", specialization: "Agronomy", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [140000, 420000], popular: false, states: ["Uttar Pradesh", "Delhi"], collegeSlugs: ["gla-university-mathura", "jawaharlal-nehru-university"] },
  { name: "Certificate in Organic Farming", slug: "certificate-organic-farming", categorySlug: "agriculture", specialization: "Organic Farming", degreeLevel: "Certificate", duration: "6 Months", mode: "Online", feesRange: [20000, 90000], popular: true, states: ["Delhi", "Uttar Pradesh", "Rajasthan"], collegeSlugs: ["indira-gandhi-national-open-university", "gla-university-mathura", "amity-university-jaipur"] },

  { name: "BA Journalism & Mass Communication", slug: "ba-journalism-mass-communication", categorySlug: "media-communication", specialization: "Journalism & Media", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [160000, 600000], popular: true, states: ["Delhi", "Rajasthan"], collegeSlugs: ["amity-university-jaipur", "nalanda-university-delhi"] },
  { name: "MA Digital Media", slug: "ma-digital-media", categorySlug: "media-communication", specialization: "Digital Media", degreeLevel: "PG", duration: "2 Years", mode: "Hybrid", feesRange: [140000, 500000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["jawaharlal-nehru-university", "st-johns-college-agra"] },
  { name: "Diploma in Advertising & PR", slug: "diploma-advertising-pr", categorySlug: "media-communication", specialization: "Advertising & PR", degreeLevel: "Diploma", duration: "1 Year", mode: "Full-time", feesRange: [90000, 300000], popular: false, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "guru-gobind-singh-indraprastha-university"] },

  { name: "B.Ed", slug: "bed", categorySlug: "education", specialization: "Education", degreeLevel: "UG", duration: "2 Years", mode: "Full-time", feesRange: [90000, 300000], popular: true, states: ["Agra", "Delhi"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "nalanda-university-delhi"] },
  { name: "M.Ed", slug: "med", categorySlug: "education", specialization: "Education", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [110000, 360000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["dr-bhimrao-ambedkar-university", "dayalbagh-educational-institute"] },
  { name: "Certificate in Educational Technology", slug: "certificate-educational-technology", categorySlug: "education", specialization: "EdTech", degreeLevel: "Certificate", duration: "6 Months", mode: "Online", feesRange: [25000, 120000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["indira-gandhi-national-open-university", "jawaharlal-nehru-university"] },

  { name: "BSW", slug: "bsw", categorySlug: "social-work", specialization: "Social Work", degreeLevel: "UG", duration: "3 Years", mode: "Full-time", feesRange: [90000, 300000], popular: false, states: ["Delhi", "Agra"], collegeSlugs: ["dayalbagh-educational-institute", "dr-bhimrao-ambedkar-university"] },
  { name: "MSW", slug: "msw", categorySlug: "social-work", specialization: "Community Development", degreeLevel: "PG", duration: "2 Years", mode: "Full-time", feesRange: [110000, 350000], popular: true, states: ["Delhi", "Uttar Pradesh"], collegeSlugs: ["jawaharlal-nehru-university", "nalanda-university-delhi"] },
  { name: "Certificate in NGO Management", slug: "certificate-ngo-management", categorySlug: "social-work", specialization: "NGO Management", degreeLevel: "Certificate", duration: "6 Months", mode: "Online", feesRange: [20000, 90000], popular: false, states: ["Delhi", "Rajasthan"], collegeSlugs: ["indira-gandhi-national-open-university", "amity-university-jaipur"] },
];

export const getCategoryBySlug = (slug: string) =>
  courseCategories.find((category) => category.slug === slug);

export const getCourseBySlug = (categorySlug: string, courseSlug: string) =>
  discoveryCourses.find(
    (course) =>
      course.categorySlug === categorySlug && course.slug === courseSlug,
  );

export const getCoursesByCategory = (categorySlug: string) =>
  discoveryCourses.filter((course) => course.categorySlug === categorySlug);

export const getCollegesForCourse = (course: DiscoveryCourse): College[] => {
  const bySlug = new Map<string, College>(
    (colleges as College[]).map((college) => [college.slug, college]),
  );
  return course.collegeSlugs
    .map((slug) => bySlug.get(slug))
    .filter((college): college is College => Boolean(college));
};

export const getCategoriesWithStats = () =>
  courseCategories.map((category) => {
    const courses = getCoursesByCategory(category.slug);
    const collegeCount = new Set(courses.flatMap((course) => course.collegeSlugs)).size;

    return {
      ...category,
      totalCourses: courses.length,
      totalColleges: collegeCount,
    };
  });

export const formatFees = (feesRange: [number, number]) => {
  const format = (value: number) => `₹${(value / 100000).toFixed(1)}L`;
  return `${format(feesRange[0])} - ${format(feesRange[1])}`;
};
