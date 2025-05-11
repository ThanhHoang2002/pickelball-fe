export enum PaymentMethod {
  COD = 'COD',
  TRANSFER = 'TRANSFER'
}

export const PAYMENT_METHODS = [
  {
    id: PaymentMethod.COD,
    name: 'Cash on delivery',
    description: 'Pay when you receive your order'
  },
  {
    id: PaymentMethod.TRANSFER,
    name: 'Bank transfer',
    description: 'Pay via bank transfer'
  }
];

export const getPaymentMethodLabel = (method: PaymentMethod): string => {
  const paymentMethod = PAYMENT_METHODS.find(m => m.id === method);
  return paymentMethod?.name || '';
}; 