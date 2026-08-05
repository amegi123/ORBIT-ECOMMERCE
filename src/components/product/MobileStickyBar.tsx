'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface MobileStickyBarProps {
  product: Product;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="lg:hidden fixed bottom-[56px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-3 px-4 shadow-[0_-6px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3 transform-gpu translate-z-0">
      <div className="shrink-0">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</div>
        <div className="text-lg sm:text-xl font-black text-red-600 leading-tight">
          {product.currentPrice.toLocaleString()} <span className="text-xs text-red-600 font-extrabold">ETB</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-0 max-w-[280px]">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-[#02367B] hover:bg-[#00285d] text-white text-xs sm:text-sm font-black py-3 px-2 rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-all whitespace-nowrap"
        >
          <span>Add to Cart</span>
        </button>

        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs sm:text-sm font-black py-3 px-2 rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-all whitespace-nowrap"
        >
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
