import FAQClient from "./FAQClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Saarthi4u Education",
  description: "Find clear answers to all your questions regarding career guidance, college admissions, course comparisons, branch counseling, and expert mentorship at Saarthi4u.",
};

export default function FAQPage() {
  return <FAQClient />;
}
