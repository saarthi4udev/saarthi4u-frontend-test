"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import SocialSignIn from "../SocialSignIn";
import Loader from "@/components/Common/Loader";

import { useAuth } from "@/app/context/AuthContext";
import { authApi } from "@/app/api/auth.api";
import { useRouter } from "next/navigation";

type SigninProps = {
  onSwitchToSignup?: () => void;
};

const Signin: React.FC<SigninProps> = ({ onSwitchToSignup }) => {
  const router = useRouter();
  const auth = useAuth();
  const login = auth.login;
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rememberedIdentifier = localStorage.getItem("rememberedIdentifier");
    if (rememberedIdentifier) {
      setEmailOrUsername(rememberedIdentifier);
      setRememberMe(true);
    }
  }, []);

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

    if (!emailOrUsername.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authApi.login(emailOrUsername.trim(), password);

      if (rememberMe) {
        localStorage.setItem("rememberedIdentifier", emailOrUsername.trim());
      } else {
        localStorage.removeItem("rememberedIdentifier");
      }

      await login(); // 🔥 refresh profile from cookie
      toast.success("Login successful 🎉");

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
    <div className="space-y-6">
      <SocialSignIn />

      <span className="relative block text-center">
        <span className="absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border" />
        <span className="relative z-10 inline-block bg-white px-3 text-14 font-medium text-muted dark:bg-darkheader dark:text-foottext">
          or continue with email
        </span>
      </span>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="signin-identifier"
            className="mb-2 block text-14 font-semibold text-midnight_text dark:text-white"
          >
            Email or Username
          </label>
          <div className="relative">
            <Icon
              icon="solar:user-outline"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted"
            />
            <input
              id="signin-identifier"
              type="text"
              placeholder="Enter email or username"
              required
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-14 transition-all duration-200 focus:border-primary dark:border-dark_border dark:bg-dark_b dark:text-white"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="mb-2 block text-14 font-semibold text-midnight_text dark:text-white"
          >
            Password
          </label>
          <div className="relative">
            <Icon
              icon="solar:lock-password-outline"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted"
            />
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-12 text-14 transition-all duration-200 focus:border-primary dark:border-dark_border dark:bg-dark_b dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-colors duration-200 hover:text-primary"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon
                icon={
                  showPassword
                    ? "solar:eye-closed-linear"
                    : "solar:eye-linear"
                }
                className="text-xl"
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-14 text-midnight_text dark:text-white">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Remember me
          </label>

          <Link
            href="/help"
            className="text-14 font-medium text-primary transition-opacity duration-200 hover:opacity-80"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-16 font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-60"
        >
          Sign In
          {loading && <Loader />}
        </button>
      </form>

      {error && (
        <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-14 text-danger">
          {error}
        </p>
      )}

      <p className="text-center text-14 text-muted dark:text-foottext">
        Don&apos;t have an account?{" "}
        {onSwitchToSignup ? (
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-primary hover:underline"
          >
            Create one
          </button>
        ) : (
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Create one
          </Link>
        )}
      </p>

      <div className="rounded-xl border border-border/80 bg-hero-bg/60 p-3 dark:border-dark_border/80 dark:bg-dark_b/70">
        <p className="text-center text-13 text-muted dark:text-foottext">
          Secure login protected with encrypted authentication.
        </p>
      </div>
    </div>
  );
};

export default Signin;
