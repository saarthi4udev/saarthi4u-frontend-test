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
export const getCategoryContent = async (
  id: number,
  {
    page = 1,
    limit = 10,
    examPage = 1,
    examLimit = 5,
    blogPage = 1,
    blogLimit = 5,
    newsPage = 1,
    newsLimit = 5,
  } = {}
) => {
  try {
    const res = await api.get(`/category/content/${id}`, {
      params: {
        page,
        limit,
        examPage,
        examLimit,
        blogPage,
        blogLimit,
        newsPage,
        newsLimit,
      },
    });

    console.log("FULL RESPONSE:", res);
    console.log("DATA:", res.data);
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching category content:",
      error?.response?.data || error.message
    );
    throw error;
  }
};