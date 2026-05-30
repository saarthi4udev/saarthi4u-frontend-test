import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExamBySlug } from "@/app/api/exam";
import { getAllCollegeshomepage } from "@/app/api/colleges";
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

  let relatedColleges: any[] = [];
  try {
    const colResponse = await getAllCollegeshomepage();
    const allColleges = colResponse?.data || [];
    
    if (Array.isArray(allColleges)) {
      const examCategory = (exam.category || exam.stream || "").toLowerCase().trim();
      
      relatedColleges = allColleges.filter((college: any) => {
        const collegeCategory = (college.Category?.name || "").toLowerCase().trim();
        return collegeCategory && (examCategory.includes(collegeCategory) || collegeCategory.includes(examCategory));
      });

      if (relatedColleges.length === 0) {
        relatedColleges = allColleges.slice(0, 4);
      } else {
        relatedColleges = relatedColleges.slice(0, 4);
      }

      relatedColleges = relatedColleges.map((c: any) => ({
        ...c,
        category: c.Category?.name || "",
        established: c.establishedYear || null,
        location: [c.city, c.state].filter(Boolean).join(", "),
        logo: c.logo || "",
        type: c.type || "College"
      }));
    }
  } catch (err) {
    console.warn("Failed to retrieve related colleges for exam page:", err);
  }

  return (
    <ExamDetailsView
      exam={exam}
      relatedColleges={relatedColleges}
    />
  );
}