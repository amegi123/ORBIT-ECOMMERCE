'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { homeCategories } from '@/data/homeData';

export const ShopByCategory: React.FC = () => {
  return (
    <section className="w-full space-y-3 sm:space-y-4 pt-3 sm:pt-4 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-[#02367B] rounded-full shrink-0" />
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            <span className="relative inline-block border-b-4 border-amber-400 pb-0.5">
              Shop by
            </span>{' '}
            Category
          </h2>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-[#02367B] bg-blue-50 px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-100/80 md:hidden">
          Scroll ➔
        </span>
      </div>

      {/* MOBILE: Compact Horizontal Scroll List */}
      <div
        className="flex md:hidden items-center gap-3 overflow-x-auto scrollbar-none pb-2 pt-0.5 px-0.5 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {homeCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/#${cat.id}`}
            className="group shrink-0 w-28 bg-white rounded-2xl border border-slate-200/80 p-2.5 flex flex-col items-center justify-between hover:border-[#02367B] hover:shadow-md transition-all duration-300 relative"
          >
            <div className="relative w-full h-20 my-1 flex items-center justify-center">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-1 group-hover:scale-105 transition-transform duration-300 ease-out"
              />
            </div>
            <div className="w-full pt-1.5 border-t border-slate-100 text-center">
              <h3 className="text-[11px] font-extrabold text-slate-900 group-hover:text-[#02367B] transition-colors tracking-tight truncate">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP: 3 Categories Per Row Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-5">
        {homeCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/#${cat.id}`}
            className="group bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between hover:border-[#02367B] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative"
          >
            <div className="relative w-full h-36 my-1 flex items-center justify-center">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-1.5 group-hover:scale-106 transition-transform duration-300 ease-out"
              />
            </div>
            <div className="w-full pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#02367B] transition-colors tracking-tight truncate">
                {cat.name}
              </h3>

              <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#02367B] text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};





