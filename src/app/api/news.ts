// api/news.ts

const base = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = base + "/news";
const CATEGORY_URL = base + "/category";

export interface ApiNewsItem {
  id: string;
  title: string;
  summary: string;
  slug: string;
  categoryId: number;
  publishedAt: string;
  isBreaking: boolean;
}

export interface ApiResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  data: ApiNewsItem[];
}

export interface UiNewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedOn: string;
  isBreaking: boolean;
  slug: string;
}

/* ---------------- FORMAT DATE ---------------- */

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* ---------------- FETCH CATEGORY ---------------- */

async function fetchCategory(categoryId: number): Promise<string> {
  try {
    const res = await fetch(
      `${CATEGORY_URL}/category/${categoryId}`,
      { cache: "force-cache" }
    );

    if (!res.ok) return "General";

    const data = await res.json();
    return data?.data?.name || "General";
  } catch (error) {
    console.error("Error fetching category:", error);
    return "General";
  }
}

/* ---------------- CATEGORY MAP ---------------- */

async function getCategoryMap(categoryIds: number[]) {
  const uniqueIds = [...new Set(categoryIds)];

  const entries = await Promise.all(
    uniqueIds.map(async (id) => {
      const name = await fetchCategory(id);
      return [id, name] as [number, string];
    })
  );

  return Object.fromEntries(entries);
}

/* ---------------- GET NEWS ---------------- */

export async function getAllNews(page = 1, limit = 5) {
  try {
    // Ask the backend to return newest first. We pass the common parameter
    // shapes (sortBy/order, sort=-field, order=desc) so the API picks up
    // whichever it understands; unknown params are ignored.
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortBy: "publishedAt",
      order: "desc",
      sort: "-publishedAt",
    });

    const res = await fetch(`${BASE_URL}/all?${query.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data: ApiResponse = await res.json();

    // Defensive client-side sort: guarantees the items on the current page
    // are newest-first even if the backend ignored our sort hints.
    const sortedRaw = [...data.data].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

    const categoryIds = sortedRaw.map((item) => item.categoryId);

    const categoryMap = await getCategoryMap(categoryIds);

    const transformed: UiNewsItem[] = sortedRaw.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.summary,
      category: categoryMap[item.categoryId] || "General",
      publishedOn: formatDate(item.publishedAt),
      isBreaking: item.isBreaking,
    }));

    return {
      ...data,
      data: transformed,
    };

  } catch (error) {
    console.error("Error fetching news:", error);
    return { data: [], total: 0, currentPage: 1, totalPages: 1 };
  }
}