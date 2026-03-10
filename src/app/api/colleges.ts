// export async function getAllColleges() {
//   try {
//     const res = await fetch("https://saarthi4u-backend-test.onrender.com/api/college/all");

//     const json = await res.json();

//     return json.data || [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

const BASE_URL = "https://saarthi4u-backend-test.onrender.com/api";

async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data ?? data;
  } catch (err) {
    console.error("API ERROR:", err);
    return null;
  }
}

/* COLLEGE */

export const getAllColleges = () => fetchAPI("/college/all");

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

  const courses = await getCoursesByCollege(collegeId);

  if (!courses || courses.length === 0) return [];

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

// /* GENERIC FETCH */

// async function fetchData(url: string) {
//   try {
//     const res = await fetch(url, { cache: "no-store" });

//     if (!res.ok) return [];

//     const json = await res.json();

//     return json?.data || [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// /* COLLEGES */

// export async function getAllColleges() {
//   return fetchData(`/api/college/all`);
// }

// export async function getCollegeBySlug(slug: string) {
//   try {
//     const res = await fetch('/api/college/${slug}', {
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const json = await res.json();

//     return json?.data ?? null;
//   } catch {
//     return null;
//   }
// }

// /* COURSES */

// export async function getCoursesByCollege(collegeId: number) {
//   return fetchData('api/course/college/${collegeId}');
// }

// /* FEES */

// export async function getFeesByCourse(courseId: number) {
//   return fetchData('/api/fee/course/${courseId}');
// }

// /* ADMISSIONS */

// export async function getAdmissionsByCollege(collegeId: number) {
//   return fetchData('/api/admission/college/${collegeId}');
// }

// /* CUTOFF */

// export async function getCutoffsByCollege(collegeId: number) {
//   return fetchData('/api/cutoff/college/${collegeId}');
// }

// /* FACILITIES */

// export async function getFacilitiesByCollege(collegeId: number) {
//   return fetchData('/api/facility/college/${collegeId}');
// }

// /* FACULTY */

// export async function getFacultiesByCollege(collegeId: number) {
//   return fetchData('/api/faculty/college/${collegeId}');
// }

// /* FAQ */

// export async function getFAQsByCollege(collegeId: number) {
//   return fetchData('/api/faq/college/${collegeId}');
// }

// /* GALLERY */

// export async function getGalleryByCollege(collegeId: number) {
//   return fetchData('/api/gallery/college/${collegeId}');
// }

// /* REVIEWS */

// export async function getReviewsByCollege(collegeId: number) {
//   return fetchData('/api/review/college/${collegeId}');
// }

// /* PLACEMENTS */

// export async function getPlacementsByCollege(collegeId: number) {
//   return fetchData('/api/placement/college/${collegeId}');
// }

// /* RECRUITERS */

// export async function getRecruitersByCollege(collegeId: number) {
//   return fetchData('/api/recruiter/college/${collegeId}')}