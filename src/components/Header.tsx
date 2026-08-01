'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Phone,
  Menu,
  X,
  MapPin,
  Truck,
  Globe,
  LogIn,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <header className="w-full bg-[#0A3B7B] text-white sticky top-0 z-40 shadow-md">
      {/* Main Top Header Bar matching Screenshot */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-1 hover:text-amber-300"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Orbit Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-10 w-40 md:h-11 md:w-44 bg-white/95 p-1.5 rounded-lg shadow-sm hover:scale-105 transition-transform">
            <Image
              src="/img/Orbi logo.svg"
              alt="Orbit Electronics Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </Link>

        {/* Center Search Input */}
        <div className="hidden lg:flex flex-1 max-w-lg items-center bg-white rounded-full p-1 border border-blue-300 shadow-inner">
          <input
            type="text"
            placeholder="Search appliances, brands, models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-2 text-xs text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
          />
          <button className="bg-slate-900 hover:bg-blue-900 text-white p-2.5 rounded-full shrink-0 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Top Utilities matching Screenshot */}
        <div className="hidden xl:flex items-center gap-4 text-[11px] font-medium text-slate-200">
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

          {/* Phone */}
          <a href="tel:+251911000000" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>+251 911 000 000</span>
          </a>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-blue-950/60 px-2 py-1 rounded border border-blue-800/80 font-bold text-amber-400 cursor-pointer">
            <Globe className="w-3.5 h-3.5" />
            <span>አማርኛ</span>
          </div>

          {/* Login / Register White Pill Button */}
          <Link
            href="#account"
            className="flex items-center gap-1.5 bg-white text-slate-950 hover:bg-amber-300 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5 text-slate-950" />
            <span>Login / Register</span>
          </Link>
        </div>

        {/* Cart Icon Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative text-white p-2 hover:text-amber-300 transition-transform hover:scale-105"
          title="Cart"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* Category Links Sub Nav Bar matching Screenshot */}
      <nav className="bg-[#082C5E] border-t border-blue-900/60 hidden lg:block">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#082C5E] p-4 space-y-3 border-t border-blue-900 shadow-xl text-xs">
          <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search appliances..."
              className="w-full px-3 py-2 text-slate-900 focus:outline-none"
            />
            <button className="bg-slate-900 text-white px-4 py-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-2 font-medium text-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-blue-900/50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
