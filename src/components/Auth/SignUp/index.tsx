"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";
import { authApi } from "@/app/api/auth.api";
import { useAuth } from "@/app/context/AuthContext";

const SignUp = () => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

    try {
      await authApi.register({
        name,
        email,
        password,
        role: "user", // always user
      });

      toast.success("Account created successfully 🎉");

      //redirect after short delay so toast is visible
      setTimeout(() => {
        router.push("/");
        globalThis.location.reload(); // reload to update auth state from cookie
      }, 800);
    }
    catch (err: any) {
      const message = err?.message || "Registration failed";  
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-40">
        <Logo />
      </div>

      <SocialSignUp />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border" />
        <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-midnight_text">
          OR
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-5.5">
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-transparent px-5 py-3"
          />
        </div>

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
            Sign Up
            {loading && <Loader />}
          </button>
        </div>
      </form>

      <p className="text-body-secondary mb-4 text-base">
        By creating an account you agree to our{" "}
        <a href="/#" className="text-primary hover:underline">
          Privacy
        </a>{" "}
        &{" "}
        <a href="/#" className="text-primary hover:underline">
          Policy
        </a>
      </p>

      <p className="text-body-secondary text-base">
        Already have an account?
        <Link href="/signin" className="pl-2 text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUp;
