// src/lib/auth.api.ts
import api from "./axios";

/* ---------------- AUTH ---------------- */

export const authApi = {
  register: (payload: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }) => api.post("/auth/register", payload),

  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  googleLogin: () => api.post("/auth/login/google"),

  loginWithPhone(token: string) {
    return api.post("/auth/phone", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },


  profile: () => api.get("/auth/profile"),

  logout: () => api.get("/auth/logout"),

  getAllUsers: (role?: "admin" | "user") =>
    api.get("/auth/all", { params: role ? { role } : {} }),

  updateUser: (id: number, payload: any) =>
    api.put(`/auth/updateUser/${id}`, payload),
};
