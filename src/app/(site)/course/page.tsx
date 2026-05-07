import CoursesSection from "@/components/Courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Selection Guidance | Best Certification Courses & Degree Options",
  description: "Find the right course for your career path. Expert guidance on course selection, from online degrees to professional certification courses.",
};

export default function Page() {
  return <CoursesSection />;
}
