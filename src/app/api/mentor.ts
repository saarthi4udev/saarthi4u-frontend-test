export interface Mentor {
  id?: number | string;
  name: string;
  profileImage: string;
  title: string;
  role: string;
  rating: number;
  totalReviews: number;
  description: string;
  qualifications: string;
  shortQualifications: string;
  experienceYears: number;
  studentsGuided: number;
  visible?: boolean;
}

const base = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = `${base}/mentor`;

export const getAllMentors = async (): Promise<Mentor[]> => {
  try {
    const res = await fetch(`${BASE_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch mentors from API: ${res.status}`);
      return [];
    }

    const data = await res.json();
    const list = data?.data ?? data ?? [];

    if (!Array.isArray(list)) {
      return [];
    }

    return list;
  } catch (error) {
    console.error("Error fetching mentors from API:", error);
    return [];
  }
};