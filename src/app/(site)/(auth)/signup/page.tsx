import AuthUnified from "@/components/Auth/AuthUnified";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign Up | Saarthi4u",
};

const SignupPage = () => {
  return <AuthUnified initialMode="signup" />;
};

export default SignupPage;
