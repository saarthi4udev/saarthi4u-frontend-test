"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import SocialSignIn from "../SocialSignIn";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";
import toast, { Toaster } from "react-hot-toast";
import AuthDialogContext from "@/app/context/AuthDialogContext";

const Signin = ({ signInOpen }: { signInOpen?: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authDialog = useContext(AuthDialogContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔥 important for cookies
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      toast.success("Signed in successfully");

      signInOpen?.(false);

      authDialog?.setIsSuccessDialogOpen(true);
      setTimeout(() => authDialog?.setIsSuccessDialogOpen(false), 1100);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);

      authDialog?.setIsFailedDialogOpen(true);
      setTimeout(() => authDialog?.setIsFailedDialogOpen(false), 1100);
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
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border"></span>
        <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-dark">
          OR
        </span>
        <Toaster />
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-5.5">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-border bg-transparent px-5 py-3"
          />
        </div>

        <div className="mb-5.5">
          <input
            type="password"
            required
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-transparent px-5 py-3"
          />
        </div>

        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-white"
          >
            Sign In
            {loading && <Loader />}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      <Link href="/" className="mb-2 inline-block text-base">
        Forget Password?
      </Link>

      <p className="text-body-secondary text-base">
        Not a member yet?{" "}
        <Link href="/" className="text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default Signin;
