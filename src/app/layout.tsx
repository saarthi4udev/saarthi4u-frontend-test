import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import ScrollToTop from "@/components/ScrollToTop";
import AuthProvider from "@/components/Providers/AuthProvider";

const dmsans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmsans.className}>
        <AuthDialogProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </AuthProvider>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
