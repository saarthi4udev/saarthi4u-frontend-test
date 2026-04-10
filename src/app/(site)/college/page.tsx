import NationalColleges from "@/components/Colleges/NationalColleges";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colleges | Saarthi4u",
};

export default function Page() {
  return <NationalColleges />;
}
