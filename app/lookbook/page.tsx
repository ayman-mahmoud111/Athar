'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const collections = [
  {
    id: 'urban-street',
    title: 'Urban Street',
    titleAr: 'ستايل الشارع',
    description: 'Bold looks for the modern urban explorer',
    descriptionAr: 'إطلالات جريئة لمستكشف المدينة العصري',
    image: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: 12,
  },
  {
    id: 'minimal-luxe',
    title: 'Minimal Luxe',
    titleAr: 'فاخر مينيمال',
    description: 'Clean lines and refined simplicity',
    descriptionAr: 'خطوط نظيفة وبساطة راقية',
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: 8,
  },
  {
    id: 'cozy-comfort',
    title: 'Cozy Comfort',
    titleAr: 'راحة دافئة',
    description: 'Warm essentials for relaxed living',
    descriptionAr: 'أساسيات دافئة لحياة مريحة',
    image: 'https://images.pexels.com/photos/4580549/pexels-photo-4580549.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: 15,
  },
  {
    id: 'evening-elegance',
    title: 'Evening Elegance',
    titleAr: 'أناقة المساء',
    description: 'Sophisticated pieces for special nights',
    descriptionAr: 'قطع راقية للليالي الخاصة',
    image: 'https://images.pexels.com/photos/9856404/pexels-photo-9856404.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: 10,
  },
];

const lookbook = [
  {
    id: 'look-1',
    title: 'Weekend Vibes',
    titleAr: 'أجواء عطلة نهاية الأسبوع',
    items: ['Oversized Hoodie', 'Slim Fit Jeans', 'Canvas Sneakers'],
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'look-2',
    title: 'Office Ready',
    titleAr: 'جاهز للمكتب',
    items: ['Linen Shirt', 'Classic Trousers', 'Leather Loafers'],
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'look-3',
    title: 'Night Out',
    titleAr: 'سهرة',
    items: ['Leather Jacket', 'Black Tee', 'Slim Chinos'],
    image: 'https://images.pexels.com/photos/1559692/pexels-photo-1559692.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'look-4',
    title: 'Beach Getaway',
    titleAr: 'إجازة شاطئية',
    items: ['Linen Shirt', 'Cargo Shorts', 'Sandals'],
    image: 'https://images.pexels.com/photos/1342239/pexels-photo-1342239.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'look-5',
    title: 'Street Chic',
    titleAr: 'شيك الشارع',
    items: ['Graphic Tee', 'Distressed Jeans', 'High Tops'],
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'look-6',
    title: 'Winter Layers',
    titleAr: 'طبقات الشتاء',
    items: ['Wool Sweater', 'Puffer Jacket', 'Warm Beanie'],
    image: 'https://images.pexels.com/photos/4580549/pexels-photo-4580549.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const moodShots = [
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1040921/pexels-photo-1040921.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export default function LookbookPage() {
  const { t, dir, locale } = useLanguage();

  return (
    <div dir={dir} className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Lookbook"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t.lookbook.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-200"
          >
            {t.lookbook.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Collections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t.lookbook.collections}
          </h2>
          <p className="text-gray-600 mt-2">
            Explore our curated fashion collections
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/shop?category=${collection.id}`}>
                <div className="group relative aspect-[3/2] overflow-hidden rounded-xl">
                  <Image
                    src={collection.image}
                    alt={locale === 'ar' ? collection.titleAr : collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {locale === 'ar' ? collection.titleAr : collection.title}
                    </h3>
                    <p className="text-white/80 mb-4">
                      {locale === 'ar' ? collection.descriptionAr : collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{collection.products} looks</span>
                      <span className="flex items-center gap-1 text-sm font-medium">
                        View Collection
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Outfit Inspirations */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t.lookbook.outfitInspiration}
            </h2>
            <p className="text-gray-600 mt-2">
              Get inspired by our curated outfit combinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lookbook.map((look, index) => (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={look.image}
                    alt={locale === 'ar' ? look.titleAr : look.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-lg font-bold mb-2">
                      {locale === 'ar' ? look.titleAr : look.title}
                    </h3>
                    <ul className="text-white/80 text-sm space-y-1">
                      {look.items.map((item, i) => (
                        <li key={i}>&bull; {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                Editorial
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                Behind the Scenes
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Step into our creative process. Every piece is thoughtfully designed,
                carefully crafted, and beautifully presented. Discover the art
                behind our fashion.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Watch Film
                </motion.button>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {moodShots.map((src, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-lg ${
                    index % 2 === 0 ? 'mt-8' : ''
                  }`}
                >
                  <div className="aspect-[3/4]">
                    <Image
                      src={src}
                      alt="Mood shot"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Find Your Style
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 mb-8"
          >
            Browse our complete collection and discover pieces that match your unique style
          </motion.p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Shop All Products
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
