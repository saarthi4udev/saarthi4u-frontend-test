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

// ✅ Correct base URL
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

// ✅ API endpoint
const PARTNER_API = `${BASE_URL}/partner`;

export const getAllPartners = async (): Promise<Partner[]> => {
  try {
    console.log("BASE_URL:", BASE_URL);
    console.log("Fetching from:", `${PARTNER_API}/all`);
      
    const res = await fetch(`${PARTNER_API}/all`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", res.status, errorText);
      throw new Error("Failed to fetch partners");
    }

    const result: ApiResponse = await res.json();

    // return only visible partners
    return result.data.filter((partner) => partner.visible);
    
  } catch (error) {
    console.error("Partner API error:", error);
    return [];
  }
};