import InternationalColleges from "@/components/Colleges/InternationalColleges";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad | International College Rankings & Admission Guidance",
  description: "Explore top international colleges and universities. Get expert counseling for overseas education and global career opportunities.",
};

export default function Page() {
  return <InternationalColleges />;
}
