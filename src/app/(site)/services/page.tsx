import ServicesView from "@/components/Services/ServicesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Saarthi4u",
};

const Services = () => {
  return (
    <>
      <ServicesView />
    </>
  );
};

export default Services;
