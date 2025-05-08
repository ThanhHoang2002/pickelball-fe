import { Link } from 'react-router-dom';

import { CartItem } from './CartItem';
import { useCart } from '../hooks/useCart';

export const CompactCart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    isEmpty,
    isLoading,
    error
  } = useCart();

  if (isLoading && isEmpty) {
    return (
      <div className="py-8 text-center">
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
        <p className="mt-4 text-gray-600">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4 rounded-md bg-red-50 p-4">
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
          </div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Giỏ hàng trống</h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800"
          aria-label="Tiếp tục mua sắm"
          tabIndex={0}
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex justify-between">
        <h2 className="mb-6 text-2xl font-bold">Giỏ hàng</h2>
        <button
          onClick={clearCart}
          disabled={isLoading}
          className="text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Xóa giỏ hàng"
          tabIndex={0}
        >
          Xóa giỏ hàng
        </button>
      </div>

      {isLoading && (
        <div className="mb-4 rounded-md bg-blue-50 p-2 text-sm text-blue-700">
          Đang cập nhật giỏ hàng...
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeItem}
            onUpdateQuantity={updateQuantity}
            compact
          />
        ))}
      </div>
      <div className="mt-6 text-right">
        <div className="mb-4 text-xl font-bold">
          Tổng cộng: {total.toLocaleString('vi-VN')} đ
        </div>
        <button
          className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => alert('Chức năng thanh toán sẽ sớm được ra mắt!')}
          disabled={isLoading}
          aria-label="Tiến hành thanh toán"
          tabIndex={0}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}; 