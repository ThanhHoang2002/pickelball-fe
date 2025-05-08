import { Link } from 'react-router-dom';

import { CartSummary } from './CartSummary';
import { useCart } from '../hooks/useCart';

export const CartContainer = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
    itemCount,
    isEmpty,
    isLoading,
    error
  } = useCart();

  if (isEmpty && !isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
          <p className="mt-4 text-gray-600">Giỏ hàng của bạn hiện đang trống.</p>
          <Link 
            to="/category/paddles" 
            className="mt-8 inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
            aria-label="Bắt đầu mua sắm"
            tabIndex={0}
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Đã xảy ra lỗi</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg p-6 ">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            </div>
          </div>
        </div>
      )}

      <h1 className="mb-6 text-2xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <div className="grid grid-cols-12 items-center text-sm font-medium text-gray-700">
                <div className="col-span-6 px-2">SẢN PHẨM</div>
                <div className="col-span-2 px-2 text-center">GIÁ</div>
                <div className="col-span-2 px-2 text-center">SỐ LƯỢNG</div>
                <div className="col-span-2 px-2 text-right">THÀNH TIỀN</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 items-center p-4">
                  {/* Product */}
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="h-20 w-20 flex-shrink-0 rounded-md border border-gray-200 bg-gray-50 p-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-2 text-center text-sm text-gray-700">
                    {item.price.toLocaleString()} đ
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex w-full max-w-[120px] items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-l border border-gray-300 bg-gray-50 text-gray-600 transition hover:bg-gray-100"
                        aria-label="Giảm số lượng"
                        disabled={isLoading}
                      >
                        -
                      </button>
                      <div className="flex h-8 w-10 items-center justify-center border-y border-gray-300 bg-white text-sm text-gray-700">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-r border border-gray-300 bg-gray-50 text-gray-600 transition hover:bg-gray-100"
                        aria-label="Tăng số lượng"
                        disabled={isLoading}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total & Remove */}
                  <div className="col-span-2 flex items-center justify-end gap-3">
                    <div className="text-sm font-medium text-gray-900">
                      {(item.price * item.quantity).toLocaleString()} đ
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-600"
                      aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart actions */}
            <div className="flex justify-between border-t border-gray-200 bg-gray-50 p-4">
              <Link 
                to="/category/paddles" 
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                aria-label="Tiếp tục mua sắm"
              >
                Tiếp tục mua sắm
              </Link>
              <button 
                onClick={() => clearCart()}
                disabled={isLoading}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Xóa giỏ hàng"
              >
                Xóa giỏ hàng
              </button>
            </div>
          </div>
        </div>
        
        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary 
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            itemCount={itemCount}
          />
        </div>
      </div>
    </div>
  );
}; 