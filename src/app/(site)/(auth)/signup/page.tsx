import SignUp from "@/components/Auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign Up | Saarthi4u",
};

const SignupPage = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-white py-16 px-4 dark:bg-dark sm:py-20 lg:py-27.5">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-white p-8 dark:bg-midnight_text">
            <SignUp />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
