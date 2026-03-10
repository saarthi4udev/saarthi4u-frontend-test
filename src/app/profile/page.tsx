"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
    }
  }, [user]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );

  if (!user) return null;

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleSave = async () => {
    try {
      setSaving(true);

      // TODO: Replace with real API call
      console.log("Updated:", { name, phone });

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-primary via-primary/80 to-secondary dark:from-primary dark:via-primary/80 dark:to-secondary/80 relative transition-colors">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center transition-colors">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
              {getInitials(user.name)}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-10 text-center md:text-left">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white transition-colors">
              {user.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {user.role}
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 md:mt-0 px-6 py-2 bg-accent hover:bg-accent-dark text-primary rounded-lg shadow transition font-semibold"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProfileCard label="Full Name" value={user.name} />
          <ProfileCard label="Email Address" value={user.email} />
          <ProfileCard
            label="Phone Number"
            value={user.phone || "Not Provided"}
          />
          <ProfileCard label="Role" value={user.role} />
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-colors">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
              Edit Profile
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email (Disabled) */}
            <div className="mb-4">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full mt-1 p-2 border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-dark text-primary font-semibold transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- PROFILE CARD ---------------- */

function ProfileCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition p-6">
      <p className="text-sm text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wide">
        {label}
      </p>
      <p className="text-gray-800 dark:text-white font-medium break-words">
        {value}
      </p>
    </div>
  );
}