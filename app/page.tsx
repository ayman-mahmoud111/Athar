'use client';

import React from 'react';
import { HeroSection } from '@/components/hero-section';
import {
  ProductSection,
  CategoriesSection,
  BrandStorySection,
  ReviewsSection,
  InstagramSection,
} from '@/components/home-sections';
import { useProducts } from '@/contexts/ProductsContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const { products, loading } = useProducts();

  const featuredProducts = products.filter(p => p.featured);
  const newArrivals = products.filter(p => p.newArrival);
  const bestSellers = products.filter(p => p.bestSeller);
  const trendingProducts = products.filter(p => p.trending);

  return (
    <>
      <HeroSection />

      {featuredProducts.length > 0 && (
        <ProductSection
          title={t.sections.featured}
          products={featuredProducts}
          viewAllLink="/shop?filter=featured"
        />
      )}

      <CategoriesSection />

      {newArrivals.length > 0 && (
        <ProductSection
          title={t.sections.newArrivals}
          products={newArrivals}
          viewAllLink="/shop?filter=new"
        />
      )}

      {trendingProducts.length > 0 && (
        <ProductSection
          title={t.sections.trending}
          products={trendingProducts}
          viewAllLink="/shop?filter=trending"
        />
      )}

      <BrandStorySection />

      {bestSellers.length > 0 && (
        <ProductSection
          title={t.sections.bestSellers}
          products={bestSellers}
          viewAllLink="/shop?filter=bestseller"
        />
      )}

      <ReviewsSection />

      <InstagramSection />
    </>
  );
}
