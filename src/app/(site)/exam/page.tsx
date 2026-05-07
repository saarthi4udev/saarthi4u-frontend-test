
import ExamsSection from "@/components/Exams";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrance Exams Guide | Exam Dates, Syllabus & Preparation Tips",
  description: "Stay updated with the latest information on entrance exams in India. Get preparation tips and expert guidance for successful college admissions.",
};

export default function Page() {
  return (
    <ExamsSection />
  );
}



