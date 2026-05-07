import HomeClient from "@/components/Home/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saarthi4u | Career Counseling & College Admission Guidance India",
  description: "Empowering students with expert career counseling, college search, and admission guidance. Find the best online degree colleges and career options after 12th in India.",
};

export default function Home() {
  return (
    <main>
      <HomeClient />
    </main>
  );
}
