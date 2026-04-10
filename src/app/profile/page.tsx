// "use client";

// import { useAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// /* ---------------------------------- */
// /* PROFILE FIELD CONFIGURATION */
// /* ---------------------------------- */

// const profileFields: any = {
//   personal: [
//     { key: "name", label: "Full Name", type: "text" },
//     { key: "age", label: "Age", type: "number" },
//     { key: "phone", label: "Phone Number", type: "tel" },
//     { key: "location", label: "Location", type: "text" },
//   ],
//   academic: [
//     { key: "qualification", label: "Qualification", type: "text" },
//     { key: "stream", label: "Stream", type: "text" },
//     { key: "cgpa", label: "CGPA", type: "text" },
//     { key: "institution", label: "Institution", type: "text" },
//   ],
//   career: [
//     { key: "field", label: "Career Field", type: "text" },
//     { key: "roles", label: "Roles", type: "text" },
//     { key: "hobbies", label: "Hobbies", type: "text" },
//   ],
//   goals: [
//     { key: "shortTerm", label: "Short Term Goals", type: "textarea" },
//     { key: "longTerm", label: "Long Term Goals", type: "textarea" },
//     { key: "salary", label: "Expected Salary", type: "text" },
//   ],
//   preferences: [
//     { key: "location", label: "Preferred Location", type: "text" },
//     { key: "learningStyle", label: "Learning Style", type: "text" },
//     { key: "budget", label: "Budget", type: "text" },
//   ],
// };

// /* ---------------------------------- */
// /* MAIN PAGE */
// /* ---------------------------------- */

// export default function ProfilePage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   const [showEdit, setShowEdit] = useState(false);

//   const [profile, setProfile] = useState<any>({
//     personal: { name: "", age: "", phone: "", location: "" },
//     academic: { qualification: "", stream: "", cgpa: "", institution: "" },
//     career: { field: "", roles: "", hobbies: "" },
//     goals: { shortTerm: "", longTerm: "", salary: "" },
//     preferences: { location: "", learningStyle: "", budget: "" },
//   });

//   useEffect(() => {
//     if (!loading && !user) router.push("/signin");

//     if (user) {
//       setProfile((prev: any) => ({
//         ...prev,
//         personal: {
//           ...prev.personal,
//           name: user.name,
//           phone: user.phone || "",
//         },
//       }));
//     }
//   }, [user, loading, router]);

//   if (loading) return <p className="p-10 text-center">Loading...</p>;
//   if (!user) return null;

//   const completion = calculateCompletion(profile);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">

//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow p-6 mb-6">

//         <div className="flex items-center justify-between">

//           <div className="flex items-center gap-6">

//             <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
//               {profile.personal.name?.charAt(0)}
//             </div>

//             <div>
//               <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
//                 {profile.personal.name}
//               </h1>
//               <p className="text-gray-500">{user.email}</p>
//             </div>

//           </div>

//           <button
//             onClick={() => setShowEdit(true)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
//           >
//             Edit Profile
//           </button>

//         </div>

//         {/* COMPLETION */}
//         <div className="mt-6">
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-gray-600 dark:text-gray-300">Profile Completion</span>
//             <span className="text-gray-600 dark:text-gray-300">{completion}%</span>
//           </div>

//           <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
//             <div
//               className="bg-indigo-600 h-2 rounded"
//               style={{ width: `${completion}%` }}
//             />
//           </div>
//         </div>

//       </div>

//       {/* SECTIONS */}
//       <div className="max-w-6xl mx-auto grid gap-6">

//         {Object.keys(profileFields).map((section) => (
//           <div key={section} className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

//             <h2 className="text-lg font-semibold mb-4 capitalize text-gray-800 dark:text-white">
//               {section}
//             </h2>

//             <div className="grid gap-2">
//               {profileFields[section].map((field: any) => (
//                 <Item
//                   key={field.key}
//                   label={field.label}
//                   value={profile[section][field.key]}
//                 />
//               ))}
//             </div>

//           </div>
//         ))}

//       </div>

//       {showEdit && (
//         <EditModal
//           profile={profile}
//           setProfile={setProfile}
//           user={user}
//           close={() => setShowEdit(false)}
//         />
//       )}

//     </div>
//   );
// }

// /* ---------------------------------- */
// function calculateCompletion(profile: any) {
//   let total = 0;
//   let filled = 0;

