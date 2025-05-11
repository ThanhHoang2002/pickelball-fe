import { Order, OrderStatus } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus
): Promise<Order> => {
  const response = await axiosClient.patch<ApiResponse<Order>>(
    `/orders/${id}/status`,
    { status }
  );
  return response.data.data;
}; 