export type PeriodFilter = "today" | "last7days" | "last30days" | "last12months" | "alltime";

export interface DashboardStats {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  productsSold: number;
  productsGrowth: number;
  newCustomers: number;
  customersGrowth: number;
}

export interface SalesDataPoint {
  day: string;
  amount: number;
}

export interface TopSellingProduct {
  id: number;
  name: string;
  price: number;
  imageSrc: string | null;
  quantitySold: number;
  revenue: number;
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
  createdAt: string;
  updatedAt: string;
  user: User;
  phone: string;
  address: string;
} 