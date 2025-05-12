import { Navigate } from 'react-router-dom';

import { CheckoutForm } from './CheckoutForm';
import { CheckoutSummary } from './CheckoutSummary';

import { useCart } from '@/features/cart/hooks/useCart';

export const CheckoutContainer = () => {
  const { isEmpty, isLoading: isCartLoading } = useCart();
  // Redirect to cart if cart is empty
  if (isEmpty && !isCartLoading) {
    console.log('cart is empty')
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Checkout</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}; 