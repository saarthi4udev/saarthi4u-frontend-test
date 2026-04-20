const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface HomeSectionData {
  id: string;
  header: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

interface HomeSectionApiResponse {
  data: {
    id: string;
    header: string;
    title: string;
    description: string;
    tags: string | string[];
    imageUrl: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export const getHomeSection = async (): Promise<HomeSectionData | null> => {
  try {
    const res = await fetch(`${BASE_URL}/home-section/all`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Home section API error:", res.status, errorText);
      return null;
    }

    const result: HomeSectionApiResponse = await res.json();

    const item = result?.data;

    if (!item) return null;

    let parsedTags: string[] = [];

    if (Array.isArray(item.tags)) {
      parsedTags = item.tags;
    } else if (typeof item.tags === "string") {
      try {
        parsedTags = JSON.parse(item.tags);
      } catch (error) {
        console.error("Failed to parse tags:", error);
        parsedTags = [];
      }
    }

    return {
      id: item.id,
      header: item.header,
      title: item.title,
      description: item.description,
      tags: parsedTags,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  } catch (error) {
    console.error("getHomeSection error:", error);
    return null;
  }
};