'use client';

import React from 'react';
import Image from 'next/image';
import { similarProducts } from '@/data/mockProduct';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';

export const SimilarProducts: React.FC = () => {
  const { addToCart, toggleWishlist, wishlist, setQuickViewProduct } = useCart();

  return (
    <div className="w-full space-y-6 pt-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h3 className="text-xl font-black text-slate-900">Similar Products You Might Like</h3>
        <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">View All Electronics</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((prod) => {
          const isWishlisted = wishlist.includes(prod.id);
          return (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden p-4">
                <span className="absolute top-2 left-2 z-10 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  -{prod.discountPercentage}%
                </span>

                <button
                  onClick={() => toggleWishlist(prod.id)}
                  className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full text-slate-600 hover:text-rose-600 transition-colors shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                <div className="relative w-full h-full">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Quick View Button on Hover */}
                <button
                  onClick={() =>
                    setQuickViewProduct({
                      id: prod.id,
                      name: prod.name,
                      currentPrice: prod.currentPrice,
                      oldPrice: prod.oldPrice,
                      discountPercentage: prod.discountPercentage,
                      rating: prod.rating,
                      reviewCount: prod.reviewCount,
                      images: [prod.image],
                      sku: 'SKU-SIM',
                      brand: 'Orbit',
                      category: prod.category,
                      categoryHierarchy: ['Home', prod.category],
                      model: 'MOD-SIM',
                      availability: 'In Stock',
                      stockCount: 15,
                      warranty: '2 Years',
                      shortDescription: prod.name,
                      features: ['4K UHD', 'Smart Android TV', 'Dolby Audio'],
                      colors: [{ name: 'Black', hex: '#000' }],
                      sizes: ['55"'],
                      specifications: [],
                      fullDescription: '',
                      deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
                      reviews: [],
                      questions: [],
                      frequentlyBoughtTogether: [],
                    })
                  }
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" /> Quick View
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {prod.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {prod.name}
                </h4>

                <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-slate-900 font-bold">{prod.rating}</span>
                  <span className="text-slate-400">({prod.reviewCount})</span>
                </div>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-black text-slate-950">
                    {prod.currentPrice.toLocaleString()} <span className="text-xs font-bold text-blue-600">ETB</span>
                  </span>
                  <span className="text-xs line-through text-slate-400">
                    {prod.oldPrice.toLocaleString()} ETB
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: prod.id,
                    name: prod.name,
                    currentPrice: prod.currentPrice,
                    oldPrice: prod.oldPrice,
                    discountPercentage: prod.discountPercentage,
                    rating: prod.rating,
                    reviewCount: prod.reviewCount,
                    images: [prod.image],
                    sku: 'SKU-SIM',
                    brand: 'Orbit',
                    category: prod.category,
                    categoryHierarchy: ['Home', prod.category],
                    model: 'MOD-SIM',
                    availability: 'In Stock',
                    stockCount: 15,
                    warranty: '2 Years',
                    shortDescription: prod.name,
                    features: [],
                    colors: [{ name: 'Black', hex: '#000' }],
                    sizes: ['55"'],
                    specifications: [],
                    fullDescription: '',
                    deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
                    reviews: [],
                    questions: [],
                    frequentlyBoughtTogether: [],
                  })
                }
                className="w-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
