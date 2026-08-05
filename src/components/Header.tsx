'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  Search,
  ShoppingCart,
  Phone,
  Menu,
  X,
  MapPin,
  Truck,
  Globe,
  LogIn,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

// SVG Flag Components for high quality rendering across all OS/Browsers
const EthiopiaFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg className={`${className} rounded-xs overflow-hidden shadow-xs shrink-0 inline-block`} viewBox="0 0 600 400" aria-hidden="true">
    <rect width="600" height="133.3" fill="#009A44" />
    <rect y="133.3" width="600" height="133.3" fill="#FED100" />
    <rect y="266.6" width="600" height="133.3" fill="#E62727" />
    <circle cx="300" cy="200" r="70" fill="#0033A0" />
    <g fill="#FED100">
      <polygon points="300,145 314,185 356,185 322,210 335,250 300,225 265,250 278,210 244,185 286,185" />
    </g>
  </svg>
);

const USFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg className={`${className} rounded-xs overflow-hidden shadow-xs shrink-0 inline-block`} viewBox="0 0 740 390" aria-hidden="true">
    <rect width="740" height="390" fill="#B22234" />
    <rect y="30" width="740" height="30" fill="#FFFFFF" />
    <rect y="90" width="740" height="30" fill="#FFFFFF" />
    <rect y="150" width="740" height="30" fill="#FFFFFF" />
    <rect y="210" width="740" height="30" fill="#FFFFFF" />
    <rect y="270" width="740" height="30" fill="#FFFFFF" />
    <rect y="330" width="740" height="30" fill="#FFFFFF" />
    <rect width="296" height="210" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <circle cx="30" cy="25" r="7" />
      <circle cx="80" cy="25" r="7" />
      <circle cx="130" cy="25" r="7" />
      <circle cx="180" cy="25" r="7" />
      <circle cx="230" cy="25" r="7" />
      <circle cx="55" cy="55" r="7" />
      <circle cx="105" cy="55" r="7" />
      <circle cx="155" cy="55" r="7" />
      <circle cx="205" cy="55" r="7" />
      <circle cx="30" cy="85" r="7" />
      <circle cx="80" cy="85" r="7" />
      <circle cx="130" cy="85" r="7" />
      <circle cx="180" cy="85" r="7" />
      <circle cx="230" cy="85" r="7" />
      <circle cx="55" cy="115" r="7" />
      <circle cx="105" cy="115" r="7" />
      <circle cx="155" cy="115" r="7" />
      <circle cx="205" cy="115" r="7" />
      <circle cx="30" cy="145" r="7" />
      <circle cx="80" cy="145" r="7" />
      <circle cx="130" cy="145" r="7" />
      <circle cx="180" cy="145" r="7" />
      <circle cx="230" cy="145" r="7" />
      <circle cx="55" cy="175" r="7" />
      <circle cx="105" cy="175" r="7" />
      <circle cx="155" cy="175" r="7" />
      <circle cx="205" cy="175" r="7" />
    </g>
  </svg>
);

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen, language, setIsLanguageModalOpen, setIsAiAssistantOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const searchSuggestions = [
    'Search Samsung TV...',
    'Search LG Refrigerator...',
    'Search Washing Machine...',
    'Search Water Dispenser...',
    'Search Electric Stove...',
    'Search Orbit Smart Appliances...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [searchSuggestions.length]);

  // Auto-hide header on mobile when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only apply scroll hide/show logic on mobile (< 1024px)
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
          setIsVisible(false); // Scroll down -> hide
        } else {
          setIsVisible(true); // Scroll up -> show
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Hide Header completely on standalone login and signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/all-products' },
    { name: 'Televisions', href: '/#category-tvs' },
    { name: 'Refrigerators', href: '/#category-fridges' },
    { name: 'Washing Machines', href: '/#category-washers' },
    { name: 'Stoves Machines', href: '/#category-stoves' },
    { name: 'Water Dispensers', href: '/#category-dispensers' },
    { name: 'Dishwashers', href: '/#category-kitchen' },
  ];

  return (
    <header
      className={`w-full bg-[#02367B] text-white sticky top-0 z-40 shadow-md transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'
      }`}
    >
      {/* Main Top Header Bar (First Color: #02367B) */}
      <div className="bg-[#02367B] max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between gap-3">
        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-1 hover:text-amber-300 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Orbit Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 p-0 m-0">
          <div className="relative h-11 w-44 sm:h-12 sm:w-52 md:h-14 md:w-60 lg:h-16 lg:w-64 hover:scale-105 transition-transform">
            <Image
              src="/img/Orbi logo.svg"
              alt="Orbit Electronics Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Search Input (hidden on mobile, visible on lg+) */}
        <div className="hidden lg:flex flex-1 max-w-lg items-center bg-white rounded-full p-1 border border-[#00A9E0]/40 shadow-inner">
          <input
            type="text"
            placeholder={searchSuggestions[placeholderIndex]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-2 text-xs text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400 transition-all duration-300"
          />
          <button className="bg-[#02367B] hover:bg-[#005BAA] text-white p-2.5 rounded-full shrink-0 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Top Utilities (Desktop) */}
        <div className="hidden xl:flex items-center gap-4 text-[11px] font-medium text-white">
          {/* Store Locator */}
          <Link href="#" className="flex items-center gap-1 text-white hover:text-amber-300 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>Store Locator</span>
          </Link>

          {/* Track Order */}
          <Link href="#" className="flex items-center gap-1 text-white hover:text-amber-300 transition-colors">
            <Truck className="w-3.5 h-3.5 text-white" />
            <span>Track Order</span>
          </Link>

          {/* Shortcode Phone 6226 */}
          <a href="tel:6226" className="flex items-center gap-1 text-white hover:text-amber-300 transition-colors font-bold">
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>6226</span>
          </a>

          {/* Language Selection Trigger Button */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#002B66] hover:bg-[#001F4C] px-2.5 py-1 rounded border border-[#005BAA] font-bold text-white cursor-pointer transition-all active:scale-95 shadow-xs"
            title="Change Language / ቋንቋ ይምረጡ"
          >
            {language === 'am' ? <EthiopiaFlag className="w-4 h-3" /> : <USFlag className="w-4 h-3" />}
            <span className="text-white text-xs select-none">
              {language === 'am' ? 'አማርኛ' : language === 'om' ? 'Oromoo' : language === 'ti' ? 'ትግርኛ' : language === 'so' ? 'Soomaali' : 'English'}
            </span>
          </button>

          {/* Login / Register White Pill Button */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 bg-white text-[#02367B] hover:bg-amber-300 hover:text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5 text-[#02367B]" />
            <span>Login / Register</span>
          </Link>
        </div>

        {/* Cart Icon Button */}
        <div className="flex items-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-white p-2 hover:text-amber-300 transition-transform hover:scale-105"
            title="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dedicated Search Bar */}
      <div className="lg:hidden px-4 pb-3 pt-1 max-w-7xl mx-auto">
        <div className="flex items-center bg-white rounded-full p-1 border border-[#00A9E0]/40 shadow-md">
          <input
            type="text"
            placeholder={searchSuggestions[placeholderIndex]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-1.5 text-xs text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400 transition-all duration-300"
          />
          <button className="bg-[#02367B] hover:bg-[#005BAA] text-white p-2 rounded-full shrink-0 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Links Sub Nav Bar (Second Header Color: #005BAA) */}
      <nav className="bg-[#005BAA] border-t border-white/10 hidden lg:block shadow-inner">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-center gap-8 text-[11px] font-bold tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-2.5 text-white hover:text-amber-300 transition-colors border-b-2 border-transparent hover:border-amber-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#005BAA] p-4 space-y-3 border-t border-white/10 shadow-xl text-xs">
          <div className="flex flex-col gap-2 font-medium text-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/10 text-sm font-semibold flex items-center justify-between text-white"
              >
                <span>{link.name}</span>
                <span className="text-slate-300 text-xs">➔</span>
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-amber-300 font-extrabold flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Register</span>
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-white border-t border-white/10">
            <Link href="#" className="flex items-center gap-1 text-white hover:text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-white" /> Store Locator
            </Link>
            <Link href="#" className="flex items-center gap-1 text-white hover:text-amber-300">
              <Truck className="w-3.5 h-3.5 text-white" /> Track Order
            </Link>

            {/* Mobile Language Selector with Flag */}
            <button
              onClick={() => {
                setIsLanguageModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 bg-[#02367B] px-2.5 py-1 rounded border border-white/20 text-white font-bold hover:bg-[#02367B]/80 transition-colors cursor-pointer"
            >
              {language === 'am' ? <EthiopiaFlag className="w-4 h-3" /> : <USFlag className="w-4 h-3" />}
              <span className="text-white">
                {language === 'am' ? 'አማርኛ' : language === 'om' ? 'Oromoo' : language === 'ti' ? 'ትግርኛ' : language === 'so' ? 'Soomaali' : 'English'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

