"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface Props {
  onLogout: () => void;
  userName?: string;
}

const ProfileDropdown: React.FC<Props> = ({ onLogout, userName }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initial = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative hidden xl:block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-white shadow-lg dark:bg-darkheader">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <Icon icon="solar:user-outline" />
            My Profile
          </Link>

            {/* here we can add the menu in drop down for profile pictures  */}
          <div className="border-t my-1" />

          <button
            onClick={onLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50"
          >
            <Icon icon="solar:logout-outline" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;