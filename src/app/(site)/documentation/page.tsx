import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation & Features | Saarthi4u Platform Guide",
  description: "Explore the features and documentation of Saarthi4u, your comprehensive platform for career guidance and college admissions.",
};

export default function Page() {
  return (
    <>
      <Documentation />
    </>
  );
}
