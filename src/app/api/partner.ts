// src/app/api/partner.ts

export type Partner = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  services: string;
  tag: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type ApiResponse = {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: Partner[];
};

// ✅ BASE URL from .env
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ API endpoint
const PARTNER_API = `${BASE_URL}/partner`;

/* =========================
   GET ALL PARTNERS (PAGINATED)
========================= */
export const getAllPartners = async (
  page: number = 1,
  limit: number = 8,
  search: string = ""
): Promise<{
  data: Partner[];
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const url = `${PARTNER_API}/all?page=${page}&limit=${limit}&search=${search}`;

    console.log("BASE_URL:", BASE_URL);
    console.log("Fetching:", url);

    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", res.status, errorText);
      throw new Error("Failed to fetch partners");
    }

    const result: ApiResponse = await res.json();

    return {
      data: result.data.filter((partner) => partner.visible),
      totalPages: result.totalPages,
      currentPage: result.page,
    };

  } catch (error) {
    console.error("Partner API error:", error);

    return {
      data: [],
      totalPages: 1,
      currentPage: 1,
    };
  }
};