const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();

    return json?.data ?? null;

  } catch (err) {
    console.error("API ERROR:", err);
    return null;
  }
}

/* COLLEGE */

// export const getAllColleges = () => fetchAPI("/college/all");
export const getAllColleges = async (page: number = 1, limit: number = 8) => {
  try {
    const res = await fetch(`${BASE_URL}/college/all?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();

    // ✅ return FULL response (no sanitization)
    return json;

  } catch (err) {
    console.error("API ERROR:", err);
    return null;
  }
};


export const getAllCollegeshomepage = async () => {
  try {
    const res = await fetch(`${BASE_URL}/college/all`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();

    // ✅ return FULL response (no sanitization)
    return json;

  } catch (err) {
    console.error("API ERROR:", err);
    return null;
  }
};


export const getCollegeCount = async () => {
  try {
    const res = await fetch(`${BASE_URL}/college/count`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch college stats");
    }

    const json = await res.json();

    return {
      total: json?.data?.total || 0,
      universities: json?.data?.universities || 0,
      colleges: json?.data?.colleges || 0,
    };
  } catch (err) {
    console.error("API ERROR:", err);

    return {
      total: 0,
      universities: 0,
      colleges: 0,
    };
  }
};


export const getCollegeBySlug = (slug: string) =>
  fetchAPI(`/college/${slug}`);


/* COURSES */

export const getCoursesByCollege = (collegeId: number) =>
  fetchAPI(`/course/college/${collegeId}`);


/* FEES */

export const getFeesByCourse = (courseId: number) =>
  fetchAPI(`/fee/course/${courseId}`);


/* ADMISSIONS */

export const getAdmissionsByCollege = (collegeId: number) =>
  fetchAPI(`/admission/college/${collegeId}`);


/* CUTOFFS */

export const getCutoffsByCollege = (collegeId: number) =>
  fetchAPI(`/cutoff/college/${collegeId}`);


/* FACILITIES */

export const getFacilitiesByCollege = (collegeId: number) =>
  fetchAPI(`/facility/college/${collegeId}`);


/* FACULTIES */

export const getFacultiesByCollege = (collegeId: number) =>
  fetchAPI(`/faculty/college/${collegeId}`);


/* FAQ */

export const getFAQsByCollege = (collegeId: number) =>
  fetchAPI(`/faq/college/${collegeId}`);




/* ---------------- COURSES + FEES JOIN ---------------- */

export const getCoursesWithFees = async (collegeId: number) => {

  const response = await getCoursesByCollege(collegeId);
  const courses = response?.data?.Courses || [];

  if (!Array.isArray(courses) || courses.length === 0) return [];

  const coursesWithFees = await Promise.all(
    courses.map(async (course: any) => {
      const fees = await getFeesByCourse(course.id);

      return {
        ...course,
        fees: fees || [],
      };
    })
  );

  return coursesWithFees;
};


/* GALLERY */

export const getGalleryByCollege = (collegeId: number) =>
  fetchAPI(`/gallery/college/${collegeId}`);


/* REVIEWS */

export const getReviewsByCollege = (collegeId: number) =>
  fetchAPI(`/review/college/${collegeId}`);


/* PLACEMENTS */

export const getPlacementsByCollege = (collegeId: number) =>
  fetchAPI(`/placement/college/${collegeId}`);


/* RECRUITERS */

export const getRecruitersByCollege = (collegeId: number) =>
  fetchAPI(`/recruiter/college/${collegeId}`);


export const getAllInternationalColleges = async (page: number = 1, limit: number = 8) => {
  try {
    const res = await fetch(`${BASE_URL}/international/all?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();

    return json; // ✅ same as getAllColleges

  } catch (err) {
    console.error("API ERROR:", err);
    return null;
  }
};