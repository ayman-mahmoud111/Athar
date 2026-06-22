import { Product, Category, Color, Size, Review } from '@/types';

const colors: Color[] = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#001F3F' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Burgundy', hex: '#800020' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Cream', hex: '#FFFDD0' },
];

const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const generateReviews = (count: number): Review[] => {
  const reviewTemplates = [
    { comment: 'Amazing quality! Fits perfectly and looks exactly like the photos.', rating: 5, userName: 'Sarah M.' },
    { comment: 'Great product, fast shipping. Will order again!', rating: 5, userName: 'Ahmed K.' },
    { comment: 'Good quality for the price. Slightly runs small.', rating: 4, userName: 'Mohamed T.' },
    { comment: 'Love it! The material is so soft and comfortable.', rating: 5, userName: 'Layla A.' },
    { comment: 'Nice design but delivery took a bit longer than expected.', rating: 4, userName: 'Omar H.' },
    { comment: 'Perfect fit and excellent craftsmanship.', rating: 5, userName: 'Nadia R.' },
    { comment: 'Stylish and comfortable. Highly recommend!', rating: 5, userName: 'Youssef B.' },
    { comment: 'Good value for money. Happy with my purchase.', rating: 4, userName: 'Mona S.' },
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `review-${i}`,
    ...reviewTemplates[i % reviewTemplates.length],
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    verified: Math.random() > 0.3,
  }));
};

const categories: Category[] = ['men', 'women', 'hoodies', 't-shirts', 'jeans', 'jackets', 'shoes', 'accessories', 'dresses', 'sweaters', 'shorts', 'skirts'];

const generateProduct = (index: number): Product => {
  const baseProducts = [
    { name: 'Oversized Hoodie', nameAr: 'هودي واسع', category: 'hoodies' as Category, price: 899, stock: 50 },
    { name: 'Classic T-Shirt', nameAr: 'تيشيرت كلاسيك', category: 't-shirts' as Category, price: 349, stock: 100 },
    { name: 'Slim Fit Jeans', nameAr: 'جينز سليم فيت', category: 'jeans' as Category, price: 699, stock: 75 },
    { name: 'Leather Jacket', nameAr: 'جاكت جلد', category: 'jackets' as Category, price: 2499, stock: 25 },
    { name: 'Running Sneakers', nameAr: 'حذاء رياضي', category: 'shoes' as Category, price: 1299, stock: 60 },
    { name: 'Canvas Backpack', nameAr: 'حقيبة ظهر قماش', category: 'accessories' as Category, price: 599, stock: 40 },
    { name: 'Floral Dress', nameAr: 'فستان زهور', category: 'dresses' as Category, price: 899, stock: 35 },
    { name: 'Wool Sweater', nameAr: 'سويتر صوف', category: 'sweaters' as Category, price: 749, stock: 45 },
    { name: 'Cargo Shorts', nameAr: 'شورت كارجو', category: 'shorts' as Category, price: 449, stock: 80 },
    { name: 'Pleated Skirt', nameAr: 'تنورة مكشكشة', category: 'skirts' as Category, price: 549, stock: 55 },
    { name: 'Cotton Polo', nameAr: 'بولو قطن', category: 'men' as Category, price: 449, stock: 90 },
    { name: 'Silk Blouse', nameAr: 'بلوزة حرير', category: 'women' as Category, price: 699, stock: 40 },
    { name: 'Denim Jacket', nameAr: 'جاكت جينز', category: 'jackets' as Category, price: 1199, stock: 30 },
    { name: 'Graphic Tee', nameAr: 'تيشيرت طباعة', category: 't-shirts' as Category, price: 399, stock: 120 },
    { name: 'Puffer Jacket', nameAr: 'جاكت بفير', category: 'jackets' as Category, price: 1899, stock: 20 },
    { name: 'Casual Loafers', nameAr: 'حذاء كاجوال', category: 'shoes' as Category, price: 999, stock: 45 },
    { name: 'Minimalist Watch', nameAr: 'ساعة مينيمال', category: 'accessories' as Category, price: 1499, stock: 25 },
    { name: 'Evening Dress', nameAr: 'فستان سهرة', category: 'dresses' as Category, price: 1999, stock: 15 },
    { name: 'Cashmere Sweater', nameAr: 'سويتر كشمير', category: 'sweaters' as Category, price: 1299, stock: 30 },
    { name: 'Athletic Shorts', nameAr: 'شورت رياضي', category: 'shorts' as Category, price: 349, stock: 100 },
    { name: 'Maxi Skirt', nameAr: 'تنورة ماكسي', category: 'skirts' as Category, price: 649, stock: 40 },
    { name: 'Linen Shirt', nameAr: 'قميص كتان', category: 'men' as Category, price: 599, stock: 70 },
    { name: 'Cozy Cardigan', nameAr: 'كارديجان مريح', category: 'women' as Category, price: 799, stock: 50 },
    { name: 'Zip-Up Hoodie', nameAr: 'هودي بساب', category: 'hoodies' as Category, price: 949, stock: 55 },
    { name: 'V-Neck T-Shirt', nameAr: 'تيشيرت في', category: 't-shirts' as Category, price: 379, stock: 110 },
  ];

  const base = baseProducts[index % baseProducts.length];
  const hasSale = Math.random() > 0.7;
  const salePrice = hasSale ? Math.round(base.price * 0.8) : undefined;

  const categoryImages: Record<Category, number[]> = {
    hoodies: [120, 121, 122],
    't-shirts': [230, 231, 232],
    jeans: [340, 341, 342],
    jackets: [450, 451, 452],
    shoes: [560, 561, 562],
    accessories: [670, 671, 672],
    dresses: [780, 781, 782],
    sweaters: [890, 891, 892],
    shorts: [900, 901, 902],
    skirts: [910, 911, 912],
    men: [150, 151, 152],
    women: [250, 251, 252],
  };

  const imgNums = categoryImages[base.category] || [100, 101, 102];

  return {
    id: `product-${index + 1}`,
    slug: base.name.toLowerCase().replace(/\s+/g, '-') + '-' + (index + 1),
    name: base.name,
    nameAr: base.nameAr,
    description: `Premium quality ${base.name.toLowerCase()} crafted with attention to detail. Made from high-quality materials for ultimate comfort and durability. Perfect for any occasion, this piece combines style with functionality.`,
    descriptionAr: `${base.nameAr} عالي الجودة مصنوع بعناية فائقة. صُنع من مواد عالية الجودة للحصول على أقصى درجات الراحة والمتانة.`,
    price: base.price,
    salePrice,
    currency: 'EGP',
    images: [
      {
        id: `img-${index}-1`,
        src: `https://images.pexels.com/photos/${imgNums[0]}/pexels-photo-${imgNums[0]}.jpeg?auto=compress&cs=tinysrgb&w=600`,
        alt: base.name,
      },
      {
        id: `img-${index}-2`,
        src: `https://images.pexels.com/photos/${imgNums[1]}/pexels-photo-${imgNums[1]}.jpeg?auto=compress&cs=tinysrgb&w=600`,
        alt: `${base.name} - Back view`,
      },
      {
        id: `img-${index}-3`,
        src: `https://images.pexels.com/photos/${imgNums[2]}/pexels-photo-${imgNums[2]}.jpeg?auto=compress&cs=tinysrgb&w=600`,
        alt: `${base.name} - Detail`,
      },
      {
        id: `img-${index}-4`,
        src: `https://images.pexels.com/photos/${(imgNums[0] + 50)}/pexels-photo-${imgNums[0] + 50}.jpeg?auto=compress&cs=tinysrgb&w=600`,
        alt: `${base.name} - Lifestyle`,
      },
    ],
    videos: [
      {
        id: `video-${index}-1`,
        src: `https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4d2e8f7c4b1c4c1c1c1c1c1c1&profile_id=165&oauth2_token_id=57447761`,
        title: `${base.name} Showcase`,
      },
    ],
    sizes: sizes.slice(0, Math.floor(Math.random() * 4) + 3),
    colors: colors.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 4) + 2),
    materials: ['Cotton', 'Polyester', 'Elastane'].slice(0, Math.floor(Math.random() * 2) + 1),
    category: base.category,
    featured: Math.random() > 0.8,
    newArrival: Math.random() > 0.85,
    bestSeller: Math.random() > 0.85,
    trending: Math.random() > 0.85,
    rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 50) + 5,
    reviews: generateReviews(Math.floor(Math.random() * 5) + 3),
    viewCount: Math.floor(Math.random() * 5000) + 100,
    stock: base.stock,
    sku: `SKU-${index.toString().padStart(4, '0')}`,
    shippingInfo: 'Free shipping on orders over 500 EGP. Delivery takes 2-5 business days within Egypt.',
    returnPolicy: '30-day return policy. Items must be unworn with original tags.',
    tags: [base.category, 'fashion', 'style', 'premium'],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };
};

