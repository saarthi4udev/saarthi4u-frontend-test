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

    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`Failed to fetch partners from API (Status: ${res.status}). Body: ${errorText}. Returning fallback empty structure.`);
      return {
        data: [],
        totalPages: 1,
        currentPage: 1,
      };
    }

    const result: ApiResponse = await res.json();

    return {
      data: (result.data || []).filter((partner) => partner.visible),
      totalPages: result.totalPages || 1,
      currentPage: result.page || 1,
    };

  } catch (error) {
    console.warn("API WARNING (getAllPartners): Failed to query partners. Serving fallback empty structure instead.", error);

    return {
      data: [],
      totalPages: 1,
      currentPage: 1,
    };
  }
};