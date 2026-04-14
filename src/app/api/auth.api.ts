  // src/lib/auth.api.ts
  import api from "./axios";

  /* ---------------- AUTH ---------------- */

  export const authApi = {
    register: (payload: {
      name: string;
      email: string;
      phone?: string;
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

    updateUser: (id: number, payload: any, imageFile?: File | null) => {
    const formData = new FormData();

    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    // ✅ These fields must NEVER be sent from profile update form
    const excludedKeys = ["role", "email", "password", "isActive"];

    Object.entries(payload).forEach(([key, value]) => {
      if (
        !excludedKeys.includes(key) &&   // ✅ block sensitive fields
        value !== undefined &&
        value !== null &&
        value !== "" &&
        String(value) !== "undefined" &&
        String(value) !== "null"
      ) {
        formData.append(key, String(value));
      }
    });

    return api.put(`/auth/updateUser/${id}`, formData, {
  headers: {
    "Content-Type": undefined,
  },
});
  },
  }
