import AuthUnified from "@/components/Auth/AuthUnified";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Saarthi4u Career Planning Platform",
  description: "Sign in to Saarthi4u to access personalized career guidance, college search, and admission tools.",
};

const SigninPage = () => {
  return <AuthUnified initialMode="signin" />;
};

export default SigninPage;
