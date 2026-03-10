import CoursesSection from "@/components/Courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Saarthi4u",
};

export default function Page() {
  return <CoursesSection />;
}
