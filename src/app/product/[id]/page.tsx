import { Breadcrumb } from '@/components/product/Breadcrumb';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { CustomerReviewsSection } from '@/components/product/CustomerReviewsSection';
import { ProductTabs } from '@/components/product/ProductTabs';
import { FrequentlyBoughtTogether } from '@/components/product/FrequentlyBoughtTogether';
import { SimilarProducts } from '@/components/product/SimilarProducts';
import { MobileStickyBar } from '@/components/product/MobileStickyBar';
import { orbitProduct } from '@/data/mockProduct';

export function generateStaticParams() {
  return [
    { id: 'orbit-tv-65-smart-4k' },
    { id: 'gas-cooker-stove-4b' },
    { id: '10kg-manual-washer' },
    { id: '8kg-auto-toploader' },
    { id: 'side-by-side-fridge' },
  ];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8 pb-16 font-sans">
      {/* 1. Breadcrumb Navigation */}
      <Breadcrumb hierarchy={orbitProduct.categoryHierarchy} />

      {/* 2. Main Product Section matching reference screenshot layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (Main Image, Yellow Highlight Thumbnails, Product Dimensions Box) */}
        <div className="lg:col-span-6">
          <ProductGallery
            images={orbitProduct.images}
            videoUrl={orbitProduct.videoUrl}
            has360View={orbitProduct.has360View}
          />
        </div>

        {/* Right Column (Title, SKU, Description, Red Price, Key Features, Quantity, Yellow Buy Now Pill, Cart Button, Warranties) */}
        <div className="lg:col-span-6">
          <ProductInfo product={orbitProduct} />
        </div>
      </div>

      {/* 3. Customer Reviews Section matching reference screenshot */}
      <CustomerReviewsSection
        rating={orbitProduct.rating}
        reviewCount={orbitProduct.reviewCount}
      />

      {/* 4. Frequently Bought Together Bundle */}
      <FrequentlyBoughtTogether bundles={orbitProduct.frequentlyBoughtTogether} />

      {/* 5. Sticky Product Tabs (Specs, Installation, FAQs) */}
      <ProductTabs product={orbitProduct} />

      {/* 6. Similar Products Recommendation Grid */}
      <SimilarProducts />

      {/* 7. Mobile Sticky CTA Bar */}
      <MobileStickyBar product={orbitProduct} />
    </div>
  );
}
