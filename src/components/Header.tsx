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
  Layers,
  ChevronDown,
  Percent,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { cart, wishlist, setIsCartOpen, compareList, setIsCompareOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/#new-arrivals' },
    { name: 'Televisions', href: '/#category-tvs' },
    { name: 'Refrigerators', href: '/#category-fridges' },
    { name: 'Washing Machines', href: '/#category-washers' },
    { name: 'Kitchen Appliances', href: '/#category-kitchen' },
    { name: 'Water Dispensers', href: '/#category-dispensers' },
    { name: 'Discounts%', href: '/#best-sellers', isHighlight: true },
  ];

  return (
    <header className="w-full bg-[#0B3C80] text-white sticky top-0 z-40 shadow-md">
      {/* Top Utility Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-1 hover:text-amber-400"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Orbit Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-10 w-36 md:h-12 md:w-48 bg-white/95 p-1.5 rounded-xl shadow-sm hover:scale-105 transition-transform">
            <Image
              src="/img/Orbi logo.svg"
              alt="Orbit Electronics Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl items-center bg-white rounded-full p-1 overflow-hidden shadow-inner border border-blue-400">
          <input
            type="text"
            placeholder="Search appliances, televisions, water dispensers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-2 text-xs text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
          />
          <button className="bg-slate-900 hover:bg-blue-900 text-white p-2.5 rounded-full shrink-0 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Top Right Utility Icons & Login Pill */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Call support */}
          <a
            href="tel:+251911000000"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-200 hover:text-amber-400 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline">+251 911 000 000</span>
          </a>

          {/* Comparison */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="relative text-slate-200 hover:text-amber-400 p-1.5 transition-colors"
            title="Compare"
          >
            <Layers className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist */}
          <Link
            href="#wishlist"
            className="relative text-slate-200 hover:text-amber-400 p-1.5 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Login / Register Pill */}
          <Link
            href="#account"
            className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>Login / Register</span>
          </Link>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-amber-400 hover:bg-amber-500 text-slate-950 p-2.5 rounded-full transition-transform hover:scale-105 shadow-md"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-slate-950 text-amber-400 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-400">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Categories Navigation Bar (Matching Screenshot Deep Navy Bar) */}
      <nav className="bg-[#072B5E] border-t border-blue-900/60 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-center gap-8 text-xs font-bold tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`py-3.5 transition-colors border-b-2 border-transparent hover:border-amber-400 ${
                link.isHighlight
                  ? 'text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-1'
                  : 'text-slate-100 hover:text-amber-400'
              }`}
            >
              {link.isHighlight && <Percent className="w-3.5 h-3.5" />}
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#072B5E] p-4 space-y-4 border-t border-blue-900 shadow-xl">
          <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search appliances..."
              className="w-full px-3 py-2 text-sm text-slate-900 focus:outline-none"
            />
            <button className="bg-slate-900 text-white px-4 py-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-2 font-semibold text-sm text-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-blue-900/50 ${
                  link.isHighlight ? 'text-amber-400 font-extrabold' : ''
                }`}
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
