import { Metadata } from "next";
import NewsList from "@/components/News/NewsList";

export const metadata: Metadata = {
  title: "Latest Education News | College Admission & Career Trends 2026",
  description: "Stay informed with the latest news on education, college admissions, and career trends in India.",
};

export default function NewsPage() {
  return <NewsList />;
}
