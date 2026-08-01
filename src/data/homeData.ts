export interface HomeProduct {
  id: string;
  name: string;
  category: string;
  price: number; // in ETB
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isFeatured?: boolean;
}

export interface HomeCategory {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export const homeCategories: HomeCategory[] = [
  {
    id: 'category-tvs',
    name: 'Televisions',
    image: '/img/hero1.jpeg',
    itemCount: 24,
  },
  {
    id: 'category-fridges',
    name: 'Refrigerators',
    image: '/img/hero2.png',
    itemCount: 18,
  },
  {
    id: 'category-washers',
    name: 'Washing Machines',
    image: '/img/product-washing1.jpeg',
    itemCount: 32,
  },
  {
    id: 'category-stoves',
    name: 'Stoves',
    image: '/img/product-washing2.jpeg',
    itemCount: 15,
  },
  {
    id: 'category-dispensers',
    name: 'Water Dispensers',
    image: '/img/hero3.webp',
    itemCount: 12,
  },
  {
    id: 'category-kitchen',
    name: 'Kitchenware',
    image: '/img/product-washing4.jpeg',
    itemCount: 28,
  },
];

export const newArrivals: HomeProduct[] = [
  {
    id: 'gas-cooker-stove-4b',
    name: 'Orbit 4-Burner Gas Cooker Stove',
    category: 'Stoves',
    price: 34000,
    oldPrice: 39000,
    rating: 5,
    reviewCount: 14,
    image: '/img/product-washing2.jpeg',
  },
  {
    id: '10kg-manual-washer',
    name: '10kg Manual Washing Machine',
    category: 'Washing Machines',
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
    price: 45000,
    oldPrice: 51000,
    rating: 5,
    reviewCount: 19,
    image: '/img/product-washing1.jpeg',
  },
  {
    id: 'orbit-tv-65-smart-4k',
    name: 'Orbit 65" Smart 4K UHD TV',
    category: 'Televisions',
    price: 95000,
    oldPrice: 110000,
    rating: 5,
    reviewCount: 128,
    image: '/img/hero1.jpeg',
  },
];

export const bestSellers: HomeProduct[] = [
  {
    id: 'side-by-side-fridge',
    name: 'Orbit Side-by-Side Premium Refrigerator (520L)',
    category: 'Refrigerators',
    price: 115000,
    oldPrice: 130000,
    rating: 5,
    reviewCount: 38,
    image: '/img/hero2.png',
  },
  {
    id: 'commercial-double-oven',
    name: 'Commercial Double Deck Baking Oven',
    category: 'Kitchen Appliances',
    price: 185000,
    oldPrice: 210000,
    rating: 5,
    reviewCount: 12,
    image: '/img/product-washing4.jpeg',
  },
  {
    id: 'stn-gas-stove-heavy',
    name: 'Stainless Steel 4-Burner Gas Stove',
    category: 'Stoves',
    price: 36000,
    oldPrice: 42000,
    rating: 5,
    reviewCount: 27,
    image: '/img/product-washing2.jpeg',
  },
  {
    id: 'electric-builtin-oven',
    name: 'Orbit Built-In Convection Electric Oven',
    category: 'Kitchen Appliances',
    price: 58000,
    oldPrice: 65000,
    rating: 5,
    reviewCount: 16,
    image: '/img/product-washing4.jpeg',
  },
  {
    id: 'double-door-fridge-350l',
    name: 'Double Door No-Frost Refrigerator (350L)',
    category: 'Refrigerators',
    price: 78000,
    oldPrice: 88000,
    rating: 5,
    reviewCount: 44,
    image: '/img/hero2.png',
  },
];

export const bundlesOfTheWeek: HomeProduct[] = [
  {
    id: 'bundle-stove-dispenser',
    name: 'Gas Stove + Hot & Cold Water Dispenser Bundle',
    category: 'Bundles',
    price: 49000,
    oldPrice: 58000,
    rating: 5,
    reviewCount: 18,
    image: '/img/hero3.webp',
  },
  {
    id: 'bundle-washer-iron',
    name: '12kg Automatic Washer + Steam Iron Bundle',
    category: 'Bundles',
    price: 68000,
    oldPrice: 79000,
    rating: 5,
    reviewCount: 25,
    image: '/img/product-washing1.jpeg',
  },
  {
    id: 'bundle-oven-accessories',
    name: 'Electric Oven + Baking Tray Set Bundle',
    category: 'Bundles',
    price: 62000,
    oldPrice: 72000,
    rating: 5,
    reviewCount: 14,
    image: '/img/product-washing4.jpeg',
  },
  {
    id: 'bundle-fridge-microwave',
    name: 'Double Door Refrigerator + Microwave Bundle',
    category: 'Bundles',
    price: 89000,
    oldPrice: 104000,
    rating: 5,
    reviewCount: 31,
    image: '/img/hero2.png',
  },
  {
    id: 'bundle-tv-soundbar-mount',
    name: 'Orbit 65" 4K TV + Soundbar + Wall Mount Bundle',
    category: 'Bundles',
    price: 114000,
    oldPrice: 136500,
    rating: 5,
    reviewCount: 42,
    image: '/img/hero1.jpeg',
  },
];

export const recommendedProducts: HomeProduct[] = [
  {
    id: 'builtin-gas-stove-pro',
    name: 'Orbit Built-In 4-Burner Glass Top Gas Stove',
    category: 'Stoves',
    price: 42000,
    oldPrice: 48000,
    rating: 5,
    reviewCount: 23,
    image: '/img/product-washing2.jpeg',
  },
  {
    id: 'frontload-washer-dryer-12kg',
    name: '12kg Front Load Washer Dryer Combo',
    category: 'Washing Machines',
    price: 82000,
    oldPrice: 94000,
    rating: 5,
    reviewCount: 51,
    image: '/img/product-washing1.jpeg',
  },
  {
    id: 'orbit-tv-65-smart-4k',
    name: 'Orbit 65" Smart 4K UHD TV',
    category: 'Televisions',
    price: 95000,
    oldPrice: 110000,
    rating: 5,
    reviewCount: 128,
    image: '/img/hero1.jpeg',
  },
  {
    id: 'wireless-subwoofer-soundbar',
    name: 'Orbit 300W Wireless Subwoofer Soundbar System',
    category: 'Audio',
    price: 24500,
    oldPrice: 29000,
    rating: 5,
    reviewCount: 37,
    image: '/img/product-washing3.webp',
  },
];

export const trendingProducts: HomeProduct[] = [
  {
    id: '12kg-twin-tub-washer',
    name: '12kg Twin Tub Washing Machine',
    category: 'Washing Machines',
    price: 36000,
    oldPrice: 42000,
    rating: 5,
    reviewCount: 64,
    image: '/img/product-washing2.jpeg',
  },
  {
    id: '8kg-twin-tub-washer',
    name: '8kg Twin Tub Washing Machine',
    category: 'Washing Machines',
    price: 32000,
    oldPrice: 38000,
    rating: 5,
    reviewCount: 52,
    image: '/img/product-washing3.webp',
  },
  {
    id: 'orbit-tv-55-smart-4k',
    name: 'Orbit 55" Smart 4K UHD TV',
    category: 'Televisions',
    price: 72000,
    oldPrice: 85000,
    rating: 5,
    reviewCount: 94,
    image: '/img/hero2.png',
  },
  {
    id: 'orbit-tv-65-smart-4k',
    name: 'Orbit 65" Smart 4K UHD TV',
    category: 'Televisions',
    price: 95000,
    oldPrice: 110000,
    rating: 5,
    reviewCount: 128,
    image: '/img/hero1.jpeg',
  },
];
