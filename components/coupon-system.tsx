'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Check, X, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { coupons } from '@/data/products';
import { toast } from 'sonner';

interface CouponInputProps {
  onApply: (code: string, discount: number, type: 'percentage' | 'fixed') => void;
  orderTotal?: number;
}

export function CouponInput({ onApply, orderTotal = 0 }: CouponInputProps) {
  const [code, setCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const validateCoupon = () => {
    if (!code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setIsValidating(true);

    // Simulate API validation
    setTimeout(() => {
      const coupon = coupons.find(c => c.code.toLowerCase() === code.toLowerCase());

      if (coupon) {
        setAppliedCoupon(coupon.code);
        const discountAmount =
          coupon.type === 'percentage'
            ? (orderTotal * coupon.discount) / 100
            : coupon.discount;
        setDiscount(discountAmount);
        onApply(coupon.code, coupon.discount, coupon.type);
        toast.success(`Couopn applied! ${coupon.type === 'percentage' ? coupon.discount + '%' : 'EGP ' + coupon.discount} off`);
      } else {
        toast.error('Invalid coupon code');
        setAppliedCoupon(null);
        setDiscount(0);
      }

      setIsValidating(false);
    }, 500);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCode('');
    onApply('', 0, 'percentage');
    toast.info('Coupon removed');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">Apply Coupon</span>
      </div>

      <AnimatePresence mode="wait">
        {appliedCoupon ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">{appliedCoupon}</span>
              <span className="text-green-600 text-sm">
                (-
                {discount.toLocaleString()} EGP)
              </span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-2"
          >
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              className="uppercase"
            />
            <Button onClick={validateCoupon} disabled={isValidating || !code}>
              {isValidating ? '...' : 'Apply'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested Coupons */}
      {!appliedCoupon && (
        <div className="flex flex-wrap gap-2">
          {coupons.slice(0, 3).map(coupon => (
            <button
              key={coupon.code}
              onClick={() => {
                setCode(coupon.code);
                setTimeout(() => validateCoupon(), 100);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
            >
              <Percent className="w-3 h-3" />
              {coupon.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Simple coupon banner component for home page
export function CouponBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-4 text-sm">
        <span>Use code</span>
        <code className="bg-white text-black px-2 py-0.5 rounded font-mono font-medium">
          WELCOME10
        </code>
        <span>for 10% off your first order</span>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
