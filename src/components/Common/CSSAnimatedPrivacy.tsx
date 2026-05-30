"use client";

import React from "react";

const CSSAnimatedPrivacy: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-[300px] w-[320px] md:h-[380px] md:w-[400px] select-none scale-90 sm:scale-100">
      {/* CSS Styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes privacy-spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes privacy-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes privacy-pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.35; }
        }
        @keyframes privacy-radar {
          0% { transform: scale(0.85); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 0.4; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        @keyframes privacy-float-item {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes privacy-binary-float {
          0% { transform: translateY(0px) scale(0.6); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }
        .privacy-animate-spin-slow {
          animation: privacy-spin-slow 20s linear infinite;
        }
        .privacy-animate-spin-reverse {
          animation: privacy-spin-reverse 15s linear infinite;
        }
        .privacy-animate-pulse-glow {
          animation: privacy-pulse-glow 6s ease-in-out infinite;
        }
        .privacy-animate-radar {
          animation: privacy-radar 4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .privacy-animate-float-node {
          animation: privacy-float-item 6s ease-in-out infinite;
        }
        .privacy-animate-binary-1 {
          animation: privacy-binary-float 5s ease-in-out infinite;
        }
        .privacy-animate-binary-2 {
          animation: privacy-binary-float 6s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .privacy-animate-binary-3 {
          animation: privacy-binary-float 7s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}} />

      {/* Ambient background glowing blob */}
      <div className="absolute h-56 w-72 rounded-full bg-secondary/15 blur-3xl privacy-animate-pulse-glow dark:bg-secondary/10" />

      {/* Pulsing Radar Ring */}
      <div className="absolute h-64 w-64 rounded-full border border-secondary/20 privacy-animate-radar pointer-events-none" />
      <div className="absolute h-48 w-48 rounded-full border border-accent/25 privacy-animate-radar pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Main Interactive Vector Container */}
      <div className="relative group w-full h-full flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
        
        {/* SVG Structure */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 400 400" 
          className="w-full h-full max-w-[340px] md:max-w-[380px]"
        >
          {/* Definitions for beautiful gradients */}
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A2BE2" /> {/* Secondary / Purple */}
              <stop offset="100%" stopColor="#4169E1" /> {/* Primary / Accent */}
            </linearGradient>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(138, 43, 226, 0.4)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgba(138, 43, 226, 0)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4169E1" stopOpacity="0" />
              <stop offset="50%" stopColor="#8A2BE2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#8A2BE2" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Dotted Orbit Pathways */}
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700/60" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary/15 dark:text-secondary/10" />

          {/* Dotted Circuit Connector lines flowing into center */}
          <path d="M 50,200 L 150,200" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="3 4" />
          <path d="M 350,200 L 250,200" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="3 4" />
          <path d="M 200,50 L 200,150" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="3 4" />
          <path d="M 200,350 L 200,250" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="3 4" />

          {/* Rotational Scanner Ring 1 (Slow Clockwise) */}
          <g className="privacy-animate-spin-slow origin-[200px_200px]">
            <circle cx="200" cy="200" r="125" fill="none" stroke="currentColor" className="text-secondary/30 dark:text-secondary/20" strokeWidth="1.5" strokeDasharray="40 180" />
            <circle cx="200" cy="200" r="125" fill="none" stroke="currentColor" className="text-accent/35 dark:text-accent/25" strokeWidth="1.5" strokeDasharray="15 300" />
          </g>

          {/* Rotational Scanner Ring 2 (Faster Counter-Clockwise) */}
          <g className="privacy-animate-spin-reverse origin-[200px_200px]">
            <circle cx="200" cy="200" r="95" fill="none" stroke="currentColor" className="text-secondary/25 dark:text-secondary/15" strokeWidth="2" strokeDasharray="70 200" strokeDashoffset="40" />
            <circle cx="200" cy="200" r="95" fill="none" stroke="currentColor" className="text-accent/30 dark:text-accent/20" strokeWidth="1" strokeDasharray="30 150" />
          </g>

          {/* Outer Protection Shield Layout (Glowing Base) */}
          <g filter="url(#shadow)" className="transition-transform duration-500 group-hover:scale-105 origin-[200px_200px]">
            {/* The main outer shield outline */}
            <path 
              d="M 200,90 C 235,90 270,105 285,130 C 285,190 270,255 200,295 C 130,255 115,190 115,130 C 130,105 165,90 200,90 Z" 
              fill="url(#shieldGrad)" 
              className="opacity-95"
            />
            {/* Secondary Inner Layer Shield */}
            <path 
              d="M 200,105 C 228,105 256,117 268,137 C 268,187 256,239 200,273 C 144,239 132,187 132,137 C 144,117 172,105 200,105 Z" 
              fill="#FFFFFF" 
              className="opacity-15 dark:fill-slate-900 dark:opacity-40"
            />

            {/* Glowing Center Keyhole / Lock Icon */}
            {/* Padlock Body */}
            <rect x="175" y="180" width="50" height="40" rx="8" fill="white" className="dark:fill-slate-100" />
            {/* Padlock Shackle */}
            <path d="M 185,180 V 162 C 185,152 192,146 200,146 C 208,146 215,152 215,162 V 180" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" className="dark:stroke-slate-100" />
            {/* Keyhole */}
            <circle cx="200" cy="196" r="5" fill="url(#shieldGrad)" />
            <polygon points="197,196 203,196 205,212 195,212" fill="url(#shieldGrad)" />
            
            {/* Floating verification tick bubble */}
            <circle cx="270" cy="120" r="16" fill="#10B981" /> {/* emerald green */}
            <path d="M 264,120 L 268,124 L 277,115" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Orbiting Tech Security Node 1 (Database) */}
          <g className="privacy-animate-float-node origin-[90px_110px]" style={{ animationDelay: "1s" }}>
            <circle cx="90" cy="110" r="22" fill="currentColor" className="text-white dark:text-slate-800" filter="url(#shadow)" />
            <circle cx="90" cy="110" r="22" fill="none" stroke="currentColor" className="text-secondary/20 dark:text-secondary/40" strokeWidth="1.5" />
            {/* DB cylinder icon */}
            <ellipse cx="90" cy="102" rx="10" ry="3" fill="none" stroke="#8A2BE2" strokeWidth="1.5" />
            <path d="M 80,102 V 110 C 80,112 85,114 90,114 C 95,114 100,112 100,110 V 102" fill="none" stroke="#8A2BE2" strokeWidth="1.5" />
            <path d="M 80,110 V 118 C 80,120 85,122 90,122 C 95,122 100,120 100,118 V 110" fill="none" stroke="#8A2BE2" strokeWidth="1.5" />
          </g>

          {/* Orbiting Tech Security Node 2 (User Key) */}
          <g className="privacy-animate-float-node origin-[310px_280px]" style={{ animationDelay: "3s" }}>
            <circle cx="310" cy="280" r="22" fill="currentColor" className="text-white dark:text-slate-800" filter="url(#shadow)" />
            <circle cx="310" cy="280" r="22" fill="none" stroke="currentColor" className="text-secondary/20 dark:text-secondary/40" strokeWidth="1.5" />
            {/* Key Icon */}
            <circle cx="304" cy="286" r="5" fill="none" stroke="#4169E1" strokeWidth="1.5" />
            <path d="M 308,282 L 319,271 M 315,275 L 318,278 M 312,272 L 315,275" fill="none" stroke="#4169E1" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Orbiting Tech Security Node 3 (Secure Document) */}
          <g className="privacy-animate-float-node origin-[310px_110px]" style={{ animationDelay: "2s" }}>
            <circle cx="310" cy="110" r="22" fill="currentColor" className="text-white dark:text-slate-800" filter="url(#shadow)" />
            <circle cx="310" cy="110" r="22" fill="none" stroke="currentColor" className="text-secondary/20 dark:text-secondary/40" strokeWidth="1.5" />
            {/* Document sheet icon */}
            <rect x="302" y="99" width="16" height="22" rx="2" fill="none" stroke="#8A2BE2" strokeWidth="1.5" />
            <line x1="306" y1="105" x2="314" y2="105" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="306" y1="110" x2="314" y2="110" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="306" y1="115" x2="311" y2="115" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Orbiting Tech Security Node 4 (Encrypted Envelope) */}
          <g className="privacy-animate-float-node origin-[90px_280px]" style={{ animationDelay: "4s" }}>
            <circle cx="90" cy="280" r="22" fill="currentColor" className="text-white dark:text-slate-800" filter="url(#shadow)" />
            <circle cx="90" cy="280" r="22" fill="none" stroke="currentColor" className="text-secondary/20 dark:text-secondary/40" strokeWidth="1.5" />
            {/* Envelope with lock icon */}
            <rect x="80" y="271" width="20" height="15" rx="2" fill="none" stroke="#4169E1" strokeWidth="1.5" />
            <path d="M 80,272 L 90,279 L 100,272" fill="none" stroke="#4169E1" strokeWidth="1.5" />
          </g>

        </svg>

        {/* Floating Binary Code Sparkles (Pure HTML Overlays) */}
        <div className="absolute left-[15%] top-[25%] privacy-animate-binary-1 text-secondary/35 text-[10px] md:text-xs font-mono font-bold dark:text-secondary/25">101</div>
        <div className="absolute right-[18%] top-[40%] privacy-animate-binary-2 text-accent/40 text-[10px] md:text-xs font-mono font-bold dark:text-accent/25">010</div>
        <div className="absolute left-[38%] bottom-[15%] privacy-animate-binary-3 text-secondary/35 text-[10px] md:text-xs font-mono font-bold dark:text-secondary/25">110</div>
        <div className="absolute right-[30%] top-[12%] privacy-animate-binary-1 text-accent/35 text-[10px] md:text-xs font-mono font-bold dark:text-accent/25" style={{ animationDelay: "2.5s" }}>001</div>
      </div>
    </div>
  );
};

export default CSSAnimatedPrivacy;
