import { Routes, Route, Navigate } from 'react-router-dom';

import { CheckoutContainer } from '@/features/checkout/components/CheckoutContainer';
import { OrderConfirmation } from '@/features/checkout/components/OrderConfirmation';

const CheckoutPage = () => {
  return (
    <Routes>
      <Route index element={<CheckoutContainer />} />
      <Route path="confirmation/:orderId" element={<OrderConfirmation />} />
      <Route path="*" element={<Navigate to="/checkout" replace />} />
    </Routes>
  );
}

export default CheckoutPage;