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
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch carousel data");
    }

    const result: CarouselApiResponse = await res.json();

    if (!result?.data || !Array.isArray(result.data)) {
      return [];
    }

    return result.data
      .filter((item) => item.isActive)
      .sort((a, b) => a.rank - b.rank);
  } catch (error) {
    console.error("Carousel API error:", error);
    return [];
  }
};