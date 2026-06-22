'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useProducts } from '@/contexts/ProductsContext';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { t, dir, locale } = useLanguage();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { products } = useProducts();

  const wishlistProducts = products.filter(p => items.some(i => i.productId === p.id));

  return (
    <div dir={dir} className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t.wishlist.title}
            </h1>
          </motion.div>
          <p className="text-gray-600">
            {wishlistProducts.length}{' '}
            {wishlistProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.wishlist.empty}
            </h2>
            <p className="text-gray-600 mb-8">{t.wishlist.addFirst}</p>
            <Link href="/shop">
              <Button size="lg">Browse Products</Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Clear All */}
            <div className="flex justify-end mb-6">
              <Button
                variant="ghost"
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlistProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
                        <Image
                          src={product.images[0].src}
                          alt={locale === 'ar' ? product.nameAr : product.name}
                          fill
                          className="object-cover"
                        />
                        {(product.salePrice || product.newArrival) && (
                          <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                            {product.salePrice ? 'SALE' : 'NEW'}
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="mt-4">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-medium text-gray-900 hover:text-gray-600">
                          {locale === 'ar' ? product.nameAr : product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 capitalize mt-1">
                        {t.category[product.category]}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold">
                          {(product.salePrice || product.price).toLocaleString()}{' '}
                          {product.currency}
                        </span>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
