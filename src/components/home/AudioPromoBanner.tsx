'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AudioPromoBannerProps {
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  productImage?: string;
  productAlt?: string;
  productLink?: string;
  badgeText?: string;
}

export const AudioPromoBanner: React.FC<AudioPromoBannerProps> = ({
  titleLine1 = 'Dive Into A',
  titleLine2 = 'World Of Crystal',
  titleLine3 = 'Clear 4K Display',
  productImage = '/img/android20orbit65.webp',
  productAlt = 'Orbit 65" Smart 4K UHD TV',
  productLink = '/product/orbit-tv-65-smart-4k',
  badgeText = 'SPECIAL ORBIT DEAL',
}) => {
  return (
    <section className="w-full my-6 sm:my-8 font-sans">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#1772E8] via-[#1466D5] to-[#0F53B3] text-white shadow-xl flex items-center group min-h-[160px] sm:min-h-[240px] md:min-h-[280px]">
        {/* Background Concentric Light Circles */}
        <div className="absolute -left-12 -top-12 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-2 sm:right-20 -bottom-24 sm:-bottom-36 w-64 h-64 sm:w-[450px] sm:h-[450px] rounded-full bg-white/15 pointer-events-none" />
        <div className="absolute right-1/3 top-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

        {/* Content Container: Always Flex Row Side-by-Side to preserve exact layout ratio on Mobile & Desktop */}
        <div className="relative z-10 w-full px-4 sm:px-10 md:px-16 py-4 sm:py-8 flex flex-row items-center justify-between gap-2 sm:gap-6">
          {/* Left Text Block */}
          <div className="space-y-1.5 sm:space-y-3 max-w-[62%] sm:max-w-md text-left z-10 shrink">
            {badgeText && (
              <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-400 text-slate-950 text-[9px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-xs">
                {badgeText}
              </span>
            )}
            
            <h2 className="text-sm sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.15]">
              {titleLine1}<br />
              {titleLine2}<br />
              {titleLine3}
            </h2>

            <div className="pt-1 sm:pt-2">
              <Link
                href={productLink}
                className="inline-flex items-center gap-1 bg-white text-[#1466D5] font-bold text-[10px] sm:text-sm md:text-base px-3.5 sm:px-6 py-1.5 sm:py-3 rounded-md sm:rounded-lg shadow-md hover:bg-slate-100 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-wider whitespace-nowrap"
              >
                BUY NOW
              </Link>
            </div>
          </div>

          {/* Right Floating Product Image: Preserves exact proportions without compression */}
          <div className="relative w-[38%] max-w-[150px] sm:max-w-[300px] md:max-w-[400px] h-[120px] sm:h-[220px] md:h-[260px] flex items-center justify-center shrink-0">
            <Image
              src={productImage}
              alt={productAlt}
              fill
              className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
