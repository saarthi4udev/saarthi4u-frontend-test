const base = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = base + "/exam";

// Get all exams with pagination
export async function getAllExams(page = 1, limit = 1) {
  try {
    const res = await fetch(`${BASE_URL}/all?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch exams");
    }

    const data = await res.json();

    return data; 
    // expect:
    // {
    //   data: [],
    //   pagination: { page, limit, totalPages, totalItems }
    // }

  } catch (error) {
    console.error("Error fetching exams:", error);
    return { data: [], pagination: {} };
  }
}

// Get exam by slug
export async function getExamBySlug(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/exam/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Exam not found");
    }

    const data = await res.json();

    return data?.data || null;
  } catch (error) {
    console.error("Error fetching exam:", error);
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