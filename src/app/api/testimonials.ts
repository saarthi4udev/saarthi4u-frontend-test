import type { Testimonial } from "@/types/testimonial";

const base = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = base + "/testimonial";

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const res = await fetch(`${BASE_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // important for fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch testimonials");
    }

    const data = await res.json();

    // adjust if your backend wraps response like { data: [...] }
    return data?.data || data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};