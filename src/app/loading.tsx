'use client';

import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 select-none font-sans">
      <div className="flex flex-col items-center space-y-3">
        {/* Simple Dual-Color Spinner */}
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#02367B] rounded-full animate-spin" />
        
        {/* Simple Text */}
        <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">
          Loading...
        </span>
      </div>
    </div>
  );
}
