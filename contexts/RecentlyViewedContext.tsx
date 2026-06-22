'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RecentlyViewedItem } from '@/types';

interface RecentlyViewedContextType {
  items: RecentlyViewedItem[];
  addRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENTLY_VIEWED = 10;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('recentlyViewed', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setItems(prev => {
      const filtered = prev.filter(item => item.productId !== productId);
      const newItems = [{ productId, viewedAt: new Date().toISOString() }, ...filtered];
      return newItems.slice(0, MAX_RECENTLY_VIEWED);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setItems([]);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <RecentlyViewedContext.Provider value={{
      items,
      addRecentlyViewed,
      clearRecentlyViewed,
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
