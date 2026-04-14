import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppFloat from "@/components/Common/WhatsAppFloat";
import AIChatbot from "@/components/Common/AIChatbot";
import EnquiryPopup from "@/components/EnquiryPopup/EnquiryPopup";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { RouteLoaderProvider } from "@/components/Common/RouteLoader";

const dmsans = DM_Sans({ subsets: ["latin"] });
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmsans.className} ${sora.variable} site-body`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <RouteLoaderProvider>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            {/* offset for fixed header */}
            <main className="site-main min-w-0 overflow-x-clip pt-[4.5rem] sm:pt-20">{children}</main>
            <Footer />
            <AIChatbot />
            <WhatsAppFloat />
            <ScrollToTop />
            <EnquiryPopup />
            </RouteLoaderProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
