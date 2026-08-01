'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { homeCategories } from '@/data/homeData';

export const ShopByCategory: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto slide right interval every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full space-y-4 pt-6 select-none">
      {/* Section Header with Navigation Arrows */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-7 bg-[#02367B] rounded-full shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Explore Orbit Electronics Ethiopia’s premium appliance line
            </p>
          </div>
        </div>

        {/* Scroll Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#02367B] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm border border-slate-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#02367B] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm border border-slate-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auto-sliding Horizontal Category Cards List */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth py-3 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {homeCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/#${cat.id}`}
            className="group shrink-0 w-36 sm:w-44 bg-white rounded-3xl border border-slate-200/80 p-4 flex flex-col items-center justify-between hover:shadow-xl hover:border-[#02367B] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            {/* Item Count Badge */}
            <span className="absolute top-3 right-3 text-[10px] font-extrabold bg-[#02367B]/10 text-[#02367B] px-2 py-0.5 rounded-full group-hover:bg-[#02367B] group-hover:text-white transition-colors z-10">
              {cat.itemCount}+
            </span>

            {/* Smooth Non-Conflicting Image Box with Perfect Hover Zoom */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 my-2 bg-gradient-to-b from-slate-50 to-blue-50/40 rounded-2xl flex items-center justify-center p-3 overflow-hidden shadow-inner border border-slate-100">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-1.5 group-hover:scale-115 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Category Name */}
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#02367B] transition-colors text-center mt-2 tracking-tight">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
