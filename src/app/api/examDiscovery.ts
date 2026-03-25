import { College } from "@/types/college";
import { ExamItem } from "@/types/examDiscovery";

export const exams: ExamItem[] = [];

export const getExamBySlug = (slug: string) =>
  exams.find((exam) => exam.slug === slug);


export const getRelatedColleges = (exam: ExamItem): College[] => {
  // Demo colleges data removed - colleges will be fetched from backend
  return [];
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

  return "N/A";
}

export const getUniqueExamFilters = (exams: ExamItem[]) => {
  const categories = new Set<string>();
  const streams = new Set<string>();
  const levels = new Set<string>();
  const difficulties = new Set<string>();

  exams.forEach((exam) => {
    if (exam.category) categories.add(exam.category);
    if (exam.stream) streams.add(exam.stream);
    if (exam.level) levels.add(exam.level);
    if (exam.difficulty) difficulties.add(exam.difficulty);
  });

  return {
    categories: Array.from(categories).sort(),
    streams: Array.from(streams).sort(),
    levels: Array.from(levels).sort(),
    difficulties: Array.from(difficulties).sort(),
  };
};
