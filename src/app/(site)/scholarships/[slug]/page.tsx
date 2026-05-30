import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScholarshipBySlug } from "@/app/api/Scholarship";
import { getAllCollegeshomepage } from "@/app/api/colleges";
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

  let relatedColleges: any[] = [];
  try {
    const colResponse = await getAllCollegeshomepage();
    const allColleges = colResponse?.data || [];
    
    if (Array.isArray(allColleges)) {
      relatedColleges = allColleges.slice(0, 4).map((c: any) => ({
        ...c,
        category: c.Category?.name || "",
        established: c.establishedYear || null,
        location: [c.city, c.state].filter(Boolean).join(", "),
        logo: c.logo || "",
        type: c.type || "College"
      }));
    }
  } catch (err) {
    console.warn("Failed to retrieve related colleges for scholarship page:", err);
  }

  return (
    <ScholarshipDetailsView
      scholarship={scholarship}
      relatedColleges={relatedColleges}
    />
  );
}