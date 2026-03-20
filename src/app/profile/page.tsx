"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ---------------------------------- */
/* PROFILE FIELD CONFIGURATION */
/* ---------------------------------- */

const profileFields: any = {
  personal: [
    { key: "name", label: "Full Name", type: "text" },
    { key: "age", label: "Age", type: "number" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "location", label: "Location", type: "text" },
  ],
  academic: [
    { key: "qualification", label: "Qualification", type: "text" },
    { key: "stream", label: "Stream", type: "text" },
    { key: "cgpa", label: "CGPA", type: "text" },
    { key: "institution", label: "Institution", type: "text" },
  ],
  career: [
    { key: "field", label: "Career Field", type: "text" },
    { key: "roles", label: "Roles", type: "text" },
    { key: "hobbies", label: "Hobbies", type: "text" },
  ],
  goals: [
    { key: "shortTerm", label: "Short Term Goals", type: "textarea" },
    { key: "longTerm", label: "Long Term Goals", type: "textarea" },
    { key: "salary", label: "Expected Salary", type: "text" },
  ],
  preferences: [
    { key: "location", label: "Preferred Location", type: "text" },
    { key: "learningStyle", label: "Learning Style", type: "text" },
    { key: "budget", label: "Budget", type: "text" },
  ],
};

/* ---------------------------------- */
/* MAIN PAGE */
/* ---------------------------------- */

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [showEdit, setShowEdit] = useState(false);

  const [profile, setProfile] = useState<any>({
    personal: { name: "", age: "", phone: "", location: "" },
    academic: { qualification: "", stream: "", cgpa: "", institution: "" },
    career: { field: "", roles: "", hobbies: "" },
    goals: { shortTerm: "", longTerm: "", salary: "" },
    preferences: { location: "", learningStyle: "", budget: "" },
  });

  useEffect(() => {
    if (!loading && !user) router.push("/signin");

    if (user) {
      setProfile((prev: any) => ({
        ...prev,
        personal: {
          ...prev.personal,
          name: user.name,
          phone: user.phone || "",
        },
      }));
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!user) return null;

  const completion = calculateCompletion(profile);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow p-6 mb-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {profile.personal.name?.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {profile.personal.name}
              </h1>
              <p className="text-gray-500">{user.email}</p>
            </div>

          </div>

          <button
            onClick={() => setShowEdit(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>

        </div>

        {/* COMPLETION */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-300">Profile Completion</span>
            <span className="text-gray-600 dark:text-gray-300">{completion}%</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
            <div
              className="bg-indigo-600 h-2 rounded"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

      </div>

      {/* SECTIONS */}
      <div className="max-w-6xl mx-auto grid gap-6">

        {Object.keys(profileFields).map((section) => (
          <div key={section} className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-lg font-semibold mb-4 capitalize text-gray-800 dark:text-white">
              {section}
            </h2>

            <div className="grid gap-2">
              {profileFields[section].map((field: any) => (
                <Item
                  key={field.key}
                  label={field.label}
                  value={profile[section][field.key]}
                />
              ))}
            </div>

          </div>
        ))}

      </div>

      {showEdit && (
        <EditModal
          profile={profile}
          setProfile={setProfile}
          user={user}
          close={() => setShowEdit(false)}
        />
      )}

    </div>
  );
}

/* ---------------------------------- */
function calculateCompletion(profile: any) {
  let total = 0;
  let filled = 0;

  Object.keys(profile).forEach((section) => {
    Object.values(profile[section]).forEach((value: any) => {
      total++;
      if (value && value !== "") filled++;
    });
  });

  return Math.round((filled / total) * 100);
}

/* ---------------------------------- */
function Item({ label, value }: any) {
  return (
    <p className="text-sm text-gray-700 dark:text-gray-300">
      <span className="text-gray-500">{label}:</span>
      <span className="ml-2">
        {value ? value : <span className="text-red-400">Not Provided</span>}
      </span>
    </p>
  );
}

/* ---------------------------------- */
/* EDIT MODAL */
/* ---------------------------------- */

function EditModal({ profile, setProfile, close, user }: any) {
  const [form, setForm] = useState(profile);

  const handleChange = (section: string, key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const save = () => {
    setProfile(form);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-slate-900 w-[750px] max-h-[90vh] overflow-y-auto rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          Edit Profile
        </h2>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Email</label>
          <input
            value={user?.email}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {Object.keys(profileFields).map((section) => (
          <div key={section} className="mb-6">

            <h3 className="font-semibold mb-3 capitalize border-b pb-1 text-gray-700 dark:text-gray-200">
              {section}
            </h3>

            {profileFields[section].map((field: any) => {
              const isDisabled = field.key === "phone" || field.key === "name";

              return (
                <div key={field.key} className="mb-4">

                  <label className="text-sm text-gray-500">
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      value={form[section][field.key]}
                      disabled={isDisabled}
                      onChange={(e) =>
                        handleChange(section, field.key, e.target.value)
                      }
                      className={`w-full border p-2 rounded mt-1 dark:bg-slate-800 dark:text-white ${
                        isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={form[section][field.key]}
                      disabled={isDisabled}
                      onChange={(e) =>
                        handleChange(section, field.key, e.target.value)
                      }
                      className={`w-full border p-2 rounded mt-1 dark:bg-slate-800 dark:text-white ${
                        isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="border px-4 py-2 rounded dark:border-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>

      </div>

    </div>
  );
}
