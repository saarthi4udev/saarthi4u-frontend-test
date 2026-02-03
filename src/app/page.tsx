import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Payment from "@/components/Home/Payment";
import Benefit  from "@/components/Home/Benefit";
import Spend from "@/components/Home/Spend";
import Method from "@/components/Home/Method";
import Mobile from "@/components/Home/Mobile";
import Search from "@/components/Home/Search";
import Pricing from "@/components/Home/Pricing";
import Solution from "@/components/Home/Solution";
import DiscoverMore from "@/components/discovermore/DiscoverMore";
import EducationalPartners from "@/components/Educationpatner/EducationalPartners";
import LeadershipCorner from "@/components/LeadershipCorner/LeadershipCorner";

export const metadata: Metadata = {
  title: "Saarthi4u",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <DiscoverMore/>
      <EducationalPartners/>
      <LeadershipCorner/>
      
    </main>
  );
}
