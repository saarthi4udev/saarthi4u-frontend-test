"use client";

import api from "@/app/api/axios";
import { firebaseApp } from "@/app/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SocialSignUp = () => {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
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
        }
    };

    return (
        <div className="flex gap-4">
            {/* GOOGLE */}
            <button
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-border hover:bg-herobg p-3.5 duration-200 ease-in dark:border-dark_border dark:text-white dark:hover:bg-darkmode"
            >
                Sign In
                {/* Google SVG (unchanged) */}
                <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_709_8846)">
                        <path
                            d="M22.5001 11.2438C22.5134 10.4876 22.4338 9.73256 22.2629 8.995H11.7246V13.0771H17.9105C17.7933 13.7929 17.5296 14.478 17.1352 15.0914C16.7409 15.7047 16.224 16.2335 15.6158 16.646L15.5942 16.7827L18.9264 19.3124L19.1571 19.335C21.2772 17.4161 22.4997 14.5926 22.4997 11.2438"
                            fill="#4285F4"
                        />
                        <path
                            d="M11.7245 22C14.755 22 17.2992 21.0221 19.1577 19.3355L15.6156 16.6464C14.6679 17.2944 13.3958 17.7467 11.7245 17.7467C10.3051 17.7385 8.92433 17.2926 7.77814 16.472C6.63195 15.6515 5.77851 14.4981 5.33892 13.1755L5.20737 13.1865L1.74255 15.8142L1.69727 15.9376C2.63043 17.7602 4.06252 19.2925 5.83341 20.3631C7.60429 21.4337 9.64416 22.0005 11.7249 22"
                            fill="#34A853"
                        />
                        <path
                            d="M5.33889 13.1755C5.09338 12.4753 4.96669 11.7404 4.96388 11C4.9684 10.2608 5.09041 9.52685 5.32552 8.8245L5.31927 8.67868L1.81196 6.00867L1.69724 6.06214C0.910039 7.5938 0.5 9.28491 0.5 10.9999C0.5 12.7148 0.910039 14.406 1.69724 15.9376L5.33889 13.1755Z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M11.7249 4.25337C13.3333 4.22889 14.8888 4.8159 16.065 5.89121L19.2329 2.86003C17.2011 0.992106 14.5106 -0.0328008 11.7249 3.27798e-05C9.64418 -0.000452376 7.60433 0.566279 5.83345 1.63686C4.06256 2.70743 2.63046 4.23965 1.69727 6.06218L5.32684 8.82455C5.77077 7.50213 6.62703 6.34962 7.77491 5.5295C8.9228 4.70938 10.3044 4.26302 11.7249 4.25337Z"
                            fill="#EB4335"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_709_8846">
                            <rect
                                width="22"
                                height="22"
                                fill="white"
                                transform="translate(0.5)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>

            {/* Phone */}
            <button
                onClick={() => {
                    router.push("/phone");
                }}
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-border hover:bg-herobg p-3.5 text-dark duration-200 ease-in dark:border-dark_border dark:text-white dark:hover:bg-darkmode"
            >
                Sign In
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.2762 15.2967L16.0695 13.9217C15.7926 13.8079 15.4852 13.7775 15.1912 13.8352C14.8971 13.8929 14.6293 14.0362 14.4228 14.2467L13.0037 15.6917C10.7736 14.6426 8.95833 12.8273 7.90917 10.5971L9.35417 9.17804C9.56471 8.97156 9.70802 8.70375 9.76569 8.40971C9.82336 8.11566 9.79295 7.80828 9.67917 7.53138L8.30417 4.32471C8.17891 4.03967 7.95839 3.80763 7.67982 3.66873C7.40125 3.52983 7.08197 3.4926 6.77833 3.56304L3.79667 4.24554C3.50238 4.31319 3.23971 4.47884 3.05187 4.71511C2.86403 4.95139 2.76199 5.24421 2.7625 5.54671C2.7625 13.9259 8.57417 19.7375 16.9533 19.7375C17.2558 19.738 17.5487 19.636 17.7849 19.4482C18.0212 19.2603 18.1869 18.9977 18.2545 18.7034L18.937 15.7217C19.0074 15.4181 18.9702 15.0988 18.8313 14.8202C18.6924 14.5416 18.4604 14.3211 18.1753 14.1959Z"
                        fill="currentColor"
                    />
                </svg>

            </button>
        </div>
    );
};

export default SocialSignUp;
