"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import SocialSignIn from "../SocialSignIn";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";

import { useAuth } from "@/app/context/AuthContext";
import { authApi } from "@/app/api/auth.api";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const auth = useAuth();
  const login = auth.login;
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, authLoading, router]);

  // Prevent flicker
  if (authLoading || isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authApi.login(email, password);
      await login(); // 🔥 refresh profile from cookie
      toast.success("Login successful 🎉");
      // ✅ redirect after short delay so toast is visible
      setTimeout(() => {
        router.push("/");
        globalThis.location.reload(); // reload to update auth state from cookie
      }, 800);
    } catch (err: any) {
      const message = err?.message || "Login failed";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="mb-10 text-center mx-auto inline-block max-w-40">
        <Logo />
      </div>

      <SocialSignIn />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border" />
        <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-dark">
          OR
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-5.5">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-transparent px-5 py-3"
          />
        </div>

        <div className="mb-5.5">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-transparent px-5 py-3"
          />
        </div>

        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-white disabled:opacity-60"
          >
            Sign In
            {loading && <Loader />}
          </button>
        </div>
      </form>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <Link href="/forgot-password" className="mb-2 inline-block text-base">
        Forget Password?
      </Link>

      <p className="text-body-secondary text-base">
        Not a member yet?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default Signin;
