"use client";

import api from "@/app/api/axios";
import { firebaseApp } from "@/app/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useState } from "react";

const SocialSignUp = () => {
    const router = useRouter();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        if (isGoogleLoading) return;

        setIsGoogleLoading(true);
        try {
            const provider = new GoogleAuthProvider();

            provider.setCustomParameters({
                prompt: "select_account",
            });

            const auth = getAuth(firebaseApp);

            // Firebase popup
            const result = await signInWithPopup(auth, provider);

            // Firebase ID token
            const token = await result.user.getIdToken();

            // Send token to backend
            await api.post(
                "/auth/login/google",
                {},
                {
                    withCredentials: true, // to set cookies from backend
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Google sign-in successful 🎉");

            // Logged in
            setTimeout(() => {
                router.push("/");
                globalThis.location.reload(); // reload to update auth state from cookie
            }, 800);
        } catch (err: any) {
            console.error("Google sign-in failed", err);
            alert(err.message || "Google sign-in failed");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* GOOGLE */}
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-white p-3 text-14 font-semibold text-midnight_text transition-all duration-200 hover:border-primary/45 hover:bg-hero-bg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-65 dark:border-dark_border dark:bg-dark_b dark:text-white dark:hover:bg-darkmode"
            >
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                <Icon icon="flat-color-icons:google" className="text-[1.2rem]" />
            </button>

            {/* Phone */}
            <button
                type="button"
                onClick={() => {
                    router.push("/phone");
                }}
                className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-white p-3 text-14 font-semibold text-midnight_text transition-all duration-200 hover:border-primary/45 hover:bg-hero-bg active:scale-[0.99] dark:border-dark_border dark:bg-dark_b dark:text-white dark:hover:bg-darkmode"
            >
                Continue with Phone OTP
                <Icon icon="solar:phone-calling-linear" className="text-lg" />

            </button>
        </div>
    );
};

export default SocialSignUp;
