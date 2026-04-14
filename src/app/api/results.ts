import { getAllExams } from "@/app/api/exam";
import { ResultItem } from "@/types/result";

const examResultPortalBySlug: Record<string, string> = {
  "upsc-cse": "https://www.upsc.gov.in/examinations/active-examinations",
  "jee-main": "https://jeemain.nta.nic.in/",
  "neet-ug": "https://neet.nta.nic.in/",
  "cat": "https://iimcat.ac.in/",
  "gate": "https://gate2026.iitr.ac.in/",
  "cuet-ug": "https://cuet.nta.nic.in/",
  "clat": "https://consortiumofnlus.ac.in/clat-2026/",
  nda: "https://www.upsc.gov.in/examinations",
  "ssc-cgl": "https://ssc.gov.in/",
  "ibps-po": "https://www.ibps.in/",
  "ugc-net": "https://ugcnet.nta.ac.in/",
  "cuet-pg": "https://pgcuet.samarth.ac.in/",
  xat: "https://xatonline.in/",
  cmat: "https://cmat.nta.nic.in/",
};

async function getCompetitiveExamResults(): Promise<ResultItem[]> {
  try {
    const response = await getAllExams(1, 500);
    const exams = Array.isArray(response?.data) ? response.data : [];

    return exams
      .filter((exam: any) => exam?.slug && exam?.name)
      .map((exam: any) => ({
        id: `exam-result-${exam.slug}`,
        section: "Competitive Exams" as const,
        board: exam.conductingBody || "Exam Authority",
        category: exam.category || "Competitive Exams",
        resultName: `${exam.name} Result`,
        description: `Official portal and updates for ${exam.name} scorecards, result notices, and counselling timelines.`,
        officialResultLink: examResultPortalBySlug[exam.slug] || `/exam/${exam.slug}`,
        source: exam.conductingBody || "Official Authority",
        isActive: true,
      }));
  } catch (error) {
    console.error("Error fetching competitive exam results:", error);
    return [];
  }
}

export async function getResultLinks(): Promise<ResultItem[]> {
  const competitiveExamResults = await getCompetitiveExamResults();
  return competitiveExamResults.filter((item) => item.isActive !== false);
}

