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

export const getAllMentors = async (): Promise<Mentor[]> => {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/mentor`;

  try {
    const res = await fetch(
      `${BASE_URL}/all?page=1&limit=100`
    );

    const data = await res.json();

    console.log("Mentor API Response:", data);

    return data?.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};