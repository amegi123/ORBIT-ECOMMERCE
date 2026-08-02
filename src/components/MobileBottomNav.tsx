'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Phone, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();

  // Hide MobileBottomNav completely on standalone login and signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#02367B]/95 backdrop-blur-md text-white border-t border-[#005BAA]/80 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] select-none">
      <div className="flex items-center justify-around py-2 px-1">
        {/* 1. Home Link */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-0.5 text-white hover:opacity-80 transition-opacity py-1 px-3"
        >
          <Home className="w-5 h-5 text-white" />
          <span className="text-[10px] font-bold tracking-tight text-white">Home</span>
        </Link>

        {/* 2. Categories Link */}
        <Link
          href="/#category-tvs"
          className="flex flex-col items-center justify-center gap-0.5 text-white hover:opacity-80 transition-opacity py-1 px-3"
        >
          <Grid className="w-5 h-5 text-white" />
          <span className="text-[10px] font-bold tracking-tight text-white">Categories</span>
        </Link>

        {/* 3. Call Hotline 6226 */}
        <a
          href="tel:6226"
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-white hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-full bg-white text-[#02367B] flex items-center justify-center font-black shadow-md">
            <Phone className="w-3.5 h-3.5 text-[#02367B]" />
          </div>
          <span className="text-[10px] font-black tracking-tight text-white">6226</span>
        </a>

        {/* 4. Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center gap-0.5 text-white hover:opacity-80 transition-opacity py-1 px-3"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-white" />
            {totalCartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#02367B] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight text-white">Cart</span>
        </button>

        {/* 5. Account / Login Link */}
        <Link
          href="/login"
          className="flex flex-col items-center justify-center gap-0.5 text-white hover:opacity-80 transition-opacity py-1 px-3"
        >
          <User className="w-5 h-5 text-white" />
          <span className="text-[10px] font-bold tracking-tight text-white">Account</span>
        </Link>
      </div>
    </div>
  );
};