//   Object.keys(profile).forEach((section) => {
//     Object.values(profile[section]).forEach((value: any) => {
//       total++;
//       if (value && value !== "") filled++;
//     });
//   });

//   return Math.round((filled / total) * 100);
// }

// /* ---------------------------------- */
// function Item({ label, value }: any) {
//   return (
//     <p className="text-sm text-gray-700 dark:text-gray-300">
//       <span className="text-gray-500">{label}:</span>
//       <span className="ml-2">
//         {value ? value : <span className="text-red-400">Not Provided</span>}
//       </span>
//     </p>
//   );
// }

// /* ---------------------------------- */
// /* EDIT MODAL */
// /* ---------------------------------- */

// function EditModal({ profile, setProfile, close, user }: any) {
//   const [form, setForm] = useState(profile);

//   const handleChange = (section: string, key: string, value: any) => {
//     setForm((prev: any) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [key]: value,
//       },
//     }));
//   };

//   const save = () => {
//     setProfile(form);
//     close();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

//       <div className="bg-white dark:bg-slate-900 w-[750px] max-h-[90vh] overflow-y-auto rounded-xl p-6">

//         <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
//           Edit Profile
//         </h2>

//         {/* EMAIL */}
//         <div className="mb-4">
//           <label className="text-sm text-gray-500">Email</label>
//           <input
//             value={user?.email}
//             disabled
//             className="w-full border p-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {Object.keys(profileFields).map((section) => (
//           <div key={section} className="mb-6">

//             <h3 className="font-semibold mb-3 capitalize border-b pb-1 text-gray-700 dark:text-gray-200">
//               {section}
//             </h3>

//             {profileFields[section].map((field: any) => {
//               const isDisabled = field.key === "phone" || field.key === "name";

//               return (
//                 <div key={field.key} className="mb-4">

//                   <label className="text-sm text-gray-500">
//                     {field.label}
//                   </label>

//                   {field.type === "textarea" ? (
//                     <textarea
//                       value={form[section][field.key]}
//                       disabled={isDisabled}
//                       onChange={(e) =>
//                         handleChange(section, field.key, e.target.value)
//                       }
//                       className={`w-full border p-2 rounded mt-1 dark:bg-slate-800 dark:text-white ${
//                         isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
//                       }`}
//                     />
//                   ) : (
//                     <input
//                       type={field.type}
//                       value={form[section][field.key]}
//                       disabled={isDisabled}
//                       onChange={(e) =>
//                         handleChange(section, field.key, e.target.value)
//                       }
//                       className={`w-full border p-2 rounded mt-1 dark:bg-slate-800 dark:text-white ${
//                         isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
//                       }`}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         ))}

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={close}
//             className="border px-4 py-2 rounded dark:border-gray-600"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={save}
//             className="bg-indigo-600 text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </div>

//       </div>

//     </div>
//   );
// }


"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const profileFields: Record<string, { key: string; label: string; type: string; placeholder?: string }[]> = {
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
    { key: "shortTerm", label: "Short Term Goals", type: "textarea", placeholder: "Get an internship at a top-tier startup..." },
    { key: "longTerm", label: "Long Term Goals", type: "textarea", placeholder: "Build a product that impacts millions..." },
    { key: "salary", label: "Expected Salary", type: "text", placeholder: "₹12 LPA" },
  ],
  preferences: [
    { key: "location", label: "Preferred Location", type: "text", placeholder: "Bangalore / Remote" },
    { key: "learningStyle", label: "Learning Style", type: "text", placeholder: "Visual, Project-based" },
    { key: "budget", label: "Budget", type: "text", placeholder: "₹5,000/month" },
  ],
};

type ProfileSection = {
  name: string;
  age: string;
  phone: string;
  location: string;
};

type Profile = {
  personal: { name: string; age: string; phone: string; location: string };
  academic: { qualification: string; stream: string; cgpa: string; institution: string };
  career: { field: string; roles: string; hobbies: string };
  goals: { shortTerm: string; longTerm: string; salary: string };
  preferences: { location: string; learningStyle: string; budget: string };
};

