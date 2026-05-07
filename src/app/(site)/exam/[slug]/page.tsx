import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExamBySlug } from "@/app/api/exam";
import ExamDetailsView from "@/components/Exams/ExamDetailsView";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 🔹 Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExamBySlug(slug);

  if (!exam) {
    return {
      title: "Exam Not Found | Saarthi4u",
    };
  }

  return {
    title: `${exam.name} Entrance Exam Guide | Exam Dates & Syllabus`,
    description: `Get complete information about ${exam.name} entrance exam, including eligibility, syllabus, and important dates. Expert preparation tips at Saarthi4u.`,
  };
}

// 🔹 Page
export default async function ExamDetailsPage({ params }: Props) {
  const { slug } = await params;

  const exam = await getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  // for now keep empty
  const relatedColleges: any[] = [];

  return (
    <ExamDetailsView
      exam={exam}
      relatedColleges={relatedColleges}
    />
  );
}