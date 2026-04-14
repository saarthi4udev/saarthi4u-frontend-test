"use client";

/**
 * EduLoader — A reusable education-themed animated loader.
 *
 * Usage:
 *   <EduLoader />                        — centered fullscreen overlay (default)
 *   <EduLoader overlay={false} />         — inline, no overlay
 *   <EduLoader size="sm" />               — small variant (inline buttons etc.)
 *   <EduLoader message="Fetching..." />   — custom message
 */

import { Icon } from "@iconify/react";

type EduLoaderProps = {
  overlay?: boolean;
  size?: "sm" | "md" | "lg";
  message?: string;
};

const sizes = {
  sm: {
    wrapper: "w-36 gap-3 py-5 px-4",
    ring: "w-14 h-14 border-[3px]",
    icon: "w-7 h-7",
    dots: "h-1.5 w-1.5",
    text: "text-xs",
    line: "w-16",
  },
  md: {
    wrapper: "w-52 gap-4 py-8 px-6",
    ring: "w-20 h-20 border-[3px]",
    icon: "w-10 h-10",
    dots: "h-2 w-2",
    text: "text-sm",
    line: "w-24",
  },
  lg: {
    wrapper: "w-64 gap-5 py-10 px-8",
    ring: "w-24 h-24 border-4",
    icon: "w-12 h-12",
    dots: "h-2.5 w-2.5",
    text: "text-base",
    line: "w-28",
  },
};

export default function EduLoader({
  overlay = true,
  size = "md",
  message = "Loading your learning path…",
}: EduLoaderProps) {
  const s = sizes[size];

  const loaderContent = (
    <div className={`flex flex-col items-center ${s.wrapper} rounded-3xl bg-white/95 shadow-[0_20px_60px_rgba(10,24,58,0.14)] backdrop-blur-md dark:bg-slate-900/95 dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}>

      {/* Spinning ring + cap icon */}
      <div className="relative flex items-center justify-center">
        <div
          className={`${s.ring} absolute rounded-full border-secondary/20 border-t-secondary`}
          style={{ animation: "edu-spin 1s linear infinite" }}
        />
        <div
          className={`${s.ring} absolute rounded-full border-transparent border-b-primary/15`}
          style={{ animation: "edu-spin 1.6s linear infinite reverse" }}
        />
        <div style={{ animation: "edu-float 2s ease-in-out infinite" }}>
          <Icon icon="solar:square-academic-cap-bold-duotone" className={`${s.icon} text-secondary drop-shadow-sm`} />
        </div>
      </div>

      {/* Decorative line */}
      <div className={`${s.line} h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent`} />

      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`${s.dots} inline-block rounded-full bg-secondary`}
            style={{
              animation: "edu-bounce 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>

      {/* Message */}
      {message && (
        <p className={`${s.text} text-center font-semibold tracking-wide text-primary/60 dark:text-slate-400`}>
          {message}
        </p>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes edu-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes edu-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes edu-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-7px); opacity: 1; }
        }
      `}</style>
    </div>
  );

  if (!overlay) {
    return <div className="flex items-center justify-center py-10">{loaderContent}</div>;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md dark:bg-[#0B1929]/70">
      {loaderContent}
    </div>
  );
}
