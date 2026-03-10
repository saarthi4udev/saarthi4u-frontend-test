"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import Logo from "@/components/Layout/Header/Logo";
import Signin from "./SignIn";
import SignUp from "./SignUp";

type AuthUnifiedProps = {
  initialMode?: "signin" | "signup";
};

const AuthUnified: React.FC<AuthUnifiedProps> = ({ initialMode = "signin" }) => {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const isSignIn = mode === "signin";

  const content = useMemo(() => {
    if (isSignIn) {
      return {
        title: "Welcome back",
        subtitle: "Sign in to continue your college and course journey.",
      };
    }

    return {
      title: "Create your account",
      subtitle: "Join Saarthi4U and get personalized education guidance.",
    };
  }, [isSignIn]);

  return (
    <section className="relative overflow-hidden bg-hero-bg px-4 py-10 dark:bg-darkmode sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(47,115,242,0.12),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(47,115,242,0.10),transparent_32%)]" />

      <div className="container relative mx-auto">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[1.75rem] border border-border/80 bg-white shadow-[0_20px_80px_rgba(16,45,71,0.12)] dark:border-dark_border/80 dark:bg-darkheader lg:grid-cols-[1.02fr_1fr]">
          <div className="relative hidden border-r border-border/70 bg-gradient-to-b from-hero-bg via-white to-hero-bg/60 p-10 dark:border-dark_border/70 dark:from-dark_b dark:via-darkheader dark:to-dark_b lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-10 inline-block">
                <Logo />
              </div>

              <h2 className="mb-4 text-35 font-bold leading-tight text-midnight_text dark:text-white">
                Learn. Compare. Choose.
              </h2>
              <p className="max-w-md text-16 text-muted dark:text-foottext">
                Saarthi4U helps students explore colleges, courses, exams, and
                scholarships in one seamless platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/80 bg-white/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-dark_border/70 dark:bg-darkheader/70">
                <Icon
                  icon="solar:verified-check-bold"
                  className="mb-2 text-2xl text-primary"
                />
                <p className="text-14 font-semibold text-midnight_text dark:text-white">
                  Secure Authentication
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-white/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-dark_border/70 dark:bg-darkheader/70">
                <Icon icon="solar:bolt-bold" className="mb-2 text-2xl text-primary" />
                <p className="text-14 font-semibold text-midnight_text dark:text-white">
                  Fast Onboarding
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-7 lg:hidden">
              <Logo />
            </div>

            <div className="mb-7 rounded-full border border-border/80 bg-hero-bg/60 p-1 dark:border-dark_border/80 dark:bg-dark_b/80">
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`flex h-10 items-center justify-center rounded-full text-14 font-semibold transition-all duration-300 ${
                    isSignIn
                      ? "bg-primary text-white shadow-sm"
                      : "text-midnight_text hover:bg-primary/10 hover:text-primary dark:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`flex h-10 items-center justify-center rounded-full text-14 font-semibold transition-all duration-300 ${
                    !isSignIn
                      ? "bg-primary text-white shadow-sm"
                      : "text-midnight_text hover:bg-primary/10 hover:text-primary dark:text-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="mb-2 text-28 font-bold leading-tight text-midnight_text dark:text-white sm:text-35">
                {content.title}
              </h1>
              <p className="text-14 text-muted dark:text-foottext">{content.subtitle}</p>
            </div>

            <div className="relative">
              <div
                className={`transition-all duration-300 ${
                  isSignIn
                    ? "visible translate-x-0 opacity-100"
                    : "invisible absolute inset-0 -translate-x-2 opacity-0"
                }`}
              >
                <Signin onSwitchToSignup={() => setMode("signup")} />
              </div>

              <div
                className={`transition-all duration-300 ${
                  !isSignIn
                    ? "visible translate-x-0 opacity-100"
                    : "invisible absolute inset-0 translate-x-2 opacity-0"
                }`}
              >
                <SignUp onSwitchToSignin={() => setMode("signin")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthUnified;