/* ---------------------------------- */
/* MAIN PAGE                          */
/* ---------------------------------- */

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [showEdit, setShowEdit] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    personal: { name: "", age: "", phone: "", location: "" },
    academic: { qualification: "", stream: "", cgpa: "", institution: "" },
    career: { field: "", roles: "", hobbies: "" },
    goals: { shortTerm: "", longTerm: "", salary: "" },
    preferences: { location: "", learningStyle: "", budget: "" },
  });

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
    if (user) {
      setProfile((prev) => ({
        ...prev,
        personal: { ...prev.personal, name: user.name, phone: user.phone || "" },
      }));
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f1117]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }
  if (!user) return null;

  const completion = calculateCompletion(profile);
  const initials = profile.personal.name
    ? profile.personal.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const filledSections = Object.keys(profileFields).filter((section) =>
    profileFields[section].every((f) => !!(profile as any)[section][f.key])
  );

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
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-semibold shadow-md shadow-violet-200 dark:shadow-violet-900/30">
                  {initials}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#1a1d27] ${completion === 100 ? "bg-emerald-400" : "bg-amber-400"}`} />
              </div>

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
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Profile Completion</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{completion}%</span>
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
                      {done ? "✓ " : ""}{sec.charAt(0).toUpperCase() + sec.slice(1)}
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
                      <h2 className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{section}</h2>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{sectionDescriptions[section]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isComplete ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10" : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10"}`}>
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
                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 shrink-0 pt-0.5 w-28">{field.label}</span>
                        <span className={`text-sm text-right ${val ? "text-gray-800 dark:text-gray-200" : "text-red-400 dark:text-red-500 italic"}`}>
                          {val || "Not provided"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer CTA */}
                <div className="px-5 pb-4">
                  <button
                    onClick={() => { setActiveSection(section); setShowEdit(true); }}
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
          setProfile={(p: Profile) => {
            setProfile(p);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
          }}
          user={user}
          close={() => setShowEdit(false)}
          defaultSection={activeSection}
        />
      )}

      {/* ── TOAST ── */}
      {saveSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium animate-in slide-in-from-bottom-4 duration-300">
          <svg className="w-4 h-4 text-emerald-400 dark:text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Profile saved successfully
        </div>
      )}
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
  setProfile,
  close,
  user,
  defaultSection,
}: {
  profile: Profile;
  setProfile: (p: Profile) => void;
  close: () => void;
  user: any;
  defaultSection: string;
}) {
  const [form, setForm] = useState<Profile>(profile);
  const [active, setActive] = useState(defaultSection);

  const handleChange = (section: string, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [key]: value },
    }));
  };

  const save = () => {
    setProfile(form);
    close();
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
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Changes are saved locally until you click Save</p>
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

        {/* Email (pinned) */}
        <div className="px-6 pt-4 shrink-0">
          <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1.5">Email address</label>
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
                  {done && <span className={`text-[10px] ${active === sec ? "text-violet-200" : "text-emerald-500"}`}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{sectionIcons[active]}</span>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">{active}</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">— {sectionDescriptions[active]}</span>
          </div>

          {currentFields.map((field) => {
            const isLocked = field.key === "phone" || (active === "personal" && field.key === "name");
            const val = currentData[field.key] ?? "";

            return (
              <div key={field.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{field.label}</label>
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
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all resize-none outline-none
                      ${isLocked
                        ? "bg-gray-50 dark:bg-[#12141c] text-gray-400 border-gray-200 dark:border-[#2a2d3a] cursor-not-allowed"
                        : "bg-white dark:bg-[#12141c] text-gray-800 dark:text-gray-100 border-gray-200 dark:border-[#2a2d3a] hover:border-violet-300 dark:hover:border-violet-500/40 focus:border-violet-500 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                      }`}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={val}
                    disabled={isLocked}
                    onChange={(e) => handleChange(active, field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all outline-none
                      ${isLocked
                        ? "bg-gray-50 dark:bg-[#12141c] text-gray-400 border-gray-200 dark:border-[#2a2d3a] cursor-not-allowed"
                        : "bg-white dark:bg-[#12141c] text-gray-800 dark:text-gray-100 border-gray-200 dark:border-[#2a2d3a] hover:border-violet-300 dark:hover:border-violet-500/40 focus:border-violet-500 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                      }`}
                  />
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
              className="px-5 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 active:scale-95 text-white rounded-xl transition-all shadow-sm shadow-violet-200 dark:shadow-violet-900/30"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}