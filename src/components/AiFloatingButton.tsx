'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export const AiFloatingButton: React.FC = () => {
  const pathname = usePathname();
  const { isAiAssistantOpen, setIsAiAssistantOpen } = useCart();

  // Hide on standalone login/signup pages or when AI modal is open
  if (pathname === '/login' || pathname === '/signup' || isAiAssistantOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-52 md:bottom-24 right-4 md:right-8 z-50 flex items-center gap-2.5 font-sans select-none group pointer-events-auto">
      {/* Hover Tooltip Badge (Desktop) */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Orbit AI Assistant</span>
      </div>

      {/* Main AI Floating Button (Pure White Background with Bot Image Icon) */}
      <button
        type="button"
        onClick={() => setIsAiAssistantOpen(true)}
        aria-label="Open Orbit AI Shopping Assistant"
        className="relative w-14 h-14 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-200/90 cursor-pointer hover:scale-105 active:scale-95 p-2.5"
      >
        {/* AI Bot Image Icon */}
        <div className="relative w-full h-full z-10 flex items-center justify-center">
          <img
            src="/img/ai_bot_icon.svg"
            alt="Orbit AI Bot"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Online Status Indicator Dot */}
        <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>
      </button>
    </div>
  );
};
