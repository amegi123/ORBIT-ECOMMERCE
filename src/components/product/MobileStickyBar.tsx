'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Zap } from 'lucide-react';

interface MobileStickyBarProps {
  product: Product;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-2xl flex items-center justify-between gap-3">
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase">Price</div>
        <div className="text-base font-black text-slate-950">
          {product.currentPrice.toLocaleString()} <span className="text-xs text-blue-600 font-bold">ETB</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 max-w-xs">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 shadow"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add</span>
        </button>

        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 shadow"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
