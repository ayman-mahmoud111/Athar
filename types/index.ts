export type Locale = 'en' | 'ar';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Color = {
  name: string;
  hex: string;
};

export type ProductImage = {
  id: string;
  src: string;
  alt: string;
};

export type ProductVideo = {
  id: string;
  src: string;
  title: string;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
};

export type Category =
  | 'men'
  | 'women'
  | 'hoodies'
  | 't-shirts'
  | 'jeans'
  | 'jackets'
  | 'shoes'
  | 'accessories'
  | 'dresses'
  | 'sweaters'
  | 'shorts'
  | 'skirts';

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  salePrice?: number;
  currency: string;
  images: ProductImage[];
  videos: ProductVideo[];
  sizes: Size[];
  colors: Color[];
  materials: string[];
  category: Category;
  subcategory?: string;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  trending: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  viewCount: number;
  stock: number;
  sku: string;
  shippingInfo: string;
  returnPolicy: string;
  tags: string[];
  createdAt: string;
};

export type Coupon = {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt: string;
};

export type WishlistItem = {
  productId: string;
  addedAt: string;
};

export type RecentlyViewedItem = {
  productId: string;
  viewedAt: string;
};

export type FilterState = {
  categories: Category[];
  sizes: Size[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  search: string;
};

export type AnalyticsData = {
  totalViews: number;
  totalProducts: number;
  totalCategories: number;
  avgRating: number;
  topProducts: { name: string; views: number }[];
  topCategories: { name: string; count: number }[];
  topRated: { name: string; rating: number }[];
  viewsByMonth: { month: string; views: number }[];
};
