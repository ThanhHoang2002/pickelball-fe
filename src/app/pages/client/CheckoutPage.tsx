import { Routes, Route, Navigate } from 'react-router-dom';

import { CheckoutContainer } from '@/features/checkout/components/CheckoutContainer';

const CheckoutPage = () => {
  return (
    <Routes>
      <Route index element={<CheckoutContainer />} />
      <Route path="*" element={<Navigate to="/checkout" replace />} />
    </Routes>
  );
}

export default CheckoutPage;