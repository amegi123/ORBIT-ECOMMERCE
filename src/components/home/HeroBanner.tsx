'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Water Dispensers',
    highlight: 'Premium Instant',
    subtitle: 'Free delivery within 2 days across Addis Ababa',
    description: 'Hot & cold water filtration systems engineered with low power consumption and durable stainless steel heating tanks.',
    image: '/img/hero3.webp',
    tag: 'Home & Office Essential',
    ctaLink: '/#category-dispensers',
    ctaText: 'SHOP TODAY',
  },
  {
    id: 2,
    title: 'Smart 4K UHD TVs',
    highlight: 'Orbit 65"',
    subtitle: 'Cinema-grade 4K visuals with Android TV OS',
    description: 'Breathtaking 8.3 million pixels, HDR10+ dynamic contrast, and voice-controlled Google Assistant for ultimate home theater.',
    image: '/img/hero1.jpeg',
    tag: 'Top Rated Product',
    ctaLink: '/product/orbit-tv-65-smart-4k',
    ctaText: 'EXPLORE SMART TV',
  },
  {
    id: 3,
    title: 'Washing Machines',
    highlight: 'Smart Inverter',
    subtitle: '12KG High efficiency twin & front load washers',
    description: 'Experience deep eco-cleaning, 1400 RPM spin drying, and whisper-quiet motor performance backed by 2 years Orbit warranty.',
    image: '/img/product-washing1.jpeg',
    tag: 'Best Energy Saver',
    ctaLink: '/#category-washers',
    ctaText: 'SHOP WASHERS',
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
    <section className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] bg-[#030E20] text-white overflow-hidden shadow-2xl">
      {/* Background Image with Ambient Glow Effects */}
      <div className="absolute inset-0 z-0">
        <Image
          src={active.image}
          alt={active.title}
          fill
          className="object-cover opacity-35 transition-all duration-1000 scale-105"
          priority
        />
        {/* Cinematic Dual Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030E20] via-[#030E20]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030E20] via-transparent to-[#030E20]/50" />
      </div>

      {/* Decorative Radial Lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Full-width Corner-to-Corner Inner Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Left Side Copy & Action Buttons */}
        <div className="max-w-2xl space-y-6 pt-4">
          {/* Glassmorphism Floating Pill Badge */}
          <div className="inline-flex items-center gap-2 border border-amber-400/40 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-slate-200 shadow-xl animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-400 font-extrabold uppercase tracking-wider">{active.tag}</span>
            <span className="text-slate-600">|</span>
            <span>{active.subtitle}</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">
              Orbit Official Ethiopia Store
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-white leading-[1.05]">
              <span className="text-amber-400">{active.highlight}</span> {active.title}
            </h1>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
            {active.description}
          </p>

          {/* Guarantee Badges */}
          <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 2 Years Official Warranty
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              Telebirr & Chapa Express Pay
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href={active.ctaLink}
              className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-glow-yellow"
            >
              <span>{active.ctaText}</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </Link>

            <Link
              href="/#new-arrivals"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-4 rounded-xl text-xs uppercase tracking-wider transition-all backdrop-blur"
            >
              <span>All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Side Featured Product Highlight Card (Desktop view) */}
        <div className="hidden lg:flex relative w-[420px] aspect-square bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-2xl items-center justify-center group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-amber-500/10 pointer-events-none" />

          {/* Product Image */}
          <div className="relative w-full h-full">
            <Image
              src={active.image}
              alt={active.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Spec Badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 border border-slate-800 p-3 rounded-2xl flex items-center justify-between text-xs backdrop-blur-md shadow-lg">
            <div>
              <div className="font-bold text-white">{active.title}</div>
              <div className="text-[10px] text-amber-400 font-semibold">Genuine Orbit Certified</div>
            </div>
            <Link
              href={active.ctaLink}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px]"
            >
              VIEW
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Navigation Bar at Bottom */}
      <div className="absolute bottom-6 left-6 right-6 z-20 max-w-7xl mx-auto flex items-center justify-between">
        {/* Slide Indicators */}
        <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`flex items-center gap-2 text-xs font-bold transition-all px-3 py-1 rounded-full ${
                currentSlide === idx
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>0{s.id}</span>
              {currentSlide === idx && <span className="hidden sm:inline font-black">{s.title}</span>}
            </button>
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-full border border-slate-800">
          <button
            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
            className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
            className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
