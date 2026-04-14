"use client";

/**
 * NavLink — A Link that triggers the EduLoader on click.
 * Drop-in replacement for next/link when you want a loading overlay.
 */

import Link from "next/link";
import { useRouteLoader } from "@/components/Common/RouteLoader";

type NavLinkProps = React.ComponentProps<typeof Link>;

export default function NavLink({ onClick, ...props }: NavLinkProps) {
  const { showLoader } = useRouteLoader();

  return (
    <Link
      {...props}
      onClick={(e) => {
        showLoader();
        onClick?.(e);
      }}
    />
  );
}
