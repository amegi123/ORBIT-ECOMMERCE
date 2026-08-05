'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Minus, Plus, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart, addToast } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      currentPrice: product.currentPrice,
      oldPrice: product.oldPrice,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      reviewCount: product.reviewCount,
      images: product.images,
      sku: product.sku,
      brand: product.brand,
      category: product.category,
      categoryHierarchy: product.categoryHierarchy,
      model: product.model,
      availability: product.availability,
      stockCount: product.stockCount,
      warranty: product.warranty,
      shortDescription: product.shortDescription,
      features: product.features,
      colors: product.colors,
      sizes: product.sizes,
      specifications: product.specifications,
      fullDescription: product.fullDescription,
      deliveryInfo: product.deliveryInfo,
      reviews: product.reviews,
      questions: product.questions,
      frequentlyBoughtTogether: product.frequentlyBoughtTogether,
    }, quantity);
    addToast('Item Added to Cart', `${product.name} has been added to your order!`, 'success');
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      currentPrice: product.currentPrice,
      oldPrice: product.oldPrice,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      reviewCount: product.reviewCount,
      images: product.images,
      sku: product.sku,
      brand: product.brand,
      category: product.category,
      categoryHierarchy: product.categoryHierarchy,
      model: product.model,
      availability: product.availability,
      stockCount: product.stockCount,
      warranty: product.warranty,
      shortDescription: product.shortDescription,
      features: product.features,
      colors: product.colors,
      sizes: product.sizes,
      specifications: product.specifications,
      fullDescription: product.fullDescription,
      deliveryInfo: product.deliveryInfo,
      reviews: product.reviews,
      questions: product.questions,
      frequentlyBoughtTogether: product.frequentlyBoughtTogether,
    }, quantity);
    addToast('Cart Updated', `${quantity} x ${product.name} added to cart`, 'info');
  };

  const keyFeaturesList = [
    'Has four electric plates',
    'Built-in fan system',
    'Built-in grill roaster',
    'Has two Patra plate',
    'Has built in Vmer',
    'Has two 1,500w & two 2,000w plate power capacity',
    'Has 50cm by 60cm width and length space',
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans select-none">
      {/* Title & SKU matching screenshot */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {product.name}
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          SKU: {product.sku || 'FES-60X60-EL04'}
        </p>
      </div>

      {/* Product Full Description Paragraph */}
      <p className="text-xs text-slate-600 leading-relaxed">
        This multifunctional electric cooker is designed for efficient and versatile cooking. It comes with a built-in grill roaster, allowing you to grill and roast food easily at home. The cooker features two Patra hot plates, making it suitable for preparing multiple dishes at the same time. It is equipped with a built-in timer (VMER) for better control and safe cooking. The hot plates offer strong performance with two 1,500W and two 2,000W power capacities, ensuring fast heating and energy efficiency. With a 50 cm width and 60 cm length, this cooker provides ample cooking space while remaining compact enough for home or commercial kitchens. It is ideal for households, restaurants, cafés, and small food businesses.
      </p>

      {/* Red Price Text matching screenshot */}
      <div className="border-b border-slate-100 pb-4">
        <div className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
          ETB {product.currentPrice.toLocaleString()}.00
        </div>
      </div>

      {/* Stock Status Badge */}
      <div className="flex items-center gap-2">
        <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-md">
          In Stock
        </span>
        <span className="text-xs text-slate-400">({product.stockCount || 100} available)</span>
      </div>

      {/* Key Features Section matching 2-column screenshot layout */}
      <div className="space-y-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-100/80">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-slate-700 font-medium">
          {keyFeaturesList.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 group">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="leading-snug text-slate-800">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity Selector matching screenshot */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold text-slate-700">Quantity:</label>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center border border-slate-300 rounded-full overflow-hidden bg-white">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-xs font-bold text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stockCount || 100, q + 1))}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[11px] text-slate-400">Max: {product.stockCount || 100}</span>
        </div>
      </div>

      {/* Action Buttons matching screenshot: Yellow Buy Now pill + Circular Cart button */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 px-8 rounded-full text-sm transition-all shadow-md text-center"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition-all shadow-md shrink-0"
          title="Add to Cart"
        >
          <ShoppingCart className="w-5 h-5 text-slate-950" />
        </button>
      </div>

      {/* Guarantee Footer Info matching screenshot */}
      <div className="border-t border-slate-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100/80 transition-all hover:bg-blue-50 hover:shadow-sm group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900 leading-snug">FREE Delivery</div>
            <div className="text-[11px] font-semibold text-blue-700">within 2 days</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 transition-all hover:bg-emerald-50 hover:shadow-sm group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900 leading-snug">2-Year Warranty</div>
            <div className="text-[11px] font-semibold text-emerald-700">Full Product Coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
};
