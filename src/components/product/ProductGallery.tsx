'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Maximize2,
  X,
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
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="w-full flex flex-col gap-5 select-none font-sans">
      {/* Main Container Card */}
      <div className="relative w-full aspect-square bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-sm group">
        {/* Top Header Floating Controls Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {/* Top Left Guarantee Badge */}
          <div className="pointer-events-auto">
            <span className="bg-[#02367B] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Guarantee</span>
            </span>
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Dimensions Toggle */}
            <button
              type="button"
              onClick={() => setShowDimensions(!showDimensions)}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                showDimensions
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
              title="Toggle Height & Width Measurements"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{showDimensions ? 'Hide Dimensions' : 'Measurements'}</span>
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsFullscreenOpen(true)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#02367B] text-slate-700 hover:text-white flex items-center justify-center border border-slate-200 shadow-xs transition-colors cursor-pointer"
              title="Expand Fullscreen View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Simple Product Image Display */}
        <div
          onClick={() => setIsFullscreenOpen(true)}
          className="relative w-full h-full cursor-pointer flex items-center justify-center mt-6 sm:mt-0"
        >
          <Image
            src={activeImage}
            alt="Orbit Product Image"
            fill
            className="object-contain p-2 transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        {/* Dimension Lines */}
        {showDimensions && (
          <>
            {/* Right Vertical Height Measurement Arrow Line */}
            <div className="absolute right-6 sm:right-10 top-16 bottom-16 z-10 flex items-center pointer-events-none">
              <div className="relative h-full flex flex-col items-center justify-between">
                <ChevronUp className="w-4 h-4 text-[#00A9E0] -mb-1" />
                <div className="h-full w-[2px] bg-[#00A9E0]/80 shadow-xs" />
                <ChevronDown className="w-4 h-4 text-[#00A9E0] -mt-1" />

                <div className="absolute top-1/2 -translate-y-1/2 right-2 bg-[#02367B] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap border border-[#00A9E0]/50 flex items-center gap-1">
                  <span className="text-[#46D3E4]">H:</span>
                  <span>85 cm</span>
                </div>
              </div>
            </div>

            {/* Bottom Horizontal Width Measurement Arrow Line */}
            <div className="absolute bottom-4 sm:bottom-6 left-12 right-12 sm:left-16 sm:right-16 z-10 flex justify-center pointer-events-none">
              <div className="relative w-full flex items-center justify-between">
                <ChevronLeft className="w-4 h-4 text-amber-500 -mr-1" />
                <div className="w-full h-[2px] bg-amber-400/90 shadow-xs" />
                <ChevronRight className="w-4 h-4 text-amber-500 -ml-1" />

                <div className="absolute left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[9px] sm:text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md whitespace-nowrap border border-amber-500/50 flex items-center gap-1">
                  <span>W: 60 cm</span>
                  <span className="text-slate-700">| D: 60 cm</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-20 h-20 bg-white rounded-2xl border shrink-0 transition-all p-2.5 cursor-pointer ${
              selectedIndex === idx
                ? 'border-2 border-amber-400 scale-105 shadow-sm'
                : 'border-slate-200 opacity-70 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain p-1.5" />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200 select-none">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between z-20">
            <div className="flex items-center gap-2 text-white">
              <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full">
                HD Gallery
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreenOpen(false)}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-rose-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Close Fullscreen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fullscreen Display */}
          <div className="relative w-full h-[70vh] sm:h-[80vh] my-auto flex items-center justify-center">
            <Image
              src={activeImage}
              alt="Fullscreen Product Image"
              fill
              className="object-contain"
              priority
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-4 w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto z-20 py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-16 rounded-xl border shrink-0 transition-all p-2 cursor-pointer ${
                  selectedIndex === idx
                    ? 'border-2 border-amber-400 scale-105'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-contain p-1" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

