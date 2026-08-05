import { Product } from '@/types/product';

export const orbitProduct: Product = {
  id: 'orbit-tv-65-smart-4k',
  name: 'Orbit 65" Smart 4K UHD Android TV',
  sku: 'ORB-TV65-4K-2026',
  brand: 'Orbit',
  category: 'Televisions',
  categoryHierarchy: ['Home', 'Televisions', 'Smart TVs', 'Orbit 65" Smart 4K UHD TV'],
  model: 'ORB-65UHD-PRO',
  availability: 'In Stock',
  stockCount: 42,
  warranty: '2 Years Official Warranty',
  rating: 4.8,
  reviewCount: 128,
  currentPrice: 95000,
  oldPrice: 110000,
  discountPercentage: 15,
  shortDescription:
    'Experience cinema-grade entertainment with the Orbit 65" Smart 4K UHD TV. Powered by Android TV with HDR10+ visual richness, Google Assistant voice control, and immersive Dolby Audio built for ultimate home theater performance.',
  features: [
    'Android TV OS',
    'Google Assistant Built-in',
    'Dolby Audio Immersive Surround',
    '4K UHD Resolution (3840x2160)',
    'HDR10+ Dynamic Color Spectrum',
    'Dual-Band WiFi (2.4GHz / 5GHz)',
    'Bluetooth 5.2 Connectivity',
    'HDMI 2.1 x3 Ports',
    'USB 3.0 x2 Ports',
    'Frameless Edge-to-Edge Design',
  ],
  colors: [
    { name: 'Black', hex: '#111827' },
    { name: 'Silver', hex: '#9CA3AF' },
    { name: 'White', hex: '#F9FAFB' },
  ],
  sizes: ['43"', '50"', '55"', '65"', '75"'],
  images: [
    '/img/android20orbit65.webp',
    '/img/android20orbit75.webp',
    '/img/smart204320hd.webp',
    '/img/led203220tv.webp',
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  has360View: true,
  specifications: [
    { name: 'Screen Size', value: '65 Inches (165 cm)' },
    { name: 'Resolution', value: '4K Ultra HD (3840 x 2160 pixels)' },
    { name: 'Operating System', value: 'Android TV 11' },
    { name: 'Processor', value: 'Quad-Core 64-bit High Speed' },
    { name: 'RAM Memory', value: '2 GB DDR4' },
    { name: 'Internal Storage', value: '16 GB eMMC' },
    { name: 'HDR Support', value: 'HDR10+ & HLG' },
    { name: 'Audio Output', value: '24W Dolby Digital Plus + DTS' },
    { name: 'Connectivity', value: 'WiFi 5 (Dual-band), Bluetooth 5.2' },
    { name: 'HDMI Ports', value: '3 x HDMI 2.1 (eARC / ARC support)' },
    { name: 'USB Ports', value: '2 x USB 3.0 High Speed' },
    { name: 'Power Consumption', value: '180 Watts Max (Energy Saver A+)' },
    { name: 'Warranty', value: '2 Years Official Orbit Ethiopia Warranty' },
    { name: 'Brand', value: 'Orbit Electronics' },
    { name: 'Assembly Country', value: 'China (Quality Certified)' },
  ],
  fullDescription: `
    <h3>Unrivaled 4K Clarity & Brilliant Color Realism</h3>
    <p>Step into breathtaking picture clarity with the all-new <strong>Orbit 65" Smart 4K UHD TV</strong>. Boasting over 8.3 million individual pixels, HDR10+ enhancement, and deep contrast control, every frame comes alive with unmatched detail and vibrant colors engineered specifically for movie enthusiasts and sports lovers across Ethiopia.</p>
    
    <div style="margin: 20px 0;">
      <h4>Key Highlights:</h4>
      <ul>
        <li><strong>Smart Android TV Platform:</strong> Access 500,000+ movies and show episodes via YouTube, Netflix, Prime Video, and thousands of apps from the Google Play Store.</li>
        <li><strong>Voice Remote with Google Assistant:</strong> Control your TV, search for favorite Amharic/English content, check the weather, or adjust volume simply by asking.</li>
        <li><strong>Dolby Surround Sound:</strong> Dual integrated stereo speakers delivering 24W of crystal clear dialogue and rich bass without needing extra speakers.</li>
        <li><strong>Ultra-Thin Metal Bezel:</strong> Modern frameless design that blends seamlessly into any Ethiopian home decor.</li>
      </ul>
    </div>
  `,
  deliveryInfo: {
    freeDelivery: true,
    location: 'Within Addis Ababa (Express Same Day Available)',
    estimatedDays: '1 - 2 Business Days',
    warrantyYears: 2,
    supportedPayments: ['Telebirr', 'Chapa', 'Cash on Delivery', 'Bank Transfer (CBE / Dashen / Awash)'],
  },
  reviews: [
    {
      id: 'rev-1',
      author: 'Abebe Bikila',
      rating: 5,
      date: '2026-07-28',
      comment: 'Excellent picture quality! Delivery to Bole in Addis Ababa took only 4 hours after order. Telebirr payment went smooth. Very impressed with Orbit Electronics!',
      verified: true,
      likes: 14,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      images: ['/img/android20orbit65.webp'],
      replies: [
        {
          author: 'Orbit Customer Support',
          date: '2026-07-28',
          comment: 'Thank you Abebe! We are glad you enjoyed our express delivery and 4K TV performance.',
          isAdmin: true,
        },
      ],
    },
    {
      id: 'rev-2',
      author: 'Tigist Alemu',
      rating: 5,
      date: '2026-07-20',
      comment: 'The Android TV features are super fast and YouTube 4K looks amazing. 2 years warranty gives full peace of mind.',
      verified: true,
      likes: 9,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    },
    {
      id: 'rev-3',
      author: 'Dawit Yohannes',
      rating: 4,
      date: '2026-07-14',
      comment: 'Great value for 95,000 ETB. Audio is clear, screen colors are vibrant. Soundbar makes it even better.',
      verified: true,
      likes: 5,
    },
  ],
  questions: [
    {
      id: 'q-1',
      author: 'Solomon T.',
      date: '2026-07-25',
      question: 'Is wall mounting service included for Addis Ababa deliveries?',
      answer: 'Yes! Free standard wall installation service is included upon request for all deliveries within Addis Ababa.',
      answerDate: '2026-07-25',
    },
    {
      id: 'q-2',
      author: 'Meron K.',
      date: '2026-07-18',
      question: 'Can I pay in monthly installments using Awash Bank or CBE?',
      answer: 'Yes, we support EMI installment payments up to 12 months with partner Ethiopian commercial banks.',
      answerDate: '2026-07-19',
    },
  ],
  frequentlyBoughtTogether: [
    {
      id: 'b-1',
      name: 'Orbit 65" Smart 4K UHD TV',
      price: 95000,
      originalPrice: 110000,
      image: '/img/android20orbit65.webp',
      selected: true,
    },
    {
      id: 'b-2',
      name: 'Orbit Heavy Duty Adjustable Wall Mount (32"-75")',
      price: 3500,
      originalPrice: 4500,
      image: '/img/led203220tv.webp',
      selected: true,
    },
    {
      id: 'b-3',
      name: 'Orbit 2.1 Ch Bluetooth Soundbar with Subwoofer (120W)',
      price: 18500,
      originalPrice: 22000,
      image: '/img/product-washing3.webp',
      selected: true,
    },
    {
      id: 'b-4',
      name: 'Ultra High Speed 4K 60Hz Braided HDMI Cable (3 Meters)',
      price: 1200,
      originalPrice: 1800,
      image: '/img/stoves-full-electric.webp',
      selected: false,
    },
  ],
};

export const similarProducts = [
  {
    id: 'orbit-tv-55-smart',
    name: 'Orbit 55" Smart 4K UHD Android TV',
    currentPrice: 72000,
    oldPrice: 85000,
    discountPercentage: 15,
    rating: 4.7,
    reviewCount: 94,
    image: '/img/smart204320hd.webp',
    category: 'Smart TVs',
    inStock: true,
  },
  {
    id: 'orbit-tv-75-qled',
    name: 'Orbit 75" QLED Master Cinema 4K TV',
    currentPrice: 165000,
    oldPrice: 190000,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 41,
    image: '/img/android20orbit75.webp',
    category: 'QLED TVs',
    inStock: true,
  },
  {
    id: 'orbit-wash-12kg',
    name: 'Orbit 12KG Front Load Smart Washing Machine',
    currentPrice: 68000,
    oldPrice: 78000,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 63,
    image: '/img/product-washing1.jpeg',
    category: 'Home Appliances',
    inStock: true,
  },
  {
    id: 'orbit-wash-twin-8kg',
    name: 'Orbit 8KG Twin Tub Semi-Automatic Washer',
    currentPrice: 32000,
    oldPrice: 38000,
    discountPercentage: 15,
    rating: 4.6,
    reviewCount: 52,
    image: '/img/product-washing2.jpeg',
    category: 'Home Appliances',
    inStock: true,
  },
];

export const catalogProductsMap: Record<string, {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
}> = {
  'orbit-tv-65-smart-4k': {
    id: 'orbit-tv-65-smart-4k',
    name: 'Orbit 65" Smart 4K UHD TV',
    category: 'Televisions',
    price: 95000,
    oldPrice: 110000,
    image: '/img/android20orbit65.webp',
    rating: 5,
    reviewCount: 128,
  },
  'orbit-tv-55-smart': {
    id: 'orbit-tv-55-smart',
    name: 'Orbit 55" Smart 4K UHD Android TV',
    category: 'Televisions',
    price: 72000,
    oldPrice: 85000,
    image: '/img/smart204320hd.webp',
    rating: 4.7,
    reviewCount: 94,
  },
  'orbit-tv-55-smart-4k': {
    id: 'orbit-tv-55-smart-4k',
    name: 'Orbit 55" Smart 4K UHD TV',
    category: 'Televisions',
    price: 72000,
    oldPrice: 85000,
    image: '/img/smart204320hd.webp',
    rating: 5,
    reviewCount: 94,
  },
  'orbit-tv-75-qled': {
    id: 'orbit-tv-75-qled',
    name: 'Orbit 75" QLED Master Cinema 4K TV',
    category: 'QLED TVs',
    price: 165000,
    oldPrice: 190000,
    image: '/img/android20orbit75.webp',
    rating: 4.9,
    reviewCount: 41,
  },
  'gas-cooker-stove-4b': {
    id: 'gas-cooker-stove-4b',
    name: 'Orbit 4-Burner Gas Cooker Stove',
    category: 'Stoves',
    price: 34000,
    oldPrice: 39000,
    image: '/img/stoves50X50.jpeg',
    rating: 5,
    reviewCount: 14,
  },
  '10kg-manual-washer': {
    id: '10kg-manual-washer',
    name: '10kg Manual Washing Machine',
    category: 'Washing Machines',
    price: 28500,
    oldPrice: 32000,
    image: '/img/product-washing3.webp',
    rating: 5,
    reviewCount: 22,
  },
  '8kg-auto-toploader': {
    id: '8kg-auto-toploader',
    name: '8kg Automatic Top Loader Washing Machine',
    category: 'Washing Machines',
    price: 45000,
    oldPrice: 51000,
    image: '/img/product-washing1.jpeg',
    rating: 5,
    reviewCount: 19,
  },
  'orbit-wash-12kg': {
    id: 'orbit-wash-12kg',
    name: 'Orbit 12KG Front Load Smart Washing Machine',
    category: 'Washing Machines',
    price: 68000,
    oldPrice: 78000,
    image: '/img/product-washing1.jpeg',
    rating: 4.8,
    reviewCount: 63,
  },
  'orbit-wash-twin-8kg': {
    id: 'orbit-wash-twin-8kg',
    name: 'Orbit 8KG Twin Tub Semi-Automatic Washer',
    category: 'Washing Machines',
    price: 32000,
    oldPrice: 38000,
    image: '/img/product-washing2.jpeg',
    rating: 4.6,
    reviewCount: 52,
  },
  'side-by-side-fridge': {
    id: 'side-by-side-fridge',
    name: 'Orbit Side-by-Side Premium Refrigerator (520L)',
    category: 'Refrigerators',
    price: 115000,
    oldPrice: 130000,
    image: '/img/550a_compressed.webp',
    rating: 5,
    reviewCount: 38,
  },
  'normal-800-refrigerator': {
    id: 'normal-800-refrigerator',
    name: 'Normal 800 Refrigerator with Net 600L Capacity',
    category: 'Refrigerators',
    price: 63000,
    oldPrice: 65000,
    image: '/img/550a_compressed.webp',
    rating: 5,
    reviewCount: 1,
  },
  'refrigerator-740': {
    id: 'refrigerator-740',
    name: 'Refrigerator 740',
    category: 'Refrigerators',
    price: 63000,
    oldPrice: 72000,
    image: '/img/showcase660a.webp',
    rating: 5,
    reviewCount: 3,
  },
  'normal-770-refrigerator': {
    id: 'normal-770-refrigerator',
    name: 'Normal 770 Refrigerator with Net 580L Capacity',
    category: 'Refrigerators',
    price: 53000,
    oldPrice: 58000,
    image: '/img/sleek-stainless-steel-french-door-refrigerator.avif',
    rating: 5,
    reviewCount: 2,
  },
  'normal-730-refrigerator': {
    id: 'normal-730-refrigerator',
    name: 'Normal 730 Refrigerator with Net 600L Capacity',
    category: 'Refrigerators',
    price: 63000,
    oldPrice: 68000,
    image: '/img/deepfreez900b.webp',
    rating: 5,
    reviewCount: 4,
  },
  'builtin-gas-stove-pro': {
    id: 'builtin-gas-stove-pro',
    name: 'Orbit Built-In 4-Burner Glass Top Gas Stove',
    category: 'Stoves',
    price: 42000,
    oldPrice: 48000,
    image: '/img/stoves-full-electric.webp',
    rating: 5,
    reviewCount: 23,
  },
  'water-dispenser-hot-cold': {
    id: 'water-dispenser-hot-cold',
    name: 'Orbit Hot & Cold Water Dispenser with Fridge',
    category: 'Water Dispensers',
    price: 18500,
    oldPrice: 22000,
    image: '/img/water1_compressed.webp',
    rating: 5,
    reviewCount: 18,
  },
  'commercial-double-oven': {
    id: 'commercial-double-oven',
    name: 'Commercial Double Deck Baking Oven',
    category: 'Kitchen Appliances',
    price: 185000,
    oldPrice: 210000,
    image: '/img/product-washing4.jpeg',
    rating: 5,
    reviewCount: 12,
  },
  'stn-gas-stove-heavy': {
    id: 'stn-gas-stove-heavy',
    name: 'Stainless Steel 4-Burner Gas Stove',
    category: 'Stoves',
    price: 36000,
    oldPrice: 42000,
    image: '/img/stoves50X50.jpeg',
    rating: 5,
    reviewCount: 27,
  },
  'electric-builtin-oven': {
    id: 'electric-builtin-oven',
    name: 'Orbit Built-In Convection Electric Oven',
    category: 'Kitchen Appliances',
    price: 58000,
    oldPrice: 65000,
    image: '/img/stoves-full-electric.webp',
    rating: 5,
    reviewCount: 16,
  },
  'double-door-fridge-350l': {
    id: 'double-door-fridge-350l',
    name: 'Double Door No-Frost Refrigerator (350L)',
    category: 'Refrigerators',
    price: 78000,
    oldPrice: 88000,
    image: '/img/550a_compressed.webp',
    rating: 5,
    reviewCount: 44,
  },
};

export function getProductById(id: string): Product {
  if (id === orbitProduct.id) {
    return orbitProduct;
  }

  const foundInCatalog = catalogProductsMap[id] || similarProducts.find((p) => p.id === id);

  if (foundInCatalog) {
    const mainImg = 'image' in foundInCatalog ? foundInCatalog.image : (foundInCatalog as any).image;
    const itemPrice = 'price' in foundInCatalog ? foundInCatalog.price : (foundInCatalog as any).currentPrice;
    const oldP = foundInCatalog.oldPrice || Math.round(itemPrice * 1.15);

    return {
      ...orbitProduct,
      id: foundInCatalog.id,
      name: foundInCatalog.name,
      currentPrice: itemPrice,
      oldPrice: oldP,
      rating: foundInCatalog.rating || 5,
      reviewCount: foundInCatalog.reviewCount || 25,
      images: [mainImg],
      category: foundInCatalog.category,
      categoryHierarchy: ['Home', foundInCatalog.category, foundInCatalog.name],
      shortDescription: `${foundInCatalog.name} - Genuine Orbit product with 2-Year Ethiopia Warranty.`,
    };
  }

  // Fallback for any unknown slug ID
  const cleanTitle = id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    ...orbitProduct,
    id,
    name: cleanTitle,
    categoryHierarchy: ['Home', orbitProduct.category, cleanTitle],
    shortDescription: `${cleanTitle} - Official Orbit Electronics with 2 Years Warranty.`,
  };
}
