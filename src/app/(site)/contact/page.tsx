import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Saarthi4u",
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
