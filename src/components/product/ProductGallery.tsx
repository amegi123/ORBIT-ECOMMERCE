'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ZoomIn, Play, Rotate3d, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  videoUrl?: string;
  has360View?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  videoUrl,
  has360View,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);

  // 360 View rotation state
  const [rotationFrame, setRotationFrame] = useState(0);

  // Magnifier zoom state
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsLightboxOpen(true)}
        className="relative w-full aspect-square max-h-[580px] bg-white rounded-2xl border border-slate-200 p-4 sm:p-8 flex items-center justify-center cursor-zoom-in group overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Discount / Badge overlays */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
          <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Save 15%
          </span>
          <span className="bg-slate-900 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Check className="w-3 h-3" /> Official Warranty
          </span>
        </div>

        {/* Action icons top right */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {has360View && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIs360ModalOpen(true);
              }}
              className="bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-md backdrop-blur transition-all hover:scale-105"
            >
              <Rotate3d className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">360° View</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-xl border border-slate-200 shadow-sm backdrop-blur transition-transform hover:scale-105"
            title="Expand Fullscreen"
          >
            <ZoomIn className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Base Main Image */}
        <div className="relative w-full h-full">
          <Image
            src={images[selectedIndex] || images[0]}
            alt="Orbit Product Detail Image"
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        {/* Magnifier Lens Effect (Zoom on Hover) */}
        {showZoom && (
          <div
            className="absolute inset-0 pointer-events-none z-20 rounded-2xl bg-white bg-no-repeat transition-opacity duration-150"
            style={{
              backgroundImage: `url(${images[selectedIndex] || images[0]})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '220%',
            }}
          />
        )}
      </div>

      {/* Thumbnails Gallery */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-20 h-20 shrink-0 bg-white rounded-xl border-2 p-1.5 transition-all overflow-hidden ${
              selectedIndex === idx
                ? 'border-blue-600 ring-2 ring-blue-500/30 scale-105'
                : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain p-1" />
          </button>
        ))}

        {/* Video Thumbnail Button */}
        {videoUrl && (
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="relative w-20 h-20 shrink-0 bg-slate-900 text-white rounded-xl border-2 border-slate-800 p-1 flex flex-col items-center justify-center gap-1 hover:border-amber-400 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase">Video</span>
          </button>
        )}

        {/* 360 View Thumbnail Button */}
        {has360View && (
          <button
            onClick={() => setIs360ModalOpen(true)}
            className="relative w-20 h-20 shrink-0 bg-slate-950 text-white rounded-xl border-2 border-slate-800 p-1 flex flex-col items-center justify-center gap-1 hover:border-blue-500 transition-all group"
          >
            <Rotate3d className="w-6 h-6 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] font-bold text-blue-400 uppercase">360° View</span>
          </button>
        )}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-amber-400 p-2 rounded-full bg-slate-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            className="absolute left-6 text-white hover:text-amber-400 p-3 rounded-full bg-slate-800/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt="Fullscreen View"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-6 text-white hover:text-amber-400 p-3 rounded-full bg-slate-800/80 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Product Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white bg-slate-900/80 p-2 rounded-full hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={videoUrl}
              title="Product Video Showcase"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 360 Interactive Viewer Modal */}
      {is360ModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIs360ModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white space-y-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-amber-400">
                <Rotate3d className="w-5 h-5" /> Interactive 360° Product Viewer
              </h3>
              <button
                onClick={() => setIs360ModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-slate-800">
              <Image
                src={images[rotationFrame % images.length]}
                alt="360 Rotation View"
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setRotationFrame((prev) => prev - 1)}
                className="bg-slate-800 hover:bg-blue-600 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Rotate Left
              </button>
              <span className="text-xs text-slate-400 font-mono">
                Angle: {((rotationFrame % 8) * 45 + 360) % 360}°
              </span>
              <button
                onClick={() => setRotationFrame((prev) => prev + 1)}
                className="bg-slate-800 hover:bg-blue-600 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                Rotate Right <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
