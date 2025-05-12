import { DashboardStats, PeriodFilter, TopSellingProduct, RecentOrder } from "../types";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";
import { DetailResponse } from "@/types/detailResponse";

/**
 * Lấy số liệu thống kê cho dashboard
 */
export const getDashboardStats = async (period: PeriodFilter = "month"): Promise<DashboardStats> => {
  const response = await axiosClient.get<ApiResponse<ApiResponse<DashboardStats>>>(`/statistics/performance/${period}`);
  return response.data.data.data;
};


/**
 * Lấy sản phẩm bán chạy nhất
 */
export const getTopSellingProducts = async (limit: number = 5): Promise<TopSellingProduct[]> => {
  const response = await axiosClient.get<ApiResponse<ApiResponse<TopSellingProduct[]>>>("/statistics/top-selling-products", {
    params: { limit }
  });
  return response.data.data.data;
};

/**
 * Lấy đơn hàng gần đây
 */
export const getRecentOrders = async (limit: number = 5): Promise<RecentOrder[]> => {
  const response = await axiosClient.get<ApiResponse<DetailResponse<RecentOrder[]>>>("/orders", {
    params: { 
      size: limit,
      sortBy: "createdAt",
      sortDirection: "desc"
     },
  });
  return response.data.data.result;
}; 