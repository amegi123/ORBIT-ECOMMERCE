'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Globe, Check, X, ShieldCheck } from 'lucide-react';

const EthiopiaFlag: React.FC<{ className?: string }> = ({ className = "w-7 h-5" }) => (
  <svg className={`${className} rounded-xs overflow-hidden shadow-xs shrink-0 inline-block`} viewBox="0 0 600 400" aria-hidden="true">
    <rect width="600" height="133.3" fill="#009A44" />
    <rect y="133.3" width="600" height="133.3" fill="#FED100" />
    <rect y="266.6" width="600" height="133.3" fill="#E62727" />
    <circle cx="300" cy="200" r="70" fill="#0033A0" />
    <g fill="#FED100">
      <polygon points="300,145 314,185 356,185 322,210 335,250 300,225 265,250 278,210 244,185 286,185" />
    </g>
  </svg>
);

const USFlag: React.FC<{ className?: string }> = ({ className = "w-7 h-5" }) => (
  <svg className={`${className} rounded-xs overflow-hidden shadow-xs shrink-0 inline-block`} viewBox="0 0 740 390" aria-hidden="true">
    <rect width="740" height="390" fill="#B22234" />
    <rect y="30" width="740" height="30" fill="#FFFFFF" />
    <rect y="90" width="740" height="30" fill="#FFFFFF" />
    <rect y="150" width="740" height="30" fill="#FFFFFF" />
    <rect y="210" width="740" height="30" fill="#FFFFFF" />
    <rect y="270" width="740" height="30" fill="#FFFFFF" />
    <rect y="330" width="740" height="30" fill="#FFFFFF" />
    <rect width="296" height="210" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <circle cx="30" cy="25" r="7" />
      <circle cx="80" cy="25" r="7" />
      <circle cx="130" cy="25" r="7" />
      <circle cx="180" cy="25" r="7" />
      <circle cx="230" cy="25" r="7" />
      <circle cx="55" cy="55" r="7" />
      <circle cx="105" cy="55" r="7" />
      <circle cx="155" cy="55" r="7" />
      <circle cx="205" cy="55" r="7" />
      <circle cx="30" cy="85" r="7" />
      <circle cx="80" cy="85" r="7" />
      <circle cx="130" cy="85" r="7" />
      <circle cx="180" cy="85" r="7" />
      <circle cx="230" cy="85" r="7" />
    </g>
  </svg>
);

export const LanguageSelectionModal: React.FC = () => {
  const { isLanguageModalOpen, setIsLanguageModalOpen, language, setLanguage, addToast } = useCart();
  const [selectedLang, setSelectedLang] = useState<string>(language || 'en');

  if (!isLanguageModalOpen) return null;

  const languagesList = [
    {
      code: 'en',
      name: 'English',
      englishName: 'English (US)',
      subtext: 'Global Standard Language',
      flag: <USFlag className="w-9 h-6" />,
    },
    {
      code: 'am',
      name: 'አማርኛ',
      englishName: 'Amharic',
      subtext: 'የኢትዮጵያ ብሔራዊ ቋንቋ',
      flag: <EthiopiaFlag className="w-9 h-6" />,
    },
  ];

  const handleConfirm = () => {
    setLanguage(selectedLang);
    setIsLanguageModalOpen(false);

    const chosenObj = languagesList.find((l) => l.code === selectedLang);
    addToast(
      'Language Saved!',
      `Selected ${chosenObj?.name || 'English'}. Welcome to Orbit Electronics!`,
      'success'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans select-none animate-in fade-in duration-200">
      {/* Light Theme Card Container */}
      <div className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsLanguageModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 z-20"
          aria-label="Close language selection"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Section */}
        <div className="text-center space-y-2 pt-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#02367B] shadow-xs">
            <Globe className="w-6 h-6 text-[#02367B]" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Select Your Language
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              እባክዎን የሚመርጡትን ቋንቋ ይምረጡ / Choose preferred language
            </p>
          </div>
        </div>

        {/* Two Language Selection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {languagesList.map((lang) => {
            const isSelected = selectedLang === lang.code;

            return (
              <div
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`relative group cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center min-h-[140px] ${
                  isSelected
                    ? 'bg-blue-50/70 border-[#02367B] shadow-md ring-2 ring-[#02367B]/20 scale-[1.02]'
                    : 'bg-slate-50/80 border-slate-200/90 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                {/* Selection Check Circle */}
                <div className="w-full flex justify-end">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-xs'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Flag Icon */}
                <div className="my-1 p-1 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
                  {lang.flag}
                </div>

                {/* Language Names */}
                <div className="space-y-0.5 w-full">
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {lang.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold">
                    {lang.englishName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Note */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#02367B] hover:bg-[#005BAA] text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>Continue / ቀጥል</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>You can change this anytime from the header</span>
          </div>
        </div>
      </div>
    </div>
  );
};
