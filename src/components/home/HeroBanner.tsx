'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  Tv,
  Snowflake,
  Shirt,
  Flame,
  Droplets,
  Utensils,
  Home,
  Microwave,
  Grid,
  Tag,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Eye,
  Star,
  Zap,
} from 'lucide-react';

const categoriesMenu = [
  { name: 'Smart 4K TVs & Audio', icon: Tv, href: '/#category-tvs' },
  { name: 'Refrigerators & Freezers', icon: Snowflake, href: '/#category-refrigerators' },
  { name: 'Washing Machines', icon: Shirt, href: '/#category-washers' },
  { name: 'Gas Stoves & Ovens', icon: Flame, href: '/#category-stoves' },
  { name: 'Water Dispensers', icon: Droplets, href: '/#category-dispensers' },
  { name: 'Kitchen Appliances', icon: Utensils, href: '/#category-kitchen' },
  { name: 'Home Appliances', icon: Home, href: '/#category-[#02367B]' },
  { name: 'Built-in Ovens & Microwaves', icon: Microwave, href: '/all-products' },
  { name: 'Other Electronics & Accessories', icon: Grid, href: '/all-products' },
  { name: 'Flash Deals & Offers', icon: Tag, href: '/all-products' },
];

const mainBannerSlides = [
  {
    id: 1,
    bannerImage: '/img/bestsellers_banner.png',
    ctaLink: '/all-products',
  },
  {
    id: 2,
    bannerImage: '/img/hero3.webp',
    ctaLink: '/product/orbit-tv-65-smart-4k',
  },
  {
    id: 3,
    bannerImage: '/img/catagories4.webp',
    ctaLink: '/product/side-by-side-fridge',
  },
];

const flashDealProducts = [
  {
    id: 'orbit-tv-55-smart-4k',
    name: 'Orbit 55" Smart 4K UHD TV',
    price: 78000,
    oldPrice: 92000,
    discount: '-15%',
    rating: 5,
    image: '/img/smart204320hd.webp',
  },
  {
    id: 'stn-gas-stove-heavy',
    name: 'Stainless Steel 4-Burner Gas Stove',
    price: 34000,
    oldPrice: 42000,
    discount: '-19%',
    rating: 5,
    image: '/img/stoves50X50.jpeg',
  },
  {
    id: '8kg-auto-toploader',
    name: 'Orbit 8kg Automatic Top Loader',
    price: 49500,
    oldPrice: 58000,
    discount: '-14%',
    rating: 4,
    image: '/img/product-washing1.jpeg',
  },
  {
    id: 'water-dispenser-hot-cold',
    name: 'Orbit Hot & Cold Water Dispenser',
    price: 18500,
    oldPrice: 22000,
    discount: '-16%',
    rating: 5,
    image: '/img/water1_compressed.webp',
  },
];

