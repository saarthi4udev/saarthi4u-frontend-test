"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EduLoader from "@/components/Common/EduLoader";
import { authApi } from "@/app/api/auth.api";

/* ---------------------------------- */
/* PROFILE FIELD CONFIGURATION        */
/* ---------------------------------- */

const sectionIcons: Record<string, string> = {
  personal: "👤",
  academic: "🎓",
  career: "💼",
  goals: "🎯",
  preferences: "⚙️",
};

const sectionDescriptions: Record<string, string> = {
  personal: "Your basic personal details",
  academic: "Educational background & qualifications",
  career: "Professional interests & experience",
  goals: "Where you're headed",
  preferences: "How you like to work & learn",
};

const profileFields: Record<
  string,
  { key: string; label: string; type: string; placeholder?: string }[]
> = {
  personal: [
    { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { key: "age", label: "Age", type: "number", placeholder: "22" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 9876543210" },
    { key: "location", label: "Location", type: "text", placeholder: "Mumbai, India" },
  ],
  academic: [
    { key: "qualification", label: "Qualification", type: "text", placeholder: "B.Tech / MBA" },
    { key: "stream", label: "Stream", type: "text", placeholder: "Computer Science" },
    { key: "cgpa", label: "CGPA", type: "text", placeholder: "8.5 / 10" },
    { key: "institution", label: "Institution", type: "text", placeholder: "IIT Bombay" },
  ],
  career: [
    { key: "field", label: "Career Field", type: "text", placeholder: "Software Engineering" },
    { key: "roles", label: "Roles", type: "text", placeholder: "Full Stack Developer, PM" },
    { key: "hobbies", label: "Hobbies", type: "text", placeholder: "Photography, Chess" },
  ],
  goals: [
    {
      key: "shortTerm",
      label: "Short Term Goals",
      type: "textarea",
      placeholder: "Get an internship at a top-tier startup...",
    },
    {
      key: "longTerm",
      label: "Long Term Goals",
      type: "textarea",
      placeholder: "Build a product that impacts millions...",
    },
    { key: "salary", label: "Expected Salary", type: "text", placeholder: "12" },
  ],
  preferences: [
    {
      key: "location",
      label: "Preferred Location",
      type: "text",
      placeholder: "Bangalore / Remote",
    },
    {
      key: "learningStyle",
      label: "Learning Style",
      type: "text",
      placeholder: "Visual, Project-based",
    },
    { key: "budget", label: "Budget", type: "text", placeholder: "5000" },
  ],
};

type Profile = {
  personal: { name: string; age: string; phone: string; location: string };
  academic: { qualification: string; stream: string; cgpa: string; institution: string };
  career: { field: string; roles: string; hobbies: string };
  goals: { shortTerm: string; longTerm: string; salary: string };
  preferences: { location: string; learningStyle: string; budget: string };
};

/* ---------------------------------- */
/* AVATAR COMPONENT                   */
/* ---------------------------------- */

function Avatar({
  src,
  initials,
  completion,
  size = "lg",
}: {
  src?: string | null;
  initials: string;
  completion: number;
  size?: "lg" | "sm";
}) {
  const dim = size === "lg" ? "w-20 h-20 text-2xl rounded-2xl" : "w-10 h-10 text-sm rounded-xl";
  return (
    <div className="relative shrink-0">
      {src ? (
        <img
          src={src}
          alt="Profile"
          className={`${dim} object-cover shadow-md shadow-violet-200 dark:shadow-violet-900/30`}
        />
      ) : (
        <div
          className={`${dim} bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md shadow-violet-200 dark:shadow-violet-900/30`}
        >
          {initials}
        </div>
      )}
      <div
        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#1a1d27] ${
          completion === 100 ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
    </div>
  );
}

/* ---------------------------------- */
/* TOAST COMPONENT                    */
/* ---------------------------------- */

function Toast({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium animate-in slide-in-from-bottom-4 duration-300 ${
        type === "success"
          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
          : "bg-red-600 text-white"
      }`}
    >
      {type === "success" ? (
        <svg className="w-4 h-4 text-emerald-400 dark:text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-red-200" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {message}
    </div>
  );
}

/* ---------------------------------- */
/* MAIN PAGE                          */
/* ---------------------------------- */

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [showEdit, setShowEdit] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [profile, setProfile] = useState<Profile>({
    personal: { name: "", age: "", phone: "", location: "" },
    academic: { qualification: "", stream: "", cgpa: "", institution: "" },
    career: { field: "", roles: "", hobbies: "" },
    goals: { shortTerm: "", longTerm: "", salary: "" },
    preferences: { location: "", learningStyle: "", budget: "" },
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
    if (user) {
      setProfile((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          name: user.name || "",
          phone: user.phone || "",
          age: user.age ? String(user.age) : "",
          location: user.location || "",
        },
        academic: {
          qualification: user.qualification || "",
          stream: user.stream || "",
          cgpa: user.cgpa ? String(user.cgpa) : "",
          institution: user.institute || "",
        },
        career: {
          field: user.careerField || "",
          roles: user.careerRole || "",
          hobbies: user.hobbies || "",
        },
        goals: {
          shortTerm: user.shortTermGoal || "",
          longTerm: user.longTermGoal || "",
          salary: user.expectedSalary ? String(user.expectedSalary) : "",
        },
        preferences: {
          location: user.preferredLocation || "",
          learningStyle: user.learningStyle || "",
          budget: user.budget ? String(user.budget) : "",
        },
      }));
      if (user.profileImage) {
        setProfileImageUrl(user.profileImage);
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f1117]">
        <EduLoader overlay={false} message="Loading your profile…" />
      </div>
    );
  }
  if (!user) return null;

  const completion = calculateCompletion(profile);
  const initials = profile.personal.name
    ? profile.personal.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-[#f5f6fa] dark:bg-[#0f1117] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── HERO CARD ── */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-[#2a2d3a] mb-6 shadow-sm">
          {/* Decorative top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              <Avatar
                src={profileImageUrl}
                initials={initials}
                completion={completion}
                size="lg"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white truncate">
                  {profile.personal.name || "Your Name"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.career.field && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300 border border-violet-100 dark:border-violet-500/20">
                      {profile.career.field}
                    </span>
                  )}
                  {profile.personal.location && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20">
                      📍 {profile.personal.location}
                    </span>
                  )}
                  {profile.academic.qualification && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20">
                      🎓 {profile.academic.qualification}
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setShowEdit(true)}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-medium transition-all duration-150 shadow-sm shadow-violet-200 dark:shadow-violet-900/40"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z" />
                </svg>
                Edit Profile
              </button>
            </div>

            {/* Progress */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-[#2a2d3a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Profile Completion
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {completion}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-[#2a2d3a] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700 ease-out"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {Object.keys(profileFields).map((sec) => {
                  const done = profileFields[sec].every((f) => !!(profile as any)[sec][f.key]);
                  return (
                    <span
                      key={sec}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                        done
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-400 dark:bg-[#2a2d3a] dark:text-gray-500"
                      }`}
                    >
                      {done ? "✓ " : ""}
                      {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.keys(profileFields).map((section) => {
            const fields = profileFields[section];
            const sectionData = (profile as any)[section];
            const filledCount = fields.filter((f) => !!sectionData[f.key]).length;
            const isComplete = filledCount === fields.length;

            return (
              <div
                key={section}
                className="rounded-2xl bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-[#2a2d3a] shadow-sm hover:shadow-md dark:hover:shadow-black/20 transition-all duration-200 overflow-hidden group"
              >
                {/* Section Header */}
                <div className="px-5 py-4 border-b border-gray-50 dark:border-[#2a2d3a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center text-base">
                      {sectionIcons[section]}
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-gray-800 dark:text-white capitalize">
                        {section}
                      </h2>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {sectionDescriptions[section]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        isComplete
                          ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10"
                          : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10"
                      }`}
                    >
                      {filledCount}/{fields.length}
                    </span>
                  </div>
                </div>

                {/* Fields */}
                <div className="px-5 py-4 space-y-3">
                  {fields.map((field) => {
                    const val = sectionData[field.key];
                    return (
                      <div key={field.key} className="flex items-start justify-between gap-4">
                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 shrink-0 pt-0.5 w-28">
                          {field.label}
                        </span>
                        <span
                          className={`text-sm text-right ${
                            val
                              ? "text-gray-800 dark:text-gray-200"
                              : "text-red-400 dark:text-red-500 italic"
                          }`}
                        >
                          {val || "Not provided"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer CTA */}
                <div className="px-5 pb-4">
                  <button
                    onClick={() => {
                      setActiveSection(section);
                      setShowEdit(true);
                    }}
                    className="w-full text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 py-2 rounded-xl border border-dashed border-violet-200 dark:border-violet-500/20 hover:border-violet-400 dark:hover:border-violet-400/40 hover:bg-violet-50 dark:hover:bg-violet-500/5 transition-all"
                  >
                    {isComplete ? "Edit section →" : "Complete this section →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── EDIT MODAL ── */}
      {showEdit && (
        <EditModal
          profile={profile}
          profileImageUrl={profileImageUrl}
          setProfile={(p: Profile, newImageUrl?: string | null) => {
            setProfile(p);
            if (newImageUrl !== undefined) setProfileImageUrl(newImageUrl);
            showToast("success", "Profile updated successfully!");
          }}
          onError={() => showToast("error", "Something went wrong. Please try again later.")}
          user={user}
          close={() => setShowEdit(false)}
          defaultSection={activeSection}
        />
      )}

      {/* ── TOAST ── */}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
}

/* ---------------------------------- */
function calculateCompletion(profile: Profile): number {
  let total = 0;
  let filled = 0;
  Object.keys(profile).forEach((section) => {
    Object.values((profile as any)[section]).forEach((value: any) => {
      total++;
      if (value && value !== "") filled++;
    });
  });
  return Math.round((filled / total) * 100);
}

/* ---------------------------------- */
/* EDIT MODAL                         */
/* ---------------------------------- */

function EditModal({
  profile,
  profileImageUrl,
  setProfile,
  onError,
  close,
  user,
  defaultSection,
}: {
  profile: Profile;
  profileImageUrl: string | null;
  setProfile: (p: Profile, newImageUrl?: string | null) => void;
  onError: () => void;
  close: () => void;
  user: any;
  defaultSection: string;
}) {
  const [form, setForm] = useState<Profile>(profile);
  const [active, setActive] = useState(defaultSection);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(profileImageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = form.personal.name
    ? form.personal.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  /* ── IMAGE HANDLERS ── */
  const handleImageChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please select a valid image file." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "Image must be smaller than 5MB." }));
      return;
    }
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated["image"];
      return updated;
    });
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ── FORM HANDLERS ── */
  const handleChange = (section: string, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [key]: value },
    }));
    const errorKey = `${section}.${key}`;
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[errorKey];
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Age validation
    if (form.personal.age && !/^\d+$/.test(form.personal.age)) {
      newErrors["personal.age"] = "Age must be a valid number";
    } else if (form.personal.age) {
      const age = Number(form.personal.age);
      if (age < 1 || age > 120) newErrors["personal.age"] = "Age must be between 1 and 120";
    }

    // Phone validation
    if (form.personal.phone && !/^\+?[\d\s\-]{10,15}$/.test(form.personal.phone)) {
      newErrors["personal.phone"] = "Enter a valid phone number";
    }

    // CGPA validation
    if (form.academic.cgpa && isNaN(Number(form.academic.cgpa))) {
      newErrors["academic.cgpa"] = "CGPA must be a valid number";
    } else if (form.academic.cgpa) {
      const cgpa = Number(form.academic.cgpa);
      if (cgpa < 0 || cgpa > 10) newErrors["academic.cgpa"] = "CGPA must be between 0 and 10";
    }

    // Salary validation — strip non-numeric before checking
    if (form.goals.salary) {
      const salaryNum = parseFloat(form.goals.salary.replace(/[^0-9.]/g, ""));
      if (isNaN(salaryNum)) newErrors["goals.salary"] = "Expected salary must be a valid number";
    }

    // Budget validation — strip non-numeric before checking
    if (form.preferences.budget) {
      const budgetNum = parseFloat(form.preferences.budget.replace(/[^0-9.]/g, ""));
      if (isNaN(budgetNum)) newErrors["preferences.budget"] = "Budget must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async () => {
    setApiError("");
    const isValid = validateForm();
    if (!isValid) return;

    try {
      setSaving(true);

      if (!user?.id) {
        setApiError("User session expired. Please log in again.");
        return;
      }

      const payload = {
        phone: form.personal.phone || undefined,
        age: form.personal.age ? parseInt(form.personal.age, 10) : undefined,
        location: form.personal.location || undefined,
        qualification: form.academic.qualification || undefined,
        stream: form.academic.stream || undefined,
        institute: form.academic.institution || undefined,
        careerField: form.career.field || undefined,
        careerRole: form.career.roles || undefined,
        hobbies: form.career.hobbies || undefined,
        shortTermGoal: form.goals.shortTerm || undefined,
        longTermGoal: form.goals.longTerm || undefined,
        preferredLocation: form.preferences.location || undefined,
        learningStyle: form.preferences.learningStyle || undefined,
        cgpa: form.academic.cgpa ? parseFloat(form.academic.cgpa) : undefined,
        expectedSalary: form.goals.salary
          ? parseFloat(form.goals.salary.replace(/[^0-9.]/g, ""))
          : undefined,
        budget: form.preferences.budget
          ? parseFloat(form.preferences.budget.replace(/[^0-9.]/g, ""))
          : undefined,
      };

      const response = await authApi.updateUser(user.id, payload, imageFile);

      // ✅ Backend returns { message, user } — use user.profileImage
      const updatedImageUrl =
        response?.data?.user?.profileImage ??
        (imageFile ? imagePreview : profileImageUrl);

      setProfile(form, updatedImageUrl);
      close();
    } catch (error: any) {
      console.error("❌ Update failed:", error);
      setApiError(
        error?.errors?.[0]?.msg ||
        error?.message ||
        "Something went wrong. Please try again later."
      );
      onError();
    } finally {
      setSaving(false);
    }
  };

  const sectionList = Object.keys(profileFields);
  const currentFields = profileFields[active];
  const currentData = (form as any)[active];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1a1d27] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2a2d3a] overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-300">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#2a2d3a] shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Edit Profile</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Changes are saved when you click Save
            </p>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2d3a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── PROFILE IMAGE UPLOAD ── */}
        <div className="px-6 pt-5 shrink-0">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            {/* Avatar Preview */}
            <div className="relative shrink-0">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-200 dark:border-violet-500/30 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-semibold shadow-sm">
                  {initials}
                </div>
              )}
              {imagePreview && (
                <button
                  onClick={removeImage}
                  type="button"
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-sm transition-colors"
                  title="Remove photo"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 cursor-pointer rounded-xl border-2 border-dashed px-4 py-3 text-center transition-all duration-150 ${
                isDragging
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
                  : "border-gray-200 dark:border-[#2a2d3a] hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-gray-50 dark:hover:bg-[#2a2d3a]/40"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-violet-600 dark:text-violet-400">Click to upload</span>{" "}
                  or drag & drop
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-600">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
            />
          </div>
          {errors["image"] && (
            <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors["image"]}</p>
          )}
        </div>

        {/* Email (pinned) */}
        <div className="px-6 pt-4 shrink-0">
          <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1.5">
            Email address
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#12141c] border border-gray-200 dark:border-[#2a2d3a] text-sm text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            {user?.email}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="px-6 pt-4 shrink-0">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {sectionList.map((sec) => {
              const secData = (form as any)[sec];
              const done = profileFields[sec].every((f) => !!secData[f.key]);
              return (
                <button
                  key={sec}
                  onClick={() => setActive(sec)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    active === sec
                      ? "bg-violet-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-[#2a2d3a] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#32354a]"
                  }`}
                >
                  <span>{sectionIcons[sec]}</span>
                  <span className="capitalize">{sec}</span>
                  {done && (
                    <span className={`text-[10px] ${active === sec ? "text-violet-200" : "text-emerald-500"}`}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ✅ API Error — inside modal */}
        {apiError && (
          <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            {apiError}
          </div>
        )}

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{sectionIcons[active]}</span>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {active}
            </h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              — {sectionDescriptions[active]}
            </span>
          </div>

          {currentFields.map((field) => {
            // ✅ Only name is locked, phone is now editable
            const isLocked = active === "personal" && field.key === "name";
            const val = currentData[field.key] ?? "";
            const errorKey = `${active}.${field.key}`;
            const errorMessage = errors[errorKey];

            return (
              <div key={field.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {field.label}
                  </label>
                  {isLocked && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-600 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      Locked
                    </span>
                  )}
                </div>

                {field.type === "textarea" ? (
                  <textarea
                    value={val}
                    disabled={isLocked}
                    onChange={(e) => handleChange(active, field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all resize-none outline-none ${
                      isLocked
                        ? "bg-gray-50 dark:bg-[#12141c] text-gray-400 border-gray-200 dark:border-[#2a2d3a] cursor-not-allowed"
                        : errorMessage
                        ? "bg-white dark:bg-[#12141c] text-gray-800 dark:text-gray-100 border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                        : "bg-white dark:bg-[#12141c] text-gray-800 dark:text-gray-100 border-gray-200 dark:border-[#2a2d3a] hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                    }`}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={val}
                    disabled={isLocked}
                    onChange={(e) => handleChange(active, field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all outline-none ${
                      isLocked
                        ? "bg-gray-50 dark:bg-[#12141c] text-gray-400 border-gray-200 dark:border-[#2a2d3a] cursor-not-allowed"
                        : errorMessage
                        ? "bg-white dark:bg-[#12141c] text-gray-800 dark:text-gray-100 border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                        : "bg-white dark:bg-[#12141c] text-gray-800 dark:text-gray-100 border-gray-200 dark:border-[#2a2d3a] hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                    }`}
                  />
                )}

                {errorMessage && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-gray-100 dark:border-[#2a2d3a] bg-gray-50/50 dark:bg-[#12141c]/50 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {sectionList.indexOf(active) + 1} of {sectionList.length} sections
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={close}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-[#2a2d3a] hover:bg-gray-100 dark:hover:bg-[#2a2d3a] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm shadow-violet-200 dark:shadow-violet-900/30"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 