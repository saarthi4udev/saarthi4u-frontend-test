import { colleges } from "@/app/api/data";
import { College } from "@/types/college";
import { ExamItem } from "@/types/examDiscovery";

export const exams: ExamItem[] = [
  {
    name: "UPSC Civil Services Examination",
    slug: "upsc-cse",
    category: "Civil Services",
    stream: "Government",
    level: "National",
    conductingBody: "UPSC",
    mode: "Offline",
    frequency: "Annual",
    difficulty: "Very Hard",
    applicationFeeRange: [100, 200],
    acceptedFor: ["IAS", "IPS", "IFS", "IRS", "Central Services"],
    popular: true,
    description: "India's premier examination for recruitment to All India and Central Civil Services.",
    eligibility: {
      education: ["Bachelor's degree from recognized university"],
      ageLimit: "21-32 years (category relaxations apply)",
      attempts: "General: 6, OBC: 9, SC/ST: Unlimited till age limit",
      nationality: "Indian (with specific provisions for certain services)",
    },
    importantDates: [
      { label: "Notification", month: "February", status: "Upcoming" },
      { label: "Prelims", month: "May", status: "Upcoming" },
      { label: "Mains", month: "September", status: "Upcoming" },
      { label: "Interview", month: "January", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Prelims",
        mode: "Offline",
        duration: "2 Papers × 2 Hours",
        totalMarks: 400,
        subjects: ["General Studies", "CSAT"],
      },
      {
        stage: "Mains",
        mode: "Offline",
        duration: "9 Papers",
        totalMarks: 1750,
        subjects: ["Essay", "GS I-IV", "Optional I-II", "Language Papers"],
      },
      {
        stage: "Personality Test",
        mode: "Offline",
        duration: "30-45 Minutes",
        totalMarks: 275,
        subjects: ["Interview"],
      },
    ],
    syllabusHighlights: [
      "Indian Polity, Governance, Constitution",
      "Economy, Environment, Science & Technology",
      "History, Geography, Ethics",
      "Current Affairs and International Relations",
    ],
    preparationTips: [
      "Build NCERT foundation first, then standard reference books.",
      "Practice answer writing daily for mains orientation.",
      "Revise current affairs with monthly compilations.",
      "Take mock tests and maintain error log.",
    ],
    careerPaths: [
      { role: "IAS Officer", sector: "Public Administration", avgStartingPackage: "As per govt pay matrix" },
      { role: "IPS Officer", sector: "Police Service", avgStartingPackage: "As per govt pay matrix" },
      { role: "IRS Officer", sector: "Tax & Revenue", avgStartingPackage: "As per govt pay matrix" },
    ],
    relatedCollegeSlugs: ["jawaharlal-nehru-university", "nalanda-university-delhi"],
    faqs: [
      { question: "Is UPSC CSE conducted in online mode?", answer: "No, all stages are currently conducted offline." },
      { question: "Can final-year students apply?", answer: "Yes, subject to fulfilling degree proof requirements before mains/interview stages." },
    ],
  },
  {
    name: "JEE Main",
    slug: "jee-main",
    category: "Engineering",
    stream: "STEM",
    level: "National",
    conductingBody: "NTA",
    mode: "Online",
    frequency: "Biannual",
    difficulty: "Hard",
    applicationFeeRange: [1000, 2000],
    acceptedFor: ["B.E./B.Tech", "B.Arch", "B.Planning", "NITs", "IIITs", "GFTIs"],
    popular: true,
    description: "National-level engineering entrance exam for top technical institutes and JEE Advanced eligibility.",
    eligibility: {
      education: ["12th with Physics, Mathematics, and one additional subject"],
      ageLimit: "No age limit (subject to institute criteria)",
      attempts: "3 consecutive years",
      nationality: "Indian and foreign nationals as per NTA rules",
    },
    importantDates: [
      { label: "Session 1", month: "January", status: "Upcoming" },
      { label: "Session 2", month: "April", status: "Upcoming" },
      { label: "Counselling (JoSAA)", month: "June", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Paper 1",
        mode: "Online",
        duration: "3 Hours",
        totalMarks: 300,
        subjects: ["Physics", "Chemistry", "Mathematics"],
      },
    ],
    syllabusHighlights: [
      "Class 11 and 12 PCM syllabus",
      "Problem solving and numerical aptitude",
      "High-weightage topics: Calculus, Mechanics, Organic Chemistry",
    ],
    preparationTips: [
      "Follow a strict revision cycle with PYQs.",
      "Balance speed and accuracy through timed tests.",
      "Create formula sheets and weekly weak-topic drills.",
    ],
    careerPaths: [
      { role: "Software Engineer", sector: "Technology", avgStartingPackage: "₹6L - ₹18L" },
      { role: "Core Engineer", sector: "Manufacturing/Infra", avgStartingPackage: "₹4L - ₹10L" },
      { role: "Research Engineer", sector: "R&D", avgStartingPackage: "₹5L - ₹12L" },
    ],
    relatedCollegeSlugs: ["guru-gobind-singh-indraprastha-university", "gla-university-mathura", "amity-university-jaipur"],
    faqs: [
      { question: "How many times can I attempt JEE Main in one year?", answer: "Typically twice, as Session 1 and Session 2." },
      { question: "Is 75% in Class 12 mandatory?", answer: "For admissions in some institutes, eligibility criteria may require minimum aggregate as per current guidelines." },
    ],
  },
  {
    name: "NEET UG",
    slug: "neet-ug",
    category: "Medical",
    stream: "Healthcare",
    level: "National",
    conductingBody: "NTA",
    mode: "Offline",
    frequency: "Annual",
    difficulty: "Hard",
    applicationFeeRange: [1700, 4500],
    acceptedFor: ["MBBS", "BDS", "BAMS", "BHMS", "B.Sc Nursing"],
    popular: true,
    description: "Single national-level entrance exam for undergraduate medical admissions in India.",
    eligibility: {
      education: ["12th with Physics, Chemistry, Biology/Biotechnology, and English"],
      ageLimit: "17+ years; upper age as per current norms",
      attempts: "No fixed cap as per latest updates (subject to policy)",
      nationality: "Indian, NRI, OCI, PIO, foreign nationals",
    },
    importantDates: [
      { label: "Application", month: "February", status: "Upcoming" },
      { label: "Exam", month: "May", status: "Upcoming" },
      { label: "Counselling", month: "July", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Single Paper",
        mode: "Offline",
        duration: "3 Hours 20 Minutes",
        totalMarks: 720,
        subjects: ["Physics", "Chemistry", "Biology"],
      },
    ],
    syllabusHighlights: [
      "NCERT-focused PCB syllabus",
      "Human physiology and genetics",
      "Organic chemistry and mechanics",
    ],
    preparationTips: [
      "Revise NCERT Biology repeatedly.",
      "Solve chapter-wise MCQ banks and mock papers.",
      "Track mistakes with concept tags.",
    ],
    careerPaths: [
      { role: "Doctor", sector: "Healthcare", avgStartingPackage: "₹6L - ₹15L" },
      { role: "Dental Surgeon", sector: "Healthcare", avgStartingPackage: "₹4L - ₹10L" },
      { role: "Medical Researcher", sector: "Research", avgStartingPackage: "₹5L - ₹12L" },
    ],
    relatedCollegeSlugs: ["amity-university-jaipur", "nalanda-university-delhi", "jawaharlal-nehru-university"],
    faqs: [
      { question: "Is NEET mandatory for all medical UG admissions?", answer: "Yes, for most medical streams in India as per prevailing regulations." },
      { question: "Is the paper bilingual?", answer: "Yes, NEET is offered in multiple languages including English and Hindi." },
    ],
  },
  {
    name: "CAT",
    slug: "cat",
    category: "MBA",
    stream: "Management",
    level: "National",
    conductingBody: "IIMs",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Hard",
    applicationFeeRange: [1250, 2500],
    acceptedFor: ["MBA", "PGDM", "Management Programs"],
    popular: true,
    description: "Top management aptitude test for admission into IIMs and leading B-schools.",
    eligibility: {
      education: ["Bachelor's degree with minimum qualifying marks as notified"],
      ageLimit: "No age limit",
      attempts: "No official limit",
      nationality: "Indian and foreign nationals as per institute requirements",
    },
    importantDates: [
      { label: "Registration", month: "August", status: "Upcoming" },
      { label: "Exam", month: "November", status: "Upcoming" },
      { label: "Interviews", month: "January", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Single CBT",
        mode: "Online",
        duration: "2 Hours",
        totalMarks: 198,
        subjects: ["VARC", "DILR", "QA"],
      },
    ],
    syllabusHighlights: [
      "Reading comprehension and verbal logic",
      "Data interpretation and analytical reasoning",
      "Arithmetic, algebra, and modern math",
    ],
    preparationTips: [
      "Take sectional mocks to improve balance.",
      "Strengthen RC and DILR through daily practice.",
      "Focus on accuracy before speed.",
    ],
    careerPaths: [
      { role: "Business Analyst", sector: "Consulting", avgStartingPackage: "₹8L - ₹18L" },
      { role: "Product Manager", sector: "Technology", avgStartingPackage: "₹12L - ₹28L" },
      { role: "Marketing Manager", sector: "FMCG/Media", avgStartingPackage: "₹7L - ₹16L" },
    ],
    relatedCollegeSlugs: ["amity-university-jaipur", "gla-university-mathura", "jawaharlal-nehru-university"],
    faqs: [
      { question: "Can final-year students apply for CAT?", answer: "Yes, they can apply subject to degree completion requirements." },
      { question: "Is there negative marking?", answer: "Yes, for most MCQs. TITA questions usually have no negative marking." },
    ],
  },
  {
    name: "GATE",
    slug: "gate",
    category: "Engineering",
    stream: "STEM",
    level: "National",
    conductingBody: "IITs/IISc",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Hard",
    applicationFeeRange: [900, 1800],
    acceptedFor: ["M.Tech", "PSU Recruitment", "MS/PhD"],
    popular: true,
    description: "Graduate Aptitude Test in Engineering for postgraduate admissions and PSU opportunities.",
    eligibility: {
      education: ["3rd year onward UG students or graduates in eligible disciplines"],
      ageLimit: "No age limit",
      attempts: "No limit",
      nationality: "Indian and international as per notification",
    },
    importantDates: [
      { label: "Application", month: "September", status: "Upcoming" },
      { label: "Exam", month: "February", status: "Upcoming" },
      { label: "Result", month: "March", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Single CBT",
        mode: "Online",
        duration: "3 Hours",
        totalMarks: 100,
        subjects: ["General Aptitude", "Engineering Mathematics", "Core Subject"],
      },
    ],
    syllabusHighlights: [
      "Core branch fundamentals",
      "Engineering mathematics",
      "Analytical aptitude",
    ],
    preparationTips: [
      "Prioritize PYQs and subject-wise mock tests.",
      "Prepare formula/shortcut notebook for revision.",
      "Plan branch-wise coverage with weekly targets.",
    ],
    careerPaths: [
      { role: "M.Tech Scholar", sector: "Higher Education", avgStartingPackage: "NA" },
      { role: "PSU Engineer", sector: "Public Sector", avgStartingPackage: "₹8L - ₹16L" },
      { role: "Research Associate", sector: "R&D", avgStartingPackage: "₹5L - ₹12L" },
    ],
    relatedCollegeSlugs: ["gla-university-mathura", "guru-gobind-singh-indraprastha-university", "amity-university-jaipur"],
    faqs: [
      { question: "Is GATE score valid for multiple years?", answer: "Yes, typically for 3 years from result declaration." },
      { question: "Can I apply to PSUs with GATE score?", answer: "Many PSUs use GATE scores for shortlisting." },
    ],
  },
  {
    name: "CUET UG",
    slug: "cuet-ug",
    category: "University Entrance",
    stream: "Multi-Disciplinary",
    level: "National",
    conductingBody: "NTA",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Moderate",
    applicationFeeRange: [750, 2000],
    acceptedFor: ["UG Admissions in Central/Participating Universities"],
    popular: true,
    description: "Common university entrance test for UG admissions across major universities.",
    eligibility: {
      education: ["12th pass/appearing from recognized board"],
      ageLimit: "As per university criteria",
      attempts: "Annual opportunity",
      nationality: "As per participating university criteria",
    },
    importantDates: [
      { label: "Registration", month: "March", status: "Upcoming" },
      { label: "Exam Window", month: "May", status: "Upcoming" },
      { label: "Counselling", month: "July", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Computer Based Test",
        mode: "Online",
        duration: "Subject-wise slots",
        totalMarks: 800,
        subjects: ["Language", "Domain Subjects", "General Test"],
      },
    ],
    syllabusHighlights: [
      "Class 12 NCERT alignment for domain subjects",
      "Language comprehension",
      "General aptitude and logical reasoning",
    ],
    preparationTips: [
      "Select domain subjects aligned with target course.",
      "Practice NTA-style mock tests.",
      "Track university-wise cutoffs and requirements.",
    ],
    careerPaths: [
      { role: "Undergraduate Programs", sector: "Higher Education", avgStartingPackage: "NA" },
      { role: "Interdisciplinary Programs", sector: "Academia", avgStartingPackage: "NA" },
      { role: "Professional Courses", sector: "Career Launch", avgStartingPackage: "NA" },
    ],
    relatedCollegeSlugs: ["jawaharlal-nehru-university", "indira-gandhi-national-open-university", "nalanda-university-delhi"],
    faqs: [
      { question: "Can I choose multiple domain subjects?", answer: "Yes, based on exam rules and university requirements." },
      { question: "Is CUET compulsory for all universities?", answer: "No, only for participating universities/courses." },
    ],
  },
  {
    name: "CLAT",
    slug: "clat",
    category: "Law",
    stream: "Legal",
    level: "National",
    conductingBody: "Consortium of NLUs",
    mode: "Offline",
    frequency: "Annual",
    difficulty: "Hard",
    applicationFeeRange: [4000, 5000],
    acceptedFor: ["BA LLB", "LLB", "LLM"],
    popular: true,
    description: "Common Law Admission Test for undergraduate and postgraduate law programs in NLUs.",
    eligibility: {
      education: ["UG: 12th pass", "PG: LL.B or equivalent"],
      ageLimit: "No upper age limit",
      attempts: "No official cap",
      nationality: "Indian and eligible foreign nationals",
    },
    importantDates: [
      { label: "Application", month: "July", status: "Upcoming" },
      { label: "Exam", month: "December", status: "Upcoming" },
      { label: "Counselling", month: "January", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "UG/PG Paper",
        mode: "Offline",
        duration: "2 Hours",
        totalMarks: 120,
        subjects: ["English", "Legal Reasoning", "Current Affairs", "Logical Reasoning", "Quantitative Techniques"],
      },
    ],
    syllabusHighlights: [
      "Passage-based legal reasoning",
      "Current affairs and static GK",
      "Analytical and critical reading",
    ],
    preparationTips: [
      "Read editorials and legal current affairs daily.",
      "Practice passage-based legal aptitude.",
      "Build speed with sectional timed tests.",
    ],
    careerPaths: [
      { role: "Corporate Lawyer", sector: "Legal", avgStartingPackage: "₹6L - ₹18L" },
      { role: "Litigation Associate", sector: "Judiciary", avgStartingPackage: "₹4L - ₹10L" },
      { role: "Policy Analyst", sector: "Public Policy", avgStartingPackage: "₹5L - ₹12L" },
    ],
    relatedCollegeSlugs: ["guru-gobind-singh-indraprastha-university", "amity-university-jaipur", "jawaharlal-nehru-university"],
    faqs: [
      { question: "Is CLAT required for all private law schools?", answer: "No, many private colleges have their own entrance process." },
      { question: "Can I attempt CLAT after graduation for UG?", answer: "UG CLAT targets 12th-level admissions; PG CLAT is for LLM." },
    ],
  },
  {
    name: "NDA",
    slug: "nda",
    category: "Defence",
    stream: "Government",
    level: "National",
    conductingBody: "UPSC",
    mode: "Offline",
    frequency: "Biannual",
    difficulty: "Hard",
    applicationFeeRange: [0, 100],
    acceptedFor: ["Indian Army", "Navy", "Air Force"],
    popular: true,
    description: "Entry-level exam for admission to National Defence Academy and Naval Academy.",
    eligibility: {
      education: ["12th pass (PCM required for Air Force/Navy)", "Only unmarried candidates as per official norms"],
      ageLimit: "16.5-19.5 years",
      attempts: "As per age eligibility windows",
      nationality: "Indian and eligible categories as notified",
    },
    importantDates: [
      { label: "NDA I", month: "April", status: "Upcoming" },
      { label: "NDA II", month: "September", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Written Test",
        mode: "Offline",
        duration: "Math + GAT papers",
        totalMarks: 900,
        subjects: ["Mathematics", "General Ability Test"],
      },
      {
        stage: "SSB Interview",
        mode: "Offline",
        duration: "5 Days",
        totalMarks: 900,
        subjects: ["Psychology", "GTO", "Personal Interview"],
      },
    ],
    syllabusHighlights: [
      "Math at 10+2 level",
      "English proficiency and GK",
      "Current affairs and defence awareness",
    ],
    preparationTips: [
      "Practice OMR mock tests for speed and accuracy.",
      "Include physical and communication preparation for SSB.",
      "Build strong fundamentals in math and English.",
    ],
    careerPaths: [
      { role: "Commissioned Officer", sector: "Defence", avgStartingPackage: "As per defence pay scale" },
      { role: "Defence Services", sector: "Government", avgStartingPackage: "As per defence pay scale" },
      { role: "Aviation Officer", sector: "Air Force", avgStartingPackage: "As per defence pay scale" },
    ],
    relatedCollegeSlugs: ["nalanda-university-delhi", "jawaharlal-nehru-university"],
    faqs: [
      { question: "Is NDA for girls as well?", answer: "Yes, based on current UPSC policy updates and vacancies." },
      { question: "Is PCM compulsory for all wings?", answer: "PCM is mandatory for Air Force and Navy entries." },
    ],
  },
  {
    name: "SSC CGL",
    slug: "ssc-cgl",
    category: "Government Jobs",
    stream: "Government",
    level: "National",
    conductingBody: "SSC",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Moderate",
    applicationFeeRange: [0, 100],
    acceptedFor: ["Group B and Group C posts in central government"],
    popular: true,
    description: "Major recruitment exam for central government ministries, departments, and organizations.",
    eligibility: {
      education: ["Bachelor's degree"],
      ageLimit: "18-32 years (post-wise variation)",
      attempts: "As per age limit and notification",
      nationality: "Indian and eligible categories",
    },
    importantDates: [
      { label: "Notification", month: "June", status: "Upcoming" },
      { label: "Tier I", month: "September", status: "Upcoming" },
      { label: "Tier II", month: "December", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Tier I",
        mode: "Online",
        duration: "60 Minutes",
        totalMarks: 200,
        subjects: ["Reasoning", "GK", "Quant", "English"],
      },
      {
        stage: "Tier II",
        mode: "Online",
        duration: "Paper-wise",
        totalMarks: 390,
        subjects: ["Quant", "English", "Statistics", "General Studies"],
      },
    ],
    syllabusHighlights: [
      "Reasoning and aptitude",
      "General awareness",
      "Advanced math and English",
    ],
    preparationTips: [
      "Practice sectional tests and previous year papers.",
      "Prioritize speed maths and grammar rules.",
      "Maintain daily current affairs notes.",
    ],
    careerPaths: [
      { role: "Income Tax Inspector", sector: "Revenue", avgStartingPackage: "As per govt pay matrix" },
      { role: "Assistant Section Officer", sector: "Administration", avgStartingPackage: "As per govt pay matrix" },
      { role: "Auditor", sector: "Accounts", avgStartingPackage: "As per govt pay matrix" },
    ],
    relatedCollegeSlugs: ["dr-bhimrao-ambedkar-university", "indira-gandhi-national-open-university"],
    faqs: [
      { question: "Is SSC CGL bilingual?", answer: "Yes, most sections are available in Hindi and English except English language sections." },
      { question: "Is there negative marking?", answer: "Yes, negative marking applies in certain tiers/papers." },
    ],
  },
  {
    name: "IBPS PO",
    slug: "ibps-po",
    category: "Banking",
    stream: "Finance",
    level: "National",
    conductingBody: "IBPS",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Moderate",
    applicationFeeRange: [175, 850],
    acceptedFor: ["Probationary Officer roles in public sector banks"],
    popular: true,
    description: "Recruitment exam for probationary officer positions in participating public sector banks.",
    eligibility: {
      education: ["Bachelor's degree"],
      ageLimit: "20-30 years (relaxations apply)",
      attempts: "As per age eligibility",
      nationality: "Indian and specified categories",
    },
    importantDates: [
      { label: "Prelims", month: "October", status: "Upcoming" },
      { label: "Mains", month: "November", status: "Upcoming" },
      { label: "Interview", month: "January", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Prelims",
        mode: "Online",
        duration: "60 Minutes",
        totalMarks: 100,
        subjects: ["English", "Quant", "Reasoning"],
      },
      {
        stage: "Mains",
        mode: "Online",
        duration: "3 Hours",
        totalMarks: 225,
        subjects: ["Reasoning", "GA", "English", "Data Analysis"],
      },
    ],
    syllabusHighlights: [
      "Quantitative aptitude",
      "Reasoning and puzzles",
      "Banking awareness",
    ],
    preparationTips: [
      "Practice high-level puzzles daily.",
      "Strengthen data interpretation and arithmetic.",
      "Read RBI and financial current affairs.",
    ],
    careerPaths: [
      { role: "Probationary Officer", sector: "Banking", avgStartingPackage: "₹5L - ₹8L" },
      { role: "Branch Manager", sector: "Banking", avgStartingPackage: "Growth-based" },
      { role: "Risk Analyst", sector: "Financial Services", avgStartingPackage: "₹6L - ₹12L" },
    ],
    relatedCollegeSlugs: ["indira-gandhi-national-open-university", "gla-university-mathura", "jawaharlal-nehru-university"],
    faqs: [
      { question: "Is interview mandatory in IBPS PO?", answer: "Yes, interview is part of the final selection process." },
      { question: "Can final-year students apply?", answer: "Only if they can produce degree proof by specified deadline." },
    ],
  },
  {
    name: "UGC NET",
    slug: "ugc-net",
    category: "Teaching",
    stream: "Academic",
    level: "National",
    conductingBody: "NTA",
    mode: "Online",
    frequency: "Biannual",
    difficulty: "Hard",
    applicationFeeRange: [325, 1150],
    acceptedFor: ["Assistant Professor", "JRF", "PhD admission eligibility"],
    popular: true,
    description: "National eligibility test for lectureship and Junior Research Fellowship in Indian universities.",
    eligibility: {
      education: ["Master's degree with required minimum marks"],
      ageLimit: "JRF age limit applicable; no upper age for Assistant Professor",
      attempts: "No fixed cap",
      nationality: "Indian citizens and eligible categories",
    },
    importantDates: [
      { label: "Cycle 1", month: "June", status: "Upcoming" },
      { label: "Cycle 2", month: "December", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "Two Papers",
        mode: "Online",
        duration: "3 Hours",
        totalMarks: 300,
        subjects: ["Teaching Aptitude", "Subject Paper"],
      },
    ],
    syllabusHighlights: [
      "Teaching and research aptitude",
      "Reasoning and communication",
      "Subject-specific advanced concepts",
    ],
    preparationTips: [
      "Master Paper 1 fundamentals and pedagogy topics.",
      "Use unit-wise plans for subject paper coverage.",
      "Take full-length mocks and revision loops.",
    ],
    careerPaths: [
      { role: "Assistant Professor", sector: "Academia", avgStartingPackage: "₹5L - ₹12L" },
      { role: "Junior Research Fellow", sector: "Research", avgStartingPackage: "As per fellowship norms" },
      { role: "Academic Content Specialist", sector: "EdTech", avgStartingPackage: "₹4L - ₹10L" },
    ],
    relatedCollegeSlugs: ["jawaharlal-nehru-university", "nalanda-university-delhi", "dr-bhimrao-ambedkar-university"],
    faqs: [
      { question: "Is UGC NET required for PhD?", answer: "Depends on university policy; it can provide exemption/advantage in many cases." },
      { question: "Can I choose any subject in NET?", answer: "You should choose the subject aligned with your postgraduation discipline." },
    ],
  },
  {
    name: "CUET PG",
    slug: "cuet-pg",
    category: "University Entrance",
    stream: "Multi-Disciplinary",
    level: "National",
    conductingBody: "NTA",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Moderate",
    applicationFeeRange: [1000, 3000],
    acceptedFor: ["PG admissions in participating universities"],
    popular: false,
    description: "Common entrance exam for postgraduate admissions across central and other participating universities.",
    eligibility: {
      education: ["Bachelor's degree/appearing as per university rules"],
      ageLimit: "As per participating university criteria",
      attempts: "Annual opportunity",
      nationality: "As per university criteria",
    },
    importantDates: [
      { label: "Application", month: "January", status: "Upcoming" },
      { label: "Exam", month: "March", status: "Upcoming" },
      { label: "Counselling", month: "May", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "CBT",
        mode: "Online",
        duration: "105 Minutes",
        totalMarks: 300,
        subjects: ["Domain Knowledge", "General Aptitude"],
      },
    ],
    syllabusHighlights: [
      "Subject-specific undergraduate-level concepts",
      "Analytical aptitude and comprehension",
    ],
    preparationTips: [
      "Prepare according to target university and subject mapping.",
      "Practice domain mock papers and revise basics.",
      "Track university-specific admission timelines.",
    ],
    careerPaths: [
      { role: "Postgraduate Specialization", sector: "Higher Education", avgStartingPackage: "NA" },
      { role: "Academic Research", sector: "Research", avgStartingPackage: "NA" },
      { role: "Professional Master’s Programs", sector: "Industry", avgStartingPackage: "Depends on discipline" },
    ],
    relatedCollegeSlugs: ["jawaharlal-nehru-university", "indira-gandhi-national-open-university", "gla-university-mathura"],
    faqs: [
      { question: "Is CUET PG mandatory for all PG admissions?", answer: "No, only for participating institutions/programs." },
      { question: "Can I apply to multiple courses?", answer: "Yes, subject to paper selection and application rules." },
    ],
  },
  {
    name: "XAT",
    slug: "xat",
    category: "MBA",
    stream: "Management",
    level: "National",
    conductingBody: "XLRI",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Hard",
    applicationFeeRange: [2100, 2500],
    acceptedFor: ["MBA/PGDM admissions in XLRI and associated institutes"],
    popular: false,
    description: "Management entrance exam known for decision-making and verbal aptitude emphasis.",
    eligibility: {
      education: ["Bachelor's degree"],
      ageLimit: "No age limit",
      attempts: "No fixed cap",
      nationality: "Indian and foreign candidates as per rules",
    },
    importantDates: [
      { label: "Application", month: "July", status: "Upcoming" },
      { label: "Exam", month: "January", status: "Upcoming" },
      { label: "GD/PI", month: "February", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "CBT",
        mode: "Online",
        duration: "210 Minutes",
        totalMarks: 100,
        subjects: ["VALR", "DM", "QA-DI", "General Knowledge"],
      },
    ],
    syllabusHighlights: [
      "Decision making caselets",
      "Advanced verbal reasoning",
      "Quant and DI",
    ],
    preparationTips: [
      "Practice decision-making sections thoroughly.",
      "Maintain vocabulary and RC rigor.",
      "Solve mixed-difficulty mocks.",
    ],
    careerPaths: [
      { role: "Consultant", sector: "Consulting", avgStartingPackage: "₹10L - ₹24L" },
      { role: "Operations Manager", sector: "Industry", avgStartingPackage: "₹8L - ₹18L" },
      { role: "Brand Manager", sector: "Marketing", avgStartingPackage: "₹9L - ₹20L" },
    ],
    relatedCollegeSlugs: ["amity-university-jaipur", "gla-university-mathura", "jawaharlal-nehru-university"],
    faqs: [
      { question: "Is calculator allowed in XAT?", answer: "On-screen calculator is typically available as per exam guidelines." },
      { question: "Does GK section affect percentile?", answer: "Percentile usually excludes GK, but institutes may consider it in later stages." },
    ],
  },
  {
    name: "CMAT",
    slug: "cmat",
    category: "MBA",
    stream: "Management",
    level: "National",
    conductingBody: "NTA",
    mode: "Online",
    frequency: "Annual",
    difficulty: "Moderate",
    applicationFeeRange: [1000, 2000],
    acceptedFor: ["AICTE-approved MBA/PGDM institutes"],
    popular: false,
    description: "National-level management aptitude exam accepted by many AICTE-approved institutes.",
    eligibility: {
      education: ["Bachelor's degree"],
      ageLimit: "No age limit",
      attempts: "Annual opportunity",
      nationality: "Indian citizens",
    },
    importantDates: [
      { label: "Registration", month: "November", status: "Upcoming" },
      { label: "Exam", month: "January", status: "Upcoming" },
      { label: "Admission Cycle", month: "February", status: "Upcoming" },
    ],
    examPattern: [
      {
        stage: "CBT",
        mode: "Online",
        duration: "180 Minutes",
        totalMarks: 400,
        subjects: ["Quant", "LR", "Language", "GK", "Innovation & Entrepreneurship"],
      },
    ],
    syllabusHighlights: [
      "Aptitude and reasoning",
      "General awareness",
      "Entrepreneurship section",
    ],
    preparationTips: [
      "Balance quant, LR, and verbal practice.",
      "Prepare current affairs and business GK.",
      "Attempt full mocks weekly.",
    ],
    careerPaths: [
      { role: "Management Trainee", sector: "Corporate", avgStartingPackage: "₹4L - ₹9L" },
      { role: "Sales/Marketing Associate", sector: "Business", avgStartingPackage: "₹4L - ₹8L" },
      { role: "Operations Analyst", sector: "Operations", avgStartingPackage: "₹5L - ₹10L" },
    ],
    relatedCollegeSlugs: ["amity-university-jaipur", "gla-university-mathura", "indira-gandhi-national-open-university"],
    faqs: [
      { question: "Is CMAT easier than CAT?", answer: "Generally considered moderate compared to CAT, but competition remains high." },
      { question: "Can I use CMAT score for all B-schools?", answer: "Only institutes that accept CMAT scores." },
    ],
  },
];

