import ResultsSection from "@/components/Results";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Admission Results | Student Achievements & Career Path Success",
  description: "Check out the latest college admission results and success stories of students guided by Saarthi4u career mentors.",
};

export default function Page() {
  return <ResultsSection />;
}
