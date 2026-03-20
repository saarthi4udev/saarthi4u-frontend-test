const base = process.env.NEXT_PUBLIC_API_URL;

const BASE_URL = base + "/scholarship";

/* ---------------- GET ALL SCHOLARSHIPS ---------------- */

export async function getAllScholarships(page = 1, limit = 6) {
  try {
    const res = await fetch(`${BASE_URL}/all?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch scholarships");
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    return { data: [], pagination: {} };
  }
}

/* ---------------- GET SCHOLARSHIP BY SLUG ---------------- */

export async function getScholarshipBySlug(slug: string) {
  const scholarships = await getAllScholarships();

  const scholarship = scholarships.find(
    (item: any) => item.slug === slug
  );

  return scholarship || null;
}