export const products: Product[] = Array.from({ length: 52 }, (_, i) => generateProduct(i));

export const featuredProducts = products.filter(p => p.featured);
export const newArrivals = products.filter(p => p.newArrival);
export const bestSellers = products.filter(p => p.bestSeller);
export const trendingProducts = products.filter(p => p.trending);

export const categoriesData: { id: Category; name: string; nameAr: string; image: string; count: number }[] = [
  { id: 'men', name: 'Men', nameAr: 'رجالي', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'men').length },
  { id: 'women', name: 'Women', nameAr: 'نسائي', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'women').length },
  { id: 'hoodies', name: 'Hoodies', nameAr: 'هوديز', image: 'https://images.pexels.com/photos/6311389/pexels-photo-6311389.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'hoodies').length },
  { id: 't-shirts', name: 'T-Shirts', nameAr: 'تيشيرتات', image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 't-shirts').length },
  { id: 'jeans', name: 'Jeans', nameAr: 'جينز', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'jeans').length },
  { id: 'jackets', name: 'Jackets', nameAr: 'جاكيتات', image: 'https://images.pexels.com/photos/1559692/pexels-photo-1559692.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'jackets').length },
  { id: 'shoes', name: 'Shoes', nameAr: 'أحذية', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'shoes').length },
  { id: 'accessories', name: 'Accessories', nameAr: 'إكسسوارات', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'accessories').length },
  { id: 'dresses', name: 'Dresses', nameAr: 'فساتين', image: 'https://images.pexels.com/photos/9856404/pexels-photo-9856404.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'dresses').length },
  { id: 'sweaters', name: 'Sweaters', nameAr: 'سويترات', image: 'https://images.pexels.com/photos/4580549/pexels-photo-4580549.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'sweaters').length },
  { id: 'shorts', name: 'Shorts', nameAr: 'شورتات', image: 'https://images.pexels.com/photos/1342239/pexels-photo-1342239.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'shorts').length },
  { id: 'skirts', name: 'Skirts', nameAr: 'تنيرات', image: 'https://images.pexels.com/photos/1040921/pexels-photo-1040921.jpeg?auto=compress&cs=tinysrgb&w=400', count: products.filter(p => p.category === 'skirts').length },
];

export const coupons = [
  { code: 'WELCOME10', discount: 10, type: 'percentage' as const },
  { code: 'SUMMER20', discount: 20, type: 'percentage' as const },
  { code: 'FASHION15', discount: 15, type: 'percentage' as const },
  { code: 'FLAT100', discount: 100, type: 'fixed' as const },
];
