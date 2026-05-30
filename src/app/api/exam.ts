const base = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = base + "/exam";

// Get all exams with pagination
export async function getAllExams(page = 1, limit = 1) {
  try {
    const res = await fetch(`${BASE_URL}/all?page=${page}&limit=${limit}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch exams from API (Status: ${res.status}). Returning fallback structure.`);
      return { data: [], pagination: {} };
    }

    const data = await res.json();

    return data; 
  } catch (error) {
    console.warn("API WARNING (getAllExams): Failed to query exams. Serving fallback structure instead.", error);
    return { data: [], pagination: {} };
  }
}

// Get exam by slug
export async function getExamBySlug(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/exam/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`Exam not found by slug: ${slug} (Status: ${res.status}). Returning null.`);
      return null;
    }

    const data = await res.json();

    return data?.data || null;
  } catch (error) {
    console.warn(`API WARNING (getExamBySlug): Failed to query exam by slug: ${slug}`, error);
    return null;
  }
}

/* ---------------- FORMAT FEE ---------------- */

export function formatFeeRange(fee: any) {
  if (!fee) return "N/A";

  if (typeof fee === "string") return fee;

  if (typeof fee === "number") return `₹${fee}`;

  return fee;
}

/* ---------------- UNIQUE FILTER VALUES ---------------- */

export function getUniqueExamFilters(exams: any[]) {
  const categories = new Set<string>();
  const levels = new Set<string>();
  const bodies = new Set<string>();
  const modes = new Set<string>();
  const frequencies = new Set<string>();
  const streams = new Set<string>();

  exams.forEach((exam) => {
    if (exam.category) categories.add(exam.category);
    if (exam.level) levels.add(exam.level);
    if (exam.conductingBody) bodies.add(exam.conductingBody);
    if (exam.examMode) modes.add(exam.examMode);
    if (exam.frequency) frequencies.add(exam.frequency);
    if (exam.stream) streams.add(exam.stream);
  });

  return {
    categories: Array.from(categories),
    levels: Array.from(levels),
    bodies: Array.from(bodies),
    modes: Array.from(modes),
    frequencies: Array.from(frequencies),
    streams: Array.from(streams),
  };
}