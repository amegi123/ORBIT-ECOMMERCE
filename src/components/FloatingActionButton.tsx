'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  Phone,
  HelpCircle,
  ShoppingCart,
  X,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const AUTO_HIDE_MS = 10000; // 10 seconds

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // whether FABs are slid in
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { cart, setIsCartOpen, setIsAskQuestionOpen, setIsLanguageModalOpen, setIsAiAssistantOpen } = useCart();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const startHideTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      setIsOpen(false);
    }, AUTO_HIDE_MS);
  }, []);

  const showFabs = useCallback(() => {
    setIsVisible(true);
    startHideTimer();
  }, [startHideTimer]);

  // Start the 10s auto-hide timer on mount
  useEffect(() => {
    startHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [startHideTimer]);

  // Reset timer whenever user interacts with the FAB
  const handleFabInteraction = () => {
    startHideTimer();
  };

  return (
    <>
      {/* ─────────────────────────────────────────
          Tab "pull handle" - always visible on right edge
          ───────────────────────────────────────── */}
      {!isVisible && (
        <button
          type="button"
          onClick={showFabs}
          aria-label="Show Quick Actions"
          className="fixed right-0 bottom-44 md:bottom-32 z-50 flex flex-col items-center justify-center gap-1 bg-[#02367B] text-white w-5 py-3 rounded-l-xl shadow-xl border-l-0 border border-[#005BAA] cursor-pointer hover:w-6 transition-all duration-200"
          title="Show Quick Actions"
        >
          <span className="w-1 h-6 rounded-full bg-white/60" />
          <span className="w-1 h-4 rounded-full bg-white/40" />
          <ChevronRight className="w-3 h-3 text-white/80 mt-0.5" />
        </button>
      )}

      {/* ─────────────────────────────────────────
          AI FAB Button
          ───────────────────────────────────────── */}
      <div
        className={`fixed bottom-52 md:bottom-24 right-4 md:right-8 z-50 flex items-center gap-2.5 font-sans select-none group pointer-events-auto transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-[110%]'
        }`}
        onClick={handleFabInteraction}
      >
        {/* Hover Tooltip Badge */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg border border-slate-700/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Orbit AI Assistant</span>
        </div>

        <button
          type="button"
          onClick={() => { setIsAiAssistantOpen(true); handleFabInteraction(); }}
          aria-label="Open Orbit AI Shopping Assistant"
          className="relative w-14 h-14 rounded-2xl bg-white hover:bg-slate-50 flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-200/90 cursor-pointer hover:scale-105 active:scale-95 p-2.5"
        >
          <div className="relative w-full h-full z-10 flex items-center justify-center">
            <img
              src="/img/ai_bot_icon.svg"
              alt="Orbit AI Bot"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        </button>
      </div>

      {/* ─────────────────────────────────────────
          Support Speed Dial FAB
          ───────────────────────────────────────── */}
      <div
        className={`fixed bottom-36 md:bottom-8 right-4 md:right-8 z-50 flex flex-col items-end gap-3 font-sans select-none pointer-events-none transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-[110%]'
        }`}
        onClick={handleFabInteraction}
      >
        {/* Speed Dial Menu Items */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ease-out origin-bottom-right ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Hotline 6226 */}
          <a href="tel:6226" className="flex items-center gap-2.5 group pointer-events-auto">
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
              Call (6226)
            </span>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-transform duration-200 group-hover:scale-110 border border-emerald-300/40 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/251911000000?text=Hello%20Orbit%20Electronics%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group pointer-events-auto"
          >
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
              WhatsApp
            </span>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-green-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-green-500/25 transition-transform duration-200 group-hover:scale-110 border border-green-300/40 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
          </a>

          {/* Language */}
          <button
            type="button"
            onClick={() => { setIsLanguageModalOpen(true); setIsOpen(false); }}
            className="flex items-center gap-2.5 group pointer-events-auto cursor-pointer"
          >
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
              Language / ቋንቋ
            </span>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-110 border border-indigo-300/40 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
          </button>

          {/* Ask Question */}
          <button
            type="button"
            onClick={() => { setIsAskQuestionOpen(true); setIsOpen(false); }}
            className="flex items-center gap-2.5 group pointer-events-auto cursor-pointer"
          >
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
              Ask Question
            </span>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 transition-transform duration-200 group-hover:scale-110 border border-amber-300/60 shrink-0">
              <HelpCircle className="w-5 h-5 text-slate-950" />
            </div>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => { setIsCartOpen(true); setIsOpen(false); }}
            className="flex items-center gap-2.5 group pointer-events-auto cursor-pointer"
          >
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
              Cart ({totalCartCount})
            </span>
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#02367B] to-[#00A9E0] text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-transform duration-200 group-hover:scale-110 border border-blue-300/40 shrink-0">
              <ShoppingCart className="w-5 h-5 text-white" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Main FAB Trigger Button */}
        <div className="relative pointer-events-auto group flex items-center gap-2.5">
          {!isOpen && (
            <span className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-[#00A9E0] to-[#02367B] opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
          )}

          <button
            type="button"
            onClick={() => { setIsOpen(!isOpen); handleFabInteraction(); }}
            aria-label="Floating Quick Actions"
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl border cursor-pointer ${
              isOpen
                ? 'bg-slate-900 border-slate-700 text-white rotate-90 scale-105'
                : 'bg-white border-amber-400/80 hover:scale-105 shadow-blue-900/30'
            }`}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-amber-400" />
            ) : (
              <div className="relative w-10 h-10 group-hover:scale-110 transition-transform flex items-center justify-center">
                <Image
                  src="/img/fab_support_icon.png"
                  alt="Orbit 3D Support Icon"
                  width={40}
                  height={40}
                  className="object-contain drop-shadow-sm"
                />
              </div>
            )}
            {!isOpen && (
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
              </span>
            )}
          </button>

          {!isOpen && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg border border-slate-700/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Support &amp; Quick Actions</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
