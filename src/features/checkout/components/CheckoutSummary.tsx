import { useCart } from '@/features/cart/hooks/useCart';

export const CheckoutSummary = () => {
  const { items, subtotal, shipping, total, itemCount } = useCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 border-b border-gray-200 pb-4 text-xl font-semibold text-gray-900">Order Summary</h2>
      
      {/* Order items */}
      <div className="mb-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700">ORDER ITEMS ({itemCount})</h3>
        
        <div className="max-h-[300px] overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3">
              <div className="h-16 w-16 flex-shrink-0 rounded-md border border-gray-200 bg-gray-50 p-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {(item.price * item.quantity).toLocaleString()} $
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price calculation */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Subtotal:</span>
          <span className="text-sm font-medium text-gray-900">{subtotal.toLocaleString()} $</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Shipping fee:</span>
          <span className="text-sm font-medium text-gray-900">{shipping.toLocaleString()} $</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-2">
          <span className="text-base font-medium text-gray-900">Total:</span>
          <span className="text-base font-bold text-primary">{total.toLocaleString()} $</span>
        </div>
      </div>
    </div>
  );
}; 