import { Link } from 'react-router-dom';

import { CartItemUI } from '../types';

type CartItemProps = {
  item: CartItemUI;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  compact?: boolean;
};

export const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
  compact = false
}: CartItemProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow">
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 object-contain"
        />
        <div className="flex-1">
          <Link
            to={`/product/${item.productId}`}
            className="text-lg font-semibold hover:text-blue-600"
          >
            {item.name}
          </Link>
          <div className="mt-1 text-gray-600">{item.price.toLocaleString('vi-VN')} đ</div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
            className="rounded border p-1"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-800"
            aria-label={`Remove ${item.name} from cart`}
            tabIndex={0}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <tr>
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
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {item.price.toLocaleString('vi-VN')} đ
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        <div className="flex items-center">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-1 text-gray-900 hover:bg-gray-100"
            aria-label="Decrease quantity"
            tabIndex={0}
          >
            -
          </button>
          <div className="w-10 border-y border-gray-300 px-3 py-1 text-center">
            {item.quantity}
          </div>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-1 text-gray-900 hover:bg-gray-100"
            aria-label="Increase quantity"
            tabIndex={0}
          >
            +
          </button>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {(item.price * item.quantity).toLocaleString('vi-VN')} đ
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-800"
          aria-label={`Remove ${item.name} from cart`}
          tabIndex={0}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}; 