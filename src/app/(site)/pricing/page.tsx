import Pricing from "@/components/Home/Pricing";
import HeroSub from "@/components/SharedComponents/HeroSub";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Guidance Packages | Affordable Online Counseling India",
  description: "Choose from our range of affordable career counseling and admission guidance packages. Invest in your future with Saarthi4u.",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/pricing", text: "Pricing" },
  ];
  return (
    <>
      <HeroSub
        title="Pricing"
        description="Whether you're an individual, a small team, or a growing enterprise, we have a plan that aligns perfectly with your goals."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Pricing />
    </>
  );
};

export default page;
