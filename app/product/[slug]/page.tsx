'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Share2,
  Eye,
  Truck,
  RotateCcw,
  ChevronRight,
  Play,
  X,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { useProducts } from '@/contexts/ProductsContext';
import { ProductCard } from '@/components/product-card';
import { OrderDialog } from '@/components/order-dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, Size, Color } from '@/types';
import { toast } from 'sonner';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { t, dir, locale } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { products, getProductBySlug } = useProducts();

  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = getProductBySlug(slug);
    if (found) {
      setProduct(found);
      addRecentlyViewed(found.id);
      if (found.colors.length > 0) {
        setSelectedColor(found.colors[0]);
      }
    }
  }, [slug, addRecentlyViewed, getProductBySlug]);

  if (!mounted || !product) {
    return (
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const displayPrice = product.salePrice || product.price;
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleOrderClick = () => {
    if (!selectedSize) {
      toast.error(t.product.selectSize);
      return;
    }
    setIsOrderDialogOpen(true);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div dir={dir} className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              {t.nav.home}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-gray-900">
              {t.nav.shop}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-gray-900 capitalize"
            >
              {t.category[product.category]}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">
              {locale === 'ar' ? product.nameAr : product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={product.images[currentImageIndex]?.src}
                    alt={locale === 'ar' ? product.nameAr : product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded">
                    {discount}% {t.common.off}
                  </span>
                )}
                {product.newArrival && (
                  <span className="bg-white text-black text-xs font-medium px-3 py-1 rounded border border-gray-200">
                    NEW
                  </span>
                )}
                {product.bestSeller && (
                  <span className="bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded">
                    BEST
                  </span>
                )}
              </div>

              {/* Video Button */}
              {product.videos.length > 0 && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsPlayingVideo(true);
                  }}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-white transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Video
                </button>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {locale === 'ar' ? product.nameAr : product.name}
              </h1>
              <p className="text-gray-500 mt-1 capitalize">
                {t.category[product.category]}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                {displayPrice.toLocaleString()} {product.currency}
              </span>
              {product.salePrice && (
                <span className="text-lg text-gray-500 line-through">
                  {product.price.toLocaleString()} {product.currency}
                </span>
              )}
            </div>

            {/* Views Counter */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>
                {product.viewCount.toLocaleString()} {t.product.views}
              </span>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {t.product.selectSize}
                </span>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-900 mb-2 block">
                  {t.product.selectColor}: {selectedColor?.name}
                </span>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor?.hex === color.hex
                          ? 'border-black scale-110'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm text-gray-600">
                {product.stock > 0
                  ? `${t.product.inStock} (${product.stock})`
                  : t.product.outOfStock}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleOrderClick}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.884 9.884-9.884 2.635 0 5.11 1.03 6.972 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.393-18.277A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.817 11.817 0 00-3.478-8.396" />
                </svg>
                {t.product.orderViaWhatsApp}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleWishlist(product.id)}
                className={isWishlisted ? 'border-red-500 text-red-500' : ''}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Info Sections */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{product.shippingInfo}</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <RotateCcw className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{product.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">{t.product.description}</TabsTrigger>
              <TabsTrigger value="reviews">
                {t.product.reviews} ({product.reviews.length})
              </TabsTrigger>
              <TabsTrigger value="shipping">{t.product.shipping}</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  {locale === 'ar' ? product.descriptionAr : product.description}
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-3">
                  {t.product.materials}
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.materials.map(material => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Distribution */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-4xl font-bold text-gray-900">
                        {product.rating}
                      </div>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(product.rating)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {product.reviewCount} reviews
                      </div>
                    </div>
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map(star => {
                        const widths: Record<number, number> = { 5: 70, 4: 20, 3: 5, 2: 3, 1: 2 };
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 w-4">{star}</span>
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: widths[star] + '%' }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="divide-y">
                  {product.reviews.map(review => (
                    <div key={review.id} className="py-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {review.userName}
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <svg
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= review.rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                  </svg>
                                ))}
                              </div>
                              {review.verified && (
                                <span className="text-xs text-green-600">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold">{t.product.shipping}</h3>
                <p className="text-gray-600">{product.shippingInfo}</p>
                <h3 className="text-lg font-semibold mt-6">
                  {t.product.returns}
                </h3>
                <p className="text-gray-600">{product.returnPolicy}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t.product.related}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setIsZoomed(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-w-5xl max-h-[80vh] m-4">
              <Image
                src={product.images[currentImageIndex]?.src}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={e => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isPlayingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setIsPlayingVideo(false)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setIsPlayingVideo(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-4xl aspect-video m-4">
              <video
                autoPlay
                controls
                className="w-full h-full rounded-lg"
                onClick={e => e.stopPropagation()}
              >
                <source src={product.videos[0]?.src} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Dialog */}
      <OrderDialog
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        isOpen={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
      />
    </div>
  );
}
