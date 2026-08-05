'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import {
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Star,
  Share2,
  Heart,
  CreditCard,
  Sparkles,
  Zap,
  Eye,
  Flame,
} from 'lucide-react';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart, addToast } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    addToast('Item Added to Cart', `${product.name} has been added to your order!`, 'success');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast('Cart Updated', `${quantity} x ${product.name} added to cart`, 'info');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard!', 'info');
    }
  };

  const savingsAmount = product.oldPrice ? product.oldPrice - product.currentPrice : 0;

  // Use dynamic product features or generate high quality category defaults
  const featuresList =
    product.features && product.features.length > 0
      ? product.features
      : [
          'Genuine Orbit Original Product',
          '2-Year Official Ethiopian Warranty',
          'Energy Saver High Performance Engine',
          'Heavy-Duty Premium Build Quality',
          'Express Addis Ababa Home Delivery',
          'Supports Telebirr & Chapa Payment',
        ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans select-none">
      {/* Category Hierarchy & Badges */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-[#02367B]/10 text-[#02367B] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {product.brand || 'Orbit'}
          </span>
          <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Wishlist & Share Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsWishlisted(!isWishlisted);
              addToast(
                isWishlisted ? 'Removed' : 'Saved to Wishlist',
                `${product.name} ${isWishlisted ? 'removed from' : 'saved to'} your wishlist!`,
                'info'
              );
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isWishlisted
                ? 'bg-rose-100 text-rose-600'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Title & Rating & View Count */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight leading-snug">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 flex-wrap text-xs">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-black text-slate-900 ml-1">{product.rating || 4.8}</span>
          </div>

          <a
            href="#customer-reviews"
            className="text-blue-700 hover:underline font-bold text-xs"
          >
            ({product.reviewCount || 128} reviews)
          </a>

          <span className="text-slate-300">•</span>

          {/* View Count Badge */}
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-700 font-bold">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>{(product.viewCount || 1482).toLocaleString()} views</span>
          </div>

          <span className="text-slate-300">•</span>
          <span className="text-slate-400 font-mono text-[11px]">
            SKU: {product.sku || 'ORB-2026-ET'}
          </span>
        </div>
      </div>

      {/* Product Description */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        {product.shortDescription ||
          `Experience high-performance efficiency with the ${product.name}. Engineered for durability, energy savings, and modern convenience, backed by Orbit’s 2-Year Genuine Warranty.`}
      </p>

      {/* Price & Savings Tag */}
      <div className="border-y border-slate-100 py-4 space-y-1">
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight">
            ETB {product.currentPrice.toLocaleString()}.00
          </div>
          {product.oldPrice && product.oldPrice > product.currentPrice && (
            <div className="text-base font-semibold text-slate-400 line-through">
              ETB {product.oldPrice.toLocaleString()}.00
            </div>
          )}
        </div>

        {savingsAmount > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="bg-[#02367B] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-amber-400 text-amber-400" />
              SAVE {product.discountPercentage || 15}% ({savingsAmount.toLocaleString()} ETB OFF)
            </span>
          </div>
        )}
      </div>

      {/* Stock Status & Sold Amount Badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-md">
            {product.availability || 'In Stock'}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            ({product.stockCount || 42} left)
          </span>
        </div>

        <span className="text-slate-300">•</span>

        {/* Sold Amount Badge */}
        <div className="flex items-center gap-1.5 bg-[#02367B]/10 text-[#02367B] border border-[#02367B]/25 text-xs font-black px-3 py-1 rounded-md shadow-xs">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{(product.soldCount || 326).toLocaleString()} Sold</span>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="space-y-3 p-4.5 rounded-2xl bg-slate-50/80 border border-slate-200/60">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Highlights & Key Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-slate-700 font-medium">
          {featuresList.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 group">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="leading-snug text-slate-800">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity Selector & Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700">Quantity:</label>
          <div className="inline-flex items-center border border-slate-300 rounded-full overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-xs font-bold text-slate-900">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stockCount || 100, q + 1))}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[11px] text-slate-400">Max: {product.stockCount || 100}</span>
        </div>

        {/* Action Buttons: Yellow Buy Now Pill + Circular Cart Button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 px-8 rounded-full text-sm transition-all shadow-md hover:shadow-lg text-center cursor-pointer hover:scale-[1.01]"
          >
            Buy Now
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-12 h-12 rounded-full bg-[#02367B] hover:bg-[#005BAA] text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg shrink-0 cursor-pointer hover:scale-105"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Guarantee & Payments */}
      <div className="border-t border-slate-100 pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100/80 transition-all hover:bg-blue-50 hover:shadow-sm group">
            <div className="w-10 h-10 rounded-xl bg-[#02367B] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 leading-snug">Express Delivery</div>
              <div className="text-[11px] font-semibold text-blue-700">Addis Ababa & Regional Hubs</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 transition-all hover:bg-emerald-50 hover:shadow-sm group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 leading-snug">2-Year Warranty</div>
              <div className="text-[11px] font-semibold text-emerald-700">Official Orbit Guarantee</div>
            </div>
          </div>
        </div>

        {/* Payment Badges Bar */}
        <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <CreditCard className="w-4 h-4 text-slate-500" />
            <span>Supported Payments:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap font-mono text-[10px]">
            <span className="bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-300">Telebirr</span>
            <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded border border-blue-300">Chapa</span>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">CBE / Cash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

