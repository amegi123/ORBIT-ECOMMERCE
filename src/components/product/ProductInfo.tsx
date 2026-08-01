'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import {
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Heart,
  Layers,
  ShoppingBag,
  Share2,
  Send,
  MessageCircle,
  Copy,
  Minus,
  Plus,
  Check,
  Sparkles,
} from 'lucide-react';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compareList, addToast } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Black');
  const [selectedSize, setSelectedSize] = useState(product.sizes[3] || '65"');
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.some((p) => p.id === product.id);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Title & Ratings Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-max border border-blue-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official {product.brand} Ethiopia Product</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
          {product.name}
        </h1>

        {/* Rating & SKU Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-slate-900 ml-1">{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount} Reviews)</span>
          </div>

          <span className="text-slate-300">|</span>
          <span>
            <strong className="text-slate-700">SKU:</strong> {product.sku}
          </span>
          <span className="text-slate-300">|</span>
          <span>
            <strong className="text-slate-700">Brand:</strong> {product.brand}
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" /> {product.availability}
          </span>
        </div>
      </div>

      {/* Pricing Section (95,000 ETB / 110,000 ETB / Save 15%) */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Current Price
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {product.currentPrice.toLocaleString()} <span className="text-xl font-bold text-blue-600">ETB</span>
            </span>
            <span className="text-base line-through text-slate-400 font-medium">
              {product.oldPrice.toLocaleString()} ETB
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-rose-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
            Save 15% OFF
          </span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-sm text-slate-600 leading-relaxed font-normal">
        {product.shortDescription}
      </p>

      {/* Features checklist */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-900 text-white p-4 rounded-2xl">
        {product.features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{feat}</span>
          </div>
        ))}
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
          <span>Color: <strong className="text-blue-600 font-extrabold">{selectedColor}</strong></span>
        </label>
        <div className="flex items-center gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-xs font-semibold transition-all ${
                selectedColor === c.name
                  ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-slate-300 shadow-inner"
                style={{ backgroundColor: c.hex }}
              />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
          <span>Screen Size: <strong className="text-blue-600 font-extrabold">{selectedSize}</strong></span>
          <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">Size Guide</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-5 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                selectedSize === s
                  ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border-2 border-slate-200 rounded-xl bg-white p-1 shrink-0 justify-between sm:justify-start">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-sm font-bold text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-sm"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>

          {/* Buy Now CTA */}
          <button
            onClick={() => {
              addToCart(product, quantity, selectedColor, selectedSize);
            }}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-sm shrink-0"
          >
            <span>Buy Now</span>
          </button>
        </div>

        {/* Wishlist & Compare Buttons */}
        <div className="flex items-center gap-4 pt-1 border-t border-slate-100">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg transition-colors ${
              isWishlisted
                ? 'text-rose-600 bg-rose-50'
                : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
          </button>

          <button
            onClick={() => toggleCompare(product)}
            className={`flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg transition-colors ${
              isCompared
                ? 'text-blue-600 bg-blue-50'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isCompared ? 'Added to Compare' : 'Compare Product'}</span>
          </button>
        </div>
      </div>

      {/* Delivery & Payment Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>Free Delivery</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Within Addis Ababa. Same-day / next-day delivery.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>2 Years Warranty</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Official Orbit Ethiopia warranty & customer support.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Payment Options</span>
          </div>
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="relative h-5 w-12 bg-white rounded border border-slate-300">
              <Image src="/img/tellbirr.png" alt="Telebirr" fill className="object-contain p-0.5" />
            </div>
            <div className="relative h-5 w-10 bg-white rounded border border-slate-300">
              <Image src="/img/chapa.png" alt="Chapa" fill className="object-contain p-0.5" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Cash/Bank</span>
          </div>
        </div>
      </div>

      {/* Share Product */}
      <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-700 flex items-center gap-1">
          <Share2 className="w-3.5 h-3.5 text-slate-400" /> Share:
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`https://t.me/share/url?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
            title="Share on Telegram"
          >
            <Send className="w-3.5 h-3.5" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            title="Share on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Copy Link"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
