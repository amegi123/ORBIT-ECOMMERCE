'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { similarProducts } from '@/data/mockProduct';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';

export const SimilarProducts: React.FC = () => {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist, setQuickViewProduct, triggerPageLoading } = useCart();

  const handleProductClick = (e: React.MouseEvent, prodId: string) => {
    e.preventDefault();
    triggerPageLoading();
    router.push(`/product/${prodId}`);
  };

  return (
    <div className="w-full space-y-6 pt-6 select-none font-sans">
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
              onClick={(e) => handleProductClick(e, prod.id)}
              className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer relative"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden p-4 mb-2">
                  <span className="absolute top-2 left-2 z-10 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                    -{prod.discountPercentage}%
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                    className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white p-1.5 rounded-full text-slate-600 hover:text-rose-600 transition-colors shadow-xs"
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
                      });
                    }}
                    className="absolute top-10 right-2 z-10 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:bg-[#02367B] hover:text-white flex items-center justify-center shadow-xs transition-colors"
                    title="Quick View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative w-full h-full">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {prod.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {prod.name}
                  </h4>

                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-900 font-bold text-[10px] ml-0.5">{prod.rating}.0</span>
                    <span className="text-slate-400 text-[9px]">({prod.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Price & Single Add to Cart Button Row */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                <div>
                  <span className="text-xs line-through text-red-600 font-medium block">
                    {prod.oldPrice.toLocaleString()} ETB
                  </span>
                  <span className="text-sm sm:text-base font-medium text-slate-900">
                    {prod.currentPrice.toLocaleString()} ETB
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
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
                    });
                  }}
                  className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition-all shadow-md shrink-0 hover:scale-105 cursor-pointer"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
