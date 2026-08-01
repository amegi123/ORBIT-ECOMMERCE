'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: 'TELEVISIONS IS ORBIT ELECTRONICS',
    line1: 'Home',
    line2: 'Appliances',
    subtitle: 'Free delivery within 2 days',
    image: '/img/hero1.jpeg',
    ctaLink: '/#category-kitchen',
    ctaText: 'SHOP TODAY',
  },
  {
    id: 2,
    tag: 'SMART ENTERTAINMENT SYSTEM',
    line1: 'Smart 4K',
    line2: 'Televisions',
    subtitle: 'Free delivery within 2 days',
    image: '/img/hero2.png',
    ctaLink: '/product/orbit-tv-65-smart-4k',
    ctaText: 'SHOP TODAY',
  },
  {
    id: 3,
    tag: 'HIGH EFFICIENCY ECO WASHERS',
    line1: 'Washing',
    line2: 'Machines',
    subtitle: 'Free delivery within 2 days',
    image: '/img/product-washing1.jpeg',
    ctaLink: '/#category-washers',
    ctaText: 'SHOP TODAY',
  },
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide timer every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const active = slides[currentSlide];

  return (
    <section className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] bg-slate-950 text-white overflow-hidden select-none">
      {/* Background Showroom Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={active.image}
          alt={active.line1 + ' ' + active.line2}
          fill
          className="object-cover opacity-50 transition-all duration-1000 scale-105"
          priority
        />
        {/* Subtle Dark Gradients for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Content Container (Matching Screenshot Pixel-for-Pixel) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
        <div className="max-w-xl space-y-6 pt-6">
          {/* Top Subtitle with Gold Line */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
              {active.tag}
            </span>
          </div>

          {/* Main Title: Elegant Serif in Light Sky Blue (#74B7E7) */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[0.95] text-[#74B7E7] font-normal drop-shadow-lg">
            <span className="block">{active.line1}</span>
            <span className="block">{active.line2}</span>
          </h1>

          {/* Delivery Box with Gold Border */}
          <div className="inline-block border border-amber-400/60 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-sm text-xs sm:text-sm text-slate-200 shadow-md">
            {active.subtitle}
          </div>

          {/* Gold Rectangle CTA Button matching Screenshot ("SHOP TODAY ➔") */}
          <div className="pt-2">
            <Link
              href={active.ctaLink}
              className="inline-flex items-center gap-3 bg-[#E5C578] hover:bg-[#d8b668] text-slate-950 font-extrabold px-8 py-3.5 rounded-sm text-xs tracking-wider uppercase transition-all hover:scale-105 shadow-xl"
            >
              <span>{active.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Progress Dash Indicators (Left Side) */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-0.5 transition-all duration-300 ${
              currentSlide === idx ? 'w-10 bg-amber-400' : 'w-6 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom Controls & Counter (Right Side matching Screenshot "01 —— 06" and "< >") */}
      <div className="absolute bottom-8 right-6 md:right-16 z-20 flex items-center gap-4 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2 font-bold tracking-widest">
          <span className="text-white">0{currentSlide + 1}</span>
          <span className="text-slate-500">—</span>
          <span className="text-slate-500">0{slides.length}</span>
        </div>

        {/* Square Navigation Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
            className="w-9 h-9 bg-slate-900/90 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 text-white flex items-center justify-center transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
            className="w-9 h-9 bg-slate-900/90 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 text-white flex items-center justify-center transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Far Right Vertical Scroll Indicator matching Screenshot */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 text-[10px] font-mono uppercase text-slate-400 tracking-widest pointer-events-none">
        <span className="rotate-90 origin-center whitespace-nowrap">SCROLL</span>
        <div className="w-[1px] h-12 bg-slate-600/60" />
      </div>
    </section>
  );
};
