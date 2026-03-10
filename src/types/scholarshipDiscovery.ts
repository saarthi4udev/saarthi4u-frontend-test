export type ScholarshipLevel = "School" | "UG" | "PG" | "Doctorate" | "Any";

export type ScholarshipType =
  | "Merit-Based"
  | "Need-Based"
  | "Government"
  | "Private"
  | "Minority"
  | "International"
  | "Research"
  | "Women"
  | "Sports"
  | "Special-Category";

export type ScholarshipAmountType = "Full Funding" | "Partial Funding" | "Stipend" | "Fee Waiver";

export type ScholarshipDateInfo = {
  label: string;
  month: string;
  status: "Upcoming" | "Ongoing" | "Closed";
};

export type ScholarshipEligibility = {
  education: string[];
  minPercentage: string;
  familyIncome: string;
  stateQuota: string;
  additional: string[];
};

export type ScholarshipItem = {
  name: string;
  slug: string;
  shortDescription: string;
  provider: string;
  providerType: "Central" | "State" | "Private" | "University" | "International";
  scholarshipType: ScholarshipType;
  level: ScholarshipLevel;
  amountType: ScholarshipAmountType;
  amountRange: [number, number];
  applicationFee: number;
  stream: string;
  mode: "Online" | "Offline" | "Hybrid";
  deadlineMonth: string;
  renewable: boolean;
  popular: boolean;
  eligibility: ScholarshipEligibility;
  importantDates: ScholarshipDateInfo[];
  benefits: string[];
  requiredDocuments: string[];
  applicationProcess: string[];
  selectionProcess: string[];
  preparationTips: string[];
  faqs: Array<{ question: string; answer: string }>;
  applicableStates: string[];
  relatedCollegeSlugs: string[];
};
