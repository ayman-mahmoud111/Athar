'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Play } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t, locale, dir } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const isWishlisted = isInWishlist(product.id);
  const displayPrice = product.salePrice || product.price;
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      dir={dir}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      {/* Image Container */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
          <Image
            src={product.images[0].src}
            alt={locale === 'ar' ? product.nameAr : product.name}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1].src}
              alt={locale === 'ar' ? product.nameAr : product.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isHovered && imageIndex === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Sale Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded">
              {discount}% {t.common.off}
            </div>
          )}

          {/* New Arrival Badge */}
          {product.newArrival && !product.salePrice && (
            <div className="absolute top-3 left-3 bg-white text-black text-xs font-medium px-2 py-1 rounded border border-gray-200">
              NEW
            </div>
          )}

          {/* Best Seller Badge */}
          {product.bestSeller && !product.salePrice && !product.newArrival && (
            <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded">
              BEST SELLER
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlistClick}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isWishlisted ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
            <Link
              href={`/product/${product.slug}`}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Video Badge */}
          {product.videos.length > 0 && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <Play className="w-3 h-3" />
              Video
            </div>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-1">
            {locale === 'ar' ? product.nameAr : product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-xs text-gray-500 mt-1 capitalize">
          {t.category[product.category] || product.category}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-semibold text-gray-900">
            {displayPrice.toLocaleString()} {product.currency}
          </span>
          {product.salePrice && (
            <span className="text-sm text-gray-500 line-through">
              {product.price.toLocaleString()} {product.currency}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map(star => (
              <svg
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Quick Size Peek */}
        {product.sizes.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {product.sizes.slice(0, 4).map(size => (
              <span
                key={size}
                className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
