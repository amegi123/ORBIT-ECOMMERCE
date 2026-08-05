import { HeroBanner } from '@/components/home/HeroBanner';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { DealAndLatestProducts } from '@/components/home/DealAndLatestProducts';
import { ProductGridSection } from '@/components/home/ProductGridSection';
import { AudioPromoBanner } from '@/components/home/AudioPromoBanner';
import {
  newArrivals,
  bestSellers,
  bundlesOfTheWeek,
  recommendedProducts,
  trendingProducts,
} from '@/data/homeData';

export default function HomePage() {
  return (
    <div className="w-full space-y-12 pb-16">
      {/* 1. Full-Width Corner-to-Corner Hero Banner Slider */}
      <HeroBanner />

      {/* 2. Main Container for Homepage Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Shop by Category Grid */}
        <ShopByCategory />

        {/* Deal of the Day & Latest Products Section (Matches reference image) */}
        <DealAndLatestProducts />

        {/* New Arrivals (Centered title + Subtitle) */}
        <ProductGridSection
          id="new-arrivals"
          title="New Arrivals"
          subtitle="Discover our latest arrivals"
          products={newArrivals}
          columns={4}
          centeredTitle
        />

        {/* Best Sellers This Week (5-column grid) */}
        <ProductGridSection
          id="best-sellers"
          title="Best Sellers This Week"
          highlightText="Best Sellers"
          products={bestSellers}
          columns={5}
        />

        {/* Audio Promo Banner directly next to Best Sellers */}
        <AudioPromoBanner />

        {/* Bundle of the Week (5-column grid) */}
        <ProductGridSection
          id="bundle-of-the-week"
          title="Bundle of the Week"
          highlightText="Bundle"
          products={bundlesOfTheWeek}
          columns={5}
        />

        {/* Recommended Orbit Products */}
        <ProductGridSection
          id="recommended"
          title="Recommended Orbit products"
          highlightText="Recommended"
          products={recommendedProducts}
          columns={4}
        />

        {/* Trending Now */}
        <ProductGridSection
          id="trending-now"
          title="Trending Now"
          highlightText="Trending"
          products={trendingProducts}
          columns={4}
        />
      </div>
    </div>
  );
}
