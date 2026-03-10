export type ExamLevel = "National" | "State" | "University" | "International";

export type ExamMode = "Online" | "Offline" | "Hybrid";

export type ExamDifficulty = "Easy" | "Moderate" | "Hard" | "Very Hard";

export type ExamDateInfo = {
  label: string;
  month: string;
  status: "Upcoming" | "Ongoing" | "Closed";
};

export type ExamPatternItem = {
  stage: string;
  mode: ExamMode;
  duration: string;
  totalMarks: number;
  subjects: string[];
};

export type CareerPath = {
  role: string;
  sector: string;
  avgStartingPackage: string;
};

export type ExamEligibility = {
  education: string[];
  ageLimit: string;
  attempts: string;
  nationality: string;
};

export type ExamItem = {
  name: string;
  slug: string;
  category: string;
  stream: string;
  level: ExamLevel;
  conductingBody: string;
  mode: ExamMode;
  frequency: "Annual" | "Biannual" | "Multiple Times";
  difficulty: ExamDifficulty;
  applicationFeeRange: [number, number];
  acceptedFor: string[];
  popular: boolean;
  description: string;
  eligibility: ExamEligibility;
  importantDates: ExamDateInfo[];
  examPattern: ExamPatternItem[];
  syllabusHighlights: string[];
  preparationTips: string[];
  careerPaths: CareerPath[];
  relatedCollegeSlugs: string[];
  faqs: Array<{ question: string; answer: string }>;
};
