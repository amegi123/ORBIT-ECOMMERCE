'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: 'SMART 4K ENTERTAINMENT SYSTEM',
    line1: 'Smart 4K',
    line2: 'Televisions',
    subtitle: 'Free delivery within 2 days',
    image: '/img/hero2.png',
    ctaLink: '/product/orbit-tv-65-smart-4k',
    ctaText: 'SHOP TODAY',
  },
  {
    id: 2,
    tag: 'PREMIUM HOME APPLIANCES',
    line1: 'Modern Home',
    line2: 'Appliances',
    subtitle: 'Free delivery within 2 days',
    image: '/img/hero3.webp',
    ctaLink: '/#category-tvs',
    ctaText: 'SHOP TODAY',
  },
  {
    id: 3,
    tag: 'HIGH EFFICIENCY STOVES & COOKERS',
    line1: 'Kitchen &',
    line2: 'Cooking',
    subtitle: 'Free delivery within 2 days',
    image: '/img/catagories4.webp',
    ctaLink: '/#category-stoves',
    ctaText: 'SHOP TODAY',
  },
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Smooth Orbit Brand Blue Cursor Tracking (Lerp Physics)
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setTargetPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Ultra-smooth Lerp Animation Loop
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.18,
        y: prev.y + (targetPos.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [targetPos]);

  // Auto slide timer every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[660px] sm:h-[740px] lg:h-[800px] bg-slate-950 text-white overflow-hidden select-none lg:cursor-none"
    >
      {/* Synchronized Hero Slides Container (Images + Text + Buttons Slide Together) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, idx) => {
          let positionClass = 'translate-x-full opacity-0 pointer-events-none';
          if (currentSlide === idx) {
            positionClass = 'translate-x-0 opacity-100 pointer-events-auto z-10';
          } else if (
            idx === (currentSlide - 1 + slides.length) % slides.length
          ) {
            positionClass = '-translate-x-full opacity-0 pointer-events-none';
          }

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${positionClass}`}
            >
              {/* Background Showroom Image with 14s Ultra-Slow Ken Burns Zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.line1 + ' ' + slide.line2}
                  fill
                  className={`object-cover ${currentSlide === idx ? 'animate-kenburns' : ''}`}
                  priority={idx === 0}
                />

                {/* Low Opacity Orbit Ocean Blue Tint */}
                <div className="absolute inset-0 bg-[#02367B]/25 mix-blend-multiply pointer-events-none" />

                {/* Text Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-[#02367B]/30 to-[#02367B]/15" />
              </div>

              {/* Synchronized Text & Button Content Container */}
              <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-center sm:justify-start">
                <div className="max-w-xl space-y-5 sm:space-y-6 -mt-12 sm:-mt-16 lg:-mt-20 text-center sm:text-left flex flex-col items-center sm:items-start">
                  {/* Tagline */}
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-8 h-[2px] bg-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-[#46D3E4] uppercase tracking-widest font-mono">
                      {slide.tag}
                    </span>
                    <div className="w-8 h-[2px] bg-amber-400 shrink-0 sm:hidden" />
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[0.95] text-[#46D3E4] font-normal drop-shadow-lg text-center sm:text-left">
                    <span className="block">{slide.line1}</span>
                    <span className="block">{slide.line2}</span>
                  </h1>

                  {/* Delivery Box */}
                  <div className="inline-block border border-amber-400/60 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-sm text-xs sm:text-sm text-slate-200 shadow-md">
                    {slide.subtitle}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2 flex justify-center sm:justify-start w-full">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center justify-center gap-3 bg-[#E5C578] hover:bg-[#d8b668] text-slate-950 font-extrabold px-8 py-3.5 rounded-sm text-xs tracking-wider uppercase transition-all hover:scale-105 shadow-xl cursor-pointer z-20"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smooth Orbit Brand Blue Glowing Custom Cursor */}
      {isHovered && heroRef.current && (
        <div
          className="hidden lg:flex pointer-events-none absolute z-30 flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{
            left: smoothPos.x,
            top: smoothPos.y,
          }}
        >
          {/* Glowing Orbit Cyan Center Dot */}
          <div className="w-5 h-5 bg-[#00A9E0] rounded-full shadow-[0_0_25px_rgba(0,169,224,0.9)] flex items-center justify-center border-2 border-white">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>

          {/* Outer Pulsing Aqua Halo Ring */}
          <div className="absolute w-14 h-14 rounded-full border-2 border-[#46D3E4]/70 animate-ping opacity-75" />

          {/* Orbit Brand Blue Floating Label Pill */}
          <span className="mt-2 text-[9px] font-black tracking-widest text-[#46D3E4] bg-[#02367B]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#00A9E0]/50 shadow-2xl uppercase font-mono whitespace-nowrap">
            EXPLORE ORBIT ✦
          </span>
        </div>
      )}

      {/* Bottom Progress Dash Indicators */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-0.5 transition-all duration-300 ${
              currentSlide === idx ? 'w-10 bg-amber-400' : 'w-6 bg-slate-400/60 hover:bg-slate-200'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom Controls & Counter */}
      <div className="absolute bottom-8 right-6 md:right-16 z-20 flex items-center gap-4 text-xs font-mono text-slate-200">
        <div className="flex items-center gap-2 font-bold tracking-widest drop-shadow">
          <span className="text-[#46D3E4]">0{currentSlide + 1}</span>
          <span className="text-slate-400">—</span>
          <span className="text-slate-400">0{slides.length}</span>
        </div>

        {/* Square Navigation Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
            className="w-9 h-9 bg-[#02367B]/90 hover:bg-[#00A9E0] text-white border border-[#005BAA] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
            className="w-9 h-9 bg-[#02367B]/90 hover:bg-[#00A9E0] text-white border border-[#005BAA] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Far Right Vertical Scroll Indicator */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 text-[10px] font-mono uppercase text-[#46D3E4] tracking-widest pointer-events-none drop-shadow">
        <span className="rotate-90 origin-center whitespace-nowrap">SCROLL</span>
        <div className="w-[1px] h-12 bg-[#00A9E0]/60" />
      </div>
    </section>
  );
};
