// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 🔥 VERY IMPORTANT (cookies)
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data;

    return Promise.reject({
      message:
        data?.errors?.[0]?.msg ||
        data?.error ||
        data?.message ||
        "Something went wrong",
      errors: data?.errors || null,
      status: error?.response?.status,
    });
  }
);


export default api;
