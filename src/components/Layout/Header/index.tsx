"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import api from "@/app/api/axios";
import ProfileDropdown from "../../profiledropdown/ProfileDropdown";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, logout, user } = useAuth();
  const isAuthPage = ["/signin", "/signup", "/phone"].some(
    (route) => pathUrl === route || pathUrl.startsWith(`${route}/`)
  );

  const handleLogout = async () => {
    const confirmed = globalThis.confirm("Do you really want to logout?");
    if (!confirmed) return;

    try {
      await logout();
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout API failed:", err);
    }

    localStorage.clear();
    sessionStorage.clear();
    delete api.defaults.headers.common["Authorization"];

    toast.success("Logged out successfully.");
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = searchTerm.trim();
    setNavbarOpen(false);
    router.push(value ? `/college?search=${encodeURIComponent(value)}` : "/college");
  };

  const handleScroll = () => {
    setSticky(window.scrollY >= 24);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  const handleEscapeClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [navbarOpen]);

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  useEffect(() => {
    setNavbarOpen(false);
  }, [pathUrl]);

  const isHome = pathUrl === "/";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${sticky || !isHome
          ? "border-b border-border bg-white/98 shadow-lg backdrop-blur-md dark:border-dark_border/80 dark:bg-darkheader/95"
          : "bg-white/95 backdrop-blur-sm shadow-none dark:bg-darkheader/95"
        }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between gap-2 transition-all duration-300 sm:gap-3 ${sticky ? "py-3" : "py-4"
          }`}
      >
        <div className="flex items-center gap-6 xl:gap-8">
          <Logo />

          <nav className="hidden xl:flex items-center gap-1 rounded-full border border-primary/15 bg-primary/5 p-1.5 backdrop-blur-sm dark:border-dark_border/80 dark:bg-dark_b/70">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <form
            onSubmit={handleSearchSubmit}
            className="hidden xl:flex h-10 items-center gap-2 rounded-full border border-border bg-gray-50 px-3 text-primary shadow-sm transition-all duration-300 focus-within:border-secondary/60 dark:border-dark_border dark:bg-dark_b dark:text-white"
          >
            <Icon icon="solar:magnifer-linear" className="text-xl text-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search colleges or courses"
              className="w-44 xl:w-48 2xl:w-52 bg-transparent p-0 text-14 text-primary placeholder:text-muted focus:outline-hidden dark:text-white"
              aria-label="Search colleges or courses"
            />
          </form>

          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-gray-50 text-primary transition-all duration-300 hover:border-secondary/45 hover:text-secondary dark:border-dark_border dark:bg-dark_b dark:text-white"
          >
            <Icon
              icon={theme === "dark" ? "solar:sun-bold" : "solar:moon-stars-bold"}
              className="text-[1.15rem]"
            />
          </button>

          <Link
            href="/contact"
            className="group relative hidden xl:flex h-10 items-center gap-2 overflow-hidden rounded-full bg-accent px-4 text-14 font-semibold text-primary transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Get Consultation
            <Icon icon="solar:arrow-right-linear" className="text-base" />
          </Link>

          {isAuthenticated && !isAuthPage ? (
            <ProfileDropdown
              onLogout={handleLogout}
              userName={user?.name}
            />
          ) : !isAuthenticated && !isAuthPage ? (
            <div className="hidden xl:flex items-center">
              <Link
                href="/signin"
                className="flex h-10 items-center gap-2 rounded-full border border-secondary bg-secondary px-4 text-14 font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          ) : null}

          {/* {isAuthenticated && !isAuthPage ? (
            <button
              onClick={handleLogout}
              className="hidden xl:flex h-10 items-center rounded-full border border-danger px-3.5 text-14 font-semibold text-danger transition-all duration-300 hover:bg-danger hover:text-white"
            >
              Logout
            </button>
          ) : !isAuthenticated && !isAuthPage ? (
            <div className="hidden xl:flex items-center">
              <Link
                href="/signin"
                className="flex h-10 items-center gap-2 rounded-full border border-primary bg-primary px-4 text-14 font-semibold text-white transition-all duration-300 hover:opacity-90"
              >
                Get Started
                <Icon icon="solar:arrow-right-linear" className="text-base" />
              </Link>
            </div>
          ) : null} */}

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="group grid h-10 w-10 place-items-center rounded-full border border-border bg-gray-50 transition-all duration-300 hover:border-secondary/45 dark:border-dark_border dark:bg-dark_b xl:hidden"
            aria-label="Toggle mobile menu"
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-1 block h-0.5 w-5 bg-primary transition-all duration-300 dark:bg-white ${navbarOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
              />
              <span
                className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-primary transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`absolute left-0 top-4 block h-0.5 w-5 bg-primary transition-all duration-300 dark:bg-white ${navbarOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        onClick={() => setNavbarOpen(false)}
        className={`fixed inset-0 z-40 bg-darkmode/40 backdrop-blur-[1px] transition-opacity duration-300 xl:hidden ${navbarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      <div
        ref={mobileMenuRef}
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(88vw,24rem)] transform flex-col border-l border-border/70 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform duration-300 dark:border-dark_border/70 dark:bg-darkheader xl:hidden ${navbarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between pb-4">
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label="Close mobile menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-midnight_text transition-colors duration-200 hover:border-primary/45 hover:text-primary dark:border-dark_border dark:text-white"
          >
            <Icon icon="solar:close-circle-linear" className="text-2xl" />
          </button>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="mb-4 flex h-11 items-center gap-2 rounded-full border border-border bg-white px-3 text-midnight_text shadow-sm focus-within:border-primary/60 dark:border-dark_border dark:bg-dark_b dark:text-white"
        >
          <Icon icon="solar:magnifer-linear" className="text-xl text-primary" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search colleges or courses"
            className="w-full bg-transparent p-0 text-14 placeholder:text-muted focus:outline-hidden dark:text-white"
            aria-label="Search colleges or courses"
          />
        </form>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {headerData.map((item, index) => (
            <MobileHeaderLink
              key={index}
              item={item}
              onNavigate={() => setNavbarOpen(false)}
            />
          ))}
          <Link
            href="/contact"
            onClick={() => setNavbarOpen(false)}
            className="mt-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-14 font-semibold text-primary"
          >
            Get Consultation
            <Icon icon="solar:arrow-right-linear" className="text-base" />
          </Link>
        </nav>

        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border/70 pt-4 dark:border-dark_border/70">
          {!isAuthenticated && !isAuthPage ? (
            <Link
              href="/signin"
              className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-full border border-secondary bg-secondary px-4 text-14 font-semibold text-white transition-all duration-300 hover:opacity-90"
              onClick={() => setNavbarOpen(false)}
            >
              Get Started
              <Icon icon="solar:arrow-right-linear" className="text-base" />
            </Link>
          ) : isAuthenticated && !isAuthPage ? (
            <button
              onClick={() => {
                setNavbarOpen(false);
                handleLogout();
              }}
              className="col-span-2 flex h-11 items-center justify-center rounded-full border border-danger px-4 text-14 font-semibold text-danger transition-all duration-300 hover:bg-danger hover:text-white"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
