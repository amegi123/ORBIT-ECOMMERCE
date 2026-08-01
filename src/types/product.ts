export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
  userLiked?: boolean;
  avatarUrl?: string;
  images?: string[];
  replies?: {
    author: string;
    date: string;
    comment: string;
    isAdmin?: boolean;
  }[];
}

export interface Question {
  id: string;
  author: string;
  date: string;
  question: string;
  answer?: string;
  answerDate?: string;
}

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  sizes: string[];
  inStock: boolean;
}

export interface BundleItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  selected: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  brand: string;
  category: string;
  categoryHierarchy: string[];
  model: string;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  stockCount: number;
  warranty: string;
  rating: number;
  reviewCount: number;
  currentPrice: number; // in ETB
  oldPrice: number; // in ETB
  discountPercentage: number;
  shortDescription: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  videoUrl?: string;
  has360View?: boolean;
  specifications: ProductSpecification[];
  fullDescription: string;
  deliveryInfo: {
    freeDelivery: boolean;
    location: string;
    estimatedDays: string;
    warrantyYears: number;
    supportedPayments: string[];
  };
  reviews: Review[];
  questions: Question[];
  frequentlyBoughtTogether: BundleItem[];
}
