import CoursesSection from "@/components/Courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Saarthi4u",
};

export default function Page() {
  return <CoursesSection />;
}
