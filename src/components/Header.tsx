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
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    { name: 'All Products', href: '/#new-arrivals' },
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
      {/* Main Top Header Bar with zero excess margin around logo */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between gap-3">
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
              className="object-contain object-left drop-shadow-md"
              priority
            />
          </div>
        </Link>

        {/* Desktop Search Input (hidden on mobile, visible on lg+) */}
        <div className="hidden lg:flex flex-1 max-w-lg items-center bg-white rounded-full p-1 border border-[#00A9E0]/40 shadow-inner">
          <input
            type="text"
            placeholder="Search appliances, brands, models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-2 text-xs text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
          />
          <button className="bg-[#02367B] hover:bg-[#005BAA] text-white p-2.5 rounded-full shrink-0 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Top Utilities (Desktop) */}
        <div className="hidden xl:flex items-center gap-4 text-[11px] font-medium text-slate-100">
          {/* Store Locator */}
          <Link href="#" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Store Locator</span>
          </Link>

          {/* Track Order */}
          <Link href="#" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Track Order</span>
          </Link>

          {/* Shortcode Phone 6226 */}
          <a href="tel:6226" className="flex items-center gap-1 hover:text-amber-300 transition-colors font-bold text-amber-400">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>6226</span>
          </a>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-[#012554] px-2 py-1 rounded border border-[#005BAA] font-bold text-amber-400 cursor-pointer">
            <Globe className="w-3.5 h-3.5" />
            <span>አማርኛ</span>
          </div>

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
            placeholder="Search appliances, brands, models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-1.5 text-xs text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
          />
          <button className="bg-[#02367B] hover:bg-[#005BAA] text-white p-2 rounded-full shrink-0 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Links Sub Nav Bar (Desktop) */}
      <nav className="bg-[#012554] border-t border-[#005BAA]/60 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-center gap-8 text-[11px] font-bold tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-2.5 text-slate-100 hover:text-amber-300 transition-colors border-b-2 border-transparent hover:border-amber-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#012554] p-4 space-y-3 border-t border-[#005BAA] shadow-xl text-xs">
          <div className="flex flex-col gap-2 font-medium text-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#005BAA]/50 text-sm font-semibold flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-slate-400 text-xs">➔</span>
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

          <div className="pt-2 flex items-center justify-between text-xs text-slate-300">
            <Link href="#" className="flex items-center gap-1 text-amber-300">
              <MapPin className="w-3.5 h-3.5" /> Store Locator
            </Link>
            <Link href="#" className="flex items-center gap-1 text-amber-300">
              <Truck className="w-3.5 h-3.5" /> Track Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