export const HeroBanner: React.FC = () => {
  const router = useRouter();
  const { triggerPageLoading, setQuickViewProduct } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Live Countdown Timer (Ticks down dynamically)
  const [timeLeft, setTimeLeft] = useState({
    days: 512,
    hours: 20,
    minutes: 46,
    seconds: 11,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slide autoplay
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBannerSlides.length);
    }, 5500);
    return () => clearInterval(slideTimer);
  }, []);

  const activeSlide = mainBannerSlides[currentSlide];

  return (
    <section className="w-full font-sans max-w-[1536px] mx-auto px-3 sm:px-4 md:px-6 pt-4 pb-2 space-y-6">
      {/* ─────────────────────────────────────────
          1. TOP 3-COLUMN HERO BANNER ROW
          ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* LEFT COLUMN: Vertical Category Menu Sidebar (3 Cols) */}
        <div className="lg:col-span-3 w-full hidden lg:flex flex-col">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xs flex flex-col justify-between h-full">
            <div className="space-y-1">
              {categoriesMenu.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <Link
                    key={idx}
                    href={cat.href}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 text-slate-700 hover:text-[#02367B] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#02367B] text-slate-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold tracking-tight">{cat.name}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#02367B] transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pure Banner Image Carousel (9 Cols) */}
        <div className="lg:col-span-9 w-full flex flex-col">
          <div className="relative rounded-2xl border border-slate-200/90 bg-white p-0 flex flex-col justify-between h-[160px] sm:h-[280px] lg:h-full min-h-[160px] sm:min-h-[280px] lg:min-h-[380px] overflow-hidden shadow-xs group/carousel">
            {/* Carousel Container with Smooth Auto Slide-In Animation */}
            <div className="relative w-full h-full overflow-hidden">
              {mainBannerSlides.map((slide, idx) => {
                let positionClass = 'translate-x-full opacity-0 pointer-events-none';
                if (currentSlide === idx) {
                  positionClass = 'translate-x-0 opacity-100 pointer-events-auto z-10';
                } else if (idx === (currentSlide - 1 + mainBannerSlides.length) % mainBannerSlides.length) {
                  positionClass = '-translate-x-full opacity-0 pointer-events-none';
                }

                return (
                  <Link
                    key={slide.id}
                    href={slide.ctaLink}
                    onClick={() => triggerPageLoading()}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform cursor-pointer group ${positionClass}`}
                  >
                    <Image
                      src={slide.bannerImage}
                      alt={`Banner Slide ${slide.id}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority={idx === 0}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Left Navigation Hover Popup Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide((prev) => (prev - 1 + mainBannerSlides.length) % mainBannerSlides.length);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/carousel:translate-x-0 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Navigation Hover Popup Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide((prev) => (prev + 1) % mainBannerSlides.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/carousel:translate-x-0 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Slider Pagination Dots */}
            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
              {mainBannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'w-5 sm:w-7 bg-blue-400'
                      : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          2. BOTTOM FLASH DEAL BANNER & CAROUSEL
          ───────────────────────────────────────── */}
      <div className="w-full bg-indigo-50/70 border border-indigo-100 rounded-3xl p-4 sm:p-7 shadow-xs space-y-5">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-indigo-100/80 pb-3 flex-wrap gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#02367B] tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 fill-amber-400 text-amber-500 animate-pulse" />
              FLASH DEAL
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Hurry Up ! The offer is limited. Grab while it lasts
            </p>
          </div>

          <Link
            href="/all-products"
            className="text-xs sm:text-sm font-bold text-[#02367B] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Content Row: Countdown Card + 4 Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* LEFT 4-COL: Solid Blue Countdown Card */}
          <div className="lg:col-span-4 w-full flex flex-col justify-between bg-[#02367B] text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="w-full space-y-4 my-auto text-center">
              {/* Countdown Numbers Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                {/* Days */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/20">
                  <div className="text-xl sm:text-2xl font-black text-white">{timeLeft.days}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-blue-200 mt-1">Days</div>
                </div>

                {/* Hours */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/20">
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-blue-200 mt-1">Hours</div>
                </div>

                {/* Minutes */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/20">
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-blue-200 mt-1">Minutes</div>
                </div>

                {/* Seconds */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/20">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-blue-200 mt-1">Seconds</div>
                </div>
              </div>

              {/* Progress Bar under timer */}
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-3">
                <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full w-[70%] rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* RIGHT 8-COL: 4 Flash Deal Product Cards */}
          <div className="lg:col-span-8 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {flashDealProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  triggerPageLoading();
                  router.push(`/product/${prod.id}`);
                }}
                className="group bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 flex flex-col justify-between items-center text-center hover:shadow-md hover:border-[#02367B] transition-all cursor-pointer relative"
              >
                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-[#02367B] text-white text-[10px] font-black px-2 py-0.5 rounded-md z-10 shadow-xs">
                  {prod.discount}
                </span>

                {/* Quick view button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct({
                      id: prod.id,
                      name: prod.name,
                      currentPrice: prod.price,
                      oldPrice: prod.oldPrice,
                      discountPercentage: 15,
                      rating: prod.rating,
                      reviewCount: 24,
                      images: [prod.image],
                      sku: 'ORB-FLASH-SKU',
                      brand: 'Orbit',
                      category: 'Electronics',
                      categoryHierarchy: ['Home', 'Electronics', prod.name],
                      model: 'MOD-ORBIT',
                      availability: 'In Stock',
                      stockCount: 10,
                      warranty: '2 Years Official Warranty',
                      shortDescription: prod.name,
                      features: ['Official Orbit Quality', 'Express Delivery'],
                      colors: [{ name: 'Standard', hex: '#000' }],
                      sizes: ['Standard'],
                      specifications: [],
                      fullDescription: '',
                      deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
                      reviews: [],
                      questions: [],
                      frequentlyBoughtTogether: [],
                    });
                  }}
                  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:bg-[#02367B] hover:text-white flex items-center justify-center shadow-xs transition-all z-10"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {/* Product Image Container */}
                <div className="relative w-full aspect-square bg-slate-50 rounded-xl p-2 mb-2 flex items-center justify-center overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Title */}
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight mb-2 group-hover:text-[#02367B] transition-colors">
                  {prod.name}
                </h4>

                {/* Pricing & Rating */}
                <div className="space-y-1 mt-auto">
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-400 line-through">
                      {prod.oldPrice.toLocaleString()} ETB
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-950">
                      {prod.price.toLocaleString()} ETB
                    </span>
                  </div>

                  <div className="flex justify-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < prod.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
