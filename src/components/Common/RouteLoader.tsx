"use client";

/**
 * RouteLoader — Shows EduLoader during Next.js route transitions.
 *
 * Wrap your app with <RouteLoaderProvider> in the root layout.
 * It listens to Next.js pathname changes and shows the loader
 * automatically between navigations.
 *
 * For manual control (e.g. a button click before navigation):
 *   import { useRouteLoader } from "@/components/Common/RouteLoader";
 *   const { showLoader } = useRouteLoader();
 *   showLoader();            // show immediately
 *   router.push("/target");  // navigation begins
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useTransition,
} from "react";
import { usePathname } from "next/navigation";
import EduLoader from "./EduLoader";

type RouteLoaderCtx = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

const Ctx = createContext<RouteLoaderCtx>({
  loading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const useRouteLoader = () => useContext(Ctx);

export function RouteLoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  // Hide loader when the pathname changes (page rendered)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // Safety: hide after 8s in case something stalls
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 8000);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <Ctx.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && <EduLoader message="Loading your learning path…" />}
    </Ctx.Provider>
  );
}
