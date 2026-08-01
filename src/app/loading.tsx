'use client';

import React from 'react';
import Image from 'next/image';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#02367B] via-[#012554] to-[#001738] flex flex-col items-center justify-center p-4 select-none font-sans">
      {/* Centered Glowing Logo Box */}
      <div className="relative mb-8 flex flex-col items-center">
        {/* Pulsing Backlight Glow */}
        <div className="absolute inset-0 bg-[#00A9E0]/30 rounded-full blur-2xl animate-pulse" />

        {/* Orbit Brand Logo */}
        <div className="relative h-14 w-60 sm:h-16 sm:w-72 mb-4 animate-bounce duration-1000">
          <Image
            src="/img/Orbi logo.svg"
            alt="Orbit Electronics Logo"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* Custom Spinning Orbit Ring Loader */}
        <div className="relative w-16 h-16 my-2">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-900/60" />
          {/* Spinning Amber & Cyan gradient arc */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-[#00A9E0] animate-spin duration-750" />
          {/* Inner pulsing dot */}
          <div className="absolute inset-4 bg-amber-400 rounded-full animate-ping opacity-75" />
        </div>
      </div>

      {/* Loading Text & Animated Progress Line */}
      <div className="flex flex-col items-center space-y-3">
        <span className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase animate-pulse">
          Loading Orbit Electronics...
        </span>

        {/* Shimmering Progress Line */}
        <div className="w-48 sm:w-64 h-1.5 bg-blue-950/80 rounded-full overflow-hidden border border-blue-800/60 p-0.5">
          <div className="h-full bg-gradient-to-r from-[#00A9E0] via-amber-400 to-[#46D3E4] rounded-full animate-progress" />
        </div>

        <span className="text-[11px] font-medium text-slate-300">
          Ethiopia’s Premier Smart TVs & Home Appliances
        </span>
      </div>
    </div>
  );
}
