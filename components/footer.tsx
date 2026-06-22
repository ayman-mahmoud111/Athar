'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

const quickLinks = [
  { href: '/', key: 'home' as const },
  { href: '/shop', key: 'shop' as const },
  { href: '/categories', key: 'categories' as const },
  { href: '/lookbook', key: 'lookbook' as const },
  { href: '/about', key: 'about' as const },
  { href: '/contact', key: 'contact' as const },
];

const categoryLinks = [
  { href: '/shop?category=men', key: 'men' as const },
  { href: '/shop?category=women', key: 'women' as const },
  { href: '/shop?category=hoodies', key: 'hoodies' as const },
  { href: '/shop?category=t-shirts', key: 't-shirts' as const },
  { href: '/shop?category=jeans', key: 'jeans' as const },
  { href: '/shop?category=shoes', key: 'shoes' as const },
];

const customerServiceLinks = [
  { href: '/about', label: 'About Us', labelAr: 'عنا' },
  { href: '/contact', label: 'Contact', labelAr: 'اتصل بنا' },
  { href: '#', label: 'FAQs', labelAr: 'الأسئلة الشائعة' },
  { href: '#', label: 'Shipping Info', labelAr: 'معلومات الشحن' },
  { href: '#', label: 'Returns', labelAr: 'الإرجاع' },
  { href: '#', label: 'Size Guide', labelAr: 'دليل المقاسات' },
];

export function Footer() {
  const { t, locale, dir } = useLanguage();

  return (
    <footer dir={dir} className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-100">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.newsletter.title}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.newsletter.subtitle}
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                {t.newsletter.subscribe}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-1 mb-4">
              <span className="text-xl font-bold text-black">ATHAR</span>
              <span className="text-xl font-bold text-gray-600">أثر</span>
            </Link>
            <p className="text-gray-600 text-sm mb-6">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              {t.sections.categories}
            </h4>
            <ul className="space-y-3">
              {categoryLinks.map(link => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {t.category[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              {t.footer.connect}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Cairo, Egypt</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+20 101 400 7217</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@luxefashion.com</span>
              </li>
              <li className="pt-2">
                <motion.a
                  href="https://wa.me/201014007217"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2024 ATHAR. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-900 transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
