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
    <section id={id} className="w-full space-y-6 pt-4">
      {/* Header Layout */}
      {centeredTitle ? (
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-amber-400 rounded-full shrink-0" />
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
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
          <Link href="#all-products" className="text-xs text-blue-600 font-bold hover:underline">
            View All
          </Link>
        </div>
      )}

      {/* Grid Cards Container */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        } gap-5`}
      >
        {products.map((prod) => (
          <Link
            key={prod.id}
            href={`/product/${prod.id}`}
            className="group relative bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between hover:shadow-xl hover:border-blue-400 transition-all duration-300"
          >
            <div>
              {/* Product Image Box */}
              <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden p-4 mb-3 border border-slate-100">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* Quick View trigger on hover */}
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
                      sku: 'SKU-HM',
                      brand: 'Orbit',
                      category: prod.category,
                      categoryHierarchy: ['Home', prod.category],
                      model: 'MOD-HM',
                      availability: 'In Stock',
                      stockCount: 15,
                      warranty: '2 Years',
                      shortDescription: prod.name,
                      features: ['4K UHD', 'Smart Android TV', 'Dolby Audio'],
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
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full text-slate-600 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {prod.category}
                </span>

                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {prod.name}
                </h3>

                {/* Stars */}
                <div className="flex items-center gap-1 pt-0.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">({prod.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Price & Floating Yellow Cart Button (Matching Screenshot) */}
            <div className="flex items-end justify-between pt-3 mt-2 border-t border-slate-100">
              <div>
                <div className="text-xs font-black text-slate-950">
                  {prod.price.toLocaleString()} <span className="text-[10px] text-blue-600 font-bold">ETB</span>
                </div>
                {prod.oldPrice && (
                  <div className="text-[10px] line-through text-slate-400 font-medium">
                    {prod.oldPrice.toLocaleString()} ETB
                  </div>
                )}
              </div>

              {/* Gold/Yellow Circular Cart Button */}
              <button
                onClick={(e) => handleAddToCart(e, prod)}
                className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center shadow-md transition-transform hover:scale-110 shrink-0"
                title="Add to Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
