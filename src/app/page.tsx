import HomeClient from "@/components/Home/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saarthi4u",
};

export default function Home() {
  return (
    <main>
      <HomeClient />
    </main>
  );
}
