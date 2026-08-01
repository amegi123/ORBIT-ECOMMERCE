'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  ZoomIn,
  Ruler,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  videoUrl?: string;
  has360View?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDimensions, setShowDimensions] = useState(true);

  // Hover Magnifier Zoom Lens State (Scope restricted strictly to Product Image area)
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="w-full flex flex-col gap-5 select-none font-sans">
      {/* Main Container Card */}
      <div className="relative w-full aspect-square bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-12 flex items-center justify-center overflow-hidden shadow-sm">
        {/* Top Header Controls Layout (Non-overlapping on mobile) */}
        <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Top Left Guarantee Badge */}
          <div className="pointer-events-auto">
            <span className="bg-[#02367B] text-white text-[10px] sm:text-[11px] font-black px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" /> Official Guarantee
            </span>
          </div>

          {/* Top Right Controls: Toggle Dimensions & Hover Zoom Hint */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setShowDimensions(!showDimensions)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                showDimensions
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Toggle Height & Width Measurements"
            >
              <Ruler className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{showDimensions ? 'Hide Dimensions' : 'Show Measurements'}</span>
            </button>

            <div className="hidden sm:flex bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full items-center gap-1 opacity-80">
              <ZoomIn className="w-3 h-3 text-amber-400" />
              <span>Image Zoom</span>
            </div>
          </div>
        </div>

        {/* Product Image Section ONLY (Hover Zoom Scope Restricted Here) */}
        <div
          ref={imageRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          className="relative w-full h-full cursor-zoom-in group mt-6 sm:mt-0"
        >
          <Image
            src={activeImage}
            alt="Orbit Product Detail Image"
            fill
            className="object-contain p-2"
            priority
          />

          {/* Floating Magnifier Zoom Lens Circle (Operates ONLY inside Product Image) */}
          {isHovering && (
            <div
              className="absolute z-30 w-44 h-44 rounded-full border-2 border-[#02367B] shadow-2xl pointer-events-none overflow-hidden bg-white"
              style={{
                left: `${zoomPos.x}%`,
                top: `${zoomPos.y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundImage: `url(${activeImage})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: '280%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}
        </div>

        {/* Padded Dimension Lines (Positioned safely inside container to avoid overlap) */}
        {showDimensions && (
          <>
            {/* Right Vertical Height Measurement Arrow Line */}
            <div className="absolute right-6 sm:right-10 top-16 bottom-16 z-10 flex items-center pointer-events-none">
              <div className="relative h-full flex flex-col items-center justify-between">
                {/* Top Arrow Cap */}
                <ChevronUp className="w-4 h-4 text-[#00A9E0] -mb-1" />

                {/* Vertical Line */}
                <div className="h-full w-[2px] bg-[#00A9E0]/80 shadow-sm" />

                {/* Bottom Arrow Cap */}
                <ChevronDown className="w-4 h-4 text-[#00A9E0] -mt-1" />

                {/* Height Label Pill (Safely positioned inside card) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-2 bg-[#02367B] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg whitespace-nowrap border border-[#00A9E0]/50 flex items-center gap-1">
                  <span className="text-[#46D3E4]">H:</span>
                  <span>85 cm</span>
                </div>
              </div>
            </div>

            {/* Bottom Horizontal Width Measurement Arrow Line */}
            <div className="absolute bottom-4 sm:bottom-6 left-12 right-12 sm:left-16 sm:right-16 z-10 flex justify-center pointer-events-none">
              <div className="relative w-full flex items-center justify-between">
                {/* Left Arrow Cap */}
                <ChevronLeft className="w-4 h-4 text-amber-500 -mr-1" />

                {/* Horizontal Line */}
                <div className="w-full h-[2px] bg-amber-400/90 shadow-sm" />

                {/* Right Arrow Cap */}
                <ChevronRight className="w-4 h-4 text-amber-500 -ml-1" />

                {/* Center Width Label Pill */}
                <div className="absolute left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-lg whitespace-nowrap border border-amber-500/50 flex items-center gap-1">
                  <span>W: 60 cm</span>
                  <span className="text-slate-700">| D: 60 cm</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row with Active Gold Highlight */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-20 h-20 bg-white rounded-2xl border overflow-hidden shrink-0 transition-all p-1.5 ${
              selectedIndex === idx
                ? 'border-2 border-amber-400 shadow-md scale-105'
                : 'border-slate-200 opacity-70 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
};
