import AuthUnified from "@/components/Auth/AuthUnified";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign In | Saarthi4u",
};

const SigninPage = () => {
  return <AuthUnified initialMode="signin" />;
};

export default SigninPage;
