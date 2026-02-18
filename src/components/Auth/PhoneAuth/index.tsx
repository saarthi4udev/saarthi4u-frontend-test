"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
            const formattedPhone = phone.startsWith("+")
                ? phone
                : `+91${phone}`;

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
        <>
            <div className="mb-10 text-center mx-auto max-w-40">
                <Logo />
            </div>

            {step === "phone" && (
                <form onSubmit={handleSendOtp}>
                    <input
                        type="tel"
                        placeholder="+91XXXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="mb-5 w-full rounded-md border px-5 py-3"
                    />

                    <div id="recaptcha-container" className="mb-5" />

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-md bg-primary py-3 text-white"
                    >
                        Send OTP
                        {loading && <Loader />}
                    </button>
                </form>
            )}



            {step === "otp" && (
                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="number"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="mb-6 w-full rounded-md border px-5 py-3"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-md bg-primary py-3 text-white"
                    >
                        Verify OTP
                        {loading && <Loader />}
                    </button>
                </form>
            )}

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <p className="mt-6 text-center text-sm">
                Sign up with Email/Password?{" "}
                <Link href="/signup" className="text-primary underline">
                    Sign Up
                </Link>
            </p>
        </>
    );
};

export default PhoneAuth;