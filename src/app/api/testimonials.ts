import type { Testimonial } from "@/types/testimonial";

const base = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = base + "/testimonial";

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const res = await fetch(`${BASE_URL}/all?page=1&limit=1000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // important for fresh data
    });

    if (!res.ok) {
      console.warn(`Failed to fetch testimonials from API (Status: ${res.status}). Returning fallback empty list.`);
      return [];
    }

    const data = await res.json();

    // adjust if your backend wraps response like { data: [...] }
    return data?.data || data || [];
  } catch (error) {
    console.warn("API WARNING (getAllTestimonials): Failed to query testimonials. Serving fallback empty list instead.", error);
    return [];
  }
};