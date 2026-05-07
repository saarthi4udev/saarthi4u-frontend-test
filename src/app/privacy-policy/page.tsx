import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Saarthi4u - Secure Career Counseling Platform",
  description: "Your privacy is important to us. Read Saarthi4u's privacy policy to understand how we protect your personal information.",
};

const sections = [
  {
    icon: "📋",
    title: "Introduction & Scope",
    content:
      "This Privacy Policy applies to all users of Saarthi4u including students, parents, institutions, and visitors. It governs data collected through our website, counseling services, and communication channels.",
  },
  {
    icon: "📊",
    title: "Information We Collect",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Personal details (name, email, phone number)</li>
        <li>Education and location information</li>
        <li>Device, browser, and usage analytics</li>
      </ul>
    ),
  },
  {
    icon: "🎯",
    title: "How We Use Information",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Provide counseling and platform services</li>
        <li>Personalize recommendations</li>
        <li>Improve platform experience</li>
        <li>Respond to queries and support requests</li>
      </ul>
    ),
  },
  {
    icon: "🔐",
    title: "Data Sharing & Disclosure",
    content:
      "We do not sell or rent your personal information. Data is shared only with trusted partners, institutions (with consent), or when required by law.",
  },
  {
    icon: "🛡️",
    title: "Data Security",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Encrypted data transmission</li>
        <li>Secure servers and access controls</li>
        <li>Continuous monitoring and updates</li>
      </ul>
    ),
  },
  {
    icon: "👤",
    title: "User Rights & Choices",
    content:
      "You may access, update, correct, or request deletion of your data by contacting info@saarthi4u.com.",
  },
  {
    icon: "🗄️",
    title: "Data Retention",
    content:
      "We retain personal data only as long as necessary to deliver services and meet legal requirements.",
  },
  {
    icon: "🔗",
    title: "Third-Party Links",
    content:
      "Saarthi4u is not responsible for the privacy practices of external websites. Please review their policies independently.",
  },
  {
    icon: "👶",
    title: "Children’s Privacy",
    content:
      "We do not knowingly collect personal data from children without parental consent.",
  },
  {
    icon: "🔄",
    title: "Policy Updates",
    content:
      "This policy may be updated periodically. Continued use of Saarthi4u indicates acceptance of the revised policy.",
  },
];

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-white dark:bg-slate-900 w-full">

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-24 bg-heroBg dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-6 grid items-center gap-16 lg:grid-cols-2">

          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Privacy Policy
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              We respect your privacy and are committed to protecting your
              personal information across Saarthi4u’s platform and services.
            </p>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Last Updated: February 07, 2026 • Reading time: ~7–8 minutes
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-md bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                Transparency
              </span>
              <span className="rounded-md bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                Data Protection
              </span>
              <span className="rounded-md bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                User Trust
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -top-12 -right-12 h-72 w-72 rounded-full bg-secondary/15 blur-3xl opacity-70"></div>
            <img
              src="/images/privacy-hero.png"
              alt="Privacy and data protection"
              className="relative z-10 w-full max-w-xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-2">

          {sections.map((section, index) => (
            <div
              key={index}
              className="
                group relative rounded-xl
                border border-slate-200 bg-white p-8
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:border-secondary
                dark:bg-slate-800 dark:border-slate-700
              "
            >
              {/* Accent bar */}
              <div
                className="
                  absolute left-0 top-0 h-full w-1 bg-secondary
                  scale-y-0 origin-top transition-transform duration-300
                  group-hover:scale-y-100
                "
              />

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary/10 text-xl">
                  {section.icon}
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
            Contact Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            For privacy-related questions, contact us at{" "}
            <a
              href="mailto:info@saarthi4u.com"
              className="font-semibold text-secondary hover:underline"
            >
              info@saarthi4u.com
            </a>
          </p>
        </div>
      </section>

      {/* ================= FOOT NOTE ================= */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            We are committed to transparency and safeguarding your personal data.
          </p>
        </div>
      </section>

    </main>
  );
};

export default PrivacyPolicyPage;
