"use client";

import React from "react";

const phoneNumber = "919958989150"; // +91 9958989150 without plus sign
const message = encodeURIComponent("Hi! I would like to chat about Saarthi4u.");

const WhatsAppFloat: React.FC = () => {
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-20 right-6 z-[9999]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg transition-transform hover:scale-105"
        title="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M20.52 3.48A11.9 11.9 0 0012.01.01C6.1.01 1.1 4.98 1.02 10.86c-.02 1.94.48 3.84 1.43 5.52L.01 23l6.83-1.77a11.9 11.9 0 005.17 1.22h.01c5.92 0 10.95-4.92 11.01-10.83.06-2.96-1.02-5.74-2.21-7.14zM12.01 20.06c-1.6 0-3.18-.36-4.6-1.05l-.33-.17-4.06 1.05 1.08-3.98-.21-.35A8.14 8.14 0 013.83 10.9c0-4.57 3.7-8.28 8.28-8.28 2.21 0 4.28.86 5.84 2.43 1.55 1.56 2.41 3.63 2.36 5.84-.05 4.58-3.79 8.28-8.3 8.28z" />
          <path d="M17.52 14.3c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.64.14s-.73.91-.9 1.1c-.16.2-.32.22-.6.08-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.64-1.54-.88-2.12-.23-.56-.47-.48-.64-.49l-.54-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.98 2.68 1.12 2.87.14.2 1.94 3.05 4.7 4.28 3.26 1.45 3.26 0 3.85-.04.59-.04 1.92-.78 2.19-1.53.28-.75.28-1.39.2-1.53-.09-.14-.26-.21-.53-.35z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppFloat;
