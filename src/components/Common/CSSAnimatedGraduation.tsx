"use client";

import React from "react";
import { Icon } from "@iconify/react";

const CSSAnimatedGraduation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-[300px] w-[320px] md:h-[360px] md:w-[400px] select-none scale-90 sm:scale-100 mx-auto">
      {/* Decorative Sparkle Trails */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          "animate-grad-sparkle-1",
          "animate-grad-sparkle-2",
          "animate-grad-sparkle-3",
          "animate-grad-sparkle-4",
          "animate-grad-sparkle-5",
        ].map((sparkleClass, i) => {
          const leftPositions = ["25%", "45%", "75%", "35%", "65%"];
          const delayTimes = ["0s", "1.2s", "0.6s", "2s", "1.5s"];
          return (
            <div
              key={i}
              className={`absolute bottom-28 h-2.5 w-2.5 bg-accent rounded-full opacity-0 ${sparkleClass}`}
              style={{
                left: leftPositions[i],
                animationDelay: delayTimes[i],
              }}
            />
          );
        })}
      </div>

      {/* Radial soft gradient glowing background */}
      <div className="absolute h-52 w-72 rounded-full bg-secondary/15 blur-3xl animate-glow-pulse dark:bg-secondary/25" />

      {/* Main interactive element container */}
      <div className="relative flex h-[220px] w-[280px] md:h-[260px] md:w-[320px] items-center justify-center transition-transform duration-500 hover:scale-105 animate-float">
        
        {/* Orbital Atom Ring of Knowledge (Floating Branch icons) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full absolute animate-spin-slow opacity-30 dark:opacity-40" viewBox="0 0 200 200">
            <ellipse
              cx="100"
              cy="100"
              rx="90"
              ry="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="text-secondary"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="40"
              ry="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="text-accent"
              style={{ transform: "rotate(45deg)", transformOrigin: "center" }}
            />
          </svg>

          {/* Floating Branch Icons (Orbital Items) */}
          <div className="absolute top-[15%] left-[15%] animate-orbit-icon-1 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 pointer-events-auto hover:scale-125 transition-transform duration-300">
            <Icon icon="solar:square-academic-cap-bold" className="text-secondary text-lg" />
          </div>
          <div className="absolute bottom-[15%] right-[15%] animate-orbit-icon-2 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 pointer-events-auto hover:scale-125 transition-transform duration-300">
            <Icon icon="solar:test-tube-minimalistic-bold" className="text-accent text-lg" />
          </div>
          <div className="absolute top-[20%] right-[10%] animate-orbit-icon-3 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 pointer-events-auto hover:scale-125 transition-transform duration-300">
            <Icon icon="solar:chart-square-bold" className="text-primary text-lg dark:text-white" />
          </div>
        </div>

        {/* 3D Graduation Cap (Mortarboard SVG) */}
        <div className="relative z-10 w-44 h-44 md:w-52 md:h-52 group cursor-pointer">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(23,30,76,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2"
          >
            {/* The Cap Base (Crown) */}
            <path
              d="M55,80 L55,108 C55,125 145,125 145,108 L145,80"
              className="fill-slate-800 dark:fill-slate-700 stroke-slate-900/10 dark:stroke-white/10"
              strokeWidth="2"
            />
            {/* Inner Cap shadow */}
            <path
              d="M65,80 L65,102 C65,116 135,116 135,102 L135,80"
              className="fill-slate-900 dark:fill-slate-800 opacity-60"
            />
            
            {/* Graduation Cap Top (The Diamond Plate) */}
            <polygon
              points="100,35 185,70 100,105 15,70"
              className="fill-slate-800 dark:fill-slate-600 stroke-slate-900 dark:stroke-slate-500"
              strokeWidth="3.5"
            />
            {/* Glowing top highlights */}
            <polygon
              points="100,42 170,70 100,98 30,70"
              className="fill-slate-700 dark:fill-slate-500 opacity-40"
            />
            
            {/* Center Cap Button */}
            <ellipse
              cx="100"
              cy="70"
              rx="8"
              ry="4"
              className="fill-accent stroke-slate-900/40"
              strokeWidth="1.5"
            />

            {/* The Hanging Tassel (Animate when group hovered) */}
            <g className="origin-[100px_70px] animate-tassel-sway group-hover:animate-tassel-active">
              {/* Tassel String */}
              <path
                d="M100,70 C70,72 56,92 56,120"
                fill="none"
                className="stroke-accent"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Tassel Ring Connection */}
              <circle
                cx="56"
                cy="120"
                r="3.5"
                className="fill-accent"
              />
              {/* Tassel Fringe/Brush */}
              <polygon
                points="56,120 48,150 64,150"
                className="fill-accent stroke-accent/20"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>

        {/* 3D Certificate/Diploma Scroll (Positions slightly to bottom-right of Cap) */}
        <div className="absolute bottom-4 right-2 z-20 w-28 h-20 group/scroll cursor-pointer transition-all duration-300 hover:scale-110 hover:-rotate-12">
          <svg
            viewBox="0 0 120 80"
            className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(23,30,76,0.15)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
          >
            {/* Diploma Body (Rolled Paper) */}
            <rect
              x="20"
              y="25"
              width="80"
              height="30"
              rx="4"
              transform="rotate(-15, 60, 40)"
              className="fill-linear-to-r from-slate-100 via-white to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-600 stroke-slate-200 dark:stroke-slate-700"
              strokeWidth="1.5"
            />
            {/* Roll spiral ends */}
            <ellipse
              cx="19"
              cy="48"
              rx="4"
              ry="10"
              transform="rotate(-15, 19, 48)"
              className="fill-slate-200 dark:fill-slate-600 stroke-slate-300 dark:stroke-slate-500"
              strokeWidth="1"
            />
            <ellipse
              cx="97"
              cy="27"
              rx="4"
              ry="10"
              transform="rotate(-15, 97, 27)"
              className="fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-500"
              strokeWidth="1"
            />
            {/* Gold Ribbon tie */}
            <rect
              x="55"
              y="22"
              width="10"
              height="36"
              rx="1.5"
              transform="rotate(-15, 60, 40)"
              className="fill-accent stroke-accent/40"
              strokeWidth="1"
            />
            {/* Ribbon dangling ends */}
            <path
              d="M 64,48 L 74,68 L 68,69 Z"
              className="fill-accent stroke-accent/30"
              strokeWidth="0.5"
            />
            <path
              d="M 58,49 L 60,72 L 53,70 Z"
              className="fill-accent stroke-accent/30"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Floating Sparkles and Success Emotes */}
        <div className="absolute top-10 left-12 animate-sparkle delay-200 opacity-60">
          <Icon icon="solar:star-fall-minimalistic-bold-duotone" className="text-accent text-xl" />
        </div>
        <div className="absolute top-6 right-16 animate-sparkle delay-700 opacity-60">
          <Icon icon="solar:star-shine-bold" className="text-secondary text-2xl" />
        </div>
      </div>

      {/* Embedded High-End CSS Keyframes */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        /* Sparkle Trails */
        @keyframes gradSparkle {
          0% {
            transform: translateY(0) scale(0.4) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-130px) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-grad-sparkle-1 { animation: gradSparkle 4.5s infinite ease-in-out; }
        .animate-grad-sparkle-2 { animation: gradSparkle 5.2s infinite ease-in-out; }
        .animate-grad-sparkle-3 { animation: gradSparkle 4.8s infinite ease-in-out; }
        .animate-grad-sparkle-4 { animation: gradSparkle 6s infinite ease-in-out; }
        .animate-grad-sparkle-5 { animation: gradSparkle 5.6s infinite ease-in-out; }

        /* Tassel swaying naturally */
        @keyframes tasselSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes tasselActive {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(12deg); }
        }
        .animate-tassel-sway {
          transform-origin: 100px 70px;
          animation: tasselSway 4s ease-in-out infinite;
        }
        .animate-tassel-active {
          transform-origin: 100px 70px;
          animation: tasselActive 1.8s ease-in-out infinite;
        }

        /* Floating Orbital Branch Icons */
        @keyframes floatIcon1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes floatIcon2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(6px) rotate(-8deg); }
        }
        @keyframes floatIcon3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(-4deg); }
        }
        .animate-orbit-icon-1 { animation: floatIcon1 3.5s ease-in-out infinite; }
        .animate-orbit-icon-2 { animation: floatIcon2 4.2s ease-in-out infinite; }
        .animate-orbit-icon-3 { animation: floatIcon3 3.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default CSSAnimatedGraduation;
