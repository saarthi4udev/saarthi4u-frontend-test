"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/auth.api";
import api from "../api/axios";

type User = {
  age: any;
  location: string;
  qualification: string;
  stream: string;
  cgpa: any;
  institute: string;
  careerField: string;
  careerRole: string;
  hobbies: string;
  shortTermGoal: string;
  longTermGoal: string;
  expectedSalary: any;
  preferredLocation: string;
  learningStyle: string;
  budget: any;
  profileImage: any;
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Check auth on app load (cookie-based)
  const loadProfile = async () => {
    try {
      const res = await authApi.profile();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const login = async () => {
    await loadProfile(); // after login, fetch profile
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      // even if API fails, continue cleanup
      console.error("Logout API failed", err);
    } finally {
      // 1️⃣ Clear auth state
      setUser(null);

      // 2️⃣ Clear tokens / storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      sessionStorage.clear();

      // 3️⃣ Clear axios headers
      delete api.defaults.headers.common["Authorization"];

      // 4️⃣ Optional: clear cookies (if you use any)
      document.cookie
        .split(";")
        .forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook (important)
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