export const getExamBySlug = (slug: string) =>
  exams.find((exam) => exam.slug === slug);


export const getRelatedColleges = (exam: ExamItem): College[] => {
  const bySlug = new Map<string, College>(
    (colleges as College[]).map((college) => [college.slug, college]),
  );
  return exam.relatedCollegeSlugs
    .map((slug) => bySlug.get(slug))
    .filter((college): college is College => Boolean(college));
};



export function formatFeeRange(fee: any) {
  if (!fee) return "None";

  if (typeof fee === "number") {
    return `₹${fee}`;
  }

  if (typeof fee === "object") {
    const min = fee.min ?? 0;
    const max = fee.max ?? 0;

    if (min && max) return `₹${min} - ₹${max}`;
    if (min) return `₹${min}`;
    if (max) return `₹${max}`;
  }

  return "None";
}
export function getUniqueExamFilters(exams: any[]) {
  const categories = [...new Set(exams.map((e) => e.category))];
  const levels = [...new Set(exams.map((e) => e.level))];
  const bodies = [...new Set(exams.map((e) => e.conductingBody))];
  const modes = [...new Set(exams.map((e) => e.examMode))];
  const frequencies = [...new Set(exams.map((e) => e.frequency))];
  const streams = [...new Set(exams.map((e) => e.stream))];

  return { categories, levels, bodies, modes, frequencies, streams };
}