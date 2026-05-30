"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import dynamic from "next/dynamic";

// Above the fold critical components
import Hero from "@/components/Home/Hero";
import PromoSection from "@/components/Home/Promo";
import CollegesAdBanner from "@/components/Home/CollegesAdBanner";

// Lazy load non-critical / lower page components to reduce initial page weight
const DiscoverMore = dynamic(() => import("@/components/discovermore/DiscoverMore"), { ssr: false });
const ExploreColleges = dynamic(() => import("@/components/Home/ExploreColleges"), { ssr: false });
const CareerCoaches = dynamic(() => import("@/components/Home/CareerCoaches"), { ssr: false });
const EducationalPartners = dynamic(() => import("@/components/Educationpatner/EducationalPartners"), { ssr: false });
const ResultsPromo = dynamic(() => import("@/components/Home/ResultsPromo"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Home/Testimonials"), { ssr: false });
const LeadershipCorner = dynamic(() => import("@/components/LeadershipCorner/LeadershipCorner"), { ssr: false });
const YoutubeSection = dynamic(() => import("@/components/Youtube/YoutubeSection"), { ssr: false });
const InstagramSection = dynamic(() => import("@/components/Instagram/InstagramSection"), { ssr: false });
const UpdateProfileDialog = dynamic(() => import("./UpdateProfileDialog"), { ssr: false });

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
      <div className="site-reveal"><PromoSection /></div>
      <div className="site-reveal"><CollegesAdBanner /></div>
      <div className="site-reveal"><ExploreColleges /></div>
      <div className="site-reveal"><DiscoverMore /></div>
      <div className="site-reveal"><CareerCoaches /></div>
      <div className="site-reveal"><EducationalPartners /></div>
      <div className="site-reveal"><ResultsPromo /></div>
      <div className="site-reveal"><Testimonials /></div>
      <div className="site-reveal"><LeadershipCorner /></div>
      <div className="site-reveal"><YoutubeSection /></div>
      <div className="site-reveal"><InstagramSection /></div>

      {showDialog && (
        <UpdateProfileDialog onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}
