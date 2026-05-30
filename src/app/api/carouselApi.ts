const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface CarouselItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  rank: number;
  isActive: boolean;
}

interface CarouselApiResponse {
  data: CarouselItem[];
}

export const getAllCarouselImages = async (): Promise<CarouselItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/carousel/all`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch carousel data from API (Status: ${res.status}). Returning fallback empty list.`);
      return [];
    }

    const result: CarouselApiResponse = await res.json();

    if (!result?.data || !Array.isArray(result.data)) {
      return [];
    }

    return result.data
      .filter((item) => item.isActive)
      .sort((a, b) => a.rank - b.rank);
  } catch (error) {
    console.warn("API WARNING (getAllCarouselImages): Failed to query carousel data. Serving fallback empty list instead.", error);
    return [];
  }
};