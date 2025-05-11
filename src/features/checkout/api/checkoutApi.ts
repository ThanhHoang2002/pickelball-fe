import { PaymentMethod } from '../constants/paymentMethods';
import { OrderResponse } from '../types';

import axiosClient from '@/lib/axios-client';
import { ApiResponse } from '@/types/apiResponse';
export type CreateOrderRequest = {
  paymentMethod: PaymentMethod;
  phone: string;
  address: string;
}

export const checkoutApi = {
  createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
    const response = await axiosClient.post<ApiResponse<OrderResponse>>('/orders', data);
    return response.data.data;
  }
}; 