"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

import Hero from "@/components/Home/Hero";
import DiscoverMore from "@/components/discovermore/DiscoverMore";
import ExploreColleges from "@/components/Home/ExploreColleges";
import CareerCoaches from "@/components/Home/CareerCoaches";
import EducationalPartners from "@/components/Educationpatner/EducationalPartners";
import ResultsPromo from "@/components/Home/ResultsPromo";
import Testimonials from "@/components/Home/Testimonials";
import LeadershipCorner from "@/components/LeadershipCorner/LeadershipCorner";
import InstagramSection from "@/components/Instagram/InstagramSection";
import UpdateProfileDialog from "./UpdateProfileDialog";

export default function HomeClient() {
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (user?.name === "Phone User") {
      setShowDialog(true);
    }
  }, [user]);

  return (
    <>
      <div className="site-reveal"><Hero /></div>
      <div className="site-reveal"><DiscoverMore /></div>
      <div className="site-reveal"><CareerCoaches /></div>
      <div className="site-reveal"><ExploreColleges /></div>
      <div className="site-reveal"><EducationalPartners /></div>
      <div className="site-reveal"><ResultsPromo /></div>
      <div className="site-reveal"><Testimonials /></div>
      <div className="site-reveal"><LeadershipCorner /></div>
      <div className="site-reveal"><InstagramSection /></div>

      {showDialog && (
        <UpdateProfileDialog onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}
