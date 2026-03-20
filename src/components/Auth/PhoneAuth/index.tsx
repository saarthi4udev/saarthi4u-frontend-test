"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult,
} from "firebase/auth";
import { useAuth } from "@/app/context/AuthContext";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";
import api from "@/app/api/axios";
import { firebaseApp } from "@/app/firebase";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const PhoneAuth = () => {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading } = useAuth();

    // ---------------- STATE ----------------
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const authL = useAuth();
    const login = authL.login;

    // ---------------- REFS ----------------
    const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
    const confirmationResultRef = useRef<ConfirmationResult | null>(null);

    const auth = getAuth(firebaseApp);

    // ---------------- REDIRECT IF LOGGED IN ----------------
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.replace("/");
        }
    }, [authLoading, isAuthenticated, router]);

    // ---------------- INIT RECAPTCHA ----------------
    useEffect(() => {
        if (!recaptchaRef.current) {
            recaptchaRef.current = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "normal",
                }
            );

            recaptchaRef.current.render();
        }
    }, [auth]);

    if (authLoading || isAuthenticated) return null;

    // ---------------- SEND OTP ----------------
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const cleanedPhone = phone.replace(/\D/g, "").slice(0, 10);
            if (cleanedPhone.length !== 10) {
                throw new Error("Please enter a valid 10-digit phone number");
            }

            const formattedPhone = phone.startsWith("+")
                ? phone
                : `+91${cleanedPhone}`;

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                formattedPhone,
                recaptchaRef.current!
            );

            confirmationResultRef.current = confirmationResult;
            toast.success("OTP sent successfully");

            setTimeout(() => {
                setStep("otp");
            }, 800);
        } catch (err: any) {
            setError(err.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- VERIFY OTP ----------------
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!/^\d{6}$/.test(otp)) {
                throw new Error("Please enter a valid 6-digit OTP");
            }

            const result = await confirmationResultRef.current!.confirm(otp);
            const idToken = await result.user.getIdToken();

            // 🔐 Send token to backend
            await api.post(
                "/auth/login/phone",
                {},
                {
                    withCredentials: true, //  to set cookies from backend
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            );

            await login(); // refresh profile from cookie

            toast.success("Phone sign-in successful 🎉");

            // ✅ redirect after short delay so toast is visible
            setTimeout(() => {
                router.replace("/");
                // globalThis.location.reload(); // reload to update auth state from cookie
            }, 800);
        } catch (err: any) {
            setError(err.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- UI ----------------
    return (
        <div className="relative rounded-3xl border border-primary/15 bg-white/95 p-6 shadow-[0_24px_64px_rgba(23,30,76,0.12)] backdrop-blur md:p-8 dark:border-dark_border dark:bg-darkheader/95 dark:shadow-[0_24px_64px_rgba(4,10,22,0.65)]">
            <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/15" />
            <div className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl dark:bg-accent/15" />

            <div className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mb-8 text-center"
                >
                    <div className="mx-auto mb-5 inline-flex rounded-2xl border border-primary/15 bg-white px-5 py-3 shadow-sm dark:border-dark_border dark:bg-dark_b">
                        <div className="w-28">
                            <Logo />
                        </div>
                    </div>
                    <h1 className="text-28 font-extrabold text-primary dark:text-white">Secure Phone Login</h1>
                    <p className="mt-2 text-14 font-medium text-muted dark:text-white/75">
                        Quick OTP verification to continue your learning journey.
                    </p>
                </motion.div>

                <div className="mb-6 flex items-center justify-center gap-2">
                    <div className={`h-2.5 w-8 rounded-full transition-all ${step === "phone" ? "bg-secondary" : "bg-secondary/30 dark:bg-secondary/25"}`} />
                    <div className={`h-2.5 w-8 rounded-full transition-all ${step === "otp" ? "bg-accent" : "bg-accent/30 dark:bg-accent/25"}`} />
                </div>

                <AnimatePresence mode="wait">
                    {step === "phone" && (
                        <motion.form
                            key="phone-step"
                            onSubmit={handleSendOtp}
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 14 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <div>
                                <label htmlFor="phone" className="mb-2 inline-flex items-center gap-2 text-14 font-semibold text-primary dark:text-white/90">
                                    <Icon icon="solar:phone-calling-linear" className="text-lg text-secondary" />
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-14 font-semibold text-primary/70 dark:text-white/70">
                                        +91
                                    </span>
                                    <input
                                        id="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Enter 10-digit number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                        required
                                        className="w-full rounded-xl border border-border bg-white py-3 pl-14 pr-4 text-midnight_text shadow-sm outline-hidden transition-all duration-300 placeholder:text-muted/70 focus:border-secondary focus:ring-4 focus:ring-secondary/15 dark:border-dark_border dark:bg-dark_b dark:text-white dark:placeholder:text-white/45 dark:focus:border-secondary dark:focus:ring-secondary/20"
                                    />
                                </div>
                                <p className="mt-2 text-13 text-muted dark:text-white/65">We will send a one-time password to this number.</p>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-border bg-white p-3 dark:border-dark_border dark:bg-dark_b">
                                <div id="recaptcha-container" className="flex justify-center" />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                Send OTP
                                {loading ? <Loader /> : <Icon icon="solar:arrow-right-linear" className="text-lg" />}
                            </button>
                        </motion.form>
                    )}

                    {step === "otp" && (
                        <motion.form
                            key="otp-step"
                            onSubmit={handleVerifyOtp}
                            initial={{ opacity: 0, x: 14 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -14 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <div className="rounded-xl border border-secondary/30 bg-secondary/[0.08] p-3 text-center text-13 text-primary dark:border-secondary/40 dark:bg-secondary/10 dark:text-white/85">
                                OTP sent to <span className="font-semibold">+91 {phone}</span>
                            </div>

                            <div>
                                <label htmlFor="otp" className="mb-2 inline-flex items-center gap-2 text-14 font-semibold text-primary dark:text-white/90">
                                    <Icon icon="solar:shield-check-linear" className="text-lg text-accent" />
                                    Enter 6-digit OTP
                                </label>
                                <input
                                    id="otp"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    required
                                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-center text-20 font-bold tracking-[0.35em] text-midnight_text shadow-sm outline-hidden transition-all duration-300 placeholder:tracking-normal placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/15 dark:border-dark_border dark:bg-dark_b dark:text-white dark:placeholder:text-white/45 dark:focus:border-accent dark:focus:ring-accent/20"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => {
                                        setStep("phone");
                                        setOtp("");
                                        setError(null);
                                    }}
                                    className="rounded-xl border border-primary/25 py-3 font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-70 dark:border-dark_border dark:text-white dark:hover:bg-white/5"
                                >
                                    Change Number
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent-dark py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                    Verify OTP
                                    {loading ? <Loader /> : <Icon icon="solar:check-circle-linear" className="text-lg" />}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {error && (
                    <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-14 text-red-600 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300">
                        {error}
                    </p>
                )}

                <p className="mt-6 text-center text-14 text-muted dark:text-white/75">
                    Sign up with Email/Password?{" "}
                    <Link href="/signup" className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-secondary dark:text-secondary dark:hover:text-accent">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default PhoneAuth;