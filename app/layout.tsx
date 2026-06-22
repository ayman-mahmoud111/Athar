import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { RecentlyViewedProvider } from '@/contexts/RecentlyViewedContext';
import { ProductsProvider } from '@/contexts/ProductsContext';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Google Analytics placeholder - replace GA_MEASUREMENT_ID with your actual tracking ID
// Add the following script in the <head> for Google Analytics:
// <Script
//   src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
//   strategy="afterInteractive"
// />
// And initialize ga() with your tracking ID

export const metadata: Metadata = {
  title: 'ATHAR | Premium Fashion Brand',
  description: 'Discover premium fashion at ATHAR. High-quality clothing, modern designs, and timeless style for men and women.',
  keywords: ['fashion', 'clothing', 'premium', 'luxury', 'style', 'men', 'women', 'hoodies', 't-shirts', 'jeans'],
  authors: [{ name: 'ATHAR' }],
  creator: 'ATHAR',
  publisher: 'ATHAR',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
    url: 'https://athar.fashion',
    siteName: 'ATHAR',
    title: 'ATHAR | Premium Fashion Brand',
    description: 'Discover premium fashion at ATHAR. High-quality clothing, modern designs, and timeless style for men and women.',
    images: [
      {
        url: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'ATHAR - Premium Fashion Brand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATHAR | Premium Fashion Brand',
    description: 'Discover premium fashion at ATHAR. High-quality clothing, modern designs, and timeless style.',
    images: ['https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    creator: '@atharfashion',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ATHAR',
              url: 'https://athar.fashion',
              logo: 'https://athar.fashion/logo.png',
              sameAs: [
                'https://instagram.com/atharfashion',
                'https://facebook.com/atharfashion',
                'https://twitter.com/atharfashion',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+20-101-400-7217',
                contactType: 'customer service',
                availableLanguage: ['English', 'Arabic'],
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cairo',
                addressCountry: 'EG',
              },
            }),
          }}
        />
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ATHAR',
              url: 'https://athar.fashion',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://athar.fashion/shop?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <LanguageProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <ProductsProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <BackToTop />
                <SonnerToaster position="top-right" richColors />
                <Toaster />
              </ProductsProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
