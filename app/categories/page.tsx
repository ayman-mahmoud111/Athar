'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductsContext';

const categoriesData = [
  { id: 'men', name: 'Men', nameAr: 'رجالي', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'women', name: 'Women', nameAr: 'نسائي', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'hoodies', name: 'Hoodies', nameAr: 'هوديز', image: 'https://images.pexels.com/photos/6311389/pexels-photo-6311389.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 't-shirts', name: 'T-Shirts', nameAr: 'تيشيرتات', image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'jeans', name: 'Jeans', nameAr: 'جينز', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'jackets', name: 'Jackets', nameAr: 'جاكيتات', image: 'https://images.pexels.com/photos/1559692/pexels-photo-1559692.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'shoes', name: 'Shoes', nameAr: 'أحذية', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'accessories', name: 'Accessories', nameAr: 'إكسسوارات', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'dresses', name: 'Dresses', nameAr: 'فساتين', image: 'https://images.pexels.com/photos/9856404/pexels-photo-9856404.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'sweaters', name: 'Sweaters', nameAr: 'سويترات', image: 'https://images.pexels.com/photos/4580549/pexels-photo-4580549.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'shorts', name: 'Shorts', nameAr: 'شورتات', image: 'https://images.pexels.com/photos/1342239/pexels-photo-1342239.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'skirts', name: 'Skirts', nameAr: 'تنيرات', image: 'https://images.pexels.com/photos/1040921/pexels-photo-1040921.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export default function CategoriesPage() {
  const { t, dir, locale } = useLanguage();
  const { products } = useProducts();

  return (
    <div dir={dir} className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {t.nav.categories}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Explore our carefully curated collections designed for every style and occasion
          </motion.p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/shop?category=${category.id}`}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={category.image}
                    alt={locale === 'ar' ? category.nameAr : category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold capitalize mb-1">
                      {locale === 'ar' ? category.nameAr : category.name}
                    </h3>
                    <p className="text-white/80">
                      {products.filter(p => p.category === category.id).length} products
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                      <span className="border-b border-white/50 pb-1">Shop Now</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Category */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <span className="text-sm font-medium text-gray-400 tracking-wider uppercase">
                Featured Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4">Essential Hoodies</h2>
              <p className="text-gray-300 mt-4 text-lg">
                Premium quality hoodies crafted for ultimate comfort and style.
                Perfect for any season, designed for your everyday lifestyle.
              </p>
              <Link href="/shop?category=hoodies">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Explore Collection
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <Image
                src="https://images.pexels.com/photos/6311389/pexels-photo-6311389.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Hoodie Collection"
                fill
                className="object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
