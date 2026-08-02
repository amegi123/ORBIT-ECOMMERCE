'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Star, ShoppingCart, Eye, ChevronRight, SlidersHorizontal, X, ArrowLeftRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isOutOfStock?: boolean;
}

const allProductsData: ProductItem[] = [
  {
    id: 'normal-800-refrigerator',
    name: 'Normal 800 Refrigerator with Net 600L Capacity',
    category: 'Refrigerators',
    brand: 'Orbit',
    price: 63000,
    oldPrice: 65000,
    rating: 5,
    reviewCount: 1,
    image: '/img/550a_compressed.webp',
  },
  {
    id: 'refrigerator-740',
    name: 'Refrigerator 740',
    category: 'Refrigerators',
    brand: 'Orbit',
    price: 63000,
    oldPrice: 72000,
    rating: 5,
    reviewCount: 3,
    image: '/img/showcase660a.webp',
    isOutOfStock: true,
  },
  {
    id: 'normal-770-refrigerator',
    name: 'Normal 770 Refrigerator with Net 580L Capacity',
    category: 'Refrigerators',
    brand: 'Orbit',
    price: 53000,
    oldPrice: 58000,
    rating: 5,
    reviewCount: 2,
    image: '/img/sleek-stainless-steel-french-door-refrigerator.avif',
  },
  {
    id: 'normal-730-refrigerator',
    name: 'Normal 730 Refrigerator with Net 600L Capacity',
    category: 'Refrigerators',
    brand: 'Orbit',
    price: 63000,
    oldPrice: 68000,
    rating: 5,
    reviewCount: 4,
    image: '/img/deepfreez900b.webp',
  },
  {
    id: 'orbit-tv-65-smart-4k',
    name: 'Orbit 65" Smart 4K UHD TV',
    category: 'Televisions',
    brand: 'Orbit',
    price: 95000,
    oldPrice: 110000,
    rating: 5,
    reviewCount: 128,
    image: '/img/android20orbit65.webp',
  },
  {
    id: 'orbit-tv-55-smart-4k',
    name: 'Orbit 55" Smart 4K UHD TV',
    category: 'Televisions',
    brand: 'Orbit',
    price: 72000,
    oldPrice: 85000,
    rating: 5,
    reviewCount: 94,
    image: '/img/smart204320hd.webp',
  },
  {
    id: '10kg-manual-washer',
    name: '10kg Manual Washing Machine',
    category: 'Washing Machines',
    brand: 'Orbit',
    price: 28500,
    oldPrice: 32000,
    rating: 5,
    reviewCount: 22,
    image: '/img/product-washing3.webp',
  },
  {
    id: '8kg-auto-toploader',
    name: '8kg Automatic Top Loader Washing Machine',
    category: 'Washing Machines',
    brand: 'Orbit',
    price: 45000,
    oldPrice: 51000,
    rating: 5,
    reviewCount: 19,
    image: '/img/product-washing1.jpeg',
  },
  {
    id: 'gas-cooker-stove-4b',
    name: 'Orbit 4-Burner Gas Cooker Stove',
    category: 'Stoves',
    brand: 'Orbit',
    price: 34000,
    oldPrice: 39000,
    rating: 5,
    reviewCount: 14,
    image: '/img/stoves50X50.jpeg',
  },
  {
    id: 'builtin-gas-stove-pro',
    name: 'Orbit Built-In 4-Burner Glass Top Gas Stove',
    category: 'Stoves',
    brand: 'Orbit',
    price: 42000,
    oldPrice: 48000,
    rating: 5,
    reviewCount: 23,
    image: '/img/stoves-full-electric.webp',
  },
  {
    id: 'water-dispenser-hot-cold',
    name: 'Orbit Hot & Cold Water Dispenser with Fridge',
    category: 'Water Dispensers',
    brand: 'Orbit',
    price: 18500,
    oldPrice: 22000,
    rating: 5,
    reviewCount: 18,
    image: '/img/water1_compressed.webp',
  },
  {
    id: 'commercial-double-oven',
    name: 'Commercial Double Deck Baking Oven',
    category: 'Dishwashers',
    brand: 'Orbit',
    price: 185000,
    oldPrice: 210000,
    rating: 5,
    reviewCount: 12,
    image: '/img/product-washing4.jpeg',
  },
];

