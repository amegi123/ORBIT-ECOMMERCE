'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  Phone,
  HelpCircle,
  ShoppingCart,
  X,
  Globe,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setIsCartOpen, setIsAskQuestionOpen, setIsLanguageModalOpen } = useCart();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col items-end gap-3 font-sans select-none pointer-events-none">
      {/* 1. Expanded Speed Dial Menu with Small Action Name Badges */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Menu Item 1: Hotline 6226 */}
        <a
          href="tel:6226"
          className="flex items-center gap-2.5 group pointer-events-auto"
        >
          <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
            Call (6226)
          </span>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-transform duration-200 group-hover:scale-110 border border-emerald-300/40 shrink-0">
            <Phone className="w-5 h-5" />
          </div>
        </a>

        {/* Menu Item 2: Live Chat / WhatsApp */}
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

        {/* Menu Item 3: Change Language */}
        <button
          type="button"
          onClick={() => {
            setIsLanguageModalOpen(true);
            setIsOpen(false);
          }}
          className="flex items-center gap-2.5 group pointer-events-auto cursor-pointer"
        >
          <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
            Language / ቋንቋ
          </span>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-110 border border-indigo-300/40 shrink-0">
            <Globe className="w-5 h-5" />
          </div>
        </button>

        {/* Menu Item 4: Ask a Question */}
        <button
          type="button"
          onClick={() => {
            setIsAskQuestionOpen(true);
            setIsOpen(false);
          }}
          className="flex items-center gap-2.5 group pointer-events-auto cursor-pointer"
        >
          <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md border border-slate-700/80 whitespace-nowrap transition-transform group-hover:scale-105">
            Ask Question
          </span>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 transition-transform duration-200 group-hover:scale-110 border border-amber-300/60 font-extrabold shrink-0">
            <HelpCircle className="w-5 h-5 text-slate-950" />
          </div>
        </button>

        {/* Menu Item 5: Quick Cart */}
        <button
          type="button"
          onClick={() => {
            setIsCartOpen(true);
            setIsOpen(false);
          }}
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

      {/* 2. Main FAB Trigger Button & Label */}
      <div className="relative pointer-events-auto group flex items-center gap-2.5">
        {/* Ambient Pulsing Glow behind FAB */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-[#00A9E0] to-[#02367B] opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
        )}

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
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

          {/* Online Notification Indicator Dot */}
          {!isOpen && (
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
            </span>
          )}
        </button>

        {/* Hover Badge Pill (Desktop) */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg border border-slate-700/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Support &amp; Quick Actions</span>
          </div>
        )}
      </div>
    </div>
  );
};
