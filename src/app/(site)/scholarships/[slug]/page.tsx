import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScholarshipBySlug } from "@/app/api/Scholarship";
import ScholarshipDetailsView from "@/components/Scholarships/ScholarshipDetailsView";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/* ---------------- SEO METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);

  return {
    title: scholarship
      ? `${scholarship.name} | Scholarships | Saarthi4u`
      : "Scholarship Details | Saarthi4u",
    description: scholarship?.overview || "Scholarship details",
  };
}

/* ---------------- PAGE ---------------- */

export default async function ScholarshipDetailsPage({ params }: Props) {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);

  if (!scholarship) {
    notFound();
  }

  // for now keep empty
  const relatedColleges: any[] = [];

  return (
    <ScholarshipDetailsView
      scholarship={scholarship}
      relatedColleges={relatedColleges}
    />
  );
}