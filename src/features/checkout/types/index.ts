import { User } from "@/features/auth/types/auth.type"

export interface Order {
  id: number
  totalPrice: number
  paymentMethod: string
  paymentStatus: string
  paymentUrl: string
  transactionNo: string
  paymentMessage: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  user: User
  phone: string
  address: string
}

export interface OrderResponse {
  order: Order
  paymentUrl: string
}
