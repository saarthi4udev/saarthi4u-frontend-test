export type DegreeLevel = "UG" | "PG" | "Diploma" | "Doctorate" | "Certificate";

export type CourseCategory = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  stream: string;
};

export type DiscoveryCourse = {
  name: string;
  slug: string;
  categorySlug: string;
  specialization: string;
  degreeLevel: DegreeLevel;
  duration: string;
  mode: "Full-time" | "Part-time" | "Online" | "Hybrid";
  feesRange: [number, number];
  popular: boolean;
  states: string[];
  collegeSlugs: string[];
};
