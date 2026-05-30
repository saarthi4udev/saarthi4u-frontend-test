"use client";

import React from "react";

const CSSAnimatedBook: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-[280px] w-[320px] md:h-[350px] md:w-[400px] select-none scale-90 sm:scale-100">
      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          "animate-particle-float-1",
          "animate-particle-float-2",
          "animate-particle-float-3",
          "animate-particle-float-4",
          "animate-particle-float-5",
        ].map((particleClass, i) => {
          const leftPositions = ["20%", "50%", "80%", "35%", "65%"];
          return (
            <div
              key={i}
              className={`absolute bottom-24 h-2 w-2 rounded-full bg-secondary/80 ${particleClass}`}
              style={{
                left: leftPositions[i],
                opacity: 0,
              }}
            />
          );
        })}
      </div>

      {/* Deep Soft Glow behind the book */}
      <div className="absolute h-44 w-72 rounded-full bg-secondary/25 blur-3xl animate-glow-pulse" />

      {/* 3D Book Container */}
      <div 
        className="relative flex h-[180px] w-[280px] md:h-[220px] md:w-[340px] rounded-lg bg-cover transition-transform duration-500 hover:scale-105 animate-float"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Book Spine (Center) */}
        <div className="absolute left-1/2 top-0 z-30 h-full w-2.5 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary/70 to-primary shadow-md dark:from-slate-900 dark:via-secondary dark:to-slate-900" />

        {/* Left Page (Fixed Cover & Inner Page) */}
        <div className="absolute left-0 top-0 h-full w-[50%] rounded-l-2xl border-y border-l border-primary/20 bg-linear-to-l from-white via-slate-50 to-slate-200 shadow-[-12px_16px_34px_rgba(23,30,76,0.15)] dark:border-white/10 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 dark:shadow-[-16px_20px_40px_rgba(0,0,0,0.4)]">
          {/* Inner Left Content Lines */}
          <div className="flex flex-col gap-2.5 p-5 md:p-6 opacity-60">
            <div className="h-3 w-[80%] rounded-sm bg-primary/20 dark:bg-white/10" />
            <div className="h-2 w-[90%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2 w-[70%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2 w-[85%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2.5 w-[50%] rounded-sm bg-secondary/20 dark:bg-secondary/10" />
          </div>
        </div>

        {/* Right Page (Fixed Cover & Inner Page) */}
        <div className="absolute right-0 top-0 h-full w-[50%] rounded-r-2xl border-y border-r border-primary/20 bg-linear-to-r from-white via-slate-50 to-slate-200 shadow-[12px_16px_34px_rgba(23,30,76,0.15)] dark:border-white/10 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 dark:shadow-[16px_20px_40px_rgba(0,0,0,0.4)]">
          {/* Inner Right Content Lines */}
          <div className="flex flex-col gap-2.5 p-5 md:p-6 opacity-60">
            <div className="h-3 w-[70%] rounded-sm bg-primary/20 dark:bg-white/10" />
            <div className="h-2 w-[85%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2 w-[95%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2 w-[60%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2.5 w-[40%] rounded-sm bg-secondary/20 dark:bg-secondary/10" />
          </div>
        </div>

        {/* Flipping Page (3D Turning Effect) */}
        <div 
          className="absolute right-0 top-0 z-20 h-full w-[50%] rounded-r-2xl border-y border-r border-primary/10 bg-linear-to-r from-white via-slate-50 to-slate-200 shadow-sm dark:border-white/5 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 animate-flip-page"
        >
          {/* Flipping Page Text Lines */}
          <div className="flex flex-col gap-2.5 p-5 md:p-6 opacity-60">
            <div className="h-3 w-[60%] rounded-sm bg-primary/20 dark:bg-white/10" />
            <div className="h-2 w-[80%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2 w-[90%] rounded-sm bg-primary/10 dark:bg-white/5" />
            <div className="h-2.5 w-[50%] rounded-sm bg-secondary/20 dark:bg-secondary/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSAnimatedBook;
