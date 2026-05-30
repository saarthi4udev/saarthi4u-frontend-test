const base = process.env.NEXT_PUBLIC_API_URL;

const BASE_URL = base + "/Scholarship";

/* ---------------- GET ALL SCHOLARSHIPS ---------------- */

export async function getAllScholarships(page = 1, limit = 6) {
  try {
    const res = await fetch(`${BASE_URL}/all?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Failed to fetch scholarships from API (Status: ${res.status}). Returning fallback empty structure.`);
      return { data: [], pagination: {} };
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.warn("API WARNING (getAllScholarships): Failed to query scholarships. Serving fallback empty structure instead.", error);
    return { data: [], pagination: {} };
  }
}

/* ---------------- GET SCHOLARSHIP BY SLUG ---------------- */

export async function getScholarshipBySlug(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/Scholarship/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Scholarship not found by slug: ${slug} (Status: ${res.status}). Returning null.`);
      return null;
    }

    const data = await res.json();

    return data?.data || null;
  } catch (error) {
    console.warn(`API WARNING (getScholarshipBySlug): Failed to query scholarship by slug: ${slug}`, error);
    return null;
  }
}