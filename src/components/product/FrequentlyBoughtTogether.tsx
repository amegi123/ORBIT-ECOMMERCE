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
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-sm select-none font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> Frequently Bought Together
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Bundle your Orbit appliances with soundbars and accessories to save more!</p>
        </div>
        {savings > 0 && (
          <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-sm">
            Bundle Savings: {savings.toLocaleString()} ETB
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Bundle Items Responsive Grid - 2 Products Per Row on Mobile (grid-cols-2) */}
        <div className="w-full lg:flex-1 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3">
          {bundles.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div
                onClick={() => toggleItem(item.id)}
                className={`relative group cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col items-center w-full sm:w-40 bg-white ${
                  selectedItems.includes(item.id)
                    ? 'border-[#02367B] shadow-md ring-2 ring-[#02367B]/20'
                    : 'border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                {/* Selection Checkbox Badge */}
                <div
                  className={`absolute top-2 right-2 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    selectedItems.includes(item.id)
                      ? 'bg-[#02367B] border-[#02367B] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {selectedItems.includes(item.id) && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                {/* Product Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 my-1">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>

                {/* Title & Price */}
                <div className="text-center space-y-1 w-full pt-1">
                  <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                    {item.name}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <span className="font-extrabold text-[#02367B]">
                      {item.price.toLocaleString()} ETB
                    </span>
                    <span className="text-[10px] text-slate-400 line-through">
                      {item.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Plus icon between items (hidden on small mobile grid to preserve clean 2-col) */}
              {idx < bundles.length - 1 && (
                <div className="hidden sm:flex items-center justify-center text-slate-400">
                  <Plus className="w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bundle Summary & Add All CTA Card */}
        <div className="w-full lg:w-72 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4 shrink-0">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Bundle Total ({selectedItems.length} items)
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {totalPrice.toLocaleString()} ETB
              </span>
              {savings > 0 && (
                <span className="text-xs text-slate-400 line-through font-semibold">
                  {totalOriginalPrice.toLocaleString()} ETB
                </span>
              )}
            </div>

            {savings > 0 && (
              <p className="text-xs font-bold text-emerald-600 mt-1">
                You Save: {savings.toLocaleString()} ETB!
              </p>
            )}
          </div>

          <button
            onClick={handleAddAllToCart}
            disabled={selectedItems.length === 0}
            className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
              selectedItems.length > 0
                ? 'bg-[#02367B] hover:bg-[#005BAA] text-white hover:scale-[1.02]'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Bundle to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
