'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HomeProduct } from '@/data/homeData';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';

interface ProductGridSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  highlightText?: string;
  products: HomeProduct[];
  columns?: 4 | 5;
  centeredTitle?: boolean;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  id,
  title,
  subtitle,
  highlightText,
  products,
  columns = 4,
  centeredTitle = false,
}) => {
  const { addToCart, setQuickViewProduct } = useCart();

  const handleAddToCart = (e: React.MouseEvent, prod: HomeProduct) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: prod.id,
      name: prod.name,
      currentPrice: prod.price,
      oldPrice: prod.oldPrice || Math.round(prod.price * 1.15),
      discountPercentage: 15,
      rating: prod.rating,
      reviewCount: prod.reviewCount,
      images: [prod.image],
      sku: 'ORB-HM-SKU',
      brand: 'Orbit',
      category: prod.category,
      categoryHierarchy: ['Home', prod.category, prod.name],
      model: 'MOD-ORBIT',
      availability: 'In Stock',
      stockCount: 20,
      warranty: '2 Years Official Warranty',
      shortDescription: prod.name,
      features: ['Official Orbit Quality', 'Fast Addis Ababa Delivery'],
      colors: [{ name: 'Black', hex: '#000' }],
      sizes: ['Standard'],
      specifications: [],
      fullDescription: '',
      deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
      reviews: [],
      questions: [],
      frequentlyBoughtTogether: [],
    });
  };

  return (
    <section id={id} className="w-full space-y-4 sm:space-y-6 pt-4">
      {/* Header Layout */}
      {centeredTitle ? (
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-[#02367B] rounded-full shrink-0" />
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {highlightText ? (
                <>
                  <span className="relative inline-block border-b-4 border-amber-400 pb-0.5">
                    {highlightText}
                  </span>{' '}
                  {title.replace(highlightText, '').trim()}
                </>
              ) : (
                title
              )}
            </h2>
          </div>
          <Link href="#all-products" className="text-xs text-[#02367B] font-bold hover:underline">
            View All
          </Link>
        </div>
      )}

      {/* Grid Cards Container - 2 Products Per Row on Mobile (grid-cols-2) */}
      <div
        className={`grid grid-cols-2 ${
          columns === 5 ? 'md:grid-cols-3 lg:grid-cols-5' : 'md:grid-cols-3 lg:grid-cols-4'
        } gap-3 sm:gap-5`}
      >
        {products.map((prod) => (
          <Link
            key={prod.id}
            href={`/product/${prod.id}`}
            className="group relative bg-white rounded-2xl border border-slate-200 p-2.5 sm:p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#02367B] transition-all duration-300 select-none"
          >
            <div>
              {/* Product Image Box */}
              <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden p-2 sm:p-4 mb-2.5 border border-slate-100 flex items-center justify-center">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Quick View trigger button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickViewProduct({
                      id: prod.id,
                      name: prod.name,
                      currentPrice: prod.price,
                      oldPrice: prod.oldPrice || Math.round(prod.price * 1.15),
                      discountPercentage: 15,
                      rating: prod.rating,
                      reviewCount: prod.reviewCount,
                      images: [prod.image],
                      sku: 'ORB-HM-SKU',
                      brand: 'Orbit',
                      category: prod.category,
                      categoryHierarchy: ['Home', prod.category, prod.name],
                      model: 'MOD-ORBIT',
                      availability: 'In Stock',
                      stockCount: 20,
                      warranty: '2 Years Official Warranty',
                      shortDescription: prod.name,
                      features: ['Official Orbit Quality', 'Fast Addis Ababa Delivery'],
                      colors: [{ name: 'Black', hex: '#000' }],
                      sizes: ['Standard'],
                      specifications: [],
                      fullDescription: '',
                      deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
                      reviews: [],
                      questions: [],
                      frequentlyBoughtTogether: [],
                    });
                  }}
                  className="hidden sm:flex absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:bg-[#02367B] hover:text-white items-center justify-center shadow transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Category & Title */}
              <div className="space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#00A9E0]">
                  {prod.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#02367B] transition-colors">
                  {prod.name}
                </h3>
              </div>
            </div>

            {/* Rating & Price */}
            <div className="pt-2 sm:pt-3 space-y-2 border-t border-slate-100 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-bold text-slate-700">{prod.rating}</span>
                <span className="text-[9px] text-slate-400">({prod.reviewCount})</span>
              </div>

              <div className="flex items-center justify-between gap-1">
                <div>
                  <div className="text-xs sm:text-base font-black text-slate-900 leading-none">
                    {prod.price.toLocaleString()} ETB
                  </div>
                  {prod.oldPrice && (
                    <div className="text-[10px] text-slate-400 line-through">
                      {prod.oldPrice.toLocaleString()} ETB
                    </div>
                  )}
                </div>

                {/* Circular Gold Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, prod)}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition-all shadow-md shrink-0 hover:scale-105"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
