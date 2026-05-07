import ServicesView from "@/components/Services/ServicesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Personalized Career Guidance & Admission Counseling",
  description: "Saarthi4u offers comprehensive services including online career counseling, college selection guidance, and student future planning.",
};

const Services = () => {
  return (
    <>
      <ServicesView />
    </>
  );
};

export default Services;
