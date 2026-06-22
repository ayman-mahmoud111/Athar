'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Heart, Globe, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWishlist } from '@/contexts/WishlistContext';

const navLinks = [
  { href: '/', key: 'home' as const },
  { href: '/shop', key: 'shop' as const },
  { href: '/categories', key: 'categories' as const },
  { href: '/about', key: 'about' as const },
  { href: '/contact', key: 'contact' as const },
];

export function Header() {
  const { locale, setLocale, t, dir } = useLanguage();
  const { items } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <motion.header
        dir={dir}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-xl md:text-2xl font-bold tracking-tight"
              >
                <span className={isScrolled ? 'text-black' : 'text-white'}>
                  ATHAR
                </span>
                <span className={isScrolled ? 'text-gray-600' : 'text-gray-200'}>
                  أثر
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 transition-colors ${
                  isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-white hover:text-gray-200'
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Switcher - hidden on very small screens */}
              <button
                onClick={toggleLanguage}
                className={`hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-full border transition-colors ${
                  isScrolled
                    ? 'border-gray-300 text-gray-900 hover:bg-gray-100'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{locale.toUpperCase()}</span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`relative p-2 transition-colors ${
                  isScrolled ? 'text-gray-900 hover:text-gray-600' : 'text-white hover:text-gray-200'
                }`}
                aria-label={t.wishlist.title}
              >
                <Heart className="w-5 h-5" />
                {items.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {items.length}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: locale === 'ar' ? -300 : 300 }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? -300 : 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-0 bottom-0 w-72 sm:w-80 bg-white shadow-xl"
              style={{ [locale === 'ar' ? 'left' : 'right']: 0 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {t.nav[link.key]}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-4 border-t mt-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 w-full py-3 px-4 bg-gray-100 rounded-lg"
                >
                  <Globe className="w-5 h-5" />
                  <span>{locale === 'en' ? 'العربية' : 'English'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-0 left-0 right-0 bg-white p-4"
            >
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center space-x-4">
                  <Search className="w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.shop.search}
                    className="flex-1 text-lg outline-none"
                    autoFocus
                  />
                  <button onClick={() => setIsSearchOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {searchQuery && (
                  <Link
                    href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="block mt-4 text-center text-sm text-gray-600 hover:text-black"
                  >
                    {t.common.viewAll} &rarr;
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
