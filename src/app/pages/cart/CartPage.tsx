import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCartStore } from '@/stores/cartStore';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getItemCount } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  
  const subtotal = getTotal();
  const shipping = subtotal > 150 ? 0 : 10;
  const total = subtotal + shipping;
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate the coupon with the backend
    alert(`Coupon ${couponCode} applied!`);
  };
  
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="mt-4 text-gray-600">Your cart is currently empty.</p>
          <Link 
            to="/category/paddles" 
            className="mt-8 inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      <p className="mt-2 text-gray-600">Review and manage your selected items.</p>
      
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {/* Cart Items */}
          <div className="rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          {item.color && (
                            <div className="text-sm text-gray-500">Color: {item.color}</div>
                          )}
                          {item.size && (
                            <div className="text-sm text-gray-500">Size: {item.size.toUpperCase()}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-1 text-gray-900 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <div className="w-10 border-y border-gray-300 px-3 py-1 text-center">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-1 text-gray-900 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Cart actions */}
          <div className="mt-6 flex justify-between">
            <Link 
              to="/category/paddles" 
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
            <button 
              onClick={() => clearCart()}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-50 hover:text-red-800"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          {/* Order summary */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal ({getItemCount()} items)</p>
                <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-900">Order total</p>
                  <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            {/* Coupon code */}
            <div className="mt-6">
              <form onSubmit={handleApplyCoupon}>
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">
                  Discount code
                </label>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    placeholder="Enter code"
                  />
                  <button
                    type="submit"
                    className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
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
              >
                Checkout
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
                      Add <span className="font-bold">${(150 - subtotal).toFixed(2)}</span> more to qualify for FREE shipping!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 