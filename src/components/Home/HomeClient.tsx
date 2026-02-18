"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

import Hero from "@/components/Home/Hero";
import DiscoverMore from "@/components/discovermore/DiscoverMore";
import EducationalPartners from "@/components/Educationpatner/EducationalPartners";
import LeadershipCorner from "@/components/LeadershipCorner/LeadershipCorner";
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
      <Hero />
      <DiscoverMore />
      <EducationalPartners />
      <LeadershipCorner />

      {showDialog && (
        <UpdateProfileDialog onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}
