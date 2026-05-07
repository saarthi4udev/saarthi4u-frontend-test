import NationalColleges from "@/components/Colleges/NationalColleges";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Search Engine | Top Colleges in India & College Rankings",
  description: "Use our college search engine to find and compare top colleges in India. Get expert guidance on college admission and course selection.",
};

export default function Page() {
  return <NationalColleges />;
}
