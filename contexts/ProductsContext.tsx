'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, Category } from '@/types';

interface ProductsContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  refreshProducts: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = 'athar_products';
const CATEGORIES_KEY = 'athar_categories';

// Default categories
const defaultCategories: Category[] = [
  'men', 'women', 'hoodies', 't-shirts', 'jeans', 'jackets',
  'shoes', 'accessories', 'dresses', 'sweaters', 'shorts', 'skirts'
];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage or fetch from JSON
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      // First, check localStorage for admin-managed products
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error parsing stored products:', e);
        }
      }

      // Fall back to JSON file
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        if (data.products) {
          setProducts(data.products);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
        }
        if (data.categories) {
          localStorage.setItem(CATEGORIES_KEY, JSON.stringify(data.categories));
        }
      } catch (e) {
        console.error('Error loading products:', e);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  const refreshProducts = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (e) {
        console.error('Error refreshing products:', e);
      }
    }
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts(prev => {
      const updated = [...prev, product];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === product.id ? product : p);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getProduct = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  const getProductBySlug = useCallback((slug: string) => {
    return products.find(p => p.slug === slug);
  }, [products]);

  return (
    <ProductsContext.Provider value={{
      products,
      categories: defaultCategories,
      loading,
      refreshProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      getProductBySlug,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
