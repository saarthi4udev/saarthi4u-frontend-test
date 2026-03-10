import api from "./axios";

export async function compareCollegesByIds(collegeIds: string[]) {
  const payload = { collegeIds };

  try {
    return await api.post("/colleges/compare", payload);
  } catch {
    return await api.post("/college/compare", payload);
  }
}
