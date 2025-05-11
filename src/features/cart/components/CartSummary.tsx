import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useToast } from '@/hooks/use-toast';

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
};

export const CartSummary = ({
  subtotal,
  shipping,
  total,
  itemCount
}: CartSummaryProps) => {
  const [couponCode, setCouponCode] = useState('');
  const {toast} = useToast();
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate the coupon with the backend
    toast({
      title: 'Failed to apply coupon',
      description: `Coupon ${couponCode} is invalid!`,
      variant: 'destructive',
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-medium text-gray-900">Order total</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Subtotal ({itemCount} products)</p>
          <p className="text-sm font-medium text-gray-900">{subtotal.toLocaleString('en-US')} $</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Shipping</p>
          <p className="text-sm font-medium text-gray-900">
            {shipping === 0 ? 'Free' : `${shipping.toLocaleString('en-US')} $`}
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <p className="text-base font-medium text-gray-900">Total</p>
            <p className="text-base font-medium text-gray-900">{total.toLocaleString('en-US')} $</p>
          </div>
        </div>
      </div>
      
      {/* Coupon code */}
      <div className="mt-6">
        <form onSubmit={handleApplyCoupon}>
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">
            Coupon code
          </label>
          <div className="mt-1 flex">
            <input
              type="text"
              id="coupon"
              name="coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="block w-full rounded-l-md border-gray-300 pl-3 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              placeholder="Enter coupon code"
            />
            <button
              type="submit"
              className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              aria-label="Apply coupon"
              tabIndex={0}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
      
      {/* Checkout button */}
      <div className="mt-6">
        <Link
          to="/checkout"
          className="block w-full rounded-md bg-black py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-gray-800"
          aria-label="Proceed to checkout"
          tabIndex={0}
        >
          Proceed to checkout
        </Link>
      </div>
      
      {/* Free shipping notice */}
      {subtotal < 150 && (
        <div className="mt-6 rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1 text-sm text-blue-700">
              <p>
                Add <span className="font-bold">{(150 - subtotal).toLocaleString('en-US')} $</span> to get FREE shipping!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 