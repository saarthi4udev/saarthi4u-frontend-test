"use client";

import dynamic from "next/dynamic";

const PhoneAuth = dynamic(
  () => import("./index"),
  { ssr: false }
);

export default function PhoneAuthClient() {
  return <PhoneAuth />;
}
