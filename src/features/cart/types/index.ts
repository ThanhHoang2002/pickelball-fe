// API Response Types
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
    description: string | null;
  };
}

export interface Cart {
  id: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sellPrice: number;
  quantity: number;
  image: string;
  status: string;
  supplier: {
    id: number;
    name: string;
    description: string;
    image: string | null;
  };
  category: {
    id: number;
    name: string;
    image: string | null;
    description: string;
  };
}

export interface CartItemResponse {
  id: number;
  cart: Cart;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
}

export interface CartResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: CartItemResponse[];
}

// UI Component Types
export interface CartItemUI {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartSummaryUI {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
} 