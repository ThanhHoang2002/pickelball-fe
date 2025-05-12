export type PaymentMethod = 'COD' | 'TRANSFER' | 'CREDIT_CARD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'DELIVERED' | 'CANCELLED';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: string;
  avatar: string | null;
  role: {
    id: number;
    name: string;
    description: string;
  };
}

export interface Order {
  id: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentUrl: string | null;
  transactionNo: string | null;
  paymentMessage: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  user: User;
  phone: string;
  address: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
}

export interface OrderResponse {
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: Order[];
}

export interface OrderFilterParams {
  page?: number;
  size?: number;
  search?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  fromDate?: string;
  toDate?: string;
  userId?: number;
} 