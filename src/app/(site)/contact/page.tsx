import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Saarthi4u | Online Career Counseling & Admission Support",
  description: "Get in touch with Saarthi4u for expert career guidance and college admission support. Our team of mentors is here to help you solve career confusion.",
};

const page = () => {
  return (
    <>
      <ContactInfo />
      <ContactForm />
      <Location />
    </>
  );
};

export default page;
