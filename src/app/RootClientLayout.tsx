"use client";

import dynamic from "next/dynamic";

const WhatsAppFloat = dynamic(() => import("@/components/Common/WhatsAppFloat"), { ssr: false });
const AIChatbot = dynamic(() => import("@/components/Common/AIChatbot"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const EnquiryPopup = dynamic(() => import("@/components/EnquiryPopup/EnquiryPopup"), { ssr: false });

export default function RootClientLayout() {
  return (
    <>
      <AIChatbot />
      <WhatsAppFloat />
      <ScrollToTop />
      <EnquiryPopup />
    </>
  );
}
