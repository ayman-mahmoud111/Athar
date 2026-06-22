'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { products } from '@/data/products';

export function RecentlyViewed() {
  const { t, dir, locale } = useLanguage();
  const { items } = useRecentlyViewed();

  const viewedProducts = products.filter(p =>
    items.some(i => i.productId === p.id)
  );

  // Sort by most recently viewed
  const sortedProducts = items
    .map(item => viewedProducts.find(p => p.id === item.productId))
    .filter(Boolean)
    .slice(0, 4) as typeof viewedProducts;

  if (sortedProducts.length === 0) {
    return null;
  }

  return (
    <section dir={dir} className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">
            {t.recentlyViewed.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/product/${product.slug}`}>
                <div className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.images[0].src}
                    alt={locale === 'ar' ? product.nameAr : product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {locale === 'ar' ? product.nameAr : product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {(product.salePrice || product.price).toLocaleString()}{' '}
                    {product.currency}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
