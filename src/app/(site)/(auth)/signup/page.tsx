import AuthUnified from "@/components/Auth/AuthUnified";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Saarthi4u Career Planning Platform",
  description: "Join Saarthi4u today and start your journey towards a successful career with expert guidance and college admission support.",
};

const SignupPage = () => {
  return <AuthUnified initialMode="signup" />;
};

export default SignupPage;
