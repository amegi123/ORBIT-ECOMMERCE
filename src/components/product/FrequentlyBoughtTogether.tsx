'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BundleItem } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Plus, Check, ShoppingBag, Sparkles } from 'lucide-react';

interface FrequentlyBoughtTogetherProps {
  bundles: BundleItem[];
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({ bundles }) => {
  const { addToCart, addToast } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>(bundles.map((b) => b.id));

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalPrice = bundles
    .filter((b) => selectedItems.includes(b.id))
    .reduce((sum, item) => sum + item.price, 0);

  const totalOriginalPrice = bundles
    .filter((b) => selectedItems.includes(b.id))
    .reduce((sum, item) => sum + item.originalPrice, 0);

  const savings = totalOriginalPrice - totalPrice;

  const handleAddAllToCart = () => {
    const activeBundles = bundles.filter((b) => selectedItems.includes(b.id));
    activeBundles.forEach((b) => {
      // Create mock product for cart
      addToCart({
        id: b.id,
        name: b.name,
        currentPrice: b.price,
        oldPrice: b.originalPrice,
        images: [b.image],
        colors: [{ name: 'Default', hex: '#000' }],
        sizes: ['Standard'],
        sku: 'BUNDLE-ITEM',
        brand: 'Orbit',
        category: 'Accessories',
        categoryHierarchy: ['Home', 'Accessories'],
        model: 'ACC',
        availability: 'In Stock',
        stockCount: 10,
        warranty: '1 Year',
        rating: 5,
        reviewCount: 10,
        discountPercentage: 10,
        shortDescription: b.name,
        features: [],
        specifications: [],
        fullDescription: '',
        deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 1, supportedPayments: [] },
        reviews: [],
        questions: [],
        frequentlyBoughtTogether: [],
      });
    });
    addToast('Bundle Added!', `${activeBundles.length} bundle items added to your cart!`, 'success');
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> Frequently Bought Together
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Bundle your Orbit 65&quot; TV with soundbar and accessories to save more!</p>
        </div>
        {savings > 0 && (
          <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full">
            Bundle Savings: {savings.toLocaleString()} ETB
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Bundle Items Visual Carousel Grid */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-3">
          {bundles.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div
                onClick={() => toggleItem(item.id)}
                className={`relative group cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col items-center w-36 sm:w-40 bg-white ${
                  selectedItems.includes(item.id)
                    ? 'border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                {/* Selection Checkbox Badge */}
                <div
                  className={`absolute top-2 right-2 w-5 h-5 rounded-md flex items-center justify-center border ${
                    selectedItems.includes(item.id)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {selectedItems.includes(item.id) && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="relative w-24 h-24 mb-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h4 className="text-[11px] font-bold text-slate-800 text-center line-clamp-2 leading-tight">
                  {item.name}
                </h4>

                <div className="text-xs font-black text-slate-900 mt-1">
                  {item.price.toLocaleString()} ETB
                </div>
              </div>

              {idx < bundles.length - 1 && (
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bundle Total & Add All CTA */}
        <div className="w-full lg:w-72 bg-slate-900 text-white p-6 rounded-2xl space-y-4 shrink-0">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Bundle Price
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {totalPrice.toLocaleString()} <span className="text-sm text-amber-400">ETB</span>
            </div>
            {totalOriginalPrice > totalPrice && (
              <div className="text-xs line-through text-slate-400">
                {totalOriginalPrice.toLocaleString()} ETB
              </div>
            )}
          </div>

          <button
            onClick={handleAddAllToCart}
            disabled={selectedItems.length === 0}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4" /> Add All ({selectedItems.length}) To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
