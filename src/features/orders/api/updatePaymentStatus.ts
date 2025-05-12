import { Order, PaymentStatus } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const updatePaymentStatus = async (
  id: number,
  paymentStatus: PaymentStatus
): Promise<Order> => {
  const response = await axiosClient.put<ApiResponse<Order>>(
    `/orders/${id}/update-payment-status`,
    { paymentStatus }
  );
  return response.data.data;
}; 