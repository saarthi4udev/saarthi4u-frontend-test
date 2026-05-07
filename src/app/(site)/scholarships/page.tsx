import ScholarshipsSection from "@/components/Scholarships";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Scholarships | Financial Aid & Scholarship Guidance India",
  description: "Discover scholarship opportunities for students in India. Get help with financial aid applications and find the best scholarship for your education.",
};

export default function Page() {
  return <ScholarshipsSection />;
}
