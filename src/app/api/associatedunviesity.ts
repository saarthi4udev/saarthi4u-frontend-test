// services/universityApi.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface University {
  id: string;
  name: string;
  pdfUrl: string;
}

export const getAllUniversities = async (): Promise<University[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}/associate-university/all`
    );

    console.log(res)
    const data = await res.json();

    return data?.data?.map((item: any) => ({
      id: item.id,
      name: item.name,
      pdfUrl: item.pdfUrl,
    })) || [];
  } catch (error) {
    console.error("University API error:", error);
    return [];
  }
};