const categoryCounts = [
  { name: 'Dishwashers', count: 1 },
  { name: 'Water Dispensers', count: 2 },
  { name: 'Televisions', count: 10 },
  { name: 'Washing Machines', count: 8 },
  { name: 'Refrigerators', count: 29 },
  { name: 'Stoves', count: 5 },
];

const brandCounts = [
  { name: 'Orbit', count: 63 },
  { name: 'orbit', count: 1 },
];

export default function AllProductsPage() {
  const router = useRouter();
  const {
    addToCart,
    setQuickViewProduct,
    triggerPageLoading,
    compareList,
    toggleCompare,
    setIsCompareOpen,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(200000);

  const toggleCategory = (catName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]
    );
  };

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  // Convert ProductItem to Full Product Object for Cart & Compare
  const toFullProduct = (prod: ProductItem) => ({
    id: prod.id,
    name: prod.name,
    currentPrice: prod.price,
    oldPrice: prod.oldPrice || Math.round(prod.price * 1.15),
    discountPercentage: 15,
    rating: prod.rating,
    reviewCount: prod.reviewCount,
    images: [prod.image],
    sku: 'ORB-AP-SKU',
    brand: prod.brand,
    category: prod.category,
    categoryHierarchy: ['Home', prod.category, prod.name],
    model: 'MOD-ORBIT',
    availability: (prod.isOutOfStock ? 'Out of Stock' : 'In Stock') as 'Out of Stock' | 'In Stock',
    stockCount: prod.isOutOfStock ? 0 : 20,
    warranty: '2 Years Official Warranty',
    shortDescription: prod.name,
    features: ['Official Orbit Quality', 'Fast Addis Ababa Delivery'],
    colors: [{ name: 'Black', hex: '#000' }],
    sizes: ['Standard'],
    specifications: [
      { name: 'Brand', value: prod.brand },
      { name: 'Category', value: prod.category },
      { name: 'Warranty', value: '2 Years Warranty' },
    ],
    fullDescription: prod.name,
    deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
    reviews: [],
    questions: [],
    frequentlyBoughtTogether: [],
  });

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return allProductsData
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand =
          selectedBrands.length === 0 ||
          selectedBrands.map((b) => b.toLowerCase()).includes(product.brand.toLowerCase());
        const matchesPrice = product.price <= maxPriceFilter;

        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
      })
      .sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'rating') return b.rating - a.rating;
        return 0; // default
      });
  }, [searchQuery, selectedCategories, selectedBrands, maxPriceFilter, sortOption]);

  const handleProductClick = (prodId: string) => {
    triggerPageLoading();
    router.push(`/product/${prodId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, prod: ProductItem) => {
    e.stopPropagation();
    addToCart(toFullProduct(prod));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 select-none">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-[#02367B] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">All Products</span>
      </nav>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center justify-between bg-slate-50 p-3 rounded-xl mb-4 border border-slate-200">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          aria-expanded={mobileFilterOpen}
          aria-label="Filter Products"
          className="flex items-center gap-2 text-xs font-bold text-[#02367B]"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter Products ({filteredProducts.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar Filter Section (Sticky Fixed on Desktop) */}
        <aside
          className={`space-y-6 lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2 ${
            mobileFilterOpen
              ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
              : 'hidden'
          }`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4 lg:hidden">
              <h3 className="text-base font-bold text-slate-900">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close Filter Menu"
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* 1. Search Box */}
          <div className="space-y-3">
            <div className="border-l-4 border-amber-400 pl-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-wide">Search</h3>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-l-md focus:outline-none focus:border-amber-400"
              />
              <button
                aria-label="Submit Search"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 p-2.5 rounded-r-md shrink-0 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Categories Filter */}
          <div className="space-y-3 pt-2">
            <div className="border-l-4 border-amber-400 pl-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-wide">Categories</h3>
            </div>
            <div className="space-y-2 text-xs">
              {categoryCounts.map((cat) => (
                <label
                  key={cat.name}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer font-medium"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                    className="rounded text-[#02367B] border-slate-300 focus:ring-[#02367B]"
                  />
                  <span>
                    {cat.name} <span className="text-slate-400">({cat.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Brands Filter */}
          <div className="space-y-3 pt-2">
            <div className="border-l-4 border-amber-400 pl-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-wide">Brands</h3>
            </div>
            <div className="space-y-2 text-xs">
              {brandCounts.map((b) => (
                <label
                  key={b.name}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer font-medium"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b.name)}
                    onChange={() => toggleBrand(b.name)}
                    className="rounded text-[#02367B] border-slate-300 focus:ring-[#02367B]"
                  />
                  <span>
                    {b.name} <span className="text-slate-400">({b.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Price Filter */}
          <div className="space-y-3 pt-2">
            <div className="border-l-4 border-amber-400 pl-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-wide">Price</h3>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#02367B] cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Up to: {maxPriceFilter.toLocaleString()} ETB</span>
              </div>
            </div>
          </div>

          {mobileFilterOpen && (
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#02367B] text-white font-bold py-3 rounded-xl text-xs mt-4"
            >
              Apply Filters
            </button>
          )}
        </aside>

        {/* Right Main Product Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Toolbar Row */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">All Products</h1>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-slate-300 rounded-full px-4 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-amber-400 cursor-pointer shadow-xs"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Sub-section Header */}
          <div className="border-l-4 border-amber-400 pl-2 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Normal</h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredProducts.length} items
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-sm font-bold text-slate-600">No products found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setMaxPriceFilter(200000);
                }}
                className="mt-3 text-xs font-bold text-[#02367B] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((prod) => {
                const isInCompare = compareList.some((p) => p.id === prod.id);

                return (
                  <div
                    key={prod.id}
                    onClick={() => handleProductClick(prod.id)}
                    className="group bg-white rounded-2xl border border-slate-200/90 p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-[#02367B] transition-all duration-300 cursor-pointer relative"
                  >
                    <div>
                      {/* Top Action Row: Category & Compare Button */}
                      <div className="flex items-center justify-between mb-1.5 gap-1">
                        <span className="text-[10px] text-slate-400 font-medium truncate">
                          {prod.category}
                        </span>

                        {/* Product Compare Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompare(toFullProduct(prod));
                          }}
                          className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer shrink-0 ${
                            isInCompare
                              ? 'bg-[#02367B] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title={isInCompare ? 'Remove from Comparison' : 'Add to Comparison'}
                        >
                          <ArrowLeftRight className="w-3 h-3" />
                          <span>{isInCompare ? 'Comparing' : 'Compare'}</span>
                        </button>
                      </div>

                      {/* Product Image Showcase */}
                      <div className="relative w-full h-44 bg-white rounded-xl p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Quick View Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(toFullProduct(prod));
                          }}
                          className="hidden sm:flex absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:bg-[#02367B] hover:text-white items-center justify-center shadow transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#02367B] transition-colors mb-1.5">
                        {prod.name}
                      </h3>

                      {/* 5-Star Rating Line */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">({prod.reviewCount})</span>
                      </div>
                    </div>

                    {/* Price & Cart Button Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                      <div>
                        {prod.oldPrice && (
                          <div className="text-[10px] text-slate-400 line-through">
                            {prod.oldPrice.toLocaleString()} ETB
                          </div>
                        )}
                        <div className="text-xs sm:text-sm font-black text-red-600">
                          {prod.price.toLocaleString()} ETB
                        </div>
                        {prod.isOutOfStock && (
                          <span className="text-[9px] font-bold text-rose-500 block">Out of Stock</span>
                        )}
                      </div>

                      {/* Circular Yellow/Gold Cart Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, prod)}
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
          )}
        </div>
      </div>

      {/* Floating Compare Action Trigger Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#02367B] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 text-xs font-bold">
            <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            <span>{compareList.length} Product{compareList.length > 1 ? 's' : ''} Selected for Comparison</span>
          </div>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black transition-colors shadow-sm cursor-pointer"
          >
            Compare Now
          </button>
        </div>
      )}
    </div>
  );
}
