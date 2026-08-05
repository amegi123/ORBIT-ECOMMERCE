'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { X, Star, ShoppingBag, CheckCircle, ExternalLink } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const router = useRouter();
  const { quickViewProduct, setQuickViewProduct, addToCart, triggerPageLoading } = useCart();

  if (!quickViewProduct) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="relative w-full aspect-square bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <Image
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-3">
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
              {quickViewProduct.category}
            </span>

            <h3 className="text-lg font-black text-slate-900 leading-tight">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-slate-900 font-bold ml-1">{quickViewProduct.rating}.0</span>
              <span className="text-slate-400">({quickViewProduct.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-950">
                {quickViewProduct.currentPrice.toLocaleString()}{' '}
                <span className="text-sm font-bold text-blue-600">ETB</span>
              </span>
              <span className="text-xs line-through text-slate-400">
                {quickViewProduct.oldPrice.toLocaleString()} ETB
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Official Orbit Electronics product with 2 Years Ethiopia Warranty.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
              <CheckCircle className="w-4 h-4" /> Free Same-Day Addis Ababa Delivery
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="w-full bg-[#02367B] hover:bg-[#012759] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition-colors"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={() => {
                  const prodId = quickViewProduct.id;
                  setQuickViewProduct(null);
                  triggerPageLoading();
                  router.push(`/product/${prodId}`);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" /> View Full Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
