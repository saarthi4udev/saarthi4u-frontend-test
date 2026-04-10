export interface Mentor {
  id?: string;
  name: string;
  logo: string;
  description: string;
  support: string;
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
      cache: "no-store", // ensures fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch mentors: ${res.status}`);
    }

    const data = await res.json();

    // Adjust based on API response structure
    return data?.data ?? data ?? [];
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
};