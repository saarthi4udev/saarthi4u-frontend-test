"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import SocialSignUp from "../SocialSignUp";
import Loader from "@/components/Common/Loader";
import { authApi } from "@/app/api/auth.api";
import { useAuth } from "@/app/context/AuthContext";

type SignUpProps = {
  onSwitchToSignin?: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignin }) => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
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

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept Terms and Privacy Policy to continue.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await authApi.register({
        name: fullName.trim(),
        email,
        phone: phoneNumber,
        password,
        role: "user", // always user
      });

      toast.success("Account created successfully 🎉");

      //redirect after short delay so toast is visible
      setTimeout(() => {
        router.push("/");
        globalThis.location.reload(); // reload to update auth state from cookie
      }, 800);
    } catch (err: any) {
      const message = err?.message || "Registration failed";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SocialSignUp />

      <span className="relative block text-center">
        <span className="absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border" />
        <span className="relative z-10 inline-block bg-white px-3 text-14 font-medium text-muted dark:bg-darkheader dark:text-foottext">
          or register with email
        </span>
      </span>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-14 font-semibold text-midnight_text dark:text-white"
          >
            Full Name
          </label>
          <div className="relative">
            <Icon
              icon="solar:user-outline"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted"
            />
            <input
              id="signup-name"
              type="text"
              placeholder="Enter full name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-14 transition-all duration-200 focus:border-primary dark:border-dark_border dark:bg-dark_b dark:text-white"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-14 font-semibold text-midnight_text dark:text-white"
            >
              Email
            </label>
            <div className="relative">
              <Icon
                icon="solar:letter-outline"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted"
              />
              <input
                id="signup-email"
                type="email"
                placeholder="name@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-14 transition-all duration-200 focus:border-primary dark:border-dark_border dark:bg-dark_b dark:text-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-phone"
              className="mb-2 block text-14 font-semibold text-midnight_text dark:text-white"
            >
              Phone Number
            </label>
            <div className="relative">
              <Icon
                icon="solar:phone-linear"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted"
              />
              <input
                id="signup-phone"
                type="tel"
                placeholder="10-digit number"
                required
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
                }
                className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-14 transition-all duration-200 focus:border-primary dark:border-dark_border dark:bg-dark_b dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="signup-password"
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
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
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

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="mb-2 block text-14 font-semibold text-midnight_text dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Icon
                icon="solar:shield-user-outline"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted"
              />
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-12 text-14 transition-all duration-200 focus:border-primary dark:border-dark_border dark:bg-dark_b dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-colors duration-200 hover:text-primary"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <Icon
                  icon={
                    showConfirmPassword
                      ? "solar:eye-closed-linear"
                      : "solar:eye-linear"
                  }
                  className="text-xl"
                />
              </button>
            </div>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-border/80 bg-hero-bg/60 px-3 py-2.5 text-14 text-midnight_text dark:border-dark_border/80 dark:bg-dark_b/70 dark:text-white">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-semibold text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-16 font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-60"
        >
          Create Account
          {loading && <Loader />}
        </button>
      </form>

      {error && (
        <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-14 text-danger">
          {error}
        </p>
      )}

      <p className="text-center text-14 text-muted dark:text-foottext">
        Already have an account?{" "}
        {onSwitchToSignin ? (
          <button
            type="button"
            onClick={onSwitchToSignin}
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </button>
        ) : (
          <Link href="/signin" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        )}
      </p>

      <div className="rounded-xl border border-border/80 bg-hero-bg/60 p-3 dark:border-dark_border/80 dark:bg-dark_b/70">
        <p className="text-center text-13 text-muted dark:text-foottext">
          By creating an account, you can save preferences and get personalized
          guidance faster.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
