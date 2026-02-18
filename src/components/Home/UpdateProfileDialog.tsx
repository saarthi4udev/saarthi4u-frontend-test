"use client";

import Link from "next/link";

type Props = {
  onClose: () => void;
};

export default function UpdateProfileDialog({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          Complete your profile
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          You signed up using phone number. Please update your profile details
          to continue.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Later
          </button>

          <Link
            href="/profile"
            className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
