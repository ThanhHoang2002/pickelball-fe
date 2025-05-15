import { OrderStatus } from "@/features/orders/types";

export type PeriodFilter = "today" | "week" | "month" | "year";

export interface DashboardStats {
  revenue: {
    currentValue: number;
    previousValue: number;
    growthRate: number;
  };
  orders: {
    currentValue: number;
    previousValue: number;
    growthRate: number;
  };
  productsSold: {
    currentValue: number;
    previousValue: number;
    growthRate: number;
  };
  customers: {
    currentValue: number;
    previousValue: number;
    growthRate: number;
  };
}

export interface SalesDataPoint {
  day: string;
  amount: number;
}

export interface TopSellingProduct {
  productId: number;
  productName: string;
  productImage: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

export type PaymentMethod = "COD" | "TRANSFER";
export type PaymentStatus = "PENDING" | "COMPLETED" | "CANCELLED" | "FAILED" | "REFUNDED";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  role: {
    id: number;
    name: string;
  };
}

export interface RecentOrder {
  id: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
  phone: string;
  address: string;
} 