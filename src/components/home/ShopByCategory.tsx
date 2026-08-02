'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { homeCategories } from '@/data/homeData';

export const ShopByCategory: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalCategories = homeCategories.length;

  // Auto slide timer every 3.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCategories);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, totalCategories]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalCategories - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCategories);
  };

  return (
    <section className="w-full space-y-4 pt-4 select-none font-sans">
      {/* Clean Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-6 bg-[#02367B] rounded-full" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Shop by <span className="border-b-2 border-amber-400 pb-0.5">Category</span>
          </h2>
        </div>

        {/* Header Right Controls: Prev/Next Buttons & View All Link */}
        <div className="flex items-center gap-3">
          {/* Slide Arrow Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#02367B] hover:text-white text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              title="Previous Category"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#02367B] hover:text-white text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              title="Next Category"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-200" />

          <Link
            href="/all-products"
            className="text-xs font-bold text-[#02367B] hover:text-[#00285C] flex items-center gap-1 transition-colors group"
          >
            <span>All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* MOBILE: Native Touch Horizontal Scroll Container (Scrollable by hand on phones) */}
      <div className="flex sm:hidden overflow-x-auto scrollbar-none touch-pan-x gap-3 py-1 px-0.5 scroll-smooth">
        {homeCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/all-products?category=${encodeURIComponent(cat.name)}`}
            className="group shrink-0 w-32 bg-white rounded-2xl border border-slate-200/80 p-2.5 flex flex-col items-center justify-between hover:border-[#02367B] hover:shadow-md transition-all duration-300 relative"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-slate-50/60 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300 ease-out"
              />
            </div>

            {/* Category Info */}
            <div className="w-full text-center space-y-0.5">
              <h3 className="text-[11px] font-bold text-slate-900 group-hover:text-[#02367B] transition-colors truncate">
                {cat.name}
              </h3>
              <p className="text-[9px] font-medium text-slate-400">
                {cat.itemCount} Items
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP: Auto-Sliding Carousel Container */}
      <div
        ref={sliderRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hidden sm:block relative w-full overflow-hidden py-1"
      >
        <div
          className="flex transition-transform duration-500 ease-out gap-3 sm:gap-4"
          style={{
            transform: `translateX(-${currentIndex * 20}%)`,
          }}
        >
          {/* Duplicate categories for smooth continuous looping */}
          {[...homeCategories, ...homeCategories].map((cat, idx) => (
            <Link
              key={`${cat.id}-${idx}`}
              href={`/all-products?category=${encodeURIComponent(cat.name)}`}
              className="group shrink-0 w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)] bg-white rounded-2xl border border-slate-200/80 p-3.5 flex flex-col items-center justify-between hover:border-[#02367B] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square bg-slate-50/60 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2.5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain p-1.5 group-hover:scale-106 transition-transform duration-300 ease-out"
                />
              </div>

              {/* Category Info */}
              <div className="w-full text-center space-y-0.5">
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#02367B] transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-[10px] font-medium text-slate-400">
                  {cat.itemCount} Items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Progress Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {homeCategories.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex % totalCategories === idx
                ? 'w-6 bg-[#02367B]'
                : 'w-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to category slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};





