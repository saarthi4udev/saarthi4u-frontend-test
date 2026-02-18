export type College = {
  id: string;
  name: string;
  shortName?: string;
  logo: string; // image path
  location: string;
  city: string;
  rating: number; // 0-5
  reviews: number;
  type: "University" | "College" | "Institute";
  category?: "Govt." | "Private" | "Deemed";
  description: string; // Short 1-2 line description
  slug: string; // for routing
  featuredImage?: string;
};
