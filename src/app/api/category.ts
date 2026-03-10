import api from "./axios";

/**
 * Get all categories
 */
export const getAllCategories = async () => {
  try {
    const res = await api.get("/category/all");
    return res.data.data;
  } catch (error: any) {
    console.error(
      "Error fetching categories:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Get category content by ID
 */
export const getCategoryContent = async (id: number) => {
  try {
    const res = await api.get(`/category/content/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching category content:",
      error?.response?.data || error.message
    );
    throw error;
  }
};