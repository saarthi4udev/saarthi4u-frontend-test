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
      ? `${scholarship.name} | College Scholarships & Financial Aid`
      : "Scholarship Details | Saarthi4u",
    description: scholarship?.overview || `Learn about ${scholarship?.name || 'this scholarship'} and how to apply. Expert financial aid and scholarship guidance at Saarthi4u.`,
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