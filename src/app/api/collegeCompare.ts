import api from "./axios";

export async function compareCollegesByIds(collegeIds: string[]) {
  const payload = { collegeIds };

  console.log("Comparing colleges with IDs:", collegeIds);

  try {
    return await api.post("/college/compare", payload);
  } catch {
    return await api.post("/college/compare", payload);
  }
}
