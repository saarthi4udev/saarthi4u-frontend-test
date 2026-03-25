export type ResultSection = "Board Results" | "Competitive Exams" | "Global Results";

export type ResultItem = {
  id: string;
  section: ResultSection;
  board: string;
  category: string;
  resultName: string;
  description?: string;
  officialResultLink: string;
  source?: string;
  isActive?: boolean;
};
