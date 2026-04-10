import InternationalColleges from "@/components/Colleges/InternationalColleges";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Colleges | Saarthi4u",
  description: "Explore top international colleges and universities worldwide. Study abroad at world-class institutions.",
};

export default function Page() {
  return <InternationalColleges />;
}
