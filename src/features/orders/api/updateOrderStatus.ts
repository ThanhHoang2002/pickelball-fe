import { Order, OrderStatus } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const updateOrderStatus = async (
  id: number,
  orderStatus: OrderStatus
): Promise<Order> => {
  const response = await axiosClient.put<ApiResponse<Order>>(
    `/orders/${id}/update-order-status`,
    { orderStatus }
  );
  return response.data.data;
}; 