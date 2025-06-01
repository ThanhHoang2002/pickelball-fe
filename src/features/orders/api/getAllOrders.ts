import { Item, sfAnd, sfEqual, sfGe, sfLe, sfLike } from "spring-filter-query-builder";

import { OrderFilterParams, OrderResponse } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const getAllOrders = async (
  params: OrderFilterParams
): Promise<OrderResponse> => {
  console.log(params)
  // Xây dựng bộ lọc từ các tham số
  const filter = sfAnd(
    [
      params.search && sfLike("user.name", params.search),
      params.paymentStatus && sfEqual("paymentStatus", params.paymentStatus),
      params.paymentMethod && sfEqual("paymentMethod", params.paymentMethod),
      params.orderStatus && sfEqual("orderStatus", params.orderStatus),
      params.fromDate && sfGe("createdAt", params.fromDate),
      params.toDate && sfLe("createdAt", params.toDate),
      params.userId && sfEqual("user.id", params.userId),
    ].filter(Boolean) as Item[]
  );
  
  const response = await axiosClient.get<ApiResponse<OrderResponse>>(
    "/orders",
    {
      params: {
        page: params.page != null ? params.page : 0,
        size: params.size || 10,
        filter: filter.toString() === "()" ? undefined : filter.toString(),
        sort: params.sortBy ? `${params.sortBy},${params.sortDirection?.toUpperCase()}` : undefined,
      },
    }
  );
  
  return response.data.data;
}; 