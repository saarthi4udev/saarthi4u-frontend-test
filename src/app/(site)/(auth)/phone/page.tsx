
import PhoneAuthClient from "@/components/Auth/PhoneAuth/PhoneAuthClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Phone Login | Saarthi4u",
};

const SigninPage = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-hero-bg to-white px-4 py-14 dark:from-darkmode dark:to-darkmode sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-70px] top-16 h-72 w-72 rounded-full bg-secondary/18 blur-3xl dark:bg-secondary/12" />
        <div className="absolute bottom-[-120px] right-[-40px] h-80 w-80 rounded-full bg-primary/16 blur-3xl dark:bg-primary/28" />
      </div>

      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xl">
            <PhoneAuthClient />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
