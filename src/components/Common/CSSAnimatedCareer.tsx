"use client";

import React from "react";
import { Icon } from "@iconify/react";

const CSSAnimatedCareer: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-[320px] w-[320px] md:h-[380px] md:w-[380px] select-none scale-90 sm:scale-100 mx-auto group cursor-pointer">
      {/* Immersive glow behind the staircase */}
      <div className="absolute h-56 w-72 rounded-full bg-secondary/15 blur-3xl animate-glow-pulse dark:bg-secondary/25" />

      {/* Floating Sparkle Particles at the peak */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          "animate-career-sparkle-1",
          "animate-career-sparkle-2",
          "animate-career-sparkle-3",
          "animate-career-sparkle-4",
        ].map((particleClass, i) => {
          const leftPositions = ["50%", "45%", "55%", "48%"];
          const delayTimes = ["0s", "0.8s", "0.4s", "1.2s"];
          return (
            <div
              key={i}
              className={`absolute top-16 h-2 w-2 bg-accent rounded-full opacity-0 ${particleClass}`}
              style={{
                left: leftPositions[i],
                animationDelay: delayTimes[i],
              }}
            />
          );
        })}
      </div>

      {/* Main Career Staircase & Path Graphic */}
      <div className="relative flex h-[260px] w-[280px] md:h-[300px] md:w-[320px] items-center justify-center transition-transform duration-500 hover:scale-105">
        
        {/* Orbital Success Rings */}
        <div className="absolute top-12 flex items-center justify-center pointer-events-none">
          <svg className="w-48 h-48 animate-spin-slow opacity-25 dark:opacity-35" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              className="text-accent"
            />
          </svg>
        </div>

        {/* 1. Milestone Platforms (Staircase Steps) */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
          
          {/* Step 3 (Achieve - Top) */}
          <div className="relative flex items-center gap-3 self-end w-[60%] bg-gradient-to-r from-secondary to-secondary/80 border border-secondary/15 rounded-xl px-4 py-3 shadow-md dark:border-white/10 transition-all duration-300 hover:translate-x-[-4px] z-20">
            <Icon icon="solar:medal-bold" className="text-white text-lg shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-accent tracking-wider uppercase leading-none">Step 3</p>
              <p className="text-xs font-bold text-white truncate mt-0.5">Career Success</p>
            </div>
            {/* Pulsing beacon star */}
            <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-accent animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-accent border-2 border-white dark:border-slate-800" />
          </div>

          {/* Step 2 (Counsel - Middle) */}
          <div className="relative flex items-center gap-3 self-center w-[65%] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-sm transition-all duration-300 hover:translate-x-[4px] z-10">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15">
              <Icon icon="solar:chat-square-bold" className="text-accent text-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-secondary tracking-wider uppercase leading-none">Step 2</p>
              <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate mt-0.5">Expert Mentoring</p>
            </div>
          </div>

          {/* Step 1 (Explore - Bottom) */}
          <div className="relative flex items-center gap-3 self-start w-[60%] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-sm transition-all duration-300 hover:translate-x-[-4px]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Icon icon="solar:compass-bold" className="text-primary dark:text-white text-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-secondary tracking-wider uppercase leading-none">Step 1</p>
              <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate mt-0.5">Explore Options</p>
            </div>
          </div>

        </div>

        {/* 2. Interactive Climbing Student Dot (Runs up the steps on group hover!) */}
        <div className="absolute bottom-[36px] left-[55px] h-3.5 w-3.5 rounded-full bg-accent border-2 border-white shadow-md z-30 transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:bottom-[172px] group-hover:left-[178px] group-hover:scale-125 animate-pulse-glow" />

        {/* 3. The Graduation Cap and Portal of Success at the Peak */}
        <div className="absolute top-8 right-12 z-20 flex flex-col items-center">
          {/* Pulsing Aura of Success */}
          <div className="absolute h-16 w-16 bg-accent/20 rounded-full blur-xl animate-glow-pulse" />
          
          <div className="relative animate-float duration-3000">
            <svg viewBox="0 0 100 80" className="w-20 h-16 filter drop-shadow-[0_8px_16px_rgba(23,30,76,0.18)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
              {/* Cap Base */}
              <path d="M28,36 L28,48 C28,55 72,55 72,48 L72,36" className="fill-slate-800 dark:fill-slate-700" />
              {/* Cap Diamond Top */}
              <polygon points="50,15 90,32 50,49 10,32" className="fill-slate-800 dark:fill-slate-600 stroke-slate-900 dark:stroke-slate-500" strokeWidth="1.5" />
              {/* Gold Button */}
              <ellipse cx="50" cy="32" rx="4" ry="2" className="fill-accent" />
              {/* Swaying Tassel */}
              <path d="M50,32 C38,34 31,42 31,52" fill="none" className="stroke-accent animate-career-tassel origin-[50px_32px]" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* 4. Orbiting items representing fields of work */}
        <div className="absolute top-1/2 left-2 animate-career-float-item bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 hover:scale-125 transition-transform duration-300">
          <Icon icon="solar:code-circle-bold" className="text-secondary text-lg" />
        </div>
        <div className="absolute top-20 left-[20%] animate-career-float-item bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 hover:scale-125 transition-transform duration-300" style={{ animationDelay: "1.5s" }}>
          <Icon icon="solar:bill-list-bold" className="text-accent text-lg" />
        </div>
        <div className="absolute bottom-[35%] right-2 animate-career-float-item bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 hover:scale-125 transition-transform duration-300" style={{ animationDelay: "2.8s" }}>
          <Icon icon="solar:folder-with-files-bold" className="text-primary dark:text-white text-lg" />
        </div>

      </div>

      {/* Embedded High-End Career Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        /* Swaying Tassel */
        @keyframes careerTassel {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-career-tassel {
          transform-origin: 50px 32px;
          animation: careerTassel 3.5s ease-in-out infinite;
        }

        /* Sparkles */
        @keyframes careerSparkle {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80px) scale(1.1);
            opacity: 0;
          }
        }
        .animate-career-sparkle-1 { animation: careerSparkle 3.5s infinite ease-in-out; }
        .animate-career-sparkle-2 { animation: careerSparkle 4s infinite ease-in-out; }
        .animate-career-sparkle-3 { animation: careerSparkle 3.2s infinite ease-in-out; }
        .animate-career-sparkle-4 { animation: careerSparkle 4.5s infinite ease-in-out; }

        /* Floating elements */
        @keyframes careerFloatItem {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .animate-career-float-item {
          animation: careerFloatItem 4s ease-in-out infinite;
        }

        /* Student dot glow effect */
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(48, 216, 201, 0.5); }
          70% { box-shadow: 0 0 0 8px rgba(48, 216, 201, 0); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default CSSAnimatedCareer;
