'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HomeProduct, newArrivals, bestSellers } from '@/data/homeData';
import { useCart } from '@/context/CartContext';
import { Eye } from 'lucide-react';

// Deal of the day product
const dealOfTheDayProduct: HomeProduct = {
  id: 'side-by-side-fridge-deal',
  name: 'Orbit Side-by-Side Premium Refrigerator (520L)',
  category: 'Refrigerators',
  price: 115000,
  oldPrice: 165000,
  rating: 5,
  reviewCount: 48,
  image: '/img/550a_compressed.webp',
};

// Combine 8 items for the 4x2 grid of Latest Products
const latestProductsList: HomeProduct[] = [
  ...newArrivals,
  ...bestSellers.slice(1, 5),
].slice(0, 8);

export const DealAndLatestProducts: React.FC = () => {
  const router = useRouter();
  const { addToCart, setQuickViewProduct, triggerPageLoading } = useCart();

  const handleProductClick = (e: React.MouseEvent, prodId: string) => {
    e.preventDefault();
    triggerPageLoading();
    router.push(`/product/${prodId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, prod: HomeProduct) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: prod.id,
      name: prod.name,
      currentPrice: prod.price,
      oldPrice: prod.oldPrice || Math.round(prod.price * 1.15),
      discountPercentage: 30,
      rating: prod.rating,
      reviewCount: prod.reviewCount,
      images: [prod.image],
      sku: 'ORB-DEAL-SKU',
      brand: 'Orbit',
      category: prod.category,
      categoryHierarchy: ['Home', prod.category, prod.name],
      model: 'MOD-ORBIT',
      availability: 'In Stock',
      stockCount: 15,
      warranty: '2 Years Official Warranty',
      shortDescription: prod.name,
      features: ['Official Orbit Quality', 'Fast Addis Ababa Delivery'],
      colors: [{ name: 'Silver', hex: '#C0C0C0' }],
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
    <section className="w-full my-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Deal of the Day Sidebar Card (Stretched to match 100% full height of 2 rows) */}
        <div className="lg:col-span-3 w-full flex flex-col h-full">
          <div className="bg-slate-50/70 border-2 border-[#1772E8] rounded-2xl p-4 sm:p-5 flex flex-col justify-between items-center text-center shadow-sm h-full group flex-1">
            {/* Header Title */}
            <div className="w-full text-center border-b border-slate-200 pb-3 mb-3">
              <h3 className="text-sm sm:text-base font-black text-[#1772E8] uppercase tracking-wider">
                DEAL OF THE DAY
              </h3>
            </div>

            {/* Deal Card Inner Box (flex-1 to fill all remaining vertical space) */}
            <div
              onClick={(e) => handleProductClick(e, dealOfTheDayProduct.id)}
              className="w-full bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between items-center flex-1 cursor-pointer hover:shadow-md transition-shadow relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-[#1772E8] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-xs z-10">
                -30%
              </div>

              {/* Product Image Container */}
              <div className="relative w-full aspect-square max-w-[220px] sm:max-w-[240px] bg-slate-50 rounded-xl p-4 flex items-center justify-center overflow-hidden my-auto flex-1 min-h-[180px] sm:min-h-[220px]">
                <Image
                  src={dealOfTheDayProduct.image}
                  alt={dealOfTheDayProduct.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Pricing Block */}
              <div className="w-full space-y-2 mt-3 mb-4">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 text-center group-hover:text-[#1772E8] transition-colors leading-snug">
                  {dealOfTheDayProduct.name}
                </h4>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs sm:text-sm text-red-600 line-through font-medium">
                    {dealOfTheDayProduct.oldPrice?.toLocaleString()} ETB
                  </span>
                  <span className="text-sm sm:text-base font-medium text-slate-900">
                    {dealOfTheDayProduct.price.toLocaleString()} ETB
                  </span>
                </div>
              </div>

              {/* Grab This Deal CTA Button */}
              <button
                onClick={(e) => handleAddToCart(e, dealOfTheDayProduct)}
                className="w-full py-3 px-4 bg-[#1772E8] hover:bg-[#125ec2] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer uppercase tracking-wider mt-auto"
              >
                Grab This Deal
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Latest Products Grid (4 cols x 2 rows) */}
        <div className="lg:col-span-9 w-full flex flex-col justify-between space-y-4">
          {/* Top Bar Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Latest products
            </h2>
            <Link
              href="/all-products"
              className="text-xs sm:text-sm font-bold text-[#1772E8] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <span>&gt;</span>
            </Link>
          </div>

          {/* 4-Column Grid for Latest Products */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 flex-1">
            {latestProductsList.map((prod) => (
              <div
                key={prod.id}
                onClick={(e) => handleProductClick(e, prod.id)}
                className="group bg-white rounded-xl border border-slate-200 p-3 sm:p-4 flex flex-col justify-between items-center text-center hover:shadow-lg hover:border-[#1772E8] transition-all cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-slate-50 rounded-lg p-2 mb-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Quick view button overlay */}
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
                        sku: 'ORB-LAT-SKU',
                        brand: 'Orbit',
                        category: prod.category,
                        categoryHierarchy: ['Home', prod.category, prod.name],
                        model: 'MOD-ORBIT',
                        availability: 'In Stock',
                        stockCount: 20,
                        warranty: '2 Years Official Warranty',
                        shortDescription: prod.name,
                        features: ['Official Orbit Quality', 'Fast Delivery'],
                        colors: [{ name: 'Standard', hex: '#000' }],
                        sizes: ['Standard'],
                        specifications: [],
                        fullDescription: '',
                        deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
                        reviews: [],
                        questions: [],
                        frequentlyBoughtTogether: [],
                      });
                    }}
                    className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:bg-[#1772E8] hover:text-white flex items-center justify-center shadow transition-all duration-200"
                    title="Quick View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Product Name */}
                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight mb-2 group-hover:text-[#1772E8] transition-colors">
                  {prod.name}
                </h3>

                {/* Product Price */}
                <div className="text-sm sm:text-base font-medium text-slate-900">
                  {prod.price.toLocaleString()} ETB
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
